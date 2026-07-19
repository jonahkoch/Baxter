# DRep Vote Rationale: MLabs Plutarch & Ply Maintenance

**Governance Action:** gov_action1k02990lhw6wh74t7c6ufw3mqaek9ujtvyan99dj5qv5kvcs7pn8svfsvefn
**Proposal:** Withdraw ₳1,162,746 for MLabs Core Tool Maintenance & Enhancement: Plutarch and Ply
**Proposed Epoch:** 638 | **Expiration:** Epoch 645
**Vote:** **Yes**
**DRep:** Jonah Koch
**Date:** 2026-07-19

---

## Summary

Vote: **Yes.**

This proposal funds maintenance of **Plutarch** (Haskell eDSL for efficient Cardano smart contracts) and **Ply** (serialization library for Plutarch scripts with CIP-57 blueprint support). These are established, open-source developer tools used by at least **26 teams** building on Cardano.

The ask is modest — ₳1.16M for annual maintenance — from a proven maintainer with transparent prior funding history. The value proposition is clear: without ongoing compatibility work, teams building on Plutarch face expensive migrations, rewrites, and friction as Cardano's ledger and Plutus/UPLC evolve.

I have the same transparency concerns I flag in every Intersect-administered proposal: thin budget detail, no ADA volatility policy, and milestones not visible in the public metadata. But at this scale — roughly $290K — those concerns are proportionate, not blocking. This is exactly the kind of open-source tooling maintenance the Treasury should fund.

---

## What This Proposal Gets Right

### 1. Genuine Public Asset with Proven Usage

Plutarch and Ply are not theoretical tools. They are:
- **Already open-source** and actively maintained
- **Used by 26+ teams** across DeFi, RWA, payments, games, and other verticals
- **Benchmarked publicly** — MLabs publishes cross-language benchmarks showing Plutarch ranks among the smallest, most efficient scripts
- **Forkable and inspectable** — the code exists, the repositories are public

This is not "build it and they will come." They are already here, and they depend on these tools.

### 2. Clear Additionality

Without maintenance funding, the tools fall behind Cardano's protocol evolution. The consequences:
- Teams face expensive smart contract stack migrations
- Existing production systems accumulate technical debt
- New builders choose other ecosystems with better-maintained tooling
- The 26+ teams already invested in Plutarch face uncertainty

MLabs explicitly frames this as **risk reduction**, not feature expansion. That is a responsible maintenance ask.

### 3. Proven Team with Transparent History

MLabs discloses prior funding transparently:

| Source | Amount | Purpose |
|---|---|---|
| Catalyst Fund9 | $73,040 | Plutarch/Ply |
| Catalyst Fund13 | ₳487,679 | Plutarch/Ply |
| Catalyst Fund13 | ₳57,370 | Plutarch/Ply |
| Intersect | ₳70,000 | Conway-era Plutarch update |
| **Cumulative prior** | ~$165K + ₳615K | **Proven delivery history** |

This is not a new team proposing to learn on the job. They have maintained these tools through multiple protocol eras.

### 4. Sensible Priority Hierarchy

The quarterly maintenance model has a clear priority order:
1. Critical breakages and serious vulnerabilities
2. Protocol-era and hard-fork compatibility
3. Bug fixes, correctness improvements, and optimizations
4. Documentation, examples, and developer-experience improvements

This prioritization is correct. Compatibility and correctness come before DX enhancements. The hierarchy also makes it clear what happens if upstream timing shifts — the most critical work gets done first.

### 5. Strategic Alignment

The proposal maps cleanly to Cardano 2030 strategy:
- **A.3 Developer Experience:** Directly supports maintenance of core SDKs and frameworks
- **A.1 High-Value Verticals:** Underpins DeFi, RWA, payments, games that depend on reliable smart contracts
- **Open-source tooling base:** Strengthens the builder ecosystem

### 6. Strong Decentralization Delta

Reliable developer tooling lowers barriers for new teams, reduces lock-in to single frameworks, and enables plural development. Plutarch's efficiency (demonstrated in public benchmarks) also means lower transaction costs for end users — a real accessibility improvement.

### 7. Low Dependency-Loop Risk

These are established tools with multiple downstream users. If MLabs stopped maintaining them, the code is open-source and could be forked. The ecosystem is not trapped in a subsidy dependency — the tools have organic adoption and proven utility.

### 8. Reasonable Price for Scope

₳1,128,880 + ₳33,866 admin fee = ₳1,162,746 total.

For annual maintenance of two core tools used by 26+ teams, this is proportionate. If anything, it is conservative compared to what a commercial software company would charge for equivalent support.

---

## Concerns (Not Blocking, But Noted)

### 1. Budget Lacks Detail

| Line Item | Amount |
|---|---|
| WP1 — Plutarch and Ply Maintenance, Compatibility & Developer Experience | ₳1,128,880 |
| Intersect Budget Administration fee | ₳33,866 |
| **Total** | **₳1,162,746** |

Two line items. I would prefer to see:
- FTE count and seniority mix
- Quarterly breakdown
- Specific deliverables per quarter
- Audit or security review costs
- Documentation and community support allocation

But at ₳1.16M, this opacity is a minor issue. At ₳25.4M (Intersect Ops), it is a blocking issue. Proportion matters.

### 2. No ADA Volatility Policy

Same gap as every other Intersect proposal. For a maintenance contract with ongoing costs:
- No conversion assumption
- No excess-return rule
- No underfunding plan

Given the modest amount, this is manageable. But it is still a gap.

### 3. Milestones Not Visible in Public Metadata

The proposal references "milestone-based disbursement controls" but does not list specific milestones. The quarterly model with priority hierarchy provides some structure, but DReps cannot verify what "done" looks like for each quarter without more detail.

### 4. Conway Update Was Small — Is This the Right Amount?

MLabs received ₳70,000 for the Conway-era Plutarch update. This proposal asks ₳1.13M for annual maintenance — roughly 16x the Conway update. Is that justified?

Context: The Conway update was a specific, bounded scope (updating for new ledger features). Annual maintenance covers:
- Ongoing compatibility across all protocol changes
- Bug fixes and optimizations
- Documentation and community support
- Quarterly review cycles
- Buffer for unexpected upstream changes

₳1.13M for a full year of maintenance for two tools used by 26+ teams is reasonable. The Conway update was an exception, not the baseline.

---

## Scorecard

| Category | Max | Score | Notes |
|----------|-----|-------|-------|
| Public value, additionality & productive value | 15 | 13 | Critical dev tooling; 26+ teams depend on it; strong downstream effects |
| Public asset / open-source / continuity | 15 | 12 | Already open-source; benchmarks public; forkable; proven utility |
| Team evidence & integrity | 10 | 8 | Proven maintainer; transparent prior funding; delivery history |
| Price & value (including ADA volatility) | 10 | 7 | Reasonable for scope; modest amount; no ADA volatility policy |
| Treasury return / risk sharing | 15 | N/A | Public good — no return expected |
| Milestones & verification | 15 | 9 | Quarterly model with clear priorities; details thin but acceptable |
| Decentralization delta & dependency graph | 10 | 8 | Positive — enables plural development; low subsidy-loop risk |
| Risk management & sustainability | 10 | 7 | No ADA volatility plan; but code is forkable; quarterly review model |
| **Base Score** | **100** | **64** | |
| Productive Ecosystem Multiplier | +3 | +3 | Strong downstream enablement; directly supports 26+ teams |
| Conviction | ±3 | +2 | Solid tooling ask from proven team at reasonable price |
| **Final Score** | **100** | **69** | |

**Threshold for ₳1.16M ask: ~60. This scores 69.**

---

## Final Statement

Vote: **Yes.**

Plutarch and Ply are real, open-source tools with proven adoption across the Cardano ecosystem. MLabs has maintained them through multiple protocol eras with transparent prior funding and demonstrated delivery. The ask — ₳1.16M for annual maintenance — is proportionate to the value at stake.

The transparency gaps I note (budget detail, ADA volatility policy, milestone visibility) are real but manageable at this scale. They are patterns across Intersect-administered proposals, not flaws unique to this one. I will continue to flag them, but I will not let them block well-justified, modest asks from proven maintainers.

This is the kind of proposal the Treasury should fund: established public infrastructure, proven team, clear additionality, reasonable price.

---

*This rationale reflects my independent assessment as a Cardano DRep. I have no material conflict of interest regarding this proposal. I do not hold a position in MLabs, nor do I have any commercial or financial relationship with MLabs or Intersect beyond my role as a DRep.*
