---
layout: proposal
title: "ASSESSMENT: Net Change Limit Increase (Epochs 613-713)"
proposal_id: gov_action15atytcy8ru7mkcs8m7r8mx7k5x36t0h6grtgmak6v5wmf4nq07lsqhakceq
assessment_date: 2026-07-29
assessor: "DRep Advisor"
status: assessment
---

# Assessment: Net Change Limit Increase (350M → 500M ADA)

**Proposal:** [gov_action15atyt...qhakceq](https://gov.tools/governance_actions/gov_action15atytcy8ru7mkcs8m7r8mx7k5x36t0h6grtgmak6v5wmf4nq07lsqhakceq)  
**Type:** InfoAction  
**Current Vote:** 30.87% Yes / 69.13% No (Epoch 646, expiring Epoch 647)  
**Threshold:** 50% Yes (TREASURY-01a)

---

## What This Actually Does

This is **not** a spending request. It is a **ceiling adjustment** — raising the maximum amount that *can* be withdrawn from the Treasury between Epoch 613 (Feb 2026) and Epoch 713 (July 2027) from 350M ADA to 500M ADA.

Key properties:
- **InfoAction only** — has no direct on-chain effect; does not authorize any withdrawal
- **Retrospective coverage** — counts withdrawals already enacted since Epoch 613
- **Not a mandate to spend** — DReps still vote on each withdrawal individually
- **Supersedes prior limit** — replaces the 350M NCL previously agreed for this period

---

## The Case For (YES)

### 1. **Practical room is running out**
The existing 350M NCL is being approached by active and pending proposals. Major withdrawals in flight or recently enacted include:

| Proposal | Amount | Status |
|----------|--------|--------|
| AlphaGrowth PRIME | ₳120M | Active vote |
| Tweag Core Infrastructure | ₳39.8M | Active vote |
| Bifrost Bitcoin Bridge (Phase 1) | ₳12.3M | Active vote |
| Strike Finance LP Deployment | ₳9M | Active vote |
| Various smaller proposals | ~₳15-20M | Enacted/pending |

Without a higher ceiling, DReps may face a situation where credible proposals cannot even be considered due to arithmetic constraints rather than merit.

### 2. **It's a guardrail, not a gas pedal**
The NCL is a *maximum*, not a target. Raising it to 500M doesn't commit Cardano to spending 500M. It preserves optionality. As the proposal notes: *"This is not a mandate to spend; DReps retain full discretion to approve or reject each Treasury Withdrawal."*

### 3. **Ecosystem signals support investment**
Pi Lanningham (SundaeSwap founder & CTO) made the most articulate case: Cardano is in "low-altitude earth orbit" and needs to expend fuel to reach "permanently stable orbit." This framing — that conservative stewardship risks decay, not safety — is gaining traction among builders who've been in the ecosystem for years.

### 4. **Constitutional compliance**
The proposal is carefully drafted to comply with Constitution v2.4 and Appendix I guardrails. It explicitly references TREASURY-01a threshold requirements and does not attempt to bypass or override any constitutional mechanism.

---

## The Case Against (NO)

### 1. **The limit was just agreed**
The 350M NCL was itself a recent DRep decision. Raising it so quickly suggests either:
- The original limit was poorly calibrated, or
- There's pressure to accommodate spending that DReps didn't anticipate

Either interpretation weakens the credibility of the NCL as a binding constraint.

### 2. **Vote the proposals, not the ceiling**
If individual withdrawal proposals are strong enough, they should pass on their merits. A higher NCL arguably makes it *easier* for marginal proposals to slip through by reducing the salience of cumulative spending. The NCL forces a meta-conversation about aggregate fiscal posture that gets lost when votes are atomized.

### 3. **Current vote trajectory suggests DRep skepticism**
At 30.87% Yes with ~1 epoch remaining, this proposal is unlikely to reach the 50% threshold. The NO voters may be signaling:
- Concern about overall spending velocity
- Desire to see stronger individual proposals before raising ceilings
- Preference for a more conservative Treasury posture in a bear/low-activity market

### 4. **No specific spending plan attached**
Unlike a Treasury Withdrawal with detailed budgets and milestones, this proposal asks DReps to raise a ceiling without knowing what will fill the space. Some DReps may want to see a coherent spending roadmap before expanding capacity.

### 5. **Governance participant burnout**
SPO hix (@hix_coffeepool, Japanese community) made a raw, honest case: *"A cap is something established to be upheld, not something raised when it becomes too restrictive."* They warn of a slippery slope (500M → 650M → meaningless) and express concern that *"DReps who vote with a long-term perspective will start leaving the community."* This isn't just policy disagreement — it's a morale signal from a committed participant.

---

## The Unaddressed Question: ADA Purchasing Power

**This may be the most important dimension missing from the public debate.**

The original 350M NCL was agreed around Epoch 613 (February 2026), when ADA was trading at approximately **$0.30**. Today, proposals reference **$0.16/ADA** — a **~47% drop in USD terms**.

What this means in practice:

| Metric | Feb 2026 | Jul 2026 | Change |
|--------|----------|----------|--------|
| ADA price | ~$0.30 | ~$0.16 | -47% |
| 350M NCL in USD | ~$105M | ~$56M | -$49M |
| USD value of a ₳120M proposal | ~$36M | ~$19.2M | -$16.8M |

**The disconnect:** The NCL caps ADA outflows, but project budgets are constructed in USD. When ADA drops, the same project requires more ADA to deliver equivalent value. Proposers aren't being greedy — they're maintaining scope against a falling currency.

### Why this matters for the vote

If the NCL's *purpose* is to constrain Treasury spending power, then a 47% drop in purchasing power without a cap adjustment means the constraint has tightened *accidentally*, not by design. A principled DRep might support a **purchasing-power-adjusted increase** while rejecting an **open-ended ceiling raise**.

**Rough math:** To restore the original ~$105M USD equivalent at $0.16/ADA, the NCL would need to be **~650M ADA** — far above the proposed 500M.

**A potential middle ground:** If the goal is merely to restore *some* of the lost purchasing power (not all), a smaller increase — say 350M → **420M or 450M** — could be defended as macro-adjustment rather than fiscal expansion.

### The counter-argument

The NCL is explicitly ADA-denominated by design. The Constitution and CIP-1694 do not reference USD or purchasing-power adjustment. If ADA appreciates, no one proposes *lowering* the NCL to maintain USD parity. Creating an implicit USD peg for the NCL could introduce procyclical pressure: bear markets → automatic NCL increases → more Treasury selling pressure → further ADA price decline.

---

## Reframed Decision Framework

| Question | If YES → | If NO → |
|----------|----------|---------|
| **Should NCL reflect purchasing power?** | Support some increase; debate the size | Keep 350M; let USD value fluctuate |
| **Is 500M justified by project pipeline?** | Full YES | NO; counter-propose smaller number |
| **Should NCL be rigid or adjustable?** | Rigid → hix's position | Adjustable → Pi's position |
| **Do you trust DReps to evaluate individual proposals?** | Higher ceiling acceptable | Lower ceiling as safety valve |

### My refined take

The **purchasing-power argument** is the most intellectually honest case for increasing the NCL. It's not about spending more — it's about preventing an *accidental* tightening of fiscal capacity due to price action.

However, the proposed 500M figure appears to be a round number, not a purchasing-power calculation. A DRep who wants to honor both the constraint *and* the reality of USD-denominated project costs might:

1. **Vote NO on 500M** as arbitrary
2. **Propose or support a smaller increase** (e.g., 400M–420M) explicitly framed as purchasing-power restoration
3. **Demand future NCL proposals include price-adjustment methodology** rather than round numbers

This would preserve the integrity of the NCL system while acknowledging the macroeconomic reality that the original 350M constraint was set at a different price level.

---

## My Assessment

**This is a governance-structure question masquerading as a fiscal question.**

The NCL is designed to be a simple, transparent guardrail. Its purpose is to force DReps to confront aggregate spending, not just individual proposals. If the guardrail is too low, it creates artificial constraints. If it's too high or too easily adjusted, it becomes theatre.

### Key considerations for your vote:

| Factor | Weighting |
|--------|-----------|
| **Do you trust the current DRep set to evaluate individual proposals?** | If NO, a lower NCL is a safety valve. If YES, the constraint is unnecessary. |
| **Do you believe Cardano is under-investing or over-spending?** | Under-investing → YES. Over-spending → NO. |
| **Do you want to force a meta-debate about fiscal posture?** | The NCL forces this. Removing it defers to individual proposal votes. |
| **Is 500M the right number?** | The proposal provides no analysis of why 500M vs 400M or 600M. It's a round number. |

### My read:

The 350M → 500M jump is a **43% increase** with minimal analytical justification. The proposal's "motivation" section is essentially: "room is becoming constrained." That's true, but it's also the *point* of a constraint.

However, if you believe Cardano needs to accelerate ecosystem investment — and you trust the DRep process to vet individual proposals — then voting YES preserves optionality without committing to any specific spend.

**If you're undecided:** Consider whether you'd support a *smaller* increase (e.g., 350M → 400M or 450M). The binary choice here (350 vs 500) may be forcing a false dilemma.

---

## Related Proposals

- [AlphaGrowth PRIME (₳120M)](gov_action122wue2k65qq8gmpz795z2axt8apka6ay6xt3pwg8jxj5yfkujmtsqvlfpu7.md) — major withdrawal that would consume ~34% of the current NCL
- [Tweag Core Infrastructure (₳39.8M)](gov_action14u26vcn3wmcnhc5pqrt6494ypugr7c7f3e2ns60r32cntl6zjtxsqqgeu8p.md) — another significant ask

---

## Vote Recommendation

**Conditional:**
- **YES** if you believe Cardano's Treasury should prioritize ecosystem growth and you trust DReps to evaluate individual proposals on merit
- **NO** if you believe the NCL should function as a hard constraint and want to force spending discipline through scarcity

This is fundamentally a **values vote** about fiscal philosophy, not a technical assessment.
