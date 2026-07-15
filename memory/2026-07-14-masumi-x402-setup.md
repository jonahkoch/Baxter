# Masumi x402 Setup Session — 2026-07-14

## What Was Accomplished

### 1. Masumi Payment Service (Self-Hosted Node)
- **Location:** `/root/.openclaw/workspace/masumi-payment-service/`
- **Status:** ✅ Running on localhost:3001
- **Database:** PostgreSQL 16, migrated and seeded
- **API Docs:** http://localhost:3001/docs
- **Admin Dashboard:** http://localhost:3001/admin

### 2. Cardano Treasury Proposal Reviewer Agent
- **Location:** `/root/.openclaw/workspace/agents/proposal-reviewer/`
- **Status:** ✅ Running on localhost:8080
- **MIP-003 Compliant:** Yes
- **Function:** Evaluates Cardano governance proposals using 3-layer rubric
- **Price:** 3.5 ADA per review

### 3. On-Chain Registration
- **Agent ID:** `7e8bdaf2b2b919a3a4b94002cafb50086c0c845fe535d07a77ab7f77545d7326645aba0b34944c7cc7e4eccaa95f1c22549d4a3f465d103b3ceb2264`
- **State:** RegistrationInitiated (NFT minted)
- **Network:** Preprod

### 4. Wallets Funded
| Wallet | Address | Balance |
|--------|---------|---------|
| Purchase | addr_test1qpfsnt02re368... | 100 ADA |
| Selling | addr_test1qzvqya73gkx... | 100 ADA |
| Collection | addr_test1qp36mncp59... | 10 ADA |

### 5. Tested Full Flow
- ✅ Job creation (POST /start_job)
- ✅ Payment request generation
- ✅ Blockchain identifier returned
- ✅ Demo output verified

## Key Learnings

1. **Preprod requires self-hosting** — No managed preprod service exists
2. **MIP-003 time constraints are strict** — Must maintain ≥5min/≥15min gaps between payByTime/submitResultTime/unlockTime
3. **identifierFromPurchaser must be 14-26 char hex** — Not arbitrary strings
4. **Fixed pricing uses `RequestedFunds: null`** — Price set in registry NFT
5. **Multiple stale processes cause confusion** — Always kill old instances before restarting

## Files Created

- `masumi-payment-service/README-KOCHFOTO.md` — Complete setup guide
- `skills/masumi-x402-setup/SKILL.md` — Reusable skill for future setups
- `skills/masumi-x402-setup/quick-reference.md` — One-liners and cheatsheet
- `agents/proposal-reviewer/server.js` — Working MIP-003 agent example
- `memory/2026-07-14-masumi-x402-setup.md` — This file

## Testing Completed

### Test 1: Standalone Worker
- **Script:** `/tmp/test-worker.js`
- **Result:** Eternl Wallet proposal → Score 84/100, Verdict: YES
- **Execution time:** 2ms

### Test 2: Real Cardano Governance Proposal
- **govAction ID:** `gov_action1fdatlfcdnzzcw5x9pnt9r42v992nqw65zze57s8tyk0jll78eyusqccn9gc`
- **Proposal:** Cardano Builder DAO (₳20M)
- **Result:** Score 83/100, Verdict: YES, Confidence: High
- **Execution time:** 3ms
- **Assessment:** Strong track record (11.1M ADA distributed), independent oversight, KPI alignment, treasury return proven

## Next Steps (Paused — Awaiting Masumi Meeting)

1. **Clarify Sokosumi listing requirements** — Meeting with Masumi team scheduled
2. **Update pricing to USDM** — Currently 3.5 ADA, target is 3.5 USDM
3. **Deploy to permanent server** — Replace loca.lt tunnel with real hosting
4. **Switch to mainnet** — New wallets, Blockfrost mainnet key, managed payment service
5. **List on Sokosumi** — Resume after clarification

## Status: Working Prototype Complete ✅

| Component | Status |
|-----------|--------|
| Masumi Payment Node | ✅ Running (localhost:3001) |
| Proposal Reviewer Agent | ✅ Running (localhost:8080) |
| On-Chain Registration | ✅ NFT minted on Preprod |
| Public Tunnel | ✅ https://breezy-donuts-beg.loca.lt (temporary) |
| Worker Tested | ✅ 2 real proposals assessed |
| Documentation | ✅ Complete |
| Skill Created | ✅ masumi-x402-setup |
| Sokosumi Listing | ⏸️ Paused pending Masumi meeting |

## Dependencies

- Node.js 22.22.0
- PostgreSQL 16
- pnpm 10.30.2
- Blockfrost Preprod API key
- Test ADA from faucet

## Commands

```bash
# Start everything
bash /tmp/restart-agent.sh  # Agent
cd masumi-payment-service && pnpm run dev  # Payment service

# Check status
curl http://localhost:3001/api/v1/health
curl http://localhost:8080/availability
```
