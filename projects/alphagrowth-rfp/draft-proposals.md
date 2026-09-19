# Alpha Growth PRIME RFP — Draft Proposals

**Date:** 2026-09-19
**Applicant:** Jonah Koch
**Categories:** User Acquisition & Distribution + Community & Engagement

---

## PART 1: USER ACQUISITION & DISTRIBUTION

### Field 1: RFP Category
**User acquisition & distribution**

### Field 4: Project, one line
A systematic user acquisition engine that brings non-Cardano DeFi users into Cardano wallets, DEXs, and lending markets through programmatic incentive campaigns with on-chain attribution, verifiable accounting, and cross-chain distribution partnerships.

### Field 5: Why does Cardano need this, and why build it inside PRIME?

The Alpha Growth ecosystem audit (Section 2.3, Category E1) scores Cardano's incentive and user-acquisition infrastructure at **28.8/100** — the third-lowest DeFi score in the assessment. The audit identifies four specific capabilities that are currently impossible at scale:

1. **Programmatic incentive distribution** — All campaigns today are manual airdrops, claims, and IRL QR distributions
2. **On-chain attribution** — No ability to prove which capital came from which campaign
3. **Verifiable reward accounting** — No auditable reconciliation of spend vs qualifying TVL
4. **Reaching non-Cardano holders** — "Incentive spend defaults to the audience already holding Cardano assets and is liable to recirculate existing liquidity rather than expand it"

**Note on existing work:** CIP-0099 (Proof of Onboarding) and the HOSKY generic claim tool provide a *partial* solution for IRL event-based token distribution via QR codes. Supported by Vespr, Yoroi, Lace, Begin, and Eternl Mobile wallets, this standard enables basic claim attribution through campaign `code` fields. However, it does not address: (a) campaign configuration for DeFi protocols, (b) attribution of rewards to on-chain economic activity (deposits, swaps, lending), (c) auditable on-chain reconciliation of spend vs qualifying TVL, or (d) broad programmatic distribution beyond IRL events. The full Merkl/Turtle Club-class infrastructure remains absent.

The audit further notes that "no incentive-distribution or user-acquisition provider" exists in the exchanges and ramps inventory. This is a **structural pipeline failure**: Cardano has functional DeFi (63 protocols tracked) but no reliable mechanism to bring new users to it.

PRIME needs this because:
- The program targets **$200M in net-new, non-circular TVL**
- Without acquisition infrastructure, PRIME-funded protocols will compete for the same ~11,500 active addresses
- The audit's "Phase 3" gating means this gap becomes material exactly when PRIME is deploying capital — the timing is critical

Building inside PRIME means the acquisition engine is co-designed with the protocols that need users, not bolted on afterward. Milestones can be tied to verifiable net-new wallet activations and TVL attribution, not vanity metrics.

### Field 6: Where does the project stand with Cardano today?
**Brand new, starting from scratch for Cardano**

### Field 7: Show us what exists
This is a new build for Cardano, but the operator (Jonah Koch) has:
- Built and operated Kochfoto, a service business with a repeatable client acquisition funnel, referral network, and vendor partnership system
- Active Cardano governance participant (DRep, PactVote builder)
- Deep familiarity with Cardano DeFi UX friction points from personal usage
- Experience with cross-channel marketing analytics and attribution in traditional business contexts

No existing code or product to show — this proposal is scoped as a build-and-operate engagement within PRIME.

### Field 8: Pitch Deck link
*[To be added — create a 5-8 slide deck covering: problem, solution, milestones, budget, team]*

### Field 9: Who are the first users, and how will other Cardano apps build on top of it?

**First users:**
- EVM-native DeFi users who have never interacted with Cardano (target: Ethereum, Base, Arbitrum users with $1K+ DeFi positions)
- Existing ADA holders who have never used Cardano DeFi (estimated ~90%+ of ADA holders)
- Users arriving through partner wallet and bridge integrations

**How other apps build on it:**
The acquisition engine is designed as an **infrastructure layer**, not a one-off campaign:
- Any PRIME-funded protocol can configure incentive campaigns through the engine
- On-chain attribution means protocols can verify which deposits came from which campaign
- Public dashboards give the entire ecosystem transparency into what's working
- Cross-chain distribution partnerships (wallets, bridges, ramps) become shared infrastructure
- Over time, the engine becomes the default distribution channel for new Cardano DeFi launches

### Field 10: Languages and tools your team has worked with
- Lucid / Mesh / Blaze (off-chain)
- None yet (for on-chain components — will partner with Cardano-native developers or hire)

### Field 11: Technical scope and integrations?

**Phase 1 (Months 1-3): Foundation**
- Campaign configuration dashboard for PRIME protocols
- On-chain attribution system: tracking deposits back to specific campaigns via referral codes / wallet tagging
- Basic reward distribution mechanism (manual initially, automated in Phase 2)
- Integration with 2-3 Cardano wallets (Lace, Eternl, Vespr) for referral tracking
- Public reporting dashboard showing campaign spend, attributed TVL, and cost per net-new user

**Phase 2 (Months 4-6): Scale**
- Automated reward distribution with Merkle-drop or similar mechanism
- Cross-chain attribution: tracking users from Ethereum/Base/Arbitrum through bridges to Cardano
- Partnership integrations: 2-3 bridge providers, 1-2 CEX/ramp partners
- API for protocols to query attribution data and trigger rewards programmatically

**Phase 3 (Months 7-12): Network Effects**
- Self-service campaign creation for any Cardano protocol (not just PRIME-funded)
- Advanced analytics: cohort retention, yield comparison, cross-protocol user journeys
- Integration with PRIME's incentive engine (if built separately) for unified campaign management

**Key integrations needed:**
- Cardano wallets (Lace, Eternl, Vespr) for referral tracking
- Bridge providers (Maya Protocol, potential EVM bridges) for cross-chain attribution
- PRIME-funded DEXs and lending markets for deposit tracking
- Blockfrost / Maestro / Koios for on-chain data

### Field 12: How will this grow TVL or on-chain activity on Cardano?

**Direct metrics:**
- **Month 3 target:** 1,000 net-new wallets with first DeFi interaction; $500K attributed TVL
- **Month 6 target:** 5,000 net-new wallets; $3M attributed TVL
- **Month 12 target:** 15,000 net-new wallets; $10M attributed TVL

**Methodology:**
- Net-new = wallet with no prior Cardano DeFi interaction (verified via on-chain history)
- Attributed TVL = deposits traceable to a specific campaign via referral code or wallet tagging
- Cost efficiency targets: <$50 per net-new wallet in Months 1-3, improving to <$20 by Month 12

**Indirect effects:**
- Reduces customer acquisition cost for all PRIME-funded protocols
- Creates reusable infrastructure so future protocols don't rebuild acquisition from scratch
- On-chain attribution data helps PRIME optimize incentive spend across its portfolio

**Reality check from audit:** The audit notes only $11.06M of absorption capacity before yields compress by half. This means acquisition must be targeted and measured — spray-and-pray marketing would waste PRIME's capital. The attribution system is designed exactly for this constraint.

### Field 13: Is there a token component?
No token planned. This is a service and infrastructure build, not a tokenized protocol. Revenue model:
- PRIME milestone funding for build phases
- Potential ongoing retainer from PRIME for campaign operations
- Future: modest SaaS fees for non-PRIME protocols using the infrastructure (not in Year 1 scope)

### Field 14: Company roadmap
**Months 1-3:** Build core attribution engine, run first 2-3 campaigns for PRIME protocols, prove net-new wallet acquisition at <$50/wallet

**Months 4-6:** Automate reward distribution, add cross-chain attribution, expand to 5+ protocols

**Months 7-12:** Open to broader Cardano ecosystem, optimize for <$20/wallet CAC, become default distribution layer for new Cardano DeFi launches

**Year 2+ (aspirational):** Transition to self-sustaining operation with protocol-paid campaign fees, potentially spinning out as independent entity

### Field 15: Time to mainnet
**3–6 months** (attribution dashboard and manual campaigns in Month 2-3; automated distribution in Month 4-6)

### Field 16: How much are you looking to raise for your project?
**$75,000** for 6-month build-and-operate engagement

Breakdown:
- $30K — Development (attribution system, dashboard, integrations)
- $20K — Operations (campaign management, partnership development, content)
- $15K — Incentive budget for first campaigns (deployed to users, not kept)
- $10K — Reserve / contingency

If Phase 1 hits milestones, request $60-80K for Months 7-12 expansion.

### Field 17: Funding to date
Self-funded to date. No external capital raised. Kochfoto photography business provides operational runway.

### Field 18: Team
**Jonah Koch — Lead / Operator**
- 10+ years operating Kochfoto, a client-service business with systematic acquisition, referral networks, and vendor partnerships
- Active Cardano governance participant (DRep, PactVote builder)
- Deep user of Cardano DeFi; understands UX friction from personal experience
- Experience with marketing analytics, attribution, and funnel optimization in traditional business

**[To be hired / partnered]** — Cardano on-chain developer for smart contract components (attribution tracking, reward distribution). Budget allocated in the $30K development line item. Will recruit from Cardano developer community or partner with existing PRIME-funded team.

**[To be hired / partnered]** — Frontend developer for dashboard. Can be sourced from broader web3 talent pool; Lucid/Mesh experience preferred.

### Field 20: Anything else, or other links?
- Deep familiarity with the Alpha Growth audit — every gap cited in this proposal is traceable to specific audit sections and scores
- Proposal designed as **build-and-operate**, not research — milestones tied to verifiable on-chain outcomes
- Open to structuring as equity-free grant, revenue-share, or milestone-based contract — flexible to PRIME's preferred model

---

## PART 2: COMMUNITY & ENGAGEMENT

### Field 1: RFP Category
**Community & engagement**

### Field 4: Project, one line
A content, education, and engagement program that converts Cardano's passive holder base into active DeFi participants — with measurable on-chain outcomes, not vanity metrics.

### Field 5: Why does Cardano need this, and why build it inside PRIME?

The Alpha Growth audit documents a **community-activity crisis** across multiple metrics:

- **Only 11,527 active addresses** (vs 100,738 on Sui, 537,223 on Ethereum)
- **$956/day in chain fees** (vs $1,935 on Sui, $196,846 on Ethereum)
- **63 protocols tracked** vs 1,968 on Ethereum — thin builder surface
- **DeFi TVL / Market Cap: ~1.0%** (vs 14.5% on Sui, 18.1% on Ethereum) — holders aren't using the products

The audit doesn't name "community & engagement" as a category, but the symptoms are everywhere: Cardano has **holders who don't participate**. The ecosystem has built infrastructure (63 protocols) but hasn't built the **onboarding layer** that teaches people how to use it.

PRIME needs this because:
- All PRIME-funded protocols will fail if users don't understand how to interact with them
- The audit identifies 12 categories with "material shortfall" — each new primitive (vaults, CL, ALM, curated lending) requires education before adoption
- Community is the **retention layer** that makes acquisition sustainable — bring users in, teach them, keep them active
- The $200M TVL target requires not just new wallets but **engaged, repeat users**

Building inside PRIME means the community program is **co-designed with the protocols that need users**. Content is specific to PRIME-funded products, not generic Cardano boosterism. Metrics tie directly to protocol usage, not social media impressions.

### Field 6: Where does the project stand with Cardano today?
**Brand new, starting from scratch for Cardano**

### Field 7: Show us what exists
This is a new build, but the operator has:
- Built and maintained client relationships at Kochfoto through consistent communication, education, and trust-building
- Experience creating content that converts (photography blog, vendor spotlights, client newsletters)
- Active participant in Cardano governance — understands the community's concerns, language, and knowledge gaps
- Personal experience onboarding non-technical friends to Cardano DeFi — knows where people get stuck

No existing community platform or content library to show — this proposal is scoped as a build-and-operate engagement.

### Field 8: Pitch Deck link
*[To be added — create a 5-8 slide deck covering: problem, solution, content calendar, milestones, budget, team]*

### Field 9: Who are the first users, and how will other Cardano apps build on top of it?

**First users:**
- Existing ADA holders who have never used DeFi (estimated 90%+ of holders)
- New Cardano users acquired through PRIME's user acquisition efforts
- Developers building on Cardano who need clear documentation and examples

**How other apps build on it:**
The community program produces **reusable content infrastructure**:
- Protocol explainers (video + written) that any PRIME-funded team can embed or link
- "First transaction" guides for each new primitive (vaults, CL, ALM, etc.)
- Community office hours where users can ask questions about any PRIME protocol
- User feedback loops — qualitative insights from community members fed back to protocol teams
- On-chain activity challenges (e.g., "Complete your first lending deposit, earn NFT badge") that drive usage of specific protocols

Over time, this becomes the **default onboarding experience** for Cardano DeFi — not just for PRIME, but for the broader ecosystem.

### Field 10: Languages and tools your team has worked with
- None yet (for on-chain components)
- Lucid / Mesh / Blaze (off-chain) — for any on-chain challenge/attribution mechanisms

### Field 11: Technical scope and integrations?

**Phase 1 (Months 1-3): Foundation**
- Content calendar: 2 explainers/week (video + blog) targeting PRIME-funded protocols
- "Cardano DeFi 101" series: wallet setup, first swap, first lending deposit, yield strategies
- Community hub: Discord/Discord-alternative with organized channels by protocol type
- Monthly live Q&A / office hours
- On-chain activity challenges with NFT badges (simple CIP-25 tokens)

**Phase 2 (Months 4-6): Scale**
- Protocol-specific deep-dives: architecture, risk, yield mechanics
- User-generated content program: community members creating tutorials
- Partnership with PRIME's user acquisition engine for coordinated onboarding
- Analytics: tracking content → wallet activation → protocol usage

**Phase 3 (Months 7-12): Institution**
- Self-sustaining community with active moderators and content contributors
- "DeFi University" curriculum: structured learning path from beginner to advanced
- Quarterly ecosystem report (leveraging Alpha Growth audit methodology)
- Integration with PRIME-funded protocols for in-app educational tooltips and guides

**Key integrations:**
- PRIME-funded protocols (for content accuracy and early access)
- Cardano wallets (for challenge verification)
- Blockfrost / Maestro (for on-chain challenge validation)

### Field 12: How will this grow TVL or on-chain activity on Cardano?

**Direct metrics:**
- **Month 3 target:** 500 wallets complete "first DeFi transaction" through program content; 1,000 active community members
- **Month 6 target:** 2,000 first-time DeFi users; 5,000 active community members; content-attributed TVL of $1M
- **Month 12 target:** 5,000 first-time DeFi users; 10,000 active community members; content-attributed TVL of $5M

**Attribution methodology:**
- Content-attributed = users who watched/read specific content, then completed target on-chain action within 7 days
- Tracked via UTM parameters → wallet connect → on-chain action correlation
- On-chain challenges verify participation directly (no attribution needed)

**Indirect effects:**
- Reduces support burden for PRIME-funded protocols (users educated before they interact)
- Increases retention — educated users are less likely to churn after first transaction
- Creates feedback loop: community insights help protocols improve UX and messaging
- Builds cultural foundation for Cardano DeFi — users who understand the ecosystem advocate for it

### Field 13: Is there a token component?
No token. Revenue model:
- PRIME milestone funding for program operations
- Potential ongoing retainer for community management
- Future: modest sponsorship from non-PRIME protocols for content/features (not in Year 1)

### Field 14: Company roadmap
**Months 1-3:** Launch content engine, build initial community, prove content → on-chain action attribution

**Months 4-6:** Scale content production, add user-generated content, integrate with PRIME acquisition engine

**Months 7-12:** Transition to self-sustaining community with contributor incentives, launch "DeFi University" curriculum

**Year 2+:** Independent community platform with protocol sponsorships, potential token-gated premium content (not in current scope)

### Field 15: Time to mainnet
**1–3 months** (content can launch immediately; community platform and on-chain challenges in Month 2-3)

### Field 16: How much are you looking to raise for your project?
**$60,000** for 6-month build-and-operate engagement

Breakdown:
- $25K — Content production (video, blog, design)
- $15K — Community operations (moderation, office hours, events)
- $10K — On-chain challenge infrastructure and NFT badges
- $10K — Reserve / contingency / contributor incentives

If Phase 1 hits milestones, request $40-50K for Months 7-12.

### Field 17: Funding to date
Self-funded to date. No external capital raised. Kochfoto photography business provides operational runway.

### Field 18: Team
**Jonah Koch — Lead / Content Strategy / Community Manager**
- 10+ years building relationships and trust through consistent communication (Kochfoto)
- Experience creating content that educates and converts (blog, newsletters, vendor spotlights)
- Active Cardano governance participant — knows the community's concerns and language
- Personal experience onboarding non-technical users to DeFi

**[To be hired / partnered]** — Video producer/editor for explainer content. Can be sourced from Kochfoto network or freelance.

**[To be hired / partnered]** — On-chain developer for challenge/badge infrastructure. Small scope; can be contracted per-project.

**[To be hired / partnered]** — Community moderators (part-time, Months 4-12 as community scales).

### Field 20: Anything else, or other links?
- Proposal acknowledges that "Community & Engagement" is not explicitly named in the Alpha Growth audit — but the symptoms (low active addresses, low fees, low DeFi participation) are documented extensively
- Program designed for **measurable on-chain outcomes**, not vanity metrics (impressions, followers)
- Content will be honest about risks and trade-offs — building long-term trust, not hype
- Open to structuring as equity-free grant, revenue-share, or milestone-based contract

---

## QUICK COMPARISON

| | User Acquisition | Community & Engagement |
|---|---|---|
| **Audit backing** | Strong — E1, score 28.8, explicit gaps listed | Weak — not in audit; symptoms only |
| **Difficulty** | Hard — technical build, partnerships needed | Medium — content + community ops |
| **Differentiation** | Strong — few can do this well | Weak — many "community managers" |
| **Budget ask** | $75K / 6 months | $60K / 6 months |
| **Time to value** | 3-6 months | 1-3 months |
| **Verifiable metrics** | Strong — on-chain attribution | Medium — content → action correlation |
| **Recommendation** | **Lead with this** | Consider if bandwidth allows |

---

## NEXT STEPS

1. Create pitch decks (5-8 slides each)
2. Review and adjust budgets if needed
3. Fill out Typeform — requires separate submissions for each category
4. Prepare for scoping call (Alpha Growth reviews on rolling basis)
