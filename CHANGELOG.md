# Changelog

## [1.1.0] — 2026-06-26 — Universal Installer

### Added
- Agent Skills Open Standard frontmatter (name, description, version, license, allowed-tools) on all 15 skills
- `npx skills add guillermo-mtz-m/spec-harness` — install on 12+ platforms via skills.sh
- 12+ platform support table in README
- Update guide in README

### Changed
- skills/*/SKILL.md: standardized YAML frontmatter for cross-agent discovery
- .claude/commands/*.md: simplified to thin skill wrappers
- scripts/validate.js: validates YAML frontmatter + required sections
- Removed duplicate .claude/commands/mutation-tester.md

## [0.9.0] — 2026-06-25

### Added
- Initial spec-harness release with 15 skills, 5 agents, 9 integrations
- EARS/Gherkin spec-driven development workflow
- Council review with anonymous multi-perspective synthesis
- Mutation testing with ≥70% score requirement
- Multi-target installer (Claude Code, OpenCode, Cursor, Gemini CLI)
- Research directory with 13 repo analyses + 9 video analyses
- Chinese and Spanish translations
