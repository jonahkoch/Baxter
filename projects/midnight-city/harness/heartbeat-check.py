#!/usr/bin/env python3
"""
Midnight City Harness — Heartbeat Checker

Run this every ~6 hours to check if the harness is alive and healthy.
If the harness is dead/crashed, restart it.

Usage:
    python3 heartbeat-check.py [--restart] [--alert]

    --restart    Restart harness if it's dead or stuck
    --alert      Print alert message for human review
"""
import json
import time
import subprocess
import sys
from pathlib import Path
from datetime import datetime

STATUS_FILE = Path("/root/.openclaw/workspace/projects/midnight-city/harness/harness-status.json")
HARNESS_SCRIPT = Path("/root/.openclaw/workspace/projects/midnight-city/harness/harness.py")

# How old can the status file be before we consider the harness dead?
MAX_AGE_MINUTES = 30  # If no update in 30 min, harness is likely dead


def read_status():
    """Read the harness status file."""
    if not STATUS_FILE.exists():
        return None
    try:
        return json.loads(STATUS_FILE.read_text())
    except (json.JSONDecodeError, IOError):
        return None


def is_harness_alive(status):
    """Check if the harness is alive based on status file timestamp."""
    if not status:
        return False, "No status file found"
    
    timestamp_ms = status.get("timestamp_ms", 0)
    age_minutes = (time.time() * 1000 - timestamp_ms) / 60000
    
    if age_minutes > MAX_AGE_MINUTES:
        return False, f"Status file is {age_minutes:.0f} minutes old (max: {MAX_AGE_MINUTES})"
    
    return True, f"Status file is {age_minutes:.0f} minutes old"


def is_agent_healthy(status):
    """Check if the game agent is in a healthy state."""
    if not status:
        return False, "No status data"
    
    details = status.get("details", {})
    
    # Check hunger
    hunger = details.get("hunger", 0)
    if hunger >= 90:
        return False, f"Hunger is critical: {hunger}%"
    
    # Check load
    load_state = details.get("load_state", "unknown")
    if load_state == "overburdened":
        return False, "Agent is overburdened"
    
    # Check if working (when in work phase)
    phase = status.get("phase", "")
    if phase == "working":
        is_working = details.get("is_working", False)
        if not is_working:
            return False, "Agent should be working but is idle"
    
    return True, "Agent looks healthy"


def restart_harness():
    """Restart the harness process."""
    # Kill any existing harness processes
    subprocess.run(["pkill", "-f", "harness.py --loop"], capture_output=True)
    time.sleep(2)
    
    # Start new harness in background
    proc = subprocess.Popen(
        ["python3", str(HARNESS_SCRIPT), "--loop"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        cwd=str(HARNESS_SCRIPT.parent),
    )
    return proc.pid


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Midnight City Harness Heartbeat")
    parser.add_argument("--restart", action="store_true", help="Restart harness if dead")
    parser.add_argument("--alert", action="store_true", help="Print alert for human")
    args = parser.parse_args()
    
    status = read_status()
    alive, alive_msg = is_harness_alive(status)
    healthy, health_msg = is_agent_healthy(status)
    
    now = datetime.now().isoformat()
    
    if not alive:
        print(f"[{now}] ⚠️ HARNESS DEAD: {alive_msg}")
        if args.restart:
            pid = restart_harness()
            print(f"[{now}] 🔄 Restarted harness (PID {pid})")
        elif args.alert:
            print(f"[{now}] 📢 ALERT: Harness needs restart!")
        return 1
    
    if not healthy:
        print(f"[{now}] ⚠️ AGENT UNHEALTHY: {health_msg}")
        if args.alert:
            print(f"[{now}] 📢 ALERT: Agent needs attention!")
        return 1
    
    print(f"[{now}] ✅ Harness alive ({alive_msg}), Agent healthy ({health_msg})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
