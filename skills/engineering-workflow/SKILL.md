# Engineering Workflow

A composable, skill-based approach to real engineering work. Inspired by Matt Pocock's agent skills, adapted for OpenClaw.

**Philosophy:** Plan before doing. Clarify before building. Validate before committing. Compose skills as needed — don't follow a rigid process.

---

## When to Use

- Starting a new coding project or feature
- Refactoring existing code
- Debugging complex issues
- Any work where "just vibe code it" would create debt

**Trigger phrases:** "wayfind this", "start engineering project", "plan this feature", "build this properly"

---

## The Workflow (Composable Phases)

```
wayfind → grill → prototype → spec → tickets → implement → review → handoff
```

Not every project needs every phase. Use judgment. A quick script skips wayfinding; a complex feature runs the full chain.

---

## Phase 1: Wayfind

**Purpose:** Map the decision landscape before building.

**When:** The work is too big for one session, or the path isn't clear.

**How:**
1. Ask: "What does 'done' look like?" (the destination)
2. Identify open decisions — questions that must be answered before building
3. Create a decision log: `memory/engineering/<project>-wayfinder.md`

**Decision log format:**
```markdown
# Wayfinder: <Project Name>

## Destination
<one-line: what reaching the end looks like>

## Decisions Made
- [x] <decision> → <rationale> → <link to where it's recorded>

## Open Decisions
- [ ] <question> — blocker? yes/no — how to resolve?

## Fog of War
<suspected decisions not yet sharp enough to formalize>

## Out of Scope
<consciously excluded work>
```

**Rule:** Only one decision per session (except research). Never resolve more without checking in.

---

## Phase 2: Grill

**Purpose:** Clarify requirements through structured questioning.

**When:** Requirements are fuzzy, or the user says "I think I want..."

**How:**
1. Ask specific, narrow questions
2. Never answer for the user
3. Surface assumptions explicitly
4. Record answers in the decision log

**Grilling prompts:**
- "What does success look like?"
- "Who is the user? What do they actually do?"
- "What are the constraints (time, tech, budget)?"
- "What have you tried before?"
- "What would make you say 'no, that's wrong'?"

**Rule:** If you find yourself assuming, stop and ask.

---

## Phase 3: Prototype

**Purpose:** Build throwaway code to answer a design question.

**When:** "How should this look?" or "Does this logic feel right?"

**How:**
1. Pick the question (UI vs logic)
2. Build the minimum to answer it
3. No tests, no polish, no persistence
4. Make it trivial to run
5. Surface state after every action

**Rules:**
- Throwaway from day one — name it `.prototype/` or `prototype-*`
- No persistence unless the question explicitly involves it
- Skip error handling beyond "runnable"
- Commit to a throwaway branch, never main

---

## Phase 4: To-Spec

**Purpose:** Lock decisions into a buildable spec.

**When:** Decisions are clear, ready to plan implementation.

**How:**
1. Write `SPEC.md` in the project directory
2. Include: goal, constraints, interface, data model, error cases
3. Reference the decision log
4. Get explicit sign-off before proceeding

**Spec template:**
```markdown
# Spec: <Feature Name>

## Goal
<one paragraph>

## Constraints
- <time/tech/budget limits>

## Interface
<APIs, UI, CLI — whatever the boundary is>

## Data Model
<entities and relationships>

## Error Cases
<what can go wrong and what should happen>

## Decisions
<link to wayfinder log>

## Out of Scope
<what we're not building>
```

---

## Phase 5: To-Tickets

**Purpose:** Break the spec into implementation units.

**When:** Spec is approved, ready to build.

**How:**
1. Create `TICKETS.md` or use GitHub issues
2. Each ticket: one unit of work, estimable in one session
3. Mark dependencies between tickets
4. Label: `ready`, `blocked`, `in-progress`, `done`

**Ticket format:**
```markdown
## <Ticket ID>: <Title>

**Goal:** <one line>
**Depends on:** <ticket IDs>
**Acceptance:** <how we know it's done>
```

---

## Phase 6: Implement

**Purpose:** Build the thing.

**When:** Tickets are ready, dependencies clear.

**How:**
1. Pick one ticket per session
2. Read the spec first
3. Build the minimal viable version
4. Test as you go (manual first, automated if spec demands)
5. Commit incrementally

**Rules:**
- Never build without reading the spec
- If the spec is wrong, stop and update it
- One ticket per session (unless trivial)
- Commit working code, not perfect code

---

## Phase 7: Review

**Purpose:** Validate before considering done.

**When:** Ticket is "complete."

**How:**
1. Re-read the acceptance criteria
2. Test the happy path
3. Test one error case
4. Check for obvious issues (security, performance, edge cases)
5. Ask: "Would I want to maintain this?"

**Review checklist:**
- [ ] Acceptance criteria met
- [ ] Happy path works
- [ ] One error case handled
- [ ] No obvious security issues
- [ ] No obvious performance issues
- [ ] Code is readable

---

## Phase 8: Handoff

**Purpose:** Preserve context for the next session.

**When:** Context is getting full, or work is pausing.

**How:**
1. Update `memory/engineering/<project>-handoff.md`
2. Record: where we are, what's next, blockers
3. Update the decision log with any new decisions
4. Commit everything

**Handoff format:**
```markdown
# Handoff: <Project Name>

## Last Session
<date, what was done>

## Current State
<what's built, what's not>

## Next Ticket
<what to pick up next>

## Blockers
<what's stopping progress>

## Decisions Made This Session
<link to wayfinder log>
```

---

## Using Subagents

For parallel work (research, independent tickets), use `sessions_spawn`:

```
Research tickets → sessions_spawn with context="isolated"
Independent builds → sessions_spawn with context="isolated"
Related work → sessions_spawn with context="fork" (shares transcript)
```

**Rule:** Never spawn more than 3 subagents at once. Coordinate through files, not messages.

---

## Integration with Existing Tools

| Tool | How it's used |
|------|---------------|
| `memory/` | Decision logs, handoffs, specs |
| `sessions_spawn` | Parallel research/tickets |
| `git` | Incremental commits, throwaway branches |
| `read`/`write`/`edit` | Specs, tickets, code |
| `exec` | Testing, running prototypes |

---

## Quick Reference

| Situation | Start with |
|-----------|-----------|
| "I have an idea" | Wayfind |
| "I think I want..." | Grill |
| "How should this work?" | Prototype |
| "Build this feature" | To-Spec → To-Tickets → Implement |
| "Fix this bug" | Diagnose → Implement → Review |
| "Refactor this" | Wayfind (if big) → To-Tickets → Implement |
| "Context is full" | Handoff |

---

## Anti-Patterns

❌ **Skipping wayfinding on big projects** → You'll discover blockers mid-build
❌ **Answering your own grilling questions** → The user must speak for themselves
❌ **Prototyping without a question** → You're just building, not learning
❌ **Building without a spec** → Scope creep, misalignment, debt
❌ **Resolving multiple tickets per session** → Context loss, shallow work
❌ **No handoff** → Next session starts blind

---

## Example Invocation

**User:** "I want to add user authentication to my app"

**Me:**
1. **Wayfind** → "Let me map the decisions. GitHub OAuth? Email/password? JWT sessions?"
2. **Grill** → "Who are the users? Do you need password reset? Rate limiting?"
3. **To-Spec** → Write `SPEC.md` with chosen auth flow
4. **To-Tickets** → Ticket 1: OAuth setup, Ticket 2: Session middleware, Ticket 3: Logout
5. **Implement** → Build Ticket 1
6. **Review** → Test login flow, check token handling
7. **Handoff** → "Ticket 1 done. Next: Ticket 2 (session middleware). No blockers."

---

*This skill is composable. Use the phases you need, skip the rest. The goal is shipping good code, not following a process.*
