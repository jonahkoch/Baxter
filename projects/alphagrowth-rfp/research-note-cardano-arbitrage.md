# Research Note: Automated Arbitrage on Cardano — Evidence of Activity & Untapped Potential

**Date:** 2026-09-19  
**Purpose:** Supporting context for Alpha Growth PRIME RFP proposals — documenting that automated arbitrage IS possible and active on Cardano, while identifying the untapped potential relative to EVM chains.

---

## 1. The Premise: Arbitrage Is Possible on Cardano

Contrary to the common assumption that Cardano's eUTxO model prevents automated trading, evidence shows that arbitrage bots and automated trading infrastructure **do exist** and are **operationally active**.

### Key Evidence

#### A. Surge — Live Automated Trading Platform (Jan 2026)

**Surge** is a non-custodial automated trading platform for Cardano DEXs that launched on mainnet in January 2026. It explicitly supports arbitrage strategies:

> *"Surge enables the execution of sophisticated strategies previously difficult to deploy on Cardano: **Arbitrage: Facilitating cross-DEX arbitrage opportunities to capitalize on mispricings between different exchanges and pools**."*
> — Surge Documentation

**Supported strategies:**
- **Sequential arbitrage** — Buys a token, then sells it after the buy fills
- **Parallel arbitrage** — Buys and sells simultaneously using two strategy wallets
- **Grid trading** — Buys low and sells high repeatedly inside a price band
- **Rule-based** — Fires buys or sells when price reaches chart levels

**Supported DEXs:** Minswap, SundaeSwap, WingRiders, Splash

**Key insight:** Surge exists because cross-DEX price discrepancies are real and frequent enough to support an entire automated trading platform. If arbitrage weren't possible, Surge wouldn't have product-market fit.

---

#### B. Cross-DEX Price Discrepancies Are Real

A May 2026 Reddit post from the Cardano community explicitly documents the arbitrage opportunity:

> *"**The arbitrage opportunity on Cardano is real. The same token trades at different prices across Minswap, SundaeSwap, WingRiders, and CSWAP simultaneously.** These gaps open and close constantly. Manual traders miss them."*
> — r/cardano, May 2026

This confirms that:
- Price inefficiencies exist across Cardano DEXs
- The inefficiencies are persistent enough to create actionable opportunities
- Manual traders cannot capture them reliably — automation is required

---

#### C. Open-Source Arbitrage Bots Exist

Multiple GitHub repositories demonstrate active development of Cardano arbitrage infrastructure:

**1. Cardano DEX-CEX Arbitrage Bot (Flux-Point-Studios)**
- Open-source bot for maintaining price consistency between Cardano DEXs and **Gleec Exchange**
- Monitors price differences and executes trades automatically when profitable
- **Direct evidence of CEX-DEX arbitrage on Cardano**

**2. Cardano Trading Bot (pbwebdev)**
- EMA-band trading strategy using DEX aggregator (Minswap Aggregator)
- Implements risk management, stop-loss, portfolio % trades
- Demonstrates that automated market-making strategies are deployable

**3. DEX-CEX Arbitrage Bot (Virusold0607)**
- Configurable slippage, wait times, and minimum arbitrage percentage triggers
- Shows developer interest in building Cardano arbitrage tooling

---

#### D. DEX Aggregators Prove Price Fragmentation

**DexHunter** is a Cardano DEX aggregator that:
- Compares prices across **10+ DEXs** including Minswap, SundaeSwap, WingRiders
- Routes trades for optimal pricing
- Listed on the official Cardano.org app directory

**Why this matters:** Aggregators exist precisely because prices diverge across venues. If Cardano DEXs had perfectly efficient pricing, aggregators would be unnecessary. Their existence is indirect evidence of persistent arbitrage opportunities.

---

#### E. Arbitrage Monitoring Tools Exist

- **CryptoRank.io** maintains a live Cardano arbitrage opportunities page showing price differences across DEXs and CEXs
- **CoinArbitrageBot.com** tracks real-time ADA price discrepancies across 70+ exchanges
- **DEX Screener (Adastack)** shows live token prices across Minswap and SundaeSwap

---

## 2. The Gap: Cardano Arbitrage vs. EVM Arbitrage

### What Cardano HAS

| Capability | Evidence |
|-----------|----------|
| Cross-DEX arbitrage bots | Surge (live), open-source repos |
| CEX-DEX arbitrage | Gleec Exchange integration (Flux-Point bot) |
| Price monitoring | CryptoRank, CoinArbitrageBot, DEX Screener |
| DEX aggregation | DexHunter (10+ DEXs) |
| Automated strategies | Grid, DCA, rule-based (Surge) |

### What Cardano LACKS (vs. EVM)

| Missing | Impact |
|---------|--------|
| High-frequency mempool arbitrage | eUTxO prevents mempool-based front-running; opportunities are slower |
| Sandwich attack bots | Structurally impossible (deterministic ordering) |
| Flash loan arbitrage | No flash loan infrastructure comparable to Aave/Euler |
| Liquidation bots | Limited leverage/lending markets reduce opportunity |
| MEV extraction infrastructure | No Flashbots equivalent; no private mempool auction |

### The Net Effect

Cardano arbitrage exists but is **slower, more capital-intensive, and less competitive** than EVM arbitrage:

- **EVM:** Millisecond-level mempool races, flash loans, atomic composability → high frequency, low capital requirements
- **Cardano:** Block-level (or multi-block) strategies, require actual capital, no composable flash loans → lower frequency, higher capital requirements

This creates a paradox:
- **Healthy:** No predatory MEV, no sandwich attacks, no gas wars
- **Unhealthy:** Less price efficiency, wider spreads, thinner liquidity, lower organic volume

---

## 3. The Untapped Potential

### Why More Arbitrage Would Help Cardano

**1. Price Efficiency**
- Wider spreads across DEXs hurt traders who get worse execution
- Arbitrageurs narrow spreads, improving UX for everyone

**2. Volume and Fees**
- Arbitrage trades create genuine volume (not spam)
- Volume attracts more liquidity, creating a positive flywheel
- Fees from arbitrage trades accrue to LPs and protocols

**3. Liquidity Depth**
- Arbitrageurs provide implicit liquidity by bridging price gaps
- Their activity signals where liquidity is needed

**4. Metric Improvement**
- The Alpha Growth audit notes Cardano's low DEX volume ($16M/week)
- Some of this gap is due to inefficient pricing that arbitrage would address
- Note: This is "good" volume — genuine economic activity, not MEV spam

---

## 4. What's Needed to Unlock It

Based on the audit gaps and current infrastructure:

**1. Better Bridge Infrastructure (Audit Gap 2.1 — Score 41.3)**
- CEX-DEX arbitrage requires fast, reliable movement between Cardano and other chains
- Current bridging is limited to stablecoin issuer routes and general message-passing
- A general-purpose multi-asset bridge would unlock cross-chain arbitrage

**2. Concentrated Liquidity (Audit Gap 2.7 — Score 27.5)**
- Constant-product AMMs (all current Cardano DEXs) have wider spreads
- Concentrated liquidity would reduce arbitrage opportunity size but increase frequency
- More efficient pricing = more arbitrage volume at tighter margins

**3. Vault Standards (Audit Gap 2.5 — Score 36.3)**
- Arbitrageurs need capital efficiency — vaults that can deploy across venues
- No ERC-4626 equivalent means capital sits idle

**4. Lending Markets (Audit Gap 2.6 — Score 61.3)**
- Arbitrage requires leverage or at least capital deployment across protocols
- Current lending markets are small ($6.59M largest) and underutilized (1.0% utilization)

**5. Shared Executor / Scooper Standard (Audit Gap 2.4 — Score 55.0)**
- Every protocol builds its own batching agent
- A shared standard would reduce arbitrage execution complexity and cost

---

## 5. Sources

1. **Surge Documentation — "What Surge is"**  
   https://docs.surgecardano.com/getting-started/what-is-surge.md
   - Live automated trading platform with sequential and parallel arbitrage

2. **Surge — Rule-Based Strategies**  
   https://docs.surgecardano.com/strategies/rule-based.md
   - Multi-DEX quoting, price-level execution, cross-venue comparison

3. **r/cardano — "Surge is now live on Cardano mainnet"** (Jan 2026)  
   https://www.reddit.com/r/cardano/comments/1qhi7o0/
   - Mainnet launch confirmation, cross-DEX arbitrage coming Q1-Q2 2026

4. **r/cardano — "The arbitrage opportunity on Cardano is real"** (May 2026)  
   https://www.reddit.com/r/cardano/comments/1t0vt76/
   - Community documentation of persistent price discrepancies

5. **GitHub — Flux-Point-Studios/Cardano-DEX-CEX-Arbitrage-Bot**  
   https://github.com/Flux-Point-Studios/Cardano-DEX-CEX-Arbitrage-Bot
   - Open-source CEX-DEX arbitrage bot for Gleec Exchange

6. **GitHub — pbwebdev/cardano-trading-bot**  
   https://github.com/pbwebdev/cardano-trading-bot
   - EMA-band automated trading using Minswap Aggregator

7. **DexHunter — Cardano DEX Aggregator**  
   https://app.dexhunter.io/
   - Price comparison across 10+ DEXs

8. **CryptoRank.io — Cardano Arbitrage**  
   https://cryptorank.io/price/cardano/arbitrage
   - Live arbitrage opportunities across exchanges

---

## 6. Suggested Use in Proposals

This research can be integrated as:

**For User Acquisition:**
> "Cardano already has active arbitrage infrastructure — Surge (live since Jan 2026), open-source CEX-DEX bots, and DEX aggregators like DexHunter. Cross-DEX price discrepancies are documented by the community as 'real' and 'constant.' The opportunity isn't proving arbitrage is possible — it's scaling it. PRIME-funded infrastructure (bridges, concentrated liquidity, vault standards) would unlock significantly more arbitrage volume, which is healthy, non-predatory economic activity that improves price efficiency for all users."

**For Community:**
> "The Cardano community has already built automated trading tools — Surge's arbitrage strategies, open-source bots, and price monitoring platforms. These builders represent a technically sophisticated user base that can be engaged as early adopters and educators for PRIME-funded protocols. The untapped potential is bringing more capital and more traders into this existing infrastructure."

**Key framing:**
- Cardano arbitrage is **real, active, and documented** — not theoretical
- It's **healthier** than EVM arbitrage (no MEV spam, no sandwich attacks)
- It's **smaller** than it should be because of infrastructure gaps PRIME is designed to fix
- More arbitrage = better prices, more volume, deeper liquidity — all aligned with PRIME's goals
