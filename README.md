# Spec-Harness | [中文](./README.zh.md) · [Español](./README.es.md)

![Stargazers](https://img.shields.io/github/stars/Guillermo-Mtz-M/spec-harness?style=flat)
![Forks](https://img.shields.io/github/forks/Guillermo-Mtz-M/spec-harness?style=flat)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Skills](https://img.shields.io/badge/skills-15-40c4ff)
![Agents](https://img.shields.io/badge/agents-5-b48ead)
![Integrations](https://img.shields.io/badge/integrations-5-66bb6a)

**Spec-Driven Development + Harness Engineering for AI coding agents.**

A composable skill system combining **Spec-Driven Development** (spec as source of truth) with **Harness Engineering** (automated guardrails, context minimization, verification loops) — designed by synthesizing real-world patterns from production AI workflows.

Works with **Claude Code**, **Codex**, **OpenCode**, **Cursor**, **Gemini CLI**, and any agent that reads markdown skills.

---

## Workflow Diagram

![Workflow](assets/workflow.svg)

### 2 Human Gates Only

- **Gate 1:** After `/spec-author` — "Is this what I want?"
- **Gate 2:** After `/mutation-test` — "Does it work?"

Everything between gates is automated by the harness.

---

## Full Walkthrough (Examples)

| Example | What it demonstrates |
|---------|----------------------|
| [`examples/01-user-auth/`](examples/01-user-auth/) | Full flow: auth system with 4 requirements. All artifacts produced — SPEC.md, REVIEW.md, MUTATION_REPORT.md, implementation commits |
| [`examples/02-api-rate-limit/`](examples/02-api-rate-limit/) | Minimal spec: API rate limiter middleware (2 requirements). Shows the flow scales down, not just up |

---

## Quick Start

### 3 Steps

```bash
# 1. Install
git clone https://github.com/Guillermo-Mtz-M/spec-harness.git && cd spec-harness && node scripts/install.js --target claude

# 2. Interview
# Type /grill-me — the agent interrogates you about what you actually want

# 3. Specify
# /spec-author writes SPEC.md in EARS/Gherkin
# → [HUMAN APPROVES]
# → [Implement]
# → [Verify]
# → /ship
```

### Supported Agents

| Agent | Install |
|-------|---------|
| Claude Code | `node scripts/install.js --target claude` |
| OpenCode | `node scripts/install.js --target opencode` |
| Cursor | `node scripts/install.js --target cursor` |
| Gemini CLI | `gemini extensions install https://github.com/Guillermo-Mtz-M/spec-harness` |

---

## The Workflow

```
  SPECIFY          REVIEW           BUILD           VERIFY           SHIP
 ┌────────┐      ┌────────┐      ┌────────┐      ┌────────┐      ┌────────┐
 │ grills │ ───▶ │  spec  │ ───▶ │   TDD  │ ───▶ │ judge  │ ───▶ │  human │
 │  user  │      │ review │      │  loop  │      │ mutate │      │ approve│
 └────────┘      └────────┘      └────────┘      └────────┘      └────────┘
   /grill-me       /spec-review     /implement       /mutation-test    /ship
        └──── /spec-author ────┘   └──── /tdd-loop ─┘   └── /reviewer ─┘
```

**Human approval gates (2 only):**
1. **After spec** — "Is this what I want?"
2. **After verification** — "Does it work?"

---

## Skills (15)

| Skill | What it does | When to use |
|-------|-------------|-------------|
| `/grill-me` | Relentless interview — extract what you actually want | Starting anything non-trivial |
| `/spec-author` | Write EARS/Gherkin spec with acceptance criteria | After grilling, before coding |
| `/spec-review` | Fresh-context review against ambiguity checklist | Before approving the spec |
| `/implement` | Thin vertical slices with TDD, commit per slice | Spec approved, time to build |
| `/tdd-loop` | RED-GREEN-REFACTOR with verification gates | During implementation |
| `/reviewer` | Judge: does the code satisfy the spec? | After implementation |
| `/council-review` | 3 anonymous specialist reviews (spec, performance, security) → chairman synthesis | After reviewer, before mutation-test |
| `/mutation-test` | Kill mutants or fix tests (≥70% score required) | After council-review approves |
| `/ship` | Commit, PR, changelog, deploy checklist | Everything verified |
| `/context-engineer` | Minimize context, progressive loading, external memory | Session start, context bloat |
| `/subagent-driven-dev` | Dispatch fresh agents per task via artifacts | Multi-slice specs |
| `/handoff` | Compact session to HANDOFF.md for next agent | Switching agents, context reset |
| `/diagnose` | Reproduce → minimize → hypothesize → fix → guard | Bug or regression |
| `/zoom-out` | See code in system context, find deepening opportunities | Lost in details |
| `/using-spec-harness` | Maps your task to the right skill | Session start |

---

## Integrations (5)

| Integration | What it adds | Setup |
|-------------|-------------|-------|
| [`graphify`](integrations/graphify/) | Knowledge graphs — 71x fewer tokens per query | `pip install graphifyy && graphify install` |
| [`superpowers`](integrations/superpowers/) | Brainstorm → plan → execute with git worktrees | Plugin install |
| [`bmad-method`](integrations/bmad-method/) | 12+ specialized agents, scale-adaptive planning | `npx bmad-method install` |
| [`karpathy-guidelines`](integrations/karpathy-guidelines/) | Think before coding, simplicity first, surgical changes | Copy to CLAUDE.md |
| [`context7`](integrations/context7/) | Up-to-date library docs via MCP — no hallucinated APIs | `npx ctx7 setup` |

---

## Agents (5)

| Agent | Role | Verdict |
|-------|------|---------|
| [`spec-author`](agents/spec-author.md) | Requirements Engineer | EARS notation |
| [`implementer`](agents/implementer.md) | Senior Developer | TDD, YAGNI, surgical changes |
| [`judge`](agents/judge.md) | Code Reviewer | PASS / FAIL / PARTIAL per requirement |
| [`mutation-tester`](agents/mutation-tester.md) | QA Adversary | Mutation score ≥ 70% |
| [`council-chairman`](agents/council-chairman.md) | Synthesis Arbiter | Unified verdict from anonymous reviews |

---

## Design Principles

```
1. Spec is Source of Truth     → No spec = no code. EARS/Gherkin only.
2. Context is a Budget         → Minimal per agent. Handoffs via artifacts.
3. Subagents, Not Monoliths   → Fresh context = better decisions.
4. Verification is Mandatory  → "Seems right" is rejected. Show the test.
5. Tools Simple > Complex      → Inspired by Vercel/D0 lesson.
6. Human on the Loop           → 2 gates only (spec + result). Trust in between.
7. Simplicity First           → 200 lines → 50? Rewrite it.
8. Surgical Changes            → Touch only what the spec requires.
```

---

## Project Structure

```
spec-harness/
├── skills/               # 15 skills (core workflow)
├── agents/               # 5 specialist personas
├── integrations/         # 5 external tool integrations
├── templates/            # 6 artifact templates
│   ├── SPEC.md           # EARS/Gherkin contract
│   ├── HANDOFF.md        # Session handoff
│   ├── REVIEW.md         # Judge verdict
│   ├── MUTATION_REPORT.md # Mutation test results
│   ├── COUNCIL-REVIEW.md # Council review synthesis
│   └── PRD.md            # Product requirements
│   ├── COUNCIL-REVIEW.md # Council review synthesis
├── references/           # 4 supplementary checklists
├── rules/                # Always-follow guidelines (common, ts, python)
├── docs/                 # Setup guides (Claude, OpenCode, Cursor, Gemini)
├── .claude/commands/     # 16 slash commands for Claude Code
└── scripts/              # install.js + validate.js
```

---

## Comparison

| Feature | Spec-Harness | mattpocock | agent-skills | ECC | BMAD | gstack |
|---------|:-----------:|:----------:|:------------:|:---:|:----:|:------:|
| EARS/Gherkin spec | ✅ Built-in | PRD | PRD | Commands | Full | PRD |
| Harness Engineering | ✅ Context + memory | Context.md | Context skill | Hooks | Instincts | Context + memory |
| Artifact handoffs | ✅ File-based | Handoff skill | N/A | Orchestrators | Party mode | Skill-based |
| Mutation testing | ✅ Built-in | ❌ | ❌ | ❌ | TEA module | ❌ |
| Human approval gates | **2 only** | Per-task | Per-task | Per-cmd | Per-phase | Per-skill |
| External integrations | 5 pre-wired | ❌ | ❌ | Plugin | Modules | 23 skills |
| Agent personas | 5 | ❌ | 4 reviewers | 67 | 12+ | 23 specialists |
| Multi-review council | ✅ /council-review | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) — contributions should improve the system, not add complexity.

## License

MIT — use in projects, teams, and tools.

## Acknowledgments

Synthesized from 9 research documents on SDD/Harness/multiagent systems and 11 production reference repos:
[mattpocock/skills](https://github.com/mattpocock/skills) · [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) · [affaan-m/ECC](https://github.com/affaan-m/ECC) · [garrytan/gstack](https://github.com/garrytan/gstack) · [obra/superpowers](https://github.com/obra/superpowers) · [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) · [safishamsi/graphify](https://github.com/safishamsi/graphify) · [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) · [upstash/context7](https://github.com/upstash/context7) · [karpathy/llm-council](https://github.com/karpathy/llm-council)