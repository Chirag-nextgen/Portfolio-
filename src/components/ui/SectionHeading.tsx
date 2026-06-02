import { cn } from '@/lib/utils';
import { RevealText } from '@/components/motion/RevealText';

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  className?: string;
};

/** Editorial section header: numbered eyebrow + oversized display title. */
export function SectionHeading({ index, eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <div className="flex items-center gap-4">
        {index && <span className="font-mono text-xs text-accent">{index}</span>}
        <span className="hairline max-w-[3rem] flex-1" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="max-w-3xl font-display text-fluid-3xl leading-[1.02] tracking-tightest text-balance">
        <RevealText text={title} />
      </h2>
    </div>
  );
}
