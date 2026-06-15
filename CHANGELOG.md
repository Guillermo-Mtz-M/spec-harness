# Changelog

All notable changes to Spec-Harness are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-06-15

### Added

#### Core Skills (14)
- **`/grill-me`** — Relentless interview skill that extracts what the user actually wants before any code is written. One question at a time, challenge premises, explore design alternatives, define the narrowest useful slice.
- **`/spec-author`** — Writes EARS/Gherkin specifications. Every requirement uses EARS notation with Gherkin scenarios, verification criteria, and explicit out-of-scope boundaries.
- **`/spec-review`** — Independent fresh-context review of spec against ambiguity checklist. Produces `REVIEW.md` with PASS/FLAG/BLOCK verdicts per requirement.
- **`/implement`** — Incremental implementation via thin vertical slices. Each slice goes through TDD loop. Commit per slice. No code without spec requirement traceability.
- **`/tdd-loop`** — RED-GREEN-REFACTOR cycle with verification gates. Test-first enforcement, minimal implementation, refactor only if tests stay green.
- **`/reviewer`** — Fresh-context judge that reviews implementation against SPEC.md. PASS/FAIL/PARTIAL per EARS requirement. Not style opinions — spec compliance.
- **`/mutation-tester`** — Adversarial mutation testing. Injects arithmetic, logical, conditional, return, deletion, and variable-swap mutations. Requires ≥70% mutation score.
- **`/ship`** — Commit, PR, changelog, deploy checklist. Two human approval gates enforced: spec approval and result approval.
- **`/context-engineer`** — Context minimization with 4-layer stack, progressive loading, and external memory. Compact at 60% context usage.
- **`/subagent-driven-dev`** — Dispatch fresh subagents per task via artifact handoff. No conversation history inheritance between agents.
- **`/handoff`** — Compact session into `HANDOFF.md` for the next agent. Decisions with "why", progress with evidence, remaining work with starting points.
- **`/diagnose`** — Systematic debugging: reproduce → minimize → hypothesize → fix → guard. No hypothesis without a test that fails if reverted.
- **`/zoom-out`** — System-level code view. Evaluates module depth (Ousterhout's philosophy). Identifies deepening opportunities.
- **`/using-spec-harness`** — Meta skill that maps any task to the right workflow path with a decision tree.

#### Agent Personas (4)
- **`spec-author.md`** — Requirements Engineer. EARS notation, Gherkin scenarios, boundary identification.
- **`implementer.md`** — Senior Developer. TDD, YAGNI, surgical changes, minimal abstractions.
- **`judge.md`** — Code Reviewer. Spec compliance verdict: APPROVED / REVISIONS NEEDED / REJECTED.
- **`mutation-tester.md`** — QA Adversary. Kills mutants, fixes weak tests, documents equivalent mutations.

#### Integrations (5)
- **`graphify`** — Knowledge graph builder (71x fewer tokens per query vs raw files). Multimodal: code, docs, PDFs, images.
- **`superpowers`** — Brainstorm → plan → execute pipeline with git worktrees and two-stage review.
- **`bmad-method`** — 12+ specialized agents (PM, Architect, UX, Developer) with scale-adaptive planning.
- **`karpathy-guidelines`** — Four principles: Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution.
- **`context7`** — Up-to-date library documentation via MCP. No hallucinated APIs. Version-specific.

#### Templates (5)
- **`SPEC.md`** — EARS/Gherkin requirements document. Maps requirements to verification evidence.
- **`HANDOFF.md`** — Session handoff: decisions, completed work, remaining, key context.
- **`REVIEW.md`** — Judge verdict per requirement with test evidence.
- **`MUTATION_REPORT.md`** — Mutation testing results: killed/survived/equivalent, mutation score.
- **`PRD.md`** — Product Requirements Document for larger features. User stories, success metrics, risks.

#### Reference Checklists (4)
- **`ears-notation.md`** — All 5 EARS patterns with templates and Gherkin mapping.
- **`testing-anti-patterns.md`** — Mocks trap, coverage obsession, flaky tests, testing implementation details.
- **`context-minimization.md`** — 4-layer context stack, external memory strategies, handoff over inheritance.
- **`harness-principles.md`** — 3 pillars: automated guardrails, context management, verification loops.

#### Rules (3)
- **`rules/common/`** — Spec-driven development, context management, code quality, testing, git workflow, verification rules.
- **`rules/typescript/`** — strict mode, no `any` types, `Result<T,E>` pattern, module organization, async rules.
- **`rules/python/`** — type hints, mypy strict, pydantic for validation, `Result` pattern, pytest fixtures.

#### Setup Docs (4)
- **`docs/claude-setup.md`** — Plugin install, slash commands, quick start.
- **`docs/opencode-setup.md`** — AGENTS.md reference, skill tool invocation.
- **`docs/cursor-setup.md`** — Rules copy, auto-trigger configuration.
- **`docs/gemini-setup.md`** — Extension install, skill list, manual invocation.

#### CLI & Scripts
- **`scripts/install.js`** — Multi-target installer (claude, opencode, cursor). Copies skills, agents, commands, rules.
- **`scripts/validate.js`** — Validates all skills have required sections, agents have Operating Rules, templates have headers.

#### Configuration
- **`.claude/commands/`** — 8 slash commands for Claude Code: grill-me, spec-author, implement, reviewer, mutation-test, handoff, diagnose, ship.
- **`.opencode/AGENTS.md`** — OpenCode configuration mapping skills, agents, and integrations.

---

## [Unreleased]

### Planned
- [ ] GitHub Actions CI for running `validate.js` on PRs
- [ ] `examples/` with a complete feature walkthrough
- [ ] `examples/` with a bug fix walkthrough
- [ ] Claude Code plugin manifest for marketplace install
- [ ] Interactive `SPEC.md` template generator skill
- [ ] Mutation testing framework adapter (stryker, pitest)
- [ ] Per-language rules: Go, Rust, Java, C++
- [ ] i18n: Chinese README, Japanese README

---

## Design Philosophy

Every version should be:
- **Verifiable** — Every skill has test evidence requirements
- **Minimal** — No features beyond what's needed to guide the agent
- **Composable** — Skills work independently or as a system
- **Human-centered** — Automation serves human decisions, not replaces them