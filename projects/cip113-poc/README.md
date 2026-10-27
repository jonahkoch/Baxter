# CIP-113 Programmable Tokens POC

A minimal proof-of-concept demonstrating CIP-113 concepts for the PactVote token-gating system.

## What This Demonstrates

1. **Soul-Bound Tokens** — Once minted, a token can only be held by the original minting address. Any transfer attempt is rejected by the programmable transfer logic.

2. **Clawback Authority** — A designated issuer key can "seize" tokens back from any holder, demonstrating third-party programmable actions.

3. **Native Asset Compatibility** — Built on Cardano's native token standard, no hard fork required.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  User Wallet                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Mint Token   │  │ View Token   │  │ (Transfer fails) │  │
│  └──────┬───────┘  └──────────────┘  └──────────────────┘  │
└─────────┼───────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│  On-Chain Validators (Aiken)                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ issuance_mint.ak     — One-shot mint policy            │ │
│  │ transfer.ak          — Rejects all transfers           │ │
│  │ third_party.ak       — Clawback by issuer signature    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
cip113-poc/
├── onchain/              # Aiken smart contracts
│   ├── aiken.toml
│   ├── validators/
│   │   ├── issuance_mint.ak
│   │   ├── transfer.ak
│   │   └── third_party.ak
│   └── lib/
│       └── types.ak
├── frontend/             # Next.js + Mesh SDK
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── package.json
└── README.md
```

## Key Design Decisions

### Simplified vs Full CIP-113

| Aspect | Full CIP-113 | This POC |
|--------|-------------|----------|
| Custody | Shared script address + stake credentials | Direct script address |
| Registry | On-chain sorted linked list | Hardcoded in frontend |
| Upgrades | Protocol params + multisig | Fixed at deploy |
| Modules | Pluggable transfer logic | Fixed validators |
| Unfracking | Holder-driven restructuring | Not implemented |

This POC trades framework flexibility for clarity. The full framework would be needed for production.

## Quick Start

### 1. Build On-Chain Code

```bash
cd onchain
aiken build
```

### 2. Deploy (Preprod/Preview)

Use the deployment scripts in `frontend/src/lib/deploy.ts`

### 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## Integration with PactVote

The PACT token currently uses simple token-gating. This POC explores upgrading to programmable tokens where:
- Tokens are soul-bound to voter DRep IDs
- Governance authority can claw back tokens from inactive/abusive voters
- Transfer restrictions prevent vote-selling

## References

- [CIP-113 PR #444](https://github.com/cardano-foundation/CIPs/pull/444)
- [CF CIP-113 On-Chain](https://github.com/cardano-foundation/cip113-programmable-tokens)
- [CF CIP-113 Platform](https://github.com/cardano-foundation/cip113-programmable-tokens-platform)
- [Original CIP-143 (superseded)](https://cips.cardano.org/cip/CIP-0143)
