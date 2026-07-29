---
layout: proposal
title: "Bifrost: Unlocking Bitcoin DeFi on Cardano — Road to Mainnet (Phase 1 of 2)"
proposal_id: gov_action1mlvplrdk2t7eyclqeca77ppmfq3sghkr5hdppjqhdqdd573r7q6qqms7jwt
proposal_type: TreasuryWithdrawals
status: active
tags: ["bitcoin", "bridge", "defi", "interoperability", "infrastructure", "spo"]
amount_ada: 12,332,031
proposed_epoch: 640
expiration: 647
meta_url: "ipfs://QmZwHmFoyhd18WMRhv9356CXfbUqjkPsKKGZtCpVLaWgcU"
meta_hash: "f95bd74697b3499760bc768b7400d9c1f57d3ff447e1c51cb9f0ec24a94c782b"
drep_yes_pct: ?
drep_no_pct: ?
drep_abstain_pct: ?
committee_yes: ?
committee_no: ?
context:
  - date: "2026-07-29"
    source: "Ace Alliance CC Analysis"
    author: "Ace Alliance Constitutional Committee"
    type: "constitutional-analysis"
    summary: "Current 350M NCL has ~14.4M ADA remaining. Bifrost (12.3M) would consume nearly all remaining headroom. Without NCL increase, fiscal runway is exhausted."
    link: "https://github.com/ace-alliance/ace-voting/blob/359bd49abe7a39604303d4999c71608f968b01e7/202607/epoch646_voting_statement.md"
    impact: "NCL constraint is critical for this proposal's feasibility"
  - date: "2026-07-29"
    source: "DRep Advisor Assessment"
    author: "Jonah Koch / DRep Advisor"
    type: "assessment"
    summary: "Very large infrastructure proposal for Bitcoin-Cardano bridge. Strong public value, no token, SPO-secured custody, excellent accountability structure. Concerns: 12.3M ADA price tag, delivery complexity, competitive landscape, NCL constraint."
    link: "./assessment-bifrost.md"
    impact: "Infrastructure assessment with cost, execution, and fiscal concerns"
---

This Treasury Withdrawal funds **Phase 1 of 2** for Bifrost, a permissionless Bitcoin-Cardano bridge secured by Cardano's SPO ecosystem via FROST threshold signatures. The request is **12,332,031 ADA** (~$1.97M at $0.16/ADA) for a 9-month delivery period (July 2026 - March 2027), plus a 10% refundable contingency.

## What Bifrost Does

- Brings BTC onto Cardano as **fBTC** (a native Cardano token, CNT)
- Secures custody through **400+ SPOs** using FROST threshold cryptography (not a company or fixed committee)
- Includes a **federated fallback mode** if SPO coordination fails
- Offers **atomic-swap fast lane** for time-sensitive users
- Provides **SDK and white-label portal** for dApp integration

## Phase 1 Deliverables

| Milestone | Timeline | Key Deliverable |
|---|---|---|
| M1 | Q3 2026 | Hardened release candidate, audit prep |
| M2 | Q4 2026 | External audits, formal verification, private mainnet prep |
| M3 | Q1 2027 | **Audited bridge running on mainnet** in both custody modes under controlled access |

**Phase 2** (public launch + 24 months operations, ~$1.3M) is a separate proposal planned for Q1 2027.

## Budget Breakdown

| Workstream | Amount (ADA) | % |
|---|---|---|
| Bridge hardening & Security | 8,523,438 | 69.1% |
| Ecosystem readiness & partnerships | 1,109,375 | 9.0% |
| Legal, stewardship & economy | 1,578,125 | 12.8% |
| Product management | 984,375 | 8.0% |
| Refundable contingency (10%) | 1,121,094 | — |
| **Total** | **12,332,031** | — |

## Team

- **FluidTokens** — Cardano DeFi since 2022, ~$18M TVL, products: lending, asset renting, Bitcoin token staking
- **Lantr Engineering** — Blockchain R&D, Scalus, infrastructure, cryptography
- Combined: 14 senior engineers across Aiken/Scalus, Bitcoin/Cardano smart contracts, Scala, Rust, cryptography

## Key Accountability Measures

- **No bridge token** — value flows through ADA and fBTC only
- **No founder allocation** — teams compensated from delivery, not protocol rents
- **Open source** — Apache 2.0 license
- **Independent stewardship** — foundation or equivalent to own bridge long-term (M3 deliverable)
- **SundaeSwap treasury contracts** — audited escrow with milestone gating
- **Independent oversight board** — Chris Gianelloni (Blink Labs), Matthias Benkort (Cardano Foundation), Riley Kilgore (IOG)
- **No.Witness Labs** — independent technical assurer
- **External financial audit** — at Phase 1 close

## Prior Funding

| Source | Amount | Status |
|---|---|---|
| Catalyst Fund 14 (Bifrost testnet) | 739,000 ADA | 33% received, on track |
| 2025 Treasury (Lantr - Scalus) | 657,692 ADA | 100% received |

## Current State

- **Live on testnet today**: [bifrost.fluidtokens.com](https://bifrost.fluidtokens.com/)
- Working peg-ins/outs on Bitcoin Testnet4 ↔ Cardano Preprod
- 5 SPOs volunteering for testnet: BTBF, ADA North Pool, BCSH, EASY1, DAVE
- 8 dApps expressed integration interest: Minswap, SundaeSwap, Masumi, Gravity, DeltaDefi, Liqwid, FluidTokens, Vela Finance
