'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useImagesLoaded } from '@/hooks/useImagesLoaded';
import { useViewportHeight } from '@/hooks/useViewportHeight';

gsap.registerPlugin(ScrollTrigger);

// Пути к аватарам и бейджам
const avatars = [
  '/girl.webp',
  '/ded.webp',
  '/redgirl.webp',
  '/oilman.webp',
  '/alvares.webp'
];
const badges = [
  { icon: '/scan.svg',   label: 'СКАНИРОВАНИЕ' },
  { icon: '/avatar.svg', label: '3D-АВАТАРЫ' },
  { icon: '/ai.svg',     label: 'НЕЙРОСЕТИ' },
];

// Настройки аватаров
const AVATAR_BASE_SIZE_DESKTOP = '25vw';
const AVATAR_BASE_SIZE_MOBILE  = '50vw';
const AVATAR_SCALE_DESKTOP     = 1.2;
const AVATAR_SCALE_MOBILE      = 1.2;

// Позиции аватаров
const avatarPositionsDesktop = [
  { left: '22vw', bottom: '0vh', z: 3 },
  { left: '37.5vw', bottom: '0vh', z: 4 },
  { left: '66vw', bottom: '0vh', z: 2 },
  { left: '79.5vw', bottom: '0vh', z: 1 },
  { left: '50vw', bottom: '0vh', z: 5 },
];
const avatarPositionsMobile = [
  { left: '25vw', bottom: '0vh', z: 2 },
  { left: '50vw', bottom: '0vh', z: 5 },
  { left: '81vw', bottom: '0vh', z: 3 },
];

// Тени
const shadowPositions = ['35vw', '50vw', '65vw'];

// Позиция заголовка
const textPositionDesktop = { left: '50vw', top: '10vh' };
const textPositionMobile  = { left: '50vw', top: '15vh' };

export default function MainRevealBlock() {
  useViewportHeight();

  const sectionRef      = useRef<HTMLElement>(null);
  const avatarRefs      = useRef<HTMLDivElement[]>([]);
  const badgeRefs       = useRef<HTMLDivElement[]>([]);
  const shadowRefs = useRef<HTMLImageElement[]>([]);
  const textRef         = useRef<HTMLDivElement>(null);
  const topShadowRef    = useRef<HTMLDivElement>(null);
  const bottomShadowRef = useRef<HTMLDivElement>(null);
  

  const isMobile    = useMediaQuery('(max-width:767px)', false);
  const imagesReady = useImagesLoaded('.avatar-image');

  

  const visibleAvatars = isMobile ? [avatars[1], avatars[4], avatars[2]] : avatars;
  const visiblePositions = isMobile ? avatarPositionsMobile : avatarPositionsDesktop;

  const showSpinner = !imagesReady;

  // Параметры под устройство
  const positions   = isMobile ? avatarPositionsMobile : avatarPositionsDesktop;
  const baseSize    = isMobile ? AVATAR_BASE_SIZE_MOBILE : AVATAR_BASE_SIZE_DESKTOP;
  const baseScale   = isMobile ? AVATAR_SCALE_MOBILE     : AVATAR_SCALE_DESKTOP;
  const textPos     = isMobile ? textPositionMobile      : textPositionDesktop;
  const appearOrder = isMobile ? [0, 1, 2] : [4, 1, 2, 0, 3];

  // Отступ над аватаром для текста
  const marginPx = -100;

  useEffect(() => {
    if (!imagesReady) return;
    if (
      !sectionRef.current ||
      !textRef.current ||
      !avatarRefs.current.every(Boolean) ||
      !badgeRefs.current.every(Boolean)
    ) return;

    const sectionEl = sectionRef.current!;
    const textEl    = textRef.current!;
    const avatarsEl = avatarRefs.current;


    gsap.set(textEl, { y: isMobile ? '10vh' : 0 }); // чтобы не прыгал

    

    // 2) Измеряем текст и аватары
    const textRect     = textEl.getBoundingClientRect();
    const avatarTops   = avatarsEl.map(el => el.getBoundingClientRect().top);
    const minAvatarTop = Math.min(...avatarTops);

    // 3) Вычисляем целевой y-офсет для текста
    const targetY  = minAvatarTop - textRect.bottom - marginPx;

    const sectionBox = sectionEl.getBoundingClientRect();
const textBox = textEl.getBoundingClientRect();
const relativeTop = textBox.top - sectionBox.top + 20; // +смещение вниз

shadowRefs.current.forEach((el) => {
  if (el) {
    el.style.top = `${relativeTop}px`;
  }
});
    // 4) Подготовка бейджей: на старте — под экраном
    badgeRefs.current.forEach(el => {
      gsap.set(el, { y: '100vh', opacity: 0 });
    });

    // 5) Собираем таймлайн
    const tl = gsap.timeline({
      scrollTrigger: {
  trigger: sectionEl,
  start:   isMobile ? 'top bottom' : 'top top',  // ⬅️ мобилка срабатывает раньше
  end:     isMobile ? '+=200%' : '+=200%',       // можно отрегулировать под нужную длину
  scrub:   true,
  pin:     !isMobile,
}
    });

    // 1) Нижняя тень
    if (isMobile) {
  gsap.set(bottomShadowRef.current, { opacity: 1 });
} else {
  tl.to(bottomShadowRef.current, { opacity: 1, duration: 0.6 }, 0);
}

    // 2) Появление аватаров
    if (!isMobile) {
  appearOrder.forEach((idx, i) => {
    tl.fromTo(
      avatarRefs.current[idx],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6 },
      i * 0.2
    );
  });
}

    // 3) Анимация текста
tl.addLabel('textStart', isMobile ? 0.05 : appearOrder.length * 0.2 + 0.4);

if (isMobile) {
  // 📱 Мобилка: ограничим выезд текста
  tl.fromTo(
    textEl,
    { y: '80vh', opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    'textStart'
  );

  // → вычисляем максимально допустимое смещение вверх
  const MAX_SHIFT = -60; // px – регулируй по вкусу
  const clampedY = Math.max(Math.min(targetY, 0), MAX_SHIFT);

  tl.to(
    textEl,
    { y: clampedY, duration: 1.2 },
    'textStart+=0.8'
  );
} else {
  // 💻 Десктоп: как было
  tl.fromTo(
    textEl,
    { y: '80vh', opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    'textStart'
  );
  const safeTargetY = Math.min(targetY, 0);
  tl.to(
    textEl,
    { y: safeTargetY, duration: 1.2 },
    'textStart+=0.8'
  );
}

    // 4) Верхняя тень
    tl.to(topShadowRef.current, { opacity: 1, duration: 0.6 }, 'textStart');

    // 5) Бейджи: 1) подъём на место, 2) пауза, 3) увод наверх
    tl.addLabel('badgesStart', 'textStart+=1.0');

    // фаза подъёма

    const badgeTargetY = isMobile
  ? ['2vh', '6vh', '4vh']   // 📱 мягкий bounce на мобилке
  : ['-10vh', '5vh', '-8vh']; // 💻 высокий bounce на десктопе


    badgeRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(
        el,
        { opacity: 0, y: 150 },
        {
          opacity: 1,
          y: badgeTargetY[i],
          duration: 0.6,
          ease: i === 2 ? 'power2.out' : 'back.out(1.7)',
        },
        `badgesStart+=${i * 0.3}`
      );
    });

    badgeRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.to(
        el,
        { y: '-150vh', duration: 1.9, ease: 'back.in(1.2)' },
        `badgesStart+=${i * 0.3 + 0.9}`
      );
    });

    

    // обновляем структуру ScrollTrigger
    setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [imagesReady, isMobile]);

  

  return (
  <section
    ref={sectionRef}
    className={`
      relative w-screen bg-dark text-white overflow-hidden
      ${isMobile ? 'h-[70vh]' : 'h-screen'}
    `}
  >
    {/* 🔆 Фоновая картинка */}
  <Image
    src="/images/backfonktomy.webp"
    alt="Background"
    fill
    sizes="100vw"
    className="{absolute inset-0 z-0 object-cover ${
      mobile ? 'object-[center_30%]' : ''
    }}"
    priority
  />
    {/* Показываем спиннер, если не готово */}
    {showSpinner ? (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#141414]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
      </div>
    ) : (
      <>
      {/* Аватары */}
      <div className="relative w-full h-full">
        {visibleAvatars.map((src, i) => (
  <div
    key={i}
    ref={el => {(avatarRefs.current[i] = el!)}}
    className="absolute"
    style={{
      left:      visiblePositions[i].left,
      bottom:    visiblePositions[i].bottom,
      width:     baseSize,
      height:    baseSize,
      zIndex:    visiblePositions[i].z,
      transform: `translateX(-50%) scale(${baseScale})`,
      transformOrigin: 'bottom center',
    }}
  >
    <Image
      src={src}
      width={200}
      height={200}
      className="avatar-image w-full h-full object-cover object-bottom"
      alt=""
    />
  </div>
))}
      </div>

      {/* Заголовок */}
{imagesReady && (
  <div
    ref={textRef}
    className={`
      absolute left-1/2 -translate-x-1/2
      text-center font-druk font-bold uppercase
      ${isMobile
        ? 'text-[clamp(4rem,26vw,18rem)] leading-[clamp(3.5rem,23vw,17rem)]'
        : 'text-[clamp(3rem,16vw,18rem)] leading-[clamp(2.5rem,15vw,15rem)]'}
      text-transparent bg-clip-text
      bg-gradient-to-br from-[#C3C3C3] to-[#808080]
    `}
    style={{ left: textPos.left, top: textPos.top }}
  >
    <div>КРЕАТИВНЫЙ</div>
    <div>ПРОДАКШН</div>
    <div>С АВАТАРАМИ</div>
  </div>
)}

      {/* Верхние тени */}
<div
  ref={topShadowRef}
  className="absolute inset-x-0 opacity-0 pointer-events-none"
  style={{ 
  top: isMobile ? '22vh' : textPos.top, 
  height: isMobile ? '100vh' : '90vh',
  zIndex: 1,
}}
>
  {shadowPositions.map((pos, idx) => (
    <Image
      key={idx}
      src="/images/shadow.webp"
      alt=""
      // next/image: ширина задаётся через sizes + fill
      fill
      sizes={isMobile ? '50vw' : '30vw'}
      style={{
        objectFit: 'contain',
        left: pos,
        transform: 'translateX(-50%)',
      }}
      className="absolute"
    />
  ))}
</div>

      {/* Нижняя тень */}
      <div
        ref={bottomShadowRef}
        className="absolute bottom-0 left-0 w-full opacity-0 pointer-events-none z-10"
      >
        <Image
          src="/images/shadow2.webp"
          width={2100}
          height={800}
          alt=""
          className="translate-y-[62%] object-cover"
        />
      </div>

      
      </>
    )}
    </section>
  );
}
