'use client';

import React from 'react';
import { SliceComponentProps } from '@prismicio/react';
import type { TeamSliceSlice as SliceType } from '@/prismicio-types';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';
// (для навигации по желанию можно оставить 'swiper/css/navigation')

export type TeamSliceProps = SliceComponentProps<SliceType>;

const TeamSlice: React.FC<TeamSliceProps> = ({ slice: { primary } }) => {
  const { title, members } = primary;

  return (
    <section className="py-16 bg-dark text-white overflow-hidden">
      {/* Заголовок */}
      {title && (
        <h2 className="mb-4 text-center font-proto text-sm uppercase opacity-60">
          [{title}]
        </h2>
      )}

      {/* Тонкая полоска */}
      <div className="mx-auto mb-8 w-24 border-t border-[#626262]" />

      {/* контейнер-растягиватель на всю ширину экрана */}
      <div
        className="relative w-screen -ml-[50vw] -mr-[50vw] overflow-visible"
        style={{ perspective: 1000 }}
      >
        <Swiper
          modules={[FreeMode, Mousewheel, Autoplay]}
          spaceBetween={32}
          freeMode
          mousewheel={{ forceToAxis: true }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          loop
          grabCursor
          className="!px-0"
          wrapperClass="!px-0"
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          breakpoints={{
            320:  { slidesPerView: 2.2 },
            640:  { slidesPerView: 3.2 },
            1024: { slidesPerView: 5   },
          }}
        >
          {members.map((member, idx) => (
            <SwiperSlide
              key={idx}
              className="flex shrink-0 overflow-visible"
            >
              <div className="w-[200px] mx-auto overflow-visible">
                <div
                  className="
                    min-h-[400px] bg-[#1A1A1A] border border-[#626262]
                    rounded-[20px] px-4 pt-4 pb-6 flex flex-col justify-between
                    transform-gpu transition-transform duration-300 will-change-transform
                    hover:z-10
                    relative
                  "
                >
                  {/* Фото */}
                  {member.photo?.url && (
                    <div className="w-[160px] h-[160px] rounded-full overflow-hidden border border-[#626262] mx-auto">
                      <Image
                        src={member.photo.url}
                        alt={member.name || ''}
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}

                  {/* Имя */}
                  <div className="mt-4 h-[70px] flex items-center justify-center">
                    <h3
                      className="
                        text-2xl font-franklin font-extrabold uppercase
                        text-center leading-tight
                        bg-gradient-to-r from-[#f0f0f0] to-[#757575]
                        bg-clip-text 
                      "
                    >
                      {(member.name || '').split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </h3>
                  </div>

                  {/* Роль */}
                  <div className="mt-2 px-2 h-[48px] flex items-center justify-center text-center">
                    <p className="
                      text-[5px] sm:text-2xl text-[#8F8F8F] font-standard leading-[1.1]
                      whitespace-pre-line line-clamp-2 overflow-hidden
                    ">
                      {member.role ?? ''}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSlice;
