# blockVote / PactVote

**Website:** https://pactvote.com  
**GitHub:** https://github.com/jonahkoch/block-vote  
**Network:** Cardano (Preprod/Preview testnets)  
**Project Type:** Governance dApp

## Overview

coLab project enabling collective governance voting through NFT fractionalization. Governance action NFTs are fractionalized using Fracada, with tokens distributed to qualified DRep members for democratic voting.

## Problem & Solution

**Problem:** Small DReps cannot assess if their participation in Cardano governance has impact.

**Solution:** Block voting — qualified members vote as a unified pack, amplifying their collective voice.

## Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 16 + React 19 + TypeScript |
| Styling | Tailwind CSS |
| Cardano Integration | Mesh SDK v1.9 |
| Smart Contracts | Fracada (NFT fractionalization) + Custom governance |
| Infrastructure | Public Cardano Testnets + Demeter.run |

## Development Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| 1: Research & Planning | ✅ Complete | Fracada research, Mesh SDK analysis, architecture design |
| 2: Foundation | ✅ Complete | Next.js + TypeScript + Tailwind, Mesh SDK integration, wallet connection |
| 3: Fracada Integration | 🔄 Current | Fracada smart contract integration, NFT fractionalization interface, token distribution |
| 4: Voting System | ⏳ Pending | Anonymous voting via token return, threshold tracking, outcome determination |
| 5: Member Management | ⏳ Pending | DRep verification, Policy ID token gating, member status tracking |
| 6+: Advanced Features | ⏳ Future | Accountability/challenge system, incentives, dashboard & analytics |

## Member Requirements

To participate, members must meet BOTH:
1. **Be an active DRep** (not just delegated) — stake address registered as DRep on-chain
2. **Hold Policy ID token** — wallet must hold ≥1 token from designated policy ID

## $PACK Rules

- Vote as unified pack
- Minimum punishment: Banishment from pack
- Remediation: Pay fine, perform repentance tasks
- Incentives: $ADA rewards, $CNT tokens, IRL exclusivity, tools/services access, educational resources

## Key Resources

- [Fracada dApp](https://fracada.adaodapp.xyz/)
- [Mesh SDK Docs](https://meshjs.dev/)
- [CIP-1694 Governance](https://cips.cardano.org/cip/CIP-1694)
- [Demeter.run](https://demeter.run/) - Infrastructure (~$5-15/month for dev)

## Environment Setup

```bash
# Node.js v20+
nvm install 20
nvm use 20

# Clone and install
cd block-vote
npm install

# Configure .env.local
NEXT_PUBLIC_CARDANO_NETWORK=preprod

# Run dev server
npm run dev
```

## Current Focus

Phase 3: Integrating Fracada smart contract for NFT fractionalization and token distribution mechanism.

---

*Last updated: February 11, 2026*
