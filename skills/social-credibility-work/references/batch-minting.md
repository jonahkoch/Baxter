# Batch Minting Reference

## Overview
Mint multiple posts in a single transaction to reduce per-post costs.

## Cost Analysis

| Method | Posts/Tx | Cost/Post | Total Cost |
|--------|----------|-----------|------------|
| Single mint | 1 | ~0.30 ADA | 0.30 ADA |
| Batch (5) | 5 | ~0.08 ADA | 0.40 ADA |
| Batch (10) | 10 | ~0.05 ADA | 0.50 ADA |

*Costs estimated at 0.15 ADA base + 0.03 ADA per additional mint*

## Transaction Structure

### Single Post Mint

```javascript
// Using Lucid
const tx = await lucid
  .newTx()
  .mintAssets({
    [postUnit]: 1n
  })
  .attachMetadata(721, {
    [policyId]: {
      [postName]: postMetadata
    }
  })
  .validTo(Date.now() + 600000)
  .complete();
```

### Batch Mint (Multiple Posts)

```javascript
// Using Lucid
const tx = await lucid
  .newTx()
  .mintAssets(posts.reduce((acc, post) => {
    acc[post.unit] = 1n;
    return acc;
  }, {}))
  .attachMetadata(721, {
    [policyId]: posts.reduce((acc, post) => {
      acc[post.name] = post.metadata;
      return acc;
    }, {})
  })
  .validTo(Date.now() + 600000)
  .complete();
```

## Session Signing Flow

1. **Session Start**
   - User signs session nonce with wallet
   - Session valid for ~1 hour
   - Platform receives delegated signing capability

2. **Post Queuing**
   - User creates posts (saved locally)
   - Posts accumulate in queue
   - User sees "5 posts ready to publish"

3. **Batch Publication**
   - User clicks "Publish All"
   - Single wallet signature for entire batch
   - Transaction submitted to chain

4. **Session End**
   - Auto-expire after timeout
   - Or user manually ends session

## Gasless Submission (CIP-8)

User signs intent message instead of transaction:

```javascript
const intent = {
  action: "mint_posts",
  posts: [...],
  session_id: "...",
  nonce: randomBytes(32)
};

const signedIntent = await wallet.signData(
  address,
  toHex(JSON.stringify(intent))
);

// Platform submits transaction
```

## Implementation Considerations

### Sequence Number Management
- Client tracks next sequence locally
- Verify on-chain before minting (prevent gaps)
- Handle conflicts if multiple devices

### IPFS Pinning
- Batch pin content before transaction
- Unpin on transaction failure
- Consider pinning service queue limits

### Error Handling
- Partial batch failures (some posts mint, others don't)
- Retry logic with exponential backoff
- User notification of failures

## Policy Script

Use native script with time-lock for CIP-25:

```json
{
  "type": "all",
  "scripts": [
    {
      "type": "sig",
      "keyHash": "<author_key_hash>"
    },
    {
      "type": "before",
      "slot": <expiration_slot>
    }
  ]
}
```
