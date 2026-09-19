import { cms, fetchPageContent } from '@/lib/cms';
import TabSectionClient from './TabSectionClient';

const TAB_DEFAULTS = [
  {
    key: 'tab_presale',
    tab: 'Presale',
    label: 'Presale',
    text: 'Get $FDP at the <em>lowest possible price</em> before it lists on exchanges. Eight tiers, each priced higher than the last.',
  },
  {
    key: 'tab_exchange',
    tab: 'Exchange',
    label: 'Universal Exchange',
    text: 'Trade crypto, stocks, forex, and commodities from <em>one unified interface</em>, with routing across every liquidity source.',
  },
  {
    key: 'tab_intelligence',
    tab: 'Intelligence',
    label: 'Intelligence Terminal',
    text: 'AI-powered market intelligence — <em>whale tracking</em>, pattern detection, and predictive analytics from live on-chain data.',
  },
  {
    key: 'tab_staking',
    tab: 'Staking',
    label: 'Staking',
    text: 'Stake $FDP and <em>earn 40% of protocol fees</em> from every trade across every market, every day.',
  },
  {
    key: 'tab_flowchain',
    tab: 'FlowChain',
    label: 'FlowChain L1',
    text: 'Our own Layer 1 blockchain, purpose-built for <em>high-frequency trading</em> and cross-chain settlement.',
  },
];

export default async function TabSection() {
  const cmsData = await fetchPageContent('home');

  const tabs = TAB_DEFAULTS.map((t) => ({
    tab: t.tab,
    label: cms(cmsData, t.key, 'label', t.label),
    text: cms(cmsData, t.key, 'text', t.text),
  }));

  return <TabSectionClient tabs={tabs} />;
}
