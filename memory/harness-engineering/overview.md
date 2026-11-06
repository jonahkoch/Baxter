# Harness Engineering — Accumulating Context

**Status:** Receiving from Jonah — multi-message transfer in progress
**Date:** 2026-11-06
**Source:** Jonah Koch

---

## The 30-Second Answer

- **Harness engineering** builds the machinery around the model
- **Loop engineering** designs the repeated work-and-feedback cycle
- **Graph engineering** makes the workflow topology explicit: nodes, branches, joins, state transitions and controlled cycles

The clean mental model is **environment → feedback → flow**.

---

## Why These Terms Suddenly Matter

A raw language model cannot create text, maintain a state for a project, run a test suite, look at a browser, enforce an approval rule, or restart a failed job. Those capabilities come from the environment it's in. As agentic software matures, a standard engineering stack is finally coming together:

1. **Agent harness** — the code that actually runs the models
2. **Loops** — repeating execution and quality checks
3. **Graphs** — structured paths that guide the entire process

Labels are still not consistently standardized:
- The term "agent harness" is starting to take on a specific definition
- "Loop engineering" arose as a newer term among practitioners in 2026
- Graph engineering should be understood practically — creating agent workflows as explicit directed graphs or state machines

This practical distinction prevents a buzzword from hiding the real design question.

---

## Agent Harness Engineering

### Definition

According to Langchain, the agent is the model plus the harness, and the harness is the code, configuration and execution logic outside the model. In practice, this includes:
- System prompt
- Tool definitions
- Memory
- Filesystems
- Sandboxes
- Model routing
- Handoffs
- Middleware hooks
- Compaction
- Permissions
- Logging
- Verification interfaces

OpenAI's Agents SDK describes the same operational core from a runtime perspective: the runner calls the model, executes tool calls, handles handoffs, carries state and stops only when the run reaches a real terminal condition.

### Why "Harness"

The word harness is useful because it shifts attention away from model worship. Two teams can use the same foundation model and get very different outcomes because:
- One gives the model clean tools, a stable workspace, constrained permissions and observable state
- The other gives it a vague prompt and an unreliable API wrapper

The intelligence may be similar; the working conditions are not.

### What a Serious Harness Usually Contains

| Layer | Components |
|-------|-----------|
| **Context injection** | Instructions, retrieved facts, conversation state, skills, task-specific policies |
| **Action surfaces** | APIs, browsers, shells, code interpreters, databases, MCP-compatible tools |
| **Persistence** | Files, checkpoints, sessions, progress logs, git history, long-term memory |
| **Execution control** | Timeouts, retries, budgets, model routing, sub-agent spawning, approval gates |
| **Safety and governance** | Permissions, isolation, allow lists, secret handling, human authorization |
| **Observability** | Traces, tool inputs and outputs, state transitions, cost, latency, evaluation results |

### Mental Model

> Remove the model from your architecture diagram. Everything left is probably part of the harness: the tools, data access, state store, sandbox, middleware, evaluators, retry policy and UI.

### Where Harness Engineering Earns Its Keep

Harness work is important for long-running tasks. In multi-session coding, Anthropic discovered that simply using context compaction was not sufficient. This was not a better prompt by itself, but they made a good setup that created:
- An initializer
- A progress file
- Git history
- A discipline of incremental work that each new context can understand what happened and what is still to do

It's an improved working system with regard to the agent.

**Apply harness engineering when:**
- The agent doesn't have a capability
- Can't come back clean
- Loses state
- Accesses too much
- Can't be audited
- Acts differently on environments

---

## Loop Engineering

### The Basic Agent Loop

Each agent that uses a tool has an embedded small loop:
1. Call the model
2. Look at the results
3. Run the tools
4. Input observations into the model
5. Repeat until a final answer is returned

When builders intentionally build or stack new cycles around that behavior, it is the beginning of loop engineering, as OpenAI calls it.

### Types of Loops

| Loop Type | What It Does |
|-----------|-------------|
| **Verification loop** | Create artifact → run deterministic check/grader → receive explicit feedback → repeat if errors exist |
| **Event-driven loop** | Awaken agent when schedule, webhook, or new document is received |
| **Improvement loop** | Analyze traces & failures → modify instructions/tools → test if new version works better |

LangChain's 2026 framing refers to these as a **stack of loops**, not one magic while-statement.

### Anatomy of a Well-Engineered Loop

| Component | Description |
|-----------|-------------|
| **Trigger** | What starts another cycle: user request, schedule, failed test, new data, evaluator feedback |
| **Goal** | A specific state to reach, not a vague instruction to "keep improving" |
| **State and memory** | What the next cycle needs to know without replaying everything |
| **Action policy** | What the agent may change, call, delegate or spend |
| **Evidence** | Tests, schema validation, citations, diffs, metrics, or human review |
| **Feedback** | A compact, actionable description of why the evidence failed |
| **Stopping rule** | Success, budget limit, timeout, irrecoverable error, or human escalation |

### Verification Loop

A verification loop wraps the agent loop with an external grader and an explicit pass condition.

> **Do not loop on confidence. Loop on evidence.**

"The agent says it is done" is not a stopping condition. "The tests pass, the links resolve, the schema validates and the reviewer approves" is.

### Why Loop Engineering Is Not Just Prompt Engineering

A prompt tells the model what to do during a call. A loop specifies what the system does **after** the call:
- How it observes results
- Chooses feedback
- Decides whether to continue
- Persists progress
- Terminates

Prompt quality still matters, but the loop converts a one-shot instruction into a managed process.

### Tradeoff: Cost and Latency

Each grader, reviewer or retry adds another model call or tool run. Anthropic's broader guidance is to prefer the simplest architecture that works and add agentic complexity only when the performance gain justifies it. The same advice applies to loops: add them where the failure cost is higher than the verification cost.

---

## Graph Engineering

### The Core Question

Graph engineering asks a different question: **Not only what the agent does, but what component is permitted to run next.**

Steps are represented by nodes and allowed steps are represented by edges. These edges can indicate:
- Sequence
- Conditional branching
- Parallel fan-out
- Joins
- Loops
- Human interrupts

The state traverses the graph, and the topology allows the desired control flow to be checked.

### Framework Perspectives

**LangGraph** is low-level orchestration infrastructure for long-running, stateful agents, with:
- Durable execution
- State and human-in-the-loop control
- Explicit focus on control over agents rather than abstraction of the workflow

**Microsoft AutoGen** is straightforward: use a graph when you need:
- Exact control over agent order
- Different next steps for different outcomes
- Deterministic branching
- Complex multi-step processes with cycles

### What Graph Engineers Actually Decide

| Decision | Description |
|----------|-------------|
| **Node boundaries** | Which work belongs in a deterministic function, an LLM call, a specialist agent, or a human review step |
| **State schema** | What each node may read or update, and how parallel updates are merged |
| **Routing conditions** | Which evidence sends work forward, backward, sideways, or to escalate |
| **Concurrency** | What can run in parallel, what must join, and what shared resources need coordination |
| **Cycles and exits** | Where retries are legal, how many are allowed, and what makes the cycle safe |
| **Durability** | Where checkpoints occur and how execution resumes after interruption |

### Important Distinction

> Graph engineering here means **engineering graph-based execution**. It is not the same as knowledge graph engineering, where the graph represents entities and relationships in data. A workflow graph represents **control and state transitions**.

The above canvas makes agents, skills and relationships inspectable as a composed system.

### When a Graph Is Worth the Ceremony

**Graphs are valuable when:**
- The process has meaningful branches
- Parallel work
- Approvals
- Recovery paths
- Multiple specialist agents

**Graphs are less useful when:**
- The job is simply "give one agent three tools and let it work"

A graph can improve debugging, but it can also freeze assumptions too early. If the model must dynamically invent the plan, forcing every possible path into a diagram can make the system more brittle, not less.

---

## How the Three Layers Work Together in One Real System

Consider a research-and-publishing agent responsible for producing a factual industry briefing.

- **Harness:** Does the agent have access to search APIs, a document editor, citation validation, and a publishing target? Is state saved so a crash doesn't lose the draft?
- **Loop:** After each section is written, does a fact-checker run? If citations fail, is feedback returned to the writer? Is there a max retry count?
- **Graph:** Which paths must be deterministic? Where can work run in parallel? Which state is shared? Where are the human gates and recovery routes?
- **Evaluation:** Can the team replay real traces, compare versions and attribute improvement to a specific change rather than intuition?
- **Operations:** Are cost, latency, failure rate, intervention rate and task-level success monitored in production?

---

## The Expensive Mistakes Behind Weak Agent Architectures

### Building a Graph Before Understanding the Work

Teams sometimes translate a business process into dozens of nodes before they have observed how a capable agent actually solves it. **Start with traces from a simpler harness, then formalize the stable paths.**

### Letting the Same Model Write and Grade Without Safeguards

Self-review can help, but it is vulnerable to shared blind spots. Prefer:
- Deterministic checks where possible
- Separate reviewer context
- Human approval for high-impact actions

### Using "Keep Trying" as a Loop Specification

An unbounded retry loop is a cost leak. Every loop needs:
- A measurable objective
- Fresh evidence
- Maximum attempts
- A named escalation path

### Treating the Harness as a Dumping Ground

More tools and memory are not automatically better. A crowded toolset raises selection errors, a noisy context raises confusion, and broad permissions raise risk.

### Blaming the Model for Orchestration Failures

A model cannot compensate reliably for:
- Stale state
- Ambiguous tool schemas
- Broken APIs
- Missing exit conditions

**Improve the layer that owns the failure.**

---

## The Simplest Way to Remember the Difference

- **Harness engineering** — something to make the model operate
- **Loop engineering** — iterative, verifiable and resumable methodology
- **Graph engineering** — makes complex execution paths explicit and controllable

**None of the three substitutes for any of the others.**

- A beautifully drawn graph is not sufficient if the harness has lost its state
- The best harness is a waste of money if there is no evidence or stop rule
- Carefully crafted loops are hard to operate when branching, parallelism and approvals are embedded in ad-hoc code

If these three layers are designed jointly, reliable agent systems will arise — provided the team is aware of what each layer is supposed to solve.

---

## A Production-Ready Design Checklist

### Harness
- [ ] Are tools narrow, documented and observable?
- [ ] Is state durable?
- [ ] Are permissions least-privilege?
- [ ] Can operators pause, inspect and resume a run?

### Loop
- [ ] What evidence proves success?
- [ ] What feedback is returned on failure?
- [ ] How many retries are allowed?
- [ ] What happens when the budget is exhausted?

### Graph
- [ ] Which paths must be deterministic?
- [ ] Where can work run in parallel?
- [ ] Which state is shared between nodes?
- [ ] Where are the human gates and recovery routes?

---

## Resources and Further Reading

| Resource | URL | Topic |
|----------|-----|-------|
| The Anatomy of an Agent Harness | https://www.langchain.com/blog/the-anatomy-of-an-agent-harness | Harness fundamentals |
| Agents SDK (OpenAI) | https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/ | Runtime perspective |
| LangChain & LangGraph v1.0 | https://www.langchain.com/blog/langchain-langgraph-1dot0 | Production-ready frameworks |
| GraphFlow (AutoGen) | https://microsoft.github.io/autogen/stable//user-guide/agentchat-user-guide/graph-flow.html | Workflow graphs |
| The Art of Loop Engineering | https://www.langchain.com/blog/the-art-of-loop-engineering | Loop design patterns |
| AutoGen Studio (Microsoft) | https://www.microsoft.com/en-us/research/blog/introducing-autogen-studio-a-low-code-interface-for-building-multi-agent-workflows/ | Multi-agent UI |
| How to Build a Custom Agent Harness | https://www.langchain.com/blog/how-to-build-a-custom-agent-harness | Custom harness guide |
| A Practical Guide to Building Agents | https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/ | Comprehensive guide |
| Building Effective AI Agents (Anthropic) | https://resources.anthropic.com/building-effective-ai-agents | Production guidance |

---

## Search Terms Readers Use

- agent harness vs loop engineering
- graph engineering for AI agents
- AI agent orchestration
- LLM agent architecture
- production AI agents
- LangGraph workflows
- AutoGen GraphFlow
- agent verification loops

---

## Next Steps

- [ ] Apply this framework to Baxter / OpenClaw architecture audit
- [ ] Identify which layer needs attention first
- [ ] Map existing patterns (cron loops, sub-agent spawning, approval gates) to the three-layer model
- [ ] Design improvements based on the production-ready checklist

---

*First batch complete. Awaiting Jonah's direction on next phase.*
