# DRep Vote Rationale: Strike Finance Liquidity Deployment

**Governance Action:** gov_action1suskjc6c4nw58c6wtmv77xe79gwj47wp4gvh9cqhhxujwxmam3cqqkz5nwj  
**Proposal:** Withdraw ₳9,000,000 for Strike Finance V2 Liquidity Deployment (12 months)  
**Proposed Epoch:** 637 | **Expiration:** Epoch 644  
**Vote:** **No**  
**DRep:** Jonah Koch  
**Date:** 2026-07-11  

---

## Summary

Vote: **No.**

Strike Finance has built a compelling perpetual futures product with genuine traction: $1.13B cumulative volume, 968K+ trades, 3,071 traders, and a V2 vault showing 43.52% APR on $985K TVL. The "productive treasury deployment" model — Treasury as LP with independent multisig custody, yield sharing, and a hard 12-month stop — is exactly the kind of capital-structure innovation I want to see more of in Cardano governance.

However, I cannot support deploying ₳9,000,000 into unaudited smart contracts. The Christian Schmitz audit was expected by July 1, 2026; today is July 11. The audit is neither referenced nor linked in the proposal. This is a material disclosure failure that blocks any responsible Yes vote. Even with the audit, concentration risk, yield compression at scale, and precedent concerns would give me pause. But the audit gap makes this an easy No.

---

## What This Proposal Does Well

Before addressing the blocking issues, I want to acknowledge the structural innovations that should become standard for DeFi liquidity proposals:

1. **"Productive deployment" framing.** Treasury as LP, not grantor. This is the right mental model: Treasury capital earns yield while supporting ecosystem growth.

2. **Independent multisig custody.** Rami (Snek), Phil (Surf), and James (Moneta) control the funds — not Strike Finance. This is proper separation of execution and custody.

3. **Hard 12-month stop.** No creeping dependency. Renewal requires a new governance action with updated performance data. Excellent discipline.

4. **Drawdown triggers.** 8% review trigger, 10% mandatory review, 20% wind-down — well-calibrated automatic gates.

5. **Monthly public reporting.** Transparency commitment with third-party assurance at Month 6 and Month 12.

6. **No prior Treasury funding.** First-time ask, not a repeat recipient. Clean slate.

7. **Real traction.** $1.13B cumulative volume, 50% of Cardano trading activity, Ethereum users already contributing ~50% of volume. Product-market fit exists.

These structural elements are genuinely good. But they don't overcome the blocking issues below.

---

## Blocking Issues

### 1. Audit Not Published: A Hard Gate for Smart Contract Deployment

The proposal states:

> "Christian Schmitz, founder of the Helios programming language and Pulse, is currently conducting an official audit of the protocol, which is expected to be finalized by July 1, 2026."

**Today is July 11, 2026.** The audit should be complete. But:
- It is **not linked** in the proposal references
- It is **not published** as part of the governance metadata
- There is **no evidence** it was completed

For a ₳9,000,000 deployment into smart contract-based liquidity, a **completed, published audit is non-negotiable**. This is not a small builder grant where some risk is acceptable. This is deploying Treasury principal into code that holds user funds and executes leveraged perpetual futures. The absence of a published audit — 10 days after the expected completion date — is a material disclosure failure.

I am not suggesting the code is insecure. I am saying I cannot verify its security, and the applicant has not provided the verification they promised. **No audit, No vote.**

### 2. Yield Compression at Scale

The V2 vault currently shows:
- $985K TVL
- 43.52% APR
- 4.97 Sharpe ratio

This proposal would add **$1.35M** (137% more capital) to that same vault. Basic economics says yields compress as capital scales. The modeled 10% APR is almost certainly optimistic once $2.3M+ is competing for the same trading fees.

If yield compresses to 3-5%, the risk-adjusted return becomes questionable compared to simply staking ADA (~3% with zero smart contract risk). The Treasury would be taking protocol risk, stablecoin risk, and concentration risk for marginal incremental yield.

### 3. Concentration and Precedent Risk

Deploying ₳9M in a **single protocol, single vault, single strategy** creates several problems:

- **Single-point-of-failure:** If Strike's smart contracts have an exploit, Treasury loses principal
- **Winner-picking:** This selects one perp protocol over potential competitors. How do you say No to the next protocol that wants the same deal?
- **Precedent:** If this passes, every DeFi protocol will structure proposals as "productive deployments" with similar terms. Managing Treasury as an active LP across dozens of protocols is a governance nightmare

The 12-month stop and independent custody mitigate but do not eliminate these risks.

### 4. No Durable Public Assets

Unlike Eternl (which open-sources libraries, governance tooling, and CIP contributions), Strike creates no open infrastructure:
- Smart contracts remain proprietary
- No protocol ownership for Treasury
- No open-source oracle integration, risk engine, or LP vault logic
- The liquidity is temporary — withdrawn at Month 12

The "public value" is entirely indirect: deeper liquidity → better execution → more traders. This is valuable but ephemeral. For ₳9M, I expect more durable value creation.

### 5. Short Track Record

V2 launched March 20, 2026 — approximately 2.5 months of live data at the time of this proposal. The growth is impressive:
- Accelerating from $22.8M to $104.3M monthly volume
- LP yield climbing from 28.68% to 43.52% APR

But 2.5 months is thin for a ₳9M commitment. Is this sustainable growth or early-adopter enthusiasm? Will yields hold as the vault scales 137%? Will trader retention persist after the initial novelty? These questions need more data.

---

## Concerns Acknowledged (Not Blocking)

### ADA Appreciation Risk

Selling ADA for USDM means missing upside if ADA rises. The proposal acknowledges this. I don't consider this a blocking issue — it's a known tradeoff of stablecoin-denominated LP positions.

### USDM Depeg Risk

Fiat-backed stablecoin risk is real but manageable. USDM has operated without major incidents. The 8-20% drawdown triggers would catch a severe depeg.

### Multisig Coordination Risk

Three-person multisigs can fail (key loss, disagreement, unavailability). But this is standard DeFi custody practice and superior to single-party control.

---

## What Would Earn My Support

If Strike resubmits, I would need to see the following changes. I do not expect all of them, but the audit is mandatory; the others would significantly improve the proposal.

### 1. Publish the Completed Christian Schmitz Audit

**Mandatory.** Link the full audit report in the proposal references. Include:
- Scope of audit (smart contracts, oracle integration, liquidation engine, LP vault)
- Severity findings and remediation status
- Formal verification coverage if applicable

Without this, I will vote No regardless of other improvements.

### 2. Reduce the Ask to ₳3-5M

| Current | Target |
|---------|--------|
| ₳9M ($1.35M) | **₳3-5M ($450K-750K)** |

Benefits:
- Reduces yield compression (smaller capital injection into $985K vault)
- Reduces concentration risk
- Reduces precedent concerns
- Creates a "pilot" with 12 months of data to justify a larger follow-on

If the pilot delivers 10%+ yield with low drawdown and strong volume growth, a future ₳5-10M expansion would face a much lower bar.

### 3. Commit to Open-Source Critical Components

| Component | Open-Source Commitment |
|-----------|----------------------|
| LP vault logic | Publish core deposit/withdraw/yield calculation logic |
| Oracle integration | Document price feed sources, aggregation, and failover |
| Risk engine | Publish liquidation threshold calculations and stress-test scenarios |

This turns a pure liquidity deployment into a public asset creation exercise. Other protocols could learn from Strike's implementation.

### 4. Partner with Additional Protocols

Instead of ₳9M to Strike alone, consider:
- ₳3M to Strike V2 perps
- ₳3M to a Cardano-native lending protocol (e.g., Liqwid, Lenfi)
- ₳3M to a DEX LP position (e.g., SundaeSwap, Minswap)

This diversifies Treasury DeFi exposure, reduces winner-picking concerns, and generates comparative data.

### 5. Add Automatic Wind-Down if Yield Falls Below Staking Rate

If the vault yield drops below the ADA staking rate (currently ~3%) for 30 consecutive days, automatic wind-down should trigger. This ensures Treasury capital is only deployed when it earns a genuine risk premium.

---

## Scorecard (For Reference)

| Category | Max | Score | Notes |
|----------|-----|-------|-------|
| Public value & additionality | 15 | 9 | Ecosystem liquidity valuable but indirect; no open-source assets |
| Public asset / continuity | 15 | 3 | No durable public goods; liquidity is temporary |
| Team evidence & integrity | 10 | 6 | 2.5 months V2 data; strong growth but early-stage |
| Price & value | 10 | 5 | 10% modeled yield; compression likely; ADA appreciation risk |
| Treasury return / risk sharing | 15 | 11 | Principal + yield return; independent custody; strong structure |
| Milestones & verification | 15 | 6 | Monthly reports; audit **not published** — material gap |
| Decentralization delta | 10 | 4 | Concentrates ₳9M in one protocol; precedent risk |
| Risk & sustainability | 10 | 5 | Good drawdown controls; smart contract risk; yield compression |
| **Base Score** | **100** | **49** | |
| Ecosystem coordination | +3 | +1 | Flywheel benefits broader DeFi |
| Conviction | ±3 | — | Intrigued by structure; blocked by audit gap |
| **Final Score** | **100** | **50** | |

**Threshold for ₳9M ask: 80+. This scores ~50.**

Even if the audit were published, I would score this in the 60-65 range — below threshold due to concentration risk, yield compression concerns, and lack of public assets. The audit gap pushes it to an easy No.

---

## Final Statement

Vote: **No.**

Strike Finance has built something genuinely impressive. The V2 growth data is compelling. The "productive treasury deployment" model — Treasury as LP with independent custody, yield sharing, and hard stops — is the right structure for DeFi liquidity proposals. I hope to see more proposals adopt these governance innovations.

But I cannot deploy ₳9,000,000 of public capital into unaudited smart contracts. The Christian Schmitz audit was expected July 1, 2026. Today is July 11. Its absence from the proposal is either an oversight or a red flag. Either way, it is disqualifying.

Even with the audit, I would have reservations: yield compression at 137% capital injection, concentration in a single protocol, winner-picking precedent, and the lack of durable public assets. But those are judgment calls. The audit gap is not. It is a hard gate, and this proposal fails it.

If Strike resubmits with a **published audit**, a **reduced ask (₳3-5M)**, and **open-source commitments**, I will evaluate it with a genuinely open mind. The structure is right. The timing and scale are not.

---

*This rationale reflects my independent assessment as a Cardano DRep. I have no material conflict of interest regarding this proposal. I do not hold a position in Strike Finance, nor do I have any commercial or financial relationship with the Strike team or the multisig administrators.*
