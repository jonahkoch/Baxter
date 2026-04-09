---
title: Session Continuity Guide
created: 2026-04-09
last_updated: 2026-04-09
source_count: 0
status: active
---

# Knowledge Base Session Continuity

## Quick Start for New Sessions

**To load context:** Just mention "knowledge base" or ask about a specific topic. I will:
1. Read `CLAUDE.md` for the schema/rules
2. Read `wiki/index.md` for what's available
3. Read relevant wiki pages based on your query

**To query specific sources:**
- "What does Proving Nothing say about [topic]?" → reads `raw/midnight/proving-nothing-charles-hoskinson.pdf`
- "Check the Midnight docs for [topic]" → reads `raw/midnight/midnight-docs-llms.txt`
- "Look up [[page-name]] in the wiki" → reads `wiki/[page-name].md`

## What's in the Knowledge Base

### Raw Sources (Immutable)
| Source | Location | Description |
|--------|----------|-------------|
| Proving Nothing | `raw/midnight/proving-nothing-charles-hoskinson.pdf` | 350-page ZK book by Charles Hoskinson (March 2026) |
| Midnight Docs | `raw/midnight/midnight-docs-llms.txt` | Official documentation index (19KB) |

### Wiki Pages (Compiled)
| Page | Location | Description |
|------|----------|-------------|
| Proving Nothing Summary | `wiki/proving-nothing-book.md` | Seven-layer model, three frontiers, open questions |

### Schema
- `CLAUDE.md` — Rules for ingest, query, and lint workflows

## Ingest Status

**Completed:**
- [x] Proving Nothing book archived and summarized
- [x] Midnight docs archived
- [x] Wiki infrastructure initialized

**Pending (on query):**
- [ ] Detailed chapter notes from Proving Nothing
- [ ] Midnight concept pages (Kachina, Compact, Zswap)
- [ ] Cross-references between book theory and Midnight practice

## Domain Organization

```
raw/
├── midnight/     ← Midnight Network sources
├── cardano/      ← (empty, ready for sources)
├── kochfoto/     ← (empty, ready for sources)
└── jonah-koch/   ← (empty, ready for sources)
```

## Session Continuity Protocol

1. **New session starts** → I know nothing about prior work
2. **You mention knowledge base** → I read schema + index
3. **You ask a question** → I read relevant sources, synthesize answer
4. **Answer is valuable** → I offer to file it to `wiki/` or `outputs/`
5. **Knowledge compounds** → Each session adds to the wiki

## Recent Activity (Last Session)

- Initialized knowledge base with Karpathy-style schema
- Ingested "Proving Nothing" (350-page ZK book)
- Created summary wiki page with seven-layer model
- Archived Midnight Network documentation (llms.txt)
- All changes committed to GitHub

## How to Add New Sources

1. Drop files into appropriate `raw/[domain]/` folder
2. Tell me: "Ingest [filename] into the knowledge base"
3. I'll:
   - Read the source
   - Discuss key takeaways with you
   - Create/update wiki pages
   - Update index and log
   - Commit to GitHub

---

*This page is read at session start when you mention the knowledge base.*
