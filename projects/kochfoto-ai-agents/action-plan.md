# Kochfoto AI Agents — Action Plan

Building three autonomous AI agents for Kochfoto photography business operations.

## Overview

| Agent | Purpose | Status |
|-------|---------|--------|
| Research Agent | Market intelligence, competitor tracking, venue partnerships, seasonal trends | Not started |
| Content Agent | Blog posts, Instagram captions, newsletters, vendor spotlights | Not started |
| Operations Agent | Lead email triage, client meeting prep, weekly business metrics | Not started |

---

## Phase 1: Research Agent

**Goal:** Build an agent that monitors wedding photography market trends, tracks competitor pricing/offerings, identifies venue partnership opportunities, and delivers weekly intelligence briefs.

### Tasks
- [ ] Define Kochfoto's top 10 competitors (local + aspirational)
- [ ] Identify key industry sources (wedding blogs, venue associations, local publications)
- [ ] Create competitor tracking template (pricing, packages, positioning)
- [ ] Build weekly brief template (exec summary + 3 key developments + actions)
- [ ] Set up web search MCP integration (Brave API already available)
- [ ] Create cron job for weekly Monday morning runs
- [ ] Test 3 weeks, refine based on signal quality

**Deliverables:**
- `competitors.md` — Tracked competitor list
- `sources.md` — Industry publications/sources to monitor
- `brief-template.md` — Structured weekly output format
- Cron job configured for weekly runs

---

## Phase 2: Content Agent

**Goal:** Build an agent that handles content lifecycle from ideation → draft → edit → repurpose → schedule across all Kochfoto channels.

### Tasks
- [ ] Create brand voice document (draw from SOUL.md + existing best content)
- [ ] Build content pillar definitions (real weddings, behind scenes, vendor education, client tips)
- [ ] Set up quality scoring prompts (voice match, hook strength, value density)
- [ ] Create channel-specific templates (Instagram caption + hashtags, blog post structure, newsletter format)
- [ ] Build monthly workflow: 30 ideas → drafts → quality gate → your review
- [ ] Set up CMS/publishing integrations (Squarespace? Later? Buffer?)
- [ ] Test with 10 pieces, refine, then scale to full month

**Deliverables:**
- `brand-voice.md` — Voice, style guide, anti-examples
- `content-pillars.md` — 4-6 core content themes
- `templates/` — Channel-specific content templates
- `quality-gates.md` — Scoring rubric and rewrite logic

---

## Phase 3: Operations Agent

**Goal:** Build an agent that handles email triage, meeting preparation, and weekly business reporting.

### Tasks
- [ ] Build email triage workflow (categorize by urgency: inquiry → consultation → booked)
- [ ] Create response templates for common scenarios
- [ ] Build meeting prep workflow (pull client emails, Pinterest boards, contract status)
- [ ] Define weekly report format (inquiries, bookings, revenue pipeline, top 3 priorities)
- [ ] Set up calendar + email MCP integrations
- [ ] Create client intake tracking system
- [ ] Run 2 weeks, refine what needs human judgment vs automation

**Deliverables:**
- `email-triage-rules.md` — Categorization logic and templates
- `meeting-prep-template.md` — Pre-meeting brief format
- `weekly-report-template.md` — Business metrics dashboard
- `client-tracking.md` — Lead status pipeline

---

## Phase 4: Integration & Shared Knowledge

**Goal:** Connect all three agents through a shared knowledge base so they coordinate like a team.

### Tasks
- [ ] Design shared knowledge base structure
- [ ] Implement Research → Content handoff (research flags → content ideas)
- [ ] Implement Research → Operations handoff (competitor moves → client outreach)
- [ ] Build shared memory system (what all agents should know)
- [ ] Create agent coordination protocols

**Deliverables:**
- `shared-kb/` — Shared knowledge base structure
- `handoff-protocols.md` — How agents signal each other
- `agent-memory.md` — What each agent should remember between runs

---

## Phase 5: Polish & Deploy

**Goal:** Production-harden all three agents, document usage, and establish maintenance routines.

### Tasks
- [ ] Review and tighten all prompts
- [ ] Document how to use each agent (run commands, review outputs)
- [ ] Create troubleshooting guide
- [ ] Set up monitoring/logging for agent runs
- [ ] Define "when to escalate to human" rules
- [ ] First full month of all three agents running

**Deliverables:**
- `README.md` — Usage guide for all agents
- `troubleshooting.md` — Common issues and fixes
- `runbook.md` — Daily/weekly operational procedures

---

## Current Session Log

<!-- Add new entries at the TOP (newest first) -->

### Session: Initial setup

**Phase:** Planning  
**Date:** 2026-05-11  
**What we did:** Created action plan and skill framework for incremental work on all three agents. Decided to start with whichever agent addresses the most immediate pain point.  
**Decisions made:** 5-phase approach (Research → Content → Operations → Integration → Polish). Each agent gets built independently before integration.  
**Blockers:** None  
**Next session:** Pick Phase 1, 2, or 3 based on current business priority

---

### Session: _Earlier sessions go below_

---

## Quick Links

- **Skill:** `skills/kochfoto-agents/SKILL.md` — Load this when resuming work
- **This plan:** `projects/kochfoto-ai-agents/action-plan.md`
- **Brand voice reference:** `SOUL.md` (in workspace root)
