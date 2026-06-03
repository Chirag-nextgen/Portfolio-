import { RevealText } from '@/components/motion/RevealText';
import { FadeIn } from '@/components/motion/FadeIn';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
};

/** Consistent oversized header for top-level routed pages. */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="container-edge pb-16 pt-[calc(var(--nav-h,4.5rem)+5rem)] md:pb-24 md:pt-[calc(var(--nav-h,4.5rem)+8rem)]">
      <p className="eyebrow mb-8">{eyebrow}</p>
      <h1 className="max-w-5xl font-display text-fluid-6xl font-medium leading-[0.92] tracking-tightest text-balance">
        <RevealText text={title} whileInView={false} />
      </h1>
      {intro && (
        <FadeIn delay={0.3} className="mt-10 max-w-xl">
          <p className="text-fluid-lg text-muted text-pretty">{intro}</p>
        </FadeIn>
      )}
    </header>
  );
}
