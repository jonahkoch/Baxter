---
name: kochfoto-agents
description: Work on building Kochfoto's three AI agents (Research, Content, Operations) incrementally. Use when the user wants to work on AI agents for their photography business, build the research/content/operations agent, resume agent work, or make progress on automating Kochfoto workflows. Triggers on phrases like "work on kochfoto agents", "resume agent work", "build the research agent", "work on content automation", or any task related to AI agents for the photography business.
---

# Kochfoto AI Agents — Work Skill

This skill helps you build and iterate on Kochfoto's three autonomous AI agents incrementally.

## Before You Start

1. **Read the action plan:** `projects/kochfoto-ai-agents/action-plan.md`
2. **Check the Current Session Log** at the bottom of the action plan
3. **Identify which phase** to work on (or resume)
4. **Load relevant references** (see below)

## Project Structure

```
projects/kochfoto-ai-agents/
├── action-plan.md          # Phases, status, session log
├── competitors.md          # Tracked competitor list (create in Phase 1)
├── sources.md              # Industry sources to monitor (create in Phase 1)
├── brand-voice.md          # Voice and style guide (create in Phase 2)
├── content-pillars.md      # Content themes (create in Phase 2)
├── templates/              # Channel-specific templates (create in Phase 2)
├── email-triage-rules.md   # Email categorization logic (create in Phase 3)
└── shared-kb/              # Shared knowledge base (create in Phase 4)
```

## Quick Reference

### The Three Agents

| Agent | Purpose | Kochfoto-Specific Role |
|-------|---------|------------------------|
| **Research Agent** | Market intelligence | Tracks competitor pricing, venue partnerships, seasonal wedding trends |
| **Content Agent** | Content lifecycle | Real wedding blogs, Instagram captions, vendor spotlights, newsletters |
| **Operations Agent** | Chief of staff | Lead email triage, client meeting prep, weekly business metrics |

### Existing Tools Available

- **Web search:** Brave API (already configured)
- **Browser automation:** Available via browser tool
- **Cron scheduling:** Gateway cron for weekly/daily runs
- **Memory system:** MEMORY.md + daily files for persistence
- **Email:** message tool for email operations
- **File storage:** Workspace for all agent outputs

### Phase Quick-Start

#### Phase 1: Research Agent
1. Define top 10 competitors (local + aspirational)
2. Identify industry sources (wedding blogs, venue associations)
3. Create competitor tracking template
4. Build weekly brief template
5. Set up weekly cron job

#### Phase 2: Content Agent
1. Extract brand voice from SOUL.md + best content
2. Define 4-6 content pillars
3. Build quality scoring prompts
4. Create channel templates (Instagram, blog, newsletter)
5. Build monthly workflow

#### Phase 3: Operations Agent
1. Build email triage categories (inquiry → consultation → booked)
2. Create response templates
3. Build meeting prep workflow (pull client context)
4. Define weekly report format
5. Set up calendar integrations

#### Phase 4: Integration
1. Design shared KB structure
2. Implement agent handoff protocols
3. Build shared memory system

## Session Workflow

1. **Resume:** Read action plan, check last session log
2. **Load context:** Read relevant reference files for your phase
3. **Work:** Implement, design, or build
4. **Log:** Update the Current Session Log in action-plan.md
5. **Commit:** Save progress, note blockers for next time

## Kochfoto Context to Remember

- **Business:** Wedding photography (Kochfoto)
- **Location:** Washington DC area
- **Brand voice:** See `SOUL.md` — warm, helpful, not overly formal
- **Current pain points:** (add as discovered)
- **Existing workflows:** (document as learned)

## Tips

- Start with **Operations Agent** if lead management is the immediate bottleneck
- Start with **Content Agent** if consistent publishing is the pain point
- Start with **Research Agent** if market awareness is the gap
- Each agent builds on OpenClaw's existing tools — no need to reinvent MCP infrastructure
