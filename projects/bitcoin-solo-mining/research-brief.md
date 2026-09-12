# Bitcoin Solo Mining Research Brief
## BitAxe + UmbrelOS + Public Pool

**Date:** 2026-08-23
**Objective:** Evaluate feasibility of migrating BitAxe from shared pool to self-hosted solo mining via UmbrelOS

---

## 1. Current Setup

| Component | Status |
|-----------|--------|
| Miner | BitAxe (model unknown — need to confirm Gamma/Supra/other) |
| Pool | public-pool.io (shared mining) |
| Miner IP | 192.168.1.162 (AxeOS web UI) |
| BTC Address | bc1qhpg94ysfk9jgf7kywpapmk694a7sl38rrmyuvd |
| Proposed Node | UmbrelOS on existing Linux machine |

---

## 2. BitAxe Hashrate Reality Check

First things first — **what model BitAxe do you have?** This determines everything.

| Model | Stock Hashrate | Power | Overclock Potential |
|-------|---------------|-------|---------------------|
| **Supra** (BM1368) | ~650 GH/s (0.65 TH/s) | ~12.5W | Limited |
| **Gamma** (BM1370) | ~1.0–1.2 TH/s | ~17-21W | ~1.8 TH/s @ 35W |
| **Hex** | ~3.6 TH/s (6x BM1366) | Higher | Varies |

**Current network difficulty:** ~127.5T (Aug 2026)

### Solo Mining Odds Calculator

| Your Hashrate | Daily Chance | Yearly Chance | Expected Time to Block |
|--------------|-------------|---------------|------------------------|
| 0.65 TH/s (Supra) | ~1 in 9,750,000 | ~1 in 26,700 | ~26,700 years |
| 1.2 TH/s (Gamma stock) | ~1 in 5,280,000 | ~1 in 14,460 | ~14,460 years |
| 1.8 TH/s (Gamma OC) | ~1 in 3,520,000 | ~1 in 9,640 | ~9,640 years |
| 100 TH/s (for reference) | ~1 in 63,371 | ~1 in 173 | ~173 years |

**Block reward if you hit:** 3.125 BTC + transaction fees (~$200K–$250K currently)

### Bottom Line on Odds

A BitAxe solo mining is a **lottery ticket, not a business model**. With a Gamma at 1.2 TH/s, you've got roughly a 1 in 14,000 chance per year. That means:
- Expected value is technically positive if you value the lottery aspect
- Most likely outcome: never hit a block
- But someone hits with less hashrate — it's genuinely random

**The real question:** Are you doing this for expected profit, or for the sovereignty of running your own node + the excitement of potentially hitting a block?

---

## 3. Infrastructure Requirements

### Hardware for UmbrelOS Node

UmbrelOS can run on Raspberry Pi or x86. You mentioned installing on an existing Linux machine.

**Minimum (from Umbrel docs):**
- CPU: Dual-core 64-bit Intel/AMD (quad-core+ recommended)
- RAM: 4GB (8GB+ strongly recommended)
- Storage: 32GB for OS, **1TB+ SSD for Bitcoin blockchain**

**Recommended for Bitcoin node:**
- RAM: 16GB+ (sync is RAM-bound; 4GB can stretch to weeks)
- Storage: 1TB NVMe SSD (blockchain is ~625GB as of Apr 2025, growing ~60–80GB/year)
- Network: Stable broadband, ideally ethernet

**Sync time:** 2–3 days with good hardware (NVMe + 16GB RAM), potentially weeks with spinning disk or low RAM.

### Your Current Machine

You mentioned `~/umbrel/` already exists. What's the hardware spec of this machine? Specifically:
- CPU cores?
- RAM?
- Storage type and free space?
- Is it headless or do you have display access?

This determines whether we can run UmbrelOS directly or need different hardware.

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR NETWORK                              │
│                                                                  │
│   ┌──────────────┐      ┌──────────────────────────────┐        │
│   │   BitAxe     │◄────►│     UmbrelOS Machine         │        │
│   │  192.168.1.162      │                              │        │
│   │              │      │  ┌────────────────────────┐  │        │
│   │  AxeOS UI    │      │  │   Bitcoin Core/Knots   │  │        │
│   │  (configure  │      │  │   - Full node          │  │        │
│   │   stratum)   │      │  │   - ~625GB blockchain  │  │        │
│   └──────────────┘      │  │   - 2-3 day sync       │  │        │
│                         │  └────────────────────────┘  │        │
│                         │                              │        │
│                         │  ┌────────────────────────┐  │        │
│                         │  │   Public Pool App      │  │        │
│                         │  │   - Stratum server     │  │        │
│                         │  │   - Local mining       │  │        │
│                         │  │   - Dashboard          │  │        │
│                         │  └────────────────────────┘  │        │
│                         └──────────────────────────────┘        │
│                                                                  │
│   Access via: umbrel.local (or IP) in browser                   │
└─────────────────────────────────────────────────────────────────┘
```

**Data flow:**
1. BitAxe connects via Stratum to Public Pool on Umbrel
2. Public Pool validates work against local Bitcoin node
3. If BitAxe finds a valid block hash → full 3.125 BTC + fees to your wallet
4. No pool fees, no sharing — but also no steady payouts

---

## 5. Software Stack

| Layer | Software | Source |
|-------|----------|--------|
| OS | UmbrelOS | [getumbrel/umbrel](https://github.com/getumbrel/umbrel) |
| Bitcoin Node | Bitcoin Core or Knots | Umbrel App Store |
| Mining Pool | Public Pool | Umbrel App Store / [benjamin-wilson/public-pool](https://github.com/benjamin-wilson/public-pool) |
| Miner Firmware | AxeOS (built-in) | BitAxe device |

**Public Pool specifics:**
- Open-source Stratum pool server
- Designed specifically for solo mining
- Provides local stratum URL + port after install
- Dashboard shows hashrate, shares, connection status

---

## 6. Setup Steps (High Level)

1. **Prepare hardware** — Verify machine meets requirements (RAM, storage, SSD)
2. **Install UmbrelOS** — Flash ISO or use install script on existing Linux
3. **Initial setup** — Boot, connect to network, access umbrel.local
4. **Install Bitcoin Core/Knots** — From Umbrel App Store
5. **Sync blockchain** — Wait 2-3 days (can run in background)
6. **Install Public Pool** — From Umbrel App Store
7. **Get Stratum credentials** — URL + port from Public Pool dashboard
8. **Configure BitAxe** — Point AxeOS to local stratum, omit `stratum+tcp://` prefix
9. **Verify** — Check Public Pool dashboard for incoming hashrate

---

## 7. Risks & Considerations

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Never find a block** | High (probabilistic) | Understand it's a lottery; don't rely on income |
| **Hardware cost** | Medium | Use existing hardware if possible |
| **Power cost** | Low-Medium | BitAxe is efficient (~12-35W), but 24/7 adds up |
| **Blockchain sync time** | Medium | 2-3 days of downtime/setup; plan ahead |
| **Storage growth** | Low | ~60-80GB/year; 1TB gives ~4-5 years headroom |
| **UmbrelOS on non-official hw** | Low | "Best effort" support; DIY path well-trodden though |
| **Node maintenance** | Low | Occasional updates, monitoring |

---

## 8. Economics Summary

Assuming BitAxe Gamma (1.2 TH/s, 21W):

| Metric | Value |
|--------|-------|
| Power draw | ~21W × 24h = 0.5 kWh/day |
| Power cost (@ $0.12/kWh) | ~$0.06/day = ~$22/year |
| Expected yearly return | ~$15 (3.125 BTC × 1/14,460 odds) |
| **Expected value** | Negative in dollar terms |
| **But if you hit...** | ~$200K–$250K lump sum |

**The economic case doesn't close on expected value.** The case for doing this is:
1. Sovereignty — you validate your own blocks
2. Learning — running a full node is valuable education
3. Lottery — nonzero chance of life-changing payout
4. Supporting the network — more nodes = more decentralization

---

## 9. Open Questions

Before writing a full spec, need to clarify:

1. **What BitAxe model do you have?** (Supra/Gamma/Hex/other?) — Determines hashrate and odds
2. **What hardware will run UmbrelOS?** Specs of existing machine vs. buying new (Raspberry Pi 5 / Umbrel Home)
3. **Primary motivation?** Profit expectation, sovereignty, learning, lottery, or some mix?
4. **Power cost in your area?** Affects the economics calc
5. **Comfort level with Linux/server admin?** Impacts whether we script everything or do manual setup

---

## 10. Recommended Next Steps

1. **Confirm hardware details** — BitAxe model + Umbrel host machine specs
2. **Decide on approach** — Fresh UmbrelOS install vs. existing Linux + Umbrel script
3. **Write detailed spec** — Step-by-step with commands, configs, verification steps
4. **Create automation skill** — For ongoing monitoring, updates, health checks
5. **Execute** — Install, sync, configure, verify

---

*Sources:*
- SoloSatoshi BitAxe + Umbrel guide: https://www.solosatoshi.com/how-to-solo-mine-bitcoin-with-bitaxe-using-umbrelos/
- UmbrelOS x86 install: https://github.com/getumbrel/umbrel/wiki/Install-umbrelOS-on-x86-systems
- Solo mining calculator: https://www.simplemining.io/solo-mining-calculator
- Bitcoin node hardware requirements: https://knowingbitcoin.com/bitcoin-node-hardware-requirements/
- BitAxe model comparison: https://d-central.tech/bitaxe-supra-vs-gamma-vs-hex-vs-gt/
