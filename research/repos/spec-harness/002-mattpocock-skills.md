# mattpocock/skills
> https://github.com/mattpocock/skills · ⭐ 147k · Skills for Real Engineers — small, adaptable, composable

## Key Ideas

- **Grill-me interview pattern** — relentless one-question-at-a-time interview until ~95% confidence on what user actually wants (not what they think they want)
- **CONTEXT.md shared language** — project-specific glossary that reduces agent verbosity by ~75%, enables consistent naming, serves as domain model for agents
- **ADR-driven decisions** — architectural decisions recorded inline during grill-with-docs, creating traceable rationale
- **TDD skill with red-green-refactor loop** — vertical slices, test pyramid guidance, DAMP over DRY, "Beyoncé Rule" (if you liked it then you shoulda put a test on it)
- **Zoom-out architecture view** — agent explains code in system context using CONTEXT.md + ADRs, finds deepening opportunities (Ousterhout's philosophy)
- **Diagnose skill** — systematic debugging: reproduce → minimize → hypothesize → instrument → fix → regression-test
- **Improve-codebase-architecture** — finds deepening opportunities, rescues "ball of mud" codebases
- **Skills are small and composable** — each does one thing well; no monolithic frameworks that own the process
- **Caveman mode** — ultra-compressed communication dropping filler while keeping technical accuracy (~75% token reduction)

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| `/grill-me` interview | `/grill-me` skill (direct inspiration) |
| CONTEXT.md shared language | `references/context-minimization.md` + context-engineer skill |
| ADR-driven decisions | `templates/PRD.md` + `handoff` skill captures decisions with "why" |
| TDD red-green-refactor | `/tdd-loop` skill + `/implement` vertical slices |
| Zoom-out architecture view | `/zoom-out` skill (direct inspiration) |
| Systematic debugging loop | `/diagnose` skill (reproduce → minimize → hypothesize → fix → guard) |
| Small composable skills | 15 skills, each independent, combinable via `/using-spec-harness` |
| "Beyoncé Rule" test discipline | `/mutation-test` enforces test quality via mutation score ≥70% |
| Caveman token reduction | Context minimization (4-layer stack, progressive loading) |
| Git guardrails (hooks blocking dangerous commands) | Safety rules in `rules/common/` + `/careful` concept |