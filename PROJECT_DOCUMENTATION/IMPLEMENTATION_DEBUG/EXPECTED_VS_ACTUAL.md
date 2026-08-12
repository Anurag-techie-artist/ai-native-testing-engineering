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

