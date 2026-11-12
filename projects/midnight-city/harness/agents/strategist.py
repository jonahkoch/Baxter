"""
Strategist Agent — Decide the next action given current state and goals.
"""
from typing import Dict, Any, List, Tuple
from config import HUNGER_THRESHOLD, LOAD_SELL_THRESHOLD, CRYSTAL_MINIMUM, FOOD_TARGET
from memory.tracker import get_best_grind, get_efficiency_report


def decide_next_action(state: Dict[str, Any]) -> Tuple[str, Dict[str, Any]]:
    """
    Given the current game state, decide what to do next.
    
    Returns: (action_type, action_params)
    """
    agent = state.get("agent", {})
    
    # === PRIORITY 1: Survival (Hunger) ===
    hunger_percent = agent.get("hungerPercent", 0)
    food_count = agent.get("foodCount", 0)
    
    if hunger_percent >= HUNGER_THRESHOLD:
        if food_count > 0:
            return "eat", {"reason": f"Hunger at {hunger_percent:.0f}%, eating carried food"}
        else:
            return "buy_food", {"reason": f"Hunger at {hunger_percent:.0f}%, no food — buying matcha_smoothie"}
    
    # === PRIORITY 2: Load Management ===
    load = agent.get("load", 0)
    load_state = agent.get("loadState", "normal")
    meme_coin = agent.get("memeCoin", 0)
    
    if load_state == "overburdened" or load > LOAD_SELL_THRESHOLD:
        if meme_coin > 0:
            return "trade", {
                "reason": f"Load {load} > {LOAD_SELL_THRESHOLD}, selling {meme_coin} meme_coin",
                "merchant": "Central Crypto Merchant",
                "item": "meme_coin",
                "quantity": meme_coin,
            }
        else:
            return "reduce_load", {"reason": f"Load {load} high but no meme coins — need to check inventory"}
    
    # === PRIORITY 3: Food Stock ===
    if food_count < 10:
        return "buy_food", {"reason": f"Low food stock ({food_count}), buying more"}
    
    # === PRIORITY 4: Crystal Minimum ===
    crystal = agent.get("crystal", 0)
    if crystal < CRYSTAL_MINIMUM and meme_coin > 0:
        return "sell_meme_coins", {"reason": f"Crystals low ({crystal}), selling meme coins"}
    
    # === PRIORITY 5: Work / Grind ===
    is_working = agent.get("isPerformingJob", False)
    
    if is_working:
        return "continue_work", {"reason": "Already performing job, continuing"}
    
    # Decide best grind
    best_grind = get_best_grind("hacking")
    
    if best_grind:
        return "grind", {
            "reason": f"Best grind from history: {best_grind}",
            "grind_type": best_grind,
        }
    else:
        # Default to hacking at crypto terminals
        return "grind", {
            "reason": "No efficiency history yet — defaulting to crypto terminal hacking",
            "grind_type": "crypto_terminal",
        }


def get_strategy_context(state: Dict[str, Any]) -> str:
    """Return the strategist's reasoning context."""
    agent = state.get("agent", {})
    
    lines = [
        "=== Strategist Context ===",
        f"Goal: Hacking Level {agent.get('hackingLevel', 0) + 1}",
        f"XP Progress: {agent.get('hackingXP', 0):,} / {agent.get('hackingNextLevelXP', 0):,}",
        f"XP Remaining: {max(0, agent.get('hackingNextLevelXP', 0) - agent.get('hackingXP', 0)):,}",
        "",
        get_efficiency_report("hacking"),
    ]
    
    return "\n".join(lines)


def format_decision(decision: Tuple[str, Dict[str, Any]]) -> str:
    """Format the decision for display."""
    action_type, params = decision
    return f"Decision: {action_type}\n  Reason: {params.get('reason', 'N/A')}"
