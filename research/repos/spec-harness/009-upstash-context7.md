# upstash/context7
> https://github.com/upstash/context7 · ⭐ 58.1k · Context7 Platform — Up-to-date code documentation for LLMs and AI code editors

## Key Ideas

- **MCP server for library docs** — pulls up-to-date, version-specific documentation and code examples straight from source into LLM context
- **Two modes**: CLI + Skills (`ctx7` CLI commands, no MCP required) and MCP (registers Context7 MCP server for native tool calls)
- **Resolve-library-id** — resolves general library name to Context7-compatible ID (e.g., `/vercel/next.js`, `/mongodb/docs`)
- **Query-docs** — retrieves documentation using exact library ID + user query
- **Version-specific docs** — mention version in prompt ("Next.js 14 middleware") to get correct docs
- **Library ID in prompt** — use `use library /supabase/supabase` syntax to skip matching step
- **Rule-based auto-trigger** — add rule to agent: "Always use Context7 when I need library/API documentation"
- **30+ client integrations** — Cursor, Claude Code, OpenCode, and more via manual MCP setup
- **Community-contributed libraries** — projects listed are maintained by respective owners; report button for suspicious content
- **Packages**: `@upstash/context7-mcp` (MCP server), `ctx7` (CLI), `@upstash/context7-sdk` (TypeScript SDK), `@upstash/context7-tools-ai-sdk` (Vercel AI SDK tools), `@upstash/context7-pi` (pi.dev extension)
- **Disclaimer** — cannot guarantee accuracy/completeness/security of all library docs; use at own discretion

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| MCP server for up-to-date docs | `integrations/context7/SKILL.md` wraps Context7 for agent use |
| Version-specific documentation | Spec-Harness version pins in `scripts/install.js` + `CHANGELOG.md` |
| Library ID resolution | Not directly applicable; skills reference specific versions |
| Rule-based auto-trigger | `/using-spec-harness` decision tree triggers right skill |
| Community-contributed with quality gate | Integrations are curated; `validate.js` ensures skill structure |
| Multiple packages (MCP, CLI, SDK) | Spec-Harness is skills + agents + templates + rules (no runtime deps) |
| 30+ client support | `scripts/install.js --target <claude|opencode|cursor>` + Gemini CLI |
| "No hallucinated APIs" | Spec-Harness principle: verification over claims; show the test |