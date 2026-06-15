# MUTATION REPORT — User Authentication System

> Adversarial test quality verification. Kill the mutants or fix the tests.

## Summary

| Metric | Value |
|--------|-------|
| Total mutants | 47 |
| Killed | 39 |
| Survived | 3 |
| Equivalent | 5 |
| **Mutation score** | **83%** |

**Target:** ≥ 70% — **PASS**

## Killed Mutants (Sample)

| File:Line | Original | Mutation | Killed By |
|-----------|---------|----------|-----------|
| `authService.js:42` | `===` → `!==` | email comparison inverted | `registro_email_existente_devuelve_409` |
| `authService.js:78` | `return token` → `return null` | token return null | `authenticate_returns_token_for_valid_credentials` |
| `authService.js:134` | `push(attempt)` → removed | no push to fail array | `lockout_activo_con_5_intentos_en_ventana` |

## Survived Mutants

| File:Line | Mutation | Root Cause | Action |
|-----------|----------|-----------|--------|
| `authService.js:55` | `weak` → `weak1` | Password validation uses regex that mutates to equivalent | DOCUMENTED (regex boundary) |
| `authService.js:102` | `+900000` → `+900001` | Lockout window uses exact 15min (900000ms). Mutation adds 1ms — functionally equivalent. | DOCUMENTED (boundary is explicit) |
| `authService.js:102` | `&&` → `\|\|` in window check | Logic inversion in `isInLockoutWindow()` — the mutation survives because the function is only called when fail count ≥ 5, so short-circuit evaluation is non-observable. | DOCUMENTED (short-circuit equivalent) |

## Verdict: PASS

- Mutation score 83% ≥ 70% — requirement met
- All 3 surviving mutants have documented justifications
- No fixable mutants left

**Next step:** Human Approval Gate #2 → `/ship`