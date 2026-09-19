import Link from 'next/link';
import { getCmsFaqs } from '@/lib/api';
import { Section, SectionHeading } from './ui';
import FaqSectionClient from './FaqSectionClient';

const FALLBACK_FAQS = [
  {
    id: -1,
    question: 'What is FlowDex Protocol?',
    answer:
      'FlowDex is a DeFi platform combining a Universal Exchange for trading all asset classes with an AI-powered Intelligence Terminal for market analytics, plus FlowChain — our upcoming Layer 1 blockchain. $FDP is the utility token powering the entire ecosystem.',
  },
  {
    id: -2,
    question: 'How do I buy $FDP?',
    answer: 'Connect any wallet (MetaMask, Trust Wallet, Coinbase, or others), choose your payment currency, enter your amount, and send. No KYC required. No minimum purchase.',
  },
  { id: -3, question: 'What is the listing price?', answer: '$0.05 per $FDP. Tier 1 buyers get a 98% discount at $0.001.' },
  {
    id: -4,
    question: 'When is TGE?',
    answer:
      'TGE date will be announced after the presale. Each tier has its own TGE percentage — Tier 1 gets 5% at TGE with the rest vesting over 24 months after a 12-month cliff.',
  },
  { id: -5, question: 'Is there a minimum purchase?', answer: 'No minimum. Buy any amount.' },
  {
    id: -6,
    question: 'Is there a referral program?',
    answer:
      'Yes. Earn 15% of what your friend spends when you refer them. Your friend earns a 30% bonus on their purchase. Both bonuses split 70% Terminal Credits and 30% $FDP tokens.',
  },
];

export default async function FaqSection() {
  const faqs = await getCmsFaqs().catch(() => []);
  const items = (faqs.length > 0 ? faqs : FALLBACK_FAQS).slice(0, 8);

  return (
    <Section id="faq">
      <SectionHeading label="FAQ" title="Frequently Asked Questions" />

      <div className="mx-auto max-w-2xl">
        <FaqSectionClient items={items} />
        <div className="mt-6 text-center">
          <Link href="/faq" className="pill pill-ghost">
            View All FAQs
          </Link>
        </div>
      </div>
    </Section>
  );
}
