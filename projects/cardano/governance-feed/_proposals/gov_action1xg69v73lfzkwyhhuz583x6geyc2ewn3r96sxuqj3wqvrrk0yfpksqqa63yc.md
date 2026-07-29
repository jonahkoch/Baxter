---
layout: proposal
title: "Scalus 2026: Maintenance, Dijkstra Readiness, Interoperability & Application Runtime"
proposal_id: gov_action1xg69v73lfzkwyhhuz583x6geyc2ewn3r96sxuqj3wqvrrk0yfpksqqa63yc
proposal_type: TreasuryWithdrawals
status: active
tags: ["developer-tooling", "infrastructure", "scala", "jvm", "dijkstra"]
amount_ada: 2,464,844
proposed_epoch: 640
expiration: 647
meta_url: "ipfs://QmcZPndRnPR3giqybj1u24VVFx5q4csN9uYHuFCtT38uqD"
meta_hash: "e6b117c2522a69b1b693dd863181aa42b86d71fc928b5b5d40cc906d43515500"
drep_yes_pct: ?
drep_no_pct: ?
drep_abstain_pct: ?
committee_yes: ?
committee_no: ?
context:
  - date: "2026-07-29"
    source: "DRep Advisor Assessment"
    author: "Jonah Koch / DRep Advisor"
    type: "assessment"
    summary: "Resubmission of Scalus proposal, reduced from 8.5M to 2.46M ADA. Directly addresses prior DRep feedback. Fits under current NCL. Strong accountability, proven delivery track record."
    link: "./assessment-scalus-2026.md"
    impact: "Infrastructure assessment - reduced ask makes this viable under current NCL"
---

This Treasury Withdrawal funds **Scalus 2026**, a focused 9-month continuation of the Scalus Cardano development platform by Lantr Engineering. The request is **2,464,844 ADA** (~$394K at $0.16/ADA), with **no contingency**.

## What Scalus Is

Scalus is a JVM-native Cardano development platform for complex protocols and mission-critical applications. It's already used by:
- **Gummiworm L2** (state channels)
- **Bifrost** (Bitcoin-Cardano bridge)
- **SugarRush DEX** (on Gummiworm)
- **Vela stablecoin**
- **DID/DIDComm identity protocols**

And its components are embedded in:
- **MeshJS SDK**, **Lucid Evolution**, **Evolution SDK** (JS/TS)
- **Cardano Client Lib**, **YaciDevKit** (JVM)

## Scope (Reduced from Previous 8.5M Proposal)

| Workstream | FTE | Focus |
|---|---|---|
| Maintenance | 0.5 | Bug fixes, dependency upkeep, security patches |
| Dijkstra Readiness | 0.75 | Plutus V4, nested transactions, accounts, guard scripts |
| Interoperability | 0.25 | Java/Kotlin integration, JS/TS component improvements |
| Application Runtime | 0.5 | First scoped runtime step (event-driven, reactive workers) |
| Product Management | 0.25 | Milestone execution, partner coordination |

**Excluded from this proposal** (was in previous 8.5M version):
- Standalone JVM L1 node
- Full L2 integration
- Broad formal verification
- Advanced devnet expansion

## Budget

| Category | USD | ADA | % |
|---|---|---|---|
| Development & Engineering | $315,000 | 1,968,750 | 79.9% |
| Product Management | $39,375 | 246,094 | 10.0% |
| Documentation & Enablement | $25,000 | 156,250 | 6.3% |
| Audits & Assurance | $15,000 | 93,750 | 3.8% |
| **Total** | **$394,375** | **2,464,844** | **100%** |

## Accountability

- **SundaeSwap treasury contracts** (audited by TxPipe, MLabs)
- **Independent oversight board**: Chris Gianelloni, Matthias Benkort, Riley Kilgore
- **No.Witness Labs** — third-party technical assurer
- **External financial audit** — Q2 2027

## Prior Funding

| Source | Amount | Status |
|---|---|---|
| Catalyst F11 — Scalus | 200,000 ADA | 100% delivered |
| Catalyst F11 — Cost Library | 128,000 ADA | 100% delivered |
| Catalyst F13 — Tx Builder | 100,000 ADA | 100% delivered |
| 2025 Treasury — Scalus Platform | 657,692 ADA | 100% delivered |

## Key Changes from Previous Proposal

| | Previous (8.5M) | This (2.46M) |
|---|---|---|
| Budget | 8,503,000 ADA | 2,464,844 ADA |
| Duration | 12 months | 9 months |
| FTE | 8.25 | 2.25 |
| Contingency | 10% | 0% |
| L1 Node | In scope | Removed |
| L2 Integration | In scope | Removed |
| Reference Rate | $0.25/ADA | $0.16/ADA |

## Milestones

- **M1 (Q3 2026)**: Continuity & Dijkstra Preview — maintenance, initial Plutus V4 support, JS/TS interoperability improvements, runtime foundations
- **M2 (Q4 2026)**: Interoperability & Dijkstra Conformance — Java/Kotlin integration, ledger rules updates, chain follower, task scheduler
- **M3 (Q1 2027)**: Dijkstra Readiness & Runtime Consolidation — final readiness, runtime release with persistence, documentation
