import { BuyButton, Section, SectionHeading } from './ui';
import Reveal from './motion/Reveal';
import { slideLeft, slideRight } from '@/lib/motion';

const STEPS = [
  'Connect your wallet on the buy page to get your unique referral link',
  'Share your link on social media, DMs, or anywhere',
  'When someone buys using your link, you both earn bonuses',
  'You earn 15% of what your friend spends — split 70% Terminal Credits + 30% $FDP',
  'Your friend earns 30% bonus on their purchase',
];

export default function ReferralSection() {
  return (
    <Section>
      <SectionHeading title="Earn 15% When You Refer" subtitle="Your friends earn 30% bonus on their purchase." />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal variants={slideLeft}>
          <div>
            <ol className="space-y-5">
              {STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-[#03131a]">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm text-ink-dim sm:text-base">{step}</p>
                </li>
              ))}
            </ol>
            <BuyButton className="mt-8">Start Earning</BuyButton>
          </div>
        </Reveal>

        <Reveal variants={slideRight} delay={0.1}>
          <div className="flex h-full flex-col justify-center rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center justify-center gap-3 text-center text-sm">
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-primary text-xs font-bold text-ink">
                You
              </div>
              <div className="flex flex-col items-center gap-1 text-xs text-ink-faint">
                <span>Share Link</span>
                <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
                  <path d="M0 5h34M30 1l5 4-5 4" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-primary text-xs font-bold text-ink">
                Friend
              </div>
            </div>

            <div className="mx-auto mt-3 flex flex-col items-center gap-1 text-xs text-ink-faint">
              <span>Friend Buys</span>
              <svg width="10" height="28" viewBox="0 0 10 28" fill="none">
                <path d="M5 0v22M1 18l4 5 4-5" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>

            <div className="mt-3 grid grid-cols-2 divide-x divide-border overflow-hidden rounded-xl border border-border">
              <div className="p-4 text-center">
                <div className="text-xs uppercase tracking-widest text-ink-faint">You</div>
                <div className="mt-1 text-lg font-bold text-green">15% Bonus</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-xs uppercase tracking-widest text-ink-faint">Friend</div>
                <div className="mt-1 text-lg font-bold text-primary">30% Bonus</div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-ink-faint">
              Terminal Credits redeemable when the Intelligence Terminal launches.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-card p-6 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Deflationary by Design</p>
        <h3 className="mt-2 text-xl font-bold text-ink sm:text-2xl">Every referral purchase burns tokens permanently 🔥</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-dim sm:text-base">
          When your friend buys using your code, bonus tokens are created for both of you — and an equal amount is
          burned from the supply at full tier price.
        </p>
        <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-xs font-semibold text-ink-dim sm:text-sm">
          <span className="rounded-full border border-border bg-bg-soft px-3 py-1.5">Purchase</span>
          <span className="text-ink-faint">→</span>
          <span className="rounded-full border border-primary/30 bg-primary-dim px-3 py-1.5 text-primary">Bonus Created</span>
          <span className="text-ink-faint">→</span>
          <span className="rounded-full border border-red/25 bg-red-dim px-3 py-1.5 text-red">Equal Amount Burned</span>
          <span className="text-ink-faint">→</span>
          <span className="rounded-full border border-green/25 bg-green-dim px-3 py-1.5 text-green">Supply Decreases</span>
        </div>
        <p className="mt-5 text-sm font-semibold text-ink">More referrals = more burns = less supply = more value for holders.</p>
      </Reveal>
    </Section>
  );
}
