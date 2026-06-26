---
name: spec-review
description: Fresh-context review of a spec against ambiguity checklist. Use before approving the spec.
version: 1.0.0
license: MIT
allowed-tools: []
triggers: ["spec review", "review spec", "spec quality", "check spec"]
---
# Spec Review

An independent agent reviews the spec for ambiguity, incompleteness, and testability. Fresh context â€” no author bias.

## Overview

The author of a spec is blind to its flaws. This skill uses a fresh context to review the spec as if you were the implementer who has to build from it, with zero access to the author.

## When to Use

- After `/spec-author` produces `SPEC.md`
- Before human approval gate #1
- When updating an existing spec

## Input Artifact

- `SPEC.md`

## Output Artifact

- `REVIEW.md` with verdicts (PASS / FLAG / BLOCK)

## Process

### Step 1: Ambiguity Scan

Read the spec with "implementer eyes." For each requirement, check:

- [ ] Can I implement this without asking clarifying questions?
- [ ] Is every term defined (no hand-waving like "properly", "correctly", "appropriately")?
- [ ] Are edge cases covered or explicitly deferred?
- [ ] Are error behaviors specified?
- [ ] Are there conflicting requirements?

### Step 2: Testability Check

For each Gherkin scenario, check:

- [ ] Can I write a failing test for the `Given-When-Then`?
- [ ] Is the `Then` assertion measurable/observable?
- [ ] Are test preconditions achievable in isolation?

### Step 3: Completeness Check

- [ ] Are all user flows covered?
- [ ] Are all error paths specified (not just happy path)?
- [ ] Is the boundary ("out of scope") explicit and justified?
- [ ] Are non-functional requirements stated (performance, security, accessibility)?

### Step 4: Write Review

Format:

```markdown
## Spec Review

### BLOCK (must fix before approval)
- [REQ-XXX]: [ambiguity or contradiction] â€” "X could mean A or B"

### FLAG (should fix, but not blocker)
- [REQ-XXX]: [weakness] â€” "No error behavior specified for case Y"

### PASS (no issues)
- [REQ-XXX]: Clear, testable, unambiguous

### Verdict: [PASS|PASS WITH FLAGS|BLOCKED]
```

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "The spec is good enough, let's start coding" | Ambiguity is 10x cheaper to fix in the spec than in code. |
| "I'll clarify during implementation" | That's how you get scope creep and rework. Clarify now. |
| "This is just a small spec" | Small specs can have big ambiguities. Review size is proportional. |

## Verification

Before presenting the review:
- [ ] Every EARS requirement has a verdict (PASS / FLAG / BLOCK)
- [ ] Every FLAG has a clear description of the weakness
- [ ] Every BLOCK has a specific, actionable fix
- [ ] The overall verdict is clear and actionable
- [ ] The review was written with fresh context (not conversation history)
