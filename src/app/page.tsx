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
    description: '20 tiers from $0.0005 to $0.01. Fixed supply of 100 billion tokens. No VC allocation. Listing target: $0.50.',
    stats: ['20 Tiers', '$0.0005 Start', '100B Supply'],
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
    description: 'Share your referral link. Your friend gets a 30% bonus on their purchase. You earn 15%. Split: 30% FDP tokens + 70% Terminal Credits.',
    stats: ['Buyer: 30%', 'Referrer: 15%', '70% Credits'],
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
    description: 'Each tier unlocks independently at TGE. Tier 1 buyers receive tokens first. 5% unlocked at TGE, rest vests monthly. No cliff.',
    stats: ['5% TGE', 'Per-Tier Unlock', 'No Cliff'],
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

  const banners = cmsBanners.length > 0 ? cmsBanners : DEFAULT_BANNERS;

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
