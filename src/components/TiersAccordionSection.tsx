import { getTiers } from '@/lib/api';
import { cms, fetchPageContent } from '@/lib/cms';
import { Section, SectionHeading } from './ui';
import TiersAccordion from './TiersAccordion';
import Reveal from './motion/Reveal';
import { fadeUp } from '@/lib/motion';

export default async function TiersAccordionSection() {
  const [tiers, cmsData] = await Promise.all([getTiers().catch(() => []), fetchPageContent('home')]);

  if (tiers.length === 0) return null;

  return (
    <Section id="tiers">
      <SectionHeading
        label="Presale"
        title={cms(cmsData, 'tiers', 'title', '8 Presale Tiers')}
        subtitle={cms(cmsData, 'tiers', 'subtitle', 'Earlier tiers get the lowest price but the longest vesting. Later tiers cost more but unlock faster.')}
      />
      <Reveal variants={fadeUp}>
        <TiersAccordion tiers={tiers} />
      </Reveal>
    </Section>
  );
}
