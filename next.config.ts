// next.config.ts или next.config.js

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // вот здесь — раздел для картинок:
  images: {
    domains: [
      'images.prismic.io',     // разрешаем брать src из Prismic
      // при необходимости можно добавить:
      // 'images.unsplash.com',
      // 'cdn.example.com',
    ],
  },

  // остальные ваши опции...
};

export default nextConfig;
