# Session Handoff - Wallet & DeFi

## Last Active
—

## Where We Left Off
Setting up wallet infrastructure. Principle established: _Never act without checking state first_.

## Memory Structure
- `wallet-state.md` — Master balance/position snapshot
- `tx-log.md` — All on-chain transactions  
- `session-handoff.md` — This file (context switch summaries)

## Session Continuity Protocol
1. **Before any wallet action:** Read wallet-state.md
2. **After any wallet action:** Update wallet-state.md + tx-log.md
3. **On context limit:** Write session-handoff.md with pending actions
4. **New session:** Read all wallet files before any operations

## Safety Rules
- Never assume positions from memory — always verify on-chain
- No concurrent operations (check for pending txs)
- All operator skills require explicit confirmation
- Small test amounts before large operations

## Open Questions / Next Steps
—
