import type { Metadata } from 'next';
import { getCmsFaqs } from '@/lib/api';
import { Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import FaqAccordionGroup from '@/components/FaqAccordionGroup';
import { htmlToPlainText, safeJsonLd, SITE_URL } from '@/lib/json-ld';
import type { CmsFaq } from '@/lib/types';

const FAQ_DESCRIPTION = 'Frequently asked questions about FDP, the FlowDex Protocol presale, tiers, staking, and the Universal Exchange.';

export const metadata: Metadata = {
  title: 'FAQ',
  description: FAQ_DESCRIPTION,
  openGraph: { title: 'FAQ — FlowDex Protocol', description: FAQ_DESCRIPTION },
  twitter: { title: 'FAQ — FlowDex Protocol', description: FAQ_DESCRIPTION },
};

// FAQPage markup turns each question into an independently extractable
// unit. Answers are flattened from the rich-text editor's HTML: schema.org
// allows a limited HTML subset in acceptedAnswer.text, but admin-authored
// markup is not guaranteed to stay inside it, and plain text extracts more
// cleanly. Entries missing either side are dropped rather than emitted
// half-empty.
function faqJsonLd(faqs: CmsFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/faq#faqpage`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: faqs
      .map((faq) => ({
        question: htmlToPlainText(faq.question),
        answer: htmlToPlainText(faq.answer),
      }))
      .filter((faq) => faq.question && faq.answer)
      .map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
  };
}

export default async function FaqPage() {
  const faqs = await getCmsFaqs().catch(() => []);
  const jsonLd = faqs.length > 0 ? faqJsonLd(faqs) : null;

  return (
    <>
      {jsonLd && jsonLd.mainEntity.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      )}
      <div className="page-hero">
        <div className="page-hero-glow" />
        <Reveal>
          <h1>
            Frequently Asked <em>Questions</em>
          </h1>
          <p>Everything you need to know about the FDP presale and the FlowDex Protocol ecosystem.</p>
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
            Buy FDP
          </a>
        </div>
      </Section>
    </>
  );
}
