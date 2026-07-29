# Long-Term Memory

## Troubleshooting Notes

### "Something went wrong" + High Token Costs
**Date:** 2026-06-01  
**Cause:** Moonshot TPM rate limit set to 6 tokens/minute. Every request exceeded it instantly.  
**Symptoms:** Repeated "⚠️ Something went wrong while processing your request" errors, higher-than-normal token costs (failed/retried requests still burn tokens).  
**Fix:** Bumped Default Rate Limit from 6 → 200,000 TPM. Errors stopped immediately.  
**Prevention:** If this error pattern appears again, check TPM first before looking at API keys or model issues.

## Tools & Infrastructure

### ClawPod (Massive Proxy Network)
**Status:** Tabled — available for future use if needed
**What it is:** Residential proxy network skill for OpenClaw agents
**Use case:** Bypass bot detection, CAPTCHAs, and rate limits when doing deep web browsing
**Pricing:** ~$3.50/GB, 50GB free trial available
**Why shelved:** Current Brave API + basic browser tools sufficient for now; ClawPod is overkill for light research
**Reference:** https://clawpod.joinmassive.com

## Research Projects

### Polymarket Trading Analysis (Feb 2026)
Explored prediction market trading strategies. Comprehensive research completed, tabled for future.
- **Key finding:** Pure arbitrage requires HFT infrastructure; not viable for retail
- **Alternative:** Value-based strategies with domain expertise may work
- **Docs:** `memory/polymarket-research-summary.md` (master index), `polymarket-arbitrage-research.md`, `polymarket-operations-research.md`, `polymarket-retail-viability.md`
- **Status:** Tabled pending new information

## Active Projects

### Kochfoto AI Agents
**Project path:** `projects/kochfoto-ai-agents/`  
**Action Plan:** `action-plan.md` | **Skill:** `skills/kochfoto-agents/`  

Building three autonomous AI agents for Kochfoto wedding photography business:
1. **Research Agent** — Market intelligence, competitor tracking, venue partnerships
2. **Content Agent** — Blog posts, Instagram captions, newsletters, vendor spotlights  
3. **Operations Agent** — Lead email triage, client meeting prep, weekly reporting

**Status:** Framework created, ready for Phase 1-3 implementation (pick based on priority)

**How to work on this:**
1. Say "work on kochfoto agents" or "resume agent work" to load the skill
2. Read `action-plan.md` to see current phase and session log
3. Pick a phase and work incrementally
4. Update the session log when done

---

### Social Credibility System (socialCredSystem)
**Repository:** https://github.com/jonahkoch/Baxter  
**Project path:** `projects/social-credibility-system/`  
**Docs:** `architecture.md` | **Action Plan:** `action-plan.md` | **Skill:** `social-credibility-work` | **Contract:** `recovery.ak`

Non-repudiable social posts on Cardano using CIP-25 NFTs with hash-chain integrity and optimistic recovery mechanism.

**Key decisions:**
- CIP-25 immutable tokens for posts (no edits)
- Hash-chain linking via `prev_post_hash` for tamper detection
- Recovery bond: 50 ADA, 7-day challenge window
- Merkle proofs for on-chain challenge verification

**Open questions:**
1. Merkle tree construction at mint time (~32 bytes/post overhead)
2. CIP-25 metadata schema formalization
3. Economic simulation for bond/window parameters
4. Watchtower incentives (who runs challengers?)

**How to work on this:**
1. Say "use the social-credibility-work skill" to load context
2. Read `action-plan.md` to see current phase and session log
3. Pick a phase and work incrementally
4. Update the session log when done

---

## Skills Created

- `skills/meta-reasoning/` - Structured deep-thinking framework for complex problems
- `skills/social-credibility-work/` - Incremental work on Social Credibility System project

## Wallet & DeFi Operations

**Status:** Setting up
**Principle:** _Never act without checking state first_

### Memory Structure
- `memory/wallet/wallet-state.md` — Master balance/position snapshot
- `memory/wallet/tx-log.md` — All on-chain transactions
- `memory/wallet/session-handoff.md` — Context switch summaries

### Session Continuity Protocol
1. **Before any wallet action:** Read wallet-state.md
2. **After any wallet action:** Update wallet-state.md + tx-log.md
3. **On context limit:** Write session-handoff.md with pending actions
4. **New session:** Read all wallet files before any operations

### Safety Rules
- Never assume positions from memory — always verify on-chain
- No concurrent operations (check for pending txs)
- All operator skills require explicit confirmation
- Small test amounts before large operations

---

## Cardano / Web3 Side Hustle

Separate from Kochfoto photography business. Projects:

### OJonah / Tone Deaf
- NFT project: meme-to-mint platform
- Website: https://ojonah.io
- Status: Live, GitHub repo access needed
- Notes: `memory/cardano/ojonah.md`

### blockVote / PactVote
- Governance dApp for Cardano DReps
- Website: https://pactvote.com
- GitHub: https://github.com/jonahkoch/block-vote
- Status: Phase 3 (Fracada integration in progress)
- Notes: `memory/cardano/pactvote.md`

### DeFi Resources
- **Cardano DeFi Skills** — Community-curated knowledge base for Cardano DeFi development  
  Repo: https://github.com/Flux-Point-Studios/cardano-defi-skills

**Separation principle:** Keep Kochfoto (IRL business) and Cardano (Web3 side hustle) contexts distinct. Invoke separately.

## Security Assessments

### Capability Evolver (clawhub.ai/autogame-17/capability-evolver)
**Date:** Feb 11, 2026  
**Verdict:** HIGH RISK — Do not use

**What it claims:** Self-improving agent that reads memory/logs and autonomously writes code patches

**Why it's dangerous:**
1. Self-modifying agents break principle of least privilege
2. Reads sensitive files (MEMORY.md, USER.md, .env, session logs)
3. "Mad Dog Mode" executes changes immediately without review
4. Developer hardcoded their own Feishu token in source (since "fixed")
5. Developer dismissed security concerns with defensive/hostile attitude

**Key quote from dev:** "That is literally what a self-evolution engine does" — missing the point that this is the problem

**Recommendation:** Skip entirely. Risk of workspace corruption or data exfiltration outweighs any benefit.
