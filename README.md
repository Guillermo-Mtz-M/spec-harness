# Spec-Harness

**Spec-Driven Development + Harness Engineering for AI coding agents.**

A composable skill system that combines **Spec-Driven Development** (spec as source of truth) with **Harness Engineering** (automated guardrails, memory, and verification) — designed by synthesizing real-world patterns from production AI workflows.

Works with **Claude Code**, **Codex**, **OpenCode**, **Cursor**, **Gemini CLI**, and any agent that reads markdown skills.

---

## Why This Exists

Most AI coding agent skills focus on one problem: quality gates, context management, or workflow orchestration. **Spec-Harness** combines three proven philosophies into one system:

1. **Spec-Driven Development** — Define *what* you want before building it. The spec is the contract. Every line of code traces back to a requirement. (From [SDD 3-level model](https://github.com/yourusername/spec-harness))

2. **Harness Engineering** — Build automated guardrails around your agents: context minimization, subagent handoff via artifacts, external memory, verification loops that don't let you ship broken code. (From [Harness Engineering principles](https://github.com/yourusername/spec-harness))

3. **Human on the Loop** — Not "in the loop" (approving every step), but "on the loop" (approving the spec and the final result, trusting the harness for everything in between). This is the productivity multiplier. (From [Loop Engineering model](https://github.com/yourusername/spec-harness))

The result: agents that build what you actually want, verify it works, and only interrupt you when it matters.

---

## The Workflow

```
  SPECIFY          REVIEW           BUILD           VERIFY           SHIP
 ┌────────┐      ┌────────┐      ┌────────┐      ┌────────┐      ┌────────┐
 │ grills │ ───▶ │  spec  │ ───▶ │   TDD  │ ───▶ │ judge  │ ───▶ │  human │
 │  user  │      │ review │      │  loop  │      │ mutate │      │ approve│
 └────────┘      └────────┘      └────────┘      └────────┘      └────────┘
  /grill-me        /spec-review    /implement       /mutation-test   /ship
       └──── /spec-author ────┘   └──── /tdd-loop ─┘   └── /reviewer ─┘
```

### Human approval gates (2 only):
1. **After spec** — "Is this what I want?"
2. **After verification** — "Does this work?"

Everything in between is automated by the harness.

---

## Quick Start

### Install

```bash
# Clone the repo
git clone https://github.com/yourusername/spec-harness.git
cd spec-harness

# Run the installer (copies skills to your agent's config)
node scripts/install.js --target claude    # Claude Code
node scripts/install.js --target opencode  # OpenCode
node scripts/install.js --target cursor    # Cursor
```

Or manually copy the `skills/` and `agents/` directories to your agent's config path.

### First Use

1. Type `/grill-me` — the agent interrogates you about what you want
2. Type `/spec-author` — it writes an EARS/Gherkin spec from your answers
3. Review the spec, approve or iterate
4. Type `/implement` — it builds each requirement via TDD loop
5. Type `/reviewer` — a fresh-context judge reviews against the spec
6. Type `/mutation-test` — adversarial tests try to break the implementation
7. Review the result, approve or iterate
8. Type `/ship` — commit, PR, deploy

---

## All Skills

### Core SDD Workflow

| Skill | What It Does | Use When |
|-------|-------------|----------|
| [`/grill-me`](skills/grill-me/SKILL.md) | Relentless interview that extracts what you actually want | Starting any non-trivial change |
| [`/spec-author`](skills/spec-author/SKILL.md) | Writes EARS/Gherkin spec with acceptance criteria and boundaries | After grilling, before coding |
| [`/spec-review`](skills/spec-review/SKILL.md) | Independent review of spec against ambiguity checklist | Before approving the spec |
| [`/implement`](skills/implementer/SKILL.md) | Incremental implementation: thin vertical slices, commit per slice | Spec approved, ready to code |
| [`/tdd-loop`](skills/tdd-loop/SKILL.md) | Red-Green-Refactor with verification gates between slices | During implementation |
| [`/reviewer`](skills/reviewer/SKILL.md) | Fresh-context judge: does the code satisfy the spec? | After implementation, before shipping |
| [`/mutation-test`](skills/mutation-tester/SKILL.md) | Adversarial mutation testing: kill the mutants or fix the code | After reviewer passes |
| [`/ship`](skills/ship/SKILL.md) | Commit, PR, changelog, deploy checklist | Everything verified |

### Harness Engineering

| Skill | What It Does | Use When |
|-------|-------------|----------|
| [`/context-engineer`](skills/context-engineer/SKILL.md) | Minimal context per agent, progressive loading, external memory | Session start, context bloat |
| [`/subagent-driven-dev`](skills/subagent-driven-dev/SKILL.md) | Dispatch fresh subagents per task with artifact handoff | Implementing multi-task specs |
| [`/handoff`](skills/handoff/SKILL.md) | Compact session into handoff doc for next agent | Switching agents, context reset |
| [`/diagnose`](skills/diagnose/SKILL.md) | Systematic debugging: reproduce → minimize → hypothesize → fix | Bug or regression found |
| [`/zoom-out`](skills/zoom-out/SKILL.md) | See code in system context, find design opportunities | Lost in the weeds |

### Meta

| Skill | What It Does | Use When |
|-------|-------------|----------|
| [`/using-spec-harness`](skills/using-spec-harness/SKILL.md) | Maps your task to the right skill workflow | Starting a session |

---

## Integrations

Plug-in skills from external projects, pre-configured for the SDD workflow:

| Integration | What It Adds | Setup |
|-------------|-------------|-------|
| [`graphify`](integrations/graphify/SKILL.md) | Knowledge graphs from codebase — 71x fewer tokens per query | `pip install graphifyy && graphify install` |
| [`superpowers`](integrations/superpowers/SKILL.md) | Subagent-driven development, brainstorming, git worktrees | Plugin install |
| [`bmad-method`](integrations/bmad-method/SKILL.md) | 12+ specialized agents (PM, Architect, UX), scale-adaptive planning | `npx bmad-method install` |
| [`karpathy-guidelines`](integrations/karpathy-guidelines/SKILL.md) | Think before coding, simplicity first, surgical changes | Copy to CLAUDE.md |
| [`context7`](integrations/context7/SKILL.md) | Up-to-date library docs via MCP — no hallucinated APIs | `npx ctx7 setup` |

---

## Agent Personas

Specialist subagents for targeted work:

| Agent | Role | Perspective |
|-------|------|-------------|
| [`spec-author`](agents/spec-author.md) | Requirements Engineer | EARS notation, Gherkin scenarios, boundary identification |
| [`implementer`](agents/implementer.md) | Senior Developer | Vertical slices, TDD, YAGNI, minimal abstractions |
| [`judge`](agents/judge.md) | Code Reviewer | Spec compliance, not style opinions |
| [`mutation-tester`](agents/mutation-tester.md) | QA Adversary | Kill the mutants, expose weak tests |

---

## Templates

Ready-to-use artifact templates that the skills produce/consume:

| Template | Used By | What It Is |
|----------|---------|-----------|
| [`SPEC.md`](templates/SPEC.md) | /spec-author | EARS/Gherkin requirements document |
| [`HANDOFF.md`](templates/HANDOFF.md) | /handoff | Compact session context for next agent |
| [`REVIEW.md`](templates/REVIEW.md) | /reviewer | Spec compliance review with verdicts |
| [`MUTATION_REPORT.md`](templates/MUTATION_REPORT.md) | /mutation-tester | Mutation test results and coverage |
| [`PRD.md`](templates/PRD.md) | /spec-author (large features) | Product Requirements Document |

---

## Reference Checklists

| Reference | Covers |
|-----------|--------|
| [`ears-notation.md`](references/ears-notation.md) | EARS requirements patterns with examples |
| [`testing-anti-patterns.md`](references/testing-anti-patterns.md) | Mocks trap, coverage obsession, flaky tests |
| [`context-minimization.md`](references/context-minimization.md) | Token reduction, progressive loading, external memory |
| [`harness-principles.md`](references/harness-principles.md) | 3 pillars: automated guardrails, context, verification |

---

## Project Structure

```
spec-harness/
├── skills/                        # 15 skills
│   ├── grill-me/                  #   Specify
│   ├── spec-author/               #   Specify
│   ├── spec-review/               #   Specify
│   ├── implementer/               #   Build
│   ├── tdd-loop/                  #   Build
│   ├── reviewer/                  #   Verify
│   ├── mutation-tester/           #   Verify
│   ├── context-engineer/          #   Harness
│   ├── subagent-driven-dev/       #   Harness
│   ├── handoff/                   #   Harness
│   ├── diagnose/                  #   Harness
│   ├── zoom-out/                  #   Harness
│   ├── ship/                      #   Ship
│   └── using-spec-harness/        #   Meta
├── agents/                        # 4 specialist personas
├── integrations/                  # 5 external tool skills
├── templates/                     # 5 artifact templates
├── references/                    # 4 supplementary checklists
├── rules/                         # Always-follow guidelines
│   ├── common/                    #   Language-agnostic
│   ├── typescript/                #   TypeScript specific
│   └── python/                    #   Python specific
├── docs/                          # Setup guides per tool
├── .claude/commands/              # Slash commands (Claude Code)
└── scripts/                       # Installer
```

---

## Design Principles

These principles come from synthesizing 8 intensive research documents on AI-driven development and 10 production agent skill repositories.

### 1. Spec is Source of Truth
Every line of code traces to a requirement. No spec = no code. The spec is written in EARS notation with Gherkin scenarios so it's both human-readable and machine-verifiable.

### 2. Context is a Budget
Each agent receives only the context it needs — no more. Handoffs happen via **artifact files** (SPEC.md, HANDOFF.md), not by inheriting the full conversation. This is the key insight from Harness Engineering: context bloat kills quality.

### 3. Subagents, Not Monoliths
Break work into independent agents, each with a clear input artifact and output artifact. Fresh context per agent = better decisions. No single agent holds the entire project in its head.

### 4. Verification is Non-Negotiable
Every skill ends with evidence requirements. "Seems right" is never sufficient. Mutation testing proves tests actually verify behavior. The judge reviews against the spec, not their opinions.

### 5. Tools Simple > Tools Complex
One tool that does one thing well beats a framework that does everything. No hyper-specialized tools that break when the model changes. Inspired by the Vercel/D0 lesson: simple tools, composed.

### 6. Human on the Loop
The human approves the spec and the final result. The harness automates everything in between. This is not absentee coding — it's trust-with-verification.

### 7. Simplicity First (Karpathy)
Minimum code that solves the problem. No speculative abstractions. No "flexibility" nobody asked for. If 200 lines could be 50, rewrite it.

### 8. Surgical Changes
Touch only what you must. Don't refactor adjacent code. Match existing style. Every changed line traces to the spec.

---

## How Skills Work

Every skill follows consistent anatomy:

```
┌─────────────────────────────────────────────────┐
│  SKILL.md                                       │
│                                                 │
│  Frontmatter: name, description, triggers       │
│  Overview:        What this skill does           │
│  When to Use:     Triggering conditions          │
│  Process:         Step-by-step workflow          │
│  Rationalizations: Common excuses + rebuttals   │
│  Verification:    Evidence requirements          │
│  Artifacts:       Input/Output files             │
└─────────────────────────────────────────────────┘
```

**Key design choices:**

- **Process, not prose.** Skills are step-by-step workflows agents follow, not reference docs they read.
- **Anti-rationalization tables.** Common excuses agents use to skip steps, with documented rebuttals.
- **Verification gates.** Every skill requires evidence before proceeding. "I think it works" is rejected.
- **Artifact handoff.** Skills produce and consume files (SPEC.md, HANDOFF.md), enabling subagent orchestration.
- **Progressive disclosure.** References load only when needed, keeping token usage minimal.

---

## Comparison with Other Systems

| Feature | Spec-Harness | mattpocock/skills | addyosmani/agent-skills | ECC | BMAD-METHOD |
|---------|-------------|-------------------|------------------------|-----|-------------|
| Spec-driven workflow | EARS/Gherkin built-in | PRD-focused | PRD-focused | Commands | Full |
| Harness Engineering | Context minimization, external memory | Context.md | Context engineering skill | Hooks + memory | Instincts |
| Subagent handoff | Artifact-based (file handoff) | Handoff skill | N/A | Orchestrators | Party mode |
| Mutation testing | Built-in skill | No | No | No | TEA module |
| Human approval gates | 2 (spec + result) | Per-task | Per-task | Per-command | Per-phase |
| External integrations | 5 pre-wired | N/A | N/A | Plugin system | Module system |
| Agent personas | 4 (spec, impl, judge, tester) | N/A | 4 reviewers | 67 | 12+ |

---

## License

MIT — use these skills in your projects, teams, and tools.

---

## Acknowledgments

Built by synthesizing insights from:

- **8 research documents** on SDD, Harness Engineering, multiagent systems, verification, and human-on-the-loop
- **10 reference repositories**: [mattpocock/skills](https://github.com/mattpocock/skills), [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills), [affaan-m/ECC](https://github.com/affaan-m/ECC), [garrytan/gstack](https://github.com/garrytan/gstack), [obra/superpowers](https://github.com/obra/superpowers), [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD), [safishamsi/graphify](https://github.com/safishamsi/graphify), [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills), [upstash/context7](https://github.com/upstash/context7), [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)
