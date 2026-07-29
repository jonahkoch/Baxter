---
name: social-credibility-work
description: Work on the Social Credibility System project incrementally. Use when the user wants to make progress on the socialCredSystem project, work on the recovery contract, design CIP-25 metadata schemas, build batch minting, implement watchtower challenges, or resume work on any aspect of the non-repudiable social posts system. Triggers on phrases like "work on social cred", "resume social credibility", "continue the project", or any task related to hash chains, recovery mechanisms, CIP-25 NFT posts, or optimistic checkpoint recovery on Cardano.
---

# Social Credibility System — Work Skill

This skill helps you work on the Social Credibility System project incrementally, preserving context between sessions.

## Before You Start

1. **Read the action plan:** `projects/social-credibility-system/action-plan.md`
2. **Check the Current Session Log** at the bottom of the action plan
3. **Identify which phase** to work on (or resume)
4. **Load relevant references** (see below)

## Project Structure

```
projects/social-credibility-system/
├── action-plan.md          # Phases, status, session log
├── architecture.md         # Full system design
├── recovery.ak             # Recovery contract (create if not exists)
└── tests/                  # Aiken tests (create as needed)
```

## Reference Files

Load these based on what you're working on:

| Working On | Read |
|------------|------|
| Recovery contract | `references/recovery-contract.md` |
| Metadata schema | `references/metadata-schema.md` |
| Batch minting | `references/batch-minting.md` |
| Watchtower | `references/watchtower.md` |
| Economics | `references/economic-model.md` |

## Quick Reference

### Core Data Types (Recovery Contract)

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

### Economic Parameters (Defaults)

| Parameter | Default | Range |
|-----------|---------|-------|
| Recovery bond | 50 ADA | 50-100 ADA |
| Challenge reward | 80% of bond | — |
| Burn on challenge | 20% of bond | — |
| Challenge bond | 5 ADA | — |
| Challenge window | 7 days | 3-14 days |

### CIP-25 Post Metadata Template

```json
{
  "name": "Post #<sequence>",
  "image": "ipfs://<content_hash>",
  "mediaType": "text/markdown",
  "properties": {
    "author_stake_key": "stake1...",
    "content_hash": "sha256(full_content)",
    "ipfs_uri": "ipfs://Qm...",
    "prev_post_hash": "<hash_of_previous_post>",
    "sequence": <number>,
    "timestamp_slot": <slot_number>,
    "timestamp_utc": "ISO8601"
  }
}
```

## Session Workflow

1. **Resume:** Read action plan, check last session log
2. **Load context:** Read relevant reference file(s)
3. **Work:** Implement, design, or analyze
4. **Log:** Update the Current Session Log in action-plan.md
5. **Commit:** Save progress, note blockers for next time

## Phase Quick-Start

### Phase 1: Recovery Contract
- Start with datum/redeemer types
- Implement claim validation (bond locked, timer starts)
- Implement challenge validation (proof of later post)
- Implement complete (timeout expired, no challenge)

### Phase 2: Metadata Schema
- Define all required/optional fields
- Create JSON Schema files
- Generate example valid/invalid objects
- Test with Mesh/Lucid serialization

### Phase 3: Contract Tests
- Use Aiken's built-in test framework
- Test happy paths first
- Then edge cases (double spend, late challenge, etc.)

### Phase 4: Batch Minting
- Start with single mint to understand costs
- Build batch transaction with multiple mints
- Measure per-post cost savings

### Phase 5: Watchtower
- Build recovery claim monitor (Blockfrost/indexer)
- Implement chain cache for user histories
- Build challenge transaction

### Phase 6: Economics
- Model attack scenarios
- Calculate watchtower break-even
- Sensitivity analysis on parameters

### Phase 7: Integration
- End-to-end test on testnet
- Document operator and user guides
