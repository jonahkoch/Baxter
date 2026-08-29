# Purpose: cardano-expert

## Motivation

Cardano blockchain data is spread across multiple APIs (Blockfrost, Koios) with different strengths,
rate limits, and authentication requirements. This skill centralizes the querying knowledge and
provides helper scripts for common operations so that blockchain lookups are fast and reliable.

## Wiki Patterns Addressed

- **API abstraction** — Hides complexity of multiple blockchain APIs behind unified patterns
- **Script reuse** — Common queries packaged as executable scripts
- **Error resilience** — Documents failure modes and fallback strategies

## Evolution History

| Iteration | Date | Change | Decision |
|-----------|------|--------|----------|
| 0 | 2026-08-29 | Migrated to WikiSkill format | Restructured from legacy skill; no content changes |

## Related Skills

- `social-credibility-work` — May need blockchain queries for watchtower implementation
- `midnight-network` — Related Cardano ecosystem project (privacy-preserving sidechain)

## Known Limitations

- Blockfrost requires API key (not always configured)
- Scripts live in `skills/cardano-expert/scripts/` (legacy location)
- Governance rubric section was large; consider splitting to separate skill if it grows
