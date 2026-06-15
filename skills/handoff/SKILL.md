---
name: handoff
description: Compact session into handoff document so another agent can continue the work. Use when switching agents or context is bloated.
triggers: ["handoff", "save progress", "context save", "switch agent"]
---

# Handoff

Compress the current session into a compact, self-contained document. The next agent picks up from the handoff — not from the conversation history.

## Overview

Session-to-session continuity in AI agents is solved by artifacts, not by context inheritance. The handoff document captures: what was decided, what was done, and what's left.

## When to Use

- Before starting a fresh session (context bloat)
- Before delegating to a subagent
- At the end of a work session (save progress)
- Before switching between agents (Claude → Codex → OpenCode)

## Input

- Current conversation context
- Modified files
- SPEC.md (if exists)
- Any other artifacts produced

## Output

- `HANDOFF.md` — compact session context for next agent

## Process

### Step 1: Capture Decisions

What decisions were made and why:

```markdown
## Decisions
- [Decision]: [Why] — [Alternatives considered]
- Chose X over Y because Z
```

### Step 2: Capture Progress

What was completed:

```markdown
## Completed
- [Task]: [Result] — [Verifying evidence]
- Slice 1: Data model + CRUD — 4 tests passing, committed as abc123
```

### Step 3: Capture Remaining Work

What's left, with enough context for a fresh agent:

```markdown
## Remaining
- Slice 2: Validation layer — start with REQ-003 in SPEC.md
- The `validate()` function should be added to `src/model.ts`
- Follow /tdd-loop pattern
```

### Step 4: Capture Key Context

```markdown
## Key Context
- Project: [name]
- Stack: [technologies]
- Test command: [how to run tests]
- SPEC.md location: [path]
- CONTEXT.md location: [path]
```

### Step 5: Save

Write `HANDOFF.md` to the project root. The next agent reads it as their starting point.

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "The next agent can just read the conversation" | Conversations include noise, dead ends, and outdated assumptions. Handoffs are curated. |
| "Handoff takes too long" | 5 minutes of handoff saves 30 minutes of the next agent figuring out context. |
| "I'll just keep going" | Context degrades with length. A fresh agent + handoff > a long session. |

## Verification

- [ ] Decisions include "why" and "alternatives considered"
- [ ] Remaining work specifies exact starting point for next agent
- [ ] Key context includes test command and artifact locations
- [ ] Handoff is <3KB (if longer, you're including noise)
