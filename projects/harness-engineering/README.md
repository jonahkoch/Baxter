# Harness Engineering Project

**Status:** Active — knowledge accumulation phase  
**Started:** 2026-11-06  
**Owner:** Jonah Koch  
**Agent:** Baxter

---

## What This Is

A structured exploration of three-layer agent architecture:
1. **Harness Engineering** — the machinery around the model
2. **Loop Engineering** — repeated work-and-feedback cycles
3. **Graph Engineering** — explicit workflow topology

The goal is to apply this framework to Baxter's architecture and identify concrete improvements.

---

## Project Files

| File | Purpose |
|------|---------|
| `README.md` | This file — project overview and navigation |
| `overview.md` | Complete reference document — all three layers, mistakes, checklist, resources |
| `action-plan.md` | Current phase, decisions, and next steps |

---

## Quick Reference

**The 30-Second Answer:**
- Harness = environment
- Loop = feedback
- Graph = flow

**When to apply each:**
- Agent can't maintain state or access tools → **Harness**
- Agent needs verification, retries, or improvement cycles → **Loop**
- Process has branches, approvals, parallel work, or recovery paths → **Graph**

---

## How to Continue

1. Read `overview.md` for the full framework
2. Check `action-plan.md` for current phase and next tasks
3. Say "apply harness framework to Baxter" to start the architecture audit
