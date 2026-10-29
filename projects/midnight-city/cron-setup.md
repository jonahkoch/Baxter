# Midnight City Cron Setup

## Files

- `cron-run.sh` — Main automation script (maintenance + smart grind)
- `cron-setup.md` — This file

## What It Does

Each cron run:

1. **Maintenance** (max 2 minutes)
   - `eat-when-hungry` — eat if hunger ≥ threshold
   - `keep-food` — buy matcha smoothies if below 50
   - `sell-when-loaded` — sell heaviest item if loaded/overburdened

2. **Smart Grind** (2 hours production, 5 minutes test)
   - Uses `smart-grind.mjs` — auto-restarts work when terminals time out
   - Auto-reconnects on connection drops or lease expiry
   - Checks every 2 minutes: hunger, load, work status
   - Handles terminal competition naturally (retries until terminal is free)

## Why Smart Grind?

The original `mcity-work.mjs` quits when terminals time out (a normal game mechanic). Smart-grind was specifically built to handle this — it restarts work automatically instead of exiting.

## Test First

```bash
cd ~/.openclaw/workspace/projects/midnight-city
./cron-run.sh test
```

This runs a 5-minute smart grind. Check the log:
```bash
tail -f ~/.openclaw/workspace/projects/midnight-city/cron-$(date +%Y%m%d).log
```

## Install Cron (4 runs/day, ET waking hours)

```bash
# Edit crontab
crontab -e

# Add this line (times in UTC = ET + 4h)
# 13:00 UTC = 9:00 ET | 16:00 UTC = 12:00 ET | 19:00 UTC = 15:00 ET | 22:00 UTC = 18:00 ET
0 13,16,19,22 * * * /root/.openclaw/workspace/projects/midnight-city/cron-run.sh >> /root/.openclaw/workspace/projects/midnight-city/cron-error.log 2>&1
```

## Adjust Schedule

| Cron Expression | ET Times | Description |
|-----------------|----------|-------------|
| `0 14,18,22 * * *` | 10am, 2pm, 6pm | Conservative (3×/day) |
| `0 13,16,19,22 * * *` | 9am, 12pm, 3pm, 6pm | Moderate (4×/day) ← **Current** |
| `0 12,15,18,21 * * *` | 8am, 11am, 2pm, 5pm | Aggressive (4×/day) |
| `0 */4 * * *` | Every 4 hours | Max (6×/day) |

## Monitoring

**Check current status:**
```bash
ps aux | grep smart-grind
```

**Check today's log:**
```bash
tail -50 ~/.openclaw/workspace/projects/midnight-city/cron-$(date +%Y%m%d).log
```

**Check if cron is installed:**
```bash
crontab -l | grep midnight
```

## Safety Features

- **Lockfile** (`/tmp/mcity-cron.lock`) prevents concurrent runs
- **Timeout** on both behavior runner and smart grind (exits cleanly at limit)
- **Logs everything** to dated files
- **Auto-cleanup** of legacy work session files on each run

## To Pause/Stop

```bash
# Disable cron (comment out the line)
crontab -e

# Kill any running smart-grind
pkill -f smart-grind.mjs
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| "Already running" | Wait for current run to finish, or `rm /tmp/mcity-cron.lock` |
| No XP gained | Check log — may be terminal competition (smart-grind retries automatically) |
| Agent starving | Lower `minimumFood` in cron-run.sh or increase cron frequency |
| 404 errors in log | Normal — smart-grind auto-reconnects when lease expires |
| "control_lost" | Normal — happens when previous run's lease hasn't expired yet; smart-grind reconnects |

## Architecture Change Log

**2026-10-28:** Switched from `mcity-work.mjs` to `smart-grind.mjs` for work sessions. The work session script quit on terminal timeouts (normal game mechanic). Smart-grind auto-restarts work and reconnects on lease expiry, resulting in ~8 hours of effective grinding per day vs ~1 hour previously.
