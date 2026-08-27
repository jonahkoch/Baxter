# DRep Vote Rationale: Reduce minPoolCost to 75 ada and increase Plutus Memory Limits (Part 2)

**Governance Action:** gov_action14dr5yg75pchr2sz42djtuflpvx5qnsek29qg7s7cft8lzrqt5vrqqtqntpk
**Proposal:** Reduce minPoolCost to 75 ada and increase Plutus Memory Limits (Part 2 of 2)
**Vote:** **Abstain**
**DRep:** Jonah Koch
**Date:** 2026-08-27
**Rubric:** Treasury Rule Book v17 (Unified Commercial, Infrastructure, Marketing and Public-Goods Edition)

---

## Summary

Voted Abstain. Plutus memory increase is a clear public good for the Leios/Peras roadmap, but the bundled minPoolCost reduction to 75 ada carries unresolved SPO sustainability concerns. Cannot vote for one without the other.

---

## Rationale

I voted **Abstain** on this parameter-update bundle.

The Plutus memory increase is straightforward and needed. It completes a planned 25% cumulative expansion of `maxTxExecutionUnits[memory]` and `maxBlockExecutionUnits[memory]`, giving dApp developers headroom that will matter once Leios parallel block production actually arrives. Without execution-layer capacity, consensus-layer throughput is just an empty pipe. I'd vote Yes on this part alone.

The minPoolCost reduction to 75 ada is where it falls apart for me. The proposal itself calls this a "stopgap" pending minPoolMargin (CIP-0023). Active SPOs — ATADA, QuasarSure, and others — have stated directly that 75 ada is not operationally sustainable, especially as reserve-funded block rewards continue declining. The post-2023 drop to 170 ada did not produce a race to the bottom, but that was two years ago with a different reward curve. We're now closer to the epoch-758 projection where single-block pools face a 100% delegator penalty.

MPC-03 says minPoolCost "should" reflect pool operating costs. Nicolas Cerny correctly notes that this is a SHOULD guardrail, not a MUST, and that the Constitution doesn't mandate a specific cost floor. But "should" still carries intent. The Parameter Committee is asking the network to approve a number that even its own rationale admits is incomplete — a holding action until the real fix arrives. I'm not comfortable rubber-stamping a stopgap that risks operator sustainability.

The deeper problem is bundling. These two changes are unrelated: one is execution-layer capacity, the other is stake-pool economics. The action admits this — "bundled here for submission efficiency" — but efficiency for the proposer shouldn't force an all-or-nothing vote on the voter. Cardano governance doesn't allow split votes on bundled parameters, so supporting Plutus memory means also accepting a minPoolCost level I believe is premature.

My abstention is not support for this action, and it is not rejection of Plutus memory expansion on the merits. It's an acknowledgment that I cannot make a reliable Yes/No judgment on the whole when the parts pull in opposite directions.

If these were split into separate votes, I'd vote Yes on Plutus memory and No on minPoolCost until minPoolMargin is in place.

---

## Rubric Assessment (v17)

### 1. Constitutional Preflight (Hard Gates)

| Check | Finding | Verdict |
|-------|---------|---------|
| Governance-action content | On-chain, immutable, well-documented with clear rationale | ✅ Pass |
| Self-contained withdrawal | Parameter changes are self-executing; no off-chain dependencies | ✅ Pass |
| Constitution & guardrails | All guardrail checks pass technically (MPC-01, MPC-02, MTEU-M, MBEU-M) | ✅ Pass |
| **MPC-03 alignment** | **SHOULD guardrail on operating-cost alignment; proposal admits this is a "stopgap"** | ⚠️ **Concern** |
| NCL & capacity | No Treasury spend; NCL not applicable | N/A |

**Note:** MPC-03 is not a hard-gate failure because it is a SHOULD, not a MUST. But the mismatch between guardrail intent and proposal framing creates genuine uncertainty.

### 2. Mixed-Proposal Analysis

| Workstream | Purpose | Assessment |
|------------|---------|------------|
| Plutus memory increase | Execution-layer capacity for dApps and future Leios throughput | ✅ Public good, would support independently |
| minPoolCost → 75 ada | Lower SPO fixed-fee floor to improve small-pool competitiveness | ❌ Contested sustainability, admitted stopgap, would not support independently |

**Rule applied:** Where bundled changes are unrelated and voter judgment splits, abstention is the disciplined vote. Averaging a failing workstream into a passing one is not acceptable per the mixed-proposal principle.

### 3. Decentralization Delta

| Change | Delta | Assessment |
|--------|-------|------------|
| Plutus memory | Neutral/Positive | Enables more capable dApps; no direct decentralization effect |
| minPoolCost → 75 ada | **Negative concern** | Weakens SPO unit economics at a point in the reward curve where reserve depletion is accelerating. Large operators can absorb losses longer; small operators cannot. Risk of centralization pressure if sustainability fails. |

### 4. Score Override Discipline

| Situation | Application | Result |
|-----------|-------------|--------|
| External uncertainty prevents reliable Yes/No | SPO sustainability at 75 ada is genuinely disputed among active operators. No definitive cost data exists. "Should" guardrail intent vs. technical compliance creates unresolvable ambiguity. | **Abstain** |

---

## Aligned DRep References

- **ATADA / ATADA2 Stakepool** — No (SPO unsustainability, wants minMargin first)
- **Samuel Leathers (disasm)** — Would support Plutus memory alone; opposes minPoolCost timing
- **QuasarSure** — Abstain/No (constitutional concern: no long-term sustainability plan)
- **Nicolas Cerny** — Likely Yes (MPC-03 is a SHOULD guardrail, not binding; supports lower floor)

---

## What Would Change My Vote

To earn a **Yes** on a future version:

1. **Unbundle the votes.** Submit Plutus memory and minPoolCost as separate Parameter Update actions. Let voters judge each on its own merits.
2. **Pair minPoolCost with minPoolMargin.** Do not reduce minPoolCost further until CIP-0023 (minPoolMargin) is live, so the structural fix arrives before or simultaneously with the floor drop.
3. **Provide operator-sustainability evidence.** Benchmarked cost data from a representative sample of SPOs (bare metal, VPS, relay counts, geographic variation) rather than relying on theoretical projections.

To earn a **No** instead of Abstain, the Plutus memory half would need to fail its own guardrail checks — which it does not.

---

## Checklist

- [x] Summary under 300 characters
- [x] Rationale uses human voice
- [x] No AI-slop patterns
- [x] Constitutional preflight run
- [x] Mixed-proposal analysis completed
- [x] Decentralization delta assessed
- [x] Score override applied
- [x] Aligned DReps consulted
- [x] Conditions for changing vote stated
- [x] File named correctly
