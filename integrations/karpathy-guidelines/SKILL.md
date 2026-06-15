---
name: karpathy-guidelines
description: Simplicity-first coding principles from Andrej Karpathy's observations on LLM coding pitfalls. Always-on principles, not a skill you invoke.
triggers: ["karpathy", "simplicity first", "think before coding", "surgical changes"]
---

# Karpathy Guidelines Integration

Four principles from Andrej Karpathy's observations on LLM coding pitfalls, distilled into always-on guidelines. Not a skill you invoke — principles you load.

## The Four Principles

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State assumptions explicitly — if uncertain, ask rather than guess
- Present multiple interpretations — don't pick silently when ambiguity exists
- Push back when warranted — simpler approach exists? Say so
- Stop when confused — name what's unclear and ask for clarification

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked
- No abstractions for single-use code
- No "flexibility" or "configurability" that wasn't requested
- No error handling for impossible scenarios
- If 200 lines could be 50, rewrite it

**The test:** Would a senior engineer say this is overcomplicated? If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

- Don't "improve" adjacent code, comments, or formatting
- Don't refactor things that aren't broken
- Match existing style, even if you'd do it differently
- If you notice unrelated dead code, mention it — don't delete it

**The test:** Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform imperative tasks into verifiable goals:

| Instead of... | Transform to... |
|--------------|-----------------|
| "Add validation" | "Write tests for invalid inputs, then make them pass" |
| "Fix the bug" | "Write a test that reproduces it, then make it pass" |
| "Refactor X" | "Ensure tests pass before and after" |

## How It Complements Spec-Harness

These principles are already embedded in Spec-Harness's design. Loading them explicitly reinforces:

- **/implementer** already enforces surgical changes
- **/tdd-loop** already enforces goal-driven execution (RED = define success, GREEN = achieve it)
- **/grill-me** already enforces think-before-coding
- **/spec-author** prevents simplicity violations by requiring EARS specificity

## Installation

```bash
# Per-project
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md

# Or as Claude Code plugin
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

## Origin

[github.com/forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) — derived from [Karpathy's observations](https://x.com/karpathy/status/2015883857489522876).
