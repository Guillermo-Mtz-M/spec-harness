# affaan-m/ECC
> https://github.com/affaan-m/ECC · ⭐ 222k · The agent harness operating system for AI coding agents

## Key Ideas

- **Agent Harness OS** — not just configs; complete system: skills, instincts, memory optimization, continuous learning, security scanning, research-first development
- **270+ skills, 67 agents, 84 legacy command shims** — massive catalog evolved over 10+ months of daily production use
- **Cross-harness support** — Codex, Claude Code, Cursor, OpenCode, Gemini, Zed, GitHub Copilot, others; single source, multi-target
- **Harness-first framing** — explicit performance system: token optimization, memory persistence, evals, parallelization, subagent orchestration
- **Hooks runtime controls** — `ECC_HOOK_PROFILE=minimal|standard|strict` and `ECC_DISABLED_HOOKS` for runtime gating without editing files
- **Selective install architecture** — manifest-driven pipeline (`install-plan.js` + `install-apply.js`) for targeted component installation
- **SQLite state store** — session adapters for structured recording, skill evolution foundation for self-improving skills
- **12 language ecosystems** — rules for TypeScript, Python, Go, Java, PHP, Perl, Kotlin/Android/KMP, C++, Rust + common
- **AgentShield integration** — `/security-scan` runs AgentShield directly; 1282 tests, 102 rules
- **GitHub Marketplace App** — ECC Tools with free/pro/enterprise tiers for PR audits
- **Continuous learning v2** — instinct-based learning with confidence scoring, import/export, evolution
- **Multi-agent orchestration** — PM2 + `/multi-plan`, `/multi-execute`, `/multi-backend`, `/multi-frontend`, `/multi-workflow`
- **NanoClaw v2** — model routing, skill hot-load, session branch/search/export/compact/metrics

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| Cross-harness support (10+ agents) | `scripts/install.js --target <claude|opencode|cursor>` + Gemini CLI + docs for 4 tools |
| Harness performance framing | `references/harness-principles.md` (3 pillars: guardrails, context, verification) |
| Selective install / modular components | Skills are independent; install only what you need via install.js profiles |
| Multi-language rules (12 ecosystems) | `rules/common/`, `rules/typescript/`, `rules/python/` (extensible) |
| Hooks with runtime profiles | Not implemented (simpler by design); safety via `/careful` + `/freeze` |
| Continuous learning / instinct evolution | `/handoff` captures decisions; future: learnings persistence |
| AgentShield security scanning | `/cso` concept (not yet implemented); security via `rules/common/security` |
| SQLite state store / session tracking | `HANDOFF.md` artifact-based handoffs (file-based, no DB) |
| Massive skill catalog (270+) | Curated 15 core skills; integrations bring external skills (graphify, superpowers, etc.) |
| GitHub App for PR audits | `/review` + `/ship` pipeline; CI integration via `validate.js` |