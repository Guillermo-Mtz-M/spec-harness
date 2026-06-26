---
name: subagent-driven-dev
description: Dispatch fresh subagents per task via file artifacts. Use for multi-slice specs.
version: 1.0.0
license: MIT
allowed-tools: []
triggers: ["subagent", "dispatch", "parallel tasks", "multi-agent"]
---
# Subagent-Driven Development

Break the plan into tasks. Each task gets a fresh subagent with its own context. The orchestrator reviews each result before proceeding. Artifacts (not conversation history) are the handoff mechanism.

## Overview

The context problem: a single agent holding all context for a multi-task project degrades rapidly. The solution: give each task a fresh agent with only the context it needs. The orchestrator coordinates via artifacts.

Based on the Harness Engineering principle: **handoff entre agentes por ficheros (artefactos), no por herencia de contexto**.

## When to Use

- Implementing multi-slice specs (3+ vertical slices)
- When the plan has independent or parallelizable tasks
- When context budget is a concern for a single agent

## Process

### Step 1: Decompose Work

From the approved plan, identify:

1. **Sequential tasks** â€” must complete before the next starts (dependencies)
2. **Parallel tasks** â€” can run simultaneously (no dependencies between them)

### Step 2: Define Agent Chunks

For each task, define:
- **Input artifact** â€” what the agent reads (SPEC.md, previous task's output)
- **Instructions** â€” which skill to use (/implement, /tdd-loop, etc.)
- **Output artifact** â€” what the agent produces (code, test results, REVIEW.md)
- **Success criteria** â€” how the orchestrator verifies completion

### Step 3: Dispatch

```
Orchestrator
â”œâ”€â”€ Agent 1 (fresh context): Slice 1 â†’ produces code + tests
â”œâ”€â”€ Agent 2 (after Agent 1): Slice 2 (depends on 1) â†’ produces code + tests
â”œâ”€â”€ Agent 3 (parallel with 2): Slice 3 (independent) â†’ produces code + tests
â””â”€â”€ Agent 4 (after all): /reviewer â†’ produces REVIEW.md
```

### Step 4: Review Each Agent's Output

For each completed agent:
1. Verify success criteria are met
2. Run the test suite
3. Check the output artifact for completeness
4. If failed: diagnose, fix, or re-dispatch

### Step 5: Two-Stage Review

1. **Spec compliance** â€” does the output match what the spec required?
2. **Code quality** â€” is the code simple, clean, and idiomatic?

Critical issues block progress. Non-critical issues are logged but don't stop forward motion.

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "One agent can do it all" | One agent with full context degrades. Fresh agents with minimal context produce better results. |
| "Handoff files are overhead" | 5 minutes to write a HANDOFF.md saves 30 minutes of degraded output. |
| "I'll just keep going in the same session" | Then you inherit all the noise. Fresh context is a feature, not a cost. |
| "Reviewing each agent's work is slow" | Catching bugs early is faster than debugging a cascade of failures later. |

## Verification

- [ ] Each agent's input/output is defined before dispatch
- [ ] No agent inherits another agent's conversation history
- [ ] Orchestrator reviews every agent's output before proceeding
- [ ] Two-stage review (spec + quality) is applied
