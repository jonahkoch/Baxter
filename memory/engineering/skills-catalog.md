# Skills Catalog — Matt Pocock Repository

**Source:** https://github.com/mattpocock/skills  
**Philosophy:** Small, composable, model-agnostic skills for real engineering.

This catalog is a reference index. Skills are ported on-demand when a project needs them — consult this file to find the right tool for the job.

---

## How to Use This Catalog

1. **Agent needs a skill?** → Search this catalog by trigger phrase or task type
2. **Found a match?** → Port the skill file from the source repo into `skills/<name>/`
3. **Register it** → Add to `memory/context-index.md` under Active Topics
4. **Use it** → Reference the skill's trigger phrase in conversation

---

## Engineering Skills (Code Work)

### User-Invoked Only
| Skill | Trigger | What It Does | Ported? |
|-------|---------|-------------|---------|
| `ask-matt` | `/ask-matt` | Router — suggests which skill fits your situation | ❌ |
| `grill-with-docs` | `/grill-with-docs` | Grilling session + builds domain model, glossary, ADRs | ❌ |
| `triage` | `/triage` | Move issues through triage state machine | ❌ |
| `improve-codebase-architecture` | `/improve-codebase-architecture` | Scan codebase for deepening opportunities, HTML report | ❌ |
| `setup-matt-pocock-skills` | `/setup-matt-pocock-skills` | One-time repo configuration | ❌ |
| `to-spec` | `/to-spec` | Turn conversation into a spec, publish to tracker | ❌ |
| `to-tickets` | `/to-tickets` | Break plan into tracer-bullet tickets with dependencies | ❌ |
| `implement` | `/implement` | Build from spec, drive TDD, close with code-review | ❌ |
| `implement-spec` | `/implement-spec` | Implement whole spec with concurrent subagents | ❌ |
| `wayfinder` | `/wayfinder` | Plan huge work as decision tickets on tracker | ❌ |
| `retro` | `/retro` | Suggest env improvements after a session | ❌ |

### Model-Reachable (Auto-invoked by agent)
| Skill | Trigger Phrases | What It Does | Ported? |
|-------|-----------------|-------------|---------|
| `prototype` | "prototype this", "how should this look?", "build a throwaway" | Throwaway prototype to answer design questions | ❌ |
| `diagnosing-bugs` | "debug this", "what's causing this bug?", "diagnose" | Structured debug loop: red → minimize → hypothesize → instrument → fix | ❌ |
| `research` | "research this", "investigate", "find out about" | Background agent research with cited markdown output | ❌ |
| `tdd` | "use TDD", "red-green-refactor", "write tests first" | Test-driven development, one vertical slice at a time | ❌ |
| `domain-modeling` | "sharpen the domain model", "update glossary", "define terms" | Challenge terms, stress-test scenarios, update glossary | ❌ |
| `codebase-design` | "design this module", "deep module", "clean seam" | Deep modules: small interfaces, testable through entry points | ❌ |
| `code-review` | "review this", "check this code", "does this look right?" | Two-axis review: Standards + Spec | ❌ |
| `pr` | "write a PR", "draft PR body", "merge request" | PR body shape: summary, before/after, merge-danger | ❌ |

---

## Productivity Skills (General Workflow)

### User-Invoked Only
| Skill | Trigger | What It Does | Ported? |
|-------|---------|-------------|---------|
| `grill-me` | `/grill-me` | Non-code grilling session for plans/designs | ❌ |
| `handoff` | `/handoff` | Compact conversation into handoff document | ❌ |
| `teach` | `/teach` | Teach concept over multiple sessions | ❌ |
| `to-questionnaire` | `/to-questionnaire` | Decision you can't answer → questionnaire for expert | ❌ |
| `wait-what` | `/wait-what` | Message didn't land → re-pitch with glossary | ❌ |

### Model-Reachable
| Skill | Trigger Phrases | What It Does | Ported? |
|-------|-----------------|-------------|---------|
| `grilling` | "grill me on this", "ask me questions about" | Reusable interview primitive | ❌ |
| `writing-for-agents` | "write this for agents", "document this for AI" | Write docs that agents can read and follow | ❌ |

---

## Misc Skills (Rarely Used)

| Skill | What It Does | Ported? |
|-------|-------------|---------|
| `git-guardrails` | Block dangerous git commands before execution | ❌ |
| `migrate-to-shoehorn` | Migrate test assertions to @total-typescript/shoehorn | ❌ |
| `scaffold-exercises` | Create exercise directory structures | ❌ |
| `setup-pre-commit` | Husky + lint-staged + Prettier + type checking | ❌ |

---

## In-Progress (Beta)

| Skill | What It Does | Ported? |
|-------|-------------|---------|
| `loop-me` | Multi-session grill into workflow specs | ❌ |
| `writing-beats` | Shape article as journey of beats | ❌ |
| `writing-fragments` | Mine fragments for future articles | ❌ |
| `writing-shape` | Shape raw material into article | ❌ |
| `claude-handoff` | Hand off to fresh background agent | ❌ |
| `setup-ts-deep-modules` | Dependency-cruiser for TypeScript deep modules | ❌ |

---

## Ported Skills

| Skill | Ported Date | Location | Notes |
|-------|-------------|----------|-------|
| `engineering-workflow` | 2026-10-30 | `skills/engineering-workflow/` | Composable phases: wayfind → grill → prototype → spec → tickets → implement → review → handoff |

---

## Quick Decision Guide

**"I have an idea but don't know where to start"** → `wayfinder` or `grill-me`  
**"I think I want..."** → `grill-with-docs` or `grilling`  
**"How should this work?"** → `prototype`  
**"Build this feature"** → `to-spec` → `to-tickets` → `implement`  
**"Fix this bug"** → `diagnosing-bugs` → `implement` → `code-review`  
**"Refactor this"** → `improve-codebase-architecture` → `to-tickets` → `implement`  
**"Research this topic"** → `research` (background agent)  
**"Context is full, need to hand off"** → `handoff`  
**"Review before commit"** → `code-review`  
**"Plan a huge chunk of work"** → `wayfinder`  

---

## Porting Checklist

When porting a skill from the source repo:

- [ ] Fetch the full `SKILL.md` from `https://github.com/mattpocock/skills/blob/main/skills/<category>/<skill>/SKILL.md`
- [ ] Adapt any agent-specific conventions (Claude Code → OpenClaw)
- [ ] Update trigger phrases to work with our system
- [ ] Place in `skills/<skill-name>/SKILL.md`
- [ ] Update this catalog (set Ported? → ✅, add to Ported Skills table)
- [ ] Update `memory/context-index.md` if it's a major workflow skill
- [ ] Commit and push to GitHub
