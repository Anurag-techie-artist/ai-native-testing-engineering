/**
 * Q1 Centralized Configuration
 * Distinguishes Frozen Assignment Constants from Configurable Design Parameters.
 */

// ============================================================================
// ASSIGNMENT CONSTANTS (FROZEN BY PRD & DESIGN BRIEF)
// ============================================================================
export const FIBONACCI_BASE_DELAY = 1000; // Base multiplier D(n) = 1000 * Fib(n) ms
export const FIBONACCI_MAX_CAP = 8000;    // Upper cap of 8000 ms
export const RACE_WINDOW_MIN_MS = 30;     // Min race window bound: 30 ms
export const RACE_WINDOW_MAX_MS = 100;    // Max race window bound: 100 ms
export const DRAG_X_DISTANCE_PX = 15;     // X-axis drag distance: 15 px

// ============================================================================
// CONFIGURABLE DESIGN PARAMETERS (TUNEABLE FOR TESTBED ENVIRONMENT)
// ============================================================================
export const LOCAL_SERVER_PORT = 8080;
export const LOCAL_APP_URL = `http://localhost:${LOCAL_SERVER_PORT}`;
export const LOCAL_WS_URL = `ws://localhost:${LOCAL_SERVER_PORT}/ws`;

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const TARGET_GRID_ID = 'cell-2-2';
export const TARGET_DEFAULT_X = 300;
export const TARGET_DEFAULT_Y = 200;
export const TARGET_WIDTH = 100;
export const TARGET_HEIGHT = 100;

export const COLOR_GRAY_HEX = '#808080';
export const COLOR_BLUE_HEX = '#0055FF';

export const COLOR_GRAY_RGB: [number, number, number] = [128, 128, 128];
export const COLOR_BLUE_RGB: [number, number, number] = [0, 85, 255];
export const RGB_TOLERANCE = 10;

export const DESIGN_PARAM_DRIFT_THRESHOLD = 20; // Max allowable 2D offset before tripping circuit breaker
export const DESIGN_PARAM_MAX_RETRIES = 3;       // Max frame retries for circuit breaker
export const TARGET_RACE_DELAY_MS = 50;          // Nominal race target within 30-100 ms window
