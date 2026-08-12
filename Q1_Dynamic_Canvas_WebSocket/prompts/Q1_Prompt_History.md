# Q1 Prompt History

## Prompt 001
**Date/Time:** 2026-08-12 23:42:56 IST
**Purpose:** Q1 PRD Definition v1.0 initialization

### Exact Prompt
# Q1 — PRD Definition v1.0

We are now beginning the **definition phase** for Question 1 of the Frugal Testing AI-Native Software Engineer Intern assignment.

This is a continuation of the existing workspace. The Git baseline has already been created and pushed.

## Current workspace rules

Follow the existing persistent engineering rules in:

* `.agents/AGENTS.md`
* `PROJECT_DOCUMENTATION/WORKFLOW_RULES/AI_ENGINEERING_WORKFLOW.md`

The most important rule is:

**Implement exactly what the assignment asks for — nothing more, nothing less.**

The current task is ONLY to define the Q1 Product Requirements Document.

---

# 1. Q1 Assignment Scope

Q1 is:

**Dynamic HTML5 Canvas State Drifts & Asynchronous Race Interceptions**

Q1 carries 15 points.

The PRD must be derived directly from the provided assignment PDF.

Do not silently add requirements from general software-engineering practices unless they are clearly marked as an engineering interpretation rather than an assignment requirement.

---

# 2. Source Requirements That Must Be Captured

The PRD must explicitly capture the following assignment requirements.

## 2.1 Target Environment

The target may be:

* a data-streaming application,
* live stock terminal,
* localized interactive layout grid,
* multiplayer HTML5 gaming sandbox,
* public mock Canvas streaming page,
* localized Canvas stock ticker sandbox,
* interactive data chart,

or a custom/localized Canvas streaming testbed.

The assignment explicitly permits a custom/localized testbed using standard:

* `ws://`
* `wss://`

WebSocket communication.

Do not assume that a third-party production website must be used.

---

## 2.2 WebSocket Stream Corruption & Jitter

The automation must programmatically hook into the active browser connection using an appropriate browser network/proxy mechanism.

The assignment examples include:

* Playwright network interception such as `page.route`
* CDP Sessions

The implementation must intercept incoming WebSocket/binary data or WebSocket messages and inject a dynamically scaling network delay.

Required delay model:

**1000 ms × Fibonacci sequence step**

with a maximum delay of:

**8000 ms**

The PRD must state this requirement exactly and define measurable acceptance criteria for it.

Do not choose a specific interception API in the PRD unless required. Technology selection belongs to the Design Brief/implementation phase.

---

## 2.3 Canvas State Detection

The automation must NOT rely on:

* static delays,
* visibility-fluent polling,
* simple bounding-box checks.

The automation must construct a custom coordinate/state calculation mechanism that detects Canvas pixel-color variations.

The detection must use embedded JavaScript execution loops based on:

`requestAnimationFrame`

The state transition to detect is:

**implicit gray/loading threshold → active element color/layout**

The PRD must define this as a functional acceptance criterion.

---

## 2.4 Race Injection

After the Canvas pixel-state validation indicates the active state, the automation must perform the chained interaction:

**Hover → Drag 15px on X-axis → Click**

The action must be fired within the assignment's specified:

**30 ms–100 ms**

race window following the detected state change.

The PRD must capture the requirement without inventing a specific timing value inside that range.

---

## 2.5 Race/Drift Handling

The interaction layer must programmatically handle:

* coordinate deviations,
* stale frames,
* browser repaint lag.

The assignment requires a custom circuit-breaker macro that dynamically updates target-grid offsets.

The PRD must capture this as a reliability requirement.

Do not prematurely decide the exact circuit-breaker algorithm.

---

## 2.6 Mismatched Server Boundary Validation

The automation must inject a deliberately corrupted mathematical state string/value through the intercepted response stream.

The assignment gives examples including:

* a floating-point fractional balance;
* scientific notation such as `1e+7`.

The automation must then assert whether the frontend invokes a structured exception-boundary mechanism or silently permits client-side corruption.

The PRD must define both the corrupted-input condition and the expected validation behavior.

---

# 3. Q1 Objective

Create a concise objective statement derived from the assignment.

The objective should explain that Q1 validates the application's resilience when dynamic Canvas state is affected by:

* WebSocket latency/jitter,
* asynchronous rendering,
* coordinate/state drift,
* browser repaint timing,
* corrupted server-side mathematical state.

Do not exaggerate this into a general-purpose testing framework.

---

# 4. Scope

Define:

### In Scope

Only functionality necessary to satisfy the Q1 requirements.

### Out of Scope

Anything not required by Q1, including:

* Q2 cryptographic API testing,
* Q3 Shadow DOM testing,
* Section B questions,
* portfolio functionality,
* unrelated application features,
* unnecessary dashboards,
* unnecessary authentication,
* unnecessary databases,
* unrelated test scenarios.

Do not invent additional product features.

---

# 5. Functional Requirements

Create uniquely numbered functional requirements, for example:

* FR-Q1-001
* FR-Q1-002
* etc.

Every functional requirement must map directly to a requirement in the assignment.

Each requirement should include:

* Requirement
* Source/assignment basis
* Expected behavior
* Verification/acceptance condition

Do not create requirements merely because they are common in production applications.

---

# 6. Non-Functional Requirements

Only include non-functional requirements that are necessary to satisfy or reliably verify Q1.

Potential categories may include:

* determinism/reproducibility,
* observability,
* test reliability,
* execution evidence,
* maintainability.

Do not create arbitrary performance SLAs or production requirements that the assignment never requested.

Clearly distinguish assignment requirements from engineering interpretations.

---

# 7. Acceptance Criteria

Create a complete Q1 acceptance-criteria matrix.

Every acceptance criterion must be:

* specific,
* observable,
* testable,
* traceable to the assignment.

At minimum, the matrix must cover:

1. Canvas/WebSocket testbed availability.
2. Active WebSocket interception.
3. Fibonacci-based delay injection.
4. 8000 ms delay cap.
5. Canvas pixel-state detection.
6. `requestAnimationFrame`-based detection.
7. Prohibition of static delays.
8. Prohibition of visibility polling.
9. Prohibition of simple bounding-box checks.
10. Gray/loading → active-color state transition.
11. Hover → 15px X-axis drag → click sequence.
12. 30–100 ms race window.
13. Coordinate deviation handling.
14. Stale-frame handling.
15. Browser repaint-lag handling.
16. Dynamic target-grid offset updates/circuit-breaker behavior.
17. Corrupted mathematical state injection.
18. Structured exception-boundary validation.
19. Detection of silent client-side corruption.

Do not prescribe implementation details that belong in the Design Brief unless the assignment explicitly requires them.

---

# 8. Traceability

Create a requirement traceability table:

```text
Assignment Requirement
        ↓
PRD Requirement ID
        ↓
Acceptance Criterion
        ↓
Future Test / Verification
```

Every Q1 assignment requirement must have a traceable PRD entry.

There must be no unexplained requirements.

---

# 9. Risks & Ambiguities

Identify genuine ambiguities in the assignment that need to be resolved during the Design Brief/implementation phase.

For example, if the assignment specifies an outcome but permits multiple technical mechanisms, record that as an implementation decision still to be made.

Do NOT silently resolve an ambiguity by inventing a requirement.

---

# 10. Technology Neutrality

The PRD should NOT prematurely lock the implementation to a particular programming language, framework, browser API, server architecture, or library unless the assignment explicitly requires it.

Technology selection will happen after the PRD during the Design Brief phase.

---

# 11. Documentation

Create:

```text
PROJECT_DOCUMENTATION/PRD/PRD_v1.0.md
```

Update:

```text
PROJECT_DOCUMENTATION/PRD/CHANGE_HISTORY.md
```

The change history should record:

* version,
* date,
* change,
* reason.

Do not overwrite existing history.

---

# 12. Prompt History

This is a Q1-specific prompt.

Record the exact text of this prompt as:

**Q1 Prompt 001**

in:

```text
Q1_Dynamic_Canvas_WebSocket/prompts/Q1_Prompt_History.md
```

Do not place this prompt in the workspace prompt history.

---

# 13. Strict Stop Condition

This interaction is ONLY for Q1 PRD definition.

Do NOT:

* create Q1 application code,
* create the WebSocket server,
* create the Canvas application,
* create Playwright tests,
* install dependencies,
* choose final implementation architecture,
* create the Design Brief,
* create implementation plans,
* run tests,
* create evidence,
* modify Q2,
* modify Q3.

After creating and validating the PRD, report:

1. PRD file created.
2. PRD version.
3. Requirement count.
4. Acceptance-criteria count.
5. Traceability status.
6. Any genuine ambiguities identified.
7. Confirmation that no implementation work was performed.

Then stop.

The PRD will be reviewed before any Design Brief or implementation work begins.

---

## Prompt 002
**Date/Time:** 2026-08-12 23:44:43 IST
**Purpose:** Q1 PRD v1.0 Review — Minor Corrections

### Exact Prompt
Q1 PRD REVIEW — MINOR CORRECTIONS ONLY

Review the existing Q1 PRD_v1.0 against the assignment and make ONLY the following corrections.

1. AC-Q1-07:
Do not prohibit the literal use of setTimeout everywhere.
Rewrite the criterion so that static sleep/delay mechanisms are prohibited specifically as a mechanism for determining Canvas state readiness.

2. NFR-Q1-001:
Clarify that reproducibility means reproducible behavior under controlled/configured test conditions, not identical wall-clock timing across inherently asynchronous runs.

3. AC-Q1-12:
Explicitly define:
T0 = timestamp when the Canvas pixel-state transition is validated.
T1 = timestamp when the chained interaction begins.
ΔT = T1 - T0.
Require:
30 ms <= ΔT <= 100 ms.

4. Traceability wording:
Replace any claim of "100% traceable" with precise wording indicating that all assignment requirements are mapped to PRD requirements and acceptance criteria, while implementation decisions remain intentionally deferred to the Design Brief.

Do not:
- add new requirements
- remove existing assignment requirements
- change the scope
- create implementation code
- create the Design Brief
- install dependencies
- modify Q2 or Q3
- modify unrelated documentation

Update the appropriate PRD change history.

Record this exact prompt as the next Q1 prompt in Q1_Prompt_History.md.

After making only these corrections, stop and report the exact changes made.

---

