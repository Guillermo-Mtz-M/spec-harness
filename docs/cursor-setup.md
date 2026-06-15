# Cursor Setup

## Install

Copy the `skills/` directory contents to your Cursor rules:

```bash
# Copy skills to Cursor rules
cp -r skills/* ~/.cursor/rules/
```

Or add skill contents to your Cursor rules configuration:

```
Settings → Rules → Add a new rule
```

## How Cursor Loads Skills

Cursor loads rules from `~/.cursor/rules/`. Each skill file becomes a rule that Cursor auto-triggers based on keywords in the conversation.

## Skills Available

- `skills/grill-me/SKILL.md` — triggers on "grill", "interview", "what do I want"
- `skills/spec-author/SKILL.md` — triggers on "spec", "requirements", "write spec"
- `skills/spec-review/SKILL.md` — triggers on "review spec", "spec quality"
- `skills/implementer/SKILL.md` — triggers on "implement", "build", "start coding"
- `skills/tdd-loop/SKILL.md` — triggers on "tdd", "test first", "red green"
- `skills/reviewer/SKILL.md` — triggers on "review", "check against spec"
- `skills/mutation-tester/SKILL.md` — triggers on "mutation", "adversarial test"
- `skills/context-engineer/SKILL.md` — triggers on "context", "tokens", "manage memory"
- `skills/subagent-driven-dev/SKILL.md` — triggers on "subagent", "dispatch", "parallel"
- `skills/handoff/SKILL.md` — triggers on "handoff", "save progress", "switch agent"
- `skills/diagnose/SKILL.md` — triggers on "diagnose", "debug", "bug", "broken"
- `skills/zoom-out/SKILL.md` — triggers on "zoom out", "architecture", "system view"
- `skills/ship/SKILL.md` — triggers on "ship", "deploy", "push to main"

## Quick Start

1. Configure the rules in Cursor Settings
2. Open a project
3. Start with natural language — Cursor will auto-trigger the right skill