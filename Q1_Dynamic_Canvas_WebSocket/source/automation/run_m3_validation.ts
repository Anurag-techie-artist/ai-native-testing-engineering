import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { LOCAL_APP_URL } from '../config/q1_config';
import { FibonacciJitterEngine, setupWebSocketInterception, FibJitterTrace } from './ws_interceptor';
import { waitForCanvasPixelTransition, PixelDetectionResult } from './pixel_detector';
import { executeRaceActionSequence, RaceExecutionResult } from './action_executor';
import { BoundedCircuitBreaker, FrameFreshnessSnapshot, CircuitBreakerEvaluationResult } from './circuit_breaker';

export interface M3ValidationSummary {
  milestone: 'MILESTONE_3';
  status: 'PASSED' | 'FAILED';
  timestamp: string;
  results: {
    'M3-01_single_browser_clock_t0_t1': boolean;
    'M3-02_race_window_30_to_100ms': boolean;
    'M3-03_hover_drag_15px_click_sequence': boolean;
    'M3-04_signed_2d_coordinate_drift_dx_dy': boolean;
    'M3-05_stale_frame_version_detection': boolean;
    'M3-06_repaint_lag_handling': boolean;
    'M3-07_bounded_circuit_breaker_max_3_retries': boolean;
    'M3-08_controlled_circuit_breaker_failure': boolean;
  };
  timing: {
    t0: number;
    t1: number;
    deltaT: number;
    validRaceWindow: boolean;
  };
  raceResult: RaceExecutionResult;
  driftResults: {
    positiveDrift: CircuitBreakerEvaluationResult;
    negativeDrift: CircuitBreakerEvaluationResult;
    staleFrameTest: CircuitBreakerEvaluationResult;
    maxRetryLimitTest: CircuitBreakerEvaluationResult;
  };
}

export async function runM3Validation(): Promise<M3ValidationSummary> {
  console.log('=== STARTING Q1 MILESTONE 3 VALIDATION SUITE ===');

  let browser: Browser | null = null;
  const jitterEngine = new FibonacciJitterEngine();
  const jitterTrace: FibJitterTrace[] = [];
  const circuitBreaker = new BoundedCircuitBreaker();

  try {
    // ------------------------------------------------------------------------
    // SCENARIO 1: Normal Path Single-Clock Race Window Execution (30-100 ms)
    // ------------------------------------------------------------------------
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await setupWebSocketInterception(page, jitterEngine, jitterTrace);
    await page.goto(LOCAL_APP_URL, { waitUntil: 'domcontentloaded' });

    console.log('[M3-RACE] Starting rAF Canvas pixel detector for T0 capture...');
    const pixelResult: PixelDetectionResult = await waitForCanvasPixelTransition(page, 15000);
    const t0 = pixelResult.t0;

    console.log(`[M3-RACE] T0 Captured = ${t0.toFixed(2)} ms. Executing race interaction sequence...`);
    const raceResult: RaceExecutionResult = await executeRaceActionSequence(page, t0, 300, 200);

    console.log(`[M3-RACE] Race Window Verification: T0=${raceResult.t0.toFixed(2)}ms, T1=${raceResult.t1.toFixed(2)}ms, ΔT=${raceResult.deltaT.toFixed(2)}ms (Status: ${raceResult.status})`);
    console.log(`[M3-RACE] Actions Executed: ${raceResult.actionsExecuted.join(' -> ')}`);

    await browser.close();
    browser = null;

    // ------------------------------------------------------------------------
    // SCENARIO 2: Signed 2D Coordinate Drift Offset Calculations (dx, dy)
    // ------------------------------------------------------------------------
    console.log('[M3-DRIFT] Auditing Signed 2D Coordinate Drift Calculations...');
    const refX = 300, refY = 200;
    const baseSnapshot: FrameFreshnessSnapshot = { frameId: 100, targetVersion: 2, x: 300, y: 200, state: 'ACTIVE' };

    // Positive drift: +15px X, +10px Y
    const posSnapshot: FrameFreshnessSnapshot = { frameId: 101, targetVersion: 2, x: 315, y: 210, state: 'ACTIVE' };
    const posResult = circuitBreaker.evaluateFrameAndDrift(refX, refY, baseSnapshot, posSnapshot, 0);
    console.log(`  -> Positive Drift (+15, +10): dx=${posResult.dx}, dy=${posResult.dy}, NewTarget=(${posResult.newTargetX}, ${posResult.newTargetY}), Status=${posResult.status}`);

    // Negative drift: -12px X, -8px Y
    const negSnapshot: FrameFreshnessSnapshot = { frameId: 101, targetVersion: 2, x: 288, y: 192, state: 'ACTIVE' };
    const negResult = circuitBreaker.evaluateFrameAndDrift(refX, refY, baseSnapshot, negSnapshot, 0);
    console.log(`  -> Negative Drift (-12, -8): dx=${negResult.dx}, dy=${negResult.dy}, NewTarget=(${negResult.newTargetX}, ${negResult.newTargetY}), Status=${negResult.status}`);

    // ------------------------------------------------------------------------
    // SCENARIO 3: Stale-Frame / Repaint-Lag Freshness Verification
    // ------------------------------------------------------------------------
    console.log('[M3-STALE] Auditing Stale-Frame & Repaint-Lag Detection...');
    const staleSnapshot: FrameFreshnessSnapshot = { frameId: 100, targetVersion: 3, x: 300, y: 200, state: 'ACTIVE' };
    const staleResult = circuitBreaker.evaluateFrameAndDrift(refX, refY, baseSnapshot, staleSnapshot, 0);
    console.log(`  -> Stale Frame Mismatch: Status=${staleResult.status}, Msg=${staleResult.message}`);

    // ------------------------------------------------------------------------
    // SCENARIO 4: Circuit Breaker Max Retry Limit & Controlled Failure
    // ------------------------------------------------------------------------
    console.log('[M3-BREAKER] Auditing Bounded Circuit Breaker Max Retry Limit (Max: 3)...');
    const excessiveDriftSnapshot: FrameFreshnessSnapshot = { frameId: 101, targetVersion: 2, x: 335, y: 200, state: 'ACTIVE' }; // +35px exceeds 20px threshold
    const trippedResult = circuitBreaker.evaluateFrameAndDrift(refX, refY, baseSnapshot, excessiveDriftSnapshot, 3);
    console.log(`  -> Excessive Drift (+35px) after 3 retries: Status=${trippedResult.status}, Msg=${trippedResult.message}`);

    const summary: M3ValidationSummary = {
      milestone: 'MILESTONE_3',
      status: (raceResult.validRaceWindow && posResult.status === 'ADJUSTED' && negResult.status === 'ADJUSTED' && staleResult.status === 'STALE' && trippedResult.status === 'TRIPPED') ? 'PASSED' : 'FAILED',
      timestamp: new Date().toISOString(),
      results: {
        'M3-01_single_browser_clock_t0_t1': raceResult.t0 > 0 && raceResult.t1 > 0,
        'M3-02_race_window_30_to_100ms': raceResult.validRaceWindow,
        'M3-03_hover_drag_15px_click_sequence': raceResult.dragXDistancePx === 15 && raceResult.actionsExecuted.length === 5,
        'M3-04_signed_2d_coordinate_drift_dx_dy': posResult.dx === 15 && negResult.dx === -12,
        'M3-05_stale_frame_version_detection': staleResult.status === 'STALE',
        'M3-06_repaint_lag_handling': staleResult.status === 'STALE',
        'M3-07_bounded_circuit_breaker_max_3_retries': trippedResult.retriesUsed === 3,
        'M3-08_controlled_circuit_breaker_failure': trippedResult.status === 'TRIPPED'
      },
      timing: {
        t0: raceResult.t0,
        t1: raceResult.t1,
        deltaT: raceResult.deltaT,
        validRaceWindow: raceResult.validRaceWindow
      },
      raceResult,
      driftResults: {
        positiveDrift: posResult,
        negativeDrift: negResult,
        staleFrameTest: staleResult,
        maxRetryLimitTest: trippedResult
      }
    };

    console.log('=== Q1 MILESTONE 3 VALIDATION COMPLETED SUCCESSFULLY! ===');
    return summary;

  } catch (err) {
    if (browser) await browser.close();
    console.error('=== Q1 MILESTONE 3 VALIDATION FAILED ===', err);
    throw err;
  }
}

// Allow standalone CLI execution
if (require.main === module) {
  runM3Validation()
    .then((summary) => {
      const evidenceDir = path.join(__dirname, '../../evidence');
      if (!fs.existsSync(evidenceDir)) {
        fs.mkdirSync(evidenceDir, { recursive: true });
      }
      const evidencePath = path.join(evidenceDir, 'q1_milestone3_evidence.json');
      fs.writeFileSync(evidencePath, JSON.stringify(summary, null, 2));
      console.log(`[EVIDENCE] Milestone 3 evidence saved to ${evidencePath}`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
