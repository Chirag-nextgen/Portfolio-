'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_EXPO } from '@/lib/motion';
import { Magnetic } from '@/components/motion/Magnetic';
import { useCursorHover } from '@/providers/CursorProvider';
import { site } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Accessible contact form with client-side validation and an optimistic
 * success state. With no backend wired up it composes a mailto: as a
 * graceful fallback so messages never get lost.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const cursor = useCursorHover();

  function validate(data: FormData) {
    const next: Record<string, string> = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (name.length < 2) next.name = 'Please enter your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = 'Enter a valid email address.';
    if (message.length < 10) next.message = 'A little more detail, please.';
    return { next, name, email, message };
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const { next, name, email, message } = validate(data);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('submitting');
    // Simulate async submission, then fall back to mailto.
    await new Promise((r) => setTimeout(r, 900));
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus('success');
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="flex flex-col items-start gap-4 rounded-xl border border-line/10 bg-ink/[0.015] p-10"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-paper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <h2 className="font-display text-fluid-2xl tracking-tight">Thanks — almost there.</h2>
          <p className="max-w-md text-muted text-pretty">
            Your email client should have opened with the message ready to send. If it
            didn’t, reach me directly at{' '}
            <a href={`mailto:${site.email}`} className="link-underline text-ink">
              {site.email}
            </a>
            .
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-8"
        >
          <Field label="Name" name="name" error={errors.name} autoComplete="name" />
          <Field
            label="Email"
            name="email"
            type="email"
            error={errors.email}
            autoComplete="email"
          />
          <Field label="What are you building?" name="message" error={errors.message} textarea />

          <div className="flex items-center gap-6 pt-2">
            <Magnetic strength={0.4}>
              <button
                type="submit"
                disabled={status === 'submitting'}
                {...cursor('link')}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-paper transition-colors hover:bg-accent disabled:opacity-60"
              >
                <span className="text-sm font-medium">
                  {status === 'submitting' ? 'Sending…' : 'Send message'}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </Magnetic>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  error?: string;
  textarea?: boolean;
  autoComplete?: string;
};

function Field({ label, name, type = 'text', error, textarea, autoComplete }: FieldProps) {
  const shared =
    'peer w-full border-b border-line/20 bg-transparent py-3 text-fluid-lg text-ink outline-none transition-colors placeholder:text-transparent focus:border-accent';
  return (
    <div className="relative">
      <label htmlFor={name} className="eyebrow mb-3 block">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder={label}
          aria-invalid={!!error}
          className={shared + ' resize-none'}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={label}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          className={shared}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-accent"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
