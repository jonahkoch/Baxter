#!/usr/bin/env python3
"""
Batch scraping utility for Obscura.

Reads URLs from CSV/JSON, scrapes in parallel, outputs results.

Usage:
    python batch_scrape.py urls.csv --extract "document.title" --output results.json
    python batch_scrape.py urls.json --extract "document.querySelector('h1').textContent" --concurrency 20
"""

import csv
import json
import argparse
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Dict, Any, Optional
import subprocess


def load_urls(source: str) -> List[str]:
    """Load URLs from CSV or JSON file."""
    urls = []
    
    if source.endswith('.csv'):
        with open(source, 'r') as f:
            reader = csv.DictReader(f)
            # Try common column names
            for row in reader:
                if 'url' in row:
                    urls.append(row['url'])
                elif 'link' in row:
                    urls.append(row['link'])
                elif 'href' in row:
                    urls.append(row['href'])
                else:
                    # Assume first column is URL
                    urls.append(list(row.values())[0])
    
    elif source.endswith('.json'):
        with open(source, 'r') as f:
            data = json.load(f)
            if isinstance(data, list):
                if all(isinstance(x, str) for x in data):
                    urls = data
                else:
                    # Try to extract URLs from objects
                    for item in data:
                        if isinstance(item, dict):
                            if 'url' in item:
                                urls.append(item['url'])
                            elif 'link' in item:
                                urls.append(item['link'])
    
    else:
        # Plain text file, one URL per line
        with open(source, 'r') as f:
            urls = [line.strip() for line in f if line.strip()]
    
    return urls


def scrape_url(url: str, extract: Optional[str] = None, 
               stealth: bool = False, wait_until: str = "load") -> Dict[str, Any]:
    """Scrape a single URL."""
    cmd = ["obscura", "fetch", url]
    
    if extract:
        cmd.extend(["--eval", extract])
    else:
        cmd.extend(["--dump", "html"])
    
    if stealth:
        cmd.append("--stealth")
    if wait_until:
        cmd.extend(["--wait-until", wait_until])
    
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0:
            output = result.stdout.strip()
            # Try to parse as JSON
            try:
                output = json.loads(output)
            except json.JSONDecodeError:
                pass
            
            return {
                "url": url,
                "success": True,
                "data": output
            }
        else:
            return {
                "url": url,
                "success": False,
                "error": result.stderr.strip() or "Unknown error"
            }
            
    except subprocess.TimeoutExpired:
        return {
            "url": url,
            "success": False,
            "error": "Timeout"
        }
    except Exception as e:
        return {
            "url": url,
            "success": False,
            "error": str(e)
        }


def batch_scrape(urls: List[str], extract: Optional[str] = None,
                 stealth: bool = False, concurrency: int = 10,
                 wait_until: str = "load") -> List[Dict[str, Any]]:
    """Scrape multiple URLs in parallel."""
    results = []
    
    with ThreadPoolExecutor(max_workers=concurrency) as executor:
        futures = {
            executor.submit(scrape_url, url, extract, stealth, wait_until): url 
            for url in urls
        }
        
        for future in as_completed(futures):
            result = future.result()
            results.append(result)
            
            # Progress indicator
            success_count = sum(1 for r in results if r["success"])
            print(f"\rProgress: {len(results)}/{len(urls)} ({success_count} succeeded)", 
                  end='', file=sys.stderr)
    
    print(file=sys.stderr)  # New line after progress
    return results


def main():
    parser = argparse.ArgumentParser(description="Batch scrape URLs using Obscura")
    parser.add_argument("input", help="Input file (CSV, JSON, or text with URLs)")
    parser.add_argument("--extract", help="JavaScript expression to evaluate")
    parser.add_argument("--output", "-o", help="Output JSON file")
    parser.add_argument("--concurrency", "-c", type=int, default=10,
                       help="Number of parallel workers")
    parser.add_argument("--stealth", action="store_true", help="Enable stealth mode")
    parser.add_argument("--wait-until", default="load",
                       choices=["load", "domcontentloaded", "networkidle0"],
                       help="When to consider page loaded")
    
    args = parser.parse_args()
    
    # Load URLs
    try:
        urls = load_urls(args.input)
        print(f"Loaded {len(urls)} URLs", file=sys.stderr)
    except Exception as e:
        print(f"Error loading URLs: {e}", file=sys.stderr)
        sys.exit(1)
    
    if not urls:
        print("No URLs found in input file", file=sys.stderr)
        sys.exit(1)
    
    # Scrape
    results = batch_scrape(
        urls=urls,
        extract=args.extract,
        stealth=args.stealth,
        concurrency=args.concurrency,
        wait_until=args.wait_until
    )
    
    # Output
    output = {
        "total": len(results),
        "succeeded": sum(1 for r in results if r["success"]),
        "failed": sum(1 for r in results if not r["success"]),
        "results": results
    }
    
    if args.output:
        with open(args.output, 'w') as f:
            json.dump(output, f, indent=2)
        print(f"Results saved to {args.output}", file=sys.stderr)
    else:
        print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
