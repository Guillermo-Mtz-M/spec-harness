# Cursor Setup

## Install (Recommended)

```bash
# Via skills.sh (auto-detects Cursor)
npx skills add guillermo-mtz-m/spec-harness

# Run installer
node scripts/install.js --target cursor

# Or manually copy skills to Cursor rules
cp -r skills/* ~/.cursor/rules/
```

## How Cursor Loads Skills

Cursor loads rules from `~/.cursor/rules/`. Each skill file becomes a rule that Cursor auto-triggers based on keywords in the conversation.

## Skills Available

- `grill-me` — triggers on "grill", "interview", "what do I want"
- `spec-author` — triggers on "spec", "requirements", "write spec"
- `spec-review` — triggers on "review spec", "spec quality"
- `implement` — triggers on "implement", "build", "start coding"
- `tdd-loop` — triggers on "tdd", "test first", "red green"
- `reviewer` — triggers on "review", "check against spec"
- `council-review` — triggers on "council", "anonymous review", "multi-perspective"
- `mutation-test` — triggers on "mutation", "adversarial test"
- `context-engineer` — triggers on "context", "tokens", "manage memory"
- `subagent-driven-dev` — triggers on "subagent", "dispatch", "parallel"
- `handoff` — triggers on "handoff", "save progress", "switch agent"
- `diagnose` — triggers on "diagnose", "debug", "bug", "broken"
- `zoom-out` — triggers on "zoom out", "architecture", "system view"
- `ship` — triggers on "ship", "deploy", "push to main"
- `using-spec-harness` — triggers on "help", "how to", "what next"

## Integrations

Core (auto-installed): graphify, superpowers, bmad-method, karpathy-guidelines, context7
Extras (`--with-extras`): ui-ux-pro-max, open-design, ian-xiaohei-illustrations, small-business

## Updating

```bash
# Via skills.sh (recommended)
npx skills update

# Via git
cd spec-harness && git pull && node scripts/install.js --target cursor [--with-extras]
```

## Quick Start

1. Configure the rules in Cursor Settings
2. Open a project
3. Start with natural language — Cursor auto-triggers the right skill
