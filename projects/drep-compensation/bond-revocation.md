# Bond (Participation Token) Revocation

## Overview

The bond (participation token) is the DRep's credential for receiving compensation. It is **revocable** for repeat offenders who accumulate successful challenges against their rationales.

## Challenge Accumulation

Each successful challenge against a DRep's rationale increments their **challenge count**. This count is tracked on a **rolling 12-month window**.

| Tier | Challenges in 12 Months | Penalty |
|------|------------------------|---------|
| Warning | 1 | None. On-chain flag only. |
| Suspension | 2 | Compensation **suspended for 3 months** |
| Extended suspension | 3 | Compensation **suspended for 12 months** |
| Revocation | 4+ | **Bond revoked**. DRep must re-enter probationary period. |

## Revocation Mechanics

When a bond is revoked:

1. **Compensation stops immediately** — no further vote or rationale payments
2. **Locked funds forfeited** — any rationale payments still in challenge windows are released to the treasury (not the DRep)
3. **Challenge reward account frozen** — any accumulated challenge earnings are held; if the DRep re-qualifies, they reactivate
4. **DRep status reverts to probationary** — must complete a new 2-year unpaid period with >69% attendance to re-qualify
5. **Challenge count resets** — upon successful re-qualification, the rolling challenge count resets to zero

## Re-Qualification After Revocation

A revoked DRep may re-enter the system:

- Must complete a **new 2-year probationary period** from the date of revocation
- Must maintain **>69% attendance** throughout
- Must **earn or post a new bond** (challenge rewards, self-funded, or delegated)
- Previous challenge earnings held in escrow **re-activate** upon successful re-qualification

## Why Vote Payment Is Always Retained

The $28 vote payment is never clawed back, even on successful challenge. This is intentional:

- **Separation of concerns** — vote and rationale are distinct actions; a bad rationale doesn't invalidate the vote itself
- **Minimum viable income** — ensures DReps aren't completely destabilized by a single erroneous challenge
- **Focus on rationale quality** — the $64 is the target because that's where the quality signal lives
- **Bond revocation handles repeat behavior** — systemic fraud is caught by the revocation mechanism, not per-vote clawback

## Bond Escalation Summary

```
DRep proposes rationale → Vote submitted
                ↓
        $28 released immediately
        $64 locked for challenge window
                ↓
        [Challenge window: N epochs]
                ↓
    ┌─────────────────┬─────────────────┐
    │ No challenge    │ Challenge       │
    │ or challenge    │ succeeds        │
    │ fails           │                 │
    └────────┬────────┴────────┬────────┘
             │                 │
        $64 released      $64 split:
        to DRep           - 35% → Challenger
                          - 65% → Treasury
             │                 │
             │           Challenge count +1
             │           (rolling 12-month)
             │                 │
             │           Check tier:
             │           1 = warning
             │           2 = 3-month suspension
             │           3 = 12-month suspension
             │           4+ = bond revoked
             │
        ┌────┴────┐
        │  NEXT   │
        │ PROPOSAL│
        └─────────┘
```

## Design Rationale

**Graduated penalties** give DReps room to improve. A single mistake (or a malicious challenge) doesn't end a DRep's career. But a pattern of low-quality rationales gets progressively punished until the DRep is either reformed or removed.

**Revocation > permanent ban** allows for redemption. The ecosystem benefits if a DRep learns from mistakes and re-qualifies with higher standards. The 2-year probation is a meaningful cost — enough to discourage gaming, not enough to be cruel.

**No bond required to challenge** keeps the barrier low for whistleblowers. The 35% reward provides incentive without requiring upfront capital. The graduated penalty system on DReps provides the spam protection that a challenger bond would otherwise provide.
