import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sanitizeHtml } from '@/lib/sanitize';
import { getCmsBlogPost } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { Container, Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import CmsImage from '@/components/CmsImage';
import { resolveApiUrl } from '@/lib/cms';
import { sanitizeImageUrl } from '@/lib/url-safety';

// cover_image_url is written by the admin's blog editor as a path relative
// to the API's own origin (e.g. "/uploads/foo.jpg"), same convention as
// every other CMS-uploaded asset — resolve it to an absolute URL before
// sanitizeImageUrl's https-only check ever sees it, or every relative
// cover image gets silently rejected. An already-absolute URL (http(s)://)
// passes through resolveApiUrl untouched.
function resolvedCoverImage(url: string | null | undefined): string {
  return sanitizeImageUrl(resolveApiUrl(url));
}

const SITE_URL = 'https://flowdexprotocol.com';

// No generateStaticParams here, so Next.js already renders this route
// per-request rather than prerendering it at build time (confirmed: it
// builds as "ƒ" dynamic, and getCmsBlogPost's own .catch(() => null) below
// means a build-time-unreachable API can't fail the build even if some
// tooling did try to touch it). Declared explicitly anyway — costs
// nothing and removes any ambiguity for Next.js's own static/dynamic
// inference on this route.
export const dynamic = 'force-dynamic';

// JSON.stringify() does not escape "<", so a CMS field (title, excerpt,
// author) containing the literal text "</script>" would prematurely close
// the JSON-LD <script> tag below and let the rest of its value execute as
// real markup/script — a well-known JSON-in-<script> injection vector.
// DOMPurify doesn't apply here (this isn't HTML, it's a JSON blob); the
// correct fix is escaping "<" to its JSON/Unicode-escape equivalent, which
// round-trips correctly for both JSON.parse and search-engine JSON-LD
// parsers.
function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

// First 160 chars of the post body, broken at a word boundary — used only
// when the post has no excerpt. Body is HTML (rich text editor output), so
// tags are stripped before flattening whitespace for a meta description.
function excerptFromContent(content: string): string {
  const flat = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
  if (flat.length <= 160) return flat;
  const cut = flat.slice(0, 160);
  const lastSpace = cut.lastIndexOf(' ');
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`;
}

export async function generateMetadata(props: PageProps<'/blogs/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getCmsBlogPost(slug).catch(() => null);
  if (!post) return { title: 'Blog Post' };

  const description = post.excerpt || excerptFromContent(post.content);
  const url = `${SITE_URL}/blogs/${post.slug}`;
  const safeCoverImage = resolvedCoverImage(post.cover_image_url);
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: [post.author],
      images: safeCoverImage ? [safeCoverImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: safeCoverImage ? [safeCoverImage] : undefined,
    },
  };
}

export default async function BlogPostPage(props: PageProps<'/blogs/[slug]'>) {
  const { slug } = await props.params;
  const post = await getCmsBlogPost(slug).catch(() => null);
  if (!post) notFound();

  // Post body is HTML from the admin dashboard's rich text editor — an
  // editor-role admin account is a lower trust tier than whoever reviews
  // what actually goes live, so this is sanitized same as any other
  // untrusted-origin HTML before rendering.
  const safeContent = sanitizeHtml(post.content);
  const safeCoverImage = resolvedCoverImage(post.cover_image_url);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || excerptFromContent(post.content),
    datePublished: post.published_at || post.created_at,
    dateModified: post.published_at || post.created_at,
    author: { '@type': 'Person', name: post.author },
    image: safeCoverImage || `${SITE_URL}/opengraph-image`,
    url: `${SITE_URL}/blogs/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <div className="page-hero" style={{ paddingBottom: '40px' }}>
        <div className="page-hero-glow" />
        <Reveal>
          <Container className="text-left">
            <Link href="/blogs" className="font-sans text-xs font-semibold text-primary hover:underline">
              ← Back to Blog
            </Link>
            <div className="mx-auto mt-6 max-w-[800px] text-center">
              <span className="eco-tag">{post.category}</span>
              <h1 style={{ fontSize: '38px', marginTop: '14px' }}>{post.title}</h1>
              <p className="mt-4 font-sans text-xs text-ink-faint" style={{ margin: '14px 0 0' }}>
                {post.author} · {formatDate(post.published_at)}
              </p>
            </div>
          </Container>
        </Reveal>
      </div>

      <Section className="!pt-0">
        <div className="mx-auto max-w-[800px] overflow-x-hidden">
          <CmsImage
            src={post.cover_image_url}
            alt=""
            className="mb-8 h-auto max-h-[400px] w-full rounded-xl border border-border object-cover"
            fallback={
              <div className="blog-thumb mb-8 flex aspect-video w-full items-center justify-center rounded-xl">
                <span className="eco-tag">{post.category}</span>
              </div>
            }
          />
          <div className="prose-blog max-w-full" dangerouslySetInnerHTML={{ __html: safeContent }} />
        </div>
      </Section>
    </>
  );
}
