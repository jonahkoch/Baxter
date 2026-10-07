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
| Small SPO competitiveness | **Primary benefit.** Single-block pools currently lose ~53% of gross rewards to minPoolCost. At 75 ADA, this drops to ~25%, making small pools economically viable. This is a prerequisite for any future `stakePoolTargetNum` (k) increase. |
| No "race to the bottom" | **Evidence-backed.** Post-2023 data shows dominant pools kept 340 ADA; only competitive smaller pools adopted the lower floor. Market structure remained stable. |
| Sybil security posture | **Improved.** IO Research now assesses that high fixed fees favor large-operator Sybil fragmentation (harvesting fixed fees across many pools) more than they deter attacks. Lowering the floor reduces this distortion. |
| Treasury impact | **Minimal.** Economic working group assessed treasury balance is above forecast; marginal decrease in treasury inflow is acceptable. |

### 5. What are the risks?

| Risk | Assessment | Mitigation |
|------|-----------|------------|
| Sybil attack (low-cost pools) | **Low.** Original Sybil rationale for high minPoolCost has been weakened by IO Research. A determined adversary can already subsidize pools; the fixed fee is not the binding constraint. The proposal is a staged reduction (not to zero), preserving some cost floor. | Staged approach; monitoring; reversion possible |
| Treasury revenue reduction | **Low.** Marginal decrease in treasury inflow. Working group confirmed no risk to long-term stability. | Already assessed |
| Large-operator fragmentation | **Low risk, possibly inverse.** The change *reduces* incentive for large operators to split stake across many pools to harvest fixed fees repeatedly. | Empirical data supports this interpretation |
| Race to bottom | **Low.** 2 years of data post-2023 refute this concern. | Empirical evidence |

### 6. Reversion plan

**Adequate.** The proposal explicitly addresses reversion:
- If adverse effects emerge (Sybil fragmentation, unexpected treasury impact), `minPoolCost` can be reverted to 170 ADA via a subsequent ParameterChange action
- The change is non-retroactive: already-registered pools keep their current fee until they voluntarily update their certificate
- No DApp, script, or transaction-level rework required
- No forced pool re-registration

This is a low-risk, easily reversible parameter change.

### 7. Alignment with ecosystem health

**Positive.** Cardano's decentralization depends on a healthy, economically viable pool of small and medium SPOs. The current `minPoolCost` of 170 ADA is eroding small-pool viability as block rewards decline (~300 ADA/block, down from ~1,800 at Shelley launch). Without intervention, single-block pools will hit 100% penalty by epoch 758 (~February 2028).

The proposal is explicitly framed as a stopgap pending more structural solutions (CIP-0023 `minPoolMargin`, CIP-0082 roadmap). This is pragmatic — it addresses immediate pain while longer-term improvements work toward implementation.

---

## Classification

**Request size:** N/A (parameter change, not treasury withdrawal)  
**Risk level:** Low — easily reversible, well-evidenced, empirically tested  
**Type:** Technical parameter adjustment with ecosystem health benefits

---

## Vote Recommendation

**Vote: Yes**

This is a well-evidenced, low-risk parameter change with clear benefits for ecosystem decentralization. The assessment can be brief because the case is strong:

1. **Technically sound:** Single-parameter adjustment, no consensus or execution risk
2. **Robust evidence:** PCP-006, TSC endorsement, IO Research report, 2 years of empirical post-2023 data
3. **Full constitutional compliance:** All guardrails satisfied, CC approval sought
4. **Clear benefit:** Improves small-SPO competitiveness, prerequisite for k-increase, supported by empirical data
5. **Low risk:** Easily reversible, non-retroactive, treasury impact minimal
6. **Appropriately scoped:** Staged reduction (not to zero), framed as stopgap pending CIP-0023

The only plausible reason to vote No or Abstain would be disagreement with the empirical analysis or a belief that the floor should go to zero immediately (per CIP-0074) rather than staged. I find the staged approach prudent — it allows monitoring while delivering immediate relief.

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

I am voting Yes on this parameter change. This proposal reduces minPoolCost from one hundred seventy ADA to seventy five ADA based on robust technical and economic evidence, including two years of empirical data since the prior reduction, an updated IO Research incentives report, and Technical Steering Committee endorsement. The change improves economic viability for small stake pool operators, which is a prerequisite for any future increase in stakePoolTargetNum, and addresses a structural pressure that will otherwise reach one hundred percent penalty on single block pools by approximately epoch seven hundred fifty eight. The proposal fully complies with constitutional guardrails, carries minimal treasury impact, is easily reversible if adverse effects emerge, and is appropriately scoped as a staged stopgap pending longer term structural solutions such as CIP twenty three. I find the evidence convincing and the risk low.

## Vote Summary

I am voting Yes on reducing minPoolCost to seventy five ADA. The proposal is well evidenced, constitutionally compliant, low risk, and supports small stake pool operator viability with two years of empirical data and TSC endorsement behind it.
