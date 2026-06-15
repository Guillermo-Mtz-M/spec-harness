# Harness Engineering Principles

The 3 pillars of building automated guardrails around AI agents. From the Harness Engineering research.

---

## Pillar 1: Automated Guardrails

Rules the agent follows without human intervention.

### What it means

The "harness" is the set of automated rules that prevent the agent from going off track. Think of it as guardrails on a highway — the driver (agent) steers, but the guardrails prevent catastrophic deviation.

### Key practices

1. **Spec as contract** — No code without a spec requirement. If it's not in SPEC.md, it doesn't exist.
2. **TDD enforcement** — Tests written before implementation. The harness doesn't allow forward progress without passing tests.
3. **Human approval gates** — Only 2: spec approval and result approval. The harness handles everything in between.
4. **Commit gates** — No commit without all tests passing. No merge without review pass.

---

## Pillar 2: Context Management

The right information to the right agent at the right time.

### What it means

Context is a budget. The harness ensures each agent gets exactly the context it needs — no more, no less. This is the key lesson from the Vercel/D0 case: more context is not better. Focused context is better.

### Key practices

1. **Context stack** — Load information in layers (L0 always, L1 per-task, L2 on-demand, L3 via tools)
2. **External memory** — Persist knowledge to files, not conversation history
3. **Handoff over inheritance** — Curated artifact > raw conversation history
4. **Subagent isolation** — Each subagent gets only its input + instructions
5. **Compact at 60%** — Don't wait until context is full. Compact early.

---

## Pillar 3: Verification Loops

Prove it works, don't claim it works.

### What it means

Verification is not optional. The harness enforces proof at every stage. "I think it works" is rejected. "Test X passes" is accepted.

### Key practices

1. **TDD loop** — Red → Green → Refactor. Every slice goes through the full cycle.
2. **Fresh-context review** — Judge reviews against spec, not conversation history.
3. **Mutation testing** — Prove tests actually verify behavior by injecting faults.
4. **Two-stage review** — Spec compliance first, code quality second.
5. **Stop-the-line** — If a critical issue is found, stop forward progress. Fix first.

---

## The Iron Law

**No code without a spec. No spec without grilling. No shipping without verification.**

This is not bureaucracy — it's engineering. The harness exists to multiply productivity by eliminating the most common failure modes in AI-assisted development.

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | Harness Fix |
|-------------|-------------|-------------|
| Vibe coding (no spec) | Agent builds what it guesses you want | /grill-me → /spec-author first |
| Full context inheritance | Noise accumulates, quality degrades | Handoff artifacts, not history |
| Mocks for internal logic | Tests prove mocks work, not code | Mock external boundaries only |
| 100% coverage obsession | Coverage without quality is theater | Mutation testing for effectiveness |
| Human in the loop | Bottleneck at every approval point | Human ON the loop (2 gates only) |
| Over-engineering | Agent adds features nobody asked for | Spec as contract: if not in spec, don't build |
