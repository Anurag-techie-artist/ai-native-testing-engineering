import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import { LOCAL_SERVER_PORT, LOCAL_APP_URL, TARGET_DEFAULT_X, TARGET_DEFAULT_Y, TARGET_WIDTH, TARGET_HEIGHT, COLOR_GRAY_HEX, COLOR_BLUE_HEX } from '../config/q1_config';

const CLIENT_DIR = path.join(__dirname, '../client');

// Content Type Map
const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon'
};

// ----------------------------------------------------------------------------
// 1. Local HTTP Server (Serves static Canvas Client)
// ----------------------------------------------------------------------------
const server = http.createServer((req, res) => {
  const reqUrl = req.url === '/' || req.url === '' ? '/index.html' : req.url || '/index.html';
  const filePath = path.join(CLIENT_DIR, reqUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`500 Server Error: ${err.code}`);
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// ----------------------------------------------------------------------------
// 2. Standalone Local WebSocket Testbed Server
// ----------------------------------------------------------------------------
const wss = new WebSocketServer({ server, path: '/ws' });

let clientSequence = 0;

wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
  console.log(`[WS SERVER] WebSocket client connected from ${req.socket.remoteAddress}`);

  // Send Initial State Update (LOADING State, Gray Target)
  const initialPayload = {
    type: 'STATE_UPDATE',
    sequence: ++clientSequence,
    timestamp: Date.now(),
    state: 'LOADING',
    target: {
      gridId: 'cell-2-2',
      x: TARGET_DEFAULT_X,
      y: TARGET_DEFAULT_Y,
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      color: COLOR_GRAY_HEX
    },
    targetVersion: 1,
    balance: 1000.00
  };

  ws.send(JSON.stringify(initialPayload));
  console.log('[WS SERVER] Transmitted initial LOADING state frame (Gray target, v1)');

  // After 1000 ms, transmit ACTIVE state update (Active Blue Target)
  const timer = setTimeout(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const activePayload = {
        type: 'STATE_UPDATE',
        sequence: ++clientSequence,
        timestamp: Date.now(),
        state: 'ACTIVE',
        target: {
          gridId: 'cell-2-2',
          x: TARGET_DEFAULT_X,
          y: TARGET_DEFAULT_Y,
          width: TARGET_WIDTH,
          height: TARGET_HEIGHT,
          color: COLOR_BLUE_HEX
        },
        targetVersion: 2,
        balance: 1000.00
      };

      ws.send(JSON.stringify(activePayload));
      console.log('[WS SERVER] Transmitted ACTIVE state frame (Blue target, v2)');
    }
  }, 1000);

  ws.on('close', () => {
    clearTimeout(timer);
    console.log('[WS SERVER] WebSocket client disconnected');
  });

  ws.on('error', (err) => {
    console.error('[WS SERVER] Client socket error:', err);
  });
});

// ----------------------------------------------------------------------------
// 3. Startup & Graceful Shutdown
// ----------------------------------------------------------------------------
server.listen(LOCAL_SERVER_PORT, () => {
  console.log(`[HTTP SERVER] HTTP server started on ${LOCAL_APP_URL}`);
  console.log(`[WS SERVER] WebSocket server started on ws://localhost:${LOCAL_SERVER_PORT}/ws`);
});

const gracefulShutdown = () => {
  console.log('\n[SERVER] Shutting down HTTP & WebSocket server...');
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.close();
    }
  });
  wss.close(() => {
    server.close(() => {
      console.log('[SERVER] Server shut down gracefully.');
      process.exit(0);
    });
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

export { server, wss };
