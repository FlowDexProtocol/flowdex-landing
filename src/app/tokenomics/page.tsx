import type { Metadata } from 'next';
import { getPublicScenarios, getPublicStaking, getTiers } from '@/lib/api';
import { formatCompactUSD, formatTokenAmount, formatTokenPrice, toNum } from '@/lib/format';
import { cms, fetchPageContent } from '@/lib/cms';
import { resolveAllocation } from '@/lib/tokenomics';
import { Section, SectionHeading } from '@/components/ui';
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

export default async function TokenomicsPage() {
  const [tiers, scenarios, staking, cmsData] = await Promise.all([
    getTiers().catch(() => []),
    getPublicScenarios().catch(() => null),
    getPublicStaking().catch(() => null),
    fetchPageContent('tokenomics'),
  ]);

  const allocation = resolveAllocation(cmsData);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-glow" />
        <Reveal>
          <h1>
            {cmsData['hero.title'] ? (
              cmsData['hero.title']
            ) : (
              <>
                $FDP <em>Tokenomics</em>
              </>
            )}
          </h1>
          <p>
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
            <a href="https://purchase.flowdexprotocol.com" target="_blank" rel="noopener noreferrer" className="pill">
              Buy $FDP
            </a>
          </div>
        </Reveal>
      </div>

      <Section>
        <SectionHeading
          label="Allocation"
          title="Token Allocation"
          subtitle="10 billion $FDP, distributed for long-term sustainability — no VC allocation."
        />
        <div className="donut-wrap">
          <TokenomicsDonut allocation={allocation} />
        </div>
      </Section>

      <Section>
        <SectionHeading label="Presale" title="All Presale Tiers" subtitle="Live pricing, hard caps, and vesting terms for every tier." />
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] text-left font-sans text-sm">
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
                <tr key={t.id} className={t.is_active ? 'bg-white/[0.03]' : undefined}>
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
                    {t.is_active ? (
                      <span className="rounded-full border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.08)] px-2.5 py-1 text-xs text-[#4ade80]">
                        Active
                      </span>
                    ) : t.closed_at ? (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-ink-dim">Closed</span>
                    ) : (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-ink-dim">Upcoming</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center font-sans text-xs text-ink-faint">
          Earlier tiers get the lowest price but the longest vesting. Later tiers cost more but unlock faster — Tier 8 unlocks 100%
          instantly.
        </p>
      </Section>

      {staking && (
        <Section>
          <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 font-sans text-xs uppercase tracking-widest text-ink-faint">
              <span className="rounded-full border border-[rgba(168,85,247,0.25)] bg-[rgba(168,85,247,0.08)] px-3 py-1 text-[#c084fc]">
                {staking.status.replace('_', ' ')}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">Phase {staking.phase}</span>
              <span className="rounded-full border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.08)] px-3 py-1 text-[#4ade80]">
                {staking.fee_share_pct}% Fee Share
              </span>
            </div>
            <h2 className="sec-title mt-4" style={{ fontSize: '32px' }}>
              Stake {staking.token} <em>Coming Soon</em>
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-sm text-ink-dim sm:text-base">{staking.description}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {staking.features.map((f) => (
                <li key={f} className="flex items-center gap-2 rounded-lg border border-border bg-white/[0.02] px-4 py-3 font-sans text-sm text-ink">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#a855f7]" />
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
