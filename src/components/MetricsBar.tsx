import { getPublicScenarios, getPublicStats, getTierCurrent } from '@/lib/api';
import { formatTokenPrice, toNum } from '@/lib/format';
import { cms, fetchPageContent } from '@/lib/cms';
import CountUp from './motion/CountUp';
import Reveal from './motion/Reveal';
import { fadeUp } from '@/lib/motion';

export default async function MetricsBar() {
  const [tier, scenarios, cmsData, stats] = await Promise.all([
    getTierCurrent().catch(() => null),
    getPublicScenarios().catch(() => null),
    fetchPageContent('home'),
    getPublicStats().catch(() => null),
  ]);

  const presaleLive = !!tier && !tier.message;
  const raised = stats ? toNum(stats.total_raised_usd) : presaleLive ? toNum(tier.total_raised_usd) : 0;
  const price = presaleLive ? toNum(tier.price) : 0;
  const listingPrice = scenarios?.listing_price ?? 0.05;
  const roi = price > 0 ? ((listingPrice - price) / price) * 100 : 0;

  const metrics = [
    {
      label: cms(cmsData, 'metrics', 'label_1', 'Total Raised'),
      value: <CountUp value={raised} prefix="$" compact className="metric-val" />,
    },
    {
      label: cms(cmsData, 'metrics', 'label_2', 'Current Price'),
      value: <span className="metric-val">{formatTokenPrice(price)}</span>,
    },
    {
      label: cms(cmsData, 'metrics', 'label_3', 'Listing Price'),
      value: <span className="metric-val">{formatTokenPrice(listingPrice)}</span>,
    },
    {
      label: cms(cmsData, 'metrics', 'label_4', 'ROI at Listing'),
      value: <CountUp value={roi} prefix={roi >= 0 ? '+' : ''} suffix="%" className="metric-val" />,
    },
    {
      label: cms(cmsData, 'metrics', 'label_5', 'Current Tier'),
      value: <span className="metric-val">{presaleLive ? tier.name : stats?.current_tier?.name ?? 'TBA'}</span>,
    },
  ];

  return (
    <Reveal variants={fadeUp} as="div" className="metrics-bar">
      {metrics.map((m) => (
        <div key={m.label} className="metric">
          {m.value}
          <div className="metric-label">{m.label}</div>
        </div>
      ))}
    </Reveal>
  );
}
