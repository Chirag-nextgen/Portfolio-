import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${site.name} for frontend engineering, creative development, and design systems work.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s make something worth shipping."
        intro="Tell me about the problem you’re solving. I read every message and reply within a couple of days."
      />

      <section className="container-edge grid grid-cols-1 gap-16 pb-32 md:grid-cols-12">
        <div className="flex flex-col gap-10 md:col-span-4">
          <Detail label="Email">
            <a href={`mailto:${site.email}`} className="link-underline text-fluid-lg">
              {site.email}
            </a>
          </Detail>
          <Detail label="Based in">
            <span className="text-fluid-lg">{site.location}</span>
          </Detail>
          <Detail label="Elsewhere">
            <ul className="flex flex-col gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-fluid-lg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Detail>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="eyebrow">{label}</span>
      <div className="text-muted">{children}</div>
    </div>
  );
}
