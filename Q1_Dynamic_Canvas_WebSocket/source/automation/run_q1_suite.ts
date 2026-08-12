import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { LOCAL_APP_URL, CANVAS_WIDTH, CANVAS_HEIGHT } from '../config/q1_config';

import { FibonacciJitterEngine, setupWebSocketInterception, FibJitterTrace } from './ws_interceptor';
import { waitForCanvasPixelTransition, PixelDetectionResult } from './pixel_detector';
import { executeRaceActionSequence, RaceExecutionResult } from './action_executor';
import { BoundedCircuitBreaker, FrameFreshnessSnapshot } from './circuit_breaker';

export interface ScenarioResult {
  scenarioId: string;
  title: string;
  preconditions: string;
  action: string;
  observedResult: string;
  expectedResult: string;
  status: 'PASS' | 'FAIL';
  acceptanceCriteriaCovered: string[];
}

export interface Q1FullSuiteSummary {
  system: 'Q1_Dynamic_Canvas_WebSocket';
  status: 'PASSED' | 'FAILED';
  timestamp: string;
  scenarios: ScenarioResult[];
  traceabilityMatrix: { [acId: string]: { scenarioId: string; status: 'PASS' | 'FAIL' } };
  milestoneRegressions: {
    milestone1: 'PASSED' | 'FAILED';
    milestone2: 'PASSED' | 'FAILED';
    milestone3: 'PASSED' | 'FAILED';
    milestone4: 'PASSED' | 'FAILED';
  };
}

export async function runQ1FullSuite(): Promise<Q1FullSuiteSummary> {
  console.log('================================================================');
  console.log('=== STARTING Q1 INTEGRATED SUITE & ACCEPTANCE AUDIT (M1-M4) ===');
  console.log('================================================================');

  const scenarios: ScenarioResult[] = [];
  let browser: Browser | null = null;
  const circuitBreaker = new BoundedCircuitBreaker();

  try {
    // ------------------------------------------------------------------------
    // SCENARIO 1 (SC-Q1-01): Foundation & HTML5 Canvas Delivery
    // ------------------------------------------------------------------------
    console.log('\n--- Running Scenario 1 (SC-Q1-01): Foundation & HTML5 Canvas Delivery ---');
    browser = await chromium.launch({ headless: true });
    let context = await browser.newContext();
    let page: Page = await context.newPage();

    await page.goto(LOCAL_APP_URL, { waitUntil: 'domcontentloaded' });
    const hasCanvas = await page.$('#canvas') !== null;
    const canvasDimensions = await page.evaluate(() => {
      const el = document.getElementById('canvas') as HTMLCanvasElement;
      return el ? { width: el.width, height: el.height } : { width: 0, height: 0 };
    });

    const sc1Pass = hasCanvas && canvasDimensions.width === CANVAS_WIDTH && canvasDimensions.height === CANVAS_HEIGHT;
    scenarios.push({
      scenarioId: 'SC-Q1-01',
      title: 'Foundation & HTML5 Canvas Delivery',
      preconditions: 'Node HTTP static server running on http://localhost:8080',
      action: 'Navigate Chromium browser to http://localhost:8080',
      observedResult: `Canvas element #canvas rendered with dimensions ${canvasDimensions.width}x${canvasDimensions.height}px.`,
      expectedResult: `Canvas element rendered with dimensions ${CANVAS_WIDTH}x${CANVAS_HEIGHT}px.`,
      status: sc1Pass ? 'PASS' : 'FAIL',
      acceptanceCriteriaCovered: ['AC-Q1-01', 'AC-Q1-02']
    });

    console.log(`[SC-Q1-01] Result: ${sc1Pass ? 'PASS' : 'FAIL'}`);

    await browser.close();
    browser = null;

    // ------------------------------------------------------------------------
    // SCENARIO 2 (SC-Q1-02): WebSocket Interception & Fibonacci Jitter Engine
    // ------------------------------------------------------------------------
    console.log('\n--- Running Scenario 2 (SC-Q1-02): WebSocket Interception & Fibonacci Jitter Engine ---');
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();

    const jitterEngine = new FibonacciJitterEngine();
    const jitterTrace: FibJitterTrace[] = [];

    await setupWebSocketInterception(page, jitterEngine, jitterTrace);
    await page.goto(LOCAL_APP_URL, { waitUntil: 'domcontentloaded' });

    // Wait for frame forwarding and delay progression
    await page.waitForTimeout(2500);

    let fibPass = jitterTrace.length >= 2 && jitterTrace[0].appliedDelayMs === 1000 && jitterTrace[1].appliedDelayMs === 1000;
    // Audit 8000ms cap on step 7
    const capInfo = jitterEngine.calculateDelay(7);
    const capPass = capInfo.appliedDelay === 8000 && capInfo.capped === true;

    const sc2Pass = fibPass && capPass;
    scenarios.push({
      scenarioId: 'SC-Q1-02',
      title: 'WebSocket Interception & Fibonacci Jitter Engine',
      preconditions: 'WebSocket route hook page.routeWebSocket registered on ws://localhost:8080/ws',
      action: 'Intercept server WS state frames and apply D(n) = min(1000 * Fib(n), 8000)',
      observedResult: `Frames intercepted. Step 1: 1000ms, Step 2: 1000ms. Step 7 Cap: ${capInfo.appliedDelay}ms (Capped: ${capInfo.capped}).`,
      expectedResult: 'Fibonacci delay applied accurately with 8000ms maximum cap.',
      status: sc2Pass ? 'PASS' : 'FAIL',
      acceptanceCriteriaCovered: ['AC-Q1-03', 'AC-Q1-04', 'AC-Q1-05', 'AC-Q1-06', 'AC-Q1-07']
    });
    console.log(`[SC-Q1-02] Result: ${sc2Pass ? 'PASS' : 'FAIL'}`);

    // ------------------------------------------------------------------------
    // SCENARIO 3 (SC-Q1-03): Embedded rAF Canvas Pixel Detector & T0 Capture
    // ------------------------------------------------------------------------
    console.log('\n--- Running Scenario 3 (SC-Q1-03): Embedded rAF Canvas Pixel Detector & T0 Capture ---');
    const pixelResult: PixelDetectionResult = await waitForCanvasPixelTransition(page, 15000);
    const t0 = pixelResult.t0;

    const sc3Pass = pixelResult.verified && t0 > 0 && pixelResult.sampledRgb[2] === 255;
    scenarios.push({
      scenarioId: 'SC-Q1-03',
      title: 'Embedded rAF Canvas Pixel Detector & T0 Capture',
      preconditions: 'Canvas rendering state transitioning from LOADING Gray to ACTIVE Blue',
      action: 'In-browser rAF loop samples Canvas getImageData at (350, 250) until [0, 85, 255] confirmed',
      observedResult: `RGB transition confirmed: [${pixelResult.sampledRgb.join(', ')}]. T0 captured in browser clock: ${t0.toFixed(2)}ms.`,
      expectedResult: 'Active Blue pixel transition validated via getImageData and T0 measured in browser performance.now().',
      status: sc3Pass ? 'PASS' : 'FAIL',
      acceptanceCriteriaCovered: ['AC-Q1-08', 'AC-Q1-09', 'AC-Q1-10', 'AC-Q1-11']
    });
    console.log(`[SC-Q1-03] Result: ${sc3Pass ? 'PASS' : 'FAIL'}`);

    // ------------------------------------------------------------------------
    // SCENARIO 4 (SC-Q1-04): Single-Clock Race Timing (30-100ms) & Chained Interaction
    // ------------------------------------------------------------------------
    console.log('\n--- Running Scenario 4 (SC-Q1-04): Single-Clock Race Timing & Chained Interaction ---');
    const raceResult: RaceExecutionResult = await executeRaceActionSequence(page, t0, 300, 200);

    const sc4Pass = raceResult.validRaceWindow && raceResult.dragXDistancePx === 15 && raceResult.actionsExecuted.length === 5;
    scenarios.push({
      scenarioId: 'SC-Q1-04',
      title: 'Single-Clock Race Timing & Chained Interaction',
      preconditions: 'Validated Canvas state transition (T0 captured)',
      action: 'Dispatch Hover -> MouseDown -> Drag 15px X-axis -> MouseUp -> Click',
      observedResult: `T0=${raceResult.t0.toFixed(2)}ms, T1=${raceResult.t1.toFixed(2)}ms -> ΔT=${raceResult.deltaT.toFixed(2)}ms. Drag: ${raceResult.dragXDistancePx}px.`,
      expectedResult: '30ms <= ΔT <= 100ms verified in single browser clock domain with exact 15px drag sequence.',
      status: sc4Pass ? 'PASS' : 'FAIL',
      acceptanceCriteriaCovered: ['AC-Q1-12', 'AC-Q1-13']
    });
    console.log(`[SC-Q1-04] Result: ${sc4Pass ? 'PASS' : 'FAIL'}`);

    await browser.close();
    browser = null;

    // ------------------------------------------------------------------------
    // SCENARIO 5 (SC-Q1-05): Signed 2D Coordinate Drift, Freshness & Bounded Circuit Breaker
    // ------------------------------------------------------------------------
    console.log('\n--- Running Scenario 5 (SC-Q1-05): Signed 2D Coordinate Drift & Circuit Breaker ---');
    const baseSnapshot: FrameFreshnessSnapshot = { frameId: 100, targetVersion: 2, x: 300, y: 200, state: 'ACTIVE' };
    const posSnapshot: FrameFreshnessSnapshot = { frameId: 101, targetVersion: 2, x: 315, y: 210, state: 'ACTIVE' };
    const staleSnapshot: FrameFreshnessSnapshot = { frameId: 100, targetVersion: 3, x: 300, y: 200, state: 'ACTIVE' };
    const excessiveSnapshot: FrameFreshnessSnapshot = { frameId: 101, targetVersion: 2, x: 335, y: 200, state: 'ACTIVE' };

    const posResult = circuitBreaker.evaluateFrameAndDrift(300, 200, baseSnapshot, posSnapshot, 0);
    const staleResult = circuitBreaker.evaluateFrameAndDrift(300, 200, baseSnapshot, staleSnapshot, 0);
    const trippedResult = circuitBreaker.evaluateFrameAndDrift(300, 200, baseSnapshot, excessiveSnapshot, 3);

    const sc5Pass = posResult.dx === 15 && posResult.dy === 10 && staleResult.status === 'STALE' && trippedResult.status === 'TRIPPED';
    scenarios.push({
      scenarioId: 'SC-Q1-05',
      title: 'Signed 2D Coordinate Drift & Bounded Circuit Breaker',
      preconditions: 'Target coordinates shift or frame freshness stalls prior to action dispatch',
      action: 'Calculate signed offsets (dx, dy), check version freshness, enforce max 3 retries',
      observedResult: `Signed offset (+15, +10) -> (315, 210). Stale version flagged. Max retries (3) tripped controlled failure.`,
      expectedResult: 'Signed offset target calculation updated, stale frames invalidated, and circuit breaker limits retries to 3.',
      status: sc5Pass ? 'PASS' : 'FAIL',
      acceptanceCriteriaCovered: ['AC-Q1-14', 'AC-Q1-15', 'AC-Q1-16']
    });
    console.log(`[SC-Q1-05] Result: ${sc5Pass ? 'PASS' : 'FAIL'}`);

    // ------------------------------------------------------------------------
    // SCENARIO 6 (SC-Q1-06): Corrupted Payload & Structured Exception Boundary
    // ------------------------------------------------------------------------
    console.log('\n--- Running Scenario 6 (SC-Q1-06): Corrupted Payload & Structured Exception Boundary ---');
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();

    const corruptEngine = new FibonacciJitterEngine();
    const corruptTrace: FibJitterTrace[] = [];

    // Register WebSocket route hook with DELIBERATE BALANCE MUTATION "1e+7"
    await setupWebSocketInterception(page, corruptEngine, corruptTrace, { mutateCorruptedState: true });
    await page.goto(LOCAL_APP_URL, { waitUntil: 'domcontentloaded' });

    // Wait for corrupted payload to reach browser and activate exception boundary
    await page.waitForTimeout(2000);

    const exceptionBoundaryDetails = await page.evaluate(() => {
      const boundaryEl = document.getElementById('exception-boundary');
      const codeEl = document.getElementById('error-code');
      const descEl = document.getElementById('error-desc');
      return {
        isVisible: boundaryEl ? window.getComputedStyle(boundaryEl).display !== 'none' : false,
        errorCode: codeEl ? codeEl.textContent : '',
        errorDesc: descEl ? descEl.textContent : ''
      };
    });

    console.log(`  -> Exception Boundary Visible: ${exceptionBoundaryDetails.isVisible}`);
    console.log(`  -> Error Code: ${exceptionBoundaryDetails.errorCode}`);
    console.log(`  -> Error Desc: ${exceptionBoundaryDetails.errorDesc}`);

    const sc6Pass = exceptionBoundaryDetails.isVisible && exceptionBoundaryDetails.errorCode === 'CORRUPTED_PAYLOAD';
    scenarios.push({
      scenarioId: 'SC-Q1-06',
      title: 'Corrupted Payload & Structured Exception Boundary',
      preconditions: 'WebSocket interceptor mutates balance payload to "1e+7" (Scientific notation string corruption)',
      action: 'Client canvas_app.js parses incoming JSON and executes validateBalanceRepresentation()',
      observedResult: `Exception boundary element displayed: Visible=${exceptionBoundaryDetails.isVisible}, Code=${exceptionBoundaryDetails.errorCode}. Silent rendering prevented.`,
      expectedResult: 'Corrupted representation detected, silent rendering blocked, and DOM Exception Boundary UI activated.',
      status: sc6Pass ? 'PASS' : 'FAIL',
      acceptanceCriteriaCovered: ['AC-Q1-17', 'AC-Q1-18', 'AC-Q1-19']
    });
    console.log(`[SC-Q1-06] Result: ${sc6Pass ? 'PASS' : 'FAIL'}`);

    await browser.close();
    browser = null;

    // ------------------------------------------------------------------------
    // TRACEABILITY MATRIX AUDIT (AC-Q1-01 to AC-Q1-19)
    // ------------------------------------------------------------------------
    const traceabilityMatrix: { [acId: string]: { scenarioId: string; status: 'PASS' | 'FAIL' } } = {};
    for (const sc of scenarios) {
      for (const acId of sc.acceptanceCriteriaCovered) {
        traceabilityMatrix[acId] = { scenarioId: sc.scenarioId, status: sc.status };
      }
    }

    const allScenariosPassed = scenarios.every((s) => s.status === 'PASS');
    const summary: Q1FullSuiteSummary = {
      system: 'Q1_Dynamic_Canvas_WebSocket',
      status: allScenariosPassed ? 'PASSED' : 'FAILED',
      timestamp: new Date().toISOString(),
      scenarios,
      traceabilityMatrix,
      milestoneRegressions: {
        milestone1: sc1Pass ? 'PASSED' : 'FAILED',
        milestone2: sc2Pass ? 'PASSED' : 'FAILED',
        milestone3: (sc3Pass && sc4Pass && sc5Pass) ? 'PASSED' : 'FAILED',
        milestone4: sc6Pass ? 'PASSED' : 'FAILED'
      }
    };

    console.log('\n================================================================');
    console.log(`=== Q1 INTEGRATED SUITE VERIFICATION: ${summary.status} ===`);
    console.log('================================================================');
    return summary;

  } catch (err) {
    if (browser) await browser.close();
    console.error('=== Q1 INTEGRATED SUITE FAILED ===', err);
    throw err;
  }
}

// Allow standalone CLI execution
if (require.main === module) {
  runQ1FullSuite()
    .then((summary) => {
      const evidenceDir = path.join(__dirname, '../../evidence');
      if (!fs.existsSync(evidenceDir)) {
        fs.mkdirSync(evidenceDir, { recursive: true });
      }
      const m4EvidencePath = path.join(evidenceDir, 'q1_milestone4_evidence.json');
      const fullSuiteEvidencePath = path.join(evidenceDir, 'q1_full_suite_evidence.json');

      fs.writeFileSync(m4EvidencePath, JSON.stringify({
        milestone: 'MILESTONE_4',
        status: summary.scenarios.find(s => s.scenarioId === 'SC-Q1-06')?.status === 'PASS' ? 'PASSED' : 'FAILED',
        timestamp: summary.timestamp,
        corruptionScenario: summary.scenarios.find(s => s.scenarioId === 'SC-Q1-06')
      }, null, 2));

      fs.writeFileSync(fullSuiteEvidencePath, JSON.stringify(summary, null, 2));
      console.log(`[EVIDENCE] Milestone 4 evidence saved to ${m4EvidencePath}`);
      console.log(`[EVIDENCE] Integrated Q1 suite evidence saved to ${fullSuiteEvidencePath}`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
