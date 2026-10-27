#!/bin/bash
set -euo pipefail
#
# Midnight City — Automated Grind + Maintenance
# Usage: ./cron-run.sh [test]
#   test  → 5-minute work session (for verification)
#   (no arg) → 2-hour work session (production)
#

SKILL_DIR="${HOME}/.openclaw/workspace/skills/midnight-city-direct-control"
LOG_DIR="${HOME}/.openclaw/workspace/projects/midnight-city"
LOCK_FILE="/tmp/mcity-cron.lock"

MODE="${1:-prod}"
if [ "$MODE" = "test" ]; then
    WORK_DURATION="5m"
    BEHAVIOR_DURATION="1m"
    TIMEOUT_SEC=360   # 5m + 1m buffer
    echo "=== TEST MODE: 5-minute work session ==="
else
    WORK_DURATION="2h"
    BEHAVIOR_DURATION="2m"
    TIMEOUT_SEC=7800  # 2h + 10m buffer
fi

mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/cron-$(date +%Y%m%d).log"

# ── Prevent concurrent cron instances ──
if [ -f "$LOCK_FILE" ]; then
    PID=$(cat "$LOCK_FILE" 2>/dev/null || echo "")
    if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
        echo "$(date '+%H:%M:%S') Already running (PID $PID), skipping" | tee -a "$LOG_FILE"
        exit 0
    fi
    rm -f "$LOCK_FILE"
fi
echo $$ > "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

cd "$SKILL_DIR"

echo "=== $(date '+%Y-%m-%d %H:%M:%S') Midnight City Run (work: $WORK_DURATION) ===" | tee -a "$LOG_FILE"

# ── Clean up stale work session if any ──
WORK_STATUS=$(node scripts/mcity-work.mjs status 2>/dev/null || echo '{"state":"not_started"}')
WORK_STATE=$(echo "$WORK_STATUS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('state','not_started'))" 2>/dev/null || echo "not_started")

if [ "$WORK_STATE" = "worker_exited" ] || [ "$WORK_STATE" = "interrupted" ] || [ "$WORK_STATE" = "unresponsive" ]; then
    echo "$(date '+%H:%M:%S') Cleaning up stale work session ($WORK_STATE)..." | tee -a "$LOG_FILE"
    timeout 30 node scripts/mcity-work.mjs stop >> "$LOG_FILE" 2>&1 || {
        echo "$(date '+%H:%M:%S') Stop failed (stale lease), clearing lockfiles..." | tee -a "$LOG_FILE"
        rm -f ~/.midnight-city/work-session-*.lock ~/.midnight-city/work-session-*.json 2>/dev/null || true
    }
    sleep 2
elif [ "$WORK_STATE" = "working" ] || [ "$WORK_STATE" = "starting" ]; then
    WORKER_ALIVE=$(echo "$WORK_STATUS" | python3 -c "import sys,json; print('true' if json.load(sys.stdin).get('workerAlive') else 'false')" 2>/dev/null || echo "false")
    if [ "$WORKER_ALIVE" = "true" ]; then
        echo "$(date '+%H:%M:%S') Work session already active, skipping" | tee -a "$LOG_FILE"
        exit 0
    else
        echo "$(date '+%H:%M:%S') Cleaning up stale work session ($WORK_STATE, worker dead)..." | tee -a "$LOG_FILE"
        timeout 30 node scripts/mcity-work.mjs stop >> "$LOG_FILE" 2>&1 || {
            echo "$(date '+%H:%M:%S') Stop failed (stale lease), clearing lockfiles..." | tee -a "$LOG_FILE"
            rm -f ~/.midnight-city/work-session-*.lock ~/.midnight-city/work-session-*.json 2>/dev/null || true
        }
        sleep 2
    fi
fi

# ── Step 1: Connect (required before behavior runner) ──
node scripts/mcity-control.mjs connect user-agent-66b0ebf2-f709-447a-b8e2-24d23a0f2fc3 >/dev/null 2>&1 || true

# ── Step 2: Maintenance (eat, buy food, sell when loaded) ──
echo "$(date '+%H:%M:%S') Running maintenance behaviors..." | tee -a "$LOG_FILE"
timeout 180 node scripts/mcity-behavior.mjs run \
    '[{"name":"eat-when-hungry"},{"name":"keep-food","params":{"minimumFood":50}},{"name":"sell-when-loaded"}]' \
    "$BEHAVIOR_DURATION" >> "$LOG_FILE" 2>&1 || true

# ── Step 3: Reconnect (behavior runner releases lease on exit) ──
node scripts/mcity-control.mjs connect user-agent-66b0ebf2-f709-447a-b8e2-24d23a0f2fc3 >/dev/null 2>&1 || true

# ── Step 4: Start work session ──
echo "$(date '+%H:%M:%S') Starting work session ($WORK_DURATION)..." | tee -a "$LOG_FILE"
timeout "$TIMEOUT_SEC" node scripts/mcity-work.mjs run "$WORK_DURATION" >> "$LOG_FILE" 2>&1 || {
    EXIT=$?
    if [ $EXIT -eq 124 ]; then
        echo "$(date '+%H:%M:%S') Work session timed out (timeout hit)" | tee -a "$LOG_FILE"
    else
        echo "$(date '+%H:%M:%S') Work session exited with code $EXIT" | tee -a "$LOG_FILE"
    fi
}

echo "$(date '+%H:%M:%S') Run complete" | tee -a "$LOG_FILE"
