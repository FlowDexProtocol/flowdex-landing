import type { Metadata } from 'next';
import { cms, fetchPageContent } from '@/lib/cms';
import { Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import { fadeUp } from '@/lib/motion';

const ROADMAP_DESCRIPTION =
  'See the FlowDex Protocol roadmap — from presale and Universal Exchange launch to the AI Intelligence Terminal and FlowChain Layer 1.';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: ROADMAP_DESCRIPTION,
  openGraph: { title: 'Roadmap — FlowDex Protocol', description: ROADMAP_DESCRIPTION },
  twitter: { title: 'Roadmap — FlowDex Protocol', description: ROADMAP_DESCRIPTION },
};

// Batch 1 seeded 4 CMS phases (roadmap.phase_1..phase_4) — these drive the
// first 4 entries below, with this array's values as the per-phase fallback.
// The 5th entry ("Full Ecosystem") wasn't seeded, so it stays purely
// hardcoded, appended after the CMS-driven ones.
const CMS_PHASES = [
  {
    key: 'phase_1',
    phase: 'Phase 1',
    title: 'Foundation',
    time: 'Q4 2026',
    status: 'active',
    items: ['Whitepaper v8.0', 'Website launch', 'Community building', 'Smart contract audits', 'Partnership development'],
  },
  {
    key: 'phase_2',
    phase: 'Phase 2',
    title: 'Presale & Launch',
    time: 'Q1 2027',
    status: 'upcoming',
    items: ['20-tier presale', '$FDP ERC-20 deployment', 'Per-tier TGEs', 'Ethereum aggregator', 'Staking launch', 'DEX/CEX listings'],
  },
  {
    key: 'phase_3',
    phase: 'Phase 3',
    title: 'Multi-Chain',
    time: 'Q2-Q3 2027',
    status: 'planned',
    items: ['BSC, Solana, Arbitrum, Polygon', '500+ tradable assets', 'Options & futures', 'Mobile app', 'Institutional API'],
  },
  {
    key: 'phase_4',
    phase: 'Phase 4',
    title: 'FlowChain',
    time: '2028-2029',
    status: 'future',
    items: ['FlowChain L1 testnet & mainnet', 'Validator onboarding', '50,000+ TPS', 'Cross-asset margin'],
  },
];

const TRAILING_PHASE = {
  phase: 'Phase 5',
  title: 'Maturity',
  time: '2029+',
  active: false,
  items: ['500+ validators', 'Full DAO handoff', 'Prediction markets', 'Institutional prime brokerage'],
};

export default async function RoadmapPage() {
  const cmsData = await fetchPageContent('roadmap');

  const phases = [
    ...CMS_PHASES.map((p) => {
      const itemsRaw = cms(cmsData, p.key, 'items', p.items.join(','));
      return {
        phase: p.phase,
        title: cms(cmsData, p.key, 'title', p.title),
        time: cms(cmsData, p.key, 'timeline', p.time),
        active: cms(cmsData, p.key, 'status', p.status) === 'active',
        items: itemsRaw
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean),
      };
    }),
    TRAILING_PHASE,
  ];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-glow" />
        <Reveal>
          <h1>
            Our <em>Roadmap</em>
          </h1>
          <p>The path from presale to a full multi-asset trading ecosystem. Timelines are targets, not guarantees.</p>
        </Reveal>
      </div>

      <Section>
        <div className="rm-timeline" style={{ maxWidth: 720 }}>
          <div className="rm-line" />
          {phases.map((p, i) => (
            <Reveal key={p.phase} variants={fadeUp} delay={i * 0.06} as="div" className={`rm-phase${p.active ? ' active' : ''}`}>
              <div className="rm-dot" />
              {p.active && <span className="rm-badge">Current</span>}
              <h4>
                {p.phase} — {p.title}
              </h4>
              <p style={{ marginBottom: '10px' }}>{p.time}</p>
              <ul className="space-y-1.5">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-sans text-[13px] text-ink-faint">
                    <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${p.active ? 'bg-[#6c5ce7]' : 'bg-white/20'}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
