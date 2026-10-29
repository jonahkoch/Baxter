#!/bin/bash
set -euo pipefail
#
# Midnight City — Automated Smart Grind + Maintenance
# Uses smart-grind.mjs which auto-restarts work when terminals time out
# Usage: ./cron-run.sh [test]
#   test  → 5-minute smart grind (for verification)
#   (no arg) → 2-hour smart grind (production)
#

SKILL_DIR="${HOME}/.openclaw/workspace/skills/midnight-city-direct-control"
LOG_DIR="${HOME}/.openclaw/workspace/projects/midnight-city"
LOCK_FILE="/tmp/mcity-cron.lock"

MODE="${1:-prod}"
if [ "$MODE" = "test" ]; then
    GRIND_DURATION="5m"
    BEHAVIOR_DURATION="1m"
    TIMEOUT_SEC=360   # 5m + 1m buffer
    echo "=== TEST MODE: 5-minute smart grind ==="
else
    GRIND_DURATION="2h"
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

echo "=== $(date '+%Y-%m-%d %H:%M:%S') Midnight City Run (smart-grind: $GRIND_DURATION) ===" | tee -a "$LOG_FILE"

# ── Clean up any legacy mcity-work.mjs state files ──
rm -f ~/.midnight-city/work-session-*.lock ~/.midnight-city/work-session-*.json 2>/dev/null || true

# ── Step 1: Maintenance (eat, buy food, sell when loaded) ──
echo "$(date '+%H:%M:%S') Running maintenance behaviors..." | tee -a "$LOG_FILE"
timeout 180 node scripts/mcity-behavior.mjs run \
    '[{"name":"eat-when-hungry"},{"name":"keep-food","params":{"minimumFood":50}},{"name":"sell-when-loaded"}]' \
    "$BEHAVIOR_DURATION" >> "$LOG_FILE" 2>&1 || true

# ── Step 2: Smart Grind (auto-restarts work when terminals time out) ──
echo "$(date '+%H:%M:%S') Starting smart grind ($GRIND_DURATION)..." | tee -a "$LOG_FILE"
timeout "$TIMEOUT_SEC" node scripts/smart-grind.mjs >> "$LOG_FILE" 2>&1 || {
    EXIT=$?
    if [ $EXIT -eq 124 ]; then
        echo "$(date '+%H:%M:%S') Smart grind completed (duration reached)" | tee -a "$LOG_FILE"
    else
        echo "$(date '+%H:%M:%S') Smart grind exited with code $EXIT" | tee -a "$LOG_FILE"
    fi
}

echo "$(date '+%H:%M:%S') Run complete" | tee -a "$LOG_FILE"
