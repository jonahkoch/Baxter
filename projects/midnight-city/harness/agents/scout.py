"""
Scout Agent — Read game state and report current conditions.
"""
import subprocess
import json
import time
from typing import Dict, Any, Optional
from pathlib import Path

SKILL_DIR = Path("/root/.openclaw/workspace/skills/midnight-city-direct-control")

# Connection state (shared across scout calls)
_last_lease_expires = 0
_agent_id = "user-agent-66b0ebf2-f709-447a-b8e2-24d23a0f2fc3"


def _update_lease(expires_at):
    """Update the global lease expiry timestamp."""
    global _last_lease_expires
    if expires_at:
        _last_lease_expires = expires_at


def _ensure_connected() -> bool:
    """Ensure we have a valid lease. Reconnect if stale or missing."""
    global _last_lease_expires
    
    # If lease is still fresh (with 30s buffer), no need to reconnect
    if _last_lease_expires > (time.time() * 1000) + 30000:
        return True
    
    # Try to connect
    result = subprocess.run(
        ["node", str(SKILL_DIR / "scripts" / "mcity-control.mjs"), "connect", _agent_id],
        capture_output=True,
        text=True,
        cwd=str(SKILL_DIR),
        timeout=30,
    )
    
    if result.returncode != 0:
        return False
    
    try:
        data = json.loads(result.stdout.strip())
        if data.get("connected"):
            _last_lease_expires = data["lease"]["expiresAt"]
            return True
    except (json.JSONDecodeError, KeyError):
        pass
    
    return False


def _run_command(cmd: list, timeout: int = 60) -> Dict[str, Any]:
    """Run a mcity-control command and return parsed JSON.
    
    Auto-connects first if no valid lease exists.
    """
    # Ensure connection before every command
    _ensure_connected()
    
    full_cmd = ["node", str(SKILL_DIR / "scripts" / "mcity-control.mjs")] + cmd
    result = subprocess.run(
        full_cmd,
        capture_output=True,
        text=True,
        cwd=str(SKILL_DIR),
        timeout=timeout,
    )
    
    if result.returncode != 0:
        # Check if it's a lease/auth error — try reconnect once
        stderr = result.stderr.lower()
        if any(x in stderr for x in ["401", "403", "404", "control_lost", "not connected"]):
            _last_lease_expires = 0  # Force reconnect
            if _ensure_connected():
                # Retry the command once
                result = subprocess.run(
                    full_cmd,
                    capture_output=True,
                    text=True,
                    cwd=str(SKILL_DIR),
                    timeout=timeout,
                )
                if result.returncode == 0:
                    try:
                        stdout = result.stdout.strip()
                        if stdout:
                            data = json.loads(stdout)
                            if isinstance(data, dict) and "lease" in data:
                                _update_lease(data["lease"].get("expiresAt"))
                            return data
                    except json.JSONDecodeError:
                        pass
        
        return {"error": True, "stderr": result.stderr[:500], "stdout": result.stdout[:500]}
    
    try:
        # For progression, use Python to extract only what we need (output is huge)
        if cmd[0] == "progression":
            return _parse_progression(result.stdout)
        
        # Parse the full stdout as JSON (the commands output clean JSON)
        stdout = result.stdout.strip()
        if stdout:
            data = json.loads(stdout)
            # Update lease expiry from response if present
            if isinstance(data, dict) and "lease" in data:
                _update_lease(data["lease"].get("expiresAt"))
            return data
        return {"error": True, "parse_error": "Empty output"}
    except json.JSONDecodeError as e:
        return {"error": True, "parse_error": str(e), "stdout": result.stdout[:500]}


def _parse_progression(stdout: str) -> Dict[str, Any]:
    """Parse progression output using Python to handle massive JSON."""
    import json
    # Pipe through Python to extract only what we need
    proc = subprocess.run(
        ["python3", "-c", """
import json, sys
data = json.load(sys.stdin)
print(json.dumps({
    'skills': data.get('skills', {}),
    'professionRank': data.get('professionRank', 0),
    'vitals': data.get('vitals', {}),
}))
"""],
        input=stdout,
        capture_output=True,
        text=True,
        timeout=30,
    )
    if proc.returncode == 0:
        return json.loads(proc.stdout)
    return {"error": True, "stderr": proc.stderr[:500]}


def ensure_connected():
    """Ensure the agent is connected. Reconnect if lease expired."""
    _ensure_connected()


def scout_game_state(agent_id: Optional[str] = None) -> Dict[str, Any]:
    """
    Scout the current game state.
    Returns a structured report of all relevant conditions.
    """
    # Auto-reconnect if needed
    ensure_connected()
    
    state = {
        "timestamp": None,
        "agent": {},
        "needs": {},
        "inventory": {},
        "progression": {},
        "context": {},
        "merchants": {},
        "errors": [],
    }
    
    # 1. Context (identity, location, active action)
    context = _run_command(["context"])
    if "error" in context:
        state["errors"].append(f"context: {context.get('stderr', 'unknown error')}")
    else:
        state["context"] = context
        state["timestamp"] = context.get("emittedAt")
        state["agent"]["name"] = context.get("agent", {}).get("name")
        state["agent"]["id"] = context.get("agent", {}).get("id")
        state["agent"]["location"] = context.get("currentSpace", {}).get("name")
        state["agent"]["isPerformingJob"] = context.get("agent", {}).get("isPerformingJob", False)
    
    # 2. Needs (hunger)
    needs = _run_command(["needs"])
    if "error" in needs:
        state["errors"].append(f"needs: {needs.get('stderr', 'unknown error')}")
    else:
        state["needs"] = needs
        # Hunger is a dict with 'value' (0-100 scale)
        hunger_raw = needs.get("hunger", {})
        if isinstance(hunger_raw, dict):
            hunger_value = hunger_raw.get("value", 0)
            state["agent"]["hunger"] = hunger_value
            state["agent"]["hungerPercent"] = hunger_value  # Already 0-100
        else:
            state["agent"]["hunger"] = hunger_raw
            state["agent"]["hungerPercent"] = hunger_raw
    
    # 3. Inventory (items, load, crystals)
    inventory = _run_command(["inventory"])
    if "error" in inventory:
        state["errors"].append(f"inventory: {inventory.get('stderr', 'unknown error')}")
    else:
        state["inventory"] = inventory
        state["agent"]["load"] = inventory.get("load", {}).get("excessWeight", 0)
        state["agent"]["loadState"] = inventory.get("load", {}).get("state", "unknown")
        state["agent"]["workSpeedPercent"] = inventory.get("load", {}).get("workSpeedPercent", 100)
        # Inventory data structure: top-level has 'inventory' dict and 'load' dict
        items = inventory.get("inventory", {})
        state["agent"]["crystal"] = items.get("crystal", 0)
        state["agent"]["memeCoin"] = items.get("meme_coin", 0)
        state["agent"]["foodCount"] = sum(
            items.get(food, 0)
            for food in ["matcha_smoothie", "to_go_food", "fish", "meat"]
        )
    
    # 4. Progression (skills, XP)
    progression = _run_command(["progression"])
    if "error" in progression:
        state["errors"].append(f"progression: {progression.get('stderr', 'unknown error')}")
    else:
        state["progression"] = progression
        skills = progression.get("skills", {})
        hacking = skills.get("hacking", {})
        state["agent"]["hackingLevel"] = hacking.get("level", 0)
        state["agent"]["hackingXP"] = hacking.get("xp", 0)
        state["agent"]["hackingNextLevelXP"] = hacking.get("nextLevelXp", 0)
        state["agent"]["professionRank"] = progression.get("professionRank", 0)
        vitals = progression.get("vitals", {})
        state["agent"]["health"] = vitals.get("health", 0)
        state["agent"]["maxHealth"] = vitals.get("maxHealth", 0)
    
    # 5. Merchants (for sell decisions)
    merchants = _run_command(["merchants"])
    if "error" in merchants:
        state["errors"].append(f"merchants: {merchants.get('stderr', 'unknown error')}")
    else:
        state["merchants"] = merchants
    
    return state


def _fmt(val, default="?"):
    """Format a value, handling None and string defaults."""
    if val is None:
        return default
    return val


def format_scout_report(state: Dict[str, Any]) -> str:
    """Format scout state as a readable report."""
    a = state.get("agent", {})
    
    crystal = a.get("crystal")
    meme_coin = a.get("memeCoin")
    hacking_xp = a.get("hackingXP", 0) or 0
    next_xp = a.get("hackingNextLevelXP", 0) or 0
    
    lines = [
        f"Agent: {_fmt(a.get('name'), 'Unknown')} (Hacking L{_fmt(a.get('hackingLevel'), '?')})",
        f"Location: {_fmt(a.get('location'), 'Unknown')}",
        f"Health: {_fmt(a.get('health'), '?')}/{_fmt(a.get('maxHealth'), '?')}",
        f"Hunger: {_fmt(a.get('hunger'), '?')} ({a.get('hungerPercent', 0) or 0:.0f}%)",
        f"Load: {_fmt(a.get('load'), '?')} ({_fmt(a.get('loadState'), '?')}) — Work speed: {a.get('workSpeedPercent', 100) or 100}%",
        f"Crystals: {crystal:,} | Meme Coins: {meme_coin:,} | Food: {_fmt(a.get('foodCount'), '?')}" if crystal is not None and meme_coin is not None else f"Crystals: {_fmt(crystal)} | Meme Coins: {_fmt(meme_coin)} | Food: {_fmt(a.get('foodCount'))}",
        f"XP: {hacking_xp:,} / {next_xp:,}",
        f"Performing Job: {a.get('isPerformingJob', False)}",
    ]
    
    if state.get("errors"):
        lines.append("")
        lines.append("Errors:")
        for err in state["errors"]:
            lines.append(f"  ⚠️ {err}")
    
    return "\n".join(lines)
