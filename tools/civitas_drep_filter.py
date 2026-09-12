#!/usr/bin/env python3
"""
Civitas Explorer DRep Filter
Fetches and filters Cardano DReps by attendance and transparency scores.

Usage:
    python3 civitas_drep_filter.py
    python3 civitas_drep_filter.py --min-attendance 75 --min-transparency 80
    python3 civitas_drep_filter.py --output json --limit 50
    python3 civitas_drep_filter.py --sort-by power --sort-dir desc
"""

import argparse
import json
import sys
import urllib.request
from datetime import datetime, timezone
from typing import Any

API_URL = "https://www.civitasexplorer.com/api/accountability"
SPECIAL_DREPS = {"drep_always_abstain", "drep_always_no_confidence"}


def fetch_data(type_filter: str = "drep") -> dict[str, Any]:
    """Fetch accountability data from Civitas Explorer API."""
    url = f"{API_URL}?type={type_filter}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})

    print(f"Fetching data from Civitas Explorer...", file=sys.stderr)
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = json.load(resp)

    print(
        f"Loaded {len(data.get('dreps', []))} DReps, "
        f"{data.get('proposalCount', 0)} proposals "
        f"(generated: {data.get('generatedAt', 'unknown')})",
        file=sys.stderr,
    )
    return data


def compute_eligible_proposals(data: dict[str, Any]) -> set[str]:
    """
    Compute which proposals DReps were eligible to vote on.
    Matches frontend logic: proposal submittedEpoch >= drepParticipationStartEpoch
    OR has DRep votes recorded.
    """
    proposals = data.get("proposalInfo", {})
    start_epoch = data.get("drepParticipationStartEpoch", 534)
    eligible = set()

    for pid, pinfo in proposals.items():
        submitted_epoch = pinfo.get("submittedEpoch", 0)
        drep_votes = pinfo.get("voteStats", {}).get("drep", {}).get("total", 0)
        if (submitted_epoch and submitted_epoch >= start_epoch) or drep_votes > 0:
            eligible.add(pid)

    return eligible


def filter_dreps(
    data: dict[str, Any],
    min_attendance: float,
    min_transparency: float,
    eligible_proposals: set[str],
    min_power_ada: float = 0,
    status_filter: str | None = None,
) -> list[dict[str, Any]]:
    """Filter DReps by attendance, transparency, and optional criteria."""
    dreps = data.get("dreps", [])
    total_eligible = len(eligible_proposals)
    filtered = []

    for d in dreps:
        drep_id = d.get("id", "")
        if drep_id in SPECIAL_DREPS:
            continue

        # Attendance = votes cast on eligible proposals / total eligible proposals
        votes = d.get("votes", [])
        cast = sum(1 for v in votes if v.get("proposalId") in eligible_proposals)
        attendance = (cast / total_eligible * 100) if total_eligible > 0 else 0

        transparency = d.get("transparencyScore", 0)
        power = d.get("votingPowerAda", 0)
        status = d.get("status", "unknown")

        if attendance < min_attendance:
            continue
        if transparency < min_transparency:
            continue
        if power < min_power_ada:
            continue
        if status_filter and status.lower() != status_filter.lower():
            continue

        # Compute consistency if available
        consistency = d.get("consistency", 0)

        # Extract profile info
        profile = d.get("profile", {})

        filtered.append({
            "name": d.get("name") or profile.get("name") or "Unnamed",
            "id": drep_id,
            "status": status,
            "attendance_pct": round(attendance, 2),
            "transparency_pct": round(transparency, 2),
            "consistency_pct": round(consistency, 2) if consistency else None,
            "votes_cast": cast,
            "votes_eligible": total_eligible,
            "voting_power_ada": round(power, 4),
            "profile": {
                "bio": profile.get("bio", ""),
                "motivations": profile.get("motivations", ""),
                "objectives": profile.get("objectives", ""),
                "qualifications": profile.get("qualifications", ""),
                "email": profile.get("email", ""),
                "image_url": profile.get("imageUrl", ""),
                "links": profile.get("references", []),
            } if profile else None,
        })

    return filtered


def sort_dreps(dreps: list[dict], sort_by: str, direction: str) -> list[dict]:
    """Sort DReps by specified field."""
    reverse = direction.lower() == "desc"
    key_map = {
        "attendance": lambda x: x["attendance_pct"],
        "transparency": lambda x: x["transparency_pct"],
        "power": lambda x: x["voting_power_ada"],
        "name": lambda x: x["name"].lower(),
        "consistency": lambda x: x["consistency_pct"] or 0,
    }
    key_fn = key_map.get(sort_by, key_map["transparency"])
    return sorted(dreps, key=key_fn, reverse=reverse)


def output_json(dreps: list[dict], meta: dict, pretty: bool = True) -> str:
    """Format output as JSON."""
    result = {
        "meta": meta,
        "count": len(dreps),
        "dreps": dreps,
    }
    indent = 2 if pretty else None
    return json.dumps(result, indent=indent, ensure_ascii=False)


def output_csv(dreps: list[dict]) -> str:
    """Format output as CSV."""
    import csv
    import io

    if not dreps:
        return "No matching DReps found."

    output = io.StringIO()
    fieldnames = [
        "name", "id", "status", "attendance_pct", "transparency_pct",
        "votes_cast", "votes_eligible", "voting_power_ada",
    ]
    writer = csv.DictWriter(output, fieldnames=fieldnames, extrasaction="ignore")
    writer.writeheader()
    writer.writerows(dreps)
    return output.getvalue()


def output_table(dreps: list[dict], limit: int | None = None) -> str:
    """Format output as a readable text table."""
    if not dreps:
        return "No matching DReps found."

    lines = []
    lines.append(f"{'Name':<35} {'Attendance':>12} {'Transparency':>12} {'Power (ADA)':>18}")
    lines.append("-" * 80)

    for d in (dreps[:limit] if limit else dreps):
        name = d["name"][:34] if len(d["name"]) <= 34 else d["name"][:31] + "..."
        lines.append(
            f"{name:<35} "
            f"{d['attendance_pct']:>10.1f}% "
            f"{d['transparency_pct']:>10.1f}% "
            f"{d['voting_power_ada']:>18,.0f}"
        )

    if limit and len(dreps) > limit:
        lines.append(f"\n... and {len(dreps) - limit} more (use --limit 0 to show all)")

    lines.append(f"\nTotal: {len(dreps)} DReps")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="Filter Cardano DReps from Civitas Explorer by attendance and transparency."
    )
    parser.add_argument(
        "--min-attendance", type=float, default=69.0,
        help="Minimum attendance percentage (default: 69)"
    )
    parser.add_argument(
        "--min-transparency", type=float, default=67.0,
        help="Minimum transparency percentage (default: 67)"
    )
    parser.add_argument(
        "--min-power", type=float, default=0,
        help="Minimum voting power in ADA (default: 0)"
    )
    parser.add_argument(
        "--status", type=str, default=None,
        help="Filter by status: active, inactive, retired, registered"
    )
    parser.add_argument(
        "--sort-by", type=str, default="transparency",
        choices=["attendance", "transparency", "power", "name", "consistency"],
        help="Sort field (default: transparency)"
    )
    parser.add_argument(
        "--sort-dir", type=str, default="desc",
        choices=["asc", "desc"],
        help="Sort direction (default: desc)"
    )
    parser.add_argument(
        "--output", type=str, default="table",
        choices=["table", "json", "csv"],
        help="Output format (default: table)"
    )
    parser.add_argument(
        "--limit", type=int, default=50,
        help="Limit rows in table output (0 = unlimited, default: 50)"
    )
    parser.add_argument(
        "--save", type=str, default=None,
        help="Save full JSON output to file path"
    )

    args = parser.parse_args()

    # Fetch data
    data = fetch_data()
    eligible = compute_eligible_proposals(data)

    # Filter
    filtered = filter_dreps(
        data,
        min_attendance=args.min_attendance,
        min_transparency=args.min_transparency,
        eligible_proposals=eligible,
        min_power_ada=args.min_power,
        status_filter=args.status,
    )

    # Sort
    filtered = sort_dreps(filtered, args.sort_by, args.sort_dir)

    # Build metadata
    meta = {
        "source": "Civitas Explorer",
        "api_url": API_URL,
        "generated_at": data.get("generatedAt"),
        "latest_epoch": data.get("latestEpoch"),
        "eligible_proposals": len(eligible),
        "filters": {
            "min_attendance_pct": args.min_attendance,
            "min_transparency_pct": args.min_transparency,
            "min_power_ada": args.min_power,
            "status": args.status,
        },
        "sorted_by": args.sort_by,
        "sort_direction": args.sort_dir,
        "fetched_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }

    # Output
    if args.output == "json":
        print(output_json(filtered, meta))
    elif args.output == "csv":
        print(output_csv(filtered))
    else:
        limit = args.limit if args.limit > 0 else None
        print(output_table(filtered, limit))

    # Save to file if requested
    if args.save:
        with open(args.save, "w", encoding="utf-8") as f:
            f.write(output_json(filtered, meta))
        print(f"\nSaved full results to {args.save}", file=sys.stderr)


if __name__ == "__main__":
    main()
