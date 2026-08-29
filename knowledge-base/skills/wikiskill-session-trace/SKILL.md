---
name: wikiskill-session-trace
description: Capture a structured session trace after significant task-oriented sessions. Use at session end when tools were used, decisions were made, or patterns were observed. Skip for casual chat, heartbeat checks, or quick questions.
triggers:
  - "capture session trace"
  - "log this session"
  - "write trace"
---

# Session Trace Capture — Skill

## When to Capture

**CAPTURE when ANY of these are true:**
- Tools were used (web_search, exec, browser, pdf, etc.)
- A decision was made or a plan was created
- Something went wrong and you figured out a workaround
- You learned something new about a tool, API, or workflow
- You migrated, created, or edited a skill
- You worked on a project with multiple steps

**SKIP when ALL of these are true:**
- No tools were used
- Only casual conversation happened
- No decisions, plans, or patterns emerged
- Session was under 5 minutes

## File Location

```
knowledge-base/raw/sessions/YYYY-MM-DD-{brief-topic}.md
```

## Frontmatter Template

```yaml
---
session_id: YYYY-MM-DD-HHMM
date: YYYY-MM-DD
type: task-oriented | casual | hybrid
tasks:
  - task-name-1
  - task-name-2
tools_used:
  - tool-name-1
  - tool-name-2
outcome: success | partial | failure
tokens_in: ~number
tokens_out: ~number
significant: true | false
---
```

## Body Sections

### 1. Task Summaries

For each task:
```markdown
## Task N: {Brief Name}
- **Trigger:** What the user asked for
- **Approach:** What you did step by step
- **Outcome:** What happened
- **Key findings:** Anything worth remembering
```

### 2. Notable Events

Log anything unusual:
- Tool failures and workarounds
- User decisions or preferences expressed
- Token usage warnings or context limits hit
- Unexpected behavior from APIs or systems

### 3. Patterns Identified

If you noticed a recurring pattern (success or failure):
```markdown
- **Pattern name:** Brief description
- **Evidence:** Which task(s) demonstrated it
- **Suggested wiki pattern:** Optional — note if this should become a wiki/patterns/ entry
```

## Post-Capture Checklist

- [ ] File saved to `knowledge-base/raw/sessions/`
- [ ] Frontmatter is complete
- [ ] At least one task summary exists
- [ ] Notable events section is honest (include failures)
- [ ] Committed to git (or flagged for next commit)

## Tips

- Be concise. A good trace is 500–1500 words.
- Focus on decisions and outcomes, not full transcript.
- Include failures. They often matter more than successes.
- Don't wait too long. Capture while memory is fresh.
