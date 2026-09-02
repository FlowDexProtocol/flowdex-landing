import type { Metadata } from 'next';
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

const PHASES = [
  {
    phase: 'Phase 0',
    time: 'Foundation',
    title: 'Foundation',
    active: true,
    items: ['Whitepaper', 'Per-tier TGE design', 'Security audit', 'Community building'],
  },
  {
    phase: 'Phase 1',
    time: 'Presale',
    title: 'Presale',
    active: true,
    items: ['8-tier presale', '$FDP token launch', 'Staking teaser', 'Referral program'],
  },
  {
    phase: 'Phase 2',
    time: 'Expansion',
    title: 'Multi-Asset Trading',
    items: ['Universal Exchange launch', 'Cross-chain routing', 'Intelligence Terminal beta', 'Mobile app'],
  },
  {
    phase: 'Phase 3',
    time: 'FlowChain',
    title: 'FlowChain',
    items: ['Layer 1 appchain launch', 'Validator staking', '40% fee sharing live', 'Governance DAO'],
  },
  {
    phase: 'Phase 4',
    time: 'Maturity',
    title: 'Full Ecosystem',
    items: ['500+ tradable assets', 'Structured products', 'Full decentralized governance', 'Global expansion'],
  },
];

export default function RoadmapPage() {
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
          {PHASES.map((p) => (
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
