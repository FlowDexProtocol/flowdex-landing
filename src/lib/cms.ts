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
// See api.ts's request() for why this is 5s and not the 30s it used to be
// — this is the exact fetch a "why didn't my CMS edit show up" report
// traces back to.
export const fetchPageContent = cache(async (page: string): Promise<CmsPageData> => {
  try {
    const res = await fetch(`${API_BASE}/api/cms/page/${encodeURIComponent(page)}`, { next: { revalidate: 5 } });
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

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
}

// GET /api/cms/team — active team members only, in sort_order. Same
// never-throws contract as fetchPageContent: a down API or empty table
// just means the "coming soon" fallback shows on the About page.
export const fetchTeam = cache(async (): Promise<TeamMember[]> => {
  try {
    const res = await fetch(`${API_BASE}/api/cms/team`, { next: { revalidate: 5 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? (data as TeamMember[]) : [];
  } catch {
    return [];
  }
});
