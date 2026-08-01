# DRep Vote Rationale: Revised Cardano dOSPO and OMF Program Proposal

**Governance Action:** gov_action19apfhh339syqd0gkrxw6zr6pghdfspckr6vagjrpwnr0hx53lxpsq637y3t
**Proposal:** Withdraw ₳4,094,000 for dOSPO / Open Maintenance Framework (12 months)
**Vote:** **No**
**DRep:** Jonah Koch
**Date:** 2026-08-01
**Rubric:** Treasury Rule Book v17 (Unified Commercial, Infrastructure, Marketing and Public-Goods Edition)

---

## Summary

Voted No. Mission valid but structure doesn't earn ₳4.09M: single-key custody, advisory-only councils, non-binding replacement, mixed-proposal bundling. Would support revised version with script escrow, pre-formed oversight, narrower pilot.

---

## Rationale

I voted **No** on the Revised Cardano dOSPO and OMF Program Proposal.

Cardano's open-source infrastructure does need systematic support. Unpaid maintainers, decaying dependencies, and quiet erosion are real problems that eventually become loud failures. Christian Taylor understands this space and has the execution history to back it up. The quarterly reporting commitment and dependency-centrality selection are genuine improvements over ad-hoc funding.

But ₳4.09M in a single-key wallet is not a governance structure. It's a trust exercise. The two advisory councils give feedback but cannot block disbursements. The Info Action replacement mechanism sounds good on paper but does not transfer keys, terminate agreements, or enforce fund returns. That makes it a request for cooperation, not a circuit breaker. For a very-large treasury withdrawal, I need on-chain enforceable controls — not documented intentions.

The proposal also bundles five distinct workstreams into one ask. Maintenance retainers, mentor programs, bounties, hackathons, and legal entity formation each serve different purposes and deserve independent scrutiny. WP3's ₳1M mentor program costs roughly ₳31K per participant — CNCF's LFX Mentorship operates at a fraction of that with proven results. Bundled together, weaker components ride on stronger ones without facing the evaluation they'd get alone.

I don't doubt the mission. I doubt whether this specific structure earns ₳4.09M of public money. The custody model, the mixed-proposal bundling, and the non-binding governance safeguards are all fixable. I'd support a revised version with script-enforced escrow, pre-formed independent oversight, and a narrower pilot scope focused on the dependency audit and limited maintenance retainers first.

The treasury is finite. A proposal must earn its allocation from zero. This one hasn't yet.

---

## Rubric Assessment (v17)

### Constitutional Preflight (Hard Gates)

| Check | Finding | Verdict |
|-------|---------|---------|
| Governance-action content | On-chain, immutable anchor confirmed | ✅ Pass |
| Self-contained withdrawal | Depends on off-chain promises (council formation, 501(c)(3), replacement) | ⚠️ Concern |
| Administrator & oversight | Single administrator, advisory-only councils, no veto authority | ⚠️ Concern |
| **Custody & disbursement** | **Single-key stake address (not script-enforced escrow)** | ❌ **FAIL** |
| Dispute & recovery | Info Action replacement is non-binding for key handover | ⚠️ Concern |
| NCL | Would need current active limit verification | Pending |

**Hard gate failure:** A ₳4.09M very-large request landing in a single-key wallet is a material custody defect. v17 Rule 20: *On-chain enforceable controls carry more weight than non-binding intentions.* The safeguards (council feedback, quarterly reports, Info Action replacement) are all off-chain or non-binding. The funds are on-chain vulnerable from Day 1.

### Request-Size Classification

| Test | Result | Band |
|------|--------|------|
| Nominal request | ₳4,094,000 | Very Large (4M–20M) |
| Required score for Yes | — | **88/100** |
| Inputendorser's score | — | **64/100** |

Even if this proposal scored perfectly on public value and mission alignment, the custody defect alone is disqualifying for a very-large request.

### Mixed-Proposal Analysis (v17 Rule 6)

| WP | Purpose | Economic Substance | Scorecard |
|----|---------|-------------------|-----------|
| WP1 (₳760K) | Operations, councils, legal entity | Institutional capacity / overhead | Public-Good |
| WP2 (₳2M) | Maintenance retainers for critical infrastructure | Public asset / public service | Public-Good / Infrastructure |
| WP3 (₳1M) | Maintainer mentorship, contributor pipelines | Institutional capacity / public learning | Public-Good (with commercial training overlap) |
| WP4 (₳167K) | Bounties for discrete work | Public service | Public-Good |
| WP5 (₳167K) | Hackathons, summer of code, activation | Marketing / adoption | Marketing & Adoption |

**v17 mixed-proposal rule:** Each material workstream must pass its own hard gates. Commercial upside cannot hide in public-good labels. Do not average a failed workstream into a passing score. The proposal does not separate these for independent evaluation.

### Five Forms of Public Return

| Form | Present? | Durability |
|------|----------|-----------|
| Public asset | Yes — dependency audit, SBOMs, dashboard, code | ⚠️ Depends on continued hosting/administration |
| Public service | Yes — funded maintenance for critical infrastructure | ⚠️ Administered by single entity, no guarantee of continuity |
| Institutional capacity | Yes — mentor pipelines, contributor ladder | ⚠️ Expensive per-capita (WP3), no clear post-Treasury model |
| Public learning | Yes — quarterly reports, pilot data | ✅ Committed and verifiable |
| Avoided loss | Yes — preventing infrastructure decay | ⚠️ Real threat, but this is the core argument, not evidence |

The public learning component is strongest. The public service component is real but centralized. The institutional capacity component (WP3) is expensive relative to proven models.

### v17 32-Hard-Rules Test (Key Results)

| Rule | Application | Verdict |
|------|-------------|---------|
| Rule 1: Public money → public goods | Partially met; administered centrally | ⚠️ |
| Rule 6: Classification follows substance | Mixed proposal treated as pure public good | ❌ |
| Rule 10: Don't move down because purpose is valuable | Purpose is valuable; structure is weak | ❌ |
| Rule 20: On-chain enforceable > off-chain promises | Single-key address, non-binding replacement | ❌ |
| Rule 30: Subsidy-loop detection | Activity is explicitly Treasury-dependent; no post-Treasury revenue model | ⚠️ |

### Score Override Discipline (v17)

| Situation | Application | Result |
|-----------|-------------|--------|
| Passing score but failed hard gate | Custody/disbursement defect on very-large request | **No** |
| High score but wrong instrument | Pure grant for allocator function; no script escrow, no tranche enforcement | **No** |
| Low confidence due to applicant omission | Budget reconciliation gaps (WP3 totals, reserve rules) | **No** |

---

## Aligned DRep References

- **Inputendorser** — No (64/100, requires 90/100 for very-large requests)
- **Dori** — No (too centralized, no multisig, intermediary bloat)
- **CardanoYoda** — Abstain (improved from 12M/36mo version but annual rate unchanged, governance still concentrated)

---

## What Would Change My Vote

1. On-chain enforced, audited escrow (script-controlled disbursement with milestone gates)
2. Independent entity and councils formed BEFORE funds released (not Month 6, not advisory-only)
3. Narrower pilot scope — WP2 dependency audit + limited maintenance retainers only
4. Enforceable administrator replacement (multisig or contract-enforced, not Info Action + goodwill)
5. Current NCL verification confirming request does not breach active limit
