# On-Chain Validators

## Build

```bash
# Install Aiken first: https://aiken-lang.org/installation-instructions
aiken build
```

## Validators

| Validator | Purpose | Invocation |
|-----------|---------|------------|
| `issuance_mint.ak` | One-shot mint/burn policy | Mint redeemer |
| `transfer.ak` | Transfer logic — rejects all | Withdraw-0 |
| `third_party.ak` | Clawback by issuer | Withdraw-0 + signature |
| `custody.ak` | Shared holding address | Spend redeemer ("T" or "3") |

## Key Concept: Withdraw-0 Pattern

CIP-113 uses stake validators invoked via 0-ADA withdrawals. This means:
- No actual ADA is withdrawn
- The withdrawal is a zero-amount signal to invoke the validator
- This happens once per transaction, not per UTxO (gas efficient)

```
Transaction
├── Inputs: [programmable token UTxOs]
├── Outputs: [updated token UTxOs]
├── Mint: <zero>
├── Withdrawals: { Script(transfer_hash): 0 }  ← invokes transfer logic
└── Signatures: [holder_sig]
```

## Deploy Flow

1. **Generate issuer key pair** — save securely
2. **Pick a UTxO** — this becomes the one-shot mint reference
3. **Build validators** — `aiken build` generates plutus.json
4. **Apply parameters** — policy_id, issuer_vk, etc.
5. **Submit mint tx** — consume reference UTxO, mint tokens to custody script

See `../frontend/src/lib/deploy.ts` for off-chain transaction construction.
