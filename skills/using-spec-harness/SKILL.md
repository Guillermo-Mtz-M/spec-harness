---
name: using-spec-harness
description: Maps the user's task to the right spec-harness skill. Use at session start or when the user asks what to do.
version: 1.0.0
license: MIT
allowed-tools: []
triggers: ["help", "how to", "what next", "guide me"]
---
# Using Spec-Harness

You just installed Spec-Harness. Now what? This skill maps your task to the right workflow.

## Overview

Spec-Harness is a system of composable skills. Not every task needs every skill. This guide helps you find the right path.

## Process

### Step 1: What Are You Doing?

| Your Situation | Start Here |
|---------------|-----------|
| "I have a vague idea" | `/grill-me` |
| "I know what I want, write the spec" | `/spec-author` |
| "Spec approved, build it" | `/implement` |
| "Something is broken" | `/diagnose` |
| "I'm lost in the details" | `/zoom-out` |
| "Context is too long, start fresh" | `/handoff` |
| "Multiple tasks, need parallelism" | `/subagent-driven-dev` |
| "Done building, check quality" | `/reviewer` |
| "Tests pass, prove they work" | `/mutation-tester` |
| "Everything verified, ship it" | `/ship` |
| "Need up-to-date library docs" | `/context7` (integration) |
| "Build a knowledge graph of my code" | `/graphify` (integration) |

### Step 2: Follow the Flow

The canonical flow is:

```
/grill-me â†’ /spec-author â†’ [HUMAN APPROVES SPEC] â†’ /implement â†’ /reviewer â†’ /mutation-tester â†’ [HUMAN APPROVES RESULT] â†’ /ship
```

But you can enter at any point if you have the prerequisites:

- `/implement` requires an approved SPEC.md
- `/reviewer` requires implementation + tests
- `/mutation-tester` requires passing review
- `/ship` requires passing mutation test + human approval

### Step 3: Know the Two Gates

**Human Approval Gate #1** â€” After `/spec-author`. The human decides: "Is this what I want?"

**Human Approval Gate #2** â€” After `/mutation-tester`. The human decides: "Does this work?"

Between the gates, the harness runs autonomously. That's the point.

### Step 4: Integrations Are Opt-In

The 5 integrations (graphify, superpowers, bmad-method, karpathy-guidelines, context7) are pre-wired but optional. Use them when their specific capability is needed:

- `graphify` â€” when you need a structural understanding of a codebase
- `superpowers` â€” when you want the full subagent-driven brainstormâ†’planâ†’execute pipeline
- `bmad-method` â€” when you want scale-adaptive planning with 12+ specialized agents
- `karpathy-guidelines` â€” when you want simplicity-first coding principles always loaded
- `context7` â€” when you need up-to-date documentation for any library

## When to Use

- At the start of a session to find the right skill
- When you're not sure which skill to use next
- When you want to understand how the skills connect

## Quick Decision Tree

```
"Build something" â†’ Is there a SPEC.md?
  â”œâ”€â”€ No â†’ /grill-me â†’ /spec-author
  â””â”€â”€ Yes â†’ Is it approved?
       â”œâ”€â”€ No â†’ /spec-review â†’ [human approves]
       â””â”€â”€ Yes â†’ /implement â†’ /reviewer â†’ /mutation-tester â†’ [human approves] â†’ /ship
"Fix something" â†’ /diagnose
"Understand something" â†’ /zoom-out or /graphify
"Need docs for [library]" â†’ /context7
"Save my progress" â†’ /handoff
```

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "I don't need to use any skill, I'll just code" | That's vibe coding. The spec is the source of truth, not the conversation. |
| "I'll skip the spec and just implement" | Spec before code. Always. Or you'll build the wrong thing and have to redo it. |
| "I can skip to /reviewer" | Reviewer needs a spec to judge against. Without spec, it's just opinions. |

## Verification

Before starting any task, confirm:
- [ ] You know which skill to use (or `/using-spec-harness` to find out)
- [ ] You have the required input artifact (e.g., SPEC.md for /implement)
- [ ] You understand which approval gates apply
