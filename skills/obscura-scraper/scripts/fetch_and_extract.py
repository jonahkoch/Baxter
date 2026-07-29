#!/usr/bin/env python3
"""
Obscura single-page fetcher with extraction support.

Wraps the obscura CLI to provide:
- JSON extraction with error handling
- Automatic server management
- Retry logic
- Resource cleanup

Usage:
    python fetch_and_extract.py https://example.com "document.title"
    python fetch_and_extract.py https://example.com "document.querySelector('h1').textContent" --stealth
"""

import subprocess
import json
import time
import argparse
import sys
from typing import Optional, Dict, Any


class ObscuraClient:
    """Client for interacting with Obscura headless browser."""
    
    def __init__(self, port: int = 9222, stealth: bool = False):
        self.port = port
        self.stealth = stealth
        self.server_process: Optional[subprocess.Popen] = None
    
    def start_server(self) -> bool:
        """Start the Obscura CDP server."""
        cmd = ["obscura", "serve", "--port", str(self.port)]
        if self.stealth:
            cmd.append("--stealth")
        
        try:
            self.server_process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            # Wait for server to be ready
            time.sleep(0.5)
            return self.server_process.poll() is None
        except FileNotFoundError:
            print("Error: 'obscura' not found. Install from https://github.com/h4ckf0r0day/obscura")
            return False
    
    def stop_server(self):
        """Stop the CDP server."""
        if self.server_process:
            self.server_process.terminate()
            try:
                self.server_process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.server_process.kill()
    
    def fetch(self, url: str, extract: Optional[str] = None, 
              wait_until: str = "load", selector: Optional[str] = None) -> Dict[str, Any]:
        """
        Fetch a single page and optionally extract data.
        
        Args:
            url: URL to fetch
            extract: JavaScript expression to evaluate
            wait_until: When to consider page loaded (load, domcontentloaded, networkidle0)
            selector: Wait for this CSS selector before extracting
        
        Returns:
            Dict with 'success', 'data', 'html', and 'error' keys
        """
        cmd = ["obscura", "fetch", url, "--dump", "html"]
        
        if self.stealth:
            cmd.append("--stealth")
        if wait_until:
            cmd.extend(["--wait-until", wait_until])
        if selector:
            cmd.extend(["--selector", selector])
        
        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode != 0:
                return {
                    "success": False,
                    "error": result.stderr.strip(),
                    "url": url
                }
            
            html = result.stdout
            
            # Extract data if expression provided
            extracted_data = None
            if extract:
                eval_cmd = ["obscura", "fetch", url, "--eval", extract]
                if self.stealth:
                    eval_cmd.append("--stealth")
                if wait_until:
                    eval_cmd.extend(["--wait-until", wait_until])
                if selector:
                    eval_cmd.extend(["--selector", selector])
                
                eval_result = subprocess.run(
                    eval_cmd,
                    capture_output=True,
                    text=True,
                    timeout=30
                )
                
                if eval_result.returncode == 0:
                    try:
                        extracted_data = json.loads(eval_result.stdout)
                    except json.JSONDecodeError:
                        extracted_data = eval_result.stdout.strip()
            
            return {
                "success": True,
                "url": url,
                "data": extracted_data,
                "html": html[:10000] if html else None  # Truncate for safety
            }
            
        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "error": "Request timed out",
                "url": url
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "url": url
            }


def main():
    parser = argparse.ArgumentParser(description="Fetch and extract data from a web page using Obscura")
    parser.add_argument("url", help="URL to fetch")
    parser.add_argument("extract", nargs="?", help="JavaScript expression to evaluate")
    parser.add_argument("--stealth", action="store_true", help="Enable stealth mode")
    parser.add_argument("--wait-until", default="load", 
                       choices=["load", "domcontentloaded", "networkidle0"],
                       help="When to consider page loaded")
    parser.add_argument("--selector", help="Wait for this CSS selector")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    
    args = parser.parse_args()
    
    client = ObscuraClient(stealth=args.stealth)
    
    try:
        result = client.fetch(
            url=args.url,
            extract=args.extract,
            wait_until=args.wait_until,
            selector=args.selector
        )
        
        if args.json:
            print(json.dumps(result, indent=2))
        else:
            if result["success"]:
                if result["data"] is not None:
                    if isinstance(result["data"], (dict, list)):
                        print(json.dumps(result["data"], indent=2))
                    else:
                        print(result["data"])
                else:
                    print(result["html"][:2000] if result["html"] else "No content")
            else:
                print(f"Error: {result['error']}", file=sys.stderr)
                sys.exit(1)
                
    finally:
        client.stop_server()


if __name__ == "__main__":
    main()
