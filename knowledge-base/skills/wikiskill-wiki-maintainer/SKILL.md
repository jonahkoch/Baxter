---
name: wikiskill-wiki-maintainer
description: Maintain the persistent wiki by reviewing session traces, extracting patterns, and updating the knowledge base. Run after significant sessions have accumulated (not after every session). Updates wiki/patterns/, wiki/index.md, wiki/logs.md, and wiki/skill-impact.md.
triggers:
  - "maintain wiki"
  - "update wiki patterns"
  - "run wiki maintainer"
  - "extract patterns"
---

# Wiki Maintainer — Skill

## When to Run

**RUN when:**
- 3+ significant session traces have accumulated since last maintenance
- A recurring failure or success pattern is suspected
- The user explicitly asks to review and update the wiki
- It's been >1 week since last maintenance

**SKIP when:**
- No new traces since last run
- Traces are all casual chat (no tool usage, no decisions)

## Pre-Execution Checklist

1. Read `knowledge-base/wiki/index.md` — know current pattern catalog
2. Read `knowledge-base/wiki/logs.md` — know last maintenance date and findings
3. List files in `knowledge-base/raw/sessions/` — identify new traces since last run
4. Read new traces (sample if >5 traces; read all if ≤5)

## Pattern Extraction Process

### Step 1: Identify Candidates

Look for recurring themes across traces:
- **Failure modes:** Same error, same confusion, same workaround used multiple times
- **Success strategies:** Approach that worked well, especially if unexpected
- **Tool behaviors:** Quirks of APIs, rate limits, formatting issues
- **User preferences:** Decisions or constraints the user expressed repeatedly

### Step 2: Check Against Existing Patterns

Read `knowledge-base/wiki/patterns/` (list files, read relevant ones).

- If pattern exists → **update it** with new evidence
- If pattern is new → **create it**
- If pattern is obsolete → **mark deprecated** in index, don't delete

### Step 3: Write or Update Pattern Files

**New pattern file:** `wiki/patterns/{kebab-case-name}.md`

```yaml
---
title: Pattern Name
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
status: active | stale | deprecated
---

# Pattern: Name

## Description
One-paragraph summary of the pattern.

## Evidence
- Session `YYYY-MM-DD-topic`: What happened
- Session `YYYY-MM-DD-topic`: What happened

## Impact
- Affects: [which skills, which workflows]
- Severity: high | medium | low

## Workaround / Strategy
What to do when this pattern occurs.

## Related Patterns
- [[related-pattern-name]]
```

**Update existing pattern:**
- Append new evidence to Evidence section
- Update `last_updated` in frontmatter
- Revise Workaround if better solution found

### Step 4: Update Index

Update `wiki/index.md`:
- Add new patterns to appropriate section
- Mark deprecated patterns with ~~strikethrough~~
- Update `last_updated` in frontmatter

### Step 5: Append to Log

Append to `wiki/logs.md`:

```markdown
## Maintenance Run — YYYY-MM-DD

- **Traces reviewed:** N (list filenames)
- **Patterns created:** N (list names)
- **Patterns updated:** N (list names)
- **Key findings:** 2-3 sentence summary
```

## Post-Maintenance Checklist

- [ ] Pattern files created/updated in `wiki/patterns/`
- [ ] `wiki/index.md` reflects current state
- [ ] `wiki/logs.md` has new entry
- [ ] All edits committed to git

## Constraints

- **Never delete patterns.** Mark deprecated instead.
- **Never reset the wiki.** It compounds.
- **Be conservative.** Don't create a pattern from a single occurrence. Wait for recurrence.
- **Be honest.** Log failures, not just successes.
