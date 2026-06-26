---
name: open-design
description: Local-first design system with 142+ brand-grade DESIGN.md contracts, multi-format output (HTML/PDF/PPTX/MP4), and 259+ skills. Use when generating production-ready designs, prototypes, slide decks, or videos from DESIGN.md specs. Original project by @nexu-io (github.com/nexu-io/open-design).
---

# open-design Integration

> **Credit**: Original project by [@nexu-io](https://github.com/nexu-io/open-design) · Apache-2.0 · https://open-design.ai

Wraps open-design as a Spec-Harness integration for brand-grade design system generation and multi-format output.

## When to Use

- Need brand-grade design systems (Linear, Stripe, Vercel, Apple, etc.)
- Generating multi-format output: prototypes, slide decks, images, videos
- DESIGN.md contract-based design work
- Codebase refactoring to match a design spec

## Setup

```bash
open-design install --mcp  # registers MCP server
```

Or use the open-design CLI directly.

## DESIGN.md Contract

open-design uses a 9-section DESIGN.md schema — align with SPEC.md visual requirements:

| Section | Aligns With |
|---------|-------------|
| Palette | SPEC.md visual constraints |
| Typography | SPEC.md UI requirements |
| Spacing | Implementation consistency |
| Motion | User experience spec |
| Voice | Documentation tone |
| Anti-patterns | Reviewer checklist |

## Capabilities

- **142+ Design Systems**: brand-grade DESIGN.md for Linear, Stripe, Vercel, Apple, Notion, Anthropic, +136 more
- **Multi-format Output**: web prototypes, dashboards, PPTX, PDF, MP4 via HyperFrames
- **HyperFrames Video**: HTML+CSS+GSAP → deterministic MP4
- **Codebase Refactoring**: apply DESIGN.md to existing codebase
- **22+ Agent CLIs**: works with Claude Code, Codex, Cursor, +19 more
- **BYOK**: any OpenAI-compatible endpoint (Anthropic, OpenAI, Azure, Ollama, etc.)

## Workflow Integration

```
/spec-author → SPEC.md
  → DESIGN.md generated via open-design contracts
    → /implement reads DESIGN.md for brand tokens
      → open-design generates prototypes/previews
        → /reviewer validates against DESIGN.md
          → /ship exports final multi-format output
```
