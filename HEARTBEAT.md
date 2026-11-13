# HEARTBEAT.md — Periodic Checks

## Midnight City Agent Monitoring

Check every 4-6 hours during waking hours (08:00-23:00 ET):

### Checklist
- [ ] Agent status: idle > 6 hours = alert
- [ ] Hunger > 80 = eat
- [ ] Load = overburdened = sell
- [ ] smart-grind.mjs exists in scripts/
- [ ] Cron logs show recent success (within last 8h)

### Actions
- If idle: reconnect + restart work
- If critical hunger/load: run maintenance
- If smart-grind.mjs missing: restore from repo backup
- If cron failing: check logs, fix, alert user

### State Tracking
Update `memory/heartbeat-state.json` after each check:
```json
{
  "lastChecks": {
    "midnightCity": <timestamp>
  }
}
```
