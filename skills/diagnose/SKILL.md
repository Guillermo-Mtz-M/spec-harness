---
name: diagnose
description: Systematic debugging: reproduce, minimize, hypothesize, fix, guard. Use for bugs or regressions.
version: 1.0.0
license: MIT
allowed-tools: []
triggers: ["diagnose", "debug", "bug", "broken", "fix this"]
---
# Diagnose

Disciplined diagnosis loop for hard bugs and performance regressions. No guessing. No "try this and see." Reproduce. Minimize. Hypothesize. Fix. Guard.

## Overview

Debugging is engineering, not divination. The diagnosis skill enforces a scientific method: observe, hypothesize, test, verify. Every fix must be guarded by a test that would have caught the original bug.

## When to Use

- Tests fail unexpectedly
- Builds break
- Runtime behavior doesn't match expectations
- Performance regression
- "It was working yesterday"

## Process

### Step 1: Reproduce

1. Find the exact steps that trigger the bug
2. Write them down
3. Verify they reproduce consistently

**Gate:** Can you reproduce the bug on demand? If not, you can't verify the fix.

### Step 2: Minimize

1. Reduce the reproducer to the smallest possible case
2. Remove everything that's not required to trigger the bug
3. The minimal reproducer should be a single test case

**Gate:** Is the reproducer minimal? If you remove anything else, does the bug disappear?

### Step 3: Hypothesize

1. State your hypothesis: "I believe the bug is in [code] because [reasoning]"
2. List the top 3 possible causes, ranked by probability
3. Design an experiment to test each hypothesis (one at a time)

**Gate:** Can you falsify your hypothesis? If not, it's not a hypothesis â€” it's a guess.

### Step 4: Fix

1. Implement the fix (minimal change)
2. The minimal reproducer test must now pass
3. No other tests should break

**Gate:** Does the fix address the root cause or just the symptom? Root cause only.

### Step 5: Guard

1. Write a regression test that would have caught this bug
2. The test should fail without the fix and pass with it
3. Add the test to the permanent suite

**Gate:** If someone reverts the fix, does the guard test catch it?

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "I know what the bug is" | Then write a test that proves it. If the test doesn't fail, you're wrong. |
| "Let me just try this fix" | That's not debugging, that's guessing. Hypothesize first. |
| "The bug is obvious" | Obvious bugs often have non-obvious root causes. Minimize and verify. |
| "I'll add a regression test later" | Later never comes. The guard test IS the completion of the fix. |

## Verification

- [ ] Bug is reproducible on demand
- [ ] Reproducer is minimal
- [ ] Hypothesis was stated BEFORE the fix was tried
- [ ] Fix addresses root cause (not symptom)
- [ ] Guard test exists and catches the bug
