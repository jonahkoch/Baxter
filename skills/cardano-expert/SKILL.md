---
name: cardano-expert
description: Cardano blockchain ecosystem expert for querying current state, historical data, and ecosystem information. Use when the user asks about Cardano blockchain data including current epoch/slot/block, address balances, transaction history, stake pools, governance (DReps, proposals, voting), protocol parameters, or any on-chain information. Also use for Cardano ecosystem questions about tokens, NFTs, DeFi protocols, or network statistics.
---

# Cardano Expert

Query the Cardano blockchain for current state, historical data, and ecosystem information.

## When to Use

- Current blockchain state (epoch, slot, latest block, protocol params)
- Address/UTXO lookups (balances, transaction history, staking status)
- Stake pool queries (delegation, performance, retirements, metadata)
- Governance data (DReps, proposals, voting state, constitution)
- Historical data (past epochs, blocks, transaction details)
- Token/NFT information (policy IDs, metadata, supply)
- Network statistics (transaction volume, fees, decentralization metrics)

## APIs Available

### Blockfrost (Primary)
- **Docs**: See [references/blockfrost-api.md](references/blockfrost-api.md)
- **Best for**: General queries, address data, transactions, assets
- **Requires**: API key (set via BLOCKFROST_API_KEY env var)
- **Networks**: mainnet, preprod, preview

### Koios (Secondary)
- **Docs**: See [references/koios-api.md](references/koios-api.md)
- **Best for**: Pool data, governance, complex SQL-like queries
- **No API key required** (community hosted)
- **Networks**: mainnet, guild, preprod, preview

## Quick Reference

### Current Network State
```bash
# Blockfrost - latest block
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/blocks/latest" \
  -H "project_id: $BLOCKFROST_API_KEY"

# Koios - current tip
curl -s "https://api.koios.rest/api/v1/tip"
```

### Address Balance
```bash
# Blockfrost
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/addresses/<address>" \
  -H "project_id: $BLOCKFROST_API_KEY"
```

### Transaction Details
```bash
# Blockfrost
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/txs/<tx_hash>" \
  -H "project_id: $BLOCKFROST_API_KEY"
```

### Stake Pools
```bash
# Koios - active pools
curl -s "https://api.koios.rest/api/v1/pool_list"

# Blockfrost - specific pool
curl -s "https://cardano-mainnet.blockfrost.io/api/v0/pools/<pool_id>" \
  -H "project_id: $BLOCKFROST_API_KEY"
```

### Governance
```bash
# Koios - active proposals
curl -s "https://api.koios.rest/api/v1/proposal_list?state=active"

# Koios - DRep list
curl -s "https://api.koios.rest/api/v1/drep_list"

# DRep rankings by live stake (outputs CSV)
python3 scripts/drep_rankings.py 210 dreps_top_210.csv
```

## Helper Scripts

Use scripts in `scripts/` for common operations:

- `scripts/query_address.sh <address>` - Address balance and UTXOs
- `scripts/query_tx.sh <tx_hash>` - Transaction details with inputs/outputs
- `scripts/query_pool.sh <pool_id>` - Pool information and delegation
- `scripts/current_epoch.sh` - Current epoch and network info
- `scripts/governance_status.sh` - Active proposals and voting
- `scripts/drep_rankings.py [count] [output_file]` - Top N DReps by live stake (outputs CSV)

## Key Concepts

See [references/cardano-concepts.md](references/cardano-concepts.md) for:
- Address types (base, enterprise, reward/pointer)
- UTXO model explanation
- Epoch/slot timing
- Staking and delegation mechanics
- Governance framework (CIP-1694)
- Native tokens vs NFTs

## Working with Policy IDs

Policy IDs identify token/NFT collections:
- Format: 56-character hex string
- Query assets: `/api/v0/assets/{policy_id}` (Blockfrost)
- Query policy assets: `/api/v0/assets/policy/{policy_id}` (Blockfrost)

## Error Handling

Common API errors:
- `404` - Address/tx/pool not found (may be invalid or not yet indexed)
- `403` - Invalid or missing API key (Blockfrost)
- `429` - Rate limit hit (add delays between requests)
- `5xx` - Server error (retry or try alternate API)

## Best Practices

1. **Prefer Koios** for public data (no key needed, higher rate limits)
2. **Use Blockfrost** for address-specific queries and when you have a key
3. **Cache results** for expensive queries (use exec with caching)
4. **Paginate** large result sets (Blockfrost: `count`/`page` params)
5. **Handle 404s gracefully** - not all addresses/txs are indexed immediately

## Governance Action Assessment (DRep Rubric)

When Jonah asks to assess a governance action (e.g., `gov_action12sumv9...`), use the following workflow based on his DRep Treasury Assessment Rubric v1.2 (derived from v17 Rule Book).

### Assessment Workflow

1. **Fetch proposal data** from Koios:
   ```bash
   curl -s "https://api.koios.rest/api/v1/proposal_list?limit=100" | \
     python3 -c "import sys,json; d=json.load(sys.stdin); \
     m=[p for p in d if p.get('proposal_id')=='<GOV_ACTION_ID>']; \
     print(json.dumps(m, indent=2))"
   ```

2. **Fetch IPFS metadata** if available:
   ```bash
   curl -s "https://ipfs.io/ipfs/<CID>"
   ```

3. **Apply the Two-Layer Framework:**

   **Layer 0 — Priority & Fit Screen (6 questions):**
   - Is this a real Treasury priority?
   - What public value does Cardano receive? (use Five Forms of Public Return)
   - Is the instrument appropriate?
   - Does this increase or decrease decentralization?
   - What's the opportunity cost?
   - Does this create productive ecosystem effects?

   **Layer 1 — Proposal Quality (if Layer 0 passes):**
   - Section A: Basics (accountable applicant, clear ask, itemized budget, prior funding disclosure, conflict disclosure)
   - Section B: Value & Impact (public asset quality, productive public value, additionality, critical gap, counterfactual harm, retained impact)
   - Section C: Execution & Accountability (team evidence, milestones, independent verification, anti-gaming, enforceability)
   - Section D: Commercial proposals — require repayment, revenue share, Treasury-owned assets, matched funding, or strong public asset transfer
   - Section E: Marketing & Adoption — pay for retained impact + public rights, not attention/vanity metrics
   - Section F: Decentralization Delta (positive / neutral / negative-justified / negative-unjustified)
   - Section G: Risk & Sustainability (ADA volatility discipline, risk register, margin of safety, sustainability, operator reality)
   - Section H: Subsidy-Loop & Dependency-Graph Check

4. **Classify request size** (Small/Medium/Large/Very large/Systemic) before scoring.

5. **Apply score override discipline** — high score with wrong instrument = No; passing score with failed hard gate = No; missing info = No or Abstain.

6. **Map to vote:** Yes / No / Abstain with specific rationale.

### Five Forms of Public Return

| Return Form | Examples | What Must Be Durable |
|-------------|----------|---------------------|
| **Public asset** | Code, standard, research, documentation, curriculum, data | Rights, license, provenance, usability, maintenance or fork/transfer path |
| **Public service** | Monitoring, maintenance, assurance, education, governance support | Service level, access, accountability, records, quality controls |
| **Institutional capacity** | Skills, processes, stewardship, independent capability | Transferability, succession, plural participation |
| **Public learning** | Research findings, pilots, negative results, test data | Method transparency, evidence quality, reusable lessons |
| **Avoided loss** | Lower security, constitutional, operational, legal risk | Credible threat model, baseline, response capability |

### Mixed-Proposal Rule

If a proposal combines public-good work with commercial benefit:
- Separate material workstreams, budgets, milestones, risks, rights
- Score each under its matching scorecard
- Each must pass its own hard gates
- Commercial upside cannot hide inside public-good labels
- Do not average a failed workstream into a passing score
- If the applicant cannot separate → **No**

### Scorecard Selection (v17)

| Proposal Type | Scorecard |
|--------------|-----------|
| Pure public good / civic service | Public-Good and Civic-Service |
| Open-source infrastructure, API, protocol | Commercial/Hybrid/Infrastructure (public asset as principal return) |
| Hybrid public/commercial | Commercial/Hybrid/Infrastructure (separate public/private value) |
| Private commercial expansion | Commercial/Hybrid/Infrastructure (higher return minimum) |
| Liquidity, DeFi, RWA | Commercial/Hybrid/Infrastructure (with systemic-risk overlays) |
| Marketing, events, media | Marketing and Adoption (retained impact, not vanity) |
| Frontier experiment | Matching output scorecard (only if small, failure is cheap) |

### Output Format

Save the assessment to `projects/cardano/drep-votes/<gov_action_id>.md` using this structure:
- **Proposal ID, Type, Amount, Status**
- **Summary** (what it does in 2-3 sentences)
- **Key Details** (deliverables, timeline, budget breakdown, governance structure)
- **Assessment** (strengths, concerns, comparison to prior proposals if applicable)
- **Vote Recommendation** (Yes/No/Abstain with specific reasoning)
- **Data sources** (Koios, IPFS, etc.)

**Vote Rationale Formatting Constraints (CRITICAL):**
When writing final vote rationales and summaries that Jonah will publish on-chain:

1. **The detailed assessment** can use any format: bullets, dashes, tables, special characters as needed for clarity.
2. **The vote rationale and summary must be plain prose only:** no bullets, no dashes, no special characters. Use only sentences and paragraphs.
3. **A 300 character summary** must accompany every vote. This is published on-chain alongside the vote. MUST be under 300 characters. Count carefully.
4. **Single file per gov_action** containing: detailed assessment (any format) + vote rationale (plain prose) + 300 character summary (plain prose).
5. **Save to:** `projects/cardano/drep-votes/<gov_action_id>.md`
6. **Structure:**
   - Proposal Overview (any format)
   - Current Voting Status (any format)
   - Detailed Assessment (any format: bullets, tables, etc.)
   - Vote Rationale (full prose explanation, no bullets, no dashes, no special characters)
   - Vote Summary (300 character max, plain sentences only)

**Rationale templates (prose only, no formatting):**
- **Yes:** "I am voting Yes on this proposal. This clears my public value public asset and accountability checks. Cardano receives specific durable deliverables and the price is justified by benchmark comparisons."
- **No:** "I am voting No on this proposal. While I acknowledge the intent this proposal fails on specific issue. To earn my support the applicant would need to make specific changes."
- **Abstain:** "I am voting Abstain. I cannot make a reliable Yes or No judgment because specific reason. Abstain is not support."

---

## Network Selection

Default to **mainnet** unless user specifies otherwise:
- Blockfrost: Change subdomain (`cardano-mainnet`, `cardano-preprod`, `cardano-preview`)
- Koios: Change path (`/api/v1/` vs `/api/v1/preprod/`, `/api/v1/preview/`)
