# Masumi x402 Setup — Kochfoto / Jonah Koch

**Date:** 2026-07-14  
**Network:** Cardano Preprod (testnet)  
**Purpose:** Monetize AI agent services via x402 payment standard on Cardano

---

## What Was Built

### 1. Masumi Payment Service (Self-Hosted Node)
- **Location:** `/root/.openclaw/workspace/masumi-payment-service/`
- **API:** `http://localhost:3001/api/v1`
- **Admin Dashboard:** `http://localhost:3001/admin`
- **Swagger Docs:** `http://localhost:3001/docs`
- **Status:** ✅ Running

### 2. Cardano Treasury Proposal Reviewer Agent
- **Location:** `/root/.openclaw/workspace/agents/proposal-reviewer/`
- **API:** `http://localhost:8080`
- **MIP-003 Compliant:** Yes (POST /start_job, GET /status, GET /availability, GET /input_schema, GET /demo)
- **Status:** ✅ Running

### 3. On-Chain Registration
- **Agent Name:** Cardano Treasury Proposal Reviewer
- **Agent ID:** `7e8bdaf2b2b919a3a4b94002cafb50086c0c845fe535d07a77ab7f77545d7326645aba0b34944c7cc7e4eccaa95f1c22549d4a3f465d103b3ceb2264`
- **State:** RegistrationInitiated (NFT minted, confirming)
- **Price:** 3.5 ADA (3,500,000 lovelace) per review
- **Network:** Preprod

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Buyer (Human or Agent)                    │
│                    Pays 3.5 ADA for review                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ POST /start_job
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Proposal Reviewer Agent (port 8080)            │
│  • Accepts proposal text + metadata                         │
│  • Creates payment request via Masumi Payment Service       │
│  • Returns payment address + blockchain identifier          │
│  • Polls for payment, runs rubric assessment when paid      │
│  • Submits result hash, releases escrow                     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ API calls (localhost:3001)
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Masumi Payment Service (port 3001)             │
│  • Manages wallets (Purchasing, Selling, Collection)        │
│  • Creates payment requests on blockchain                   │
│  • Monitors smart contract for payment status               │
│  • Handles escrow, disputes, refunds                        │
│  • Submits result hashes for verification                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ Blockchain transactions
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Cardano Blockchain (Preprod Testnet)           │
│  • Smart contract holds funds in escrow                     │
│  • NFT registry for agent identity                          │
│  • On-chain decision logging (SHA256 hashes)                │
│  • Automatic fund release after unlock time                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

| Dependency | Version | Purpose |
|-----------|---------|---------|
| Node.js | ≥ 18 | Runtime for payment service + agent |
| PostgreSQL | ≥ 14 | Database for payments, wallets, jobs |
| pnpm | ≥ 10 | Package manager (required by masumi-payment-service) |
| Git | any | Clone repositories |
| Blockfrost API Key | Preprod | Blockchain interaction |
| Test ADA | ≥ 110 total | Wallet funding (100 purchase, 100 selling, 10 collection) |

---

## Setup Instructions

### Step 1: Install System Dependencies

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib git curl

# Verify
node --version    # ≥ v18
psql --version    # ≥ 14
```

### Step 2: Configure PostgreSQL

```bash
# Create database user and database
sudo -u postgres psql -c "CREATE USER masumi WITH PASSWORD 'masumi';"
sudo -u postgres psql -c "CREATE DATABASE masumi OWNER masumi;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE masumi TO masumi;"
```

### Step 3: Clone and Setup Payment Service

```bash
cd /root/.openclaw/workspace
git clone https://github.com/masumi-network/masumi-payment-service.git
cd masumi-payment-service

# Install pnpm if not available
npm install -g pnpm

# Install dependencies
pnpm install

# Generate wallets (or provide your own mnemonics)
node -e "
const { MeshWallet } = require('@meshsdk/core');
const purchase = MeshWallet.brew(false);
const selling = MeshWallet.brew(false);
const collection = MeshWallet.brew(false);

const pw = new MeshWallet({ networkId: 0, key: { type: 'mnemonic', words: purchase } });
const sw = new MeshWallet({ networkId: 0, key: { type: 'mnemonic', words: selling } });
const cw = new MeshWallet({ networkId: 0, key: { type: 'mnemonic', words: collection } });

console.log('PURCHASE_WALLET_PREPROD_MNEMONIC=' + purchase.join(' '));
console.log('SELLING_WALLET_PREPROD_MNEMONIC=' + selling.join(' '));
console.log('COLLECTION_WALLET_PREPROD_ADDRESS=' + (await cw.getUnusedAddresses())[0]);
"
```

### Step 4: Configure Environment

Create `.env` file in `masumi-payment-service/`:

```env
DATABASE_URL="postgresql://masumi:masumi@localhost:5432/masumi?schema=public"
PORT=3001
ENCRYPTION_KEY="your-32-char-encryption-key-here!!"
ADMIN_KEY="your-admin-key-here"

# Required for blockchain interaction
BLOCKFROST_API_KEY_PREPROD="your-blockfrost-preprod-key"
BLOCKFROST_API_KEY_MAINNET=""  # Leave empty for preprod-only

# Wallets (from Step 3 or your own)
PURCHASE_WALLET_PREPROD_MNEMONIC="word1 word2 ... word24"
SELLING_WALLET_PREPROD_MNEMONIC="word1 word2 ... word24"
COLLECTION_WALLET_PREPROD_ADDRESS="addr_test1..."

# Timing configurations
BLOCK_CONFIRMATIONS_THRESHOLD="20"
AUTO_WITHDRAW_PAYMENTS="true"
AUTO_WITHDRAW_REFUNDS="true"

# Pricing
COINGECKO_API_KEY="CG-demo-key"
IS_COINGECKO_DEMO="true"
```

### Step 5: Database Setup

```bash
cd masumi-payment-service
pnpm run prisma:migrate
pnpm run prisma:seed
```

> **Note:** If seeding fails with "Invalid mnemonic", regenerate wallets with valid 24-word mnemonics.

### Step 6: Start Payment Service

```bash
cd masumi-payment-service
pnpm run dev
```

Service starts on `http://localhost:3001`.

### Step 7: Fund Wallets

Get test ADA from Cardano Preprod Faucet:
- **Purchase Wallet:** ≥ 100 ADA
- **Selling Wallet:** ≥ 5-10 ADA (for transaction fees)
- **Collection Wallet:** ≥ 5 ADA (optional, receives payments)

Faucet options:
- https://faucet.preprod.play.dev.cardano.org/basic-faucet
- https://dispenser.masumi.network (requires verification code)

### Step 8: Build Your Agent

See `/root/.openclaw/workspace/agents/proposal-reviewer/server.js` for a complete example.

**Required MIP-003 Endpoints:**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/availability` | GET | Health check |
| `/input_schema` | GET | Define expected inputs |
| `/start_job` | POST | Create job + payment request |
| `/status` | GET | Check job status + results |

**Key Implementation Details:**

```javascript
// POST /start_job flow:
1. Validate input_data against schema
2. Calculate inputHash = sha256(JSON.stringify(input))
3. Create payment via Payment Service:
   POST http://localhost:3001/api/v1/payment
   Body: {
     "network": "Preprod",
     "agentIdentifier": "your-agent-id-from-registry",
     "inputHash": "sha256-hex",
     "identifierFromPurchaser": "16-char-hex",  // 14-26 chars
     "payByTime": "ISO timestamp (5 min future)",
     "submitResultTime": "ISO timestamp (20 min future)",
     "unlockTime": "ISO timestamp (40 min future)"
   }
4. Store job with blockchainIdentifier
5. Return payment details to buyer

// Background polling:
setInterval(async () => {
  // Check each awaiting_payment job
  // If payment status = "FundsLocked", run job
  // Submit result hash via POST /payment/submit-result
}, 10000);
```

**Time Constraints (critical):**
- `payByTime` must be before `submitResultTime` by at least 5 minutes
- `submitResultTime` must be before `unlockTime` by at least 15 minutes
- `submitResultTime` must be at least 15 minutes in the future
- `identifierFromPurchaser` must be 14-26 character hex string

### Step 9: Register Agent On-Chain

```bash
# Get selling wallet vkey
curl -s "http://localhost:3001/api/v1/wallet?id=<wallet-id>&walletType=Selling" \
  -H "token: $ADMIN_KEY"

# Register
curl -s -X POST "http://localhost:3001/api/v1/registry" \
  -H "Content-Type: application/json" \
  -H "token: $ADMIN_KEY" \
  -d '{
    "network": "Preprod",
    "sellingWalletVkey": "<vkey-from-above>",
    "name": "Your Agent Name",
    "description": "What your agent does (≤250 chars)",
    "apiBaseUrl": "http://localhost:8080",
    "Tags": ["tag1", "tag2"],
    "ExampleOutputs": [
      {"name": "demo", "url": "http://localhost:8080/demo", "mimeType": "application/json"}
    ],
    "Capability": {"name": "your-capability", "version": "1.0"},
    "AgentPricing": {
      "pricingType": "Fixed",
      "Pricing": [{"unit": "", "amount": "3500000"}]
    },
    "Author": {"name": "You", "contactEmail": "you@example.com", "organization": "Your Co"},
    "Legal": {"privacyPolicy": "https://...", "terms": "https://..."}
  }'
```

### Step 10: List on Sokosumi Marketplace

1. Go to https://tally.so/r/nPLBaV
2. Fill in:
   - Name, description, API URL
   - Agent ID (from registration response)
   - Price (in USDM for mainnet, lovelace for preprod)
   - Tags, capabilities, example outputs
3. Wait for Masumi team review

---

## Key Learnings & Gotchas

### 1. Self-Hosting Required for Preprod
- **No managed preprod service exists.** You must self-host the payment node for testing.
- Mainnet has managed service at `https://payment.masumi.network`.

### 2. MIP-003 Payment Request Constraints
| Field | Constraint |
|-------|-----------|
| `identifierFromPurchaser` | 14-26 character hex string only |
| `payByTime` | Must be ≥ 5 min before `submitResultTime` |
| `submitResultTime` | Must be ≥ 15 min in future, ≥ 15 min before `unlockTime` |
| `RequestedFunds` | Must be `null` for fixed pricing (set in registry) |
| `inputHash` | Required SHA256 hex of input data |

### 3. Wallet Generation
- Use `@meshsdk/core` `MeshWallet.brew(false)` for valid Cardano mnemonics
- Collection wallet only needs address (not mnemonic) in `.env`
- **Backup mnemonics securely** — lost = funds gone

### 4. Database Schema
- Uses Prisma ORM with PostgreSQL
- Tables: `PaymentSource`, `HotWallet`, `PaymentRequest`, `RegistryRequest`, etc.
- Migration files in `prisma/migrations/`

### 5. Fixed vs Dynamic Pricing
- **Fixed:** Price set in registry, `RequestedFunds: null` in payment request
- **Dynamic:** Pass `RequestedFunds` array with unit + amount per request

### 6. Blockfrost API Key
- Free at https://blockfrost.io
- Must match network (preprod key for preprod, mainnet key for mainnet)
- Used for blockchain queries, transaction monitoring

### 7. Timeouts and Intervals
- Payment service runs background jobs every ~20-300 seconds
- Agent should poll payment status every 10-30 seconds
- Blockchain confirmation takes ~20 blocks (~10 minutes on preprod)

---

## File Locations

```
/root/.openclaw/workspace/
├── masumi-payment-service/          # Payment node
│   ├── .env                          # Configuration
│   ├── src/                          # Source code
│   ├── prisma/                       # Database schema
│   └── README-KOCHFOTO.md            # This file
│
├── agents/
│   └── proposal-reviewer/            # MIP-003 agent example
│       ├── server.js                 # Agent service
│       └── package.json              # Dependencies
│
└── masumi-wallets-preprod.txt        # Wallet addresses (no mnemonics)
```

---

## API Quick Reference

### Payment Service
```bash
# Health
curl http://localhost:3001/api/v1/health

# Create payment (seller)
curl -X POST http://localhost:3001/api/v1/payment \
  -H "token: $ADMIN_KEY" \
  -d '{"network":"Preprod",...}'

# Submit result
curl -X POST http://localhost:3001/api/v1/payment/submit-result \
  -H "token: $ADMIN_KEY" \
  -d '{"network":"Preprod","blockchainIdentifier":"...","submitResultHash":"..."}'

# Registry
curl http://localhost:3001/api/v1/registry?id=<id>&network=Preprod \
  -H "token: $ADMIN_KEY"
```

### Agent Service
```bash
# Health
curl http://localhost:8080/availability

# Input schema
curl http://localhost:8080/input_schema

# Start job
curl -X POST http://localhost:8080/start_job \
  -d '{"input_data":[...],"identifier_from_purchaser":"..."}'

# Check status
curl "http://localhost:8080/status?job_id=..."

# Demo output
curl http://localhost:8080/demo
```

---

## Mainnet Migration Checklist

- [ ] Get mainnet Blockfrost API key
- [ ] Create mainnet wallets (use hardware wallet for collection)
- [ ] Set `BLOCKFROST_API_KEY_MAINNET` in `.env`
- [ ] Add mainnet wallet mnemonics to `.env`
- [ ] Switch agent registration to `network: "Mainnet"`
- [ ] Deploy agent to public server with HTTPS
- [ ] Update `apiBaseUrl` to public URL
- [ ] Use managed payment service OR deploy node to production
- [ ] Get USDM (not tUSDM) for real payments
- [ ] List on Sokosumi with mainnet agent ID

---

## Resources

- **Masumi Docs:** https://www.masumi.network/dev/masumi/documentation
- **Sokosumi:** https://app.sokosumi.com
- **Blockfrost:** https://blockfrost.io
- **Cardano Faucet:** https://faucet.preprod.play.dev.cardano.org
- **MIP-003 Spec:** See `masumi-payment-service/docs/`
- **This Skill:** `~/.openclaw/workspace/.agents/skills/masumi/SKILL.md`

---

## Support

- **Masumi Email:** hello@masumi.network
- **Masumi X:** @MasumiNetwork
- **GitHub:** https://github.com/masumi-network

---

*Built by Jonah Koch (Kochfoto) with assistance from Baxter AI Agent*  
*For monetizing Cardano governance proposal review services*
