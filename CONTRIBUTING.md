# Contributing to Spec-Harness

Welcome! Spec-Harness is a synthesis of real-world AI engineering practices. Contributions should improve the system, not add complexity for its own sake.

## Design Principles

Before adding anything, check it against these principles:

1. **Spec is source of truth** — skills should enforce spec-driven development, not bypass it
2. **Context is a budget** — skills should minimize context, not add to it
3. **Verification is non-negotiable** — skills should have clear evidence requirements
4. **Simplicity first** — the simplest skill that solves the problem is better than a complex one
5. **Human on the loop** — skills automate, humans approve

## What to Contribute

### Good contributions:
- New skills that follow the anatomy (Process, Verification, Artifacts, Anti-Rationalization table)
- Improved EARS/Gherkin examples
- Better reference checklists
- Integration guides for new tools
- Bug fixes and test improvements

### Not good contributions:
- Skills that replace human judgment with AI automation without verification
- Skills that add context without justification
- Skills that skip the TDD loop
- Features that increase complexity without improving outcomes

## Skill Anatomy

Every skill should have:

```
SKILL.md
├── Frontmatter (name, description, triggers)
├── Overview (what this skill does)
├── When to Use (triggering conditions)
├── Process (step-by-step workflow)
├── Anti-Rationalization Table (excuses + rebuttals)
├── Verification (evidence requirements)
└── Artifacts (input/output files)
```

## Testing

Run the validation:

```bash
node scripts/validate.js
```

This checks that all skills have the required sections and all references resolve.

## Research

See the [`research/`](./research/README.md) directory for the full analysis of 13 core repos, 4 extras, and 9 technical videos that influenced the design.

## Extras

Optional integrations (`--with-extras`) add design system generation, brand-grade design contracts, Chinese illustrations, and business operations plugins. See the [Integrations section](./README.md#integrations-9) for details.

## Commit Messages

Follow conventional commits:

```
feat(skills): add grill-me skill for requirements gathering
fix(reviewer): correct verdict logic for PARTIAL cases
docs(references): add EARS pattern for Unwanted Behavior
```

## License

By contributing, you agree your work will be licensed under the MIT License.