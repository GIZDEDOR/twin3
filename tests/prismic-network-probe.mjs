// Integration-test preload only: observes actual fetch below Next's Data Cache.
// Never logs full query strings, cookies, headers or response content.
import { appendFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const nativeFetch = globalThis.fetch;
if (!process.env.TWIN3_NETWORK_LOG) throw new Error('Integration log path is required');
globalThis.fetch = async (input, init) => {
  const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url);
  if (url.hostname.endsWith('.prismic.io')) {
    const type = (url.searchParams.get('q') || '').match(/document.type,\s*"([^"]+)"/)?.[1] || 'repository';
    appendFileSync(process.env.TWIN3_NETWORK_LOG, JSON.stringify({ type,
      key: createHash('sha256').update(url.href).digest('hex') }) + '\n');
  }
  return nativeFetch(input, init);
};
