#!/bin/bash
# Auto-grind loop - keeps trying to work whenever idle

echo "Starting auto-grind loop..."
echo "Press Ctrl+C to stop"

while true; do
    # Check current status
    STATUS=$(node scripts/mcity-control.mjs context 2>/dev/null | grep -o '"isPerformingJob": [^,]*' | grep -o 'true\|false')
    
    if [ "$STATUS" = "false" ]; then
        echo "[$(date +%H:%M:%S)] Idle detected - attempting work..."
        node scripts/mcity-control.mjs work >/dev/null 2>&1
        # Brief pause to let the action start
        sleep 3
    else
        # Still working, check again in 10 seconds
        sleep 10
    fi
done
