# EARS Notation Reference

Easy Approach to Requirements Syntax (EARS). Use these patterns to write unambiguous requirements.

## Patterns

### 1. Ubiquitous

**Template:** The \<system\> shall \<feature\>

Always active. No trigger condition.

**Example:** The email system shall encrypt all outgoing messages.

**When to use:** Feature is always active regardless of state or condition.

---

### 2. Event-Driven

**Template:** When \<trigger\>, the \<system\> shall \<response\>

Triggered by a specific event.

**Example:** When the user clicks "Submit", the system shall validate all required fields.

**When to use:** Feature activates in response to a discrete event.

---

### 3. Unwanted Behavior

**Template:** If \<unwanted condition\>, the \<system\> shall \<response\>

Handles errors, failures, and undesired states.

**Example:** If the database is unavailable, the system shall queue changes locally and retry every 30 seconds.

**When to use:** Specifying error handling, fallbacks, and defensive behavior.

---

### 4. State-Driven

**Template:** While \<state\>, the \<system\> shall \<feature\>

Active during a specific state.

**Example:** While the user is authenticated, the system shall allow edits to their profile.

**When to use:** Feature is conditional on system state.

---

### 5. Optional Feature

**Template:** Where \<feature\> is enabled, the \<system\> shall \<behavior\>

Feature-gated or configuration-dependent.

**Example:** Where dark mode is enabled, the system shall use the dark color palette.

**When to use:** Feature is optional or configurable.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| "The system should..." | Use "shall" — "should" is ambiguous |
| "The system will..." | Use "shall" — "will" is future tense, not a requirement |
| "The system must properly handle..." | "Properly" is undefined. Specify the exact behavior |
| "The system shall support X and Y" | Split into two requirements for traceability |
| No EARS pattern applied | Every requirement must match one of the 5 patterns |

## Gherkin Mapping

Each EARS requirement maps to at least one Gherkin scenario:

| EARS Pattern | Gherkin Structure |
|-------------|-------------------|
| Ubiquitous | Given [system exists], When [action], Then [feature behavior] |
| Event-Driven | Given [precondition], When [trigger], Then [response] |
| Unwanted | Given [unwanted condition], When [system detects], Then [response] |
| State-Driven | Given [state is active], When [action], Then [feature behavior] |
| Optional | Given [feature is enabled], When [action], Then [behavior] |
