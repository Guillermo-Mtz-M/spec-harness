# MUTATION REPORT — [Feature Name]

> Adversarial test quality verification. Kill the mutants or fix the tests.

## Summary

| Metric | Value |
|--------|-------|
| Total mutants | X |
| Killed | Y |
| Survived | Z |
| Equivalent | W |
| Timeout | T |
| **Mutation score** | **Y/X = %** |

## Target

- Mutation score >= 70%
- No survived mutants without documented justification

## Survived Mutants

| File:Line | Original | Mutation | Root Cause | Action |
|-----------|----------|----------|-------------|--------|
| `src/model.ts:42` | `+` | `-` | Missing test for error path | ADDED test_invalid_sum |
| `src/service.ts:87` | `<` | `<=` | Equivalent (boundary is inclusive) | DOCUMENTED |

## Killed Mutants (Sample)

| File:Line | Mutation | Killed By |
|-----------|---------|-----------|
| `src/model.ts:15` | `return x` → `return 0` | test_calculate_total |

## Verdict: PASS | FAIL

- **PASS**: Mutation score >= 70%, all survivors documented
- **FAIL**: Mutation score < 70% or undocumented survivors

**Next step:** If PASS → [Human Approval Gate #2] → `/ship`. If FAIL → `/implementer` with weak test list.
