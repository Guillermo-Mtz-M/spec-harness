# Testing Anti-Patterns

Common testing mistakes that undermine verification. Every anti-pattern here has been observed in real AI-generated code.

---

## 1. The Mocks Trap

**Anti-pattern:** Mocking internal modules to make tests pass.

**Example:**
```python
# BAD: mocking the database to test business logic
mock_db = Mock()
mock_db.query.return_value = [{"id": 1}]
result = service.get_users(db=mock_db)
```

**Problem:** The test proves the mock works, not the code. If the real database returns a different format, the test still passes.

**Fix:** Only mock external boundaries (APIs, file system). For internal logic, use real implementations with test databases or in-memory stores.

```python
# GOOD: test against real test database
db = TestDatabase(users=[{"id": 1}])
result = service.get_users(db=db)
assert result == [{"id": 1}]
```

---

## 2. Coverage Obsession

**Anti-pattern:** Chasing 100% code coverage without verifying test quality.

**Problem:** A test that calls a function without asserting anything counts as "covered" but proves nothing.

**Fix:** Use mutation testing. Coverage measures execution; mutation testing measures effectiveness.

---

## 3. Flaky Tests

**Anti-pattern:** Tests that pass or fail depending on timing, order, or environment.

**Examples:**
- `sleep(1)` then assert
- Tests that share mutable state
- Tests that depend on network availability

**Fix:**
- Use deterministic test doubles for time and network
- Each test creates and destroys its own state
- Run tests in random order to detect order dependencies

---

## 4. Test Implementation Details

**Anti-pattern:** Testing private methods or internal structure instead of public behavior.

**Problem:** Refactoring breaks the test even though behavior didn't change.

**Fix:** Test the public API. Private methods are tested indirectly through public methods.

---

## 5. Happy Path Only

**Anti-pattern:** Testing only the success case.

**Problem:** Error paths are where the bugs hide. If you don't test them, your users will.

**Fix:** Every EARS "Unwanted Behavior" requirement must have at least one test.

---

## 6. Test Interdependence

**Anti-pattern:** Tests that depend on other tests' state or execution order.

**Problem:** Can't run tests in isolation. Debugging is a nightmare.

**Fix:** Each test sets up its own preconditions and tears down after itself.

---

## The Verification Principle

> A test is only valuable if it would fail when the behavior it verifies is broken.

If removing the code under test doesn't cause the test to fail, the test isn't verifying anything.
