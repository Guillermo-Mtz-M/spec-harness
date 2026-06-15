# SPEC — User Authentication System

> Spec-Driven Development artifact. Every line of code traces back to a requirement here.

## Overview

Sistema de autenticación básico con email y contraseña para una app SaaS. Protege endpoints REST existentes. Incluye lockout por intentos fallidos.

## Requirements

### REQ-001: Registro de usuario

**EARS Pattern:** Ubiquitous

**The system shall allow users to register with email and password:**

El usuario proporciona email válido y contraseña (mín. 8 caracteres, al menos 1 número). El sistema valida que el email no existe previamente. Al registrar, genera un session token y lo devuelve.

**Gherkin Scenarios:**

```gherkin
Feature: User Registration

  Scenario: Registro exitoso con email y password válidos
    Given el usuario no existe en el sistema
    When el usuario envía POST /auth/register con email "user@example.com" y password "secure123"
    Then el sistema crea el usuario
    And devuelve status 201
    And devuelve un session_token

  Scenario: Registro falla con email ya existente
    Given el usuario "user@example.com" ya existe
    When el usuario envía POST /auth/register con email "user@example.com" y password "secure123"
    Then el sistema devuelve status 409
    And devuelve error "email_already_exists"

  Scenario: Registro falla con password débil
    Given el usuario no existe
    When el usuario envía POST /auth/register con email "user@example.com" y password "weak"
    Then el sistema devuelve status 400
    And devuelve error "password_too_weak"

  Scenario: Registro falla con email inválido
    Given el usuario no existe
    When el usuario envía POST /auth/register con email "not-an-email" y password "secure123"
    Then el sistema devuelve status 400
    And devuelve error "invalid_email"
```

**Verification:**
- [ ] Unit test: validar_email_rechaza_invalidos
- [ ] Unit test: validar_password_rechaza_debil
- [ ] Integration test: registro_crea_usuario_y_devuelve_token
- [ ] Integration test: registro_email_existente_devuelve_409

---

### REQ-002: Login de usuario

**EARS Pattern:** Event-Driven

**The system shall authenticate users with email and password:**

Dado un email y password válidos, el sistema verifica credenciales y devuelve un session token. Si las credenciales son inválidas, devuelve error genérico "invalid_credentials" sin indicar si el email existe.

**Gherkin Scenarios:**

```gherkin
Feature: User Login

  Scenario: Login exitoso con credenciales válidas
    Given el usuario "user@example.com" existe con password "secure123"
    When el usuario envía POST /auth/login con email "user@example.com" y password "secure123"
    Then el sistema valida las credenciales
    And devuelve status 200
    And devuelve un session_token

  Scenario: Login falla con password incorrecto
    Given el usuario "user@example.com" existe con password "secure123"
    And el usuario no está bloqueado
    When el usuario envía POST /auth/login con email "user@example.com" y password "wrongpassword"
    Then el sistema devuelve status 401
    And devuelve error "invalid_credentials"
    And NO indica si el email existe

  Scenario: Login falla con email no registrado
    Given ningún usuario existe con email "unknown@example.com"
    When el usuario envía POST /auth/login con email "unknown@example.com" y password "anypassword"
    Then el sistema devuelve status 401
    And devuelve error "invalid_credentials"

  Scenario: Login falla para usuario bloqueado
    Given el usuario "user@example.com" tiene 5 intentos fallidos en los últimos 15 minutos
    When el usuario envía POST /auth/login con email "user@example.com" y password "secure123"
    Then el sistema devuelve status 429
    And devuelve error "account_locked"
    And incluye segundos hasta desbloqueo
```

**Verification:**
- [ ] Unit test: authenticate_returns_token_for_valid_credentials
- [ ] Unit test: authenticate_returns_error_without_email_hint
- [ ] Integration test: login_activa_lockout_tracking
- [ ] Integration test: login_bloqueado_devuelve_429

---

### REQ-003: Logout

**EARS Pattern:** Event-Driven

**The system shall invalidate the session token on logout:**

El usuario autenticado envía POST /auth/logout con su session token. El sistema invalida el token. Tokens subsecuentes con ese token devuelven 401.

**Gherkin Scenarios:**

```gherkin
Feature: User Logout

  Scenario: Logout exitoso invalida el token
    Given el usuario tiene un session_token válido
    When el usuario envía POST /auth/logout con el session_token
    Then el sistema invalida el token
    And devuelve status 204
    And el token ya no es válido para requests subsecuentes

  Scenario: Logout con token ya inválido
    Given el usuario tiene un session_token que ya fue invalidado
    When el usuario envía POST /auth/logout con el session_token
    Then el sistema devuelve status 401
```

**Verification:**
- [ ] Unit test: logout_invalida_token_en_store
- [ ] Integration test: token_invalido_despues_de_logout
- [ ] Integration test: logout_con_token_ya_invalido_devuelve_401

---

### REQ-004: Bloqueo por intentos fallidos

**EARS Pattern:** State-Driven + Unwanted Behavior

**While the user has 5+ failed login attempts in the last 15 minutes, the system shall reject login attempts:**

Cada intento de login fallido se registra con timestamp. Si hay 5+ intentos fallidos para el mismo email en los últimos 15 minutos, el login se rechaza con código 429 hasta que pasen 15 minutos desde el último intento fallido.

**Gherkin Scenarios:**

```gherkin
Feature: Account Lockout

  Scenario: Quinta intento fallido activa lockout
    Given el usuario tiene 4 intentos fallidos en los últimos 15 minutos
    When el usuario envía POST /auth/login con password incorrecto
    Then el sistema devuelve status 429
    And devuelve error "account_locked"
    And incluye "retry_after_seconds"

  Scenario: Login exitoso limpia historial de intentos fallidos
    Given el usuario tiene 3 intentos fallidos sin lockout
    When el usuario envía POST /auth/login con credenciales correctas
    Then el login es exitoso
    And el contador de intentos fallidos se resetea a 0

  Scenario: Lockout expira después de 15 minutos
    Given el usuario está bloqueado por exceso de intentos fallidos
    When pasan 15 minutos desde el último intento fallido
    And el usuario envía POST /auth/login con credenciales correctas
    Then el login es exitoso
    And el usuario ya no está bloqueado

  Scenario: El contador solo considera últimos 15 minutos
    Given el usuario tiene 4 intentos fallidos, todos hace más de 15 minutos
    When el usuario envía POST /auth/login con password incorrecto
    Then el login es intentado normalmente (no lockout aún)
    And el nuevo intento fallido suma al contador
```

**Verification:**
- [ ] Unit test: lockout_activo_con_5_intentos_en_ventana
- [ ] Unit test: lockout_no_activo_con_4_intentos
- [ ] Unit test: login_exitoso_resetea_contador
- [ ] Integration test: lockout_expira_despues_de_15_minutos
- [ ] Integration test: intentos_muy_antiguos_no_cuentan

---

## Out of Scope

- SSO (OAuth, SAML)
- Autenticación de dos factores (2FA)
- Recuperación de contraseña por email
- Session token refresh (sin expiry por ahora)
- Rate limiting general de la API

## Assumptions

- La base de datos es PostgreSQL
- Los session tokens se almacenan en memoria (no Redis por ahora)
- TLS/SSL se configura a nivel de infraestructura, no en la aplicación

## Dependencies

- `bcrypt` para hashing de passwords (v3.7+)
- `express` para el servidor HTTP
- `jest` para tests

## Context

- **Project:** SaaS App
- **Stack:** Node.js + Express + PostgreSQL + Jest
- **Test command:** `npm test`
- **Start command:** `npm start`