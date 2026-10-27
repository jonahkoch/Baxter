#!/bin/bash
# Smart grind with safety stops

MAX_RUNTIME_HOURS=${1:-2}      # Default: stop after 2 hours
HUNGER_THRESHOLD=${2:-90}      # Default: stop when hunger hits 90
REPORT_INTERVAL=${3:-900}      # Default: report every 15 min

START_TIME=$(date +%s)
MAX_RUNTIME_SEC=$((MAX_RUNTIME_HOURS * 3600))
NEXT_REPORT=$((START_TIME + REPORT_INTERVAL))
SESSIONS_COMPLETED=0
XP_START=3105  # Will be updated dynamically

echo "=== SMART GRIND STARTED ==="
echo "Max runtime: ${MAX_RUNTIME_HOURS}h | Hunger stop: ${HUNGER_THRESHOLD} | Reports: every ${REPORT_INTERVAL}s"
echo "Started at: $(date '+%H:%M:%S')"
echo "Press Ctrl+C to stop early"
echo ""

# Function to check current state
check_state() {
    local ctx=$(node scripts/mcity-control.mjs context 2>/dev/null)
    local needs=$(node scripts/mcity-control.mjs needs 2>/dev/null)
    
    IS_WORKING=$(echo "$ctx" | grep -o '"isPerformingJob": [^,]*' | grep -o 'true\|false')
    HUNGER=$(echo "$needs" | grep -A 1 '"value":' | tail -1 | grep -o '[0-9]*')
    
    echo "$IS_WORKING|$HUNGER"
}

# Function to send report (could integrate with messaging)
send_report() {
    local elapsed=$(( $(date +%s) - START_TIME ))
    local elapsed_min=$((elapsed / 60))
    
    echo "[$(date '+%H:%M:%S')] REPORT - Elapsed: ${elapsed_min}min | Sessions: $SESSIONS_COMPLETED | Hunger: $CURRENT_HUNGER"
}

while true; do
    CURRENT_TIME=$(date +%s)
    ELAPSED=$((CURRENT_TIME - START_TIME))
    
    # Check time limit
    if [ $ELAPSED -ge $MAX_RUNTIME_SEC ]; then
        echo "[$(date '+%H:%M:%S')] ⏰ TIME LIMIT REACHED (${MAX_RUNTIME_HOURS}h) - Stopping grind"
        break
    fi
    
    # Check state
    STATE=$(check_state)
    IS_WORKING=$(echo "$STATE" | cut -d'|' -f1)
    CURRENT_HUNGER=$(echo "$STATE" | cut -d'|' -f2)
    
    # Check hunger threshold
    if [ -n "$CURRENT_HUNGER" ] && [ "$CURRENT_HUNGER" -ge "$HUNGER_THRESHOLD" ]; then
        echo "[$(date '+%H:%M:%S')] 🍽️ HUNGER THRESHOLD ($CURRENT_HUNGER/$HUNGER_THRESHOLD) - Stopping for food"
        break
    fi
    
    # Send periodic report
    if [ $CURRENT_TIME -ge $NEXT_REPORT ]; then
        send_report
        NEXT_REPORT=$((CURRENT_TIME + REPORT_INTERVAL))
    fi
    
    # If idle, try to work
    if [ "$IS_WORKING" = "false" ]; then
        # Small random delay to avoid synchronized competition
        sleep $(awk 'BEGIN{srand(); print int(rand()*3)+1}')
        
        RESULT=$(node scripts/mcity-control.mjs work 2>/dev/null)
        
        # Check if work started
        if echo "$RESULT" | grep -q '"status": "pending"\|"status": "confirmed"'; then
            SESSIONS_COMPLETED=$((SESSIONS_COMPLETED + 1))
            echo "[$(date '+%H:%M:%S')] ✅ Work session #$SESSIONS_COMPLETED started"
            sleep 5  # Let it get going
        fi
    else
        # Still working, just check periodically
        sleep 8
    fi
done

echo ""
echo "=== GRIND COMPLETE ==="
echo "Total time: $(( ($(date +%s) - START_TIME) / 60 )) minutes"
echo "Sessions completed: $SESSIONS_COMPLETED"
