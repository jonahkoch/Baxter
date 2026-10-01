#!/bin/bash
# Commit Midnight City state to git
# Usage: ./commit-state.sh [message]

REPO_ROOT="/root/.openclaw/workspace"
GAME_DIR="projects/midnight-city"
DEFAULT_MSG="Midnight City update: $(date '+%Y-%m-%d %H:%M')"
MSG="${1:-$DEFAULT_MSG}"

cd "$REPO_ROOT" || exit 1

# Stage only the game knowledge files
git add "$GAME_DIR/"

# Check if there's anything to commit
if git diff --cached --quiet; then
    echo "No changes to commit."
    exit 0
fi

git commit -m "$MSG"
echo "Committed: $MSG"

# Push
git push origin master
echo "Pushed to origin/master"
