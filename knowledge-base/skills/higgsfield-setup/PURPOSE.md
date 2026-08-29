# Purpose: higgsfield-setup

## Motivation

Higgsfield AI generation requires OAuth authentication that cannot complete on a
headless server. This skill provides the complete workflow for transferring
credentials from a Mac, installing the CLI, and verifying the setup with a
smoke test.

## Wiki Patterns Addressed

- **Cross-machine credential transfer** — Server cannot complete browser OAuth; Mac must authenticate first
- **Headless environment constraints** — No browser available for interactive login
- **Recovery playbook** — When auth breaks, this skill provides the complete reset path

## Evolution History

| Iteration | Date | Change | Decision |
|-----------|------|--------|----------|
| 0 | 2026-08-29 | Migrated to WikiSkill format | Restructured from legacy skill; no content changes |

## Related Skills

- `higgsfield-generate` — Uses the setup this skill provides
- `higgsfield-soul-id` — Also requires Higgsfield CLI authentication

## Known Limitations

- Requires manual credential copy from Mac (cannot fully automate)
- Workspace ID is hardcoded; must be updated if workspace changes
- Credits snapshot is stale (from 2026-07-13)
