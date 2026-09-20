import type { Metadata } from 'next';
import { getCmsBlog } from '@/lib/api';
import { EmptyState, Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import BlogListClient from '@/components/BlogListClient';

const BLOG_DESCRIPTION = 'News, updates, and insights from the FlowDex Protocol team on $FDP, the presale, and the Universal Exchange.';

export const metadata: Metadata = {
  title: 'Blog',
  description: BLOG_DESCRIPTION,
  openGraph: { title: 'Blog — FlowDex Protocol', description: BLOG_DESCRIPTION },
  twitter: { title: 'Blog — FlowDex Protocol', description: BLOG_DESCRIPTION },
};

export default async function BlogsPage() {
  const data = await getCmsBlog(1, 24).catch(() => null);
  const posts = data?.posts ?? [];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-glow" />
        <Reveal>
          <h1>
            FlowDex <em>Blog</em>
          </h1>
          <p>Product updates, presale news, and protocol deep dives.</p>
        </Reveal>
      </div>

      <Section>
        {posts.length === 0 ? <EmptyState>No posts published yet — check back soon.</EmptyState> : <BlogListClient posts={posts} />}
      </Section>
    </>
  );
}
