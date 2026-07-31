# PactVote DApp — System Behavior Specification

## 1. Actor Model

| Actor | Role | On-Chain Identity | Key Actions |
|-------|------|-------------------|-------------|
| **Probationary DRep** | Uncompensated participant | DRep registration active, no Bond Token | Vote, write rationale, challenge compensated DReps |
| **Compensated DRep** | Bonded, earning participant | DRep registration + Bond Token held | Vote, write rationale, subject to challenge |
| **Challenger** | Probationary DRep acting in challenge capacity | Same identity as Probationary DRep | Submit challenge with evidence |
| **Treasury** | System fund / protocol | Smart contract / multi-sig | Receive recapture, disburse payments, hold escrow |
| **Oracle/Verifier** | Objective gate checker | Off-chain service with on-chain attestations | Verify IPFS hashes, URL resolution, metadata validity |

---

## 2. State Machines

### 2.1 DRep Lifecycle State Machine

```
┌─────────────────┐
│   UNREGISTERED  │
└────────┬────────┘
         │ register as DRep
         ▼
┌──────────────────────────────┐
│      PROBATIONARY DRep       │
│  • 2-year clock starts       │
│  • Must vote + write rationale│
│  • Can challenge compensated  │
│  • Challenge Account accrues  │
└────────┬─────────────────────┘
         │ 2 years elapsed AND attendance >69%
         ▼
┌──────────────────────────────┐
│     CHALLENGE ACCOUNT        │
│        UNLOCKED              │
│  • Can purchase Bond Token   │
│  • Balance = challenge earnings│
└────────┬─────────────────────┘
         │ purchase Bond Token (>500 ADA)
         ▼
┌──────────────────────────────┐
│     COMPENSATED DRep         │
│  • Receives $28/vote         │
│  • Receives $64/rationale    │
│  • Subject to challenge      │
│  • Challenge count tracked   │
└────────┬─────────────────────┘
         │ 4+ successful challenges in 12 months
         ▼
┌──────────────────────────────┐
│      BOND REVOKED            │
│  • Compensation stops        │
│  • Locked funds forfeited    │
│  • Challenge Account frozen  │
│  • Must re-enter probation   │
└────────┬─────────────────────┘
         │ complete new 2-year probation
         ▼
     [back to PROBATIONARY]
```

### 2.2 Probationary DRep — Attendance Sub-State

```
┌──────────────┐     drop below 69%      ┌──────────────┐
│   ACTIVE     │ ──────────────────────► │  AT-RISK     │
│  (>69%)      │                         │  (<69%)      │
└──────────────┘ ◄────────────────────── └──────────────┘
         recover above 69% (within grace period)
         
AT-RISK consequences:
  • Challenge Account frozen
  • 2-year clock resets if not recovered within N epochs
  • Previous earnings held (not forfeited unless permanent failure)
```

### 2.3 Compensated DRep — Challenge Count Sub-State

```
Challenge Count (rolling 12-month window):

0 ──► 1 (WARNING) ──► 2 (3-MO SUSPENSION) ──► 3 (12-MO SUSPENSION) ──► 4+ (REVOKED)

Transitions:
  • Count increments on each successful challenge
  • Count decrements as challenges age out of 12-month window
  • Suspension: compensation payments paused, Bond Token retained
  • Revocation: Bond Token burned/returned, revert to probationary
```

### 2.4 Rationale Payment — Lock State Machine

```
┌─────────────────┐
│    PROPOSED     │ DRep writes rationale, submits vote tx
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  VOTE CONFIRMED │ $28 released to DRep immediately
│                 │ $64 locked for challenge window
└────────┬────────┘
         │ challenge window open (3 epochs)
         │
         ├──► NO CHALLENGE ──► $64 released to DRep
         │
         ├──► CHALLENGE FAILS ──► $64 released to DRep
         │
         └──► CHALLENGE SUCCEEDS ──► $64 split: 35% challenger, 65% treasury
                                      DRep challenge count +1
```

---

## 3. Time Model (Epoch-Based)

Cardano governance operates in **epochs** (~5 days). All protocol timing is epoch-aligned.

| Time Unit | Duration | Usage |
|-----------|----------|-------|
| Epoch | ~5 days | Base unit for all protocol timing |
| Challenge window | 3 epochs (~15 days) | Period during which rationale payment is locked and challengeable |
| Probation period | 2 years (~146 epochs) | Unpaid participation period before eligibility for compensation |
| Attendance window | Rolling (e.g., last 12 epochs / 60 days) | Used to calculate >69% attendance |
| Challenge count window | Rolling 12 months (~73 epochs) | Period over which successful challenges accumulate |
| Suspension period | 3 months (~18 epochs) or 12 months (~73 epochs) | Penalty duration |

### Epoch Timeline Example

```
Epoch  E0    E1    E2    E3    E4    E5    E6    E7    E8    E9
       │     │     │     │     │     │     │     │     │     │
Vote   [═══════════════════════════════════════════════════════]
              │           │           │
              ▼           ▼           ▼
       $28 released (immediately at E0)
       $64 locked ─────────────────────────► unlocks at E3 if no challenge
       
       Challenge can be submitted at any time E0–E2
       Challenge resolution by E3
```

---

## 4. Event Log

All significant actions are recorded as on-chain events. The event log is append-only and auditable.

| Event | Emitter | Data | On-Chain |
|-------|---------|------|----------|
| `DRepRegistered` | DRep | drep_id, registration_epoch | ✅ |
| `VoteSubmitted` | DRep | drep_id, proposal_id, vote, rationale_hash, rationale_url, tx_hash | ✅ |
| `VotePaymentReleased` | Treasury | drep_id, proposal_id, amount ($28), epoch | ✅ |
| `RationaleLocked` | Treasury | drep_id, proposal_id, amount ($64), lock_epoch, unlock_epoch | ✅ |
| `ChallengeSubmitted` | Challenger | challenger_id, challenged_id, proposal_id, vote_tx_hash, gate_claimed, evidence_cid, epoch | ✅ |
| `ChallengeVerified` | Oracle | challenge_tx_hash, gate_result, epoch | ✅ (oracle attestation) |
| `ChallengeSucceeded` | Treasury | challenge_tx_hash, challenger_reward, treasury_recapture, epoch | ✅ |
| `ChallengeFailed` | Treasury | challenge_tx_hash, rationale_released_to_drep, epoch | ✅ |
| `RationaleReleased` | Treasury | drep_id, proposal_id, amount ($64), epoch | ✅ |
| `ChallengeAccountCredited` | Treasury | probationary_drep_id, amount, epoch | ✅ |
| `ChallengeAccountUnlocked` | Treasury | drep_id, total_balance, epoch | ✅ |
| `BondTokenPurchased` | Treasury | drep_id, bond_token_id, cost_ada, epoch | ✅ |
| `ChallengeCountIncremented` | Protocol | drep_id, new_count, epoch | ✅ |
| `DRepSuspended` | Protocol | drep_id, suspension_type, start_epoch, end_epoch | ✅ |
| `BondRevoked` | Protocol | drep_id, revocation_epoch | ✅ |
| `BondReinstated` | Protocol | drep_id, new_bond_token_id, epoch | ✅ |
| `AttendanceUpdated` | Protocol | drep_id, attendance_rate, window_epochs | ✅ (periodic update) |

---

## 5. User Flows

### 5.1 Probationary DRep — Full Journey

```
Step 1: REGISTER
├─ Action: Register as DRep on Cardano (standard CIP-1694 registration)
├─ On-chain: DRep registration certificate submitted
├─ State: UNREGISTERED → PROBATIONARY
└─ Event: DRepRegistered

Step 2: PARTICIPATE (repeated for ~2 years)
├─ Action: Vote on governance proposals + write rationale
├─ Action: Submit vote transaction with rationale anchor (hash + URL)
├─ On-chain: VoteSubmitted event
└─ Note: No payment received yet

Step 3: CHALLENGE (optional, during probation)
├─ Action: Identify compensated DRep with veracity violation
├─ Action: Gather evidence (IPFS fetch, hash verification, etc.)
├─ Action: Submit challenge transaction with evidence
├─ On-chain: ChallengeSubmitted
├─ If successful:
│   ├─ ChallengeAccountCredited (35% of locked $64)
│   └─ Challenge earnings locked until probation complete
└─ If failed: No penalty, no reward

Step 4: COMPLETE PROBATION
├─ Condition: 2 years elapsed AND >69% attendance maintained
├─ On-chain: AttendanceUpdated (verified >69%)
├─ State: Challenge Account unlocks
├─ Event: ChallengeAccountUnlocked
└─ DRep can now purchase Bond Token

Step 5: PURCHASE BOND
├─ Condition: Challenge Account balance ≥ 500 ADA
├─ Action: Submit Bond Token purchase transaction
├─ On-chain: BondTokenPurchased
├─ State: PROBATIONARY → COMPENSATED
└─ DRep now eligible for vote + rationale payments

Alternative Step 5 (self-funded):
├─ If Challenge Account < 500 ADA, DRep can self-fund the difference
├─ Action: Submit ADA + Challenge Account balance → Bond Token
└─ Same state transition
```

### 5.2 Compensated DRep — Normal Operation

```
Step 1: VOTE + RATIONALE
├─ Action: Review proposal, form position, write rationale
├─ Action: Upload rationale to IPFS (or other persistent storage)
├─ Action: Submit vote transaction with:
│   ├─ Vote choice (YES/NO/ABSTAIN)
│   ├─ Rationale URL (IPFS CID or HTTPS)
│   ├─ Rationale hash (blake2b-256 of content)
│   └─ Proposal ID reference
├─ On-chain: VoteSubmitted
├─ Immediate: VotePaymentReleased ($28)
└─ Locked: RationaleLocked ($64 for 3 epochs)

Step 2: WAIT (challenge window)
├─ Duration: 3 epochs
├─ DRep monitors for challenges
├─ DRep CANNOT modify rationale after vote (state is immutable)
└─ DRep may submit dispute if challenged

Step 3a: NO CHALLENGE
├─ After 3 epochs: RationaleReleased ($64 to DRep)
├─ Total earned: $92

Step 3b: CHALLENGE FAILS
├─ Challenger submits challenge
├─ Oracle verifies: no objective violation found
├─ After verification: RationaleReleased ($64 to DRep)
├─ Total earned: $92

Step 3c: CHALLENGE SUCCEEDS
├─ Challenger submits challenge
├─ Oracle verifies: objective violation confirmed
├─ Result:
│   ├─ DRep receives: $28 only (rationale $64 lost)
│   ├─ Challenger receives: $22.40 (to Challenge Account if probationary)
│   ├─ Treasury recaptures: $41.60
│   └─ ChallengeCountIncremented
├─ Check challenge tier:
│   ├─ 1: Warning (on-chain flag)
│   ├─ 2: DRepSuspended (3 months)
│   ├─ 3: DRepSuspended (12 months)
│   └─ 4+: BondRevoked → revert to PROBATIONARY
```

### 5.3 Challenger — Full Challenge Flow

```
Step 1: IDENTIFY TARGET
├─ Monitor on-chain vote transactions from compensated DReps
├─ Fetch rationale content from claimed URL
├─ Verify hash matches content (Gate 1)
├─ Check URL resolves (Gate 2)
├─ Verify rationale reference exists in tx (Gate 3)
└─ Check proposal ID consistency (Gate 4)

Step 2: PREPARE EVIDENCE
├─ Fetch actual content from IPFS/URL
├─ Compute hash of fetched content
├─ Record fetch timestamp
├─ Package evidence:
│   ├─ Claimed hash (from vote tx metadata)
│   ├─ Computed hash (from fetched content)
│   ├─ Fetched content (or CID reference)
│   ├─ Fetch timestamp
│   └─ Gate violation description
└─ Upload evidence package to IPFS (or include inline)

Step 3: SUBMIT CHALLENGE
├─ Action: Submit challenge transaction
├─ Required data:
│   ├─ challenger_drep_id
│   ├─ challenged_drep_id
│   ├─ proposal_id
│   ├─ vote_tx_hash (the vote being challenged)
│   ├─ gate_claimed (which objective gate was violated)
│   ├─ evidence_cid (IPFS hash of evidence package)
│   └─ challenge_fee (minimal, to prevent spam — or 0?)
├─ On-chain: ChallengeSubmitted
└─ Challenge enters verification queue

Step 4: VERIFICATION
├─ Oracle network picks up ChallengeSubmitted event
├─ Oracle independently fetches evidence + vote tx
├─ Oracle reproduces gate check:
│   ├─ Fetch IPFS content from claimed CID
│   ├─ Compute hash
│   ├─ Compare to claimed hash
│   └─ Record result
├─ Oracle submits attestation on-chain
└─ On-chain: ChallengeVerified

Step 5: RESOLUTION
├─ If oracle confirms violation: ChallengeSucceeded
├─ If oracle refutes violation: ChallengeFailed
├─ If inconclusive (rare for v1): Escalation path (TBD)
└─ Payouts execute automatically per result
```

---

## 6. Cross-Actor Interaction Matrix

| | Probationary | Compensated | Challenger | Treasury | Oracle |
|---|:---:|:---:|:---:|:---:|:---:|
| **Probationary** | — | Challenges | Is same actor | Earns via challenges | Submits to |
| **Compensated** | Subject to challenge | — | Subject to | Receives payments | Verified by |
| **Challenger** | Is same actor | Challenges | — | Earns rewards | Submits evidence to |
| **Treasury** | Holds Challenge Account | Holds locked funds | Pays rewards | — | Funds oracles? |
| **Oracle** | Verifies challenges | Verifies against | Verifies evidence | Reports to | — |

---

## 7. Edge Cases & Failure Modes

| Scenario | Behavior |
|----------|----------|
| DRep votes without rationale URL | Gate 3 triggers automatic challenge eligibility |
| IPFS content is pinned but slow | Oracle retries with timeout; if unresolvable after N attempts → Gate 2 violation |
| DRep updates rationale after vote | Update is ignored; challenge evaluates state at vote time |
| Challenger submits frivolous challenge | No reward for failed challenges; time cost discourages spam |
| Oracle network disagrees | v1: Single oracle with reputation stake. v2: Multi-oracle consensus. |
| DRep attendance drops to 68% | Challenge Account frozen; probation clock resets if not recovered |
| DRep serves 2 years but attendance <69% | Challenge Account remains locked; DRep can extend probation or forfeit |
| Bond revoked DRep had Challenge Account from prior probation | Held in escrow; reactivates upon successful re-qualification |
| Treasury runs low on funds | Protocol parameter: reduce per-proposal amounts or extend challenge windows |
| Same rationale challenged twice | Not allowed — one challenge per (DRep, proposal) pair |

---

## 8. Protocol Parameters (Tunable)

| Parameter | Current Value | Description | Tune Impact |
|-----------|---------------|-------------|-------------|
| `PROBATION_MONTHS` | 24 | Probationary period duration | Higher = more Sybil resistance, lower = less accessible |
| `ATTENDANCE_THRESHOLD` | 69% | Minimum attendance to pass probation | Higher = better quality, lower = more inclusive |
| `CHALLENGE_WINDOW_EPOCHS` | 3 | Epochs rationale payment is locked | Higher = more challenge time, lower = faster payouts |
| `CHALLENGER_SHARE_BPS` | 3500 | Basis points to challenger (35%) | Higher = more policing, lower = more treasury recapture |
| `BOND_COST_ADA` | 500 | ADA required for Bond Token | Higher = more skin-in-game, lower = more accessible |
| `WARNING_THRESHOLD` | 1 | Challenges for warning | — |
| `SUSPENSION_SHORT_EPOCHS` | 18 | 3-month suspension duration | — |
| `SUSPENSION_LONG_EPOCHS` | 73 | 12-month suspension duration | — |
| `REVOCATION_THRESHOLD` | 4 | Challenges for bond revocation | — |
| `CHALLENGE_COUNT_WINDOW_EPOCHS` | 73 | Rolling window for challenge count (12 months) | — |

---

## 9. Invariants (Must Always Hold)

1. **Payment conservation**: For any proposal, total funds in = total funds out ($28 + $64 = $92 per DRep vote)
2. **Challenge conservation**: On successful challenge, $64 = challenger_reward + treasury_recapture (always 100%)
3. **Bond uniqueness**: A DRep can hold at most one active Bond Token at a time
4. **State exclusivity**: A DRep is either PROBATIONARY or COMPENSATED, never both
5. **Challenge uniqueness**: At most one challenge per (challenged_drep, proposal_id) pair
6. **Attendance monotonicity**: Attendance rate is calculated over a rolling window; cannot be retroactively altered
7. **Immutability**: Vote transactions, once confirmed, cannot be modified (rationale hash/URL is permanent)

---

## 10. Spec → Implementation Mapping

| Spec Component | Likely Implementation |
|----------------|----------------------|
| Bond Token | CIP-68 NFT (programmable, updatable metadata for challenge count) |
| Challenge Account | Smart contract escrow per probationary DRep |
| Locked rationale payments | Smart contract escrow per (DRep, proposal) |
| Oracle attestation | Off-chain service posting results to on-chain validator |
| Event log | On-chain transaction metadata + off-chain indexer |
| Attendance tracking | Off-chain indexer calculating from on-chain vote history |
| Challenge submission | Dedicated transaction type with structured metadata |

---

## Open Questions for Next Session

1. Should the oracle be a single trusted service or a decentralized network?
2. What happens to forfeited Challenge Account funds? Burn or treasury?
3. Do we need a "dispute" mechanism where challenged DReps can respond before resolution?
4. How is the oracle funded? Protocol fee? Treasury allocation?
5. Should there be a minimum challenge stake (even small) to prevent spam?
6. What is the exact CIP-100/108 metadata schema for rationale anchors?
