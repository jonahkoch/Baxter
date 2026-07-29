# Watchtower Reference

## Purpose
Monitor recovery claims and challenge fraudulent ones for economic reward.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Cardano   │────▶│  Watchtower  │────▶│  Challenger │
│   Chain     │     │   Service    │     │   Wallet    │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Chain Cache │
                    │  (User Posts)│
                    └──────────────┘
```

## Components

### 1. Chain Monitor

Poll for new recovery claim transactions:

```javascript
// Using Blockfrost
const claims = await blockfrost.addressesTxs(recoveryScriptAddress);

for (const tx of claims) {
  const details = await blockfrost.txsUtxos(tx.tx_hash);
  const datum = parseRecoveryDatum(details);
  await processClaim(datum);
}
```

### 2. Local Chain Cache

Store user's post history for quick challenge proof lookup:

```javascript
interface ChainCache {
  [stakeKey: string]: {
    posts: Post[];
    headHash: string;
    headSequence: number;
    lastUpdated: number;
  }
}

interface Post {
  hash: string;
  sequence: number;
  timestamp: number;
  metadata: CIP25Metadata;
}
```

### 3. Challenge Detector

Check if claim is fraudulent:

```javascript
function detectFraudulentClaim(
  claim: RecoveryDatum,
  cache: ChainCache
): ChallengeProof | null {
  const userChain = cache[claim.stake_key];
  if (!userChain) return null;
  
  // Check if we have a later post
  const laterPost = userChain.posts.find(
    p => p.sequence > claim.claimed_sequence
  );
  
  if (laterPost) {
    return {
      later_post_hash: laterPost.hash,
      later_post_sequence: laterPost.sequence
    };
  }
  
  return null;
}
```

### 4. Challenge Builder

Construct challenge transaction:

```javascript
async function buildChallengeTx(
  claimUtxo: UTxO,
  proof: ChallengeProof,
  challengerAddress: string
): Promise<Tx> {
  return await lucid
    .newTx()
    .collectFrom([claimUtxo], Data.to({ Challenge: proof }))
    .payToAddress(challengerAddress, { 
      lovelace: BigInt(CLAIM_BOND * 0.8 * 1000000) 
    })
    .validTo(Date.now() + 600000)
    .complete();
}
```

## Economics

### Revenue
- Successful challenge: 80% of recovery bond
- Example: 50 ADA bond → 40 ADA reward

### Costs
- Infrastructure: ~$10-50/month (VPS, indexer)
- Transaction fees: ~0.20 ADA per challenge
- Opportunity cost: Capital locked in challenge bond

### Break-Even Analysis

| Bond Amount | Reward | Break-Even (challenges/month) |
|-------------|--------|------------------------------|
| 50 ADA | 40 ADA | 1 challenge every 2-3 months |
| 100 ADA | 80 ADA | 1 challenge every 4-6 months |

*Assumes $30/month infrastructure cost*

## Optimization Strategies

### 1. Selective Monitoring
- Focus on high-value accounts (celebrities, politicians)
- Ignore accounts with < 100 posts
- Monitor accounts with recent high-engagement posts

### 2. Collaborative Watchtowers
- Share chain cache via gossip protocol
- Split challenge rewards among participants
- Reduce redundant indexing

### 3. Priority Queue
- Challenge claims closer to deadline first
- Higher bond amounts = higher priority
- Batch challenges in single transaction

## Configuration

```yaml
watchtower:
  # Cardano connection
  network: "mainnet"  # or "preview", "preprod"
  blockfrost_key: "..."
  
  # Challenge parameters
  min_bond_amount: 50  # Only challenge if bond >= this
  challenge_window_hours: 168  # 7 days
  challenge_before_deadline_hours: 24  # Challenge with 24h buffer
  
  # Operational
  poll_interval_seconds: 60
  max_cache_size_mb: 1000
  
  # Wallet
  challenger_address: "addr1..."
  challenge_bond_utxo: "..."
```

## Security Considerations

1. **Front-running:** Use private mempool or limit order strategy
2. **False positives:** Verify proof thoroughly before challenging
3. **DoS:** Rate limit challenges to prevent spam
4. **Key security:** Hot wallet should only hold challenge bond + fees
