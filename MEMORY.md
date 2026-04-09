# Long-Term Memory

## Repository Access

My workspace repo and any others I have push access to:

| Repository | URL | Access Identity | Method | Notes |
|------------|-----|-----------------|--------|-------|
| baxter-repo | https://github.com/jonahkoch/Baxter | baxter@openclaw | SSH key | My primary workspace repo — stores scripts, configs, docs |

**Key location:** SSH key already configured in environment

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

## Skills Created

- `skills/meta-reasoning/` - Structured deep-thinking framework for complex problems

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
