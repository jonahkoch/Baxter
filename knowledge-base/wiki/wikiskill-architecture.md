---
title: WikiSkill Architecture
created: 2026-08-29
last_updated: 2026-08-29
source_count: 1
status: draft
---

# WikiSkill Architecture

Adaptation of Tang et al. (2026) "WikiSkill: Compiling Agent Experience into Persistent Knowledge for Skill Evolution" for our single-agent, human-assistant context.

## Three-Layer Design

```
┌─────────────────────────────────────┐
│  Skill Layer (skills/)              │
│  Evolving procedural knowledge      │
│  - SKILL.md: Instructions           │
│  - PURPOSE.md: Motivation & lineage │
└─────────────┬───────────────────────┘
              │ inject
┌─────────────▼───────────────────────┐
│  Inference Agent (me)               │
│  Executes tasks using active skills │
│  No wiki access during execution    │
└─────────────┬───────────────────────┘
              │ write traces
┌─────────────▼───────────────────────┐
│  Raw Layer (raw/sessions/)          │
│  Immutable execution traces         │
│  One file per significant session   │
└─────────────┬───────────────────────┘
              │ consolidate
┌─────────────▼───────────────────────┐
│  Wiki Layer (wiki/)                 │
│  Persistent, compounding knowledge  │
│  - patterns/: Failure/success modes │
│  - logs.md: Evolution chronology    │
│  - skill-impact.md: Audit trail     │
│  NEVER RESET between iterations     │
└─────────────────────────────────────┘
```

## Differences from Original Paper

| Aspect | Paper (WikiSkill) | Our Adaptation |
|--------|-------------------|----------------|
| Agents | Multiple specialized (Inference, Maintainer, Proposer) | Single agent (me), manual phases |
| Validation | Automated benchmark gating | Manual human review |
| Traces | Clean task rollouts | Mixed casual + task conversation |
| Storage | Local filesystem | GitHub repository |
| Model | Multiple model families | Single model (me) |
| Trigger | After every training iteration | After significant sessions only |

## File Conventions

### Skill Files
- `SKILL.md` — Frontmatter + procedural instructions
- `PURPOSE.md` — Motivation, wiki patterns addressed, evolution history

### Session Traces
- `raw/sessions/YYYY-MM-DD-{topic}.md`
- Frontmatter: session_id, date, type (casual|task-oriented), tasks[], tools_used, outcome

### Wiki Patterns
- `wiki/patterns/{pattern-name}.md`
- Document recurring failure modes or successful strategies
- Cite evidence from session traces

## Open Questions

1. How to handle skills that span multiple domains (e.g., a skill that uses both Cardano and Kochfoto knowledge)?
2. Should casual sessions ever produce patterns, or only task-oriented ones?
3. At what wiki size do we need archiving/compression?

## References

- [Source: wikiskill.pdf] — Tang et al., "WikiSkill: Compiling Agent Experience into Persistent Knowledge for Skill Evolution", arXiv:2608.27454v1, 2026.
