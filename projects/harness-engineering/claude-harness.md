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

## Open Questions

- How does this map to Baxter's current architecture (OpenClaw-based, not CrewAI)?
- Which layers from Claude's harness are missing or underdeveloped in Baxter?
- Should we adopt the brain/hands mental model explicitly in documentation?

---

*Technical reference for implementation phase.*
