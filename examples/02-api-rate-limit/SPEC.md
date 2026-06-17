# SPEC — API Rate Limiter Middleware

> Spec-Driven Development artifact. Every line of code traces back to a requirement here.

## Overview

Rate limiting middleware for REST API endpoints. Protects against abuse by limiting requests per API key using a sliding window algorithm. Fail-open design: missing API keys pass through.

## Requirements

### REQ-001: Rate limit per API key

**EARS Pattern:** State-Driven

**While the request count for an API key within a sliding window of 1 minute exceeds 100, the system shall reject the request:**

When a request arrives with an `X-API-Key` header, the system counts requests within a sliding window of 1 minute for that key. If the count exceeds 100, the system returns HTTP 429 with a `Retry-After` header indicating seconds until the oldest request in the window expires.

**Gherkin Scenarios:**

```gherkin
Feature: Rate Limit Per API Key

  Scenario: Request allowed under the limit
    Given API key "test-key-001" has 99 requests in the last 60 seconds
    When a request arrives with header "X-API-Key: test-key-001"
    Then the request is allowed through
    And the request count for "test-key-001" becomes 100

  Scenario: Request rejected at the limit
    Given API key "test-key-001" has 100 requests in the last 60 seconds
    When a request arrives with header "X-API-Key: test-key-001"
    Then the system returns HTTP 429
    And the response includes header "Retry-After" with seconds until oldest request expires

  Scenario: Request allowed after window slides
    Given API key "test-key-001" has 100 requests in the last 60 seconds
    And the oldest request is 61 seconds old
    When a request arrives with header "X-API-Key: test-key-001"
    Then the request is allowed through
    And the request count for "test-key-001" is recalculated excluding expired entries

  Scenario: Different API keys have independent counters
    Given API key "key-A" has 100 requests in the last 60 seconds
    And API key "key-B" has 50 requests in the last 60 seconds
    When a request arrives with header "X-API-Key: key-B"
    Then the request is allowed through
```

**Verification:**
- [ ] Unit test: rate_limit_allows_under_limit
- [ ] Unit test: rate_limit_rejects_at_limit_with_retry_after
- [ ] Unit test: rate_limit_allows_after_window_slides
- [ ] Unit test: independent_counters_per_api_key

---

### REQ-002: Requests without API key

**EARS Pattern:** Unwanted Behavior

**The system shall NOT reject requests that lack an API key:**

If a request arrives without an `X-API-Key` header, the system shall allow the request through without rate limiting. This is a fail-open design: the limiter never blocks legitimate traffic due to missing authentication.

**Gherkin Scenarios:**

```gherkin
Feature: Fail-Open for Missing API Key

  Scenario: Request without API key is allowed
    Given a request arrives without header "X-API-Key"
    When the middleware processes the request
    Then the request is allowed through
    And no rate limit counter is incremented

  Scenario: Empty API key header is treated as missing
    Given a request arrives with header "X-API-Key: "
    When the middleware processes the request
    Then the request is allowed through
    And no rate limit counter is incremented
```

**Verification:**
- [ ] Unit test: missing_api_key_allows_request
- [ ] Unit test: empty_api_key_allows_request

---

## Out of Scope

- Rate limiting by IP address
- Rate limiting by user ID
- Distributed rate limiting (Redis, shared state)
- Rate limit response body (only headers)
- Tiered rate limits (different limits for different plans)

## Assumptions

- In-memory storage (Map) — single process
- Sliding window algorithm (not fixed window or token bucket)
- Middleware integrates with Express.js
- HTTP-only (not WebSocket)

## Dependencies

- `express` for the HTTP server and middleware interface
- `jest` for tests

## Context

- **Project:** API Gateway
- **Stack:** Node.js + Express + Jest
- **Test command:** `npm test`
- **Start command:** `npm start`
