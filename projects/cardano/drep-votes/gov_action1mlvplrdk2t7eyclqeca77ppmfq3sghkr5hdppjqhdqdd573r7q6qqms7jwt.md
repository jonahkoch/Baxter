---
proposal_id: gov_action1mlvplrdk2t7eyclqeca77ppmfq3sghkr5hdppjqhdqdd573r7q6qqms7jwt
proposal_title: "Bifrost: Unlocking Bitcoin DeFi on Cardano — Road to Mainnet (Phase 1 of 2)"
vote: PENDING
drep: Jonah Koch
vote_date: 2026-07-29
---

# Assessment: Bifrost — Bitcoin-Cardano Bridge (Phase 1)

## Proposal Overview

This Treasury Withdrawal requests 12,332,031 ADA approximately 1.97 million US dollars at 16 cents per ADA for Phase 1 of Bifrost a permissionless Bitcoin to Cardano bridge. The bridge uses FROST threshold signatures secured by Cardano's existing SPO ecosystem to custody locked BTC. fBTC arrives on Cardano as a native token composable across DeFi applications. Phase 1 covers nine months of hardening security audits formal verification and deployment to a private audited mainnet under controlled access. Public launch and 24 months of operations are deferred to a separate Phase 2 proposal planned for Q1 2027. FluidTokens and Lantr Engineering are the joint delivery teams.

## Current Voting Status

This proposal was submitted in Epoch 640 and expires in Epoch 647. Detailed voting percentages were not available at the time of this assessment.

## Net Change Limit Analysis

According to Ace Alliance Constitutional Committee analysis, the current 350 million ADA Net Change Limit enacted for epochs 613 through 713 has approximately 335.6 million ADA already consumed by enacted withdrawals. This leaves roughly 14.4 million ADA in remaining headroom under the current limit.

Bifrost requests 12.3 million ADA. Under the current 350 million ADA limit this leaves only about 2.1 million ADA of headroom after Bifrost. This is extremely tight.

The Net Change Limit increase to 500 million ADA was also proposed in epoch 640 and expires in epoch 647 the same expiration as Bifrost. If the NCL increase is enacted at the epoch 646 to 647 boundary, Bifrost would then have approximately 165 million ADA in available headroom. If the NCL increase fails, Bifrost would barely fit under the current limit with almost no room for other proposals.

This creates a sequencing dependency. Bifrost voters who support the proposal may also need to consider their position on the NCL increase, because without it the fiscal runway for this and subsequent proposals is nearly exhausted.

## Detailed Assessment

### Layer 0: Priority and Fit Screen

**Is this a real Treasury priority?** Yes. Bitcoin represents roughly 1.6 trillion US dollars in capital and less than 1 percent of that is currently used in DeFi. Cardano is structurally well suited for Bitcoin DeFi due to shared UTxO foundations native assets and predictable fees. A secure BTC rail is a genuine infrastructure gap that if filled would unlock significant new TVL transaction volume and user segments for Cardano.

**What public value does Cardano receive?** This proposal creates multiple forms of public return. First it produces audited open source smart contracts and cryptographic infrastructure under Apache 2.0 license which is a durable public asset. Second it creates institutional capacity in the form of a proven bridge architecture and operational runbooks. Third it produces public learning through formal verification results security audits and the first production deployment of FROST threshold signatures at SPO scale. Fourth it delivers avoided loss by reducing Cardano's current inability to compete for Bitcoin liquidity.

**Is the instrument appropriate?** Yes. A Treasury withdrawal with milestone gating refundable contingency and an established escrow framework is the right instrument for infrastructure development of this scale and risk profile. The Phase 1 and Phase 2 separation is particularly well designed: it forces proof before requesting operational funding.

**Does this increase or decrease decentralization?** Positive. The custody model distributes BTC security across 400 plus SPOs weighted by delegation rather than concentrating it in a company foundation or fixed signing committee. This is meaningfully more decentralized than multisig bridges with 5 to 21 signers. The independent stewardship structure planned for M3 further reinforces decentralization by removing bridge ownership from the founding teams.

**What is the opportunity cost?** At 12.3 million ADA this is a very large proposal consuming a significant portion of the current Net Change Limit. The opportunity cost is substantial: this funding could support multiple smaller infrastructure or DeFi proposals. However Bitcoin bridges are capital intensive by nature due to the security requirements and audit scope involved.

**Does this create productive ecosystem effects?** Yes. fBTC as a native Cardano asset creates compounding effects across DEXes lending protocols derivatives and structured products. The SDK and white label portal allow any dApp to embed BTC onboarding. SPOs gain a new revenue stream tied to Bitcoin activity. The economic model includes surplus distribution back to the Cardano Treasury in fBTC once reserves are established.

### Layer 1: Proposal Quality

**Section A: Basics**

The applicants are FluidTokens and Lantr Engineering. FluidTokens operates Cardano DeFi with approximately 18 million US dollars in TVL. Lantr Engineering is a blockchain R&D team behind Scalus and other infrastructure. The ask is clearly itemized across four workstreams with specific budgets and FTE allocations. The 10 percent refundable contingency is a strong practice. Prior funding is fully disclosed including the 2025 Treasury withdrawal to Lantr for Scalus development and the ongoing Catalyst Fund 14 grant for Bifrost testnet. Commercial interest is appropriately disclosed: both teams benefit from building and operating the bridge though they hold no token allocation or ongoing protocol rent.

**Section B: Value and Impact**

Public asset quality is high. The bridge smart contracts watchtower software SPO coordination tooling SDK and transparency portal are all open source under Apache 2.0. These are durable public assets that persist regardless of the bridge's commercial success. The formal verification of critical paths and published security audits add additional public learning value.

Additionality is strong. Cardano currently captures negligible Bitcoin DeFi activity. Without a secure BTC rail this gap persists indefinitely. The counterfactual is that Bitcoin liquidity continues to flow to Ethereum Solana and other ecosystems that have established bridges.

Retained impact is mixed. The public infrastructure code SDK registry is permanently retained. However the bridge itself requires ongoing operations and maintenance. If operations cease the code remains but the live bridge does not. The Phase 2 operations proposal addresses this by funding 24 months of operations with a self sustainability target by Year 3.

**Section C: Execution and Accountability**

Team evidence is strong. Bifrost is already live on testnet with working peg ins and peg outs. Catalyst Fund 14 milestones are on track with M1 and M2 complete and M3 through M5 submitting in mid 2026. Five SPOs have volunteered for testnet and eight dApps have expressed integration interest. This is not a paper proposal.

Milestones are concrete and assessable. M1 delivers a hardened release candidate. M2 delivers external audits and formal verification. M3 delivers an audited bridge running on mainnet in both custody modes with real BTC under controlled access. Each milestone gates the next.

Independent verification is extensive. The proposal includes external audits of smart contracts cryptographic protocols off chain components and penetration testing. Formal verification covers critical paths. No.Witness Labs serves as independent technical assurer. An independent oversight board with Chris Gianelloni Matthias Benkort and Riley Kilgore co signs disbursements and can halt funding. A financial audit is planned at Phase 1 close. This is among the strongest accountability structures in any active Treasury proposal.

Anti gaming measures are present. The SundaeSwap treasury contracts enforce auto abstain DRep delegation and no SPO delegation for escrowed funds. A failsafe sweep returns unspent funds to the Treasury automatically after expiration.

**Section D: Commercial Terms**

This is a mixed public and commercial proposal. The bridge infrastructure is public but the bridge operations generate fee revenue. The terms here are favorable to the public: no bridge token no founder allocation open source license and fee surplus sharing with the Cardano Treasury once reserves are established. The 35 percent SPO retainer pool and 65 percent Treasury surplus split is provisional and governance tunable. This is stronger commercial terms than most DeFi infrastructure proposals.

**Section E: Marketing and Adoption**

Not applicable as a primary scorecard though ecosystem readiness and partnership development are included as workstreams. The proposal focuses on dApp integrations and SPO onboarding rather than vanity metrics.

**Section F: Decentralization Delta**

Positive. SPO weighted custody distributes security across Cardano's existing validator set rather than creating a new permissioned group. The independent stewardship structure removes long term control from the founding teams. The open source license prevents proprietary lock in.

**Section G: Risk and Sustainability**

ADA volatility discipline is partially addressed. The proposal notes that a portion of requested ADA will be hedged into stable assets after disbursement to protect the delivery budget. This is good practice though the hedging strategy is not detailed.

The risk register is comprehensive with specific risks likelihoods impacts mitigations and residual exposures documented. Key risks include delivery delays from audit findings smart contract exploits and custody validation during private mainnet. Mitigations include milestone gating staged rollout TVL caps bug bounties and formal verification.

Sustainability is planned through a fee model that targets self sustainability by Year 3. The operational reserve target is 12 months of mandatory operations plus one SPO retainer pool cycle. If reserves fall below a 6 month safety floor surplus distribution pauses until recovery. This is a prudent design though it depends on adoption reaching base case targets.

The adoption projections are ambitious but not unrealistic. Base case targets 1,200 BTC approximately 120 million US dollars in TVL by end of Year 2. For context that would represent roughly 4 percent of Cardano's current DeFi TVL. The bear case of 500 BTC provides a meaningful lower bound.

**Section H: Subsidy Loop and Dependency Graph**

The proposal creates some dependencies. Bridge operations depend on SPO participation watchtower operators and dApp integrations. However these are natural ecosystem dependencies rather than artificial subsidy loops. The fee model is designed to make SPO participation self sustaining rather than dependent on Treasury subsidies. The SDK and white label portal reduce integration friction which should accelerate organic adoption.

### Key Concerns

**1. Price tag.** At 12.3 million ADA this is one of the largest active Treasury proposals. The budget is justified by the scope security requirements and audit costs but it consumes significant fiscal capacity. The Phase 2 estimate of an additional 1.3 million US dollars brings total ask to roughly 3.3 million US dollars for the full program.

**2. Prior Treasury funding to Lantr.** Lantr Engineering received 657,692 ADA in 2025 for Scalus development. While fully disclosed and separate from Bifrost this creates a pattern of large Treasury requests from the same team. Voters should consider whether Lantr has delivered sufficient value from the prior grant to justify continued funding at this scale.

**3. Competitive landscape.** Other ecosystems are also pursuing Bitcoin bridges. Ethereum has tBTC with production history since 2023. BitVM based approaches like Citrea offer a different security model with 1 of N honesty assumptions. Cardano's window to establish a credible Bitcoin DeFi position is not infinite. Bifrost must execute quickly to capture mindshare and liquidity.

**4. Adoption risk.** The bridge is only valuable if Bitcoin holders actually use it. The proposal acknowledges that security concerns are the main barrier to Bitcoin DeFi adoption. Bifrost's SPO secured model is architecturally stronger than custodial alternatives but it remains unproven at scale. The base case of 1,200 BTC by Year 2 requires significant dApp integration and user onboarding.

**5. NCL constraint.** The current 350 million ADA limit has only about 14.4 million ADA remaining according to Ace Alliance Constitutional Committee analysis. Bifrost at 12.3 million ADA would consume nearly all of it. Without the NCL increase passing first, this proposal leaves virtually no fiscal capacity for other pending Treasury requests. This is not a flaw in the proposal itself but it creates a real sequencing constraint for voters.

**6. Execution complexity.** Delivering four workstreams across two teams in nine months while undergoing multiple external audits and formal verification is ambitious. The 10 percent contingency provides some buffer but schedule risk is material.

### Overall Assessment

This proposal scores highly on public value accountability and decentralization. It addresses a genuine infrastructure gap with a technically sound approach. The team has already demonstrated working testnet infrastructure. The accountability framework is best in class with independent oversight board audited escrow contracts formal verification and transparent reporting.

The primary drawbacks are the very large price tag the competitive urgency and the execution complexity of delivering audited mainnet readiness in nine months. Prior funding to Lantr Engineering is disclosed but warrants scrutiny.

On balance this is a strong infrastructure proposal with appropriate risk management. The Phase 1 and Phase 2 separation is particularly well designed as it forces proof of delivery before operational funding.

## Preliminary Recommendation

Based on the rubric assessment this proposal scores as a **conditional Yes**. The public value is clear the accountability structure is excellent and the technical approach is sound. The concerns are primarily around cost and execution risk rather than fundamental flaws.

The final vote should consider whether the 12.3 million ADA price tag is justified relative to other Treasury priorities and whether the team has earned sufficient trust from prior grants. Social signals from the community and SPOs may also inform the decision.

## Vote Rationale

PENDING. Awaiting social signals and final voter judgment before drafting the published rationale and 300 character summary.
