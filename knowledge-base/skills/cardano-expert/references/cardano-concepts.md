# Cardano Key Concepts

Reference for Cardano blockchain concepts, terminology, and mechanics.

## Network Basics

### Slot, Epoch, and Time

- **Slot**: The basic time unit (1 second in Cardano)
- **Epoch**: A group of slots (5 days = 432,000 slots)
- **K Parameter**: Determines number of stake pools (currently 500)

Current timing (as of Conway era):
- 1 slot = 1 second
- 1 epoch = 5 days
- 1 year = ~73 epochs

### Network Versions

| Era | Features | Date |
|-----|----------|------|
| Byron | Basic transfers | 2017 |
| Shelley | Staking, decentralization | 2020 |
| Allegra | Token locking (timelocks) | 2020 |
| Mary | Native tokens, multi-assets | 2021 |
| Alonzo | Smart contracts (Plutus) | 2021 |
| Babbage | Vasil hard fork, improvements | 2022 |
| Conway | Governance (CIP-1694) | 2024 |

## Addresses

### Address Types

| Type | Prefix | Purpose |
|------|--------|---------|
| Base address | `addr1` | Payment + staking combined |
| Enterprise address | `addr1` | Payment only (exchanges) |
| Reward/stake address | `stake1` | Receives staking rewards |
| Pointer address | `addr1` | References stake registration |
| Bootstrap address | `Ae2` | Byron-era legacy |

### Address Structure

A Cardano address contains:
- Payment credential (public key hash or script hash)
- Optional: Stake credential (for delegation)

Example base address breakdown:
```
addr1q9y6xv7...v79aqd
│    │
│    └── Bech32 encoded data
└────── Network tag (1 = mainnet, 0 = testnet)
```

## UTXO Model

Cardano uses the UTXO (Unspent Transaction Output) model:

### Key Concepts

- **UTXO**: An unspent output from a previous transaction
- **Transaction**: Consumes inputs (UTXOs) and creates new outputs
- **Balance**: Sum of all UTXOs at an address

### Example Flow

```
Transaction 1:
  Input:  None (coinbase/mining)
  Output: UTXO A = 100 ADA → Address X

Transaction 2:
  Input:  UTXO A (100 ADA)
  Output: UTXO B = 30 ADA → Address Y
          UTXO C = 69.5 ADA → Address X (change)
          Fee = 0.5 ADA
```

### Important Notes

- UTXOs must be spent entirely (no partial spending)
- Change is returned to a new UTXO
- Minimum UTXO value: ~1 ADA (prevents dust)
- Native tokens require ADA in same UTXO (min 1.3+ ADA)

## Staking & Delegation

### Stake Addresses

- Start with `stake1` (mainnet) or `stake_test` (testnet)
- Hold staking rewards (not regular ADA)
- Linked to base addresses for delegation

### Delegation Mechanics

1. Register stake address (deposit: 2 ADA)
2. Choose stake pool
3. Delegation becomes active at epoch boundary (+1 epoch)
4. Rewards calculated at epoch end
5. Rewards paid at next epoch start (+2 epochs from delegation)

### Stake Pool Parameters

| Metric | Description |
|--------|-------------|
| Pledge | Pool owner's committed stake |
| Margin | Pool's profit percentage (e.g., 2%) |
| Fixed cost | Minimum fee per epoch (e.g., 340 ADA) |
| Saturation | Point where rewards decrease (~70M ADA) |
| ROS/ROI | Return on stake (typically 3-5% annually) |

## Native Tokens & NFTs

### Policy IDs

- 56-character hex string
- Defines minting rules for assets
- Created from policy script hash

Example:
```
Policy ID: 5d28c...a2b3c
Asset name: MyToken (hex: 4d79546f6b656e)
Full asset ID: 5d28c...a2b3c4d79546f6b656e
```

### Token Types

| Type | Characteristics |
|------|-----------------|
| Fungible tokens | Divisible, interchangeable |
| NFTs | Quantity = 1, unique |
| Semi-fungible | Limited supply, same policy |

### Minting Policies

- **Time-locked**: Can only mint before/after slot
- **Multi-sig**: Requires multiple signatures
- **Single issuer**: Only specific key can mint
- **Open**: Anyone can mint

## Governance (Conway Era)

### Governance Actions

| Action | Description |
|--------|-------------|
| Parameter change | Update protocol parameters |
| Hard fork | Major network upgrade |
| Treasury withdrawal | Fund community projects |
| Constitution update | Change constitution |
| No-confidence | Remove constitutional committee |
| New committee | Elect new committee |
| Info action | Non-binding proposal |

### Voting Entities

| Entity | Power |
|--------|-------|
| DReps (Delegated Representatives) | Represent ADA holders |
| SPOs (Stake Pool Operators) | Represent pool stake |
| Constitutional Committee | Approve parameter changes |

### DRep Registration

- Deposit: 500 ADA (refundable)
- Can vote on all governance actions
- Delegators' stake counts toward voting power

### Voting Thresholds

| Action | DRep | SPO | Committee |
|--------|------|-----|-----------|
| Parameter change | >50% | >50% | Yes |
| Hard fork | >75% | >75% | Yes |
| Treasury | >50% | >50% | Yes |
| Constitution | >67% | >67% | Yes |

## Plutus & Smart Contracts

### Plutus Versions

| Version | Era | Features |
|---------|-----|----------|
| Plutus V1 | Alonzo | Basic contracts |
| Plutus V2 | Vasil | Reference inputs, inline datums |
| Plutus V3 | Conway | Governance, bitwise operations |

### Key Concepts

- **Datum**: Data attached to UTXO (like contract state)
- **Redeemer**: Data provided when spending (user input)
- **Script Context**: Information about the transaction
- **Validator Script**: Logic determining valid spend

## Fees

### Fee Calculation

Fees depend on:
- Transaction size (bytes)
- Script execution (if any)

Base formula:
```
fee = a + b × size
```

Where:
- `a` = 155,381 lovelace (constant)
- `b` = 44 lovelace/byte
- `size` = transaction size in bytes

### Typical Fees

| Transaction Type | Approximate Fee |
|-----------------|-----------------|
| Simple transfer | 0.17 ADA |
| Staking registration | 0.20 ADA |
| Token transfer | 0.25-0.50 ADA |
| Smart contract | 0.50-2+ ADA |

## Key Terms

| Term | Definition |
|------|------------|
| ADA | Cardano's native currency (1 ADA = 1,000,000 lovelace) |
| Lovelace | Smallest unit (0.000001 ADA) |
| CBOR | Binary encoding format for Cardano data |
| Bech32 | Human-readable address encoding |
| Ouroboros | Cardano's Proof-of-Stake protocol |
| Cardano Node | Software running the blockchain |
| DB-Sync | PostgreSQL index of blockchain data |
| CIP | Cardano Improvement Proposal |
