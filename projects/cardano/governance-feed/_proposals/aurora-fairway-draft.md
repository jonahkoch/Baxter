---
layout: proposal
title: "Aurora: Open Infrastructure for Institutional Credit Markets on Cardano"
proposal_id: "draft-aurora-fairway-2026"
proposal_type: TreasuryWithdrawals
status: draft
tags: ["defi", "lending", "infrastructure", "real-world", "identity", "compliance", "pilot"]
related_proposal_id: gov_action1w0shrfxqwv95kk0v4cn34wylz25a2cmqkq5jpc0e2yrahhqava3qsuae57l
amount_ada: 2,900,000
proposed_epoch: TBD
expiration: TBD
meta_url: "https://github.com/fairway-global/aurora-proposal"
meta_hash: ""
drep_yes_pct: ?
drep_no_pct: ?
drep_abstain_pct: ?
drep_yes_votes: ?
drep_no_votes: ?
drep_yes_power: ?
drep_no_power: ?
committee_yes: ?
committee_no: ?
context:
  - date: "2026-07-28"
    source: "GitHub / Pre-submission Review"
    type: "draft-assessment"
    summary: "Proposal currently in community review before on-chain submission. Team actively seeking DRep feedback."
    impact: "Status and content may change based on feedback received prior to governance action creation."
    link: "https://github.com/fairway-global/aurora-proposal"
---

Aurora is a Treasury proposal led by Fairway in collaboration with Fallen Icarus and Sundial Protocol to build reusable open-source infrastructure for institutional credit markets on Cardano. It delivers an optional metadata and trust layer that enables identity, compliance, and verification signals to attach to Loan Request UTxOs without modifying underlying lending smart contracts.

The project has two phases. Phase 1 builds the metadata standard, off-chain indexer, developer tooling, and dRep monitoring dashboard. Phase 2 validates the infrastructure through a Treasury-backed pilot deploying approximately 100,000 USDM equivalent through regulated Ethiopian Savings and Credit Cooperative Organizations (SACCOs).

The total request is 2,900,000 ADA, split into a 2,200,000 ADA operating budget and 700,000 ADA pilot liquidity. Development funds are released milestone by milestone. Pilot liquidity is deployed progressively across three rounds contingent on repayment performance. Independent Treasury Trustees custody the full allocation through a 2-of-3 multisig. All outputs are Apache License 2.0.

## Assessment

**Lean Yes**, with four conditions the team should address before on-chain submission.

**Strengths.** The consortium is credible. Fairway has delivered Catalyst-funded identity infrastructure including Ethiopia's Fayda National ID integration. Fallen Icarus designed the credit market architecture this builds on, CIP-89 beacon tokens and cardano-loans. Sundial contributes institutional market expertise. Treasury protection is robust: independent trustees, milestone-gated releases, progressive pilot liquidity, published wallet addresses, dRep dashboard, and explicit return-of-capital at pilot conclusion. The open-source commitment is genuine, Apache 2.0 with no exclusive commercial rights.

**Key architectural insight.** Aurora keeps lending protocols permissionless while adding an optional institutional trust layer via transaction metadata. This avoids forcing KYC into smart contracts and preserves composability. The off-chain indexer handles proof verification that would be too expensive on-chain.

**Concerns.** First, the pilot scale feels small for the infrastructure ambition. One hundred thousand USDM across three Ethiopian SACCOs over twelve months is a proof of concept, not institutional validation. The real test is whether post-pilot SACCOs can attract non-Treasury capital, and there is no committed follow-on provider yet. Second, Pogun dependency is soft but real. The proposal says an alternative audited implementation can be used if Pogun delays, but no specific alternative is named. Third, Sundial's dual role warrants attention. Sundial is a consortium member here and has its own active treasury proposal for Alchemy. While their role here is appropriately limited to ecosystem engagement, any future commercial arrangement to use Aurora infrastructure should be disclosed. Fourth, the Capital Provider Readiness Framework deliverable is vague. Documented engagement with five prospective providers is a low bar; a stronger criterion would require at least one non-binding commitment or detailed term sheet.

**Ecosystem crossover.** Aurora fills a genuine gap. No other active proposal is building institutional credit market infrastructure. It complements Pogun rather than duplicating it. It differs from Strike Finance, which focuses on perpetuals, and from AlphaGrowth PRIME, which focuses on liquidity incentives. The SACCO pilot places it in real-world asset territory alongside 5am.earth, but at much smaller scale and in a different vertical.

**Conditions for full support.** Clarify post-pilot sustainability if no private capital commits within twelve months. Strengthen the Capital Provider Readiness Framework with a commitment-based success criterion. Name the specific alternative audited credit market implementation that would replace Pogun if delayed. Disclose any commercial arrangement between Sundial and Aurora infrastructure post-pilot.
