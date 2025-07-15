import { useLayoutEffect } from 'react';

export default function useLockBodyScroll(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const body    = document.body;

    body.style.position = 'fixed';
    body.style.top      = `-${scrollY}px`;
    body.style.left     = '0';
    body.style.right    = '0';
    body.style.width    = '100%';
    body.style.overscrollBehavior = 'none'; // глушим bounce-scroll

    return () => {
      body.style.position = '';
      body.style.top      = '';
      body.style.left     = '';
      body.style.right    = '';
      body.style.width    = '';
      body.style.overscrollBehavior = '';
      window.scrollTo(0, scrollY);           // возвращаемся, куда были
    };
  }, [locked]);
}