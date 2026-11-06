# Harness Engineering — Action Plan

**Last updated:** 2026-11-06  
**Current phase:** Phase 0 — Knowledge Transfer Complete

---

## Phase 0: Knowledge Transfer ✅

**Status:** Complete  
**Date:** 2026-11-06

**Deliverables:**
- [x] Receive and catalog Harness Engineering framework from Jonah (Part 1)
- [x] Document all three layers (Harness, Loop, Graph)
- [x] Capture mistakes checklist and production-ready checklist
- [x] Record resources and further reading links
- [x] File everything in `memory/harness-engineering/overview.md`
- [x] Create project directory at `projects/harness-engineering/`
- [x] Write project README and action plan
- [x] Receive and catalog 10-step implementation guide (Part 2)
- [x] Write `implementation-guide.md` with full 10-step guide + Baxter audit
- [x] Receive and catalog Claude harness architecture (Part 3)
- [x] Write `claude-harness.md` with loop, layers, and CrewAI mapping
- [x] Commit and push all files to GitHub

---

## Phase 1: Architecture Audit 🔲

**Status:** Not started  
**Goal:** Map Baxter's current architecture to the three-layer model

**Tasks:**
- [ ] Inventory current harness components (tools, memory, persistence, permissions)
- [ ] Map existing loops (cron jobs, heartbeat checks, sub-agent spawning)
- [ ] Identify any graph-like structures (approval flows, conditional branches)
- [ ] Run through production-ready checklist for each layer
- [ ] Document gaps and pain points

**Trigger:** Say "apply harness framework to Baxter" or "start architecture audit"

---

## Phase 2: Prioritize Improvements 🔲

**Status:** Not started  
**Goal:** Decide which layer to improve first

**Tasks:**
- [ ] Review audit results with Jonah
- [ ] Rank gaps by impact vs. effort
- [ ] Pick 1-2 high-impact improvements
- [ ] Write spec for each improvement

---

## Phase 3: Implement 🔲

**Status:** Not started  
**Goal:** Build and test improvements

**Tasks:**
- [ ] Implement chosen improvements
- [ ] Add verification loops where needed
- [ ] Update documentation
- [ ] Commit and push changes

---

## Open Questions

1. What specific reliability issues is Baxter experiencing that prompted this exploration?
2. Are there particular workflows (e.g., Kochfoto agents, Cardano projects) that should be audited first?
3. Should this framework also apply to Midnight City's cron/harness setup?

---

## Session Log

| Date | What Happened | Next |
|------|--------------|------|
| 2026-11-06 | Jonah transferred full Harness Engineering framework | Await direction on Phase 1 |
| 2026-11-06 | Part 2 (10-step implementation guide) received and filed | Await direction on Phase 1 |
| 2026-11-06 | Part 3 (Claude harness architecture) received and filed | Await direction on Phase 1 |
| 2026-11-06 | Part 3 expanded: reasoning, planning, subagent delegation | Await direction on Phase 1 |
| 2026-11-06 | Part 3 expanded: sandboxing, human-in-the-loop, hierarchical crews | Await direction on Phase 1 |
