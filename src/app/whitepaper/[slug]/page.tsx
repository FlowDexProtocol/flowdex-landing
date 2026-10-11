import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import WhitepaperBlocks from '@/components/WhitepaperBlocks';
import {
  WHITEPAPER_SECTIONS,
  WHITEPAPER_VERSION,
  WHITEPAPER_DATE,
  getSection,
  adjacentSections,
} from '@/lib/whitepaper-content';
import { safeJsonLd, SITE_URL } from '@/lib/json-ld';

// Every section is known at build time, so all 24 pages prerender as
// static HTML. That matters beyond speed: a crawler or answer engine
// gets the full text on first request with no client-side rendering
// step, which is the reason these pages exist at all.
export function generateStaticParams() {
  return WHITEPAPER_SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<'/whitepaper/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params;
  const section = getSection(slug);
  if (!section) return { title: 'Whitepaper' };

  const title = `${section.number}. ${section.title}`;
  const url = `${SITE_URL}/whitepaper/${section.slug}`;
  return {
    title,
    description: section.lead,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — FlowDex Protocol Whitepaper`,
      description: section.lead,
      url,
      type: 'article',
    },
    twitter: {
      title: `${title} — FlowDex Protocol Whitepaper`,
      description: section.lead,
    },
  };
}

export default async function WhitepaperSectionPage(
  props: PageProps<'/whitepaper/[slug]'>
) {
  const { slug } = await props.params;
  const section = getSection(slug);
  if (!section) notFound();

  const { prev, next } = adjacentSections(slug);
  const url = `${SITE_URL}/whitepaper/${section.slug}`;

  // TechArticle rather than Article: this is protocol documentation, and
  // the more specific type gives a retrieval system a better signal about
  // what kind of question the page answers. isPartOf ties every section
  // back to the one WebSite entity declared in the root layout.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${url}#article`,
    headline: `${section.number}. ${section.title}`,
    abstract: section.lead,
    url,
    articleSection: section.title,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <div className="page-hero" style={{ paddingBottom: '36px' }}>
        <div className="page-hero-glow" />
        <Reveal>
          <Container className="text-left">
            <Link href="/whitepaper" className="wp-back">
              ← Whitepaper {WHITEPAPER_VERSION}
            </Link>
            <h1 style={{ marginTop: '14px' }}>
              <span className="wp-num">{section.number}.</span> {section.title}
            </h1>
            <p className="wp-lead">{section.lead}</p>
          </Container>
        </Reveal>
      </div>

      <Section>
        <article className="wp-article">
          <WhitepaperBlocks blocks={section.blocks} />
        </article>

        <nav className="wp-pager" aria-label="Whitepaper sections">
          {prev ? (
            <Link href={`/whitepaper/${prev.slug}`} className="wp-pager-link">
              <span className="wp-pager-dir">Previous</span>
              <span className="wp-pager-title">
                {prev.number}. {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/whitepaper/${next.slug}`}
              className="wp-pager-link wp-pager-next"
            >
              <span className="wp-pager-dir">Next</span>
              <span className="wp-pager-title">
                {next.number}. {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <p className="wp-foot">
          FlowDex Protocol Whitepaper {WHITEPAPER_VERSION}, {WHITEPAPER_DATE}.{' '}
          <Link href="/whitepaper">All sections</Link>
        </p>
      </Section>
    </>
  );
}
