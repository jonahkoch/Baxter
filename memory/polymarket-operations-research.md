# Polymarket Arbitrage Trading: Operational Research & Security Analysis

*Date: 2026-02-11*

## Executive Summary

This document provides a comprehensive analysis of the operational requirements for Polymarket arbitrage trading and a security-critical assessment of wallet-related skills on Clawhub. The goal is to provide operational clarity while maintaining a skeptical, security-first mindset.

---

## PART 1: POLYMARKET OPERATIONAL RESEARCH

### 1. Wallet Setup Guide

#### Understanding the Wallet Architecture

Polymarket uses a **dual-wallet system** that separates signing authority from fund custody:

**The Two-Key Concept:**
- **Signing Wallet (EOA)**: The externally owned account that cryptographically signs orders and API requests. This is the "operator" key.
- **Funder Address**: The address that actually holds your USDC.e and position tokens. This is where funds are custodied.

**Why This Separation Matters:**
- Allows trading through proxy wallets (Safe multisigs, MagicLink wallets)
- Enables gasless transactions when using relayers
- Separates trading operations from fund storage
- Allows multiple trading bots to use the same funding wallet with different signing keys

#### Wallet Types Supported

| Type | Signature Type | Best For | Gas Responsibility |
|------|---------------|----------|-------------------|
| EOA (MetaMask, hardware wallet) | 0 | Direct control, automated trading | You pay all gas |
| POLY_PROXY (Magic Link email/Google) | 1 | Users who signed up via Polymarket.com | Relayer pays gas |
| GNOSIS_SAFE (Smart wallet/multisig) | 2 | Institutions, treasury management | Relayer pays gas |

**Source:** [Polymarket CLOB Authentication Docs](https://docs.polymarket.com/developers/CLOB/authentication)

#### Step-by-Step EOA Wallet Setup

**For Arbitrage Bots (EOA Recommended):**

1. **Generate a new EOA wallet** (do NOT use your main wallet)
   ```python
   from eth_account import Account
   import secrets
   
   # Generate new private key
   private_key = "0x" + secrets.token_hex(32)
   account = Account.from_key(private_key)
   print(f"Address: {account.address}")
   print(f"Private Key: {private_key}")
   ```

2. **Fund the wallet with USDC.e on Polygon**
   - Bridge USDC from Ethereum or other chains
   - Minimum recommended: $500-$1000 for testing, $5000+ for production

3. **Fund with MATIC for gas**
   - Need ~0.1-0.5 MATIC for approvals and initial setup
   - Each trade costs ~0.001-0.003 MATIC in gas

4. **Set token allowances** (one-time setup)
   ```python
   # Approve USDC.e for CTF contract
   # Approve ConditionalTokens for exchange contracts
   ```

5. **Generate API credentials**
   ```python
   from py_clob_client.client import ClobClient
   
   client = ClobClient(
       "https://clob.polymarket.com",
       137,  # Polygon mainnet
       private_key
   )
   api_creds = client.create_or_derive_api_creds()
   # Save: api_creds.apiKey, api_creds.secret, api_creds.passphrase
   ```

#### Smart Wallet (Safe) vs EOA for Arbitrage

**Recommendation: Use EOA for arbitrage bots**

| Factor | EOA | Safe (Smart Wallet) |
|--------|-----|---------------------|
| Setup Speed | Instant | Requires deployment |
| Gas Costs | Lower per transaction | Higher deployment cost |
| API Latency | Faster | Slightly slower (relayer) |
| Custody | Self-custody | Self-custody |
| Recovery | Seed phrase only | Social recovery possible |
| Best For | High-frequency trading | Treasury, multi-sig needs |

---

### 2. Funding Guide

#### Required Token Balances

**USDC.e (Bridged USDC on Polygon):**
- Contract: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
- This is the ONLY token used for trading on Polymarket
- Native USDC is auto-converted to USDC.e on deposit

**MATIC (for gas):**
- Typical gas costs per operation:
  - Token approval: ~0.002-0.005 MATIC ($0.001-0.003)
  - Order submission (relayed): ~0 MATIC (relayer pays)
  - Direct order submission: ~0.001-0.003 MATIC
  - Position redemption: ~0.002-0.005 MATIC

#### Minimum Capital Recommendations

| Use Case | Minimum USDC.e | Recommended | Notes |
|----------|---------------|-------------|-------|
| Testing/Development | $100 | $500 | Small orders, testing API |
| Small-scale arbitrage | $1,000 | $5,000 | Limited to small opportunities |
| Production arbitrage | $5,000 | $20,000+ | Can capture most opportunities |
| Professional market making | $50,000 | $200,000+ | Deep liquidity provision |

**Why These Numbers:**
- Arbitrage profit = (1 - YES_price - NO_price) * position_size
- With $1000 and 1% edge, you make $10 per arbitrage
- Gas costs eat into smaller positions
- Larger positions get better fill rates

#### Bridging Options to Polygon

**For Deposits Under $50,000:**
1. **Direct from exchange**
   - Most exchanges support direct Polygon USDC withdrawals
   - Coinbase, Binance, Kraken all support Polygon

2. **Official Polygon Bridge**
   - bridge.polygons.technology
   - 10-30 minutes transfer time
   - Ethereum → Polygon only

3. **LayerSwap / Bungee / Socket**
   - Cross-chain bridges
   - Support multiple source chains
   - Often faster than official bridge

**For Deposits Over $50,000:**
- **DeBridge**: debridge.finance
- **Across**: across.to
- **Portal**: portalbridge.com

**Important:** Always verify you're receiving USDC.e (bridged) not native USDC. Polymarket accepts both but USDC.e is the trading currency.

#### Token Allowances (One-Time Setup)

Before trading, you must approve these contracts:

```python
ADDRESSES = {
    "USDCe": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    "CTF": "0x4d97dcd97ec945f40cf65f87097ace5ea0476045",  # ConditionalTokens
    "CTF_EXCHANGE": "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E",
    "NEG_RISK_CTF_EXCHANGE": "0xC5d563A36AE78145C45a50134d48A1215220f80a",
    "NEG_RISK_ADAPTER": "0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296"
}
```

**Required Approvals:**
1. USDC.e → CTF contract (for splitting)
2. CTF (outcome tokens) → CTF_EXCHANGE (for trading)
3. CTF (outcome tokens) → NEG_RISK_CTF_EXCHANGE (for neg-risk markets)

**Cost:** Approximately $0.01-0.05 in gas per approval (one-time)

---

### 3. API Setup

#### Two-Level Authentication

Polymarket CLOB uses L1 and L2 authentication:

**L1 Authentication (Wallet-based):**
- Uses your private key to sign EIP-712 messages
- Required to create/derive API credentials
- Proves ownership of wallet
- Private key never leaves your control

**L2 Authentication (API Key-based):**
- Uses HMAC-SHA256 with API credentials
- Required for placing/canceling orders
- Faster than signing every request
- Credentials can be rotated

#### Generating API Credentials

```python
from py_clob_client.client import ClobClient
import os

# Step 1: Initialize with private key (L1 auth)
client = ClobClient(
    host="https://clob.polymarket.com",
    chain_id=137,
    key=os.getenv("PRIVATE_KEY")
)

# Step 2: Create or derive API credentials
api_creds = client.create_or_derive_api_creds()

# Response format:
# {
#   "apiKey": "550e8400-e29b-41d4-a716-446655440000",
#   "secret": "base64EncodedSecretString",
#   "passphrase": "randomPassphraseString"
# }

# Step 3: Reinitialize with credentials (L2 auth)
client = ClobClient(
    host="https://clob.polymarket.com",
    chain_id=137,
    key=os.getenv("PRIVATE_KEY"),
    creds=api_creds,
    signature_type=0,  # 0=EOA, 1=POLY_PROXY, 2=GNOSIS_SAFE
    funder=os.getenv("FUNDER_ADDRESS")  # Same as signing address for EOA
)
```

#### Rate Limits

**Critical for Arbitrage Bots:**

| Endpoint | Limit | Burst |
|----------|-------|-------|
| POST /order | 500/sec | 3500/10s |
| POST /order (sustained) | 60/sec | 3600/10min |
| GET /book | 150/sec | 1500/10s |
| GET /price | 150/sec | 1500/10s |
| General CLOB | 900/sec | 9000/10s |
| DELETE /order | 300/sec | 3000/10s |

**Practical Implications:**
- You can place up to 500 orders/second in bursts
- Sustained rate is 60 orders/second
- Order book polling: up to 150 requests/second
- No testnet available - all testing is on mainnet with real money

**Source:** [Polymarket Rate Limits](https://docs.polymarket.com/quickstart/introduction/rate-limits)

#### Testnet vs Mainnet

**⚠️ Important:** Polymarket does NOT have a testnet.

- All development/testing happens on mainnet
- Use small amounts ($10-50) for testing
- Paper trading implementations use local simulation only
- No faucet available for test USDC

---

### 4. Arbitrage Opportunity Frequency

#### The Arbitrage Mechanism

On Polymarket, YES + NO shares should always sum to $1.00 (minus spread). When:
- YES_price + NO_price < $1.00 → Arbitrage opportunity exists
- You buy both → Guaranteed profit at resolution
- Example: YES=$0.45, NO=$0.50 → Buy both for $0.95 → Profit $0.05 (5.3%)

#### Realistic Opportunity Assessment

**Based on Market Microstructure:**

1. **Frequency:**
   - True arbitrage (risk-free) is rare in liquid markets
   - Opportunities appear most often in:
     - Low-volume markets (<$100k volume)
     - During high volatility events
     - Around major news events
     - In markets with wide bid-ask spreads

2. **Competition:**
   - Multiple professional market makers operate on Polymarket
   - Response time: milliseconds to seconds
   - Most bots use WebSocket connections for real-time data

3. **Profit Margins:**
   - Typical edge: 0.1% - 2% in competitive markets
   - Higher edges (2-5%) in illiquid markets
   - Gas costs: ~$0.005-0.02 per trade
   - Minimum viable position: ~$100 to cover gas

#### Expected Opportunity Metrics

| Market Type | Opportunity Frequency | Typical Edge | Capture Difficulty |
|-------------|----------------------|--------------|-------------------|
| High-volume (>$10M) | Rare (<1/day) | 0.1-0.3% | Very Hard |
| Medium-volume ($1-10M) | Occasional (1-5/day) | 0.3-1% | Hard |
| Low-volume (<$1M) | Regular (5-20/day) | 1-3% | Moderate |
| New markets (first 24h) | Frequent | 2-5% | Moderate |

#### Practical Arbitrage Strategy

**Reality Check:**
- Pure arbitrage (buy YES + NO < $1) is competed away quickly
- More realistic strategy: "statistical arbitrage"
  - Cross-exchange arbitrage (Polymarket vs other prediction markets)
  - Temporal arbitrage (price movements over time)
  - Market-making (capturing spread)

**Bot Requirements:**
- WebSocket connection for real-time order book updates
- Sub-100ms response time for order placement
- Position tracking across multiple markets
- Automated risk management

---

## PART 2: CLAWHUB WALLET SKILLS SECURITY ANALYSIS

### Security Assessment Framework

**Red Flags (Avoid):**
- Requests private keys or seed phrases
- Closed-source with sensitive permissions
- Unknown/unverifiable developers
- Excessive permissions beyond stated purpose

**Green Flags (Prefer):**
- Open source and auditable
- Works with external wallets (MetaMask, etc.)
- Uses read-only APIs where possible
- Known/reputable developer

### Skills Analysis

#### 1. clawdbot-skill-polymarket (mvanhorn)
- **URL:** https://clawhub.ai/mvanhorn/polymarket
- **GitHub:** https://github.com/mvanhorn/clawdbot-skill-polymarket

| Criteria | Assessment |
|----------|------------|
| **Code Transparency** | ✅ Open source (GitHub available) |
| **Permissions Required** | ✅ NONE - Read-only public API only |
| **Developer Reputation** | ⚠️ Individual developer (mvanhorn), limited track record |
| **Attack Surface** | ✅ Minimal - only reads public market data |
| **Safer Alternative** | DIY using Gamma API directly |

**Security Rating: 🟢 LOW RISK**

**Details:**
- Uses only public Gamma API (gamma-api.polymarket.com)
- No authentication required
- Paper trading only (local JSON files)
- Cannot execute real trades
- `disable-model-invocation: true` prevents autonomous invocation
- Data stored locally in `~/.polymarket/`

**Verdict:** Safe to use. Good for market monitoring and paper trading. Not suitable for real arbitrage trading.

---

#### 2. base-wallet (dAAAb)
- **URL:** https://clawhub.ai/dAAAb/base-wallet
- **GitHub:** Not found (may be private or different naming)

| Criteria | Assessment |
|----------|------------|
| **Code Transparency** | ⚠️ Unknown - Could not locate source code |
| **Permissions Required** | ⚠️ Unknown |
| **Developer Reputation** | ⚠️ Unknown (dAAAb) |
| **Attack Surface** | ⚠️ Unknown without code review |
| **Safer Alternative** | Direct Ethers.js/Web3.py usage |

**Security Rating: 🟡 UNKNOWN RISK**

**Details:**
- Could not retrieve source code
- Claims to be "Base wallet" - likely interacts with Base L2
- Without source code, cannot assess security

**Verdict:** Do NOT use without verifying source code. If it requests private keys, it's a major red flag.

---

#### 3. base-8004 (squirt11e)
- **URL:** https://clawhub.ai/squirt11e/base-8004
- **GitHub:** Not found

| Criteria | Assessment |
|----------|------------|
| **Code Transparency** | ⚠️ Unknown - Could not locate source code |
| **Permissions Required** | ⚠️ Unknown |
| **Developer Reputation** | ⚠️ Unknown (squirt11e) |
| **Attack Surface** | ⚠️ Unknown without code review |
| **Safer Alternative** | Direct Base chain interactions |

**Security Rating: 🟡 UNKNOWN RISK**

**Details:**
- No accessible source code found
- Name suggests Base chain interaction on port 8004

**Verdict:** Do NOT use without source code verification. Avoid if it requires private keys.

---

#### 4. polymarket-odds (deanpress)
- **URL:** https://clawhub.ai/deanpress/polymarket-odds
- **GitHub:** Could not access

| Criteria | Assessment |
|----------|------------|
| **Code Transparency** | ⚠️ Unknown - Could not locate source code |
| **Permissions Required** | ⚠️ Unknown (likely read-only) |
| **Developer Reputation** | ⚠️ Unknown (deanpress) |
| **Attack Surface** | ⚠️ Unknown without code review |
| **Safer Alternative** | mvanhorn's polymarket skill (open source) |

**Security Rating: 🟡 UNKNOWN RISK**

**Verdict:** Without source code access, cannot recommend. Use mvanhorn's open-source alternative instead.

---

#### 5. BankrBot Skill (from GitHub)
- **Status:** Could not locate repository

**Note:** The GitHub URL `github.com/bankrbot/bankrbot-skill` does not exist or is private. Cannot assess without access.

**Security Rating: ⚪ UNVERIFIED**

---

### Security Summary Table

| Skill | Wallet Access | Trading | Open Source | Rating | Recommendation |
|-------|--------------|---------|-------------|--------|----------------|
| mvanhorn/polymarket | ❌ None | Paper only | ✅ Yes | 🟢 Safe | Use for monitoring |
| dAAAb/base-wallet | ⚠️ Unknown | Unknown | ❌ No | 🟡 Unknown | Verify before use |
| squirt11e/base-8004 | ⚠️ Unknown | Unknown | ❌ No | 🟡 Unknown | Verify before use |
| deanpress/polymarket-odds | ⚠️ Unknown | Unknown | ❌ No | 🟡 Unknown | Verify before use |
| BankrBot | ⚠️ Unknown | Unknown | ❌ No | ⚪ Unverified | Cannot assess |

---

## PART 3: RECOMMENDATIONS

### For Polymarket Arbitrage Trading

#### What to Use

1. **Official py-clob-client**
   - Source: https://github.com/Polymarket/py-clob-client
   - Verified, maintained by Polymarket team
   - Well-documented, production-ready

2. **EOA Wallet for Bots**
   - Generate dedicated wallet for trading
   - Fund with limited capital
   - Keep private key secure (environment variables)

3. **Safe Wallet for Treasury**
   - Use Gnosis Safe for larger holdings
   - Multi-sig for team operations
   - Take advantage of relayer gas subsidies

#### What to Avoid

1. **❌ Closed-source trading skills**
   - Never give private keys to unaudited code
   - Cannot verify what the code does

2. **❌ Sharing API credentials**
   - Treat API keys like passwords
   - Rotate if compromised

3. **❌ Unrestricted allowances**
   - Use specific approval amounts, not unlimited
   - Revoke unused allowances

### DIY Alternatives

#### For Market Monitoring (Safe)
```python
import requests

# Gamma API is public, no auth needed
def get_markets():
    url = "https://gamma-api.polymarket.com/markets"
    params = {"active": True, "closed": False, "limit": 100}
    return requests.get(url, params=params).json()

def get_orderbook(token_id):
    url = f"https://clob.polymarket.com/book"
    params = {"token_id": token_id}
    return requests.get(url, params=params).json()
```

#### For Trading (Use Official Client)
```python
from py_clob_client.client import ClobClient
from py_clob_client.clob_types import OrderArgs
from py_clob_client.order_builder.constants import BUY

# Initialize with your credentials
client = ClobClient(
    "https://clob.polymarket.com",
    chain_id=137,
    key=PRIVATE_KEY,
    creds=API_CREDS,
    signature_type=0,
    funder=FUNDER_ADDRESS
)

# Check for arbitrage
orderbook = client.get_order_book(token_id)
yes_bid = orderbook.bids[0].price if orderbook.bids else 0
no_bid = get_complementary_orderbook().bids[0].price

if yes_bid + no_bid < 0.99:  # 1% threshold
    # Execute arbitrage
    pass
```

### Security Checklist

Before running any trading bot:

- [ ] Wallet created specifically for trading (not main wallet)
- [ ] Limited funds in trading wallet (< 20% of total capital)
- [ ] Private key stored securely (not in code, use env vars)
- [ ] API credentials rotated regularly
- [ ] Token allowances set with reasonable limits
- [ ] Bot code reviewed and understood
- [ ] Paper trading tested for 1+ weeks
- [ ] Stop-loss and risk limits configured
- [ ] Monitoring/alerting in place

---

## Appendix A: Key Contract Addresses

### Polygon Mainnet

```python
POLYGON_CONTRACTS = {
    "USDCe": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    "CTF": "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045",
    "CTF_EXCHANGE": "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E",
    "NEG_RISK_CTF_EXCHANGE": "0xC5d563A36AE78145C45a50134d48A1215220f80a",
    "NEG_RISK_ADAPTER": "0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296",
    "GNOSIS_SAFE_FACTORY": "0xaacfeea03eb1561c4e67d661e40682bd20e3541b",
    "POLYMARKET_PROXY_FACTORY": "0xaB45c5A4B0c941a2F231C04C3f49182e1A254052"
}
```

### API Endpoints

```python
ENDPOINTS = {
    "CLOB_MAINNET": "https://clob.polymarket.com",
    "GAMMA_API": "https://gamma-api.polymarket.com",
    "RELAYER": "https://relayer-v2.polymarket.com/"
}
```

---

## Appendix B: Additional Resources

### Official Documentation
- Polymarket Docs: https://docs.polymarket.com
- CLOB Authentication: https://docs.polymarket.com/developers/CLOB/authentication
- Rate Limits: https://docs.polymarket.com/quickstart/introduction/rate-limits
- Proxy Wallets: https://docs.polymarket.com/developers/proxy-wallet

### GitHub Repositories
- py-clob-client: https://github.com/Polymarket/py-clob-client
- clob-client (TypeScript): https://github.com/Polymarket/clob-client
- builder-relayer-client: https://github.com/Polymarket/builder-relayer-client

### Community
- Polymarket Discord: https://discord.gg/polymarket
- Developer discussions in #developers channel

---

## Disclaimer

This research is for informational purposes only. Cryptocurrency trading involves substantial risk of loss. The arbitrage opportunities described may not be profitable after gas costs, slippage, and competition. Always conduct your own research and consider consulting with a financial advisor before engaging in trading activities.

The security assessments are based on publicly available information as of 2026-02-11. Skills may have changed since this analysis. Always verify current code and permissions before installation.
