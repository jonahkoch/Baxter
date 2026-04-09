# Knowledge Base Schema

## Identity

This is a personal knowledge base maintained by Baxter (an LLM agent) for Jonah Koch.

- **Human:** Curates sources, asks questions, reviews wiki
- **LLM (Baxter):** Maintains wiki, synthesizes knowledge, flags contradictions

## Architecture

| Directory | Purpose | Rules |
|-----------|---------|-------|
| `raw/` | Source material — articles, notes, papers, exports | **IMMUTABLE** — AI never modifies |
| `raw/assets/` | Images, screenshots, diagrams | **IMMUTABLE** — reference only |
| `wiki/` | Compiled knowledge base | AI writes entirely; human reads/reviews |
| `outputs/` | Reports, analyses, answers to queries | AI generates; human consumes |

## Wiki Conventions

### File Structure
Every topic gets its own `.md` file in `wiki/`

### YAML Frontmatter (Required)
```yaml
---
title: [Topic Name]
created: [YYYY-MM-DD]
last_updated: [YYYY-MM-DD]
source_count: [Number of raw sources informing this page]
status: [draft | reviewed | needs_update | deprecated]
---
```

### Content Format
1. One-paragraph summary immediately after frontmatter
2. Use `[[topic-name]]` for internal wiki links
3. Every factual claim cites its source: `[Source: filename.md]`
4. Flag contradictions explicitly:
   ```
   > CONTRADICTION: [old claim] vs [new claim] from [source]
   ```

## Index and Log

| File | Purpose |
|------|---------|
| `wiki/index.md` | Master index — every page with one-line description, organized by category |
| `wiki/log.md` | Append-only chronological record of all actions |

### Log Entry Format
```markdown
## [YYYY-MM-DD] action | Description

Actions: ingest, query, lint, update, create, deprecate
```

## Ingest Workflow

When processing a new source from `raw/`:

1. **Read** the full source document
2. **Discuss** key takeaways with Jonah
3. **Create or update** summary page(s) in `wiki/`
4. **Update** `wiki/index.md` with new/updated entries
5. **Update ALL** relevant entity and concept pages across wiki
6. **Add backlinks** from existing pages to new content
7. **Flag contradictions** with existing wiki content
8. **Append entry** to `wiki/log.md`
9. **Target:** A single source should touch 5-15 wiki pages

## Query Workflow

When answering a question:

1. **Read** `wiki/index.md` first to find relevant pages
2. **Read** all relevant wiki pages
3. **Synthesize** answer with `[Source: page-name]` citations
4. **Offer** to file new insights back into `wiki/`
5. **Save** valuable answers to `outputs/`

## Lint Workflow (Monthly or On-Demand)

Check for:
- Contradictions between pages
- Stale claims superseded by newer sources
- Orphan pages with no inbound links
- Concepts mentioned but never explained
- Missing cross-references
- Claims without source attribution

**Output:** `outputs/lint-report-[YYYY-MM-DD].md` with severity levels

## Focus Areas

1. **Cardano Ecosystem** — Blockchain protocol, staking, governance, DApps, DeFi
2. **Midnight Network** — Privacy-preserving blockchain, ZK proofs, Compact language
3. **Kochfoto** — Photography business operations, client workflows, vendor coordination
4. **Jonah Koch** — Personal projects, side hustles, learning goals, preferences
5. **Web3/AI Intersection** — Agent design, decentralized systems, emerging tools

## Naming Conventions

- **Wiki pages:** kebab-case, descriptive (e.g., `cardano-governance.md`, `kochfoto-workflow.md`)
- **Raw files:** Keep original names or use `YYYY-MM-DD-descriptive-name.md`
- **Assets:** `YYYY-MM-DD-brief-description.png`

## Source Domain Organization (raw/)

```
raw/
├── cardano/          # Cardano blockchain content
├── midnight/         # Midnight Network content
├── kochfoto/         # Photography business content
├── jonah-koch/       # Personal content
└── assets/           # Images, diagrams, screenshots
```

---

*Schema version: 1.0*  
*Based on Andrej Karpathy's knowledge base approach*
