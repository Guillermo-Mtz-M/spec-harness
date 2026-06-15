# Common Rules

Always-follow guidelines for all projects using Spec-Harness.

## Spec-Driven Development

1. No code without a spec requirement. If it's not in SPEC.md, it doesn't get built.
2. Spec uses EARS notation. Every requirement has a Gherkin scenario.
3. Human approval gates: 2 only (after spec, after verification).
4. When in doubt, go back to the spec. The spec is the judge.

## Context Management

1. Context is a budget. Spend it on signal, not noise.
2. Each agent gets only the context it needs. No full conversation inheritance.
3. Handoffs happen via artifact files, not conversation history.
4. Compact at 60% context usage. Don't wait until it's too late.

## Code Quality

1. Surgical changes: touch only what the spec requires.
2. Simplicity first: if 200 lines could be 50, rewrite it.
3. YAGNI: don't build flexibility nobody asked for.
4. Match existing style. Don't "improve" adjacent code.

## Testing

1. TDD: write test first, implement second, refactor third.
2. Mock external boundaries only. Never mock internal modules.
3. Test pyramid: 80% unit, 15% integration, 5% E2E.
4. Mutation testing before shipping. Score >= 70%.
5. Tests verify behavior (outputs), not implementation (internals).

## Git

1. One commit per vertical slice.
2. Conventional commits: `feat(scope): [message]`, `fix(scope): [message]`.
3. No direct pushes to main. Always use PRs.
4. Commits include the SPEC.md requirement ID.

## Verification

1. "Seems right" is never sufficient. Show the test that passes.
2. No forward progress without passing tests at the current step.
3. Stop-the-line on critical issues. Fix before continuing.
4. Two-stage review: spec compliance first, code quality second.
