'use client';

import { useEffect } from 'react';

export default function VhSetter() {
  useEffect(() => {
    const setVh = () => {
      // настоящая высота видимой области браузера в пикселях
      const vh = window.innerHeight * 0.01;
      // сохраняем её в CSS‑переменную
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  return null;
}
