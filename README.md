This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
twin3
├─ app
│  ├─ about
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ exit-preview
│  │  │  └─ route.ts
│  │  ├─ preview
│  │  │  └─ route.ts
│  │  ├─ revalidate
│  │  │  └─ route.ts
│  │  └─ video
│  │     └─ [...slug]
│  │        └─ route.ts
│  ├─ blog
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ head.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ projects
│  │  └─ page.tsx
│  ├─ slice-simulator
│  │  └─ page.tsx
│  └─ styles
│     └─ fade.css
├─ components
│  ├─ BlogStart.tsx
│  ├─ CaseFilters.tsx
│  ├─ CaseGrid.tsx
│  ├─ CategorySlider.tsx
│  ├─ CityTime.tsx
│  ├─ Footer.tsx
│  ├─ Footer2.tsx
│  ├─ Footermain.tsx
│  ├─ Header.tsx
│  ├─ HeaderOverlayHARD.tsx
│  ├─ Hero.tsx
│  ├─ Keisinfo.tsx
│  ├─ LogoMarquee.tsx
│  ├─ MainReval2.tsx
│  ├─ MainRevealBlock.tsx
│  ├─ NewsGrid.tsx
│  ├─ NewsModal.tsx
│  ├─ OverlayWrapper.tsx
│  ├─ projects
│  │  └─ ProjectsClient.tsx
│  ├─ Showreel.tsx
│  ├─ SlicesClient.tsx
│  ├─ StatsGrid.tsx
│  ├─ StatsGrid2.tsx
│  ├─ ui
│  │  ├─ Arrowicon.tsx
│  │  ├─ background-gradient.tsx
│  │  ├─ GlareCard.tsx
│  │  ├─ GradientBorder.tsx
│  │  ├─ MagicButton.tsx
│  │  ├─ Spotlight.tsx
│  │  └─ TextGenerateEffect.tsx
│  ├─ VhSetter.tsx
│  └─ ViewCanvas.tsx
├─ customtypes
│  ├─ about
│  │  └─ index.json
│  ├─ blog
│  │  └─ index.json
│  ├─ extramenu
│  │  └─ index.json
│  ├─ projects
│  │  └─ index.json
│  └─ welcome
│     └─ index.json
├─ data
│  └─ case.ts
├─ declarations.d.ts
├─ eslint.config.mjs
├─ hooks
│  ├─ useFadeChildrenOnScroll.ts
│  ├─ useFadeInOnScroll.ts
│  ├─ useImagesLoaded.ts
│  ├─ useLockBodyScroll.ts
│  ├─ useMediaQuery.ts
│  └─ useViewportHeight.ts
├─ lib
│  ├─ blogData.ts
│  └─ utils.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ postcss.config.mjs
├─ prismicio-types.d.ts
├─ prismicio.ts
├─ public
│  ├─ ai.svg
│  ├─ alvares.webp
│  ├─ avatar.svg
│  ├─ cards
│  │  ├─ admiral.webp
│  │  ├─ bol.webp
│  │  ├─ glaza.webp
│  │  ├─ king.webp
│  │  ├─ krosovok.webp
│  │  ├─ luma.webp
│  │  ├─ oilman.webp
│  │  ├─ robot.webp
│  │  ├─ sberovsky.webp
│  │  ├─ shtuchka.webp
│  │  ├─ utkin.webp
│  │  ├─ wylsa.webp
│  │  ├─ x5.webp
│  │  ├─ yoda.webp
│  │  └─ yota.webp
│  ├─ ded.webp
│  ├─ desktop_pc
│  │  ├─ license.txt
│  │  ├─ scene.bin
│  │  ├─ scene.gltf
│  │  └─ textures
│  │     ├─ Material.002_baseColor.png
│  │     ├─ Material.023_baseColor.jpeg
│  │     ├─ Material.024_baseColor.jpeg
│  │     ├─ Material.074_0_baseColor.png
│  │     ├─ Material.074_10_baseColor.jpeg
│  │     ├─ Material.074_11_baseColor.png
│  │     ├─ Material.074_12_baseColor.jpeg
│  │     ├─ Material.074_13_baseColor.png
│  │     ├─ Material.074_14_baseColor.png
│  │     ├─ Material.074_15_baseColor.png
│  │     ├─ Material.074_16_baseColor.png
│  │     ├─ Material.074_17_baseColor.png
│  │     ├─ Material.074_18_baseColor.png
│  │     ├─ Material.074_18_emissive.png
│  │     ├─ Material.074_19_baseColor.png
│  │     ├─ Material.074_1_baseColor.jpeg
│  │     ├─ Material.074_20_baseColor.png
│  │     ├─ Material.074_21_baseColor.png
│  │     ├─ Material.074_22_baseColor.png
│  │     ├─ Material.074_23_baseColor.png
│  │     ├─ Material.074_24_baseColor.png
│  │     ├─ Material.074_24_emissive.png
│  │     ├─ Material.074_25_baseColor.jpeg
│  │     ├─ Material.074_26_baseColor.png
│  │     ├─ Material.074_27_baseColor.png
│  │     ├─ Material.074_27_emissive.png
│  │     ├─ Material.074_28_baseColor.png
│  │     ├─ Material.074_29_baseColor.png
│  │     ├─ Material.074_2_baseColor.jpeg
│  │     ├─ Material.074_30_baseColor.png
│  │     ├─ Material.074_31_baseColor.png
│  │     ├─ Material.074_32_baseColor.jpeg
│  │     ├─ Material.074_33_baseColor.png
│  │     ├─ Material.074_34_baseColor.jpeg
│  │     ├─ Material.074_35_baseColor.png
│  │     ├─ Material.074_36_baseColor.jpeg
│  │     ├─ Material.074_39_baseColor.jpeg
│  │     ├─ Material.074_3_baseColor.png
│  │     ├─ Material.074_40_baseColor.png
│  │     ├─ Material.074_4_baseColor.png
│  │     ├─ Material.074_4_emissive.png
│  │     ├─ Material.074_5_baseColor.png
│  │     ├─ Material.074_6_baseColor.png
│  │     ├─ Material.074_7_baseColor.png
│  │     ├─ Material.074_8_baseColor.png
│  │     ├─ Material.074_9_baseColor.png
│  │     ├─ Material.074_9_emissive.png
│  │     ├─ Material.074_baseColor.png
│  │     ├─ Material_baseColor.jpeg
│  │     ├─ Material_metallicRoughness.png
│  │     └─ Tasten_2_baseColor.jpeg
│  ├─ file.svg
│  ├─ fonts
│  │  ├─ Druk Bold Desktop-400-normal-0.otf
│  │  ├─ Druk Bold Desktop-700-normal-0.otf
│  │  ├─ DrukCyr-700-normal-0.ttf
│  │  ├─ FRADMCN-700-normal-0.ttf
│  │  ├─ FRADMCN-med-500-normal-1.ttf
│  │  ├─ FRAMDCN(cond)-400-normal-1.ttf
│  │  ├─ Franklin Gothic Medium Cond.TTF
│  │  ├─ franklin-gothic-book.ttf
│  │  ├─ ProtoMono-Light.ttf
│  │  ├─ RG StandardMedium-700-normal-0.ttf
│  │  └─ RG-StandardBook.ttf
│  ├─ girl.webp
│  ├─ girl_with_glasses
│  │  └─ old_face_-_caricature.glb
│  ├─ globe.svg
│  ├─ icons
│  │  ├─ amazingred.png
│  │  ├─ amazingred1.png
│  │  ├─ amazingred2.png
│  │  ├─ back.svg
│  │  ├─ backiconmenu.svg
│  │  ├─ betboom.png
│  │  ├─ bh-icon.svg
│  │  ├─ citymobil.png
│  │  ├─ close-menu_150549.svg
│  │  ├─ coolcola-icon.png
│  │  ├─ coolcola-icon1.svg
│  │  ├─ dino.png
│  │  ├─ fesco.png
│  │  ├─ Frame 1321318521.svg
│  │  ├─ henesy.png
│  │  ├─ kret.png
│  │  ├─ planet.svg
│  │  ├─ rusargo.png
│  │  ├─ rzd.png
│  │  ├─ sber.png
│  │  ├─ showreel2.svg
│  │  ├─ showreel2.webp
│  │  ├─ sk-icon.png
│  │  ├─ t2.png
│  │  ├─ tg-icon.svg
│  │  ├─ twin3d.png
│  │  ├─ Variant17.svg
│  │  ├─ vkthai.png
│  │  ├─ vkthai1.svg
│  │  ├─ wa-icon.svg
│  │  ├─ x5.png
│  │  ├─ yandex.png
│  │  └─ yota.png
│  ├─ images
│  │  ├─ 100LET.webp
│  │  ├─ 1ded.webp
│  │  ├─ 21321im.webp
│  │  ├─ alvares.webp
│  │  ├─ amazingred.svg
│  │  ├─ amazingred.webp
│  │  ├─ award-1.webp
│  │  ├─ award-2.webp
│  │  ├─ award-3.webp
│  │  ├─ award-4.webp
│  │  ├─ award-5.webp
│  │  ├─ award-6.webp
│  │  ├─ award-7.webp
│  │  ├─ award-8.webp
│  │  ├─ backfonktomy.webp
│  │  ├─ backifon.webp
│  │  ├─ betboom.webp
│  │  ├─ bg-projects.webp
│  │  ├─ bg-projects1.webp
│  │  ├─ bg-projects2.webp
│  │  ├─ capitan.webp
│  │  ├─ citymobil.webp
│  │  ├─ david.webp
│  │  ├─ DDOS.webp
│  │  ├─ ded3webp.webp
│  │  ├─ deddenga.webp
│  │  ├─ dedsdengami.webp
│  │  ├─ dedsdengami2.webp
│  │  ├─ dino.webp
│  │  ├─ dino2.svg
│  │  ├─ FIREHOUSE.png
│  │  ├─ girlcase1png.webp
│  │  ├─ gollum.png
│  │  ├─ gollum.webp
│  │  ├─ gollum2.webp
│  │  ├─ grom.webp
│  │  ├─ Group2087329657.png
│  │  ├─ image100.webp
│  │  ├─ image70.svg
│  │  ├─ image77.webp
│  │  ├─ kret.webp
│  │  ├─ kruzhok.png
│  │  ├─ logo-header.png
│  │  ├─ logocvet.webp
│  │  ├─ logosmob5.svg
│  │  ├─ logosmob55.svg
│  │  ├─ logosmobred.svg
│  │  ├─ logosmobyota.svg
│  │  ├─ logo_Twin3d-02.png
│  │  ├─ master.webp
│  │  ├─ maxsber.webp
│  │  ├─ monti.webp
│  │  ├─ Motherboard.webp
│  │  ├─ news.png
│  │  ├─ news2).webp
│  │  ├─ news3.webp
│  │  ├─ news4.webp
│  │  ├─ oilman.webp
│  │  ├─ posterrzhd.webp
│  │  ├─ redicon.png
│  │  ├─ redicon.svg
│  │  ├─ red_353562.svg
│  │  ├─ rzhd.webp
│  │  ├─ shadow.webp
│  │  ├─ shadow2.webp
│  │  ├─ skaner.webp
│  │  ├─ souz.webp
│  │  ├─ stas.webp
│  │  ├─ Strelka1.png
│  │  ├─ Strelka2r.png
│  │  ├─ t2.webp
│  │  ├─ Vector.png
│  │  ├─ Vector.svg
│  │  ├─ Vector12.svg
│  │  ├─ vkglad.webp
│  │  ├─ vkthai.webp
│  │  ├─ vorona.webp
│  │  ├─ x5.webp
│  │  ├─ x52.webp
│  │  ├─ x5_540202.svg
│  │  ├─ yandex.webp
│  │  ├─ yota.webp
│  │  └─ yota_466415.svg
│  ├─ logos
│  │  ├─ megafon.svg
│  │  ├─ mts.svg
│  │  ├─ red.svg
│  │  ├─ rjd.svg
│  │  ├─ sber.svg
│  │  ├─ t2.svg
│  │  ├─ tbank.svg
│  │  ├─ vk.svg
│  │  ├─ vtb.svg
│  │  ├─ x5.svg
│  │  ├─ yandex.svg
│  │  └─ yota.svg
│  ├─ mini-man.svg
│  ├─ next.svg
│  ├─ oilman.webp
│  ├─ redgirl.webp
│  ├─ scan.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ slicemachine.config.json
├─ slices
│  ├─ CaseFilters
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ CaseGrid
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ CategorySlyder
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ HeaderOverlay
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ HeroSlice
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ index.ts
│  ├─ NewsGridSlice
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ Showreel
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ StatsGrid
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  └─ TeamSlice
│     ├─ index.tsx
│     ├─ mocks.json
│     ├─ model.json
│     └─ screenshot-default.png
├─ store
│  └─ useCaseFilter.ts
├─ tailwind.config.ts
└─ tsconfig.json

```
```
twin3
├─ app
│  ├─ about
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ exit-preview
│  │  │  └─ route.ts
│  │  ├─ preview
│  │  │  └─ route.ts
│  │  ├─ revalidate
│  │  │  └─ route.ts
│  │  └─ video
│  │     └─ [...slug]
│  │        └─ route.ts
│  ├─ blog
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ head.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ projects
│  │  └─ page.tsx
│  ├─ slice-simulator
│  │  └─ page.tsx
│  └─ styles
│     └─ fade.css
├─ components
│  ├─ BlogStart.tsx
│  ├─ CaseFilters.tsx
│  ├─ CaseGrid.tsx
│  ├─ CategorySlider.tsx
│  ├─ CityTime.tsx
│  ├─ Footer.tsx
│  ├─ Footer2.tsx
│  ├─ Footermain.tsx
│  ├─ Header.tsx
│  ├─ HeaderOverlayHARD.tsx
│  ├─ Hero.tsx
│  ├─ Keisinfo.tsx
│  ├─ LogoMarquee.tsx
│  ├─ MainReval2.tsx
│  ├─ MainRevealBlock.tsx
│  ├─ NewsGrid.tsx
│  ├─ NewsModal.tsx
│  ├─ OverlayWrapper.tsx
│  ├─ projects
│  │  └─ ProjectsClient.tsx
│  ├─ Showreel.tsx
│  ├─ SlicesClient.tsx
│  ├─ StatsGrid.tsx
│  ├─ StatsGrid2.tsx
│  ├─ ui
│  │  ├─ Arrowicon.tsx
│  │  ├─ background-gradient.tsx
│  │  ├─ GlareCard.tsx
│  │  ├─ GradientBorder.tsx
│  │  ├─ MagicButton.tsx
│  │  ├─ Spotlight.tsx
│  │  └─ TextGenerateEffect.tsx
│  ├─ VhSetter.tsx
│  └─ ViewCanvas.tsx
├─ customtypes
│  ├─ about
│  │  └─ index.json
│  ├─ blog
│  │  └─ index.json
│  ├─ extramenu
│  │  └─ index.json
│  ├─ projects
│  │  └─ index.json
│  └─ welcome
│     └─ index.json
├─ data
│  └─ case.ts
├─ declarations.d.ts
├─ eslint.config.mjs
├─ hooks
│  ├─ useFadeChildrenOnScroll.ts
│  ├─ useFadeInOnScroll.ts
│  ├─ useImagesLoaded.ts
│  ├─ useLockBodyScroll.ts
│  ├─ useMediaQuery.ts
│  └─ useViewportHeight.ts
├─ lib
│  ├─ blogData.ts
│  └─ utils.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ postcss.config.mjs
├─ prismicio-types.d.ts
├─ prismicio.ts
├─ public
│  ├─ ai.svg
│  ├─ alvares.webp
│  ├─ avatar.svg
│  ├─ cards
│  │  ├─ admiral.webp
│  │  ├─ bol.webp
│  │  ├─ glaza.webp
│  │  ├─ king.webp
│  │  ├─ krosovok.webp
│  │  ├─ luma.webp
│  │  ├─ oilman.webp
│  │  ├─ robot.webp
│  │  ├─ sberovsky.webp
│  │  ├─ shtuchka.webp
│  │  ├─ utkin.webp
│  │  ├─ wylsa.webp
│  │  ├─ x5.webp
│  │  ├─ yoda.webp
│  │  └─ yota.webp
│  ├─ ded.webp
│  ├─ desktop_pc
│  │  ├─ license.txt
│  │  ├─ scene.bin
│  │  ├─ scene.gltf
│  │  └─ textures
│  │     ├─ Material.002_baseColor.png
│  │     ├─ Material.023_baseColor.jpeg
│  │     ├─ Material.024_baseColor.jpeg
│  │     ├─ Material.074_0_baseColor.png
│  │     ├─ Material.074_10_baseColor.jpeg
│  │     ├─ Material.074_11_baseColor.png
│  │     ├─ Material.074_12_baseColor.jpeg
│  │     ├─ Material.074_13_baseColor.png
│  │     ├─ Material.074_14_baseColor.png
│  │     ├─ Material.074_15_baseColor.png
│  │     ├─ Material.074_16_baseColor.png
│  │     ├─ Material.074_17_baseColor.png
│  │     ├─ Material.074_18_baseColor.png
│  │     ├─ Material.074_18_emissive.png
│  │     ├─ Material.074_19_baseColor.png
│  │     ├─ Material.074_1_baseColor.jpeg
│  │     ├─ Material.074_20_baseColor.png
│  │     ├─ Material.074_21_baseColor.png
│  │     ├─ Material.074_22_baseColor.png
│  │     ├─ Material.074_23_baseColor.png
│  │     ├─ Material.074_24_baseColor.png
│  │     ├─ Material.074_24_emissive.png
│  │     ├─ Material.074_25_baseColor.jpeg
│  │     ├─ Material.074_26_baseColor.png
│  │     ├─ Material.074_27_baseColor.png
│  │     ├─ Material.074_27_emissive.png
│  │     ├─ Material.074_28_baseColor.png
│  │     ├─ Material.074_29_baseColor.png
│  │     ├─ Material.074_2_baseColor.jpeg
│  │     ├─ Material.074_30_baseColor.png
│  │     ├─ Material.074_31_baseColor.png
│  │     ├─ Material.074_32_baseColor.jpeg
│  │     ├─ Material.074_33_baseColor.png
│  │     ├─ Material.074_34_baseColor.jpeg
│  │     ├─ Material.074_35_baseColor.png
│  │     ├─ Material.074_36_baseColor.jpeg
│  │     ├─ Material.074_39_baseColor.jpeg
│  │     ├─ Material.074_3_baseColor.png
│  │     ├─ Material.074_40_baseColor.png
│  │     ├─ Material.074_4_baseColor.png
│  │     ├─ Material.074_4_emissive.png
│  │     ├─ Material.074_5_baseColor.png
│  │     ├─ Material.074_6_baseColor.png
│  │     ├─ Material.074_7_baseColor.png
│  │     ├─ Material.074_8_baseColor.png
│  │     ├─ Material.074_9_baseColor.png
│  │     ├─ Material.074_9_emissive.png
│  │     ├─ Material.074_baseColor.png
│  │     ├─ Material_baseColor.jpeg
│  │     ├─ Material_metallicRoughness.png
│  │     └─ Tasten_2_baseColor.jpeg
│  ├─ file.svg
│  ├─ fonts
│  │  ├─ Druk Bold Desktop-400-normal-0.otf
│  │  ├─ Druk Bold Desktop-700-normal-0.otf
│  │  ├─ DrukCyr-700-normal-0.ttf
│  │  ├─ FRADMCN-700-normal-0.ttf
│  │  ├─ FRADMCN-med-500-normal-1.ttf
│  │  ├─ FRAMDCN(cond)-400-normal-1.ttf
│  │  ├─ Franklin Gothic Medium Cond.TTF
│  │  ├─ franklin-gothic-book.ttf
│  │  ├─ ProtoMono-Light.ttf
│  │  ├─ RG StandardMedium-700-normal-0.ttf
│  │  └─ RG-StandardBook.ttf
│  ├─ girl.webp
│  ├─ girl_with_glasses
│  │  └─ old_face_-_caricature.glb
│  ├─ globe.svg
│  ├─ icons
│  │  ├─ amazingred.png
│  │  ├─ amazingred1.png
│  │  ├─ amazingred2.png
│  │  ├─ back.svg
│  │  ├─ backiconmenu.svg
│  │  ├─ betboom.png
│  │  ├─ bh-icon.svg
│  │  ├─ citymobil.png
│  │  ├─ close-menu_150549.svg
│  │  ├─ coolcola-icon.png
│  │  ├─ coolcola-icon1.svg
│  │  ├─ dino.png
│  │  ├─ fesco.png
│  │  ├─ Frame 1321318521.svg
│  │  ├─ henesy.png
│  │  ├─ kret.png
│  │  ├─ planet.svg
│  │  ├─ rusargo.png
│  │  ├─ rzd.png
│  │  ├─ sber.png
│  │  ├─ showreel2.svg
│  │  ├─ showreel2.webp
│  │  ├─ sk-icon.png
│  │  ├─ t2.png
│  │  ├─ tg-icon.svg
│  │  ├─ twin3d.png
│  │  ├─ Variant17.svg
│  │  ├─ vkthai.png
│  │  ├─ vkthai1.svg
│  │  ├─ wa-icon.svg
│  │  ├─ x5.png
│  │  ├─ yandex.png
│  │  └─ yota.png
│  ├─ images
│  │  ├─ 100LET.webp
│  │  ├─ 1ded.webp
│  │  ├─ 21321im.webp
│  │  ├─ alvares.webp
│  │  ├─ amazingred.svg
│  │  ├─ amazingred.webp
│  │  ├─ award-1.webp
│  │  ├─ award-2.webp
│  │  ├─ award-3.webp
│  │  ├─ award-4.webp
│  │  ├─ award-5.webp
│  │  ├─ award-6.webp
│  │  ├─ award-7.webp
│  │  ├─ award-8.webp
│  │  ├─ backfonktomy.webp
│  │  ├─ backifon.webp
│  │  ├─ betboom.webp
│  │  ├─ bg-projects.webp
│  │  ├─ bg-projects1.webp
│  │  ├─ bg-projects2.webp
│  │  ├─ capitan.webp
│  │  ├─ citymobil.webp
│  │  ├─ david.webp
│  │  ├─ DDOS.webp
│  │  ├─ ded3webp.webp
│  │  ├─ deddenga.webp
│  │  ├─ dedsdengami.webp
│  │  ├─ dedsdengami2.webp
│  │  ├─ dino.webp
│  │  ├─ dino2.svg
│  │  ├─ FIREHOUSE.png
│  │  ├─ girlcase1png.webp
│  │  ├─ gollum.png
│  │  ├─ gollum.webp
│  │  ├─ gollum2.webp
│  │  ├─ grom.webp
│  │  ├─ Group2087329657.png
│  │  ├─ image100.webp
│  │  ├─ image70.svg
│  │  ├─ image77.webp
│  │  ├─ kret.webp
│  │  ├─ kruzhok.png
│  │  ├─ logo-header.png
│  │  ├─ logocvet.webp
│  │  ├─ logosmob5.svg
│  │  ├─ logosmob55.svg
│  │  ├─ logosmobred.svg
│  │  ├─ logosmobyota.svg
│  │  ├─ logo_Twin3d-02.png
│  │  ├─ master.webp
│  │  ├─ maxsber.webp
│  │  ├─ monti.webp
│  │  ├─ Motherboard.webp
│  │  ├─ news.png
│  │  ├─ news2).webp
│  │  ├─ news3.webp
│  │  ├─ news4.webp
│  │  ├─ oilman.webp
│  │  ├─ posterrzhd.webp
│  │  ├─ redicon.png
│  │  ├─ redicon.svg
│  │  ├─ red_353562.svg
│  │  ├─ rzhd.webp
│  │  ├─ shadow.webp
│  │  ├─ shadow2.webp
│  │  ├─ skaner.webp
│  │  ├─ souz.webp
│  │  ├─ stas.webp
│  │  ├─ Strelka1.png
│  │  ├─ Strelka2r.png
│  │  ├─ t2.webp
│  │  ├─ Vector.png
│  │  ├─ Vector.svg
│  │  ├─ Vector12.svg
│  │  ├─ vkglad.webp
│  │  ├─ vkthai.webp
│  │  ├─ vorona.webp
│  │  ├─ x5.webp
│  │  ├─ x52.webp
│  │  ├─ x5_540202.svg
│  │  ├─ yandex.webp
│  │  ├─ yota.webp
│  │  └─ yota_466415.svg
│  ├─ logos
│  │  ├─ megafon.svg
│  │  ├─ mts.svg
│  │  ├─ red.svg
│  │  ├─ rjd.svg
│  │  ├─ sber.svg
│  │  ├─ t2.svg
│  │  ├─ tbank.svg
│  │  ├─ vk.svg
│  │  ├─ vtb.svg
│  │  ├─ x5.svg
│  │  ├─ yandex.svg
│  │  └─ yota.svg
│  ├─ mini-man.svg
│  ├─ next.svg
│  ├─ oilman.webp
│  ├─ redgirl.webp
│  ├─ scan.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ slicemachine.config.json
├─ slices
│  ├─ CaseFilters
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ CaseGrid
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ CategorySlyder
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ HeaderOverlay
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ HeroSlice
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ index.ts
│  ├─ NewsGridSlice
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ Showreel
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  ├─ StatsGrid
│  │  ├─ index.tsx
│  │  ├─ mocks.json
│  │  ├─ model.json
│  │  └─ screenshot-default.png
│  └─ TeamSlice
│     ├─ index.tsx
│     ├─ mocks.json
│     ├─ model.json
│     └─ screenshot-default.png
├─ store
│  └─ useCaseFilter.ts
├─ tailwind.config.ts
└─ tsconfig.json

```