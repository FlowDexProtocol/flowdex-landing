import { cms, fetchPageContent } from '@/lib/cms';
import { Section, SectionHeading } from './ui';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';

const UTILITIES = [
  {
    num: '01',
    key: 'utility_1',
    title: '40% Fee Sharing',
    description: 'Stake $FDP to earn 40% of all trading fees. Every trade across crypto, stocks, forex, and commodities generates revenue for stakers.',
  },
  {
    num: '02',
    key: 'utility_2',
    title: 'Governance Voting',
    description: 'Vote on protocol upgrades, fee structures, new asset listings, and treasury allocation. Your tokens, your voice.',
  },
  {
    num: '03',
    key: 'utility_3',
    title: 'Routing Priority',
    description: '$FDP holders get priority order routing and reduced slippage on every trade. Better execution, every time.',
  },
  {
    num: '04',
    key: 'utility_4',
    title: 'Validator Staking',
    description: 'In Phase 3, stake $FDP to become a FlowChain validator. Secure the network and earn additional rewards.',
  },
  {
    num: '05',
    key: 'utility_5',
    title: 'Intelligence Access',
    description: 'Unlock the full Intelligence Terminal with AI analytics, whale alerts, predictive signals, and on-chain data tools.',
  },
  {
    num: '06',
    key: 'utility_6',
    title: 'Deflationary Burns',
    description: 'Every referral purchase permanently burns $FDP from the supply. The more the community grows, the scarcer $FDP becomes.',
  },
];

export default async function TokenUtilitySection() {
  const cmsData = await fetchPageContent('home');

  return (
    <Section id="utility">
      <SectionHeading
        label="Utility"
        title={cms(cmsData, 'utility', 'title', '$FDP Powers Everything')}
        subtitle={cms(cmsData, 'utility', 'subtitle', 'Six utilities. One token. Real value from day one.')}
      />

      <StaggerGroup className="ugrid">
        {UTILITIES.map((u) => (
          <StaggerItem key={u.num}>
            <div className="ucard">
              <span className="unum">{u.num}</span>
              <h4>{cms(cmsData, u.key, 'title', u.title)}</h4>
              <p>{cms(cmsData, u.key, 'description', u.description)}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
