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

## Prompt 003
**Date/Time:** 2026-08-12 23:48:52 IST
**Purpose:** Q1 Design Brief v1.0 Definition

### Exact Prompt
# Q1 Prompt 003 — Design Brief v1.0

We are now moving from the approved Q1 PRD into the DESIGN phase.

The Q1 PRD v1.0 has been reviewed and approved.

The PRD defines WHAT must be built.
This interaction must define HOW we will build it.

IMPORTANT:
This is still a DESIGN-ONLY phase.

DO NOT implement the application.
DO NOT create implementation source code.
DO NOT install dependencies.
DO NOT create the WebSocket server.
DO NOT create the Canvas testbed.
DO NOT create Playwright/Selenium tests.
DO NOT run implementation tests.
DO NOT modify Q2 or Q3.

The only deliverable from this interaction is:

PROJECT_DOCUMENTATION/DESIGN_BRIEF/DESIGN_BRIEF_v1.0.md

Also update:

PROJECT_DOCUMENTATION/DESIGN_BRIEF/CHANGE_HISTORY.md

And record this exact prompt as:

Q1 Prompt 003

in:

Q1_Dynamic_Canvas_WebSocket/prompts/Q1_Prompt_History.md


==================================================
1. AUTHORITATIVE SOURCES
==================================================

Use the following as the authoritative basis:

1. The original assignment PDF.
2. The approved:
   PROJECT_DOCUMENTATION/PRD/PRD_v1.0.md
3. Existing persistent rules:
   .agents/AGENTS.md
   PROJECT_DOCUMENTATION/WORKFLOW_RULES/AI_ENGINEERING_WORKFLOW.md

The assignment requirements take precedence over assumptions.

The PRD defines the required behavior.

The Design Brief must define the technical approach used to satisfy those requirements.

Do not invent additional assignment requirements.


==================================================
2. DESIGN OBJECTIVE
==================================================

Design the simplest technically credible architecture that satisfies every Q1 PRD requirement and acceptance criterion.

The design must support:

- HTML5 Canvas streaming testbed
- standard WebSocket communication
- programmatic WebSocket interception
- Fibonacci-based injected delay
- maximum 8000 ms delay
- Canvas pixel-state detection
- requestAnimationFrame-based detection
- gray/loading → active Canvas state transition
- Hover → Drag 15px X-axis → Click
- 30–100 ms race window
- coordinate drift handling
- stale-frame handling
- browser repaint-lag handling
- dynamic circuit-breaker offset correction
- corrupted mathematical WebSocket payload injection
- frontend structured exception-boundary validation
- reproducible and observable evidence

Do not design features outside this scope.


==================================================
3. ARCHITECTURE PRINCIPLE
==================================================

Prefer the smallest architecture that can demonstrably satisfy the assignment.

Do NOT over-engineer this into a production-grade platform.

Avoid unnecessary:

- microservices
- databases
- authentication systems
- cloud infrastructure
- message brokers
- container orchestration
- frontend frameworks
- dashboards
- unrelated APIs
- abstractions that do not directly support Q1

A localized/custom testbed is explicitly acceptable.

The design should favor:

- local execution
- reproducibility
- observability
- deterministic test control where possible
- simple debugging
- clear evidence generation
- minimal dependencies


==================================================
4. TECHNOLOGY DECISION ANALYSIS
==================================================

The PRD intentionally left technology choices open.

Evaluate the available technical approaches before selecting one.

At minimum evaluate the following where applicable:

### WebSocket interception

- Playwright native WebSocket interception/routing
- Playwright request/network interception mechanisms where applicable
- Chrome DevTools Protocol
- Local forwarding/proxy interception

### Browser automation

Evaluate appropriate choices such as:

- Playwright
- Selenium

### Implementation language

Evaluate the practical suitability of:

- Node.js/TypeScript
- Python

Do not choose based on popularity alone.

Evaluate each option against:

- ability to intercept WebSocket traffic
- ability to inject per-message delay
- ability to control browser execution
- ability to execute embedded JavaScript
- ability to access Canvas pixel state
- timing precision
- ease of logging
- ease of local execution
- dependency complexity
- reliability
- ease of demonstrating the assignment requirements

Create a concise decision matrix.

Then select ONE recommended stack.

The final design must explain WHY that stack is the simplest and most reliable choice for Q1.

Do not implement the selected stack yet.


==================================================
5. WEBSOCKET / TESTBED ARCHITECTURE
==================================================

Define the architecture of the local Canvas streaming testbed.

Specify:

- browser/client
- Canvas
- WebSocket server
- message flow
- test automation layer
- interception point
- injected delay location
- state update mechanism

Provide a clear architecture diagram using Markdown/ASCII.

Example conceptual structure:

Browser Automation
        |
        v
   Browser Page
        |
        +---- Canvas
        |
        +---- WebSocket
                 |
                 v
        Interception Layer
                 |
                 v
          WebSocket Server

However, do NOT blindly copy this example.

Define the actual recommended architecture.

Explain:

- who sends messages
- who receives messages
- where interception occurs
- where jitter is injected
- how Canvas state changes are caused by WebSocket messages


==================================================
6. CANVAS TESTBED DESIGN
==================================================

Define the minimum Canvas application required to exercise Q1.

Specify:

- Canvas dimensions or sizing strategy
- target grid representation
- loading/gray state
- active state
- target element representation
- how WebSocket messages change Canvas state
- how the target position can drift
- how repaint lag can be simulated
- how stale frames can occur

Do not add unnecessary UI.

The Canvas exists only to provide a realistic controllable environment for the required automation behavior.

Define the minimum state machine necessary.

For example, conceptually:

LOADING
   ↓
ACTIVE
   ↓
DRIFT / REPAINT
   ↓
ACTIVE UPDATED STATE

But define the actual state model carefully.


==================================================
7. WEBSOCKET MESSAGE MODEL
==================================================

Define the minimal message schema required for:

1. normal Canvas state updates
2. target coordinate/grid updates
3. timing/state transitions
4. deliberate corrupted mathematical state injection

Specify whether JSON or another representation should be used.

If JSON is selected, define only the fields actually required.

Do not add unnecessary message fields.

The design must make it possible for the interception layer to modify the mathematical payload deliberately.


==================================================
8. FIBONACCI JITTER DESIGN
==================================================

The assignment requires:

1000 ms × Fibonacci sequence step

with a maximum delay of:

8000 ms

The Design Brief must define:

- Fibonacci sequence representation
- starting step
- delay calculation
- maximum cap
- which intercepted messages are delayed
- how delay is logged
- how the injected delay is verified

Do not reinterpret the requirement.

Explicitly distinguish:

NETWORK JITTER DELAY

from:

CANVAS STATE DETECTION

The Canvas detector must NOT use artificial static sleeping to determine readiness.


==================================================
9. CANVAS PIXEL-STATE DETECTOR
==================================================

Design the custom pixel-state detection mechanism.

The design must use:

requestAnimationFrame

Define:

- what Canvas pixels/regions are sampled
- how pixel colors are obtained
- gray/loading threshold representation
- active-state representation
- tolerance strategy
- transition detection
- false-positive prevention
- transition timestamp T0

Do NOT use:

- static sleep as state readiness detection
- DOM visibility polling
- simple bounding-box checks

Explain why the chosen pixel sampling method is appropriate.

Do not implement it yet.


==================================================
10. RACE WINDOW DESIGN
==================================================

The approved PRD defines:

T0 = timestamp when Canvas pixel-state transition is validated.

T1 = timestamp when the chained interaction begins.

ΔT = T1 - T0

Required:

30 ms ≤ ΔT ≤ 100 ms

Define how the implementation will:

1. detect the state transition
2. record T0
3. schedule/start the interaction
4. record T1
5. calculate ΔT
6. verify the requirement

The interaction sequence must be:

Hover
→ Drag 15px on X-axis
→ Click

Define exactly what "interaction begins" means for T1.

Do not choose an arbitrary timing target merely because it is convenient.

If a target inside the allowed range is recommended, explain why.


==================================================
11. COORDINATE / DRIFT ENGINE
==================================================

Design the coordinate calculation mechanism.

It must account for:

- target movement
- coordinate deviation
- stale frames
- browser repaint lag

Define:

- reference coordinate
- current coordinate
- offset
- drift detection
- recalculation mechanism
- when an interaction is considered unsafe
- when the circuit breaker activates


==================================================
12. CIRCUIT-BREAKER DESIGN
==================================================

Define the circuit-breaker behavior explicitly.

The circuit breaker must NOT simply mean:

"retry until it works."

Define:

- trigger condition
- drift threshold
- frame validation
- offset recalculation
- retry policy
- maximum retry behavior
- failure state
- logging

The design must prevent stale coordinates from causing an invalid interaction.

Keep the algorithm simple and directly tied to Q1.


==================================================
13. CORRUPTED STATE INJECTION
==================================================

Design how the test will deliberately corrupt mathematical state in the intercepted WebSocket stream.

The assignment examples include:

- fractional balance values
- scientific notation such as 1e+7

Define:

- normal payload
- corrupted payload
- interception modification point
- frontend receiving behavior
- expected exception-boundary behavior
- silent-corruption detection

Do not assume a production banking/financial system.

The local testbed should contain only the minimum mathematical state necessary to demonstrate the boundary validation.


==================================================
14. EXCEPTION-BOUNDARY DESIGN
==================================================

Define what constitutes:

PASS:

The frontend detects/handles the corrupted mathematical state through a structured exception boundary.

FAIL:

The corrupted value silently propagates into client-side state without appropriate boundary handling.

Define what observable evidence will distinguish these outcomes.

Do not invent a specific framework error-handling library unless technically necessary.


==================================================
15. OBSERVABILITY & LOGGING
==================================================

Design structured logging for:

- WebSocket connection
- intercepted message
- Fibonacci step
- injected delay
- Canvas state
- sampled pixel transition
- T0
- T1
- ΔT
- target coordinates
- recalculated offsets
- circuit-breaker activation
- corrupted payload
- frontend boundary response
- final assertion status

Logs must be concise and useful for the eventual workflow video.

Do not create excessive logging.


==================================================
16. VERIFICATION STRATEGY
==================================================

For every PRD acceptance criterion, define HOW the implementation will later prove it passes.

Create a Design Brief verification matrix:

PRD Requirement
→ Design Component
→ Verification Method
→ Evidence Produced

Do not run the tests now.

Only design the verification strategy.


==================================================
17. FAILURE MODES
==================================================

Identify realistic failure modes for Q1.

At minimum consider:

- WebSocket interception failure
- incorrect jitter calculation
- delay exceeds 8000 ms
- pixel-state false positive
- pixel-state false negative
- T0 not captured correctly
- race window exceeds 100 ms
- race begins before 30 ms
- stale coordinate
- canvas movement
- repaint lag
- circuit breaker failure
- malformed corruption payload
- silent client-side corruption
- exception boundary not invoked

For each, define the intended detection/handling strategy.

Do not implement fixes yet.


==================================================
18. EVIDENCE STRATEGY
==================================================

The assignment requires the final Q1 workflow video to demonstrate:

1. Output
2. Source Code
3. GenAI Usage & Prompt History

Design what observable artifacts/logs will make those demonstrations easy later.

Do not create the video now.

Do not create fake evidence.


==================================================
19. DEPENDENCY MINIMIZATION
==================================================

List only the dependencies that are likely to be required by the chosen architecture.

Do not install them.

For every non-standard dependency, give a one-line justification.

If the chosen architecture can avoid a dependency, prefer avoiding it.


==================================================
20. DESIGN DECISION RECORD
==================================================

For major architectural choices, record:

Decision
Options Considered
Selected Option
Reason
Trade-off

At minimum cover:

- language
- browser automation framework
- WebSocket interception method
- Canvas rendering/testbed approach
- pixel sampling strategy
- timing measurement approach
- coordinate/drift strategy
- circuit-breaker strategy


==================================================
21. DESIGN CONSTRAINTS
==================================================

The final design must satisfy:

- assignment scope lock
- local reproducibility
- minimal architecture
- no unnecessary features
- no premature implementation
- observable evidence
- testability
- maintainability
- exact Q1 acceptance criteria compliance


==================================================
22. PRD TRACEABILITY
==================================================

Before completing the Design Brief, verify that every Q1 PRD acceptance criterion has a corresponding design component.

There must be no acceptance criterion for which the Design Brief has no implementation strategy.

Do not modify the PRD to make the Design Brief easier.

If the design exposes a genuine requirement ambiguity, record it explicitly rather than silently changing the requirement.


==================================================
23. REQUIRED DOCUMENT
==================================================

Create:

PROJECT_DOCUMENTATION/DESIGN_BRIEF/DESIGN_BRIEF_v1.0.md

Update:

PROJECT_DOCUMENTATION/DESIGN_BRIEF/CHANGE_HISTORY.md

The Design Brief should be complete enough that the next phase can create an implementation plan without making major architectural decisions again.


==================================================
24. PROMPT HISTORY
==================================================

Record this exact prompt as:

Q1 Prompt 003

in:

Q1_Dynamic_Canvas_WebSocket/prompts/Q1_Prompt_History.md

Preserve the exact wording.

Do not put it into WORKSPACE_Prompt_History.md.


==================================================
25. STRICT STOP CONDITION
==================================================

After creating and validating DESIGN_BRIEF_v1.0.md:

STOP.

Do NOT:

- write application code
- write test code
- install dependencies
- initialize the Canvas project
- initialize the WebSocket server
- create Playwright configuration
- create source files
- run implementation tests
- modify Q2
- modify Q3

Report:

1. Recommended technology stack.
2. Recommended architecture.
3. WebSocket interception mechanism selected.
4. Canvas testbed design.
5. Pixel-state detection design.
6. Race-window measurement design.
7. Circuit-breaker design.
8. Corrupted-state validation design.
9. Dependency list.
10. Requirement-to-design traceability status.
11. Any remaining genuine ambiguities.

Then stop.

We will review the Design Brief before beginning the Implementation Plan.

---

## Prompt 004
**Date/Time:** 2026-08-12 23:51:04 IST
**Purpose:** Q1 Design Brief v1.0 Review & Refinement

### Exact Prompt
Review DESIGN_BRIEF_v1.0.md and make ONLY the following corrections.

1. TIMING CLOCK
The current design defines T0 using browser performance.now()
and T1 using Playwright-side action dispatch timing.

This is not a valid elapsed-time measurement unless both timestamps
share the same clock origin.

Redesign the timing measurement so T0, T1 and ΔT are measured in
one consistent timing domain. Prefer the browser's performance
clock as the authoritative measurement domain while retaining
Playwright for mouse control.

Explicitly define how the implementation will measure:
T0
T1
ΔT = T1 - T0

without subtracting timestamps from unrelated clock domains.

2. CIRCUIT BREAKER
The current design arbitrarily hardcodes:
20px drift threshold
3 retries

These are not assignment requirements.

Convert them into explicitly identified design parameters rather
than pretending they are assignment requirements.

Explain how the chosen defaults relate to the testbed's actual
drift model, or defer the exact threshold until implementation
calibration.

Do not add unnecessary retry behavior.

3. CORRUPTED MATHEMATICAL STATE
Do not describe "1e+7" merely as a non-numeric value.

Define the frontend's expected mathematical state/representation
contract first.

Then define the injected scientific-notation/fractional value as
a deliberate representation/state violation that must be handled
at the frontend boundary.

Keep this aligned with the assignment's wording.

4. EXCEPTION BOUNDARY
Do not make a specific UI overlay or exact error text an assignment
requirement.

Replace the current hardcoded overlay requirement with an observable
structured frontend exception/validation boundary.

The implementation may later use an overlay, structured event,
assertion, or equivalent observable mechanism as evidence.

5. PLAYWRIGHT VERSION
The selected page.routeWebSocket API requires a Playwright version
that supports WebSocket routing.

Do not retain an outdated ^1.40.0 requirement.

Specify that implementation must use a Playwright version supporting
page.routeWebSocket/WebSocketRoute, with the exact current version
to be selected during implementation.

6. OFFLINE CLAIM
Replace "100% offline" with:
"100% locally executable after dependency installation; runtime
testbed requires no external network services."

7. TRACEABILITY
Re-audit all 19 acceptance criteria after these corrections.

Do not add new acceptance criteria.
Do not remove any existing acceptance criterion.
Do not change the approved PRD.
Do not implement anything.
Do not install dependencies.
Do not modify Q2 or Q3.

Record this exact prompt as Q1 Prompt 004.

Update DESIGN_BRIEF_v1.0.md and its CHANGE_HISTORY.md.

Then stop and report the exact changes made.

---



