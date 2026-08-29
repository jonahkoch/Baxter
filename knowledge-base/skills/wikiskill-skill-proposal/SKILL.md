---
name: wikiskill-skill-proposal
description: Propose a skill edit based on wiki patterns, session traces, or observed gaps. Use when a skill needs improvement, a new skill is needed, or a pattern suggests a procedural change. Always requires human gating — never apply without review.
triggers:
  - "propose skill edit"
  - "suggest skill change"
  - "update skill"
  - "skill needs improvement"
---

# Skill Proposal — Skill

## When to Propose

**PROPOSE when:**
- A wiki pattern suggests a skill is missing, incomplete, or incorrect
- A session trace shows a skill led to failure or confusion
- A new workflow or tool is available that should be captured
- The user explicitly asks for a skill improvement

**SKIP when:**
- No clear evidence from patterns or traces
- Only a single occurrence (wait for recurrence)
- The change is purely stylistic (no functional impact)

## Pre-Proposal Checklist

1. Read `knowledge-base/wiki/skill-impact.md` — check if this was proposed before and rejected
2. Read the target skill's SKILL.md and PURPOSE.md
3. Read relevant wiki patterns that motivate the change
4. Formulate a specific, atomic proposal (one change per proposal)

## Proposal Format

Present the proposal to the user in this structure:

```markdown
## Skill Proposal

- **Target:** skill-name
- **Action:** create | edit | delete
- **Motivation:** 1-2 sentences from wiki patterns or traces
- **Current state:** What the skill says now (brief)
- **Proposed change:** What it should say
- **Evidence:** Which patterns or traces support this

### Diff Preview

```diff
- old line
+ new line
```

### Risk Assessment

- **Breaking change?** yes / no
- **Affects other skills?** list or "none"
- **Validation needed?** what to test
```

## Human Gating

**Wait for explicit user response before applying.**

Valid responses:
- "Approved" / "Yes" / "Apply it" → Apply the change
- "Rejected" / "No" → Log rejection, do not apply
- "Modify" / "Change X first" → Revise and re-present
- "Skip for now" → No action, no log

## Post-Approval Steps

1. Apply the patch to the skill's SKILL.md
2. Update PURPOSE.md evolution history table
3. Update PURPOSE.md Known Limitations if applicable
4. Log in `knowledge-base/wiki/skill-impact.md`:

```markdown
## Iteration N — YYYY-MM-DD
- **Skill:** skill-name
- **Action:** create | edit | delete
- **Proposal:** Brief description
- **Validation:** Manual review
- **Score/Outcome:** pass / fail / partial
- **Decision:** ACCEPTED
- **Reason:** Why it was accepted
```

## Post-Rejection Steps

1. Do NOT apply the change
2. Log in `knowledge-base/wiki/skill-impact.md`:

```markdown
## Iteration N — YYYY-MM-DD
- **Skill:** skill-name
- **Action:** create | edit | delete
- **Proposal:** Brief description
- **Validation:** Manual review
- **Score/Outcome:** rejected
- **Decision:** REJECTED
- **Reason:** Why it was rejected (user's reason or your assessment)
```

## Constraints

- **One atomic change per proposal.** Don't bundle multiple edits.
- **Always cite evidence.** Link to patterns or traces.
- **Never apply without approval.** This is the gating mechanism.
- **Rejected proposals are valuable.** They prevent future repetition.
