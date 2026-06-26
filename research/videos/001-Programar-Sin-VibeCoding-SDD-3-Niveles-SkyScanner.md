# La Nueva Forma de Programar (sin Vibe Coding)

> Resumen estructurado del video sobre la diferencia entre usar IA de forma improvisada vs. estratégica en desarrollo de software, los tres niveles de Spec-Driven Development, herramientas existentes (Kiro, SpecKit, TESEL), y el caso real de Skyscanner con Codex + JetBrains MCP.

---

## 1. Los dos mundos del desarrollo con IA

| Enfoque | Descripción | Resultado |
|---|---|---|
| **Sin estructura** | Usar IA sin metodología, improvisando, "vibe coding" | Resultados impredecibles, contexto degradado |
| **Con estrategia** | Buscar herramientas, metodologías y formas eficientes de aprovechar la IA | Mejores resultados, trabajo sostenible |

> Hay una gran diferencia entre los desarrolladores que utilizan la inteligencia artificial de forma estratégica y los que simplemente se dejan llevar.

### La evolución del uso de IA en desarrollo

```
Fase 1: Chat interfaces        → Solo texto, ineficiente para desarrollo
Fase 2: Agentes (Cloud Code,   → Integrados en flujos, leen código,
         Open Code)              escriben ficheros, ejecutan acciones
         ↓
¿En qué fase estás tú?
```

---

## 2. La ventana de contexto: la metáfora del escritorio

### El problema de la memoria limitada

> La inteligencia artificial funciona con ventanas de contexto, no tiene memoria infinita.

### La metáfora del escritorio

```
ESCITORIO = Ventana de contexto
DOCUMENTOS = Tokens

Situación inicial:
  → Tienes tu escritorio vacío
  → Tienes 1 folio con tareas/informes del día
  → Trabajas tranquilo

Con el tiempo:
  → Llegan más papeles, más informes
  → Se llena el escritorio de documentos
  → Llegan papeles que no son tareas (facturas, etc.)
  → Tantos papeles que te hartas y lo mandas todo a la papelera

           ↓
  ¡Esto le ocurre EXACTAMENTE a la IA!
```

### La analogía clave

```
HUMANO: escritorio lleno de papeles → no puede trabajar → se atasca
IA:     contexto lleno de tokens     → no puede razonar  → se degrada
```

---

## 3. Compresión de contexto

### Cómo la IA gestiona la sobrecarga

```
ESCENARIO:
  En memoria: "existe una función calculate_invoice
              que tiene una comprobación de rol
              y solo se ejecuta si el rol es premium"

CUANDO EL CONTEXTO SE LLENA:
  → La IA comprime esta información
  → Guarda: "calculate_invoice solo para premium"
  → Lo hace igual que lo haría un humano con una pila de facturas:
    "eso es la pila de facturas" (en vez de recordar cada una)
```

### Lo que esto significa para desarrolladores

| Aspecto | Implicación |
|---|---|
| **Información no relevante** | Se comprime o descarta primero |
| **Detalles técnicos específicos** | Pueden perderse con el tiempo |
| **Contexto crítico** | Hay que refrescarlo periódicamente |
| **Gestión activa** | El desarrollador debe ordenar el "escritorio" de la IA |

### La pregunta clave

```
¿Si yo me ordeno el escritorio para trabajar mejor,
si le ordeno el escritorio a la IA, también va a trabajar mejor?
→ SÍ. Ya existen técnicas para ello.
```

---

## 4. Spec-Driven Development: los tres niveles

> Artículo de Virgita Buckeler (Martin Fowler Blog) — Tres niveles de SDD.

### Nivel 1: Spec First

```
Flujo: Escribes spec detallada → Delegas implementación a IA → Fin

Características:
  - Documentación tradicional aplicada a IA
  - Similar a documentos de diseño clásicos
  - Escribes → implementas → te olvidas
  - La spec no evoluciona con el código
```

### Nivel 2: Spec Evolved (Spearord)

```
Flujo: Escribes spec → Implementas → Iteras la spec JUNTO con el código

Características:
  - La documentación se mantiene después de entregar
  - La spec evoluciona con las iteraciones
  - Documento vivo, no algo que se abandona
  - Escribes → implementas → sigues iterando la spec
```

### Nivel 3: Spec as Source

```
Flujo: Programar la SPEC → La IA genera código → Humano nunca toca el código

Características:
  - El humano SOLO toca la documentación
  - La IA siempre genera el código
  - El código se deriva directamente de la spec
  - La spec ES el código fuente (paradigma nuevo)

  Esta fase solo es posible gracias a la IA interpretando
  documentación y generando código funcional.
```

### Comparativa: documentación tradicional vs SDD

| Aspecto | Tradicional | Spec First | Spec Evolved | Spec as Source |
|---|---|---|---|---|
| **Qué es la spec** | Referencia | Fuente inicial | Documento vivo | Código fuente |
| **Evoluciona con código** | No | No | Sí | Sí |
| **Humano toca código** | Sí | Sí | Sí | No |
| **Generación IA** | No | Delegada | Delegada | Automática |

---

## 5. Herramientas SDD: comparativa

### Kiro

| Característica | Detalle |
|---|---|
| **Qué es** | Herramienta de programación con IA usando agentes |
| **Flujo** | Requerimiento (markdown) → Documento de diseño → Tareas → Implementación |
| **Nivel SDD** | Spec First (el más clásico) |
| **Cómo funciona** | Defines requerimiento como historia de usuario, IA genera diseño y tareas |
| **Iteración** | Crear otra historia de usuario para cambios |
| **Limitación** | Flujo de "escribo, implemento, me olvido" |

### SpecKit (GitHub)

| Característica | Detalle |
|---|---|
| **Qué es** | Herramienta de GitHub para spec-driven development |
| **Promesa** | La documentación como código sobre el que programas |
| **Nivel SDD** | Entre Spec First y Spec Evolved |
| **Limitación** | Genera una branch por cada cambio → vuelves a empezar de cero |
| **Crítica del video** | La documentación no es realmente el código que mantienes |

### TESEL

| Característica | Detalle |
|---|---|
| **Qué es** | Herramienta construida sobre el nuevo flujo SDD |
| **Nivel SDD** | Spec as Source (el más avanzado) |
| **Flujo** | Hablas con el agente → define requerimientos → agente escribe specs → genera código |
| **Detalle clave** | Cuando genera código, pone al inicio: |
| | `// Código generado desde la spec, no editar` |
| **Qué significa** | Elimina directamente al humano de la parte del código. El humano se queda SOLO en la spec. |
| **Bucle** | El agente actualiza la propia documentación según lo que implementa |

### Comparativa rápida

| Herramienta | Nivel SDD |亮点 | Limitación |
|---|---|---|---|
| **Kiro** | Spec First | Agentes especializados | Flujo clásico "escribo y me olvido" |
| **SpecKit** | Spec First → Evolved | Docs como código | Branch por cambio, no es contínuo |
| **TESEL** | Spec as Source | Humano fuera del código | Muy nuevo, requiere adaptación |

---

## 6. Caso real: Skyscanner + Codex + JetBrains MCP

### El problema detectado

```
Flujo tradicional con tests + IA:
  1. Escribes tests
  2. IA programa
  3. IA ejecuta tests
  4. Algo falla → IA arregla
  5. Vuelve al paso 3

Problema:
  Los editores de código YA detectan errores (funciones que no existen)
  Pero el agente de IA no se entera hasta que intenta ejecutar los tests
  → Se pierde tiempo innecesario
```

### La solución: conectar Codex al editor

```
Artículo: "SuperCharging Codex with JetBrains MCP @Skyscanner"

Lo que hicieron:
  Conectar Codex (agente de IA) con el editor (JetBrains)
  mediante MCP (Model Context Protocol)

El resultado:
  - El agente tiene acceso en TIEMPO REAL a las comprobaciones del editor
  - Detecta funciones inexistentes ANTES de ejecutar tests
  - Reduce el flujo de 5 pasos a 3 pasos
```

### Comparación de flujo

| Paso | Sin MCP | Con MCP Skyscanner |
|---|---|---|
| 1 | IA ejecuta tests | IA lee código del editor |
| 2 | Algo falla (función no existe) | Editor detecta: función no existe |
| 3 | Arregla | Avisa a IA inmediatamente |
| 4 | Vuelve a ejecutar | IA sabe el error en tiempo real |
| 5 | Repite | - |
| **Total** | **5 pasos** | **3 pasos** |

### Beneficios

| Beneficio | Descripción |
|---|---|
| **Ciclo más corto** | Reduce de 5 a 3 pasos |
| **Contexto más limpio** | El escritorio de la IA se mantiene más pequeño |
| **Detección temprana** | Errores antes de ejecutar tests |
| **Mayor productividad** | Menos iteraciones innecesarias |

---

## 7. La base técnica necesaria

### Requisito: fundamentos sólidos

> Para aprovechar la IA al máximo necesitas una buena base técnica, una base sólida de fundamentos para informar a la inteligencia artificial de forma correcta.

### Por qué la base importa

```
Si no entiendes cómo funciona:
  - La ventana de contexto
  - Los tokens
  - Los agentes y sus limitaciones

No podrás:
  → Ordenarle el "escritorio" correctamente
  → Implementar metodologías como SDD
  → Detectar cuándo la IA se está degradando
  →构etter decisiones sobre qué herramientas usar
```

### La recomendación

```
No basta con saber usar la herramienta.
Hay que entender los conceptos que hay debajo:
  → Tokens y contexto
  → Agentes y sus capacidades
  → Skills y MCP
  → Metodologías de desarrollo con IA
```

---

## 8. Diferencia entre improvisar y ser estratégico

| Aspecto | Vibe Coding (improvisación) | Enfoque estratégico |
|---|---|---|
| **Metodología** | Ninguna | SDD, gestión de contexto |
| **Herramientas** | Solo chat | Agentes + MCP + skills |
| **Gestión de contexto** | No se gestiona | Se optimiza activamente |
| **Errores** | Se detectan tarde | Se detectan temprano (MCP) |
| **Documentación** | Se olvida | Es la base del desarrollo (Spec as Source) |
| **Escalabilidad** | Inconsistente | Reproducible y mejorable |
| **Productividad** | Inestable | Sostenida y medible |

---

## 9. Glosario

| Término | Definición |
|---|---|
| **Vibe Coding** | Usar IA sin estructura ni metodología, improvisando |
| **Ventana de contexto** | Memoria limitada del modelo de IA; cuando se llena, el rendimiento degrada |
| **Compresión de contexto** | Técnica por la que la IA simplifica información compleja cuando el contexto se llena |
| **Spec-Driven Development (SDD)** | Metodología que usa especificaciones como base del desarrollo con IA |
| **Spec First** | Nivel 1 de SDD: escribir spec detallada y delegar implementación |
| **Spec Evolved (Spearord)** | Nivel 2 de SDD: la spec evoluciona junto con el código |
| **Spec as Source** | Nivel 3 de SDD: programar la spec, la IA genera código, el humano no toca el código |
| **MCP (Model Context Protocol)** | Protocolo estándar que conecta agentes de IA con herramientas externas (como editores) |
| **Codex** | Agente de IA de OpenAI para desarrollo de software |
| **Martin Fowler Blog** | Referencia de arquitectura y metodologías de software (artículo de Virgita Buckeler sobre SDD) |

---

## 10. Recursos mencionados

| Recurso | Descripción |
|---|---|
| Artículo Martin Fowler — SDD (Virgita Buckeler) | Los tres niveles de Spec-Driven Development |
| Skyscanner + JetBrains MCP + Codex | Caso de estudio de conexión IA-editor |
| Kiro | Herramienta SDD nivel Spec First |
| SpecKit (GitHub) | Herramienta GitHub para spec-driven |
| TESEL | Herramienta Spec as Source |
| Video conceptos backend | Fundamentos que todo desarrollador debe conocer |

---

## Mapeo a Spec-Harness

| Idea del Video | Artifact Spec-Harness |
|----------------|-----------------------|
| SDD 3 niveles (Spec First → Spec Evolved → Spec as Source) | `skills/spec-author/SKILL.md` implementa Spec Evolved (spec viva que itera con código) |
| Ventana de contexto = escritorio que se llena | `references/context-minimization.md` — 4-layer progressive loading stack |
| Compresión de contexto degrada detalles técnicos | `skills/context-engineer/SKILL.md` gestiona contexto como presupuesto |
| Skyscanner: MCP conecta editor ↔ agente (5→3 pasos) | `rules/common/mcp.md` + integraciones MCP |
| Vibe coding = sin metodología | Anti-pattern: Spec-Harness disciplina con SDD + harness |
| Spec as Source (humano no toca código) | Objetivo final: SPEC.md es la fuente, IA genera, humano solo revisa spec |

---

*Fuente: Video de YouTube — "La Nueva Forma de Programar (sin Vibe Coding)"*
*Clases en vivo mencionadas: 10 de marzo (enlace en descripción del video)*