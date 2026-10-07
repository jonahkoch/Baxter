# DRep Assessment: Reduce minPoolCost to 75 ADA

**Proposal ID:** gov_action1whncs25w727rj5tml7lmv48gnaf9mm66sdjds8s3l306et7xmkdsqzqd7s2  
**Type:** ParameterChange  
**Parameter:** minPoolCost  
**Change:** 170,000,000 Lovelace (170 ada) → 75,000,000 Lovelace (75 ada)  
**Status:** Active (proposed epoch 654, expires epoch 661)  
**Author:** Cerkoryn (PCP-006)  
**TSC Ratification:** 2026-07-09  
**Voting:** DRep + Constitutional Committee required; SPO vote not required

---

## Proposal Overview

This governance action proposes reducing the `minPoolCost` protocol parameter from 170 ADA to 75 ADA, a decrease of approximately 55.9%. `minPoolCost` is the minimum fixed fee that a stake pool operator (SPO) can charge per epoch, deducted from block rewards before distribution to delegators.

The proposal is authored by Cerkoryn as PCP-006, endorsed by the Intersect Technical Steering Committee (TSC), and builds on two years of empirical data since the prior reduction from 340 ADA to 170 ADA in epoch 445 (October 2023).

---

## Current Voting Status

*(Voting data unavailable via Koios at time of assessment)*

---

## Detailed Assessment

### 1. Is the change technically sound?

**Yes.** This is a single-parameter adjustment with a well-understood mechanism. `minPoolCost` affects reward distribution only — it does not alter block production, propagation limits, execution limits, or consensus rules. The change is mechanically simple: lower the enforced floor on pool registration certificates.

The proposal correctly notes that `minPoolCost` is enforced only at certificate registration/update time, not retroactively. Pools already registered at 170 ADA remain valid. This limits the blast radius of the change.

### 2. Is the evidence credible?

**Yes, and unusually robust for a parameter proposal.** The evidentiary record includes:

- **PCP-001 (2023):** Prior reduction from 340→170, with economic analysis
- **PCP-006 (2026):** Current proposal with updated calibration
- **IO Research updated incentives report:** Reverses prior position — now concludes high fixed-fee floor *favors* Sybil attacks by large operators, not deters them
- **2 years of empirical post-2023 data:** Shows no "race to the bottom" — 340 ADA remained dominant, only smaller competitively positioned pools adopted the lower floor
- **TSC endorsement (2026-07-09):** Technical steering committee ratification
- **Economic working group assessment:** Treasury impact deemed minimal; balance above forecast

The empirical data is particularly valuable. The 2023 reduction was partly held back by fears of a fee collapse that did not materialize. That empirical question is now answered.

### 3. Does the change comply with constitutional guardrails?

**Yes, fully.**

| Guardrail | Status |
|-----------|--------|
| PARAM-05a (governance-critical parameter, DRep vote) | ✅ Compliant — `minPoolCost` is in the economic parameter group; DRep threshold ~67% |
| PARAM-06a (90-day notice) | ✅ Compliant — PCP-006 published 2026-03-30; action not submitted before 2026-06-30 |
| MPC-01 (positive value) | ✅ Compliant — 75,000,000 Lovelace > 0 |
| MPC-02 (below 500M Lovelace ceiling) | ✅ Compliant — 75M << 500M |
| MPC-03 (calibrated to current conditions) | ✅ Compliant — Calibrated to restore single-block pool penalty to early-Shelley levels, reflecting current SPO costs and reward schedule |

Constitutional Committee approval is also required and the proposal is structured to support that process.

### 4. What are the benefits?

| Benefit | Assessment |
|---------|-----------|
| Small SPO competitiveness | **Primary claimed benefit.** Single-block pools currently lose ~53% of gross rewards to minPoolCost. At 75 ADA, this drops to ~25%, improving displayed returns. However, 75 ADA per epoch is still not sufficient to cover sustainable pool operations, so the economic viability improvement may be more cosmetic than substantive. HIX notes that minPoolCost is a distribution parameter, not a supply parameter — it redistributes the same reward pool, it does not increase total rewards by a single ADA. |
| No "race to the bottom" | **Evidence-backed.** Post-2023 data shows dominant pools kept 340 ADA; only competitive smaller pools adopted the lower floor. Market structure remained stable. |
| Sybil security posture | **Improved per IO Research.** High fixed fees may favor large-operator Sybil fragmentation (harvesting fixed fees across many pools). Lowering the floor reduces this distortion. Dori frames this sharply: when a defense mechanism becomes an arbitrage tool, its justification no longer holds. |
| Treasury impact | **Minimal.** Economic working group assessed treasury balance is above forecast; marginal decrease in treasury inflow is acceptable. |
| Cost competition | **Valid.** Cerkryn argues that minPoolCost prevents pools from competing to lower operating costs and props up inefficient operators. Reducing it allows genuine competition on efficiency and pledge. |
| Resilience over efficiency | **Valid.** input endorser prefers 1,000 diverse operators over 100 efficient ones — redundancy and resilience have value, and apparent efficiency can mask tail risk. |

### 5. What are the risks?

| Risk | Assessment | Mitigation |
|------|-----------|------------|
| Sybil attack (low-cost pools) | **Low.** Original Sybil rationale for high minPoolCost has been weakened by IO Research. A determined adversary can already subsidize pools; the fixed fee is not the binding constraint. The proposal is a staged reduction (not to zero), preserving some cost floor. | Staged approach; monitoring; reversion possible |
| Treasury revenue reduction | **Low.** Marginal decrease in treasury inflow. Working group confirmed no risk to long-term stability. | Already assessed |
| Large-operator fragmentation | **Low risk, possibly inverse.** The change *reduces* incentive for large operators to split stake across many pools to harvest fixed fees repeatedly. | Empirical data supports this interpretation |
| Race to bottom | **Low.** 2 years of data post-2023 refute this concern. | Empirical evidence |
| Competitive pressure on fees | **Moderate.** Lowering the floor may increase pressure on operators to reduce fees below sustainable levels just to attract delegators. SIPO notes that 75 ADA is not sufficient to support sustainable operations, and lowering the floor may weaken rather than strengthen operator economics. | Monitoring; operators can choose not to lower fees |
| False decentralization signal | **Moderate.** More pools does not automatically mean more decentralization. What matters is the number of genuinely independent operators, the distribution of stake, multi-pool concentration, pledge, infrastructure diversity, and whether operators have a sustainable economic foundation. Increasing the number of economically unviable pools does not provide meaningful decentralization. | Must be paired with broader incentive redesign |
| Delay of systemic reform | **Moderate.** Treating this as a sufficient decentralization policy may reduce urgency for the broader redesign that Cardano actually needs: minPoolMargin, k, pledge influence, reward curve, and multi-pool incentives. SIPO argues this is treating a symptom, not the cause. | Proposal explicitly frames itself as stopgap; CIP-0023 and CIP-0082 are in progress |
| Fiat viability gap | **High.** HIX's critique is devastating: the proposal optimizes ADA-denominated ratios while operators pay costs in fiat. At current prices, 75 ADA per epoch equals roughly 23 to 73 US dollars per month. This is "outside the range in which the question is meaningful." The current 170 ADA floor is already below viability for many operators. Lowering it further does not close a gap; it makes the gap more explicit. | None within this proposal; requires addressing the reward pool size, not its distribution |
| Broken monetary design assumption | **High.** Cardano assumed declining reserve emission would be offset by scarcity supporting ADA price. Over the measured period, reward per block and ADA price have declined together. Treasury withdrawals release ADA into circulation, working against scarcity. No adjustment to the operator-delegator split fixes this. | Requires macroeconomic policy review, not parameter change |
| Self-custody governance risk | **Moderate.** Falling reward levels weaken incentives to hold ADA in self-custody. ADA moved to custodial venues is either delegated by the custodian or removed from effective delegation. Declining effective delegation carries governance concentration risk. Cardano provides no self-correcting mechanism — undistributed rewards return to the reserve, so yields for remaining delegators do not rise as participation falls. | Requires broader incentive and custody design, not parameter change |

### 6. Reversion plan

**Adequate.** The proposal explicitly addresses reversion:
- If adverse effects emerge (Sybil fragmentation, unexpected treasury impact), `minPoolCost` can be reverted to 170 ADA via a subsequent ParameterChange action
- The change is non-retroactive: already-registered pools keep their current fee until they voluntarily update their certificate
- No DApp, script, or transaction-level rework required
- No forced pool re-registration

This is a low-risk, easily reversible parameter change.

### 7. Alignment with ecosystem health

**Mixed — positive with important caveats.**

Cardano's decentralization depends on a healthy, economically viable pool of small and medium SPOs. The current `minPoolCost` of 170 ADA is eroding small-pool viability as block rewards decline (~300 ADA/block, down from ~1,800 at Shelley launch). Without intervention, single-block pools will hit 100% penalty by epoch 758 (~February 2028). The timing argument is compelling: something should be done now rather than waiting for a full systemic redesign that may take years.

However, SIPO's critique is valid and material: this proposal conflates the delegator reward penalty with long-term SPO sustainability. Lowering minPoolCost improves displayed Return on Staking (RoS) for delegators, but it does not improve block production frequency, delegated stake, operating costs, or income stability for operators. Seventy-five ADA per epoch remains insufficient to support sustainable pool operations. More pools at lower fees does not equal better decentralization if those pools are economically fragile.

The proposal is explicitly framed as a stopgap pending more structural solutions (CIP-0023 `minPoolMargin`, CIP-0082 roadmap). This is pragmatic — it addresses immediate pain while longer-term improvements work toward implementation. But the risk remains that this incremental adjustment is treated as a sufficient decentralization policy rather than a temporary bridge.

---

## Classification

**Request size:** N/A (parameter change, not treasury withdrawal)  
**Risk level:** Low — easily reversible, well-evidenced, empirically tested  
**Type:** Technical parameter adjustment with ecosystem health benefits

---

## Vote Recommendation

**Vote: Yes**

This is a well-evidenced, low-risk parameter change with modest but real benefits for ecosystem health. The case for Yes rests on pragmatism and timing, not on the claim that this solves the underlying incentive problem.

**Arguments for Yes:**
1. **Technically sound:** Single-parameter adjustment, no consensus or execution risk
2. **Robust evidence:** PCP-006, TSC endorsement, IO Research report, 2 years of empirical post-2023 data
3. **Full constitutional compliance:** All guardrails satisfied, CC approval sought
4. **Timing imperative:** Single-block pool penalty will hit 100% by ~February 2028 if unaddressed. Waiting for a full systemic redesign (minPoolMargin, k, reward curve) could take years.
5. **Low risk:** Easily reversible, non-retroactive, treasury impact minimal, staged approach (not to zero)
6. **Appropriately scoped:** Explicitly framed as stopgap pending CIP-0023 and CIP-0082

**Arguments against (acknowledged):**
- 75 ADA is still not sufficient for sustainable pool operations; the benefit may be more cosmetic (better displayed RoS) than substantive. At current prices, 75 ADA per epoch equals roughly 23 to 73 US dollars per month — below meaningful operational viability.
- minPoolCost is a distribution parameter, not a supply parameter. It redistributes the same reward pool; it does not increase total rewards. Moving income from operators to delegators does not improve operator viability.
- The proposal itself concedes the 2023 reduction did not resolve the underlying structural pressure. Even after this reduction, the penalty on single-block pools reaches 100% by approximately epoch 758.
- More pools at lower fees does not equal better decentralization; genuine decentralization requires independent operators, diverse infrastructure, sustainable economics, and healthy stake distribution
- Lowering the floor may increase competitive pressure on operators to reduce fees below sustainable levels
- There is a risk that this incremental adjustment delays the broader incentive redesign Cardano actually needs
- The deeper problem is declining rewards in fiat terms, driven by a broken monetary design assumption (scarcity-driven price appreciation has not materialized) and Treasury withdrawals working against scarcity. No parameter split adjustment addresses this.
- Falling rewards weaken self-custody incentives, creating governance concentration risk as ADA moves to custodial venues. This proposal does not address that trajectory.

**Why Yes over Abstain:** The proposal does not claim to be a complete solution. It is explicitly a reversible, monitored stopgap. The empirical evidence that the prior reduction caused no race to the bottom is strong. And the alternative — doing nothing for years while waiting for systemic reform — means small pools become entirely non-viable in the interim. The risk of inaction outweighs the risk of this modest, reversible step. HIX's critique is correct that this does not address the fundamental problem, but HIX also explicitly states they would support this change as part of a package addressing reward pool size. Since no such package is currently on the table, a reversible stopgap is preferable to nothing.

**What would earn a No:** A comprehensive incentive-package vote that addresses reward pool size, pledge influence, k, and minPoolMargin is available as an alternative. Or evidence that this specific reduction materially increases Sybil or competitive-pressure risks beyond the empirical record.

**What would earn an Abstain:** A belief that the benefit is too modest to justify even a low-risk intervention, or a preference to hold out for a comprehensive incentive-package vote rather than incremental changes. HIX's position — support as part of a package, oppose alone — is a coherent Abstain-or-No stance.

---

## Data Sources

- Koios API: `api.koios.rest/api/v1/proposal_list`
- IPFS metadata: `ipfs://bafkreidy6ftyudcx6lwkualmjbgkurhlqo35s6jarq3phxendcr5el6n34` (via Pinata gateway)
- PCP-001 (Cardano Forum, 2023)
- PCP-006 by Cerkoryn (Cardano Forum, 2026-03-30)
- IO Research updated incentives report
- DRep Treasury Assessment Rubric v1.2 (adapted for parameter changes)

---

## Vote Rationale

I am voting Yes on this parameter change. This proposal reduces minPoolCost from one hundred seventy ADA to seventy five ADA based on robust technical and economic evidence, including two years of empirical data since the prior reduction, an updated IO Research incentives report, and Technical Steering Committee endorsement. I acknowledge multiple valid critiques: seventy five ADA per epoch equals roughly twenty three to seventy three US dollars per month at current prices, which is below meaningful operational viability for most operators. minPoolCost is a distribution parameter that redistributes the same reward pool rather than increasing it. The proposal itself concedes that the prior reduction did not resolve underlying structural pressure. The deeper problem is declining rewards in fiat terms driven by a broken monetary design assumption, and no parameter split adjustment fixes that. I also acknowledge that more pools does not automatically equal better decentralization, and that genuine decentralization requires independent operators, diverse infrastructure, sustainable economics, and healthy stake distribution. However, the proposal is explicitly framed as a reversible stopgap, not a complete solution. Single block pools face a one hundred percent penalty by approximately epoch seven hundred fifty eight if nothing is done, and waiting years for a full systemic redesign means allowing small pool viability to collapse in the interim. A comprehensive package addressing reward pool size would be preferable, but none is currently on the table. The empirical evidence that the prior reduction caused no race to the bottom is strong, the change is easily reversible, and the treasury impact is minimal. I find that the risk of inaction outweighs the risk of this modest, monitored step, while continuing to support the broader incentive and monetary redesign that Cardano ultimately needs.

## Vote Summary

I am voting Yes on reducing minPoolCost to seventy five ADA. The proposal is well evidenced, constitutionally compliant, and low risk, but I acknowledge it is a modest stopgap that does not address the fundamental problem of declining fiat-denominated rewards or broken monetary design assumptions. It improves displayed returns for small pools while broader incentive reforms are developed, supported by two years of empirical data and TSC endorsement.
