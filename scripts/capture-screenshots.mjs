import { spawn, execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

// 1. Static server
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(process.cwd(), reqPath);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

await new Promise(r => server.listen(8999, '127.0.0.1', r));

// 2. Launch Chrome
const tmpDir = execSync('mktemp -d').toString().trim();
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new',
  '--remote-debugging-port=9227',
  '--user-data-dir=' + tmpDir,
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--window-size=1440,920',
  'http://127.0.0.1:8999/index.html'
]);

await new Promise(r => setTimeout(r, 2000));

const listRes = await fetch('http://127.0.0.1:9227/json/list');
const targets = await listRes.json();
const pageTarget = targets.find(t => t.type === 'page');

const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
await new Promise((resolve) => ws.onopen = resolve);

let id = 1;
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const curId = id++;
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === curId) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });
}

await send('Runtime.enable');
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 920,
  deviceScaleFactor: 2,
  mobile: false
});

fs.mkdirSync(path.join(process.cwd(), 'docs/images'), { recursive: true });

async function takeViewportScreenshot(filename) {
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(process.cwd(), 'docs/images', filename), Buffer.from(data, 'base64'));
  console.log(`Saved: docs/images/${filename}`);
}

// 1. Hero Preview
await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
await new Promise(r => setTimeout(r, 500));
await takeViewportScreenshot('hero-preview.png');

// 2. Trending Section
await send('Runtime.evaluate', { expression: `document.getElementById('trending').scrollIntoView(true);` });
await new Promise(r => setTimeout(r, 600));
await takeViewportScreenshot('trending-preview.png');

// 3. Gallery Section
await send('Runtime.evaluate', { expression: `document.getElementById('gallery').scrollIntoView(true);` });
await new Promise(r => setTimeout(r, 600));
await takeViewportScreenshot('gallery-preview.png');

// 4. Modal Detail View
await send('Runtime.evaluate', { expression: `
  const card = document.querySelector('#grid .card');
  if (card) card.click();
` });
await new Promise(r => setTimeout(r, 600));
await takeViewportScreenshot('modal-detail.png');

ws.close();
chrome.kill();
server.close();
console.log('All screenshots captured successfully!');
process.exit(0);
