import Link from 'next/link';
import { getCmsBlog } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { resolveApiUrl } from '@/lib/cms';
import { sanitizeImageUrl } from '@/lib/url-safety';
import { Section, SectionHeading } from './ui';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';

export default async function BlogPreviewSection() {
  const res = await getCmsBlog(1, 3).catch(() => null);
  const posts = res?.posts ?? [];

  if (posts.length === 0) return null;

  return (
    <Section id="blog">
      <SectionHeading label="Blog" title="Latest From FlowDex" subtitle="News, guides, and updates from the FlowDex team." />

      <StaggerGroup className="blog-grid">
        {posts.map((post) => {
          const safeCover = sanitizeImageUrl(resolveApiUrl(post.cover_image_url ?? ''));
          return (
            <StaggerItem key={post.id}>
              <Link href={`/blogs/${post.slug}`} className="blog-card">
                <div className="blog-thumb" style={safeCover ? { backgroundImage: `url(${safeCover})` } : undefined} />
                <div className="blog-body">
                  <div className="blog-cat">{post.category}</div>
                  <h4>{post.title}</h4>
                  {post.excerpt && <p>{post.excerpt}</p>}
                  <div className="blog-date">{formatDate(post.published_at ?? post.created_at)}</div>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
