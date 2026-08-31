import type {
  CmsBanner,
  CmsBlogListResponse,
  CmsBlogPost,
  CmsFaq,
  PublicStats,
  ScenariosResponse,
  StakingInfo,
  Tier,
  TierCurrent,
} from './types';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://api.flowdexprotocol.com').replace(/\/$/, '');

export const PURCHASE_URL = 'https://purchase.flowdexprotocol.com';

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Request failed (${res.status}): ${path}`);
  return (await res.json()) as T;
}

export const getTierCurrent = () => request<TierCurrent>('/api/tiers/current');
export const getTiers = () => request<Tier[]>('/api/tiers');
export const getPublicStats = () => request<PublicStats>('/api/public/stats');
export const getPublicScenarios = () => request<ScenariosResponse>('/api/public/scenarios');
export const getPublicStaking = () => request<StakingInfo>('/api/public/staking');

export const getCmsBanners = () => request<CmsBanner[]>('/api/cms/banners');
export const getCmsFaqs = (category?: string) => request<CmsFaq[]>(`/api/cms/faqs${category ? `?category=${encodeURIComponent(category)}` : ''}`);
export const getCmsBlog = (page = 1, limit = 10) => request<CmsBlogListResponse>(`/api/cms/blog?page=${page}&limit=${limit}`);
export const getCmsBlogPost = (slug: string) => request<CmsBlogPost>(`/api/cms/blog/${encodeURIComponent(slug)}`);
