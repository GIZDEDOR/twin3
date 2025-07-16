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

  // добавляем игнорирование ошибок линтера при сборке
  eslint: {
    ignoreDuringBuilds: true,
  },

  // (опционально) игнорировать TypeScript‑ошибки при сборке
  typescript: {
    ignoreBuildErrors: true,
  },

  productionBrowserSourceMaps: true,

  // остальные ваши опции...
};

export default nextConfig;
