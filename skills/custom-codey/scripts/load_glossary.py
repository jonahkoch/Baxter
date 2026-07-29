#!/usr/bin/env python3
"""
load_glossary.py — Custom Codey's disambiguation helper

Loads glossary.md and parses it into three tiers:
- Tier 1: Synonyms (silently resolved)
- Tier 2: Soft assumptions (answer with stated assumption)
- Tier 3: Forced clarifications (must ask before answering)

Usage:
    python3 load_glossary.py                          # dump full glossary
    python3 load_glossary.py --check "header button"  # check if a phrase triggers anything
"""

import argparse
import json
import re
import sys
from pathlib import Path


def find_glossary():
    """Locate glossary.md — prefer fresh-fetched, fall back to bundled."""
    import os
    env_dir = os.environ.get("CUSTOM_CODEY_DATA_DIR")
    if env_dir:
        candidate = Path(env_dir) / "glossary.md"
        if candidate.exists():
            return candidate

    fresh = Path("/tmp/custom-codey-fresh/glossary.md")
    if fresh.exists():
        return fresh

    bundled = Path(__file__).parent.parent / "bundled_data" / "glossary.md"
    return bundled  # May not exist; caller handles


def parse_glossary(content):
    """
    Parse a tiered glossary into structured form.
    Expected structure:
        ## Tier 1: Synonyms
        - `phrase` → `canonical` (optional note)
        ## Tier 2: Soft Assumptions
        Phrase: `user phrase`
        Default: ...
        Also possible: ...
        Codey's opening line: ...
        ## Tier 3: Forced Clarifications
        Phrase trigger: `user phrase`
        Why this is dangerous: ...
        Question Codey should ask: ...
        Options to offer: [list]
    """
    sections = {"tier1_synonyms": [], "tier2_assumptions": [], "tier3_clarifications": []}

    # Split by H2 headings
    tier_pattern = re.compile(
        r"##\s+Tier\s*(\d)[^\n]*\n(.*?)(?=\n##\s+Tier|\Z)",
        re.DOTALL | re.IGNORECASE,
    )

    for match in tier_pattern.finditer(content):
        tier_num = match.group(1)
        body = match.group(2)

        if tier_num == "1":
            sections["tier1_synonyms"] = parse_tier1(body)
        elif tier_num == "2":
            sections["tier2_assumptions"] = parse_tier2(body)
        elif tier_num == "3":
            sections["tier3_clarifications"] = parse_tier3(body)

    return sections


def parse_tier1(body):
    """
    Parse Tier 1 synonyms: `phrase` → `canonical` (optional note)
    Returns list of {phrase, canonical, note}
    """
    entries = []
    # Match lines like: - `phrase` → `canonical` (note) or without backticks
    pattern = re.compile(
        r"[-*]\s*`?([^`→\n]+?)`?\s*→\s*`?([^`(\n]+?)`?\s*(?:\(([^)]+)\))?\s*$",
        re.MULTILINE,
    )
    for match in pattern.finditer(body):
        phrase = match.group(1).strip()
        canonical = match.group(2).strip()
        note = match.group(3).strip() if match.group(3) else None
        if phrase and canonical:
            entries.append({
                "phrase": phrase.lower(),
                "canonical": canonical,
                "note": note,
            })
    return entries


def parse_tier2(body):
    """
    Parse Tier 2 soft assumptions — structured blocks separated by --- or blank lines.
    Each block has: Phrase, Default, Also possible, Codey's opening line.
    """
    entries = []
    # Split by --- lines or consecutive blank lines
    blocks = re.split(r"\n-{3,}\n|\n\s*\n\s*\n", body)

    for block in blocks:
        if not block.strip():
            continue
        entry = {}

        phrase_m = re.search(r"Phrase:\s*`?([^`\n]+?)`?\s*(?:\n|$)", block, re.IGNORECASE)
        default_m = re.search(r"Default:\s*(.+?)(?:\n|$)", block, re.IGNORECASE)
        also_m = re.search(r"Also possible:\s*(.+?)(?:\n|$)", block, re.IGNORECASE)
        opening_m = re.search(
            r"(?:Codey'?s?\s*)?opening\s*line:\s*[\"']?(.+?)[\"']?\s*(?:\n|$)",
            block, re.IGNORECASE,
        )

        if phrase_m:
            entry["phrase"] = phrase_m.group(1).strip().lower()
        if default_m:
            entry["default"] = default_m.group(1).strip()
        if also_m:
            entry["also_possible"] = [
                s.strip() for s in re.split(r",|;", also_m.group(1)) if s.strip()
            ]
        if opening_m:
            entry["opening_line"] = opening_m.group(1).strip()

        if "phrase" in entry and "default" in entry:
            entries.append(entry)

    return entries


def parse_tier3(body):
    """
    Parse Tier 3 forced clarifications.
    Each block has: Phrase trigger, Why dangerous, Question to ask, Options to offer.
    """
    entries = []
    blocks = re.split(r"\n-{3,}\n|\n\s*\n\s*\n", body)

    for block in blocks:
        if not block.strip():
            continue
        entry = {}

        trigger_m = re.search(
            r"Phrase\s*trigger:\s*(.+?)(?:\n(?:Why|Question|Options)|\n\n|$)",
            block, re.IGNORECASE | re.DOTALL,
        )
        why_m = re.search(
            r"Why\s+this\s+is\s+dangerous:\s*(.+?)(?:\n(?:Question|Options)|\n\n|$)",
            block, re.IGNORECASE | re.DOTALL,
        )
        question_m = re.search(
            r"Question\s+Codey\s+should\s+ask:\s*(.+?)(?:\nOptions|\n\n|$)",
            block, re.IGNORECASE | re.DOTALL,
        )
        options_m = re.search(
            r"Options\s+to\s+offer:\s*(.+?)(?=\n---|\n\n\n|$)",
            block, re.IGNORECASE | re.DOTALL,
        )

        if trigger_m:
            entry["trigger"] = trigger_m.group(1).strip()
        if why_m:
            entry["why_dangerous"] = why_m.group(1).strip()
        if question_m:
            entry["question"] = question_m.group(1).strip()
        if options_m:
            options_text = options_m.group(1).strip()
            options = [
                re.sub(r"^[-*]\s*", "", line).strip()
                for line in options_text.split("\n")
                if line.strip() and not line.strip().startswith("#")
            ]
            entry["options"] = [o for o in options if o]

        if "trigger" in entry and "question" in entry:
            entries.append(entry)

    return entries


def check_phrase(glossary, phrase):
    """
    Check if the phrase triggers any glossary rule.
    Precedence (highest wins):
      - Tier 3 forced clarifications (safety first)
      - Tier 1 synonyms (exact mappings beat partial Tier 2 matches)
      - Tier 2 soft assumptions (partial but useful)
    """
    phrase_lower = phrase.lower()

    # Tier 3 — forced clarification (safety-critical, always wins)
    for entry in glossary.get("tier3_clarifications", []):
        trigger = entry.get("trigger", "").lower()
        keywords = re.findall(r"[a-z]+(?:\s+[a-z]+)?", trigger)
        for kw in keywords:
            if kw and kw in phrase_lower and len(kw) > 3:
                return {"tier": 3, "match": entry}

    # Tier 1 — synonyms (check before Tier 2 so specific phrases beat generic words)
    # Sort by phrase length descending — match longer synonyms first
    tier1_sorted = sorted(
        glossary.get("tier1_synonyms", []),
        key=lambda e: len(e.get("phrase", "")),
        reverse=True,
    )
    for entry in tier1_sorted:
        if entry.get("phrase", "") in phrase_lower:
            return {"tier": 1, "match": entry}

    # Tier 2 — soft assumption (fallback for partial matches)
    for entry in glossary.get("tier2_assumptions", []):
        if entry.get("phrase", "") in phrase_lower:
            return {"tier": 2, "match": entry}

    return {"tier": None, "match": None}


def main():
    parser = argparse.ArgumentParser(description="Load and query Custom Codey glossary")
    parser.add_argument("--check", help="Check a phrase against the glossary")
    parser.add_argument("--path", help="Override glossary path")
    args = parser.parse_args()

    glossary_path = Path(args.path) if args.path else find_glossary()

    if not glossary_path.exists():
        print(json.dumps({
            "error": f"glossary.md not found at {glossary_path}",
            "hint": "The glossary is required for disambiguation. "
                    "If this is a fresh install, check that bundled_data/glossary.md exists.",
        }, indent=2))
        sys.exit(1)

    content = glossary_path.read_text(encoding="utf-8")
    glossary = parse_glossary(content)

    if args.check:
        result = check_phrase(glossary, args.check)
        print(json.dumps(result, indent=2))
    else:
        # Dump summary
        summary = {
            "source": str(glossary_path),
            "tier1_count": len(glossary["tier1_synonyms"]),
            "tier2_count": len(glossary["tier2_assumptions"]),
            "tier3_count": len(glossary["tier3_clarifications"]),
            "tier1_synonyms": glossary["tier1_synonyms"],
            "tier2_assumptions": glossary["tier2_assumptions"],
            "tier3_clarifications": glossary["tier3_clarifications"],
        }
        print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
