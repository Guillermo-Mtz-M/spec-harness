# Ejemplo: User Authentication System

Walkthrough completo del flujo Spec-Harness construyendo un sistema de autenticación de usuario.

## El Escenario

Un equipo necesita un sistema de login básico con email y contraseña. Quieren proteger un endpoint REST existente.

---

## Paso 1: `/grill-me`

> **Conversación del agente:**
>
> **Agent:** "¿Qué problema resuelve esto para el usuario final?"
>
> **You:** "Los usuarios necesitan acceder a su cuenta personal de forma segura."
>
> **Agent:** "¿Quiénes son los usuarios? ¿Qué nivel de habilidad tienen?"
>
> **You:** "Usuarios finales de una app SaaS. Heterogéneos — algunos técnicos, otros no."
>
> **Agent:** "¿Cómo es el éxito? Sé específico."
>
> **You:** "Un usuario puede registrarse con email/password, hacer login, y acceder a contenido protegido. Si introduce mal la contraseña 5 veces, la cuenta se bloquea 15 minutos."
>
> **Agent:** "¿Qué pasa cuando falla? ¿Cuál es la experiencia degradada?"
>
> **You:** "Error claro: 'Credenciales inválidas' sin revelar si el email existe o no. Cuenta bloqueada muestra 'Demasiados intentos, intenta en X minutos'."
>
> **Agent:** "¿Cuáles son los límites duros — cosas que NO haremos?"
>
> **You:** "No SSO, no 2FA todavía, no OAuth. Solo email/password básico."
>
> **Agent:** "¿Cuál es el slice más estrecho que entrega valor?"
>
> **You:** "Login básico con bloqueo por intentos fallidos. Registro viene después."

---

## Paso 2: `/spec-author` → SPEC.md

Ver: [`SPEC.md`](SPEC.md)

---

## Paso 3: Spec Review

Ver: [`REVIEW.md`](REVIEW.md) (veredicto de claridad y testabilidad del spec)

---

## Paso 4: Implementación

Ver los commits en el branch `feature/user-auth`:

```bash
git log --oneline feature/user-auth

abc123 feat(auth): REQ-002 agregar login con email y password
def456 feat(auth): REQ-003 logout invalida session token
789abc feat(auth): REQ-004 lockout por 5 intentos fallidos
```

---

## Paso 5: Judge Review (Implementación vs Spec)

Ver: [`REVIEW.md`](REVIEW.md) — veredicto del judge sobre si el código cumple la spec. En este caso: APPROVED.

---

## Paso 6: Mutation Testing

Ver: [`MUTATION_REPORT.md`](MUTATION_REPORT.md)

---

## Paso 7: Ship

```bash
git checkout main
git merge feature/user-auth --squash
git commit -m "feat(auth): user authentication with lockout

Implements:
- Login con email/password (REQ-001, REQ-002)
- Logout que invalida session (REQ-003)
- Lockout de 15min tras 5 intentos fallidos (REQ-004)
- Tests: 23 passing, mutation score 84%

Human gates: SPEC approved, RESULT approved"
```

---

## Archivos del Ejemplo

```
examples/01-user-auth/
├── SPEC.md              ← Contrato EARS/Gherkin
├── REVIEW.md            ← Veredicto del spec review
├── JUDGE_REVIEW.md      ← Veredicto del judge (aprobado)
├── MUTATION_REPORT.md   ← Resultados de mutation testing
└── IMPLEMENTATION.md     ← Qué se implementó y cómo
```