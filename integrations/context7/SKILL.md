---
name: context7
description: Up-to-date library documentation for any prompt via MCP. No hallucinated APIs, no outdated code. Use when referencing any library.
triggers: ["context7", "library docs", "use context7", "up to date docs"]
---

# Context7 Integration

Pull up-to-date, version-specific documentation and code examples straight from the source — placed directly into your prompt. No hallucinated APIs. No outdated code examples.

## What It Adds

- **Up-to-date documentation** — fetched from source, not training data
- **Version-specific** — matches the exact version you're using
- **MCP integration** — native tool calls in your coding agent
- **CLI support** — `ctx7 library` and `ctx7 docs` commands

## How It Complements Spec-Harness

Use Context7 whenever the spec or implementation references a library:

- **/spec-author** — verify the API you're specifying actually exists
- **/implementer** — get current syntax and patterns for the library
- **/reviewer** — verify the implementation matches official docs, not hallucinated APIs
- **/diagnose** — check if the code follows current best practices

## Setup

```bash
# One-command setup (detects your agent automatically)
npx ctx7 setup

# Target a specific agent
npx ctx7 setup --claude
npx ctx7 setup --opencode
npx ctx7 setup --cursor
```

## Usage Patterns

### In Prompts

```
Create a Next.js middleware that checks for a valid JWT in cookies
and redirects unauthenticated users to /login. use context7
```

### With Specific Library IDs

```
Implement basic authentication with Supabase.
use library /supabase/supabase for API and docs.
```

### With Version Pinning

```
How do I set up Next.js 14 middleware? use context7
```

### MCP Tools (native in agent)

1. `resolve-library-id` — find the Context7 ID for a library
2. `query-docs` — fetch documentation for that library ID

## API Key

Free tier available at [context7.com/dashboard](https://context7.com/dashboard). Higher rate limits with an API key.

## Origin

[github.com/upstash/context7](https://github.com/upstash/context7) — 57k+ stars, MIT licensed.
