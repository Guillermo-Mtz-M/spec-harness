# Research → WORKFLOW Artifact Index

This index maps each research source (repos + videos) to the Spec-Harness WORKFLOW artifacts it influenced.

## Repos — Spec-Harness Workflow References

| # | Repository | Stars | Key Contribution | WORKFLOW Artifact |
|---|-----------|-------|-----------------|-------------------|
| 001 | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 67k | Anti-rationalization, 4 Google personas, 24 skills | `skills/reviewer/SKILL.md` (anti-rationalization), `agents/judge.md` |
| 002 | [mattpocock/skills](https://github.com/mattpocock/skills) | 147k | CONTEXT.md, grill-me, zoom-out, Beyoncé Rule | `skills/grill-me/SKILL.md`, `skills/zoom-out/SKILL.md`, `skills/mutation-test/SKILL.md` |
| 003 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | 222k | Cross-harness OS, hooks profiles, AgentShield | `scripts/install.js` (multi-target), `rules/common/` |
| 004 | [garrytan/gstack](https://github.com/garrytan/gstack) | 117k | Full sprint lifecycle, specialist roles, 810× metric | Full workflow structure, `skills/ship/SKILL.md` |
| 005 | [obra/superpowers](https://github.com/obra/superpowers) | 239k | 7-phase methodology, subagent-driven, two-stage review | `skills/reviewer/SKILL.md` (two-stage), `skills/implement/SKILL.md` |
| 006 | [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | 49.7k | Scale-adaptive, 12+ personas, Party Mode | `skills/council-review/SKILL.md`, `agents/council-chairman.md` |
| 007 | [safishamsi/graphify](https://github.com/safishamsi/graphify) | 72.5k | 71× token reduction, knowledge graph, multimodal | `integrations/graphify/`, `references/context-minimization.md` |
| 008 | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | 183k | 4 failure modes, Think/Simplicity/Surgical/Goal-driven | `integrations/karpathy-guidelines/SKILL.md`, design principles 7-8 |
| 009 | [upstash/context7](https://github.com/upstash/context7) | 58.1k | Version-specific library docs via MCP | `integrations/context7/SKILL.md` |
| 010 | [karpathy/llm-council](https://github.com/karpathy/llm-council) | 21.6k | 3-stage deliberation, anonymization, chairman synthesis | `skills/council-review/SKILL.md`, `agents/council-chairman.md` |
| 011 | [anthropics/skills → skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | 156k | Full skill lifecycle, parallel eval with baselines, assertion benchmarking, description optimization | `skills/mutation-test/SKILL.md`, `skills/tdd-loop/SKILL.md`, `agents/judge.md` |
| 012 | [anthropics/claude-code → code-review](https://github.com/anthropics/claude-code/tree/main/plugins/code-review) | 135k | 4-agent parallel PR review, confidence scoring (≥80), independent issue validation, CLAUDE.md compliance | `skills/council-review/SKILL.md`, `skills/reviewer/SKILL.md`, `agents/judge.md`, `agents/council-chairman.md` |
| 013 | [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) → [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core) | 64.5k | Meta-prompting, context engineering, spec-driven development | `skills/context-engineer/SKILL.md`, `skills/using-spec-harness/SKILL.md` |

## Repos — Extras (Tools & Plugins)

| # | Repository | Stars | Key Contribution | WORKFLOW Artifact |
|---|-----------|-------|-----------------|-------------------|
| 001 | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 96.8k | 67 UI styles, 161 design rules, 17 tech stacks, Design System Generator | `integrations/ui-ux-pro-max/SKILL.md` |
| 002 | [nexu-io/open-design](https://github.com/nexu-io/open-design) | 71.6k | Local-first design, 142+ design systems, HyperFrames, multi-format | `integrations/open-design/SKILL.md` |
| 003 | [helloianneo/ian-xiaohei-illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) | 6.3k | Chinese article illustration — Xiaohei style, 8 visual structures | `integrations/ian-xiaohei-illustrations/SKILL.md` |
| 004 | [anthropics/small-business](https://claude.com/plugins/small-business) | — | 15 business commands, cash flow, payroll, CRM, campaigns | `integrations/small-business/SKILL.md` |

## Videos

| # | Video | Key Concept | WORKFLOW Artifact |
|---|-------|-------------|-------------------|
| 001 | Programar Sin Vibe Coding — SDD 3 Niveles | Spec-Driven Development, 3 levels (informal→semi-formal→formal) | `skills/spec-author/SKILL.md`, `templates/SPEC.md` |
| 002 | Conceptos IA Aplicados — LLM Agentes | LLM as programmer, agent harness, context windows | `references/harness-principles.md` |
| 003 | Harness Engineering — Context, Multiagente, Verificación | 3 pillars (guardrails, context, verification), multi-agent orchestration | Core architecture, `references/harness-principles.md` |
| 004 | Spec-Driven Development — Arnés SD | SDD as harness, specs as steering, EARS notation | `templates/SPEC.md`, `skills/spec-author/SKILL.md` |
| 005 | Harness Engineering — Go, Onion Layers, MCP | Onion architecture, MCP integration, context layers | `references/context-minimization.md`, MCP rules |
| 006 | Tests Software — Por Qué Fallan Los Tests | Test anti-patterns, mutation testing, test quality | `skills/mutation-test/SKILL.md`, `skills/tdd-loop/SKILL.md` |
| 007 | Agentes — Uncle Bob, Judge, Mutation Testing | Judge agent, mutation score ≥70%, adversarial review | `agents/judge.md`, `skills/mutation-test/SKILL.md` |
| 008 | Loop Engineering — Human In On The Loop | 2 human approval gates, trust automation between gates, handoff | `skills/handoff/SKILL.md`, `templates/HANDOFF.md` |
| 009 | LLM Council Patterns | 3-stage deliberation, anonymization, chairman synthesis | `skills/council-review/SKILL.md`, `agents/council-chairman.md` |

## Cross-Reference

| WORKFLOW Artifact | Influenced By |
|-------------------|--------------|
| `skills/grill-me/SKILL.md` | 002 (mattpocock), 008 (karpathy principles) |
| `skills/spec-author/SKILL.md` | 002 (mattpocock), 005 (superpowers), 008 (karpathy), video 001, 004 |
| `skills/spec-review/SKILL.md` | 005 (superpowers two-stage), 001 (addyosmani anti-rationalization) |
| `skills/implement/SKILL.md` | 005 (superpowers), 008 (surgical changes) |
| `skills/reviewer/SKILL.md` | 004 (gstack), 005 (superpowers), 001 (addyosmani), 010 (council anonymization) |
| `skills/council-review/SKILL.md` | 006 (BMAD Party Mode), 010 (llm-council) |
| `skills/mutation-test/SKILL.md` | 002 (mattpocock Beyoncé Rule), video 006, 007 |
| `skills/tdd-loop/SKILL.md` | 002 (mattpocock), 005 (superpowers TDD), video 006 |
| `skills/zoom-out/SKILL.md` | 002 (mattpocock zoom-out) |
| `skills/ship/SKILL.md` | 004 (gstack), 005 (superpowers) |
| `skills/handoff/SKILL.md` | 003 (ECC session store), 004 (gstack checkpoint), video 008 |
| `skills/context-engineer/SKILL.md` | 013 (gsd-build context engineering), 007 (graphify) |
| `skills/using-spec-harness/SKILL.md` | 013 (gsd-build meta-prompting), 004 (gstack) |
| `agents/council-chairman.md` | 010 (llm-council chairman), 006 (BMAD Party Mode) |
| `agents/judge.md` | 001 (addyosmani 4 personas), video 007 |
| `integrations/graphify/` | 007 (graphify) |
| `integrations/karpathy-guidelines/` | 008 (karpathy-skills) |
| `integrations/context7/` | 009 (context7) |
| `integrations/ui-ux-pro-max/` | EXT-001 (ui-ux-pro-max) |
| `integrations/open-design/` | EXT-002 (open-design) |
| `integrations/ian-xiaohei-illustrations/` | EXT-003 (xiaohei-illustrations) |
| `integrations/small-business/` | EXT-004 (small-business) |
| `references/context-minimization.md` | 007 (graphify 71×), video 005 |
| `references/harness-principles.md` | 001 (addyosmani), 004 (gstack), video 002, 003 |
