---
name: kochfoto-agents
description: Work on building Kochfoto's three AI agents (Research, Content, Operations) incrementally. Use when the user wants to work on AI agents for their photography business, build the research/content/operations agent, resume agent work, or make progress on automating Kochfoto workflows.
triggers:
  - "work on kochfoto agents"
  - "resume agent work"
  - "build the research agent"
  - "work on content automation"
  - "build the operations agent"
---

# Kochfoto AI Agents — Skill

## Pre-Execution Checklist

1. Read `projects/kochfoto-ai-agents/action-plan.md`
2. Check the **Current Session Log** at the bottom of the action plan
3. Identify which phase to work on (or resume)
4. Load relevant reference files for that phase

## Project Structure

```
projects/kochfoto-ai-agents/
├── action-plan.md          # Phases, status, session log
├── competitors.md          # Tracked competitor list (Phase 1)
├── sources.md              # Industry sources to monitor (Phase 1)
├── brand-voice.md          # Voice and style guide (Phase 2)
├── content-pillars.md      # Content themes (Phase 2)
├── templates/              # Channel-specific templates (Phase 2)
├── email-triage-rules.md   # Email categorization logic (Phase 3)
└── shared-kb/              # Shared knowledge base (Phase 4)
```

## Agents Overview

| Agent | Purpose | Kochfoto Role |
|-------|---------|---------------|
| **Research** | Market intelligence | Competitor pricing, venue partnerships, wedding trends |
| **Content** | Content lifecycle | Blogs, Instagram captions, vendor spotlights, newsletters |
| **Operations** | Chief of staff | Lead email triage, client meeting prep, weekly metrics |

## Phase Quick-Start

### Phase 1: Research Agent
1. Define top 10 competitors (local + aspirational)
2. Identify industry sources (wedding blogs, venue associations)
3. Create competitor tracking template
4. Build weekly brief template
5. Set up weekly cron job

### Phase 2: Content Agent
1. Extract brand voice from SOUL.md + best content
2. Define 4-6 content pillars
3. Build quality scoring prompts
4. Create channel templates (Instagram, blog, newsletter)
5. Build monthly workflow

### Phase 3: Operations Agent
1. Build email triage categories (inquiry → consultation → booked)
2. Create response templates
3. Build meeting prep workflow (pull client context)
4. Define weekly report format
5. Set up calendar integrations

### Phase 4: Integration
1. Design shared KB structure
2. Implement agent handoff protocols
3. Build shared memory system

## Session Workflow

1. **Resume:** Read action plan, check last session log
2. **Load context:** Read relevant reference files for your phase
3. **Work:** Implement, design, or build
4. **Log:** Update the Current Session Log in action-plan.md
5. **Commit:** Save progress, note blockers for next time

## Available Tools

- Web search (Brave API)
- Browser automation
- Cron scheduling (gateway)
- Memory system (MEMORY.md + daily files)
- Email (message tool)
- File storage (workspace)

## Entry Point Recommendation

- Start with **Operations Agent** if lead management is the bottleneck
- Start with **Content Agent** if consistent publishing is the pain point
- Start with **Research Agent** if market awareness is the gap
