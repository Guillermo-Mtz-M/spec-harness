# anthropics/claude-code → code-review plugin
> https://github.com/anthropics/claude-code/tree/main/plugins/code-review · ⭐ 135k · Official Claude Code plugin for automated PR review with multi-agent parallel review and confidence-based false-positive filtering

## Key Ideas

- **4 parallel agents** — 2x CLAUDE.md compliance (Sonnet), 1x bug detector (Opus, diff-focused), 1x history analyzer (Opus, context-based); all run simultaneously
- **Independent validation subagents** — Each issue found by bug agents gets its own subagent to validate severity before reporting; CLAUDE.md violations validated by Sonnet, bugs/logic by Opus
- **Confidence scoring 0–100** — Threshold default 80; scores: 0 (not confident), 25 (somewhat), 50 (moderately), 75 (highly), 100 (absolutely certain)
- **False positive filtering** — Explicit list of what NOT to flag: pre-existing issues, code that looks wrong but isn't, pedantic nitpicks, linter-catchable issues, general quality concerns, lint-ignored items
- **PR state detection** — Skips closed/draft/trivial/automated/already-reviewed PRs automatically
- **Inline code comments via MCP** — Uses `mcp__github_inline_comment__create_inline_comment` with full SHA links; committable suggestions for small fixes, descriptions for larger ones
- **`/code-review` CLI command** — `--comment` flag posts to PR; default outputs to terminal
- **CLAUDE.md scoping** — Only considers CLAUDE.md files that share path with the modified file or its parents
- **High-signal principle** — "If you are not certain an issue is real, do not flag it. False positives erode trust."
- **Link format** — Must use full git SHA, `#L[start]-L[end]`, at least 1 line of context before/after
- **Author**: Boris Cherny (boris@anthropic.com) · v1.0.0

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| 4 parallel independent agents (redundant compliance + bug + history) | `skills/council-review/SKILL.md` — multi-perspective parallel review |
| Confidence scoring 0–100 with 80 threshold | `agents/judge.md` — scored evaluation with confidence gate |
| Independent validation subagents per issue | `agents/council-chairman.md` — per-requirement verified verdict |
| False positive filtering explicit list | Anti-rationalization tables in `skills/reviewer/SKILL.md` |
| CLAUDE.md path-scoped compliance | Guideline adherence review pattern |
| PR state detection (skip closed/draft/trivial) | `skills/ship/SKILL.md` pre-merge checks |
| Inline comments with full SHA links | Code citation format in REVIEW.md |
| "High signal only" principle | `skills/reviewer/SKILL.md` — reject false positives, actionable findings |
