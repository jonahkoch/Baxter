# GOAL.md — Active Mission Tracker

> Emulates Claude's `/goal` mode for OpenClaw.
> One goal at a time. Clear finished state. Self-directed execution.

---

## Current Goal

**Goal:** Capture my X (Twitter) replies to build a style guide for AI agents. Produce: (1) a finished SKILL.md for writing in my voice, and (2) a reusable snippet for prompts and existing Skills that output written content.

**Started:** 2026-05-16

**Context:** Need to extract my tweet/reply history, analyze patterns (tone, sentence structure, emoji use, punctuation habits, humor style, argument style), codify into a skill, and create a drop-in snippet.

---

## Progress Log

| Step | Action | Result | Timestamp |
|------|--------|--------|-----------|
| 1 | Assess how to capture X replies | Blocked — X/Twitter blocks all scrapers. User requested X archive download. | 2026-05-16 |
| 2 | Wait for X archive | Jonah requested data from X. ETA: ~24h. Will parse `tweets.js`/`tweets.json` when ready. | 2026-05-16 |

---

## Remaining Work

- [ ] Determine method to extract X/Twitter reply history
- [ ] Collect reply data (manually or via export/API)
- [ ] Analyze patterns: tone, structure, vocabulary, emoji, punctuation, humor
- [ ] Draft STYLE-GUIDE skill
- [ ] Draft reusable snippet for prompts/skills
- [ ] Test snippet with sample generation
- [ ] Finalize and save to skills/

---

## Blockers / Decisions Needed

- Waiting for X archive download (~24h ETA)
- Once received: parse tweets.js/tweets.json and extract reply patterns

---

## How to Use

### Set a goal
```
/goal [description of finished state]
```
I will:
1. Write the goal into this file
2. Analyze the current state vs. finished state
3. Build a step-by-step plan
4. Execute the first step
5. Update this file with results
6. If not done, determine the next step and continue
7. Report progress or completion

### Check status
```
/goal status
```
I read this file and summarize where we are.

### Pause / Resume
```
/goal pause
/goal resume
```
Pause stops autonomous execution. Resume picks up from the last step.

### Complete / Cancel
```
/goal done
/goal cancel
```
Done archives the goal to `memory/goals/`. Cancel clears it without archive.

---

## Template: Setting a Good Goal

**Bad:** "Fix the website"
**Good:** "The Squarespace site loads in under 2s, the mobile menu works on iOS Safari, and the contact form submits successfully"

**Bad:** "Research Cardano DeFi"
**Good:** "A markdown summary of the top 5 Cardano DEXs by TVL, with fee structures, audit status, and wallet compatibility, saved to memory/cardano/dex-comparison.md"

The finished state must be verifiable. If you can't check a box, it's not a good goal.
