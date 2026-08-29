# Purpose: wikiskill-wiki-maintainer

## Motivation

The wiki is the persistent memory layer of the WikiSkill system. Without disciplined maintenance,
it becomes stale, redundant, or irrelevant. This skill codifies the process of extracting patterns
from session traces and keeping the wiki current.

## Wiki Patterns Addressed

- **Pattern compounding** — Wiki grows by accretion, not replacement
- **Evidence-based knowledge** — Every pattern cites specific sessions
- **Conservative creation** — Patterns require recurrence, not single occurrences

## Evolution History

| Iteration | Date | Change | Decision |
|-----------|------|--------|----------|
| 0 | 2026-08-29 | Initial creation | Adapted from paper's Wiki Maintainer agent prompt |

## Related Skills

- `wikiskill-session-trace` — Produces the traces this skill consumes
- `wikiskill-skill-proposal` — May consume patterns this skill produces
