import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCmsBlogPost } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { Container, Pill, Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';

export async function generateMetadata(props: PageProps<'/blogs/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getCmsBlogPost(slug).catch(() => null);
  if (!post) return { title: 'Blog Post' };

  const description = post.excerpt || `${post.title} — FlowDex Protocol blog.`;
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
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

  return (
    <>
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
