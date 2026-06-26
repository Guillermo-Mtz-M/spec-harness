---
name: implementer
description: Build thin vertical slices with TDD from an approved spec. Use after the spec is approved.
version: 1.0.0
license: MIT
allowed-tools: []
triggers: ["implement", "build", "start coding", "code from spec"]
---
# Implementer

Build the spec one vertical slice at a time. Every slice goes through the TDD loop. Every slice produces a commit. No forward progress without passing tests.

## Overview

Implementation is decomposed into independently verifiable vertical slices. Each slice delivers one end-to-end piece of functionality. This minimizes risk, maximizes feedback, and produces a clean commit history.

## When to Use

- After spec is approved (human approval gate #1 passed)
- When the spec has clear EARS requirements and Gherkin scenarios
- Ready to write code

## Input Artifacts

- `SPEC.md` â€” the approved requirements
- `CONTEXT.md` â€” project terminology (if exists)
- Existing codebase

## Output Artifacts

- Implementation code with tests
- Commit per vertical slice

## Process

### Step 1: Decompose Into Vertical Slices

Read `SPEC.md` and break requirements into independently implementable slices:

```
Slice 1: [REQ-001, REQ-002] â€” Core data model + basic CRUD
Slice 2: [REQ-003] â€” Validation layer
Slice 3: [REQ-004, REQ-005] â€” Error handling + edge cases
Slice 4: [REQ-006] â€” Integration with external service
```

Rules:
- Each slice is independently testable
- Each slice can be committed on its own
- Slices are ordered by dependency (core first)
- Each slice is 1-3 hours of work max

### Step 2: For Each Slice, Run `/tdd-loop`

1. Write a failing test for the slice's Gherkin scenario
2. Write minimal code to make the test pass
3. Refactor if needed
4. Commit with message: `feat(scope): [requirement id] [short description]`

### Step 3: Verify Against Spec

After each slice, check:
- [ ] Which EARS requirements does this slice satisfy?
- [ ] Do the Gherkin scenarios pass?
- [ ] No code was written that doesn't trace to a requirement

### Step 4: Continue Until All Slices Complete

Do NOT:
- Skip ahead to a later slice before finishing the current one
- Implement "nice to have" features not in the spec
- Refactor unrelated code (YAGNI)
- Add abstractions for future flexibility

### Step 5: Signal Completion

When all slices are done, hand off to `/reviewer`.

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "Let me implement the whole thing then write tests" | That's not TDD. Write tests first. Always. |
| "This slice depends on a future slice" | Then reorder the slices. Dependencies go first. |
| "I'll add error handling later" | Error handling is a slice, not an afterthought. Schedule it. |
| "This is too small for a vertical slice" | Small slices are the best slices. Ship fast, verify fast. |
| "I need to refactor this other code first" | Only if the spec requires it. Otherwise: surgical changes only. |

## Verification

- [ ] Every EARS requirement has at least one passing test
- [ ] Every Gherkin scenario has a corresponding test
- [ ] No code exists that doesn't trace to a spec requirement
- [ ] All tests pass
- [ ] Commit history is clean (one commit per slice)
