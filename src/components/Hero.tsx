import { getPublicScenarios, getTierCurrent } from '@/lib/api';
import { formatCompactUsd, formatPrice, toNum } from '@/lib/format';
import { BuyButton, Container, GlassCard, OutlineLink, Pill, ProgressBar } from './ui';
import Reveal from './motion/Reveal';
import { fadeUp, slideRight } from '@/lib/motion';

const ACCEPTED_CURRENCIES = ['ETH', 'USDT', 'USDC', 'BNB', 'SOL', 'BTC', 'TRX'];

export default async function Hero() {
  const [tier, scenarios] = await Promise.all([
    getTierCurrent().catch(() => null),
    getPublicScenarios().catch(() => null),
  ]);

  const listingPrice = scenarios?.listing_price ?? 0.05;
  const presaleLive = !!tier && !tier.message;
  const progressPct = presaleLive ? parseFloat(tier.progress_pct) : 0;
  const discountPct = presaleLive && listingPrice > 0 ? ((listingPrice - toNum(tier.price)) / listingPrice) * 100 : 0;

  return (
    <section className="relative overflow-hidden bg-radial-glow py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
          {/* LEFT — 60% */}
          <div>
            <Reveal variants={fadeUp}>
              <Pill tone="green" className="mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-green pulse-dot" />
                Presale Live
              </Pill>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.05}>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                Trade Everything.
                <br />
                <span className="text-primary">Know Everything.</span>
              </h1>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.1}>
              <p className="mt-5 max-w-xl text-base text-ink-dim sm:text-lg">
                FlowDex Protocol unifies crypto, stocks, forex, and commodities into a single intelligent trading
                layer. $FDP powers fee sharing, governance, and AI-driven market intelligence.
              </p>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <BuyButton />
                <OutlineLink href="/whitepaper">Read Whitepaper</OutlineLink>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — 40% — Live Presale Card */}
          <Reveal variants={slideRight} delay={0.1}>
            <GlassCard className="p-6 shadow-[0_0_50px_rgba(0,180,216,0.08)] sm:p-8">
              {presaleLive ? (
                <>
                  <div className="text-xs font-semibold uppercase tracking-widest text-ink-faint">Stage: {tier.name}</div>
                  <div className="mt-2 font-mono text-4xl font-extrabold text-primary sm:text-[42px]">{formatPrice(tier.price)}</div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-ink-faint">
                      Listing: <span className="line-through">${listingPrice.toFixed(2)}</span>
                    </span>
                    {discountPct > 0 && <Pill tone="green">{discountPct.toFixed(0)}% below listing</Pill>}
                  </div>

                  <div className="mt-5">
                    <ProgressBar pct={progressPct} shimmer />
                    <div className="mt-2 flex justify-between text-xs text-ink-faint">
                      <span className="font-mono text-ink-dim">{formatCompactUsd(tier.total_raised_usd)} raised</span>
                      <span className="font-mono">{formatCompactUsd(tier.hard_cap_usd)} goal</span>
                    </div>
                  </div>

                  <div className="my-5 border-t border-border" />

                  <BuyButton className="w-full" />
                  <p className="mt-3 text-center text-[11px] text-ink-faint">{ACCEPTED_CURRENCIES.join(' · ')}</p>
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="text-lg font-bold text-primary">Presale Complete</div>
                  <p className="mt-2 text-sm text-ink-dim">All presale tiers have sold out. Thank you for backing FlowDex.</p>
                  <BuyButton className="mt-5 w-full">View Dashboard</BuyButton>
                </div>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
