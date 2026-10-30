# CIP-113 POC Architecture

## Goal

Demonstrate two key CIP-113 concepts for the PactVote token-gating system:
1. **Soul-bound tokens** — non-transferable once minted
2. **Issuer clawback** — designated authority can recover tokens

## Simplified vs Full CIP-113

### What We Skip (For Clarity)

| Component | Full CIP-113 | This POC | Rationale |
|-----------|-------------|----------|-----------|
| Registry | On-chain sorted linked list | Hardcoded | Registry adds ~500 LOC of linked-list logic |
| Custody Model | PLB + PLG dispatcher | Single custody script | Dispatcher pattern is elegant but complex |
| Upgrades | Protocol params + multisig | Fixed at deploy | One-shot is fine for a POC |
| Unfracking | Holder-driven restructuring | Not needed | Only relevant for multi-policy UTxOs |
| Modules | Pluggable rule sets | Fixed validators | We need exactly 2 rules: no-transfer + clawback |
| Stake Credentials | Ownership tracking | Payment key hash | Simpler for demo purposes |

### What We Keep

- ✅ Withdraw-0 pattern (gas-efficient validator invocation)
- ✅ One-shot mint policy (immutable supply after initial mint)
- ✅ Datum-based ownership tracking
- ✅ Signature-based authorization for privileged actions

## Validator Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  User       │────▶│  custody.ak  │────▶│  transfer.ak    │
│  Wants to   │     │  (spend)     │     │  (withdraw-0)   │
│  transfer   │     │  Redeemer:   │     │  Always FAILS   │
│             │     │  "T"         │     │                 │
└─────────────┘     └──────────────┘     └─────────────────┘
       │
       │             ┌──────────────┐     ┌─────────────────┐
       └────────────▶│  custody.ak  │────▶│  third_party.ak │
         Issuer      │  (spend)     │     │  (withdraw-0)   │
         clawback    │  Redeemer:   │     │  Checks sig     │
                     │  "3"         │     │  + routes to    │
                     │              │     │  issuer         │
                     └──────────────┘     └─────────────────┘
```

## Data Flow

### Minting
```
User Wallet
  ├── Select UTxO as mint reference
  ├── Build tx: consume reference UTxO
  ├── Mint N tokens (policy ID = hash of mint validator)
  └── Send to custody script with datum: { original_owner: user_vk }
```

### Transfer (Blocked)
```
User Wallet
  ├── Build tx: spend from custody script, redeemer "T"
  ├── Include withdraw-0 for transfer validator
  ├── transfer.ak executes: fail
  └── Transaction rejected
```

### Clawback (Issuer Only)
```
Issuer Wallet
  ├── Build tx: spend from custody script, redeemer "3"
  ├── Include withdraw-0 for third_party validator
  ├── third_party.ak checks:
  │     ├── tx signed by issuer_vk? ✓
  │     ├── input contains tokens? ✓
  │     └── output sends tokens to issuer? ✓
  └── Transaction accepted
```

## PactVote Integration Path

Current PACT token: simple fungible token, transferred freely.

Upgraded PACT token:
1. Mint to DRep-registered addresses only (via off-chain KYC check)
2. Token is soul-bound — prevents vote-selling
3. Governance can claw back from inactive/abusive voters
4. Voting weight proportional to soul-bound balance

Open questions for production:
- How to handle DRep retirement / key rotation?
- Can users burn their own tokens? (yes in this design)
- Should clawback require on-chain governance vote, not just issuer sig?

## File Reference

```
cip113-poc/
├── onchain/
│   ├── validators/
│   │   ├── issuance_mint.ak    ← One-shot mint policy
│   │   ├── transfer.ak         ← Rejects all transfers (soul-bound)
│   │   ├── third_party.ak      ← Issuer clawback
│   │   └── custody.ak          ← Shared holding script
│   └── lib/types.ak            ← Shared types
├── frontend/
│   └── src/components/
│       ├── MintSection.tsx     ← Mint UI
│       ├── TokenInfo.tsx       ← Balance display
│       ├── TransferAttempt.tsx ← Demonstrates blocked transfer
│       └── ClawbackSection.tsx ← Issuer clawback UI
└── scripts/deploy.ts           ← Deployment helper
```
