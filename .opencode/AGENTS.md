# Spec-Harness — OpenCode Configuration

## Skills

| Command | Skill File | Description |
|---------|-----------|-------------|
| `/grill-me` | `skills/grill-me/SKILL.md` | Interrogate user for requirements |
| `/spec-author` | `skills/spec-author/SKILL.md` | Write EARS/Gherkin spec |
| `/spec-review` | `skills/spec-review/SKILL.md` | Review spec for ambiguity |
| `/implement` | `skills/implementer/SKILL.md` | Build with TDD |
| `/tdd-loop` | `skills/tdd-loop/SKILL.md` | Red-Green-Refactor cycle |
| `/reviewer` | `skills/reviewer/SKILL.md` | Spec compliance review |
| `/council-review` | `skills/council-review/SKILL.md` | Multi-perspective anonymous review |
| `/mutation-test` | `skills/mutation-tester/SKILL.md` | Adversarial mutation testing |
| `/context-engineer` | `skills/context-engineer/SKILL.md` | Manage context budget |
| `/subagent-driven-dev` | `skills/subagent-driven-dev/SKILL.md` | Multi-agent orchestration |
| `/handoff` | `skills/handoff/SKILL.md` | Session handoff |
| `/diagnose` | `skills/diagnose/SKILL.md` | Debug with scientific method |
| `/zoom-out` | `skills/zoom-out/SKILL.md` | System-level view |
| `/ship` | `skills/ship/SKILL.md` | Commit and deploy |
| `/using-spec-harness` | `skills/using-spec-harness/SKILL.md` | Map task to right skill |

## Agents

| Agent | File | Role |
|-------|------|------|
| spec-author | `agents/spec-author.md` | Requirements engineer |
| implementer | `agents/implementer.md` | Senior developer with TDD |
| judge | `agents/judge.md` | Spec compliance reviewer |
| mutation-tester | `agents/mutation-tester.md` | QA adversary |
| council-chairman | `agents/council-chairman.md` | Anonymized review synthesis |

## Core Integrations

| Integration | Path | Use When |
|-------------|------|----------|
| graphify | `integrations/graphify/SKILL.md` | Build knowledge graph of codebase |
| superpowers | `integrations/superpowers/SKILL.md` | Brainstorm → plan → execute pipeline |
| bmad-method | `integrations/bmad-method/SKILL.md` | 12+ specialized agents |
| karpathy-guidelines | `integrations/karpathy-guidelines/SKILL.md` | Simplicity-first coding |
| context7 | `integrations/context7/SKILL.md` | Up-to-date library docs |

## Extras Integrations (install with --with-extras)

| Integration | Path | Use When |
|-------------|------|----------|
| ui-ux-pro-max | `integrations/ui-ux-pro-max/SKILL.md` | Professional UI/UX design system generation |
| open-design | `integrations/open-design/SKILL.md` | Brand-grade design contracts + multi-format output |
| ian-xiaohei-illustrations | `integrations/ian-xiaohei-illustrations/SKILL.md` | Chinese article illustrations (Xiaohei style) |
| small-business | `integrations/small-business/SKILL.md` | Business ops: payroll, cash flow, CRM |

## Loading

Reference this file from your OpenCode `AGENTS.md`:

```markdown
Include: /path/to/spec-harness/.opencode/AGENTS.md
```

Or use the Skill tool directly:

```
Use the skill "spec-author" for requirements gathering.
```
