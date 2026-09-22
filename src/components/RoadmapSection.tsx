import Link from 'next/link';
import { cms, fetchPageContent } from '@/lib/cms';
import { Section, SectionHeading } from './ui';
import Reveal from './motion/Reveal';
import { fadeUp } from '@/lib/motion';

const CMS_PHASES = [
  { key: 'phase_1', phase: 'Phase 1', title: 'Foundation', time: 'Q3-Q4 2026', status: 'active' },
  { key: 'phase_2', phase: 'Phase 2', title: 'Exchange Launch', time: 'Q1-Q2 2027', status: 'upcoming' },
  { key: 'phase_3', phase: 'Phase 3', title: 'Intelligence', time: 'Q3-Q4 2027', status: 'planned' },
  { key: 'phase_4', phase: 'Phase 4', title: 'FlowChain', time: '2028+', status: 'future' },
];

export default async function RoadmapSection() {
  const cmsData = await fetchPageContent('roadmap');

  const phases = CMS_PHASES.map((p) => ({
    phase: p.phase,
    title: cms(cmsData, p.key, 'title', p.title),
    time: cms(cmsData, p.key, 'timeline', p.time),
    active: cms(cmsData, p.key, 'status', p.status) === 'active',
  }));

  return (
    <Section id="roadmap">
      <SectionHeading label="Roadmap" title="Where We're Headed" subtitle="Four phases from presale to a full multi-asset trading ecosystem." />

      <div className="rm-timeline">
        <div className="rm-line" />
        {phases.map((p, i) => (
          <Reveal key={p.phase} variants={fadeUp} delay={i * 0.06} as="div" className={`rm-phase${p.active ? ' active' : ''}`}>
            <div className="rm-dot" />
            {p.active && <span className="rm-badge">Current</span>}
            <h4>
              {p.phase} — {p.title}
            </h4>
            <p>{p.time}</p>
          </Reveal>
        ))}
      </div>

      <div className="rm-cta">
        <Link href="/roadmap" className="pill pill-ghost">
          View Full Roadmap
        </Link>
      </div>
    </Section>
  );
}
