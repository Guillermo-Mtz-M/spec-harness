# Python Rules

Guidelines specific to Python projects.

## Type Safety

1. Use type hints on all function signatures.
2. Run `mypy` in strict mode as part of the test suite.
3. Use `pydantic` for data validation at boundaries.
4. Use `Protocol` for structural typing (duck typing with safety).

## Module Organization

1. One class/module per file (follow standard Python conventions).
2. `__init__.py` only for package initialization, not for dumping imports.
3. Deep modules: public API in `__init__.py`, implementation in private modules.
4. No circular imports. Use dependency injection if needed.

## Error Handling

1. Use custom exception classes, not bare `Exception`.
2. Never use bare `except:`. Always specify the exception type.
3. Use `result` pattern (return `(value, error)` tuple or `Result` type) for expected failures.
4. Raise exceptions only for unexpected/unrecoverable errors.

## Testing

1. Use `pytest` as the test framework.
2. Test files: `test_module.py` in `tests/` directory.
3. Use `@pytest.fixture` for test setup (no manual setup in test bodies).
4. Use `factory_boy` or custom factories for test data.
5. Parameterized tests with `@pytest.mark.parametrize` for boundary conditions.

## Code Style

1. Follow `ruff` formatting and linting.
2. Use `f-strings` (no `%` or `.format`).
3. Use `pathlib.Path` instead of `os.path`.
4. Use dataclasses or pydantic models instead of raw dicts for structured data.
