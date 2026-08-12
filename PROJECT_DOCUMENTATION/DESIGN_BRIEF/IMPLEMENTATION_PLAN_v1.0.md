# Q1 Implementation Plan — Dynamic HTML5 Canvas State Drifts & Asynchronous Race Interceptions
**Document Version:** v1.0 (Rev 1)  
**Status:** DRAFT FOR REVIEW  
**Date:** 2026-08-12  
**Author:** AI-Native Engineering Workspace  

---

## 1. Objective & Scope Alignment

This document outlines the concrete, step-by-step implementation plan for Question 1 (Q1). It translates the frozen [PRD_v1.0.md](file:///c:/Users/91630/Desktop/Code%20Playground/Manti%20Yoshi%20Anurag_SRM%20University%20AP_AP2311011041/PROJECT_DOCUMENTATION/PRD/PRD_v1.0.md) and [DESIGN_BRIEF_v1.0.md](file:///c:/Users/91630/Desktop/Code%20Playground/Manti%20Yoshi%20Anurag_SRM%20University%20AP_AP2311011041/PROJECT_DOCUMENTATION/DESIGN_BRIEF/DESIGN_BRIEF_v1.0.md) into planned source file responsibilities, dependency-aware implementation phases, risk mitigations, verification checkpoints, and evidence capture locations.

**Scope Lock Warning**: This plan specifies ONLY what is required for Q1. No extra features, databases, frameworks, or Q2/Q3 components are included.

---

## 2. Target Implementation Directory & Source File Responsibilities

All implementation artifacts will reside exclusively within:
`Q1_Dynamic_Canvas_WebSocket/source/`

### Planned Source Directory Structure

```text
Q1_Dynamic_Canvas_WebSocket/source/
├── package.json                   # Minimum Node.js dependencies & execution scripts
├── tsconfig.json                  # TypeScript compiler configuration
├── config/
│   └── q1_config.ts               # Assignment constants & configurable design parameters
├── server/
│   └── app_server.ts              # Local HTTP & WebSocket testbed server (Node.js http + ws)
├── client/
│   ├── index.html                 # Minimal HTML5 Canvas container & DOM exception boundary
│   ├── canvas_app.js              # Canvas rendering, rAF detector, WS client, T1 listener
│   └── style.css                  # Simple grid styling
├── automation/
│   ├── ws_interceptor.ts          # Playwright routeWebSocket interceptor & Fibonacci jitter
│   ├── pixel_detector.ts          # In-browser rAF pixel transition evaluator (captures T0)
│   ├── action_executor.ts         # Mouse action chain executor & T1/deltaT calculator
│   └── circuit_breaker.ts         # Pre-click signed offset calculation & frame freshness validator
└── run_q1_suite.ts                # Integrated Playwright test suite runner & logger
```

### File-Level Responsibilities & AC Coverage

| Planned File Path | Purpose & Responsibility | Inputs / Outputs | Supported ACs |
|---|---|---|---|
| `config/q1_config.ts` | Centralized constants & design parameters | Inputs: Environment variables<br>Outputs: Typed Config object | All ACs |
| `server/app_server.ts` | Single process HTTP static server (`http://localhost:8080`) & WS server (`ws://localhost:8080/ws`) using Node.js built-in `http` + `ws` | Inputs: Port config, static files<br>Outputs: HTTP index.html/assets & WS JSON frame stream | AC-Q1-01, AC-Q1-17 |
| `client/index.html` | Minimal DOM structure & Exception Boundary UI container | Inputs: Browser DOM<br>Outputs: Canvas element & Exception Boundary | AC-Q1-01, AC-Q1-18 |
| `client/canvas_app.js` | 2D Canvas rendering, WS client, `rAF` pixel sampler with `frameId` & `targetVersion`, initial `pointerenter` $T1$ event listener | Inputs: WS messages, mouse events<br>Outputs: Canvas frames, $T0$/$T1$ browser timestamps, frame freshness markers | AC-Q1-05, AC-Q1-06, AC-Q1-10, AC-Q1-12, AC-Q1-14, AC-Q1-15, AC-Q1-18 |
| `automation/ws_interceptor.ts` | Playwright `page.routeWebSocket` handler injecting Fib delay & mutating representation contract | Inputs: WS WebSocketRoute frames<br>Outputs: Delayed/mutated WS frames | AC-Q1-02, AC-Q1-03, AC-Q1-04, AC-Q1-17 |
| `automation/pixel_detector.ts` | Script evaluating Canvas `getImageData` via `rAF` until Blue state confirmed | Inputs: Canvas 2D Context<br>Outputs: Browser $T0$ timestamp (`performance.now()`), initial `targetVersion` | AC-Q1-05, AC-Q1-06, AC-Q1-07, AC-Q1-08, AC-Q1-09 |
| `automation/action_executor.ts` | Playwright mouse dispatcher (Hover $\rightarrow$ Drag 15px X-axis $\rightarrow$ Click) | Inputs: Target coordinates, $T0$<br>Outputs: Dispatched mouse events, $T1$, $\Delta T$ | AC-Q1-11, AC-Q1-12 |
| `automation/circuit_breaker.ts` | Signed 2D offset calculator ($dx, dy$) & frame freshness validator (`frameId`, `targetVersion`) | Inputs: Reference vs current coords, frame markers<br>Outputs: Signed adjusted coordinates ($X_{new}, Y_{new}$) or trip signal | AC-Q1-13, AC-Q1-14, AC-Q1-15, AC-Q1-16 |
| `run_q1_suite.ts` | Main execution runner executing scenarios and outputting structured JSON logs | Inputs: Test scenarios<br>Outputs: Structured evidence log & PASS/FAIL status | All ACs (AC-Q1-01 to AC-Q1-19) |

---

## 3. Milestone-Based Execution Strategy (Four Milestones)

To optimize implementation efficiency while strictly preserving engineering discipline, the 10 approved implementation phases are grouped into **FOUR Execution Milestones**. Engineering verification, expected vs. actual comparison, debugging, and git checkpoints occur at each milestone boundary:

```text
IMPLEMENT MILESTONE ──> TEST ──> EXPECTED VS ACTUAL ──> DEBUG ──> VERIFY ──> REGRESSION TEST ──> REFACTOR ──> DOCUMENT ──> COMMIT ──> NEXT MILESTONE
```

```text
MILESTONE 1: FOUNDATION & TESTBED (Phases 1–3)
  ├── Project Config & Type Setup (package.json, tsconfig.json, q1_config.ts)
  ├── App Server (server/app_server.ts: Node.js http + ws serving http://localhost:8080)
  └── Canvas Client (client/index.html, canvas_app.js: 4x4 Grid, Gray Loading -> Blue Active, frameId & targetVersion markers)
   │
   ▼
MILESTONE 2: NETWORK INTERCEPTION & PIXEL DETECTION (Phases 4–6)
  ├── Playwright Harness & Interceptor (automation/ws_interceptor.ts: page.routeWebSocket)
  ├── Fibonacci Jitter Engine ($1000ms \times Fib(n)$, capped at 8000ms)
  └── Embedded rAF Pixel Detector (automation/pixel_detector.ts: getImageData RGB evaluation, Gray->Blue transition, T0 capture)
   │
   ▼
MILESTONE 3: RACE, DRIFT & CIRCUIT BREAKER (Phases 7–8) [HIGHEST RISK]
  ├── Single-Clock Race Execution (automation/action_executor.ts: Hover T1, ΔT validation 30–100ms, Drag 15px X, Click)
  └── Signed 2D Drift & Frame Freshness Circuit Breaker (automation/circuit_breaker.ts: dx, dy deltas, frameId/targetVersion freshness)
   │
   ▼
MILESTONE 4: CORRUPTION, INTEGRATION & FINAL VERIFICATION (Phases 9–10)
  ├── Corrupted Representation Payload & Exception Boundary (balance "1e+7", contract violation)
  ├── Integrated Q1 Test Suite (run_q1_suite.ts: 6 Test Scenarios, 19 ACs)
  └── Evidence Storage & Auditing (evidence/q1_execution_log.json, timing benchmarks, scope lock audit)
```

### Milestone Breakdown & Scope

#### Milestone 1 — Foundation & Testbed (Phases 1–3)
- **Scope**: Configuration (`q1_config.ts`), single-process HTTP/WS server (`app_server.ts`), and HTML5 Canvas client (`index.html`, `canvas_app.js`).
- **Target Capability**: Playwright browser loads `http://localhost:8080` via HTTP, Canvas connects to WebSocket, and cell state machine manages Gray loading $\rightarrow$ Blue active states with `frameId` and `targetVersion` freshness markers.
- **Milestone Verification**: HTTP status 200 ping, WS handshake log, DOM Canvas element render verification.
- **Git Checkpoint**: `feat(q1): implement foundation and canvas testbed`

#### Milestone 2 — Network Interception & Pixel Detection (Phases 4–6)
- **Scope**: Playwright automation harness, `page.routeWebSocket()` interceptor, Fibonacci jitter engine ($1000\text{ ms} \times \text{Fib}$, $8000\text{ ms}$ cap), embedded `requestAnimationFrame` pixel detector, and browser `window.performance.now()` $T0$ capture.
- **Target Capability**: Intercepts WebSocket frames, applies Fibonacci delay schedule, detects exact Canvas pixel color transition (Gray $\rightarrow$ Blue) via `rAF` without static sleep, and captures $T0$.
- **Milestone Verification**: WS frame interception timestamp log, Fibonacci delay scaling log, $T0$ browser timestamp capture log.
- **Git Checkpoint**: `feat(q1): implement websocket interception and pixel detection`

#### Milestone 3 — Race, Drift & Circuit Breaker (Phases 7–8) [Highest Risk / Highest Priority]
- **Scope**: Single-clock race timing engine ($T1$ at first `pointerenter`/`hover` event, $\Delta T = T1 - T0$), race action sequence (Hover $\rightarrow$ Drag 15px X-axis $\rightarrow$ Click), signed 2D coordinate drift ($dx = X_{curr} - X_{ref}, dy = Y_{curr} - Y_{ref}$), and frame freshness circuit breaker (`frameId`, `targetVersion`).
- **Target Capability**: Dispatches race action sequence within $30\text{ ms} \le \Delta T \le 100\text{ ms}$; evaluates signed 2D offsets ($dx, dy$) and skips stale frames if `targetVersion` updates or `frameId` stalls.
- **Milestone Verification**: Single-clock timing benchmark log ($T0, T1, \Delta T$), signed 2D offset log, frame freshness skip log.
- **Git Checkpoint**: `feat(q1): implement race execution and circuit breaker`

#### Milestone 4 — Corruption, Integration & Final Verification (Phases 9–10)
- **Scope**: Corrupted mathematical state payload injection (`"1e+7"`), representation contract validation, structured exception boundary assertion, integrated Q1 test suite (`run_q1_suite.ts`), and structured evidence logging.
- **Target Capability**: Mutates WS balance payload, asserts client invokes structured exception boundary (failing on silent corruption), executes all 6 Q1 test scenarios, and logs complete evidence package.
- **Milestone Verification**: Exception boundary assertion log, 19 AC coverage verification, 10-point audit (Expected vs Actual, Debugging, Regression, Refactoring, Evidence, Prompt History, Git History, Scope Lock).
- **Git Checkpoint**: `feat(q1): complete corruption validation and q1 integration`

---

## 4. Dependency Plan

The implementation will utilize the minimal required Node.js package set:

| Package Name | Planned Purpose | Version Constraint | Rationale |
|---|---|---|---|
| `playwright` | Browser automation & native WebSocket routing | Latest stable supporting `page.routeWebSocket` | Required for native WS routing and high-precision mouse control |
| `ws` | Local WebSocket testbed server | `^8.14.0` | Minimal standalone WebSocket server with zero framework overhead |
| `typescript` | Type-safe development | `^5.0.0` | Type-safety for automation scripts |
| `@types/ws` | Type definitions for `ws` | `^8.5.0` | TypeScript support for WS server |

*Zero external HTTP frameworks (Express/Koa), UI libraries (React/Vue), or database connectors will be installed. Static HTTP serving utilizes Node.js built-in `http` module.*

---

## 5. Configuration Plan

Configuration values are explicitly divided into Assignment Constants and Configurable Design Parameters:

### 5.1 Assignment Constants (Frozen)
- **`FIBONACCI_BASE_DELAY`**: $1000\text{ ms}$ ($1000\text{ ms} \times \text{Fib step}$).
- **`FIBONACCI_MAX_CAP`**: $8000\text{ ms}$ (Strict upper limit).
- **`RACE_WINDOW_MIN_MS`**: $30\text{ ms}$.
- **`RACE_WINDOW_MAX_MS`**: $100\text{ ms}$.
- **`DRAG_X_DISTANCE_PX`**: $15\text{px}$ (X-axis drag distance).

### 5.2 Configurable Design Parameters (Adjustable)
- **`LOCAL_SERVER_PORT`**: `8080` (Local HTTP & WS server port).
- **`LOCAL_APP_URL`**: `http://localhost:8080` (Concrete browser entry URL).
- **`CANVAS_WIDTH` / `CANVAS_HEIGHT`**: $800 \times 600$ pixels.
- **`COLOR_GRAY_RGB`**: $[128, 128, 128] \pm 10$ (Loading threshold).
- **`COLOR_BLUE_RGB`**: $[0, 85, 255] \pm 10$ (Active element threshold).
- **`DESIGN_PARAM_DRIFT_THRESHOLD`**: $20\text{px}$ (Max allowable offset magnitude before tripping breaker).
- **`DESIGN_PARAM_MAX_RETRIES`**: $3$ (Max frame retries).
- **`TARGET_RACE_DELAY_MS`**: $50\text{ ms}$ (Nominal target within $30\text{ ms} \le \Delta T \le 100\text{ ms}$).

---

## 6. Detailed Component Implementation Plans

### 6.1 Unified Local App Server Plan (`server/app_server.ts`)
- Implements single-process Node.js HTTP + WS server using built-in `http` and `ws`:
  - `http.createServer`: Serves `client/index.html`, `client/canvas_app.js`, `client/style.css` over HTTP at `http://localhost:8080/`.
  - `new WebSocketServer({ server })`: Mounts WS endpoint at `ws://localhost:8080/ws`.
- Transmits dynamic state JSON frames every 500 ms.
- Manages client connection lifecycle cleanly.
- Accepts test control flags to trigger corrupted representation payload (`"1e+7"` balance) during specific test runs.

### 6.2 Canvas Client Plan (`client/index.html` & `canvas_app.js`)
- Initializes $800 \times 600$ Canvas with 2D Context.
- Renders 4x4 layout grid; target cell defaults to Gray (`#808080`).
- Exposes explicit frame freshness markers:
  - `frameId`: Counter incremented on every `requestAnimationFrame` render frame.
  - `targetVersion`: Counter incremented whenever target coordinates or layout state update.
- Listens to incoming WebSocket frames; updates target cell color to Blue (`#0055FF`) upon receiving `ACTIVE` state.
- Exposes in-browser `window.__startPixelDetection()` loop using `requestAnimationFrame`.
- Attaches DOM event listener (`pointerenter`/`hover`) on Canvas to capture $T1 = \text{window.performance.now()}$ at the exact moment the FIRST interaction event reaches the Canvas element.
- Includes structured exception boundary logic catching representation contract violations (`"1e+7"` balance) and triggering an observable error state attribute `data-exception-boundary="triggered"`.

### 6.3 WebSocket Interception & Fibonacci Jitter Plan (`automation/ws_interceptor.ts`)
- Registers `page.routeWebSocket()` on Chromium browser context.
- Hooks incoming server message frames.
- Calculates Fibonacci delay: $D(n) = \min(1000 \times \text{Fib}(n), 8000)$.
- Applies async delay before calling `routeWebSocket.send()` to deliver frame to browser.
- For corrupted test scenario, mutates payload balance field to `"1e+7"` prior to forwarding.

### 6.4 Single-Clock Race Execution Plan (`automation/action_executor.ts`)
- **$T0$**: High-resolution timestamp (`window.performance.now()`) recorded in browser memory when `rAF` pixel sampler validates Blue state.
- **$T1$**: High-resolution timestamp (`window.performance.now()`) recorded in browser memory when the FIRST required interaction event (initial `pointerenter`/`hover`) reaches the Canvas element.
- **Action Sequence**: Playwright dispatches `hover(x, y)` $\rightarrow$ `mouse.down()` $\rightarrow$ `mouse.move(x + 15, y)` $\rightarrow$ `mouse.up()` $\rightarrow$ `click()`.
- **Elapsed Delta Calculation**: $\Delta T = T1 - T0$ computed strictly inside browser context; asserts $30\text{ ms} \le \Delta T \le 100\text{ ms}$.

### 6.5 Signed 2D Coordinate Drift & Frame Freshness Circuit Breaker Plan (`automation/circuit_breaker.ts`)
- **Signed 2D Coordinate Delta Calculation**:
  ```text
  dx = X_current - X_reference
  dy = Y_current - Y_reference
  X_new = X_reference + dx
  Y_new = Y_reference + dy
  ```
- **Threshold Magnitude Check**: Evaluates `abs(dx)` and `abs(dy)` against `DESIGN_PARAM_DRIFT_THRESHOLD` ($20\text{px}$). Accounts for both positive and negative movement on X and Y axes.
- **Frame Freshness & Repaint Lag Verification**:
  1. Circuit breaker captures initial `targetVersion` and `frameId` at pixel validation time ($T0$).
  2. Immediately prior to dispatching action, circuit breaker verifies current `targetVersion` and confirms `frameId` has advanced.
  3. If `targetVersion` changed or `frameId` stalled (repaint lag), circuit breaker marks frame as STALE, aborts current action dispatch, recalculates signed offsets ($dx, dy$), and waits for next CURRENT frame render.
  4. Retries up to `DESIGN_PARAM_MAX_RETRIES` ($3$) before executing controlled failure.

---

## 7. Integrated Test Execution Plan & Scenario Matrix

| Scenario ID | Test Scenario Description | Preconditions | Action Sequence | Expected Result | Covered ACs | Planned Evidence |
|---|---|---|---|---|---|---|
| **TS-Q1-01** | Local HTTP & WS Server Connectivity | `app_server.ts` running at `http://localhost:8080` | Connect Playwright browser to `http://localhost:8080` | Browser loads `index.html`, WS stream active | AC-Q1-01 | Connection log & HTTP status 200 |
| **TS-Q1-02** | WS Interception & Fibonacci Jitter | Active WS connection | Intercept frames, apply Fib delay | Frames delayed by Fib scale ($1\text{s}, 1\text{s}, 2\text{s}, \dots$), capped at $8\text{s}$ | AC-Q1-02, AC-Q1-03, AC-Q1-04 | Interceptor timestamp log |
| **TS-Q1-03** | Canvas `rAF` Pixel State Detection | Canvas rendering Loading Gray | Execute `rAF` sampler until Active Blue | Color transition detected accurately via `rAF` without static sleep for readiness | AC-Q1-05, AC-Q1-06, AC-Q1-07, AC-Q1-08, AC-Q1-09, AC-Q1-10 | Pixel transition log ($T0$) |
| **TS-Q1-04** | Single-Clock Race Execution | $T0$ validated | Dispatch Hover (initial event $T1$) $\rightarrow$ Drag 15px $\rightarrow$ Click | Interaction $T1$ arrives within $30\text{ ms} \le \Delta T \le 100\text{ ms}$ | AC-Q1-11, AC-Q1-12 | Single-clock benchmark log ($T0, T1, \Delta T$) |
| **TS-Q1-05** | Signed 2D Drift & Repaint Lag Circuit Breaker | Simulated repaint drift ($\pm 15\text{px}$) & repaint lag | Execute circuit breaker signed offset check & frame freshness validation | Signed offsets ($dx, dy$) updated; stale frames skipped cleanly | AC-Q1-13, AC-Q1-14, AC-Q1-15, AC-Q1-16 | Circuit breaker signed offset & freshness log |
| **TS-Q1-06** | Corrupted Representation Payload & Exception Boundary | WS Interceptor active | Mutate balance field to `"1e+7"` | Frontend triggers structured exception boundary; silent corruption fails | AC-Q1-17, AC-Q1-18, AC-Q1-19 | Exception assertion log |

---

## 8. Re-Audited Acceptance Criteria Mapping Matrix

All 19 Q1 acceptance criteria have been re-audited against the refined plan:

| PRD Acceptance Criterion | Planned Source File / Component | Implementation Phase | Verification Method | Re-Audit Verification Status |
|---|---|---|---|---|
| **AC-Q1-01** (Testbed Availability) | `server/app_server.ts`, `client/index.html` | Phase 2, Phase 3 | HTTP GET `http://localhost:8080` & WS Ping | **VERIFIED** — Concrete local URL served via Node.js built-in `http` + `ws` |
| **AC-Q1-02** (Active WS Hooking) | `automation/ws_interceptor.ts` | Phase 4 | Route Interception Log | **VERIFIED** — Playwright `page.routeWebSocket` frame hook |
| **AC-Q1-03** (Fibonacci Delay) | `automation/ws_interceptor.ts` | Phase 5 | Interception Delay Log | **VERIFIED** — $1000\text{ ms} \times \text{Fib}(n)$ scaling calculation |
| **AC-Q1-04** (8000 ms Delay Cap) | `automation/ws_interceptor.ts` | Phase 5 | Delay Cap Assertion Log | **VERIFIED** — Strict `Math.min(delay, 8000)` ceiling |
| **AC-Q1-05** (Pixel Color Detection) | `automation/pixel_detector.ts` | Phase 6 | `getImageData` Log | **VERIFIED** — RGB evaluation at target coordinates |
| **AC-Q1-06** (`rAF` Execution Loop) | `client/canvas_app.js`, `automation/pixel_detector.ts` | Phase 6 | Embedded JS Loop Log | **VERIFIED** — In-browser `window.requestAnimationFrame` loop |
| **AC-Q1-07** (No Static Sleep for Readiness) | `automation/pixel_detector.ts` | Phase 6 | Static Code Audit | **VERIFIED** — Zero static sleep in readiness detection path |
| **AC-Q1-08** (No Visibility Polling) | `automation/pixel_detector.ts` | Phase 6 | Static Code Audit | **VERIFIED** — Zero DOM visibility polling |
| **AC-Q1-09** (No Bounding-Box Checks) | `automation/pixel_detector.ts` | Phase 6 | Static Code Audit | **VERIFIED** — State based purely on pixel RGB values |
| **AC-Q1-10** (Gray $\rightarrow$ Active State) | `client/canvas_app.js` | Phase 3, Phase 6 | Pixel Transition Log | **VERIFIED** — RGB transition check from `#808080` to `#0055FF` |
| **AC-Q1-11** (Action Sequence Order) | `automation/action_executor.ts` | Phase 7 | Playwright Action Log | **VERIFIED** — Hover $\rightarrow$ Drag 15px X-axis $\rightarrow$ Click sequence |
| **AC-Q1-12** ($30\text{ ms} \le \Delta T \le 100\text{ ms}$) | `automation/action_executor.ts` | Phase 7 | Single Clock Benchmark Log | **VERIFIED** — $T0$ and $T1$ (first hover event) measured in single browser `performance.now()` clock domain |
| **AC-Q1-13** (Coordinate Deviation) | `automation/circuit_breaker.ts` | Phase 8 | Offset Calculation Log | **VERIFIED** — Signed 2D deltas ($dx, dy$) accounting for +/- X and Y movement |
| **AC-Q1-14** (Stale Frame Handling) | `automation/circuit_breaker.ts` | Phase 8 | Frame Skip Log | **VERIFIED** — Frame freshness tracking (`frameId`, `targetVersion`) |
| **AC-Q1-15** (Repaint Lag Handling) | `automation/circuit_breaker.ts` | Phase 8 | Repaint Delay Log | **VERIFIED** — Repaint lag detection & frame render waiting |
| **AC-Q1-16** (Circuit Breaker Offset Updates) | `automation/circuit_breaker.ts` | Phase 8 | Circuit Breaker Log | **VERIFIED** — Dynamic signed offset update ($X_{new}, Y_{new}$) |
| **AC-Q1-17** (Corrupted State Injection) | `automation/ws_interceptor.ts` | Phase 9 | Payload Injection Log | **VERIFIED** — Injected representation contract violation (`"1e+7"`) |
| **AC-Q1-18** (Exception Boundary Check) | `client/canvas_app.js`, `run_q1_suite.ts` | Phase 9 | Exception Boundary Assertion Log | **VERIFIED** — Assertion of structured frontend exception boundary |
| **AC-Q1-19** (Silent Corruption Flagging) | `run_q1_suite.ts` | Phase 9, Phase 10 | Assertion Failure Log | **VERIFIED** — Test fails if representation violation renders silently |

---

## 9. Evidence Storage Strategy

All execution evidence generated during test runs will be captured dynamically and stored under:
`Q1_Dynamic_Canvas_WebSocket/evidence/`

### Planned Evidence Files
- `evidence/q1_execution_log.json`: Structured execution event trace (WS interception, Fib steps, pixel transition, circuit breaker checks).
- `evidence/q1_timing_benchmark.log`: Millisecond timing logs for single-clock $T0$, $T1$, and $\Delta T$.
- `evidence/q1_exception_boundary_assertion.log`: Output verifying exception boundary invocation vs silent corruption.

---

## 10. Debugging & Verification Workflow

During implementation, the workspace engineering rules will be strictly enforced:
1. **`IMPLEMENT`**: Code written phase by phase.
2. **`TEST`**: Execute specific test scenario.
3. **`COMPARE EXPECTED vs ACTUAL`**: If actual behavior deviates from expected, record details in `PROJECT_DOCUMENTATION/IMPLEMENTATION_DEBUG/EXPECTED_VS_ACTUAL.md`.
4. **`DEBUG`**: Trace root cause and apply minimal targeted fix.
5. **`VERIFY`**: Re-run scenario to confirm resolution.
6. **`REFACTOR / CLEAN UP`**: Clean up temporary code; record non-cosmetic refactoring in `PROJECT_DOCUMENTATION/REFACTOR/DEAD_CODE_CLEANUP.md`.
7. **`DOCUMENT & COMMIT`**: Record commit in `PROJECT_DOCUMENTATION/GIT/COMMIT_HISTORY.md` and commit with clean conventional message.

---

## 11. Planned Git Checkpoint Schedule

Primary implementation commits map directly to the **FOUR Execution Milestones**:
- **Milestone 1 Checkpoint**: `feat(q1): implement foundation and canvas testbed`
- **Milestone 2 Checkpoint**: `feat(q1): implement websocket interception and pixel detection`
- **Milestone 3 Checkpoint**: `feat(q1): implement race execution and circuit breaker`
- **Milestone 4 Checkpoint**: `feat(q1): complete corruption validation and q1 integration`

*If genuine debugging requires an intermediate fix commit, standard conventional fix messages (e.g. `fix(q1): resolve ...`) will be recorded transparently in `COMMIT_HISTORY.md`.*


---

## 12. Implementation Risk Ranking & Mitigation

| Risk Rank | Technical Component / Challenge | Risk Description | Planned Mitigation Strategy |
|---|---|---|---|
| **1 (Highest)** | Single Clock Race Execution ($\Delta T$) | Process clock skew between Node.js and Chromium causing invalid $\Delta T$ | Perform both $T0$ and $T1$ (initial hover) recording strictly inside browser `window.performance.now()` context. |
| **2** | Playwright WebSocket Interception | Unhandled async buffer timing causing frame drops | Use `page.routeWebSocket` event listeners with explicit promise delay resolution. |
| **3** | Embedded `rAF` Pixel Detection | Background anti-aliasing noise causing false positives | Use exact center pixel sampling with explicit RGB threshold bounds ($\pm 10$). |
| **4** | Circuit Breaker Signed Offset Recalculation | Target shifting mid-action resulting in missed click | Execute pre-action signed offset check ($dx, dy$) & frame freshness verification immediately before dispatching mouse events. |
| **5 (Lowest)** | Corrupted Payload Injection | Payload mutation format rejected before stream delivery | Mutate JSON frame string directly inside `routeWebSocket.send()` handler. |

---

## 13. Implementation Stop Conditions

Coding will immediately pause and revert to user review if any of the following occur:
1. Playwright's `page.routeWebSocket` API exhibits unexpected platform behavior or unresolvable frame buffering lag.
2. Browser `window.performance.now()` clock origin cannot be accessed cleanly via event listeners.
3. The Canvas testbed pixel detector produces inconsistent false positives despite RGB threshold tuning.
4. Any requirement ambiguity arises that conflicts with frozen [PRD_v1.0.md](file:///c:/Users/91630/Desktop/Code%20Playground/Manti%20Yoshi%20Anurag_SRM%20University%20AP_AP2311011041/PROJECT_DOCUMENTATION/PRD/PRD_v1.0.md) or [DESIGN_BRIEF_v1.0.md](file:///c:/Users/91630/Desktop/Code%20Playground/Manti%20Yoshi%20Anurag_SRM%20University%20AP_AP2311011041/PROJECT_DOCUMENTATION/DESIGN_BRIEF/DESIGN_BRIEF_v1.0.md).
