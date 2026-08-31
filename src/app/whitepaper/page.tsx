import type { Metadata } from 'next';
import { BuyButton, Container, Pill, Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';

export const metadata: Metadata = { title: 'Whitepaper' };

const SECTIONS = [
  {
    title: '1. Overview',
    body: 'FlowDex Protocol is building a Universal Exchange — a single, non-custodial interface for trading crypto, tokenized stocks, forex, and commodities — alongside an AI-powered Intelligence Terminal and FlowChain, our upcoming Layer 1 blockchain. $FDP is the utility token that powers fee sharing, governance, and priority access across the ecosystem.',
  },
  {
    title: '2. The $FDP Token',
    body: 'Total supply: 10,000,000,000 $FDP. 22.5% of supply is allocated to the presale across 8 tiers, priced from $0.001 up to the $0.05 listing price. No VC allocation — 75% of supply is reserved for the community, staking rewards, and airdrops.',
  },
  {
    title: '3. Presale Mechanics',
    body: 'Each tier has a fixed price and hard cap in USD. When a tier’s cap is reached, the next tier opens automatically at a higher price. Every purchase locks in the price at time of payment. Tokens vest per-tier: a percentage unlocks at TGE, with the remainder released linearly after a cliff period.',
  },
  {
    title: '4. Token Utility',
    body: 'Staking $FDP earns a share of protocol trading fees (targeting 40% of all fees to stakers), grants governance voting rights on protocol upgrades and treasury allocation, and gives priority order routing. In Phase 3, staking $FDP also secures FlowChain as a validator.',
  },
  {
    title: '5. Referral Program',
    body: 'Every wallet that connects receives a unique referral code. Referrers earn a 30% bonus on purchases made through their link, split between $FDP tokens and Terminal Credits; the referred buyer earns a 15% bonus on their own purchase.',
  },
  {
    title: '6. Roadmap',
    body: 'The presale and staking teaser are live today. Subsequent phases bring the Universal Exchange, the Intelligence Terminal, and ultimately FlowChain itself. See the full roadmap for phase-by-phase detail.',
  },
  {
    title: '7. Risk Disclosure',
    body: '$FDP is a utility token, not a security or investment contract. Cryptocurrency purchases carry risk, including total loss of funds. Presale tokens are subject to vesting and may not be immediately liquid. Nothing in this document is financial advice.',
  },
];

export default function WhitepaperPage() {
  return (
    <>
      <section className="bg-radial-glow py-14 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <Pill tone="neutral" className="mb-5">
              Living document — updated as the protocol evolves
            </Pill>
            <h1 className="text-3xl font-bold text-ink sm:text-5xl">
              FlowDex Protocol <span className="text-primary">Whitepaper</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-dim sm:text-lg">
              A summary of the protocol, the $FDP token, and how the presale works. A full downloadable PDF is coming
              soon.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl space-y-10">
          {SECTIONS.map((s) => (
            <Reveal key={s.title}>
              <h2 className="text-xl font-bold text-ink sm:text-2xl">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim sm:text-base">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <BuyButton />
        </div>
      </Section>
    </>
  );
}
