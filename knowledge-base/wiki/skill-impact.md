# Skill Impact Tracker

Audit trail of all skill proposals, their validation outcomes, and acceptance decisions.
This file is append-only. Rejected proposals are as important as accepted ones — they
prevent future repetition of failed interventions.

## Format

```
## Iteration N — YYYY-MM-DD
- **Skill:** skill-name
- **Action:** create | edit | delete
- **Proposal:** Brief description of the change
- **Diff:** (file path or summary)
- **Validation:** Manual review / Shadow test / Task execution
- **Score/Outcome:** pass / fail / partial
- **Decision:** ACCEPTED | REJECTED
- **Reason:** Why it was accepted or rejected
```

---

## Iteration 0 — 2026-08-29
- **Skill:** kochfoto-agents
- **Action:** migrate
- **Proposal:** Restructure existing skill into WikiSkill format (SKILL.md + PURPOSE.md)
- **Diff:** `skills/kochfoto-agents/SKILL.md`, `skills/kochfoto-agents/PURPOSE.md`
- **Validation:** Manual review
- **Score/Outcome:** pass
- **Decision:** ACCEPTED
- **Reason:** Foundational restructure to align with WikiSkill architecture. No behavioral changes, only format migration.
