# safishamsi/graphify
> https://github.com/safishamsi/graphify · ⭐ 72.5k · AI coding assistant skill — turn any folder into a queryable knowledge graph

## Key Ideas

- **Knowledge graph builder** — 71.5x fewer tokens per query vs raw files; code + database schema + infrastructure in one graph
- **Multimodal extraction** — code (36 tree-sitter grammars), Salesforce Apex, Terraform/HCL, MCP configs, docs, Office, Google Workspace, PDFs, images, video/audio, YouTube/URLs
- **Three output files**: `graph.html` (interactive browser), `GRAPH_REPORT.md` (highlights, key concepts, suggested questions), `graph.json` (full graph for querying)
- **MCP server** — expose graph as MCP stdio or HTTP server for repeated tool-call access; team-shared HTTP server option
- **God nodes & community detection** — most-connected concepts, surprising cross-module links, Leiden community detection
- **"Why" extraction** — inline comments (# NOTE:, # WHY:, # HACK:), docstrings, design rationale as separate nodes linked to code
- **Confidence tags** — every inferred relationship marked EXTRACTED, INFERRED, or AMBIGUOUS
- **Query/path/explain tools** — `graphify query "..."`, `graphify path "A" "B"`, `graphify explain "X"`
- **PR dashboard** — CI state, review status, worktree mapping, AI triage ranking, merge-order risk via graph communities
- **Auto-rebuild on commit** — git hook merges `graph.json` automatically (union-merge driver prevents conflicts)
- **Team setup** — commit `graphify-out/` to git; everyone pulls and starts with a map
- **Privacy-first** — code processed locally via tree-sitter; only docs/PDFs/images sent to LLM; Ollama backend for fully local
- **23 platform integrations** — Claude Code, Codex, OpenCode, Kilo Code, Cursor, Gemini CLI, Copilot, VS Code, Aider, Amp, OpenClaw, Factory Droid, Trae, Hermes, Kimi, Kiro, Pi, Devin, Google Antigravity

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| Knowledge graph for context minimization | `integrations/graphify/` skill + `references/context-minimization.md` |
| 71x token reduction | Core harness principle: "Context is a Budget" |
| Multimodal (code, docs, PDFs, video) | Future: expand context sources beyond code |
| God nodes / surprising connections | `/zoom-out` finds deepening opportunities across modules |
| "Why" extraction (comments, rationale) | SPEC.md captures rationale; HANDOFF.md captures decisions with "why" |
| Confidence tags (extracted/inferred/ambiguous) | Verification: PASS/FAIL/PARTIAL with evidence |
| Query/path/explain tools | `/graphify` integration; future: query skill |
| PR dashboard with graph impact | `/review` + `/ship` pipeline; future: graph-aware review |
| Auto-rebuild on commit | Not yet; `/ship` could trigger graph rebuild |
| Team setup (commit graphify-out) | `HANDOFF.md` + external memory for team context sharing |
| Privacy-first (local code, Ollama option) | `rules/common/` privacy rules; local-first design |
| 23 platform integrations | `scripts/install.js` supports 4 targets + Gemini CLI |