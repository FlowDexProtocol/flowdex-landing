'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center bg-gradient-to-b from-bg to-[#0a1525] py-24 text-center">
      <Container>
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">Something Went Wrong</h1>
          <p className="mt-3 text-base text-ink-dim">An unexpected error occurred. Please try again.</p>
          <button
            onClick={reset}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-[#4E65BB] px-6 py-3.5 text-sm font-semibold text-[#03131a] transition-transform hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </div>
      </Container>
    </section>
  );
}
