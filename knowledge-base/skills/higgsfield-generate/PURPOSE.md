# Purpose: higgsfield-generate

## Motivation

Higgsfield provides 30+ AI generation models for images and videos, including
cutting-edge models like Seedance 2.0, Soul V2, and GPT Image 2. The CLI is
powerful but complex — this skill provides practical model selection guidance
and workflow patterns for common use cases.

## Wiki Patterns Addressed

- **Model selection decision tree** — Fast path to the right model for the task
- **Marketing Studio workflow** — Structured ad creation (product + avatar + mode)
- **Media input handling** — Unified flag system for paths vs UUIDs
- **Concise UX** — No raw IDs, no JSON dumps, just URLs and summaries

## Evolution History

| Iteration | Date | Change | Decision |
|-----------|------|--------|----------|
| 0 | 2026-08-29 | Migrated to WikiSkill format | Restructured from legacy skill; no content changes |

## Related Skills

- `higgsfield-setup` — Must be run before this skill works (CLI install + auth)
- `higgsfield-soul-id` — Trains face-faithful identity models for Soul-powered generation
- `kochfoto-image-compositor` — Could chain with this for wedding photography workflows

## Known Limitations

- Model IDs may change; `higgsfield model list --json` is the source of truth
- Reference docs in `references/` are from ClawHub skill installation
- Cost estimation is not implemented (skill says "don't pre-estimate")
