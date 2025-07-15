'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Link from 'next/link';

const NAV = [
  { label: 'WELCOME', href: '/' },
  { label: 'ПРОЕКТЫ', href: '/projects' },
  { label: 'КТО МЫ', href: '/about' },
  { label: 'БЛОГ', href: '/blog' },
];

const SOCIALS = [
  { icon: '/icons/tg-icon.svg', name: 'TELEGRAM', href: 'https://t.me/twin_3d' },
  { icon: '/icons/wa-icon.svg', name: 'WHATSAPP', href: 'https://api.whatsapp.com/send?phone=79067244645' },
  { icon: '/icons/bh-icon.svg', name: 'BEHANCE', href: 'https://behance.net/twin3dproduction' },
];



export default function Footer() {
  const mobileMarqueeRef = useRef<HTMLDivElement>(null);
  const desktopMarqueeRef = useRef<HTMLDivElement>(null);

  /* ======== marquee animations ======== */
  useEffect(() => {
    const el = mobileMarqueeRef.current;
    if (!el) return;
    const width = el.scrollWidth / 2;            // текст продублирован дважды
    const anim = gsap.fromTo(el, { x: 0 }, { x: -width, duration: 20, ease: 'linear', repeat: -1 });
    return () => {anim.kill();}
  }, []);

  useEffect(() => {
    const el = desktopMarqueeRef.current;
    if (!el) return;
    const width = el.scrollWidth / 2;            // текст продублирован дважды
    const anim = gsap.fromTo(el, { x: 0 }, { x: -width, duration: 20, ease: 'linear', repeat: -1 });
    return () => {anim.kill();}
  }, []);

  return (
    <>
      {/* ========== MOBILE FOOTER ========== */}
      <footer className="sm:hidden relative w-full min-h-screen text-white overflow-hidden bg-[#0B0B0B] rounded-t-[20px]">
        {/* бегущая строка */}
        <div className="absolute inset-x-0 bottom-0 overflow-hidden z-30 h-[32vw]">
          <div
            ref={mobileMarqueeRef}
            className="flex whitespace-nowrap w-max absolute"
            style={{
              backgroundImage: 'linear-gradient(90deg,#C3C3C3,#999999)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '40vw',
              fontWeight: 800,
              fontFamily: 'druk, sans-serif',
              textTransform: 'uppercase',
              lineHeight: 1,
              opacity: 0.2,
              bottom: 0,
              transform: 'translateY(20%)',
            }}
          >
            TWIN&nbsp;3D&nbsp;CGI&nbsp;PRODUCTION&nbsp;TWIN&nbsp;3D&nbsp;CGI&nbsp;PRODUCTION&nbsp;
          </div>
        </div>

        {/* ----- верхний бордер  ------------------------------------------------ */}
        <div
          className="
            relative z-10               /* небольшие бок-отступы */
            pt-6 px-4 pb-[20vw]             /* внутренние отступы */
            max-w-[500px] mx-auto
            flex flex-col gap-3
            bg-[#0B0B0B]
            rounded-t-[20px] overflow-hidden
          "
          style={{ borderTop: '1px solid #545454' }}   /* только сверху */
        >
          {/* логотип / адрес / часы работы */}
          <div className="grid grid-cols-3 gap-3 items-start">
            {/* логотип – выровнен по первой строке */}
            <div className="flex items-start pt-1">
              <Image src="/images/logocvet.webp" alt="Twin3d" width={120} height={24} />
            </div>

            {/* адрес */}
            <div className="flex flex-col leading-[0.9]">
              <p className="uppercase text-xl font-franklin">Москва,</p>
              <p className="uppercase text-xl font-franklin">пр-т&nbsp;Мира</p>
              <p className="uppercase text-xl font-franklin">д.119&nbsp;стр.&nbsp;318</p>
              <p className="text-white opacity-30 font-franklin text-sm">
                2&nbsp;этаж, офис&nbsp;207<br />(Арт-Техноград)
              </p>
            </div>

            {/* часы */}
            <div className="flex flex-col leading-[0.9]">
              <p className="uppercase text-xl font-franklin">Часы работы:</p>
              <p className="uppercase text-xl font-franklin">Будни дни</p>
              <p className="uppercase text-xl font-franklin">10:00–19:00</p>
              <p className="text-white opacity-30 font-franklin text-sm">
                Сб, вс и праздники:<br />выходные дни
              </p>
            </div>
          </div>

          {/* соцсети */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            {['bh','tg','wa'].map(key => {
              const soc = SOCIALS.find(s => s.icon.includes(`${key}-icon`))!;
              return (
                <a
                  key={soc.name}
                  href={soc.href}
                  className="
                    flex items-center gap-2 px-5 py-2
                    border border-white/20 rounded-[10.61px]
                    font-franklin text-white/70 text-sm
                    hover:text-white hover:bg-white/10 transition
                  "
                >
                  <img src={soc.icon} alt={soc.name} className="w-5 h-5" />
                  {soc.name}
                </a>
              );
            })}
          </div>

          {/* телефон / почта */}
          <div className="flex gap-3 mt-1 justify-center">
            <a
              href="tel:+74951253435"
              className="
                flex items-center gap-2 px-5 py-2
                border border-white/20 rounded-[10.61px]
                font-franklin text-white/70 text-sm
                hover:text-white hover:bg-white/10 transition
              "
            >
              +7&nbsp;495&nbsp;125-34-35
            </a>
            <a
              href="mailto:info@twin3d.ru"
              className="
                flex items-center gap-2 px-5 py-2
                border border-white/20 rounded-[10.61px]
                font-franklin text-white/70 text-sm
                hover:text-white hover:bg-white/10 transition
              "
            >
              INFO@TWIN3D.RU
            </a>
          </div>
        </div>

        {/* персонаж */}
        <div className="absolute bottom-[calc(12vh)] left-1/2 -translate-x-[56%] max-[429px]:translate-y-[60px] z-20 w-[120vw] max-w-none ]">
          <Image
  src="/images/ded3webp.webp"
  alt="Character mobile"
  width={400}
  height={600}
  className="
    w-full h-auto z-0
    scale-[0.8]                     /* ← по умолчанию для узких экранов */
    min-[430px]:scale-100          /* ← для iPhone 15 Pro Max и выше */
/* ^ ширина от 500px и больше — нормальный размер */
  "
/>
        </div>

        {/* бейдж «Сколково» */}
        <div className="absolute bottom-0 right-2 z-20 flex items-center px-3 py-2
                  bg-black/50 backdrop-blur-sm border-t border-l border-r
                  border-[#848484] rounded-t-lg">
    <img src="/icons/sk-icon.png" alt="Skolkovo" className="h-7 w-auto" />
  </div>
      </footer>

      {/* ========== DESKTOP FOOTER ========== */}
      <div className="hidden sm:block">
        <footer className="relative w-full bg-[#141414] text-white overflow-hidden pt-12">
          <div className="relative bg-black rounded-[20px] border border-[#2B2B2B] mx-auto overflow-hidden max-w-[1720px]">
            <div className="px-6 pt-10 pb-6 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
              <img src="/images/logocvet.webp" alt="Twin3d" className="h-8 ml-[9vw]" />

              {/* адрес + навигация + копирайт */}
              <div className="flex flex-col sm:flex-row gap-20 mx-auto ">                  
                <div className="flex flex-col leading-tighter text-left ml-6 lg:ml-12 xl:ml-[72px]">
                  <span className="uppercase font-franklin text-xl">Москва,</span>
                  <span className="uppercase font-franklin text-xl">ПР-Т&nbsp;МИРА</span>
                  <span className="uppercase font-franklin text-xl">Д.119&nbsp;СТР.&nbsp;318</span>
                  <span className="text-white opacity-30 font-franklin text-sm mt-1">
                    2&nbsp;этаж, офис&nbsp;207<br />(Арт-Техноград)
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-20 items-start sm:items-end ml-6 lg:ml-12 xl:ml-[72px]">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col leading-[0.9] mb-2">
                      <p className="uppercase text-xl font-franklin leading-[1.1]">часы работы:</p>
                      <p className="uppercase text-xl font-franklin leading-[1.1]">будни дни</p>
                      <p className="uppercase text-xl font-franklin leading-[1.1]">10:00-19:00</p>
                      <p className="text-white uppercase opacity-30 font-franklin mb-0">сб,вс и праздники:</p>
                        <p className="text-white uppercase opacity-30 font-franklin">выходные дни</p>
                    </div>
                  </div>
                  <div className="text-xs font-franklin text-white/10 leading-tight whitespace-nowrap">
                    ВСЕ&nbsp;АВАТАРЫ<br />ЗАЩИЩЕНЫ<br />©{new Date().getFullYear()}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[2px] bg-white/10" />

            <div className="
  flex flex-wrap justify-center items-center gap-3 
  py-4 px-4
  sm:gap-4
  md:gap-5 md:px-6
  lg:grid lg:grid-flow-col lg:gap-[70px] lg:auto-cols-max lg:justify-center lg:items-center
">
  <a
    href="mailto:info@twin3d.ru"
    className="flex items-center gap-2 px-5 py-1 border border-white/20 rounded-[18px] font-franklin text-white/70 hover:text-white hover:bg-white/10 transition text-2xl"
  >
    INFO@TWIN3D.RU
  </a>

  {SOCIALS.map((soc) => (
    <a
      key={soc.name}
      href={soc.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-5 py-1 border border-white/20 rounded-[18px] font-franklin text-white/70 hover:text-white hover:bg-white/10 transition text-2xl"
    >
      <img src={soc.icon} alt={soc.name} className="w-5 h-5" />
      {soc.name}
    </a>
  ))}

  <a
    href="#"
    className="flex items-center gap-2 px-5 py-1 rounded-[18px] font-franklin text-[#222] font-bold text-xl"
  >
    <img
      src="/icons/sk-icon.png"
      alt="Skolkovo"
      className="h-10 w-30 min-w-[84px] min-h-[20px]"
    />
  </a>
</div>

            <div className="w-full h-[2px] bg-white/10" />

            {/* десктоп-marquee */}
            <div className="h-[15vw] relative overflow-hidden">
              <div
                ref={desktopMarqueeRef}
                className="flex whitespace-nowrap w-max absolute bottom-0 left-0"
                style={{
                  backgroundImage: 'linear-gradient(90deg,#C3C3C3,#999999)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '19vw',
                  fontWeight: 800,
                  fontFamily: 'druk, sans-serif',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  opacity: 0.16,
                  transform: 'translateY(20%)',
                }}
              >
                TWIN&nbsp;3D&nbsp;CGI&nbsp;PRODUCTION&nbsp;TWIN&nbsp;3D&nbsp;CGI&nbsp;PRODUCTION&nbsp;
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
