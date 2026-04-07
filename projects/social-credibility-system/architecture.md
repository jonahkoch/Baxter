# Social Credibility System — Architecture Document

**Date:** April 7, 2026  
**Status:** Design Phase  
**Goal:** Non-repudiable, immutable social posts using Cardano's native asset infrastructure with user-level hash chains and cryptoeconomic recovery mechanisms.

---

## Core Principles

1. **Non-repudiation** — Once posted, content cannot be disavowed
2. **Immutability** — No edits, no deletions, only chain-of-custody
3. **Meritocratic credibility** — Reputation built from verifiable history
4. **UX-optimized** — Session signing, batching, gasless submission where possible

---

## Tech Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Token Standard | CIP-25 (immutable NFT) | No smart contract needed for minting; true immutability |
| Mutable Pointers | CIP-68 (optional) | Head registry for indexing; posts themselves remain CIP-25 |
| Content Storage | IPFS (via Pinata/Web3.Storage) | Large content off-chain, hash on-chain |
| Recovery Contract | Aiken validator | On-chain timeout enforcement for checkpoint recovery |
| Wallet Integration | Mesh.js or Lucid | Clean React hooks, CIP-30 compatible |
| Backend | Node.js/Next.js + Blockfrost | Familiar DX, robust Cardano SDK |

---

## Information Flow

### Standard Post (CIP-25)

```json
{
  "name": "Post #12345",
  "image": "ipfs://Qm...",
  "mediaType": "text/markdown",
  "properties": {
    "author_stake_key": "stake1...",
    "content_hash": "sha256(full_content)",
    "ipfs_uri": "ipfs://Qm...",
    "prev_post_hash": "a1b2c3...",
    "sequence": 42,
    "timestamp_slot": 145678901,
    "timestamp_utc": "2026-04-07T21:28:00Z"
  }
}
```

### Threading (Replies)

```json
{
  "properties": {
    "author_stake_key": "stake1...",
    "content_hash": "sha256(reply_content)",
    "prev_post_hash": "user_own_previous_hash",
    "parent_post_hash": "post_being_replied_to",
    "thread_root_hash": "original_thread_post"
  }
}
```

---

## Hash Chain Structure

Each user's posts form a **linked list** via `prev_post_hash`:

```
Genesis → Post_1 (seq: 1) → Post_2 (seq: 2) → ... → Post_N (seq: N)
            ↓                    ↓                       ↓
        prev: genesis      prev: hash_1             prev: hash_N-1
```

**Properties:**
- **Sequence integrity** — Missing sequence number = deleted post
- **Tamper detection** — Altered history breaks hash chain
- **Fork detection** — Two posts claiming same `prev_post_hash` = split identity
- **Light verification** — Verify last N posts without full chain scan

---

## UX Optimizations (Security-Preserving)

### 1. Session Signing
- User signs once per session (~1 hour)
- Platform queues posts, submits batch with that signature
- Preserves: Single authorship attestation per session
- Removes: Wallet popup on every post

### 2. Gasless Submission
- Platform pays mint fees
- User signs structured CIP-8 message with intent
- Preserves: User cryptographic intent
- Removes: ADA management confusion

### 3. Batch Finalization
- Queue 5-10 posts, one signature, one transaction
- Cost drops to ~0.05 ADA/post
- UX: "Publish 5 posts" vs 5 separate interactions

### 4. Draft → Commit Flow
- Type post → Save locally (IndexedDB)
- User hits "Publish" → Single sign → On-chain in ~20s
- Nothing hits chain until explicit commit

---

## Recovery Mechanism (Optimistic Checkpoint)

### Problem
User loses their head hash → can't append to chain

### Solution
Cryptoeconomic checkpoint recovery with challenge period

### Flow

```
1. User submits recovery claim:
   - Claimed head: {sequence: N, hash: H}
   - Bond: 50 ADA
   - New head proposal: {sequence: N+1, content_hash: X}

2. Challenge window: 7 days
   - Anyone can challenge with proof of later valid post
   - Challenge bond: 5 ADA (prevents spam)

3. Resolution:
   - No challenge: Recovery valid, bond returned
   - Valid challenge: Claim rejected, 40 ADA to challenger, 10% burned
   - Invalid challenge: Challenger loses 5 ADA bond
```

### Aiken Contract Structure

```rust
// Datum
Type RecoveryDatum {
  stake_key: VerificationKeyHash,
  claimed_head_hash: ByteArray,
  claimed_sequence: Int,
  bond_utxo: OutputReference,
  claim_time: Int,
  new_head_proposal: ByteArray,
}

// Redeemers
type RecoveryAction {
  Complete      // After timeout, release bond
  Challenge     // Present proof of later valid post
  Cancel        // Claimant backs out
}
```

### Economic Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Recovery bond | 50-100 ADA | Expensive to lie, not catastrophic to lose |
| Challenge reward | 80% of bond | Strong incentive to watch |
| Burn on challenge | 20% of bond | Prevents challenger collusion |
| Challenge bond | 5 ADA | Prevents griefing |
| Window | 7 days | Enough time for verification |

---

## Cost Breakdown

| Action | Cost (ADA) |
|--------|-----------|
| Simple CIP-25 mint | ~0.17-0.35 |
| CIP-68 mint (ref script) | ~0.35-0.50 |
| Batch mint (5-10 posts) | ~0.05/post |
| Recovery submission | ~0.15-0.30 |
| Recovery completion/challenge | ~0.15-0.25 |
| IPFS pinning | Free tier covers most |

---

## Verification Flow

```python
def verify_user_chain(stake_key, latest_post):
    current = latest_post
    while current.prev_post_hash != "genesis":
        prev = query_chain(current.prev_post_hash)
        
        # Verify link integrity
        if hash(prev.content) != current.prev_post_hash:
            return False
        
        # Verify authorship
        if prev.author_stake_key != stake_key:
            return False
        
        current = prev
    
    return True
```

---

## Security Model

| Property | Mechanism |
|----------|-----------|
| Non-repudiation | Stake key attestation in immutable CIP-25 |
| Immutability | No update capability; new posts = new mints |
| Credibility | Verifiable chain of posts linked by hash |
| Recovery security | 1-of-N honest watchtowers (challenge incentives) |
| Sybil resistance | Minimum stake or DRep registration requirement |

---

## Open Questions

1. **Indexer design** — Platform-sponsored or challenge-reward incentivized?
2. **Multiple recoveries** — Lock stake key until resolution?
3. **Content size limits** — Pure IPFS vs inline for micro-posts?
4. **Thread depth** — Recursive query limits?

---

## Next Steps

- [ ] Draft full Aiken contract with test cases
- [ ] Design CIP-25 metadata schema (formal CIP?)
- [ ] Prototype batch minting flow
- [ ] Implement watchtower challenge client
- [ ] Economic simulation for bond/window parameters
