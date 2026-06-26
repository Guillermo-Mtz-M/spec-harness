---
name: context-engineer
description: Minimize token usage, progressive context loading, external memory. Use at session start or context bloat.
version: 1.0.0
license: MIT
allowed-tools: []
triggers: ["context", "tokens", "manage memory", "reduce context"]
---
# Context Engineer

Context is a budget. Spend it wisely. Each agent gets only the context it needs, loaded progressively, with external memory for persistence across sessions.

## Overview

The #1 cause of AI agent quality degradation is context bloat. As the conversation grows, the agent loses track of what matters. This skill provides systematic practices for minimizing, loading, and persisting context.

Based on the Harness Engineering principle: **tools simples > hiperespecializados, y el contexto es un presupuesto**.

## When to Use

- At session start (load only what's needed)
- When output quality drops (likely context overload)
- Before delegating to a subagent (minimize its context)
- When switching tasks (compact and reload)

## Process

### Step 1: Assess Current Context

Ask: "What does the agent actually need to know RIGHT NOW?"

Classify existing context:
- **Essential** â€” must be in context for this task
- **Background** â€” useful but not critical (load on demand)
- **Noise** â€” conversation history that's no longer relevant

### Step 2: Minimize Active Context

1. **Move background to files** â€” if it's in the conversation but not needed now, save it to a file and reference it
2. **Use CONTEXT.md** â€” shared terminology that replaces long explanations
3. **Progressive disclosure** â€” load reference material only when a skill triggers it, not upfront
4. **External memory** â€” use `HANDOFF.md` or `graphify` knowledge graph for cross-session persistence

### Step 3: Structure the Context Stack

```
Layer 0 (always loaded):     AGENTS.md + CONTEXT.md (<2KB)
Layer 1 (session start):    SPEC.md + current task (<5KB)
Layer 2 (skill triggers):    Reference checklists + templates (on demand)
Layer 3 (deep dive):         Full codebase via tools (search/read, not context)
```

### Step 4: Compact When Needed

When context exceeds ~60% of the budget:
1. Save a `HANDOFF.md` with key decisions, progress, and next steps
2. Start a fresh session
3. Load only Layer 0 + Layer 1

### Step 5: Hand Off Between Agents

When delegating to a subagent, give it:
- Its input artifact (SPEC.md for reviewer, code for mutation-tester)
- Its instructions (the skill prompt)
- Nothing else â€” no conversation history, no other agents' context

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "More context is better" | More context = more noise. Agents confuse Signal with Signal-Like Noise. |
| "I'll just include everything" | That's what killed Vercel/D0. Context overload causes quality collapse. |
| "The agent needs the full history" | No. It needs its input artifact and its instructions. History is noise. |
| "External memory is too slow" | File reads are milliseconds. Context bloat costs minutes of poor output. |

## Verification

- [ ] Context stack has â‰¤4 layers defined
- [ ] Layer 0 is <2KB
- [ ] No background info is loaded upfront
- [ ] Subagents receive only their input artifact + skill prompt
