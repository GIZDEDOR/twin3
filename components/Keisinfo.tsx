'use client';

import Image from 'next/image';

const technologies = [
  {
    id: '01',
    title: 'ДВА УНИКАЛЬНЫХ\nФОТОГРАММЕТРИЧЕСКИХ\n3D-СКАНЕРА (200 DSLR)',
    description:
      'Обеспечивают высокоточное 3D-сканирование\nмимики и в полный рост за 1 сек. Оптимальное\nрешение для создания цифровых 3D-двойников\nактеров, селебрити и массовки для кино, игр,\nрекламных роликов и спец проектов.',
    image: '/images/skaner.webp',
  },
  {
    id: '02',
    title: 'СОБСТВЕННАЯ СИСТЕМА\nУПРАВЛЕНИЯ СКАНЕРОМ',
    description:
      'Обеспечивает полную синхронизацию камер и света,\nавтоматизирует настройку камер под разные режимы\nсканирования и стабильную работу 3D-сканеров при\nинтенсивных 3D-сессиях.',
    image: '/images/Motherboard.webp',
  },
  {
    id: '03',
    title: 'СОБСТВЕННЫЙ АЛГОРИТМ\nАВТОМАТИЧЕСКОЙ СБОРКИ\n 3D-АВАТАРОВ',
    description:
      'Автоматизирует постобработку сканов и объединение\nизображений, оптимизируя создание финальной\n3D-модели с учетом качества кадров и глубины.',
    image: '/images/DDOS.webp',
  },
];

export default function TechFeaturesBlock() {
  return (
    <section className="bg-[#141414] text-white px-4 md:px-8 py-12 md:py-20 max-w-[1213px] mx-auto">
      <div className="text-center text-[#999999] text-sm font-proto mb-4">
        [OUR TECHNOLOGIES] <span className="opacity-40">[1-3]</span>
      </div>

      {/* Line separator below title */}
      <div className="h-[1px] w-full bg-[#F0F0F0] opacity-30 mb-10" />

      <div className="flex flex-col gap-6 md:gap-8">
        {technologies.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row bg-[#222222]/40 border border-[#333] rounded-[24px] overflow-hidden transform transition duration-300 hover:scale-[1.05]"
          >
            {/* Left Text */}
            <div className="flex-1 px-6 py-6 md:px-10 md:py-10 flex flex-col justify-between">
              <div>
                <h3 className="font-franklin font-bold text-[20px] md:text-[28px] leading-[1.1] uppercase bg-gradient-to-r from-[#F0F0F0] to-[#757575] bg-clip-text text-transparent whitespace-pre-line">
                  {item.title}
                </h3>
                <p className="mt-2 text-[#8F8F8F] font-standard text-[15px] md:text-[16px] leading-[1.1] whitespace-pre-line">
                  {item.description}
                </p>
              </div>
              <div className="absolute top-4 right-4 sm:hidden w-[40px] h-[40px] rounded-full border border-[#757575] flex items-center justify-center z-10">
  <span className="font-proto text-white text-[18px] opacity-60">{item.id}</span>
</div>
              <div className="mt-6 w-[40px] h-[40px] rounded-full border border-[#757575] hidden sm:flex items-center justify-center">
                <span className="font-proto text-white text-[18px] opacity-60">{item.id}</span>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex items-center justify-center p-[26px] md:p-[28px]">
              <div className="w-[460px] h-[280px] relative overflow-hidden rounded-[20px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-[20px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
