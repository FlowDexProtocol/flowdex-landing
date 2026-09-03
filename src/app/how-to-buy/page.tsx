import type { Metadata } from 'next';
import { cms, fetchPageContent } from '@/lib/cms';
import { Container, Section } from '@/components/ui';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import Reveal from '@/components/motion/Reveal';

const DESCRIPTION =
  "New to crypto? This step-by-step guide walks you through getting a wallet, funding it, and buying $FDP in the FlowDex Protocol presale.";

export const metadata: Metadata = {
  title: 'How to Buy $FDP',
  description: DESCRIPTION,
  openGraph: { title: 'How to Buy $FDP — FlowDex Protocol', description: DESCRIPTION },
  twitter: { title: 'How to Buy $FDP — FlowDex Protocol', description: DESCRIPTION },
};

const STEPS = [
  {
    title: 'Get a Wallet',
    body: 'A crypto wallet is where you\'ll hold $FDP and send your payment from. If you don\'t have one yet, MetaMask (browser extension and mobile app) and Trust Wallet (mobile) are two of the most widely used, free, and beginner-friendly options — both let you create a new wallet in a couple of minutes. Download MetaMask from metamask.io or Trust Wallet from trustwallet.com, and make sure to write down your recovery phrase somewhere safe — anyone with that phrase can access your funds, and it can never be recovered if you lose it.',
    links: [
      { label: 'Get MetaMask →', href: 'https://metamask.io' },
      { label: 'Get Trust Wallet →', href: 'https://trustwallet.com' },
    ],
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" strokeWidth="1.5" />
        <path d="M16 12h.01M3 10h18" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Add Funds',
    body: 'Once your wallet exists, it needs some ETH, USDT, or another supported crypto in it before you can buy $FDP. If you don\'t already own crypto, the easiest way to get some is through a service like MoonPay or a centralized exchange such as Coinbase — both let you buy crypto directly with a debit card or bank transfer. Some wallets (including MetaMask and Trust Wallet) have a built-in "Buy" button that routes you through one of these providers automatically. Once purchased, send it to your wallet address if it isn\'t already there.',
    links: [],
    icon: (
      <>
        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        <path d="M12 8v8M9 10.5c0-1 1.2-1.5 3-1.5s3 .7 3 1.7-1.2 1.3-3 1.3-3 .4-3 1.5 1.2 1.5 3 1.5 3-.5 3-1.5" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Connect Your Wallet',
    body: 'On the FlowDex buy page, click "Connect Wallet" in the top right. Your wallet (MetaMask, Trust Wallet, or others) will pop up asking you to approve the connection — this only shares your public wallet address, never your private keys or funds. Once connected, you\'ll see your wallet address and network in the header, confirming you\'re ready to buy.',
    links: [],
    icon: (
      <>
        <path d="M8 12h8m0 0-3-3m3 3-3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="5" width="6" height="14" rx="1.5" strokeWidth="1.5" />
        <rect x="15" y="5" width="6" height="14" rx="1.5" strokeWidth="1.5" />
      </>
    ),
  },
  {
    title: 'Choose Payment & Amount',
    body: 'Pick which crypto you want to pay with — ETH, USDT, USDC, BNB, SOL, BTC, and TRX (TRC-20) are all accepted — then enter how much you\'d like to spend in USD. The form shows you the live crypto amount you\'ll need to send and an estimate of how many $FDP tokens you\'ll receive at the current presale tier price, updated in real time.',
    links: [],
    icon: (
      <>
        <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="1.5" />
        <path d="M2 10h20" strokeWidth="1.5" />
      </>
    ),
  },
  {
    title: 'Confirm & Send',
    body: 'Click "Buy $FDP" and you\'ll get a unique deposit address and a QR code, along with your exact price locked in for 15 minutes. Send exactly the amount shown, on the correct network, from your wallet to that address — scanning the QR code with your wallet app is the fastest and safest way to avoid typos. Your purchase confirms automatically once the payment is detected on-chain, usually within a few minutes.',
    links: [],
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5" />
        <path d="M8 8h2v2H8zM14 8h2v2h-2zM8 14h2v2H8z" strokeWidth="1.5" />
      </>
    ),
  },
  {
    title: 'Check Your Portfolio',
    body: 'Once your purchase confirms, head to the Dashboard section on the buy page and open the Portfolio tab. You\'ll see your total $FDP purchased, any referral bonus tokens, your purchase history, and — once your tier closes — your TGE vesting schedule showing exactly when and how much unlocks.',
    links: [],
    icon: (
      <>
        <path d="M4 19V5m0 14h16M8 15l3-3 3 2 4-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default async function HowToBuyPage() {
  const cmsGlobal = await fetchPageContent('global');
  const supportEmail = cms(cmsGlobal, 'site', 'support_email', 'support@flowdexprotocol.com');

  return (
    <>
      <section className="bg-radial-glow py-14 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-3xl font-bold text-ink sm:text-5xl">
              How to Buy <span className="text-primary">$FDP</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-dim sm:text-lg">Beginner&rsquo;s Guide</p>
          </Reveal>
        </Container>
      </section>

      <Section>
        <StaggerGroup className="mx-auto max-w-3xl space-y-6" staggerDelay={0.08}>
          {STEPS.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-dim">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)">
                      {step.icon}
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">Step {i + 1}</p>
                    <h2 className="mt-1 text-lg font-bold text-ink sm:text-xl">{step.title}</h2>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-dim sm:text-base">{step.body}</p>

                {step.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                    {step.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex h-32 items-center justify-center rounded-xl border border-dashed border-border text-xs text-ink-faint sm:h-40">
                  Screenshot coming soon
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-10 text-center text-sm text-ink-dim">
          Still confused? Contact{' '}
          <a href={`mailto:${supportEmail}`} className="font-semibold text-primary hover:underline">
            {supportEmail}
          </a>
        </p>
      </Section>
    </>
  );
}
