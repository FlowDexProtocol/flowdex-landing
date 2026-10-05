import type { CmsPageData } from './cms';
import type { AllocationSlice } from '@/components/TokenomicsDonut';

// Whitepaper v8.0 allocation — 10 categories, 100B total supply.
// Labels match the CMS's seeded tokenomics.distribution.* field names so the
// breakdown is CMS-editable. Colors match the FlowDex design spec.
export const DEFAULT_ALLOCATION: (AllocationSlice & { field: string })[] = [
  { label: 'Presale (20 Tiers)', field: 'presale', pct: 30, color: '#6c5ce7' },
  { label: 'Team', field: 'team', pct: 15, color: '#a855f7' },
  { label: 'Treasury / DAO', field: 'treasury', pct: 15, color: '#f59e0b' },
  { label: 'Staking Rewards', field: 'staking', pct: 12, color: '#4ade80' },
  { label: 'Ecosystem / Community', field: 'ecosystem', pct: 10, color: '#2dd4bf' },
  { label: 'Liquidity', field: 'liquidity', pct: 6, color: '#64748b' },
  { label: 'Airdrop', field: 'airdrop', pct: 5, color: '#3b82f6' },
  { label: 'Advisors', field: 'advisors', pct: 3, color: '#ec4899' },
  { label: 'Exchange Listings', field: 'exchange_listings', pct: 2, color: '#14b8a6' },
  { label: 'Market Makers', field: 'market_makers', pct: 2, color: '#f97316' },
];

export function resolveAllocation(cmsData: CmsPageData): AllocationSlice[] {
  return DEFAULT_ALLOCATION.map((a) => {
    const raw = cmsData[`distribution.${a.field}`];
    const parsed = raw !== undefined ? parseFloat(raw) : NaN;
    return { label: a.label, color: a.color, pct: Number.isFinite(parsed) ? parsed : a.pct };
  });
}
