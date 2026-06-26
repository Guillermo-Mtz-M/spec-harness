# ¿Qué es esto del Harness Engineering?

> Resumen estructurado del video que explica qué son los arneses (harnesses), el concepto de Harness Engineering, los tres pilares fundamentales, y cómo construir un arnés práctico para desarrollo de software con IA.

---

## 1. El problema: código generado vs. código controlado

### La tendencia está invirtiéndose

```
Antes:  Escribir código era lo difícil → Leer código era lo frecuente
Ahora:  Escribir código es cada vez más fácil y rápido
        → Generamos muchísimo más código
        → Leerlo y controlarlo es cada vez más difícil
```

> Tenemos una máquina capaz de generar miles y miles de líneas de código. Y ahora nuestra responsabilidad es intentar controlar este caballo desbocado.

### Las mejoras en IA no vienen solo de mejores modelos

```
Gran parte de las mejoras en desarrollo con IA
NO han sido mejores modelos
SINO mejores entornos/entornos en los que los modelos se ejecutan
```

Estos entornos son los **arneses** (harnesses).

---

## 2. ¿Qué es un arnés (Harness)?

### Definición

> Harness Engineering = Práctica de construir un entorno, un ecosistema para controlar a un modelo de inteligencia artificial.

### Analogía del caballo

```
┌─────────────────────────────────────────┐
│  CABALLO = Modelo de IA                  │
│  ARNÉS    = Entorno que lo controla      │
│             (riendas + silla)            │
└─────────────────────────────────────────┘
```

### Los 4 componentes del entorno

| Componente | Función |
|---|---|
| **Contexto** | Qué información le enviamos al modelo |
| **Herramientas (Tools)** | Acciones que el modelo puede ejecutar |
| **Memoria** | Persistencia de lo que el modelo ha hecho y debe recordar |
| **Validación** | Mecanismo para verificar que el código generado es correcto |

### Beneficio clave: cambiar el cerebro sin cambiar el sistema

```
┌─────────────────────────────────────────────┐
│              ARNES (fijo)                    │
│  Contexto + Herramientas + Memoria + Validación │
└─────────────────────────────────────────────┘
          ↓ puedo cambiar
┌─────────┐   ┌─────────┐   ┌─────────┐
│Modelo A │   │Modelo B │   │Modelo C │
│(hoy)    │   │(mañana) │   │(futuro) │
└─────────┘   └─────────┘   └─────────┘
```

> Si tienes un buen arnés, puedes intercambiar el modelo de IA sin reescribir todo tu sistema.

---

## 3. La paradoja: menos es más

### El error común

```
Equipar al agente con herramientas hiperespecializadas
= Mejor rendimiento

❌ FALSO — La evidencia demuestra lo contrario.
```

### El caso Vercel / D0 (agente de Big Data)

**Primera aproximación** — Herramientas especializadas:
- Wrapper para queries SQL
- Conexión a bases de datos
- Herramientas de wrapper para razonamiento

**Resultado**: El modelo necesitaba ayuda excesiva, no funcionaba bien.

### El experimento: quitar los "ruedines"

```
Pregunta: ¿Y si le quitamos los ruedas a nuestro modelo
          y le dejamos ir por su cuenta?

Solución: Herramientas sencillas del ecosistema Unix
  - grep  → buscar entre ficheros
  - cat   → leer ficheros
  - ls    → listar directorios
  - stdlib → herramientas básicas
```

**Resultado**:

| Métrica | Antes (herramientas especializadas) | Después (herramientas simples) |
|---|---|---|
| **Velocidad** | 1x | >3x más rápido |
| **Consumo de tokens** | 100% | 37% menos |
| **Rendimiento general** | Pierde en todas las peticiones | Gana en todas |

> Artículo de Oversell: eliminaron el 80% de las tools y mejoró el rendimiento.

---

## 4. La degradación del contexto

### El problema conocido

```
Cuanto más tiempo usas una IA en sesiones largas,
más tonta se vuelve.
```

### Datos concretos

| Umbral | Qué pasa |
|---|---|
| **~20% del contexto** | Empieza la degradación |
| **~40% del contexto** | GitHub issue recomienda limpiar/resetear |
| **~100%** | Ventana llena, pero el daño ya empezó antes |

> Aunque las ventanas de contexto son mucho más grandes que antes, la degradación ocurre mucho antes de que se llenen.

### La solución: memoria externa

```
VENTANA DE CONTEXTO (cuadradito limitado dentro del modelo)
┌───────────────────────────────────┐
│  contexto interno del modelo      │
│  (se degrada, se llena)          │
└───────────────┬───────────────────┘
                │ Sacar información
                ▼
┌───────────────────────────────────┐
│  SISTEMA DE FICHEROS / BASE DE DATOS │
│  (memoria externa, ilimitada)    │
└───────────────────────────────────┘
```

### Cómo externalizar la memoria

| Qué | Dónde se guarda |
|---|---|
| Lista de tareas | `features.json` o Linear/Jira |
| Progreso actual | `/progress/current.md` |
| Historial de ejecuciones | `/progress/history.md` |
| Decisiones de diseño | Ficheros Markdown del proyecto |
| Estado de cada agente | Ficheros externos por sesión |

---

## 5. El problema de confianza y verificación

### La IA puede parecer correcta sin serlo

> La IA está entrenada para darte respuestas que parecen ciertas, pero no tienen por qué serlo.

### La pregunta clave

```
¿Cómo haces que la IA no simplemente diga que algo está hecho,
sino que realmente lo demuestre?
```

### Herramientas de verificación

| Método | Ejemplo |
|---|---|
| **Tests automatizados** | Crear tests que verifiquen el código |
| **Browser automation** | Levantarse un navegador (Playwright, Death Tools de Chrome) |
| **Ejecución real** | Correr el código y verificar output |
| **Revisor automático** | IA como agente revisor de código |

### El principio fundamental

> El código generado con IA es **verificable** — esa es la capacidad del desarrollo de software. Nunca hay que dejar que sea solo el agente quien diga que algo está hecho.

---

## 6. El sistema multiagente de Anthropic

### Cómo Anthropic usa Claude para investigar

```
┌─────────────┐
│   USUARIO   │  Query de investigación
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  AGENTE ORQUESTADOR │  (Crea y gestiona subagentes)
└──────┬──────────┘
       │ Delega iterativamente
       ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  SUBAGENTE 1    │  │  SUBAGENTE 2    │  │  SUBAGENTE N    │
│  Busca y guarda │  │  Busca y guarda │  │  Busca y guarda │
│  en memoria     │  │  en memoria     │  │  en memoria     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
       │
       ▼
┌─────────────┐
│   USUARIO   │  Respuesta final
└─────────────┘
```

### Evitar el "teléfono descompuesto"

```
❌ NO hacer: Subagente heredando todo el contexto del padre
✅ SÍ hacer: Cada subagente recibe SOLO lo que necesita
```

El agente padre crea subagentes pero **no les pasa todo su contexto**. Cada subagente tiene la información mínima para hacer su tarea.

---

## 7. Los tres pilares del Harness Engineering

### Pilar 1: El repositorio como sistema

```
┌──────────────────────────────────────────────────┐
│  El propio repositorio ES el sistema de arnés    │
│                                                  │
│  Ficheros del repo → Definen contexto y reglas   │
│  No dependes de la IA como chatbot               │
│  Montas el arnés dentro del propio proyecto      │
└──────────────────────────────────────────────────┘
```

### Pilar 2: Orquestación multiagente

```
Leader (orquestador)
  │
  ├── Implementer (escribe código)
  ├── Explorer (investiga)
  └── Reviewer (revisa código)
```

| Rol | Responsabilidad |
|---|---|
| **Leader** | Gestiona el flujo, lanza agentes, decide qué hacer |
| **Implementer** | Implementa código siguiendo la spec |
| **Explorer** | Investiga y guarda información en memoria |
| **Reviewer** | Aprueba o rechaza el trabajo del implementer |

### Pilar 3: Verificación + automejora

```
El arnés se verifica a sí mismo:
  → El Reviewer revisa el código
  → Si algo no cumple convenciones → se actualiza el arnés
  → El propio proyecto puede modificar su arnés
```

> Si el Reviewer se da cuenta de que faltan cosas por mejorar, puede **modificarse a sí mismo** — cambiar el prompt del implementer, actualizar convenciones, etc.

---

## 8. Estructura de un arnés práctico

### Estructura de directorios

```
proyecto/
├── agents.md              ← Punto de entrada (lo primero que entra en contexto)
├── init.sh                ← Script de inicialización
├── architecture.md        ← Documentación de arquitectura
├── conventions.md        ← Convenciones del proyecto
├── features.json          ← Lista de tareas pendientes
├── progress/
│   ├── current.md         ← Ejecución actual
│   ├── history.md         ← Historial de ejecuciones
│   └── (resultados por sesión)
├── agents/
│   ├── leader.md          ← Orquestador
│   ├── implementer.md    ← Implementador
│   └── reviewer.md        ← Revisor
└── (tu código)
```

### agents.md — Punto de entrada

```
agents.md = LO PRIMERO que entra en la ventana de contexto
```

Define:
1. Ejecutar `init.sh` antes de trabajar
2. Leer la lista de tareas (`features.json`)
3. Reglas: ej: "no declares done sin haber pasado los tests"
4. Mapa del repositorio para no tener que leer todo
5. Protocolo de comunicación entre agentes

### init.sh — Script de verificación

```
VERIFICA:
  ├─ Python instalado
  ├─ agents.md existe
  ├─ features.json existe
  ├─ Tests se ejecutan y pasan
  └─ Entorno listo para trabajar

SI FALLA → PARA. No trabajes en un entorno roto.
SI PASA  → Puedes empezar a trabajar.
```

---

## 9. Sistema de memoria en la práctica

### Guardar progreso entre sesiones

```
Carpeta: /progress/

current.md    → Qué está haciendo ahora mismo
history.md    → Registro de todo lo hecho
(resultados)  → Métricas, funciones añadidas, dependencias
```

### Evitar el teléfono descompuesto

```
Leader lanza subagente → Le dice EXPLÍCITAMENTE:
  "Escribe el resultado en /progress/current.md"

Así el siguiente agente NO tiene que leer todo el proyecto.
Solo lee progress/ y sabe exactamente qué ha pasado.
```

### Extensiones de memoria

| Almacenamiento | Cómo |
|---|---|
| **JSON local** (default) | `features.json`, `progress/*.md` |
| **SQLite local** | Cambio la forma de guardar, no el concepto |
| **Base de datos remota** | Memoria compartida entre agentes |
| **Linear / Jira** | MCP para leer tareas de un sistema externo |

---

## 10. El agente Reviewer

### Qué hace

```
Implementer termina una tarea
        ↓
Reviewer recibe el trabajo
        ↓
Reviewer se hace preguntas:
  ├─ ¿Respeta las convenciones del proyecto?
  ├─ ¿Respeta la arquitectura definida?
  ├─ ¿Los tests pasan?
  └─ ¿Todo tiene sentido?
        ↓
Reviewer aprueba o rechaza
  → Aprueba →Marca como DONE
  → Rechaza → Feedback al Implementer para corregir
```

### Automejora del Reviewer

```
El Reviewer puede modificarse a sí mismo:
  → Si ve que siempre falla en algo
  → Puede actualizar el agents.md
  → Puede actualizar conventions.md
  → Se automejora para la siguiente sesión
```

---

## 11. Hooks: automatización del ciclo de vida

### Ejemplo de hook

```
Hook: Al cerrar Cloud Code → ejecutar init.sh
```

> Así te aseguras de no dejar el proyecto en un estado fallido.

### Posibilidades de hooks

| Evento | Acción |
|---|---|
| **Al cerrar sesión** | Ejecutar `init.sh` para verificar estado |
| **Al iniciar sesión** | Leer `progress/current.md` y continuar |
| **Al terminar tarea** | Auto-commit, mover a history.md |
| **Al empezar nueva tarea** | Crear branch automáticamente |

---

## 12. El rol del desarrollador con un buen arnés

### Buenas prácticas + Experiencia + Buen arnés

```
Buenas prácticas de código
        +
Experiencia en programación
        +
Buen arnés en el equipo
        =
Máximo partido a la inteligencia artificial
```

### Por qué las buenas prácticas ayudan a la IA

```
Si tu proyecto sigue buenas prácticas:
  → Estructura clara y repetible
  → Todas las features construidas de la misma manera
  → La IA puede PREDECIR cómo montar nuevas features
  → El código nuevo que genera la IA también las seguirá
```

### Diferencia entre usar IA como chatbot vs. como sistema

| Como chatbot | Como sistema (con arnés) |
|---|---|
| Conversación libre | Protocolo estricto |
| Sin verificación | Tests y reviewer |
| Contexto degradado | Memoria externalizada |
| Sin estructura | Agentes especializados |
| Resultado impredecible | Resultado trazable y repetible |

---

## 13. Glosario

| Término | Definición |
|---|---|
| **Arnés (Harness)** | Entorno que rodea a un modelo de IA: contexto + herramientas + memoria + validación |
| **Harness Engineering** | Disciplina de construir y optimizar ese entorno |
| **Contexto** | Información que se envía a la ventana del modelo de IA |
| **Degradación de contexto** | Efecto por el cual la IA rinde peor cuanto más lleno está su contexto (empieza ~20%) |
| **Memoria externa** | Guardar información del modelo en ficheros/BD fuera de la ventana de contexto |
| **Teléfono descompuesto** | Pérdida de información cuando agentes no comunican correctamente |
| **Orquestador / Leader** | Agente principal que lanza y gestiona subagentes |
| **Subagente** | Agente hijo creado por el orquestador con contexto mínimo |
| **Reviewer** | Agente que valida el código generado contra convenciones y tests |
| **Init.sh** | Script de verificación que decide si el entorno está listo para trabajar |
| **agents.md** | Punto de entrada al arnés — primera cosa que entra en el contexto |
| **features.json** | Lista estructurada de tareas pendientes |
| **Hook** | Script que se ejecuta automáticamente en un evento del ciclo de vida |

---

## 14. Recursos y siguiente paso

### Video relacionado

> Este vídeo es la base para el vídeo de **Spec-Driven Development (SDD)**, donde se muestra cómo implementar un arnés SDD completo en la práctica.

### Repositorio

El código de ejemplo del arnés está disponible en la descripción del vídeo para descargarlo y experimentar.

---

## Mapeo a Spec-Harness

| Idea del Video | Artifact Spec-Harness |
|----------------|-----------------------|
| 3 pilares (guardrails, context, verification) | Arquitectura core: `references/harness-principles.md` |
| Repositorio como sistema de arnés | WORKFLOW/ es el repo que define el harness |
| Multiagente: Leader → Implementer → Reviewer | 5 agents: spec-author, implementer, judge, mutation-tester, council-chairman |
| Memoria externa (progress/, features.json) | `skills/handoff/SKILL.md` + `templates/HANDOFF.md` |
| Reviewer auto-mejora (modifica convenciones) | Reviewer `/reviewer` + `/council-review` con retroalimentación |
| Init.sh: verificar entorno antes de trabajar | `scripts/install.js` + `scripts/validate.js` |
| "Menos es más" (quitar tools especializadas) | Skills pequeñas y compositivas; cada una hace una cosa bien |
| Degradación de contexto ~20% | `references/context-minimization.md` — 4-layer stack progressive loading |
| "Teléfono descompuesto" (no pasar todo el contexto) | `/handoff` pasa contexto mínimo entre agentes |

---

*Fuente: Video de YouTube — "¿Qué es esto del Harness Engineering?"*
*Repositorio: disponible en la descripción del video*