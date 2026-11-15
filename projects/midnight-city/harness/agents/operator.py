"""
Operator Agent — Execute actions via the game API.
"""
import subprocess
import json
import time
from typing import Dict, Any, Optional
from pathlib import Path

SKILL_DIR = Path("/root/.openclaw/workspace/skills/midnight-city-direct-control")


# Track last known good connection
_last_lease_expires = 0
_agent_id = "user-agent-66b0ebf2-f709-447a-b8e2-24d23a0f2fc3"


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


def _run_command(cmd: list, timeout: int = 120) -> Dict[str, Any]:
    """Run a mcity-control command and return parsed JSON.
    
    Automatically reconnects if lease is stale.
    """
    global _last_lease_expires
    
    # Ensure connection before every command
    if not _ensure_connected():
        return {
            "error": True,
            "reason": "Failed to establish connection",
        }
    
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
            _last_lease_expires = 0  # Force reconnect on next call
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
                            return json.loads(stdout)
                    except json.JSONDecodeError:
                        pass
        
        return {
            "error": True,
            "returncode": result.returncode,
            "stderr": result.stderr[:500],
            "stdout": result.stdout[:500],
        }
    
    try:
        stdout = result.stdout.strip()
        if stdout:
            data = json.loads(stdout)
            # Update lease expiry from response if present
            if isinstance(data, dict) and "lease" in data:
                _last_lease_expires = data["lease"].get("expiresAt", _last_lease_expires)
            return data
        return {"error": True, "parse_error": "Empty output"}
    except json.JSONDecodeError as e:
        return {"error": True, "parse_error": str(e), "stdout": result.stdout[:500]}


def _wait_for_trade_completion(merchant: str, item: str, max_wait: int = 120) -> Dict[str, Any]:
    """Poll agent state after a trade to verify it completed.
    
    The agent may need to walk to the merchant, so we wait up to max_wait seconds
    checking if the trade went through.
    """
    import time
    from agents.scout import scout_game_state
    
    start = time.time()
    check_interval = 5
    
    while time.time() - start < max_wait:
        time.sleep(check_interval)
        state = scout_game_state()
        agent = state.get("agent", {})
        
        # Check if agent is still walking/moving toward merchant
        is_moving = agent.get("isMoving", False)
        current_action = agent.get("currentAction", "")
        
        if is_moving or "walk" in current_action.lower() or "move" in current_action.lower():
            # Still en route, keep waiting
            continue
        
        # Agent has arrived or wasn't moving — trade should be done
        # Return current state so caller can verify
        return {
            "status": "completed",
            "agent_state": agent,
            "waited_seconds": int(time.time() - start),
        }
    
    return {
        "status": "timeout",
        "reason": f"Trade did not complete within {max_wait}s",
        "waited_seconds": max_wait,
    }


def execute_action(action_type: str, params: Dict[str, Any], state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Execute a decided action.
    Returns the outcome.
    """
    if action_type == "eat":
        return _run_command(["eat"])
    
    elif action_type == "buy_food":
        # Buy matcha_smoothie from Central Smoothies Matcha Outlet
        result = _run_command(["trade", "Central Smoothies Matcha Outlet", "matcha_smoothie", "1"])
        if "error" not in result:
            wait_result = _wait_for_trade_completion("Central Smoothies Matcha Outlet", "matcha_smoothie")
            result["wait_result"] = wait_result
        return result
    
    elif action_type == "sell_meme_coins":
        # Sell all meme coins to Central Crypto Merchant
        meme_coin = state.get("agent", {}).get("memeCoin", 0)
        if meme_coin > 0:
            result = _run_command(["trade", "Central Crypto Merchant", "meme_coin", str(meme_coin)])
            if "error" not in result:
                wait_result = _wait_for_trade_completion("Central Crypto Merchant", "meme_coin")
                result["wait_result"] = wait_result
            return result
        return {"error": True, "reason": "No meme coins to sell"}
    
    elif action_type == "trade":
        # Generic trade
        merchant = params.get("merchant", "Central Crypto Merchant")
        item = params.get("item", "meme_coin")
        qty = params.get("quantity", 1)
        result = _run_command(["trade", merchant, item, str(qty)])
        if "error" not in result:
            wait_result = _wait_for_trade_completion(merchant, item)
            result["wait_result"] = wait_result
        return result
    
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
