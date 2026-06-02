import Link from 'next/link';
import { ArrowLink } from '@/components/ui/ArrowLink';

export default function NotFound() {
  return (
    <section className="container-edge flex min-h-[80svh] flex-col justify-center py-32">
      <p className="eyebrow mb-6">Error 404</p>
      <h1 className="font-display text-fluid-7xl font-medium leading-[0.85] tracking-tightest">
        Lost the
        <br />
        thread.
      </h1>
      <p className="mt-8 max-w-md text-fluid-lg text-muted text-pretty">
        This page slipped through the cracks. Let’s get you back to something solid.
      </p>
      <div className="mt-10 flex gap-8">
        <ArrowLink href="/">Back home</ArrowLink>
        <ArrowLink href="/work">See the work</ArrowLink>
      </div>
      <Link href="/" aria-hidden className="sr-only">
        Home
      </Link>
    </section>
  );
}
