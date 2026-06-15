# Gemini CLI Setup

## Install

```bash
gemini extensions install https://github.com/yourusername/spec-harness
```

Or from local clone:

```bash
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
gemini skill run implement
gemini skill run reviewer
gemini skill run mutation-test
gemini skill run context-engineer
gemini skill run handoff
gemini skill run diagnose
gemini skill run zoom-out
gemini skill run ship
```