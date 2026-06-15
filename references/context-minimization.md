# Context Minimization Strategies

Token budget management for AI agents. Context is a finite resource — spend it on signal, not noise.

---

## The Problem

As conversation history grows:
1. Agent loses track of earlier decisions
2. More tokens spent on noise than signal
3. Quality degrades proportionally to context length
4. The Vercel/D0 lesson: hyper-specialized tools with full context produced worse results than simple tools with focused context

---

## Strategy 1: The Context Stack

Divide context into load-on-demand layers:

```
Layer 0 (always loaded):     AGENTS.md + CONTEXT.md (<2KB)
Layer 1 (session start):    SPEC.md + current task (<5KB)
Layer 2 (skill triggers):   Reference checklists + templates (on demand)
Layer 3 (deep dive):        Full codebase via tools (search/read, not in context)
```

**Rule:** Never load Layer 2+ unless the current task requires it.

---

## Strategy 2: External Memory

Instead of keeping information in context, persist it to files:

| Store In File | Instead Of | Why |
|---------------|-----------|-----|
| CONTEXT.md | Long explanations of terminology | Reference without re-explaining |
| SPEC.md | Verbal requirement descriptions | Structured, verifiable |
| HANDOFF.md | Conversation history | Curated, no noise |
| graphify graph.json | Full codebase in context | 71x fewer tokens per query |

---

## Strategy 3: Handoff Over Inheritance

When transferring work between agents:
- **DON'T:** share conversation history (includes noise, dead ends, outdated assumptions)
- **DO:** write a HANDOFF.md with decisions, progress, remaining work

Fresh agent + handoff doc > long session with full history.

---

## Strategy 4: Subagent Isolation

Each subagent receives:
- Its input artifact (file path)
- Its skill prompt (instructions)
- Nothing else

The orchestrator coordinates via artifacts, not context sharing.

---

## Strategy 5: Compact When Over 60%

When context usage exceeds ~60% of budget:
1. Write HANDOFF.md
2. Start fresh session
3. Load only Layer 0 + Layer 1
4. Continue from the handoff

This is not a failure — it's a feature. Compact sessions produce better results.

---

## Metrics

| Approach | Tokens Per Query | Quality |
|----------|------------------|---------|
| Full codebase in context | ~50,000 | Declining (noise) |
| graphify knowledge graph | ~700 | High (signal) |
| Handoff + fresh context | ~3,000 | High (focused) |
| Context stack (L0+L1 only) | ~5,000 | High (minimal) |

---

## Red Flags

- Session exceeds 50 messages without compacting
- Agent starts repeating itself or going in circles
- Output quality noticeably degrades
- Agent references old/invalid context from earlier in the session

**Fix:** Compact immediately. Write HANDOFF.md, start fresh.
