---
name: spec-author
description: Writes EARS/Gherkin spec with acceptance criteria and boundaries. Use after /grill-me, before coding.
triggers: ["spec author", "write spec", "spec this", "create requirements"]
---

# Spec Author

Transform the grilling output into a precise, verifiable spec using EARS notation and Gherkin scenarios. This spec is the contract between the human and the agents.

## Overview

The spec is the single source of truth. Every line of implementation traces back to a requirement here. If it's not in the spec, it doesn't get built. If it's in the spec, it must be verified.

## When to Use

- After `/grill-me` completes
- When you have a clear idea but need to formalize it
- Before `/implement` — always
- When converting a vague request into actionable requirements

## Input Artifacts

- Grilling session notes (from `/grill-me`)
- Existing `SPEC.md` (if updating)
- `CONTEXT.md` (project terminology, if exists)

## Output Artifact

- `SPEC.md` — The requirements document, replacing previous version

## Process

### Step 1: Classify Requirements with EARS

For each requirement, assign an EARS pattern:

| Pattern | Template | Example |
|---------|----------|---------|
| Ubiquitous | The \<system\> shall \<feature\> | The system shall display the user's name |
| Event-Driven | When \<trigger\>, the \<system\> shall \<response\> | When the user clicks "Save", the system shall persist changes |
| Unwanted Behavior | If \<unwanted condition\>, the \<system\> shall \<response\> | If the network is unavailable, the system shall queue changes locally |
| State-Driven | While \<state\>, the \<system\> shall \<feature\> | While the user is authenticated, the system shall allow edits |
| Optional Feature | Where \<feature\> is enabled, the \<system\> shall \<behavior\> | Where dark mode is enabled, the system shall use the dark palette |

### Step 2: Write Gherkin Scenarios

For each EARS requirement, write at least one Gherkin scenario:

```gherkin
Feature: [name from EARS requirement]

  Scenario: [happy path]
    Given [precondition]
    When [action]
    Then [expected result]

  Scenario: [edge case / error]
    Given [precondition]
    When [action]
    Then [expected error handling]
```

### Step 3: Define Boundaries

Explicitly state what is OUT of scope:

```markdown
## Out of Scope
- [thing we will NOT build, and why]
- [thing deferred to later, and why]
```

### Step 4: Specify Verification Criteria

For each requirement, state how it will be verified:

```markdown
## Verification
- [REQ-001]: Unit test — given input X, expect output Y
- [REQ-002]: Integration test — given API call, expect response Z
- [REQ-003]: Manual check — visual alignment matches design
```

### Step 5: Present for Approval

Show the spec to the user in sections. Wait for explicit approval before proceeding.

**This is Human Approval Gate #1.** No code is written until the user says "approved" or "go".

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "I'll write the spec as I code" | That's not a spec, that's a commit message. Spec before code, always. |
| "The spec is too detailed for this small change" | Small changes need small specs. Even 2 EARS requirements is better than none. |
| "Agile means no spec" | Agile means working software over documentation — not broken software over clarity. |
| "I'll skip Gherkin, plain English is fine" | Plain English is ambiguous. Gherkin is verifiable. The spec must be testable. |

## Verification

Before presenting the spec, confirm:

- [ ] Every requirement uses EARS notation
- [ ] Every EARS requirement has at least one Gherkin scenario
- [ ] Boundaries (out of scope) are explicit
- [ ] Verification criteria are stated for each requirement
- [ ] No implementation details in the spec (no "how", only "what")
- [ ] Spec is self-contained (another agent could implement from this alone)
