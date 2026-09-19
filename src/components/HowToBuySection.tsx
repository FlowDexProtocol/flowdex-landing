import { cms, fetchPageContent } from '@/lib/cms';
import { Section, SectionHeading } from './ui';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';

const STEPS = [
  { icon: '👛', title: 'Get a Wallet', description: 'Install MetaMask, Trust Wallet, or any WalletConnect-compatible wallet.' },
  { icon: '💰', title: 'Fund Your Wallet', description: 'Add ETH, USDT, USDC, BNB, SOL, BTC, or TRX to your wallet.' },
  { icon: '🔗', title: 'Connect & Select', description: 'Connect your wallet on the buy page and select your payment currency.' },
  { icon: '✅', title: 'Confirm Purchase', description: 'Approve the transaction — $FDP is credited to your presale balance instantly.' },
];

export default async function HowToBuySection() {
  const cmsData = await fetchPageContent('home');

  return (
    <Section id="how-to-buy">
      <SectionHeading
        label="Get Started"
        title={cms(cmsData, 'howto', 'title', 'How to Buy $FDP')}
        subtitle={cms(cmsData, 'howto', 'subtitle', 'Four steps. A few minutes. You own $FDP.')}
      />

      <StaggerGroup className="htb-grid">
        {STEPS.map((step, i) => (
          <StaggerItem key={i}>
            <div className="htb-step">
              <div className="htb-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="htb-icon">{step.icon}</div>
              <h4>{cms(cmsData, `howto_${i + 1}`, 'title', step.title)}</h4>
              <p>{cms(cmsData, `howto_${i + 1}`, 'description', step.description)}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
