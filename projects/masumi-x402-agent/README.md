# Masumi x402 Proposal Reviewer Agent

A monetized AI agent for reviewing Cardano governance proposals via the Masumi x402 payment standard on Cardano.

## Status: Working Prototype ✅ (Preprod)

**Last Updated:** 2026-07-15  
**Network:** Cardano Preprod (testnet)  
**Next:** Clarify Sokosumi listing requirements with Masumi team

---

## What It Does

Evaluates Cardano governance proposals (govActions) using a 3-layer rubric:

1. **Priority & Fit** — Is this a real Treasury priority? Public value? Instrument fit?
2. **Proposal Quality** — Basics, value impact, execution accountability, commercial terms
3. **Deep Scoring** — Problem clarity, solution quality, team credibility, risk management

Returns a scored verdict (0-100) with confidence level and conditions for support.

**Price:** 3.5 ADA per review (Preprod) / 3.5 USDM target (Mainnet)

---

## Architecture

```
Buyer (via Sokosumi or direct API)
    ↓
POST /start_job → creates payment request
    ↓
Masumi Payment Service (escrow on Cardano blockchain)
    ↓
Funds locked → Agent runs rubric assessment
    ↓
Result submitted → Payment released to seller
```

---

## Files

| File | Description |
|------|-------------|
| `proposal-reviewer/server.js` | MIP-003 compliant agent service |
| `proposal-reviewer/package.json` | Dependencies |
| `SKILL.md` | Reusable skill for future Masumi setups |
| `quick-reference.md` | Cheatsheet with one-liners |
| `README-KOCHFOTO.md` | Complete setup guide |
| `SESSION-LOG.md` | Session notes and decisions |

---

## Quick Start

```bash
# 1. Install dependencies
cd proposal-reviewer && npm install

# 2. Set environment
cp .env.example .env
# Edit: AGENT_IDENTIFIER, PAYMENT_SERVICE_URL, PAYMENT_API_KEY

# 3. Start agent
node server.js
# Runs on http://localhost:8080

# 4. Test
curl http://localhost:8080/availability
curl http://localhost:8080/demo
```

---

## Testing

### Test with sample proposal
```bash
curl -s -X POST http://localhost:8080/test_review \
  -H "Content-Type: application/json" \
  -d '{
    "input_data": [
      {"key": "proposal_text", "value": "Your proposal text here..."},
      {"key": "proposal_type", "value": "TreasuryWithdrawals"},
      {"key": "requested_ada", "value": "1000000"},
      {"key": "applicant", "value": "Team Name"}
    ]
  }'
```

### Test with real govAction ID
Provide any Cardano govAction ID (e.g., `gov_action1...`) and the agent will:
1. Fetch proposal metadata from blockchain
2. Run rubric assessment
3. Return scored verdict

---

## Production Checklist

- [ ] Deploy to public server (HTTPS)
- [ ] Update registry with public URL
- [ ] Switch to mainnet wallets
- [ ] Get mainnet Blockfrost API key
- [ ] Change pricing to USDM (3.5 USDM = $3.50)
- [ ] Set up managed payment service (or self-host)
- [ ] List on Sokosumi marketplace
- [ ] Set up monitoring/alerting

---

## Resources

- [Masumi Docs](https://www.masumi.network/dev/masumi/documentation)
- [Sokosumi](https://app.sokosumi.com)
- [Blockfrost](https://blockfrost.io)
- [MIP-003 Spec](https://www.masumi.network/dev/masumi/documentation/technical-documentation/agentic-service-api.md)

---

Built by Jonah Koch (Kochfoto) with assistance from Baxter AI Agent.
