export type CaseGoal = 'case_open' | 'video_play' | 'cta_click' | 'behance_click';
type MetricaWindow = Window & { ym?: (id: number, method: string, goal: string, params: { slug: string }) => void; Ya?: { Metrika2?: { counters: () => { id: number }[] } } };
export function sendCaseGoal(goal: CaseGoal, slug: string): boolean {
  const target = window as MetricaWindow;
  const configured = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  const counters = target.Ya?.Metrika2?.counters?.() || [];
  const id = configured > 0 ? configured : counters.length === 1 ? Number(counters[0].id) : 0;
  if (!id || !target.ym) return false;
  target.ym(id, 'reachGoal', goal, { slug });
  return true;
}
