import { Page, WebSocketRoute } from 'playwright';
import { FIBONACCI_BASE_DELAY, FIBONACCI_MAX_CAP } from '../config/q1_config';

export interface FibJitterTrace {
  step: number;
  fibValue: number;
  calculatedDelayMs: number;
  appliedDelayMs: number;
  capped: boolean;
  interceptedAt: number;
  forwardedAt: number;
  payloadSummary: string;
}

export class FibonacciJitterEngine {
  private step: number = 0;

  /**
   * Calculates Fibonacci number for step n (1-indexed: 1->1, 2->1, 3->2, 4->3, 5->5, 6->8, 7->13...)
   */
  public getFibonacci(n: number): number {
    if (n <= 0) return 0;
    if (n === 1 || n === 2) return 1;
    let a = 1, b = 1;
    for (let i = 3; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  }

  /**
   * Calculates delay for step n: D(n) = min(1000 * Fib(n), 8000)
   */
  public calculateDelay(n: number): { fibValue: number; calculatedDelay: number; appliedDelay: number; capped: boolean } {
    const fibValue = this.getFibonacci(n);
    const calculatedDelay = FIBONACCI_BASE_DELAY * fibValue;
    const appliedDelay = Math.min(calculatedDelay, FIBONACCI_MAX_CAP);
    const capped = calculatedDelay > FIBONACCI_MAX_CAP;
    return { fibValue, calculatedDelay, appliedDelay, capped };
  }

  public getNextDelay(): { step: number; fibValue: number; calculatedDelay: number; appliedDelay: number; capped: boolean } {
    this.step++;
    const result = this.calculateDelay(this.step);
    return { step: this.step, ...result };
  }

  public reset(): void {
    this.step = 0;
  }
}

export interface WebSocketInterceptorOptions {
  mutateCorruptedState?: boolean;
}

export async function setupWebSocketInterception(
  page: Page,
  jitterEngine: FibonacciJitterEngine,
  traceLog: FibJitterTrace[],
  options: WebSocketInterceptorOptions = {}
): Promise<void> {
  // Register native Playwright page.routeWebSocket hook
  await page.routeWebSocket('**/ws', (wsRoute: WebSocketRoute) => {
    const serverWs = wsRoute.connectToServer();

    // Hook server -> browser messages
    serverWs.onMessage((message) => {
      const interceptedAt = Date.now();
      const delayInfo = jitterEngine.getNextDelay();

      let messageStr = typeof message === 'string' ? message : message.toString('utf-8');

      // Optional mutation hook foundation for corrupted representation testing (used in M4)
      if (options.mutateCorruptedState && messageStr.includes('"balance"')) {
        try {
          const parsed = JSON.parse(messageStr);
          parsed.balance = "1e+7"; // Scientific representation violation
          messageStr = JSON.stringify(parsed);
        } catch (e) {
          console.error('[INTERCEPTOR] Failed to mutate JSON payload:', e);
        }
      }

      console.log(`[INTERCEPTOR] Frame #${delayInfo.step} intercepted. Fib(${delayInfo.step})=${delayInfo.fibValue}. Delaying ${delayInfo.appliedDelay}ms (Capped: ${delayInfo.capped})`);

      // Apply Fibonacci jitter delay
      setTimeout(() => {
        const forwardedAt = Date.now();
        wsRoute.send(messageStr);

        traceLog.push({
          step: delayInfo.step,
          fibValue: delayInfo.fibValue,
          calculatedDelayMs: delayInfo.calculatedDelay,
          appliedDelayMs: delayInfo.appliedDelay,
          capped: delayInfo.capped,
          interceptedAt,
          forwardedAt,
          payloadSummary: messageStr.substring(0, 100)
        });

        console.log(`[INTERCEPTOR] Frame #${delayInfo.step} forwarded to browser after ${delayInfo.appliedDelay}ms delay.`);
      }, delayInfo.appliedDelay);
    });

    // Hook browser -> server messages (forward cleanly)
    wsRoute.onMessage((message) => {
      serverWs.send(message);
    });

    wsRoute.onClose(() => {
      serverWs.close();
    });

    serverWs.onClose(() => {
      wsRoute.close();
    });
  });

  console.log('[INTERCEPTOR] Registered native page.routeWebSocket interceptor for **/ws');
}
