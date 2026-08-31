import type { Metadata } from 'next';
import { getCmsFaqs } from '@/lib/api';
import { BuyButton, Container, Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import FaqAccordionGroup from '@/components/FaqAccordionGroup';

export const metadata: Metadata = { title: 'FAQ' };

export default async function FaqPage() {
  const faqs = await getCmsFaqs().catch(() => []);

  return (
    <>
      <section className="bg-radial-glow py-14 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-3xl font-bold text-ink sm:text-5xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-dim sm:text-lg">
              Everything you need to know about the $FDP presale and the FlowDex Protocol ecosystem.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section>
        {faqs.length === 0 ? (
          <p className="text-center text-sm text-ink-faint">No FAQs published yet — check back soon.</p>
        ) : (
          <FaqAccordionGroup faqs={faqs} />
        )}

        <div className="mt-14 flex justify-center">
          <BuyButton />
        </div>
      </Section>
    </>
  );
}
