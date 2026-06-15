---
name: ship
description: Commit, PR, changelog, deploy checklist. Use after all verification passes.
triggers: ["ship", "deploy", "launch", "push to main", "create a PR"]
---

# Ship

All verification passed. Time to get it into production. Commit cleanly, write a meaningful changelog, create the PR, verify deployment.

## Overview

Shipping is the final step, not an afterthought. The ship skill ensures a clean commit history, accurate changelog, and smooth deployment.

**This is Human Approval Gate #2.** The human reviews the final result and decides: ship it, revise it, or reject it.

## When to Use

- After `/mutation-tester` passes
- After human approves the final result
- When you're ready to commit and deploy

## Prerequisites

- [ ] All EARS requirements have PASS verdicts (from `/reviewer`)
- [ ] Mutation score >= 70% (from `/mutation-tester`)
- [ ] Human has explicitly approved: "ship it"

## Process

### Step 1: Verify Clean State

1. Run the full test suite — all tests must pass
2. Run the linter — no errors
3. Run type checker (if applicable) — no errors
4. Check for uncommitted changes

### Step 2: Final Commit

1. Review all changes since the last commit
2. If changes span multiple slices, ensure each slice has its own commit
3. If there are uncommitted fixes from review/mutation phases, commit them:

```
fix(scope): [mutation tester fix description]
```

### Step 3: Update Changelog

Add entry to `CHANGELOG.md`:

```markdown
## [version] - YYYY-MM-DD

### Added
- [feature] ([REQ-XXX]) — [description]

### Fixed
- [bug] — [description]

### Breaking
- [breaking change] — [migration guide]
```

### Step 4: Create PR

1. Push branch to remote
2. Create PR with:
   - Summary of what changed
   - Links to SPEC.md requirements
   - Test and mutation score results
   - Checklist of verified requirements

### Step 5: Post-Merge Verification

After merge:
1. CI/CD passes on main
2. Deploy succeeds
3. Smoke tests pass on production/staging

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "I'll skip the changelog" | Future-you will not remember what this did. Document it. |
| "Let me just push directly to main" | PRs enable review, rollback, and audit trail. Always use PRs. |
| "The CI will catch any issues" | CI catches automated issues. The changelog catches human issues. |
| "I'll verify deployment later" | Verify now. "It deployed" is not the same as "it works in production." |

## Verification

- [ ] All tests pass
- [ ] Linter and type checker clean
- [ ] Commit history is clean (one commit per slice)
- [ ] Changelog is updated
- [ ] PR created with spec traceability
- [ ] Post-merge deployment verified
