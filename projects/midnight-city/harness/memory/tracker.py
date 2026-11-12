"""
XP Efficiency Tracker — Track which grinds are most XP-efficient.
Learns from session data over time.
"""
import json
import time
from pathlib import Path
from typing import Dict, List, Optional
from datetime import datetime

MEMORY_DIR = Path("/root/.openclaw/workspace/projects/midnight-city/harness/memory")
MEMORY_DIR.mkdir(parents=True, exist_ok=True)

XP_LOG_FILE = MEMORY_DIR / "xp-efficiency.json"


def _load_xp_log() -> Dict:
    """Load the XP efficiency log."""
    if XP_LOG_FILE.exists():
        with open(XP_LOG_FILE) as f:
            return json.load(f)
    return {"sessions": [], "grinds": {}}


def _save_xp_log(data: Dict):
    """Save the XP efficiency log."""
    with open(XP_LOG_FILE, "w") as f:
        json.dump(data, f, indent=2)


def record_session(
    grind_type: str,
    start_xp: int,
    end_xp: int,
    duration_minutes: float,
    skill: str = "hacking",
    notes: str = ""
):
    """
    Record a grinding session's XP efficiency.
    """
    xp_gained = end_xp - start_xp
    xp_per_hour = (xp_gained / duration_minutes) * 60 if duration_minutes > 0 else 0
    
    log = _load_xp_log()
    
    session = {
        "timestamp": int(time.time()),
        "datetime": datetime.utcnow().isoformat(),
        "grind_type": grind_type,
        "skill": skill,
        "start_xp": start_xp,
        "end_xp": end_xp,
        "xp_gained": xp_gained,
        "duration_minutes": duration_minutes,
        "xp_per_hour": round(xp_per_hour, 2),
        "notes": notes,
    }
    
    log["sessions"].append(session)
    
    # Update aggregate stats per grind type
    if grind_type not in log["grinds"]:
        log["grinds"][grind_type] = {
            "count": 0,
            "total_xp": 0,
            "total_minutes": 0,
            "avg_xp_per_hour": 0,
        }
    
    g = log["grinds"][grind_type]
    g["count"] += 1
    g["total_xp"] += xp_gained
    g["total_minutes"] += duration_minutes
    g["avg_xp_per_hour"] = round((g["total_xp"] / g["total_minutes"]) * 60, 2) if g["total_minutes"] > 0 else 0
    
    _save_xp_log(log)
    
    return session


def get_best_grind(skill: str = "hacking") -> Optional[str]:
    """
    Return the grind type with the highest average XP/hour for a skill.
    """
    log = _load_xp_log()
    candidates = []
    
    for grind_type, stats in log["grinds"].items():
        # Filter by skill if specified
        sessions = [s for s in log["sessions"] if s["grind_type"] == grind_type and s["skill"] == skill]
        if sessions:
            candidates.append((grind_type, stats["avg_xp_per_hour"]))
    
    if not candidates:
        return None
    
    candidates.sort(key=lambda x: x[1], reverse=True)
    return candidates[0][0]


def get_efficiency_report(skill: str = "hacking") -> str:
    """Return a human-readable efficiency report."""
    log = _load_xp_log()
    
    lines = [f"XP Efficiency Report ({skill}):"]
    lines.append(f"Total sessions recorded: {len(log['sessions'])}")
    lines.append("")
    
    # Filter grinds that have sessions for this skill
    relevant = {}
    for grind_type, stats in log["grinds"].items():
        sessions = [s for s in log["sessions"] if s["grind_type"] == grind_type and s["skill"] == skill]
        if sessions:
            relevant[grind_type] = stats
    
    if not relevant:
        lines.append("No data yet. Grind sessions will be recorded automatically.")
        return "\n".join(lines)
    
    lines.append("Grind types (sorted by avg XP/hour):")
    sorted_grinds = sorted(relevant.items(), key=lambda x: x[1]["avg_xp_per_hour"], reverse=True)
    for grind_type, stats in sorted_grinds:
        lines.append(
            f"  {grind_type}: {stats['avg_xp_per_hour']:.0f} XP/hr "
            f"({stats['count']} sessions, {stats['total_xp']:.0f} total XP)"
        )
    
    best = get_best_grind(skill)
    if best:
        lines.append("")
        lines.append(f"Recommended: {best}")
    
    return "\n".join(lines)


def get_recent_sessions(n: int = 5) -> List[Dict]:
    """Return the N most recent sessions."""
    log = _load_xp_log()
    return sorted(log["sessions"], key=lambda x: x["timestamp"], reverse=True)[:n]
