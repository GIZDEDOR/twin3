import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import OverlayWrapper from "@/components/OverlayWrapper"; // <-- добавь
import { PrismicPreview } from "@prismicio/next";
import { repositoryName, createClient } from '@/prismicio';
import type { Content } from '@prismicio/client';

export const metadata: Metadata = {
  title: "TWIN3D",
  description: "Делаем реальность цифровой",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  // Предположим, у вас в Prismic есть Custom Type 'settings', где лежит этот слайс
  const settings = await client.getSingle('extramenu');
  const headerSlice = settings.data.slices.find(
    (s): s is Content.HeaderOverlaySlice => s.slice_type === 'header_overlay'
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-druk antialiased">
          <Header headerOverlaySlice={headerSlice ?? null}/>
          {/*<OverlayWrapper>*/}{children}{/*</OverlayWrapper>*/}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
