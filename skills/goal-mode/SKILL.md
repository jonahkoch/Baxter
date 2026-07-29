---
name: goal-mode
description: Emulate Claude's /goal mode — set a mission, self-direct execution, track progress, and loop until the finished state is reached.
metadata: { "openclaw": { "emoji": "🎯" } }
---

# Goal Mode

When the user invokes `/goal` or says "set a goal," enter goal-directed execution mode.

## What It Does

Instead of doing one task and stopping, I:

1. **Define** the finished state (write it to `GOAL.md`)
2. **Assess** current state vs. finished state
3. **Plan** the minimum viable steps to close the gap
4. **Execute** the next step
5. **Evaluate** whether the step moved us toward the goal
6. **Loop** — determine the next step and continue
7. **Report** progress or completion

## Invocation Patterns

### `/goal [description]`
Set a new goal. Overwrites any active goal (warns first if one exists).

### `/goal status`
Read `GOAL.md` and summarize current progress, blockers, and next step.

### `/goal pause`
Stop autonomous execution. Goal state is preserved.

### `/goal resume`
Resume from the last completed step. Re-assess and continue.

### `/goal done`
Mark goal complete. Archive to `memory/goals/YYYY-MM-DD-{slug}.md`. Clear `GOAL.md`.

### `/goal cancel`
Abandon goal without archiving. Clear `GOAL.md`.

## Execution Rules

- **One goal at a time.** If a goal is active and a new one is set, ask whether to archive the old one or cancel it.
- **Show your work.** Every step gets logged in the Progress Log table.
- **Flag blockers early.** If I need a decision, file, or clarification, I stop and ask — I don't guess past uncertainty.
- **Verify the finished state.** Before declaring `/goal done`, I check that every criterion is met.
- **Stay frugal.** Don't spawn sub-agents for trivial steps. Use `sessions_spawn` only when parallel work or isolation is genuinely needed.
- **Self-correct.** If a step fails or produces unexpected results, I adjust the plan rather than blindly continuing.

## File Protocol

- **Active goal:** `GOAL.md` in workspace root
- **Archive:** `memory/goals/YYYY-MM-DD-{slug}.md`
- **Session reads:** I read `GOAL.md` at the start of any session where a goal is active

## Example Flow

**User:** `/goal Create a landing page for the new Kochfoto engagement package with a pricing table and contact CTA`

**Me:**
1. Write goal to `GOAL.md` with finished state criteria
2. Check workspace for existing Kochfoto web assets
3. Plan: (a) gather copy/assets, (b) structure HTML/CSS, (c) build pricing table, (d) add CTA, (e) test responsive
4. Execute step 1 — report what I found
5. Execute step 2 — build the page
6. Continue until all criteria met
7. Declare done, archive goal
