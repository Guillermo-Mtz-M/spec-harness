# addyosmani/agent-skills
> https://github.com/addyosmani/agent-skills · ⭐ 67k · Production-grade engineering skills for AI coding agents

## Key Ideas

- **24 skills** organized across a full development lifecycle: Define → Plan → Build → Verify → Review → Ship
- **7 slash commands** as entry points: `/spec`, `/plan`, `/build`, `/test`, `/review`, `/code-simplify`, `/ship`
- **4 agent personas** for targeted reviews: code-reviewer (Staff Engineer), test-engineer (QA Specialist), security-auditor (Security Engineer), web-performance-auditor (Web Performance Engineer)
- **Anti-rationalization tables** in every skill — common excuses agents use to skip steps with documented counter-arguments
- **Verification is non-negotiable** — every skill ends with evidence requirements (tests passing, build output, runtime data)
- **Progressive disclosure** — SKILL.md is the entry point; supporting references load only when needed
- **Multi-platform support**: Claude Code, Cursor, Gemini CLI, OpenCode, Windsurf, Antigravity, Codex, Copilot, Kiro
- **Google engineering culture baked in**: Hyrum's Law (API design), Beyonce Rule + test pyramid (testing), change sizing + review speed norms (code review), Chesterton's Fence (simplification), trunk-based development (git), Shift Left + feature flags (CI/CD), deprecation skill (code as liability)

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| Lifecycle skills (Define→Plan→Build→Verify→Review→Ship) | Core workflow: `/grill-me` → `/spec-author` → `/implement` → `/reviewer` → `/mutation-test` → `/ship` |
| Anti-rationalization tables | Every skill includes Anti-Rationalization section (e.g., reviewer, grill-me) |
| Verification evidence requirements | Verification section in every skill (PASS/FAIL/PARTIAL per requirement) |
| Agent personas for specialized reviews | 5 agents: spec-author, implementer, judge, mutation-tester, council-chairman |
| Multi-platform install (Claude, Cursor, Gemini, OpenCode, etc.) | `scripts/install.js --target <claude|opencode|cursor>` + Gemini CLI extension |
| Google engineering practices embedded | Rules: common/typescript/python coding standards; harness principles |
| Skill anatomy: Overview, When to Use, Process, Rationalizations, Red Flags, Verification | Identical structure in all 15 Spec-Harness skills |
| 4 reference checklists (testing, security, performance, accessibility) | 4 references: ears-notation, testing-anti-patterns, context-minimization, harness-principles |