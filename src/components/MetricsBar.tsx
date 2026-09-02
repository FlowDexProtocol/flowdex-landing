import { getPublicScenarios, getTierCurrent } from '@/lib/api';
import { toNum } from '@/lib/format';
import { Container } from './ui';
import CountUp from './motion/CountUp';

export default async function MetricsBar() {
  const [tier, scenarios] = await Promise.all([
    getTierCurrent().catch(() => null),
    getPublicScenarios().catch(() => null),
  ]);

  const presaleLive = !!tier && !tier.message;
  const raised = presaleLive ? toNum(tier.total_raised_usd) : 0;
  const price = presaleLive ? toNum(tier.price) : 0;
  const listingPrice = scenarios?.listing_price ?? 0.05;
  const roi = price > 0 ? ((listingPrice - price) / price) * 100 : 0;

  const metrics = [
    { label: 'Total Raised', value: <CountUp value={raised} prefix="$" className="font-mono text-2xl font-extrabold text-green sm:text-3xl" /> },
    { label: 'Current Price', value: <span className="font-mono text-2xl font-extrabold text-primary sm:text-3xl">${price.toFixed(price < 1 ? 4 : 2)}</span> },
    { label: 'Listing Price', value: <span className="font-mono text-2xl font-extrabold text-ink sm:text-3xl">${listingPrice.toFixed(2)}</span> },
    { label: 'ROI at Listing', value: <CountUp value={roi} prefix="+" suffix="%" className="font-mono text-2xl font-extrabold text-green sm:text-3xl" /> },
  ];

  return (
    <div className="border-y border-border bg-bg-soft py-8">
      <Container>
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-border">
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
