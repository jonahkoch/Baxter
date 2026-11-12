"""
Checkpointing — Save and restore game state after every action.
Prevents progress loss on crashes.
"""
import json
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, Optional

CHECKPOINT_DIR = Path("/root/.openclaw/workspace/projects/midnight-city/harness/checkpoints")
CHECKPOINT_DIR.mkdir(parents=True, exist_ok=True)


def save_checkpoint(
    phase: str,
    context: Dict[str, Any],
    decision: Optional[str] = None,
    outcome: Optional[Dict] = None
) -> str:
    """
    Save a checkpoint after every action.
    Returns the checkpoint filename.
    """
    timestamp = int(time.time())
    checkpoint = {
        "timestamp": timestamp,
        "datetime": datetime.utcnow().isoformat(),
        "phase": phase,
        "context": context,
        "decision": decision,
        "outcome": outcome,
    }
    
    filename = f"checkpoint-{timestamp}.json"
    filepath = CHECKPOINT_DIR / filename
    
    with open(filepath, "w") as f:
        json.dump(checkpoint, f, indent=2)
    
    # Keep only last 50 checkpoints to avoid bloat
    _prune_old_checkpoints(keep=50)
    
    return str(filepath)


def load_latest_checkpoint() -> Optional[Dict[str, Any]]:
    """Load the most recent checkpoint, or None if none exist."""
    checkpoints = sorted(CHECKPOINT_DIR.glob("checkpoint-*.json"), reverse=True)
    if not checkpoints:
        return None
    
    with open(checkpoints[0]) as f:
        return json.load(f)


def get_checkpoints_summary(n: int = 5) -> list:
    """Return the last N checkpoint summaries."""
    checkpoints = sorted(CHECKPOINT_DIR.glob("checkpoint-*.json"), reverse=True)
    summaries = []
    for cp in checkpoints[:n]:
        with open(cp) as f:
            data = json.load(f)
        summaries.append({
            "time": data["datetime"],
            "phase": data["phase"],
            "decision": data.get("decision", "none"),
        })
    return summaries


def _prune_old_checkpoints(keep: int = 50):
    """Remove old checkpoints, keeping only the most recent N."""
    checkpoints = sorted(CHECKPOINT_DIR.glob("checkpoint-*.json"))
    if len(checkpoints) > keep:
        for old in checkpoints[:-keep]:
            old.unlink()
