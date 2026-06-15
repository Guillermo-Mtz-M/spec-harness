# OpenCode Setup

## Install

```bash
# Option A: Reference in your AGENTS.md
Include: /path/to/spec-harness/.opencode/AGENTS.md
```

## Skills Available

In OpenCode, use the Skill tool to invoke any spec-harness skill:

```
Skill: grill-me
Skill: spec-author
Skill: implement
Skill: reviewer
Skill: mutation-test
Skill: context-engineer
Skill: subagent-driven-dev
Skill: handoff
Skill: diagnose
Skill: zoom-out
Skill: ship
Skill: using-spec-harness
```

## Agents

Reference the agent files in your AGENTS.md:

```markdown
## Spec-Harness Agents

| Role | File |
|------|------|
| Requirements Engineer | /path/to/spec-harness/agents/spec-author.md |
| Senior Developer | /path/to/spec-harness/agents/implementer.md |
| Judge | /path/to/spec-harness/agents/judge.md |
| Mutation Tester | /path/to/spec-harness/agents/mutation-tester.md |
```