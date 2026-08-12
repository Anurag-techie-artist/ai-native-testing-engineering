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

## Prompt 005
**Date/Time:** 2026-08-12 23:56:34 IST
**Purpose:** Q1 Implementation Plan v1.0 Creation

### Exact Prompt
# Q1 Prompt 005 — Implementation Plan

We have now completed and approved the Q1 definition and design phases.

AUTHORITATIVE DOCUMENTS:

1. Original assignment PDF
2. PROJECT_DOCUMENTATION/PRD/PRD_v1.0.md
3. PROJECT_DOCUMENTATION/DESIGN_BRIEF/DESIGN_BRIEF_v1.0.md
4. .agents/AGENTS.md
5. PROJECT_DOCUMENTATION/WORKFLOW_RULES/AI_ENGINEERING_WORKFLOW.md

The Q1 PRD and Design Brief are now FROZEN.

We are moving into the IMPLEMENTATION PLANNING phase.

IMPORTANT:

This interaction is ONLY for creating the implementation plan.

DO NOT write implementation code.
DO NOT create source files.
DO NOT install dependencies.
DO NOT initialize npm.
DO NOT create package.json.
DO NOT create Playwright configuration.
DO NOT create the WebSocket server.
DO NOT create the Canvas application.
DO NOT create tests.
DO NOT run implementation tests.
DO NOT modify the PRD.
DO NOT modify the Design Brief.
DO NOT modify Q2 or Q3.

Record this exact prompt as:

Q1 Prompt 005

in:

Q1_Dynamic_Canvas_WebSocket/prompts/Q1_Prompt_History.md


==================================================
1. OBJECTIVE
==================================================

Create a concrete, implementation-ready plan for Q1.

The plan must translate the approved Design Brief into:

- project structure
- source-file responsibilities
- implementation order
- dependency plan
- execution flow
- test flow
- verification flow
- evidence capture points

The plan must not introduce new functionality or requirements.


==================================================
2. IMPLEMENTATION DIRECTORY
==================================================

All Q1 implementation artifacts must remain inside:

Q1_Dynamic_Canvas_WebSocket/

The intended implementation area is:

Q1_Dynamic_Canvas_WebSocket/source/

Do not create implementation files elsewhere in the repository.

Documentation remains under:

PROJECT_DOCUMENTATION/


==================================================
3. PROPOSED SOURCE STRUCTURE
==================================================

Design the exact source directory structure required for the implementation.

You may modify the following conceptual structure if the Design Brief supports a simpler arrangement:

source/
├── server/
├── client/
├── automation/
├── testbed/
├── config/
└── ...

Do NOT create the directories yet.

For every proposed file/directory explain:

- purpose
- responsibility
- inputs
- outputs
- dependencies
- which Q1 acceptance criteria it supports

Avoid unnecessary abstraction.


==================================================
4. IMPLEMENTATION ORDER
==================================================

Define the exact order in which implementation should occur.

For example, conceptually:

1. Project/runtime setup
2. Local WebSocket server
3. Canvas testbed
4. WebSocket message model
5. Playwright browser setup
6. WebSocket interception
7. Fibonacci jitter
8. Canvas pixel detector
9. Race execution
10. Coordinate drift/circuit breaker
11. Corrupted payload injection
12. Exception-boundary validation
13. Integrated Q1 workflow
14. Verification/evidence

Do not blindly copy this order.

Determine the safest dependency-aware implementation sequence based on the approved Design Brief.

Explain why each phase precedes the next.


==================================================
5. DEPENDENCY PLAN
==================================================

Define:

- Node.js requirements
- TypeScript requirements
- Playwright requirements
- ws requirements
- browser requirement
- any additional dependency only if genuinely necessary

Do not install anything.

Do not hardcode an outdated Playwright version.

The implementation must use a Playwright version supporting:

page.routeWebSocket / WebSocketRoute

For every dependency explain why it is necessary.

Prefer the minimum dependency set.


==================================================
6. CONFIGURATION PLAN
==================================================

Define the configuration values that should exist.

Examples include:

- WebSocket port
- Canvas dimensions
- target grid configuration
- RGB tolerances
- Fibonacci cap
- race-window bounds
- design circuit-breaker parameters
- test mode

Distinguish:

ASSIGNMENT CONSTANTS

from:

CONFIGURABLE DESIGN PARAMETERS

Do not create configuration for values that do not need to vary.


==================================================
7. WEBSOCKET SERVER PLAN
==================================================

Define exactly how the local WebSocket server should behave.

Specify:

- startup
- connection handling
- normal message sequence
- state updates
- target movement
- balance state
- corrupted state scenario
- shutdown

Define the minimum server behavior necessary for Q1.

Do not add unrelated endpoints or application features.


==================================================
8. CANVAS CLIENT PLAN
==================================================

Define exactly what the HTML/JavaScript Canvas client needs to implement.

Include:

- Canvas initialization
- grid rendering
- loading state
- active state
- target state
- drift/repaint simulation
- WebSocket message handling
- pixel-state rendering
- mathematical state handling
- structured exception/validation boundary

Keep the client deliberately minimal.

No UI framework unless the frozen Design Brief requires one.


==================================================
9. WEBSOCKET INTERCEPTION PLAN
==================================================

Define the exact implementation flow for:

page.routeWebSocket()

including:

- route registration
- connection to real server
- message interception
- Fibonacci step tracking
- delay calculation
- delay application
- forwarding
- corruption mutation
- logging

Specify how normal messages and corruption-test messages are distinguished.

Do not write code.


==================================================
10. FIBONACCI JITTER PLAN
==================================================

Define the implementation algorithm for:

D(n) = min(1000 × Fib(n), 8000)

Specify:

- Fibonacci state management
- step progression
- cap behavior
- delay application
- logging
- verification

Explicitly ensure the jitter mechanism is separate from Canvas readiness detection.


==================================================
11. PIXEL DETECTOR PLAN
==================================================

Define the exact implementation responsibilities for the embedded:

requestAnimationFrame()

loop.

Specify:

- Canvas context access
- sampled coordinates
- RGB extraction
- tolerance calculation
- gray-state recognition
- active-state recognition
- transition detection
- T0 capture
- cancellation/termination conditions

Do not use:

- static sleep for readiness
- visibility polling
- bounding-box state detection

Do not write code.


==================================================
12. RACE EXECUTION PLAN
==================================================

Define the implementation sequence:

T0
↓
race scheduling
↓
Hover
↓
Drag 15px X
↓
Click
↓
T1
↓
ΔT validation

Use the frozen Design Brief's single browser clock domain.

Define exactly how the browser records T1 when the first dispatched action reaches the Canvas.

Define how the automation obtains the resulting ΔT.

Define failure behavior for:

ΔT < 30 ms
ΔT > 100 ms

Do not create implementation code.


==================================================
13. COORDINATE DRIFT PLAN
==================================================

Define the implementation responsibilities for:

- reference coordinate
- current coordinate
- drift calculation
- offset calculation
- frame validation
- coordinate update

Make the algorithm directly correspond to the frozen Design Brief.

Do not introduce additional movement logic.


==================================================
14. CIRCUIT-BREAKER PLAN
==================================================

Define:

- configurable threshold
- maximum retries
- trigger condition
- stale-frame detection
- offset recalculation
- retry behavior
- controlled failure behavior
- logging

Ensure that retry behavior cannot become an unbounded loop.

The exact design parameters must remain clearly identifiable as configuration/design parameters, not assignment requirements.


==================================================
15. CORRUPTED STATE PLAN
==================================================

Define the implementation sequence for the deliberate corrupted payload.

Specify:

1. Normal state
2. Interception
3. Payload mutation
4. Delivery to frontend
5. Representation validation
6. Structured boundary invocation
7. Observable result
8. PASS/FAIL determination

The expected representation contract from the frozen Design Brief must remain authoritative.

Do not redesign it.


==================================================
16. TEST EXECUTION PLAN
==================================================

Define the integrated Q1 test sequence.

It should cover all 19 acceptance criteria.

Create a test scenario matrix:

Test Scenario
→ Preconditions
→ Action
→ Expected Result
→ Acceptance Criteria Covered
→ Evidence Produced

Do not execute tests yet.


==================================================
17. ACCEPTANCE CRITERIA MAPPING
==================================================

Create a complete mapping:

AC-Q1-01
→ source/component
→ implementation phase
→ verification method

...

AC-Q1-19
→ source/component
→ implementation phase
→ verification method

Every acceptance criterion must have an implementation location and verification point.

Do not modify acceptance criteria.


==================================================
18. EVIDENCE PLAN
==================================================

Define what evidence should eventually be captured for:

- WebSocket interception
- Fibonacci delays
- 8000 ms cap
- Canvas pixel transition
- requestAnimationFrame
- race timing
- coordinate correction
- stale frame handling
- circuit breaker
- corrupted payload
- exception boundary
- final PASS/FAIL

Evidence must be real execution evidence.

Do not create fake evidence now.

Specify where future evidence should be stored under:

Q1_Dynamic_Canvas_WebSocket/evidence/


==================================================
19. DEBUGGING & VERIFICATION PLAN
==================================================

The implementation must later follow:

IMPLEMENT
→ TEST
→ EXPECTED VS ACTUAL
→ DEBUG
→ VERIFY
→ REFACTOR
→ REGRESSION TEST
→ DOCUMENT
→ COMMIT

Define where each phase will record its information.

Do not generate artificial debugging issues.

Only genuine discrepancies will be recorded later.


==================================================
20. GIT CHECKPOINT PLAN
==================================================

Define logical commit points.

Examples:

- project bootstrap
- testbed implementation
- WebSocket interception
- Canvas detector
- race/circuit breaker
- corrupted-state validation
- verification/refactor

Use the workspace's conventional commit rules.

Do not create commits now.


==================================================
21. IMPLEMENTATION RISK ORDER
==================================================

Identify the technically riskiest implementation areas and rank them:

1 = highest risk.

Pay particular attention to:

- WebSocket frame interception
- delayed forwarding
- Canvas pixel detection
- browser timing
- race-window reliability
- coordinate drift
- circuit breaker
- corrupted state boundary

For each risk, state how the implementation plan reduces it.


==================================================
22. IMPLEMENTATION STOP CONDITIONS
==================================================

Define explicit conditions under which implementation should stop and return to review rather than improvising.

Examples:

- Playwright API behaves differently than expected
- WebSocket routing cannot satisfy the required interception behavior
- Canvas pixel detection is unreliable
- race timing cannot be measured correctly
- a requirement conflicts with the frozen PRD
- implementation requires a feature not present in the Design Brief

The correct response is to document the discrepancy and request review.

Do not silently change requirements.


==================================================
23. REQUIRED DOCUMENT
==================================================

Create:

PROJECT_DOCUMENTATION/DESIGN_BRIEF/IMPLEMENTATION_PLAN_v1.0.md

Do NOT modify:

PRD_v1.0.md
DESIGN_BRIEF_v1.0.md

Update the Design Brief change history only if appropriate to record the implementation-plan phase.

The implementation plan should be sufficiently detailed that the next prompt can authorize actual implementation without requiring another major architectural decision.


==================================================
24. STRICT SCOPE LOCK
==================================================

Implement exactly what Q1 requires.

No:

- extra features
- extra UI
- extra APIs
- extra test scenarios unrelated to Q1
- unnecessary abstractions
- unnecessary dependencies
- production infrastructure
- Q2 work
- Q3 work


==================================================
25. STRICT STOP CONDITION
==================================================

After creating and validating:

PROJECT_DOCUMENTATION/DESIGN_BRIEF/IMPLEMENTATION_PLAN_v1.0.md

STOP.

Report:

1. Final source directory structure (planned only).
2. Implementation phases.
3. Dependency plan.
4. Highest-risk components.
5. Acceptance-criteria coverage.
6. Test scenario matrix summary.
7. Evidence strategy.
8. Planned Git checkpoints.
9. Any unresolved technical issue.

Confirm explicitly:

"No implementation code was created."

Then stop.

We will review the implementation plan before authorizing implementation.

---

## Prompt 006
**Date/Time:** 2026-08-12 23:58:35 IST
**Purpose:** Q1 Implementation Plan v1.0 Review & Corrections

### Exact Prompt
# Q1 Prompt 006 — Implementation Plan Correction

Review IMPLEMENTATION_PLAN_v1.0.md and make ONLY the following corrections.

This is still a planning phase.

DO NOT create source code.
DO NOT install dependencies.
DO NOT initialize npm.
DO NOT modify the PRD.
DO NOT modify the frozen Design Brief.
DO NOT modify Q2 or Q3.

Record this exact prompt as Q1 Prompt 006.

==================================================
1. FIX CIRCUIT-BREAKER COORDINATE CALCULATION
==================================================

The current plan uses:

δx = |X_current - X_reference|
X_new = X_reference + δx

This loses the direction of movement.

Replace the coordinate model with signed deltas:

dx = X_current - X_reference
dy = Y_current - Y_reference

X_new = X_reference + dx
Y_new = Y_reference + dy

Use absolute magnitudes only for threshold comparison:

abs(dx)
abs(dy)

The implementation must account for both X and Y coordinate
deviation.

Do not assume movement is always positive on the X axis.

==================================================
2. DEFINE REAL STALE-FRAME / REPAINT-LAG HANDLING
==================================================

The current plan relies primarily on a pre-action coordinate check.

That is insufficient to demonstrate actual handling of stale frames
and browser repaint lag.

Add a minimal freshness mechanism to the design.

The Canvas/testbed should expose enough state to allow the automation
to determine whether the coordinate/state snapshot is still current.

Use a minimal mechanism such as:

- frameId
- stateVersion
- render timestamp
- target coordinate version

or an equivalent mechanism.

The automation must be able to distinguish:

CURRENT FRAME
from
STALE FRAME

and detect when a target position/state changes between the
validated frame and the action.

Define how repaint lag is detected and how the circuit breaker
responds.

Do NOT add unnecessary complexity.

==================================================
3. RESOLVE LOCAL HTTP SERVING
==================================================

The current plan contains a local WebSocket server and a browser
client but does not explicitly define how Playwright loads the
Canvas application's index.html.

Update the implementation plan to use the minimum necessary
local HTTP serving mechanism.

Prefer Node.js built-in `http` rather than adding Express or
another HTTP framework.

The same local server process may provide:

HTTP:
- index.html
- canvas_app.js
- style.css

WebSocket:
- testbed state stream

Do not add another dependency unless technically necessary.

Ensure AC-Q1-01 has a concrete browser-accessible local URL.

==================================================
4. DEFINE T1 PRECISELY
==================================================

Clarify the timing model:

T0 =
browser performance.now() timestamp when the Canvas pixel-state
transition has been validated.

T1 =
browser performance.now() timestamp when the FIRST required
interaction event reaches the Canvas target.

For this implementation, explicitly identify that event as the
initial hover/pointer-entry event.

Then:

ΔT = T1 - T0

and:

30 ms <= ΔT <= 100 ms

The subsequent required interaction sequence remains:

Hover
→ Drag 15px on X-axis
→ Click

Do not change the assignment requirement.

==================================================
5. RE-AUDIT ACCEPTANCE CRITERIA
==================================================

After these corrections, re-check all 19 Q1 acceptance criteria.

Ensure:

AC-Q1-13:
coordinate deviation is handled with signed X/Y offsets.

AC-Q1-14:
stale frames have an explicit detection mechanism.

AC-Q1-15:
browser repaint lag has an explicit detection/handling mechanism.

AC-Q1-16:
the circuit breaker dynamically updates offsets.

AC-Q1-01:
the browser can actually load the local testbed.

AC-Q1-12:
T0/T1/ΔT are measured in the same browser clock domain.

Do not add or remove acceptance criteria.

==================================================
6. UPDATE DOCUMENTATION
==================================================

Update:

PROJECT_DOCUMENTATION/DESIGN_BRIEF/IMPLEMENTATION_PLAN_v1.0.md

Update the appropriate change-history documentation.

Do not create a new implementation-plan version unless required by
the existing versioning rules; record this as a material revision
to v1.0 if appropriate.

Do not modify the frozen PRD or Design Brief.

==================================================
7. STRICT STOP
==================================================

After completing the corrections:

STOP.

Report:

1. Exact changes made.
2. Final coordinate-drift model.
3. Stale-frame mechanism.
4. Repaint-lag mechanism.
5. Local HTTP serving mechanism.
6. Final T0/T1 definition.
7. Confirmation that all 19 ACs remain covered.
8. Confirmation that ZERO implementation code was created.

Do not begin implementation.

---

## Prompt 007
**Date/Time:** 2026-08-13 00:03:01 IST
**Purpose:** Q1 Implementation Execution Granularity Revision (Four Milestones)

### Exact Prompt
# Q1 Prompt 007 — Revise Implementation Execution into Four Milestones

The approved Q1 Implementation Plan v1.0 (Rev 1) remains authoritative.

We are changing ONLY the execution granularity because the assignment
deadline is 13 August 2026 at 12:00 PM.

Do NOT change the architecture, requirements, acceptance criteria,
technology stack, or implementation responsibilities.

Record this exact prompt in:

Q1_Dynamic_Canvas_WebSocket/prompts/Q1_Prompt_History.md


==================================================
NEW EXECUTION STRATEGY
==================================================

Instead of stopping after every small implementation phase, group the
approved ten implementation phases into FOUR large implementation
milestones.

The engineering workflow remains mandatory, but verification and
debugging will occur at milestone boundaries.

The workflow is:

IMPLEMENT MILESTONE
→ TEST
→ EXPECTED vs ACTUAL
→ DEBUG
→ VERIFY
→ REGRESSION TEST
→ REFACTOR / CLEAN UP
→ DOCUMENT
→ COMMIT
→ NEXT MILESTONE


==================================================
MILESTONE 1 — FOUNDATION & TESTBED
==================================================

Combine approved Phases 1–3.

Implement:

- project configuration
- package.json
- tsconfig.json
- centralized Q1 configuration
- local Node.js HTTP server
- local WebSocket server
- HTML5 Canvas client
- Canvas state machine
- 4x4 grid
- Gray loading state
- Blue active state
- target state/version tracking
- frame freshness foundation

Expected result:

Playwright/browser can load the local application through HTTP and
the Canvas can communicate with the local WebSocket testbed.

After the milestone:

- test all M1 functionality
- compare expected vs actual
- debug genuine discrepancies
- verify
- perform regression testing
- perform necessary cleanup
- document
- create Git checkpoint


==================================================
MILESTONE 2 — NETWORK INTERCEPTION & PIXEL DETECTION
==================================================

Combine approved Phases 4–6.

Implement:

- Playwright automation harness
- page.routeWebSocket()
- WebSocket frame interception
- Fibonacci jitter
- 8000 ms cap
- frame forwarding
- corrupted-frame mutation mechanism foundation
- requestAnimationFrame pixel detector
- getImageData RGB detection
- Gray → Blue state transition detection
- browser performance.now() T0 capture

Respect all frozen requirements:

- no static sleep for Canvas readiness
- no visibility polling
- no bounding-box state detection

After the milestone:

- test WS interception
- test Fibonacci timing/cap
- test Canvas pixel detection
- verify T0
- compare expected vs actual
- debug
- regression test
- cleanup
- document
- commit


==================================================
MILESTONE 3 — RACE, DRIFT & CIRCUIT BREAKER
==================================================

Combine approved Phases 7–8.

Implement:

- single browser clock race timing
- T1 at first pointerenter/hover event
- T0/T1/ΔT
- 30–100 ms validation
- Hover → Drag 15px X-axis → Click
- signed 2D coordinate drift
- stale-frame detection
- repaint-lag detection
- frame freshness validation
- dynamic offset update
- bounded circuit-breaker retries

Use:

dx = X_current - X_reference
dy = Y_current - Y_reference

and preserve movement direction.

After the milestone:

- run the complete race scenario
- test positive and negative drift
- test stale-frame handling
- test repaint-lag handling
- test circuit-breaker retry limit
- compare expected vs actual
- debug aggressively
- regression test
- cleanup
- document
- commit

This is the highest-priority/highest-risk milestone.


==================================================
MILESTONE 4 — CORRUPTION, INTEGRATION & FINAL VERIFICATION
==================================================

Combine approved Phases 9–10.

Implement:

- corrupted WebSocket representation injection
- representation contract validation
- structured frontend exception boundary
- silent corruption detection
- integrated Q1 test suite
- structured evidence logging

Run all six approved Q1 test scenarios.

Verify all 19 acceptance criteria.

Then perform:

1. Expected vs Actual audit
2. Genuine debugging
3. Regression testing
4. Dead-code cleanup
5. Refactoring verification
6. Evidence verification
7. Prompt-history verification
8. Documentation verification
9. Git history verification
10. Final scope-lock audit

Do not add features.


==================================================
GIT CHECKPOINT STRATEGY
==================================================

Use one primary implementation commit per milestone rather than
individual commits for every tiny phase.

Suggested checkpoints:

M1:
feat(q1): implement foundation and canvas testbed

M2:
feat(q1): implement websocket interception and pixel detection

M3:
feat(q1): implement race execution and circuit breaker

M4:
feat(q1): complete corruption validation and q1 integration


If genuine debugging requires a separate fix commit, use the
appropriate conventional fix commit rather than hiding the fix.


==================================================
IMPORTANT
==================================================

This is an EXECUTION-GRANULARITY change only.

Do not alter:

- PRD
- Design Brief
- acceptance criteria
- architecture
- dependency requirements
- evidence requirements
- scope-lock rules

Do not remove verification.

We are batching implementation, not skipping engineering discipline.


==================================================
STOP CONDITION
==================================================

After updating the implementation execution strategy:

STOP.

Do not implement code from this prompt.

Report the four milestone boundaries and confirm that the frozen
technical requirements remain unchanged.

---

## Prompt 008
**Date/Time:** 2026-08-13 00:05:41 IST
**Purpose:** Q1 Milestone 1 Implementation Authorization

### Exact Prompt
# Q1 Prompt 008 — Implement Milestone 1: Foundation & Testbed

We are now AUTHORIZING IMPLEMENTATION of:

Q1 — MILESTONE 1: FOUNDATION & TESTBED

The following documents are frozen and authoritative:

1. Original assignment PDF
2. PROJECT_DOCUMENTATION/PRD/PRD_v1.0.md
3. PROJECT_DOCUMENTATION/DESIGN_BRIEF/DESIGN_BRIEF_v1.0.md
4. PROJECT_DOCUMENTATION/DESIGN_BRIEF/IMPLEMENTATION_PLAN_v1.0.md
5. .agents/AGENTS.md
6. PROJECT_DOCUMENTATION/WORKFLOW_RULES/AI_ENGINEERING_WORKFLOW.md

The approved execution strategy groups implementation into four
large milestones.

We are implementing ONLY Milestone 1.

Record this exact prompt as:

Q1 Prompt 008

in:

Q1_Dynamic_Canvas_WebSocket/prompts/Q1_Prompt_History.md

IMPORTANT:
Do not create a new prompt number if Prompt 008 already exists.
Preserve chronological ordering and exact prompt text.

If the previous milestone-strategy prompt was incorrectly recorded
as Prompt 007 despite an earlier Prompt 007 already existing,
correct ONLY the numbering/metadata necessary to restore a
consistent chronological prompt history. Do not delete or
paraphrase any prompt text.


==================================================
MILESTONE 1 SCOPE
==================================================

Milestone 1 combines the approved Implementation Plan phases:

Phase 1 — Project & Configuration Setup
Phase 2 — Local WebSocket Server
Phase 3 — Canvas Testbed

The goal is to finish with a COMPLETE, WORKING LOCAL TESTBED.

At the end of this milestone:

Browser
    ↓ HTTP
Local Node Server
    ↓ WebSocket
Canvas Testbed

must work locally.

The Canvas must be able to receive WebSocket state updates and
render the required state transitions.


==================================================
1. PROJECT STRUCTURE
==================================================

All implementation must remain under:

Q1_Dynamic_Canvas_WebSocket/source/

Create only the files/directories genuinely required for Milestone 1.

The approved conceptual structure is:

source/
├── package.json
├── tsconfig.json
├── config/
│   └── q1_config.ts
├── server/
│   └── app_server.ts
└── client/
    ├── index.html
    ├── canvas_app.js
    └── style.css

Do not create:

- automation/
- Playwright test files
- WebSocket interception code
- pixel detector
- race executor
- circuit breaker
- corrupted-state tests
- integrated Q1 suite

Those belong to later milestones.


==================================================
2. PROJECT CONFIGURATION
==================================================

Create the minimum Node.js + TypeScript project foundation.

Required dependencies:

- TypeScript
- Playwright
- ws
- @types/ws

Use a Playwright version supporting:

page.routeWebSocket()

Do not introduce:

- Express
- React
- Vue
- databases
- unnecessary frameworks
- unnecessary utilities

Use strict TypeScript configuration.

Do not over-engineer the project configuration.


==================================================
3. CENTRAL CONFIGURATION
==================================================

Implement:

config/q1_config.ts

Keep assignment constants separate from configurable design
parameters.

Assignment constants:

- FIBONACCI_BASE_DELAY = 1000
- FIBONACCI_MAX_CAP = 8000
- RACE_WINDOW_MIN_MS = 30
- RACE_WINDOW_MAX_MS = 100
- DRAG_X_DISTANCE_PX = 15

Configurable design parameters:

- LOCAL_SERVER_PORT = 8080
- LOCAL_APP_URL = http://localhost:8080
- CANVAS_WIDTH = 800
- CANVAS_HEIGHT = 600
- COLOR_GRAY_RGB = [128, 128, 128]
- COLOR_BLUE_RGB = [0, 85, 255]
- DESIGN_PARAM_DRIFT_THRESHOLD = 20
- DESIGN_PARAM_MAX_RETRIES = 3
- TARGET_RACE_DELAY_MS = 50

Use appropriate TypeScript types.

Do not add speculative configuration values.


==================================================
4. LOCAL HTTP + WEBSOCKET SERVER
==================================================

Implement:

server/app_server.ts

Use Node's built-in HTTP server to serve the static Canvas client.

The same process must also provide the WebSocket server using:

ws

The application must therefore provide:

HTTP:
http://localhost:8080

and a local WebSocket endpoint.

Do NOT add Express.

The HTTP server must correctly serve:

- index.html
- canvas_app.js
- style.css

Handle normal local browser requests appropriately.

Handle WebSocket connections appropriately.

Provide clean startup and shutdown behavior.

The server should log enough information to establish:

- HTTP server started
- WebSocket server started
- WebSocket client connected
- WebSocket client disconnected

Do not implement interception or jitter yet.


==================================================
5. WEBSOCKET MESSAGE MODEL
==================================================

Implement the minimum message model required by the frozen
Design Brief.

The server must be able to send Canvas state information through
WebSocket messages.

Messages must support the minimum information required to represent:

- loading state
- active state
- target position
- frame freshness
- target freshness/version

Use a simple JSON representation.

At minimum, the state model must make it possible for the client
to know:

- current state
- target X
- target Y
- frameId
- targetVersion

Do not add unnecessary application fields.


==================================================
6. CANVAS TESTBED
==================================================

Implement the minimum HTML5 Canvas testbed.

Canvas:

800 × 600

Layout:

4 × 4 grid

Target:

Use the coordinates defined by the approved Design Brief.

Initial state:

LOADING

Visual representation:

Gray loading state.

Active state:

BLUE target/state representation.

The Canvas should visually demonstrate the state transition:

LOADING
    ↓
ACTIVE

The implementation must be driven by WebSocket messages rather
than hardcoded visual-only transitions.

Do not implement the pixel detector yet.

Do not use requestAnimationFrame for detection yet.

Do not implement Playwright yet.


==================================================
7. TARGET POSITION & FRESHNESS FOUNDATION
==================================================

Implement the foundational state required by later milestones:

- target X
- target Y
- frameId
- targetVersion

The Canvas rendering layer should update these values when the
corresponding WebSocket state arrives.

The testbed should be capable of representing a target position
change so that later milestones can test:

- coordinate drift
- stale frames
- repaint lag

Do NOT implement the circuit breaker yet.

Do NOT implement retry logic yet.

Only establish the state information required by later milestones.


==================================================
8. MINIMAL CLIENT UI
==================================================

The client should contain ONLY what is necessary to demonstrate
the testbed.

Required:

- Canvas
- minimal status/debug information if genuinely useful

Do not create:

- navigation
- dashboard
- decorative components
- animations unrelated to the assignment
- unnecessary controls
- polished UI

This is a testing testbed, not a production application.


==================================================
9. MILESTONE 1 ACCEPTANCE VALIDATION
==================================================

After implementation, validate the entire Milestone 1 rather than
testing individual files in isolation.

The following must be demonstrably true:

M1-01:
The Node application starts successfully.

M1-02:
The local HTTP server serves the Canvas application.

M1-03:
The browser can load:

http://localhost:8080

M1-04:
The browser establishes the local WebSocket connection.

M1-05:
The WebSocket server sends a valid initial state.

M1-06:
The Canvas starts in LOADING/gray state.

M1-07:
A WebSocket state update changes the Canvas to ACTIVE/blue state.

M1-08:
The Canvas renders the target at the expected coordinates.

M1-09:
frameId and targetVersion are present and update correctly.

M1-10:
The target can receive a changed coordinate/state through the
WebSocket message model.

M1-11:
No Milestone 2+ functionality has been implemented.


==================================================
10. EXPECTED VS ACTUAL
==================================================

Compare the implemented Milestone 1 against the expected behavior.

Use:

PROJECT_DOCUMENTATION/IMPLEMENTATION_DEBUG/EXPECTED_VS_ACTUAL.md

Record only genuine discrepancies.

For each genuine issue use:

- Expected Behavior
- Actual Behavior
- Difference & Root Cause
- Fix Applied
- Verification Method & Status

Do not manufacture debugging issues.

If no discrepancy occurs, record that the milestone matched the
expected behavior.


==================================================
11. MILESTONE 1 TESTING
==================================================

Perform real execution testing.

At minimum verify:

1. Server startup.
2. HTTP page loading.
3. WebSocket connection.
4. Initial LOADING state.
5. ACTIVE state transition.
6. Target coordinate rendering.
7. frameId behavior.
8. targetVersion behavior.
9. graceful server shutdown.

Use real terminal/browser execution.

Do not claim success without actual evidence.


==================================================
12. DEBUGGING
==================================================

If a genuine problem appears:

1. Compare Expected vs Actual.
2. Identify root cause.
3. Apply the smallest correct fix.
4. Re-run the affected test.
5. Re-run the relevant Milestone 1 regression tests.
6. Document the issue and resolution.

Do not change frozen requirements to make a test pass.

Do not introduce unrelated fixes.


==================================================
13. REFACTOR / DEAD CODE CHECK
==================================================

After Milestone 1 works:

Inspect only the code created in this milestone.

Look for:

- unused imports
- unreachable code
- duplicate configuration
- unnecessary abstractions
- dead variables
- unnecessary dependencies

Remove only genuine dead code or unnecessary structure.

Do not perform cosmetic refactoring.

If nothing requires cleanup, explicitly record that.


==================================================
14. EVIDENCE
==================================================

Capture real evidence sufficient to demonstrate Milestone 1.

Evidence may include:

- terminal startup output
- browser execution
- WebSocket connection output
- Canvas state transition
- target rendering
- frame/version output

Store only genuine evidence under:

Q1_Dynamic_Canvas_WebSocket/evidence/

Do not create fake screenshots/logs.

Do not create final submission video yet.


==================================================
15. ACCEPTANCE CRITERIA TRACEABILITY
==================================================

Milestone 1 primarily establishes the foundation for:

AC-Q1-01
AC-Q1-02
AC-Q1-03
AC-Q1-04
AC-Q1-05
AC-Q1-06
AC-Q1-13
AC-Q1-14
AC-Q1-15
AC-Q1-16

Do NOT claim later acceptance criteria as passed merely because
their foundation exists.

In particular, do NOT claim:

- WebSocket jitter passes
- pixel detection passes
- race timing passes
- circuit breaker passes
- corrupted-state handling passes

Those belong to later milestones.


==================================================
16. DOCUMENTATION
==================================================

Update relevant documentation:

- EXPECTED_VS_ACTUAL.md
- DEBUG_CHANGE_HISTORY.md if a genuine debugging event occurred
- DEAD_CODE_CLEANUP.md if cleanup occurred
- Q1_Prompt_History.md with this exact prompt

Do not modify:

- PRD_v1.0.md
- DESIGN_BRIEF_v1.0.md
- acceptance criteria


==================================================
17. GIT CHECKPOINT
==================================================

After:

IMPLEMENT
→ TEST
→ EXPECTED vs ACTUAL
→ DEBUG
→ VERIFY
→ REGRESSION
→ REFACTOR
→ DOCUMENT

create the Milestone 1 Git checkpoint.

Before committing:

git status
git diff --stat
git diff

Ensure only Milestone 1 changes are staged.

Use:

feat(q1): implement foundation and canvas testbed

Update:

PROJECT_DOCUMENTATION/GIT/COMMIT_HISTORY.md

with the actual commit hash.

Push to origin/main.


==================================================
18. STRICT SCOPE LOCK
==================================================

Do NOT implement anything from Milestones 2–4.

Specifically do not create:

- ws_interceptor.ts
- pixel_detector.ts
- action_executor.ts
- circuit_breaker.ts
- run_q1_suite.ts
- Playwright automation logic
- Fibonacci jitter logic
- rAF pixel detection logic
- race-window execution
- corrupted mathematical payload testing
- exception-boundary testing

Do not install dependencies beyond the approved project stack.

Do not add features.


==================================================
19. STRICT STOP CONDITION
==================================================

After Milestone 1 is:

IMPLEMENTED
TESTED
DEBUGGED IF NECESSARY
VERIFIED
REGRESSION TESTED
CLEANED UP
DOCUMENTED
COMMITTED
PUSHED

STOP.

Do NOT begin Milestone 2.

Report:

1. Final Milestone 1 file tree.
2. Actual dependency versions installed.
3. Server startup result.
4. HTTP test result.
5. WebSocket test result.
6. Canvas state-transition result.
7. frameId/targetVersion verification.
8. Expected vs Actual findings.
9. Debugging performed, if any.
10. Refactoring/dead-code cleanup result.
11. Evidence generated.
12. Git commit hash.
13. Push status.
14. Explicit confirmation:

"Milestone 2 has NOT been started."

Then wait for authorization.

---

## Prompt 009
**Date/Time:** 2026-08-13 00:13:35 IST
**Purpose:** Q1 Milestone 2 Implementation Authorization

### Exact Prompt
# Q1 Prompt 009 — Implement Milestone 2: Network Interception & Pixel Detection

Q1 Milestone 1 has been completed, verified, committed, and pushed.

Current Git baseline:
b99ee91 docs(q1): update commit history for milestone 1

Working tree is clean.

We are now AUTHORIZING ONLY:

Q1 — MILESTONE 2: NETWORK INTERCEPTION & PIXEL DETECTION

Use the frozen:
- PRD v1.0
- Design Brief v1.0
- Implementation Plan v1.0
- four-milestone execution strategy
- persistent workspace rules

Record this exact prompt as Q1 Prompt 009 in:
Q1_Dynamic_Canvas_WebSocket/prompts/Q1_Prompt_History.md

==================================================
MILESTONE 2 SCOPE
==================================================

Implement the approved Implementation Plan phases 4–6:

1. Playwright browser automation harness
2. Native Playwright WebSocket interception
3. Fibonacci jitter injection
4. WebSocket frame forwarding
5. Embedded requestAnimationFrame pixel-state detector
6. Canvas getImageData RGB transition detection
7. Browser performance.now() T0 capture

==================================================
DO NOT IMPLEMENT
==================================================

Do NOT implement:

- race execution
- Hover → Drag → Click
- T1
- 30–100 ms race validation
- coordinate drift engine
- stale-frame circuit breaker
- corrupted mathematical state testing
- exception-boundary testing
- integrated Q1 suite
- M3/M4 functionality

Do not modify the frozen PRD or Design Brief.

==================================================
1. PLAYWRIGHT HARNESS
==================================================

Create the minimum browser automation harness required for M2.

It must launch Chromium and load:

http://localhost:8080

The harness must work against the existing Milestone 1 testbed.

Do not redesign the testbed.

==================================================
2. WEBSOCKET INTERCEPTION
==================================================

Implement native:

page.routeWebSocket()

using the Playwright version already selected in the project.

The interceptor must:

1. observe the WebSocket route
2. connect to the actual local server
3. intercept incoming server messages
4. apply the Fibonacci delay
5. forward the message to the browser
6. preserve normal message contents

Do not introduce a proxy server or CDP unless the selected Playwright
API genuinely fails to satisfy the requirement.

If routeWebSocket behaves unexpectedly, document the discrepancy rather
than silently changing architecture.

==================================================
3. FIBONACCI JITTER
==================================================

Implement the approved delay model:

delay(n) = min(1000 × Fibonacci(n), 8000)

Use the approved Fibonacci sequence beginning with:

1, 1, 2, 3, 5, 8, ...

The resulting delay progression should therefore be:

1000
1000
2000
3000
5000
8000
8000
...

The delay must never exceed 8000 ms.

Track/log:

- Fibonacci step
- Fibonacci value
- calculated delay
- message/frame association
- forwarding time

Do not use this jitter delay as Canvas state-readiness detection.

==================================================
4. FRAME FORWARDING
==================================================

After delaying a frame, forward it normally to the browser.

Verify that:

- messages are not lost unintentionally
- message ordering remains understandable
- Canvas state continues progressing

Do not corrupt mathematical state in M2.

That belongs to M4.

==================================================
5. PIXEL DETECTOR
==================================================

Implement the approved custom Canvas state detector.

It must execute inside the browser context using:

requestAnimationFrame()

The detector must sample Canvas pixels using:

CanvasRenderingContext2D.getImageData()

Detect the transition:

LOADING gray
→
ACTIVE blue

Use the approved RGB values/tolerance from q1_config.ts.

Do NOT determine readiness using:

- static sleep
- setTimeout as a readiness mechanism
- visibility polling
- DOM bounding boxes
- simple element existence

The state transition must be based on actual Canvas pixel data.

==================================================
6. T0
==================================================

When the detector has validated the Gray → Blue transition:

capture:

T0 = window.performance.now()

T0 must be measured in the browser's performance clock domain.

Do not calculate T0 using a Node.js timestamp.

Do not implement T1 yet.

==================================================
7. M2 VALIDATION
==================================================

Create a real M2 validation flow.

Verify empirically:

M2-01:
Playwright launches successfully.

M2-02:
Browser loads the local testbed.

M2-03:
page.routeWebSocket() intercepts the local WebSocket.

M2-04:
WebSocket frames are actually delayed.

M2-05:
Fibonacci delay progression is observable.

M2-06:
delay never exceeds 8000 ms.

M2-07:
forwarded frames still reach the browser.

M2-08:
Canvas reaches ACTIVE state.

M2-09:
pixel detector uses requestAnimationFrame.

M2-10:
pixel detector uses getImageData.

M2-11:
Gray → Blue transition is detected from pixel data.

M2-12:
T0 is captured using browser performance.now().

M2-13:
no static sleep/visibility polling/bounding-box readiness detection
is used.

Do not claim M3/M4 criteria as passed.

==================================================
8. EXPECTED VS ACTUAL
==================================================

Compare M2 expected behavior against actual execution.

Record genuine discrepancies in:

PROJECT_DOCUMENTATION/IMPLEMENTATION_DEBUG/EXPECTED_VS_ACTUAL.md

If a problem occurs:

Expected
→ Actual
→ Root Cause
→ Fix
→ Re-test
→ Verification

Do not fabricate issues.

==================================================
9. REGRESSION
==================================================

After fixing genuine issues, re-run:

- Milestone 1 testbed startup
- HTTP loading
- WebSocket connectivity
- LOADING → ACTIVE state flow

Ensure M2 did not break M1.

==================================================
10. REFACTOR
==================================================

Inspect only M2 implementation.

Remove only genuine:

- dead code
- unused imports
- duplicate logic
- unnecessary dependencies
- unnecessary abstractions

Do not perform cosmetic refactoring.

==================================================
11. EVIDENCE
==================================================

Capture real evidence for:

- Playwright startup
- WebSocket interception
- Fibonacci delay values
- 8000 ms cap
- forwarded frames
- rAF pixel detection
- Gray → Blue detection
- T0

Store genuine evidence under:

Q1_Dynamic_Canvas_WebSocket/evidence/

Do not create fake evidence.

==================================================
12. DOCUMENTATION
==================================================

Update relevant:

- EXPECTED_VS_ACTUAL.md
- DEBUG_CHANGE_HISTORY.md if genuine debugging occurred
- DEAD_CODE_CLEANUP.md if cleanup occurred
- Q1_Prompt_History.md

Do not modify frozen requirements.

==================================================
13. GIT CHECKPOINT
==================================================

After:

IMPLEMENT
→ TEST
→ EXPECTED VS ACTUAL
→ DEBUG
→ VERIFY
→ REGRESSION
→ REFACTOR
→ DOCUMENT

inspect:

git status
git diff --stat
git diff

Stage ONLY M2-related changes.

Create the milestone commit:

feat(q1): implement websocket interception and pixel detection

Update:

PROJECT_DOCUMENTATION/GIT/COMMIT_HISTORY.md

Commit and push to origin/main.

==================================================
14. STRICT STOP
==================================================

After M2 is implemented, verified, documented, committed, and pushed:

STOP.

Do NOT begin M3.

Report:

1. M2 files created/modified.
2. Actual dependency/API versions.
3. WebSocket interception result.
4. Fibonacci timing evidence.
5. 8000 ms cap evidence.
6. Pixel detection evidence.
7. T0 measurement evidence.
8. M1 regression result.
9. Expected vs Actual findings.
10. Debugging performed.
11. Refactoring performed.
12. Evidence files generated.
13. Git commit hash.
14. Push status.
15. Explicitly confirm:

"Milestone 3 has NOT been started."

---

## Prompt 010
**Date/Time:** 2026-08-13 00:20:29 IST
**Purpose:** Q1 Milestone 3 Implementation Authorization

### Exact Prompt
# Q1 Prompt 010 — Implement Milestone 3: Race, Drift & Circuit Breaker

Q1 Milestones 1 and 2 have been completed, verified, documented,
committed, and pushed.

We are now AUTHORIZING ONLY:

Q1 — MILESTONE 3: RACE, DRIFT & CIRCUIT BREAKER

Record this exact prompt as:

Q1 Prompt 010

in:

Q1_Dynamic_Canvas_WebSocket/prompts/Q1_Prompt_History.md

Preserve chronological prompt numbering and exact prompt text.


==================================================
AUTHORITATIVE DOCUMENTS
==================================================

Use only the frozen:

1. Original assignment PDF
2. PROJECT_DOCUMENTATION/PRD/PRD_v1.0.md
3. PROJECT_DOCUMENTATION/DESIGN_BRIEF/DESIGN_BRIEF_v1.0.md
4. PROJECT_DOCUMENTATION/DESIGN_BRIEF/IMPLEMENTATION_PLAN_v1.0.md
5. .agents/AGENTS.md
6. PROJECT_DOCUMENTATION/WORKFLOW_RULES/AI_ENGINEERING_WORKFLOW.md


==================================================
MILESTONE 3 SCOPE
==================================================

Implement ONLY the approved Implementation Plan phases:

Phase 7:
Race-window execution

Phase 8:
Coordinate drift + stale-frame/repaint handling +
circuit breaker


==================================================
DO NOT IMPLEMENT
==================================================

Do NOT implement Milestone 4 functionality:

- corrupted mathematical payload
- "1e+7" corruption test
- representation contract failure testing
- frontend exception-boundary assertion
- final integrated Q1 suite
- final evidence audit

Do not modify the PRD or frozen Design Brief.


==================================================
1. RACE TIMING MODEL
==================================================

Use the browser's performance clock exclusively.

T0:

Timestamp captured when the Canvas pixel detector has actually
validated the Gray → Blue transition.

T1:

Timestamp captured when the FIRST required interaction event reaches
the Canvas target.

The first interaction event is:

pointerenter / hover

Therefore:

ΔT = T1 - T0

Required:

30 ms <= ΔT <= 100 ms

Do not substitute Node.js Date.now() or another clock.


==================================================
2. REQUIRED INTERACTION SEQUENCE
==================================================

After the validated state transition and controlled race scheduling:

Hover / pointerenter
→ Drag 15 px on X-axis
→ Click

The drag distance must be:

15 px

on the X axis.

Do not alter the required action sequence.

Do not claim the race passes merely because the actions eventually
occur.


==================================================
3. RACE-WINDOW IMPLEMENTATION
==================================================

Implement the smallest deterministic mechanism that targets the
approved design parameter:

TARGET_RACE_DELAY_MS = 50 ms

The 50 ms value is a target/control parameter.

The actual result MUST be measured as:

T1 - T0

using browser performance.now().

Do not replace measurement with the configured delay value.

Log:

- T0
- T1
- ΔT
- configured target delay
- actual interaction event
- pass/fail against 30–100 ms

If ΔT falls outside the required window, treat that as a genuine
failure and debug it.

Do not silently widen the acceptance range.


==================================================
4. COORDINATE REFERENCE MODEL
==================================================

Maintain:

X_reference
Y_reference

and:

X_current
Y_current

Calculate signed deltas:

dx = X_current - X_reference
dy = Y_current - Y_reference

Use:

abs(dx)
abs(dy)

ONLY for threshold comparison.

When updating the coordinate:

X_new = X_reference + dx
Y_new = Y_reference + dy

Never use absolute deviation as the actual movement direction.


==================================================
5. STALE-FRAME DETECTION
==================================================

Use the Milestone 1 freshness foundation:

- frameId
- targetVersion

Before the interaction:

1. capture the current frame/state snapshot
2. validate target coordinates
3. validate frame freshness
4. detect whether a newer frame/state has arrived

If the frame/state changes before action dispatch, the previously
validated target must be considered stale.

Do not continue blindly using stale coordinates.


==================================================
6. REPAINT-LAG HANDLING
==================================================

Account for the possibility that browser rendering has not caught up
with the latest state.

Use the existing Canvas freshness/state model.

The automation must distinguish:

state received
from
state actually reflected by the current Canvas frame.

Do not use arbitrary long sleeps as the solution.

If a repaint/freshness mismatch is detected:

- invalidate the stale snapshot
- obtain the current state
- revalidate
- continue only with a valid current target


==================================================
7. CIRCUIT BREAKER
==================================================

Implement the approved bounded circuit breaker.

Use:

DESIGN_PARAM_DRIFT_THRESHOLD
DESIGN_PARAM_MAX_RETRIES

The retry count must be bounded.

Required conceptual flow:

validate
→ mismatch?
→ calculate signed dx/dy
→ update target offset
→ retry
→ revalidate

If the mismatch remains unresolved:

retry 1
retry 2
retry 3
→ controlled failure

Never create an unbounded retry loop.


==================================================
8. NORMAL-PATH VALIDATION
==================================================

Produce real execution evidence showing:

fresh frame
→ valid target
→ T0
→ hover/pointerenter
→ T1
→ ΔT
→ drag 15 px
→ click

The measured ΔT must be within:

30–100 ms

Do not fabricate timing results.


==================================================
9. DRIFT RECOVERY VALIDATION
==================================================

Create a controlled test condition where the target position changes
between validation and action.

The implementation must demonstrate:

1. original target captured
2. target position changes
3. stale/mismatch detected
4. signed dx/dy calculated
5. target coordinates updated
6. bounded retry performed
7. action succeeds using the current target

Test both positive and negative coordinate deviation where practical.

At minimum, verify that negative movement is not incorrectly converted
into positive movement.


==================================================
10. STALE-FRAME VALIDATION
==================================================

Create a controlled stale-frame condition.

Demonstrate:

old frame
→ detected stale
→ rejected
→ fresh frame obtained
→ action proceeds

Do not merely log "stale handled".

The evidence must demonstrate the state/version difference.


==================================================
11. CIRCUIT-BREAKER LIMIT VALIDATION
==================================================

Verify the maximum retry limit.

A controlled failure scenario should demonstrate that the circuit
breaker does not retry indefinitely.

The final result must be a controlled failure after the configured
maximum retry count.

Do not damage the normal successful path to perform this test.


==================================================
12. M3 ACCEPTANCE VALIDATION
==================================================

Verify the M3-related acceptance requirements, particularly:

AC-Q1-12:
30–100 ms race window.

AC-Q1-13:
coordinate deviation handling.

AC-Q1-14:
stale-frame handling.

AC-Q1-15:
browser repaint-lag handling.

AC-Q1-16:
the circuit breaker dynamically updates offsets.

Do not claim unrelated M4 criteria.


==================================================
13. EXPECTED VS ACTUAL
==================================================

For every genuine M3 discrepancy:

Expected
→ Actual
→ Root Cause
→ Fix
→ Re-test
→ Verification

Record in:

PROJECT_DOCUMENTATION/IMPLEMENTATION_DEBUG/EXPECTED_VS_ACTUAL.md

Do not fabricate issues.


==================================================
14. DEBUGGING PRIORITY
==================================================

M3 is the highest-risk milestone.

Spend debugging effort primarily on:

1. timing reliability
2. T0/T1 correctness
3. actual interaction event timing
4. stale frame detection
5. repaint lag
6. signed coordinate correction
7. bounded retries

Do not hide flaky behavior.

If a test intermittently fails, investigate the cause rather than
simply rerunning until it passes.


==================================================
15. M1 + M2 REGRESSION
==================================================

After M3 implementation and debugging, re-run the relevant M1/M2
checks:

- HTTP startup
- WebSocket connectivity
- routeWebSocket interception
- Fibonacci jitter
- pixel detection
- T0 detection

Confirm that M3 did not regress previous milestones.


==================================================
16. REFACTOR
==================================================

Inspect M3 code for genuine:

- dead code
- unused imports
- duplicate logic
- unnecessary abstractions
- unsafe retry loops

Remove only genuine problems.

Do not perform cosmetic refactoring.


==================================================
17. EVIDENCE
==================================================

Capture real evidence for:

1. T0
2. T1
3. ΔT
4. successful race
5. 15 px drag
6. coordinate drift
7. signed dx/dy
8. stale-frame detection
9. repaint/freshness handling
10. retry count
11. circuit-breaker controlled failure

Store evidence under:

Q1_Dynamic_Canvas_WebSocket/evidence/

Do not fabricate evidence.


==================================================
18. DOCUMENTATION
==================================================

Update:

- EXPECTED_VS_ACTUAL.md
- DEBUG_CHANGE_HISTORY.md if debugging occurred
- DEAD_CODE_CLEANUP.md if cleanup occurred
- Q1_Prompt_History.md

Do not modify frozen requirements.


==================================================
19. GIT CHECKPOINT
==================================================

After:

IMPLEMENT
→ TEST
→ EXPECTED VS ACTUAL
→ DEBUG
→ VERIFY
→ REGRESSION
→ REFACTOR
→ DOCUMENT

inspect:

git status
git diff --stat
git diff

Stage only M3 changes.

Create:

feat(q1): implement race execution and circuit breaker

Update:

PROJECT_DOCUMENTATION/GIT/COMMIT_HISTORY.md

Commit and push to origin/main.


==================================================
20. STRICT STOP
==================================================

After M3 is fully implemented, tested, debugged, verified,
regression-tested, documented, committed, and pushed:

STOP.

Do NOT begin Milestone 4.

Report:

1. M3 files created/modified.
2. Normal race timing result.
3. T0.
4. T1.
5. ΔT.
6. 15 px drag verification.
7. Drift recovery evidence.
8. Signed dx/dy evidence.
9. Stale-frame evidence.
10. Repaint-lag evidence.
11. Circuit-breaker retry-limit evidence.
12. M1/M2 regression result.
13. Expected vs Actual findings.
14. Debugging performed.
15. Refactoring performed.
16. Evidence generated.
17. Git commit hash.
18. Push status.

Finally state explicitly:

"Milestone 4 has NOT been started."

---









