---
name: tdd-loop
description: Red-Green-Refactor TDD cycle with verification gates. Use during implementation.
triggers: ["tdd", "red green refactor", "test driven", "write test first"]
---

# TDD Loop

Enforce the Red-Green-Refactor cycle. Write a failing test. Make it pass. Refactor. Commit. Repeat.

## Overview

Tests are not an afterthought — they are the specification in executable form. The TDD loop ensures every piece of code is born with a test that proves it works.

## When to Use

- During `/implement` — for every vertical slice
- Fixing a bug — write a test that reproduces it first
- Refactoring — ensure tests pass before and after

## Process

### Phase 1: RED — Write a Failing Test

1. Pick one Gherkin scenario from `SPEC.md`
2. Write a test that expresses the scenario's `Then` assertion
3. Run the test — it must FAIL
4. If it passes, the test is wrong (or the feature already exists)

**Red gate:** Test fails for the RIGHT reason (assertion error, not setup error).

### Phase 2: GREEN — Make It Pass

1. Write the MINIMUM code to make the test pass
2. Do NOT add features beyond what the test requires
3. Do NOT add abstractions that aren't needed yet
4. Run the test — it must PASS

**Green gate:** Test passes. No other tests broke.

### Phase 3: REFACTOR — Clean Up

1. Look at the code. Is it simple? Does it follow the project's conventions?
2. Can 200 lines be 50?
3. Remove duplication. Deepen modules. Clarify names.
4. Run ALL tests — must still pass
5. Commit

**Refactor gate:** All tests pass. No behavior changed.

### Phase 4: LOOP

Pick the next Gherkin scenario. Go to Phase 1.

## Test Quality Rules

### DO:
- Test behavior, not implementation
- Use the Beyonce Rule: "If you liked it, then you shoulda put a test on it"
- Follow the test pyramid: 80% unit, 15% integration, 5% E2E
- Use DAMP (Descriptive And Meaningful Phrases) over DRY in test files
- Test boundary conditions and error cases, not just happy paths

### DON'T:
- Mock internal modules (mock external boundaries only)
- Test private methods directly
- Write tests that depend on other tests' state
- Use `sleep()` or timing-dependent assertions
- Write "integration" tests that are actually unit tests with mocks

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "I'll add tests after" | You won't. And if you do, they'll test the implementation, not the behavior. |
| "This is too simple to test" | Then the test is simple to write. 3 lines of assert. |
| "Testing this is hard" | Hard-to-test code is a design smell. Simplify the design. |
| "I need to see it working first" | Write a test that shows it working. That's the point. |
| "Mocking makes this easier" | Mocks don't prove your code works — they prove your mocks work. Mock external boundaries only. |

## Verification

After each RED-GREEN-REFACTOR cycle:
- [ ] Test was written BEFORE the implementation
- [ ] Test failed for the right reason ( RED gate)
- [ ] Implementation is minimal (no speculatively added features)
- [ ] All tests pass ( GREEN gate)
- [ ] Code is simpler than before refactor ( REFACTOR gate)
