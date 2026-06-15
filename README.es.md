# Spec-Harness

**Desarrollo Guiado por Specs + Ingeniería de Arneses para agentes de código IA.**

Un sistema de skills composables que combina **Spec-Driven Development** (la spec como fuente de verdad) con **Harness Engineering** (guardrails automatizados, memoria externa y verificación) — diseñado sintetizando patrones reales de flujos de trabajo con IA en producción.

Funciona con **Claude Code**, **Codex**, **OpenCode**, **Cursor**, **Gemini CLI**, y cualquier agente que lea skills en markdown.

---

## Por qué existe

La mayoría de los skills para agentes de IA se enfocan en un solo problema: quality gates, gestión de contexto, o orquestación de flujos. **Spec-Harness** combina tres filosofías probadas en un solo sistema:

1. **Spec-Driven Development** — Define el *qué* antes de construir. La spec es el contrato. Cada línea de código traceability a un requisito. (Del [modelo SDD de 3 niveles](https://github.com/Guillermo-Mtz-M/spec-harness))

2. **Harness Engineering** — Construye guardrails automatizados alrededor de tus agentes: minimización de contexto, handoff entre subagentes vía artefactos, memoria externa, loops de verificación que no te dejan publicar código roto. (De [principios de Harness Engineering](https://github.com/Guillermo-Mtz-M/spec-harness))

3. **Human on the Loop** — No "in the loop" (aprobando cada paso), sino "on the loop" (aprobando la spec y el resultado final, confiando en el arnés para todo lo demás). Este es el multiplicador de productividad. (Del [modelo de Loop Engineering](https://github.com/Guillermo-Mtz-M/spec-harness))

El resultado: agentes que construyen lo que realmente quieres, lo verifican, y solo te interrumpen cuando importa.

---

## El Flujo de Trabajo

```
  ESPECIFICAR      REVISAR          CONSTRUIR        VERIFICAR        ENTREGAR
 ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
 │interviene│   │  spec    │   │   TDD     │   │  judge   │   │  humano  │
 │  usuario │──▶│  review  │──▶│  loop     │──▶│ mutación │──▶│ aprueba  │
 └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
    /grill-me        /spec-review   /implement      /mutation-test   /ship
         └──── /spec-author ───────┘  └──── /tdd-loop ─┘  └── /reviewer ─┘
```

### Gates de aprobación humana (solo 2):

1. **Después de la spec** — "¿Es esto lo que quiero?"
2. **Después de verificación** — "¿Funciona?"

Todo lo demás es automatizado por el arnés.

---

## Inicio Rápido

### Instalar

```bash
# Clonar el repo
git clone https://github.com/Guillermo-Mtz-M/spec-harness.git
cd spec-harness

# Ejecutar el instalador
node scripts/install.js --target claude    # Claude Code
node scripts/install.js --target opencode  # OpenCode
node scripts/install.js --target cursor    # Cursor
```

O copia manualmente los directorios `skills/` y `agents/` a la configuración de tu agente.

### Primer Uso

1. Escribe `/grill-me` — el agente te entrevista sobre lo que quieres
2. Escribe `/spec-author` — escribe una spec en EARS/Gherkin
3. Revisa la spec, aprueba o itera
4. Escribe `/implement` — construye cada requisito vía TDD loop
5. Escribe `/reviewer` — un judge revisa contra la spec
6. Escribe `/mutation-test` — tests adversarios intentan romper la implementación
7. Revisa, aprueba o itera
8. Escribe `/ship` — commit, PR, changelog, deploy

---

## Todos los Skills

### Flujo Principal SDD

| Skill | Qué hace | Úsalo cuando |
|-------|---------|--------------|
| [`/grill-me`](skills/grill-me/SKILL.md) | Entrevista implacable que extrae lo que realmente quieres | Empezando cualquier cambio no trivial |
| [`/spec-author`](skills/spec-author/SKILL.md) | Escribe spec en EARS/Gherkin con criterios de aceptación | Después de grill-me, antes de código |
| [`/spec-review`](skills/spec-review/SKILL.md) | Revisión independiente contra lista de ambigüedad | Antes de aprobar la spec |
| [`/implement`](skills/implementer/SKILL.md) | Implementación incremental: slices verticales, commit por slice | Spec aprobada, lista para código |
| [`/tdd-loop`](skills/tdd-loop/SKILL.md) | Red-Green-Refactor con gates de verificación | Durante implementación |
| [`/reviewer`](skills/reviewer/SKILL.md) | Fresh-context judge: ¿el código satisface la spec? | Después de implementación |
| [`/mutation-test`](skills/mutation-tester/SKILL.md) | Mutation testing adversarial: mata los mutantes o arregla los tests | Después de que reviewer aprueba |
| [`/ship`](skills/ship/SKILL.md) | Commit, PR, changelog, checklist de deploy | Todo verificado |

### Harness Engineering

| Skill | Qué hace | Úsalo cuando |
|-------|---------|--------------|
| [`/context-engineer`](skills/context-engineer/SKILL.md) | Contexto mínimo por agente, carga progresiva, memoria externa | Inicio de sesión, bloating de contexto |
| [`/subagent-driven-dev`](skills/subagent-driven-dev/SKILL.md) | Dispatches agentes frescos por tarea con handoff de artefactos | Implementando specs multi-tarea |
| [`/handoff`](skills/handoff/SKILL.md) | Compacta sesión en doc para que otro agente continúe | Cambiando de agente, reset de contexto |
| [`/diagnose`](skills/diagnose/SKILL.md) | Debug sistemático: reproducir → minimizar → hipotetizar → arreglar | Bug o regresión encontrada |
| [`/zoom-out`](skills/zoom-out/SKILL.md) | Ver código en contexto de sistema, encontrar oportunidades de profundización | Perdido en los detalles |

### Meta

| Skill | Qué hace | Úsalo cuando |
|-------|---------|--------------|
| [`/using-spec-harness`](skills/using-spec-harness/SKILL.md) | Mapea tu tarea al skill correcto | Inicio de sesión |

---

## Integraciones

Skills pre-configurados de proyectos externos, listos para el flujo SDD:

| Integración | Qué agrega | Setup |
|-------------|-----------|-------|
| [`graphify`](integrations/graphify/SKILL.md) | Knowledge graphs del codebase — 71x menos tokens por query | `pip install graphifyy && graphify install` |
| [`superpowers`](integrations/superpowers/SKILL.md) | Brainstorm → plan → execute con subagentes y git worktrees | Plugin install |
| [`bmad-method`](integrations/bmad-method/SKILL.md) | 12+ agentes especializados (PM, Arquitecto, UX), planificación adaptativa | `npx bmad-method install` |
| [`karpathy-guidelines`](integrations/karpathy-guidelines/SKILL.md) | Think before coding, simplicity first, surgical changes | Copiar a CLAUDE.md |
| [`context7`](integrations/context7/SKILL.md) | Docs actualizadas de librerías via MCP — sin APIs alucinadas | `npx ctx7 setup` |

---

## Agentes Persona

Subagentes especialista para trabajo enfocado:

| Agente | Rol | Perspectiva |
|--------|-----|-------------|
| [`spec-author`](agents/spec-author.md) | Requirements Engineer | Notación EARS, escenarios Gherkin, identificación de límites |
| [`implementer`](agents/implementer.md) | Senior Developer | Slices verticales, TDD, YAGNI, abstracciones mínimas |
| [`judge`](agents/judge.md) | Code Reviewer | Cumplimiento de spec, no opiniones de estilo |
| [`mutation-tester`](agents/mutation-tester.md) | QA Adversary | Mata los mutantes, expone tests débiles |

---

## Templates

Templates de artefactos listos para usar que los skills producen/consumen:

| Template | Usado por | Qué es |
|----------|---------|--------|
| [`SPEC.md`](templates/SPEC.md) | /spec-author | Documento de requisitos EARS/Gherkin |
| [`HANDOFF.md`](templates/HANDOFF.md) | /handoff | Contexto compacto para siguiente agente |
| [`REVIEW.md`](templates/REVIEW.md) | /reviewer | Revisión de cumplimiento con veredictos |
| [`MUTATION_REPORT.md`](templates/MUTATION_REPORT.md) | /mutation-tester | Resultados de mutation test y coverage |
| [`PRD.md`](templates/PRD.md) | /spec-author (features grandes) | Product Requirements Document |

---

## Referencias

| Referencia | Cubre |
|-----------|-------|
| [`ears-notation.md`](references/ears-notation.md) | Patrones EARS con ejemplos |
| [`testing-anti-patterns.md`](references/testing-anti-patterns.md) | Trampa del mock, obsesión por coverage, tests flaky |
| [`context-minimization.md`](references/context-minimization.md) | Reducción de tokens, carga progresiva, memoria externa |
| [`harness-principles.md`](references/harness-principles.md) | 3 pilares: guardrails, contexto, verificación |

---

## Principios de Diseño

Estos principios vienen de sintetizar 8 documentos de investigación intensiva sobre desarrollo con IA y 10 repos de skills de agentes en producción.

### 1. La Spec es Fuente de Verdad
Cada línea de código traceability a un requisito. Sin spec = sin código. La spec se escribe en notación EARS con escenarios Gherkin para que sea legible por humanos y verificable por máquinas.

### 2. El Contexto es un Presupuesto
Cada agente recibe solo el contexto que necesita — nada más. Los handoffs pasan por **ficheros artefacto** (SPEC.md, HANDOFF.md), no por heredar la conversación completa.

### 3. Subagentes, No Monolitos
Divide el trabajo en agentes independientes, cada uno con un artefacto de entrada claro y uno de salida. Contexto fresco por agente = mejores decisiones.

### 4. La Verificación es Innegociable
Todo skill termina con requisitos de evidencia. "Parece que funciona" nunca es suficiente. Mutation testing prueba que los tests realmente verifican comportamiento.

### 5. Herramientas Simples > Herramientas Complejas
Una herramienta que hace una cosa bien supera a un framework que hace todo. Inspirado en la lección de Vercel/D0: herramientas simples, compuestas.

### 6. Humano on the Loop
El humano aprueba la spec y el resultado final. El arnés automatiza todo lo demás. Esto no es coding absentee — es confianza con verificación.

### 7. Simplicidad Primero (Karpathy)
Código mínimo que resuelve el problema. Sin abstracciones especulativas. Si 200 líneas podrían ser 50, reescríbelas.

### 8. Cambios Quirúrgicos
Toca solo lo que debes. No refactorizes código adyacente. Cada línea cambiada traceability a la spec.

---

## Estructura del Proyecto

```
spec-harness/
├── skills/                        # 14 skills
│   ├── grill-me/
│   ├── spec-author/
│   ├── spec-review/
│   ├── implementer/
│   ├── tdd-loop/
│   ├── reviewer/
│   ├── mutation-tester/
│   ├── context-engineer/
│   ├── subagent-driven-dev/
│   ├── handoff/
│   ├── diagnose/
│   ├── zoom-out/
│   ├── ship/
│   └── using-spec-harness/
├── agents/                        # 4 personas especialista
├── integrations/                   # 5 herramientas externas
├── templates/                      # 5 templates de artefactos
├── references/                     # 4 checklists de referencia
├── rules/                          # Reglas siempre-activas
│   ├── common/
│   ├── typescript/
│   └── python/
├── docs/                           # Guías de setup por herramienta
├── .claude/commands/               # Slash commands (Claude Code)
└── scripts/                        # Instalador + validador
```

---

## Comparación con Otros Sistemas

| Feature | Spec-Harness | mattpocock/skills | addyosmani/agent-skills | ECC | BMAD-METHOD |
|---------|-------------|-------------------|------------------------|-----|-------------|
| Flujo spec-driven | EARS/Gherkin built-in | PRD-focused | PRD-focused | Commands | Full |
| Harness Engineering | Context minimization, external memory | Context.md | Context engineering skill | Hooks + memory | Instincts |
| Handoff entre subagentes | Por artefactos (ficheros) | Skill handoff | N/A | Orchestrators | Party mode |
| Mutation testing | Skill built-in | No | No | No | TEA module |
| Approval gates humanos | 2 (spec + resultado) | Por tarea | Por tarea | Por comando | Por fase |
| Integraciones externas | 5 pre-conectadas | N/A | N/A | Plugin system | Module system |
| Agentes persona | 4 (spec, impl, judge, tester) | N/A | 4 reviewers | 67 | 12+ |

---

## Licencia

MIT — usa estos skills en tus proyectos, equipos y herramientas.

---

## Agradecimientos

Construido sintetizando insights de:

- **8 documentos de investigación** sobre SDD, Harness Engineering, sistemas multiagente, verificación, y human-on-the-loop
- **10 repositorios de referencia**: [mattpocock/skills](https://github.com/mattpocock/skills), [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills), [affaan-m/ECC](https://github.com/affaan-m/ECC), [garrytan/gstack](https://github.com/garrytan/gstack), [obra/superpowers](https://github.com/obra/superpowers), [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD), [safishamsi/graphify](https://github.com/safishamsi/graphify), [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills), [upstash/context7](https://github.com/upstash/context7), [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)