# Challenge Account (Probationary DRep Bond Savings)

## Overview

The **Challenge Account** is exclusively for **probationary DReps** — those in their 2-year unpaid participation period. It serves one purpose: **help probationary DReps earn their way toward the bond requirement** by successfully challenging compensated DReps for veracity violations.

## Who Qualifies

- DReps in their **2-year probationary period**
- Must maintain **>69% attendance** throughout
- Must be actively **voting and writing rationales** (not just challenging)

## Core Mechanic

```
Probationary DRep:
  ├─ Votes on proposals + writes rationales (>69% attendance)
  ├─ Challenges compensated DReps for veracity violations
  │     └─ Successful challenge → 35% of locked rationale reward
  ├─ Challenge earnings deposited into Challenge Account (locked)
  │
  └─ After 2 years + >69% attendance:
        └─ Challenge Account unlocks → used to purchase Bond Token
```

## Challenge Account Properties

| Property | Value |
|----------|-------|
| **Eligible users** | Probationary DReps only |
| **Source of funds** | Successful challenge rewards only |
| **Lock period** | Until probation completion (2 years minimum) |
| **Unlock condition** | 2 years elapsed + >69% attendance maintained |
| **Forfeiture** | If attendance drops below 69% during probation |
| **Use on unlock** | Purchase Bond Token (participation credential) |

## Bond Token

The **Bond Token** is the participation credential that makes a DRep eligible for compensation payments.

| Property | Value |
|----------|-------|
| **Cost** | >500 ADA |
| **Purchased with** | Challenge Account balance (after unlock) |
| **Function** | Eligibility token for compensation scheme |
| **Revocable** | Yes, for repeat offenders (see bond-revocation.md) |
| **If revoked** | Must re-enter 2-year probation, earn new Bond Token |

## Flow: Probationary DRep Journey

```
Day 0: Register as DRep
  ↓
Year 0–2 (Probation):
  • Vote on proposals + write rationales
  • Maintain >69% attendance
  • Challenge compensated DReps for veracity violations
  • Successful challenges → earnings locked in Challenge Account
  ↓
Year 2+ (If >69% attendance maintained):
  • Challenge Account unlocks
  • Use balance to purchase Bond Token (>500 ADA)
  • Bond Token activates → DRep now eligible for compensation
  ↓
Compensated DRep:
  • Receives $28/vote immediately
  • Receives $64/rationale (locked for challenge window, or standard path)
  • Subject to challenge by probationary DReps
  • Bond revocable for repeat offenses
```

## Why This Design

**Anti-wealth bias:** Probationary DReps don't need disposable income to afford the bond. They earn it through governance participation (both voting AND challenging).

**Proof of life:** Challenging requires paying attention to other DReps' rationales, not just casting votes. This proves the DRep is engaged with governance substance.

**Sybil resistance:** A single entity can't spin up 50 DReps and immediately harvest rewards. Each must serve 2 years probation and earn their bond through legitimate challenge activity.

**Virtuous cycle:** Probationary DReps police compensated DReps → compensated DReps maintain quality → governance improves for everyone.

## Challenge Reward Economics (Probationary DRep)

If a probationary DRep successfully challenges a compensated DRep:

```
From the locked $64 rationale payment:
  ├─ 35% → Probationary DRep's Challenge Account ($22.40)
  ├─ 65% → Treasury recapture ($41.60)
  └─ 0% → Compensated DRep receives nothing from locked portion
```

### Example: Probationary DRep Challenge Earnings

| Challenges/Year | Success Rate | Annual Challenge Earnings |
|-----------------|--------------|---------------------------|
| 20 challenges | 50% success | 10 × $22.40 = **$224** |
| 40 challenges | 50% success | 20 × $22.40 = **$448** |
| 60 challenges | 50% success | 30 × $22.40 = **$672** |

At 50% success rate and 40 challenges/year: **$448/year** → **$896 over 2 years** toward the 500+ ADA bond.

## Forfeiture Rules

If a probationary DRep drops below **69% attendance** at any point during the 2-year probation:

- Challenge Account **frozen**
- Probation **reset** (must start 2-year clock over)
- Previous challenge earnings **held** until successful probation completion
- If probation fails permanently (e.g., DRep retires), Challenge Account **forfeited to treasury**

## Comparison: With vs. Without Challenge Account

| | Without Challenge Account | With Challenge Account |
|---|---------------------------|------------------------|
| Probationary DRep income | $0 | Challenge earnings (locked) |
| Bond affordability | Must self-fund 500+ ADA | Earned through challenges |
| Barrier to entry | Wealth-based | Merit-based |
| Governance policing | Weak (no incentive) | Strong (earn while learning) |

## Key Distinction

**Challenge Account ≠ Compensation Account**

- **Challenge Account**: For probationary DReps only. Earned through challenges. Unlocks to purchase Bond Token.
- **Compensation**: For bonded DReps only. Received for voting + rationales. Subject to challenge window.

A DRep transitions from Challenge Account holder to compensated DRep. They don't hold both simultaneously.
