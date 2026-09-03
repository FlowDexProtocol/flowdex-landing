import { getTierCurrent } from '@/lib/api';
import { cms, fetchPageContent } from '@/lib/cms';
import { Container, GlassCard, SectionHeading, VestingTimeline } from './ui';

export default async function PresaleVestingSection() {
  const [tier, cmsData] = await Promise.all([getTierCurrent().catch(() => null), fetchPageContent('home')]);
  const presaleLive = !!tier && !tier.message;

  if (!presaleLive) return null;

  return (
    <section className="border-y border-border bg-bg-soft py-14 sm:py-20">
      <Container>
        <SectionHeading
          title={cms(cmsData, 'vesting', 'label', 'Presale Vesting')}
          subtitle="5% at TGE. The rest unlocks over time — earlier tiers get the lowest price but the longest vesting."
        />

        <GlassCard className="mx-auto max-w-2xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {tier.name}: {tier.tge_percentage}% TGE | {tier.cliff_months}-month Cliff | {tier.vest_months}-month Vest
          </p>
          <p className="mt-2 text-sm text-ink-dim sm:text-base">
            Your tokens unlock over {tier.cliff_months + tier.vest_months} months. {tier.tge_percentage}% available at TGE.
          </p>
          <VestingTimeline
            className="mt-6"
            tgePct={tier.tge_percentage}
            cliffMonths={tier.cliff_months}
            vestMonths={tier.vest_months}
          />
          <p className="mt-6 text-xs text-ink-faint">
            {cms(
              cmsData,
              'vesting',
              'description',
              'Each tier has different vesting terms. Earlier tiers have longer vesting but the lowest price.'
            )}
          </p>
        </GlassCard>
      </Container>
    </section>
  );
}
