import { Page } from 'playwright';
import { DESIGN_PARAM_DRIFT_THRESHOLD, DESIGN_PARAM_MAX_RETRIES } from '../config/q1_config';

export interface FrameFreshnessSnapshot {
  frameId: number;
  targetVersion: number;
  x: number;
  y: number;
  state: string;
}

export interface CircuitBreakerEvaluationResult {
  status: 'VALID' | 'ADJUSTED' | 'STALE' | 'TRIPPED';
  referenceX: number;
  referenceY: number;
  currentX: number;
  currentY: number;
  dx: number; // Signed X delta
  dy: number; // Signed Y delta
  absDx: number;
  absDy: number;
  newTargetX: number;
  newTargetY: number;
  validatedFrameId: number;
  currentFrameId: number;
  validatedVersion: number;
  currentVersion: number;
  retriesUsed: number;
  message: string;
}

export class BoundedCircuitBreaker {
  private maxRetries: number = DESIGN_PARAM_MAX_RETRIES;
  private driftThreshold: number = DESIGN_PARAM_DRIFT_THRESHOLD;

  /**
   * Reads current frame freshness and coordinate state from the browser context
   */
  public async getBrowserFreshnessSnapshot(page: Page): Promise<FrameFreshnessSnapshot> {
    return await page.evaluate(() => {
      const winState = (window as any).__Q1_STATE || {};
      return {
        frameId: winState.frameId || 0,
        targetVersion: winState.targetVersion || 0,
        x: winState.targetX !== undefined ? winState.targetX : 300,
        y: winState.targetY !== undefined ? winState.targetY : 200,
        state: winState.appState || 'UNKNOWN'
      };
    });
  }

  /**
   * Evaluates coordinate drift and frame freshness using signed 2D offsets (dx, dy)
   */
  public evaluateFrameAndDrift(
    referenceX: number,
    referenceY: number,
    validatedSnapshot: FrameFreshnessSnapshot,
    currentSnapshot: FrameFreshnessSnapshot,
    currentRetryCount: number
  ): CircuitBreakerEvaluationResult {
    // 1. Calculate Signed Deltas
    const dx = currentSnapshot.x - referenceX;
    const dy = currentSnapshot.y - referenceY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Signed Target Calculation: X_new = X_ref + dx, Y_new = Y_ref + dy
    const newTargetX = referenceX + dx;
    const newTargetY = referenceY + dy;

    // 2. Check Stale-Frame / Repaint-Lag Mismatch
    const isVersionStale = currentSnapshot.targetVersion !== validatedSnapshot.targetVersion;
    const isFrameStalled = currentSnapshot.frameId <= validatedSnapshot.frameId;

    if (isVersionStale || isFrameStalled) {
      if (currentRetryCount >= this.maxRetries) {
        return {
          status: 'TRIPPED',
          referenceX,
          referenceY,
          currentX: currentSnapshot.x,
          currentY: currentSnapshot.y,
          dx,
          dy,
          absDx,
          absDy,
          newTargetX,
          newTargetY,
          validatedFrameId: validatedSnapshot.frameId,
          currentFrameId: currentSnapshot.frameId,
          validatedVersion: validatedSnapshot.targetVersion,
          currentVersion: currentSnapshot.targetVersion,
          retriesUsed: currentRetryCount,
          message: `Circuit breaker tripped! Max retries (${this.maxRetries}) exceeded on stale frame/version mismatch.`
        };
      }

      return {
        status: 'STALE',
        referenceX,
        referenceY,
        currentX: currentSnapshot.x,
        currentY: currentSnapshot.y,
        dx,
        dy,
        absDx,
        absDy,
        newTargetX,
        newTargetY,
        validatedFrameId: validatedSnapshot.frameId,
        currentFrameId: currentSnapshot.frameId,
        validatedVersion: validatedSnapshot.targetVersion,
        currentVersion: currentSnapshot.targetVersion,
        retriesUsed: currentRetryCount + 1,
        message: `Stale frame/repaint lag detected (Version: ${validatedSnapshot.targetVersion}->${currentSnapshot.targetVersion}, Frame: ${validatedSnapshot.frameId}->${currentSnapshot.frameId}). Invalidated snapshot.`
      };
    }

    // 3. Evaluate Drift Threshold Magnitudes abs(dx), abs(dy)
    if (absDx > this.driftThreshold || absDy > this.driftThreshold) {
      if (currentRetryCount >= this.maxRetries) {
        return {
          status: 'TRIPPED',
          referenceX,
          referenceY,
          currentX: currentSnapshot.x,
          currentY: currentSnapshot.y,
          dx,
          dy,
          absDx,
          absDy,
          newTargetX,
          newTargetY,
          validatedFrameId: validatedSnapshot.frameId,
          currentFrameId: currentSnapshot.frameId,
          validatedVersion: validatedSnapshot.targetVersion,
          currentVersion: currentSnapshot.targetVersion,
          retriesUsed: currentRetryCount,
          message: `Circuit breaker tripped! Drift magnitude (|dx|=${absDx}px, |dy|=${absDy}px) exceeded threshold (${this.driftThreshold}px) after ${currentRetryCount} retries.`
        };
      }

      return {
        status: 'TRIPPED',
        referenceX,
        referenceY,
        currentX: currentSnapshot.x,
        currentY: currentSnapshot.y,
        dx,
        dy,
        absDx,
        absDy,
        newTargetX,
        newTargetY,
        validatedFrameId: validatedSnapshot.frameId,
        currentFrameId: currentSnapshot.frameId,
        validatedVersion: validatedSnapshot.targetVersion,
        currentVersion: currentSnapshot.targetVersion,
        retriesUsed: currentRetryCount + 1,
        message: `Drift magnitude (|dx|=${absDx}px, |dy|=${absDy}px) exceeds threshold limit (${this.driftThreshold}px). Action aborted.`
      };
    }

    // 4. Position Shift within Threshold (Signed Adjustment)
    if (dx !== 0 || dy !== 0) {
      return {
        status: 'ADJUSTED',
        referenceX,
        referenceY,
        currentX: currentSnapshot.x,
        currentY: currentSnapshot.y,
        dx,
        dy,
        absDx,
        absDy,
        newTargetX,
        newTargetY,
        validatedFrameId: validatedSnapshot.frameId,
        currentFrameId: currentSnapshot.frameId,
        validatedVersion: validatedSnapshot.targetVersion,
        currentVersion: currentSnapshot.targetVersion,
        retriesUsed: currentRetryCount,
        message: `Position drift detected within threshold (|dx|=${absDx}px, |dy|=${absDy}px). Applied signed target offset (${dx}px, ${dy}px) -> (${newTargetX}, ${newTargetY}).`
      };
    }

    // 5. Clean Frame & Exact Target Match
    return {
      status: 'VALID',
      referenceX,
      referenceY,
      currentX: currentSnapshot.x,
      currentY: currentSnapshot.y,
      dx: 0,
      dy: 0,
      absDx: 0,
      absDy: 0,
      newTargetX: referenceX,
      newTargetY: referenceY,
      validatedFrameId: validatedSnapshot.frameId,
      currentFrameId: currentSnapshot.frameId,
      validatedVersion: validatedSnapshot.targetVersion,
      currentVersion: currentSnapshot.targetVersion,
      retriesUsed: currentRetryCount,
      message: 'Frame fresh and target position exact.'
    };
  }
}
