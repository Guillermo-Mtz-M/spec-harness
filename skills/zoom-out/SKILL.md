---
name: zoom-out
description: See the code in the context of the whole system. Find design opportunities and deepening possibilities.
triggers: ["zoom out", "big picture", "system view", "architecture", "deeper modules"]
---

# Zoom Out

When you're lost in the details, zoom out. Explain the code in the context of the whole system. Find where modules can be deepened. Spot design drift before it becomes a ball of mud.

## Overview

Agents optimize locally. They focus on the file they're editing and miss system-level patterns. This skill forces the agent to step back and see the code as a system.

Based on John Ousterhout's "A Philosophy of Software Design": the best modules are deep — they expose simple interfaces over complex implementations.

## When to Use

- Lost in implementation details
- After completing 3+ vertical slices (design check)
- Every few days as routine maintenance
- Before starting a new feature (understand the landscape)

## Process

### Step 1: Map the Current Change

What files were touched? What's the blast radius of the change?

### Step 2: Evaluate Module Depth

For each module touched:
- **Deep module** — simple interface, complex internals (good)
- **Shallow module** — complex interface, trivial internals (bad)

If modules are getting shallower, it's time to refactor.

### Step 3: Check Design Invariants

Read `CONTEXT.md` (if it exists) for the shared language. Then check:
- [ ] Does the code use the established terminology?
- [ ] Are naming conventions consistent?
- [ ] Are there new concepts that need to be added to the shared language?

### Step 4: Report

```markdown
## Zoom-Out Report

### Current Change Context
- Files: [list]
- Blast radius: [low/medium/high]
- Design impact: [none/minor/significant]

### Module Depth
- [module]: [deep/shallow] — [recommended action if shallow]

### Opportunities
- [deepening opportunity]: [what to consolidate, what to extract]

### Drift Detection
- [any naming/convention mismatches with CONTEXT.md]
```

## Anti-Rationalization Table

| Excuse | Rebuttal |
|--------|----------|
| "I don't have time to zoom out" | You don't have time NOT to. Design debt compounds. |
| "The architecture is fine" | Famous last words. Run the check. You might be surprised. |
| "This is just a small change" | Small changes in shallow modules create big messes. |

## Verification

- [ ] Every touched module was evaluated for depth
- [ ] CONTEXT.md terminology is consistent
- [ ] At least one deepening opportunity was identified (or explicitly stated "none found")
