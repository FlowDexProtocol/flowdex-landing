import { getCmsBanners } from '@/lib/api';
import { fetchPageContent } from '@/lib/cms';
import BannerSlider from '@/components/BannerSlider';
import TrustBar from '@/components/TrustBar';
import MetricsBar from '@/components/MetricsBar';
import Hero from '@/components/Hero';
import TabSection from '@/components/TabSection';
import HowToBuySection from '@/components/HowToBuySection';
import EcosystemSection from '@/components/EcosystemSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import TiersAccordionSection from '@/components/TiersAccordionSection';
import PresaleVestingSection from '@/components/PresaleVestingSection';
import TokenUtilitySection from '@/components/TokenUtilitySection';
import RoadmapSection from '@/components/RoadmapSection';
import ReferralSection from '@/components/ReferralSection';
import TeamSection from '@/components/TeamSection';
import FaqSection from '@/components/FaqSection';
import BlogPreviewSection from '@/components/BlogPreviewSection';
import EcoCtaSection from '@/components/EcoCtaSection';
import FinalCta from '@/components/FinalCta';

export default async function HomePage() {
  const [banners, cmsHome, cmsGlobal] = await Promise.all([
    getCmsBanners().catch(() => []),
    fetchPageContent('home'),
    fetchPageContent('global'),
  ]);

  return (
    <>
      <BannerSlider banners={banners} />
      <TrustBar />
      <MetricsBar />
      <Hero />
      <TabSection />
      <HowToBuySection />
      <EcosystemSection />
      <TokenomicsSection />
      <TiersAccordionSection />
      <PresaleVestingSection />
      <TokenUtilitySection />
      <RoadmapSection />
      <ReferralSection />
      <TeamSection />
      <FaqSection />
      <BlogPreviewSection />
      <EcoCtaSection />
      <FinalCta cmsHome={cmsHome} cmsGlobal={cmsGlobal} />
    </>
  );
}
