import { getTierCurrent } from '@/lib/api';
import { cms, fetchPageContent } from '@/lib/cms';
import { Section, SectionHeading } from './ui';
import Reveal from './motion/Reveal';
import { fadeUp } from '@/lib/motion';

export default async function PresaleVestingSection() {
  const [tier, cmsData] = await Promise.all([getTierCurrent().catch(() => null), fetchPageContent('home')]);
  const presaleLive = !!tier && !tier.message;

  if (!presaleLive) return null;

  const tgeFlex = 8;
  const cliffFlex = Math.max(tier.cliff_months, 1);
  const vestFlex = Math.max(tier.vest_months, 1);

  return (
    <Section id="vesting">
      <SectionHeading
        label="Vesting"
        title={cms(cmsData, 'vesting', 'label', 'Presale Vesting')}
        subtitle={cms(
          cmsData,
          'vesting',
          'description',
          'Each tier has different vesting terms. Earlier tiers have longer vesting but the lowest price.'
        )}
      />

      <Reveal variants={fadeUp}>
        <div className="vbar">
          <div className="vb-seg vb-tge" style={{ flex: tgeFlex }}>
            {tier.tge_percentage}% TGE
          </div>
          <div className="vb-seg vb-cliff" style={{ flex: cliffFlex }}>
            {tier.cliff_months}mo Cliff
          </div>
          <div className="vb-seg vb-vest" style={{ flex: vestFlex }}>
            {tier.vest_months}mo Vest
          </div>
        </div>
        <div className="vlabels">
          <span>{tier.name}</span>
          <span>
            {tier.tge_percentage}% at TGE, remainder over {tier.cliff_months + tier.vest_months} months
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
