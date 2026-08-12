/**
 * Q1 HTML5 Canvas Client Application
 * Handles 2D Context rendering, 4x4 Grid layout, WebSocket state updates,
 * frame freshness markers (frameId, targetVersion), and T1 event listener.
 */

(function () {
  'use strict';

  // Canvas & DOM elements
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const connStatusEl = document.getElementById('conn-status');
  const appStateEl = document.getElementById('app-state');
  const targetVersionEl = document.getElementById('target-version');
  const renderFrameEl = document.getElementById('render-frame');
  const debugInfoEl = document.getElementById('debug-info');
  const exceptionBoundaryEl = document.getElementById('exception-boundary');
  const exceptionMsgEl = document.getElementById('exception-message');

  // Application State
  const state = {
    appState: 'LOADING', // LOADING -> ACTIVE -> EXCEPTION
    targetX: 300,
    targetY: 200,
    targetWidth: 100,
    targetHeight: 100,
    targetColor: '#808080', // Gray default
    frameId: 0,
    targetVersion: 1,
    t0: null, // rAF pixel validation timestamp (performance.now())
    t1: null, // First pointerenter/hover event arrival timestamp (performance.now())
    deltaT: null,
    balance: 1000.00,
    wsConnected: false
  };

  // Expose global inspection object for automation / verification
  window.__Q1_STATE = state;

  // --------------------------------------------------------------------------
  // Render Engine (Driven by requestAnimationFrame)
  // --------------------------------------------------------------------------
  function render() {
    state.frameId++;
    if (renderFrameEl) renderFrameEl.textContent = state.frameId;

    // Clear Canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw 4x4 Background Grid (Grid Size: 200x150 per cell)
    const cellWidth = canvas.width / 4;
    const cellHeight = canvas.height / 4;

    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 1;
    for (let c = 0; c <= 4; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellWidth, 0);
      ctx.lineTo(c * cellWidth, canvas.height);
      ctx.stroke();
    }
    for (let r = 0; r <= 4; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellHeight);
      ctx.lineTo(canvas.width, r * cellHeight);
      ctx.stroke();
    }

    // Draw Target Cell at current coordinates (state.targetX, state.targetY)
    ctx.fillStyle = state.targetColor;
    ctx.fillRect(state.targetX, state.targetY, state.targetWidth, state.targetHeight);

    // Draw Target Cell Border
    ctx.strokeStyle = state.appState === 'ACTIVE' ? '#00e676' : '#aaaaaa';
    ctx.lineWidth = 2;
    ctx.strokeRect(state.targetX, state.targetY, state.targetWidth, state.targetHeight);

    // Draw Target Cell Label & Metadata
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px sans-serif';
    ctx.fillText(`State: ${state.appState}`, state.targetX + 8, state.targetY + 20);
    ctx.fillText(`v${state.targetVersion}`, state.targetX + 8, state.targetY + 40);

    requestAnimationFrame(render);
  }

  // --------------------------------------------------------------------------
  // WebSocket Client Connection
  // --------------------------------------------------------------------------
  function initWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    if (debugInfoEl) debugInfoEl.textContent = `Connecting to WebSocket at ${wsUrl}...`;
    if (connStatusEl) {
      connStatusEl.textContent = 'CONNECTING...';
      connStatusEl.style.color = '#ffb300';
    }

    const ws = new WebSocket(wsUrl);

    ws.onopen = function () {
      state.wsConnected = true;
      if (connStatusEl) {
        connStatusEl.textContent = 'CONNECTED';
        connStatusEl.style.color = '#00e676';
      }
      if (debugInfoEl) debugInfoEl.textContent = 'WebSocket connected. Awaiting state update stream...';
    };

    ws.onmessage = function (event) {
      try {
        const msg = JSON.parse(event.data);
        handleServerMessage(msg);
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    ws.onclose = function () {
      state.wsConnected = false;
      if (connStatusEl) {
        connStatusEl.textContent = 'DISCONNECTED';
        connStatusEl.style.color = '#ff1744';
      }
      if (debugInfoEl) debugInfoEl.textContent = 'WebSocket disconnected.';
    };

    ws.onerror = function (err) {
      console.error('WebSocket error:', err);
    };
  }

  // --------------------------------------------------------------------------
  // Message Handler & Representation Contract Validation
  // --------------------------------------------------------------------------
  function handleServerMessage(msg) {
    if (!msg || msg.type !== 'STATE_UPDATE') return;

    // Check balance state representation contract
    if (msg.balance !== undefined) {
      if (typeof msg.balance === 'string' && (msg.balance.includes('e') || msg.balance.includes('E') || isNaN(Number(msg.balance)))) {
        // Trigger structured exception boundary
        triggerExceptionBoundary(`Representation Contract Violation: Received non-numeric/scientific balance payload "${msg.balance}"`);
        return;
      }
      state.balance = Number(msg.balance);
    }

    // Update state fields
    if (msg.state) state.appState = msg.state;
    if (msg.target) {
      if (msg.target.x !== undefined) state.targetX = msg.target.x;
      if (msg.target.y !== undefined) state.targetY = msg.target.y;
      if (msg.target.width !== undefined) state.targetWidth = msg.target.width;
      if (msg.target.height !== undefined) state.targetHeight = msg.target.height;
      if (msg.target.color) state.targetColor = msg.target.color;
    }
    if (msg.targetVersion !== undefined) state.targetVersion = msg.targetVersion;

    // Update DOM Indicators
    if (appStateEl) {
      appStateEl.textContent = state.appState;
      appStateEl.style.color = state.appState === 'ACTIVE' ? '#00e676' : '#ffb300';
    }
    if (targetVersionEl) targetVersionEl.textContent = state.targetVersion;
    if (debugInfoEl) {
      debugInfoEl.textContent = `State Update: ${state.appState} | Pos: (${state.targetX}, ${state.targetY}) | Color: ${state.targetColor} | Version: ${state.targetVersion}`;
    }
  }

  function triggerExceptionBoundary(message) {
    state.appState = 'EXCEPTION';
    if (appStateEl) {
      appStateEl.textContent = 'EXCEPTION';
      appStateEl.style.color = '#ff1744';
    }
    if (exceptionBoundaryEl) {
      exceptionBoundaryEl.style.display = 'block';
      exceptionBoundaryEl.setAttribute('data-exception-boundary', 'triggered');
    }
    if (exceptionMsgEl) {
      exceptionMsgEl.textContent = message;
    }
    if (debugInfoEl) {
      debugInfoEl.textContent = `EXCEPTION BOUNDARY TRIGGERED: ${message}`;
    }
  }

  // --------------------------------------------------------------------------
  // Interaction Timing Listener (Captures T1 at initial pointerenter/hover)
  // --------------------------------------------------------------------------
  canvas.addEventListener('pointerenter', function () {
    if (!state.t1) {
      state.t1 = window.performance.now();
      if (state.t0) {
        state.deltaT = state.t1 - state.t0;
      }
    }
  });

  canvas.addEventListener('mouseenter', function () {
    if (!state.t1) {
      state.t1 = window.performance.now();
      if (state.t0) {
        state.deltaT = state.t1 - state.t0;
      }
    }
  });

  // Start render loop & WebSocket connection
  requestAnimationFrame(render);
  window.addEventListener('DOMContentLoaded', initWebSocket);

})();
