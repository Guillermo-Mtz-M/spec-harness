---
name: grill-me
description: Relentless interview that extracts what you actually want before any code is written. Use when starting any non-trivial change.
version: 1.0.0
license: MIT
allowed-tools: []
triggers: ["grill me", "interview", "what do I want", "help me think through this"]
---
# Grill-Me

Interrogate the user until every branch of the decision tree is resolved. No code until the grilling is complete.

## Overview

Most software failures are misalignment failures: the builder didn't understand what was wanted. This skill fixes that by forcing explicit reasoning before implementation.

## When to Use

- Starting any non-trivial change (new feature, refactor, bug with unclear fix)
- User says "let's build X" without specifying boundaries
- User invites you to "brainstorm" or "think through" something
- Before `/spec-author`

## Process

### Step 1: Understand the Surface

Ask ONE question at a time. Wait for the answer. Then ask the next.

Start with the broadest question, then drill down:

1. "What problem does this solve for the end user?"
2. "Who are the users? What's their skill level?"
3. "What does success look like? (Be specific â€” name the outcome)"
4. "What happens when this fails? What's the degraded experience?"
5. "What are the hard boundaries? (Things we will NOT do)"

### Step 2: Challenge the Premise

Now push back. For each answer, ask:

- "Why this approach and not [simpler alternative]?"
- "What if we just didn't build this? What breaks?"
- "Is this a real problem or a hypothetical one?"
- "Who asked for this? When's the last time it came up?"

### Step 3: Explore the Design Space

Present at least 2 significantly different approaches:

- For each: what it costs, what it enables, what it prevents
- Name the tradeoffs explicitly
- Recommend one and explain why

### Step 4: Define the Slice

Pick the narrowest wedge that delivers value:

- "What's the smallest version of this that's still useful?"
- "Can we ship this in one session? If not, what's the first session deliver?"

### Step 5: Save the Output

Write a `SPEC.md` draft (incomplete, just the raw material from this session) or hand off to `/spec-author`.

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "I already know what I want, just start coding" | If you can't explain it to a relentless interviewer, you don't know it well enough to code it. |
| "This is too simple to grill" | Simple changes need simple grilling. 3 questions, not 30. But you still need the 3. |
| "The spec will emerge from the code" | Code that emerges from confusion produces confusion. Spec first, code second. |
| "I'll refine it later" | "Later" is where bugs live. 10 minutes of grilling saves 10 hours of debugging. |

## Verification

Before finishing, confirm:

- [ ] Every feature has a clear "why" (not just "what")
- [ ] Boundaries are explicit (what we will NOT do)
- [ ] At least 2 approaches were considered
- [ ] The narrowest useful slice is identified
- [ ] Success criteria are named (not "make it work" but "when X, then Y")
