import { fetchPageContent } from '@/lib/cms';
import { resolveAllocation } from '@/lib/tokenomics';
import { Section, SectionHeading } from './ui';
import TokenomicsDonut from './TokenomicsDonut';
import Reveal from './motion/Reveal';
import { fadeUp } from '@/lib/motion';

export default async function TokenomicsSection() {
  const cmsData = await fetchPageContent('tokenomics');
  const allocation = resolveAllocation(cmsData);

  return (
    <Section id="tokenomics">
      <SectionHeading
        label="Tokenomics"
        title="10 Billion $FDP, No VC Allocation"
        subtitle="Every token is distributed for long-term sustainability — presale, liquidity, ecosystem, and community."
      />
      <Reveal variants={fadeUp} as="div" className="donut-wrap">
        <TokenomicsDonut allocation={allocation} />
      </Reveal>
    </Section>
  );
}
