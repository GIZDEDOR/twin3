type FetchOptions = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };
type BufferedResponse = { body: ArrayBuffer; status: number; statusText: string; headers: Headers; url: string };
const transientCodes = new Set(['TimeoutError', 'ETIMEDOUT', 'ECONNRESET', 'EAI_AGAIN',
  'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_BODY_TIMEOUT', 'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_SOCKET']);
function isTransient(error: unknown): boolean {
  const seen = new Set<unknown>();
  while (error && typeof error === 'object' && !seen.has(error)) {
    seen.add(error);
    const value = error as { name?: string; code?: string; cause?: unknown };
    if (transientCodes.has(value.name || '') || transientCodes.has(value.code || '')) return true;
    error = value.cause;
  }
  return false;
}
function abortable<T>(work: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal.reason);
    signal.addEventListener('abort', abort, { once: true });
    // Attach handlers even when already aborted: no unhandled rejection from work.
    work.then(resolve, reject).finally(() => signal.removeEventListener('abort', abort));
    if (signal.aborted) abort();
  });
}
function responseFrom(value: BufferedResponse): Response {
  const response = new Response([204, 205, 304].includes(value.status) ? null : value.body.slice(0), value);
  Object.defineProperty(response, 'url', { value: value.url });
  return response;
}

// One scope per React server render, never a cross-user response cache.
// The deadline covers SDK pagination/ref retries, network, Retry-After and body reads.
export function createPrismicScope({ operationMs = 15000, attemptMs = 7000 } = {}) {
  const deadline = Date.now() + operationMs;
  const lifetime = new AbortController();
  const requests = new Map<string, Promise<BufferedResponse>>();
  async function run<T>(work: () => Promise<T>): Promise<T> {
    if (Date.now() >= deadline) lifetime.abort(new DOMException('Prismic operation deadline exceeded', 'TimeoutError'));
    lifetime.signal.throwIfAborted();
    const timer = setTimeout(() => lifetime.abort(new DOMException('Prismic operation deadline exceeded', 'TimeoutError')),
      Math.max(0, deadline - Date.now()));
    try { return await abortable(Promise.resolve().then(work), lifetime.signal); }
    finally { clearTimeout(timer); }
  }
  async function request(input: RequestInfo | URL, init: FetchOptions = {}): Promise<BufferedResponse> {
    const caller = init.signal ?? (input instanceof Request ? input.signal : undefined);
    const isGet = (init.method || (input instanceof Request ? input.method : 'GET')).toUpperCase() === 'GET';
    for (let attempt = 0; ; attempt++) {
      lifetime.signal.throwIfAborted();
      caller?.throwIfAborted();
      const controller = new AbortController();
      const abort = () => controller.abort(lifetime.signal.reason);
      lifetime.signal.addEventListener('abort', abort, { once: true });
      const cancel = () => controller.abort(caller?.reason);
      caller?.addEventListener('abort', cancel, { once: true });
      const timer = setTimeout(() => controller.abort(new DOMException('Prismic attempt deadline exceeded', 'TimeoutError')), attemptMs);
      try {
        const response = await abortable(fetch(input, { ...init, signal: controller.signal }), controller.signal);
        const body = await abortable(response.arrayBuffer(), controller.signal);
        if (response.status === 429) {
          // Do not hand 429 to SDK's unbounded recursive retry. Preserve one useful retry here.
          if (!isGet || attempt >= 1) throw Object.assign(new Error('Prismic rate limit persisted'), { name: 'PrismicRateLimitError', status: 429 });
          const raw = response.headers.get('retry-after');
          const seconds = raw === null ? NaN : Number(raw);
          const delay = Math.max(0, Number.isFinite(seconds) ? seconds * 1000 : raw && Number.isFinite(Date.parse(raw)) ? Date.parse(raw) - Date.now() : 1000);
          if (delay >= deadline - Date.now()) throw Object.assign(new Error('Prismic Retry-After exceeds operation budget'), { name: 'PrismicRateLimitError', status: 429 });
          // Body is consumed; the per-attempt timer must not count the rate-limit wait.
          clearTimeout(timer);
          await new Promise<void>((resolve, reject) => {
            const cancel = () => { clearTimeout(wait); lifetime.signal.removeEventListener('abort', cancel); reject(lifetime.signal.reason); };
            const wait = setTimeout(() => { lifetime.signal.removeEventListener('abort', cancel); resolve(); }, delay);
            lifetime.signal.addEventListener('abort', cancel, { once: true });
            if (lifetime.signal.aborted) cancel();
          });
          continue;
        }
        const headers = new Headers(response.headers);
        headers.delete('content-encoding'); headers.delete('content-length');
        return { body, status: response.status, statusText: response.statusText, headers, url: response.url };
      } catch (error) {
        if (lifetime.signal.aborted || caller?.aborted || !isGet || attempt >= 1 || !isTransient(error)) throw error;
      } finally {
        clearTimeout(timer); lifetime.signal.removeEventListener('abort', abort);
        caller?.removeEventListener('abort', cancel);
      }
    }
  }
  const scopedFetch: typeof fetch = (input, init) => run(async () => {
    const signal = init?.signal ?? (input instanceof Request ? input.signal : undefined);
    signal?.throwIfAborted();
    const options = init as FetchOptions | undefined;
    const method = options?.method || (input instanceof Request ? input.method : 'GET');
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    // SDK uses GET URL + options. Other shapes keep their own request and cancellation.
    const key = !(input instanceof Request) && method.toUpperCase() === 'GET' && !options?.body && !signal
      ? JSON.stringify([url, { ...options, headers: [...new Headers(options?.headers).entries()].sort() }]) : null;
    let job = key ? requests.get(key) : undefined;
    if (!job) {
      job = request(input, options);
      if (key) requests.set(key, job);
    }
    return responseFrom(await (signal ? abortable(job, signal) : job));
  });
  return { run, fetch: scopedFetch };
}

// Standalone entry for consumers outside React server rendering and transport tests.
export function fetchPrismic(input: RequestInfo | URL, init?: RequestInit, timeoutMs = 7000): Promise<Response> {
  return createPrismicScope({ attemptMs: timeoutMs, operationMs: timeoutMs * 2 + 1000 }).fetch(input, init);
}
