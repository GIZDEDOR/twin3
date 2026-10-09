import test from 'node:test';
import assert from 'node:assert/strict';
import { observePrismic, diagnosticPrismicFetch } from '../lib/prismic-diagnostics.ts';

test('Prismic failures retain identity and log safe cause codes without secret messages', async () => {
  const original = console.error;
  const logs = [];
  const cause = Object.assign(new Error('secret-token-in-message'), { code: 'ETIMEDOUT' });
  const failure = new TypeError('private-url', { cause });
  console.error = (...args) => logs.push(args);
  try {
    await assert.rejects(observePrismic('document projects', async () => { throw failure; }), error => error === failure);
    assert.equal(logs[0][1].operation, 'document projects');
    assert.equal(logs[0][1].causes[1].code, 'ETIMEDOUT');
    assert.ok(!JSON.stringify(logs).includes('secret-token'));
    assert.ok(!JSON.stringify(logs).includes('private-url'));
  } finally { console.error = original; }
});

test('fetch wrapper preserves cache options and returns a readable buffered body', async () => {
  const original = globalThis.fetch, originalLog = console.info;
  const previous = process.env.PRISMIC_DIAGNOSTICS;
  const logs = [];
  const response = new Response('body');
  const input = 'https://twin3.cdn.prismic.io/api/v2/documents/search?access_token=private-token&ref=private-ref';
  const options = { cache: 'no-store', signal: new AbortController().signal };
  globalThis.fetch = async (url, init) => { assert.equal(url, input); assert.equal(init.cache, options.cache); assert.ok(init.signal); return response; };
  console.info = (...args) => logs.push(args);
  process.env.PRISMIC_DIAGNOSTICS = '1';
  try {
    const result = await diagnosticPrismicFetch(input, options);
    assert.equal(result.bodyUsed, false);
    assert.equal(await result.text(), 'body');
    assert.deepEqual(logs.map(x => x[1].phase), ['start', 'complete']);
    assert.ok(!JSON.stringify(logs).includes('private-'));
  } finally {
    globalThis.fetch = original; console.info = originalLog;
    if (previous === undefined) delete process.env.PRISMIC_DIAGNOSTICS;
    else process.env.PRISMIC_DIAGNOSTICS = previous;
  }
});
