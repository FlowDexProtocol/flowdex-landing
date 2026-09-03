import type { Metadata } from 'next';
import { getPublicScenarios, getPublicStaking, getTiers } from '@/lib/api';
import { formatCompactUSD, formatTokenAmount, formatTokenPrice, toNum } from '@/lib/format';
import { cms, fetchPageContent } from '@/lib/cms';
import { BuyButton, Container, Pill, Section, SectionHeading } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import TokenomicsDonut from '@/components/TokenomicsDonut';

const TOKENOMICS_DESCRIPTION =
  'Explore $FDP tokenomics: supply allocation, presale tiers, staking rewards, and fee-sharing mechanics for the FlowDex Protocol ecosystem.';

export const metadata: Metadata = {
  title: 'Tokenomics',
  description: TOKENOMICS_DESCRIPTION,
  openGraph: { title: 'Tokenomics — FlowDex Protocol', description: TOKENOMICS_DESCRIPTION },
  twitter: { title: 'Tokenomics — FlowDex Protocol', description: TOKENOMICS_DESCRIPTION },
};

// Whitepaper allocation — labels match the CMS's seeded
// tokenomics.distribution.* field names (presale/liquidity/team/ecosystem/
// marketing/staking/reserve) so the breakdown is CMS-editable.
const ALLOCATION = [
  { label: 'Presale', field: 'presale', pct: 22.5, color: '#627EEA' },
  { label: 'Liquidity', field: 'liquidity', pct: 20, color: '#00FF88' },
  { label: 'Team & Advisors', field: 'team', pct: 15, color: '#9945FF' },
  { label: 'Ecosystem Fund', field: 'ecosystem', pct: 15, color: '#3B82F6' },
  { label: 'Marketing', field: 'marketing', pct: 10, color: '#F59E0B' },
  { label: 'Staking Rewards', field: 'staking', pct: 10, color: '#10B981' },
  { label: 'Reserve', field: 'reserve', pct: 7.5, color: '#6B7280' },
];

export default async function TokenomicsPage() {
  const [tiers, scenarios, staking, cmsData] = await Promise.all([
    getTiers().catch(() => []),
    getPublicScenarios().catch(() => null),
    getPublicStaking().catch(() => null),
    fetchPageContent('tokenomics'),
  ]);

  const allocation = ALLOCATION.map((a) => {
    const raw = cmsData[`distribution.${a.field}`];
    const parsed = raw !== undefined ? parseFloat(raw) : NaN;
    return { ...a, pct: Number.isFinite(parsed) ? parsed : a.pct };
  });

  return (
    <>
      <section className="bg-radial-glow py-14 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-3xl font-bold text-ink sm:text-5xl">
              {cmsData['hero.title'] ? (
                cmsData['hero.title']
              ) : (
                <>
                  $FDP <span className="text-primary">Tokenomics</span>
                </>
              )}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-dim sm:text-lg">
              {cms(
                cmsData,
                'hero',
                'subtitle',
                `${scenarios ? `${formatTokenAmount(scenarios.total_supply)} total supply` : '10,000,000,000 total supply'} — listing at ${
                  scenarios ? formatTokenPrice(scenarios.listing_price) : '$0.05'
                }.`
              )}
            </p>
            <div className="mt-8 flex justify-center">
              <BuyButton />
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <SectionHeading title="Token Allocation" subtitle="10 billion $FDP, distributed for long-term sustainability — no VC allocation." />
        <TokenomicsDonut allocation={allocation} />
      </Section>

      <Section>
        <SectionHeading title="All Presale Tiers" subtitle="Live pricing, hard caps, and vesting terms for every tier." />
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-ink-faint">
                <th className="px-5 py-3 font-medium sm:px-6">Tier</th>
                <th className="px-5 py-3 font-medium sm:px-6">Price</th>
                <th className="px-5 py-3 font-medium sm:px-6">Hard Cap</th>
                <th className="px-5 py-3 font-medium sm:px-6">TGE %</th>
                <th className="px-5 py-3 font-medium sm:px-6">Cliff</th>
                <th className="px-5 py-3 font-medium sm:px-6">Vesting</th>
                <th className="px-5 py-3 font-medium sm:px-6">Full Unlock</th>
                <th className="px-5 py-3 font-medium sm:px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tiers.map((t) => (
                <tr key={t.id} className={t.is_active ? 'bg-primary-dim' : undefined}>
                  <td className="px-5 py-3 font-semibold text-ink sm:px-6">{t.name}</td>
                  <td className="px-5 py-3 font-mono sm:px-6">{formatTokenPrice(t.price)}</td>
                  <td className="px-5 py-3 font-mono text-ink-faint sm:px-6">{formatCompactUSD(t.hard_cap_usd)}</td>
                  <td className="px-5 py-3 font-mono text-ink-faint sm:px-6">{toNum(t.tge_percentage)}%</td>
                  <td className="px-5 py-3 text-ink-faint sm:px-6">{t.cliff_months > 0 ? `${t.cliff_months}mo` : '0'}</td>
                  <td className="px-5 py-3 text-ink-faint sm:px-6">{t.vest_months > 0 ? `${t.vest_months}mo` : '0'}</td>
                  <td className="px-5 py-3 font-semibold text-ink sm:px-6">
                    {t.cliff_months + t.vest_months > 0 ? `${t.cliff_months + t.vest_months}mo` : 'Immediate'}
                  </td>
                  <td className="px-5 py-3 sm:px-6">
                    {t.is_active ? <Pill tone="green">Active</Pill> : t.closed_at ? <Pill tone="neutral">Closed</Pill> : <Pill tone="neutral">Upcoming</Pill>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-xs text-ink-faint">
          Earlier tiers get the lowest price but the longest vesting. Later tiers cost more but unlock faster —
          Tier 8 unlocks 100% instantly.
        </p>
      </Section>

      {staking && (
        <Section>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Pill tone="purple">{staking.status.replace('_', ' ')}</Pill>
              <Pill tone="primary">Phase {staking.phase}</Pill>
              <Pill tone="green">{staking.fee_share_pct}% Fee Share</Pill>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
              Stake {staking.token} <span className="text-primary">Coming Soon</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-ink-dim sm:text-base">{staking.description}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {staking.features.map((f) => (
                <li key={f} className="flex items-center gap-2 rounded-lg border border-border bg-bg-soft px-4 py-3 text-sm text-ink">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
    </>
  );
}
