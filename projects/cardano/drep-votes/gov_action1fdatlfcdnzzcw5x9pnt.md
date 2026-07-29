# DRep Assessment: Cardano Builder DAO

**Proposal ID:** gov_action1fdatlfcdnzzcw5x9pnt9r42v992nqw65zze57s8tyk0jll78eyusqccn9gc  
**Type:** TreasuryWithdrawals  
**Amount:** 20,000,000 ADA (~$12M @ $0.60/ADA)  
**Status:** Active (Epoch 645, expires Epoch 646)  
**Applicant:** Cardano Builder DAO (operated by Clarity)  
**Administration:** Independent dRep DAO council (Cardano Yoda, Marco Grendel Moshi, + 1 non-affiliated dRep)

---

## Summary

Requests 20M ADA to continue and expand the Cardano Builder DAO — a smart contract-governed funding mechanism for Cardano builders. The DAO has already completed 2 funding rounds, distributing 11.1M ADA across 34 proposals with 83% and 88% governance participation rates. Funds are disbursed milestone-by-milestone with independent oversight and unused funds returned to Treasury.

This proposal scales an existing operational DAO from ~5.5M ADA per round to a 20M ADA treasury allocation.

---

## Key Details

| Category | Detail |
|----------|--------|
| **Entity** | Cardano Builder DAO (facilitated by Clarity) |
| **Track record** | 2 rounds completed, 34 proposals funded, 11.1M ADA distributed |
| **Governance** | 38 voting members (R1), 18 new members (R2), 83%/88% participation |
| **Returns** | 354,790 ADA returned to Treasury after R1+R2 (verified on-chain) |
| **KPI tracking** | V1: self-reported dashboard; V2: moving to on-chain data integration |
| **Oversight** | Independent dRep DAO council, multisig disbursement, milestone verification |
| **Constitutional compliance** | Funds auto-abstain, separate auditable accounts, no SPO delegation |
| **Clarity position** | Will not seek funding as a requesting member through DAO initiatives |
| **Return address** | stake1uymdrk3whg82qfvwcw2avzy9zud95sx3w0sfyfsr5td445ccujqn6 |
| **Treasury recipient** | stake1uycp7wrphukdde6zhlqp2h06cdqxgzydkpku2qp8q8al3hg6tqgh7 |

### Current Voting (Epoch 645)
- **DRep Yes:** 30 votes, 8.69% active power (330M ADA)
- **DRep No:** 74 votes, 91.31% active power (1.49B active / 3.47B total)
- **Pool:** No votes cast
- **Committee:** 3 Yes (42.86%), 0 No (57.14% abstain)

---

## Assessment

### Layer 0 — Priority & Fit Screen

| Question | Verdict |
|----------|---------|
| Real Treasury priority? | **Yes** — funding builders who ship is core to ecosystem growth |
| Public value? | **Indirect** — the DAO is coordination infrastructure; value flows through funded projects |
| Appropriate instrument? | **Debatable** — 20M for a meta-funding layer when Treasury could fund directly |
| Decentralization impact? | **Positive** — builder-led governance, independent oversight, on-chain transparency |
| Opportunity cost? | **Very high** — 20M is enormous; could fund many direct proposals |
| Productive ecosystem effects? | **Yes** — if it works, creates a repeatable pipeline for builder funding |

**Layer 0: MARGINAL PASS — but the amount and meta-funding model create serious friction.**

### Layer 1 — Proposal Quality

**Section A: Basics**
- ✓ Accountable applicant with proven track record (2 rounds, 34 funded projects, returned unused funds)
- ✓ Clear governance structure with independent oversight
- ⚠ **Amount is vague** — 20M ADA with no itemized breakdown of how many projects, what grant sizes, what operational costs vs. project funding
- ⚠ The DocSend milestone/budget document is referenced but not embedded in the on-chain metadata
- ✓ Prior funding disclosed (11.1M across 2 prior rounds)
- ⚠ Clarity conflict partially managed but not eliminated — they built the infrastructure and presumably benefit from platform usage

**Section B: Value & Impact**
- ✓ Public service: The DAO itself is a coordination mechanism; outputs (funded projects) are public
- ⚠ Public asset quality: The DAO tooling/dashboards are presumably reusable, but no explicit open-source licensing stated
- ✓ Additionality: Prior rounds proved the model works; this scales it
- ⚠ Critical gap: Cardano already has Catalyst and direct Treasury withdrawals. The DAO is an alternative path, not filling a void.
- ✓ Counterfactual harm: Without continued funding, the DAO stops operating and a functional coordination layer dissolves
- ⚠ Retained impact: Depends on funded projects' success, not the DAO itself

**Section C: Execution & Accountability**
- ✓ Strong team evidence: 2 completed rounds with published retrospectives
- ✓ High governance participation (83%, 88%) demonstrates real engagement, not token governance
- ⚠ Milestones exist but are not detailed in the on-chain metadata (behind DocSend link)
- ✓ Anti-gaming: Independent council, multisig, milestone-gated disbursement
- ✓ Enforceability: Smart contract governance, on-chain transparency, return of unused funds already demonstrated

**Section D: Commercial** — Not applicable. The DAO does not capture revenue, tokens, or IP from funded projects.

**Section E: Marketing & Adoption** — Not applicable.

**Section F: Decentralization Delta** — **Positive**. Builder-led governance with independent oversight. No concentration of power in a single entity. The DAO distributes decision-making across 50+ projects.

**Section G: Risk & Sustainability**
- ✓ Proven ability to return unused funds (354K ADA already returned)
- ⚠ **Scale risk**: 20M is ~4x the prior rounds combined. The DAO has not managed this scale before.
- ⚠ **Capture risk**: If the Builder DAO becomes the dominant funding path, it creates a gatekeeper. Clarity built the infrastructure — even if they don't seek funding, they control the platform.
- ⚠ **Overlap risk**: Competes with Catalyst and direct Treasury for the same builder pool. Could fragment rather than concentrate funding quality.
- ⚠ **KPI verification still immature**: V2 dashboard is "moving toward" on-chain data but not fully there. Self-reported KPIs are vulnerable to gaming.

**Section H: Subsidy-Loop & Dependency-Graph Check** — **Concerning**. This creates a permanent intermediary between the Treasury and builders. If funded, the ecosystem becomes dependent on the Builder DAO as a funding layer. The DAO's continued existence requires perpetual Treasury support, creating a subsidy loop.

---

## Why DReps Are Rejecting This (91.31% No)

The DRep vote is overwhelmingly negative despite a genuinely decent track record. I believe the rejection stems from:

1. **Amount shock** — 20M ADA is the second-largest active proposal. DReps see this as disproportionate to demonstrated need.
2. **Meta-funding skepticism** — "Why fund a DAO to fund projects when we can fund projects directly?" The overhead and intermediary risk feel unnecessary.
3. **Catalyst overlap** — Cardano already has a mature project funding mechanism. The Builder DAO competes with it rather than complementing it.
4. **Vague budget** — No itemized breakdown in the on-chain metadata. DReps are being asked to trust a DocSend link for a 20M decision.
5. **Clarity proximity** — Even with the no-self-funding pledge, Clarity built the platform. The conflict of interest is structural.

The Constitutional Committee's 3-0 Yes (with 4 abstentions) suggests no constitutional violations, but also no strong endorsement — abstaining on 57% of the vote is notable.

---

## Strengths

1. **Genuine track record** — 2 rounds, 34 projects, 11.1M ADA deployed, high participation, funds returned. This is more operational proof than almost any other proposal.
2. **Builder-led governance** — Funded projects participate in governance. This is not a top-down grant program.
3. **KPI alignment** — Explicitly tied to Vision 2030 metrics (MAU, transactions, TVL). The intent to move to on-chain verification is correct.
4. **Transparency** — Public dashboards, published retrospectives, on-chain governance records.
5. **Honest about limitations** — Acknowledges KPI tracking is hard and offers to work with DReps on standards.

## Concerns

1. **20M is too large for the demonstrated scale** — Prior rounds were ~5-6M each. A 4x jump with no detailed budget breakdown is a hard ask.
2. **Meta-funding creates permanent dependency** — The Treasury should fund public goods, not intermediaries. If the DAO becomes essential, it becomes a permanent cost center.
3. **Catalyst redundancy** — Cardano already has a project funding DAO (Catalyst). The Builder DAO does not clearly differentiate or cooperate with it.
4. **Clarity structural conflict** — They built the infrastructure, control the platform, and facilitate the process. Even without direct funding, they benefit from ecosystem dependence on their tooling.
5. **KPI verification gap** — Self-reported metrics in R1, transitioning to on-chain in R2. For 20M, DReps should demand fully on-chain, independently verifiable KPIs before funding, not after.

---

## Vote Recommendation

**Vote: NO**

While the Cardano Builder DAO has a stronger track record than most treasury proposals — 2 completed rounds, returned unused funds, high governance participation, and genuine builder engagement — the 20M ADA ask is disproportionate to demonstrated scale and creates a concerning intermediary dependency.

The core issue is not the DAO's quality; it is the **instrument choice**. The Treasury should fund builders directly, not fund a DAO to fund builders. At 20M ADA, this proposal asks the Treasury to become a permanent revenue source for a coordination layer that competes with existing mechanisms (Catalyst) without clear differentiation.

To earn my support, a future proposal would need:
1. **A smaller ask** (5-10M ADA) scaled to proven operational capacity
2. **An itemized budget** embedded in on-chain metadata, not behind a DocSend link
3. **Explicit open-source licensing** for all DAO tooling and dashboards
4. **Fully on-chain KPI verification** (not "moving toward" it) before funding
5. **Clear differentiation from Catalyst** — what does the Builder DAO do that Catalyst cannot?
6. **A sunset or independence plan** — how does the DAO become self-sustaining or transition to community control without Clarity dependency?

The Builder DAO has done good work. But good work does not justify any price, and 20M ADA for a meta-funding layer is not the right allocation of Treasury resources.

---

## Data Sources

- Koios API: `/api/v1/proposal_list` — proposal metadata
- Koios API: `/api/v1/proposal_voting_summary` — current vote tallies
- IPFS metadata: `ipfs://QmT8VE8KBqPUYRpev2jybiMENhPrDh9gwjoNW9Pmgw4ffj` — full proposal text
- On-chain verification: `adastat.net/transactions/dfcf57c8c65c50bb208106db91b2db38c4a7512f9fbf100f9f5e1f6301ceb8fc` — returned funds
