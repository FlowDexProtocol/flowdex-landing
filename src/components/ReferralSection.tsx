import { cms, fetchPageContent } from '@/lib/cms';
import { Section, SectionHeading } from './ui';
import Reveal from './motion/Reveal';
import { fadeUp, slideLeft, slideRight } from '@/lib/motion';

const STEPS = [
  'Connect your wallet on the buy page to get your unique referral link',
  'Share your link on social media, DMs, or anywhere',
  'When someone buys using your link, you both earn bonuses',
  'You earn 15% of what your friend spends — split 70% Terminal Credits + 30% $FDP',
  'Your friend earns 30% bonus on their purchase',
];

export default async function ReferralSection() {
  const cmsData = await fetchPageContent('home');
  const steps = STEPS.map((fallback, i) => cms(cmsData, 'referral', `step_${i + 1}`, fallback));

  return (
    <Section id="referral">
      <SectionHeading
        label="Referral"
        title={cms(cmsData, 'referral', 'title', 'Earn 15% When You Refer')}
        subtitle={cms(cmsData, 'referral', 'subtitle', 'Your friends earn 30% bonus on their purchase.')}
      />

      <div className="ref-grid">
        <Reveal variants={slideLeft} className="ref-steps">
          {steps.map((step, i) => (
            <div key={i} className="ref-step">
              <span className="ref-n">{i + 1}</span>
              <p className="ref-t">{step}</p>
            </div>
          ))}
          <a href="https://purchase.flowdexprotocol.com" target="_blank" rel="noopener noreferrer" className="pill ref-start">
            Start Earning
          </a>
        </Reveal>

        <Reveal variants={slideRight} delay={0.1} className="ref-vis">
          <div className="ref-flow">
            <div className="ref-c">You</div>
            <span className="ref-arr">↓ Share</span>
            <div className="ref-c">Friend</div>
            <span className="ref-arr">↓ Buys</span>
            <div className="ref-res">
              <div className="ref-b you">15% You</div>
              <div className="ref-b fri">30% Friend</div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal variants={fadeUp} className="ref-burn">
        <p className="sec-label">
          {cms(cmsData, 'referral', 'burn_title', 'Deflationary by Design')}
        </p>
        <p className="ref-burn-text">
          {cms(
            cmsData,
            'referral',
            'burn_description',
            'Every referral purchase burns tokens permanently. When your friend buys using your code, bonus tokens are created for both of you — and an equal amount is burned from the supply at full tier price. More referrals = more burns = less supply = more value for holders.'
          )}
        </p>
      </Reveal>
    </Section>
  );
}
