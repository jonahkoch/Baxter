---
name: cardano-expert
description: Cardano blockchain ecosystem expert for querying current state, historical data, and ecosystem information. Use when the user asks about Cardano blockchain data including current epoch/slot/block, address balances, transaction history, stake pools, governance (DReps, proposals, voting), protocol parameters, or any on-chain information. Also use for Cardano ecosystem questions about tokens, NFTs, DeFi protocols, or network statistics.
---

# Cardano Expert

Query the Cardano blockchain for current state, historical data, and ecosystem information.

## When to Use

- Current blockchain state (epoch, slot, latest block, protocol params)
- Address/UTXO lookups (balances, transaction history, staking status)
- Stake pool queries (delegation, performance, retirements, metadata)
- Governance data (DReps, proposals, voting state, constitution)
- Historical data (past epochs, blocks, transaction details)
- Token/NFT information (policy IDs, metadata, supply)
- Network statistics (transaction volume, fees, decentralization metrics)

## APIs Available

### Blockfrost (Primary)
- **Docs**: See [references/blockfrost-api.md](references/blockfrost-api.md)
- **Best for**: General queries, address data, transactions, assets
- **Requires**: API key (set via BLOCKFROST_API_KEY env var)
- **Networks**: mainnet, preprod, preview

### Koios (Secondary)
- **Docs**: See [references/koios-api.md](references/koios-api.md)
- **Best for**: Pool data, governance, complex SQL-like queries
- **No API key required** (community hosted)
- **Networks**: mainnet, guild, preprod, preview

## Quick Reference

### Current Network State
```bash
# Blockfrost - latest block
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/blocks/latest" \
  -H "project_id: $BLOCKFROST_API_KEY"

# Koios - current tip
curl -s "https://api.koios.rest/api/v1/tip"
```

### Address Balance
```bash
# Blockfrost
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/addresses/<address>" \
  -H "project_id: $BLOCKFROST_API_KEY"
```

### Transaction Details
```bash
# Blockfrost
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/txs/<tx_hash>" \
  -H "project_id: $BLOCKFROST_API_KEY"
```

### Stake Pools
```bash
# Koios - active pools
curl -s "https://api.koios.rest/api/v1/pool_list"

# Blockfrost - specific pool
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/pools/<pool_id>" \
  -H "project_id: $BLOCKFROST_API_KEY"
```

### Governance
```bash
# Koios - active proposals
curl -s "https://api.koios.rest/api/v1/proposal_list?state=active"

# Koios - DRep list
curl -s "https://api.koios.rest/api/v1/drep_list"
```

## Helper Scripts

Use scripts in `scripts/` for common operations:

- `scripts/query_address.sh <address>` - Address balance and UTXOs
- `scripts/query_tx.sh <tx_hash>` - Transaction details with inputs/outputs
- `scripts/query_pool.sh <pool_id>` - Pool information and delegation
- `scripts/current_epoch.sh` - Current epoch and network info
- `scripts/governance_status.sh` - Active proposals and voting

## Key Concepts

See [references/cardano-concepts.md](references/cardano-concepts.md) for:
- Address types (base, enterprise, reward/pointer)
- UTXO model explanation
- Epoch/slot timing
- Staking and delegation mechanics
- Governance framework (CIP-1694)
- Native tokens vs NFTs

## Working with Policy IDs

Policy IDs identify token/NFT collections:
- Format: 56-character hex string
- Query assets: `/api/v0/assets/{policy_id}` (Blockfrost)
- Query policy assets: `/api/v0/assets/policy/{policy_id}` (Blockfrost)

## Error Handling

Common API errors:
- `404` - Address/tx/pool not found (may be invalid or not yet indexed)
- `403` - Invalid or missing API key (Blockfrost)
- `429` - Rate limit hit (add delays between requests)
- `5xx` - Server error (retry or try alternate API)

## Best Practices

1. **Prefer Koios** for public data (no key needed, higher rate limits)
2. **Use Blockfrost** for address-specific queries and when you have a key
3. **Cache results** for expensive queries (use exec with caching)
4. **Paginate** large result sets (Blockfrost: `count`/`page` params)
5. **Handle 404s gracefully** - not all addresses/txs are indexed immediately

## Network Selection

Default to **mainnet** unless user specifies otherwise:
- Blockfrost: Change subdomain (`cardano-mainnet`, `cardano-preprod`, `cardano-preview`)
- Koios: Change path (`/api/v1/` vs `/api/v1/preprod/`, `/api/v1/preview/`)
