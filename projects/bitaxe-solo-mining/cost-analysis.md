# BitAxe Solo Mining — Cost & Expected Value Analysis

## Assumptions

| Parameter | Value | Notes |
|-----------|-------|-------|
| Bitcoin price | $78,000 | Current market (Aug 2026) |
| Network hashrate | 850 EH/s | Average recent |
| Block reward | 3.125 BTC + fees | Post-2024 halving |
| Avg fees per block | 0.2 BTC | Variable, conservative |
| Total block value | ~$260,000 | 3.325 BTC × $78k |
| Electricity cost | $0.13/kWh | US average (adjust for your rate) |
| Block time | 10 minutes | Bitcoin target |

---

## Hardware Costs

### Option A: Raspberry Pi 5 Kit (Recommended)

| Item | Cost |
|------|------|
| Raspberry Pi 5 (16 GB) | $120 |
| 2 TB NVMe SSD | $150 |
| NVMe HAT for Pi 5 | $25 |
| Heatsink + active cooler | $20 |
| Quality case | $30 |
| 5V 5A USB-C PSU | $15 |
| Small UPS | $60 |
| Cables, misc | $20 |
| **Subtotal** | **~$440** |

### Option B: Repurpose Existing Hardware

| Item | Cost |
|------|------|
| 2 TB SSD (if not already have) | ~$120 |
| **Subtotal** | **~$120** |

### Option C: Used Mini-PC / NUC

| Item | Cost |
|------|------|
| Used mini-PC (8GB+, 2TB SSD) | $200-400 |
| **Subtotal** | **~$300** |

---

## BitAxe Hardware (Your Existing Miner)

| Model | Hashrate | Power | Est. Cost (new) |
|-------|----------|-------|-----------------|
| BitAxe Ultra | ~500 GH/s | ~15W | ~$70 |
| BitAxe Supra | ~700 GH/s | ~18W | ~$85 |
| BitAxe Gamma | ~1.2 TH/s | ~25W | ~$98 |
| BitAxe Duo | ~2.4 TH/s | ~40W | ~$130 |

*(You already own yours — this is sunk cost)*

---

## Operating Costs

### Electricity

**BitAxe only:**
| Model | Power | Monthly cost (@$0.13/kWh) | Annual cost |
|-------|-------|---------------------------|-------------|
| Ultra (500 GH/s) | 15W | $1.40 | $17 |
| Supra (700 GH/s) | 18W | $1.69 | $20 |
| Gamma (1.2 TH/s) | 25W | $2.34 | $28 |
| Duo (2.4 TH/s) | 40W | $3.74 | $45 |

**Node only (Pi 5):**
- Power: ~8W idle, ~15W peak during IBD
- Monthly: ~$1.50
- Annual: ~$18

**Total system (Pi 5 + BitAxe):**
| Setup | Monthly | Annual |
|-------|---------|--------|
| Pi 5 + Ultra | $2.90 | $35 |
| Pi 5 + Gamma | $3.84 | $46 |
| Pi 5 + Duo | $5.24 | $63 |

**Total system (existing PC + BitAxe):**
| Setup | Monthly | Annual |
|-------|---------|--------|
| PC (~40W) + Ultra | $5.15 | $62 |
| PC (~40W) + Gamma | $6.09 | $73 |
| PC (~40W) + Duo | $7.49 | $90 |

---

## Expected Value (EV) Calculation

### Your Probability

```
Chance per block = Your hashrate / Network hashrate
```

| Model | Your Hashrate | Network | Chance per block | Blocks per year | Annual probability |
|-------|---------------|---------|------------------|-----------------|-------------------|
| Ultra | 500 GH/s | 850,000,000 TH/s = 850,000,000,000 GH/s | 1 in 1.7B | 52,560 | 1 in 32,340 |
| Supra | 700 GH/s | same | 1 in 1.2B | 52,560 | 1 in 23,100 |
| Gamma | 1.2 TH/s = 1,200 GH/s | same | 1 in 708M | 52,560 | 1 in 13,475 |
| Duo | 2.4 TH/s = 2,400 GH/s | same | 1 in 354M | 52,560 | 1 in 6,737 |

### Expected Time to Find a Block

| Model | Expected time (average) |
|-------|------------------------|
| Ultra | ~32,000 years |
| Supra | ~23,000 years |
| Gamma | ~13,500 years |
| Duo | ~6,700 years |

> "Expected time" is the statistical average. You could find one tomorrow. You could mine forever and never find one.

### Expected Value (Annual)

```
Annual EV = Block value × Annual probability
```

| Model | Annual EV | Annual cost (Pi 5) | Net EV |
|-------|-----------|-------------------|--------|
| Ultra | $260,000 / 32,340 = **$8.04** | $35 | **-$27** |
| Supra | $260,000 / 23,100 = **$11.26** | $37 | **-$26** |
| Gamma | $260,000 / 13,475 = **$19.29** | $46 | **-$27** |
| Duo | $260,000 / 6,737 = **$38.59** | $63 | **-$24** |

**Conclusion on EV:** As a pure financial investment, solo mining with a BitAxe is **negative EV** at typical electricity costs. You're paying ~$25-35/year for a lottery ticket with a ~$8-39 expected payout.

---

## Sensitivity Analysis

### Bitcoin Price Impact on EV

| BTC Price | Ultra EV/yr | Gamma EV/yr | Duo EV/yr |
|-----------|-------------|-------------|-----------|
| $40,000 | $4.12 | $9.89 | $19.79 |
| $78,000 | $8.04 | $19.29 | $38.59 |
| $150,000 | $15.46 | $37.10 | $74.21 |
| $300,000 | $30.92 | $74.21 | $148.42 |
| $500,000 | $51.54 | $123.68 | $247.36 |

### Electricity Cost Impact

| $/kWh | Ultra net/yr | Gamma net/yr | Duo net/yr |
|-------|--------------|--------------|------------|
| $0.08 | -$24 | -$22 | -$19 |
| $0.13 | -$27 | -$27 | -$24 |
| $0.20 | -$31 | -$33 | -$31 |
| $0.30 | -$37 | -$42 | -$42 |

---

## Comparison: Solo vs Pool Mining vs Self-Hosted Solo

| Metric | public-pool.io | Self-hosted Solo | Pooled Mining (e.g., Braiins) |
|--------|---------------|------------------|------------------------------|
| Odds | Same | Same | Same |
| Expected payout | Lottery ($260k or $0) | Lottery ($260k or $0) | Steady micro-payouts |
| Annual EV | Same math | Same math | Slightly negative (pool fee ~2%) |
| Fees | 0% | 0% | ~2% |
| Infrastructure cost | $0 | ~$440 one-time | $0 |
| Operating cost | BitAxe only | BitAxe + node | BitAxe only |
| Sovereignty | Trust pool | Full sovereignty | Trust pool |
| Learning value | Low | High | Low |
| Fun/ideology factor | Medium | High | Low |

---

## Break-Even Scenarios

### When does solo mining make financial sense?

**Scenario 1: BTC price moons**
- At $500k BTC: Duo EV = $247/yr, cost = $63/yr → **+$184/yr**
- But at that price, your BTC holdings dwarf mining returns

**Scenario 2: You already have hardware**
- If you have a Pi 5 or old PC already: sunk cost = $0
- You just pay electricity: ~$46-90/yr
- Still negative EV, but "cheaper lottery ticket"

**Scenario 3: Multiple BitAxes**
- 10× Gamma (12 TH/s): EV = $193/yr, cost = $100/yr → getting closer
- 50× Gamma (60 TH/s): EV = $965/yr, cost = $280/yr → **+$685/yr**

**Scenario 4: Free electricity**
- Solar excess, workplace, etc.
- Cost = hardware only
- Duo: $38.59 EV/yr, $440 hardware → **break-even in ~11 years**
- Still not compelling financially

---

## The Real Value Proposition

Solo mining with a BitAxe is **not a financial investment**. It's:

1. **A lottery ticket** — ~$30-60/yr for a 1-in-10,000 to 1-in-30,000 annual chance at $260k
2. **An education** — You learn Bitcoin mining, nodes, pools, networking
3. **Ideological support** — Decentralization, sovereignty, supporting the network
4. **Hedge against regret** — If BTC goes to $1M and you never mined, you'd wonder "what if"
5. **Fun** — There's something satisfying about your own machine hashing for the network

### Honest Verdict

| Goal | Recommendation |
|------|----------------|
| **Make money** | Don't. Buy BTC instead. |
| **Learn Bitcoin deeply** | Absolutely worth it. |
| **Support decentralization** | Worth it. |
| **Lottery + fun** | Worth it if $30-60/yr is "fun money." |
| **Serious mining operation** | Need industrial-scale hashrate. |

---

## Total Cost Summary (5-Year Horizon)

### Self-Hosted Solo (Pi 5 + BitAxe Gamma)

| Category | Cost |
|----------|------|
| Hardware (one-time) | $440 |
| Electricity (5 years) | $230 |
| **Total 5-year cost** | **$670** |
| **Expected value (5 years)** | **~$96** |
| **Net expected** | **-$574** |

### public-pool.io (Same BitAxe Gamma)

| Category | Cost |
|----------|------|
| Hardware (one-time) | $0 |
| Electricity (5 years) | $140 |
| **Total 5-year cost** | **$140** |
| **Expected value (5 years)** | **~$96** |
| **Net expected** | **-$44** |

**Self-hosting premium:** ~$530 over 5 years for sovereignty + learning.

---

## Appendix: Tools & References

- **Solo chance calculator:** https://solochance.org/
- **Solo mining calculator:** https://bennet.org/resources/solo-mining-calculator/
- **Hashrate tracker:** https://www.coinwarz.com/bitcoin-hashrate
- **Bitcoin difficulty:** https://newhedge.io/bitcoin/difficulty-estimator
- **Solo block tracker:** https://bennet.org/resources/solo-block-tracker/

---

*Analysis date: 2026-08-24*
*BTC price: $78,239*
*Network hashrate: ~850 EH/s*
