import ProjectsClient from '@/components/projects/ProjectsClient'
import Footer from '@/components/Footer'
import { createClient } from '@/prismicio';

export default async function ProjectsPage() {
  const client = createClient();
  const page = await client.getSingle('projects');
  const slices = page.data.slices;

  return (
    <>
      <ProjectsClient slices={slices} />
      <Footer />
    </>
  );
}
