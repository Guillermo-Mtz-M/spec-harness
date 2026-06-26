# Construyo mi PROPIO ARNÉS de IA desde CERO (parte 3 - Harness Engineering)

> Resumen estructurado del video donde se construye un arnés de IA completo desde cero en Go: el bucle REPL, el bucle agéntico interno, herramientas, providers polimórficos, sistema de permisos, subagentes, compactación de contexto, memoria, MCP y modo debug.

---

## 1. El arnés como capas de una cebolla

Un arnés de IA se concibe como capas concéntricas donde cada nivel añade capacidades:

```
┌─────────────────────────────────────────────┐
│  Skills / Subagentes / Configuración        │  ← Capa externa
├─────────────────────────────────────────────┤
│  Tools (bash, read, write, MCP, delegate)   │  ← Capa de herramientas
├─────────────────────────────────────────────┤
│  Core: bucle agéntico + SDK de LLM          │  ← Núcleo / cerebro
└─────────────────────────────────────────────┘
```

| Capa | Qué hace | Ejemplo de intervención |
|---|---|---|
| **Core** | Ejecuta llamadas al modelo de IA | Cambiar de SDK de Anthropic a OpenAI |
| **Tools** | Define qué puede hacer la IA | Añadir herramienta de Git |
| **Skills/Subagentes** | Orquesta flujos complejos | Flujo SDD con subagentes |

> Puedes hacer harness engineering en la capa de binario o en la capa de configuración. Todo depende de cuánto te deje el arnés afectar su comportamiento.

---

## 2. El bucle REPL: analogía con un videojuego

### Game Loop (videojuego a 60 fps)

```
┌─── Game Loop ────────────────────┐
│  1. READ    → Leer input (teclado/ratón)  │
│  2. UPDATE  → Actualizar estado del juego  │
│  3. RENDER  → Dibujar nuevo estado en pantalla  │
│  4. LOOP    → Volver al paso 1             │
└──────────────────────────────────────┘
```

### REPL Loop (arnés de IA)

```
┌─── REPL Loop ────────────────────────────┐
│  1. READ    → Leer input del usuario (chat)  │
│  2. EVAL    → Evaluar la entrada (decidir qué hacer)  │
│  3. PRINT   → Mostrar resultado al usuario  │
│  4. LOOP    → Volver al paso 1              │
└────────────────────────────────────────────┘
```

| Etapa | Videojuego | Arnés IA |
|---|---|---|
| **Read** | Teclado, mando, ratón | Input de chat del usuario |
| **Eval/Update** | Física, movimiento, disparos | Enviar al SDK de LLM, decidir acciones |
| **Print/Render** | Dibujar sprites, animaciones | Mostrar respuesta en la UI |
| **Loop** | Siguiente frame (16ms) | Volver a esperar input |

---

## 3. Los dos bucles: REPL y Agent Loop

### Bucle principal (REPL)

Gestiona la interacción visible del usuario: escribir → recibir respuesta → escribir de nuevo.

### Bucle interno (Agent Loop)

Dentro de la fase EVAL del REPL existe un bucle interno que se comunica con la LLM y ejecuta herramientas iterativamente.

```
[REPL: READ input del usuario]
        ↓
[REPL: EVAL → Bucle interno empieza]
        │
        ├─→ [Llamada a LLM] → ¿Respuesta directa? → FIN
        │
        ├─→ [LLM indica: tool_use] → Ejecutar tool → Volver a llama a LLM
        │
        ├─→ [LLM indica: tool_use] → Ejecutar otra tool → Volver a LLM
        │
        └─→ [LLM indica: stop] → Devolver resultado al REPL
        ↓
[REPL: PRINT resultado]
        ↓
[REPL: LOOP → volver a esperar input]
```

> **Si te quedas con algo**: son dos bucles. El grande gestiona la interacción con el usuario; el pequeño es lo que ves cuando la IA empieza a ir a un fichero, luego a otro, luego escribe algo.

---

## 4. Implementación del bucle en Go

### Estructura mínima (~175 líneas)

| Componente | Función |
|---|---|
| `main()` | Bucle REPL: lee input, inicia evaluación |
| `agentLoop()` | Bucle interno: itera con la LLM y ejecuta tools |
| `executeTool()` | Ejecuta la herramienta que la LLM solicita |

### Flujo de código

```
main()
  ├─→ print prompt (">")
  ├─→ leer input del usuario
  ├─→ construir contexto (NewMessages)
  └─→ agentLoop(contexto, historial)
        ├─→ construir mensajes para SDK
        ├─→ llamada a LLM (llm.messages.new)
        ├─→ iterar respuestas:
        │     ├─→ text → respuesta directa
        │     └─→ tool_use → executeTool() → volver a LLM
        └─→ stop_reason → devolver al REPL
```

---

## 5. Herramientas (Tools): definición y ejecución

### La IA no ejecuta, el arnés ejecuta

> La IA ve el martillo en la mesa y dice "quiero usar este martillo". Pero el arnés es quien golpea. La LLM solo conoce las herramientas; el arnés las ejecuta en tu máquina.

### Tools implementadas

| Tool | Función `definition()` | Función `execute()` |
|---|---|---|
| **Bash** | Ejecuta un comando shell | `exec.Command()` |
| **Read File** | Lee contenido de un fichero | `os.ReadFile()` |
| **Write File** | Escribe contenido en un fichero | `os.WriteFile()` |

### Cómo conoce la LLM las tools

Al hacer la llamada al SDK, el arnés pasa la lista de tools disponibles con su descripción y parámetros. La LLM decide por **inferencia** cuál usar basándose en la descripción.

> Es importante definir bien la descripción: si la LLM no entiende qué hace una tool, no la usará correctamente.

### Polimorfismo en las tools

Cada tool implementa dos funciones:

```
Tool Interface:
  - definition()  → Devuelve descripción y esquema de parámetros (para la LLM)
  - execute()      → Ejecuta la acción real en la máquina (para el arnés)
```

---

## 6. Providers: abstracción polimórfica de LLMs

### Problema

Cada SDK (Anthropic, OpenAI, modelos locales) tiene estructura diferente. Cambiar de proveedor requeriría reescribir todo el código.

### Solución: interfaz `Provider`

```
Provider Interface:
  - setModel(model)
  - getModel() → string
  - send(message, tools, context) → APIResponse
```

| Provider | SDK | Ubicación de importación |
|---|---|---|
| **AnthropicProvider** | SDK de Anthropic | Único fichero que importa este SDK |
| **OpenAIProvider** | SDK de OpenAI | Único fichero que importa este SDK |
| **MockProvider** | Funciones aleatorias | Para tests sin coste |
| *(futuro)* LocalProvider | API de modelo local | Nuevo fichero de Go |

### Tipos genéricos

Se crean tipos agnósticos (`APIMessage`, `APIToolDef`, `APIResponse`) que cada provider traduce a sus tipos específicos.

> Estoy abstrayéndome de todos los modelos y providers. Simplemente tienes unas APIs a las que llamas y te generas un wrapper por encima.

---

## 7. Sistema de permisos (gateway de seguridad)

El arnés ejecuta tools sin supervisión por defecto → **riesgo de seguridad**.

### Solución: aprobación humana antes de ejecutar cada tool

```
[LLM indica: tool_use "Bash: rm -rf /"]]
        ↓
[Sistema de permisos]
  ├─→ ¿Usuario acepta? → Sí → executeTool()
  └─→ ¿Usuario rechaza? → No → cancelar, informar a la LLM
```

Se implementa insertando la salvaguarda en la función `executeTool()` antes de la ejecución real.

---

## 8. Subagentes: delegación como tool

### Concepto

Un **subagente** es una instancia del bucle interno con su propio provider, tools y system prompt. Se instancia bajo demanda por el agente raíz.

### Root Agent

El **agente raíz** es el primero que se crea al encender el arnés. Recibe el system prompt inicial y gestiona el bucle REPL.

### Delegate Tool: subagentes como herramienta

```
Tool: delegate
  - definition()  → "Delega una tarea a un subagente especializado"
  - execute()     → Instancia un nuevo agente y ejecuta su bucle interno
```

| Decisión del arnés | Opción implementada | Alternativa |
|---|---|---|
| Contexto del subagente | Empieza vacío, no hereda mensajes | Podría heredar el historial del agente raíz |
| Descripción del subagente | Definida en código | Podría cargarse desde Markdown |
| Tools del subagente | Específicas por agente | Mismas tools que el raíz |

> Un agente no es más que una instancia concreta del proveedor. Empaquetar el concepto de agente en una clase permite instanciarlo libremente.

### Configuración granular por agente

| Agente | Provider | Tools |
|---|---|---|
| Root Agent | Anthropic (Opus) | Bash, Read, Write, Delegate |
| Research Agent | Anthropic (Sonnet) | Read, Bash (solo lectura) |
| Git Agent | OpenAI (GPT-4) | Solo tools de Git |
| Local Agent | Modelo local vía API | Bash, Read |

---

## 9. Soporte para MCP (Model Context Protocol)

### Implementación como wrapper de tools

```
MCPTool
  - definition()  → definición de tool cargada desde el servidor MCP
  - execute()     → ejecuta la tool remota
```

### Flujo de registro

```
[Leer fichero mcp.json]
        ↓
[Fetch HTTP al servidor MCP]
        ↓
[Obtener definición de tools]
        ↓
[Registrar en map de tools (registry)]
        ↓
[Tools disponibles para la LLM]
```

> Los MCPs se cargan en **paralelo** (goroutine) para no bloquear el thread principal de la UI.

---

## 10. Compactación de contexto

Cuando el contexto crece demasiado, se compacta para ahorrar tokens y evitar degradación.

### Estrategias implementadas

| Estrategia | Descripción | Coste en tokens |
|---|---|---|
| **Ninguna** | No compacta | 0 |
| **Sliding Window** | Se queda con una ventana fija de mensajes recientes | 0 |
| **Summarize** | Usa la propia LLM para resumir la conversación | Sí (1 llamada extra) |

### Interfaz

```
Compact Interface:
  - compact(messages) → messages_compactados
```

Se puede cambiar de estrategia en runtime con `/compact <estrategia>`.

---

## 11. Sistema de memoria

### Problema

Al cerrar la sesión, todo el contexto se pierde (está en RAM). No hay persistencia entre sesiones.

### Solución: tools de memoria

| Tool | Función | Descripción para la LLM |
|---|---|---|
| **Remember** | Guardar información | Guarda algo en la memoria para sesiones futuras |
| **Recall** | Recuperar información | Busca en la memoria algo del pasado |

> Es la **LLM** quien decide si vale la pena recordar algo o buscar en la memoria. Depende de cómo definas la descripción de las tools.

### Arquitectura del store de memoria

```
Memory Store Interface:
  - save(memory_entry)
  - recall(query) → memory_results
  - preamble() → contexto_inicial
```

| Implementación | Almacenamiento | Búsqueda |
|---|---|---|
| **FileStore** (por defecto) | Ficheros JSON en `.harness/` | Por tag y palabra clave |
| *(extensible)* | SQL, base de datos remota | Búsqueda semántica, etc. |

### Flujo de recall

```
[LLM indica: tool_use "recall" query="qué hicimos ayer"]
        ↓
[Buscar en índice de sesiones]
        ↓
[Encontrar fichero de sesión correspondiente]
        ↓
[Cargar contexto de esa sesión]
        ↓
[Devolver resultado a la LLM]
```

---

## 12. Modo Debug y métricas

### Debug Mode (`/debug on`)

Visualizador integrado que muestra en tiempo real:

- Llamadas al provider (payload JSON enviado)
- Respuestas de la LLM (contenido recibido)
- Impacto de memoria y contexto en las llamadas
- Tamaño del system prompt y su crecimiento por sesión

### Métricas de coste

| Métrica | Fuente | Cálculo |
|---|---|---|
| **Input tokens** | API del provider | Directo |
| **Output tokens** | API del provider | Directo |
| **Coste** | Configuración de precio por modelo | tokens × precio |

> Cada provider tiene configuraciones de coste por modelo. Se actualizan según la documentación del proveedor.

---

## 13. Repositorio educativo: tutorial y ejercicios

### Estructura del repositorio

| Sección | Contenido |
|---|---|
| **Capítulos** | Tutorial paso a paso para construir el arnés desde cero |
| **Tutoriales directos** | Cómo añadir permisos, providers, herramientas |
| **Ejercicios** | 6+ retos prácticos para extender el arnés |

### Ejercicios destacados

| # | Ejercicio | Concepto que practica |
|---|---|---|
| 1 | Modificar el agent loop con reintentos de errores | Gestión de errores en tools |
| 2 | Añadir subagentes desde Markdown | Carga dinámica de agentes |
| ... | ... | ... |

### Principio del proyecto

> Suficientemente complejo para que puedas jugar, pero suficientemente sencillo para que lo puedas entender. No es código de producción, es un proyecto educativo.

---

## 14. Arquitectura completa del arnés

```
                    ┌────────────────────────┐
                    │        UI (Bubble Tea) │
                    │   /help /debug /compact│
                    └───────────┬────────────┘
                                │
                    ┌───────────▼────────────┐
                    │     REPL Loop         │
                    │  READ → EVAL → PRINT  │
                    └───────────┬────────────┘
                                │
                    ┌───────────▼────────────┐
                    │    Agent Loop (interno)│
                    │  LLM → tool_use → LLM  │
                    ├────────────────────────┤
                    │  Permiso de ejecución  │
                    ├────────────────────────┤
                    │    Execute Tool        │
                    ├──────┬──────┬──────────┤
                    │ Bash │ Read │ Write    │
                    │ MCP  │Remember│ Recall │
                    │Delegate│      │         │
                    └──────┴──────┴──────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                   │
    ┌─────────▼──────┐ ┌───────▼───────┐ ┌───────▼───────┐
    │  Anthropic     │ │   OpenAI      │ │   Mock/Local  │
    │  Provider      │ │   Provider    │ │   Provider    │
    └────────────────┘ └───────────────┘ └───────────────┘
              │                 │                   │
    ┌─────────▼──────┐ ┌───────▼───────┐ ┌───────▼───────┐
    │  SDK Anthropic  │ │  SDK OpenAI   │ │  API Local    │
    └────────────────┘ └───────────────┘ └───────────────┘
```

---

## 15. Glosario de términos

| Término | Definición |
|---|---|
| **Arnés (Harness)** | Estructura completa que convierte un chatbot en un agente con bucle, tools y contexto |
| **REPL** | Read-Eval-Print-Loop: bucle principal de interacción con el usuario |
| **Agent Loop** | Bucle interno que itera con la LLM ejecutando tools hasta obtener una respuesta final |
| **Tool** | Función que la LLM puede solicitar ejecutar (bash, read, write, delegate, etc.) |
| **Provider** | Interfaz polimórfica que abstrae el SDK de un proveedor de LLM |
| **Root Agent** | Primer agente creado al encender el arnés; gestiona el bucle REPL |
| **Subagente** | Instancia independiente del bucle interno creada bajo demanda por el agente raíz |
| **Delegate Tool** | Tool que instancia un subagente cuando la LLM decide delegar una tarea |
| **MCP** | Model Context Protocol: protocolo para cargar herramientas remotas |
| **Compactación** | Estrategia para resumir el contexto cuando crece demasiado (tokens) |
| **Memory Store** | Sistema de persistencia que guarda y recupera información entre sesiones |
| **Debug Mode** | Visualizador que muestra payloads, respuestas y uso de contexto en tiempo real |
| **Game Loop** | Bucle de un videojuego: leer input → actualizar estado → renderizar → repetir |
| **Harness Engineering** | Disciplina de equipar y extender agentes de IA con tools, skills y configuraciones |

---

## Mapeo a Spec-Harness

| Idea del Video | Artifact Spec-Harness |
|----------------|-----------------------|
| Capas de cebolla (Core → Tools → Skills) | WORKFLOW structure: agents/ → skills/ → templates/ + rules/ |
| Provider polimórfico (cambiar LLM sin reescribir) | "Works with any agent": Claude Code, Codex, OpenCode, Cursor, Gemini CLI |
| Sistema de permisos (gateway de seguridad) | `/careful` + `/freeze` concept; `rules/common/security.md` |
| Subagentes con delegación | `/handoff` + `/subagent-driven-dev` con contexto mínimo |
| MCP como wrapper de tools remotas | `integrations/context7/SKILL.md` + `rules/common/mcp.md` |
| Compactación de contexto (sliding window, summarize) | `references/context-minimization.md` — 4-layer progressive loading |
| Sistema de memoria (Remember/Recall) | `skills/handoff/SKILL.md` (artifact-based external memory) |
| Memoria en ficheros JSON/MD | HANDOFF.md + SPEC.md como memoria persistente entre sesiones |

---

*Fuente: Video de YouTube — Tercera parte de la serie Harness Engineering*
*Repositorio: proyecto educativo en Go con tutorial paso a paso (disponible en descripción del video)*
