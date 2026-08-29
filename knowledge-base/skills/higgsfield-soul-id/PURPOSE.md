# Purpose: higgsfield-soul-id

## Motivation

Higgsfield's Soul Character feature trains a personalized face model that enables
identity-faithful generation across images and videos. This skill provides the
workflow for training, waiting, and using Soul Characters in generation pipelines.

## Wiki Patterns Addressed

- **One-time setup, reusable identity** — Train once, use across all Soul-powered generations
- **Cross-skill chaining** — Soul ID output feeds into `higgsfield-generate` via `--soul-id` flag
- **Paid plan gating** — Validates user has Basic+ plan before attempting training

## Evolution History

| Iteration | Date | Change | Decision |
|-----------|------|--------|----------|
| 0 | 2026-08-29 | Migrated to WikiSkill format | Restructured from legacy skill; no content changes |

## Related Skills

- `higgsfield-setup` — Must be run first (CLI install + auth)
- `higgsfield-generate` — Consumes Soul IDs for identity-faithful generation

## Known Limitations

- Requires 5-20 photos with varied angles and lighting
- Training takes minutes; no progress feedback during wait
- Paid plan required (Basic+)
