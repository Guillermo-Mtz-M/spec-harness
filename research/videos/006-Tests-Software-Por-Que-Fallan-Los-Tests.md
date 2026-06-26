# ¿Estamos haciendo MAL los tests de software?

> Resumen estructurado del video sobre filosofía de testing, tipos de pruebas, la pirámide de testing, la trampa del coverage y las recomendaciones prácticas para escribir tests efectivos.

---

## 1. La filosofía del testing: detectar errores antes que los usuarios

El testing no consiste en **comprobar que funciona**, sino en **asegurarse de que no se rompe**. La diferencia es sutil pero fundamental:

| Enfoque | Objetivo | Problema |
|---|---|---|
| Testear que funciona | Verificar el camino feliz | Ignora los casos de error |
| Testear que no se rompe | Verificar que los errores no suceden | Protege contra regresiones futuras |

> El testing es una **malla de seguridad**, un airbag que evita que te estrelles cuando haces cambios en el código.

### El camino feliz vs. los casos de error

Ejemplo: plataforma de e-commerce con carro de compra.

| Camino feliz | Casos de error |
|---|---|
| Usuario selecciona producto → lo añade al carrito → paga | Se añade el producto equivocado al carrito |
| Todo funciona según lo esperado | El número de productos no coincide |
| | El precio cobrado difiere del mostrado en la interfaz |
| | El carrito no pertenece al usuario que generó la compra |

> No basta con comprobar que el usuario es capaz de comprar. Hay que comprobar que esos errores **no suceden**.

---

## 2. Tipología de tests

### Evolución: de manual a automatizado

| Tipo | Descripción | Escalabilidad |
|---|---|---|
| **Testing manual** | El desarrollador prueba la aplicación desde el navegador o CLI | Muy baja. A más código, más pruebas manuales necesarias |
| **Testing automatizado** | Las pruebas se programan en scripts y se ejecutan solas | Alta. Se añaden pruebas sin coste de tiempo recurrente |

### Clasificación por nivel de abstracción

| Tipo de test | Alcance | Velocidad | Ejemplo |
|---|---|---|---|
| **Unitarios** | Una función o unidad de trabajo | Muy rápida | `suma(1, 2) == 3` |
| **Integración** | Relación entre múltiples partes del sistema | Media-Lenta | Llamada a endpoint + verificación en base de datos |
| **E2E (End-to-End)** | Flujo completo simulando un usuario real | Muy lenta | Levantar navegador → hacer clic → verificar resultado |

### Herramientas por lenguaje

| Lenguaje | Unitarios | E2E |
|---|---|---|
| JavaScript / TypeScript | Jest / Vitest | Selenium, Cypress |
| Python | PyTest | Selenium, Playwright |

---

## 3. El concepto de Mock

Un **mock** es una representación simulada de un sistema externo (base de datos, API, servicio) utilizado para testear sin depender del sistema real.

```
[Test unitario]  →  [Mock de base de datos]  →  [Resultado verificado]
                     (implementado vía polimorfismo)
```

| Ventaja | Desventaja |
|---|---|
| No necesitas levantar servicios reales | Mantienes una simulación que puede desactualizarse |
| Tests más rápidos y aislados | Puedes tener una **seguridad falsa** si el mock no refleja el comportamiento real |

### Opinión del autor: mocks vs. contenedores reales

> Prefiero tests de integración **sin mocks**, levantando servicios reales (Docker, Testcontainers) en lugar de simularlos. Así las pruebas son más reales y no generan una falsa sensación de seguridad.

| Enfoque | Herramienta | Realismo |
|---|---|---|
| Mocks | Polimorfismo, librerías de mock | Bajo (simulación) |
| Contenedores reales | Testcontainers, Docker | Alto (servicio real) |

---

## 4. La pirámide de testing

### Modelo clásico

```
            ┌─────────────┐
            │   Test E2E   │  ← Pocos, muy lentos
            ├─────────────┤
            │  Integración  │  ← Menos, costo medio
            ├─────────────┤
            │   Unitarios   │  ← Muchos, rápidos y baratos
            └─────────────┘
```

| Nivel | Proporción | Coste | Velocidad |
|---|---|---|---|
| Unitarios | Muchos | Bajo | Muy rápida |
| Integración | Menos | Medio | Media |
| E2E | Pocos | Alto | Muy lenta |

**Justificación**: los tests unitarios son baratos y rápidos, por lo que deben ser la base. Los E2E son los más lentos (simulan un usuario real), por lo que deben ser los menos.

---

## 5. Opinión controvertida: tests de integración sin mocks

### El problema de los tests unitarios

Los tests unitarios están **muy acoplados** al código de producción. Si refactorizas la implementación interna, tienes que modificar también los tests.

```
[Clase Calculadora]
  - suma(a, b)
  - resta(a, b)
  - multiplicar(a, b)

[Test unitario] → testea suma(), resta(), multiplicar() directamente

[Refactor: elimino suma() → añado calcular()]
  → Tengo que reescribir los tests ✘
```

### La alternativa: tests de integración contra la API

El autor prefiere tests que actúan como un **cliente de la API**, no contra la implementación interna:

```
[Test de integración]
  1. POST /users → crea usuario
  2. GET /users/{id} → verifica que fue creado
```

| Ventaja | Explicación |
|---|---|
| **Estabilidad** | Puedo refactorizar controladores, eventos, arquitectura interna sin tocar los tests |
| **Detección real** | Si rompo algo interno, el test lanza una alarma |
| **Flexibilidad** | Los tests validan el comportamiento externo, no la estructura interna |

### Comparativa

| Aspecto | Test unitario | Test de integración (sin mocks) |
|---|---|---|
| Acoplamiento | Alto (pegado a la implementación) | Bajo (pegado al comportamiento externo) |
| Mantenimiento al refactorizar | Hay que cambiar tests | Los tests no cambian |
| Herramienta recomendada | — | Testcontainers |
| Realismo | Bajo (mocks) | Alto (servicios reales) |
| Velocidad | Muy rápida | Media |

### ¿Por qué sin mocks?

> En el momento en que mantienes una simulación de algo, cuando quieras cambiar ese algo, tendrás que actualizar también la simulación. Con Testcontainers levantas un PostgreSQL real en los propios tests.

---

## 6. La trampa del coverage

### ¿Qué es el coverage?

El **coverage** (cobertura) es la cantidad de líneas o funciones que tus tests recorren al ejecutarse. Indica qué partes del código están testeadas y cuáles no.

### El ejemplo que lo explica todo

```python
def suma(a, b):
    return 3  # Implementación incorrecta

def test_suma():
    assert suma(1, 2) == 3  # Pasa ✔
```

| Métrica | Resultado | Realidad |
|---|---|---|
| Test en verde | Pasa | Función incorrecta |
| Coverage | 100% | No testea lo que debería |

**Conclusión**: un 100% de coverage no implica calidad. Es mejor tener un 70-80% de coverage con tests bien diseñados que un 100% con tests que no verifican lo correcto.

### Coverage como intuición, no como objetivo

| Buena práctica | Mala práctica |
|---|---|
| Usar coverage como indicador de zonas no testeadas | Perseguir el 100% como objetivo |
| Priorizar la calidad del test sobre la cobertura | Generar tests con IA solo para subir el porcentaje |

> En la era de la IA, hacer muchos tests es barato, pero no siempre testean lo que deberíamos estar testeando.

---

## 7. Recomendaciones prácticas: qué testear

### Prioridad: primero los casos de error, luego el camino feliz

| Orden | Tipo de test | Ejemplo en e-commerce |
|---|---|---|
| 1.º | Caso erróneo | El producto en el carrito no es el seleccionado |
| 2.º | Caso erróneo | El número de productos no coincide |
| 3.º | Caso erróneo | El carrito pertenece a otro usuario |
| 4.º | Caso erróneo | El precio cobrado difiere del mostrado |
| ... | ... | ... |
| Último | Camino feliz | El usuario completa la compra correctamente |

### Principios de diseño de tests

| Principio | Aplicación |
|---|---|
| **Testea lo que se puede romper** | No testees lo obvio, testea los puntos de fallo |
| **Caso de error primero** | Los tests de error aportan más valor que los del camino feliz |
| **Diseño antes que cantidad** | Dedicar tiempo a pensar qué testear, no a escribir tests por escribir |
| **Tests como contrato con la IA** | Los tests definen lo que la IA tiene que construir correctamente |

---

## 8. Testing y entrevistas de IA

### Los tests como contrato con la inteligencia artificial

Los tests son el mecanismo de verificación de que lo que la IA construye es correcto. En el contexto de **harness engineering** (arneses de IA), la capa de comprobación se apoya en la suite de testing.

```
[Humano define tests]  →  [IA implementa código]  →  [Tests verifican el resultado]
      (contrato)              (ejecución)               (comprobación)
```

> La IA puede escribir tests, pero tú los tienes que **pensar, diseñar y curar** como desarrollador.

### Cita de Robert C. Martin (Clean Code)

> *"El código de test es más importante que el código de producción. No es código de segunda clase, necesita pensamiento, diseño y cuidado. Se tiene que mantener tan limpio como el código productivo."*

---

## 9. Resumen de las tesis del video

| # | Tesis | Argumento |
|---|---|---|
| 1 | Testea que no se rompe, no que funciona | Protege contra regresiones futuras |
| 2 | Prioriza los casos de error sobre el camino feliz | Los errores son los que generan problemas reales |
| 3 | Prefiere tests de integración sin mocks | Más estables, menos acoplados, más reales |
| 4 | Usa Testcontainers en lugar de mocks | Pruebas contra servicios reales, sin seguridad falsa |
| 5 | No persigas el 100% de coverage | El coverage es intuición, no objetivo |
| 6 | Dedica tiempo al diseño de tests | Más importante que la cantidad de tests |
| 7 | Los tests son tu contrato con la IA | Verifican que la IA construye lo correcto |
| 8 | El código de test es de primera clase | Requiere pensamiento, diseño y cuidado |

---

## 10. Glosario de términos

| Término | Definición |
|---|---|
| **Camino feliz** | Flujo del código en el que todo sucede como se espera, sin errores |
| **Caso de error** | Flujo del código en el que algo falla o se comporta de forma inesperada |
| **Test unitario** | Prueba que verifica una única unidad de trabajo (función) de forma aislada |
| **Test de integración** | Prueba que verifica la relación entre múltiples partes del sistema |
| **Test E2E** | Prueba que simula el comportamiento de un usuario real (navegador, clics) |
| **Mock** | Representación simulada de un sistema externo usada en tests |
| **Coverage** | Métrica que indica qué porcentaje del código es recorrido por los tests |
| **Testcontainers** | Herramienta para levantar servicios reales (BD, brokers) dentro de los tests |
| **Pirámide de testing** | Modelo que establece la proporción ideal: muchos unitarios, menos integración, pocos E2E |
| **Harness Engineering** | Práctica de equipar agentes de IA con herramientas y verificaciones |
| **Regresión** | Fallo que aparece en funcionalidad que antes funcionaba tras un cambio en el código |

---

## Mapeo a Spec-Harness

| Idea del Video | Artifact Spec-Harness |
|----------------|-----------------------|
| Testea que no se rompe, no que funciona | `skills/mutation-test/SKILL.md` — mutation score ≥70% |
| Prioriza casos de error sobre camino feliz | `skills/implement/SKILL.md` — vertical slices con edge cases |
| Coverage como intuición, no objetivo | `skills/mutation-test/SKILL.md` — mutation score (no line coverage) como métrica real |
| Tests como contrato con la IA | EARS/Gherkin en SPEC.md → tests verifican implementación |
| "El código de test es de primera clase" (Uncle Bob) | `/tdd-loop` + `/mutation-test` como skills de primera clase |
| Pirámide de testing (muchos unit, pocos E2E) | `skills/tdd-loop/SKILL.md` (unit) + `/ship` (integration) |

---

*Fuente: Video de YouTube — "¿Estamos haciendo MAL los tests de software?"*
