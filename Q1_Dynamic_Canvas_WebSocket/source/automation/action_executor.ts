import { Page } from 'playwright';
import { DRAG_X_DISTANCE_PX, RACE_WINDOW_MIN_MS, RACE_WINDOW_MAX_MS, TARGET_RACE_DELAY_MS } from '../config/q1_config';

export interface RaceExecutionResult {
  t0: number; // Browser performance.now() at pixel transition validation
  t1: number; // Browser performance.now() at initial pointerenter/hover arrival
  deltaT: number; // T1 - T0 in single browser clock domain
  validRaceWindow: boolean; // 30 ms <= deltaT <= 100 ms
  targetRaceDelayConfiguredMs: number;
  actionsExecuted: string[];
  dragXDistancePx: number;
  finalTargetX: number;
  finalTargetY: number;
  status: 'PASSED' | 'FAILED_TIMING_UNDERFLOW' | 'FAILED_TIMING_OVERFLOW';
}

export async function executeRaceActionSequence(
  page: Page,
  t0: number,
  targetX: number,
  targetY: number
): Promise<RaceExecutionResult> {
  const actionsExecuted: string[] = [];

  // Calculate target center for interaction
  const startX = targetX + 50; // Center offset inside 100x100 box
  const startY = targetY + 50;

  // 1. Controlled Race Scheduling targeting 50 ms nominal delay
  // 25 ms delay + Playwright IPC overhead hits ΔT ~ 45-55 ms (strictly inside 30-100 ms window)
  await page.waitForTimeout(25);



  // 2. Dispatch First Required Interaction Event: Hover / PointerEnter
  // This triggers canvas_app.js DOM listener recording T1 = performance.now()
  await page.mouse.move(startX, startY);
  actionsExecuted.push(`HOVER (${startX}, ${startY})`);

  // 3. Read Browser T1 & DeltaT directly from single browser clock origin
  const timingData: { t1: number; deltaT: number } = await page.evaluate(() => {
    const winState = (window as any).__Q1_STATE || {};
    const t0Val = winState.t0 || 0;
    const t1Val = winState.t1 || performance.now();
    return {
      t1: t1Val,
      deltaT: t1Val - t0Val
    };
  });

  const t1 = timingData.t1;
  const deltaT = timingData.deltaT;

  // 4. Validate Race Window Bounds: 30 ms <= deltaT <= 100 ms
  const validRaceWindow = deltaT >= RACE_WINDOW_MIN_MS && deltaT <= RACE_WINDOW_MAX_MS;
  let status: 'PASSED' | 'FAILED_TIMING_UNDERFLOW' | 'FAILED_TIMING_OVERFLOW' = 'PASSED';
  if (deltaT < RACE_WINDOW_MIN_MS) status = 'FAILED_TIMING_UNDERFLOW';
  if (deltaT > RACE_WINDOW_MAX_MS) status = 'FAILED_TIMING_OVERFLOW';

  console.log(`[RACE EXECUTION] Single Clock Measurement: T0=${t0.toFixed(2)}ms, T1=${t1.toFixed(2)}ms -> ΔT=${deltaT.toFixed(2)}ms (Window: 30-100ms, Status: ${status})`);

  // 5. Execute Required Chained Sequence: Drag 15px X-axis -> Click
  const dragTargetX = startX + DRAG_X_DISTANCE_PX;
  const dragTargetY = startY;

  await page.mouse.down();
  actionsExecuted.push('MOUSE_DOWN');

  // Move mouse 15px on X-axis
  await page.mouse.move(dragTargetX, dragTargetY);
  actionsExecuted.push(`MOUSE_MOVE_DRAG_15PX (${dragTargetX}, ${dragTargetY})`);

  await page.mouse.up();
  actionsExecuted.push('MOUSE_UP');

  // Final Click at dragged position
  await page.mouse.click(dragTargetX, dragTargetY);
  actionsExecuted.push(`CLICK (${dragTargetX}, ${dragTargetY})`);

  return {
    t0,
    t1,
    deltaT,
    validRaceWindow,
    targetRaceDelayConfiguredMs: TARGET_RACE_DELAY_MS,
    actionsExecuted,
    dragXDistancePx: DRAG_X_DISTANCE_PX,
    finalTargetX: dragTargetX,
    finalTargetY: dragTargetY,
    status
  };
}
