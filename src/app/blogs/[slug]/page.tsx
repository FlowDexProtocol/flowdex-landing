import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { getCmsBlogPost } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { Container, Pill, Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import { sanitizeImageUrl } from '@/lib/url-safety';

const SITE_URL = 'https://flowdexprotocol.com';

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
  const safeCoverImage = sanitizeImageUrl(post.cover_image_url);
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
  const safeContent = DOMPurify.sanitize(post.content);
  const safeCoverImage = sanitizeImageUrl(post.cover_image_url);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || excerptFromContent(post.content),
    datePublished: post.published_at || post.created_at,
    dateModified: post.published_at || post.created_at,
    author: { '@type': 'Person', name: post.author },
    image: sanitizeImageUrl(post.cover_image_url) || `${SITE_URL}/opengraph-image`,
    url: `${SITE_URL}/blogs/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <section className="border-b border-border bg-radial-glow py-14 sm:py-16">
        <Container>
          <Reveal>
            <Link href="/blogs" className="text-xs font-semibold text-primary hover:underline">
              ← Back to Blog
            </Link>
            <div className="mx-auto mt-6 max-w-2xl text-center">
              <Pill tone="neutral">{post.category}</Pill>
              <h1 className="mt-4 text-2xl font-bold leading-tight text-ink sm:text-4xl">{post.title}</h1>
              <p className="mt-4 text-xs text-ink-faint">
                {post.author} · {formatDate(post.published_at)}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section className="!pt-0">
        <div className="mx-auto max-w-2xl">
          {safeCoverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={safeCoverImage}
              alt=""
              className="mb-8 aspect-video w-full rounded-xl border border-border object-cover"
            />
          ) : (
            <div className="mb-8 flex aspect-video w-full items-center justify-center rounded-xl border border-border bg-gradient-to-br from-primary/15 to-purple/15">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/40">{post.category}</span>
            </div>
          )}
          <div
            className="prose-blog space-y-4 text-sm leading-relaxed text-ink-dim sm:text-base"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
        </div>
      </Section>
    </>
  );
}
