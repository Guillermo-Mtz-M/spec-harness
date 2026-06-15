# Claude Code Setup

## Install

```bash
# Clone the repo
git clone https://github.com/yourusername/spec-harness.git
cd spec-harness

# Run installer
node scripts/install.js claude
```

This copies:
- `skills/` → `~/.claude/skills/`
- `agents/` → `~/.claude/agents/`
- `commands/` → `~/.claude/commands/`
- `rules/common/` → `~/.claude/rules/spec-harness/`

## Commands Available

After install, these slash commands are available:

| Command | Description |
|---------|-------------|
| `/grill-me` | Interrogate user for requirements |
| `/spec-author` | Write EARS/Gherkin spec |
| `/implement` | Build with TDD |
| `/reviewer` | Spec compliance review |
| `/mutation-test` | Adversarial mutation testing |
| `/handoff` | Session handoff |
| `/diagnose` | Debug with scientific method |
| `/ship` | Commit and deploy |

## Skills Available

After install, skills load automatically when triggered:

- `skills/grill-me/SKILL.md`
- `skills/spec-author/SKILL.md`
- `skills/spec-review/SKILL.md`
- `skills/implementer/SKILL.md`
- `skills/tdd-loop/SKILL.md`
- `skills/reviewer/SKILL.md`
- `skills/mutation-tester/SKILL.md`
- `skills/context-engineer/SKILL.md`
- `skills/subagent-driven-dev/SKILL.md`
- `skills/handoff/SKILL.md`
- `skills/diagnose/SKILL.md`
- `skills/zoom-out/SKILL.md`
- `skills/ship/SKILL.md`
- `skills/using-spec-harness/SKILL.md`

## Quick Start

1. Restart Claude Code (or type `/help` to refresh skills)
2. Open a project directory
3. Type `/grill-me` to start the spec workflow