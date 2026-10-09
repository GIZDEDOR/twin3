// Run explicitly against an ISOLATED production build under /private/tmp or /tmp.
// TWIN3_TEST_BUILD_DIR=/private/tmp/<copy> node tests/prismic-render.integration.mjs
// Never runs against the working tree or a production server. No browser/Metрика events.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, rmSync, realpathSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
const root = realpathSync(process.env.TWIN3_TEST_BUILD_DIR || '.');
assert.ok(root.startsWith('/private/tmp/') || root.startsWith('/tmp/'), 'Use an isolated temporary build');
assert.ok(existsSync(join(root, '.next/BUILD_ID')), 'Run production build in the temporary copy first');
const log = join(mkdtempSync(join(tmpdir(), 'twin3-wire-')), 'requests.jsonl');
const logs = () => existsSync(log) ? readFileSync(log, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : [];
const port = process.env.TWIN3_TEST_PORT || '3103';
for (const path of ['/projects', '/projects/yota', '/projects/kino']) {
  // Cold Data Cache, including extramenu, for every page. Only this disposable build is affected.
  rmSync(join(root, '.next/cache/fetch-cache'), { recursive: true, force: true });
  const child = spawn(process.execPath, ['--import', fileURLToPath(new URL('./prismic-network-probe.mjs', import.meta.url)),
    'node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', port], {
    cwd: root, env: { ...process.env, TWIN3_NETWORK_LOG: log }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Server startup timed out')), 10000);
      child.stdout.on('data', b => { if (b.toString().includes('Ready')) { clearTimeout(timer); resolve(); } });
      child.once('exit', code => { clearTimeout(timer); reject(new Error('Server exited: ' + code)); });
      child.once('error', error => { clearTimeout(timer); reject(error); });
    });
    const before = logs().length, start = Date.now();
    const response = await fetch(`http://127.0.0.1:${port}${path}`, { signal: AbortSignal.timeout(22000) });
    const body = await response.text();
    assert.equal(response.status, 200);
    assert.ok(body.includes('CoolCola'));
    assert.ok(!body.includes('Application error:'));
    if (path !== '/projects') assert.match(body, /<h1[^>]*id="project-title"/);
    const calls = logs().slice(before);
    assert.deepEqual(calls.map(c => c.type).sort(), ['extramenu', 'project', 'projects', 'repository']);
    assert.equal(new Set(calls.map(c => c.key)).size, 4, 'Duplicate wire request');
    console.log(JSON.stringify({ path, status: response.status, ms: Date.now() - start,
      networkRequests: calls.length, types: calls.map(c => c.type) }));
  } finally {
    if (child.exitCode === null) {
      const exit = new Promise(resolve => child.once('exit', resolve));
      child.kill('SIGTERM'); await exit;
    }
  }
}
