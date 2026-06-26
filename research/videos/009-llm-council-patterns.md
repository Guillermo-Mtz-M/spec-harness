# 009 — LLM Council Patterns
> **Fuente**: [karpathy/llm-council](https://github.com/karpathy/llm-council) (⭐ 20.8k) + análisis de council patterns en addyosmani/agent-skills, bmad-code-org/BMAD-METHOD, obra/superpowers

## Resumen

Los patrones de "council" (consejo) usan múltiples instancias LLM con prompts/personas diferentes para obtener revisiones más robustas que una sola revisión. El modelo central es: opiniones independientes → revisión anónima cruzada → síntesis por un chairman designado.

## Conceptos Clave

### 1. Modelo de 3 Etapas (karpathy/llm-council)

1. **First Opinions** — la consulta del usuario se envía a cada LLM individualmente; respuestas recolectadas y mostradas en vista tabular para inspección
2. **Anonymous Peer Review** — cada LLM recibe las respuestas de los otros LLMs con identidades anonimizadas; debe rankear por precisión e insight
3. **Chairman Synthesis** — el LLM designado como Chairman compila todas las respuestas en una respuesta final unificada

### 2. Principio de Anonimización

Las identidades de los LLMs se ocultan durante la revisión por pares para prevenir sesgo de favoritismo o anclaje. Sin anonimización, los revisores tienden a:
- Dar más peso a respuestas de modelos "prestigiosos"
- Anclar sus rankings al primer ejemplo visto
- Evitar criticar modelos considerados superiores

### 3. Degradación Elegante

Si algunos modelos fallan (rate limits, timeouts, errores), el proceso continua con las respuestas disponibles. El chairman nota la confianza reducida y ajusta el veredicto.

### 4. Patrón Council en Otros Repos

| Repo | Council Pattern |
|------|----------------|
| addyosmani/agent-skills | 4 personas (Architect, Security, PM, UX) con perspectiva fija |
| bmad-code-org/BMAD-METHOD | Party Mode — múltiples agentes en una sesión |
| obra/superpowers | Two-stage review (spec compliance → code quality) |
| garrytan/gstack | Auto-dispatch: CEO ↔ Eng ↔ Design review routing |

### 5. Council Pattern en Spec-Harness

Spec-Harness adapta el modelo de council con una diferencia clave: **usa el mismo LLM con prompts/personas diferentes** (no múltiples APIs/LMMs). Razones:
- **Practicidad** — funciona con cualquier agente, no requiere configuración multi-API
- **Compatibilidad** — "works with any agent" es principio fundamental
- **Costo** — una sola API/key vs múltiples
- **Enfoque** — la diversidad viene del prompt, no del modelo

### 6. Anti-Rationalization en Council

Sin anonimización, un revisor puede racionalizar problemas que encontró otro revisor (anti-pattern documentado en addyosmani/agent-skills). Con anonimización, cada revisor evalúa independiente y el chairman sintetiza sin saber quién dijo qué.

## Ideas Clave

- **Council** = múltiples perspectivas independientes + síntesis unificada
- **Anonimización** previene sesgo de anclaje y favoritismo
- **Chairman** no es un votante más — es un sintetizador con poder de decisión
- **Degradación elegante** — falta un revisor no detiene el proceso
- **Mismo LLM, diferentes prompts** — diversidad via persona, no via modelo
- **Vibe Code Alert** — el repo de Karpathy fue "99% vibe coded como hack de sábado"; el código es efímero, las ideas son duraderas

## Mapeo a Spec-Harness

| Idea del Video | Artifact Spec-Harness |
|----------------|-----------------------|
| 3-stage deliberation (opinions → review → synthesis) | `skills/council-review/SKILL.md` — 3 reviews (A: spec compliance, B: performance/edge cases, C: security/maintainability) → chairman synthesis |
| Anonymous peer review | `/council-review` anonimiza Review A/B/C; reviewer SKILL.md agrega "Anonymization Principle" |
| Chairman synthesis → unified verdict | `agents/council-chairman.md` — por-requisito PASS/FAIL/PARTIAL, highlights disagreements |
| Graceful degradation | Council-review nota confianza reducida si <3 reviews disponibles |
| Mismo LLM, diferentes prompts | Council pattern usa prompts de persona diferentes, no multi-API |
| Anti-rationalization + council | `/council-review` + `/reviewer` combinados: diversidad independiente + sintesis informada |
| "Vibe code alert" como anti-pattern | Spec-Harness opuesto: SDD + harness discipline, no vibe coding |
