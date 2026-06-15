# Ejemplo 02: API Rate Limiter

Segundo ejemplo — esta vez un caso más simple: un rate limiter para una API REST.

## El Escenario

Se necesita proteger los endpoints de una API REST contra abuse (mismo cliente haciendo demasiadas requests). No es un feature completo — es un componente reutilizable.

> Este ejemplo muestra cómo el flujo funciona para componentes, no solo features de usuario.

---

## Paso 1: `/grill-me` (resumido)

```
A: "¿Qué protege este rate limiter?"
U: "Endpoints de la API. Límite de 100 requests/minuto por API key."

A: "¿Qué pasa cuando se excede?"
U: "Devuelve 429 Too Many Requests con Retry-After header."

A: "¿Necesitan granularidad diferente? ¿Por IP, por usuario, por API key?"
U: "Por API key. Cada cliente tiene una key única."

A: "¿Es por-request o por-segundo?"
U: "Por minuto — sliding window de 1 minuto."

A: "¿Cuál es el slice mínimo?"
U: "Un middleware Express que usa una sliding window por API key, 100 req/min, devuelve 429 con Retry-After."
```

---

## Paso 2: SPEC.md generado

```markdown
# SPEC — API Rate Limiter Middleware

## REQ-001: Rate limit por API key
When a request arrives with an API-Key header, the system shall count requests within a sliding window of 1 minute.
If the count exceeds 100, the system shall return 429 with Retry-After header.

## REQ-002: Requests sin API key
If a request arrives without an API-Key header, the system shall allow the request (fail-open).
```

> **Nota:** Este spec es más pequeño — solo 2 requisitos. El flujo completo de Review → TDD Loop → Judge → Mutation Test → Ship aplica igual. Un spec pequeño no significa menos rigor.

---

## Insights de este Ejemplo

### Lo que aprendimos

1. **Specs pequeñas son válidas** — 2 EARS requisitos para un middleware reutilizable. No necesitan ser features de usuario completas.
2. **Fail-open vs fail-closed** — Para rate limiting, fail-open tiene sentido (no bloqueamos requests legítimos por problemas del limitador).
3. **Sliding window** — Implementado con Redis o un Map en memoria. Para el ejemplo, usamos `Map` en memoria con cleanup automático.

### Diferencias con Ejemplo 01

| Aspecto | Ejemplo 01 (Auth) | Ejemplo 02 (Rate Limiter) |
|---------|-------------------|---------------------------|
| Spec size | 4 requisitos | 2 requisitos |
| Grilling sessions | 1 larga | 1 corta |
| Team involved | Humano revisando | Humano revisando |
| Deployment scope | Feature completo | Componente reutilizable |
| Time to implement | ~4 horas | ~1 hora |

### El punto clave

**El flujo Spec-Harness escala.** No importa si es un sistema de auth de 50 requisitos o un middleware de 2 — el proceso es el mismo: entrevistar, especificar, grill-me, implementar con TDD, judge review, mutation test, ship.

---

## Archivos del Ejemplo 02

```
examples/02-api-rate-limit/
├── SPEC.md              ← EARS/Gherkin del rate limiter
└── README.md            ← Este archivo
```

(El código y artefactos completos están en `examples/02-api-rate-limit/` — contribución bienvenida para completar este ejemplo.)