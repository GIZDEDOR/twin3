// app/blog/page.tsx  (или pages/blog.tsx в pages-router)
import { createClient } from '@/prismicio';      // ваш фабричный клиент
import { SliceZone }      from '@prismicio/react';
import { components }     from '@/slices';        // автоматически сгенерированный map
import Footer             from '@/components/Footer';

export default async function BlogPage() {
  const client = createClient();
  // если у вас Single-type – getSingle, иначе getByUID/get()
  const doc = await client.getSingle('blog');

  return (
    <>
      <SliceZone slices={doc.data.slices} components={components} />
      <Footer />
    </>
  );
}