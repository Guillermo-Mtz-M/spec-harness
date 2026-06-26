# Spec-Harness | [English](./README.md) · [中文](./README.zh.md)

![Stargazers](https://img.shields.io/github/stars/Guillermo-Mtz-M/spec-harness?style=flat)
![Forks](https://img.shields.io/github/forks/Guillermo-Mtz-M/spec-harness?style=flat)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Skills](https://img.shields.io/badge/skills-15-40c4ff)
![Agents](https://img.shields.io/badge/agents-5-b48ead)
![Integrations](https://img.shields.io/badge/integrations-9-66bb6a)
![Extras](https://img.shields.io/badge/extras-4-ff9800)

**Desarrollo Guiado por Specs + Ingeniería de Arneses para agentes de código IA.**

Un sistema de skills composables que combina **Spec-Driven Development** (la spec como fuente de verdad) con **Harness Engineering** (guardrails automatizados, minimización de contexto, loops de verificación) — diseñado sintetizando patrones reales de flujos de trabajo con IA en producción.

Funciona con **Claude Code**, **Codex**, **OpenCode**, **Cursor**, **Gemini CLI**, y cualquier agente que lea skills en markdown.

---

## Diagrama del Workflow

![Workflow](assets/workflow.svg)

### Solo 2 Gates Humanos

- **Gate 1:** Después de `/spec-author` — "¿Es esto lo que quiero?"
- **Gate 2:** Después de `/mutation-test` — "¿Funciona?"

Todo entre gates es automatizado por el arnés.

---

## Ejemplos Completos

| Ejemplo | Qué demuestra |
|---------|---------------|
| [`examples/01-user-auth/`](examples/01-user-auth/) | Flujo completo: sistema de auth con 4 requisitos. Todos los artefactos producidos — SPEC.md, REVIEW.md, MUTATION_REPORT.md, commits |
| [`examples/02-api-rate-limit/`](examples/02-api-rate-limit/) | Spec mínima: middleware rate limiter (2 requisitos). Muestra que el flujo escala hacia abajo también |

---

## Inicio Rápido

### 3 Pasos

```bash
# 1. Instalar (agrega --with-extras para herramientas de diseño y plugins)
git clone https://github.com/Guillermo-Mtz-M/spec-harness.git && cd spec-harness && node scripts/install.js --target claude

# 2. Entrevista
# Escribe /grill-me — el agente te entrevista para sacar lo que realmente quieres

# 3. Especificar
# /spec-author escribe SPEC.md en EARS/Gherkin
# → [HUMANO APRUEBA]
# → [Implementar]
# → [Verificar]
# → /ship
```

> **Extras**: Agrega `--with-extras` para instalar ui-ux-pro-max (96.8k⭐), open-design (71.6k⭐), ilustraciones Xiaohei, y plugins de negocio.

### Agentes Soportados

| Agente | Instalación |
|--------|-------------|
| Claude Code | `node scripts/install.js --target claude` |
| OpenCode | `node scripts/install.js --target opencode` |
| Cursor | `node scripts/install.js --target cursor` |
| Gemini CLI | `gemini extensions install https://github.com/Guillermo-Mtz-M/spec-harness` |

---

## El Workflow

```
  ESPECIFICAR      REVISAR         CONSTRUIR       VERIFICAR        ENTREGAR
 ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
 │ grills   │──▶│  spec    │──▶│   TDD    │──▶│  judge   │──▶│  humano  │
 │  user    │   │  review  │   │  loop    │   │  mutate  │   │ aprueba  │
 └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
   /grill-me      /spec-review    /implement     /mutation-test    /ship
        └──── /spec-author ───┘   └─── /tdd-loop ─┘  └── /reviewer ─┘
```

**Gates de aprobación humana (solo 2):**
1. **Después de la spec** — "¿Es esto lo que quiero?"
2. **Después de verificación** — "¿Funciona?"

---

## Skills (15)

| Skill | Qué hace | Cuándo usarlo |
|-------|----------|---------------|
| `/grill-me` | Entrevista implacable — extrae lo que realmente quieres | Empezando algo no trivial |
| `/spec-author` | Escribe spec EARS/Gherkin con criterios de aceptación | Después de grill-me, antes de código |
| `/spec-review` | Revisión fresh-context contra checklist de ambigüedad | Antes de aprobar la spec |
| `/implement` | Slices verticales thin con TDD, commit por slice | Spec aprobada, hora de construir |
| `/tdd-loop` | RED-GREEN-REFACTOR con gates de verificación | Durante implementación |
| `/reviewer` | Judge: ¿el código satisface la spec? | Después de implementación |
| `/council-review` | 3 revisiones anónimas (spec, performance, seguridad) → síntesis chairman | Después de reviewer, antes de mutation-test |
| `/mutation-test` | Mata mutantes o arregla tests (≥70% requerido) | Después de council-review |
| `/ship` | Commit, PR, changelog, deploy checklist | Todo verificado |
| `/context-engineer` | Minimiza contexto, carga progresiva, memoria externa | Inicio de sesión, contexto inflado |
| `/subagent-driven-dev` | Dispatch agentes frescos por tarea vía artefactos | Specs multi-slice |
| `/handoff` | Compacta sesión a HANDOFF.md para el próximo agente | Cambiando agentes, reset de contexto |
| `/diagnose` | Reproduce → minimiza → hipotetiza → arregla → protege | Bug o regresión |
| `/zoom-out` | Ve el código en contexto de sistema, encuentra oportunidades | Perdido en detalles |
| `/using-spec-harness` | Mapea tu tarea al skill correcto | Inicio de sesión |

---

## Integraciones (9)

| Integración | Qué agrega | Setup |
|-------------|-----------|-------|
| [`graphify`](integrations/graphify/) | Knowledge graphs — 71x menos tokens por query | `pip install graphifyy && graphify install` |
| [`superpowers`](integrations/superpowers/) | Brainstorm → plan → execute con git worktrees | Plugin install |
| [`bmad-method`](integrations/bmad-method/) | 12+ agentes especializados, planificación adaptativa | `npx bmad-method install` |
| [`karpathy-guidelines`](integrations/karpathy-guidelines/) | Think before coding, simplicity first, surgical changes | Copiar a CLAUDE.md |
| [`context7`](integrations/context7/) | Docs actualizadas de librerías vía MCP — sin APIs alucinadas | `npx ctx7 setup` |
| [`ui-ux-pro-max`](integrations/ui-ux-pro-max/) *(extras)* | 67 estilos UI, 161 reglas de diseño, 17 tech stacks — generación profesional de design systems | `--with-extras` o copia manual |
| [`open-design`](integrations/open-design/) *(extras)* | 142+ contratos DESIGN.md, output multi-formato (HTML/PDF/PPTX/MP4) | `open-design install --mcp` |
| [`ian-xiaohei-illustrations`](integrations/ian-xiaohei-illustrations/) *(extras)* | Ilustraciones para artículos Chinese — estilo Xiaohei hand-drawn | `--with-extras` o copia manual |
| [`small-business`](integrations/small-business/) *(extras)* | 15 comandos de negocio — payroll, cash flow, CRM, campañas vía Claude | `--with-extras` o copia manual |

---

## Agentes (5)

| Agente | Rol | Veredicto |
|--------|-----|-----------|
| [`spec-author`](agents/spec-author.md) | Requirements Engineer | Notación EARS |
| [`implementer`](agents/implementer.md) | Senior Developer | TDD, YAGNI, surgical changes |
| [`judge`](agents/judge.md) | Code Reviewer | PASS / FAIL / PARTIAL por requisito |
| [`mutation-tester`](agents/mutation-tester.md) | QA Adversary | Mutation score ≥ 70% |
| [`council-chairman`](agents/council-chairman.md) | Synthesis Arbiter | Veredicto unificado de revisiones anónimas |

---

## Principios de Diseño

```
1. Spec es Fuente de Verdad   → Sin spec = sin código. EARS/Gherkin only.
2. Contexto es un Presupuesto  → Mínimo por agente. Handoffs vía artefactos.
3. Subagentes, No Monolitos  → Contexto fresco = mejores decisiones.
4. Verificación es Obligatoria → "Parece bien" es rechazado. Muestra el test.
5. Tools Simple > Complex      → Inspirado en lección Vercel/D0.
6. Human on the Loop           → 2 gates (spec + resultado). Confianza entre medio.
7. Simplicity First           → 200 líneas → 50? Reescríbelo.
8. Surgical Changes            → Toca solo lo que la spec requiere.
```

---

## Estructura del Proyecto

```
spec-harness/
├── skills/               # 15 skills (workflow core)
├── agents/               # 5 personas especialistas
├── integrations/         # 9 integraciones (5 core + 4 extras)
├── templates/            # 6 templates de artefactos
│   ├── SPEC.md           # Contrato EARS/Gherkin
│   ├── HANDOFF.md        # Handoff de sesión
│   ├── REVIEW.md         # Veredicto del judge
│   ├── MUTATION_REPORT.md # Resultados de mutation test
│   ├── COUNCIL-REVIEW.md # Síntesis de council review
│   └── PRD.md            # Requisitos de producto
├── references/           # 4 checklists suplementarios
├── rules/                # Guías siempre-activas (common, ts, python)
├── docs/                 # Guías de setup (Claude, OpenCode, Cursor, Gemini)
├── .claude/commands/     # 16 slash commands para Claude Code
└── scripts/              # install.js + validate.js
```

---

## Comparación

| Feature | Spec-Harness | mattpocock | agent-skills | ECC | BMAD | gstack |
|---------|:-----------:|:----------:|:------------:|:---:|:----:|:------:|
| Spec EARS/Gherkin | ✅ Built-in | PRD | PRD | Commands | Full | PRD |
| Harness Engineering | ✅ Contexto + memoria | Context.md | Context skill | Hooks | Instincts | Context + memory |
| Handoff artefactos | ✅ File-based | Handoff skill | N/A | Orchestrators | Party mode | Skill-based |
| Mutation testing | ✅ Built-in | ❌ | ❌ | ❌ | TEA module | ❌ |
| Gates humanos | **2 only** | Por tarea | Por tarea | Por cmd | Por fase | Por skill |
| Integraciones externas | 9 pre-wired | ❌ | ❌ | Plugin | Modules | 23 skills |
| Agentes persona | 5 | ❌ | 4 reviewers | 67 | 12+ | 23 specialists |
| Multi-revisión council | ✅ /council-review | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Licencia

MIT — usa en proyectos, equipos y herramientas.

## Agradecimientos

Sintetizado de documentos de investigación sobre SDD/Harness/sistemas multiagente y repos de referencia en producción:

**Workflow core:** [mattpocock/skills](https://github.com/mattpocock/skills) · [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) · [affaan-m/ECC](https://github.com/affaan-m/ECC) · [garrytan/gstack](https://github.com/garrytan/gstack) · [obra/superpowers](https://github.com/obra/superpowers) · [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) · [safishamsi/graphify](https://github.com/safishamsi/graphify) · [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) · [upstash/context7](https://github.com/upstash/context7) · [karpathy/llm-council](https://github.com/karpathy/llm-council) · [anthropics/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) · [anthropics/code-review](https://github.com/anthropics/claude-code/tree/main/plugins/code-review) · [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)

**Extras (instalar con `--with-extras`):** [nextlevelbuilder/ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) · [nexu-io/open-design](https://github.com/nexu-io/open-design) · [helloianneo/xiaohei-illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) · [anthropic/small-business](https://claude.com/plugins/small-business)
