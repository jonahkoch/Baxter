# Polymarket Arbitrage Trading Research

*Comprehensive analysis of CLOB arbitrage strategies, ecosystem tools, and infrastructure requirements for automated prediction market trading.*

**Date:** February 2026  
**Research Focus:** Polymarket CLOB arbitrage, ecosystem tooling, and automated trading infrastructure

---

## Executive Summary

Polymarket operates as the world's largest decentralized prediction market using a **Central Limit Order Book (CLOB)** architecture. This research analyzes a specific arbitrage opportunity where **YES + NO prices don't always sum to $1.00** due to execution speed tradeoffs in the CLOB design. This creates a structural, renewable edge for traders who can simultaneously buy both sides when the sum is less than $1.00, guaranteeing a payout of $1.00 per pair.

**Key Finding:** The CLOB arbitrage strategy exploits a fundamental mechanic of Polymarket's hybrid-decentralized architecture - orders are matched off-chain for speed, but settled on-chain. This creates temporary price dislocations where YES and NO prices don't perfectly sum to $1.00, offering risk-free profit opportunities when properly executed.

---

## 1. Ecosystem Overview

### 1.1 Key Platforms & Tools

| Tool/Platform | Purpose | URL |
|--------------|---------|-----|
| **Polymarket** | Primary prediction market platform | https://polymarket.com |
| **py-clob-client** | Official Python client for CLOB API | https://github.com/Polymarket/py-clob-client |
| **BankrBot** | AI-powered trading agent with Polymarket support | https://bankr.bot |
| **ClawHub Skills** | OpenClaw skill repository | https://clawhub.ai |
| **Simmer Markets** | Prediction market for AI agents | https://www.simmer.markets |

### 1.2 Available Skills & Integrations

#### BankrBot OpenClaw Skills
The BankrBot skill library provides comprehensive crypto trading capabilities including Polymarket integration:

- **Polymarket Trading**: Search markets, view odds, place bets, manage positions, redeem winnings
- **Multi-Chain Support**: Base, Ethereum, Polygon, Unichain, Solana
- **Token Launchpad**: Deploy ERC20/SPL tokens
- **Automation**: DCA, stop loss, limit orders, TWAP
- **Leverage Trading**: Up to 50x crypto, 100x forex/commodities via Avantis

Key capabilities from the Bankr Polymarket reference:
- Auto-bridging from other chains to Polygon USDC.e
- Share-based betting system (shares pay $1.00 if correct)
- Portfolio management across active/closed/resolved markets
- Limit order support for price-targeted entries

#### ClawHub Skills
- `mvanhorn/polymarket` - Polymarket data skill
- `deanpress/polymarket-odds` - Odds tracking skill
- `dAAAb/base-wallet` - Base wallet integration
- `squirt11e/base-8004` - ERC-8004 agent registry

### 1.3 Data Sources

| Source | Latency | Use Case | Endpoint |
|--------|---------|----------|----------|
| **CLOB WebSocket** | ~100ms | Real-time orderbook | `wss://ws-subscriptions-clob.polymarket.com` |
| **RTDS** | ~100ms | Crypto prices, comments | `wss://ws-live-data.polymarket.com` |
| **Gamma API** | ~1s | Market metadata, indexing | `https://gamma-api.polymarket.com` |
| **CLOB REST** | ~100ms | Order entry, market data | `https://clob.polymarket.com` |
| **On-chain** | Block time | Settlement, resolution | Polygon RPC |

---

## 2. CLOB Arbitrage Mechanic Deep Dive

### 2.1 How Polymarket's CLOB Works

Polymarket uses a **hybrid-decentralized CLOB** architecture:

1. **Off-chain matching**: Orders are matched by an operator for speed
2. **On-chain settlement**: Matched trades are settled on Polygon via signed EIP712 orders
3. **Atomic swaps**: Exchange contract facilitates swaps between outcome tokens (CTF ERC1155) and collateral (USDC.e)

**Key insight**: The operator handles order matching but cannot set prices or execute unauthorized trades. Users maintain control through on-chain order cancellation capabilities.

### 2.2 The YES + NO ≠ $1.00 Arbitrage

#### Why Prices Don't Always Sum to $1.00

In a perfectly efficient market, YES_price + NO_price = $1.00 because:
- Buying 1 YES + 1 NO costs $1.00 (collateral)
- At resolution, one pays $1.00, the other $0
- Therefore: YES_price + NO_price should equal $1.00

**However**, in Polymarket's CLOB:
- YES and NO are **separate order books** with separate liquidity
- Orders execute at different times
- Market makers quote different spreads on each side
- Latency creates temporary dislocations

#### The Arbitrage Example

```
Market: "Will Trump win 2024?"

YES order book:
- Best bid: $0.62
- Best ask: $0.64

NO order book:
- Best bid: $0.33
- Best ask: $0.35

SUM: $0.62 + $0.33 = $0.95 (bid side)
SUM: $0.64 + $0.35 = $0.99 (ask side)

ARBITRAGE OPPORTUNITY:
- Buy YES at ask: $0.64
- Buy NO at ask: $0.35
- Total cost: $0.99
- Guaranteed payout: $1.00
- Profit: $0.01 (1% gross)
```

#### Speed vs Accuracy Tradeoff

The CLOB design makes a deliberate tradeoff:
- **Speed**: Off-chain matching enables sub-second execution
- **Accuracy**: Separate order books create temporary mispricing

This is the **structural edge** - the dislocation exists because:
1. Orders aren't matched atomically across both books
2. Market makers quote independently on each side
3. Liquidity imbalances create temporary gaps

### 2.3 Execution Mechanics

#### Token Structure
- **Collateral**: USDC.e on Polygon
- **Outcome tokens**: CTF ERC1155 tokens (YES and NO)
- **Condition ID**: Unique market identifier
- **Token IDs**: Separate IDs for YES and NO (clobTokenIds from Gamma API)

#### Order Types for Arbitrage

| Type | Behavior | Use Case |
|------|----------|----------|
| **GTC** | Good Till Cancelled | Standard resting orders |
| **FOK** | Fill or Kill | All-or-nothing arbitrage execution |
| **FAK** | Fill and Kill | Partial fills acceptable |
| **GTD** | Good Till Date | Time-limited quotes |

For arbitrage, **FOK** is preferred to avoid partial fills that break the strategy.

### 2.4 Complementary Order Books

Polymarket's CLOB uses a unique design where:
- YES and NO tokens are **complementary**
- Orders can be matched across both books simultaneously
- The exchange contract enables atomic swaps between tokens

**Key equations from docs:**
```
Fee calculation (selling):
feeQuote = baseRate × min(price, 1 - price) × size

Fee calculation (buying):
feeBase = baseRate × min(price, 1 - price) × size / price
```

Current fees: **0 bps** for both makers and takers (most markets)

---

## 3. Mathematical Framework

### 3.1 Kelly Criterion for Position Sizing

The Kelly Criterion helps determine optimal bet sizing to maximize long-term growth:

```
Kelly Fraction = (Edge × Win Probability) / Odds

Where:
- Edge = Expected profit per trade
- Win Probability = 1.0 (arbitrage is risk-free when executed)
- Odds = Capital required
```

For the CLOB arbitrage:
```
Sum = YES_ask + NO_ask
Profit = $1.00 - Sum
Return = Profit / Sum

Kelly Fraction = Return / (1 + Return)
```

**Example:**
```
YES ask: $0.64
NO ask: $0.35
Sum: $0.99
Profit: $0.01
Return: 1.01% (0.01 / 0.99)

Kelly Fraction ≈ 1% (conservative due to execution risk)
```

**Practical application**: Since execution isn't instant, use **fractional Kelly** (e.g., 1/4 or 1/8 Kelly) to account for:
- Execution timing risk
- Price movement between orders
- Partial fill risk

### 3.2 Fill Quality Metric

Measure execution quality to validate arbitrage performance:

```
Fill Quality = (Executed Price - Midpoint at Order Time) / Spread

Where:
- Midpoint = (Best Bid + Best Ask) / 2
- Spread = Best Ask - Best Bid

Interpretation:
- 0.0 = Executed at midpoint (perfect)
- -0.5 = Executed at bid (buying) or ask (selling)
- -1.0 = Executed worse than quoted spread
```

For arbitrage, target:
- Fill Quality > -0.3 on both legs
- Combined execution within 500ms
- Slippage < 10% of expected profit

### 3.3 Probability Term Structure

Time-to-resolution affects arbitrage frequency:

| Time to Resolution | Pattern | Arbitrage Frequency |
|-------------------|---------|---------------------|
| **> 30 days** | Momentum-driven | High (dislocations common) |
| **7-30 days** | Mixed | Medium |
| **< 7 days** | Mean-reversion | Lower (efficiency increases) |

**Implications:**
- Focus on markets 30+ days from resolution
- Avoid markets < 7 days (too efficient)
- Monitor news events that create volatility

### 3.4 Inventory Management

After executing arbitrage, you hold:
- 1 YES token
- 1 NO token

**These automatically sum to $1.00 at resolution**, but until then:
- Mark-to-market value fluctuates
- Capital is tied up
- Must hold until resolution to realize profit

**Hedge strategy**: Sell the more expensive side if mispricing reverses, hold the cheaper side.

---

## 4. Trading Rules & Heuristics

### 4.1 The "Trading vs Gambling" Tests

| Test | Threshold | Implementation |
|------|-----------|----------------|
| **Exit Before Resolution** | >80% positions exit early | Use limit orders to take profit before resolution |
| **Median Hold Time** | <6 hours = trading | Design for quick inventory turnover |
| **Position Size Consistency** | Scale with edge | Kelly-based sizing, not emotion |
| **Order Type Distribution** | >90% limit orders | Avoid market orders (taker fees + slippage) |
| **Profit Source** | Structural mispricing | Only trade verifiable edges, not predictions |

### 4.2 Arbitrage-Specific Rules

1. **Minimum Profit Threshold**: Only trade if sum < $0.98 (2%+ gross profit)
   - Accounts for execution costs
   - Provides buffer for slippage

2. **Execution Time Limit**: Both orders must fill within 500ms
   - Use FOK orders where possible
   - Monitor WebSocket for fill confirmation

3. **Maximum Position Size**: Limit by available liquidity
   - Never take >10% of order book depth
   - Avoid moving the market

4. **Inventory Limits**: 
   - Maximum 20% of capital tied up in unresolved positions
   - Rotate through markets to maintain liquidity

5. **Market Selection Criteria**:
   - Minimum $50k daily volume
   - Maximum 30 days to resolution
   - Active order book on both sides
   - No negative risk complications (for simplicity)

### 4.3 Risk Management

**Kill Switch Triggers**:
- Either leg doesn't fill within 1 second
- Price moves >5% against position
- Connection to CLOB lost
- Total daily loss >2% of capital

**Position Monitoring**:
- Real-time P&L via WebSocket user channel
- Automated alerts for open positions >24 hours
- Daily reconciliation of on-chain balances

---

## 5. Infrastructure Requirements

### 5.1 Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                    ARBITRAGE BOT ARCHITECTURE               │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   MARKET     │  │   SIGNAL     │  │  EXECUTION   │      │
│  │   SCANNER    │→ │   GENERATOR  │→ │    ENGINE    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ↑                                    ↓              │
│         └──────────┐    ┌────────────────────┘              │
│                    │    │                                   │
│  ┌─────────────────┴────┴─────────────────┐                │
│  │           DATA LAYER                    │                │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐│                │
│  │  │  CLOB    │ │  Gamma   │ │ On-chain ││                │
│  │  │   WS     │ │   API    │ │  RPC     ││                │
│  │  └──────────┘ └──────────┘ └──────────┘│                │
│  └─────────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Technical Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **API Client** | py-clob-client | Order entry, market data |
| **WebSocket** | websockets (Python) | Real-time orderbook |
| **Blockchain** | web3.py | On-chain settlement monitoring |
| **Data Store** | Redis | Orderbook cache, position tracking |
| **Task Queue** | Celery | Async order execution |
| **Monitoring** | Prometheus/Grafana | Metrics, alerting |
| **Wallet** | Private key + KMS | Secure signing |

### 5.3 Connection Requirements

```python
# CLOB Client Setup
from py_clob_client.client import ClobClient

client = ClobClient(
    host="https://clob.polymarket.com",
    key=PRIVATE_KEY,
    chain_id=137,  # Polygon
    signature_type=0,  # EOA
    funder=FUNDER_ADDRESS
)
client.set_api_creds(client.create_or_derive_api_creds())

# WebSocket for real-time data
import websockets

ws = await websockets.connect(
    "wss://ws-subscriptions-clob.polymarket.com/ws/market"
)
```

### 5.4 Token Approvals (Critical for EOA)

Before trading, set allowances for:

| Token | Address | Approve For |
|-------|---------|-------------|
| USDC.e | 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174 | Exchange contracts |
| Conditional Tokens | 0x4D97DCd97eC945f40cF65F87097ACe5EA0476045 | Exchange contracts |

Exchange contracts to approve:
- `0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E` (Main exchange)
- `0xC5d563A36AE78145C45a50134d48A1215220f80a` (Neg risk markets)
- `0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296` (Neg risk adapter)

### 5.5 Latency Optimization

| Strategy | Implementation | Expected Latency |
|----------|----------------|------------------|
| **Colocation** | AWS us-east-1 (Polygon region) | <50ms to nodes |
| **WebSocket** | Persistent connection, no polling | ~100ms updates |
| **Batch Orders** | postOrders() vs individual | 10x throughput |
| **Local Orderbook** | Maintain copy, apply deltas | <1ms access |

### 5.6 Data Flow

1. **Market Discovery** (Gamma API, every 60s)
   - Query active markets with volume > $50k
   - Filter by days to resolution (< 30)
   - Extract clobTokenIds for YES/NO

2. **Orderbook Monitoring** (WebSocket, continuous)
   - Subscribe to token_ids for candidate markets
   - Maintain local orderbook copy
   - Calculate YES + NO sums in real-time

3. **Signal Detection** (< 1ms)
   - Trigger when sum < $0.98
   - Validate liquidity depth
   - Calculate optimal position size

4. **Execution** (< 500ms)
   - Create FOK orders for both legs
   - Post batch order
   - Monitor WebSocket for fills

5. **Settlement Tracking** (on-chain)
   - Monitor for resolution events
   - Auto-redeem winning positions
   - Update P&L tracking

---

## 6. Complete Trading Workflow

### 6.1 Pre-Trade Setup

```python
# 1. Initialize clients
clob_client = ClobClient(...)
gamma_api = GammaAPIClient(...)
ws_client = WebSocketClient(...)

# 2. Load market universe
markets = gamma_api.get_active_markets(
    min_volume=50000,
    max_days_to_resolution=30
)

# 3. Subscribe to orderbooks
for market in markets:
    ws_client.subscribe(
        token_ids=[market.yes_token_id, market.no_token_id]
    )

# 4. Set token approvals (one-time)
approve_tokens(clob_client, token_addresses)
```

### 6.2 Signal Detection

```python
def detect_arbitrage(yes_book, no_book):
    yes_ask = yes_book.best_ask.price
    no_ask = no_book.best_ask.price
    
    total_cost = yes_ask + no_ask
    profit = 1.0 - total_cost
    
    if profit > MIN_PROFIT_THRESHOLD:  # e.g., 0.02
        return ArbitrageSignal(
            yes_token_id=yes_book.token_id,
            no_token_id=no_book.token_id,
            yes_price=yes_ask,
            no_price=no_ask,
            expected_profit=profit,
            yes_size=min(yes_book.best_ask.size, MAX_POSITION),
            no_size=min(no_book.best_ask.size, MAX_POSITION)
        )
    return None
```

### 6.3 Order Execution

```python
def execute_arbitrage(signal: ArbitrageSignal):
    # Create orders
    yes_order = OrderArgs(
        token_id=signal.yes_token_id,
        price=signal.yes_price,
        size=signal.yes_size,
        side=BUY
    )
    
    no_order = OrderArgs(
        token_id=signal.no_token_id,
        price=signal.no_price,
        size=signal.no_size,
        side=BUY
    )
    
    # Sign orders
    signed_yes = clob_client.create_order(yes_order)
    signed_no = clob_client.create_order(no_order)
    
    # Post batch
    response = clob_client.post_orders([
        {"order": signed_yes, "orderType": OrderType.FOK},
        {"order": signed_no, "orderType": OrderType.FOK}
    ])
    
    # Monitor fills
    return monitor_fills(response.order_ids, timeout_ms=500)
```

### 6.4 Post-Trade Management

```python
# Track open positions
positions = {
    market_id: {
        "yes_tokens": qty,
        "no_tokens": qty,
        "entry_sum": yes_price + no_price,
        "expected_payout": qty * 1.0,
        "resolution_date": date
    }
}

# Monitor for resolution
async def resolution_monitor():
    while True:
        for market_id, pos in positions.items():
            if market_resolved(market_id):
                redeem_tokens(market_id, winning_side)
                update_pnl(pos)
        await asyncio.sleep(60)
```

---

## 7. Open Questions & Challenges

### 7.1 Technical Challenges

1. **Execution Timing**
   - Can both orders fill atomically?
   - What happens if one fills and the other doesn't?
   - How to handle partial fills?

2. **Liquidity Fragmentation**
   - Order book depth varies significantly
   - Large trades move prices
   - Optimal position sizing is complex

3. **Inventory Risk**
   - Capital tied up until resolution
   - Opportunity cost of locked funds
   - Mark-to-market volatility before resolution

4. **Network Latency**
   - Polygon block times (~2s)
   - WebSocket reconnection handling
   - Race conditions with other bots

### 7.2 Market Structure Questions

1. **Competition**
   - How many other arbitrage bots are active?
   - Is the edge already competed away?
   - What is the actual frequency of opportunities?

2. **Negative Risk Markets**
   - How do conversions affect arbitrage?
   - Should these markets be excluded?
   - What is the gas cost of convert operations?

3. **Liquidity Rewards**
   - Do arbitrage trades qualify for maker rebates?
   - How do rewards affect net profitability?
   - Can we provide liquidity AND arbitrage?

### 7.3 Regulatory & Compliance

1. **Geographic Restrictions**
   - Polymarket blocks certain jurisdictions
   - VPN usage considerations
   - Compliance requirements

2. **Tax Implications**
   - How are arbitrage profits taxed?
   - Tracking cost basis for redeemed tokens
   - Reporting requirements

### 7.4 Operational Risks

1. **Smart Contract Risk**
   - Exchange contract has been audited (ChainSecurity)
   - But risk is never zero
   - UMA oracle resolution delays

2. **Key Management**
   - Private key security for trading wallet
   - API key rotation
   - Incident response procedures

3. **System Failures**
   - Bot crashes with open positions
   - Network partitions during execution
   - Data feed delays/incorrect data

---

## 8. References & Resources

### 8.1 Official Documentation

- **Polymarket Docs**: https://docs.polymarket.com
- **CLOB API**: https://docs.polymarket.com/developers/CLOB/introduction
- **Market Maker Guide**: https://docs.polymarket.com/developers/market-makers/introduction
- **Gamma API**: https://docs.polymarket.com/developers/gamma-markets-api/overview

### 8.2 GitHub Repositories

- **py-clob-client**: https://github.com/Polymarket/py-clob-client
- **ctf-exchange**: https://github.com/Polymarket/ctf-exchange
- **real-time-data-client**: https://github.com/Polymarket/real-time-data-client
- **Bankr OpenClaw Skills**: https://github.com/BankrBot/openclaw-skills

### 8.3 Smart Contract Addresses (Polygon)

| Contract | Address |
|----------|---------|
| CTF Exchange | 0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E |
| Neg Risk Exchange | 0xC5d563A36AE78145C45a50134d48A1215220f80a |
| Neg Risk Adapter | 0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296 |
| USDC.e | 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174 |
| Conditional Tokens | 0x4D97DCd97eC945f40cF65F87097ACe5EA0476045 |

### 8.4 API Endpoints

| Service | URL |
|---------|-----|
| CLOB REST | https://clob.polymarket.com |
| CLOB WebSocket | wss://ws-subscriptions-clob.polymarket.com |
| Gamma API | https://gamma-api.polymarket.com |
| RTDS | wss://ws-live-data.polymarket.com |

### 8.5 Key Concepts

- **CLOB**: Central Limit Order Book
- **CTF**: Conditional Token Framework (Gnosis)
- **ERC1155**: Multi-token standard for outcome tokens
- **EIP712**: Typed structured data signing
- **UMA**: Universal Market Access (oracle for resolution)
- **Neg Risk**: Negative risk markets for winner-take-all events

---

## 9. Conclusion & Next Steps

### 9.1 Strategy Viability Assessment

**Strengths:**
- Structural edge (not prediction-based)
- Zero fees on most markets
- Transparent, auditable mechanics
- Replicable across markets

**Risks:**
- Execution complexity
- Competition from other bots
- Capital efficiency challenges
- Inventory holding period

### 9.2 Recommended Next Steps

1. **Build MVP Bot**
   - Implement market scanner
   - Connect to CLOB WebSocket
   - Add basic signal detection

2. **Paper Trading**
   - Simulate trades without execution
   - Measure opportunity frequency
   - Validate profit assumptions

3. **Small Capital Test**
   - Deploy with $100-500
   - Execute 10-20 trades
   - Measure actual vs expected profit

4. **Scale Gradually**
   - Increase capital as edge is confirmed
   - Add more markets
   - Optimize execution latency

5. **Skill Development**
   - Create OpenClaw skill for Polymarket arbitrage
   - Integrate with Bankr for multi-chain operations
   - Build monitoring dashboard

### 9.3 OpenClaw Skill Proposal

A Polymarket arbitrage skill should include:
- `scan-markets`: Find arbitrage opportunities
- `execute-arbitrage`: Place paired orders
- `monitor-positions`: Track open inventory
- `redeem-winnings`: Auto-redeem at resolution
- `pnl-report`: Generate performance reports

The skill would leverage the existing py-clob-client and integrate with Bankr's wallet infrastructure for seamless multi-chain operations.

---

*This research document was compiled from official Polymarket documentation, GitHub repositories, and ecosystem tooling analysis. All data current as of February 2026.*
