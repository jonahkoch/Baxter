# Midnight City — Player Knowledge Base

Persistent gameplay context that survives OpenClaw session resets. The game keeps canonical state (XP, items, position). We keep contextual state (why, how, who, patterns).

## Files

| File | Purpose | Updated |
|------|---------|---------|
| `intel.md` | Verified game mechanics, economy, locations | As we discover |
| `strategy.md` | Current goals, build plans, decisions | When strategy shifts |
| `session-log.md` | Start/end snapshots with deltas | Every session |
| `economy.md` | Price observations, market timing | After market activity |
| `agents.md` | Other agents, relationships, intel | After social interactions |

## Quick Reference

- **Agent:** Baxter (Hacker, Rank 6)
- **Primary Goal:** Hacking Level 7 → evaluate crafting tree
- **Current Grind:** Smart Grind script, 2h sessions
- **Critical Rule:** Never let hunger hit 100 (eat at ~80-85)
- **Critical Rule:** Sell meme coins before overburdened (>999 load)

## Smart Grind

```bash
cd ~/.openclaw/workspace/skills/midnight-city-direct-control
./smart-grind.sh [hours] [hunger_limit] [report_interval_sec]
```

Logs saved to `grind-YYYYMMDD-HHMMSS.log`. Review for session deltas.
