import type { MetadataRoute } from 'next';
import { getCmsBlog } from '@/lib/api';

const SITE_URL = 'https://flowdexprotocol.com';

const STATIC_ROUTES = ['', '/tokenomics', '/roadmap', '/faq', '/whitepaper', '/blogs', '/terms', '/privacy', '/legal', '/how-to-buy'];

async function getAllBlogSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    try {
      const res = await getCmsBlog(page, 100);
      slugs.push(...res.posts.map((p) => p.slug));
      totalPages = res.total_pages;
      page += 1;
    } catch {
      break;
    }
  } while (page <= totalPages);

  return slugs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const slugs = await getAllBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/blogs/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...blogEntries];
}
