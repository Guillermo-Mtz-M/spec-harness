# gsd-build/get-shit-done → open-gsd/gsd-core
> https://github.com/gsd-build/get-shit-done · ⭐ 64.5k · Meta-prompting, context engineering & spec-driven development system for Claude Code
> ⚠️ **Archived** — moved to [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core)

## Key Ideas

- **Meta-prompting system** — structured meta-prompting techniques to enhance Claude Code interactions beyond simple prompts
- **Context engineering** — framework for managing, compressing, and engineering context windows for more effective AI interactions across sessions
- **Spec-Driven Development (SDD)** — methodology for driving code generation from formal specifications; specs as source of truth before any code
- **Lightweight architecture** — minimal footprint (JS/TS), designed to be powerful without bloat; 2,928 commits across 78 releases
- **Hooks system** — customizable git hook integrations for automated pre-commit, pre-push workflows (lint, test, validate)
- **SDK + Agents** — includes SDK and agent framework for extending functionality programmatically
- **Multi-language docs** — README translated to Japanese, Korean, Chinese, Portuguese-BR
- **Evolution → open-gsd/gsd-core** — project matured into a dedicated org; gsd-core continues with multi-agent orchestration, workstream management, and phase-based execution

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| Meta-prompting (structured prompt techniques) | `skills/using-spec-harness/SKILL.md` — decision tree maps intent to skill |
| Context engineering (window management) | `skills/context-engineer/SKILL.md` — progressive loading, external memory |
| Spec-Driven Development (specs as truth) | Core philosophy: SPEC.md → implementation → verification |
| Hooks system (git integration) | `rules/common/` — git guardrails, pre-commit validation |
| SDK + Agents (extensibility) | `agents/` — 5 specialist personas + composable skills |
| Lightweight architecture | Design principle #5: "Tools Simple > Complex" |
