# BitAxe Solo Mining — Research Summary

## Current Setup
- **Pool:** public-pool.io (shared solo pool)
- **Wallet:** bc1qhpg94ysfk9jgf7kywpapmk694a7sl38rrmyuvd
- **Worker:** ojonah
- **Status:** Actively mining on shared solo pool

## What "Running Your Own Node + Pool" Actually Means

### The Architecture Stack
```
┌─────────────────┐
│   BitAxe Miner  │  ← Your hardware (500 GH/s – 2.4 TH/s)
└────────┬────────┘
         │ Stratum protocol
         ▼
┌─────────────────┐
│  Solo Pool      │  ← public-pool or ckpool-solo (you run this)
│  (Stratum srv)  │
└────────┬────────┘
         │ RPC calls
         ▼
┌─────────────────┐
│  Bitcoin Core   │  ← Full node (needs full chain sync)
│  (or Knots)     │
└─────────────────┘
```

### Two Main Software Stacks

| Component | Option A: Public-Pool Stack | Option B: CKPool Stack |
|-----------|----------------------------|------------------------|
| **Node** | Bitcoin Core or Knots | Bitcoin Core or Knots |
| **Pool** | public-pool (NestJS/TS) | ckpool-solo (C) |
| **UI** | public-pool-ui | ckstats |
| **Extras** | — | mempool.space + Electrum Server |
| **Complexity** | Moderate | Higher |
| **Community** | BitAxe community standard | Bitcoin OG standard |

### Hardware Requirements
- **Minimum:** 8GB RAM, 2TB SSD, 64-bit CPU (Intel or ARM)
- **Recommended:** 16GB RAM, NVMe SSD, Raspberry Pi 5 or mini-PC
- **OS:** Ubuntu Server (headless) or Ubuntu Desktop
- **Sync time:** 1-7 days depending on connection + hardware

## Odds Reality Check

### Current Network Stats (Aug 2026)
- **Network hashrate:** ~900 EH/s = 900,000,000 TH/s
- **Block time:** ~10 minutes
- **Block reward:** ~3.125 BTC + fees

### Your Odds by BitAxe Model
| Model | Hashrate | Chance per block | Expected time to find |
|-------|----------|------------------|----------------------|
| Ultra | ~500 GH/s | 1 in 1.8 billion | ~34,000 years |
| Supra | ~700 GH/s | 1 in 1.3 billion | ~24,000 years |
| Gamma | ~1.2 TH/s | 1 in 750 million | ~14,000 years |
| Duo | ~2.4 TH/s | 1 in 375 million | ~7,000 years |

> These are *averages* — you could hit tomorrow, you could mine forever and never hit. It's a lottery ticket with provably fair odds.

### Does Self-Hosting Change Your Odds?
**No.** Running your own node vs using public-pool.io gives you the *exact same mathematical odds*. The difference is:

| Factor | public-pool.io | Self-hosted |
|--------|---------------|-------------|
| **Odds** | Same | Same |
| **Fees** | 0% (typical) | 0% |
| **Trust** | Trust pool operator | Trust no one |
| **Block reward custody** | Pool pays you | You control it directly |
| **Privacy** | Pool sees your hashrate | Fully private |
| **Infrastructure** | Zero | You run it all |
| **Learning curve** | Low | Moderate-High |

## Why Run Your Own?

1. **Sovereignty** — No trust in a third-party pool operator
2. **Privacy** — Your hashrate data stays local
3. **Learning** — Deep understanding of Bitcoin mining stack
4. **Ideological** — Supporting network decentralization directly
5. **Full control** — If you DO hit a block, the reward lands directly in your wallet with zero intermediary

## Decision Matrix

| Your Priority | Recommendation |
|--------------|----------------|
| **Maximize odds** | Buy more hashrate (more BitAxes or bigger miner) — self-hosting doesn't help odds |
| **Learning + sovereignty** | Self-host — great project, real skills gained |
| **Set-and-forget** | Stay on public-pool.io — it works, zero maintenance |
| **Test first** | Set up testnet node + pool — mine testnet BTC to prove it works before mainnet |

## Next Steps Options

### Path A: Research Deeper
- Which BitAxe model do you have? (hashrate matters for expectations)
- Cost analysis: hardware + electricity vs expected value
- Compare UmbrelOS "easy mode" vs manual Ubuntu setup

### Path B: Create a Skill
- I can build an OpenClaw skill that guides through setup step-by-step
- Covers: node sync, pool install, config, BitAxe pointing, monitoring

### Path C: Start Building
- Pick hardware (existing machine? buy Pi 5?)
- Set up testnet first to validate the whole stack
- Then migrate to mainnet

---
*Research compiled: 2026-08-24*
*Sources: public-pool GitHub, Solo Satoshi guides, SoloChance.org, ckpool documentation, Philip D'Ath's node setup guide*
