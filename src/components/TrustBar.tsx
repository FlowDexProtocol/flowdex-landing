import { cms, fetchPageContent } from '@/lib/cms';
import Reveal from './motion/Reveal';
import { fadeUp } from '@/lib/motion';

const DEFAULTS = [
  { icon: '🔒', text: 'Audit in Progress' },
  { icon: '⛓', text: '6 Chains Supported' },
  { icon: '👥', text: 'Community Growing' },
  { icon: '🔐', text: 'Non-Custodial' },
  { icon: '✉', text: 'Email Verified' },
];

export default async function TrustBar() {
  const cmsData = await fetchPageContent('home');

  const items = DEFAULTS.map((d, i) => ({
    icon: cms(cmsData, 'trust', `icon_${i + 1}`, d.icon),
    text: cms(cmsData, 'trust', `item_${i + 1}`, d.text),
  }));

  return (
    <Reveal variants={fadeUp} as="div" className="trust-bar">
      {items.map((item) => (
        <div key={item.text} className="trust-item">
          <span className="trust-icon">{item.icon}</span>
          {item.text}
        </div>
      ))}
    </Reveal>
  );
}
