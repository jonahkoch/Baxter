# Koios API Reference

Open-source, community-hosted Cardano API. SQL-based queries, no API key required.

## Base URLs

| Network | URL |
|---------|-----|
| Mainnet | `https://api.koios.rest/api/v1` |
| Preprod | `https://preprod.koios.rest/api/v1` |
| Preview | `https://preview.koios.rest/api/v1` |
| Guild | `https://guild.koios.rest/api/v1` (test/dev) |

## Authentication

No API key required. Rate limits apply per IP.

## Core Endpoints

### Network / Tip

| Endpoint | Description |
|----------|-------------|
| `GET /tip` | Current blockchain tip (slot, hash, epoch) |
| `GET /genesis` | Genesis block parameters |
| `GET /totals` | Chain statistics by epoch |
| `GET /param_updates` | Protocol parameter updates history |

### Blocks

| Endpoint | Description |
|----------|-------------|
| `GET /blocks` | Block history |
| `POST /blocks` | Specific blocks by hash/height |
| `GET /block_info` | Detailed block information |
| `POST /block_info` | Multiple block details |
| `GET /block_txs` | Transactions in block |

### Transactions

| Endpoint | Description |
|----------|-------------|
| `GET /txs` | Transaction list (paginated) |
| `POST /tx_info` | Transaction details |
| `POST /tx_utxos` | Transaction inputs/outputs |
| `POST /tx_metadata` | Transaction metadata |
| `POST /tx_metalabels` | Metadata label usage |
| `POST /tx_status` | Transaction confirmation status |
| `POST /address_txs` | Transactions for address(es) |
| `POST /credential_txs` | Transactions for payment/stake credentials |
| `POST /asset_txs` | Transactions involving asset |

### Addresses

| Endpoint | Description |
|----------|-------------|
| `POST /address_info` | Address balance and UTXO count |
| `POST /address_utxos` | UTXOs at address(es) |
| `POST /address_assets` | Assets held by address(es) |
| `POST /credential_utxos` | UTXOs for credentials |

### Accounts (Staking)

| Endpoint | Description |
|----------|-------------|
| `POST /account_list` | List of registered stake accounts |
| `POST /account_info` | Stake account details |
| `POST /account_utxos` | Reward account UTXOs |
| `POST /account_addresses` | Addresses linked to stake key |
| `POST /account_assets` | Assets in reward account |
| `POST /account_history` | Delegation history per epoch |
| `POST /account_updates` | Registration/deregistration updates |
| `POST /account_rewards` | Reward history |
| `POST /account_withdrawals` | Withdrawal history |

### Stake Pools

| Endpoint | Description |
|----------|-------------|
| `GET /pool_list` | List of active pools |
| `POST /pool_info` | Pool details |
| `POST /pool_delegators` | Current delegators |
| `POST /pool_blocks` | Blocks minted by pool |
| `POST /pool_updates` | Pool registration updates |
| `POST /pool_relays` | Pool relay information |
| `POST /pool_metadata` | Pool metadata (off-chain) |
| `GET /native_script_list` | Native scripts (timelocks, etc.) |
| `GET /plutus_script_list` | Plutus scripts |
| `POST /script_redeemers` | Redeemers for scripts |

### Assets

| Endpoint | Description |
|----------|-------------|
| `GET /asset_list` | List of all native assets |
| `POST /asset_info` | Asset details |
| `POST /asset_summary` | Asset supply and transactions |
| `POST /asset_txs` | Transactions for asset |
| `POST /asset_addresses` | Addresses holding asset |
| `POST /asset_policy_info` | All assets under policy |
| `POST /policy_asset_addresses` | Addresses holding policy assets |
| `POST /policy_asset_list` | Assets under policy |
| `GET /fingerprint` | CIP-14 fingerprint for asset |

### Governance (Conway era)

| Endpoint | Description |
|----------|-------------|
| `GET /drep_list` | List of DReps |
| `POST /drep_info` | DRep details |
| `POST /drep_delegators` | Delegators to DRep |
| `POST /drep_votes` | Votes cast by DRep |
| `POST /drep_registration` | DRep registration history |
| `POST /drep_distr` | DRep voting power distribution |
| `GET /proposal_list` | List of governance proposals |
| `POST /proposal_voting_summary` | Voting summary for proposals |
| `POST /proposal_votes` | Votes on proposal |
| `POST /committee_info` | Constitutional committee info |
| `POST /committee_votes` | Committee votes |
| `GET /constitution` | Current constitution hash |

### Epoch

| Endpoint | Description |
|----------|-------------|
| `GET /epoch_info` | Epoch information |
| `GET /epoch_params` | Protocol params by epoch |
| `POST /epoch_info` | Specific epoch info |
| `POST /epoch_params` | Params for specific epochs |

## Query Parameters

| Param | Description | Default |
|-------|-------------|---------|
| `limit` | Items per page | 1000 |
| `offset` | Items to skip | 0 |
| `select` | Specific fields | all |
| `order` | Field to order by | - |

## POST Body Format

Most POST endpoints accept arrays:

```json
{
  "_addresses": ["addr1...", "addr1..."],
  "_epoch_no": 420
}
```

## Example Queries

```bash
# Current tip
curl -s "https://api.koios.rest/api/v1/tip" | jq .

# Pool list (top 10)
curl -s "https://api.koios.rest/api/v1/pool_list?limit=10" | jq .

# Specific pool info
curl -s -X POST "https://api.koios.rest/api/v1/pool_info" \
  -H "Content-Type: application/json" \
  -d '{"_pool_bech32_ids":["pool1..."]}' | jq .

# Address transactions
curl -s -X POST "https://api.koios.rest/api/v1/address_txs" \
  -H "Content-Type: application/json" \
  -d '{"_addresses":["addr1..."]}' | jq .

# Active proposals
curl -s "https://api.koios.rest/api/v1/proposal_list?state=active" | jq .

# DRep voting power
curl -s -X POST "https://api.koios.rest/api/v1/drep_info" \
  -H "Content-Type: application/json" \
  -d '{"_drep_ids":["drep1..."]}' | jq .
```

## Koios vs Blockfrost

| Feature | Koios | Blockfrost |
|---------|-------|------------|
| API Key | No | Yes |
| Query complexity | Higher (SQL-like) | Simpler |
| Pool data | Excellent | Good |
| Governance | Excellent | Good |
| Address queries | Good | Excellent |
| Historical data | Excellent | Good |
| Rate limits | Higher | Lower (free tier) |

## Tips

- Use `_address` filters for efficient queries
- Combine multiple addresses in single POST request
- Use `limit` and `offset` for pagination
- Koios excels at aggregate queries and pool/governance data
