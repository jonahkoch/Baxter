---
name: cardano-expert
description: Cardano blockchain ecosystem expert for querying current state, historical data, and ecosystem information. Use when the user asks about Cardano blockchain data, governance, protocol parameters, tokens, NFTs, DeFi, or network statistics. Also use for DRep governance action assessment.
triggers:
  - "cardano"
  - "blockchain"
  - "epoch"
  - "stake pool"
  - "DRep"
  - "governance action"
  - "treasury proposal"
  - "vote"
  - "Blockfrost"
  - "Koios"
---

# Cardano Expert — Skill

## When to Use

- Current blockchain state (epoch, slot, latest block, protocol params)
- Address/UTXO lookups (balances, transaction history, staking status)
- Stake pool queries (delegation, performance, retirements, metadata)
- Governance data (DReps, proposals, voting state, constitution)
- Historical data (past epochs, blocks, transaction details)
- Token/NFT information (policy IDs, metadata, supply)
- Network statistics (transaction volume, fees, decentralization metrics)
- **DRep governance action assessment** (use dedicated rubric below)

## APIs Available

### Blockfrost (Primary)
- **Docs:** `references/blockfrost-api.md`
- **Best for:** General queries, address data, transactions, assets
- **Requires:** API key (`BLOCKFROST_API_KEY` env var)
- **Networks:** mainnet, preprod, preview

### Koios (Secondary)
- **Docs:** `references/koios-api.md`
- **Best for:** Pool data, governance, complex SQL-like queries
- **No API key required**
- **Networks:** mainnet, guild, preprod, preview

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
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/addresses/<address>" \
  -H "project_id: $BLOCKFROST_API_KEY"
```

### Transaction Details
```bash
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

# DRep rankings by live stake (outputs CSV)
python3 scripts/drep_rankings.py 210 dreps_top_210.csv
```

## Helper Scripts

Located in `knowledge-base/skills/cardano-expert/scripts/`:

- `scripts/query_address.sh <address>` — Address balance and UTXOs
- `scripts/query_tx.sh <tx_hash>` — Transaction details
- `scripts/query_pool.sh <pool_id>` — Pool information
- `scripts/current_epoch.sh` — Current epoch and network info
- `scripts/governance_status.sh` — Active proposals and voting
- `scripts/drep_rankings.py [count] [output_file]` — Top N DReps by live stake

## Error Handling

| Error | Meaning | Action |
|-------|---------|--------|
| 404 | Not found (invalid or not indexed) | Verify input, retry later |
| 403 | Invalid/missing API key | Check BLOCKFROST_API_KEY |
| 429 | Rate limit | Add delays, retry |
| 5xx | Server error | Retry or switch API |

## Best Practices

1. **Prefer Koios** for public data (no key, higher rate limits)
2. **Use Blockfrost** for address-specific queries
3. **Cache results** for expensive queries
4. **Paginate** large result sets
5. **Handle 404s gracefully** — not all data is indexed immediately

## Network Selection

Default to **mainnet** unless specified:
- Blockfrost: `cardano-mainnet`, `cardano-preprod`, `cardano-preview`
- Koios: `/api/v1/`, `/api/v1/preprod/`, `/api/v1/preview/`
