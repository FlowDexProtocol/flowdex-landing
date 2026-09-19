import type { Metadata } from 'next';
import { Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import { fetchWhitepaperUrl, resolveApiUrl } from '@/lib/cms';

const FALLBACK_PDF_URL = '/whitepaper.pdf';

const WHITEPAPER_DESCRIPTION =
  'Read the FlowDex Protocol whitepaper — the technical and economic design behind the Universal Exchange, Intelligence Terminal, and $FDP token.';

export const metadata: Metadata = {
  title: 'Whitepaper',
  description: WHITEPAPER_DESCRIPTION,
  openGraph: { title: 'Whitepaper — FlowDex Protocol', description: WHITEPAPER_DESCRIPTION },
  twitter: { title: 'Whitepaper — FlowDex Protocol', description: WHITEPAPER_DESCRIPTION },
};

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
    body: 'Every wallet that connects receives a unique referral code. Referrers earn 15% of what their friend spends through their link, split between $FDP tokens and Terminal Credits; the referred buyer earns a 30% bonus on their own purchase.',
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

export default async function WhitepaperPage() {
  // fetchWhitepaperUrl() never throws — a down API or nothing uploaded yet
  // both just mean the bundled /whitepaper.pdf in this site's own public
  // folder is used, same as before this was CMS-backed.
  const whitepaperPath = await fetchWhitepaperUrl();
  const pdfUrl = whitepaperPath ? resolveApiUrl(whitepaperPath) || FALLBACK_PDF_URL : FALLBACK_PDF_URL;

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-glow" />
        <Reveal>
          <div className="pill pill-ghost pill-sm mb-5" style={{ display: 'inline-flex', cursor: 'default' }}>
            Living document — updated as the protocol evolves
          </div>
          <h1>FlowDex Protocol Whitepaper v7.0</h1>
          <p>The full protocol whitepaper — the $FDP token, presale mechanics, tokenomics, and the FlowDex roadmap.</p>
          <div className="mt-8 flex justify-center">
            <a href={pdfUrl} download className="pill">
              Download Whitepaper
            </a>
          </div>
        </Reveal>
      </div>

      <Section>
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe src={pdfUrl} title="FlowDex Protocol Whitepaper" className="h-[50vh] w-full sm:h-[80vh]" />
          </div>
          <p className="mt-4 text-center font-sans text-sm text-ink-faint">Unable to display PDF? Click the download button above.</p>
        </Reveal>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl space-y-10">
          {SECTIONS.map((s) => (
            <Reveal key={s.title}>
              <h2 className="doc-heading" style={{ fontSize: '26px' }}>
                {s.title}
              </h2>
              <p className="doc-body">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a href="https://purchase.flowdexprotocol.com" target="_blank" rel="noopener noreferrer" className="pill">
            Buy $FDP
          </a>
        </div>
      </Section>
    </>
  );
}
