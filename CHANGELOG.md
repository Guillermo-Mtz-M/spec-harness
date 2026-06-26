# Changelog

All notable changes to Spec-Harness are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] — 2026-06-26

### Added

#### Integrations (4 new extras → 9 total)
- **`ui-ux-pro-max`** — Professional design system generator: 67 UI styles, 161 design rules, 161 color palettes, 57 font pairings, 17 tech stacks. Credit: @nextlevelbuilder.
- **`open-design`** — Local-first Claude Design alternative: 142+ DESIGN.md brand contracts, multi-format output (HTML/PDF/PPTX/MP4), HyperFrames video. Credit: @nexu-io.
- **`ian-xiaohei-illustrations`** — Chinese article illustration generator: Xiaohei hand-drawn style, 8 visual structures, cognitive anchor mapping. Credit: @helloianneo.
- **`small-business`** — Claude plugin wrapper: 15 business commands (payroll, cash flow, CRM, campaigns). Credit: Anthropic.

#### Installation
- **`--with-extras` flag** — `install.js` now supports `node scripts/install.js --target claude --with-extras` to install extras integrations alongside core. Two profiles: `core` (15 skills + 5 core integrations) and `full` (all 9 integrations).

#### Research Infrastructure
- **`Reserch/repos/` restructured** — Split into `spec-harness/` (13 workflow-core references) and `extras/` (4 tool references) with cross-links.
- **13 new research docs** — gsd-build/get-shit-done (spec-harness), ui-ux-pro-max, open-design, xiaohei-illustrations, small-business (extras).
- **Star counts updated** — All 17 repos refreshed with current GitHub stats.

### Changed
- **Integrations count**: 5 → 9
- **README badges**: Added `extras-4` badge (orange)
- **README.es.md** — Fully synced with English: 9 integrations, --with-extras, new acknowledgments
- **README.zh.md** — Fully synced with English: 9 integrations, --with-extras, new acknowledgments
- **Project structure** — `integrations/` shows 9 (5 core + 4 extras)
- **Acknowledgments** — Extended to include all 13 workflow + 4 extras repos

### Added (research docs)
- `Reserch/repos/spec-harness/013-gsd-build-get-shit-done.md`
- `Reserch/repos/extras/001-nextlevelbuilder-ui-ux-pro-max.md`
- `Reserch/repos/extras/002-nexu-io-open-design.md`
- `Reserch/repos/extras/003-helloianneo-ian-xiaohei-illustrations.md`
- `Reserch/repos/extras/004-anthropics-claude-code-small-business.md`

---

## [1.2.0] — 2026-06-15

### Added

#### Skills (1 new → 15 total)
- **`/council-review`** — Multi-perspective anonymous review. Three specialist reviews (spec compliance, performance/edge cases, security/maintainability) anonymized and synthesized by a chairman into unified per-requirement verdicts. Inspired by karpathy/llm-council.

#### Agent Personas (1 new → 5 total)
- **`council-chairman.md`** — Synthesizes N anonymized reviews into COUNCIL-REVIEW.md. Per-requirement PASS/FAIL/PARTIAL with consensus strength and disagreement highlights. Graceful degradation if <3 reviews.

#### Documentation
- **README.zh.md** — Full Chinese (simplified) translation with technical terms kept in English
- **Anonymization Principle** — Added to reviewer/SKILL.md to document anti-bias stance for council pipeline

#### i18n
- README.md is now pure English (no bilingual sections)
- README.es.md updated with v1.2 badges and content
- README.zh.md added for Chinese-speaking developers

### Changed

- **Skills count**: 14 → 15
- **Agents count**: 4 → 5
- **validate.js**: Added council-review skill and council-chairman agent to required artifacts
- **.opencode/AGENTS.md**: Added council-review and council-chairman entries

---

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
- [ ] Claude Code plugin manifest for marketplace install
- [ ] Interactive `SPEC.md` template generator skill
- [ ] Mutation testing framework adapter (stryker, pitest)
- [ ] Per-language rules: Go, Rust, Java, C++

---

## Design Philosophy

Every version should be:
- **Verifiable** — Every skill has test evidence requirements
- **Minimal** — No features beyond what's needed to guide the agent
- **Composable** — Skills work independently or as a system
- **Human-centered** — Automation serves human decisions, not replaces them