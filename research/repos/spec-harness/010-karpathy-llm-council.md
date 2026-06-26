# karpathy/llm-council
> https://github.com/karpathy/llm-council · ⭐ 21.6k · LLM Council — multiple LLMs deliberate, review, and synthesize answers

## Key Ideas

- **3-stage deliberation process**:
  1. **Stage 1: First opinions** — user query sent to all LLMs individually; responses collected and shown in tab view for inspection
  2. **Stage 2: Anonymous peer review** — each LLM given other LLMs' responses with identities anonymized; asked to rank by accuracy and insight
  3. **Stage 3: Chairman synthesis** — designated Chairman LLM compiles all responses into single final answer
- **Anonymization principle** — LLM identities concealed during peer review to prevent favoritism/anchoring bias
- **Chairman model** — designated synthesizer (default: Gemini 3 Pro Preview) produces unified verdict
- **Graceful degradation** — if some models fail, process continues with available responses
- **Vibe Code Alert** — project was "99% vibe coded as a fun Saturday hack"; code is ephemeral; provided as-is for inspiration
- **OpenRouter backend** — uses OpenRouter API to access multiple models (GPT-5.1, Gemini 3 Pro, Claude Sonnet 4.5, Grok 4, etc.)
- **Local web app** — FastAPI backend + React/Vite frontend; runs on localhost:5173
- **JSON conversation storage** — conversations persisted in `data/conversations/`
- **Model configuration** — `COUNCIL_MODELS` array + `CHAIRMAN_MODEL` in `backend/config.py`

## Mapping to Spec-Harness

| Idea | Spec-Harness Artifact |
|------|-----------------------|
| 3-stage deliberation (opinions → review → synthesis) | `/council-review` skill: 3 anonymous specialist reviews (A:spec, performance, security) → `/council-chairman` synthesis |
| Anonymous peer review (identities concealed) | Review A/B/C anonymization in council-review; Anti-Rationalization in reviewer |
| Chairman synthesis (unified verdict) | `agents/council-chairman.md` — per-requirement PASS/FAIL/PARTIAL across N reviews, highlights disagreements |
| Graceful degradation (partial responses) | Council-review notes reduced confidence if <3 reviews available |
| Multiple LLM personas (same model, different prompts) | Council pattern: same LLM with different personas/prompts (not multi-API) |
| Vibe code alert (ephemeral, hack) | Spec-Harness anti-pattern: "vibe coding" rejected; harness enforces discipline |
| OpenRouter multi-model | Not used; Spec-Harness is tool-agnostic (works with any agent) |
| Local-first, JSON storage | Artifact-based (SPEC.md, HANDOFF.md, REVIEW.md) — file-based, portable |
| Configurable council models | Council skill uses fixed 3 perspectives; extensible via skill config |