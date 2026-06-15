# TypeScript Rules

Guidelines specific to TypeScript/JavaScript projects.

## Type Safety

1. Use `strict` mode in `tsconfig.json`.
2. No `any` types. Use `unknown` if type is truly unknown.
3. Prefer interfaces over type aliases for object shapes.
4. Use discriminated unions for state machines.

## Module Organization

1. One export per file (default export = file name).
2. Deep modules: simple interface, complex internals hidden behind the API.
3. Barrel files (`index.ts`) only at package boundaries.
4. No circular dependencies.

## Error Handling

1. Use `Result<T, E>` pattern instead of throwing for expected errors.
2. Throw only for truly unexpected/unrecoverable errors.
3. Never catch and swallow. Either handle, rethrow, or log explicitly.
4. Typed errors: each error class carries the context needed to handle it.

## Testing

1. Use `vitest` or `jest` with `ts-jest`.
2. Test files co-located: `Component.tsx` → `Component.test.tsx`.
3. Use `describe/it` structure that mirrors the EARS requirement IDs.
4. Factory functions for test data (no manual object construction in tests).

## Async

1. Always use `async/await`. No raw promises.
2. Always handle promise rejections (no unhandled rejection).
3. Use `AbortController` for cancellable operations.
4. Timeout all async operations in tests.
