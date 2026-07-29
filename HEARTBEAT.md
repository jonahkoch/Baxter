# HEARTBEAT.md

## Checklist (rotate through these)

### 1. Token Usage Monitoring
Check session status periodically and alert Jonah when thresholds are hit:

**Alerts to send:**
- Context >80% full — warn that we should trim/start new session soon
- Daily input tokens >100k — heads up on usage
- Daily output tokens >10k — heads up on usage

### 2. Email Check (Gmail)
Check `baxterclawbot@gmail.com` for unread emails. Alert Jonah if:
- New unread emails from important contacts
- Emails that look urgent (keywords: urgent, asap, deadline, payment, booking)
- Unread count >0 (summarize, don't spam)

**How:** `python3 ~/.openclaw/workspace/tools/gmail.py unread` and `recent --n 5`

### 3. Calendar Check
- Any events in next 24-48h?
- Remind Jonah if something's coming up

## Schedule

**Check frequency:** Every 4 hours during active hours (skip late night unless urgent)

**Last check:** 2026-07-27 17:52 CEST

**Status:** Context 15% · 37k in / 630 out — healthy

**Note:** Session compacted at 19:28 CEST. Context cleared from 68% → 15%.
