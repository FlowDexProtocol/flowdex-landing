import { getPublicScenarios, getTierCurrent } from '@/lib/api';
import { formatCompactUSD, formatPercentage, formatTokenPrice, toNum } from '@/lib/format';
import { cms, fetchPageContent } from '@/lib/cms';
import { BuyButton, Container, Pill, SectionHeading } from './ui';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';
import { scaleIn } from '@/lib/motion';

const SAMPLE_INVESTMENT = 500;

const ESCALATION = [
  { text: 'text-lg', border: 'border-border', glow: '', elevate: '' },
  { text: 'text-xl', border: 'border-border', glow: '', elevate: '' },
  { text: 'text-2xl', border: 'border-primary/40', glow: '', elevate: '' },
  { text: 'text-3xl', border: 'border-primary', glow: 'shadow-[0_0_30px_rgba(98,126,234,0.15)]', elevate: '' },
  { text: 'text-4xl', border: 'border-green', glow: 'shadow-[0_0_40px_rgba(0,255,136,0.2)]', elevate: '-translate-y-2' },
];

export default async function GrowthPotentialSection() {
  const [tier, scenarios, cmsData] = await Promise.all([
    getTierCurrent().catch(() => null),
    getPublicScenarios().catch(() => null),
    fetchPageContent('home'),
  ]);

  if (!scenarios || scenarios.scenarios.length === 0) return null;

  const presaleLive = !!tier && !tier.message;
  const tierPrice = presaleLive ? toNum(tier.price) : scenarios.listing_price;
  const tokens = tierPrice > 0 ? SAMPLE_INVESTMENT / tierPrice : 0;
  const dynamicSubtitle = `Based on a $${SAMPLE_INVESTMENT} investment at ${presaleLive ? tier.name : 'the current'} price. For illustration only.`;

  return (
    <Container className="py-14 sm:py-20">
      <SectionHeading
        title={cms(cmsData, 'scenarios', 'title', 'What Could Your $FDP Be Worth?')}
        subtitle={cmsData['scenarios.subtitle'] || dynamicSubtitle}
      />

      <StaggerGroup
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0"
        staggerDelay={0.08}
      >
        {scenarios.scenarios.map((s, i) => {
          const style = ESCALATION[Math.min(i, ESCALATION.length - 1)];
          const value = tokens * s.price;
          const roi = ((value - SAMPLE_INVESTMENT) / SAMPLE_INVESTMENT) * 100;
          return (
            <StaggerItem key={s.label} variants={scaleIn} className={`w-[70vw] shrink-0 snap-center sm:w-auto ${style.elevate}`}>
              <div className={`h-full rounded-xl border bg-card p-5 text-center ${style.border} ${style.glow}`}>
                <Pill tone="neutral" className="mb-3">
                  {s.label}
                </Pill>
                <div className={`font-mono font-extrabold text-green ${style.text}`}>{formatCompactUSD(value)}</div>
                <div className="mt-2 space-y-0.5 text-xs text-ink-faint">
                  <div>$FDP price: {formatTokenPrice(s.price)}</div>
                  <div>Market cap: {formatCompactUSD(s.mcap)}</div>
                </div>
                <Pill tone="green" className="mt-3">
                  {formatPercentage(roi)}
                </Pill>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <p className="mt-6 text-center text-xs text-ink-faint">
        {cms(
          cmsData,
          'scenarios',
          'disclaimer',
          'These projections are illustrative only and are not a guarantee of future performance.'
        )}
      </p>
      <div className="mt-5 flex justify-center">
        <BuyButton />
      </div>
    </Container>
  );
}
