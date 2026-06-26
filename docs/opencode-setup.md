# OpenCode Setup

## Install

```bash
# Option A: Reference in your AGENTS.md
Include: /path/to/spec-harness/.opencode/AGENTS.md

# Option B: Run installer
node scripts/install.js --target opencode
```

## Skills

Use the Skill tool to invoke any spec-harness skill:

| Skill | Description |
|-------|-------------|
| `grill-me` | Interrogate user for requirements |
| `spec-author` | Write EARS/Gherkin spec |
| `spec-review` | Review spec for ambiguity |
| `implement` | Build with TDD |
| `tdd-loop` | Red-Green-Refactor cycle |
| `reviewer` | Spec compliance review |
| `council-review` | Multi-perspective anonymous review |
| `mutation-test` | Adversarial mutation testing |
| `context-engineer` | Manage context budget |
| `subagent-driven-dev` | Multi-agent orchestration |
| `handoff` | Session handoff |
| `diagnose` | Debug with scientific method |
| `zoom-out` | System-level view |
| `ship` | Commit and deploy |
| `using-spec-harness` | Map task to right skill |

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
| Council Chairman | /path/to/spec-harness/agents/council-chairman.md |
```

## Integrations

Core: graphify, superpowers, bmad-method, karpathy-guidelines, context7
Extras (`--with-extras`): ui-ux-pro-max, open-design, ian-xiaohei-illustrations, small-business

See `.opencode/AGENTS.md` for the full integration table.
