'use client';

import { useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Link from 'next/link'
import { GradientBorderPulse } from '@/components/ui/GradientBorder';
import { BackgroundGradient } from './ui/background-gradient';

const slidesData: Record<string, string[]> = {
  scan: [
    '/cards/utkin.webp',
    '/cards/krosovok.webp',
    '/cards/yota.webp',
  ],
  avatars: [
    '/cards/oilman.webp',
    '/cards/robot.webp',
    '/cards/wylsa.webp',
  ],
  cg: [
    '/cards/bol.webp',
    '/cards/glaza.webp',
    '/cards/shtuchka.webp',
  ],
  'ai-avatars': [
    '/cards/sberovsky.webp',
    '/cards/admiral.webp',
    '/cards/yoda.webp',
  ],
  'ai-cg': [
    '/cards/x5.webp',
    '/cards/luma.webp',
    '/cards/king.webp',
  ],
};

const borderGradients: Record<string, string[]> = {
  scan: [
    // Utkin
    'from-[#983E13] via-[#65290D] to-[#A24119]',
    // Кроссовок
    'from-[#9FC00C] via-[#75BD09] to-[#A0C10D]',
    // Yota — новый!
    'from-[#42a6ff] via-[#69D7FF] to-[#00e0ff]',
  ],
  avatars: [
    // Oilman — новый!
    'from-[#fff599] via-[#FFBA15] to-[#be9000]',
    // Robot (Пинк робот)
    'from-[#F689FD] via-[#D358D7] to-[#B127B1]',
    // Wylsa (Вилсаком) — новый!
    'from-[#ff9650] via-[#FF6C51] to-[#FF2151]',
  ],
  cg: [
    // Bol (МТС рты)
    'from-[#E73C20] via-[#C03721] to-[#E27665]',
    // Glaza (Глазики) — новый!
    'from-[#3459FF] via-[#4E6CF1] to-[#677EE4]',
    // Shtuchka (нео фабрик) — новый!
    'from-[#86BAE4] via-[#8FBCE0] to-[#98BDDB]',
  ],
  'ai-avatars': [
    // Sberovsky (Станислав) — новый!
    'from-[#82eefd] via-[#57C2E6] to-[#11689c]',
    // Admiral (Кэп Феско) — новый!
    'from-[#fffac1] via-[#c9bc77] to-[#b39726]',
    // Yoda (Грогу)
    'from-[#33A488] via-[#5CC6AB] to-[#86E7CF]',
  ],
  'ai-cg': [
    // X5 (АФК Геймер)
    'from-[#0CD518] via-[#42D94B] to-[#78DD7E]',
    // Luma (Люма-Инди)
    'from-[#6A9BFF] via-[#557CCC] to-[#405D99]',
    // King (Король Кинг)
    'from-[#CA4F41] via-[#973B30] to-[#642720]',
  ],
};

// 1️⃣  Расширяем описание категорий
const categoryInfo: Record<
  string,
  { tag: string; about?: string; desc: string }
> = {
  scan: {
    tag: '[3D-SCAN]',
    about: '[ABOUT]',
    desc: `СОЗДАЁМ ВЫСОКОДЕТАЛИЗИРОВАННЫЕ\n 3D ДВОЙНИКИ ЛЮДЕЙ И ОБЪЕКТОВ\nС ПОМОЩЬЮ СОБСТВЕННЫХ 3D-СКАНЕРОВ.`,
  },
  avatars: {
    tag: '[CG-AVATARS]',
    about: '[ABOUT]',
    desc: 'Создаём цифровых героев и маскотов\n под ключ: от концепт-арта до детальной\n проработки персонажа в 3D под продакшн.',
  },
  cg: {
    tag: '[CG-PRODUCTION]',
    about: '[ABOUT]',
    desc: 'Полный цикл производства рекламных\n креативов с персонажем для кампаний\n 360°: от идеи и сценариев до продакшна\n видеоматериалов любой сложности',
  },
  'ai-avatars': {
    tag: '[AI-AVATARS]',
    about: '[ABOUT]',
    desc: 'Интегрируем фотореалистичные\n 3D-аватары людей в диалоговые\n ассистенты и чат-боты.',
  },
  'ai-cg': {
    tag: '[AI-PRODUCTION]',
    about: '[ABOUT]',
    desc: 'Используем генеративные\n нейросети для производства\n рекламных креативов в сжатые сроки.',
  },
};




const categories = [
  { key: 'scan', label: '3D-СКАНИРОВАНИЕ' },
  { key: 'avatars', label: 'АВАТАРЫ' },
  { key: 'cg', label: 'CG-ПРОДАКШН' },
  { key: 'ai-avatars', label: 'ИИ-АВАТАРЫ' },
  { key: 'ai-cg', label: 'ИИ-ПРОДАКШН' },
];


export default function CategorySlider() {
  const [currentCategory, setCurrentCategory] = useState<string>('scan');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stripeRef = useRef<HTMLDivElement>(null);
  const { tag, about, desc } = categoryInfo[currentCategory];

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const slides = slidesData[currentCategory];
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
  };

  useEffect(() => {
    setCurrentIndex(0);
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentCategory]);

  const splitDescIntoThreeLines = (text: string): string[] => {
  const words = text.split(' ');
  const chunkSize = Math.ceil(words.length / 3);
  return [
    words.slice(0, chunkSize).join(' '),
    words.slice(chunkSize, chunkSize * 2).join(' '),
    words.slice(chunkSize * 2).join(' '),
  ];
};

const lines = splitDescIntoThreeLines(desc);

function gradToHex(grad: string) {
  // достаёт первый hex из "from-[#42a6ff] via-[#69D7FF] to-[#00e0ff]"
  const hex = grad.match(/#([a-fA-F0-9]{6})/);
  return hex ? hex[0] : "#ffffff";
}
const isTouching = useRef(false)
const touchStartX = useRef(0)
  const touchEndX   = useRef(0)
  const SWIPE_THRESHOLD = 50  // минимальная дистанция для срабатывания

  
  const handleTouchStart = (e: React.TouchEvent) => {
  isTouching.current = true
  if (intervalRef.current) {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }
  touchStartX.current = e.touches[0].clientX
}
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  
  const handleTouchEnd = () => {
    const dx = touchStartX.current - touchEndX.current
    if (dx > SWIPE_THRESHOLD) {
      // свайп влево → следующая карточка
      setCurrentIndex((i) => (i + 1) % slidesData[currentCategory].length)
    } else if (dx < -SWIPE_THRESHOLD) {
      // свайп вправо → предыдущая
      setCurrentIndex((i) =>
        (i - 1 + slidesData[currentCategory].length) %
        slidesData[currentCategory].length
      )
    }
    setTimeout(() => {
    if (!isTouching.current && !intervalRef.current) {
      startAutoSlide()
    }
  }, 1500)
  
  }


  return (
    <div className="z-0 flex flex-col items-center bg-[#141414] text-white overflow-hidden relative">
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#1FA2FF] to-[#1ADBFC] text-black text-[26px] sm:text-[22px] md:text-[30px] h-[45px] sm:h-[55px] md:h-[55px] flex items-center whitespace-nowrap">
  <div className="animate-marquee flex items-center gap-0 px-[20px]">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="flex items-center gap-[clamp(4px,2vw,10px)] px-1 min-w-fit">
        <div className="flex items-center gap-2">
          <Image
  src="/mini-man.svg"
  alt="icon"
  width={36}
  height={36}
  className="w-[36px] h-[36px] sm:w-[28px] sm:h-[28px] md:w-[35px] md:h-[35px]"
/>
          <span className='font-fradman'>НАШИ УСЛУГИ</span>
        </div>
        <div className="flex items-center gap-2">
          <Image
  src="/mini-man.svg"
  alt="icon"
  width={36}
  height={36}
  className="w-[36px] h-[36px] sm:w-[28px] sm:h-[28px] md:w-[35px] md:h-[35px]"
/>
          <span className='font-franklin'>TWIN 3D</span>
        </div>
      </div>
    ))}
  </div>
</div>

      <div className="flex flex-wrap justify-center sm:justify-between gap-2 sm:gap-3 mb-6 w-full max-w-[1000px] pt-6 sm:pt-10 font-franklin font-bold">
  {categories.map((cat) => (
    <button
      key={cat.key}
      className={`px-4 py-2 rounded-[12px] text-sm sm:text-2xl transition-colors border ${
        currentCategory === cat.key
          ? 'bg-gradient-to-r from-[#1FA2FF] to-[#1ADBFC] text-black border-none'
          : 'bg-[#141414] text-[#444444] border-[#444444]'
      }`}
      onClick={() => setCurrentCategory(cat.key)}
    >
      {cat.label}
    </button>
  ))}
</div>

      {/* ↓ динамическое описание выбранной категории ↓ */}
<div className="flex flex-col items-center text-[#B3B3B3] text-center uppercase font-standard tracking-wider mb-10">
  <div className="text-sm mb-1">
    <span className="text-[#939393] font-proto">{tag}</span>{' '}
    {about && (
      <span className="text-[#939393] font-proto opacity-55">{about}</span>
    )}
  </div>

  <div className="text-lg leading-snug max-w-[900px] bg-gradient-to-r from-[#C3C3C3] to-[#999999] bg-clip-text text-transparent">
  {desc.split('\n').map((line, i) => (
    <p key={i}>{line}</p>
  ))}
</div>
</div>


    <div
        className="relative w-full max-w-[1000px] h-[520px] overflow-visible pointer-events-auto"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
      <div className="relative w-full max-w-[1000px] h-[520px] overflow-visible pointer-events-none">
        <div className="relative h-full flex items-center justify-center pointer-events-auto">
          {slidesData[currentCategory].map((src, idx) => {
  const offset = idx - currentIndex;
  let posClasses = 'absolute top-0 transition-transform duration-700 ease-in-out opacity-0 w-[60%] h-full';

  if (offset === 0) {
    posClasses += ' translate-x-0 scale-100 opacity-100 z-30';
  } else if (
    offset === -1 ||
    (currentIndex === 0 && idx === slidesData[currentCategory].length - 1)
  ) {
    posClasses += ' -translate-x-[70%] scale-75 opacity-60 z-20 blur-md';
  } else if (
    offset === 1 ||
    (currentIndex === slidesData[currentCategory].length - 1 && idx === 0)
  ) {
    posClasses += ' translate-x-[70%] scale-75 opacity-60 z-20 blur-md';
  } else {
    posClasses += ' hidden';
  }

            const grad = borderGradients[currentCategory][idx];
  return (
    <Link
      key={idx}
      href="/projects"
      className={`block ${posClasses}`}    // ← здесь всё позиционирование
    >
    
      <div className="w-full h-full flex items-center justify-center">
        {/*<div
          className={`
            rounded-3xl overflow-hidden
            p-[3px]
            bg-gradient-to-r ${grad}
            bg-[length:200%_100%]
            animate-gradient
            pointer-events-none
          `}
        >
          <Image
            src={src}
            alt={`Slide ${idx}`}
            width={300}
            height={400}
            className="block w-full h-auto"
          />
        </div>*/}
        <div className="relative aspect-[3/4] w-[300px]">
  <Image
    src={src}
    alt={`Slide ${idx}`}
    fill
    className="object-contain rounded-3xl"
  />
</div>
      </div>
    </Link>
  );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
