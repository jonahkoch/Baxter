# Purpose: social-credibility-work

## Motivation

The Social Credibility System is a Cardano-based protocol for non-repudiable social posts using
CIP-25 NFTs with hash-chain integrity. Unlike traditional social media where posts can be edited
or deleted, this system creates immutable records with cryptographic linking and an optimistic
recovery mechanism for key compromise scenarios.

## Wiki Patterns Addressed

- **Incremental smart contract development** — Large protocol broken into discrete phases (recovery → schema → tests → batching → watchtower)
- **Session continuity for complex projects** — Action plan + session log prevents context loss between coding sessions
- **On-chain/off-chain coordination** — Contract logic, metadata standards, and monitoring infrastructure must align

## Evolution History

| Iteration | Date | Change | Decision |
|-----------|------|--------|----------|
| 0 | 2026-08-29 | Migrated to WikiSkill format | Restructured from legacy skill; no content changes |

## Related Skills

- `cardano-expert` — Provides blockchain querying and governance assessment capabilities
- `kochfoto-agents` — Similar incremental work pattern structure

## Known Limitations

- Reference files (`references/*.md`) may not exist yet; create as needed during work sessions
- Economic parameters are defaults, not validated by simulation
- No automated test runner integration; tests run manually via Aiken CLI
