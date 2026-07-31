# DRep Compensation Reward Model

## Core Split

| Component | Amount | % of Total |
|-----------|--------|------------|
| Rationale reward | $64 | ~70% |
| Vote submission reward | $28 | ~30% |
| **Total per proposal** | **$92** | **100%** |

## Proposed Lock Structure

The **rationale portion (70%) is locked** for the challenge window. The vote portion (30%) is released immediately.

```
Per proposal ($92 total):
  ├─ $28 (30%) → Released to DRep immediately upon vote
  └─ $64 (70%) → Locked for challenge period
```

## Challenge Resolution

If a challenger successfully proves a veracity violation:

```
From the locked $64:
  ├─ 35% → Challenger reward ($22.40)
  ├─ 65% → Treasury recapture ($41.60)
  └─ 0% → DRep receives nothing from locked portion
```

If no successful challenge occurs after the challenge window:

```
From the locked $64:
  └─ 100% → Released to DRep ($64)
```

## DRep Net Outcomes

| Scenario | DRep Receives | Effective Loss from Violation |
|----------|--------------|-------------------------------|
| No challenge | $92 ($28 + $64) | — |
| Challenge fails | $92 ($28 + $64) | — |
| Challenge succeeds | $28 (vote only) | **$64** |

> Note: The $28 vote payment is always retained by the DRep. Bond revocation (for repeat offenders) is a separate penalty system layered on top.


## Challenger Economics

| Challenger Outcome | Reward |
|-------------------|--------|
| Successful challenge | $22.40 per proposal |
| Failed challenge | $0 |

## Annual Scenarios (160 proposals)

### DRep — Honest, No Challenges
- Total: $92 × 160 = **$14,720/year**

### DRep — Caught on 10% of Proposals
- Clean proposals: 144 × $92 = $13,248
- Challenged proposals: 16 × $28 = $448
- **Total: $13,696/year** (loss of $1,024)
- Challenge count: +16 (unless spread across 12 months, may not hit tier thresholds)

### DRep — Caught on 25% of Proposals
- Clean proposals: 120 × $92 = $11,040
- Challenged proposals: 40 × $28 = $1,120
- **Total: $12,160/year** (loss of $2,560)
- Challenge count: +40 → **bond revoked** (exceeds 4+ tier)

### Challenger — Catching 10% of a Single DRep's Proposals
- 16 successful challenges × $22.40 = **$358/year**

### Challenger — Catching 25% of a Single DRep's Proposals
- 40 successful challenges × $22.40 = **$896/year**

## Treasury Flow

| Scenario | Treasury Recapture per Challenge |
|----------|---------------------------------|
| Successful challenge | $41.60 |

If 10% of all compensated DRep votes are successfully challenged (e.g., 100 DReps × 160 proposals × 10% = 1,600 challenges):
- Treasury recapture: 1,600 × $41.60 = **$66,560/year**
- Challenger payouts: 1,600 × $22.40 = **$35,840/year**

This creates a **self-funding challenge ecosystem** — the treasury recoups nearly 2× what it pays challengers.

## Tuning Parameters

The 35% challenger share is a dial:

| Challenger % | Challenger Reward | Treasury Recapture | DRep Loss on Challenge |
|-------------|-------------------|-------------------|----------------------|
| 20% | $12.80 | $51.20 | $64 |
| 35% | $22.40 | $41.60 | $64 |
| 50% | $32.00 | $32.00 | $64 |
| 75% | $48.00 | $16.00 | $64 |

**Lower challenger %** = More treasury recapture, fewer challengers (weaker policing)
**Higher challenger %** = Less treasury recapture, more challengers (stronger policing)

The DRep loss is always $64 regardless of tuning — the split only affects who captures the remainder.

## Bond Revocation (Repeat Offenders)

See [bond-revocation.md](bond-revocation.md) for the graduated penalty system.

| Challenges (12-month rolling) | Penalty |
|------------------------------|---------|
| 1 | Warning (on-chain flag) |
| 2 | 3-month compensation suspension |
| 3 | 12-month compensation suspension |
| 4+ | **Bond revoked** — must re-enter 2-year probation |

This means a DRep caught on 25% of proposals in a single year not only loses $2,560 in rationale payments — they **lose their bond** and must start over.

## Challenge Account Alternative

DReps may opt into a **Challenge Account** — a long-term locked account that:
- Protects rationale payments from individual challenges
- Earns **treasury match-funding** (10-40% depending on balance)
- Serves as the DRep's participation bond
- Unlocks based on governance milestones (attendance, transparency, time)

See [challenge-account.md](challenge-account.md) for full mechanics.

## Comparison: Old vs. New Scheme

| | Old (70/30 vesting) | New (lock rationale) |
|---|---------------------|----------------------|
| Locked amount | $27.60 (30%) | $64.00 (70%) |
| DRep loss on challenge | $27.60 | **$64.00** |
| Challenger reward (50%/35%) | $13.80 | **$22.40** |
| Treasury recapture (50%/65%) | $13.80 | **$41.60** |
| Deterrent strength | Moderate | **Strong** |
| Treasury self-funding | Weak | **Strong** |
| Repeat offender penalty | None | **Bond revocation** |
| Long-term bonding option | None | **Challenge Account** |

The new scheme doubles the DRep's skin-in-the-game, nearly triples treasury recapture, adds bond revocation for systemic fraud, and introduces Challenge Accounts for committed participants.
