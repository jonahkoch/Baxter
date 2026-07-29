#!/usr/bin/env python3
"""
search_data.py — Custom Codey's lookup helper

Finds the most relevant markdown file(s) in the data directory for a user query,
parses them, and returns structured results: selectors, snippets, pro tips, and
nuances extracted from callout blocks.

Usage:
    python3 search_data.py --query "header button" --category globals
    python3 search_data.py --query "image" --category blocks
    python3 search_data.py --query "mobile menu" --category auto  # auto-detect category

The script prefers bundled_data/ (ships with the skill) but can fall back to
live-fetched data if the caller has pre-staged it in a temp directory.
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

# Keyword hints for category auto-detection
CATEGORY_HINTS = {
    "blocks": [
        "block", "text", "image block", "button block", "summary", "form",
        "gallery block", "video block", "audio", "markdown", "code block",
        "archive", "accordion", "calendar", "chart", "donation", "embed",
        "reservations", "line block", "map", "menu block", "newsletter",
        "digital product", "quote", "scrolling", "search block",
        "social links", "tag cloud", "shape", "content link", "product block",
    ],
    "globals": [
        "header", "footer", "mobile menu", "cookie alert", "announcement bar",
        "cookie", "popup", "promotional", "search results", "cart page",
        "shopping cart", "color theme", "site title", "logo", "nav",
        "navigation", "mobile info bar", "hamburger", "burger",
    ],
    "collections": [
        "blog", "blog post", "events", "event", "portfolio", "project",
        "video collection", "videos collection", "store", "product page",
        "shop", "collection page",
    ],
    "sections": [
        "page section", "fluid engine", "gallery section", "list section",
        "people section", "section background", "section layout",
    ],
    "standard-page": [
        "collection id", "per-page", "specific page", "one page only",
        "standard page", "custom font on this page",
    ],
}


def find_data_dir():
    """
    Locate the data directory. Priority:
    1. CUSTOM_CODEY_DATA_DIR env var (for testing/override)
    2. /tmp/custom-codey-fresh/ (if update_check.py staged fresh data there)
    3. bundled_data/ (default — ships with the skill)
    """
    env_dir = os.environ.get("CUSTOM_CODEY_DATA_DIR")
    if env_dir and Path(env_dir).is_dir():
        return Path(env_dir)

    fresh_dir = Path("/tmp/custom-codey-fresh")
    if fresh_dir.is_dir() and any(fresh_dir.iterdir()):
        return fresh_dir

    # Default: bundled_data is a sibling of scripts/
    return Path(__file__).parent.parent / "bundled_data"


def detect_category(query):
    """Guess which category folder to search based on query keywords."""
    query_lower = query.lower()

    # Score each category by how many of its hints appear in the query
    scores = {}
    for cat, hints in CATEGORY_HINTS.items():
        score = sum(1 for h in hints if h in query_lower)
        if score > 0:
            scores[cat] = score

    if not scores:
        return None

    # Return the highest-scoring category
    return max(scores, key=scores.get)


def load_file_list(data_dir, category):
    """Return list of .md files in the target category folder."""
    if category == "standard-page":
        f = data_dir / "standard-page.md"
        return [f] if f.exists() else []

    if category == "glossary":
        f = data_dir / "glossary.md"
        return [f] if f.exists() else []

    folder = data_dir / category
    if not folder.is_dir():
        return []

    return sorted(folder.glob("*.md"))


def score_file_against_query(file_path, query):
    """
    Score a markdown file by keyword overlap with the query.
    Higher score = more relevant.
    """
    try:
        content = file_path.read_text(encoding="utf-8").lower()
    except Exception:
        return 0

    query_words = set(re.findall(r"\w+", query.lower()))
    # Skip extremely common words
    stopwords = {
        "a", "an", "the", "is", "are", "for", "to", "of", "on", "in",
        "my", "i", "how", "do", "can", "want", "change", "make",
    }
    query_words -= stopwords

    if not query_words:
        return 0

    score = 0
    # Filename match is a strong signal
    filename_lower = file_path.stem.lower()
    for word in query_words:
        if word in filename_lower:
            score += 10

    # Body matches
    for word in query_words:
        score += content.count(word)

    return score


def extract_selectors(content):
    """
    Extract CSS selectors from markdown tables.
    Pattern: | description | .selector-name |
    Returns list of (description, selector) tuples.
    """
    selectors = []
    # Match table rows with two cells, second starting with . # or [
    pattern = r"\|\s*([^|]+?)\s*\|\s*([.#\[][^|]+?)\s*\|"
    for match in re.finditer(pattern, content):
        desc = match.group(1).strip()
        sel = match.group(2).strip()
        # Skip header rows
        if desc.lower() in ("name", "selector", "---"):
            continue
        if desc and sel and not sel.startswith("---"):
            selectors.append({"description": desc, "selector": sel})
    return selectors


def extract_code_snippets(content):
    """
    Extract fenced code blocks (```css or ```html or ```javascript etc).
    Also pulls the heading immediately preceding each block as the title.
    """
    snippets = []
    # Find headings and code blocks in order
    lines = content.split("\n")
    current_heading = None
    in_code = False
    code_lang = ""
    code_lines = []

    for line in lines:
        # Track headings
        heading_match = re.match(r"^#{1,6}\s+(.+)$", line)
        if heading_match and not in_code:
            current_heading = heading_match.group(1).strip()
            continue

        # Also track bold-title lists like "- **Snippet name**"
        bold_list_match = re.match(r"^\s*[-*]\s+\*\*(.+?)\*\*\s*$", line)
        if bold_list_match and not in_code:
            current_heading = bold_list_match.group(1).strip()
            continue

        # Code block start
        code_start = re.match(r"^```(\w*)\s*$", line)
        if code_start and not in_code:
            in_code = True
            code_lang = code_start.group(1) or "css"
            code_lines = []
            continue

        # Code block end
        if line.strip() == "```" and in_code:
            in_code = False
            if code_lines:
                snippets.append({
                    "title": current_heading or "Untitled snippet",
                    "language": code_lang,
                    "code": "\n".join(code_lines).strip(),
                })
            continue

        if in_code:
            code_lines.append(line)

    return snippets


def extract_pro_tips(content):
    """
    Extract pro tips from Notion-style callouts.
    Patterns to catch:
    - <aside>💡 **PRO TIP** ... </aside>
    - <aside>🚨 ... </aside> (warnings)
    - Markdown blockquotes starting with 💡 or ⚠️ or 🚨
    """
    tips = []

    # Notion-exported callouts (using aside tag)
    aside_pattern = r"<aside>\s*(.*?)</aside>"
    for match in re.finditer(aside_pattern, content, re.DOTALL):
        tip_text = match.group(1).strip()
        # Detect severity from emoji
        severity = "tip"
        if "🚨" in tip_text or "⚠" in tip_text:
            severity = "warning"
        # Strip markdown/html noise
        clean = re.sub(r"\*\*|__", "", tip_text)
        tips.append({"severity": severity, "text": clean.strip()})

    return tips


def extract_version_notes(content):
    """
    Extract version-specific sections (### Version 7.1 Only / ### Brine Theme etc).
    These are critical because they tell Codey which version/theme a selector belongs to.
    """
    notes = []
    # Match ### headings with version or theme info
    pattern = r"###\s+(Version\s*\d\.?\d?\s*Only|.*?Theme.*?\(Version.*?\)|.*?Selectors?\s*\(Version.*?\))"
    for match in re.finditer(pattern, content, re.IGNORECASE):
        notes.append(match.group(1).strip())
    return notes


def extract_last_updated(content):
    """
    Pull the 'Last Updated: DATE' line from the top of the file.
    Notion exports this as a metadata line like 'Last Updated: September 22, 2025'
    """
    match = re.search(r"Last Updated:\s*(.+?)(?:\n|$)", content)
    if match:
        return match.group(1).strip()
    return None


def extract_compatible_versions(content):
    """Pull 'Compatible Versions: 7, 7.1' from file metadata."""
    match = re.search(r"Compatible Versions:\s*(.+?)(?:\n|$)", content)
    if match:
        return match.group(1).strip()
    return None


def parse_markdown_file(file_path):
    """
    Parse a single markdown file into a structured dict.
    This is the main extraction function — everything the skill needs to answer
    a question comes from here.
    """
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception as e:
        return {"error": f"Could not read {file_path}: {e}"}

    return {
        "file": str(file_path.name),
        "path": str(file_path),
        "last_updated": extract_last_updated(content),
        "compatible_versions": extract_compatible_versions(content),
        "version_notes": extract_version_notes(content),
        "selectors": extract_selectors(content),
        "snippets": extract_code_snippets(content),
        "pro_tips": extract_pro_tips(content),
        "raw_content": content,  # Full text for Codey to read if needed
    }


def main():
    parser = argparse.ArgumentParser(description="Custom Codey data lookup")
    parser.add_argument("--query", required=True, help="User's question text")
    parser.add_argument(
        "--category",
        default="auto",
        choices=["auto", "blocks", "globals", "collections", "sections",
                 "standard-page", "glossary"],
        help="Which data category to search (default: auto-detect)",
    )
    parser.add_argument(
        "--max-results", type=int, default=3,
        help="Maximum number of matching files to return (default: 3)",
    )
    parser.add_argument(
        "--data-dir", default=None,
        help="Override data directory path (default: bundled_data/)",
    )
    args = parser.parse_args()

    # Resolve data directory
    if args.data_dir:
        data_dir = Path(args.data_dir)
    else:
        data_dir = find_data_dir()

    if not data_dir.exists():
        print(json.dumps({
            "error": f"Data directory not found: {data_dir}",
            "hint": "The skill's bundled_data folder may be empty. "
                    "Try running update_check.py to fetch fresh data."
        }, indent=2))
        sys.exit(1)

    # Resolve category
    category = args.category
    if category == "auto":
        detected = detect_category(args.query)
        if detected:
            category = detected
        else:
            # If we can't detect, search across all categories
            category = None

    # Get candidate files
    if category:
        files = load_file_list(data_dir, category)
        categories_searched = [category]
    else:
        files = []
        categories_searched = []
        for cat in ["blocks", "globals", "collections", "sections"]:
            files.extend(load_file_list(data_dir, cat))
            categories_searched.append(cat)
        # Also include standard-page.md
        files.extend(load_file_list(data_dir, "standard-page"))
        categories_searched.append("standard-page")

    if not files:
        print(json.dumps({
            "error": "No data files found",
            "searched_in": str(data_dir),
            "category": category or "all",
            "hint": "bundled_data/ may be empty. Run update_check.py to populate."
        }, indent=2))
        sys.exit(1)

    # Score and rank
    scored = [(f, score_file_against_query(f, args.query)) for f in files]
    scored = [(f, s) for f, s in scored if s > 0]
    scored.sort(key=lambda x: x[1], reverse=True)

    if not scored:
        print(json.dumps({
            "matches": [],
            "categories_searched": categories_searched,
            "message": "No files matched the query keywords. "
                       "Codey should use the fallback response or ask for clarification.",
        }, indent=2))
        return

    # Parse top matches
    top_matches = scored[: args.max_results]
    results = []
    for file_path, score in top_matches:
        parsed = parse_markdown_file(file_path)
        parsed["match_score"] = score
        results.append(parsed)

    output = {
        "query": args.query,
        "category": category or "all",
        "data_source": str(data_dir),
        "matches": results,
    }

    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
