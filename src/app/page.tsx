import { Hero } from '@/components/sections/Hero';
import { StackMarquee } from '@/components/sections/StackMarquee';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { WorkPreview } from '@/components/sections/WorkPreview';
import { Expertise } from '@/components/sections/Expertise';
import { ContactCTA } from '@/components/sections/ContactCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <WorkPreview />
      <AboutPreview />
      <Expertise />
      <ContactCTA />
    </>
  );
}
