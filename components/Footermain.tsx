'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function Footermain() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      const textWidth = marquee.scrollWidth / 2;

      gsap.fromTo(
        marquee,
        { x: 0 },
        {
          x: -textWidth,
          duration: 20,
          ease: 'linear',
          repeat: -1,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const socialLinks: Record<string, string> = {
  bh: 'https://behance.net/twin3dproduction',
  tg: 'https://t.me/twin_3d',
  wa: 'https://api.whatsapp.com/send?phone=79067244645',
};
const desktopSocials = [
  { icon: '/icons/tg-icon.svg', name: 'TELEGRAM', key: 'tg' },
  { icon: '/icons/bh-icon.svg', name: 'BEHANCE',  key: 'bh' },
  { icon: '/icons/wa-icon.svg', name: 'WHATSAPP', key: 'wa' },
];

const mobileSocials = [
  { key: 'bh', icon: '/icons/bh-icon.svg', name: 'BEHANCE' },
  { key: 'tg', icon: '/icons/tg-icon.svg', name: 'TELEGRAM' },
  { key: 'wa', icon: '/icons/wa-icon.svg', name: 'WHATSAPP' },
];



  return (
    <footer className="relative w-full bg-dark min-h-screen text-white overflow-hidden">
      {/* Бегущая строка (в фоне, за девушкой) */}
      <div className="absolute left-0 w-full overflow-hidden z-0 h-[32vw] sm:h-[14vw] bottom-0">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap w-max absolute text-[40vw] sm:text-[18vw]"
          style={{
            backgroundImage: 'linear-gradient(90deg, #C3C3C3, #999999)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            fontFamily: 'druk, sans-serif',
            textTransform: 'uppercase',
            lineHeight: 1,
            opacity: 0.2,
            bottom: 0,
            position: 'absolute',
            transform: 'translateY(20%)',
          }}
        >
          TWIN 3D CGI PRODUCTION&nbsp;TWIN 3D CGI PRODUCTION&nbsp;TWIN 3D CGI PRODUCTION
        </div>
      </div>

      {/* Только для мобильных (sm:hidden) */}
<div className="sm:hidden w-full px-4 pt-6 pb-2 flex flex-col gap-3 max-w-[500px] mx-auto">
  {/* Верхние 3 колонки: логотип, адрес, часы */}
  <div className="grid grid-cols-3 gap-3">
    <div className="flex flex-col items-start">
      <img src="/images/logocvet.webp" alt="Twin3d" className="h-10 w-auto object-contain " />
    </div>
    <div className="flex flex-col leading-[0.9] mb-2">
      <p className="uppercase text-xl font-franklin leading-[1.1]">Москва,</p>
      <p className="uppercase text-xl font-franklin leading-[1.1]">пр-т Мира</p>
      <p className="uppercase text-xl font-franklin leading-[1.1]">д.119 стр. 318</p>
      <p className="text-white uppercase opacity-30 font-franklin mb-0">2 этаж, офис 207</p>
        <p className="text-white uppercase opacity-30 font-franklin">(Арт-Техноград)</p>
    </div>
    <div className="flex flex-col leading-[0.9] mb-2">
      <p className="uppercase text-xl font-franklin leading-[1.1]">часы работы:</p>
      <p className="uppercase text-xl font-franklin leading-[1.1]">будни дни</p>
      <p className="uppercase text-xl font-franklin leading-[1.1]">10:00-19:00</p>
      <p className="text-white uppercase opacity-30 font-franklin mb-0">сб,вс и праздники:</p>
        <p className="text-white uppercase opacity-30 font-franklin">выходные дни</p>
    </div>
  </div>
  {/* Соцсети: снова 3 колонки */}
  <div className="grid grid-cols-3 xs:grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
  {mobileSocials.map((item) => (
    <a
      key={item.key}
      href={socialLinks[item.key]}
      className="
        flex items-center justify-center gap-2
        px-3 sm:px-5 py-2
        border border-white/20 rounded-[10.61px]
        font-franklin text-white/70 hover:text-white hover:bg-white/10
        text-lg 
        transition
        w-full
        whitespace-nowrap
      "
    >
      <img src={item.icon} alt={item.name} className="w-4 h-4 shrink-0" />
      {item.name}
    </a>
  ))}
</div>

  {/* Телефон и почта: две широкие кнопки в ряд */}
  {/* Телефон и почта */}
<div className="flex flex-row sm:flex-row gap-3 mt-3 w-full justify-center ">
  <a
    href="tel:+74951253435"
    className="
      flex items-center justify-center gap-2
      px-4 py-2 min-w-[110px] h-11
      border border-white/20 rounded-[10.61px]
      font-franklin text-white/70 hover:text-white hover:bg-white/10
      text-lg 
      transition
      whitespace-nowrap
    "
  >
    +7 495 125-34-35
  </a>
  <a
    href="mailto:info@twin3d.ru"
    className="
      flex items-center justify-center gap-2
      px-4 py-2 min-w-[110px] h-11
      border border-white/20 rounded-[10.61px]
      font-franklin text-white/70 hover:text-white hover:bg-white/10
      text-lg 
      transition uppercase
      whitespace-nowrap
    "
  >
    info@twin3d.ru
  </a>
</div>
</div>

      {/* Девушка */}
<div
  className="
    absolute z-20
    left-1/2 -translate-x-1/2
    sm:left-[18vw] sm:translate-x-0

    /* Ширина — сначала % от экрана, но не больше 880-px на very-large */
    w-[90vw]                /* < 640 px   */
    sm:w-[45vw]             /* 640-1023   */
    md:w-[40vw]             /* 768-1023   */
    lg:w-[38vw]             /* 1024-1279  */
    xl:w-[36vw]             /* 1280-1535  */
    2xl:max-w-[880px]       /* ≥1536, но ограничиваем пикселями */

    /* Отступ снизу подгоняем так, чтобы руки не обрезались */
    bottom-[30vw]           /* мобилка   */
    sm:bottom-[0vw]        /* ≥640 px   */
    lg:bottom-[0vw]        /* ≥1024 px  */
  "
>
  {/* desktop */}
  <Image
    src="/images/image77.webp"
    alt="Character"
    width={1024}
    height={1536}
    className="hidden sm:block w-full h-auto"
  />
  {/* mobile */}
  <Image
    src="/images/image100.webp"
    alt="Character mobile"
    width={400}
    height={600}
    className="sm:hidden w-full h-auto"
  />
</div>
      <div
      className="
    sm:hidden
    absolute bottom-0 right-0
    z-20
    flex items-center gap-2
    mr-2
    px-3 py-2
    bg-black/50        /* полупрозрачный белый фон */
    backdrop-blur-sm
    border-t border-l border-r border-[#848484]   /* размытие фона за элементом */
    border-b-0  /* серая рамка */
    rounded-t-lg        /* скругляем только верхние углы */
  "
>
  <img
    src="/icons/sk-icon.png"
    alt="Skolkovo участник"
    className="h-7 w-15"
  />
</div>

      {/* Контент футера */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-6 sm:px-10 pt-10 pb-64 flex flex-col lg:flex-row items-start justify-center gap-10">
        {/* Левая пустая часть — заменена девушкой (absolute) */}

        {/* Правая колонка с контентом */}
<div className="flex flex-col gap-6 ml-[500px] mt-[120px] pr-10 max-w-full">
  {/* Заголовок и адрес */}
  <div className="col-span-1 flex flex-col gap-4 max-w-[520px]">
    <a
  href="mailto:info@twin3d.ru"
  className="
    group
    text-white opacity-45 hover:opacity-100
    font-bold text-6xl sm:text-6xl font-franklin w-fit
    flex items-start gap-2
    transition-all duration-300
    hover:text-transparent
    hover:bg-gradient-to-r hover:from-[#1FA2FF] hover:to-[#1ADBFC] hover:bg-clip-text
  "
>
  INFO@TWIN3D.RU
  {/* Стрелка — 2 версии */}
  <span className="relative ml-3 flex items-center">
    <img
      src="/images/Strelka1.png"
      alt="arrow"
      className="w-6 h-6 pointer-events-none group-hover:hidden"
      draggable={false}
    />
    <img
      src="/images/Strelka2r.png"
      alt="arrow hover"
      className="w-6 h-6 pointer-events-none hidden group-hover:inline"
      draggable={false}
    />
  </span>
</a>
  </div>

  {/* Grid из 3 колонок */}
  <div className="grid grid-cols-3 gap-x-5 gap-y-4 items-start w-full max-w-[500px]">
    <div className="leading-[0.9] mb-2">
      <p className="uppercase text-xl font-franklin leading-[1.1]">Москва,</p>
      <p className="uppercase text-xl font-franklin leading-[1.1]">пр-т Мира</p>
      <p className="uppercase text-xl font-franklin leading-[1.1]">д.119 стр. 318</p>
      <p className="text-white opacity-30 font-franklin mb-0">2 этаж, офис 207</p>
        <p className="text-white opacity-30 font-franklin">(Арт-Техноград)</p>
    </div>
    {/* Соцсети */}
    <div className="flex flex-col gap-[11.5px] items-start">
      {desktopSocials.map((item, idx) => (
        <a
          key={idx}
          href={socialLinks[item.key]}
          className="flex items-center gap-2 px-5 py-2 border border-white/20 rounded-[10.61px] font-franklin text-white/70 hover:text-white hover:bg-white/10 transition"
        >
          <img src={item.icon} alt={item.name} className="w-5 h-5" />
          <span className="text-[20px] leading-[20.9px] tracking-normal">{item.name}</span>
        </a>
      ))}
      <a
        href="#"
        className="hidden sm:flex items-center gap-2 px-5 py-2  font-franklin"
      >
        <img src="/icons/sk-icon.png" alt="Skolkovo" className="h-15 w-32" />
      </a>
    </div>
    

    
    <div className="text-[13px] text-[#2C2C2C] font-franklin uppercase leading-[1.2] tracking-[-0.02em] mt-4 relative -top-5 left-6">
    <div className="w-[50px] sm:w-[100px] mb-2">
        <Image
      src="/images/Group2087329657.png"
      alt="Logo"
      width={512}
      height={768}
      className="w-full h-auto"
        />
    </div>
    <p className="text-white opacity-30 font-franklin mb-0">все аватары</p>
    <p className="text-white opacity-30 font-franklin mb-0">защищены</p>
    <p className="text-white opacity-30 mt-[1px] font-franklin">©2025</p>
    </div>
    </div>
    </div>
      </div>
    </footer>
  );
}
