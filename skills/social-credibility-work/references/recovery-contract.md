# Recovery Contract Reference

## Purpose
Enable users to recover their post chain head if lost, using cryptoeconomic guarantees.

## Key Concepts

### Optimistic Recovery
- User submits recovery claim with bond
- Claim is accepted after challenge window if unchallenged
- Anyone can challenge with proof of fraud (later valid post)

### Hash Chain Verification
- Each post links to previous via `prev_post_hash`
- A valid challenge presents a post with:
  - Same author stake key
  - Higher sequence number than claimed head
  - Valid hash chain link

## Contract Specification

### Datum Fields

| Field | Type | Description |
|-------|------|-------------|
| stake_key | VerificationKeyHash | Author's stake key |
| claimed_head_hash | ByteArray | Hash of claimed latest post |
| claimed_sequence | Int | Sequence number of claimed head |
| bond_utxo | OutputReference | UTXO containing bond ADA |
| claim_time | Int | Slot number of claim submission |
| new_head_proposal | ByteArray | Content hash of proposed new post |

### Redeemers

#### Complete
**Purpose:** Finalize recovery after challenge window expires.

**Conditions:**
- Current slot > claim_time + CHALLENGE_WINDOW_SLOTS
- No valid challenge exists
- Bond returned to claimant

#### Challenge
**Purpose:** Invalidate fraudulent recovery claim.

**Inputs:**
- Proof of later valid post (sequence > claimed_sequence)
- Same stake key as claim
- Valid hash chain integrity

**Effects:**
- 80% of bond to challenger
- 20% of bond burned
- Recovery claim voided

#### Cancel
**Purpose:** Allow claimant to withdraw unchallenged claim early.

**Conditions:**
- Only callable by original claimant
- Bond returned (minus min fee)

## Aiken Implementation Notes

### Time Handling
- Use slots, not POSIX time for on-chain consistency
- CHALLENGE_WINDOW_SLOTS = 7 days worth of slots (~604800 slots)

### Bond Validation
- Minimum bond: 50 ADA (parameterized)
- Bond must be locked at claim UTXO
- Bond asset must be pure ADA (no other tokens)

### Challenge Proof Structure
```rust
type ChallengeProof {
  later_post_hash: ByteArray,
  later_post_sequence: Int,
  merkle_proof: Option<ByteArray>,  // If using Merkle trees
}
```

## Security Considerations

1. **Replay attacks:** Include unique nonce in datum
2. **Front-running:** Claimant shouldn't be able to cancel after seeing challenge tx in mempool
3. **Griefing:** Challenge bond prevents spam challenges
4. **Liveness:** Ensure challenge window is long enough for honest watchtowers to respond

## Gas Estimates

| Operation | Expected Cost (ADA) |
|-----------|---------------------|
| Claim submission | 0.15 - 0.30 |
| Complete (after window) | 0.15 - 0.25 |
| Challenge | 0.15 - 0.25 |
| Cancel | 0.15 - 0.25 |
