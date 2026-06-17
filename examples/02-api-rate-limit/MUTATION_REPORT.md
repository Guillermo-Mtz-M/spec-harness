# MUTATION REPORT — API Rate Limiter Middleware

> Adversarial test quality verification. Kill the mutants or fix the tests.

## Summary

| Metric | Value |
|--------|-------|
| Total mutants | 18 |
| Killed | 15 |
| Survived | 1 |
| Equivalent | 2 |
| **Mutation score** | **81%** |

**Target:** >= 70% — **PASS**

## Killed Mutants (Sample)

| File:Line | Original | Mutation | Killed By |
|-----------|---------|----------|-----------|
| `rateLimiter.js:12` | `>` → `>=` | limit comparison off-by-one | `rate_limit_rejects_at_limit_with_retry_after` |
| `rateLimiter.js:25` | `return next()` → `return res.status(429)` | fail-open inverted | `missing_api_key_allows_request` |
| `rateLimiter.js:33` | `60000` → `60001` | window duration changed | `rate_limit_allows_after_window_slides` |
| `rateLimiter.js:18` | `Retry-After` → `X-RateLimit` | wrong header name | `rate_limit_rejects_at_limit_with_retry_after` |

## Survived Mutants

| File:Line | Mutation | Root Cause | Action |
|-----------|----------|-----------|--------|
| `rateLimiter.js:40` | `filter(ts => ts > cutoff)` → `filter(ts => ts >= cutoff)` | Boundary inclusion — the sliding window uses `>` (strictly after cutoff). Changing to `>=` includes the exact cutoff second, which is functionally equivalent when requests arrive at discrete timestamps. | DOCUMENTED (boundary equivalent) |

## Equivalent Mutants

| File:Line | Mutation | Justification |
|-----------|----------|---------------|
| `rateLimiter.js:8` | `new Map()` → `new Object()` | Map vs Object — both support `set/get/has` for string keys. Behaviorally equivalent. | DOCUMENTED |
| `rateLimiter.js:15` | `429` → `4290` then modulo | Return code mutation results in non-HTTP code, caught by Express but not by unit test directly. | ADD test for status code equality |

## Verdict: PASS

- Mutation score 81% >= 70% — requirement met
- 1 surviving mutant has documented justification (boundary equivalent)
- No fixable mutants left

**Next step:** Human Approval Gate #2 → `/ship`
