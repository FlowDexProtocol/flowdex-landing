import { Section, SectionHeading } from './ui';
import Reveal from './motion/Reveal';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';
import { scaleIn } from '@/lib/motion';

const UTILITIES = [
  {
    num: '02',
    title: 'Governance Voting',
    description: 'Vote on protocol upgrades, fee structures, new asset listings, and treasury allocation. Your tokens, your voice.',
  },
  {
    num: '03',
    title: 'Routing Priority',
    description: '$FDP holders get priority order routing and reduced slippage on every trade. Better execution, every time.',
  },
  {
    num: '04',
    title: 'Validator Staking',
    description: 'In Phase 3, stake $FDP to become a FlowChain validator. Secure the network and earn additional rewards.',
  },
  {
    num: '05',
    title: 'Intelligence Access',
    description: 'Unlock the full Intelligence Terminal with AI analytics, whale alerts, predictive signals, and on-chain data tools.',
  },
];

function UtilityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5">
      <path d="M12 3v4M12 17v4M5 12H3M21 12h-2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="5" />
    </svg>
  );
}

export default function TokenUtilitySection() {
  return (
    <Section>
      <SectionHeading title={<>$FDP Powers Everything</>} subtitle="Five utilities. One token. Real value from day one." />

      {/* Featured card 01 */}
      <Reveal variants={scaleIn} className="relative mb-5 overflow-hidden rounded-xl border border-border border-l-[3px] border-l-primary bg-card p-6 shadow-[0_0_40px_rgba(98,126,234,0.08)] sm:p-10">
        <span className="pointer-events-none absolute right-4 top-0 select-none text-[80px] font-black leading-none text-primary/[0.08] sm:right-8">
          01
        </span>
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary-dim">
          <UtilityIcon />
        </div>
        <h3 className="relative mt-4 text-xl font-bold text-ink sm:text-2xl">40% Fee Sharing</h3>
        <p className="relative mt-2 max-w-xl text-sm text-ink-faint sm:text-base">
          Stake $FDP to earn 40% of all trading fees. Every trade across crypto, stocks, forex, and commodities generates
          revenue for stakers.
        </p>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2" staggerDelay={0.08}>
        {UTILITIES.map((u) => (
          <StaggerItem key={u.num}>
            <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card p-6">
              <span className="pointer-events-none absolute right-3 top-0 select-none text-[64px] font-black leading-none text-primary/[0.08]">
                {u.num}
              </span>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary-dim">
                <UtilityIcon />
              </div>
              <h3 className="relative mt-4 text-lg font-bold text-ink">{u.title}</h3>
              <p className="relative mt-2 text-sm text-ink-faint">{u.description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
