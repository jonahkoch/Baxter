"""
Approval Gates — Human-in-the-loop for irreversible or risky actions.
"""
from enum import Enum
from typing import Optional
import sys


class GateAction(Enum):
    SPEND_REAL_TOKENS = "spend_real_tokens"
    PVP_ATTACK = "pvp_attack"
    CRYSTAL_TRANSFER = "crystal_transfer"
    EXPLORE_UNKNOWN = "explore_unknown"
    HIGH_VALUE_TRADE = "high_value_trade"


GATE_MESSAGES = {
    GateAction.SPEND_REAL_TOKENS: "🛑 GATE: This action spends real tokens. Approve? (yes/no): ",
    GateAction.PVP_ATTACK: "🛑 GATE: This is a PvP attack. Approve? (yes/no): ",
    GateAction.CRYSTAL_TRANSFER: "🛑 GATE: Sending crystals to another agent. Approve? (yes/no): ",
    GateAction.EXPLORE_UNKNOWN: "🛑 GATE: Entering unexplored/dangerous area. Approve? (yes/no): ",
    GateAction.HIGH_VALUE_TRADE: "🛑 GATE: High-value trade detected. Approve? (yes/no): ",
}


def check_gate(action: GateAction, context: str = "") -> bool:
    """
    Check if an action requires human approval.
    Returns True if approved or gate is disabled, False if rejected.
    """
    from config import GATES
    
    gate_key = action.value
    if not GATES.get(gate_key, False):
        return True  # Gate disabled, auto-approve
    
    message = GATE_MESSAGES.get(action, f"🛑 GATE: {action.value}. Approve? (yes/no): ")
    if context:
        message = f"{message}\n  Context: {context}\n"
    
    # In interactive mode, ask
    if sys.stdin.isatty():
        response = input(message).strip().lower()
        return response in ("yes", "y", "true", "1")
    else:
        # Non-interactive: default to DENY for safety
        print(f"[GATE BLOCKED] {action.value} — non-interactive mode, defaulting to DENY")
        return False


def gate_summary() -> str:
    """Return current gate configuration."""
    from config import GATES
    lines = ["Approval Gates:"]
    for gate, enabled in GATES.items():
        status = "🔒 ENABLED" if enabled else "✅ auto"
        lines.append(f"  {gate}: {status}")
    return "\n".join(lines)
