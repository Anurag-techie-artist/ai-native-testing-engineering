# Design Brief — Q1: Dynamic HTML5 Canvas State Drifts & Asynchronous Race Interceptions
**Document Version:** v1.0  
**Status:** DRAFT FOR REVIEW  
**Date:** 2026-08-12  
**Author:** AI-Native Engineering Workspace  

---

## 1. Authoritative Sources & Scope Boundaries

This Design Brief formalizes **HOW** Question 1 (Q1) will be built, adhering strictly to:
1. The original Frugal Testing Assignment PDF specifications.
2. The approved Product Requirements Document: [PRD_v1.0.md](file:///c:/Users/91630/Desktop/Code%20Playground/Manti%20Yoshi%20Anurag_SRM%20University%20AP_AP2311011041/PROJECT_DOCUMENTATION/PRD/PRD_v1.0.md).
3. Workspace operating rules: [AI_ENGINEERING_WORKFLOW.md](file:///c:/Users/91630/Desktop/Code%20Playground/Manti%20Yoshi%20Anurag_SRM%20University%20AP_AP2311011041/PROJECT_DOCUMENTATION/WORKFLOW_RULES/AI_ENGINEERING_WORKFLOW.md) and [.agents/AGENTS.md](file:///c:/Users/91630/Desktop/Code%20Playground/Manti%20Yoshi%20Anurag_SRM%20University%20AP_AP2311011041/.agents/AGENTS.md).

---

## 2. Design Objective & Architectural Principles

### 2.1 Objective
Design a minimal, highly deterministic, and locally reproducible engineering testbed and automation suite that satisfies all 19 acceptance criteria specified in PRD v1.0 for dynamic HTML5 Canvas state drift, WebSocket jitter injection, asynchronous race execution, and corrupted state boundary assertion.

### 2.2 Core Architectural Principles
- **Minimalism & Scope Lock**: No databases, cloud services, microservices, container orchestrators, external UI frameworks, or third-party authentication.
- **Local Reproducibility**: 100% locally executable after dependency installation; runtime testbed requires no external network services.
- **Deterministic Observability**: High-resolution timestamp logging ($T0$, $T1$, $\Delta T$, Fib step, pixel evaluation logs) suitable for execution evidence.

---

## 3. Technology Decision Analysis & Stack Selection

### 3.1 Technology Evaluation

#### 1. WebSocket Interception Mechanism
- **Option A: Playwright Native Route (`page.routeWebSocket`)** — Direct browser API hook for WebSocket frames. High precision, zero extra proxy processes.
- **Option B: Chrome DevTools Protocol (CDP `Network.enable`)** — Low-level event listening. Powerful, but browser-vendor locked and higher complexity.
- **Option C: Local Proxy Server (e.g. `http-proxy`)** — External port proxying. Adds process orchestration overhead.
- *Selection*: **Option A (Playwright Native `page.routeWebSocket`)** for minimal architectural complexity and native browser event integration.

#### 2. Browser Automation Engine
- **Option A: Playwright (Node.js)** — Native WebSocket route interception (`WebSocketRoute`), high-precision mouse actions, `evaluateHandle` for `requestAnimationFrame`.
- **Option B: Selenium WebDriver** — Heavy legacy API, lacks native WebSocket frame route manipulation without external proxy.
- *Selection*: **Option A (Playwright)**.

#### 3. Implementation Language
- **Option A: Node.js / TypeScript** — Native async/await, unified engine for browser automation and local WebSocket server (`ws` library).
- **Option B: Python** — Good async support (`playwright-python`), but dual runtime context overhead for local testbed server.
- *Selection*: **Option A (Node.js / TypeScript)**.

### 3.2 Stack Decision Matrix

| Dimension | Selected Technology | Rationale |
|---|---|---|
| **Automation Engine** | Playwright (Node.js, release supporting `page.routeWebSocket`) | Built-in WebSocket routing and high-resolution timing APIs |
| **Language & Runtime** | Node.js / TypeScript | Single runtime for testbed server and automation runner |
| **WebSocket Testbed Server** | Lightweight `ws` npm library | Zero-framework native WebSocket server |
| **Canvas Application** | Vanilla HTML5 Canvas API + ES6 JS | Minimal DOM footprint, pure `requestAnimationFrame` loop |

---

## 4. System Architecture & Message Flow

### 4.1 Topology Diagram

```text
+-----------------------------------------------------------------------------------+
|                            Local Execution Context                                |
|                                                                                   |
|  +------------------------+                        +---------------------------+  |
|  | Playwright Test Runner |                        | Local WS Testbed Server   |  |
|  +-----------+------------+                        +-------------+-------------+  |
|              |                                                   |                |
|              | (Control & Timing)                                | (Raw Stream)   |
|              v                                                   v                |
|  +-----------+------------+       Injected Jitter / Corrupt      |                |
|  | Chromium Browser Page  | <====================================+                |
|  |  +------------------+  |   (page.routeWebSocket Interceptor)                   |
|  |  | Dynamic HTML5    |  |                                                       |
|  |  | Canvas (2D)      |  |                                                       |
|  |  +------------------+  |                                                       |
|  +------------------------+                                                       |
+-----------------------------------------------------------------------------------+
```

### 4.2 Stream & Action Sequence Flow
1. **WS Server** sends dynamic canvas layout updates via JSON stream.
2. **Playwright Interceptor** hooks WebSocket message frame:
   - Calculates Fibonacci delay ($1000\text{ ms} \times \text{Fib step}$, max $8000\text{ ms}$) and delays message delivery.
   - For corruption test scenario, mutates numerical state (e.g. balance $\rightarrow$ `"1e+7"`).
3. **Canvas Client** receives message and updates rendering state.
4. **Embedded `requestAnimationFrame` Detector** samples target coordinate pixels until state changes from Gray (`#808080`) to Active Blue (`#0055FF`).
5. **Timestamp $T0$** recorded in browser context (`window.performance.now()`) at exact frame where pixel transition is confirmed.
6. **Playwright Dispatches Race Action Sequence** (Hover $\rightarrow$ Drag 15px X-axis $\rightarrow$ Click).
7. **Timestamp $T1$** recorded in browser context (`window.performance.now()`) by an event listener attached to the Canvas element upon receiving the first dispatched action.
8. **Unified Elapsed Race Delta**: $\Delta T = T1 - T0$ computed strictly within the browser's single clock domain and verified ($30\text{ ms} \le \Delta T \le 100\text{ ms}$).

---

## 5. Local Canvas Testbed & State Machine Design

### 5.1 Canvas Testbed Layout
- **Dimensions**: $800 \times 600$ pixels.
- **Grid Layout**: 4x4 interactive grid cells.
- **Target Coordinate**: Center Grid Cell $(X: 300, Y: 200, W: 100, H: 100)$.
- **Drift Simulation**: Canvas repaints target cell with $X$-axis shift ($\pm 15\text{px}$) during simulated browser repaint lag.

### 5.2 Client State Machine

```text
[ UNINITIALIZED ]
       │
       ▼ (WS Connect)
  [ LOADING ] ─── Target rendered as Gray (#808080)
       │
       ▼ (WS State Message Received)
   [ ACTIVE ] ─── Target transitions to Active Blue (#0055FF)
       │
       ├──────────────────────────────────────────────┐
       ▼ (Simulated Repaint Drift)                    ▼ (Corrupted Payload Received)
[ DRIFT / REPAINT ] ── Offset shifted         [ EXCEPTION BOUNDARY ]
       │                                              │
       ▼                                              ▼
[ ACTIVE UPDATED ]                             [ STRUCTURED EXCEPTION BOUNDARY INVOKED ]
```

---

## 6. WebSocket Message Schema

### 6.1 Standard State Update Payload (JSON)
```json
{
  "type": "STATE_UPDATE",
  "sequence": 42,
  "timestamp": 1770912000000,
  "state": "ACTIVE",
  "target": {
    "gridId": "cell-2-2",
    "x": 300,
    "y": 200,
    "width": 100,
    "height": 100,
    "color": "#0055FF"
  },
  "balance": 1000.00
}
```

### 6.2 Corrupted Mathematical State Payload (JSON)
The frontend's expected representation contract requires a standard numeric value (`1000.00`) representing balance/ticker state. The injected payload deliberately violates this representation contract using scientific notation (`"1e+7"`) or fractional string format:
```json
{
  "type": "STATE_UPDATE",
  "sequence": 43,
  "timestamp": 1770912000100,
  "state": "ACTIVE",
  "target": {
    "gridId": "cell-2-2",
    "x": 300,
    "y": 200,
    "width": 100,
    "height": 100,
    "color": "#0055FF"
  },
  "balance": "1e+7"
}
```

---

## 7. Fibonacci Network Jitter Injection Architecture

### 7.1 Fibonacci Calculation Rule
- Sequence steps: $n = [1, 2, 3, 4, 5, 6, \dots] \rightarrow \text{Fib}(n) = [1, 1, 2, 3, 5, 8, \dots]$.
- Calculated Delay: $D(n) = \min(1000\text{ ms} \times \text{Fib}(n), 8000\text{ ms})$.

### 7.2 Delay Scale Schedule

| Step $n$ | Fibonacci Value | Calculated Base Delay | Applied Delay (Capped at 8000 ms) |
|---|---|---|---|
| 1 | 1 | $1000\text{ ms}$ | **1000 ms** |
| 2 | 1 | $1000\text{ ms}$ | **1000 ms** |
| 3 | 2 | $2000\text{ ms}$ | **2000 ms** |
| 4 | 3 | $3000\text{ ms}$ | **3000 ms** |
| 5 | 5 | $5000\text{ ms}$ | **5000 ms** |
| 6 | 8 | $8000\text{ ms}$ | **8000 ms** (Cap Reached) |
| 7 | 13 | $13000\text{ ms}$ | **8000 ms** (Cap Enforced) |

---

## 8. Embedded `requestAnimationFrame` Pixel-State Detector

### 8.1 Detector Mechanics
- Automation injects an in-browser sampling loop using `window.requestAnimationFrame`.
- Loop reads Canvas pixel buffer via `canvasContext.getImageData(targetX + 50, targetY + 50, 1, 1).data`.
- **Loading State**: Pixel RGB matches Gray threshold $[128, 128, 128] \pm 10$.
- **Active State**: Pixel RGB matches Blue target $[0, 85, 255] \pm 10$.
- **Timestamp Capture ($T0$)**: `window.performance.now()` logged in the browser context at the exact frame where active RGB threshold is validated.

---

## 9. Asynchronous Race Window Execution Design (Single Clock Domain)

### 9.1 Timing Clock Origin & Unified Measurement Architecture
To eliminate clock skew across Node.js and browser processes, all timing measurements ($T0$, $T1$, $\Delta T$) operate strictly within the **browser's `window.performance.now()` clock domain**:
- **$T0$**: High-resolution browser timestamp (`window.performance.now()`) recorded when `requestAnimationFrame` confirms pixel state transition.
- **$T1$**: High-resolution browser timestamp (`window.performance.now()`) recorded by a Canvas DOM event listener (e.g. `pointerdown`/`mouseenter`) when the first Playwright action arrives at the Canvas element.
- **Elapsed Race Delta**: $\Delta T = T1 - T0$ computed directly inside browser memory.
- **Constraint**: Must strictly satisfy $30\text{ ms} \le \Delta T \le 100\text{ ms}$.
- **Target Execution Point**: Aimed at $\Delta T \approx 50\text{ ms}$ to provide robust headroom against scheduling jitter.

### 9.2 Action Chain Execution
1. `hover(targetX, targetY)`
2. `mouse.down()` $\rightarrow$ `mouse.move(targetX + 15, targetY)` $\rightarrow$ `mouse.up()` (15px X-axis Drag)
3. `click(targetX + 15, targetY)`

---

## 10. Coordinate Drift & Dynamic Offset Circuit-Breaker

### 10.1 Drift Engine Design
Canvas repaints may offset the target element by $\Delta X_{drift}$ due to frame lag.

### 10.2 Circuit-Breaker Design Parameters & Algorithm
The circuit breaker uses configurable design parameters tailored to the testbed's layout (where cells shift by $\pm 15\text{px}$ during repaint lag):
- **`DESIGN_PARAM_DRIFT_THRESHOLD`**: Max allowable inline offset adjustment (default: $20\text{px}$).
- **`DESIGN_PARAM_MAX_RETRIES`**: Maximum frame retry attempts before controlled test failure (default: $3$).

**Algorithm**:
1. Immediately prior to $T1$ action execution, circuit breaker evaluates current target coordinates via fast pixel check.
2. If target moved by offset $(\delta x, \delta y)$:
   - If $\delta x \le \text{DESIGN_PARAM_DRIFT_THRESHOLD}$: Circuit breaker recalculates target coordinates ($X_{new} = X_{ref} + \delta x$) and permits interaction.
   - If $\delta x > \text{DESIGN_PARAM_DRIFT_THRESHOLD}$ or frame is unrendered: Circuit breaker trips, aborts action, updates offset cache, and waits for next clean repaint frame.
3. Defer exact parameter threshold tuning until implementation calibration.

---

## 11. Exception Boundary Validation (Corrupted Payload)

### 11.1 Representation Contract & Violation Scenario
- **Expected Representation Contract**: The frontend expects a valid numeric balance field (e.g. `1000.00`).
- **Injected Violation**: Interceptor injects a representation violation payload containing scientific notation (`"1e+7"`) or invalid fractional string.

### 11.2 Observable Structured Frontend Exception Boundary
- **PASS Condition**: The client frontend detects the representation contract violation and cleanly triggers a structured exception/validation boundary (verifiable via console exception event, boundary event log, or DOM error indicator).
- **FAIL Condition**: The client frontend silently accepts the corrupted state without structured boundary handling, permitting silent state corruption.

---

## 12. Observability & Execution Evidence Strategy

### 12.1 Structured Execution Log Format (JSON Output)
```json
{
  "testRunId": "q1-run-20260812-01",
  "timingClockDomain": "browser.window.performance.now",
  "events": [
    { "timestamp": 1770912000010, "event": "WS_FRAME_INTERCEPTED", "step": 3, "delayMs": 2000 },
    { "timestamp": 1770912002015, "event": "WS_FRAME_DELIVERED", "step": 3 },
    { "browserPerfT0": 1030.45, "event": "CANVAS_PIXEL_STATE_TRANSITION", "from": "#808080", "to": "#0055FF" },
    { "browserPerfT1": 1080.45, "event": "RACE_ACTION_START", "deltaT": 50.00, "status": "VALID_RACE_WINDOW" },
    { "timestamp": 1770912002095, "event": "INTERACTION_CHAIN_COMPLETE", "actions": ["HOVER", "DRAG_15PX_X", "CLICK"] },
    { "timestamp": 1770912002100, "event": "CIRCUIT_BREAKER_CHECK", "driftX": 0, "status": "OK" }
  ],
  "result": "PASSED"
}
```

---

## 13. PRD Acceptance Criteria Verification Strategy Matrix

| PRD Acceptance Criterion | Design Component | Verification Method | Expected Evidence |
|---|---|---|---|
| **AC-Q1-01** (Testbed Availability) | Local Canvas + WS Server | HTTP/WS Health Check | WS Connection Log |
| **AC-Q1-02** (Active WS Hooking) | Playwright `page.routeWebSocket` | Frame Interception Interceptor | Interceptor Log |
| **AC-Q1-03** (Fibonacci Delay) | Jitter Engine | Interception timestamp delta | Timed Network Log |
| **AC-Q1-04** (8000 ms Cap) | Jitter Engine `Math.min(delay, 8000)` | Cap assertion check | Max Delay Log ($\le 8000\text{ms}$) |
| **AC-Q1-05** (Pixel Color Detection) | Canvas Pixel Detector | `getImageData` RGB evaluation | Pixel Color Log |
| **AC-Q1-06** (`rAF` Loop) | Canvas Pixel Detector | `window.requestAnimationFrame` loop | Embedded JS Loop Log |
| **AC-Q1-07** (No Static Sleep for Readiness) | Canvas Pixel Detector | Code Audit & Timing Inspection | Zero static sleep in readiness detection path |
| **AC-Q1-08** (No Visibility Polling) | Canvas Pixel Detector | Code Audit | Zero DOM visibility polling |
| **AC-Q1-09** (No Bounding-Box Checks) | Canvas Pixel Detector | Code Audit | State based purely on pixel RGB |
| **AC-Q1-10** (Gray $\rightarrow$ Active State) | State Machine | RGB transition check | Pixel Transition Log |
| **AC-Q1-11** (Action Sequence) | Action Executor | Mouse action dispatch sequence | Input Log (Hover/Drag/Click) |
| **AC-Q1-12** ($30\text{ ms} \le \Delta T \le 100\text{ ms}$) | Single Clock Race Engine | Single-clock $T0$, $T1$, $\Delta T$ benchmark | Browser `performance.now()` Log |
| **AC-Q1-13** (Coordinate Deviation) | Drift Engine | Dynamic coordinate adjustment | Position Offset Log |
| **AC-Q1-14** (Stale Frame Handling) | Circuit Breaker | Frame validity check | Frame Drop Log |
| **AC-Q1-15** (Repaint Lag Handling) | Drift Engine | Repaint delay compensation | Repaint Delay Log |
| **AC-Q1-16** (Circuit Breaker Updates) | Circuit Breaker | Grid offset recalculation | Offset Recalculation Log |
| **AC-Q1-17** (Corrupted Mathematical State) | Payload Interceptor | Injected corrupted JSON stream | Stream Injection Log |
| **AC-Q1-18** (Exception Boundary Check) | Exception Validator | Structured frontend exception assertion | Exception Boundary Log |
| **AC-Q1-19** (Silent Corruption Flagging) | Exception Validator | Corruption assertion check | Test Failure on Silent Corruption |

---

## 14. Failure Modes & Mitigation Strategies

| Potential Failure Mode | Root Cause | Design Mitigation |
|---|---|---|
| **WebSocket Interception Drop** | Browser context closed unexpectedly | Auto-reconnect handler with explicit test abortion log |
| **Fibonacci Delay Overrun** | Calculation logic error | Hard cap enforcer `Math.min(calculatedDelay, 8000)` |
| **Pixel Detection False Positive** | Canvas background anti-aliasing noise | RGB tolerance threshold ($\pm 10$) on exact center pixel |
| **Race Window Exceeded ($\Delta T > 100\text{ ms}$)** | Node.js event loop lag | Single-clock browser measurement, pre-warmed action context |
| **Stale Coordinate Interaction** | Canvas shifted during drag action | Circuit breaker pre-action coordinate verification |
| **Silent Corruption Unflagged** | Frontend lacks exception handler | Assertion check for structured exception boundary invocation |

---

## 15. Minimal Dependency List

All dependencies are standard Node.js ecosystem packages:
1. `playwright`: Core browser automation & native WebSocket routing (version supporting `page.routeWebSocket` / `WebSocketRoute`, exact version selected during implementation).
2. `ws` (`^8.14.0`): Minimal standalone WebSocket server for local testbed.
3. `typescript` (`^5.0.0`): Type-safe engineering implementation.

*No external databases, UI frameworks, or proxy binaries required.*

---

## 16. Design Decision Record (DDR)

- **DDR-01: Playwright Native Route vs CDP**: Selected Playwright `page.routeWebSocket` to avoid Chromium-only CDP coupling and maintain cross-browser compatibility.
- **DDR-02: Local Testbed Server vs External Proxy**: Selected local `ws` server + static HTML canvas page to achieve 100% local execution after dependency installation with zero external network service dependency.
- **DDR-03: Single Browser Clock Domain for $T0$/$T1$**: Selected browser `window.performance.now()` as the single clock origin for both $T0$ and $T1$ to eliminate cross-process clock skew.
- **DDR-04: Parametrized Circuit-Breaker Offset Recalculation**: Implemented configurable design parameters (`DESIGN_PARAM_DRIFT_THRESHOLD`) for coordinate re-evaluation prior to action dispatch.

---

## 17. PRD Traceability Audit

Every single acceptance criterion from PRD v1.0 (`AC-Q1-01` through `AC-Q1-19`) has been re-audited and mapped to a specific design component in Section 13. **Traceability coverage is 100% complete and fully verified.**
