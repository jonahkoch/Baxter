# BlockchainEvents Reference — PactVote & Governance

**Last updated:** 2026-08-01  
**Source:** Dave's `OgmiosDotnet.BlockchainEvents v1.0.0`  
**Repo:** https://github.com/ItsDaveB/OgmiosDotnet.BlockchainEvents  
**Release:** https://github.com/ItsDaveB/OgmiosDotnet.BlockchainEvents/releases/tag/v1.0.0

---

## What It Is

A rule-based transaction filtering, pub/sub, and event delivery layer for Cardano.

- Connects to **Ogmios** (Cardano node WebSocket)
- Evaluates every transaction against **customizable rules**
- Emits matching transactions as **CloudEvents 1.0** via HTTP, gRPC, SSE, or Dapr pub/sub
- **Durable queue** — if your consumer is offline, events wait; delivery resumes automatically
- **Performance:** 1,100+ TPS, ~1ms p99 latency in Docker stress tests

**Key insight:** This is a **push-based event delivery layer**, not a query API or database. You don't ask it for data — it tells you when something happens.

---

## What It Is NOT

| ❌ NOT This | ✅ Instead Use |
|-------------|----------------|
| A database | No persistence; events are forwarded, not stored |
| A query API | You can't ask "what happened yesterday?" |
| A replacement for Blockfrost/Koios | Complements them; use those for historical lookups |
| An indexer | No searchable database of transactions |

**Combined dual-purpose insight:** BlockchainEvents provides *both* the event notification ("something happened") *and* the full transaction payload ("here's all the data about what happened"). You get a real-time trigger **plus** comprehensive context in a single push. This is different from many event systems that only send a pointer/ID and force you to query elsewhere for details.

---

## Data Items Per Event (~35 fields)

### CloudEvents Standard Envelope (8 fields)
1. `specversion` — always "1.0"
2. `id` — unique event ID
3. `source` — origin URI (e.g., `cardano://mainnet/slot/115545883/block/abc123...`)
4. `type` — which rule matched (e.g., `io.cardano.transaction.governance-treasury`)
5. `subject` — human-readable rule name
6. `time` — RFC 3339 timestamp
7. `datacontenttype` — `application/json`
8. `dataschema` — schema reference URL

### Cardano-Specific Extensions (5 fields)
9. `cardanoslot` — absolute slot number
10. `cardanoblock` — block hash
11. `cardanoblockheight` — block height
12. `cardanoera` — e.g., "Conway"
13. `cardanonetwork` — mainnet / preprod / preview

### Data Payload — Match Summary (7 fields)
14. `transactionId`
15. `slot`
16. `blockHeight`
17. `blockHash`
18. `ruleId`
19. `ruleName`
20. `matchedCriteria` — **rule-specific match details** (e.g., which addresses matched, which policy IDs triggered)

### Full Transaction Object (15 fields)
21. `id` — transaction hash
22. `slot`
23. `blockHash`
24. `blockHeight`
25. `index` — position within block
26. `fee` — lovelace
27. `inputAddresses` — array
28. `outputAddresses` — array
29. `mintedAssets` — object (policy IDs → asset names/quantities)
30. `metadata` — object (label → value, e.g., CIP-20, CIP-25)
31. `hasGovernanceAction` — boolean
32. `hasTreasuryWithdrawal` — boolean
33. `hasStakeDelegation` — boolean
34. `hasStakeRegistration` — boolean
35. `hasVote` — boolean

---

## Built-In Rules

| Rule | What It Filters |
|------|-----------------|
| `AddressMatch` | Wallet addresses or prefixes |
| `PolicyIdAsset` | Policy IDs and asset names |
| `MetadataKeyValue` | Metadata labels and patterns |
| `GovernanceTreasury` | Governance actions, votes, treasury withdrawals |
| `AllTransactions` | Everything (testing/capture) |

### Governance Example Config
```json
"GovernanceTreasury": {
  "Enabled": true,
  "IncludeGovernanceActions": true,
  "IncludeTreasuryWithdrawals": false,
  "IncludeDelegations": false,
  "IncludeStakeRegistrations": false,
  "IncludeVotes": true
}
```

---

## Consumption Models — How You Receive Events

| Method | Pattern | Best For |
|--------|---------|----------|
| **HTTP Webhook** | BlockchainEvents POSTs to your endpoint | Serverless, lightweight consumers |
| **gRPC Streaming** | Your app subscribes, server streams events | Real-time dashboards, persistent services |
| **SSE (Server-Sent Events)** | Browser/client connects to `/events/stream` | Frontend dashboards, prototyping |
| **Dapr Pub/Sub** | Publishes to Dapr topic, your app subscribes | Multiple consumers, guaranteed delivery |

---

## Governance Assessment Pipeline — Current vs. BlockchainEvents

### Current: Epoch Check (Batch)
- Pull everything every ~5 days
- Static snapshot of votes
- Fixed assessment cycle
- Blind to mid-epoch developments

### With BlockchainEvents (Stream)
- Notified within ~1 second of on-chain activity
- Live vote count as it changes
- Triggered workflows — assess immediately
- **Mid-epoch threshold tracking** — see if a proposal is nearing its constitutional threshold before the epoch ends

**Key benefit:** Time-to-assessment drops from "whenever the batch job runs" to "immediately upon detection."

---

## PactVote Integration Ideas

### Immediate (No BlockchainEvents Needed)
Hidden DRep activity page using Blockfrost/Koios:
- DRep summary card (voting power, delegator count, registration status)
- Active proposals (currently open for voting)
- Your voting history (past votes with positions)
- Pack activity (collective positions if members have voted)

**No database required for MVP** — query APIs on page load.

### Later (With BlockchainEvents)
Add real-time features:
- "New proposal" alert banner
- Live vote count updating on screen
- "Your vote confirmed" toast notification
- Triggered assessment workflow (proposal arrives → review task created)

---

## Specific Governance Use Cases

### New Proposal Detection
GovernanceTreasury rule with `IncludeGovernanceActions: true` catches CIP-1694 proposals as they hit the chain. Route to assessment queue immediately.

### Vote Monitoring
Track your DRep's votes in real-time. Confirm vote landed on-chain. Monitor voting period transitions.

### Deadline Management
With streaming events, build epoch-aware alerts: *"Voting closes in 2 epochs on proposal X — assessment incomplete."*

### Vote Trajectory Analysis
**Mid-epoch threshold tracking** — watch support accelerate or collapse in real-time instead of discovering it at the next batch run.

---

## Social Credibility System Connection

The hash-chain validation logic gets cleaner:
- Filter for your policy ID + metadata structure instead of scanning blocks yourself
- Events flow in as CloudEvents, validator just processes the payload
- Recovery mechanism (challenge window, Merkle proofs) could trigger on specific event patterns

---

## Stack Architecture

```
Cardano Node ──► Ogmios ──► BlockchainEvents ──► Your App
                              (rule engine)
                              (CloudEvents)
                              (delivery hub)
```

| Layer | Role |
|-------|------|
| Ogmios | Raw chain sync from Cardano node |
| BlockchainEvents | Filter, transform, deliver |
| Your App | Consume CloudEvents via HTTP/gRPC/SSE/Dapr |
| Blockfrost/Koios | Historical queries (complementary) |

---

## Deployment

```bash
# Run with governance example config
./examples/run-example.sh governance

# Or directly
WORKER_APPSETTINGS=./examples/governance/appsettings.json docker compose up --build
```

**Post-startup endpoints:**
- Worker health: `http://localhost:4000/health`
- Live events (SSE): `http://localhost:4000/events/stream`
- Event viewer: `http://localhost:4020` (all) / `4021` (metadata) / `4022` (governance)
- Grafana: `http://localhost:4002`

---

## Open Questions / Next Steps

1. **Dual-filter setup:** Sketch `appsettings.json` for all governance actions + DRep address-specific votes simultaneously
2. **Transition plan:** Run epoch checks + BlockchainEvents in parallel, then phase out batch
3. **PactVote hidden page:** Design components using Blockfrost/Koios first, add real-time later
4. **Custom rules:** Would we need domain-specific rules beyond built-ins for PactVote pack coordination?
5. **Infrastructure cost:** Compare running own Ogmios + BlockchainEvents vs. Demeter hosted

---

## Key Quotes / Mental Models

> "BlockchainEvents is push, not pull — your app receives events rather than asking for them."

> "BlockchainEvents = event/notification layer. Blockfrost/Koios = data/historical query layer. They complement but don't replace each other."

> "Combined dual purpose: you get the real-time trigger AND the full transaction payload in one push."

> "Mid-epoch threshold tracking: see if a proposal is nearing its constitutional threshold before the epoch ends."

---

## Links

- **Repo:** https://github.com/ItsDaveB/OgmiosDotnet.BlockchainEvents
- **Release:** https://github.com/ItsDaveB/OgmiosDotnet.BlockchainEvents/releases/tag/v1.0.0
- **Dave's tweet:** https://x.com/itsdave_ada/status/2083529870584226143
- **Ogmios:** https://ogmios.dev/
- **CloudEvents:** https://cloudevents.io/
- **PactVote:** https://pactvote.com
