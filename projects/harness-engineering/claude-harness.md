# Claude Harness — Implementation Architecture

**Part 3: How Claude Code's harness is built**

**Status:** Reference material — Jonah Koch  
**Date:** 2026-11-06

---

## What a Harness Is

A harness is the ordinary code wrapped around the model. It handles:
- Planning
- Tool execution
- Memory
- Safety

The model only decides the next step.

### Components

| Component | What It Does |
|-----------|-------------|
| **Memory** | Feeds the model its working context plus facts learned across sessions |
| **Skills** | Encodes how the agent should operate — procedures, constraints, heuristics |
| **Protocols** | Connects the agent to users, tools, and other agents |
| **Harness Core** | Ties it all together — sub-agent orchestration, sandbox, evaluator, approval loop, observability, context compression |

Anthropic describes this split as **the brain and the hands**. The model is the brain that picks each action, and the harness is the hands that carry it out and keep the run on track.

---

## How Claude Code's Harness Works

### The Core Agent Loop

At the center is a plain agent loop:

1. You send a message
2. The model decides what to do next
3. It either responds directly or requests a tool
4. If it requests a tool, the tool runs, the result goes back into the conversation
5. The model decides again
6. Repeat until the model returns a final answer with no further tool calls

```python
while True:
    reply = model(messages, tools)
    calls = [b for b in reply if b.type == "tool_use"]
    if not calls:  # plain text, no tool call: the job is done
        return reply.text
    messages += [reply, run_all(calls)]
```

Each tool call completes one step, gives the model new information, and feeds into the next decision. A simple question might finish in one iteration, while fixing a complex bug or refactoring a large codebase can take dozens.

### Inside the Loop

The model reads files, edits code, runs shell commands, and executes tests. These aren't separate modes — they're just different tool calls inside the same loop.

**The loop alone isn't enough for a reliable coding agent.** Claude Code adds layers around it:
- Planning
- File tools
- Subagents
- Memory
- Permission and sandbox system

These layers don't replace the loop — they make it safe and reliable enough for real work.

---

## Mapping to CrewAI

The document describes rebuilding this architecture in CrewAI. Here's the mapping:

| Claude Harness Layer | CrewAI Equivalent |
|---------------------|-------------------|
| Core agent loop | Provided automatically when you create an agent |
| Planning | Task definition + agent role/backstory |
| File tools | Built-in file reading/editing tools |
| Subagents | Crew with multiple agents |
| Memory | Memory systems in CrewAI |
| Permission/sandbox | Guardrails and constraints |

### Building the First Agent

```python
from crewai import LLM, Agent, Crew, Task

bug_fixer = Agent(
    role="Bug Fixer",
    goal="Find and describe the fix for the reported bug in the codebase.",
    backstory="You read directories and files to build an accurate picture of the code.",
    llm="claude-sonnet-4-6",
)

task = Task(
    description="Find the fix for {objective}.",
    expected_output="A short description of the fix and which file it belongs in.",
)
```

---

## Key Principles

1. **The model is the brain, the harness is the hands** — don't conflate the two
2. **The loop is simple, the layers around it are not** — safety comes from the harness, not the model
3. **Each layer adds reliability without replacing the loop** — planning, memory, sandbox all complement the core loop
4. **Tool calls are the interface** — everything the model does goes through the same mechanism

---

## Relationship to the Three-Layer Model

| Three-Layer Model | Claude Harness |
|-------------------|----------------|
| **Harness Engineering** | Memory, Skills, Protocols, Harness Core (sandbox, evaluator, approval) |
| **Loop Engineering** | The core while loop + iteration until no tool calls |
| **Graph Engineering** | Sub-agent orchestration, conditional routing between agents |

---

## Running the Crew

```python
result = Crew(agents=[bug_fixer], tasks=[task]).kickoff(
    inputs={"objective": "the overdraft bug in account.py"}
)
```

### Three Concepts to Understand

1. **Agent** — defines who does the work, through its role, goal, LLM, and tools
2. **Task** — describes the assignment
3. **Crew** — brings agents and tasks together. Calling `kickoff()` runs the same execution loop regardless of whether the underlying model is Anthropic, OpenAI, Google, or something else

---

## Giving the Agent Tools

Tools are what let a model that only generates text actually work on a codebase. They read files, write them, run shell commands, and call external APIs.

CrewAI ships file system tools out of the box:
- **FileReadTool** — reads files
- **DirectoryReadTool** — lists directories
- **FileWriterTool** — writes files

```python
from crewai_tools import DirectoryReadTool, FileReadTool, FileWriterTool

read_file = FileReadTool()
write_file = FileWriterTool()
list_dir = DirectoryReadTool()

filesystem_tools = [read_file, write_file, list_dir]
```

### Tools as External Memory

These also double as external memory. Instead of holding a large search result in the model's context window, the agent can write it to a file, keep only the filename, and read it back when needed.

This keeps the context window smaller and the model more focused — what Anthropic calls **context engineering**.

### Custom Tools

Built-in tools cover common workflows only. For anything more specific, expose a Python function as a tool with the `@tool` decorator.

The docstring acts as the instruction manual, telling the model what the tool does, when to use it, and what it expects as input.

```python
from crewai.tools import tool
import subprocess

@tool("run_tests")
def run_tests(path: str = "tests/") -> str:
    """Run the pytest suite at the given path and return the result."""
    result = subprocess.run(
        ["pytest", path, "-q"], capture_output=True, text=True, timeout=120
    )
    output = result.stdout + result.stderr
    return output[-4000:] if len(output) > 4000 else output
```

---

## Planning Long-Running Tasks

As tasks get more complex, a plain execution loop starts losing track of the original goal. After enough tool calls, file reads, and intermediate results, the context fills up and the objective gets crowded out by everything that came after it.

This slow degradation is what people call **context rot**.

Planning addresses it directly. The agent builds a step-by-step plan before doing any work and keeps that plan in context throughout execution.

The plan doesn't do the work. It's a roadmap that keeps the model connected to the original goal — the same job Claude Code's to-do list does.

### CrewAI Planning

CrewAI adds this at the crew level with `planning=True`. It generates a plan before execution and keeps it available as the task progresses.

```python
from crewai import Crew, LLM

crew = Crew(
    agents=self.agents,
    tasks=self.tasks,
    planning=True,
    planning_llm=LLM(model="gpt-4o-mini"),
)
```

By default, CrewAI uses gpt-4o-mini for planning. You can swap in any LLM you prefer for that step.

### Individual Agent Reasoning

Individual agents can also reason about their own work with `reasoning=True`:

```python
from crewai import Agent

bug_fixer = Agent(
    role="Bug Fixer",
    goal="Find and describe the fix for the reported bug in the codebase.",
    backstory="You read directories and files to build an accurate picture of the code.",
    tools=[FileReadTool()],
    reasoning=True,
    max_reasoning_attempts=3  # Optional: limit reasoning iterations
)
```

**Planning and reasoning solve different problems:**
- **Planning** builds a high-level roadmap for the overall task
- **Reasoning** gives one agent time to think through its own approach before acting

**When reasoning is enabled, the agent:**
1. Reflects on the task and drafts an execution plan
2. Evaluates whether the plan is ready
3. Refines the plan if necessary, until satisfied or hits `max_reasoning_attempts`
4. Injects the finalized reasoning plan into the task before execution

Together, they keep the agent anchored on long-running tasks and reduce drift from the original goal.

---

## Delegating with Subagents

Planning keeps the agent focused, but it doesn't reduce how much information the model has to hold. On a large codebase, even a well-planned task can exceed a single context window.

Finding one bug may require reading dozens of files, and the main agent doesn't need to keep all of them in memory.

**Subagents solve this through delegation.** The main agent hands a specific task to a helper agent, which works in its own context and returns a short summary. The main agent sees the conclusion, not the intermediate steps.

CrewAI supports this through **hierarchical workflows**, where a manager agent delegates to specialist agents and combines their results.

### Example: Manager + Three Specialists

Instead of one Bug Fixer doing all the work, split it across a manager and three specialists:

| Role | Responsibility |
|------|---------------|
| **Codebase Explorer** | Explores the code and maps the repository |
| **Software Engineer** | Implements the requested change |
| **Test Runner** | Runs tests in the sandbox and reports pass/fail |
| **Engineering Lead** | Oversees the three specialists, decides who does what |

```python
from crewai import Crew, Agent, Task, Process

explorer = Agent(
    role="Codebase Explorer",
    goal="Map the repository and surface the files relevant to the task.",
    backstory="You read directories and files to build a picture of the code.",
    tools=[read_file, list_dir],
    llm=llm,
)

# Same pattern for Software Engineer and Test Runner

manager = Agent(
    role="Engineering Lead",
    goal="Break the request into steps and delegate each to the right specialist.",
    backstory="You decide who does what, review tests, finish once change is done.",
    llm=llm,
    allow_delegation=True,
)
```

### Key Insight

> **The main agent sees the conclusion, not the intermediate steps.**

This is how you scale beyond one context window without losing coherence.

### Hierarchical Crew Setup

```python
from crewai import Crew, Process

crew = Crew(
    agents=[explorer, coder, tester],
    tasks=[task],
    manager_agent=manager,
    process=Process.hierarchical,
)
```

**Note:** `allow_delegation` is **disabled by default**, so it must be explicitly enabled on the manager.

---

## Sandboxing: Securing Agent Execution

An agent with shell access can run a destructive command, and telling the model not to do something isn't a safeguard.

**Real protection comes from two layers:**
1. A permission system that requires approval for sensitive actions
2. A sandbox that isolates execution, so even approved commands can't touch the host machine

Anthropic uses the same approach. Moving code execution into a sandbox cuts down how often a user needs to approve actions while still protecting the host system.

### Sandboxing in CrewAI

Executing code inside a sandbox rather than on the host machine applies that second layer. In this setup, code runs inside **E2B**, which spins up a fresh VM per session and destroys it afterward.

Shell commands and Python run entirely inside that isolated environment.

```python
from crewai_tools import E2BExecTool, E2BPythonTool

sandbox_tools = [E2BExecTool(), E2BPythonTool()]  # run tests / run code
```

---

## Human-in-the-Loop Approval

Setting `human_input=True` on a Task pauses the crew after it generates an answer. You review the output, then approve it or send it back for another iteration.

When execution reaches that task, CrewAI waits for your feedback through standard input.

```python
from crewai import Task

review_task = Task(
    description="Review the code changes for correctness.",
    human_input=True,  # pauses for human review
)
```

### Key Insight

> **Telling the model not to do something isn't a safeguard. Real protection is permissions + sandbox.**

---

## Key Principles

1. **The model is the brain, the harness is the hands** — don't conflate the two
2. **The loop is simple, the layers around it are not** — safety comes from the harness, not the model
3. **Each layer adds reliability without replacing the loop** — planning, memory, sandbox all complement the core loop
4. **Tool calls are the interface** — everything the model does goes through the same mechanism
5. **Tools double as external memory** — write to files to avoid context rot
6. **Planning prevents context rot** — a roadmap keeps the model connected to the original goal

---

## Relationship to the Three-Layer Model

| Three-Layer Model | Claude Harness |
|-------------------|----------------|
| **Harness Engineering** | Memory, Skills, Protocols, Harness Core (sandbox, evaluator, approval) |
| **Loop Engineering** | The core while loop + iteration until no tool calls |
| **Graph Engineering** | Sub-agent orchestration, conditional routing between agents |

---

## Open Questions

- How does this map to Baxter's current architecture (OpenClaw-based, not CrewAI)?
- Which layers from Claude's harness are missing or underdeveloped in Baxter?
- Should we adopt the brain/hands mental model explicitly in documentation?
- Should we evaluate CrewAI as a potential harness framework for Baxter?

---

*Technical reference for implementation phase.*
