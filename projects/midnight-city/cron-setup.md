# Midnight City Cron Setup

## Files

- `cron-run.sh` — Main automation script (maintenance + work)
- `cron-setup.md` — This file

## What It Does

Each cron run:

1. **Maintenance** (max 2 minutes)
   - `eat-when-hungry` — eat if hunger ≥ threshold
   - `keep-food` — buy matcha smoothies if below 50
   - `sell-when-loaded` — sell heaviest item if loaded/overburdened

2. **Work Session** (2 hours production, 5 minutes test)
   - Starts `mcity-work.mjs run 2h`
   - Auto-renews lease, tracks XP
   - Stops cleanly at time limit

## Test First

```bash
cd ~/.openclaw/workspace/projects/midnight-city
./cron-run.sh test
```

This runs a 5-minute work session. Check the log:
```bash
tail -f ~/.openclaw/workspace/projects/midnight-city/cron-$(date +%Y%m%d).log
```

## Install Cron (3 runs/day, ET waking hours)

```bash
# Edit crontab
crontab -e

# Add these lines (times in UTC = ET + 4h)
# 14:00 UTC = 10:00 ET | 18:00 UTC = 14:00 ET | 22:00 UTC = 18:00 ET
0 14,18,22 * * * /root/.openclaw/workspace/projects/midnight-city/cron-run.sh >> /root/.openclaw/workspace/projects/midnight-city/cron-error.log 2>&1
```

## Adjust Schedule

| Cron Expression | ET Times | Description |
|-----------------|----------|-------------|
| `0 14,18,22 * * *` | 10am, 2pm, 6pm | Conservative (3×/day) |
| `0 13,16,19,22 * * *` | 9am, 12pm, 3pm, 6pm | Moderate (4×/day) |
| `0 12,15,18,21 * * *` | 8am, 11am, 2pm, 5pm | Aggressive (4×/day) |
| `0 */4 * * *` | Every 4 hours | Max (6×/day) |

## Monitoring

**Check current status:**
```bash
cd ~/.openclaw/workspace/skills/midnight-city-direct-control
node scripts/mcity-work.mjs status
```

**Check today's log:**
```bash
tail -50 ~/.openclaw/workspace/projects/midnight-city/cron-$(date +%Y%m%d).log
```

**Check if cron is running:**
```bash
ps aux | grep mcity-cron
```

## Safety Features

- **Lockfile** (`/tmp/mcity-cron.lock`) prevents concurrent runs
- **Stale session cleanup** — detects and stops crashed/orphaned workers
- **Skip if already working** — won't double-start a session
- **Timeout** on both behavior runner and work session
- **Logs everything** to dated files

## To Pause/Stop

```bash
# Stop the current work session
cd ~/.openclaw/workspace/skills/midnight-city-direct-control
node scripts/mcity-work.mjs stop

# Disable cron (comment out the line)
crontab -e
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| "Already running" | Wait for current run to finish, or `rm /tmp/mcity-cron.lock` |
| "worker_exited" | Script auto-cleans on next run, or run `mcity-work.mjs stop` |
| No XP gained | Check `mcity-work.mjs status` — may be "waiting" for terminal |
| Agent starving | Lower `minimumFood` in cron-run.sh or increase cron frequency |
