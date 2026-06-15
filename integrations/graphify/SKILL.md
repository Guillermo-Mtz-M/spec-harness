---
name: graphify
description: Build a knowledge graph from any folder — code, docs, PDFs, images. 71x fewer tokens per query. Use when understanding a codebase or research corpus.
triggers: ["graphify", "knowledge graph", "code structure", "map codebase"]
---

# Graphify Integration

Build a persistent, queryable knowledge graph from your codebase. Replaces reading raw files with structured node-edge queries.

## What It Adds

- **Knowledge graph** — concepts, relationships, communities from your files
- **71.5x fewer tokens** per query vs reading raw files on a 52-file corpus
- **Persistent across sessions** — build once, query forever
- **Honest uncertainty** — edges tagged EXTRACTED, INFERRED, or AMBIGUOUS
- **Multimodal** — code, docs, PDFs, screenshots, whiteboard photos

## Setup

```bash
pip install graphifyy && graphify install
```

## Usage in Spec-Harness

### Before Starting a New Feature

```
/graphify .
```

This builds the graph. Then query it for context instead of reading the whole codebase:

```
/graphify query "what connects authentication to the database?"
/graphify path "UserService" "DatabaseConnection"
/graphify explain "RequestPipeline"
```

### During Implementation

Use graphify's `--watch` mode to keep the graph current as multiple agents write code in parallel:

```
/graphify . --watch
```

### For Subagent Context

Instead of loading the full codebase into a subagent's context, point it at the graph:

```markdown
Read `graphify-out/GRAPH_REPORT.md` and `graphify-out/wiki/index.md` for project structure.
Query the graph at `graphify-out/graph.json` when you need specific code details.
```

## Key Files

```
graphify-out/
├── graph.html           Interactive visualization
├── graph.json           Persistent graph (query without re-reading)
├── GRAPH_REPORT.md      God nodes, surprising connections, suggested questions
├── obsidian/            Open as Obsidian vault
├── wiki/                Wikipedia-style articles (--wiki flag)
└── cache/               SHA256 cache (re-run only changed files)
```

## Origin

[github.com/safishamsi/graphify](https://github.com/safishamsi/graphify) — fully multimodal knowledge graph builder for AI agents.
