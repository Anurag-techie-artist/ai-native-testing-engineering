# Expected vs Actual Implementation Debugging Log

This document compares implementation behavior against expected behavior for real engineering issues encountered during implementation.

---
## Milestone 1 — Foundation & Testbed (Q1)
- **Expected Behavior**: Node app starts `app_server.ts` on port 8080, serves static HTML5 Canvas assets over HTTP, establishes WebSocket stream (`ws://localhost:8080/ws`), transmits initial `LOADING` state (`#808080`), and updates to `ACTIVE` state (`#0055FF`, `targetVersion: 2`).
- **Actual Behavior**: HTTP server served `index.html` and `canvas_app.js` with status code 200; WebSocket client connected cleanly and received `LOADING` frame followed by `ACTIVE` frame after 1000 ms; `frameId` and `targetVersion` updated as expected.
- **Difference & Root Cause**: None. Implementation matched expected behavior 100%.
- **Fix Applied**: N/A.
- **Verification Method & Status**: Automated Node HTTP/WS test suite (`test_m1.js`) verified all M1-01 through M1-11 acceptance checks. **STATUS: PASSED**.
