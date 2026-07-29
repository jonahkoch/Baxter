#!/usr/bin/env python3
"""
Fetch active governance proposals from Koios and generate Jekyll pages.
"""

import json
import re
import urllib.request
from pathlib import Path

KOIOS = "https://api.koios.rest/api/v1"
PROPOSALS_DIR = Path(__file__).parent.parent / "_proposals"
DATA_DIR = Path(__file__).parent.parent / "_data"


def koios(path, timeout=15):
    url = f"{KOIOS}{path}"
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.load(resp)


def fmt_ada(lovelace):
    try:
        return f"{int(lovelace) / 1_000_000:,.0f}"
    except (ValueError, TypeError):
        return "0"


def extract_context(content):
    """Extract context block from existing file front matter."""
    lines = content.splitlines()
    in_front = False
    in_context = False
    context_lines = []
    for line in lines:
        if line.strip() == "---":
            if not in_front:
                in_front = True
                continue
            else:
                break
        if in_front:
            if line.strip().startswith("context:"):
                in_context = True
                context_lines.append(line)
                continue
            if in_context:
                if line.startswith("  -") or line.startswith("    "):
                    context_lines.append(line)
                else:
                    break
    return "\n".join(context_lines) if context_lines else None


def main():
    PROPOSALS_DIR.mkdir(exist_ok=True)
    DATA_DIR.mkdir(exist_ok=True)

    print("Fetching proposals...")
    proposals = koios("/proposal_list?limit=100", timeout=30)
    print(f"Found {len(proposals)} proposals")

    with open(DATA_DIR / "proposals.json", "w") as f:
        json.dump(proposals, f, indent=2)

    active_ids = set()

    for p in proposals:
        prop_id = p["proposal_id"]
        active_ids.add(prop_id)

        meta = p.get("meta_json", {}).get("body", {})
        title = meta.get("title", "Untitled")
        abstract = meta.get("abstract", "")

        amount = "0"
        withdrawals = p.get("withdrawal", [])
        if withdrawals:
            total = sum(int(w.get("amount", 0)) for w in withdrawals)
            amount = fmt_ada(total)

        # Fetch vote summary with timeout
        v = {}
        try:
            votes = koios(f"/proposal_voting_summary?_proposal_id={prop_id}", timeout=10)
            v = votes[0] if votes else {}
        except Exception as e:
            print(f"  Vote fetch failed for {prop_id[:20]}: {e}")

        slug = re.sub(r"[^a-z0-9]+", "-", prop_id.lower()).strip("-")
        filepath = PROPOSALS_DIR / f"{slug}.md"

        # Build front matter
        fm = [
            "---",
            f"layout: proposal",
            f'title: "{title.replace(chr(34), chr(92)+chr(34))}"',
            f"proposal_id: {prop_id}",
            f"proposal_type: {p.get('proposal_type', '?')}",
            f"status: active",
            f"amount_ada: {amount}",
            f"proposed_epoch: {p.get('proposed_epoch', '?')}",
            f"expiration: {p.get('expiration', '?')}",
            f'meta_url: "{p.get("meta_url", "")}"',
            f'meta_hash: "{p.get("meta_hash", "")}"',
            f"drep_yes_pct: {v.get('drep_yes_pct', '?')}",
            f"drep_no_pct: {v.get('drep_no_pct', '?')}",
            f"drep_abstain_pct: {v.get('drep_abstain_pct', '?')}",
            f"drep_yes_votes: {v.get('drep_yes_votes_cast', '?')}",
            f"drep_no_votes: {v.get('drep_no_votes_cast', '?')}",
            f"drep_yes_power: {fmt_ada(v.get('drep_yes_vote_power', 0))}",
            f"drep_no_power: {fmt_ada(v.get('drep_no_vote_power', 0))}",
            f"committee_yes: {v.get('committee_yes_votes_cast', '?')}",
            f"committee_no: {v.get('committee_no_votes_cast', '?')}",
        ]

        # Preserve existing context
        if filepath.exists():
            existing = filepath.read_text()
            ctx = extract_context(existing)
            if ctx:
                fm.append(ctx)

        fm.append("---")

        # Abstract as body
        body = f"\n\n{abstract[:800] if abstract else 'No abstract provided.'}\n"

        filepath.write_text("\n".join(fm) + body)
        print(f"  Updated: {slug}.md")

    # Archive expired
    for filepath in PROPOSALS_DIR.glob("*.md"):
        content = filepath.read_text()
        if "status: active" in content:
            match = re.search(r"proposal_id:\s*(.+)", content)
            if match:
                prop_id = match.group(1).strip()
                if prop_id not in active_ids:
                    content = content.replace("status: active", "status: expired")
                    filepath.write_text(content)
                    print(f"Archived: {filepath.name}")

    print(f"\nDone. Active proposals: {len(active_ids)}")


if __name__ == "__main__":
    main()
