# DRep Vote Rationale: Wirex — Bringing Real-World Payments to Cardano

**Governance Action:** gov_action1k02990lhw6wh74t7c6ufw3mqaek9ujtvyan99dj5qv5kvcs7pn8sqcw2nc5  
**Proposal:** Withdraw ₳3,961,538 for Wirex Real-World Payments Infrastructure  
**Proposed Epoch:** 638 | **Expiration:** Epoch 645  
**Vote:** **No**  
**DRep:** Jonah Koch  
**Date:** 2026-07-12  

---

## Summary

Vote: **No.**

Wirex addresses a real and important gap in Cardano's ecosystem: the lack of integrated real-world payment rails. A regulated fintech with 7M users, 1.5M cards issued, and $20B+ in transaction volume building Cardano-native payments infrastructure is not a frivolous idea. The intent is genuine and the problem is worth solving.

However, this proposal asks the Treasury to fund a **commercial company's infrastructure build with no return mechanism**, no detailed open-source commitments, no evidence of productive ecosystem effects, and no transparency on how the budget is spent. The "public good" framing is thin — what Wirex keeps proprietary (banking rails, Visa network, compliance infrastructure, user relationships) is far more valuable than what they promise to open-source. And what they promise to open-source lacks specifics: no license, no repository, no architecture detail.

For ₳3.85M, I expect proportionate value capture. A commercial beneficiary with demonstrated revenue should share upside, not receive a pure grant. This proposal does not meet that standard.

---

## What This Proposal Gets Right

Before addressing the blocking issues, I want to acknowledge the strengths:

1. **Real problem.** Cardano lacks real-world payment rails at scale. DeFi is strong; everyday spending is weak. This is a genuine bottleneck.

2. **Real company.** Wirex is not vaporware. 7M users, $20B volume, Visa Principal Member status, regulated entity. They have the credentials to execute.

3. **Milestone-based disbursement.** Sundae Labs smart contracts provide technical accountability for fund release.

4. **Strong governance structure.** Intersect + 6-member Oversight Committee (Sundae Labs, Cardano Foundation, Dquadrant, NMKR, Sundial, Eternl) is robust.

5. **No prior Treasury funding.** Clean slate. Not a repeat recipient.

6. **Strategic alignment.** Real-world payments directly address Cardano's adoption gap. If executed well, this could bring meaningful transaction volume and user growth.

These are real assets. But they do not justify the structure of this ask.

---

## Blocking Issues

### 1. Pure Grant to a Commercial Entity with No Return Mechanism

Wirex is a **commercial company** with $20B in annual transaction volume and 7M users. They are not a struggling public-good builder. They are a regulated fintech getting Treasury funds to build infrastructure that directly benefits their own business.

What Wirex keeps proprietary:
- **Visa Principal Member status** (valuable, exclusive)
- **Banking rails and stablecoin settlement infrastructure**
- **Compliance and regulatory licenses**
- **7M user base and 1.5M card relationships**
- **Revenue from card transactions and payment processing**

What Cardano gets: **"Open-source" smart contracts** — with no license specified, no repository committed, no documentation standards, and no fork rights defined.

There is **no repayment, no revenue share, no warrants, no matched funding, no Treasury upside of any kind.** This is a pure grant to a commercial entity.

Compare to other proposals I've evaluated:
- **Eternl (₳2.35M, Yes):** Offers repayment (100% surplus) + donation (50% of income above $420K)
- **Strike Finance (₳9M, No):** Offers Treasury-owned LP position with yield return
- **Wirex (₳3.85M):** Offers nothing back to Treasury

A commercial beneficiary with demonstrated revenue and regulatory standing should share upside or risk. This proposal does neither.

### 2. Vague "Public Good" Claims

The proposal states: "All components are released as a public good, giving wallet providers, fintechs, stablecoin issuers, and developers reusable infrastructure."

This sounds good. But the details are missing:
- **What license?** MIT? Apache 2.0? BUSL-1.1? Something else? The license determines whether the code is truly reusable.
- **Where are the repositories?** No GitHub links, no repo commitments, no CI/CD plans.
- **What is the architecture?** "Smart contract engineering, account abstraction, batched transactions, settlement logic" — but no technical specification, no API documentation, no integration guide.
- **What are the documentation standards?** Open-source code without docs, tests, and deployment instructions is not a public asset.

For ₳3.85M, I need specifics. A sentence saying "public good" is not enough.

### 3. Negative Decentralization Delta — Wirex Becomes the Gatekeeper

Even if the smart contracts are open-source, the actual payment rails require Wirex's proprietary infrastructure:
- Visa network access (Wirex-exclusive as Principal Member)
- Banking partnerships and settlement rails
- Compliance and KYC/AML infrastructure
- Regulatory licenses in multiple jurisdictions

If Wirex decides to leave Cardano, the open-source code exists but the rails to make it work do not. No other fintech can use the code without rebuilding the regulatory and banking infrastructure from scratch — a multi-year, multi-million-dollar effort.

This is not true public infrastructure. It is a **private tollbooth with an open-source facade.** Wirex becomes the single gateway for Cardano real-world payments. That is centralization, not decentralization.

### 4. No Productive Ecosystem Evidence

The proposal claims that "wallet providers, fintechs, stablecoin issuers, and developers" can build on this infrastructure. But:
- **No named downstream users or pilots**
- **No CIP proposed** for account abstraction or payment standards
- **No SDK or developer tooling described**
- **No integration commitments from other projects**
- **No evidence of external demand** outside Wirex's own business needs

This is "build it and they will come" — not a productive ecosystem effect. Under my rubric's Productive Ecosystem test, there is no credible new-work branching, no common-input leverage, and no external demand pathway.

### 5. Budget Lacks Transparency

| Line Item | Amount |
|-----------|--------|
| WP1 — Enabling Onchain Payments & Card Infrastructure | ₳3,846,153 |
| Intersect Budget Administration fee | ₳115,385 |
| **Total** | **₳3,961,538** |

That's it. Two line items for nearly ₳4M.

What is in WP1?
- Engineering salaries? How many engineers, for how long, at what rate?
- Smart contract audit? Which firm, what scope, what cost?
- Compliance and regulatory costs? Licensing fees? Legal?
- Infrastructure (servers, APIs, DevOps)?
- Visa integration costs? Are there fees to Visa?
- Marketing and user onboarding?

Voters cannot assess value for money without this breakdown. A single opaque "WP1" line item for ₳3.85M is not acceptable disclosure.

### 6. No ADA Volatility Policy

For a fiat-denominated project (payments, banking, compliance, card issuance), the absence of an ADA volatility policy is a material gap:
- No conversion assumption stated
- No excess-return rule if ADA rises
- No underfunding plan if ADA falls
- No clarity on who bears exchange-rate risk

Wirex operates in fiat. The costs are likely denominated in USD/EUR. If ADA drops 30%, does the scope reduce? Does Wirex co-fund the gap? Or does the Treasury absorb the loss? The proposal is silent.

### 7. Over-Reliance on Intersect Process as Justification

The proposal repeatedly cites "67% Intersect Hydra approval" as a rationale point. But:
- Intersect's internal budget process is **not a substitute for DRep judgment**
- DReps evaluate proposals on **merits**, not on whether they passed an internal vote
- The Intersect process has no veto over DRep votes; it is an input, not an authority

I respect the Intersect budget process as a useful filtering mechanism. But it does not bind my vote. If a proposal fails on public value, return mechanism, or decentralization, no internal approval score can rescue it.

---

## Concerns Acknowledged (Not Blocking)

### Wirex Is Not a Cardano-Native Builder

Wirex has no Cardano smart contract track record, no Cardano community presence, and no prior open-source contributions to the ecosystem. This is a concern — but not a blocking one. A capable external team with real users and regulatory standing can add value. The issue is not their origin; it is the structure of the deal.

### Intersect Administration Fee

The ₳115,385 administration fee (2.9% of total) is reasonable for oversight and smart contract management. This is not a concern.

---

## What Would Earn My Support

If Wirex resubmits, I would need to see the following changes. I do not expect all of them, but the more addressed, the stronger the case.

### 1. Add a Treasury Return Mechanism

| Option | Detail |
|--------|--------|
| **Revenue share** | Wirex shares a percentage of card transaction revenue with Treasury for a defined period (e.g., 2-5% for 24 months) |
| **Repayment** | Wirex repays a portion of Treasury funds from payment processing profits within a defined timeline |
| **Warrants / token rights** | Treasury receives rights to Wirex equity or token value tied to Cardano adoption metrics |
| **Matched funding** | Wirex commits 1:1 or 2:1 co-funding, demonstrating skin in the game |

A commercial beneficiary with $20B in volume should not receive a pure grant. Risk-sharing is the minimum standard.

### 2. Specify Open-Source Commitments

| Deliverable | Requirement |
|-------------|-------------|
| **License** | MIT or Apache 2.0 for all smart contracts; BUSL-1.1 acceptable for transitional period with open-source date |
| **Repositories** | Public GitHub repos with CI/CD, issue tracking, and release management |
| **Documentation** | API docs, integration guides, deployment instructions, architecture diagrams |
| **Tests** | Unit tests, integration tests, and conformance suites |
| **CIP** | Propose a Cardano Improvement Proposal for account abstraction and payment standards |

Without this, "public good" is just marketing language.

### 3. Break Down the Budget

| Category | Example Range | Notes |
|----------|--------------|-------|
| Engineering (salaries, contractors) | ₳1.5-2.0M | FTE count, rates, duration |
| Smart contract audit | ₳200-400K | Firm name, scope, timeline |
| Compliance & regulatory | ₳300-600K | Licensing, legal, KYC/AML infrastructure |
| Infrastructure & DevOps | ₳200-400K | Servers, APIs, monitoring |
| Visa integration | ₳100-300K | Fees, certification, testing |
| Documentation & developer tooling | ₳100-200K | SDK, sample apps, tutorials |
| Contingency | ₳200-400K | 10-15% buffer |

Transparency builds trust. Opacity breeds skepticism.

### 4. Name Downstream Users or Pilots

At least 2-3 named fintechs, wallets, or stablecoin issuers committed to integrating with the infrastructure. Completed pilots carry more weight than promised future integrations.

### 5. Address Decentralization Risk

How can other providers use the open-source code without Wirex's banking/Visa rails? Options:
- **Modular architecture:** Separate smart contract layer from proprietary banking/Visa layer
- **Standard interfaces:** Published APIs that any regulated provider can implement
- **Fallback provider commitment:** Wirex commits to facilitating (or at least not blocking) other providers' access to similar rails
- **Handover plan:** If Wirex exits, documented process for another provider to assume operational control

### 6. Add ADA Volatility Policy

- Conversion assumption (e.g., $0.XX/ADA)
- Excess-return rule: if ADA rises, excess funds returned to Treasury
- Underfunding plan: if ADA falls, Wirex co-funds or scope reduces
- Risk allocation: who bears exchange-rate risk

### 7. Wirex Co-Funding Commitment

Wirex should match Treasury funds at least 1:1, preferably 2:1. A company with $20B in volume can afford to invest in infrastructure that benefits its own business. Treasury should not bear 100% of the cost.

---

## Scorecard (For Reference)

| Category | Max | Score | Notes |
|----------|-----|-------|-------|
| Public value, additionality & productive value | 15 | 6 | Real problem, but vague deliverables and weak downstream evidence |
| Public asset / open-source / continuity | 15 | 4 | "Public good" claimed but no license, repo, or architecture specified |
| Team evidence & integrity | 10 | 5 | Real company but no Cardano track record |
| Price & value (including ADA volatility) | 10 | 3 | Budget is thin for scope; no ADA volatility policy; no cost breakdown |
| Treasury return / risk sharing | 15 | 2 | **Zero return from commercial beneficiary** — pure grant |
| Milestones & verification | 15 | 5 | Milestone-based but details not visible; no Wirex smart contract audit mentioned |
| Decentralization delta & dependency graph | 10 | 3 | Creates Wirex gatekeeper for payment rails; stranded code risk |
| Risk management & sustainability | 10 | 4 | No ADA volatility plan; unclear post-funding sustainability |
| **Base Score** | **100** | **32** | |
| Productive Ecosystem Multiplier | +3 | 0 | No named downstream users, no pilots, no CIP, no SDK |
| Conviction | ±3 | — | Intrigued by problem, concerned by structure |
| **Final Score** | **100** | **32** | |

**Threshold for ₳3.96M ask: 80+. This scores ~32.**

---

## Final Statement

Vote: **No.**

Wirex is a capable company addressing a real problem. The vision of Cardano-powered real-world payments is compelling. But the structure of this proposal — a pure grant to a commercial entity with no return mechanism, no detailed open-source commitments, no productive ecosystem evidence, and no budget transparency — does not meet the standard for Treasury funding.

The Cardano Treasury is not a venture capital fund. It is public capital meant to create public goods, share upside with the ecosystem, and avoid creating private gatekeepers. This proposal fails on all three counts.

If Wirex resubmits with open-source specifics, a revenue-sharing or repayment mechanism, named downstream integrators, a detailed budget, an ADA volatility policy, and a co-funding commitment, I will evaluate it with a genuinely open mind. The problem is worth solving. This proposal, as structured, does not solve it fairly for the Treasury.

---

*This rationale reflects my independent assessment as a Cardano DRep. I have no material conflict of interest regarding this proposal. I do not hold a position in Wirex, nor do I have any commercial or financial relationship with Wirex or Intersect.*
