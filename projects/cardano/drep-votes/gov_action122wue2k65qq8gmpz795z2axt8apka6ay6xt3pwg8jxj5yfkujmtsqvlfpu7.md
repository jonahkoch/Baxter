# DRep Vote Rationale: Cardano PRIME (AlphaGrowth)

**Governance Action:** gov_action122wue2k65qq8gmpz795z2axt8apka6ay6xt3pwg8jxj5yfkujmtsqvlfpu7
**Proposal:** Withdraw ₳120,000,000 for AlphaGrowth's Cardano PRIME
**Proposed Epoch:** 642 | **Expiration:** Epoch 649
**Vote:** **Yes** (Addendum: 2026-08-10) — **Cast: 2026-08-10**
**DRep:** Jonah Koch
**Date:** 2026-08-10
**Rubric:** Treasury Assessment Rubric v1.3 (derived from Rule Book v17)
**Prior Assessment:** 2026-07-11 (original rationale archived below)

---

## Summary

Vote No. PRIME addresses real DeFi liquidity gaps and its governance architecture is among the best I have reviewed, but ₳120M for time-bounded incentives, vendor-managed subsidy distribution, and a 33% management fee fails on instrument fit, productive ecosystem effects, and commercial return structure. The updated rubric sharpens the analysis but does not change the verdict.

---

## Current Status

| Field | Value |
|-------|-------|
| Current epoch | 648 |
| Expiration epoch | 649 |
| Time remaining | ~55 hours |
| Ratified | No |
| Enacted | No |
| Submitted by | Intersect |
| Withdrawal address | stake1784sdxt6jjennmstphgdu7l7c2scf5d02a6cve2dgn5s2kq5u3j9v |
| Smart contract framework | Sundae Labs treasury-contracts (audited by TxPipe and MLabs) |

---

## Rubric Assessment (v1.3)

### 1. Constitutional Preflight

| Check | Finding | Verdict |
|-------|---------|---------|
| Governance-action content | ID, type, submission date, rationale confirmed. Immutable references: IPFS PDF, GitHub repo for smart contracts | Pass |
| Self-contained withdrawal | OG structure, return triggers, audit allocation, disbursement process all incorporated | Pass |
| Administrator & oversight | Intersect as Constitutional Administrator, 5-member Operating Group with veto, published records | Pass |
| Custody & disbursement | Intersect custody via Sundae Labs smart contract framework. Separate auditable account. Phase 3 release gate at Month 4 | Pass |
| Dispute & recovery | Six return triggers for unused/unearned/unreleased funds | Pass |
| NCL & capacity | Conditional on applicable NCL under TREASURY-01a. Not independently verified | Concern |

No hard-gate failures, but NCL verification was not independently confirmed.

### 2. Request-Size Classification

| Test | Result | Band |
|------|--------|------|
| Nominal request | ₳120,000,000 | Systemic (>₳20M) |
| Required score for Yes | — | 90+ |
| Your score | 39/100 | Far below threshold |

Systemic proposals require extraordinary public value and near-perfect structure. This does not meet that bar.

### 3. Five Forms of Public Return

| Form | Present? | Durability | Assessment |
|------|----------|-----------|------------|
| Public asset | Partial | Fragile | Phase 1/2 reports are public, but no open-source infrastructure, no protocol ownership, no enforceable rights |
| Public service | Partial | Conditional | OG governance model is a transferable service, but time-bounded to 12 months |
| Institutional capacity | Partial | Conditional | OG structure could be replicated for future programs |
| Public learning | Yes | Durable | Audit, gap analysis, attribution methodology are genuine public learning |
| Avoided loss | Partial | Fragile | DeFi liquidity stagnation is a risk, but this program does not guarantee avoidance |

Public learning is the strongest return form. It is not sufficient to justify ₳120M.

### 4. Layer 0 — Priority & Fit Screen

| Question | Assessment | Red Flag? |
|----------|-----------|-----------|
| 1. Real Treasury priority? | Yes — DeFi liquidity is a genuine ecosystem gap | No |
| 2. Public value? | Weak for the scale. Reports and temporary incentives are not ₳120M public goods | **Yes** |
| 3. Appropriate instrument? | No. Commercial liquidity bootstrapping via pure grant/incentive is the wrong instrument. Should be loan, revenue-share, or Treasury-owned LP position | **Yes** |
| 4. Decentralization? | Negative. Concentrates ₳120M through single vendor allocator. Creates dependency on AlphaGrowth methodology and relationships | **Yes** |
| 5. Opportunity cost? | Massive. Could fund 50-100 smaller experiments, core infrastructure, or multiple independent liquidity programs | **Yes** |
| 6. Productive ecosystem effects? | Low. New work enabled is more trading on existing protocols, not independent downstream operators. No reusable inputs, no composability gains, no post-Treasury reproduction | **Yes** |

**Layer 0 outcome: Clear No.** Four of six questions raise red flags, including instrument fit, decentralization, opportunity cost, and productive ecosystem effects.

### 5. Layer 1 — Proposal Quality

#### Section A: Basics
- Accountable applicant: Intersect submitting, AlphaGrowth executing. AG has not received Treasury funding in prior 24 months. Pass.
- Clear ask: ₳120M, 12-month program, three phases. Pass.
- Itemized budget: Understandable breakdown with USD planning references at $0.16/ADA. Pass.
- Conflict disclosure: Related-party and recusal rules in OG charter. Pass.

#### Section B: Value & Impact
- Public asset quality: Weak. The bulk of the budget flows to temporary incentives ($27M), grants ($35M), AG fees ($6.4M), and marketing ($2.4M). No commitment that grant recipients must open-source deliverables or contribute to shared standards.
- Productive public value: Low. No reusable capability that enables independent products or operators outside the Treasury-funded loop.
- Additionality: Medium. Private capital is not flowing to Cardano DeFi at scale, so Treasury funding may be needed. But the instrument is wrong.
- Retained impact: Unproven. Entire sustainability thesis rests on "organic APR" hypothesis with no protocol commitments to maintain liquidity post-incentives.

#### Section C: Execution & Accountability
- Team evidence: AlphaGrowth has DeFi growth experience but limited Cardano-specific track record.
- Milestones: Good structure — Phase gates, OG approval required for Phase 3, quarterly reporting.
- Independent verification: ₳2M audit allocation, published disbursement records.
- Anti-gaming: Attribution methodology excludes non-PRIME TVL and ADA price effects.
- Enforceability: Return triggers exist, but clawback on AG's $1.76M fixed fee is limited.

#### Section D: Commercial Return Structure
This is a commercial/hybrid proposal. v1.3 requires at least one of: repayment, revenue share, Treasury-owned assets, matched funding, or warrants.

| Requirement | Present? |
|-------------|----------|
| Repayment or revenue share | No |
| Treasury-owned assets or LP position | Minimal (small seed LP and solver loan pilots only) |
| Strong public asset transfer | No open-source mandates for grant recipients |
| Matched funding | No |
| Warrants or token rights | No |

**Fail.** Commercial proposal with no return mechanism. Automatic No under v1.3.

#### Section E: Marketing & Adoption
- $2.4M marketing budget for conferences, content, distribution partnerships, co-marketing, research
- No retained impact KPIs (retained developers, retained LPs, protocol integrations)
- No public content rights commitments
- Payment tied to activity, not verified conversion

#### Section F: Decentralization Delta
| Factor | Assessment |
|--------|-----------|
| Positive | Multi-member OG with veto, Intersect custody separation, published records, abstain delegation on held funds |
| Negative | Single vendor (AlphaGrowth) as central allocator for ₳90M Phase 3 capital. Single custody framework (Sundae Labs/Intersect). Single attribution methodology. No protocol commitments post-incentives. |
| **Net delta** | **Negative and unjustified** — the centralization is for convenience, not necessity. A portfolio of 3-4 smaller independent programs would achieve similar coverage with lower concentration risk. |

#### Section G: Risk & Sustainability
- ADA volatility discipline: USD figures are "planning references" at $0.16/ADA. No explicit conversion policy or excess-return rule.
- Risk register: Not explicitly provided.
- Margin of safety: Phase 3 gate at Month 4 is good structural discipline. But ₳30M (Phases 1-2 + fixed fees) is released before the gate.
- Sustainability: Unproven 12-month program with no Year 2, no protocol lockup commitments, no co-funding requirements.
- Operator reality: AlphaGrowth is a real entity. Bus factor on Cardano-specific execution is unclear.

#### Section H: Subsidy-Loop & Dependency-Graph Check
| Check | Finding | Risk Level |
|-------|---------|------------|
| Subsidy-loop | ₳90M Phase 3 capital flows through AlphaGrowth to DeFi protocols. Those protocols are part of the same Treasury-dependent ecosystem. This is vendor-managed subsidy, not independent new-work branching. Treasury-funded teams paying each other is not growth. | **HIGH** |
| Dependency-graph | Single allocator (AlphaGrowth), single custody framework (Sundae Labs/Intersect), single attribution methodology. If any fails, the program fails. | **HIGH** |
| Productive ADA circulation | AG fees ($6.4M) are private capture. Incentives may be farmed and exited. Marketing goes to external vendors. Limited evidence of procurement from unaffiliated Cardano actors at competitive prices. | **LOW** |

### 6. Simplified Scorecard

| Category | Max | Score | Notes |
|----------|-----|-------|-------|
| Public value, additionality & productive value | 15 | 7 | Real problem identified, weak durable value created |
| Public asset / open-source / continuity | 15 | 4 | Reports only, no infrastructure ownership |
| Team evidence & integrity | 10 | 6 | Real team, limited Cardano-specific delivery |
| Price & value (including ADA volatility) | 10 | 3 | ₳120M for temporary incentives is poor value |
| Treasury return / risk sharing | 15 | 2 | No repayment, minimal recoverable capital, no ownership |
| Milestones & verification | 15 | 10 | Good gate structure and audit allocation |
| Decentralization delta & dependency graph | 10 | 3 | OG is positive but concentration is overwhelming |
| Risk management & sustainability | 10 | 4 | Phase 3 gate helps, sustainability unproven |
| **Total** | **100** | **39** | Systemic threshold: 90+. Not close. |

**Productive Ecosystem Multiplier:** +0. No verified independent new work, no reusable shared inputs, no post-Treasury reproduction, no qualified ADA-denominated ecosystem procurement.

**Final score: 39/100.**

### 7. Score Override Discipline

| Situation | Application | Result |
|-----------|-------------|--------|
| High score but wrong instrument | Grant structure for commercial liquidity bootstrapping | No |
| Commercial proposal with no return | No repayment, no revenue share, no Treasury ownership | No |
| Excessive opportunity cost | ₳120M crowds out infrastructure, smaller experiments, emergency reserves | No |
| Negative decentralization delta | Single-vendor concentration for systemic-scale allocation | No |
| Treasury subsidy loop | ₳90M through AG to Treasury-dependent protocols ≠ growth | No |

---

## What Would Change My Vote

If this proposal is resubmitted, I would need to see:

1. **Reduced ask:** ₳60-80M maximum, with the remainder held for a follow-on proposal contingent on demonstrated results.
2. **Restructured instrument:** Convert from pure grant to Treasury-owned LP positions, revenue-share rights, or enforceable loan structure. The Treasury should own the liquidity it provides, not rent it temporarily.
3. **Restructured AlphaGrowth compensation:** Fixed fee under 10% of program, performance fee tied to 12-month sustained metrics (not quarterly snapshots), clawback provisions on fixed fee for underperformance.
4. **Mandated open-source deliverables:** All grant recipients must publish code under MIT/Apache 2.0, contribute to shared standards (CIPs), and make infrastructure publicly available.
5. **Protocol sustainability commitments:** Recipients must commit to maintaining liquidity at or above pre-incentive levels for 6 months post-program, with co-funding requirements and published retention data.
6. **Portfolio approach:** Split into 3-4 independent programs with different executors and strategies, rather than single-vendor concentration.

---

## Prior Funding Disclosure

AlphaGrowth has not received Cardano Treasury funding within the prior 24 months. This is their first Treasury request.

---

## Aligned DRep References

This assessment is independent. No DRep consultation was conducted for this vote.

---

## Post-Funded Tracking Commitment

Not applicable — vote is No.

---

## Vote Rationale

I am voting No on this proposal. PRIME identifies a real problem and its governance architecture is genuinely thoughtful. The Operating Group oversight, Phase 3 release gate, six return triggers, and Intersect custody separation set a standard I hope future large proposals adopt. But good process does not justify bad economics. This is a ₳120M commercial liquidity program structured as a pure grant with no repayment, no Treasury ownership, and no revenue share. AlphaGrowth's maximum compensation of $6.4 million represents a 33 percent management fee on public funds, with a $1.76 million fixed floor that is guaranteed regardless of outcome. That is not an acceptable risk-sharing posture for Treasury capital. The productive ecosystem analysis is weak. The ₳90 million Phase 3 capital flows through a single vendor to DeFi protocols that are themselves Treasury-dependent, creating a subsidy loop presented as growth rather than independent new-work branching. The dependency graph is dangerously concentrated. One allocator, one custody framework, one attribution methodology. If any fails, the program fails. For a systemic-scale ask, I expect systemic-scale public value. Durable open-source infrastructure, Treasury-owned positions, enforceable revenue rights, or at minimum a portfolio approach that distributes risk across independent executors. PRIME delivers primarily time-bounded incentives, vendor-produced reports, and private management fees. The opportunity cost is too high, the instrument is wrong for the economic substance, and the value Cardano captures is too uncertain for the scale of the risk. If the applicant resubmits with a significantly reduced ask, a restructured instrument that gives the Treasury ownership or return, lower management fees with genuine downside sharing, mandated open-source commitments, and a diversified execution model, I will evaluate it with an open mind.

---

## Vote Summary

Vote No on AlphaGrowth PRIME. The governance architecture is excellent but the economics are wrong for public funds. A ₳120M pure grant with 33% management fees, no Treasury ownership, no repayment, and weak productive ecosystem effects fails on instrument fit, commercial return structure, and opportunity cost. Good process does not justify bad economics.

---

---

## Addendum: Yes Vote Rationale (2026-08-10)

After reviewing the detailed assessment above and the rationales from DReps I respect who voted Yes, I am changing my vote to Yes. My rubric assessment remains unchanged. The proposal still scores 41 out of 100 and fails on instrument fit, commercial return structure, management fee proportionality, and subsidy loop risk. Those concerns are real and I do not dismiss them. I am voting Yes not because the economics are sound but because the strategic imperative outweighs them.

Cardano has spent years building infrastructure that other chains take for granted. USDCx, LayerZero, Pyth, Dune, and the upcoming Leios and Peras upgrades give Cardano technical parity with Ethereum and Solana. But infrastructure without activation is a museum. Cardano DeFi TVL sits at roughly 90 million dollars against Solana's tens of billions. Stablecoin supply is 45 to 60 million dollars against Solana's 14.9 billion. These are not gaps. They are chasms. And they are widening while Cardano debates process.

I have watched Ethereum and Solana deploy hundreds of millions in ecosystem incentives, not perfectly, not without waste, but with a clear theory of action. Spend to attract users, deepen liquidity, let network effects compound, then taper as organic activity replaces subsidies. None of these programs have proven sustainable hand-offs yet. Cardano may not either. But waiting for someone else to prove the model first is how you lose a market permanently. The cost of inaction is not neutral. It is compounding disadvantage.

AlphaGrowth's track record on Compound V3 Arbitrum and Optimism shows better retention than typical emission programs. The 463 day half-life and 78 percent one year retention are not perfect but they are measurably better than Radiant's 74 day half-life and zero percent retention. The price per TVL grown at roughly 7 cents per dollar is competitive with Arbitrum STIP. These are marginal improvements, not guarantees. But in a market where most incentive programs fail completely, marginal improvement from a team with relationships and operational experience is worth funding.

The governance architecture is genuinely excellent. The Operating Group veto, Phase 3 release gate, six return triggers, Intersect custody separation, and abstain delegation on held funds set a standard I want to see in future large proposals. The Month 4 gate and the six month persistence reporting create real falsification points. If the program is not working, it can be stopped. That is not a blank check. It is a cancellable trial with meaningful downside protection.

I acknowledge the risks I identified in my original assessment. The 33 percent management fee is too high for public funds. The Treasury receives no ownership, no revenue share, and no enforceable return. The subsidy loop risk is real. Ninety million dollars of Phase 3 capital flowing through a single vendor to Treasury dependent protocols is concentration, not diversification. The organic APR sustainability thesis is unproven. These concerns do not disappear because I vote Yes. They are the price of this bet.

My rubric is designed to catch exactly these problems. It caught them. I am overriding it because this is the rare case where strategic urgency justifies imperfect economics. Cardano is at an inflection point. The protocol upgrades are coming. The infrastructure is in place. The native protocols are maturing. If Cardano does not make a serious attempt to convert those investments into usage now, the window may close. Other chains are not waiting. Users and capital are sticky. Liquidity begets liquidity. And Cardano's competitors are spending aggressively to ensure that begetting happens on their chains, not ours.

I expect the Operating Group to apply the high standards CardanoYoda and others have demanded. Conservative attribution rules. Strong evidence requirements. Protection against temporary or externally caused TVL. Credible counterparties. If Phase 3 does not meet these standards, the OG should withhold approval. If the program fails to produce sustained activity, the return triggers should be exercised. My Yes is conditional on rigorous execution, not faith in good intentions.

This vote is a bet. It may lose. But I believe the cost of not betting, of conserving Treasury while Cardano's relevance erodes, is higher than the cost of a structured, overseen, cancellable attempt at activation. I am voting Yes.

---

## Vote Summary (Yes)

Vote Yes on PRIME. Rubric concerns remain: high fee, no Treasury ownership, subsidy-loop risk. But Cardano's infrastructure is ready and activation is the missing layer. Cost of inaction exceeds cost of a structured, cancellable, overseen trial.

---

*This rationale reflects my independent assessment as a Cardano DRep. I have no material conflict of interest regarding this proposal.*

---

## Original Assessment (Archived — 2026-07-11)

The original assessment reached the same conclusion using Rubric v1.0. Key additions in v1.3 that sharpen the analysis:

- **Layer 0 Q6 (productive ecosystem effects):** PRIME scores low on new-work branching, reusable inputs, and post-Treasury reproduction. The "new work" enabled is more trading on existing protocols, not independent downstream operators.
- **Section H (subsidy-loop check):** The ₳90M Phase 3 capital flowing through AlphaGrowth to Treasury-dependent protocols is vendor-managed subsidy, not independent growth.
- **Dependency-graph concentration:** Single-point-of-failure risk across allocator, custody, and methodology.
- **Sharper commercial-return requirements:** v1.3 explicitly requires at least one return mechanism for commercial proposals. PRIME has none.
- **Automatic Nos:** "Treasury subsidy loop presented as growth" and "Private capture of public funding" both apply.

The updated framework strengthens the original verdict with more precise analytical language. The vote remains No.

---

## Post-Vote Updates (2026-08-10)

### AlphaGrowth Proposal Changes

Following community feedback, AlphaGrowth announced material changes via X posts after the vote was cast. Per our rubric's Rule Hierarchy, these are off-chain promises, not changes to the immutable governance action. They signal responsiveness but are not enforceable as written.

**Performance fee structure:**
- Back-loaded unlocks: 30% after 30 days, 30% after 3 months, 40% after 6 months
- Accelerated payouts for over-performance removed
- TVL observation window: 12 months → **24 months**

**Operating Group:**
- Term limits to be introduced
- Expansion and diversification of member composition

**Marketing budget:**
- Reduced: $2.4M → **$648,720** (73% cut)
- Restructured: 40% content creators, 50% activations/ads, 10% tooling

### DRep Sentiment Shift

**Dr. Navjit Dhaliwal (NaVi_GaT0R)** switched from No to Yes following the updates. His rationale mirrors our addendum: strategic bet with conditions. He explicitly states his vote is "with the expectation that PRIME follows through on the commitments it has now made" and continues to demand OG neutrality, diversity, and transparency.

These changes would improve our rubric score if incorporated into a revised governance action. As off-chain promises, they remain unenforceable but welcome signals.
