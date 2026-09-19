import Link from 'next/link';
import { Container } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center text-center">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="sec-label">404</div>
          <h1 style={{ fontSize: '42px' }}>Page Not Found</h1>
          <p className="hero-body" style={{ margin: '14px auto 0', maxWidth: 'none' }}>
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
          </p>
          <Link href="/" className="pill mt-8" style={{ display: 'inline-flex' }}>
            Go Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
