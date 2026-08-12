import { Page } from 'playwright';
import { COLOR_BLUE_RGB, RGB_TOLERANCE, TARGET_DEFAULT_X, TARGET_DEFAULT_Y, TARGET_WIDTH, TARGET_HEIGHT } from '../config/q1_config';

export interface PixelDetectionResult {
  verified: boolean;
  t0: number; // Browser performance.now() timestamp
  targetVersion: number;
  frameId: number;
  sampledRgb: [number, number, number];
  elapsedFrames: number;
}

/**
 * Injects in-browser requestAnimationFrame loop sampling Canvas getImageData at target coordinates
 * until Active Blue RGB threshold is confirmed, capturing T0 = window.performance.now().
 */
export async function waitForCanvasPixelTransition(
  page: Page,
  timeoutMs: number = 10000
): Promise<PixelDetectionResult> {
  const targetCenterX = TARGET_DEFAULT_X + Math.floor(TARGET_WIDTH / 2); // 350
  const targetCenterY = TARGET_DEFAULT_Y + Math.floor(TARGET_HEIGHT / 2); // 250
  const targetBlueRgb = COLOR_BLUE_RGB; // [0, 85, 255]
  const tolerance = RGB_TOLERANCE; // 10

  // Execute in-browser requestAnimationFrame sampling loop
  const result: PixelDetectionResult = await page.evaluate(
    ({ sampleX, sampleY, targetBlue, tol, timeout }) => {
      return new Promise<PixelDetectionResult>((resolve, reject) => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) {
          return reject(new Error('Canvas element #canvas not found in DOM'));
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Canvas 2D context not available'));
        }

        const startTime = performance.now();
        let elapsedFrames = 0;

        function checkFrame() {
          elapsedFrames++;
          const currentTime = performance.now();

          if (currentTime - startTime > timeout) {
            return reject(new Error(`Pixel transition detection timed out after ${timeout}ms`));
          }

          // Sample exact pixel RGB at target center coordinates via getImageData
          const ctx2d = canvas.getContext('2d');
          if (!ctx2d) return reject(new Error('Canvas 2D context null during sampling'));
          const pixelData = ctx2d.getImageData(sampleX, sampleY, 1, 1).data;
          const r = pixelData[0];

          const g = pixelData[1];
          const b = pixelData[2];

          // Check Active Blue RGB threshold match
          const rMatch = Math.abs(r - targetBlue[0]) <= tol;
          const gMatch = Math.abs(g - targetBlue[1]) <= tol;
          const bMatch = Math.abs(b - targetBlue[2]) <= tol;

          if (rMatch && gMatch && bMatch) {
            // State verified! Capture T0 in browser performance.now() clock origin
            const t0 = performance.now();

            const winState = (window as any).__Q1_STATE || {};
            winState.t0 = t0;

            return resolve({
              verified: true,
              t0,
              targetVersion: winState.targetVersion || 0,
              frameId: winState.frameId || elapsedFrames,
              sampledRgb: [r, g, b],
              elapsedFrames
            });
          }

          // Continue sampling on next animation frame
          requestAnimationFrame(checkFrame);
        }

        // Start rAF loop
        requestAnimationFrame(checkFrame);
      });
    },
    {
      sampleX: targetCenterX,
      sampleY: targetCenterY,
      targetBlue: targetBlueRgb,
      tol: tolerance,
      timeout: timeoutMs
    }
  );

  return result;
}
