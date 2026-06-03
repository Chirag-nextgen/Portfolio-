import { stack } from '@/lib/expertise';
import { Marquee } from '@/components/motion/Marquee';

/** Full-bleed scrolling band of the toolkit. */
export function StackMarquee() {
  return (
    <section aria-label="Toolkit" className="border-y border-line/10 py-6">
      <Marquee
        items={stack}
        className="font-display text-fluid-xl tracking-tight text-ink/80"
      />
    </section>
  );
}
