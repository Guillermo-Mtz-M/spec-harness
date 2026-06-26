# Todo lo que necesitas saber sobre el desarrollo con IA

> Resumen estructurado del video que explica los conceptos fundamentales de la inteligencia artificial aplicada al desarrollo de software: LLMs, tokens, arquitectura Transformers, entrenamiento, ventana de contexto, agentes, skills y MCP.

---

## 1. Qué es un LLM (Large Language Model)

### La predicción de tokens

Un LLM es una **caja negra (función)** que recibe texto y devuelve probabilidades sobre el siguiente token.

```
Entrada: "La capital de Francia es"
         ↓
┌───────────────────────────────────┐
│           LLM                      │
│  Devuelve probabilidades:          │
│  - París    → 72%                  │
│  - Lyon    → 10%                  │
│  - Marsella → 7%                  │
│  - Roma     → 3%                  │
└───────────────────────────────────┘
         ↓
Salida: "La capital de Francia es París"
```

### En bucle = generación de texto indefinido

```
[Frase incompleta] → LLM predice siguiente token
        ↓
[Token generado + frase actualizada]
        ↓
[LLM predice siguiente token] → ... → ChatGPT
```

### Qué significa "predecir texto"

> Dado un historial de tokens anterior, el LLM calcula la probabilidad de cuál sería el siguiente token basándose en lo que aprendió durante su entrenamiento.

---

## 2. Qué es un token

### Definición

> El token es la **unidad mínima de procesamiento** que utilizan los LLMs para trabajar.

### Equivalencia simplificada

```
1 token ≈ 1 palabra (NO siempre exacto)
```

### Ejemplos del tokenizer de OpenAI

| Texto | Tokens |
|---|---|
| "La capital de Francia" | 5 tokens |
| "suscríbete" | 4 tokens (su-scrí-be-te) |

> Una palabra puede dividirse en varios tokens. El modelo internamente usa números (token IDs) para representar cada token.

### Por qué importa entender tokens

| Área | Relación con tokens |
|---|---|
| **Coste** | Se paga por tokens consumidos |
| **Contexto** | La ventana de contexto se mide en tokens |
| **Rendimiento** | Más tokens = más cálculo = más lento |
| **Calidad** | Gestión de tokens afecta la calidad de respuestas |

---

## 3. Arquitectura neuronal: de redes simples a Transformers

### Redes neuronales tradicionales

Inspiradas en cómo funcionan las neuronas del cerebro humano. Se utilizan para clasificación, predicción y reconocimiento de patrones.

```
┌────────────────────────────────────────────────┐
│  CAPA DE ENTRADA  │  CAPA OCULTA  │  SALIDA    │
│  (datos)          │  (cálculos)   │  (predicción)│
└────────────────────────────────────────────────┘
```

| Elemento | Función |
|---|---|
| **Capa de entrada** | Los datos que metemos (ej: píxeles de imagen, palabras) |
| **Capas ocultas** | Realizan los cálculos para encontrar patrones |
| **Capa de salida** | La predicción (ej: qué carácter es, qué palabra viene) |

### Limitación de redes tradicionales: el problema de relaciones lejanas

```
Frase: "El gato no cruzó la calle porque estaba cansado"
       ↑
       ¿Quién estaba cansado? → El gato (está al inicio)

Red neuronal tradicional: No podía modelar bien relaciones
entre palabras que estaban lejos entre sí en la frase.
```

| Problema | Descripción |
|---|---|
| **Relaciones lejanas** | La palabra "cansado" modifica a "gato" pero están separados |
| **Contexto secuencial** | Las redes simples procesaban en orden, sin "ver" toda la frase |

### Transformers: Attention is all you need (2017)

Paper de Google que resolvió el problema de las relaciones lejanas introduciendo el mecanismo de **atención**.

```
┌─────────────────────────────────────────────┐
│  TRANSFORMER                                │
│  Calcula el PESO de relación entre CADA par  │
│  de tokens de la frase                      │
│                                             │
│  "gato" ←65%→ "cansado"                    │
│  "gato" ←40%→ "calle"                      │
│  "cansado" ←20%→ "cruzó"                    │
└─────────────────────────────────────────────┘
```

| Avance | Qué permite |
|---|---|
| **Mecanismo de atención** | El modelo "ve" toda la frase y calcula qué tan relacionadas están todas las palabras entre sí |
| **Paralelización** | Procesa toda la secuencia a la vez (no secuencialmente) |
| **Contexto completo** | Asigna pesos a las relaciones de cada palabra con todas las demás |

> Esto es lo que permite generar texto que tiene sentido gramatical y semántico, porque el modelo entiende las relaciones dentro de la frase.

---

## 4. Cómo se entrenan los LLMs

### El proceso de entrenamiento

```
DATOS DE ENTRADA          MÉTODO                RESULTADO
(libros, web...)    →   Quitar la última    →  Ajustar pesos
                       palabra y pedir       →  hasta que la
                       que la prediga           predicción sea
                                              cada vez mejor
```

### Ejemplo con Harry Potter

```
1. Tenemos: "Harry Potter fue a la escuela de"
2. Quitamos la última palabra: "magia"
3. El modelo predice: ¿qué viene después?
4. Si predice "magia" → ✓ sigue por ese camino
5. Si predice otra cosa → ✗ ajusta sus pesos internos y vuelve a intentar

Este proceso se repite millones de veces hasta que los pesos
de la red neuronal se estabilizan en una configuración
que minimiza el error.
```

### De dónde sacan el conocimiento

```
El set de entrenamiento determina el conocimiento del modelo:

Ejemplo: libros + artículos web + código
→ Modelo sabe generar texto, programar, escribir código

CUIDADO: Si entrenas con respuestas de otro LLM
→ El modelo hereda los sesgos y errores del original
```

| Factor | Impacto en el modelo |
|---|---|
| **Datos de entrenamiento** | Determina qué conocimiento tiene |
| **Método de entrenamiento** | Determina cómo aprende a razonar |
| **Arquitectura (capas, parámetros)** | Determina la capacidad del modelo |
| **Empresa que lo entrena** | Cada una optimiza de manera diferente (OpenAI, Anthropic, DeepSeek...) |

---

## 5. La ventana de contexto

### El límite físico

Los modelos tienen una memoria limitada (la ventana de contexto). Cuantos más tokens le pasas, más lleno está el contexto.

```
VENTANA DE CONTEXTO (ejemplo: 100k tokens)
┌────────────────────────────────────────────┐
│  [tokens entrada] [tokens salida] [??? ]  │  ← Llenándose
└────────────────────────────────────────────┘
         Límite máximo de tokens que puedes pasar
```

### Qué ocurre cuando se llena

| Tipo de modelo | Comportamiento |
|---|---|
| **Modelos sencillos** | Simplemente se olvida de los tokens más antiguos |
| **Modelos intermedios** | Resumen (summarize) los tokens que van a desaparecer en una representación más pequeña |
| **Modelos avanzados** | Aplican un gradiente: dan más importancia a tokens nuevos que a antiguos |

### La degradación: el problema conocido

```
Síntoma: Cuanto más tiempo llevas en la misma sesión de chat,
         más tonta parece volverse la IA.

Datos:
  - ~20% del contexto → empieza la degradación
  - ~40% del contexto → muchos recomiendan resetear/limpiar
  - Aunque la ventana sea "grande", el rendimiento cae antes de llenarse
```

### Gestión del contexto para desarrolladores

| Técnica | Descripción |
|---|---|
| **Memoria externa** | Sacar información del contexto a ficheros/BD |
| **Fichero de tareas** | Mantener la lista de tareas fuera del chat |
| **Resumen periódico** | Usar la propia IA para resumir el contexto acumulado |
| **Ventanas limpias** | Abrir nueva sesión cuando el contexto se degrada |

> Cada código que lee el agente, cada script que ejecuta, también ocupa espacio en el contexto. Por eso es crítico saber gestionar qué información entra y qué se externaliza.

---

## 6. Qué es un agente de IA

### La diferencia: de predicción de texto a acción

| Modo chat | Modo agente |
|---|---|
| Input texto → LLM → Output texto | Input texto → LLM → **Decide y ejecuta acciones** |
| Solo genera texto | Lee ficheros, ejecuta scripts, toma decisiones |
| Sin percepción del entorno | **Percibe su entorno** (sistema de ficheros, herramientas...) |

### Definición de agente

```
Agente de IA = Programa capaz de:
  1. PERCIBIR su entorno (leer ficheros, recibir información)
  2. PENSAR (usar el LLM como cerebro)
  3. ACTUAR (ejecutar herramientas, scripts, escribir ficheros)
  4. Repetir en bucle
```

### Ejemplo: Cloud Code + Opus 4.6

```
Petición: "Ejecuta los tests de este proyecto"

El agente:
  1. Lee el código del proyecto
  2. Lee los tests existentes
  3. Decide qué script ejecutar
  4. Lo ejecuta en el sistema
  5. Evalúa el resultado
  6. Informa al usuario
```

> No solo predice texto — está **tomando decisiones y ejecutando herramientas** en tu máquina. Cada acción que ejecuta también consume espacio en el contexto.

---

## 7. Skills: capacidades de los agentes

### Qué es una skill

> Una skill es una **capacidad específica** que puede tener un agente de IA para realizar algún tipo de acción.

### Ejemplos de skills

| Skill | Qué permite |
|---|---|
| Buscar en la web | Investigar información actualizada |
| Predicción del clima | Consultar datos meteorológicos |
| Query a base de datos | Ejecutar consultas SQL |
| Desarrollo frontend | Generar componentes UI |

### Cómo funcionan

```
SIN skills:
  → Toda la información tiene que estar en el prompt
  → El modelo tiene que "saberlo todo"
  → El contexto se llena rápido

CON skills:
  → El modelo DECIDE dinámicamente cuándo invocar una skill
  → La skill solo se carga en contexto cuando se necesita
  → Gestión más eficiente del contexto
```

### En Cloud Code

```
Comando: /skills
Muestra: lista de skills instaladas
Ubicación: carpeta local de configuración
```

### Ventaja clave

> Si el modelo no va a necesitar llamar a la base de datos, **no necesita tener el conocimiento de cómo hacerlo incorporado** en su memoria. Las skills se cargan bajo demanda.

---

## 8. MCP: Model Context Protocol

### El problema que resuelve

```
Sin estándar:
  → Herramienta A tiene su propia forma de conectarse a la IA
  → Herramienta B tiene otra forma diferente
  → Cada vez que cambia el modelo o la herramienta, hay que reimplementar

MCP = Estándar universal de comunicación IA ↔ herramientas
```

### Definición

```
MCP = Model Context Protocol

Objetivo: Igual que REST o GraphQL son estándares para APIs web,
          MCP es el estándar para que diferentes modelos de IA
          se comuniquen con herramientas de software.
```

### Qué permite

| Capacidad | Ejemplo |
|---|---|
| **Conexión a base de datos** | El modelo consulta datos reales |
| **Conexión a APIs web** | Interactuar con servicios externos |
| **Gestión de calendario** | Consultar/modificar Google Calendar |
| **Gestión de email** | Leer y enviar emails |

### En Cloud Code

```
Comando: /mcp
Muestra: servidores MCP instalados

Ejemplos de MCP del creador del video:
  - Gmail MCP
  - Google Calendar MCP
```

### Relación Skills ↔ MCP

```
SKILL  = Define el QUÉ puede hacer (la habilidad)
         "Puedo buscar en la web"

MCP     = Le da el CÓMO hacerlo (el puente/interface)
         "Para buscar en la web, usa este protocolo MCP
          que conecta con el servidor de búsqueda"
```

---

## 9. Skills vs MCP vs Agentes: resumen

| Concepto | Qué es | Analogía |
|---|---|---|
| **LLM** | El "cerebro" que predice tokens | El motor |
| **Agente** | Programa que percibe + piensa + actúa usando un LLM | El vehículo completo |
| **Skill** | Capacidad específica que puede invocar un agente bajo demanda | Herramienta en el maletero |
| **MCP** | Protocolo estándar que conecta la IA con herramientas externas | El interfaz USB universal |

### Cómo se combinan

```
┌─────────────────────────────────────────────────┐
│                    AGENTE                        │
│  ┌─────────────┐     ┌────────────────────────┐ │
│  │  LLM        │─────│ Skills (capacidades)    │ │
│  │  (cerebro)  │     │  - buscar web           │ │
│  │             │     │  - predecir clima        │ │
│  │             │     └────────────────────────┘ │
│  │             │     ┌────────────────────────┐ │
│  │             │─────│ MCP (protocolos)        │ │
│  │             │     │  - base de datos         │ │
│  │             │     │  - Google Calendar       │ │
│  └─────────────┘     └────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 10. El panorama actual del desarrollo con IA

### La velocidad de cambio

| Hace 2-3 años | Hoy |
|---|---|
| Mejor editor de código | Mejor modelo de IA |
| Mejores herramientas de test | Mejores skills y MCPs |
| Autocompletado con IA | Agentes que ejecutan tareas completas |
| Un agente por sesión | 10+ agentes en paralelo |

### La recomendación: distancia y pragmatismo

> Para evitar volverte loco, tienes que intentar verlo a una cierta distancia. Ir agarrando las cosas que más o menos te interesen, porque si no cada dos meses estás cambiando todas las herramientas.

### El riesgo de seguir cada novedad

```
Cada pocos meses parece que la forma de programar cambia completamente.
→ No intentes seguirlo todo
→ Elige lo que te sea útil y profundiza en eso
→ Las metodologías que se asientan valen más que la última herramienta
```

### La metodología que sí se está asentando: SDD

> Una de las metodologías que sí se está empezando a asentar es el **Spec-Driven Development (SDD)** — desarrollo basado en especificaciones — que se detalla en el video relacionado.

---

## 11. Glosario

| Término | Definición |
|---|---|
| **LLM (Large Language Model)** | Modelo de lenguaje grande: función que predice el siguiente token basándose en el historial previo |
| **Token** | Unidad mínima de procesamiento de un LLM (~palabra, pero a veces dividido en varios tokens) |
| **Token ID** | Número interno que representa cada token (los LLMs trabajan con números, no texto) |
| **Red neuronal** | Modelo matemático inspirado en conexiones cerebrales, usado para aprender y predecir |
| **Transformer** | Arquitectura neuronal (2017) con mecanismo de atención que permite modelar relaciones entre cualquier par de tokens |
| **Mecanismo de atención** | Permite calcular el peso/importancia de la relación entre cada par de tokens en una secuencia |
| **Entrenamiento** | Proceso de ajustar los pesos de una red neuronal pasándole datos de ejemplo hasta que predice correctamente |
| **Set de entrenamiento** | Conjunto de datos usado para entrenar un modelo (libros, web, código...) |
| **Ventana de contexto** | Memoria limitada del modelo donde entran los tokens de entrada y salida |
| **Degradación del contexto** | Efecto por el cual el modelo rinde peor cuanto más lleno está el contexto (empieza ~20%) |
| **Summarization** | Técnica de comprimir tokens que van a desaparecer en una representación más pequeña |
| **Agente de IA** | Programa que percibe entorno + piensa (usa LLM) + ejecuta acciones en bucle |
| **Skill** | Capacidad específica que un agente puede invocar bajo demanda (ej: buscar web, consultar clima) |
| **MCP (Model Context Protocol)** | Estándar de comunicación entre modelos de IA y herramientas externas (base de datos, APIs, etc.) |
| **Prompt** | Texto de entrada que se le da a un LLM para que genere una respuesta |

---

## 12. Recursos mencionados

| Recurso | Enlace |
|---|---|
| Tokenizer de OpenAI | Ver descripción del video |
| Visualizador de redes neuronales | Ver descripción del video |
| Video de 3Blue1Brown (arquitectura Transformers) | Ver descripción del video |
| Video de Spec-Driven Development | Relacionado en la descripción |

---

## Mapeo a Spec-Harness

| Idea del Video | Artifact Spec-Harness |
|----------------|-----------------------|
| LLM predice tokens, no "piensa" | Harness discipline: verification over claims |
| Ventana de contexto limitada (~20% degrada) | `references/context-minimization.md` + `skills/context-engineer/SKILL.md` |
| Agente = percibir + pensar + actuar en bucle | Spec-Harness agents (spec-author, implementer, reviewer, etc.) |
| Skills se cargan bajo demanda (no siempre en contexto) | 15 skills independientes, solo se carga el que se necesita |
| MCP = estándar universal IA ↔ herramientas | `rules/common/mcp.md` + integraciones context7, graphify |
| SDD como metodología que se está asentando | Base de todo Spec-Harness: spec → implement → verify → loop |

---

*Fuente: Video de YouTube — "Todo lo que necesitas saber sobre el desarrollo con IA"*