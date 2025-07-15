'use client';

import { useEffect, useState } from 'react';

export default function CityTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Moscow',
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(now));
    };

    update();
    const interval = setInterval(update, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="text-white/80 text-xs flex flex-wrap items-center gap-2">
    <img
      src="/icons/planet.svg"
      alt="planet"
      className="w-4 h-4 animate-z-slow"
    />
    <strong className="text-[#939393] text-[17px] font-franklin font-normal uppercase whitespace-nowrap">
      Moscow work hours 10 — 19
    </strong>

    <svg
      className="w-[6px] h-[6px] fill-[#939393] animate-blink"
      viewBox="0 0 8 8"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>

    <span className="text-[#939393] text-[17px]  font-franklin font-normal whitespace-nowrap">
      {time}
    </span>
  </div>
);
;
}
