import { getPrismicRequestScope } from './prismic-request-scope.ts';

function failureInfo(error: unknown) {
  const result: { name?: string; code?: string }[] = [];
  const seen = new Set<unknown>();
  while (error && typeof error === 'object' && !seen.has(error) && result.length < 5) {
    seen.add(error);
    const value = error as { name?: unknown; code?: unknown; cause?: unknown };
    result.push({
      name: typeof value.name === 'string' ? value.name : undefined,
      code: typeof value.code === 'string' ? value.code : undefined,
    });
    error = value.cause;
  }
  return result;
}

// No URL query, ref, cookies, tokens, response content or raw error messages in logs.
export async function observePrismic<T>(operation: string, work: () => Promise<T>): Promise<T> {
  const start = Date.now();
  const trace = process.env.PRISMIC_DIAGNOSTICS === '1';
  if (trace) console.info('[prismic]', { operation, phase: 'start' });
  try {
    const result = await getPrismicRequestScope().run(work);
    if (trace) console.info('[prismic]', { operation, phase: 'complete', ms: Date.now() - start });
    return result;
  } catch (error) {
    console.error('[prismic]', { operation, phase: 'failed', ms: Date.now() - start, causes: failureInfo(error) });
    throw error;
  }
}

export const diagnosticPrismicFetch: typeof fetch = (input, init) => {
  const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url);
  return observePrismic('http ' + url.origin + url.pathname,
    () => getPrismicRequestScope().fetch(input, init));
};
