type MetrikaFunction = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
type AnalyticsWindow = Window & {
  ym?: MetrikaFunction;
  Ya?: { Metrika2?: { counters: () => { id: number }[] } };
  twin3Metrika?: Record<number, { lastUrl?: string }>;
};
const SCRIPT_URL = 'https://mc.yandex.ru/metrika/tag.js';

export function trackMetrikaPage(id: number, url: string): void {
  if (!Number.isSafeInteger(id) || id <= 0) return;
  const target = window as AnalyticsWindow;
  if (!target.ym) {
    const queued: MetrikaFunction = (...args) => { (queued.a ||= []).push(args); };
    queued.l = Date.now();
    target.ym = queued;
  }
  const states = target.twin3Metrika ||= {};
  if (!states[id]) {
    const existing = target.Ya?.Metrika2?.counters?.().some(counter => Number(counter.id) === id)
      || target.ym.a?.some(args => Number(args[0]) === id && args[1] === 'init');
    states[id] = {};
    if (!existing) target.ym(id, 'init', {
      defer: true, clickmap: true, trackLinks: true, accurateTrackBounce: true,
    });
    if (!Array.from(document.scripts).some(script => script.src === SCRIPT_URL)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = SCRIPT_URL;
      document.head.appendChild(script);
    }
  }
  const state = states[id];
  if (state.lastUrl === url) return;
  const referer = state.lastUrl || document.referrer;
  state.lastUrl = url;
  target.ym(id, 'hit', url, { referer, title: document.title });
}
