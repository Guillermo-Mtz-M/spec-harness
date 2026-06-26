# Esto es lo que Aprendí Adaptando Claude Code para SDD

> Resumen estructurado del video sobre cómo construir un arnés de IA adaptado al flujo Spec-Driven Development (SDD), con subagentes especializados (Spec Author, Implementer, Reviewer), memoria externa, y un orquestador (Leader) que gestiona todo el flujo.

---

## 1. Harness Engineering vs Spec-Driven Development

### Dos conceptos distintos pero complementarios

| Concepto | Definición |
|---|---|
| **Harness Engineering** | Disciplina para automatizar flujos de trabajo con IA (TDD, iterativo, cascada, SDD...) |
| **Spec-Driven Development (SDD)** | Un flujo concreto: especificar primero → implementar después → validar → repetir |

> Harness Engineering es la disciplina; SDD es el flujo de trabajo que automatizamos con ella.

### Diferencia clave

- **SDD** = qué hago (flujo de trabajo)
- **Harness Engineering** = cómo lo hago (cómo automatizo ese flujo)

```
Harness Engineering (capa de automatización)
  ├─→ Podría automatizar TDD
  ├─→ Podría automatizar flujo en cascada
  ├─→ Podría automatizar SDD ← Este video
  └─→ Podría automatizar cualquier flujo que necesites
```

---

## 2. El flujo Spec-Driven Development

### Fases del flujo SDD

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────────┐    ┌────────────────┐
│  Especificar │ →  │  Implementar      │ →  │  Validar        │ →  │  Volver a empezar │
│  (Spec)      │    │  (Code)          │    │  (Review/Test) │    │  (Loop)        │
└─────────────┘    └──────────────────┘    └─────────────────┘    └────────────────┘
```

### Qué es una especificación en SDD

> Cualquier forma de explicar qué software queremos implementar. Puede ser historias de usuario, requisitos del cliente, o notación EARS.

### La promesa de SDD

| Escenario | Sin SDD | Con SDD |
|---|---|---|
| **Código** | Lo tocan los desarrolladores | La IA genera código |
| **Spec** | Vaga, incompleta | Fuente de verdad compartida |
| **Rol humano** | Escribe código y revisa | Solo revisa la spec |
| **Nivel máximo** | El código nunca se tocaría manualmente | Actuaría como un compilador/transpilador |

---

## 3. Arquitectura de agentes del arnés SDD

### Los 4 agentes especializados

```
┌─────────────────────────────────────────────────────┐
│                    LEADER (Orquestador)              │
│  Gestiona el flujo SDD completo, lanza agentes,    │
│  decide qué fase ejecutar según el estado           │
└────────────────────────┬────────────────────────────┘
                         │ lanza bajo demanda
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌───────────────┐  ┌──────────────┐  ┌──────────────┐
│  SPEC AUTHOR  │  │  IMPLEMENTER │  │   REVIEWER   │
│  Crea la      │  │  Implementa  │  │  Valida que  │
│  especificación│  │  código      │  │  el código   │
│  (reqs/design/│  │  siguiendo   │  │  cumple spec │
│   tasks.md)   │  │  la spec     │  │  y pasa tests│
└───────────────┘  └──────────────┘  └──────────────┘
```

### Agente Líder (orquestador)

Gestiona el flujo completo. Recibe las tareas pendientes, lanza el agente correcto según el estado actual del trabajo.

### Spec Author

Crea la especificación completa en **3 ficheros**:

| Fichero | Contenido | Formato |
|---|---|---|
| **requirements.md** | Requerimientos funcionales | Notación EARS |
| **design.md** | Decisiones técnicas de diseño | Descripción técnica |
| **tasks.md** | Lista de tareas concretas | Tareas ejecutables |

### Implementer

Recibe únicamente el contexto mínimo necesario (los 3 ficheros MD). Su única función: ejecutar las tareas definidas en `tasks.md`.

### Reviewer

Evalúa el código generado: comprueba estilo, convenciones, ejecuta tests, verifica trazabilidad contra la spec.

---

## 4. Memoria externa y persistencia de contexto

### Problema de contexto degradado

> Si la sesión se cierra, perdemos todo el contexto interno de los agentes.

### Solución: memoria externa por agente

```
Memoria del Líder (alto nivel)
  └─→ Lista de tareas (tasks.json o ticket tool como Linear/Jira)

Memoria del Spec Author
  └─→ Ficheros en carpeta /specs/<nombre_tarea>/
        ├─→ requirements.md
        ├─→ design.md
        └─→ tasks.md

Memoria del Implementer
  └─→ Contexto mínimo: solo los 3 ficheros de la spec
```

### Ficheros del Spec Author por cada tarea

```
/specs/<nombre_tarea>/
  ├─ requirements.md  (requerimientos en notación EARS)
  ├─ design.md        (decisiones técnicas: qué ficheros tocar, qué funciones crear)
  └─ tasks.md          (lista de tareas concretas: T1, T2, T3...)
```

### Filtrado de contexto por fase

| Fase | Contexto pasado al agente |
|---|---|
| **Spec Author** | Tarea pendiente, formato EARS definido en specs.md |
| **Implementer** | Solo los 3 ficheros MD de la spec aprobada — NO el historial de chat con el Spec Author |
| **Reviewer** | Spec completa + tests generados + convenciones del proyecto |

---

## 5. Notación EARS para requerimientos

### Qué es EARS

> Notación simple para redactar requerimientos que se traducen directamente a tests.

### Formato EARS

```
Cuando el [usuario ejecuta X], el sistema debe [comportamiento Y]
```

### Ejemplos del video

```
Cuando el usuario ejecuta el comando "notes" sin pasar --limit,
el sistema debe imprimir como máximo 5 notas por orden descendente.

Cuando el usuario ejecuta "notes" con un entero n mayor a 0,
el sistema debe imprimir como máximo n notas.
```

### Ventaja sobre historias de usuario

| Historias de usuario | Notación EARS |
|---|---|
| Una historia puede requerir muchos tests | Cada requerimiento EARS = 1 test directo |
| Menos preciso | Cada línea se traduce automáticamente a un test |
| Más narrativo | Más funcional y verificable |

---

## 6. Fases del flujo SDD con aprobación humana

### Ciclo completo con human-in-the-loop

```
[1] Tarea en estado PENDING
         │
         ▼
[2] Líder lanza Spec Author
    → Spec Author genera 3 ficheros (requirements.md, design.md, tasks.md)
    → Se pausa y espera aprobación humana
         │
         ▼
[3] Humano revisa: ¿la spec es correcta?
    ├─→ NO → pide cambios al Spec Author
    └─→ SÍ → marca la tarea como SPEC READY
         │
         ▼
[4] Humano marca la tarea como IN PROGRESS
         │
         ▼
[5] Líder lanza Implementer con los 3 ficheros
    → Implementer ejecuta tareas T1, T2, T3...
    → Al terminar cada tarea: marca como completada
         │
         ▼
[6] Líder lanza Reviewer
    → Verifica estilo, convenciones, ejecuta tests
         │
         ▼
[7] Tarea marcada como DONE
    → Memoria movida a history.md
         │
         ▼
[8] Volver a [1] con la siguiente tarea pendiente
```

---

## 7. Estructura de directorios del arnés

```
proyecto/
├── SPEC.md                    ← Formato agreed (EARS, convenciones, reglas)
├── history.md                 ← Historial completo de todo lo ejecutado
├── cloud.md                   ← Punto de entrada (arranca el Líder)
├── agents/
│   ├── leader.md             ← Orquestador: define flujo SDD, lanza fases
│   ├── spec_author.md        ← Genera los 3 ficheros de spec
│   ├── implementer.md         ← Implementa tareas siguiendo la spec
│   └── reviewer.md            ← Valida código contra spec y convenciones
├── specs/
│   └── <nombre_tarea>/
│       ├── requirements.md    ← Requerimientos en EARS
│       ├── design.md          ← Decisiones técnicas
│       └── tasks.md           ← Lista de tareas T1, T2, T3...
└── (proyecto de código del usuario)
```

---

## 8. Políticas y normas del Líder

El Líder tiene un conjunto de **normas** que garantizan el flujo SDD:

| Estado de la tarea | Norma del Líder |
|---|---|
| **PENDING** | Lanzar Spec Author, generar los 3 ficheros, pausar sin lanzar Implementer |
| **SPEC READY** | Esperar aprobación humana antes de pasar a IN PROGRESS |
| **IN PROGRESS** | Lanzar Implementer, luego Reviewer |
| **DONE** | Mover a history.md, mostrar resumen |

### Normas de ejecución obligatorias

```
1. Siempre ejecutar init.sh antes de trabajar (verificar entorno)
2. Siempre ejecutar tests después de cada tarea
3. El humano debe aprobar la spec antes de implementar
4. El Reviewer valida trazabilidad y convenciones
```

---

## 9. Vitaminación y extensión del arnés

### Extensiones mencionadas

| Extensión | Cómo se implementa | Ejemplo |
|---|---|---|
| **Gestor de tickets** | MCP de Linear/Jira | Guardar tareas en Linear en vez de en MD |
| **Gestión de memoria** | Tool Remember/Recall | Persistir decisiones entre sesiones |
| **Auto-commits** | Protocolo en Implementer | Hacer commit por cada tarea completada |
| **Branches automáticas** | Norma en Líder | Crear branch al empezar nueva spec |
| **Repositorio externo** | Config en Líder | Guardar historial en base de datos |
| **MCP server** | MCPTool | Cargar tools remotas para extender capacidades |

### Ejemplo de vitaminación

```
En lugar de:
  tasks.md → fichero local en /specs/

Con MCP de Linear:
  tasks.md → tickets en Linear compartidos con el equipo
```

### Filosofía

> Hay muchos sitios que te comparten herramientas opinionadas con su flujo ya definido. Lo realmente importante es que aprendas a construirte el tuyo propio.

---

## 10. Demo del flujo completo en Cloud Code

### Lanzamiento

```
> cloud
→ Cloud lee cloud.md (punta de entrada al Líder)
→ Líder inicia el flujo SDD
```

### Secuencia de la demo

1. **Líder verifica entorno** → ejecuta `init.sh` (verifica dependencias y tests)
2. **Líder detecta tarea pendiente** → feature #7 marcada con SDD=true
3. **Líder lanza Spec Author** → genera requirements.md, design.md, tasks.md en `/specs/feature_cli_resent/`
4. **Humano revisa la spec** → examina los 3 ficheros, pide cambios si es necesario
5. **Humano marca IN PROGRESS** → cambia estado de la tarea
6. **Líder lanza Implementer** → recibe tareas T4, T5, T6...
7. **Implementer ejecuta cada tarea** → por cada tarea: modifica código, ejecuta tests
8. **Líder lanza Reviewer** → lee convenciones, verifica spec, ejecuta tests
9. **Humano revisa tests generados** → aprobación final
10. **Tarea marcada DONE** → movida a history.md

---

## 11. Papel del humano en el flujo

### Por qué el humano no se elimina

> No soy muy fan de eliminar al humano del ciclo de trabajo. Siempre me gusta entender qué está construyendo y siempre quiero tener visibilidad de qué está pasando. Si no, a la larga perdemos el contexto de nuestro software y puede ser muy peligroso.

### Puntos de intervención humana

| Fase | Intervención | Por qué |
|---|---|---|
| **Spec** | Aprobar/rechazar requirements y design | Garantizar que la spec refleja la intención real |
| **Design** | Revisar decisiones técnicas | El agente toma decisiones de arquitectura |
| **Implementación** | Leer los tests generados | Tu capa de validación es la más importante |
| **Review** | Aprobar resultado final | Calidad y criterio humano no se delegan |

### El peligro de dejar a la IA sola

```
Sin revisión humana:
  → Contexto degradado con el tiempo
  → Decisiones de arquitectura sin supervisión
  → Tests que "pasan" pero no validan lo correcto
  → Pérdida de visibilidad del estado real del proyecto
```

---

## 12. Estructura del repositorio educativo

El proyecto de ejemplo es un **gestor de notas interno en Python**.

```
Gestor de notas interno (ejemplo SDD)
├── notes.py                   ← Punto de entrada CLI
├── notes/
│   ├── __init__.py
│   └── core.py               ← Lógica core
├── tests/
│   └── test_notes.py
├── SPEC.md                    ← Definición del formato de spec
├── history.md                 ← Historial de ejecuciones
├── cloud.md                   ← Punto de entrada al arnés
├── agents/
│   ├── leader.md
│   ├── spec_author.md
│   ├── implementer.md
│   └── reviewer.md
└── specs/
    └── feature_cli_resent/
        ├── requirements.md
        ├── design.md
        └── tasks.md
```

### Comandos del sistema

| Comando | Función |
|---|---|
| `cloud` | Lanza el Líder (punto de entrada) |
| `init.sh` | Verifica entorno y ejecuta tests |
| `notes --limit 5` | CLI del gestor de notas (ejemplo de la demo) |

---

## 13. Lecciones aprendidas y conclusiones

### Lo más importante del video

| Lección | Detalle |
|---|---|
| **Harness Engineering ≠ SDD** | HE es la disciplina; SDD es un flujo que puedes automatizar con ella |
| **SDD es un filtro de contexto** | Le das al Implementer solo lo que necesita, nada más |
| **Agentes especializados** | Cada fase tiene su propio agente con responsibilities claras |
| **La spec es la fuente de verdad** | No el código; el código se deriva de la spec |
| **El humano no se elimina** | Siempre revisamos spec, diseño y tests |
| **Contexto externo** | Sacar todo a ficheros externos para no degradar con el tiempo |
| **Vitaminación** | MCPs, skills, herramientas externas expanden el arnés sin límite |
| **Build your own** | No uses el flujo de otro; construye el tuyo propio |

### Quote clave

> Aprender a montarte tu propio arnés es desbloquear una habilidad que cada vez será más buscada.

---

## Mapeo a Spec-Harness

| Idea del Video | Artifact Spec-Harness |
|----------------|-----------------------|
| SDD flujo: Especificar → Implementar → Validar → Loop | Core workflow: grill-me → spec-author → implement → reviewer → loop |
| 4 agents (Leader, Spec Author, Implementer, Reviewer) | 5 agents (spec-author, implementer, judge, mutation-tester, council-chairman) |
| Notación EARS para requerimientos | `templates/SPEC.md` usa EARS + Gherkin |
| 3 ficheros de spec (requirements, design, tasks) | Consolidados en 1 SPEC.md con secciones estructuradas |
| Aprobación humana antes de implementar | 2 human approval gates (spec review + final verification) |
| Contexto filtrado por fase (spec → implementer → reviewer) | `skills/handoff/SKILL.md` contexto mínimo por agente |
| "Build your own" (construye tu propio arnés) | Spec-Harness como starting point personalizable |
| Spec como fuente de verdad (no el código) | Design Principle #1: Spec is Source of Truth |

---

*Fuente: Video de YouTube — Adaptando Claude Code para SDD*
*Repositorio: disponible en la descripción del video*