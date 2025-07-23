

// Принудительно SSR и без кэша
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import ProjectsClient from '@/components/projects/ProjectsClient';
import Footer from '@/components/Footer';
import { createClient } from '@/prismicio';

export default async function ProjectsPage() {
  // Просто создаём клиент без previewData
  const client = createClient();

  // Берём страницу слайсов
  const page = await client.getSingle('projects');
  const slices = page.data.slices;


  return (
    <>
      <ProjectsClient slices={slices} />
      <Footer />
    </>
  );
}
