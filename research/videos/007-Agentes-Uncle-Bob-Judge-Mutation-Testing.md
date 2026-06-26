# Implemento el sistema de Agentes de Uncle Bob, te lo muestro

> Resumen estructurado del video donde se implementa el flujo de trabajo con agentes de IA propuesto por Robert C. Martin (Uncle Bob), incluyendo especificación en Gherkin, TDD automatizado y mutation testing.

---

## 1. Contexto: Robert C. Martin y los flujos con IA

Robert C. Martin, autor de *Clean Code*, comparte frecuentemente experiencias de desarrollo asistido por IA. Uno de sus flujos recientes destaca por incluir una etapa poco habitual: **mutation testing**.

| Flujo tradicional | Flujo de Uncle Bob |
|---|---|
| Spec → Diseño → Tareas → Implementación → Revisión | Spec → Hard Spec → Gherkin → TDD → Juez → Mutation Testing |

---

## 2. Flujo de trabajo completo

### Visión general del proceso

```
[Spec inicial (escrita a mano)]
        ↓
[Agente IA → Hard Spec (especificación expandida)]
        ↓
[Agente IA → Gherkin (formato formal ejecutable)]
        ↓
[Humano revisa y aprueba]
        ↓
[Agente TDD → Tests en rojo → Código → Verde → Refactor]
        ↓
[Agente Juez → Revisa arquitectura y cobertura]
        ↓
[Agente Mutation Tester → Inyecta mutaciones → Verifica tests]
        ↓
[Ciclo cierra o vuelve a TDD según resultados]
```

### Fases detalladas

| # | Fase | Responsable | Descripción |
|---|---|---|---|
| 1 | **Spec inicial** | Humano | Escritura manual de la especificación sencilla |
| 2 | **Hard Spec** | Agente IA + Humano | El agente expande la spec con más casos y problemáticas; el humano debatidor participa |
| 3 | **Formalización Gherkin** | Agente IA | Convierte la Hard Spec en formato Gherkin ejecutable |
| 4 | **Aprobación humana** | Humano | Revisión de escenarios y validación antes de implementar |
| 5 | **Implementación TDD** | Agente IA | Ciclo rojo → verde → refactor por cada escenario |
| 6 | **Revisión (Juez)** | Agente IA | Comprueba cobertura, ciclos de refactor y calidad |
| 7 | **Mutation Testing** | Agente IA | Inyecta mutaciones en el código y verifica que los tests fallen |

---

## 3. Especificación: de Spec a Hard Spec

Robert C. Martin escribe una **spec sencilla a mano** y luego utiliza un agente de IA para expandirla en una **Hard Spec**: una especificación con más casos definidos, más problemáticas y mayor nivel de detalle.

> El humano no delega la especificación al 100%. El agente no implementa desde cero, sino que **debatidor**, pregunta y conversa hasta cerrar la especificación.

---

## 4. Formato Gherkin

La Hard Spec se convierte a **Gherkin**, un lenguaje formal para definir especificaciones ejecutables.

### Estructura de un archivo `.feature`

```
Feature: <nombre de la funcionalidad>
  <historia de usuario>

  Scenario: S1 - <nombre del escenario>
    Given <precondición>
    When <evento>
    Then <resultado esperado>
    And <resultado adicional>

  Scenario: S2 - ...
```

| Elemento | Significado | Ejemplo |
|---|---|---|
| `Feature` | Nombre de la funcionalidad | Filtrado de notas por fecha |
| `Scenario` | Caso de uso con ID único | S1 - Nota creada exactamente en la fecha dada |
| `Given` | Precondición / estado inicial | Dado un almacén de notas vacío |
| `When` | Acción que desencadena el evento | Cuando ejecuto el comando `ss` con fecha 2024-01-01 |
| `Then` | Resultado esperado | La salida estándar incluye la línea con esa nota |

---

## 5. Implementación con TDD automatizado

El agente **TDD Craftsman** sigue las tres leyes clásicas del TDD:

| Ley | Enunciado |
|---|---|
| **1.ª** | No se escribe código de producción salvo que sea para pasar un test que está fallando |
| **2.ª** | No se escriben más tests de los necesarios para fallar |
| **3.ª** | No se escribe más código de producción que el necesario para pasar el test |

### Ciclo TDD por escenario

```
[Escenario Gherkin S1]
        ↓
[Test en ROJO (fallo)]  ←  Se escribe el test
        ↓
[Código mínimo en VERDE]  ←  Implementación para pasar
        ↓
[REFACTOR]  ←  Mejora de arquitectura y organización
        ↓
[Siguiente escenario...]
```

El agente guarda en ficheros el progreso de cada ciclo (rojo → verde → refactor) para que otros agentes puedan revisarlo después (**handoff**).

---

## 6. Agente Juez: revisión de código extrema

El **agente Juez** actúa como un revisor estricto que comprueba:

- Que **cada escenario de Gherkin** tiene al menos un test implementado
- Que se han seguido los ciclos de refactorización
- Que el log de TDD muestra trazabilidad (rojo → verde por cada ciclo)

> No es una revisión superficial: lee los artefactos generados por el implementador (fichero de features, log de TDD y especificación) para tomar decisiones informadas.

### Ventaja del handoff entre agentes

| Problema sin handoff | Solución con handoff |
|---|---|
| Un agente acumula todo el contexto → uso masivo de tokens | Cada agente maneja un contexto limitado y guarda resultados en ficheros |
| Difícil rastrear qué hizo cada parte | Trazabilidad clara: cada agente deja artefactos legibles por el siguiente |

---

## 7. Mutation Testing: la etapa clave

### ¿Qué es el mutation testing?

Consiste en **inyectar pequeñas mutaciones** en el código fuente y verificar que los tests fallan. Si un test sobrevive a una mutación, significa que la suite de tests es incompleta.

> Es algo que los desarrolladores hacen de forma intuitiva: cambias una condición para ver si los tests capturan el error.

### Mutaciones implementadas por el script `mutate.py`

| Código original | Mutación aplicada |
|---|---|
| `<=` (menor o igual) | `<` (menor estricto) |
| `>=` (mayor o igual) | `>` (mayor estricto) |
| `==` (igual) | `!=` (diferente) |
| `and` | `or` |
| `True` | `False` |

### Flujo del Mutation Tester

```
[Ejecutar mutate.py sobre archivo de código]
        ↓
[Mutación aplicada: condición cambiada]
        ↓
[Ejecutar suite de tests]
        ↓
    ┌─ Tests FALLAN → Mutación detectada ✔ (bien)
    │
    └─ Tests SOBREVIVEN → Falta test para esa mutación ✘
        ↓
    [Handoff → TDD Craftsman: "Añade tests para esta mutación"]
```

### Responsabilidades del Mutation Tester

| Hace | No hace |
|---|---|
| Ejecutar el script de mutación | Arreglar los tests |
| Identificar tests supervivientes | Modificar el código de producción |
| Generar reporte y hacer handoff al TDD Craftsman | Decidir cuándo cerrar el ciclo |

---

## 8. Sistema de agentes: arquitectura completa

### Mapa de agentes

| Agente | Rol | Responsabilidad principal |
|---|---|---|
| **Craftsman Lead** | Orquestador | Define el flujo, el orden, descompone tareas |
| **Spec Partner** | Definidor de specs | Debate con el humano, expande la especificación |
| **Gherkin Author** | Formalizador | Convierte Hard Spec en formato Gherkin |
| **TDD Craftsman** | Implementador | Ciclo rojo → verde → refactor por escenario |
| **Juez** | Revisor | Valida cobertura y calidad del código |
| **Mutation Tester** | Verificador | Inyecta mutaciones y reporta supervivientes |

### Diagrama de interacción

```
                    ┌─────────────────┐
                    │  Craftsman Lead  │
                    │  (orquestador)   │
                    └────────┬────────┘
                             │
         ┌───────────┬───────┼───────┬───────────┐
         ▼           ▼       ▼       ▼           ▼
   ┌──────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐ ┌──────────────┐
   │   Spec   │ │ Gherkin │ │   TDD   │ │  Juez  │ │   Mutation   │
   │  Partner │ │  Author │ │Craftsman│ │        │ │   Tester     │
   └────┬─────┘ └────┬────┘ └────┬────┘ └───┬────┘ └──────┬───────┘
        │            │           │           │             │
        ▼            ▼           ▼           ▼             ▼
   [Hard Spec]  [.feature]  [código +   [aprobación/  [reporte de
                              tests +     rechazo]    supervivientes]
                              log TDD]                  │
                                            handoff ──→ TDD
```

### Mecanismo de handoff

1. Cada agente guarda sus resultados en **ficheros** (markdown, logs, etc.)
2. El siguiente agente lee esos ficheros para tomar decisiones
3. Esto **limita el contexto** de cada agente, optimizando el consumo de tokens
4. Ejemplo: el Juez lee el log de TDD; el Mutation Tester hace handoff al TDD Craftsman si hay supervivientes

---

## 9. Demostración práctica

### Proyecto de ejemplo

- **Tipo**: Sistema de notas en Python con CLI
- **Feature a implementar**: Comando `ss` — filtrado de notas por fecha (notas creadas en o después de una fecha dada)
- **Resultado**: 9 escenarios Gherkin, implementados en ~8 minutos

### Decisiones de diseño (debate Spec Partner ↔ Humano)

| Decisión | Opción elegida |
|---|---|
| ¿Validar formato de fecha o fecha real? | Fecha real (validación estricta) |
| ¿Incluir hora exacta o solo día? | Solo día |

### Resultados del mutation testing

| Métrica | Resultado |
|---|---|
| Tests supervivientes | 4 (fuera del alcance de la feature) |
| Tests que fallaron ante mutaciones | Todos los del alcance de la feature |
| Veredicto | Suite de tests correcta |

---

## 10. Consideraciones prácticas

### Consumo de tokens

| Factor | Impacto |
|---|---|
| Múltiples agentes por tarea | Reduce contexto por agente, pero aumenta llamadas totales |
| Handoff entre agentes | Optimiza tokens vs. un solo agente con contexto enorme |
| Bucles de TDD + Mutation | Puede ser un consumidor elevado de tokens a largo plazo |

### Modo de uso recomendado

| Estilo | Descripción | Recomendado para |
|---|---|---|
| **Supervisado** | Ir revisando cada paso que ejecuta la IA | Proyectos donde importa la calidad del código |
| **Desatendido** | Aceptar todo y dejar que corra solo | Proyectos experimentales o de baja criticidad |

> No es un flujo diseñado para dejarlo 20 horas sin supervisión. Para usarlo de forma eficiente, conviene ir revisando lo que hace la IA.

---

## 11. Conceptos clave para el día a día

| Concepto | Aplicación práctica |
|---|---|
| **Mutation testing** | Automatizable con IA. Valida que tus tests realmente cubren los casos que crees cubrir. |
| **Handoff entre agentes** | Limitar contexto por agente y delegar con artefactos (ficheros) mejora eficiencia y trazabilidad. |
| **Spec debatida, no auto-generada** | La IA como partner que pregunta, no como generadora ciega. |
| **Gherkin como contrato** | Las specs en formato formal son ejecutables y sirven como fuente de verdad para TDD. |
| **Memoria en ficheros** | Guardar el progreso en markdown/logs permite que otros agentes (o humanos) lo consulten. |

---

## 12. Glosario de términos

| Término | Definición |
|---|---|
| **Hard Spec** | Especificación expandida y formalizada a partir de una spec inicial sencilla |
| **Gherkin** | Lenguaje formal para definir especificaciones ejecutables (Given/When/Then) |
| **TDD** | Test Driven Development — cyclo rojo → verde → refactor |
| **Mutation Testing** | Técnica que inyecta pequeñas mutaciones en el código para verificar la calidad de los tests |
| **Handoff** | Transferencia de contexto y tarea entre agentes mediante ficheros artefacto |
| **Craftsman Lead** | Agente orquestador que coordina el flujo global de trabajo |
| **Spec Partner** | Agente que debatidor con el humano para cerrar la especificación |
| **Gherkin Author** | Agente que convierte la Hard Spec en formato Gherkin |
| **TDD Craftsman** | Agente que implementa siguiendo el ciclo TDD |
| **Juez** | Agente que revisa la calidad, cobertura y ciclos de refactor |
| **Mutation Tester** | Agente que ejecuta mutaciones y reporta tests supervivientes |
| **Arnés (Harness)** | Ecosistema de herramientas, skills y MCPs que permiten a un agente de IA trabajar |
| **SDD** | Spec Driven Development — desarrollo guiado por especificaciones |

---

## Mapeo a Spec-Harness

| Idea del Video | Artifact Spec-Harness |
|----------------|-----------------------|
| Flujo: Spec → Hard Spec → Gherkin → TDD → Juez → Mutation | Core workflow: grill-me → spec-author (EARS+Gherkin) → implement → reviewer → mutation-test |
| Agente Juez (revisión de cobertura y calidad) | `agents/judge.md` — verificación de trazabilidad spec↔código |
| Mutation testing inyecta mutaciones → tests fallan ✔ | `skills/mutation-test/SKILL.md` — mutation score ≥70% |
| TDD: rojo → verde → refactor por escenario | `skills/tdd-loop/SKILL.md` — ciclo rojo-verde-refactor |
| Handoff entre agentes (ficheros artefacto) | `skills/handoff/SKILL.md` + `templates/HANDOFF.md` |
| Spec debatida con humano (no auto-generada) | `/grill-me` entrevista iterativa antes de spec-author |
| Gherkin como contrato ejecutable | `templates/SPEC.md` — EARS + Gherkin |
| Craftsman Lead orquesta 6 agentes | Spec-Harness usa `/using-spec-harness` como mapa de skills |

---

*Fuente: Video de YouTube — "Implemento el sistema de Agentes de Uncle Bob, te lo muestro"*
*Repositorio: branch `unklebob-harness` (disponible en descripción del video)*
