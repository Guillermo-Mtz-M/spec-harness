# bmad-code-org/BMAD-METHOD
> https://github.com/bmad-code-org/BMAD-METHOD · ⭐ 49.7k · Breakthrough Method for Agile AI Driven Development

## Key Ideas

- **Scale-adaptive planning** — automatically adjusts planning depth based on project complexity (bug fix → enterprise system)
- **12+ specialized agent personas** — PM, Architect, Developer, UX, and more; each with distinct perspective and expertise
- **Party Mode** — bring multiple agent personas into one session to collaborate and discuss
- **Complete lifecycle** — brainstorming → planning → architecture → implementation → deployment
- **Web bundles** — package selected skills for Google Gemini Gems and ChatGPT Custom GPTs; planning on flat-rate subscription, bring artifacts into IDE for implementation
- **BMad Builder (BMB)** — create custom BMad agents and workflows
- **Test Architect (TEA)** — risk-based test strategy and automation module
- **Game Dev Studio (BMGD)** — game development workflows (Unity, Unreal, Godot)
- **Creative Intelligence Suite (CIS)** — innovation, brainstorming, design thinking
- **AI Intelligent Help** — `bmad-help` skill guides what's next
- **Structured workflows** — grounded in agile best practices across analysis, planning, architecture, implementation
- **Non-interactive install** — CI/CD friendly: `npx bmad-method install --directory /path --modules bmm --tools claude-code --yes`
- **Multi-language docs** — README_CN.md, README_VN.md

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| Scale-adaptive planning | `/using-spec-harness` decision tree + `/grill-me` adjusts depth to task |
| 12+ specialized agent personas | 5 core agents (spec-author, implementer, judge, mutation-tester, council-chairman) + integrations bring more |
| Party Mode (multi-persona discussion) | `/council-review` — 3 anonymous specialist reviews synthesized by chairman |
| Complete lifecycle | Full workflow coverage from spec to ship |
| Web bundles (Gemini/ChatGPT planning) | Not implemented; future: external planning integration |
| BMad Builder (custom agents) | Skills are composable; users can create custom skills following same anatomy |
| Test Architect (risk-based testing) | `/mutation-test` (adversarial) + `/tdd-loop` (test-first) |
| Module ecosystem (BMB, TEA, BMGD, CIS) | 5 integrations: graphify, superpowers, bmad-method, karpathy-guidelines, context7 |
| `bmad-help` guidance | `/using-spec-harness` maps task to right skill |
| Non-interactive install for CI | `scripts/install.js` + `scripts/validate.js` for CI |
| Multi-language documentation | README.md + README.zh.md + README.es.md |