/* components/FooterWithMap.tsx */
'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

/* ─────────── data ─────────── */
const SOCIALS = [
  { icon: '/icons/tg-icon.svg', name: 'TELEGRAM', href: 'https://t.me/twin_3d' },
  { icon: '/icons/wa-icon.svg', name: 'WHATSAPP', href: 'https://api.whatsapp.com/send?phone=79067244645' },
  { icon: '/icons/bh-icon.svg', name: 'BEHANCE', href: 'https://behance.net/twin3dproduction' },
];

export default function FooterWithMap() {
  /* mobile бегущая строка */
  const mobileMarqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mobileMarqueeRef.current;
    if (!el) return;

    const w = el.scrollWidth / 2;              // Текст продублирован
    const tween = gsap.fromTo(
      el,
      { x: 0 },
      { x: -w, duration: 20, ease: 'linear', repeat: -1 }
    );

    return () => { tween.kill(); };
  }, []);

  return (
    <footer className="bg-[#141414] text-white px-4 md:px-[59px] pt-[80px] pb-[40px]">
      <div className="max-w-[1152px] mx-auto flex flex-col gap-[30px]">

        {/* =============== Mobile-секция (до 640 px) =============== */}
        <div className="sm:hidden flex flex-col gap-6">

          {/* адрес + часы */}
          <div className="grid grid-cols-3 gap-3">
            <Image src="/images/logocvet.webp" alt="Twin3d" width={120} height={24} />

            <div className="flex flex-col leading-[0.9]">
              <p className="font-franklin text-xl uppercase">Москва,</p>
              <p className="font-franklin text-xl uppercase">пр-т Мира</p>
              <p className="font-franklin text-xl uppercase">д.119 стр. 318</p>
              <p className="text-white/50 text-sm leading-[1.1]">
                2 этаж, офис 207<br />(Арт-Техноград)
              </p>
            </div>

            <div className="flex flex-col leading-[0.9]">
              <p className="font-franklin text-xl uppercase">Часы работы:</p>
              <p className="font-franklin text-xl uppercase">Будни дни</p>
              <p className="font-franklin text-xl uppercase">10:00-19:00</p>
              <p className="text-white/50 text-sm leading-[1.1]">
                Сб, Вс и праздники:<br />выходные
              </p>
            </div>
          </div>

          {/* соцсети */}
          <div className="grid grid-cols-3 gap-3">
            {['bh', 'tg', 'wa'].map((k) => {
              const soc = SOCIALS.find((s) => s.icon.includes(`${k}-icon`))!;
              return (
                <a
                  key={soc.name}
                  href={soc.href}
                  className="flex items-center gap-2 px-5 py-2 border border-white/20 rounded-[10.61px]
                             text-sm font-franklin text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  <img src={soc.icon} alt={soc.name} className="w-5 h-5" />
                  {soc.name}
                </a>
              );
            })}
          </div>

          {/* телефон / email */}
          <div className="flex gap-3 justify-center">
            <a href="tel:+74951253435" className="flex items-center gap-2 px-5 py-2 border border-white/20 rounded-[10.61px] text-sm font-franklin text-white/70 hover:text-white hover:bg-white/10 transition">
              +7 495 125-34-35
            </a>
            <a href="mailto:info@twin3d.ru" className="flex items-center gap-2 px-5 py-2 border border-white/20 rounded-[10.61px] text-sm font-franklin text-white/70 hover:text-white hover:bg-white/10 transition">
              INFO@TWIN3D.RU
            </a>
          </div>

          {/* карта */}
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=37.632983%2C55.834872&z=17&pt=37.632983,55.834872,pm2rdm"
            width="100%" height="495"
            className="w-full h-[495px] rounded-[24px] border-none"
            loading="lazy"
          />

          {/* реквизиты в рамке */}
          <div className="border border-white/25 rounded-[18px] font-standard p-5 space-y-3 text-[13px] leading-[1.1] text-white/80">
            <p className="uppercase font-franklin text-white text-[20px] leading-tighter">
              Реквизиты<br />ООО «ТВИН3Д»
            </p>

            <p className="leading-[1px]">Основной ОКВЭД: 62.09</p>
<p className="leading-[1px]">Виды ИТ-деятельности: 1.07, 22.01</p>
<p className="leading-[1px]">ОРН участника Сколково: 1124117</p>

            <div className="space-y-[2px] grid grid-cols-2">
              <div>
  <p>ИНН 9717084770</p>
  <p>КПП 771701001</p>
  <p>ОГРН 1197746473759</p>
              </div>
  <div className=''>
    <p>БИК 044525593</p>
    <p>К/С 30101810200000000593</p>
  </div>
</div>

            <p className=' leading-[1px]'>Юр. адрес: 129085, г. Москва, Пр-т Мира, д. 101с1, пом. 1, ком. 7, оф. 4</p>
            <p className=' leading-[1px]'>Факт. адрес: 129223, г. Москва, Пр-т Мира, д. 119с318, оф. 207</p>
            <p className=' leading-[1px]'>Р/С: 40702810801770000327 в АО «АЛЬФА-БАНК»</p>
          </div>

          {/* бейдж + бегущая строка */}
<div className="relative mt-1">

  {/* бейдж «Сколково» */}
  <div className="absolute bottom-0 right-2 z-20 flex items-center px-3 py-2
                  bg-black/50 backdrop-blur-sm border-t border-l border-r
                  border-[#848484] rounded-t-lg">
    <img src="/icons/sk-icon.png" alt="Skolkovo" className="h-7 w-auto" />
  </div>

  {/* бегущая строка — на всю ширину дисплея */}
  <div className="relative overflow-hidden h-[32vw] w-screen
                  left-1/2 -translate-x-1/2">
    <div
      ref={mobileMarqueeRef}
      className="flex whitespace-nowrap w-max absolute bottom-0 left-0"
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
        transform: 'translateY(20%)',
      }}
    >
      TWIN&nbsp;3D&nbsp;CGI&nbsp;PRODUCTION&nbsp;TWIN&nbsp;3D&nbsp;CGI&nbsp;PRODUCTION&nbsp;
    </div>
  </div>
</div>
        </div>

        {/* =============== Desktop-секция (оставлена без изменений) =============== */}

        {/* адрес + часы (desktop) */}
        <div className="hidden sm:flex justify-between items-start text-[20px] lg:text-[24px] leading-[100%] font-franklin uppercase">
          <div className="space-y-[2px] max-w-[55%]">
            <p>Москва, пр-т Мира д.119 стр. 318</p>
            <p className="opacity-70">2 этаж, офис 207 (Арт-Техноград)</p>
          </div>
          <div className="space-y-[2px] text-right opacity-70 shrink-0">
            <p>ПН – ПТ: 10:00 – 19:00</p>
            <p>СБ, ВС и праздники: выходные</p>
          </div>
        </div>

        {/* соцсети (desktop) */}
        <div className="hidden sm:grid grid-cols-5 gap-[12px] text-xl mt-[1px]">
          <a href="tel:+74951253435" className="w-full flex items-center justify-center gap-2 px-5 py-2 border border-white/20 rounded-[17.52px] font-franklin font-bold text-white/70 hover:text-white hover:bg-white/20 transition">
            +7 495 125-34-35
          </a>
          <a href="mailto:info@twin3d.ru" className="w-full flex items-center justify-center gap-2 px-5 py-2 border border-white/20 rounded-[17.52px] font-franklin font-bold text-white/70 hover:text-white hover:bg-white/20 transition">
            INFO@TWIN3D.RU
          </a>
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.href} className="w-full flex items-center justify-center gap-2 px-5 py-2 border border-white/20 rounded-[17.52px] font-franklin font-bold text-white/70 hover:text-white hover:bg-white/20 transition">
              <img src={s.icon} alt={s.name} className="w-5 h-5" />
              {s.name}
            </a>
          ))}
        </div>

        {/* карта для desktop такая же */}
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=37.632983%2C55.834872&z=17&pt=37.632983,55.834872,pm2rdm"
          width="100%" height="495"
          className="hidden sm:block w-full h-[495px] rounded-[24px] border-none mb-8"
          loading="lazy"
        />

        {/* реквизиты большой (desktop) */}
        <div className="hidden sm:block text-[24px] font-standard text-white/90 leading-[100%]">
          <p className="uppercase mb-8">
            Реквизиты<br />ООО «ТВИН3Д»
          </p>
          <div className="flex justify-between items-start flex-wrap gap-y-4">
            <div className="flex flex-col space-y-[4px] text-white/65 whitespace-nowrap">
              <p>ОСНОВНОЙ ОКВЭД: 62.09</p>
              <p>ВИДЫ ИТ-ДЕЯТЕЛЬНОСТИ: 1.07, 22.01</p>
              <p>ОРН УЧАСТНИКА СКОЛКОВО: 1124117</p>
            </div>
            <div className="flex flex-col space-y-[4px] text-white/65 whitespace-nowrap">
              <p>ИНН 9717084770</p>
              <p>КПП 771701001</p>
              <p>ОГРН 1197746473759</p>
            </div>
            <div className="flex flex-col space-y-[4px] text-white/65 whitespace-nowrap self-end">
              <p>БИК 044525593</p>
              <p>К/С: 30101810200000000593</p>
            </div>
          </div>
        </div>

        {/* адреса + логотип (desktop) */}
        <div className="hidden sm:flex justify-between items-start md:items-center mt-1">
          <div className="space-y-[4px] font-standard text-white/65 text-[24px] leading-[100%]">
            <p>ЮР. АДРЕС: 129085, г. МОСКВА, ПР-Т МИРА, Д.101С1, ПОМ.1, КОМ. 7, ОФ. 4</p>
            <p>ФАКТ. АДРЕС: 129223, г. МОСКВА, ПР-Т МИРА, Д.119С318, ОФ. 207</p>
            <p>Р/С: 40702810801770000327 в АО «АЛЬФА-БАНК»</p>
          </div>
          <Image
            src="/icons/sk-icon.png"
            alt="Skolkovo Участник"
            width={245.87}
            height={55.84}
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
