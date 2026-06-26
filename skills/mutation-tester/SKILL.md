---
name: mutation-tester
description: Adversarial mutation testing requiring >=70% mutation score. Use after council-review approves.
version: 1.0.0
license: MIT
allowed-tools: []
triggers: ["mutation", "adversarial test", "kill mutants"]
---
# Mutation Tester

Automatically inject faults into the code. If the test suite doesn't catch them, the tests are weak. Kill the mutants or fix the tests.

## Overview

100% code coverage means nothing if the tests don't actually verify behavior. Mutation testing proves the tests are effective by introducing small changes (mutants) and checking whether the test suite catches them.

This is the final verification before human approval gate #2.

## When to Use

- After `/reviewer` approves (PASS on all requirements)
- Before shipping
- When you suspect tests are superficial

## Input Artifacts

- `SPEC.md` â€” requirements
- Implementation code + tests
- `REVIEW.md` â€” reviewer verdict

## Output Artifact

- `MUTATION_REPORT.md` â€” mutation results and coverage

## Process

### Step 1: Generate Mutants

For each function/method in the changed code, apply these mutation operators:

| Operator | Description | Example |
|----------|-------------|---------|
| Arithmetic | Replace operator | `+` â†’ `-`, `*` â†’ `/` |
| Logical | Replace connector | `&&` â†’ `\|\|`, `!` â†’ `` |
| Conditional | Change boundary | `<` â†’ `<=`, `==` â†’ `!=` |
| Return value | Replace return | `return x` â†’ `return 0` / `return null` |
| Statement deletion | Remove line | Delete an assignment or method call |
| Variable replacement | Swap variable | `user.id` â†’ `user.name` |

### Step 2: Run Mutants

For each mutant:
1. Apply the mutation to the source
2. Run the test suite
3. Record result:
   - **KILLED** â€” at least one test fails (good)
   - **SURVIVED** â€” all tests pass (bad â€” tests don't catch this bug)
   - **TIMEOUT** â€” test suite hangs (neutral â€” inconclusive)

### Step 3: Analyze Surviving Mutants

For each surviving mutant, determine the root cause:

1. **Weak test** â€” the test exists but doesn't assert this behavior â†’ FIX the test
2. **Missing test** â€” no test covers this code path â†’ ADD a test
3. **Equivalent mutant** â€” the mutation doesn't change observable behavior â†’ DOCUMENT and skip

### Step 4: Fix or Document

For each survived mutant:
- If fixable: add or improve a test â†’ re-run â†’ verify KILLED
- If equivalent: document why in the report

### Step 5: Write Report

```markdown
## Mutation Report

### Summary
- Total mutants: X
- Killed: Y (Y/X = mutation score)
- Survived: Z
- Equivalent: W
- Timeout: T

### Target
- Mutation score â‰¥ 70% (industry standard for meaningful test quality)
- No survived mutants without documented justification

### Survived Mutants
| Line | Mutation | Root Cause | Action |
|------|----------|-------------|--------|
| file.ts:42 | `+` â†’ `-` | Missing test for error path | ADDED test_check_invalid_sum |
| file.ts:87 | `<` â†’ `<=` | Equivalent (boundary is inclusive) | DOCUMENTED |

### Verdict: [PASS | FAIL]
- PASS: Mutation score â‰¥ 70%, all survivors documented
- FAIL: Mutation score < 70% or undocumented survivors
```

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "100% coverage is enough" | Coverage measures execution, not assertion. Mutation measures whether tests catch bugs. |
| "Mutation testing is too slow" | Run it on changed code only, not the whole project. And slow verification is faster than fast bugs. |
| "70% is too low a bar" | 70% is the industry standard. 100% is unrealistic due to equivalent mutants. Focus on killing important mutants. |
| "That surviving mutant is equivalent" | Prove it. Show that the mutated behavior is indistinguishable from the original in ALL contexts. |
| "The tests are good enough" | If they're good enough, they'll kill the mutants. If mutants survive, the tests aren't good enough. |

## Verification

- [ ] Mutation score â‰¥ 70%
- [ ] Every surviving mutant has a documented justification
- [ ] All newly added tests pass
- [ ] Report is complete and actionable
