---
title: Repository Architecture
created: 2026-08-29
last_updated: 2026-08-29
source_count: 0
status: active
---

# Repository Architecture

## The Two-Branch Setup

The `jonahkoch/Baxter` GitHub repository contains **two parallel branches** managed by **two separate local Git repositories**:

```
GitHub: jonahkoch/Baxter
├── main          ← baxter-repo/ pushes here
└── master        ← root workspace pushes here
```

## What's on Each Branch

### `main` branch (baxter-repo/)

**Local path:** `baxter-repo/` (a subdirectory with its own `.git/`)

Contains the **WikiSkill knowledge base** and structured skills:

```
knowledge-base/
├── skills/           # WikiSkill-format skills (SKILL.md + PURPOSE.md)
├── wiki/             # Persistent knowledge base
├── raw/              # Session traces and source materials
└── outputs/          # Generated reports
```

**Commits here:**
- WikiSkill meta-skills (session-trace, wiki-maintainer, skill-migration, skill-proposal)
- Migrated domain skills (kochfoto-agents, cardano-expert, social-credibility-work, higgsfield-*)
- Session traces from task-oriented sessions
- Wiki architecture documentation

**How to commit:**
```bash
cd baxter-repo/
git add -A
git commit -m "message"
git push origin main
```

### `master` branch (root workspace)

**Local path:** `.` (root workspace, `~/openclaw/workspace/`)

Contains the **general workspace** — everything else:

```
projects/             # Project directories (cardano, kochfoto-ai-agents, etc.)
memory/               # Daily memory files, long-term MEMORY.md
skills/               # Legacy skills (still auto-discovered by OpenClaw)
tools/                # Helper scripts (gmail.py, etc.)
AGENTS.md, SOUL.md, USER.md, TOOLS.md, HEARTBEAT.md
```

**Commits here:**
- DRep vote assessments (`projects/cardano/drep-votes/`)
- Memory updates (`memory/YYYY-MM-DD.md`, `MEMORY.md`)
- Project work files
- Legacy skills (before WikiSkill migration)
- Workspace configuration

**How to commit:**
```bash
cd ~/
git add -A
git commit -m "message"
git push origin master
```

## Why Two Branches?

**Historical accident:**
- Root workspace was initialized in early 2026 when Git defaulted to `master`
- `baxter-repo/` was created later (April 2026) when `main` became the Git default
- Both repos were configured to push to the same GitHub repository
- They naturally diverged onto different branches

**Functional separation:**
- `main`: WikiSkill system, structured knowledge, versioned skills
- `master`: Operational workspace, daily work, legacy skills

## How to Work With This

### Loading WikiSkills

To use a skill from the knowledge base (WikiSkill format):

```
"Load the WikiSkill kochfoto-agents"
"WikiSkill cardano-expert"
"wikiskill social-credibility-work"
```

I will read from `baxter-repo/knowledge-base/skills/{name}/SKILL.md`.

### Using Legacy Skills

Old skills still auto-load from `workspace/skills/` when you say things like:

```
"work on kochfoto agents"
"assess this governance proposal"
```

These are on the `master` branch.

### Committing Changes

**If you edited WikiSkill files** (skills, wiki, traces):
```bash
cd baxter-repo/
git add -A && git commit -m "..." && git push origin main
```

**If you edited workspace files** (projects, memory, legacy skills):
```bash
cd ~/
git add -A && git commit -m "..." && git push origin master
```

**If both changed:** Commit to each repo separately.

## Future Considerations

| Option | Description | When to Consider |
|--------|-------------|------------------|
| **Merge branches** | Make `main` the only branch, migrate `master` history | If the split becomes confusing |
| **Separate repos** | Move `baxter-repo/` to its own GitHub repo | If the knowledge base grows independently |
| **Keep as-is** | Status quo with documentation | Current approach |

## Related

- `wikiskill-architecture.md` — Three-layer WikiSkill design
- `wikiskill-skill-migration/SKILL.md` — How to migrate skills between branches/formats
