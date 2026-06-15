---
name: superpowers
description: Subagent-driven development with brainstorming, git worktrees, and two-stage review. Use for the full brainstorm→plan→execute pipeline.
triggers: ["superpowers", "brainstorm", "socratic design"]
---

# Superpowers Integration

A complete software development methodology that complements Spec-Harness with brainstorming, git worktrees, and subagent orchestration.

## What It Adds

- **Brainstorming** — Socratic design refinement before specs
- **Git worktrees** — Isolated workspaces per feature branch
- **Executing plans** — Batch execution with human checkpoints
- **Writing skills** — Create and test new skills following best practices

## How It Complements Spec-Harness

| Spec-Harness | Superpowers | Use Together When |
|-------------|-------------|-------------------|
| /grill-me | brainstorming | Superpowers' Socratic approach is a richer grilling |
| /implementer | executing-plans | Superpowers adds batch execution with checkpoints |
| /subagent-driven-dev | subagent-driven-development | Superpowers adds two-stage review (spec + quality) |
| /tdd-loop | test-driven-development | Same philosophy, both enforce RED-GREEN-REFACTOR |

## Setup

```bash
# Claude Code
/plugin install superpowers@claude-plugins-official
```

## Usage Pattern

1. Start with Superpowers' **brainstorming** instead of `/grill-me` for complex features
2. Transition to Spec-Harness' `/spec-author` for formal EARS/Gherkin specification
3. Use Superpowers' **git worktrees** for isolated development
4. Use Spec-Harness' `/reviewer` and `/mutation-tester` for verification

## Origin

[github.com/obra/superpowers](https://github.com/obra/superpowers) — by Jesse Vincent / Prime Radiant.
