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
| `/mutation-test` | `skills/mutation-tester/SKILL.md` | Adversarial mutation testing |
| `/context-engineer` | `skills/context-engineer/SKILL.md` | Manage context budget |
| `/subagent-driven-dev` | `skills/subagent-driven-dev/SKILL.md` | Multi-agent orchestration |
| `/handoff` | `skills/handoff/SKILL.md` | Session handoff |
| `/diagnose` | `skills/diagnose/SKILL.md` | Debug with scientific method |
| `/zoom-out` | `skills/zoom-out/SKILL.md` | System-level view |
| `/ship` | `skills/ship/SKILL.md` | Commit and deploy |

## Agents

| Agent | File | Role |
|-------|------|------|
| spec-author | `agents/spec-author.md` | Requirements engineer |
| implementer | `agents/implementer.md` | Senior developer with TDD |
| judge | `agents/judge.md` | Spec compliance reviewer |
| mutation-tester | `agents/mutation-tester.md` | QA adversary |

## Integration Skills

| Integration | Path | Use When |
|-------------|------|----------|
| graphify | `integrations/graphify/SKILL.md` | Build knowledge graph of codebase |
| superpowers | `integrations/superpowers/SKILL.md` | Brainstorm → plan → execute pipeline |
| bmad-method | `integrations/bmad-method/SKILL.md` | 12+ specialized agents |
| karpathy-guidelines | `integrations/karpathy-guidelines/SKILL.md` | Simplicity-first coding |
| context7 | `integrations/context7/SKILL.md` | Up-to-date library docs |

## Loading

Reference this file from your OpenCode `AGENTS.md`:

```markdown
Include: /path/to/WORKFLOW/.opencode/AGENTS.md
```

Or use the Skill tool directly:

```
Use the skill "spec-author" for requirements gathering.
```