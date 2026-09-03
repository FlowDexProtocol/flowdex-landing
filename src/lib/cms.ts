// ══════════════════════════════════════════════════
// src/lib/cms.ts
// Reads editable page copy from GET /api/cms/page/:page, which returns a
// flat object keyed by "section.field" (see flowdex-backend's
// getPageContent() in src/routes/cms.js — it is NOT an array).
//
// Every call site must keep working with the current hardcoded text as a
// fallback: cms() falls back automatically, and fetchPageContent() itself
// never throws — a down API or a missing field just means the hardcoded
// copy shows, not a broken page.
// ══════════════════════════════════════════════════

import { cache } from 'react';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://api.flowdexprotocol.com').replace(/\/$/, '');

export type CmsPageData = Record<string, string>;

// cache() memoizes per request — every component that asks for the same
// `page` within one render pass shares a single network call, without a
// module-level variable that would leak across concurrent requests.
export const fetchPageContent = cache(async (page: string): Promise<CmsPageData> => {
  try {
    const res = await fetch(`${API_BASE}/api/cms/page/${encodeURIComponent(page)}`, { next: { revalidate: 30 } });
    if (!res.ok) return {};
    const data = await res.json();
    return data && typeof data === 'object' ? (data as CmsPageData) : {};
  } catch {
    return {};
  }
});

export function cms(data: CmsPageData, section: string, field: string, fallback: string): string {
  const value = data[`${section}.${field}`];
  return value || fallback;
}
