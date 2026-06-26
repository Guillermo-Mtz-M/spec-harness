# obra/superpowers
> https://github.com/obra/superpowers · ⭐ 239k · Agentic skills framework & software development methodology

## Key Ideas

- **Complete methodology** — not just skills; a full software development methodology for coding agents
- **7-phase basic workflow**: brainstorming → using-git-worktrees → writing-plans → subagent-driven-development (or executing-plans) → test-driven-development → requesting-code-review → finishing-a-development-branch
- **Mandatory workflows** — agent checks for relevant skills before ANY task; not suggestions, mandatory
- **Subagent-driven development** — fresh subagent per task with two-stage review (spec compliance, then code quality)
- **Brainstorming skill** — Socratic design refinement: activates before writing code, refines rough ideas through questions, explores alternatives, presents design in sections for validation, saves design document
- **Git worktrees for isolation** — creates isolated workspace on new branch, runs project setup, verifies clean test baseline
- **Writing plans** — breaks work into bite-sized tasks (2-5 min each), every task has exact file paths, complete code, verification steps
- **Test-driven development enforced** — RED-GREEN-REFACTOR: write failing test, watch it fail, write minimal code, watch it pass, commit; deletes code written before tests
- **Two-stage review** — spec compliance review first, then code quality review; critical issues block progress
- **Finishing workflow** — verifies tests, presents options (merge/PR/keep/discard), cleans up worktree
- **Writing skills skill** — create new skills following best practices (includes testing methodology)
- **Using superpowers meta-skill** — introduction to the skills system
- **Multi-platform**: Claude Code, Codex CLI, Codex App, Factory Droid, Gemini CLI, OpenCode, Cursor, GitHub Copilot CLI

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| 7-phase methodology | Spec-Harness workflow: grill-me → spec-author → spec-review → implement → reviewer → council-review → mutation-test → ship |
| Subagent-driven development (fresh agent per task) | `/subagent-driven-dev` + `/handoff` (artifact-based fresh context) |
| Brainstorming → design doc | `/grill-me` + `/spec-author` produces SPEC.md |
| Git worktrees for parallel work | Not yet implemented; `/subagent-driven-dev` uses artifact handoffs instead |
| Bite-sized tasks with file paths + verification | `/implement` vertical slices with SPEC.md traceability |
| TDD enforced (delete code before tests) | `/tdd-loop` + `/mutation-test` ensures test-first |
| Two-stage review (spec compliance → code quality) | `/reviewer` (spec compliance) + `/council-review` (multi-perspective) + `/mutation-test` (adversarial) |
| Finishing workflow with merge/PR options | `/ship` commits, PR, changelog, deploy checklist |
| Writing skills meta-skill | `/using-spec-harness` maps tasks to right skill |
| Mandatory skill activation | `/using-spec-harness` decision tree guides skill selection |
| Multi-platform install | `scripts/install.js` supports 4 targets + Gemini CLI extension |