
import Footermain from "@/components/Footermain";
import Hero from "@/components/Hero";
import MainRevealBlock from "@/components/MainRevealBlock";
import CategorySlider from "@/components/CategorySlider";
import NewsGrid from "@/components/NewsGrid";
import CaseGrid from "@/components/CaseGrid";
import StatsGrid from "@/components/StatsGrid";
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import { createClient } from '@/prismicio';
import LogoMarquee from "@/components/LogoMarquee";



export default async function Home() {
  const client = createClient();
  const page = await client.getSingle('welcome'); // 'welcome' — это UID страницы

  const allSlices = page.data.slices;

  const caseSlices = allSlices.filter(
    s => s.slice_type === 'case_slyder' || s.slice_type === 'case_grid'
  );
  const otherSlices = allSlices.filter(
    s => s.slice_type !== 'case_slyder' && s.slice_type !== 'case_grid'
  );

  return (
    <main>
      
      <SliceZone slices={otherSlices} components={components} />
      
      <MainRevealBlock/>
      
      <SliceZone slices={caseSlices} components={components} />
      
      <LogoMarquee/>
      <Footermain/>
    </main>
  );
}



