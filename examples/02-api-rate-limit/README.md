# Example 02: API Rate Limiter Middleware

Second example — a simpler case: a rate limiter for a REST API.

## The Scenario

You need to protect REST API endpoints against abuse (same client making too many requests). Not a full feature — a reusable component.

> This example shows how the flow works for components, not just user-facing features.

---

## Step 1: `/grill-me` (summarized)

```
A: "What does this rate limiter protect?"
U: "API endpoints. Limit of 100 requests/minute per API key."

A: "What happens when the limit is exceeded?"
U: "Returns 429 Too Many Requests with Retry-After header."

A: "Do you need different granularity? Per IP, per user, per API key?"
U: "Per API key. Each client has a unique key."

A: "Is it per-request or per-second?"
U: "Per minute — sliding window of 1 minute."

A: "What's the narrowest slice?"
U: "An Express middleware that uses a sliding window per API key, 100 req/min, returns 429 with Retry-After."
```

---

## Step 2: SPEC.md generated

See: [`SPEC.md`](SPEC.md)

---

## Step 3: Spec Review

See: [`REVIEW.md`](REVIEW.md) (verdict on spec clarity and testability)

---

## Step 4: Implementation

Vertical slices:

```bash
git log --oneline feature/rate-limit

abc123 feat(middleware): REQ-001 sliding window rate limit per API key
def456 feat(middleware): REQ-002 fail-open for requests without API key
```

---

## Step 5: Judge Review

See: [`REVIEW.md`](REVIEW.md) — verdict on whether code matches spec. In this case: APPROVED.

---

## Step 6: Mutation Testing

See: [`MUTATION_REPORT.md`](MUTATION_REPORT.md)

---

## Step 7: Ship

```bash
git checkout main
git merge feature/rate-limit --squash
git commit -m "feat(middleware): API rate limiter with sliding window

Implements:
- Sliding window rate limit per API key (REQ-001)
- Fail-open for requests without API key (REQ-002)
- Tests: 8 passing, mutation score 81%

Human gates: SPEC approved, RESULT approved"
```

---

## Insights from This Example

### What We Learned

1. **Small specs are valid** — 2 EARS requirements for a reusable middleware. They don't need to be complete user features.
2. **Fail-open vs fail-closed** — For rate limiting, fail-open makes sense (don't block legitimate requests due to limiter issues).
3. **Sliding window** — Implemented with Redis or an in-memory Map. For the example, we use in-memory `Map` with automatic cleanup.

### Differences from Example 01

| Aspect | Example 01 (Auth) | Example 02 (Rate Limiter) |
|---------|-------------------|---------------------------|
| Spec size | 4 requirements | 2 requirements |
| Grilling sessions | 1 long | 1 short |
| Team involved | Human reviewing | Human reviewing |
| Deployment scope | Complete feature | Reusable component |
| Time to implement | ~4 hours | ~1 hour |

### The Key Point

**The Spec-Harness flow scales.** Whether it's a 50-requirement auth system or a 2-requirement middleware — the process is the same: interview, specify, grill, implement with TDD, judge review, mutation test, ship.

---

## Example Files

```
examples/02-api-rate-limit/
├── SPEC.md              ← EARS/Gherkin for the rate limiter
├── REVIEW.md            ← Judge review verdict
├── MUTATION_REPORT.md   ← Mutation testing results
└── README.md            ← This file
```
