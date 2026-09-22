import { cms, fetchPageContent } from '@/lib/cms';
import { Section, SectionHeading } from './ui';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';
import CmsMedia from './CmsMedia';

const CARDS = [
  {
    key: 'ecosystem_1',
    title: 'Universal Exchange',
    description:
      'Trade crypto, stocks, forex, and commodities from one interface. Cross-chain routing scans every DEX and liquidity source to find the best price. One platform for every market.',
    tags: ['Cross-Chain', 'Multi-Asset', 'Best Price'],
    icon: <path d="M4 17V7l6 5 4-8 6 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    key: 'ecosystem_2',
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
    key: 'ecosystem_3',
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
    key: 'ecosystem_4',
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
    key: 'ecosystem_5',
    title: 'Smart Order Routing',
    description:
      'Our routing engine compares prices across 100+ DEXs and liquidity pools in real-time. Every trade gets the best execution with the lowest slippage and fees.',
    tags: ['100+ DEXs', 'Low Slippage', 'Auto-Route'],
    icon: <path d="M4 6h10a4 4 0 0 1 0 8H8m0 0 3-3m-3 3 3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    key: 'ecosystem_6',
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

export default async function EcosystemSection() {
  const cmsData = await fetchPageContent('home');

  return (
    <Section id="ecosystem">
      <SectionHeading
        label="Ecosystem"
        title={cms(cmsData, 'ecosystem', 'title', 'The FlowDex Ecosystem')}
        subtitle={cms(cmsData, 'ecosystem', 'subtitle', 'A complete DeFi infrastructure for the next generation of finance.')}
      />

      <StaggerGroup className="eco-grid">
        {CARDS.map((card) => {
          const title = cms(cmsData, card.key, 'title', card.title);
          const description = cms(cmsData, card.key, 'description', card.description);
          const tagsRaw = cms(cmsData, card.key, 'tags', card.tags.join(','));
          const tags = tagsRaw
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
          const imageUrl = cms(cmsData, card.key, 'image_url', '');

          return (
            <StaggerItem key={card.key}>
              <div className="eco-card">
                <div className="eco-img">
                  <CmsMedia
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover"
                    fallback={
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)">
                        {card.icon}
                      </svg>
                    }
                  />
                </div>
                <div className="eco-body">
                  <h4>{title}</h4>
                  <p>{description}</p>
                  <div className="eco-tags">
                    {tags.map((tag) => (
                      <span key={tag} className="eco-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
