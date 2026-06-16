---
name: council-review
description: Multi-perspective anonymous review. Three specialist reviews (spec compliance, performance/edge cases, security/maintainability) synthesized by a chairman into a unified verdict.
triggers: ["council review", "multi-review", "anonymous review", "council", "three reviews"]
---

# Council Review

Multiple independent reviews from different perspectives, anonymized and synthesized by a chairman. Inspired by karpathy/llm-council's 3-stage deliberation: opinions → anonymous peer review → chairman synthesis.

## Overview

This is the karpathy/llm-council pattern: multiple independent reviews from different specialist perspectives, anonymized to prevent bias, and synthesized by a chairman into a single unified verdict. The key insight — anonymization removes anchoring bias and favoritism, producing more objective assessments than any single review.

## When to Use

- After `/reviewer` gives APPROVED or REVISIONS NEEDED
- For high-stakes features (security-sensitive, performance-critical, user-facing)
- When a single review perspective might miss blind spots

## When NOT to Use

- Trivial changes (typo fixes, config changes)
- When `/reviewer` already gave APPROVED with no PARTIALs

## Input Artifacts

- `SPEC.md` — the approved requirements
- Implementation code (files changed since spec approval)
- `REVIEW.md` — the single-perspective review (if exists)
- Test suite output

## Output Artifact

- `COUNCIL-REVIEW.md` with synthesized verdicts per requirement

## Process

### Stage 1: Independent Opinions

Launch 3 reviews with different specialist personas. Each receives ONLY `SPEC.md` and the changed files (no conversation history, no access to other reviews):

| Review | Persona | Focus |
|--------|---------|-------|
| **Review A** | Spec Compliance Engineer | Does the code match each EARS requirement? Any scope creep? |
| **Review B** | Performance & Edge Case Specialist | Are there edge cases, race conditions, performance traps? Does error handling cover all paths? |
| **Review C** | Security & Maintainability Architect | Are there security vulnerabilities? Is the code maintainable? Any anti-patterns? |

Each review produces verdicts per requirement (PASS/FAIL/PARTIAL) with evidence.

### Stage 2: Anonymization

Before synthesis:
- Strip reviewer identity (A/B/C) from the chairman's input
- Present reviews as anonymous perspectives to prevent anchoring bias
- Preserve verdict logic and evidence, remove persona labels

### Stage 3: Chairman Synthesis

The council-chairman agent receives the 3 anonymized reviews and produces a unified `COUNCIL-REVIEW.md`:

```markdown
## Council Synthesis

### [REQ-XXX]: [requirement text]

**Council Verdict: PASS | FAIL | PARTIAL**

**Consensus:** [2/3 PASS, 1/3 PARTIAL — explanation]

**Key Disagreements:** [none | description of where reviews diverged]

**Action Items:** [specific steps if FAIL/PARTIAL]
```

### Graceful Degradation

If fewer than 3 reviews are available (e.g., context window limits):
- 2 reviews: proceed with notation "Reduced confidence (2/3 reviews)"
- 1 review: note "Single-perspective only; consider running remaining reviews separately"

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "One review is enough" | A single perspective has blind spots. That's why code review is a team sport. |
| "The reviews all say PASS" | Consensus is valuable — it means multiple independent eyes agree. |
| "This is overkill for a small change" | Then use `/reviewer` alone. Council review is for high-stakes features. |
| "The chairman might be biased" | Anonymization removes identity anchoring. The chairman sees logic, not labels. |

## Verification

- [ ] 3 independent reviews produced (or graceful degradation noted)
- [ ] Reviews are anonymized before chairman synthesis
- [ ] Every EARS requirement has a council verdict
- [ ] Key disagreements are highlighted (not hidden)
- [ ] Overall verdict is clear and actionable
