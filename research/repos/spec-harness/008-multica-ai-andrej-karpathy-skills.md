# multica-ai/andrej-karpathy-skills
> https://github.com/multica-ai/andrej-karpathy-skills · ⭐ 183k · Andrej Karpathy's AI coding rules as skills

## Key Ideas

- **Karpathy's 4 failure modes** — Wrong assumptions, Overcomplexity, Orthogonal edits, Imperative over declarative
- **4 core principles** (from SKILL.md):
  1. **Think Before Coding** — Don't assume, don't hide confusion, surface tradeoffs; state assumptions explicitly, ask if uncertain, present multiple interpretations, push back when warranted
  2. **Simplicity First** — Minimum code that solves the problem; no features beyond asked, no abstractions for single-use, no speculative flexibility, no error handling for impossible scenarios; "If 200 lines could be 50, rewrite it"
  3. **Surgical Changes** — Touch only what you must; don't improve adjacent code/comments/formatting; don't refactor unbroken things; match existing style; remove imports/variables/functions YOUR changes made unused
  4. **Goal-Driven Execution** — Define success criteria, loop until verified; transform tasks to verifiable goals ("Add validation" → "Write tests for invalid inputs, then make them pass"); brief plan with verification checks per step
- **Tradeoff: caution over speed** — biases toward caution; for trivial tasks, use judgment
- **Strong success criteria enable independent looping** — weak criteria ("make it work") require constant clarification
- **Integration in Spec-Harness** — `integrations/karpathy-guidelines/` skill wraps these principles for agent consumption

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| Think Before Coding | `/grill-me` extracts assumptions; `/spec-author` makes them explicit in SPEC.md |
| Simplicity First (200→50 lines) | Design Principle #7: "Simplicity First — 200 lines → 50? Rewrite it" |
| Surgical Changes | Design Principle #8: "Surgical Changes — Touch only what the spec requires" |
| Goal-Driven Execution (verifiable goals) | Every skill ends with Verification section; SPEC.md has EARS/Gherkin with acceptance criteria |
| Tradeoff: caution over speed | Human approval gates (2 only); trust automation between gates |
| Strong success criteria | EARS/Gherkin requirements with Gherkin scenarios as verification |
| Wrong assumptions → surface early | `/grill-me` interview; `/spec-review` ambiguity checklist |
| Overcomplexity → caught in review | `/reviewer` + `/council-review` flag unnecessary complexity |
| Orthogonal edits → blocked | `/reviewer` boundary check: "Does any code exist that doesn't trace to a spec requirement?" |
| Imperative over declarative | Spec-driven: declarative SPEC.md → implementation follows |
| Karpathy guidelines integration | `integrations/karpathy-guidelines/SKILL.md` |