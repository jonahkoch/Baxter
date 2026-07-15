---
name: masumi-x402-setup
description: "Set up Masumi x402 payment infrastructure on Cardano for monetizing AI agents. Covers self-hosted payment node, wallet generation, MIP-003 agent API implementation, on-chain registration, and Sokosumi marketplace listing. Use when: building a monetized agent on Cardano, setting up Masumi payment service, registering agent on-chain, or debugging x402 payment flows. NOT for: general Cardano development, non-monetized agents, or non-blockchain payment processing."
---

# Masumi x402 Setup Skill

## What This Skill Covers

End-to-end setup for monetizing AI agents via the x402 payment standard on Cardano blockchain using the Masumi protocol.

## When to Use This Skill

### ✅ Use When:
- Building a monetized AI agent on Cardano
- Setting up Masumi Payment Service (self-hosted node)
- Generating and funding Cardano wallets for agent payments
- Implementing MIP-003 Agentic Service API
- Registering an agent on-chain (NFT mint)
- Listing an agent on Sokosumi marketplace
- Debugging x402 payment flows
- Migrating from preprod to mainnet

### ❌ Don't Use When:
- Building non-monetized agents (no payment needed)
- Using centralized payment processors (Stripe, PayPal)
- General Cardano development without agent payments
- Non-blockchain agent deployment

---

## Prerequisites Checklist

Before starting, verify:

| Requirement | Command | Expected |
|------------|---------|----------|
| Node.js ≥ 18 | `node --version` | v18+ |
| PostgreSQL ≥ 14 | `psql --version` | 14+ |
| pnpm | `pnpm --version` | 10+ |
| Git | `git --version` | any |
| Blockfrost API Key | Get at blockfrost.io | Preprod key |

## Step-by-Step Setup

### 1. Install System Dependencies

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib git curl

# macOS
brew install postgresql git

# Verify
node --version && psql --version && git --version
```

### 2. Configure PostgreSQL

```bash
sudo -u postgres psql -c "CREATE USER masumi WITH PASSWORD 'masumi';"
sudo -u postgres psql -c "CREATE DATABASE masumi OWNER masumi;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE masumi TO masumi;"
```

### 3. Install Payment Service

```bash
git clone https://github.com/masumi-network/masumi-payment-service.git
cd masumi-payment-service
npm install -g pnpm
pnpm install
```

### 4. Generate Wallets

```bash
node -e "
const { MeshWallet } = require('@meshsdk/core');

const purchase = MeshWallet.brew(false);
const selling = MeshWallet.brew(false);
const collection = MeshWallet.brew(false);

const pw = new MeshWallet({ networkId: 0, key: { type: 'mnemonic', words: purchase } });
const sw = new MeshWallet({ networkId: 0, key: { type: 'mnemonic', words: selling } });
const cw = new MeshWallet({ networkId: 0, key: { type: 'mnemonic', words: collection } });

(async () => {
  console.log('PURCHASE_WALLET_PREPROD_MNEMONIC=' + purchase.join(' '));
  console.log('SELLING_WALLET_PREPROD_MNEMONIC=' + selling.join(' '));
  console.log('COLLECTION_WALLET_PREPROD_ADDRESS=' + (await cw.getUnusedAddresses())[0]);
})();
"
```

> ⚠️ **BACKUP MNEMONICS SECURELY** — Lost = funds gone forever

### 5. Create .env File

```bash
cat > .env << 'EOF'
DATABASE_URL="postgresql://masumi:masumi@localhost:5432/masumi?schema=public"
PORT=3001
ENCRYPTION_KEY="your-32-char-secure-encryption-key!"
ADMIN_KEY="your-admin-api-key-here"

# Required
BLOCKFROST_API_KEY_PREPROD="your-blockfrost-preprod-key"
BLOCKFROST_API_KEY_MAINNET=""

# Wallets (from Step 4)
PURCHASE_WALLET_PREPROD_MNEMONIC="word1 word2 ... word24"
SELLING_WALLET_PREPROD_MNEMONIC="word1 word2 ... word24"
COLLECTION_WALLET_PREPROD_ADDRESS="addr_test1..."

# Blockchain settings
BLOCK_CONFIRMATIONS_THRESHOLD="20"
AUTO_WITHDRAW_PAYMENTS="true"
AUTO_WITHDRAW_REFUNDS="true"

# Pricing
COINGECKO_API_KEY="CG-demo-key"
IS_COINGECKO_DEMO="true"
EOF
```

### 6. Initialize Database

```bash
pnpm run prisma:migrate
pnpm run prisma:seed
```

> If seeding fails with "Invalid mnemonic", regenerate valid 24-word mnemonics.

### 7. Start Payment Service

```bash
pnpm run dev
# Runs on http://localhost:3001
# Admin: http://localhost:3001/admin
# Docs: http://localhost:3001/docs
```

### 8. Fund Wallets

Get test ADA from:
- https://faucet.preprod.play.dev.cardano.org/basic-faucet
- https://dispenser.masumi.network (requires verification code)

Minimum per wallet:
- Purchase: 100 ADA
- Selling: 10 ADA (transaction fees)
- Collection: 5 ADA

### 9. Build MIP-003 Agent

Your agent must implement these endpoints:

```javascript
// Required endpoints:
GET  /availability      → { status: "available" }
GET  /input_schema      → JSON Schema for inputs
POST /start_job         → Create job + payment request
GET  /status?job_id=... → Check status/return results

// Optional:
GET  /demo              → Sample output for marketing
```

**POST /start_job implementation:**

```javascript
app.post('/start_job', async (req, res) => {
  const { input_data, identifier_from_purchaser } = req.body;
  
  // 1. Parse input_data key-value pairs
  const data = {};
  for (const item of input_data) {
    if (item.key && item.value !== undefined) data[item.key] = item.value;
  }
  
  // 2. Calculate input hash
  const inputHash = crypto.createHash('sha256')
    .update(JSON.stringify(data)).digest('hex');
  
  // 3. Generate time constraints (CRITICAL)
  const now = new Date();
  const payByTime = new Date(now.getTime() + 5 * 60 * 1000).toISOString();
  const submitResultTime = new Date(now.getTime() + 20 * 60 * 1000).toISOString();
  const unlockTime = new Date(now.getTime() + 40 * 60 * 1000).toISOString();
  
  // 4. Create payment request
  const paymentRes = await fetch('http://localhost:3001/api/v1/payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'token': ADMIN_KEY },
    body: JSON.stringify({
      network: 'Preprod',
      agentIdentifier: AGENT_IDENTIFIER,
      inputHash: inputHash,
      identifierFromPurchaser: crypto.randomBytes(8).toString('hex'), // 16 chars
      payByTime: payByTime,
      submitResultTime: submitResultTime,
      unlockTime: unlockTime
    })
  });
  
  const paymentData = await paymentRes.json();
  
  // 5. Return payment details to buyer
  res.json({
    job_id: jobId,
    blockchain_identifier: paymentData.data.blockchainIdentifier,
    payment_address: paymentData.data.sellerReturnAddress,
    amount_lovelace: price,
    status: 'awaiting_payment'
  });
});
```

### 10. Register On-Chain

```bash
# Get selling wallet vkey
curl -s "http://localhost:3001/api/v1/wallet?id=<wallet-id>&walletType=Selling" \
  -H "token: $ADMIN_KEY" | jq -r '.data.walletVkey'

# Register agent
curl -s -X POST "http://localhost:3001/api/v1/registry" \
  -H "Content-Type: application/json" \
  -H "token: $ADMIN_KEY" \
  -d '{
    "network": "Preprod",
    "sellingWalletVkey": "<vkey-from-above>",
    "name": "Your Agent Name",
    "description": "What your agent does",
    "apiBaseUrl": "http://localhost:8080",
    "Tags": ["tag1", "tag2"],
    "ExampleOutputs": [{"name": "demo", "url": "http://localhost:8080/demo", "mimeType": "application/json"}],
    "Capability": {"name": "capability-name", "version": "1.0"},
    "AgentPricing": {"pricingType": "Fixed", "Pricing": [{"unit": "", "amount": "3500000"}]},
    "Author": {"name": "You", "contactEmail": "you@example.com", "organization": "Your Co"},
    "Legal": {"privacyPolicy": "https://...", "terms": "https://..."}
  }'
```

### 11. List on Sokosumi

1. Go to https://tally.so/r/nPLBaV
2. Submit agent details + agentIdentifier from registration
3. Wait for Masumi team review

---

## Critical Gotchas

### Time Constraints (Payment Request)
```
payByTime ──(+5min+)──► submitResultTime ──(+15min+)──► unlockTime
     ^                              ^
     |                              |
  Must be                        Must be
  ≥5 min before                  ≥15 min in future
  submitResultTime               ≥15 min before unlockTime
```

### identifierFromPurchaser
- Must be **hex string only** (0-9, a-f)
- Length: **14-26 characters**
- Generate with: `crypto.randomBytes(8).toString('hex')` → 16 chars

### Fixed vs Dynamic Pricing
- **Fixed pricing:** Set price in registry, pass `RequestedFunds: null`
- **Dynamic pricing:** Pass `RequestedFunds: [{"unit": "", "amount": "..."}]`

### Self-Hosting Requirement
- **Preprod:** Must self-host (no managed service)
- **Mainnet:** Can use managed service at `https://payment.masumi.network`

---

## Debugging Commands

```bash
# Check wallet balances (via Blockfrost)
curl -s -H "project_id: $BLOCKFROST_KEY" \
  "https://cardano-preprod.blockfrost.io/api/v0/addresses/$ADDRESS"

# Check payment status
curl -s "http://localhost:3001/api/v1/payment?network=Preprod&limit=5" \
  -H "token: $ADMIN_KEY" | jq '.data.Payment[] | {id, status: .NextAction.requestedAction}'

# Resolve by blockchain identifier
curl -s -X POST "http://localhost:3001/api/v1/payment/resolve-blockchain-identifier" \
  -H "token: $ADMIN_KEY" \
  -d '{"network": "Preprod", "blockchainIdentifier": "..."}'

# Check registry status
curl -s "http://localhost:3001/api/v1/registry?id=<id>&network=Preprod" \
  -H "token: $ADMIN_KEY"

# View payment service logs
journalctl -u masumi-payment -f  # or tail -f /tmp/agent.log
```

---

## Mainnet Migration

```bash
# 1. Get mainnet Blockfrost key
# 2. Create mainnet wallets (hardware wallet for collection!)
# 3. Update .env:
BLOCKFROST_API_KEY_MAINNET="your-mainnet-key"
PURCHASE_WALLET_MAINNET_MNEMONIC="..."
SELLING_WALLET_MAINNET_MNEMONIC="..."
COLLECTION_WALLET_MAINNET_ADDRESS="addr1..."

# 4. Register with network: "Mainnet"
# 5. Use managed service OR deploy node to production
# 6. Update apiBaseUrl to public HTTPS URL
# 7. Get real USDM (not tUSDM)
```

---

## Reference: MIP-003 Status Flow

```
awaiting_payment ──► FundsLocked ──► running ──► completed
       │                                    │
       ▼                                    ▼
   refunded                            failed
```

Your agent polls for `FundsLocked`, then processes and calls `POST /payment/submit-result`.

---

## Resources

- Masumi Docs: https://www.masumi.network/dev/masumi/documentation
- Sokosumi: https://app.sokosumi.com
- Blockfrost: https://blockfrost.io
- Cardano Faucet: https://faucet.preprod.play.dev.cardano.org
- Masumi GitHub: https://github.com/masumi-network
