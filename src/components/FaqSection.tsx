'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, SectionHeading } from './ui';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';

const FAQS = [
  {
    q: 'What is FlowDex Protocol?',
    a: 'FlowDex is a DeFi platform combining a Universal Exchange for trading all asset classes with an AI-powered Intelligence Terminal for market analytics, plus FlowChain — our upcoming Layer 1 blockchain. $FDP is the utility token powering the entire ecosystem.',
  },
  {
    q: 'How do I buy $FDP?',
    a: 'Connect any wallet (MetaMask, Trust Wallet, Coinbase, or others), choose your payment currency, enter your amount, and send. No KYC required. No minimum purchase.',
  },
  { q: 'What is the listing price?', a: '$0.05 per $FDP. Tier 1 buyers get a 98% discount at $0.001.' },
  {
    q: 'When is TGE?',
    a: 'TGE date will be announced after the presale. Each tier has its own TGE percentage — Tier 1 gets 5% at TGE with the rest vesting over 24 months after a 12-month cliff.',
  },
  { q: 'Is there a minimum purchase?', a: 'No minimum. Buy any amount.' },
  {
    q: 'Is there a referral program?',
    a: 'Yes. Earn 15% of what your friend spends when you refer them. Your friend earns a 30% bonus on their purchase. Both bonuses split 70% Terminal Credits and 30% $FDP tokens.',
  },
  {
    q: 'What chains are supported?',
    a: 'Ethereum, BSC, Solana, Bitcoin, Tron, Arbitrum, Polygon, and Base.',
  },
  { q: 'Is the smart contract audited?', a: 'Audit is in progress. Full details will be published before TGE.' },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq">
      <SectionHeading title="Frequently Asked Questions" />

      <div className="mx-auto max-w-2xl">
        <StaggerGroup staggerDelay={0.04}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`mb-1 block w-full rounded-lg border px-5 py-4 text-left transition-colors ${
                    isOpen ? 'border-primary/25 bg-primary-dim' : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-ink sm:text-base">{item.q}</span>
                    <span className={`shrink-0 text-lg text-ink-faint transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </div>
                  {isOpen && <p className="mt-3 text-sm leading-relaxed text-ink-faint">{item.a}</p>}
                </button>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <div className="mt-6 text-center">
          <Link href="/faq" className="text-sm font-semibold text-primary hover:underline">
            View All FAQs →
          </Link>
        </div>
      </div>
    </Section>
  );
}
