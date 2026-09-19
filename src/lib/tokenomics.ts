import type { CmsPageData } from './cms';
import type { AllocationSlice } from '@/components/TokenomicsDonut';

// Whitepaper allocation — labels match the CMS's seeded
// tokenomics.distribution.* field names (presale/liquidity/team/ecosystem/
// marketing/staking/reserve) so the breakdown is CMS-editable. Colors match
// the FlowDex_Final_Prototype.html design spec exactly.
export const DEFAULT_ALLOCATION: (AllocationSlice & { field: string })[] = [
  { label: 'Presale', field: 'presale', pct: 22.5, color: '#6c5ce7' },
  { label: 'Liquidity', field: 'liquidity', pct: 20, color: '#3b82f6' },
  { label: 'Team & Advisors', field: 'team', pct: 15, color: '#a855f7' },
  { label: 'Ecosystem Fund', field: 'ecosystem', pct: 15, color: '#2dd4bf' },
  { label: 'Marketing', field: 'marketing', pct: 10, color: '#f59e0b' },
  { label: 'Staking Rewards', field: 'staking', pct: 10, color: '#4ade80' },
  { label: 'Reserve', field: 'reserve', pct: 7.5, color: '#64748b' },
];

export function resolveAllocation(cmsData: CmsPageData): AllocationSlice[] {
  return DEFAULT_ALLOCATION.map((a) => {
    const raw = cmsData[`distribution.${a.field}`];
    const parsed = raw !== undefined ? parseFloat(raw) : NaN;
    return { label: a.label, color: a.color, pct: Number.isFinite(parsed) ? parsed : a.pct };
  });
}
