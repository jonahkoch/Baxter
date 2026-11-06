# Harness Engineering — Implementation Guide

**Part 2: From One Babysat Agent to a Team That Runs While You Sleep**

**Status:** Reference material — Jonah Koch  
**Date:** 2026-11-06

---

## The Core Insight

Every agent setup fails in the same place.

Not the model. Not the prompt. Not the context window. It fails the moment you try to run the second agent — and discover that the only reason the first one worked was that you were sitting there watching it.

One agent with a human attached is a tool. Twenty agents with a human attached is a full-time job you gave yourself.

The thing that closes that gap has a name now: **the harness.** It is the layer around the model that decides what the agent is allowed to do, how its work gets graded, and what happens when it gets something wrong.

Prompt engineering was about the question. Context engineering was about what the model knows. **Harness engineering is about what it is allowed to ship.**

---

## The 10-Step Version

### 01. Stop Trying to Make the Agent Smarter

The instinct when an agent does something dumb is to rewrite the prompt. Add a rule. Add an example. Add "IMPORTANT" in caps.

This works exactly once, for exactly that failure.

The reason it doesn't scale is that you're patching the output instead of constraining the input space. A rule in a prompt is a suggestion the model weighs against everything else in the context. **A rule in the harness is a wall it hits.**

> **The mental shift for the entire rest of this guide:** when an agent does something wrong, do not ask what to tell it. Ask what should have stopped it.

Every hour you spend making one agent smarter is an hour not spent on the thing that lets you run twenty.

---

### 02. Write Down What "Correct" Means Before You Automate Anything

Most teams bolt automations onto an undefined standard and plateau in about two weeks. The automations work. Nobody can tell whether the output is good.

Before an agent touches your repo, you need a written answer to: **what does a correct change look like here?**

Not vibes. Checkable statements:
- Tests pass and coverage does not drop
- No new dependency without a note explaining it
- Public API changes come with docs
- Nothing writes to the database outside the repository layer

If you can't write it down, you can't automate it — you can only automate the appearance of it. Every team that skips this step ends up reviewing agent output by feel, which is exactly the bottleneck they were trying to remove.

---

### 03. Invariants: The Rules the Agent Physically Cannot Break

An invariant is not an instruction. It's a constraint enforced outside the model.

The difference matters more than it sounds. Put "never touch the auth module" in a prompt and you have a 90-something-percent chance of compliance, which sounds fine until you're running twenty agents and the misses compound. Put it in a pre-commit hook or a path-based CI rule and the compliance rate is 100%, permanently, for every agent you will ever run.

**Start with the changes that cannot be undone with a revert:**
- Schema migrations
- Auth and permissions
- Payment paths
- Anything that deletes data
- Infrastructure and secrets

These get hard blocks, not warnings. The agent doesn't get asked nicely — the build fails.

> **The counterintuitive part:** the more you lock down, the more autonomy you can give. Freedom inside a fence is safe. Freedom without one is why you're still reviewing every diff by hand.

---

### 04. Sensors: How the Work Gets Graded Without You

Invariants say what can't happen. Sensors say whether what did happen was any good.

A sensor is anything that produces a verdict without a human reading the code:
- Test suite (did it pass, did coverage move)
- Linter and type checker
- Build time and bundle size deltas
- A second model reviewing the diff against your written standard
- Runtime smoke checks against a preview deploy

**The rule that makes this work:** a sensor has to return a verdict, not a paragraph.

"Coverage 91%, threshold 85%, pass" is a sensor. "The code looks reasonable overall" is a model doing improv.

If the output needs you to interpret it, you didn't build a sensor. You built another thing to read.

---

### 05. Gates: The Ladder from Auto-Merge to Never

Here's where most people get stuck, because they're trying to answer one question — "do I trust agents?" — when the real question is four questions.

You don't trust agents in general. You trust them per class of change.

**Four rungs, and every real setup has all four:**

| Rung | What It Means | Examples |
|------|--------------|----------|
| **Ships alone** | No human ever sees these | Typos, comments, dead code, lint fixes, dependency bumps |
| **Ships if green** | CI decides, it merges itself | Tests, docs, pure refactors with full coverage |
| **Waits for eyes** | Agent does the work, you make the call | New endpoints, business logic, anything a user touches |
| **Never alone** | Agent is blocked outright | Schema migrations, auth, payment paths, data deletion |

If the "ships alone" rung is empty, you don't have a harness — you have a review queue with extra steps.

Write your four rungs down today, even badly. Because every rung you leave undefined, the agent defines for you — and it will define it in whichever direction gets the task marked done.

---

### 06. Give Each Agent One Job and One Memory

The failure mode of the generalist agent is subtle: it isn't that it's bad at everything, it's that its context is a landfill. Yesterday's refactor is still in there, competing with today's bug.

Specialists win for a boring reason — a narrow agent has a narrow context, and a narrow context is a cleaner signal.

**A workable starting roster:**
- One that only fixes failing tests
- One that only handles dependency and security bumps
- One that only writes docs from diffs
- One that triages incoming bugs into reproducible tickets

Each gets its own charter: what it owns, what "done" means, what it must never do without asking. That last line is not paperwork. It's the thing that lets you close the laptop.

---

### 07. Add the Coordinator Only After the Specialists Work

The "Chief of Staff agent" is the most-screenshotted part of every agent setup and the most commonly built too early.

A coordinator's only job is routing: read the incoming work, decide which specialist owns it, hand it over, escalate to you when nothing fits. That's it. It doesn't do the work.

Build it after you have at least three specialists you'd genuinely leave unattended. Before that, you're adding a routing layer to a system with nothing to route — and one more place for context to leak between agents that were supposed to stay narrow.

---

### 08. Loops and Triggers: The Part That Removes You

Everything up to here still starts with you typing something. Loops are what make the system present instead of punctual.

**Two shapes:**

| Shape | Description | Examples |
|-------|-------------|----------|
| **Scheduled** | Boring, reliable, no thought required | 7am triage, Friday dependency sweep, nightly flaky-test hunt |
| **Triggered** | Work starts before you know there's work | Failing CI run, new issue matching pattern, error rate crossing threshold |

**The safety rule that makes loops survivable:** a loop that can act must have a stopping condition and a budget.

Max attempts, max spend, max blast radius. An agent that retries forever isn't autonomous, it's a bill.

---

### 09. Trust Is a Number You Raise on Purpose

You cannot spawn a hundred agents when you don't trust the output of one. But "trust" here isn't a feeling — it's a promotion ladder you run deliberately.

**The mechanic:**
1. New task type starts at "waits for eyes"
2. You track it — how many of the last 20 would you have approved unchanged?
3. Above your threshold for a sustained stretch, it moves up a rung
4. A failure moves it back down immediately

This is the whole difference between people running one agent and people running twenty. Not a better model. **A promotion process for classes of work, with real numbers behind it.**

Most people never build this, which is why they're stuck at one agent forever, reviewing everything, calling it caution.

---

### 10. Review the Harness Weekly, or It Rots Quietly

Automation decays silently. A site changes layout, a sensor starts passing everything, a rule stops firing — and because it all runs while you sleep, nobody notices for three weeks.

**Fifteen minutes on the calendar. Per routine, three questions:**
1. Did it run?
2. Was the output actually right?
3. Would I miss it if I killed it?

That third one matters most. The natural drift of a system like this is toward a pile of half-useful automations nobody has the nerve to delete.

**Best way to run it:** have the agents report on themselves, then spot-check one output per routine by hand. A bot grading its own work has the same blind spot you do.

---

## The Actual Shift

The old skill was "how do I phrase this."

The new one is **"what exactly am I delegating, and where does its authority end."**

That's not a prompting question. It's a management question — and it's the reason harness engineering is turning into a job title instead of a technique.

> **The model was never the bottleneck. You were, every time you clicked approve.**

---

## Applying This to Baxter

### Current State (Quick Audit)

| Step | Where Baxter Stands | Gap |
|------|---------------------|-----|
| 01. Stop making agent smarter | We use tools, prompts, skills — but no hard constraints | Need invariants (path blocks, permission rules) |
| 02. Define "correct" | Implicit standards in MEMORY.md, SOUL.md | Need written, checkable standards per task type |
| 03. Invariants | Approval gates exist, but ad-hoc | Need formal invariant list (e.g., no wallet ops without human approval) |
| 04. Sensors | exec results, git status, file reads | Need automated grading (tests, schema validation) |
| 05. Gates | Manual approval for destructive ops | Need four explicit rungs with clear criteria |
| 06. One job, one memory | Sub-agents have some specialization | Need narrower charters, cleaner context isolation |
| 07. Coordinator | Main session routes to sub-agents | Could be more explicit — routing logic in code, not conversation |
| 08. Loops and triggers | Cron jobs, heartbeats exist | Need stopping conditions and budgets on loops |
| 09. Trust as numbers | Informal trust based on past performance | Need tracked metrics and promotion ladder |
| 10. Weekly review | Ad-hoc | Need scheduled harness review routine |

### Immediate Opportunities

1. **Write the invariant list** — what can Baxter never do without explicit approval?
2. **Define the four gates** — what ships alone, ships if green, waits for eyes, never alone?
3. **Add stopping conditions** to existing loops (cron retries, sub-agent timeouts)
4. **Build a weekly review routine** — 15 min, three questions, documented

---

*Building this out in public — the full agent stack, what breaks, what ships.*
