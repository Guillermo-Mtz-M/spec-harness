# garrytan/gstack
> https://github.com/garrytan/gstack · ⭐ 117k · Garry Tan's exact Claude Code setup — 23 opinionated tools serving as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, QA

## Key Ideas

- **Full sprint lifecycle skills (23)**: Think → Plan → Build → Review → Test → Ship → Reflect
- **Specialist roles as slash commands**: `/office-hours` (YC Office Hours), `/plan-ceo-review` (CEO), `/plan-eng-review` (Eng Manager), `/plan-design-review` (Senior Designer), `/plan-devex-review` (DX Lead), `/design-consultation` (Design Partner), `/review` (Staff Engineer), `/investigate` (Debugger), `/design-review` (Designer Who Codes), `/devex-review` (DX Tester), `/design-shotgun` (Design Explorer), `/design-html` (Design Engineer), `/qa` (QA Lead), `/cso` (Chief Security Officer), `/ship` (Release Engineer), `/land-and-deploy` (Release Engineer), `/canary` (SRE), `/benchmark` (Performance Engineer), `/document-release` (Technical Writer), `/document-generate` (Documentation Author), `/retro` (Eng Manager), `/browse` (QA Engineer), `/autoplan` (Review Pipeline)
- **Power tools**: `/codex` (second opinion), `/careful` (safety guardrails), `/freeze` (edit lock), `/guard` (full safety), `/open-gstack-browser` (GStack Browser), `/setup-deploy`, `/setup-gbrain`, `/sync-gbrain`, `/gstack-upgrade`, `/ios-qa` (live-device iOS QA)
- **Smart review routing** — CEO doesn't review infra bugs; design review only for UI; automatic detection of appropriate reviews
- **Continuous checkpoint mode** — auto-commit WIP with structured context, survives crashes, `/context-restore` reconstructs state
- **Domain skills + raw CDP escape hatch** — per-site notes that fire automatically, raw Chrome DevTools Protocol for edge cases
- **Parallel sprints** — design at heart (shotgun → HTML pipeline), QA with real browser, test everything (100% coverage goal), `/document-release` auto-updates all docs
- **Karpathy's 4 failure modes covered** — wrong assumptions (`/office-hours`), overcomplexity (`/review`), orthogonal edits (`/review`), imperative over declarative (`/ship`)
- **810× productivity claim** — logical code change 2026 vs 2013 (same person, different tooling)

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| Sprint lifecycle (Think→Plan→Build→Review→Test→Ship→Reflect) | Core workflow: grill-me → spec-author → implement → reviewer → mutation-test → ship |
| Specialist role skills (CEO, Eng, Designer, QA, etc.) | 5 agents: spec-author, implementer, judge, mutation-tester, council-chairman |
| `/plan-ceo-review` scope challenge | `/spec-review` + CEO-style questions in `/grill-me` |
| `/plan-eng-review` architecture lock-in | `/implement` + `/tdd-loop` + architecture diagrams in SPEC.md |
| `/plan-design-review` 0-10 scoring | Not yet implemented; future: design-review skill |
| `/review` auto-fix + flag completeness | `/reviewer` + `/mutation-test` + `/council-review` |
| `/qa` real browser testing | `/browse` concept (not yet implemented); integration with `graphify` |
| `/cso` OWASP + STRIDE | Not yet implemented; future: security skill |
| `/ship` bootstraps test frameworks | `/ship` skill includes test setup checklist |
| `/document-release` auto-syncs docs | `/document-release` concept (planned) |
| Continuous checkpoint / context restore | `/handoff` + `/context-engineer` external memory |
| GStack Browser (real Chromium) | Future: browser-based QA integration |
| Domain skills (per-site learning) | Future: project-specific learnings via `/learn` concept |