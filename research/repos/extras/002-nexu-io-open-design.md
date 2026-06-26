# nexu-io/open-design
> https://github.com/nexu-io/open-design · ⭐ 71.6k · Local-first, open-source Claude Design alternative
> License: Apache-2.0 · Web: https://open-design.ai

## Key Ideas

- **Local-first desktop app** — macOS (Apple Silicon + Intel), Windows (x64), Linux AppImage. No telemetry, no cloud round-trip
- **259+ skills & 142+ design systems** — pre-built skills and brand-grade DESIGN.md systems (Linear, Stripe, Vercel, Apple, Notion, Anthropic, etc.)
- **Multi-format output** — web/desktop/mobile prototypes, live dashboards, slide decks (PPTX/PDF), high-res images, videos via HyperFrames
- **HyperFrames** — HeyGen's open-source agent-native video framework: HTML+CSS+GSAP → deterministic MP4 via headless Chrome + FFmpeg
- **22+ coding agent CLIs** — Claude Code, Codex, Cursor, Copilot, Gemini CLI, OpenClaw, Antigravity, Hermes, Kimi, +more via one-line MCP install
- **261 plugins** — extensible plugin system for custom workflows
- **BYOK (Bring Your Own Key)** — Anthropic, OpenAI, Azure, Google Gemini, Ollama, LM Studio, vLLM
- **DESIGN.md brand contract** — 9-section schema (palette, type, spacing, motion, voice, anti-patterns); every render reads the active design system
- **Codebase refactoring** — git repo + DESIGN.md → refactor real components to brand spec
- **Docker & Sealos deploy** — self-hostable via Docker Compose or one-click Sealos deploy

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| DESIGN.md 9-section brand contract | `integrations/open-design/SKILL.md` — design contracts in DESIGN.md |
| 142+ design systems | Design token libraries for SPEC.md visual requirements |
| HyperFrames video generation | Future: video documentation in `skills/document-release/SKILL.md` |
| Codebase refactoring to brand spec | `skills/implement/SKILL.md` + design tokens |
| Multi-format export (HTML/PDF/PPTX/MP4) | `skills/ship/SKILL.md` — multi-format deliverable checklist |

> **Credit**: Original project by [@nexu-io](https://github.com/nexu-io/open-design). Integrated as optional enhancement for Spec-Harness design workflow.
