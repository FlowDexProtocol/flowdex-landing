import type { Metadata } from 'next';
import { cms, fetchPageContent } from '@/lib/cms';
import { Container, Pill, Section } from '@/components/ui';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import Reveal from '@/components/motion/Reveal';

const ROADMAP_DESCRIPTION =
  'See the FlowDex Protocol roadmap — from presale and Universal Exchange launch to the AI Intelligence Terminal and FlowChain Layer 1.';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: ROADMAP_DESCRIPTION,
  openGraph: { title: 'Roadmap — FlowDex Protocol', description: ROADMAP_DESCRIPTION },
  twitter: { title: 'Roadmap — FlowDex Protocol', description: ROADMAP_DESCRIPTION },
};

// Batch 1 seeded 4 CMS phases (roadmap.phase_1..phase_4) — these drive the
// first 4 cards below, with this array's values as the per-phase fallback.
// The 5th card ("Full Ecosystem") wasn't seeded, so it stays purely
// hardcoded, appended after the CMS-driven ones.
const CMS_PHASES = [
  {
    key: 'phase_1',
    phase: 'Phase 1',
    title: 'Foundation',
    time: 'Q3-Q4 2026',
    status: 'active',
    items: ['Presale launch', 'Smart contract audit', 'Community building', 'Exchange listing preparation'],
  },
  {
    key: 'phase_2',
    phase: 'Phase 2',
    title: 'Exchange Launch',
    time: 'Q1-Q2 2027',
    status: 'upcoming',
    items: ['Universal Exchange beta', 'Cross-chain routing', 'DEX aggregation live', 'Token Generation Event'],
  },
  {
    key: 'phase_3',
    phase: 'Phase 3',
    title: 'Intelligence',
    time: 'Q3-Q4 2027',
    status: 'planned',
    items: ['Intelligence Terminal launch', 'AI analytics engine', 'Whale tracking', 'Staking launch'],
  },
  {
    key: 'phase_4',
    phase: 'Phase 4',
    title: 'FlowChain',
    time: '2028+',
    status: 'future',
    items: ['FlowChain L1 launch', 'Validator network', 'Full ecosystem deployment'],
  },
];

const TRAILING_PHASE = {
  phase: 'Phase 5',
  title: 'Full Ecosystem',
  time: 'Maturity',
  active: false,
  items: ['500+ tradable assets', 'Structured products', 'Full decentralized governance', 'Global expansion'],
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
      <section className="bg-radial-glow py-14 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-3xl font-bold text-ink sm:text-5xl">
              Our <span className="text-primary">Roadmap</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-dim sm:text-lg">
              The path from presale to a full multi-asset trading ecosystem. Timelines are targets, not guarantees.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section>
        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5" staggerDelay={0.08}>
          {phases.map((p) => (
            <StaggerItem key={p.phase}>
              <div
                className={`relative h-full rounded-xl border p-5 ${
                  p.active ? 'border-primary/40 bg-primary-dim' : 'border-border bg-card'
                }`}
              >
                {p.active && <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />}
                <div className={`text-xs font-bold uppercase tracking-widest ${p.active ? 'text-primary' : 'text-ink-faint'}`}>
                  {p.phase}
                </div>
                <div className="mt-0.5 text-xs text-ink-faint">{p.time}</div>
                <div className="mt-2 mb-3 text-base font-bold text-ink">{p.title}</div>
                <ul className="space-y-1.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-ink-faint">
                      <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${p.active ? 'bg-primary' : 'bg-ink-faint'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                {p.active && <Pill tone="primary" className="mt-4">In progress</Pill>}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>
    </>
  );
}
