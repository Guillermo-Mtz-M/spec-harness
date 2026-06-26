# ¿Qué es esto del Loop Engineering?

> Resumen estructurado extraído del video sobre el concepto de Loop Engineering y su relación con el desarrollo con IA.

---

## 1. Contexto y motivación

En el ecosistema de la inteligencia artificial, cada semana aparece un nuevo término que genera urgencia por aprenderlo. Sin embargo, la mayoría de estos términos **empaquetan conceptos que ya existen** bajo un nombre nuevo. El Loop Engineering es un ejemplo reciente de este fenómeno.

| Concepto previo | Concepto actual | Diferencia real |
|---|---|---|
| Harness Engineering | Loop Engineering | Distinto enfoque (ver §4) |
| Prompt Engineering | Loop Engineering | De instrucción única a ciclo orquestado |
| Automatización tradicional | Loop Engineering | Mismo principio, nuevo nombre |

---

## 2. ¿Qué es el Loop Engineering?

El Loop Engineering (ingeniería de bucles) consiste en **diseñar un flujo de trabajo completo que la IA ejecuta de forma autónoma**, en lugar de limitarse a enviar un único prompt.

### Características clave

- **Diseño de bucles**: el humano define la secuencia de pasos que la IA debe seguir.
- **Capa de feedback**: el bucle incluye mecanismos para que la IA aprenda y se ajuste durante la ejecución.
- **Orquestación**: no es el bucle interno del agente (agéntico), sino un bucle de **orquestación** que coordina múltiples pasos y agentes.

### Distinción importante

| Tipo de bucle | Descripción | Ejemplo |
|---|---|---|
| **Bucle agéntico** | Ciclo interno del agente (input → herramientas → output) | Un agente que recibe un prompt y usa herramientas en loop |
| **Bucle de orquestación** (Loop Engineering) | Ciclo externo que coordina el lanzamiento, ejecución y cierre de agentes | Un trigger dispara agentes que analizan, corrigen y crean un PR |

---

## 3. Bucle abierto vs. bucle cerrado

| Concepto | Definición | Modo de trabajo |
|---|---|---|
| **Bucle abierto** (Open Loop) | Interacción puntual con la IA mediante prompts | El humano inicia, la IA responde. Sin ciclo continuo. |
| **Bucle cerrado** (Closed Loop) | Flujo automatizado completo con inicio, ejecución y cierre | El evento lo dispara todo; la IA ejecuta y cierra el ciclo sola. |

### Ejemplo de bucle abierto

1. El desarrollador abre Claude Code / Cursor.
2. Escribe un prompt: *"Arréglame este bug"* o *"Implantáme esta feature"*.
3. La IA responde. El humano supervisa cada paso.

### Ejemplo de bucle cerrado (Loop Engineering)

```
[Evento: Bug detectado en Sentry]
        ↓
[Trigger automático escribe prompt con stack trace]
        ↓
[Agente de IA → escribe test para detectar el bug]
        ↓
[Agente de IA → implementa código para pasar el test]
        ↓
[Agente de IA → abre Pull Request con la corrección]
        ↓
[Ciclo cerrado: bug resuelto sin intervención manual]
```

---

## 4. Loop Engineering vs. Harness Engineering

Ambos conceptos se confunden con frecuencia. La diferencia fundamental:

| Aspecto | Harness Engineering | Loop Engineering |
|---|---|---|
| **Enfoque** | Dotar de capacidades al agente | Orquestar cuándo y cómo se lanza |
| **Incluye** | Skills, herramientas, MCPs, ecosistema | Triggers, flujos, lanzamiento y cierre de sesiones |
| **Pregunta que responde** | *¿Con qué trabaja el agente?* | *¿Cuándo se lanza y cuándo termina?* |
| **Analogía** | Equipar a un trabajador con herramientas | Diseñar la línea de producción completa |

### Flujo combinado de ejemplo

```
[Ticket nuevo en Linear]
        ↓
[Bucle de agentes genera specs automáticamente]
        ↓
[Notificación al humano: "Revisa las specs"]
        ↓
[Humano aprueba → agentes implementan el código]
        ↓
[Pull Request con tests llega al humano]
```

---

## 5. Human in the Loop vs. Human on the Loop

| Concepto | Significado | Rol del humano |
|---|---|---|
| **Human in the loop** | El humano participa en cada paso del bucle | Supervisor activo, interviene decisión a decisión |
| **Human on the loop** | El humano diseña el bucle, no interviene en cada paso | Arquitecto y diseñador del flujo de trabajo |

> **Nota**: Ambos conceptos son reformulaciones de ideas ya existentes. No representan ideas radicalmente nuevas, sino nuevas etiquetas.

---

## 6. Precauciones y consideraciones prácticas

### Costes de implementar bucles de IA

- **Consumo de tokens**: cada iteración del bucle consume tokens. Bucles mal diseñados pueden generar costes descontrolados.
- **Suscripciones**: lanzar subagentes en bucles perpetualmente puede disparar facturas (Claude, Codex, etc.).
- **Complejidad**: un bucle mal definido puede ejecutarse indefinidamente sin producir valor.

### Recomendaciones

| Área | Recomendación |
|---|---|
| **Costes** | Define límites claros de iteraciones y presupuesto por bucle |
| **Diseño** | Incluye siempre una condición de parada explícita |
| **Supervisión** | Empieza con bucles semi-abiertos y muévete hacia cerrados gradualmente |
| **Criterio** | Evalúa si el bucle realmente reemplaza trabajo manual o solo añade complejidad |

---

## 7. Conclusión: aprender fundamentos, no términos

La recomendación central del video es:

1. **No perseguir el hype**: los términos cambian cada semana, los fundamentos no.
2. **Entender los conceptos subyacentes**: si dominas los principios, cada nuevo término te resultará familiar.
3. **Desarrollar criterio propio**: distinguir entre algo genuinamente nuevo y algo que ya existe bajo otro nombre.
4. **Ir más allá del nombre**: lo importante es comprender *qué* se está construyendo y *cómo* se aprovecha, independientemente de la etiqueta.

> *"La clave no es seguir el tren del hype de la IA, sino entender qué es lo que estamos construyendo y cómo lo podemos aprovechar, tenga el nombre que tenga."*

---

## 8. Glosario de términos

| Término | Definición |
|---|---|
| **Loop Engineering** | Diseño de bucles de orquestación para que la IA ejecute flujos de trabajo autónomos |
| **Harness Engineering** | Implementación del ecosistema de herramientas y capacidades de un agente de IA |
| **Bucle abierto** | Interacción puntual con la IA mediante prompts sin ciclo continuo |
| **Bucle cerrado** | Flujo automatizado con inicio, ejecución y cierre definidos |
| **Human in the loop** | Humano que supervisa y participa en cada paso del bucle |
| **Human on the loop** | Humano que diseña el bucle pero no interviene en cada paso |
| **MCP** | Model Context Protocol — protocolo para dar contexto y herramientas a agentes de IA |
| **Bucle agéntico** | Ciclo interno de un agente (recibe input → usa herramientas → produce output) |
| **Bucle de orquestación** | Ciclo externo que coordina lanzamiento y cierre de múltiples agentes |

---

## Mapeo a Spec-Harness

| Idea del Video | Artifact Spec-Harness |
|----------------|-----------------------|
| Human in the loop vs. Human on the loop | 2 human approval gates (spec review + final verification); entre gates, automatización |
| Bucle cerrado (evento → agentes → PR sin intervención) | `/ship` cierra el ciclo: spec → implement → review → test → commit → PR |
| Loop Engineering = orquestar cuándo/cómo se lanza | `/using-spec-harness` decision tree orquesta skill selection |
| Harness Engineering ≠ Loop Engineering | Harness = Skills + agents + rules; Loop = Triggers + flow + closure |
| Consumo de tokens: bucles mal diseñados = costes descontrolados | `references/context-minimization.md` — 4-layer stack budget意识 |
| "Diseñar el bucle, no participar en cada paso" | Human on the loop: gates en spec y ship, automation entre ellos |
| Condiciones de parada explícitas | Verification sections en cada skill; mutation score como stop condition |

---

*Fuente: Video de YouTube — "¿Qué es esto del Loop Engineering?"*
