# REVIEW — [Feature Name]

> Spec compliance review. Judge the code against the spec, not against style preferences.

## Reviewer Context

- **SPEC.md version:** [commit hash or date]
- **Code reviewed:** [list of files or commit range]
- **Test suite status:** [X passing, Y failing]

## Requirement-by-Requirement Review

### [REQ-001]: [Requirement Name]

**Verdict: PASS | FAIL | PARTIAL**

**Evidence:**
- [test name] passes — covers [scenario]
- [code location] implements [behavior]

**Gap (if FAIL/PARTIAL):**
- [missing behavior or test]

---

### [REQ-002]: [Requirement Name]

[Continue pattern]

---

## Boundary Check

- [ ] No code exists without a corresponding requirement
- [ ] No "out of scope" items were implemented (scope creep)
- [ ] No TODO/FIXME comments indicating incomplete work

## Test Quality

- [ ] Tests verify behavior (outputs), not implementation (internals)
- [ ] No mock-only tests for internal logic
- [ ] Edge cases have tests
- [ ] Error paths have tests

## Summary

| Metric | Value |
|--------|-------|
| Requirements | X total |
| PASS | Y |
| PARTIAL | Z |
| FAIL | W |

## Overall Verdict: APPROVED | REVISIONS NEEDED | REJECTED

**Next step:** If APPROVED → `/mutation-tester`. If REVISIONS NEEDED → `/implementer` with gaps. If REJECTED → `/spec-author`.
