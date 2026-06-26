# Extras — Tools & References

Additional tools, design systems, and references that complement Spec-Harness but are not core workflow inspirations. These can be optionally installed via `--with-extras`.

| # | Repository | Stars | Purpose |
|---|------------|-------|---------|
| 001 | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 96.8k | 67 UI styles, 161 design rules, 17 tech stacks — professional UI/UX design |
| 002 | [nexu-io/open-design](https://github.com/nexu-io/open-design) | 71.6k | Local-first Claude Design alternative, 259+ skills, 142+ design systems |
| 003 | [helloianneo/ian-xiaohei-illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) | 6.3k | Chinese article illustration generator — Xiaohei hand-drawn style |
| 004 | [anthropics/claude-code → small-business](https://claude.com/plugins/small-business) | — | Claude plugin: payroll, cash flow, CRM, campaigns — business ops |

## Integrated into Spec-Harness

Each extras repo has a SKILL.md wrapper in `WORKFLOW/integrations/`:

| Extra | Integration Path | Credit |
|-------|------------------|--------|
| ui-ux-pro-max | `integrations/ui-ux-pro-max/` | [@nextlevelbuilder](https://github.com/nextlevelbuilder) |
| open-design | `integrations/open-design/` | [@nexu-io](https://github.com/nexu-io) |
| ian-xiaohei-illustrations | `integrations/ian-xiaohei-illustrations/` | [@helloianneo](https://github.com/helloianneo) |
| small-business | `integrations/small-business/` | [Anthropic](https://claude.com) |

See [`../spec-harness/`](../spec-harness/) for workflow-core references that directly inspired Spec-Harness architecture.
