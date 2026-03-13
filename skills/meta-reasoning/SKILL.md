---
name: meta-reasoning
description: Deep, structured reasoning for complex problems. Use when explicitly asked to "think deeply," "use meta-reasoning," or for novel complex problems where multiple approaches exist and failure modes aren't clear. NOT for routine tasks, simple lookups, or well-understood patterns. Invoke only when the user explicitly requests heavy analysis or the stakes/uncertainty warrant the overhead.
---

# Meta Reasoning Engine

Structured deep-thinking framework for complex problem-solving.

## When to Use

- User explicitly asks for "deep thinking," "meta-reasoning," or "structured analysis"
- Novel complex problems with unclear solution paths
- High-stakes decisions where failure modes matter
- Debugging mysterious failures after simple approaches failed
- Problems where you've seen similar ones fail before

## The Framework

### 1. MAP THE SOLUTION SPACE
- What approaches could solve this?
- Which approaches have I seen fail before?
- What's the probability each approach succeeds?

### 2. PLAN YOUR REASONING PATH
- What do I need to figure out first?
- What dead ends should I avoid?
- What checkpoints will tell me if I'm on track?

### 3. EXECUTE WITH AWARENESS
- Try approach. Document why.
- If stuck, backtrack explicitly. Note what didn't work.
- When breakthrough happens, note the pivot that unlocked it.

### 4. META-ANALYZE
- What reasoning pattern worked?
- Why did failed approaches fail?
- What would I do differently next time?

## Output Structure

```
SOLUTION SPACE: [mapped approaches]
CHOSEN PATH: [with reasoning]
EXECUTION LOG: [including dead ends]
ANSWER: [final solution]
META-INSIGHT: [what this taught about reasoning]
```

## Usage Notes

- This is expensive (token-heavy). Use deliberately.
- Skip sections if they don't add value for the specific problem.
- The goal is rigorous thinking, not rigid format-following.
