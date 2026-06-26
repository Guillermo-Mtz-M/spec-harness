---
name: small-business
description: Run small business operations — payroll planning, cash forecasts, month-end close, customer follow-ups, growth campaigns, contract review, CRM hygiene. Use when the spec involves business ops, financial workflows, or customer management. Plugin by Anthropic (claude.com/plugins/small-business).
---

# Small Business Integration

> **Credit**: Plugin by [Anthropic](https://claude.com/plugins/small-business)

Wraps the Claude Small Business plugin capabilities for use within Spec-Harness business workflow patterns.

## When to Use

- Spec involves business operations or financial workflows
- Need payroll planning, cash forecasting, or month-end close
- Customer follow-ups, CRM hygiene, or growth campaigns
- Contract review or hiring packet generation

## Capabilities

- **15 Business Commands**: `/plan-payroll`, `/close-month`, `/run-campaign`, `/monday-brief`, +11 more
- **15 Building-Block Skills**: cash-flow forecasting, margin analysis, lead triage, invoice chasing, contract review, customer sentiment, tax prep, hiring packets
- **Router**: describe need in plain English → picks the right workflow
- **Human Approval Gates**: every money/customer touch requires explicit approval
- **Connector Ecosystem**: QuickBooks, PayPal, HubSpot (core); Canva, DocuSign, Gmail/Outlook, Slack, Stripe, Square (optional)

## Workflow Integration

```
/grill-me → what business task?
  → small-business router picks workflow
    → spec-author writes EARS/Gherkin spec
      → implement executes business logic
        → [HUMAN APPROVES money/customer steps]
          → reviewer verifies
            → /ship
```

## Connector Setup

Run `/smb-onboard` in Claude Cowork to connect services. Metrics degrade gracefully when connectors aren't available.
