import { Section, SectionHeading } from './ui';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';

const CARDS = [
  {
    title: 'Universal Exchange',
    description:
      'Trade crypto, stocks, forex, and commodities from one interface. Cross-chain routing scans every DEX and liquidity source to find the best price. One platform for every market.',
    tags: ['Cross-Chain', 'Multi-Asset', 'Best Price'],
    icon: (
      <path d="M4 17V7l6 5 4-8 6 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Blockchain Intelligence Terminal',
    description:
      'AI-powered market intelligence. Real-time whale tracking, pattern detection, predictive analytics, and smart alerts — all derived from live on-chain data.',
    tags: ['AI-Powered', 'Whale Tracking', 'Real-Time'],
    icon: (
      <>
        <circle cx="12" cy="9" r="5" strokeWidth="1.5" />
        <path d="M9 20h6M10 14v3M14 14v3" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'FlowChain — Layer 1 Blockchain',
    description:
      'Our own Layer 1 blockchain launching in Phase 3. Purpose-built for high-frequency trading and cross-chain settlement. $FDP holders become validators.',
    tags: ['Layer 1', 'Validators', 'Phase 3'],
    icon: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" strokeWidth="1.5" />
        <rect x="14" y="4" width="6" height="6" rx="1" strokeWidth="1.5" />
        <rect x="9" y="14" width="6" height="6" rx="1" strokeWidth="1.5" />
        <path d="M10 7h4M7 10v4M17 10v4" strokeWidth="1.5" />
      </>
    ),
  },
  {
    title: 'Staking & 40% Fee Sharing',
    description:
      'Stake $FDP to earn 40% of all protocol trading fees. Every trade across every market generates revenue that flows to stakers. Governance voting included.',
    tags: ['40% Fees', 'Governance', 'Passive Income'],
    icon: (
      <>
        <path d="M12 3v4M12 17v4M5 12H3M21 12h-2" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
      </>
    ),
  },
  {
    title: 'Smart Order Routing',
    description:
      'Our routing engine compares prices across 100+ DEXs and liquidity pools in real-time. Every trade gets the best execution with the lowest slippage and fees.',
    tags: ['100+ DEXs', 'Low Slippage', 'Auto-Route'],
    icon: (
      <path d="M4 6h10a4 4 0 0 1 0 8H8m0 0 3-3m-3 3 3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Unified Portfolio',
    description:
      'Track all your holdings across every chain in one dashboard. Real-time P&L, historical performance, and automated alerts on your positions.',
    tags: ['Multi-Chain', 'Real-Time P&L', 'Alerts'],
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" strokeWidth="1.5" />
        <path d="M7 15l3-4 3 2 4-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function EcosystemSection() {
  return (
    <Section id="ecosystem">
      <SectionHeading title="The FlowDex Ecosystem" subtitle="A complete DeFi infrastructure for the next generation of finance." />

      <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-2" staggerDelay={0.1}>
        {CARDS.map((card) => (
          <StaggerItem key={card.title}>
            <div className="group h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
              <div className="flex aspect-video items-center justify-center bg-card-hover">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" opacity="0.3">
                  {card.icon}
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-ink sm:text-xl">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-faint">{card.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs text-ink-faint">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
