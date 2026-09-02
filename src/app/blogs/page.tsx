import type { Metadata } from 'next';
import Link from 'next/link';
import { getCmsBlog } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { Container, EmptyState, Pill, Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

const BLOG_DESCRIPTION = 'News, updates, and insights from the FlowDex Protocol team on $FDP, the presale, and the Universal Exchange.';

export const metadata: Metadata = {
  title: 'Blog',
  description: BLOG_DESCRIPTION,
  openGraph: { title: 'Blog — FlowDex Protocol', description: BLOG_DESCRIPTION },
  twitter: { title: 'Blog — FlowDex Protocol', description: BLOG_DESCRIPTION },
};

export default async function BlogsPage() {
  const data = await getCmsBlog(1, 12).catch(() => null);
  const posts = data?.posts ?? [];

  return (
    <>
      <section className="bg-radial-glow py-14 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-3xl font-bold text-ink sm:text-5xl">
              FlowDex <span className="text-primary">Blog</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-dim sm:text-lg">
              Product updates, presale news, and protocol deep dives.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section>
        {posts.length === 0 ? (
          <EmptyState>No posts published yet — check back soon.</EmptyState>
        ) : (
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary"
                >
                  <div className="flex aspect-video items-center justify-center bg-card-hover text-xs font-semibold uppercase tracking-widest text-primary/40">
                    {post.category}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <Pill tone="neutral" className="w-fit">
                      {post.category}
                    </Pill>
                    <h2 className="mt-3 text-lg font-bold leading-snug text-ink group-hover:text-primary">{post.title}</h2>
                    {post.excerpt && <p className="mt-2 flex-1 text-sm text-ink-faint">{post.excerpt}</p>}
                    <p className="mt-4 text-xs text-ink-faint">
                      {post.author} · {formatDate(post.published_at)}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </Section>
    </>
  );
}
