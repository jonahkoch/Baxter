# DRep Assessment: Se7en Labs — Daedalus Wallet Maintenance 2026-2027

**Proposal ID:** gov_action1mr0qdz2jmagvsch6r08fhqvq6vu8jakt4c8m9s7ea7z0p740vntqq4yjd6j  
**Type:** TreasuryWithdrawals  
**Amount:** 1,785,333 ADA (~$1.07M @ $0.60/ADA)  
**Status:** Active (Epoch 645, expires Epoch 646)  
**Applicant:** Se7en Labs, Inc. (Samuel Leathers)  
**Administration:** Intersect (Sundae Labs smart contract framework)

---

## Summary

Funds 12 months of Daedalus wallet maintenance and improvements, transitioning from an expiring IOG contract to community treasury funding. Daedalus is Cardano's only full-node desktop wallet — every installation runs an embedded cardano-node. Scope covers protocol maintenance (node upgrades, hard fork readiness for Leios/Peras/Nested Transactions), ecosystem expansion (Keystone/Flex hardware wallet support, CIP-30 dApp connector, Japanese localization), and user support.

---

## Key Details

| Category | Detail |
|----------|--------|
| **Team** | Se7en Labs (~4-5 engineers). Inherited broken codebase Jan 2026, shipped Daedalus 8.0 and 11.0 under IOG contract. Members founded DripDropz, contributed to Hydra Doom, chaired Cardano Product Committee. |
| **License** | Apache 2.0 — all outputs permanently public and forkable |
| **Budget** | Team labor: 1,666,667 ADA \| Test hardware: 33,333 ADA \| Financial audit: 33,333 ADA \| Intersect admin fee: 52,000 ADA |
| **Structure** | Time & materials, monthly disbursement against verified work |
| **Oversight** | Intersect admin + Sundae Labs treasury smart contracts + 6-member Oversight Committee (Sundae Labs, Cardano Foundation, Dquadrant, NMKR, Sundial, Eternl) |
| **Return address** | stake1u85was6qks0exltkfl74clay4p6l272ry6kpkgweyfs7vtcvaj7xm |
| **Treasury recipient** | stake1784sdxt6jjennmstphgdu7l7c2scf5d02a6cve2dgn5s2kq5u3j9v (Sundae Labs TRSC) |
| **Prior funding** | IOG contract since Jan 2026 (closing Aug 2026). No prior Treasury funds in 24 months. |

### Milestones
1. **Hard Fork Integration** (6 weeks) — Compatible release ≥2 weeks before each mainnet hard fork
2. **Ongoing Maintenance** (52 weeks) — Node/wallet backend updates, signed releases, Japanese translation, CI
3. **Leios/Peras Readiness** (26 weeks) — Compatible node versions ahead of testnet/mainnet activation
4. **Hardware Wallet Support** (12 weeks) — Keystone + Flex support
5. **CIP-30 dApp Connector** (20 weeks) — Full-node dApp access without browser wallet
6. **User Support** (52 weeks) — GitHub, forums, direct channels; Japanese-first support
7. **Architecture Assessment** (8 weeks) — Published assessment of potential Daedalus rewrite

### Current Voting (Epoch 645)
- **DRep Yes:** 133 votes, 62.13% active power (2.34B ADA)
- **DRep No:** 15 votes, 37.87% active power (102M active / 1.43B total)
- **Pool:** No votes cast
- **Committee:** 3 Yes (42.86%), 0 No (57.14% abstain)

---

## Assessment

### Layer 0 — Priority & Fit Screen

| Question | Verdict |
|----------|---------|
| Real Treasury priority? | **Yes** — Daedalus is the only full-node desktop wallet. Client diversity is explicit in the ratified Cardano Vision & Strategy (I.2). |
| Public value? | **Strong** — Public asset (Apache 2.0 code, releases, docs), public service (maintenance, support), institutional capacity (full-stack team), avoided loss (~4K+ users stranded without alternative). |
| Appropriate instrument? | **Yes** — TreasuryWithdrawal for operational maintenance. T&M is correct for work with shifting scope (upstream node changes, hard forks). |
| Decentralization impact? | **Positive** — Every Daedalus user is a full node. Losing it shrinks the full-node footprint. |
| Opportunity cost? | **Justified** — $1.07M/year for a multi-platform full-node wallet with release engineering, Nix builds, and security maintenance. Alternative is no full-node desktop option. |
| Productive ecosystem effects? | **Yes** — CIP-30 unlocks dApp access for full-node users. Hardware wallet support expands security options. Japanese localization preserves a historically key community. |

**Layer 0: PASS**

### Layer 1 — Proposal Quality

**Section A: Basics**
- ✓ Accountable applicant with public track record (DripDropz, Hydra Doom, Product Committee chair)
- ✓ Clear ask: 1.78M ADA for 12 months
- ✓ Itemized budget (labor, hardware, audit, admin fee)
- ✓ Prior funding disclosed (IOG contract, no Treasury history)
- ✓ No conflicts disclosed

**Section B: Value & Impact**
- ✓ Public asset quality: Apache 2.0, all outputs permanently public and forkable
- ✓ Productive public value: Every deliverable benefits the public
- ✓ Additionality: IOG contract ends Aug 2026. Without this, maintenance stops.
- ✓ Critical gap: Daedalus is the ONLY full-node desktop wallet. No replacement exists.
- ✓ Counterfactual harm: ~4K+ MAU lose wallet option; network loses full-node users
- ✓ Retained impact: Apache 2.0 ensures code survives even if team disappears

**Section C: Execution & Accountability**
- ✓ Team evidence: Detailed delivery record since Jan 2026 (Mithril bootstrap, UTxO-HD/LSM, Apple Silicon, drt release toolchain, Nix modernization)
- ✓ Milestones: 7 work packages with acceptance criteria and timelines
- ✓ Independent verification: Release metrics verifiable from public GitHub and mainnet chain
- ✓ Anti-gaming: T&M with monthly disbursement; unspent funds returned to treasury
- ✓ Enforceability: Sundae Labs smart contracts with 2-of-5 + 2-of-6 + 1-of-3 multisig for disbursement

**Section D: Commercial** — Not applicable. Pure public good. No revenue capture, subscription, token value, or IP exclusivity.

**Section E: Marketing & Adoption** — Not applicable. Infrastructure maintenance.

**Section F: Decentralization Delta** — **Positive**. Maintains the primary mechanism for non-technical users to run a full node. Directly supports Vision & Strategy target of ≥2 alternative full-node clients.

**Section G: Risk & Sustainability**
- ✓ ADA volatility: Converted to USD stablecoins promptly; labor invoiced at spot rate
- ✓ Risk register: 5 risks identified with likelihood/impact/mitigation (ADA volatility, upstream API changes, Leios/Peras complexity, platform dependencies, team continuity)
- ✓ Margin of safety: T&M structure flexes with scope; unspent funds returned
- ⚠ Sustainability: Ongoing operational need — will require future funding cycles. Mitigated by Apache 2.0 license enabling community fork.
- ✓ Operator reality: Team already doing the work; inherited broken codebase and shipped releases

**Section H: Subsidy-Loop & Dependency-Graph Check** — Acceptable dependency. This is core operational infrastructure, not a business model subsidy. The alternative (no full-node wallet) is worse than the dependency.

---

## Comparison to Similar Proposals

| Proposal | Amount | Type | Assessment |
|----------|--------|------|------------|
| **This proposal (Se7en Labs / Daedalus)** | 1.78M ADA | Wallet maintenance | Strong public good, proven team, clear deliverables |
| Cardano Node Maintenance (TxPipe/Well-Typed/etc) | ~6M ADA | Node maintenance | Similar model — core infrastructure, multiple vendors |
| Mithril Protocol (TxPipe) | 3.81M ADA | Protocol maintenance | Similar — operational infrastructure, open-source outputs |

This proposal fits the same pattern as other core infrastructure maintenance proposals: fund operational upkeep of essential open-source software with proven teams and verifiable outputs.

---

## Strengths

1. **Proven delivery record** — Team inherited a non-releasable codebase in Jan 2026 and shipped Daedalus 8.0 and 11.0 within months. Daedalus 11.0 was the first wallet to cross the node 11.0 hard fork.
2. **Genuine public good** — Apache 2.0, no monetization, no captive customer relationships. The community owns the outputs regardless of what happens to Se7en Labs.
3. **Critical infrastructure** — Daedalus is the only full-node desktop wallet. Losing it means losing the primary on-ramp for non-technical users to run a full node.
4. **Honest risk register** — Includes ADA volatility, upstream changes, and team continuity with concrete mitigations.
5. **Strong oversight** — Intersect + Sundae Labs smart contracts + 6-member external Oversight Committee. Disbursement requires multi-party signatures.

## Concerns

1. **Sustainability** — This is a 12-month band-aid. Daedalus will need funding again in 2027-2028. The team should begin planning for long-term sustainability (e.g., multiple funding sources, community governance transition) during this contract period.
2. **Amount justification** — 1.67M ADA for labor implies ~$640K/year for the team. With ~4-5 engineers, that's $128K-$160K/person — reasonable for specialized blockchain infrastructure work, but the proposal could be clearer on headcount.
3. **CIP-30 timeline** — 20 weeks for CIP-30 in a full-node wallet with Electron/native module complexity may be optimistic. The Electron upgrade (17 major versions) is noted as in-progress and complex.

---

## Vote Recommendation

**Vote: YES**

This proposal clears my public-value, public-asset, and accountability checks. Cardano receives the only full-node desktop wallet maintained for another year, with CIP-30 dApp access, hardware wallet expansion, and hard fork readiness for Leios/Peras/Nested Transactions. The price of ~1.78M ADA (~$1.07M) is justified by the complexity of the product and the team's proven delivery record since January 2026. All outputs are Apache 2.0 licensed public assets. The decentralization delta is positive — every Daedalus user is a full node, and the Vision & Strategy framework explicitly targets client diversity.

The sustainability concern is real but acceptable for core operational infrastructure. The team should use this contract period to plan for long-term funding continuity.

---

## Data Sources

- Koios API: `/api/v1/proposal_list` — proposal metadata and on-chain data
- Koios API: `/api/v1/proposal_voting_summary` — current vote tallies
- IPFS metadata: `ipfs://QmdWtCCvK6CJUzP4SFiuL5W8hg3eNr5LyngJHnwjoNxJey` — full proposal text
- Cardano Vision & Strategy framework (ratified Jan 2026) — cited in proposal rationale
- Daedalus GitHub: `github.com/input-output-hk/daedalus` — verifiable release history
