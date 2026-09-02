import Link from 'next/link';
import { Container } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-gradient-to-b from-bg to-[#0a1525] py-24 text-center">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="text-sm font-bold uppercase tracking-[0.25em] text-primary">404</div>
          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Page Not Found</h1>
          <p className="mt-3 text-base text-ink-dim">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-[#4E65BB] px-6 py-3.5 text-sm font-semibold text-[#03131a] transition-transform hover:-translate-y-0.5"
          >
            Go Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
