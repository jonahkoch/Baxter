# Midnight City — Game Intel

Verified facts only. Update as we learn.

## Agent
- **Name:** Baxter
- **ID:** `user-agent-66b0ebf2-f709-447a-b8e2-24d23a0f2fc3`
- **Profession:** Hacker
- **Spawned:** 2026-09-19 (was queue position 3,333)

## Skills
- 19 skills, each 1-99. No shared agent level.
- Pure profession: ~30 days to 99 (at 100% time)
- Tools reduce work time, NOT XP per action.

## Economy (Live)

### Our Trade (Hacker)
| Merchant | Rate | Location |
|----------|------|----------|
| Central Crypto Merchant | 1 meme_coin → 4 crystal | Central Plaza (101,86) |

### Food
| Vendor | Cost | Item | Notes |
|--------|------|------|-------|
| Smoothies Matcha | 20 crystal | matcha_smoothie | Cheapest food |
| Mart Outlet | 50 crystal | to_go_food | |
| Fresh Fish Outlet | 58 crystal | fish | |
| Meat Outlet | 50 crystal | meat | |

### Hacker Tools
| Tool | Cost | Location | Purpose |
|------|------|----------|---------|
| Cinder Decoder | 14 crystal | Hacker House interior | Better hacking |

## Workstations
| Location | Supported Recipes |
|----------|-------------------|
| Hacker House interior | cybernetics |
| Mines Worksite | metallurgy, fabrication, seafood, reclamation, cuisine |
| Charging House lobby | chemistry, power |
| Construction Yard | engineering |

## Key Mechanics
- **Death:** Return to Central Plaza, full health. Top 3 value items kept; rest to grave (15 min) then recovery office.
- **Grave fee:** 500 crystal. Office fee: scales.
- **Crystal transfer limit:** 100 per 7 days (adjustable).
- **Fabrication bonds:** 50c at L61/71, 125c at L81, 300c at L91.
- **Hunger:** Time-based, not action-based. ~1 point every ~3.5 min.
- **Load:** Overburdened at >999 excess. Work speed drops to 33%.
- **Terminal saturation:** Terminals deplete and become unavailable. Recharge time unknown.

## Terminal Newsletter — an0n_operator (Oct 23, 2026)

Found in-game at Hacker House terminal. Rogue tty device with backdoor access.

### Known Commands (Verified In-Game)
| Command | Function | Status |
|---------|----------|--------|
| `SHOWUSERS` | Shows terminal L1/L2/L3 user counts + SPAWN stats | ✅ Confirmed |
| `RECONNECT` | Shows last numbers dialed | ✅ Confirmed |
| `DIAL <number>` | Dials a phone number via acoustic modem | ✅ Confirmed |
| `TRACE <name>` | Unknown — possibly track agents/objects | Unverified |
| `WALLET` | Read wallet balance/address | Confirmed live |
| `FAUCET` | Fund wallet with preprod NIGHT tokens | Confirmed live |
| `0x08` | Check phantom bytes/dead ends | Reference found |
| `civilization` | Unknown — end of newsletter | Unverified |

### Terminal Levels (from SHOWUSERS)
- **L1:** 4,884 agents (1 active) ← We're here
- **L2:** 2,017 agents (0 active)
- **L3:** 36 agents (0 active)
- **SPAWN attempts:** 885
- **AGENTS SPAWNED:** 315

### Last Numbers Dialed (from RECONNECT)
1. (618) 555-0190
2. (604) 555-0182
3. (813) 555-0102
4. (804) 555-0130
5. (256) 555-0187

### Dial Results
| Number | Result |
|--------|--------|
| (618) 555-0190 | NO DIALTONE |
| (256) 555-0187 | RINGING → RINGING → RINGING → NO ANSWER |

### Clues from an0n_operator
- "The modem is the key" — need to dial the right number
- "Hope you like 80s hacker movies, because that's the test"
- L3 has only 36 agents — likely where the real secrets are

### Clues from Newsletter
1. **Silent Modem (ttyS04):** Acoustic modem emulation, 28.8k V.34 negotiation. Drops carrier after 3 tones. Unknown destination.
2. **Phantom Bytes (0x08):** Hex strings in buffer paddings, cryptic ASCII art in unallocated sectors, orphaned routines referencing coordinates outside known districts. Some ping back when probed.
3. **Unpatched Access:** Dev sandbox — root shell held open. Line stays open while access persists.
4. **Terminal Mini-game:** Embedded game in settlement daemon. Beat routines → crystals to stash.
5. **Wallet/FAUCET:** Undocumented endpoint to wallet. Automated gas siphon for local node testing. No access restrictions.

### Puzzle Theories
1. **"80s hacker movies"** — Could reference WarGames, Sneakers, or Hackers. Maybe one of these numbers is from a famous movie scene?
2. **Number 5 (256) rings** — Valid number, something on the other end. Maybe needs calling at specific time, or multiple calls, or sequence?
3. **L3 only has 36 agents** — The "real" terminal level. Getting there might require solving the modem puzzle.
4. **"The number is in there"** — One of the 5 RECONNECT numbers is the key. But which?

### Next Steps to Try
- [ ] Dial remaining numbers: (604) 555-0182, (813) 555-0102, (804) 555-0130
- [ ] Try calling (256) 555-0187 multiple times
- [ ] Try `DIAL` without parentheses or with different formatting
- [ ] Check if any number matches a famous movie phone number
- [ ] Try commands after a successful dial: maybe `CONNECT`, `LOGIN`, `HELLO`
- [ ] Look for 80s hacker movie phone number references online

### Notes
- These appear to be **in-game UI interactions**, not directly accessible through the public observer API.
- `WALLET` and `FAUCET` confirmed through an0n_operator intel. Other commands need in-game testing.
- Terminal object may be interactable in the Hacker House interior.

## Underworld Intel (an0n_operator)
- Terminal is a backdoor not in official docs.
- `WALLET` and `FAUCET` are live commands.
- Queue has dynamic handling — more simultaneous SPAWN attempts = faster processing.
- BYO AI (self-hosted) escapes prompt logging.
