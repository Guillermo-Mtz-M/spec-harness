# SPEC — [Feature Name]

> Spec-Driven Development artifact. Every line of code traces back to a requirement here.

## Overview

[1-3 sentences: what this feature does, for whom, and why.]

## Requirements

### REQ-001: [Requirement Name]

**EARS Pattern:** [Ubiquitous | Event-Driven | Unwanted | State-Driven | Optional]

**The [system] shall [requirement]:**

[Detailed description]

**Gherkin Scenarios:**

```gherkin
Feature: [Requirement Name]

  Scenario: [Happy path]
    Given [precondition]
    When [action]
    Then [expected result]

  Scenario: [Edge case]
    Given [precondition]
    When [action]
    Then [expected error handling]
```

**Verification:**
- [ ] Unit test: [test description]
- [ ] Integration test: [test description]

---

### REQ-002: [Requirement Name]

[Continue pattern for each requirement]

---

## Out of Scope

- [Feature]: [Why it's deferred or excluded]
- [Feature]: [Why it's deferred or excluded]

## Assumptions

- [Assumption about the system or environment]
- [Assumption about user behavior]

## Dependencies

- [External dependency and version]
- [Internal dependency on other requirements]

## Context

- **Project:** [name]
- **Stack:** [technologies]
- **Test command:** [how to run tests]
