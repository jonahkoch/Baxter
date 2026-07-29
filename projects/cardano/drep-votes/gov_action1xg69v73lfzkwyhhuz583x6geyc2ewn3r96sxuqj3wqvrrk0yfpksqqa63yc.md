---
proposal_id: gov_action1xg69v73lfzkwyhhuz583x6geyc2ewn3r96sxuqj3wqvrrk0yfpksqqa63yc
proposal_title: "Scalus 2026: Maintenance, Dijkstra Readiness, Interoperability & Application Runtime"
vote: YES
drep: Jonah Koch
vote_date: 2026-07-29
---

# Assessment: Scalus 2026 — Developer Platform Continuation

## Proposal Overview

This Treasury Withdrawal requests 2,464,844 ADA approximately 394,375 US dollars at 16 cents per ADA for a focused 9 month continuation of the Scalus Cardano development platform. Scalus is a JVM native development platform for complex Cardano protocols and applications. It is already used directly by Gummiworm L2, Bifrost bridge, SugarRush DEX, Vela stablecoin, and DID identity protocols. Its components are embedded in widely used developer tooling including MeshJS SDK, Lucid Evolution, Evolution SDK, Cardano Client Lib, and YaciDevKit. This proposal funds maintenance, Dijkstra hard fork readiness, interoperability improvements, and a first scoped application runtime step. It is a deliberate resubmission that reduces the ask from 8.5 million ADA to 2.46 million ADA directly addressing prior DRep feedback about scope and budget.

## Current Voting Status

This proposal was submitted in Epoch 640 and expires in Epoch 647.

## Detailed Assessment

### Layer 0: Priority and Fit Screen

**Is this a real Treasury priority?** Yes. Developer infrastructure is foundational to Cardano's ability to attract and retain builders. The Dijkstra hard fork introduces Plutus V4, nested transactions, accounts, and guard scripts. Without maintenance and readiness work, existing developer tooling becomes outdated and incompatible. Scalus components are embedded in tools that thousands of developers use, making this maintenance work high leverage.

**What public value does Cardano receive?** Multiple forms of public return. The open source code under Apache 2.0 license is a durable public asset. The Dijkstra readiness work produces institutional capacity in the form of conformance tests, documentation, and upgrade paths that other teams can follow. The interoperability improvements create public learning about JVM and JavaScript integration patterns. And the maintenance work delivers avoided loss by preventing toolchain obsolescence.

**Is the instrument appropriate?** Yes. A Treasury withdrawal with milestone gating, audited escrow, and independent oversight is appropriate for infrastructure maintenance and incremental development.

**Does this increase or decrease decentralization?** Neutral to positive. Scalus is open source with no proprietary lock in. Improving interoperability with existing tools strengthens the ecosystem's composability rather than creating new dependencies on a single vendor.

**What is the opportunity cost?** At 2.46 million ADA this is a modest ask. The opportunity cost is low relative to the breadth of tooling that depends on Scalus components. The previous 8.5 million ADA proposal would have been a harder call. This reduced version is proportionate.

**Does this create productive ecosystem effects?** Yes. Scalus components are already embedded in five major developer tools. Improvements to those components benefit all users of those tools transitively. The application runtime step, if successful, creates new possibilities for building and operating Cardano applications from a unified stack.

### Layer 1: Proposal Quality

**Section A: Basics**

The applicant is Lantr Engineering, a blockchain R&D team with three years of continuous Scalus delivery. The ask is clearly itemized across four workstreams with specific FTE allocations and budget breakdown. The 2.46 million ADA ask is 71 percent lower than the previous 8.5 million ADA proposal, with no contingency. Prior funding is fully disclosed including the 2025 Treasury grant of 657,692 ADA and three Catalyst grants. Commercial interest is appropriately disclosed: Lantr builds products on Scalus and benefits from its continued development.

**Section B: Value and Impact**

Public asset quality is high. All funded work is open source under Apache 2.0. The conformance tests, documentation, blueprints, and integration examples are durable public assets. The Dijkstra readiness work in particular produces reusable test coverage that other teams can benefit from.

Additionality is strong. Without funded maintenance, Scalus components embedded in MeshJS, Lucid Evolution, and other tools risk becoming incompatible with the next protocol version. The counterfactual is fragmented, outdated tooling that slows development across the ecosystem.

Retained impact is good. The code, documentation, and test suites remain permanently. The application runtime is a new public asset if delivered successfully.

**Section C: Execution and Accountability**

Team evidence is strong. Lantr has delivered every prior milestone on time across Catalyst and Treasury funding cycles. The 2025 Treasury grant was completed successfully with all milestones delivered. Scalus has 4,642 commits across 32 releases and 12 contributors over three years.

Milestones are concrete and assessable. M1 delivers Dijkstra developer preview and runtime foundations. M2 advances interoperability and Dijkstra conformance. M3 reaches final readiness and consolidates the runtime. Each milestone has specific deliverables and adoption indicators.

Independent verification is strong. The same oversight board as Bifrost (Gianelloni, Benkort, Kilgore) provides governance. No.Witness Labs serves as third party technical assurer. SundaeSwap audited escrow contracts enforce milestone gating. An external financial audit is planned for Q2 2027.

Anti gaming measures are present. Auto abstain DRep delegation and no SPO delegation for escrowed funds. Failsafe sweep returns unspent funds automatically.

**Section D: Commercial Terms**

This is mixed public and commercial value. The infrastructure maintenance is clearly a public good. The application runtime has commercial potential but is open source. There is no token, no founder allocation beyond delivery fees, and no ongoing protocol rent. The terms are reasonable.

**Section E: Marketing and Adoption**

Not applicable as a primary scorecard. Adoption metrics are tracked through downloads, integrations, and developer engagement rather than vanity metrics.

**Section F: Decentralization Delta**

Neutral to positive. Open source license prevents lock in. Interoperability improvements make it easier for teams to use diverse tooling rather than forcing dependence on a single stack.

**Section G: Risk and Sustainability**

ADA volatility discipline is addressed. The proposal uses a conservative 16 cent reference rate, lower than the current market price. The budget is lean with no contingency, and Lantr commits to partial conversion to stable assets after disbursement based on lessons from the 2025 cycle where ADA depreciation significantly compressed purchasing power.

The risk register is reasonable. Key risks are market price decline, slower than expected adoption, Dijkstra specification changes, and team capacity. Mitigations include conservative budgeting, hedging, developer preview approach for Dijkstra, and access to broader Scala engineering talent.

Sustainability is partially addressed. Scalus is already funded through product usage and Catalyst grants. This Treasury funding covers a specific 9 month gap. Long term sustainability depends on continued adoption and potential commercial offerings, but the maintenance work protects existing investment regardless.

**Section H: Subsidy Loop and Dependency Graph**

The proposal creates minimal subsidy loop risk. The funded work is maintenance and incremental improvement of existing open source infrastructure. Teams that depend on Scalus components already use them voluntarily. The interoperability improvements reduce rather than increase integration friction.

### Key Concerns

**1. Prior Treasury funding pattern.** Lantr received 657,692 ADA in 2025 for Scalus and is also a joint applicant on the Bifrost proposal for 12.3 million ADA. This creates a concentration of Treasury requests from one team. However the track record is strong and each proposal is independently justifiable.

**2. Application runtime is unproven.** The scoped runtime step is the riskiest part of the proposal. While the maintenance and Dijkstra readiness are clearly valuable, the runtime is a new direction that may not find adoption. The proposal correctly limits this to a bounded first step with validation through reference applications.

**3. JVM ecosystem focus.** Scalus targets JVM developers, which is a narrower segment than JavaScript or TypeScript. However the multiplatform exports to JS/TS and the interoperability work with existing JavaScript tooling partially address this.

**4. Lean team for scope.** At 2.25 FTE over 9 months the team is intentionally small. This is appropriate for the reduced scope but leaves limited buffer if key personnel become unavailable.

### Overall Assessment

This proposal scores highly on responsiveness to feedback, accountability, and proportionality. The 71 percent reduction in ask directly addresses prior DRep concerns. The scope is focused on existing adoption rather than speculative expansion. The accountability framework is strong with independent oversight, audited escrow, and third party assurance.

The primary concern is the concentration of Treasury requests from Lantr across Scalus and Bifrost. However the reduced ask, strong track record, and clear public value make this a sound investment.

## Vote Rationale

I am voting Yes on this proposal. Scalus is proven developer infrastructure with components embedded in tools that thousands of Cardano developers use every day. The 2.46 million ADA ask is proportionate and represents a 71 percent reduction from the prior proposal that DReps found too large. This shows the team listened to feedback and adjusted accordingly.

The maintenance and Dijkstra readiness work alone justifies the ask. Without it, embedded Scalus components in MeshJS, Lucid Evolution, and other tools risk becoming incompatible with the next protocol version. That would create friction for developers across the ecosystem.

I acknowledge Lantr Engineering has multiple active Treasury requests including Bifrost. I evaluated each proposal independently on its merits. Scalus stands on its own as a sound continuation of proven work with a reasonable price tag.

## Vote Summary

Vote Yes on Scalus 2026. Funds developer infrastructure and Dijkstra readiness for a platform used by Gummiworm, Bifrost, SugarRush, and embedded in MeshJS and Lucid Evolution. Ask reduced 71 percent from prior proposal. Strong accountability with independent oversight.
