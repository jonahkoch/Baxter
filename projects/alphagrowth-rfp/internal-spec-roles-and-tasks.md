# Internal Spec: Roles, Tasks, and FTE Requirements

**Date:** 2026-09-19  
**Purpose:** Pragmatic internal planning for Alpha Growth PRIME proposals — translating pitch into executable tasks, required roles, and realistic FTE allocations.

**Constraint:** Single operator (Jonah Koch) with non-technical background + hired/contracted support. No existing team.

---

## PART 1: USER ACQUISITION & DISTRIBUTION

### Overview
Build and operate an on-chain attribution and incentive distribution engine for Cardano DeFi protocols. This is a **technical product with operational services layered on top**.

### Required Roles

| Role | Commitment | When Needed | Source |
|------|-----------|-------------|--------|
| **Product Lead / Operator** | 0.75 FTE | Month 1-12 | Jonah |
| **Cardano Smart Contract Developer** | 0.5-0.75 FTE | Month 1-6 | Hire/contract |
| **Frontend Developer** | 0.5 FTE | Month 1-4 | Hire/contract |
| **Full-Stack / DevOps Engineer** | 0.25 FTE | Month 2-6 | Hire/contract or Jonah learns |
| **Partnerships / BD** | 0.25 FTE | Month 2-6 | Jonah |
| **Campaign Manager** | 0.25 FTE | Month 3-12 | Jonah initially, then hire |

**Total core team:** 2.0-2.5 FTE at peak (Months 2-4), tapering to 1.5 FTE by Month 6.

### Task Breakdown by Phase

#### PHASE 1: Foundation (Months 1-3) — $30K Development + $20K Ops

**Technical Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 1.1 | Design attribution data model (wallet → campaign → on-chain action) | Smart Contract Dev + Jonah | 1 week | None |
| 1.2 | Build on-chain referral registry (validator script for tracking campaign-wallet mappings) | Smart Contract Dev | 3 weeks | 1.1 |
| 1.3 | Build campaign configuration API (create campaign, set rules, caps, eligibility) | Full-Stack Dev | 2 weeks | 1.1 |
| 1.4 | Build public reporting dashboard (campaign spend, attributed TVL, cost per user) | Frontend Dev | 3 weeks | 1.3 |
| 1.5 | Integrate with Blockfrost/Maestro/Koios for on-chain data queries | Full-Stack Dev | 1 week | 1.3 |
| 1.6 | Integrate with 2-3 Cardano wallets for referral code injection (Lace, Eternl, Vespr) | Smart Contract Dev + Frontend | 2 weeks | 1.2 |
| 1.7 | Deploy testnet, internal testing, bug fixes | All | 2 weeks | 1.6 |
| 1.8 | Mainnet deployment (attribution tracking only — rewards manual) | Smart Contract Dev | 1 week | 1.7 |

**Operational Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 1.9 | Design campaign playbook (eligibility rules, reward structures, anti-gaming) | Jonah | 1 week | None |
| 1.10 | Onboard first 2-3 PRIME protocols as pilot partners | Jonah | 2 weeks | None |
| 1.11 | Run first manual campaigns (track via dashboard, distribute rewards manually) | Jonah + Campaign Manager | 4 weeks | 1.8 |
| 1.12 | Document learnings, iterate on campaign design | Jonah | Ongoing | 1.11 |

**Phase 1 Critical Path:** 1.1 → 1.2 → 1.3 → 1.4 → 1.6 → 1.7 → 1.8 → 1.11

**Phase 1 Risk:** Smart contract developer availability. Cardano dev talent is thin. Start recruiting immediately.

---

#### PHASE 2: Scale (Months 4-6) — Development continues + $15K incentive budget

**Technical Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 2.1 | Build automated reward distribution (Merkle-drop or similar mechanism) | Smart Contract Dev | 3 weeks | 1.8 |
| 2.2 | Build cross-chain attribution bridge (track users from Ethereum/Base/Arbitrum) | Full-Stack Dev | 4 weeks | 2.1 |
| 2.3 | Build protocol API (query attribution data, trigger rewards programmatically) | Full-Stack Dev | 2 weeks | 2.1 |
| 2.4 | Integrate with 2-3 bridge providers for cross-chain tracking | Full-Stack Dev | 2 weeks | 2.2 |
| 2.5 | Security audit of smart contracts (if budget allows, or partner with PRIME-funded audit team) | External Auditor | 2 weeks | 2.1 |

**Operational Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 2.6 | Onboard 2-3 additional protocols | Jonah | 2 weeks | None |
| 2.7 | Negotiate wallet/bridge/CEX partnerships for distribution | Jonah | 4 weeks | None |
| 2.8 | Run automated campaigns (rewards distributed programmatically) | Campaign Manager | 6 weeks | 2.1 |
| 2.9 | Produce public case studies (Protocol X acquired Y users at $Z CAC) | Jonah | 2 weeks | 2.8 |

**Phase 2 Critical Path:** 2.1 → 2.2 → 2.4 → 2.8

**Phase 2 Risk:** Cross-chain attribution is technically hard. May need to scope down to "bridge partner referral codes" rather than full on-chain tracking.

---

#### PHASE 3: Network Effects (Months 7-12)

**Technical Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 3.1 | Build self-service campaign creation UI for any Cardano protocol | Frontend Dev | 4 weeks | 2.3 |
| 3.2 | Advanced analytics (cohort retention, cross-protocol user journeys) | Full-Stack Dev | 3 weeks | 3.1 |
| 3.3 | Integration with PRIME's incentive engine (if built separately) | Smart Contract Dev | 2 weeks | 3.1 |

**Operational Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 3.4 | Open to non-PRIME protocols (SaaS model) | Jonah | 4 weeks | 3.1 |
| 3.5 | Optimize campaigns based on 6 months of data | Campaign Manager | Ongoing | 2.8 |
| 3.6 | Transition to self-sustaining operation | Jonah | 4 weeks | 3.4 |

---

### Budget Allocation (Reality Check)

| Line Item | Proposed | Realistic Breakdown |
|-----------|----------|---------------------|
| **Development ($30K)** | | |
| Smart contract developer (3 months @ $8K/mo) | $24K | Contract rate for experienced Cardano dev |
| Frontend developer (2 months @ $3K/mo) | $6K | Junior/mid-level, part-time |
| **Operations ($20K)** | | |
| Jonah time allocation (6 months, 0.75 FTE) | $15K | Implicit — no separate salary |
| Campaign management tools, analytics subscriptions | $3K | Dune, Blockfrost paid tier, etc. |
| Travel/events for partnerships | $2K | conferences, meetups |
| **Incentive Budget ($15K)** | | |
| Deployed directly to users as rewards | $15K | Not kept by team |
| **Reserve ($10K)** | | |
| Buffer for scope creep, extra dev time, audit | $10K | ~15% contingency |

**Hidden costs not in budget:**
- Smart contract audit: $5-15K (if not covered by PRIME)
- Ongoing infrastructure (server, RPC node access): $200-500/mo
- Legal/entity formation if spinning out: $2-5K

---

### Hiring Plan

**Priority 1: Cardano Smart Contract Developer**
- **Where to look:** Cardano Developer Portal jobs, IOG Discord, Cardano Foundation forums, Catalyst-funded project alumni
- **Skills needed:** Aiken or Plutus, eUTxO model understanding, validator design
- **Engagement:** 3-month contract with extension option
- **Rate expectation:** $6-10K/month for senior; $4-6K for mid-level
- **Red flag:** Anyone who says "this is easy" — attribution on eUTxO is genuinely hard

**Priority 2: Frontend Developer**
- **Where to look:** Upwork, Toptal, local web3 meetups
- **Skills needed:** React/Next.js, blockchain wallet integration (Lucid/Mesh), data visualization
- **Engagement:** 2-month contract, part-time
- **Rate expectation:** $3-5K/month part-time

**Priority 3: Full-Stack/DevOps (can be deferred if Jonah learns)**
- **Skills needed:** Node.js/Python, API design, cloud deployment (AWS/Vercel), basic DevOps
- **Engagement:** Part-time, Month 2-6
- **Alternative:** Jonah learns enough to manage this (2-3 weeks of focused learning)

---

## PART 2: COMMUNITY & ENGAGEMENT

### Overview
Build and operate a content, education, and community engagement program for Cardano DeFi. This is **primarily an operational/content role with light technical support**.

### Required Roles

| Role | Commitment | When Needed | Source |
|------|-----------|-------------|--------|
| **Content Lead / Community Manager** | 0.5 FTE | Month 1-12 | Jonah |
| **Video Producer / Editor** | 0.25 FTE | Month 1-12 | Contract/freelance |
| **On-Chain Developer (challenges)** | 0.1 FTE | Month 2-3 | Contract |
| **Community Moderators** | 0.25 FTE | Month 4-12 | Hire part-time |
| **Graphic Designer** | 0.1 FTE | Month 1-6 | Contract/freelance |

**Total core team:** 1.0-1.2 FTE at peak.

### Task Breakdown by Phase

#### PHASE 1: Foundation (Months 1-3) — $25K Content + $15K Ops

**Content Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 1.1 | Define content strategy and calendar (2 explainers/week) | Jonah | 1 week | None |
| 1.2 | Produce "Cardano DeFi 101" series (6-8 videos + blog posts) | Jonah + Video Producer | 6 weeks | 1.1 |
| 1.3 | Produce protocol explainer content for first 3 PRIME-funded protocols | Jonah + Video Producer | 4 weeks | 1.1 |
| 1.4 | Design community hub (Discord/Discord-alternative structure, channels, roles) | Jonah | 1 week | None |
| 1.5 | Launch community hub, seed with initial members | Jonah | 2 weeks | 1.4 |
| 1.6 | Produce graphics, thumbnails, branding | Graphic Designer | Ongoing | 1.1 |

**Technical Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 1.7 | Design on-chain challenge mechanism (complete task → verify → mint NFT badge) | On-Chain Dev | 2 weeks | None |
| 1.8 | Build challenge smart contracts (CIP-25 NFT minting, task verification) | On-Chain Dev | 2 weeks | 1.7 |
| 1.9 | Integrate challenges with community hub (leaderboard, progress tracking) | On-Chain Dev | 1 week | 1.8 |
| 1.10 | Testnet deployment, bug fixes | On-Chain Dev | 1 week | 1.9 |

**Operational Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 1.11 | Host first monthly office hours / Q&A | Jonah | 1 week | 1.5 |
| 1.12 | Engage with PRIME protocol teams for content accuracy | Jonah | Ongoing | 1.3 |
| 1.13 | Track content → on-chain action attribution (UTM + wallet correlation) | Jonah | Ongoing | 1.1 |

**Phase 1 Critical Path:** 1.1 → 1.2 → 1.3 → 1.5 → 1.11

**Phase 1 Risk:** Video production quality. Jonah has content experience but video is different. Budget for a real editor.

---

#### PHASE 2: Scale (Months 4-6)

**Content Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 2.1 | Produce protocol deep-dives (architecture, risk, yield mechanics) | Jonah + Video Producer | 6 weeks | 1.3 |
| 2.2 | Launch user-generated content program (community tutorials, bounties) | Jonah | 2 weeks | 1.5 |
| 2.3 | Coordinate with PRIME user acquisition engine for onboarding flow | Jonah | 2 weeks | UA Phase 2 |
| 2.4 | Produce quarterly ecosystem report | Jonah + Analyst | 2 weeks | 1.13 |

**Technical Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 2.5 | Build analytics dashboard (content → wallet activation → protocol usage) | On-Chain Dev | 2 weeks | 1.9 |
| 2.6 | Expand challenge types (first LP, first borrow, first vault deposit) | On-Chain Dev | 2 weeks | 1.8 |

**Operational Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 2.7 | Hire and train community moderators | Jonah | 2 weeks | 1.5 |
| 2.8 | Scale office hours to bi-weekly | Jonah + Moderators | Ongoing | 2.7 |
| 2.9 | Manage contributor incentive payouts | Jonah | Ongoing | 2.2 |

---

#### PHASE 3: Institution (Months 7-12)

**Content Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 3.1 | Build "DeFi University" curriculum (structured learning path) | Jonah + Contributors | 8 weeks | 2.1 |
| 3.2 | Produce advanced content (yield strategies, risk management) | Jonah + Video Producer | 6 weeks | 3.1 |
| 3.3 | Integrate educational tooltips into PRIME-funded protocol UIs | On-Chain Dev | 3 weeks | 3.1 |

**Operational Tasks:**

| # | Task | Owner | Effort | Depends On |
|---|------|-------|--------|------------|
| 3.4 | Transition to self-sustaining community (moderator-led) | Jonah | 4 weeks | 2.7 |
| 3.5 | Explore sponsorship from non-PRIME protocols | Jonah | 4 weeks | 3.4 |

---

### Budget Allocation (Reality Check)

| Line Item | Proposed | Realistic Breakdown |
|-----------|----------|---------------------|
| **Content Production ($25K)** | | |
| Video producer/editor (6 months @ $3K/mo part-time) | $18K | Freelance rate |
| Graphic designer (6 months @ $1K/mo part-time) | $6K | Freelance rate |
| Equipment/software ( microphone, editing software) | $1K | One-time |
| **Community Operations ($15K)** | | |
| Jonah time allocation (6 months, 0.5 FTE) | $12K | Implicit |
| Community platform costs, tools | $2K | Discord Nitro, analytics bots |
| Event hosting, prizes | $1K | giveaways, incentives |
| **On-Chain Challenges ($10K)** | | |
| Smart contract developer (challenge contracts) | $6K | Small scope, part-time |
| NFT badge design and minting costs | $3K | CIP-25 minting fees |
| Leaderboard/integration development | $1K | Frontend work |
| **Reserve ($10K)** | | |
| Buffer for scope creep, extra content, contributor payouts | $10K | ~15% contingency |

**Hidden costs not in budget:**
- Transcription services for accessibility: $100-300/mo
- Music licensing for videos: $200-500/year
- Community moderation tools (bots, automations): $100-200/mo

---

### Hiring Plan

**Priority 1: Video Producer/Editor**
- **Where to look:** Kochfoto network (wedding videographers?), local freelancers, Fiverr/Upwork for remote
- **Skills needed:** Video editing (Premiere/Final Cut), motion graphics (After Effects), understanding of DeFi/crypto concepts
- **Engagement:** Ongoing retainer, part-time
- **Rate expectation:** $2-4K/month part-time
- **Alternative:** Learn basic editing + hire for polish only

**Priority 2: On-Chain Developer (challenges)**
- **Skills needed:** Aiken or Plutus, CIP-25 NFT minting, basic validator logic
- **Engagement:** Short contract (4-6 weeks), part-time
- **Rate expectation:** $4-6K for the full scope
- **Scope:** Very limited — minting NFTs on task completion is not complex

**Priority 3: Community Moderators**
- **Where to look:** Cardano community (Discord, Twitter), university students
- **Skills needed:** Crypto-native, good communicator, reliable
- **Engagement:** Part-time, Month 4+
- **Rate expectation:** $500-1K/month each

---

## PART 3: CROSS-CUTTING CONCERNS

### What Jonah Can Realistically Handle

**Strengths:**
- Product strategy and positioning
- Partner relationships and BD
- Content strategy and messaging
- Campaign design and optimization
- Community building and engagement
- Governance and ecosystem navigation

**Cannot handle (must hire):**
- Smart contract development
- Frontend/dashboard development
- DevOps and infrastructure
- Video production (beyond basic scripting)
- On-chain integrations

**Can learn (with 2-4 weeks investment):**
- Basic API integration and data querying
- Dashboard tools (Dune, Tableau)
- Low-code automation (Zapier, n8n)
- Basic video editing (CapCut, Descript)

### Critical Dependencies

| Dependency | Risk Level | Mitigation |
|------------|-----------|------------|
| Hiring Cardano smart contract dev | **HIGH** | Start recruiting immediately; reach out to Catalyst-funded project alumni; consider partnering with existing PRIME-funded dev team |
| Cross-chain attribution complexity | **HIGH** | Scope to "bridge partner referral codes" for Phase 1; full on-chain tracking in Phase 2+ |
| PRIME protocol cooperation | **MEDIUM** | Build relationships early; offer free pilot campaigns to prove value |
| Budget runway | **MEDIUM** | Kochfoto provides buffer; scope Phase 1 conservatively |
| Video production quality | **LOW** | Hire professional; don't DIY |

### Realistic Timeline Assessment

| Phase | Proposed | Realistic | Risk |
|-------|----------|-----------|------|
| UA Phase 1 (Months 1-3) | Attribution engine + first campaigns | Attribution engine yes; automated rewards no (manual only) | Hiring delay could push to Month 4 |
| UA Phase 2 (Months 4-6) | Automated rewards + cross-chain | Cross-chain likely scoped down; automated rewards yes | Smart contract complexity |
| Community Phase 1 (Months 1-3) | Content engine + challenges | Achievable; challenges may be simpler than planned | Video production bottleneck |
| Community Phase 2 (Months 4-6) | Protocol deep-dives + analytics | Achievable | Depends on UA integration |

### Recommendation: Start With Community, Parallel UA

**Rationale:**
1. Community requires less technical hiring (Jonah can start immediately)
2. Community generates visible momentum (content, followers, engagement) that helps with UA partnerships
3. UA technical hiring is the critical path — use Community Phase 1 to buy time for recruiting
4. Community insights (what users struggle with) directly inform UA campaign design

**Execution:**
- Month 1: Start Community content production immediately; begin UA developer recruiting
- Month 2: Community hub live, first content published; UA dev interviews and contracting
- Month 3: Community challenges live; UA attribution engine testnet deployment

---

## PART 4: DECISION MATRIX

### If PRIME Funds Both ($135K total)

**Recommended allocation:**
- Front-load Community (lower risk, faster visible results)
- Parallel-track UA technical hiring
- Accept that UA Phase 1 will be 80% manual, 20% automated

### If PRIME Funds Only One

**Choose Community if:**
- You want faster time-to-visible-results
- You're concerned about technical hiring delays
- You believe PRIME values "engagement" more than "acquisition infrastructure"

**Choose User Acquisition if:**
- You can secure a Cardano dev partner before submitting
- You believe PRIME values infrastructure more than content
- You're willing to accept higher execution risk for higher differentiation

### If PRIME Funds Neither

**Fall back:**
- Community content can be bootstrapped with minimal budget (Jonah's time + basic tools)
- Position as independent Cardano DeFi educator
- Use content as proof of work for future grant applications

---

## APPENDIX: JOB POSTING TEMPLATES

### Cardano Smart Contract Developer (Contract)

**Role:** Build on-chain attribution and reward distribution infrastructure for a PRIME-funded user acquisition platform.

**Responsibilities:**
- Design and implement validator scripts for campaign-wallet attribution tracking
- Build automated reward distribution mechanisms (Merkle-drops or similar)
- Integrate with Cardano wallets (Lace, Eternl, Vespr) for referral code injection
- Ensure security and efficiency of on-chain logic

**Requirements:**
- 2+ years Cardano development (Aiken or Plutus)
- Deep understanding of eUTxO model and validator design
- Experience with Lucid, Mesh, or Blaze for off-chain transaction building
- Familiarity with CIP standards (CIP-25, CIP-31, CIP-32)
- Bonus: Experience with DeFi protocols (lending, DEX, vaults)

**Engagement:** 3-month contract, full-time or near-full-time
**Rate:** $6-10K/month depending on experience
**Location:** Remote

### Video Producer/Editor (Freelance)

**Role:** Produce explainer videos for Cardano DeFi education content.

**Responsibilities:**
- Edit 2-4 short videos per month (5-15 min each)
- Create motion graphics, titles, and visual aids
- Manage audio cleanup and color correction
- Deliver in formats optimized for Twitter/X, YouTube, and blog embedding

**Requirements:**
- Portfolio of explainer or educational content
- Proficiency in Premiere Pro, Final Cut, or DaVinci Resolve
- Basic motion graphics (After Effects or similar)
- Interest in DeFi/crypto (or willingness to learn)

**Engagement:** Ongoing retainer, part-time
**Rate:** $2-4K/month
**Location:** Remote
