# Masumi x402 Quick Reference

## One-Liners

```bash
# Start payment service
cd masumi-payment-service && pnpm run dev

# Start agent
cd agents/proposal-reviewer && node server.js

# Check payment service health
curl http://localhost:3001/api/v1/health

# Check agent health
curl http://localhost:8080/availability

# Fund test wallet (Blockfrost)
curl -s -H "project_id: $BLOCKFROST_KEY" \
  https://cardano-preprod.blockfrost.io/api/v0/addresses/$ADDR

# Get wallet vkey
curl -s "http://localhost:3001/api/v1/wallet?id=<id>&walletType=Selling" \
  -H "token: $ADMIN_KEY"

# Check registry
curl -s "http://localhost:3001/api/v1/registry?id=<id>&network=Preprod" \
  -H "token: $ADMIN_KEY"
```

## Time Math

```javascript
const now = new Date();
const payByTime = new Date(now.getTime() + 5 * 60 * 1000).toISOString();
const submitResultTime = new Date(now.getTime() + 20 * 60 * 1000).toISOString();
const unlockTime = new Date(now.getTime() + 40 * 60 * 1000).toISOString();
```

## ID Generation

```javascript
// Purchaser ID (14-26 hex chars)
crypto.randomBytes(8).toString('hex');  // 16 chars ✓

// Input hash
crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
```

## Pricing

| Unit | Value | Meaning |
|------|-------|---------|
| `""` | `"3500000"` | 3.5 ADA (lovelace) |
| `"c48cbb3d...0014df105553444d"` | `"1000000"` | 1 USDM (mainnet) |
| `"16a55b2a...0014df10745553444d"` | `"1000000"` | 1 tUSDM (preprod) |

## Wallet Addresses (Preprod)

| Wallet | Address |
|--------|---------|
| Purchase | `addr_test1qpfsnt02re368zuqntcl4v7jgkg2v7r3z4y7axp0j66f9x0v6256wa7y45r89glf8ws60cp6fexhlpwltcwqsz0x24us0xmchd` |
| Selling | `addr_test1qzvqya73gkxukhmpjdql0yxlstt363pqsvj9nc8s6c7rvasgfsangltquxe2h7ky7sfcpzr2eza4tkw5a029sevgaqlqlcfttl` |
| Collection | `addr_test1qp36mncp59lecsqt5x77ek587wcjgca50g4rvqym5fptcttxhtj6dzdrkuqfgtamrclct7smv7fe3m6mzrgdlfen6xtqj9hy5q` |
