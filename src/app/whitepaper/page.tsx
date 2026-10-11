import type { Metadata } from 'next';
import { Section } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import { fetchWhitepaperUrl, resolveApiUrl } from '@/lib/cms';

const FALLBACK_PDF_URL = '/flowdex-whitepaper-v9.pdf';

const WHITEPAPER_DESCRIPTION =
  'Read the FlowDex Protocol whitepaper — the technical and economic design behind the Universal Exchange, Intelligence Terminal, and FDP token.';

export const metadata: Metadata = {
  title: 'Whitepaper',
  description: WHITEPAPER_DESCRIPTION,
  openGraph: { title: 'Whitepaper — FlowDex Protocol', description: WHITEPAPER_DESCRIPTION },
  twitter: { title: 'Whitepaper — FlowDex Protocol', description: WHITEPAPER_DESCRIPTION },
};

const SECTIONS = [
  {
    title: '1. Overview',
    body: 'FlowDex Protocol is building a Universal Exchange — a single, non-custodial interface for trading crypto, tokenized stocks, forex, and commodities — alongside an AI-powered Intelligence Terminal and FlowChain, our upcoming Layer 1 blockchain. FDP is the utility token that powers fee sharing, governance, and priority access across the ecosystem.',
  },
  {
    title: '2. The FDP Token',
    body: 'Total supply: 100,000,000,000 FDP (100 billion). 30% of supply is allocated to the presale across 20 tiers, priced from $0.0005 (Tier 1) up to $0.01 (Tier 20). Target launch price: $0.50. Zero VC allocation — 100% of the total supply is distributed across presale, staking, ecosystem, treasury, and community.',
  },
  {
    title: '3. Presale Mechanics',
    body: 'Each tier has a fixed price and hard cap in USD. When a tier’s cap is reached, the next tier opens automatically at a higher price. Every purchase locks in the price at time of payment. Vesting runs per tier rather than on one shared date: a tier’s claim opens once that tier closes, 5% of the allocation unlocks at TGE, and the remainder releases monthly with no cliff.',
  },
  {
    title: '4. Token Utility',
    body: 'Once the exchange is live, staking FDP is designed to earn a share of protocol trading fees (targeting 40% of all fees to stakers), grant governance voting rights on protocol upgrades and treasury allocation, and give priority order routing. In Phase 4, staking FDP is also intended to secure FlowChain as a validator.',
  },
  {
    title: '5. Referral Program',
    body: 'Every wallet that connects receives a unique referral code. Referrers earn 15% of what their friend spends through their link, split between FDP tokens and Terminal Credits; the referred buyer earns a 30% bonus on their own purchase.',
  },
  {
    title: '6. Roadmap',
    body: 'Phase 1 (Foundation) is underway now. Subsequent phases bring the 20-tier presale, the Universal Exchange, multi-chain expansion, the Intelligence Terminal, and ultimately FlowChain itself. See the full roadmap for phase-by-phase detail.',
  },
  {
    title: '7. Risk Disclosure',
    body: 'FDP is designed as a utility token, intended for fee sharing, governance, and access across the FlowDex ecosystem. How it is treated in any given jurisdiction depends on facts and regulation that can change, and nothing here is a legal determination of its status. The Universal Exchange, Intelligence Terminal, and FlowChain are under development and are not yet available. Cryptocurrency purchases carry risk, including total loss of funds. Presale tokens are subject to vesting and may not be immediately liquid. Nothing in this document is financial advice, and you should take your own legal and tax advice before purchasing.',
  },
];

// fetchWhitepaperUrl() never throws — a down API or nothing uploaded yet
// both just mean the bundled /whitepaper.pdf in this site's own public
// folder is used. But even when the CMS setting IS present, it can point
// at a path that was never actually uploaded to the API host (a stale
// placeholder) — HEAD-checking it here means a broken CMS value quietly
// falls back to the working bundled copy instead of shipping a dead link.
async function resolvePdfUrl(): Promise<string> {
  const whitepaperPath = await fetchWhitepaperUrl();
  if (!whitepaperPath) return FALLBACK_PDF_URL;
  const resolved = resolveApiUrl(whitepaperPath);
  if (!resolved) return FALLBACK_PDF_URL;
  try {
    const res = await fetch(resolved, { method: 'HEAD', next: { revalidate: 5 } });
    return res.ok ? resolved : FALLBACK_PDF_URL;
  } catch {
    return FALLBACK_PDF_URL;
  }
}

export default async function WhitepaperPage() {
  const pdfUrl = await resolvePdfUrl();

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-glow" />
        <Reveal>
          <div className="pill pill-ghost pill-sm mb-5" style={{ display: 'inline-flex', cursor: 'default' }}>
            Living document — updated as the protocol evolves
          </div>
          <h1>FlowDex Protocol Whitepaper v9.0</h1>
          <p>The full protocol whitepaper — the FDP token, presale mechanics, tokenomics, and the FlowDex roadmap.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={pdfUrl} download className="pill">
              Download Whitepaper
            </a>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="pill pill-ghost">
              View Online
            </a>
          </div>
        </Reveal>
      </div>

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
            Buy FDP
          </a>
        </div>
      </Section>
    </>
  );
}
