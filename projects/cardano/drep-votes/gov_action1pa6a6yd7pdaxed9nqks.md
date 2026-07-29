# DRep Assessment: Alchemy by Sundial x Charms — Bitcoin Treasury Protocol

**Proposal ID:** gov_action1pa6a6yd7pdaxed9nqkshtvtu7jmqe5c8cpf0ej4lnatjj588qkpsq2x2sz2  
**Type:** TreasuryWithdrawals  
**Amount:** 10,000,000 ADA (~$6.0M @ $0.60/ADA; planned at $0.20/ADA = $2.0M budget)  
**Status:** Active on-chain (Epoch 645, expires Epoch 646) — **APPLICANTS WITHDREW**  
**Applicant:** Sundial Protocol × Charms  
**Administration:** Intersect (proposed, not confirmed)

---

## Critical Update: Applicants Withdrew

**July 2026 — Sundial and Charms announced they are WITHDRAWING from this proposal.**

> "After reflecting on the Cardano treasury and broader market conditions, and after speaking with DReps across the community, Sundial and Charms have decided not to proceed with the Alchemy treasury proposal at this time. We recognize that the community's current priorities lie elsewhere, and we respect that."
> — Sundial/Charms (X/Twitter)

The proposal remains technically active on-chain but the applicants have publicly abandoned it. This assessment evaluates both the original proposal and the current reality.

---

## Summary (Original Proposal)

Alchemy proposed a Cardano-native Bitcoin treasury protocol with two composable assets: **FIRE** (high-volatility BTC residual claim) and **ICE** (low-volatility USD-denominated BTC-backed asset). Built on Charms' Bitcoin meta-protocol layer. The 10M ADA ask was split into two pools:

- **Pool 1 (~$1M):** Treasury-supported launch liquidity for the BTC reserve, deployed in tranches, with quarterly profits returned to Treasury
- **Pool 2 (~$1M):** Development, audits, integrations, dashboards, legal/compliance, go-to-market

**Key claims:** First-mover BTCfi infrastructure for Cardano, transparent reserve architecture, milestone-gated deployment, rollover clause (external investment shifts dev costs to liquidity), ADA price protection (max $0.35/ADA reference rate).

---

## Key Details

| Category | Detail |
|----------|--------|
| **Team** | Sundial Protocol (product architecture, capital formation, go-to-market) + Charms (Bitcoin meta-protocol, technical foundation) |
| **License** | Not explicitly stated for outputs; implied open but not guaranteed |
| **Budget** | 10M ADA total; 50/50 split between launch liquidity and delivery |
| **Structure** | Staged disbursement with milestone gating, Intersect administration |
| **Treasury protections** | Rollover clause, ADA price cap, deployment pause rules, quarterly profit returns, TVL threshold for principal return ($60M 30-day TWAP) |
| **Return address** | stake1u8f6k4wsxg3nu8v99v3k7n42xv8wqw6rcft3wslpxmqvstgn25p70 |
| **Treasury recipient** | stake17xzc8pt7fgf0lc0x7eq6z7z6puhsxmzktna7dluahrj6g6ghh5qjr (Intersect-administered) |
| **Prior funding** | No prior Treasury funding disclosed |

### Current Voting (Epoch 645)
- **DRep Yes:** 19 votes, 6.4% active power (235M ADA)
- **DRep No:** 76 votes, 93.6% active power (1.61B active / 3.43B total)
- **Pool:** No votes cast
- **Committee:** 1 Yes (14.29%), 3 No (85.71%)

---

## Assessment

### Layer 0 — Priority & Fit Screen

| Question | Verdict |
|----------|---------|
| Real Treasury priority? | **Debatable** — BTCfi is a real market, but Cardano has more pressing gaps (DEX liquidity, stablecoins, developer tooling). Applicants acknowledged this themselves. |
| Public value? | **Mixed** — Infrastructure is public, but the primary beneficiary is the Alchemy product/ecosystem. Returns to Treasury are conditional on success. |
| Appropriate instrument? | **Questionable** — TreasuryWithdrawal for what is essentially venture funding into a new DeFi protocol. Commercial/hybrid scorecard applies. |
| Decentralization impact? | **Neutral/Unclear** — Does not directly increase or decrease decentralization. Adds a new financial primitive but concentrates risk in one protocol. |
| Opportunity cost? | **High** — 10M ADA is a large ask. The community clearly prioritized other investments. |
| Productive ecosystem effects? | **Conditional** — Only if Alchemy succeeds and attracts meaningful TVL. High execution risk. |

**Layer 0: MARGINAL — would need strong Layer 1 performance to pass.**

### Layer 1 — Proposal Quality

**Section A: Basics**
- ✓ Clear ask and structure
- ✓ Itemized budget (though broad categories)
- ⚠ No explicit open-source license commitment for all outputs
- ⚠ No delivery track record for this specific product — Sundial/Charms have not shipped Alchemy yet
- ⚠ Authors field is empty (no cryptographic signatures on metadata)

**Section B: Value & Impact**
- ⚠ Public asset quality: Simulator and docs referenced, but no explicit license for protocol code
- ⚠ Productive public value: Infrastructure is reusable IF open-sourced; not guaranteed
- ⚠ Additionality: Cardano has no BTCfi now, but also no proven demand for it on Cardano
- ⚠ Critical gap: Not critical — other chains serve BTCfi demand; Cardano users are not currently blocked
- ⚠ Counterfactual harm: Minimal — Bitcoin capital is not currently trying to enter Cardano and failing
- ⚠ Retained impact: Conditional on open-sourcing and protocol survival

**Section C: Execution & Accountability**
- ⚠ Team evidence: Strong on paper (Sundial + Charms), but NO prior delivery of Alchemy specifically
- ✓ Milestones with gating
- ⚠ Independent verification: Audits funded but not yet performed; no verifiable prior work
- ✓ Anti-gaming: Rollover clause, price protection, pause rules
- ⚠ Enforceability: Smart contract administration proposed but not yet confirmed

**Section D: Commercial**
- ⚠ This is a commercial venture disguised as infrastructure. The team would build a product, capture user relationships, and potentially token value.
- ⚠ Treasury "returns" are profits from a liquidity position — the Treasury becomes an investor, not a funder of public goods.
- ⚠ The $60M TVL threshold for principal return is aspirational. Most Cardano DeFi protocols have not reached this.

**Section E: Marketing & Adoption** — Not applicable.

**Section F: Decentralization Delta** — **Neutral**. Adds a financial primitive but does not change validator count, node diversity, or governance participation.

**Section G: Risk & Sustainability**
- ⚠ BTC volatility risk acknowledged but FIRE/ICE are novel assets with unproven economics
- ⚠ Oracle/bridge/Charms protocol-layer risk acknowledged but mitigation is "independent review" that hasn't happened yet
- ⚠ Novel asset risk: FIRE/ICE are experimental. The safety zones (5.0x → 4.0x → 2.0x) look sensible on paper but have no battle-testing.
- ⚠ Adoption risk: Cardano DeFi TVL is modest. A $60M target is aggressive.
- ⚠ Regulatory risk: Structured BTC products face increasing scrutiny. Legal/compliance budget ($75K) may be insufficient.

**Section H: Subsidy-Loop & Dependency-Graph Check** — **Concerning**. This funds a specific team's product. If Alchemy becomes a core BTCfi primitive, Cardano becomes dependent on Sundial/Charms for maintenance and upgrades. The rollover clause helps but does not eliminate this.

---

## Why It Failed

The market (DReps and Constitutional Committee) already rendered its verdict before the withdrawal:

1. **Wrong priority** — 10M ADA for an unproven BTCfi protocol when Cardano has more fundamental gaps
2. **High execution risk** — No prior delivery of Alchemy; FIRE/ICE economics are theoretical
3. **Commercial nature** — Treasury as venture investor, not public goods funder
4. **Applicants read the room** — Sundial/Charms correctly identified that "the community's current priorities lie elsewhere"

The Constitutional Committee's 3-1 No vote is significant — they found constitutional or policy concerns beyond mere disagreement on priority.

---

## Strengths (of the original proposal)

1. **Honest about risks** — Safety zones, deployment pause rules, and a detailed risk register
2. **Treasury protections were thoughtful** — Rollover clause, price protection, profit returns, staged liquidity
3. **Applicants showed maturity by withdrawing** — Rather than burning community energy on a losing proposal, they stepped back

## Concerns (why it was never viable)

1. **10M ADA is too large for an unproven product** — No working protocol, no user base, no revenue
2. **No open-source license guarantee** — Infrastructure claims require public asset commitment
3. **Commercial venture masked as public infrastructure** — Treasury should not be a VC
4. **No delivery track record for this specific work** — Sundial and Charms are capable teams, but Alchemy itself has not shipped
5. **Market validation absent** — No evidence that Cardano users want BTCfi products; the "total addressable market" argument applies to all chains, not specifically Cardano

---

## Vote Recommendation

**Vote: NO**

This proposal fails on priority fit, commercial nature, and execution risk. The DRep and Constitutional Committee votes already reflect this (93.6% No, 85.71% Committee No). The applicants' own withdrawal confirms the assessment.

To earn my support, a future BTCfi proposal would need:
1. A working prototype or testnet deployment, not just a simulator
2. Explicit open-source licensing for all protocol code
3. A smaller initial ask for a pilot phase, with scale contingent on proven traction
4. Clear evidence of Cardano-specific demand, not just "Bitcoin is big"
5. Separation of infrastructure (public good) from product (commercial) with distinct funding and accountability

The applicants made the right call by withdrawing. Better to build first and return with evidence than to ask the Treasury to fund a hypothesis.

---

## Data Sources

- Koios API: `/api/v1/proposal_list` — proposal metadata
- Koios API: `/api/v1/proposal_voting_summary` — current vote tallies
- GitHub metadata: `raw.githubusercontent.com/sundial-protocol/alchemy-proposal/.../data.jsonld` — full proposal text
- Sundial/Charms X/Twitter announcement — withdrawal notice (July 2026)
