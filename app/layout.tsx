import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import OverlayWrapper from "@/components/OverlayWrapper"; // <-- добавь


export const metadata: Metadata = {
  title: "TWIN3D",
  description: "Делаем реальность цифровой",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-druk antialiased">
          <Header />
          {/*<OverlayWrapper>*/}{children}{/*</OverlayWrapper>*/}
      </body>
    </html>
  );
}
