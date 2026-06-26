# anthropics/skills → skill-creator
> https://github.com/anthropics/skills/tree/main/skills/skill-creator · ⭐ 156k · Official Claude Code skill for creating, editing, and benchmarking skills

## Key Ideas

- **Full skill lifecycle** — Capture intent → interview → draft SKILL.md → test → evaluate → iterate → optimize description → package
- **SKILL.md anatomy** — YAML frontmatter (name + description = triggering metadata), body (<500 lines), bundled resources (scripts, references, assets loaded on demand)
- **Progressive disclosure** — 3-level loading: always-in-context metadata, on-trigger body, as-needed resources
- **Iterative eval loop** — Parallel with-skill vs baseline subagents; qualitative (human review via eval-viewer) + quantitative (assertions + benchmark aggregation)
- **Assertion-based benchmarking** — JSON-driven assert system with grader subagent; benchmark.json with pass_rate, time, token stats (mean ± stddev, delta)
- **eval-viewer** — `generate_review.py` produces an interactive HTML viewer with Outputs tab (inline file rendering, per-case feedback) and Benchmark tab (stats + analyst observations)
- **Blind comparison** — Optional A/B comparison via independent judge agent (comparator.md + analyzer.md) for rigorous version validation
- **Description optimization** — `run_loop.py` auto-optimizes skill description for trigger accuracy: generates 20 eval queries (10 should-trigger + 10 should-not-trigger), splits 60/40 train/test, iterates up to 5x, picks best by test score
- **Trigger eval design** — Eval queries must be realistic, detailed, include edge cases and near-misses; simple queries don't trigger skills regardless of description quality
- **Script packaging** — `package_skill.py` bundles into .skill file; scripts/ for deterministic tasks (not LLM-driven)
- **Multi-platform** — Full workflow in Claude Code (subagents, parallel runs); adapted workflow in Claude.ai (no subagents, serial, no baseline); Cowork (subagents OK, static HTML export, no display)
- **Anti-overfitting principle** — Improve skill generality, not just test-case fidelity; explain the "why" behind instructions rather than rigid MUSTs/ALWAYS

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| SKILL.md anatomy (frontmatter + body + resources) | `skills/` directory structure conventions |
| Progressive disclosure (3-level loading) | Context hierarchy in harness design |
| Iterative eval loop (parallel with/without skill) | `skills/mutation-test/SKILL.md` — with/without mutation comparison |
| Assertion-based benchmarking (pass_rate, time, tokens) | `skills/tdd-loop/SKILL.md` — quantitative gate |
| eval-viewer (qualitative + quantitative review) | `skills/reviewer/SKILL.md` — multi-perspective review |
| Description optimization (trigger eval + auto-tune) | Skill triggering metadata in SKILL.md frontmatter |
| Blind comparison (independent judge) | `agents/judge.md` — adversarial evaluation |
| Anti-overfitting (generality over example-fidelity) | Anti-rationalization tables in reviewer |
| Scripts/ for deterministic tasks | Skill-bundled executable utilities pattern |
| Subagent orchestration (parallel eval spawn) | Multi-agent parallel execution harness |
