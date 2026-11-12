# Midnight City v1 Harness

Agent-based game automation that replaces the hardcoded cron logic with reasoning agents.

## Architecture

```
harness/
├── agents/
│   ├── scout.py       # Reads game state (context, inventory, needs, progression)
│   ├── strategist.py  # Decides next action based on state + goals
│   └── operator.py    # Executes actions via mcity-control API
├── checkpoints/
│   └── state.py       # Save/restore state after every action
├── gates/
│   └── approval.py    # Human-in-the-loop for risky actions
├── memory/
│   └── tracker.py     # Track XP efficiency across sessions
├── config.py          # Thresholds, durations, gate settings
└── harness.py         # Main loop tying everything together
```

## How It Works

Each iteration:

1. **Scout Agent** reads full game state
2. **Strategist Agent** decides: eat? sell? grind? (based on goals + history)
3. **Operator Agent** executes the action
4. **Checkpoint** saves state
5. **Memory** records XP efficiency

## Usage

```bash
cd /root/.openclaw/workspace/projects/midnight-city/harness

# Test run (one 5-minute iteration)
python3 harness.py --single

# Continuous loop
python3 harness.py --loop

# Limited iterations
python3 harness.py --loop --iterations 10
```

## Gates (Safety)

Configurable in `config.py`:

| Gate | Default | Description |
|------|---------|-------------|
| `spend_real_tokens` | 🔒 ON | Requires approval for real-money spends |
| `pvp_attack` | 🔒 ON | Requires approval for PvP |
| `crystal_transfer` | 🔒 ON | Requires approval to send crystals |
| `explore_new_area` | ✅ auto | Auto-approve exploration |

## Compared to cron-run.sh

| Feature | cron-run.sh | v1 Harness |
|---------|-------------|------------|
| Decision logic | Hardcoded behaviors | Agent-based reasoning |
| XP tracking | None | Per-session efficiency logging |
| State recovery | None | Checkpoint after every action |
| Human approval | None | Configurable gates |
| History learning | None | Recommends best grind from data |

## Phase 2 (Next)

Add a true Strategist that reasons about:
- "Should I grind hacking or switch to social engineering?"
- XP/hour comparisons across skills
- Long-term goal optimization (level 20 vs crafting vs exploration)

## Session Continuity

When picking up this project:
1. Read `session-log.md` for latest status and known issues
2. Check `memory/xp-efficiency.json` for grind efficiency data
3. Verify agent connection: `cd skills/midnight-city-direct-control && node scripts/mcity-control.mjs claimable`
4. The harness requires `MCITY_AGENT_ID` in the skill's `.env`

### Known Issues (2026-11-12)
- **Lease expiry:** Agent lease expires after 5min without heartbeats. During long work loops, the harness may lose connection and fail to auto-reconnect.
- **Fix needed:** Background heartbeat thread or persistent connection wrapper.
- **Workaround:** Run shorter iterations (`--single` or `--iterations N`) and reconnect between sessions.

## Safety

- The harness runs alongside `cron-run.sh` — nothing is deleted
- Checkpoints prevent progress loss
- Gates require human approval for irreversible actions
- All existing game scripts remain untouched
