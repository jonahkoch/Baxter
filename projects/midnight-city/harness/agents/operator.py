"""
Operator Agent — Execute actions via the game API.
"""
import subprocess
import json
from typing import Dict, Any, Optional
from pathlib import Path

SKILL_DIR = Path("/root/.openclaw/workspace/skills/midnight-city-direct-control")


def _run_command(cmd: list, timeout: int = 120) -> Dict[str, Any]:
    """Run a mcity-control command and return parsed JSON."""
    full_cmd = ["node", str(SKILL_DIR / "scripts" / "mcity-control.mjs")] + cmd
    result = subprocess.run(
        full_cmd,
        capture_output=True,
        text=True,
        cwd=str(SKILL_DIR),
        timeout=timeout,
    )
    
    if result.returncode != 0:
        return {
            "error": True,
            "returncode": result.returncode,
            "stderr": result.stderr[:500],
            "stdout": result.stdout[:500],
        }
    
    try:
        # The mcity-control output is clean JSON from the first line
        stdout = result.stdout.strip()
        if stdout:
            return json.loads(stdout)
        return {"error": True, "parse_error": "Empty output"}
    except json.JSONDecodeError as e:
        return {"error": True, "parse_error": str(e), "stdout": result.stdout[:500]}


def execute_action(action_type: str, params: Dict[str, Any], state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Execute a decided action.
    Returns the outcome.
    """
    if action_type == "eat":
        return _run_command(["eat"])
    
    elif action_type == "buy_food":
        # Buy matcha_smoothie from Smoothies Matcha
        return _run_command(["trade", "Smoothies Matcha", "matcha_smoothie", "1"])
    
    elif action_type == "sell_meme_coins":
        # Sell all meme coins to Central Crypto Merchant
        meme_coin = state.get("agent", {}).get("memeCoin", 0)
        if meme_coin > 0:
            return _run_command(["trade", "Central Crypto Merchant", "meme_coin", str(meme_coin)])
        return {"error": True, "reason": "No meme coins to sell"}
    
    elif action_type == "trade":
        # Generic trade
        merchant = params.get("merchant", "Central Crypto Merchant")
        item = params.get("item", "meme_coin")
        qty = params.get("quantity", 1)
        return _run_command(["trade", merchant, item, str(qty)])
    
    elif action_type == "grind":
        grind_type = params.get("grind_type", "crypto_terminal")
        if grind_type == "crypto_terminal":
            return _run_command(["gather", "crypto_terminal"])
        else:
            return _run_command(["work"])
    
    elif action_type == "continue_work":
        # Just verify work is still active
        return _run_command(["context"])
    
    elif action_type == "reduce_load":
        # Check what else we can sell
        inventory = _run_command(["inventory"])
        return inventory
    
    else:
        return {"error": True, "reason": f"Unknown action type: {action_type}"}


def start_work() -> Dict[str, Any]:
    """
    Start continuing profession work.
    Returns the outcome.
    """
    return _run_command(["work"])


def stop_work() -> Dict[str, Any]:
    """
    Stop continuing profession work.
    Returns the outcome.
    """
    return _run_command(["stop-work"])


def start_maintenance_behaviors(duration: str = "2m") -> subprocess.Popen:
    """
    Start maintenance behaviors (eat, buy food, sell) in the background.
    """
    behaviors = '[{"name":"eat-when-hungry"},{"name":"keep-food","params":{"minimumFood":50}},{"name":"sell-when-loaded"}]'
    cmd = [
        "node", str(SKILL_DIR / "scripts" / "mcity-behavior.mjs"),
        "run", behaviors, duration
    ]
    
    process = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        cwd=str(SKILL_DIR),
    )
    
    return process


def format_outcome(outcome: Dict[str, Any]) -> str:
    """Format the outcome for display."""
    if "error" in outcome:
        details = outcome.get('reason') or outcome.get('stderr') or outcome.get('parse_error') or str(outcome)[:200]
        return f"❌ Error: {details}"
    
    status = outcome.get("outcome", {}).get("status", "unknown")
    if status == "confirmed":
        return "✅ Confirmed"
    elif status == "failed":
        return f"❌ Failed: {outcome.get('outcome', {}).get('reason', 'Unknown')}"
    elif status == "pending":
        return "⏳ Pending..."
    else:
        return f"Status: {status}"
