# Harness Engineering — Action Plan

**Last updated:** 2026-11-06  
**Current phase:** Phase 0 — Knowledge Transfer Complete

---

## Phase 0: Knowledge Transfer ✅

**Status:** Complete  
**Date:** 2026-11-06

**Deliverables:**
- [x] Receive and catalog Harness Engineering framework from Jonah
- [x] Document all three layers (Harness, Loop, Graph)
- [x] Capture mistakes checklist and production-ready checklist
- [x] Record resources and further reading links
- [x] File everything in `memory/harness-engineering/overview.md`
- [x] Create project directory at `projects/harness-engineering/`
- [x] Write project README and action plan

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
