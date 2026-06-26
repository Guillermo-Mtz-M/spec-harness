# anthropics/claude-code → small-business plugin
> https://claude.com/plugins/small-business · Claude plugin for running small business operations
> Made by Anthropic · Verified plugin

## Key Ideas

- **15 business commands** — `/plan-payroll`, `/close-month`, `/run-campaign`, `/monday-brief`, +11 more
- **15 building-block skills** — cash-flow forecasting, margin analysis, lead triage, invoice chasing, contract review, customer sentiment, tax prep, hiring packet builder
- **Router system** — describes need in plain English; router picks the right workflow automatically
- **Human approval gates** — every step that touches money or customers requires explicit approval
- **Connector ecosystem** — QuickBooks, PayPal, HubSpot (core); Canva, DocuSign, Gmail/Outlook, Slack, Stripe, Square (optional); graceful degradation when connector unavailable
- **Onboarding** — `/smb-onboard` to connect services and configure
- **Use cases** — payroll planning, cash forecasts, month-end close, customer follow-ups, growth campaigns, contract review, CRM hygiene

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| Router → picks workflow from plain description | `skills/using-spec-harness/SKILL.md` — decision tree |
| Human approval for money/customer touches | 2 human gates: spec + verification |
| Graceful degradation without connectors | Integration fallback: `integrations/*` skills handle missing deps |
| Pre-built building-block skills | Pattern: composable skills for domain-specific workflows |

> **Credit**: Plugin by [Anthropic](https://claude.com/plugins/small-business). Integrated as optional reference for Spec-Harness business workflow patterns.
