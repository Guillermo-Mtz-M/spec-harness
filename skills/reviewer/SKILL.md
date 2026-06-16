---
name: reviewer
description: Fresh-context judge reviews implementation against the spec. Use after implementation, before shipping.
triggers: ["review", "judge", "check against spec", "does this meet requirements"]
---

# Reviewer (Judge)

A fresh-context agent reviews the code against the spec. Not style opinions — spec compliance. The spec is the judge, not the reviewer's preferences.

## Overview

This is the Uncle Bob Judge pattern: an independent agent, with fresh context (only the spec and the code, not the conversation history), determines whether the implementation satisfies the requirements.

## When to Use

- After `/implement` completes all vertical slices
- Before human approval gate #2
- When you suspect the implementation drifted from the spec

## Input Artifacts

- `SPEC.md` — the approved requirements
- Implementation code (files changed since spec approval)
- Test suite output (all tests passing)

## Output Artifact

- `REVIEW.md` with verdicts per requirement

## Process

### Step 1: Fresh Context Load

Read ONLY:
1. `SPEC.md` (the contract)
2. The changed files
3. The test suite output

Do NOT read:
- The conversation history (to avoid author bias)
- The implementer's reasoning (judge the output, not the intent)

### Step 2: Requirement-by-Requirement Review

For each EARS requirement in the spec:

```markdown
### [REQ-XXX]: [requirement text]

**Verdict: PASS | FAIL | PARTIAL**

**Evidence:**
- [test name] passes — covers [scenario]
- [code location] implements [behavior]

**Gap (if FAIL/PARTIAL):**
- [missing behavior or test]
```

### Step 3: Boundary Check

- [ ] Does any code exist that doesn't trace to a spec requirement?
- [ ] Were any "out of scope" items implemented? (flag as scope creep)
- [ ] Are there TODO/FIXME comments indicating incomplete work?

### Step 4: Test Quality Review

For the test suite, check:
- [ ] No mock-only tests for internal logic
- [ ] Tests verify behavior (outputs), not implementation (internals)
- [ ] Edge cases have tests
- [ ] Error paths have tests

### Step 5: Write Verdict

```markdown
## Review Verdict

### Requirements Coverage: [X/Y PASS, Z PARTIAL, W FAIL]

### Overall: [APPROVED | REVISIONS NEEDED | REJECTED]
```

**If APPROVED:** Hand off to `/mutation-tester` for adversarial testing.
**If REVISIONS NEEDED:** Return to `/implementer` with specific gaps.
**If REJECTED:** Fundamental spec-code mismatch. Return to `/spec-author`.

## Anonymization Principle

When this review feeds into `/council-review`, reviewer identity must be stripped before synthesis. This prevents the chairman from anchoring on reviewer labels instead of evidence logic. The principle (from karpathy/llm-council):

- **Identity concealment** — Reviews are presented as anonymous perspectives, not "Review A by [persona]"
- **No favoritism** — The chairman evaluates logic, not who said it
- **No anchoring** — Removing labels prevents biasing synthesis toward any single perspective

This principle applies when reviews enter the council pipeline. For standalone `/reviewer` usage, it documents the anti-bias stance that underpins all review processes.

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "The code works, just minor style issues" | If it doesn't match the spec, it doesn't work. Style is irrelevant here. |
| "I tested it manually" | Manual testing is not reproducible. The spec requires automated verification. |
| "The test covers it conceptually" | "Conceptually" is not "actually." Show me the test that fails if the behavior is removed. |
| "That edge case won't happen in practice" | The spec says handle it. If the spec is wrong, change the spec. |

## Verification

- [ ] Every EARS requirement has a PASS/FAIL verdict
- [ ] Every verdict is backed by specific test evidence
- [ ] No code exists without a corresponding requirement
- [ ] Overall verdict is clear and actionable
