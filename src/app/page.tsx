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
import type { CmsBanner } from '@/lib/types';

const DEFAULT_BANNERS: CmsBanner[] = [
  {
    id: -1,
    title: 'FDP Presale Is Live — Tier 1 Starting at $0.0005',
    subtitle: 'PRESALE NOW OPEN',
    cta_text: 'Buy FDP',
    cta_link: null,
    image_url: null,
    image_url_desktop: null,
    image_url_mobile: null,
    countdown_end: null,
    show_countdown: false,
    bg_color: null,
    bg_style: 'bs1',
    sort_order: 1,
    is_active: true,
  },
  {
    id: -2,
    title: 'Refer Friends, Earn 15% — They Get 30% Bonus',
    subtitle: 'REFERRAL PROGRAM',
    cta_text: 'Buy FDP',
    cta_link: null,
    image_url: null,
    image_url_desktop: null,
    image_url_mobile: null,
    countdown_end: null,
    show_countdown: false,
    bg_color: null,
    bg_style: 'bs2',
    sort_order: 2,
    is_active: true,
  },
  {
    id: -3,
    title: 'Per-Tier TGE — Early Buyers Unlock First',
    subtitle: 'TOKEN GENERATION EVENT',
    cta_text: 'Buy FDP',
    cta_link: null,
    image_url: null,
    image_url_desktop: null,
    image_url_mobile: null,
    countdown_end: null,
    show_countdown: false,
    bg_color: null,
    bg_style: 'bs3',
    sort_order: 3,
    is_active: true,
  },
];

export default async function HomePage() {
  const [cmsBanners, cmsHome, cmsGlobal] = await Promise.all([
    getCmsBanners().catch(() => [] as CmsBanner[]),
    fetchPageContent('home'),
    fetchPageContent('global'),
  ]);

  const banners = DEFAULT_BANNERS; // TODO: switch back to cmsBanners when CMS is updated

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
