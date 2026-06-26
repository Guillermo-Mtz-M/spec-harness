# Gemini CLI Setup

## Install (Recommended)

```bash
# Via skills.sh (auto-detects Gemini CLI)
npx skills add guillermo-mtz-m/spec-harness

# Or via gemini extensions
gemini extensions install https://github.com/Guillermo-Mtz-M/spec-harness

# Or from local clone
gemini extensions install ./spec-harness
```

## Skills Available

```bash
gemini skills list | grep spec-harness
```

## Usage

After install, Gemini CLI auto-loads spec-harness skills based on conversation context.

## Manual Skill Invocation

```
gemini skill run grill-me
gemini skill run spec-author
gemini skill run spec-review
gemini skill run implement
gemini skill run tdd-loop
gemini skill run reviewer
gemini skill run council-review
gemini skill run mutation-test
gemini skill run context-engineer
gemini skill run subagent-driven-dev
gemini skill run handoff
gemini skill run diagnose
gemini skill run zoom-out
gemini skill run ship
gemini skill run using-spec-harness
```

## Integrations

Core: graphify, superpowers, bmad-method, karpathy-guidelines, context7
Extras (`--with-extras`): ui-ux-pro-max, open-design, ian-xiaohei-illustrations, small-business

## Updating

```bash
# Via skills.sh (recommended)
npx skills update

# Via git
cd spec-harness && git pull && gemini extensions install ./spec-harness
```
