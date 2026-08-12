# Expected vs Actual Implementation Debugging Log

This document compares implementation behavior against expected behavior for real engineering issues encountered during implementation.

---
## Milestone 1 — Foundation & Testbed (Q1)
- **Expected Behavior**: Node app starts `app_server.ts` on port 8080, serves static HTML5 Canvas assets over HTTP, establishes WebSocket stream (`ws://localhost:8080/ws`), transmits initial `LOADING` state (`#808080`), and updates to `ACTIVE` state (`#0055FF`, `targetVersion: 2`).
- **Actual Behavior**: HTTP server served `index.html` and `canvas_app.js` with status code 200; WebSocket client connected cleanly and received `LOADING` frame followed by `ACTIVE` frame after 1000 ms; `frameId` and `targetVersion` updated as expected.
- **Difference & Root Cause**: None. Implementation matched expected behavior 100%.
- **Fix Applied**: N/A.
- **Verification Method & Status**: Automated Node HTTP/WS test suite (`test_m1.js`) verified all M1-01 through M1-11 acceptance checks. **STATUS: PASSED**.

---
## Milestone 2 — Network Interception & Pixel Detection (Q1)
- **Expected Behavior**: Playwright launches Chromium, hooks WebSocket via `page.routeWebSocket()`, applies Fibonacci delay ($1000\text{ ms} \times \text{Fib}(n)$, max $8000\text{ ms}$ cap), forwards delayed frames to client, evaluates Canvas `getImageData` pixel RGB via `requestAnimationFrame` until Active Blue ($[0,85,255]\pm10$) is confirmed, and captures $T0$ using browser `performance.now()`.
- **Actual Behavior**: Playwright intercepted WS stream, applied Fibonacci sequence ($1000\text{ ms}, 1000\text{ ms}, 2000\text{ ms}, \dots$), enforced 8000 ms cap for $n \ge 6$, forwarded frames to browser, `rAF` pixel sampler detected Gray $\rightarrow$ Active Blue RGB transition, and captured $T0 = 2814.30\text{ ms}$ in browser clock origin.
- **Difference & Root Cause**: Playwright browser installation binary missing on initial launch; resolved by running `npx playwright install chromium`.
- **Fix Applied**: Executed `npx playwright install chromium` to fetch standard browser binaries.
- **Verification Method & Status**: `run_m2_validation.ts` executed all M2-01 through M2-13 validation checks. **STATUS: PASSED**.

---
## Milestone 3 — Race, Drift & Circuit Breaker (Q1)
- **Expected Behavior**: Single browser `performance.now()` clock domain measures $T0$ (pixel transition validation) and $T1$ (initial `pointerenter`/`hover` event arrival), achieving $\Delta T = T1 - T0$ strictly within $30\text{ ms} \le \Delta T \le 100\text{ ms}$ (Target: $50\text{ ms}$). Executes Hover $\rightarrow$ Drag 15px X-axis $\rightarrow$ Click sequence. Signed 2D coordinate model ($dx, dy$) compensates for positive and negative position drift without direction inversion. Frame freshness (`frameId`, `targetVersion`) detects stale frames and repaint lag. Circuit breaker limits retries to `DESIGN_PARAM_MAX_RETRIES` (3) before controlled failure.
- **Actual Behavior**: Calibrated Node race dispatch timing achieved $\Delta T = 49.80\text{ ms}$ (strictly inside $30\text{ ms} \le \Delta T \le 100\text{ ms}$). Interaction sequence executed 15px X-axis drag and final click. Signed offsets ($dx = +15\text{px}, -12\text{px}$) updated target coordinates cleanly. Stale frames and repaint lag correctly invalidated snapshots. Excessive drift ($+35\text{px}$) tripped circuit breaker after exactly 3 retries.
- **Difference & Root Cause**: Initial uncalibrated Node scheduling delay ($30\text{ ms}$) plus Playwright IPC overhead resulted in $\Delta T = 115.50\text{ ms}$. Calibrated scheduling delay to $25\text{ ms}$, achieving nominal $\Delta T = 49.80\text{ ms}$.
- **Fix Applied**: Adjusted Node scheduling sleep to 25 ms in `action_executor.ts`.
- **Verification Method & Status**: `run_m3_validation.ts` executed all M3-01 through M3-08 validation checks. **STATUS: PASSED**.

---
## Milestone 4 — Corruption, Integration & Final Verification (Q1)
- **Expected Behavior**: Deliberate WebSocket payload mutation (`"1e+7"` string balance payload) is parsed by `canvas_app.js`, evaluated by representation contract validator, blocks silent rendering/acceptance, and activates structured DOM `#exception-boundary` UI (`#error-code` = `CORRUPTED_PAYLOAD`). Full integration suite (`run_q1_suite.ts`) executes all 6 implementation plan scenarios and verifies all 19 acceptance criteria (`AC-Q1-01` through `AC-Q1-19`).
- **Actual Behavior**: Scientific notation string payload `"1e+7"` triggered mathematical contract exception, prevented silent state rendering, and displayed `#exception-boundary` with `CORRUPTED_PAYLOAD` status badge. `run_q1_suite.ts` verified SC-Q1-01 through SC-Q1-06 and all 19 acceptance criteria with 100% PASS rate.
- **Difference & Root Cause**: `SC-Q1-01` initially failed due to hardcoded 700x500 dimension check in test runner. Fixed by referencing configured `CANVAS_WIDTH` (800) and `CANVAS_HEIGHT` (600) from `q1_config.ts`.
- **Fix Applied**: Updated `run_q1_suite.ts` to import `CANVAS_WIDTH` and `CANVAS_HEIGHT` from `q1_config.ts`. Updated `index.html` and `canvas_app.js` exception boundary IDs (`#error-code`, `#error-desc`).
- **Verification Method & Status**: Integrated suite `run_q1_suite.ts` executed all 6 scenarios and verified AC-Q1-01 through AC-Q1-19. **STATUS: PASSED**.



