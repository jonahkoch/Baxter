# DRep Compensation Scheme — Session Continuity

## Last Updated
2026-07-31 04:11 CEST (this session)

## Status: DESIGN PHASE — Reward mechanics & challenge system iteration

## Decisions Made (Locked In)

### Reward Structure
- **$28** per vote — released immediately, never clawed back
- **$64** per rationale — locked for challenge window (~3 epochs / 15 days)
- Total per proposal: **$92**
- Rationale = 70% of reward, Vote = 30%

### Challenge Economics
- Successful challenge: 35% of locked $64 → challenger, 65% → treasury
- Challenger reward: **$22.40** per successful challenge
- Treasury recapture: **$41.60** per successful challenge
- DRep loss on successful challenge: **$64** (retains $28 vote payment)
- No bond required to challenge

### Challenge Account (Probationary DReps Only)
- For DReps in 2-year unpaid probationary period
- Must maintain >69% attendance
- Must vote + write rationales (not just challenge)
- Successful challenge earnings locked in Challenge Account
- Unlocks after 2 years + >69% attendance → used to purchase Bond Token
- Bond Token cost: **>500 ADA**
- Challenge Account forfeited if attendance drops below 69%

### Bond Revocation (Repeat Offenders)
- Rolling 12-month challenge count:
  - 1 = warning
  - 2 = 3-month suspension
  - 3 = 12-month suspension
  - 4+ = **bond revoked**, revert to probationary
- Revoked DRep must complete new 2-year probation + earn new bond

### Challenge Verification (v1)
- **Objective gates only** (fully automatable):
  1. Hash-IPFS mismatch
  2. IPFS URL 404/unresolvable
  3. Missing rationale reference in vote tx
  4. Wrong proposal ID referenced
- Challenge window: **3 epochs**
- Challenger submits evidence as part of challenge tx
- DRep cannot "fix" rationale after challenge — state at vote time stands

## Open Questions / Next Decisions

1. **Challenge Account match-funding** — You mentioned match-funding from treasury for positive behavior. What %? Is this on top of challenge earnings?
2. **Assessment threshold for challenges** — How do we define "pass/fail" when objective gates are inconclusive? Escalation path design?
3. **Challenge frequency limits** — Per-challenger rolling limits to prevent harassment?
4. **Who runs IPFS fetch verification** — Challenger submits proof, but who verifies the proof? Random sampling? Oracle network?
5. **Bond Token specifics** — Is it a CIP-25 NFT? CIP-68? Native token? What metadata?
6. **Probationary DRep challenge incentive balance** — Is 35% enough to motivate without making challenging dominant over learning?

## Files in This Directory

| File | Description |
|------|-------------|
| `reward-model.md` | Core reward split, challenge economics, treasury flow |
| `challenge-account.md` | Probationary DRep bond savings mechanics |
| `bond-revocation.md` | Graduated penalty system for repeat offenders |
| `challenge-verification.md` | Challenge lifecycle, objective/heuristic/subjective gates |
| `system-behavior-spec.md` | DApp behavior model: actors, state machines, time model, user flows |
| `CONTINUITY.md` | This file — session handoff state |

## Next Session — Pick Up Here

When resuming, read these in order:
1. `CONTINUITY.md` (this file)
2. `system-behavior-spec.md` for full behavioral model
3. Any files marked with open questions above
4. Decide which open question to resolve next

## Context

This design is for the **PactVote** governance dApp (https://pactvote.com), extending the DRep compensation scheme with veracity challenges and anti-wealth mechanisms.
