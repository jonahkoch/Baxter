# Blockfrost API Reference

Cardano API service by Five Binaries. RESTful, well-documented, requires API key.

## Base URLs

| Network | URL |
|---------|-----|
| Mainnet | `https://cardano-mainnet.blockfrost.io/api/v0` |
| Preprod | `https://cardano-preprod.blockfrost.io/api/v0` |
| Preview | `https://cardano-preview.blockfrost.io/api/v0` |

## Authentication

Header: `project_id: your_api_key`

## Core Endpoints

### Network

| Endpoint | Description |
|----------|-------------|
| `GET /network` | Network information, supply, staking |
| `GET /epochs/latest` | Current epoch details |
| `GET /epochs/latest/parameters` | Protocol parameters (fees, max tx size, etc.) |
| `GET /blocks/latest` | Latest block details |
| `GET /blocks/{hash_or_number}` | Specific block |
| `GET /blocks/{hash}/txs` | Transactions in block |

### Addresses

| Endpoint | Description |
|----------|-------------|
| `GET /addresses/{address}` | Address details + UTXOs |
| `GET /addresses/{address}/extended` | Extended address info |
| `GET /addresses/{address}/txs` | Transaction history |
| `GET /addresses/{address}/utxos` | UTXOs at address |
| `GET /addresses/{address}/utxos/{asset}` | UTXOs containing specific asset |

### Transactions

| Endpoint | Description |
|----------|-------------|
| `GET /txs/{hash}` | Transaction details |
| `GET /txs/{hash}/utxos` | Transaction inputs/outputs |
| `GET /txs/{hash}/stakes` | Stake addresses involved |
| `GET /txs/{hash}/delegations` | Delegation certificates |
| `GET /txs/{hash}/pool_updates` | Pool registration/updates |
| `GET /txs/{hash}/pool_retires` | Pool retirements |
| `GET /txs/{hash}/metadata` | Transaction metadata |
| `GET /txs/{hash}/metadata/cbor` | Raw CBOR metadata |

### Accounts (Reward Addresses)

| Endpoint | Description |
|----------|-------------|
| `GET /accounts/{stake_address}` | Stake account details |
| `GET /accounts/{stake_address}/rewards` | Reward history |
| `GET /accounts/{stake_address}/history` | Delegation history |
| `GET /accounts/{stake_address}/delegations` | Current delegation |
| `GET /accounts/{stake_address}/withdrawals` | Withdrawal history |
| `GET /accounts/{stake_address}/mirs` | MIR (reserves/treasury) history |
| `GET /accounts/{stake_address}/addresses` | Associated addresses |
| `GET /accounts/{stake_address}/assets` | Assets held |

### Assets (Native Tokens & NFTs)

| Endpoint | Description |
|----------|-------------|
| `GET /assets` | List of assets (paginated) |
| `GET /assets/{asset}` | Asset details (policy_id+asset_name) |
| `GET /assets/{asset}/history` | Mint/burn history |
| `GET /assets/{asset}/txs` | Asset transactions |
| `GET /assets/{asset}/addresses` | Addresses holding asset |
| `GET /assets/policy/{policy_id}` | All assets under policy |

### Stake Pools

| Endpoint | Description |
|----------|-------------|
| `GET /pools` | List of pool IDs |
| `GET /pools/extended` | Pools with metadata |
| `GET /pools/retired` | Retired pools |
| `GET /pools/retiring` | Retiring pools |
| `GET /pools/{pool_id}` | Pool details |
| `GET /pools/{pool_id}/history` | Pool history per epoch |
| `GET /pools/{pool_id}/metadata` | Pool metadata (name, ticker, homepage) |
| `GET /pools/{pool_id}/relays` | Pool relay info |
| `GET /pools/{pool_id}/delegators` | Current delegators |
| `GET /pools/{pool_id}/blocks` | Blocks minted by pool |
| `GET /pools/{pool_id}/updates` | Pool registration updates |

### Governance (Conway era)

| Endpoint | Description |
|----------|-------------|
| `GET /governance/dreps` | List of DReps |
| `GET /governance/dreps/{drep_id}` | DRep details |
| `GET /governance/dreps/{drep_id}/metadata` | DRep metadata |
| `GET /governance/dreps/{drep_id}/updates` | DRep registration updates |
| `GET /governance/dreps/{drep_id}/voting_power` | DRep voting power history |
| `GET /governance/dreps/{drep_id}/votes` | DRep votes |
| `GET /governance/proposals` | Governance proposals |
| `GET /governance/proposals/{tx_hash}/{cert_index}` | Specific proposal |
| `GET /governance/proposals/{tx_hash}/{cert_index}/votes` | Votes on proposal |

## Query Parameters

| Param | Description | Default |
|-------|-------------|---------|
| `count` | Items per page | 100 |
| `page` | Page number | 1 |
| `order` | `asc` or `desc` | `asc` |
| `from` | Start slot/epoch | - |
| `to` | End slot/epoch | - |

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request |
| 403 | Invalid API key |
| 404 | Not found |
| 418 | IP blocked (auto-ban) |
| 429 | Rate limit exceeded |
| 500 | Server error |

## Rate Limits

| Plan | Requests/second | Daily requests |
|------|-----------------|----------------|
| Free | 10 | 50,000 |
| Starter | 100 | 500,000 |
| Pro | 500 | 5,000,000 |

## Example Queries

```bash
# Current protocol parameters
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest/parameters" \
  -H "project_id: $BLOCKFROST_API_KEY" | jq .

# Address balance and UTXOs
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1..." \
  -H "project_id: $BLOCKFROST_API_KEY" | jq .

# Transaction details with UTXOs
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/txs/{hash}/utxos" \
  -H "project_id: $BLOCKFROST_API_KEY" | jq .

# Pool metadata
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/pools/{pool_id}/metadata" \
  -H "project_id: $BLOCKFROST_API_KEY" | jq .

# Assets by policy ID
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/assets/policy/{policy_id}" \
  -H "project_id: $BLOCKFROST_API_KEY" | jq .
```
