import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Проекты: CGI, ИИ-продакшн и цифровые двойники | Twin3D',
  description: 'Кейсы Twin3D: рекламные ролики, 3D-персонажи, цифровые двойники и сканирование для брендов и кино.',
  alternates: { canonical: 'https://twin3d.ru/projects' },
};

export default function ProjectsPage() {
  return null; // The persistent layout renders the existing Prismic catalogue.
}
