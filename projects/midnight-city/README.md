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

- **Agent:** Baxter (Hacker, Rank 18, Level 18)
- **Primary Goal:** Hacking Level 19 → next skill evaluation
- **Current Grind:** Smart Grind script, 2h sessions, 4×/day via cron
- **Cron Schedule:** 13:00, 16:00, 19:00, 22:00 UTC (9am, 12pm, 3pm, 6pm ET)
- **Critical Rule:** Never let hunger hit 100 (eat at ~80-85)
- **Critical Rule:** Sell meme coins before overburdened (>999 load)

## Commit Policy

| Trigger | Action |
|---------|--------|
| Strategy/mechanics discovery | Manual commit |
| Level up or major milestone | Manual commit |
| Weekly (even if idle) | Summary commit |

Say **"commit city state"** to run `./commit-state.sh` and push.

## Smart Grind

**Via cron (production):**
```bash
cd ~/.openclaw/workspace/projects/midnight-city
./cron-run.sh        # 2h production run
./cron-run.sh test   # 5-minute test run
```

**Direct (manual/debug):**
```bash
cd ~/.openclaw/workspace/skills/midnight-city-direct-control
node scripts/smart-grind.mjs
```

Logs saved to `projects/midnight-city/cron-YYYYMMDD.log`. Review for session deltas.
