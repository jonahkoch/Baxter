# DRep Vote Rationale: Intersect Governance Coordination & Technical Stewardship

**Governance Action:** gov_action1k02990lhw6wh74t7c6ufw3mqaek9ujtvyan99dj5qv5kvcs7pn8sgx6wlxf
**Proposal:** Withdraw ₳25,400,000 for Intersect MBO Operations and Technical Stewardship
**Proposed Epoch:** 638 | **Expiration:** Epoch 645
**Vote:** **Abstain**
**DRep:** Jonah Koch
**Date:** 2026-07-19

---

## Summary

Vote: **Abstain.**

Intersect provides a function that Cardano genuinely needs: governance coordination, technical stewardship, incident response, and the operational backbone that translates community decisions into action. The November 2025 chain partition response demonstrated this value. A world without Intersect (or an equivalent) is a world where governance decisions sit unimplemented, security incidents go uncoordinated, and core repositories lack stewardship.

However, this proposal asks for **₳25.4 million** with minimal budget detail, represents **self-funding by the entity administering the funds**, and would bring Intersect's total Treasury receipts to nearly **₳48 million in under two years**. For an amount this large, I expect proportionate transparency. I do not find it here.

I cannot vote Yes in good conscience. But I also cannot vote No without first understanding whether the governance function would collapse without this funding. Abstain is not support. It is an acknowledgment that the question is too important to answer with the information available.

---

## What This Proposal Gets Right

### 1. Governance Coordination Is a Real and Necessary Function

Cardano's on-chain governance (CIP-1694) does not implement itself. Someone must:
- Coordinate network upgrades across environments
- Respond to security incidents and chain partitions
- Steward core Haskell repositories
- Facilitate committee structures (Technical Steering, Open Source, Civics, Product, Budget)
- Administer community-approved initiatives with milestone-based oversight

Intersect has done this. The November 2025 chain partition response is a concrete example of operational value. This is not theoretical.

### 2. Prior Funding Disclosure Is Transparent

The proposal explicitly discloses prior Treasury funding:

| Governance Action | Amount (ADA) |
|---|---|
| Intersect MBO | ₳15,750,000 |
| Product Committee | ₳750,000 |
| OSC (Open Source Committee) | ₳5,885,000 |
| **Prior Total** | **₳22,385,000** |

This is honest disclosure. It also means this proposal, if passed, would bring Intersect's 24-month Treasury total to **₳47,785,000**.

### 3. External Audit Commitment

Intersect has engaged **Appold** for independent audit and assurance. This is a positive step beyond self-reporting.

### 4. Net Change Limit Compliance

The proposal states compliance with the 350M Net Change Limit. Basic but necessary.

### 5. Budget Reduction Claim

Intersect claims the ask reduced from $7.875M to $6.35M year-over-year. I have not independently verified this, but the gesture toward restraint is noted.

### 6. Strong Smart Contract Oversight

Same Sundae Labs framework as other Intersect-administered proposals: multi-sig disbursement, Oversight Committee, public dashboard. This is a credible technical accountability layer.

---

## Blocking Issues

### 1. Self-Funding — Intersect Pays Itself ₳25.4M

This is the most fundamental concern. Intersect is both:
- **The applicant** requesting funds
- **The administrator** that will disburse, manage, and account for those funds

There is no arms-length separation. The Oversight Committee (Sundae Labs, Cardano Foundation, Dquadrant, NMKR, Sundial, Eternl) provides checks and balances on specific administrative actions, but:
- They do not set the budget
- They do not scope the work
- They do not evaluate whether the ask is justified
- They verify that funds move correctly, not that the right amount was asked for

This is not corruption. It is a **structural conflict of interest** that requires extraordinary transparency to overcome. The transparency is not present.

For comparison: When Eternl, Wirex, or Mithril request funds, a separate entity (Intersect) administers them. Here, Intersect administers its own funds. The oversight gap is material.

### 2. ₳18.8M for "Technical Stewardship, Incident Response & Coordination" — No Sub-Breakdown

| Work Package | Amount |
|---|---|
| WP1 — Intersect operations and ecosystem coordination | ₳6,000,000 |
| WP2 — Technical Stewardship, Incident Response & Coordination | ₳18,800,000 |
| WP3 — Management of critical processes | ₳600,000 |
| **Total** | **₳25,400,000** |

WP2 is 74% of the total ask and is described in one line. What does ₳18.8M buy?

Questions I cannot answer from the metadata:
- How many full-time engineers? At what salary bands?
- What specific repositories are stewarded and at what cost?
- What does "incident response" cost? Is this retained capacity or per-incident?
- What security initiatives (bug bounties, audits, penetration testing)?
- What is the cost of "release coordination"?
- Is this maintaining existing code or developing new features?
- What is the geographic distribution of the team?

For ₳18.8M — roughly $4.7M at $0.25/ADA — I expect a line-item budget. A single line item is not acceptable.

### 3. Cumulative Funding Is Enormous

If this passes, Intersect's Treasury funding in ~24 months:
- Prior: ₳22,385,000
- This proposal: ₳25,400,000
- **Total: ₳47,785,000**

That is approximately **$12 million** at current prices. For context:
- The entire Cardano Foundation annual budget is roughly in this range
- This is more than many Fortune 500 companies spend on open-source contributions
- It is more than the GDP of some small nations

I am not saying this amount is inherently wrong. I am saying that **an amount this large demands justification proportionate to its size**, and that justification is absent.

### 4. No ADA Volatility Policy

For a ₳25.4M operational funding request:
- No conversion assumption stated
- No excess-return rule if ADA appreciates
- No underfunding plan if ADA depreciates
- No clarity on salary denomination (ADA? USD? EUR?)

If ADA drops 40%, does Intersect lay off staff? Reduce scope? Or does the Treasury absorb the full loss? The proposal is silent.

### 5. Milestones Not Visible in Public Metadata

The proposal references "milestone-based drawdowns" but does not list the milestones. DReps cannot evaluate what success looks like without knowing what is being delivered.

### 6. Dependency-Loop Risk

Every ₳25.4M that flows to Intersect deepens the ecosystem's dependency on a single organization. This creates:
- **Too-big-to-fail dynamics:** Future DReps may feel compelled to fund Intersect regardless of merit because the alternative is operational chaos
- **Talent capture:** The best governance and technical coordination talent concentrates in one entity
- **Agenda setting:** Intersect controls both the administrative pipeline and its own funding

I am not alleging bad faith. I am pointing out that **structure shapes behavior**, and this structure concentrates power and dependency in ways that Cardano's governance design explicitly sought to avoid.

### 7. "Management of Critical Processes" at ₳600K Is Opaque

WP3 is small relative to the total but entirely undefined. What "critical processes"? How is "management" distinct from WP1 and WP2? This looks like a budget line that exists to absorb costs that don't fit elsewhere.

---

## What Would Earn My Support

If Intersect resubmits with the following changes, I would evaluate it with a genuinely open mind:

### 1. Detailed Breakdown of WP2

| Category | Amount | Detail |
|---|---|---|
| Engineering salaries | ₳X | FTE count, seniority mix, geographic bands |
| Security & incident response | ₳X | Retained capacity, tools, bug bounty pool |
| Repository stewardship | ₳X | Specific repos, maintenance scope, CI/CD costs |
| Release coordination | ₳X | Upgrade planning, testing infrastructure |
| Infrastructure & tools | ₳X | Servers, monitoring, DevOps |
| External contractors | ₳X | Scope, deliverables, selection process |
| Contingency | ₳X | Buffer percentage |

### 2. Arms-Length Budget Review

Before on-chain submission, have an independent third party (not Appold, which audits after the fact) review and publish a budget assessment. This could be:
- A DRep working group
- An external consultancy with no Intersect relationship
- A community-elected budget committee

### 3. Sunset or Transition Plan

How does Cardano reduce dependency on Intersect over time? Options:
- **Decentralization roadmap:** Specific milestones for transferring functions to community structures
- **Term limits:** Funding tranches with mandatory re-competition
- **Capability building:** Explicit investment in training/equipping alternative coordinators
- **Modularization:** Separate governance coordination, technical stewardship, and incident response into independently fundable units

### 4. ADA Volatility Policy

- Conversion assumption (e.g., $0.XX/ADA)
- Salary denomination clarity
- Excess-return rule
- Underfunding contingency plan

### 5. Published Milestones

Specific, measurable deliverables with verification criteria visible in the on-chain metadata, not hidden in dashboards that require post-enactment navigation.

### 6. Benchmark Against Comparable Organizations

How does this budget compare to:
- Linux Foundation operational costs per project
- Ethereum Foundation grants and operations
- Similar MBOs in other ecosystems

Without benchmarks, voters cannot assess whether ₳25.4M is reasonable.

---

## Scorecard

| Category | Max | Score | Notes |
|----------|-----|-------|-------|
| Public value, additionality & productive value | 15 | 9 | Governance coordination is genuinely important; value is diffuse and hard to quantify |
| Public asset / open-source / continuity | 15 | 5 | Processes, not code; minimal durable public asset creation |
| Team evidence & integrity | 10 | 5 | Proven operational capability; but self-evaluation is circular |
| Price & value (including ADA volatility) | 10 | 2 | ₳25.4M with 3 line items is unacceptable; no ADA volatility policy |
| Treasury return / risk sharing | 15 | N/A | Civic service — no return expected; but cost is enormous |
| Milestones & verification | 15 | 4 | Framework exists; milestones not visible; Appold audit is post-hoc |
| Decentralization delta & dependency graph | 10 | 3 | Centralizes coordination; deepens dependency; no sunset plan |
| Risk management & sustainability | 10 | 3 | No ADA volatility plan; creates too-big-to-fail dynamics |
| **Base Score** | **100** | **31** | |
| Productive Ecosystem Multiplier | +3 | 0 | Indirect effects only; no measurable downstream work enabled |
| Conviction | ±3 | — | Important function, structurally flawed ask |
| **Final Score** | **100** | **31** | |

**Threshold for ₳25.4M ask: 85+. This scores ~31.**

The score is low because of transparency and structural issues, not because the function is unimportant. If Intersect provided a detailed WP2 breakdown, an arms-length budget review, a sunset plan, and an ADA volatility policy, this score could rise substantially.

---

## Why Abstain, Not No

A No vote would reject the funding entirely. I am not prepared to do that because:

1. **The function is genuinely important.** Governance coordination does not happen spontaneously. Someone must do it.
2. **I do not have a better alternative ready.** If Intersect were defunded tomorrow, I cannot point to an entity ready to assume these responsibilities.
3. **The operational track record exists.** Intersect has delivered network upgrades, incident response, and committee coordination. This is not vaporware.

But a Yes vote would endorse a **₳25.4M self-funded request with minimal detail**, setting a precedent that I cannot support. The next applicant — commercial or civic — will point to this and say, "Intersect got ₳25.4M with three line items. Why do I need more?"

Abstain is the honest position: **I cannot judge this proposal reliably with the information provided.** It is not support. It is not rejection. It is a demand for better information before I commit either way.

---

## Final Statement

Vote: **Abstain.**

Intersect performs a function that Cardano needs. The governance coordination, technical stewardship, and incident response capabilities are real and have been demonstrated. I do not dismiss the value of this work.

But **value does not justify any price**, and **self-funding does not justify opacity**. For ₳25.4 million — nearly ₳48 million cumulative — I expect:
- A detailed budget, especially for the ₳18.8M "technical stewardship" line item
- An arms-length review before the ask reaches the chain
- A plan to reduce long-term dependency on a single entity
- An ADA volatility policy
- Published milestones with verification criteria

None of these are present. I will not vote Yes on faith. And I will not vote No on a function the ecosystem genuinely needs without a clear alternative.

Abstain is my vote. If Intersect resubmits with the transparency and structural improvements outlined above, I will evaluate it with fresh eyes and a genuinely open mind.

---

*This rationale reflects my independent assessment as a Cardano DRep. I have no material conflict of interest regarding this proposal. I am not a member of Intersect and hold no position or commercial relationship with Intersect or its Oversight Committee members.*
