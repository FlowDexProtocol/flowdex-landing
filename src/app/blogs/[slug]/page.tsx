import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCmsBlogPost } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { Container, Pill, Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';

const SITE_URL = 'https://flowdexprotocol.com';

// First 160 chars of the post body, broken at a word boundary — used only
// when the post has no excerpt.
function excerptFromContent(content: string): string {
  const flat = content.replace(/\s+/g, ' ').trim();
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
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage(props: PageProps<'/blogs/[slug]'>) {
  const { slug } = await props.params;
  const post = await getCmsBlogPost(slug).catch(() => null);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || excerptFromContent(post.content),
    datePublished: post.published_at || post.created_at,
    dateModified: post.published_at || post.created_at,
    author: { '@type': 'Person', name: post.author },
    image: post.cover_image_url || `${SITE_URL}/opengraph-image`,
    url: `${SITE_URL}/blogs/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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

      <Section>
        <div className="mx-auto max-w-2xl space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-ink-dim sm:text-base">
              {p}
            </p>
          ))}
        </div>
      </Section>
    </>
  );
}
