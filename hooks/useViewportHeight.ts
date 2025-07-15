import { useEffect } from 'react';

export function useViewportHeight() {
  useEffect(() => {
    const setVhVars = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--vh62', `${vh * 62}px`);
      document.documentElement.style.setProperty('--vh59', `${vh * 59}px`);
      // Добавь любые другие --vhX по мере необходимости
    };

    setVhVars();
    window.addEventListener('resize', setVhVars);
    window.addEventListener('orientationchange', setVhVars);

    return () => {
      window.removeEventListener('resize', setVhVars);
      window.removeEventListener('orientationchange', setVhVars);
    };
  }, []);
}
