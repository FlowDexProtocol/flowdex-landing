// Types mirror the actual flowdex-backend response shapes 1:1.
// Postgres DECIMAL columns come back as strings unless the route parseFloat()s them.

export type Numeric = string | number;

export interface TierCurrent {
  id: number;
  name: string;
  price: number;
  total_raised_usd: number;
  hard_cap_usd: number;
  progress_pct: string;
  tge_percentage: number;
  cliff_months: number;
  vest_months: number;
  claims_open: boolean;
  bonus: string | null;
  status: string | null;
  countdown: string | null;
  message?: string;
}

export interface Tier {
  id: number;
  name: string;
  price: Numeric;
  hard_cap_usd: Numeric;
  total_raised_usd: Numeric;
  is_active: boolean;
  claims_open: boolean;
  tge_percentage: Numeric;
  cliff_months: number;
  vest_months: number;
  opened_at: string | null;
  closed_at: string | null;
}

export interface PublicStats {
  total_raised_usd: number;
  total_buyers: number;
  current_tier: Tier | null;
}

export interface ScenarioEntry {
  label: string;
  multiplier: number;
  price: number;
  mcap: number;
}

export interface ScenariosResponse {
  listing_price: number;
  total_supply: number;
  scenarios: ScenarioEntry[];
}

export interface StakingInfo {
  status: string;
  phase: number;
  fee_share_pct: number;
  token: string;
  description: string;
  features: string[];
}

export interface CmsBanner {
  id: number;
  title: string;
  subtitle: string | null;
  cta_text: string | null;
  cta_link: string | null;
  image_url: string | null;
  image_url_desktop: string | null;
  image_url_mobile: string | null;
  countdown_end: string | null;
  show_countdown: boolean;
  bg_color: string | null;
  bg_style: string;
  sort_order: number;
  is_active: boolean;
}

export interface CmsFaq {
  id: number;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
}

export interface CmsBlogListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string;
  author: string;
  published_at: string | null;
  created_at: string;
}

export interface CmsBlogListResponse {
  posts: CmsBlogListItem[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface CmsBlogPost extends CmsBlogListItem {
  content: string;
}
