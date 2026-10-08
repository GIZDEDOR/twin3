'use client';
import { useEffect, useRef } from 'react';
import { sendCaseGoal, type CaseGoal } from '@/lib/case-analytics';

export default function ProjectAnalytics({ slug }: { slug: string }) {
  const marker = useRef<HTMLSpanElement>(null);
  const opened = useRef(false);
  const played = useRef(new Set<string>());
  useEffect(() => {
    const root = marker.current?.closest('article');
    if (!root) return;
    const pending: CaseGoal[] = [];
    const send = (goal: CaseGoal) => { if (!sendCaseGoal(goal, slug)) pending.push(goal); };
    if (!opened.current) { send('case_open'); opened.current = true; }
    const onPlay = (event: Event) => {
      if (!(event.target instanceof HTMLVideoElement)) return;
      const src = event.target.currentSrc || event.target.src;
      if (!src || played.current.has(src)) return;
      played.current.add(src); send('video_play');
    };
    const onClick = (event: Event) => {
      const goal = (event.target as Element)?.closest('[data-case-goal]')?.getAttribute('data-case-goal');
      if (goal === 'cta_click' || goal === 'behance_click') send(goal);
    };
    // Wait for a delayed/consent-loaded counter without counting preview autoplay.
    const timer = window.setInterval(() => {
      while (pending.length && sendCaseGoal(pending[0], slug)) pending.shift();
    }, 1000);
    root.addEventListener('playing', onPlay, true);
    root.addEventListener('click', onClick);
    return () => {
      window.clearInterval(timer);
      root.removeEventListener('playing', onPlay, true);
      root.removeEventListener('click', onClick);
      // React StrictMode effect replay must not lose an unsent case_open.
      if (pending.includes('case_open')) opened.current = false;
    };
  }, [slug]);
  return <span ref={marker} hidden />;
}
