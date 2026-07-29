#!/usr/bin/env python3
"""
Check for epoch transitions and generate summary of proposal status changes.
Run this after fetch-proposals.py to capture enacted/expired/dropped proposals.
"""

import json
import urllib.request
from pathlib import Path
from datetime import datetime, timezone

KOIOS = "https://api.koios.rest/api/v1"
PROPOSALS_DIR = Path(__file__).parent.parent / "_proposals"
DATA_DIR = Path(__file__).parent.parent / "_data"
ARCHIVE_DIR = Path(__file__).parent.parent / "_epoch_summaries"

STATE_FILE = DATA_DIR / "epoch-state.json"


def koios(path, timeout=15):
    url = f"{KOIOS}{path}"
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.load(resp)


def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"last_checked_epoch": 0, "proposals_tracked": {}}


def save_state(state):
    STATE_FILE.write_text(json.dumps(state, indent=2))


def fmt_ada(lovelace):
    try:
        return f"{int(lovelace) / 1_000_000:,.0f}"
    except (ValueError, TypeError):
        return "0"


def get_proposal_status(p):
    """Determine final status from proposal data."""
    if p.get("enacted_epoch"):
        return "enacted", p["enacted_epoch"]
    if p.get("dropped_epoch"):
        return "dropped", p["dropped_epoch"]
    if p.get("expired_epoch"):
        return "expired", p["expired_epoch"]
    if p.get("ratified_epoch"):
        return "ratified", p["ratified_epoch"]
    return "active", None


def update_proposal_page(prop_id, status, epoch):
    """Update a proposal page with new status."""
    for filepath in PROPOSALS_DIR.glob("*.md"):
        content = filepath.read_text()
        if f"proposal_id: {prop_id}" in content:
            # Update status
            if "status: active" in content:
                content = content.replace("status: active", f"status: {status}")
                content = content.replace(
                    "---\n\n",
                    f"---\n\n**Status Update:** This proposal was {status} in epoch {epoch}.\n\n"
                )
                filepath.write_text(content)
                print(f"  Updated {filepath.name}: {status} in epoch {epoch}")
                return True
    return False


def generate_epoch_summary(epoch, changes):
    """Generate a summary page for the epoch."""
    ARCHIVE_DIR.mkdir(exist_ok=True)
    
    enacted = [c for c in changes if c["new_status"] == "enacted"]
    expired = [c for c in changes if c["new_status"] == "expired"]
    dropped = [c for c in changes if c["new_status"] == "dropped"]
    ratified = [c for c in changes if c["new_status"] == "ratified"]
    
    total_enacted_ada = sum(int(c.get("amount", 0)) for c in enacted)
    
    lines = [
        "---",
        f"layout: default",
        f'title: "Epoch {epoch} Summary"',
        f"epoch: {epoch}",
        f"date: {datetime.now(timezone.utc).strftime('%Y-%m-%d')}",
        "---",
        "",
        f"# Epoch {epoch} Governance Summary",
        "",
        f"Generated: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        "",
        "## Overview",
        "",
        f"- **Enacted:** {len(enacted)} proposal(s)"
    ]
    
    if total_enacted_ada > 0:
        lines.append(f"- **Treasury impact:** {fmt_ada(total_enacted_ada)} ADA")
    
    lines.extend([
        f"- **Expired:** {len(expired)} proposal(s)",
        f"- **Dropped:** {len(dropped)} proposal(s)",
        f"- **Ratified (pending enactment):** {len(ratified)} proposal(s)",
        "",
    ])
    
    if enacted:
        lines.extend([
            "## Enacted Proposals",
            "",
            "| Proposal | Type | Amount (ADA) |",
            "|----------|------|-------------|",
        ])
        for c in enacted:
            title = c.get("title", "Untitled")[:50]
            ptype = c.get("proposal_type", "?")
            amt = fmt_ada(c.get("amount", 0))
            lines.append(f"| [{title}...](_proposals/{c['slug']}) | {ptype} | {amt} |")
        lines.append("")
    
    if expired:
        lines.extend([
            "## Expired Proposals",
            "",
            "| Proposal | Type | Amount (ADA) |",
            "|----------|------|-------------|",
        ])
        for c in expired:
            title = c.get("title", "Untitled")[:50]
            ptype = c.get("proposal_type", "?")
            amt = fmt_ada(c.get("amount", 0))
            lines.append(f"| {title}... | {ptype} | {amt} |")
        lines.append("")
    
    if dropped:
        lines.extend([
            "## Dropped Proposals",
            "",
        ])
        for c in dropped:
            title = c.get("title", "Untitled")[:50]
            lines.append(f"- {title}... ({c.get('proposal_type', '?')})")
        lines.append("")
    
    lines.extend([
        "---",
        "",
        "[← Back to governance feed](index.md)",
    ])
    
    filepath = ARCHIVE_DIR / f"epoch-{epoch}.md"
    filepath.write_text("\n".join(lines))
    print(f"  Generated: {filepath}")


def main():
    PROPOSALS_DIR.mkdir(exist_ok=True)
    DATA_DIR.mkdir(exist_ok=True)
    
    # Get current epoch
    tip = koios("/tip", timeout=10)
    current_epoch = tip[0]["epoch_no"]
    print(f"Current epoch: {current_epoch}")
    
    state = load_state()
    last_epoch = state.get("last_checked_epoch", 0)
    print(f"Last checked: epoch {last_epoch}")
    
    # Only generate summary if we've crossed an epoch boundary
    if current_epoch <= last_epoch:
        print("No epoch transition detected. Exiting.")
        return
    
    print(f"Epoch transition detected: {last_epoch} → {current_epoch}")
    
    # Fetch all proposals to check status changes
    print("Fetching proposals...")
    proposals = koios("/proposal_list?limit=200", timeout=30)
    
    # Build lookup of tracked proposals
    tracked = state.get("proposals_tracked", {})
    changes = []
    
    for p in proposals:
        prop_id = p["proposal_id"]
        status, epoch = get_proposal_status(p)
        
        # Check if status changed from what we previously tracked
        prev = tracked.get(prop_id, {})
        prev_status = prev.get("status", "active")
        
        if status != prev_status and status != "active":
            # Status changed!
            meta_json = p.get("meta_json") or {}
            meta = meta_json.get("body", {}) if isinstance(meta_json, dict) else {}
            title = meta.get("title", "Untitled") if isinstance(meta, dict) else "Untitled"
            
            amount = 0
            withdrawals = p.get("withdrawal", [])
            if withdrawals:
                amount = sum(int(w.get("amount", 0)) for w in withdrawals)
            
            slug = prop_id.replace("gov_action", "gov-action")
            
            change = {
                "proposal_id": prop_id,
                "title": title,
                "new_status": status,
                "epoch": epoch,
                "proposal_type": p.get("proposal_type", "?"),
                "amount": amount,
                "slug": slug,
            }
            changes.append(change)
            
            # Update the proposal page
            update_proposal_page(prop_id, status, epoch)
        
        # Update tracked state
        tracked[prop_id] = {
            "status": status,
            "epoch": epoch,
            "last_seen": current_epoch,
        }
    
    # Generate summary if there were changes
    if changes:
        print(f"\nDetected {len(changes)} status changes:")
        for c in changes:
            print(f"  {c['new_status'].upper()}: {c['title'][:60]}...")
        
        # Generate summary for the epoch that just ended
        summary_epoch = current_epoch - 1
        generate_epoch_summary(summary_epoch, changes)
    else:
        print("\nNo status changes detected.")
    
    # Update state
    state["last_checked_epoch"] = current_epoch
    state["proposals_tracked"] = tracked
    save_state(state)
    print(f"\nUpdated state. Last checked: epoch {current_epoch}")


if __name__ == "__main__":
    main()
