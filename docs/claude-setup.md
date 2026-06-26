# Claude Code Setup

## Install

```bash
# Core workflow (15 skills + 5 core integrations)
git clone https://github.com/Guillermo-Mtz-M/spec-harness.git
cd spec-harness
node scripts/install.js --target claude

# Full install (+ extras: ui-ux-pro-max, open-design, illustrations, business)
node scripts/install.js --target claude --with-extras
```

This copies:
- `skills/` → `~/.claude/skills/`
- `agents/` → `~/.claude/agents/`
- `commands/` → `~/.claude/commands/`
- `rules/common/` → `~/.claude/rules/spec-harness/`
- `integrations/` → `~/.claude/skills/integrations/` (core with `--with-extras` for extras)
- `templates/` → `~/.claude/templates/`
- `references/` → `~/.claude/references/`

## Commands Available

| Command | Description |
|---------|-------------|
| `/grill-me` | Interrogate user for requirements |
| `/spec-author` | Write EARS/Gherkin spec |
| `/spec-review` | Review spec for ambiguity |
| `/implement` | Build with TDD |
| `/tdd-loop` | Red-Green-Refactor cycle |
| `/reviewer` | Spec compliance review |
| `/council-review` | Multi-perspective anonymous review |
| `/mutation-test` | Adversarial mutation testing |
| `/context-engineer` | Manage context budget |
| `/subagent-driven-dev` | Multi-agent orchestration |
| `/handoff` | Session handoff |
| `/diagnose` | Debug with scientific method |
| `/zoom-out` | System-level view |
| `/ship` | Commit, PR, changelog, deploy |
| `/using-spec-harness` | Map task to right skill |

## Skills Available

All 15 skills load automatically when triggered:

- `skills/grill-me/SKILL.md`
- `skills/spec-author/SKILL.md`
- `skills/spec-review/SKILL.md`
- `skills/implementer/SKILL.md`
- `skills/tdd-loop/SKILL.md`
- `skills/reviewer/SKILL.md`
- `skills/council-review/SKILL.md`
- `skills/mutation-tester/SKILL.md`
- `skills/context-engineer/SKILL.md`
- `skills/subagent-driven-dev/SKILL.md`
- `skills/handoff/SKILL.md`
- `skills/diagnose/SKILL.md`
- `skills/zoom-out/SKILL.md`
- `skills/ship/SKILL.md`
- `skills/using-spec-harness/SKILL.md`

## Integrations

Core (installed by default):
- **graphify** — Knowledge graphs, 71x fewer tokens per query
- **superpowers** — Brainstorm → plan → execute with git worktrees
- **bmad-method** — 12+ specialized agents, scale-adaptive planning
- **karpathy-guidelines** — Think before coding, simplicity first, surgical changes
- **context7** — Up-to-date library docs via MCP

Extras (install with `--with-extras`):
- **ui-ux-pro-max** — 67 UI styles, 161 design rules, design system generation
- **open-design** — 142+ brand-grade DESIGN.md contracts, multi-format output
- **ian-xiaohei-illustrations** — Chinese article illustrations (Xiaohei style)
- **small-business** — Business ops: payroll, cash flow, CRM, campaigns

## Quick Start

1. Restart Claude Code (or type `/help` to refresh skills)
2. Open a project directory
3. Type `/grill-me` to start the spec workflow
4. Follow: `/spec-author` → approve → `/implement` → `/reviewer` → `/mutation-test` → approve → `/ship`

## Updating

```bash
cd spec-harness
git pull
node scripts/install.js --target claude [--with-extras]
```
