"""
Midnight City Harness — Configuration
"""
import os
from pathlib import Path

# Paths
PROJECT_DIR = Path("/root/.openclaw/workspace/projects/midnight-city")
SKILL_DIR = Path("/root/.openclaw/workspace/skills/midnight-city-direct-control")
CHECKPOINT_DIR = PROJECT_DIR / "harness" / "checkpoints"
MEMORY_DIR = PROJECT_DIR / "harness" / "memory"

# Agent ID (from .env or override)
AGENT_ID = os.getenv("MCITY_AGENT_ID", "")

# Game thresholds (from strategy.md)
HUNGER_THRESHOLD = 80
LOAD_SELL_THRESHOLD = 800
CRYSTAL_MINIMUM = 1000
FOOD_TARGET = 50

# Work durations
GRIND_DURATION_MINUTES = 120
MAINTENANCE_DURATION_MINUTES = 2

# XP tracking
TRACK_XP_EFFICIENCY = True

# Gates (require human approval)
GATES = {
    "spend_real_tokens": True,      # Any real-money spend
    "pvp_attack": True,             # PvP or aggressive actions
    "crystal_transfer": True,       # Sending crystals to other agents
    "change_equipment": False,      # Auto-equip is fine
    "explore_new_area": False,      # Auto-explore is fine for now
}
