import { getPublicScenarios, getPublicStats, getTierCurrent } from '@/lib/api';
import { formatTokenPrice, toNum } from '@/lib/format';
import { cms, fetchPageContent } from '@/lib/cms';
import { Container } from './ui';
import CountUp from './motion/CountUp';

export default async function MetricsBar() {
  const [tier, scenarios, cmsData, stats] = await Promise.all([
    getTierCurrent().catch(() => null),
    getPublicScenarios().catch(() => null),
    fetchPageContent('home'),
    getPublicStats().catch(() => null),
  ]);

  const presaleLive = !!tier && !tier.message;
  const raised = presaleLive ? toNum(tier.total_raised_usd) : 0;
  const price = presaleLive ? toNum(tier.price) : 0;
  const listingPrice = scenarios?.listing_price ?? 0.05;
  const roi = price > 0 ? ((listingPrice - price) / price) * 100 : 0;

  const metrics = [
    {
      label: cms(cmsData, 'metrics', 'label_1', 'Total Raised'),
      value: <CountUp value={raised} prefix="$" compact className="font-mono text-2xl font-extrabold text-green sm:text-3xl" />,
    },
    {
      label: cms(cmsData, 'metrics', 'label_2', 'Current Price'),
      value: <span className="font-mono text-2xl font-extrabold text-primary sm:text-3xl">{formatTokenPrice(price)}</span>,
    },
    {
      label: cms(cmsData, 'metrics', 'label_3', 'Listing Price'),
      value: <span className="font-mono text-2xl font-extrabold text-ink sm:text-3xl">{formatTokenPrice(listingPrice)}</span>,
    },
    {
      label: cms(cmsData, 'metrics', 'label_4', 'ROI at Listing'),
      value: (
        <CountUp
          value={roi}
          prefix={roi >= 0 ? '+' : ''}
          suffix="%"
          className="font-mono text-2xl font-extrabold text-green sm:text-3xl"
        />
      ),
    },
    {
      label: 'Wallets Connected',
      value:
        stats && stats.total_buyers > 0 ? (
          <CountUp value={stats.total_buyers} className="font-mono text-2xl font-extrabold text-primary sm:text-3xl" />
        ) : (
          <span className="text-sm font-semibold text-ink-dim sm:text-base">Be among the first</span>
        ),
    },
  ];

  return (
    <div className="border-y border-border bg-bg-soft py-8">
      <Container>
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-5 sm:divide-x sm:divide-border">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-ink-faint">{m.label}</div>
              {m.value}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
