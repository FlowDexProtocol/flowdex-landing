'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { CmsBlogListItem } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';

export default function BlogListClient({
  posts,
  coverUrls,
}: {
  posts: CmsBlogListItem[];
  coverUrls: Record<number, string>;
}) {
  const [category, setCategory] = useState<string>('all');
  const categories = useMemo(() => ['all', ...Array.from(new Set(posts.map((p) => p.category)))], [posts]);
  const filtered = category === 'all' ? posts : posts.filter((p) => p.category === category);

  return (
    <>
      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`pill pill-sm${category === c ? '' : ' pill-ghost'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <StaggerGroup className="blog-grid">
        {filtered.map((post) => (
          <StaggerItem key={post.id}>
            <Link href={`/blogs/${post.slug}`} className="blog-card">
              <div className="blog-thumb" style={coverUrls[post.id] ? { backgroundImage: `url(${coverUrls[post.id]})` } : undefined} />
              <div className="blog-body">
                <div className="blog-cat">{post.category}</div>
                <h4>{post.title}</h4>
                {post.excerpt && <p>{post.excerpt}</p>}
                <div className="blog-date">
                  {post.author} · {formatDate(post.published_at)}
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </>
  );
}
