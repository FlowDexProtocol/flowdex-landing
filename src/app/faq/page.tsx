import type { Metadata } from 'next';
import { getCmsFaqs } from '@/lib/api';
import { Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import FaqAccordionGroup from '@/components/FaqAccordionGroup';

const FAQ_DESCRIPTION = 'Frequently asked questions about $FDP, the FlowDex Protocol presale, tiers, staking, and the Universal Exchange.';

export const metadata: Metadata = {
  title: 'FAQ',
  description: FAQ_DESCRIPTION,
  openGraph: { title: 'FAQ — FlowDex Protocol', description: FAQ_DESCRIPTION },
  twitter: { title: 'FAQ — FlowDex Protocol', description: FAQ_DESCRIPTION },
};

export default async function FaqPage() {
  const faqs = await getCmsFaqs().catch(() => []);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-glow" />
        <Reveal>
          <h1>
            Frequently Asked <em>Questions</em>
          </h1>
          <p>Everything you need to know about the $FDP presale and the FlowDex Protocol ecosystem.</p>
        </Reveal>
      </div>

      <Section>
        {faqs.length === 0 ? (
          <p className="text-center font-sans text-sm text-ink-faint">No FAQs published yet — check back soon.</p>
        ) : (
          <FaqAccordionGroup faqs={faqs} />
        )}

        <div className="mt-14 flex justify-center">
          <a href="https://purchase.flowdexprotocol.com" target="_blank" rel="noopener noreferrer" className="pill">
            Buy $FDP
          </a>
        </div>
      </Section>
    </>
  );
}
