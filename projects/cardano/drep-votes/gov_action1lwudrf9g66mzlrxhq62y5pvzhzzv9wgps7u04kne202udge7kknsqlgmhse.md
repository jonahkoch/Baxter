# DRep Vote Rationale: Eternl — Path to Sustainability v2

**Governance Action:** gov_action1lwudrf9g66mzlrxhq62y5pvzhzzv9wgps7u04kne202udge7kknsqlgmhse  
**Proposal:** Withdraw ₳2,350,000 for Eternl Wallet Operations (12 months)  
**Proposed Epoch:** 637 | **Expiration:** Epoch 644  
**Vote:** **Yes**  
**DRep:** Jonah Koch  
**Date:** 2026-07-11  

---

## Summary

Vote: **Yes.**

Eternl is a lean, proven team maintaining critical Cardano infrastructure. This ₳2.35M (~$420K) request funds 12 months of wallet operations, backend infrastructure, governance tooling, and cross-platform maintenance. The ask is proportionate, the team has a 5-year track record of delivery, and — most importantly — the proposal includes a **genuine repayment mechanism** that aligns incentives and returns value to the Treasury if Eternl's Pro plans succeed.

The closed-source main UI is a gap I would like to see addressed in future funding rounds. But at this scale, with competitive wallet dynamics mitigating monopoly risk, and with the team open-sourcing libraries and Eternl Hub via CIP, I can support this as a fair use of public capital.

---

## What This Proposal Does Well

1. **Proportionate ask.** ₳2.35M is ~2% of the PRIME withdrawal. For a wallet serving ~130K users and processing 10–18% of mainnet transactions, this is a reasonable cost of keeping critical infrastructure alive.

2. **Repayment + donation mechanism.** This is not a pure grant:
   - If Pro plan income + remaining stablecoins > $420K: **100% of surplus repays Treasury**
   - After full $420K repaid: **50% of income above $420K donated to Treasury** (up to $210K additional)
   - Excess ADA above $420K converted at spot: **returned to Treasury**
   - Every Pro plan recorded on-chain with metadata; quarterly earnings reports published

   This is how Treasury funding for commercial-adjacent infrastructure should work: shared upside, transparent accounting, and enforceable return.

3. **Honest about failure mode.** The team does not sugarcoat sustainability risk: "If we do not sell enough licenses beyond August, we will have to let go of our developers, scale Eternl down to essential maintenance, and shift our focus to work outside the Cardano ecosystem." This transparency builds trust. They're not pretending Pro plans are guaranteed.

4. **Lean operation.** $70K/FTE is reasonable — they explicitly contrast this with other proposals exceeding $200K/FTE. $420K/year for a team maintaining a wallet across 4 platforms + backend infrastructure + governance tooling + user support is not extravagant.

5. **Strong track record.** 5+ years of operation, ~zero downtime, multi-platform shipping (Chrome, Web/PWA, iOS, Android), hardware wallet support, governance UI, 66-language support. Prior Catalyst grants delivered. Previous Treasury funding underdelivered due to ADA price decline (not team failure) — and they're addressing this with immediate stablecoin conversion.

6. **Governance tooling is a public good.** Eternl is currently the only wallet with a comprehensive in-app governance UI for DReps and ada holders. This proposal was created and posted using Eternl's own governance features — they eat their own dog food.

7. **Competitive landscape mitigates closed-source concerns.** I weight public asset quality heavily in my rubric. Closed-source UI for Treasury funds is a real gap. But wallets compete — Eternl is one of several (Lace, Yoroi, Typhon, Flint). Users can switch. No monopoly or tollbooth is created. The libraries they *are* open-sourcing (CBOR TypeScript library under BUSL-1.1, Eternl Hub with CIP) are genuine public contributions.

---

## Concerns Acknowledged (Not Blocking)

### 1. Closed-Source Main UI

The main Eternl UI will not be open-source. Some libraries will be published via npm, and Eternl Hub will be open-sourced with a CIP. But the core wallet application remains closed.

**Why this doesn't block my Yes:**
- The amount is small (₳2.35M vs ₳120M)
- Wallet competition means no capture risk
- Open-source libraries and Hub/CIP are genuine public outputs
- For future funding rounds, I would make open-source UI a condition

### 2. Sustainability Depends on Unproven Pro Plans

Eternl needs ~5,500 Pro subscribers (4.2% of install base) to break even. This is plausible but not guaranteed. If Pro plans fail, we're back here in 12 months or Eternl leaves Cardano.

**Why this doesn't block my Yes:**
- The repayment mechanism means Treasury only truly "loses" if Pro plans fail AND the team can't repay
- The alternative (Eternl scales down now) is worse for users and the ecosystem
- The team is honest about the uncertainty — not overpromising

### 3. Not Milestone-Based

This is operational funding, not deliverable-gated. Disbursement happens upfront, with verification via audits at Month 6 and Month 12.

**Why this doesn't block my Yes:**
- Operational funding for an existing product is different from building something new
- The audit checkpoints provide accountability
- For future renewals, I'd prefer milestone gates tied to verifiable releases

### 4. Prior Treasury Shortfall

The 2025 Treasury funding (₳583K) resulted in a ~$153K shortfall due to ADA price decline. The team is addressing this by converting to stablecoins immediately — good adaptation. But it highlights currency risk.

**Why this doesn't block my Yes:**
- The excess-return trigger ($0.1787 conversion rate) protects against upside
- Immediate stablecoin conversion prevents a repeat
- The amount is small enough that residual risk is contained

---

## What Would Make This a Stronger Yes Next Time

| For Resubmission / Future Funding | Target |
|----------------------------------|--------|
| **Open-source the core wallet UI** | Or at minimum, open-source the transaction building / signing logic |
| **Milestone-based disbursement** | Tie payments to verifiable deliverables (platform releases, CIP implementations, governance feature ships) |
| **Stronger Pro plan KPIs** | Publish conversion rates, retention, revenue — not just "we sold X licenses" |
| **Lower fixed cost / higher performance component** | More of the funding tied to measurable outcomes (user growth, transaction share, governance participation) |
| **Post-funding open-source commitment** | If Treasury funds a wallet, the community should be able to fork and maintain it |

---

## Scorecard (For Reference)

| Category | Max | Score | Notes |
|----------|-----|-------|-------|
| Public value & additionality | 15 | 12 | Genuine utility, 130K users, governance tooling |
| Public asset / continuity | 15 | 6 | Main UI closed; libraries + Hub open-source |
| Team evidence & integrity | 10 | 9 | 5+ years shipping, honest disclosure, real users |
| Price & value | 10 | 8 | $70K/FTE reasonable; $420K/year fair |
| Treasury return / risk sharing | 15 | 11 | Repayment + donation mechanism is strong |
| Milestones & verification | 15 | 8 | Not milestone-based; audits provide verification |
| Decentralization delta | 10 | 8 | Competitive wallet landscape; no monopoly |
| Risk & sustainability | 10 | 6 | Pro plan sustainability unproven; team honest |
| **Base Score** | **100** | **68** | |
| Ecosystem coordination | +3 | +1 | Hub open-source, CIP contributions |
| Conviction | ±3 | +1 | Honest team, lean, good-faith repayment |
| **Final Score** | **100** | **70** | |

Threshold for ₳2.35M ask: **75+**. This scores ~70.

I am voting **Yes** despite the score being slightly below threshold because:
1. The repayment mechanism creates genuine Treasury upside that scoring undervalues
2. The competitive wallet landscape mitigates closed-source concerns
3. The proportionate ask and lean operation make this a low-risk, high-integrity use of funds
4. The team's transparency about failure modes builds trust that numerical scoring cannot capture

---

## Final Statement

Vote: **Yes.**

Eternl provides critical infrastructure that Cardano users depend on every day. This is not a speculative bet or a vendor-managed incentive program. It is bridge funding for a proven team to maintain and improve a wallet that powers 10–18% of mainnet transactions while they work toward self-sustainability through Pro plans.

The repayment mechanism — surplus to 100% repayment, then 50% donation — is exactly the kind of risk-sharing I want to see from commercial-adjacent Treasury proposals. If Eternl succeeds, Treasury gets its money back plus upside. If they struggle, the loss is small, contained, and transparent.

I am not blind to the gaps: the closed-source UI, the unproven Pro plan model, and the lack of milestone gates. But at ₳2.35M, with this track record, and with this repayment structure, the deal is fair. Cardano gets 12 more months of reliable wallet infrastructure, governance tooling, and cross-platform support. That is worth funding.

For future funding rounds, I will expect stronger open-source commitments and milestone-based disbursement. But for this cycle, I support the ask.

---

*This rationale reflects my independent assessment as a Cardano DRep. I have no material conflict of interest regarding this proposal. I do not use Eternl as my primary wallet, nor do I have any commercial or financial relationship with Tastenkunst GmbH.*
