import { fetchPageContent } from '@/lib/cms';
import { resolveAllocation } from '@/lib/tokenomics';
import { Section, SectionHeading } from './ui';
import TokenomicsDonut from './TokenomicsDonut';

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
      <div className="donut-wrap">
        <TokenomicsDonut allocation={allocation} />
      </div>
    </Section>
  );
}
