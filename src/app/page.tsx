import { getCmsBanners } from '@/lib/api';
import BannerSlider from '@/components/BannerSlider';
import Hero from '@/components/Hero';
import PresaleVestingSection from '@/components/PresaleVestingSection';
import MetricsBar from '@/components/MetricsBar';
import EcosystemSection from '@/components/EcosystemSection';
import TokenUtilitySection from '@/components/TokenUtilitySection';
import GrowthPotentialSection from '@/components/GrowthPotentialSection';
import ReferralSection from '@/components/ReferralSection';
import FaqSection from '@/components/FaqSection';
import FinalCta from '@/components/FinalCta';

export default async function HomePage() {
  const banners = await getCmsBanners().catch(() => []);

  return (
    <>
      <BannerSlider banners={banners} />
      <Hero />
      <PresaleVestingSection />
      <MetricsBar />
      <EcosystemSection />
      <TokenUtilitySection />
      <GrowthPotentialSection />
      <ReferralSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
