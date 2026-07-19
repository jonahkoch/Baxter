# DRep Vote Rationale: Hardware Wallet Maintenance 2026

**Governance Action:** gov_action1k02990lhw6wh74t7c6ufw3mqaek9ujtvyan99dj5qv5kvcs7pn8syhyg4hw
**Proposal:** Withdraw ₳1,310,960 for Hardware Wallet Maintenance 2026
**Proposed Epoch:** 638 | **Expiration:** Epoch 645
**Vote:** **Yes**
**DRep:** Jonah Koch
**Date:** 2026-07-19

---

## Summary

Vote: **Yes.**

This proposal funds 12 months of maintenance for Cardano's hardware-wallet support: **Ledger and Trezor** compatibility updates, **cardano-hw-cli** and supporting libraries, developer support for ecosystem integrators, and vendor-required security audits.

Hardware wallets are not a luxury feature — they are the primary security layer for serious Cardano users. If Ledger or Trezor firmware updates break Cardano support, users lose secure signing, large holders face forced migrations, and the ecosystem's credibility suffers. This is **maintenance of existing, proven infrastructure**, not speculative development.

The ask — ₳1.31M — is proportionate for maintaining two major hardware-wallet integrations across a 12-month protocol evolution cycle. The team has prior funding and delivery history. The public value is clear and immediate.

Same transparency concerns as other Intersect proposals (thin budget, no ADA volatility policy, invisible milestones), but at this scale and for this function, they are manageable.

---

## What This Proposal Gets Right

### 1. Critical User-Facing Infrastructure

Hardware wallets are the gold standard for self-custody security. They:
- Keep private keys offline and isolated from internet-connected devices
- Protect users from malware, phishing, and keyloggers
- Enable secure high-value transactions
- Are the only practical security option for institutional and whale holders

If Ledger or Trezor support breaks, the damage is not theoretical. Users:
- Cannot access or move funds securely
- Must either wait for a fix or migrate to hot wallets (reducing security)
- Lose confidence in Cardano's reliability
- May leave the ecosystem entirely

Maintaining hardware-wallet compatibility is **avoided loss** in the Five Forms of Public Return — preventing the security degradation and user attrition that follows broken signing infrastructure.

### 2. Proven Maintenance Function

This is not a new product. It is **continuity maintenance** of an existing access layer. The proposal explicitly states:
- "This is a continuity proposal for an already-proven Cardano access layer"
- "Scope is limited to compatibility, security, supporting libraries/tooling, release support, and vendor-required audit work"
- "Does not duplicate broader core-node, ledger, or general infrastructure maintenance budgets"

This scope discipline is important. They are not asking to build a new wallet. They are asking to keep the existing one working as Cardano, Ledger, and Trezor evolve.

### 3. Transparent Prior Funding Disclosure

The proposal discloses extensive prior funding:

| Source | Purpose |
|---|---|
| Treasury — Hardware Wallet Maintenance | Prior maintenance funding |
| Treasury — Ledger App Rewrite | Ledger app modernization |
| Treasury — IO & VacuumLabs: Enhancing Plutus | Joint infrastructure work |
| Catalyst Fund 9 | Ledger Live Integration |
| Catalyst Fund 10 | Message signing (CIP-8/CIP-30) for Trezor and Ledger |
| Catalyst Fund 10 | Smart contract CTF |
| Catalyst Fund 11 | Bug bounty platform |
| Catalyst Fund 11 | Cardano native token extension |
| Catalyst Fund 12 | CTF level expansion |

This is honest disclosure of a sustained funding history. It also demonstrates that the team has delivered across multiple funding mechanisms.

### 4. Clear Scope Boundaries

The proposal avoids scope creep with explicit limits:
- Hardware-wallet compatibility and tooling only
- No broader core-node or ledger maintenance
- No new wallet product development
- Vendor-required audits only (not speculative security reviews)

This discipline reduces the risk of budget bloat and makes the deliverables concrete.

### 5. Strong Decentralization Delta

Hardware wallets are a **decentralization tool**. They enable users to self-custody securely without trusting exchanges, custodians, or hot-wallet providers. Maintaining hardware-wallet support:
- Preserves users' ability to hold keys independently
- Reduces concentration of funds on exchanges
- Supports the "not your keys, not your coins" ethos that defines cryptocurrency

A broken hardware-wallet layer pushes users toward centralized custody. This proposal prevents that regression.

### 6. Modest Price for Critical Function

₳1,272,777 + ₳38,183 admin fee = ₳1,310,960 total.

For 12 months of maintenance across two major hardware-wallet vendors, with supporting libraries, developer support, and vendor-required audits, this is proportionate. Consider:
- Ledger and Trezor each have their own firmware release cycles
- Cardano protocol changes (hard forks, parameter updates) can break integrations
- Supporting libraries (cardano-hw-cli) require continuous updates
- Vendor security audits are expensive and mandatory for app store listings
- Developer support for integrators is ongoing

The cost is reasonable for the scope.

### 7. Proactive Timing

The proposal makes a strong case for **proactive maintenance vs. reactive breakage**:

> "Funding continuity in 2026 is less costly and less disruptive than waiting for breakage to accumulate and reacting only after users or integrators lose access."

This is correct. Reactive maintenance after breakage means:
- User funds temporarily inaccessible
- Emergency development at premium cost
- Reputational damage to Cardano
- Support burden on wallet providers and exchanges

Proactive maintenance is cheaper and less risky.

---

## Concerns (Not Blocking, But Noted)

### 1. Single-Line-Item Budget

| Line Item | Amount |
|---|---|
| WP1 — Cardano Hardware Wallet Maintenance & Compatibility Assurance | ₳1,272,777 |
| Intersect Budget Administration fee | ₳38,183 |
| **Total** | **₳1,310,960** |

Two line items for ₳1.31M. I would prefer to see:
- Ledger-specific maintenance allocation
- Trezor-specific maintenance allocation
- cardano-hw-cli and library maintenance
- Developer support allocation
- Vendor audit budget
- Contingency

But the scope description is clear enough that I can infer what the money is for, even without granular breakdown.

### 2. No ADA Volatility Policy

Same gap as every Intersect proposal. For a 12-month maintenance contract:
- No conversion assumption
- No excess-return rule
- No underfunding contingency

At ₳1.31M, this is a manageable risk. But it is still a gap.

### 3. Milestones Not Visible in Public Metadata

The proposal references "milestone-based disbursement controls" but does not publish specific milestones. For maintenance work, milestones are harder to define than for feature development, but some structure would be helpful:
- Quarterly compatibility reports
- Firmware update response SLAs
- Audit completion dates
- Library release milestones

### 4. Prior Funding Raises Sustainability Question

The extensive prior funding history (Treasury + Catalyst across multiple funds) raises a legitimate question: **Will hardware-wallet maintenance ever become self-sustaining?**

Hardware-wallet vendors (Ledger, Trezor) are commercial companies. They charge users for devices. They benefit from Cardano support because it expands their addressable market. At some point, should the vendors themselves bear more of the maintenance cost?

This is a fair question, but it does not block this proposal. The current reality is that Cardano-specific maintenance requires ecosystem-specific expertise, and vendors do not fully fund this work. Until that changes, Treasury funding is a reasonable stopgap.

### 5. Self-Funding Pattern

Same Intersect structural concern: Intersect is both applicant and administrator. At this scale and for this function, the concern is minor.

---

## What Would Strengthen Future Proposals

1. **Granular budget:** Split by vendor (Ledger/Trezor), by function (compatibility/libraries/audits/support), and by quarter
2. **ADA volatility policy:** Conversion assumption, excess-return rule, underfunding plan
3. **Published milestones:** Quarterly deliverables with verification criteria
4. **Vendor cost-sharing plan:** Roadmap for Ledger/Trezor to assume more maintenance responsibility over time
5. **Metrics:** Number of supported devices, firmware versions covered, integrator support tickets resolved, audit findings addressed

---

## Scorecard

| Category | Max | Score | Notes |
|----------|-----|-------|-------|
| Public value, additionality & productive value | 15 | 13 | Critical user security infrastructure; avoids user attrition and fund loss |
| Public asset / open-source / continuity | 15 | 10 | cardano-hw-cli and libraries are open-source; maintenance preserves usability |
| Team evidence & integrity | 10 | 7 | Extensive prior funding history; proven delivery; transparent disclosure |
| Price & value (including ADA volatility) | 10 | 7 | Reasonable for two-vendor, 12-month maintenance; no ADA volatility policy |
| Treasury return / risk sharing | 15 | N/A | Public good — no return expected |
| Milestones & verification | 15 | 7 | Maintenance milestones are harder to define; framework exists but details thin |
| Decentralization delta & dependency graph | 10 | 8 | Strong positive — hardware wallets enable self-custody; reduces exchange dependency |
| Risk management & sustainability | 10 | 6 | No ADA volatility plan; raises long-term sustainability question (vendor cost-sharing) |
| **Base Score** | **100** | **58** | |
| Productive Ecosystem Multiplier | +3 | +2 | Enables secure DeFi, payments, institutional participation |
| Conviction | ±3 | +2 | Clear value, modest ask, proven function |
| **Final Score** | **100** | **62** | |

**Threshold for ₳1.31M ask: ~60. This scores 62.**

---

## Final Statement

Vote: **Yes.**

Hardware-wallet maintenance is not glamorous, but it is essential. Ledger and Trezor support is the primary security layer for serious Cardano users, and without continuous maintenance, it breaks as protocols and firmware evolve. The consequences — stranded funds, user attrition, reputational damage, and push toward centralized custody — are severe and avoidable.

This proposal asks for a modest amount (₳1.31M) to maintain proven infrastructure for 12 months. The team has a track record. The scope is disciplined. The public value is immediate and clear.

I note the same transparency gaps that appear across Intersect-administered proposals: thin budget detail, no ADA volatility policy, and invisible milestones. At this scale, they are concerns but not blockers. I also raise a longer-term sustainability question: hardware-wallet vendors should eventually bear more of this cost. But that transition is not today's problem.

For now, the value justifies the vote.

---

*This rationale reflects my independent assessment as a Cardano DRep. I have no material conflict of interest regarding this proposal. I do not hold a position in Ledger, Trezor, VacuumLabs, or Intersect, and have no commercial relationship with any of them beyond my role as a DRep.*
