import { getPublicScenarios, getTierCurrent } from '@/lib/api';
import { formatCompactUSD, formatTokenPrice, toNum } from '@/lib/format';
import { cms, fetchPageContent } from '@/lib/cms';
import Reveal from './motion/Reveal';
import { fadeUp, slideRight } from '@/lib/motion';
import { isSafeLinkUrl } from '@/lib/url-safety';
import { sanitizeHtml } from '@/lib/sanitize';

const ACCEPTED_CURRENCIES = ['ETH', 'USDT', 'USDC', 'BNB', 'SOL', 'BTC', 'TRX'];

export default async function Hero() {
  const [tier, scenarios, cmsData] = await Promise.all([
    getTierCurrent().catch(() => null),
    getPublicScenarios().catch(() => null),
    fetchPageContent('home'),
  ]);

  const listingPrice = scenarios?.listing_price ?? 0.05;
  const presaleLive = !!tier && !tier.message;
  const progressPct = presaleLive ? parseFloat(tier.progress_pct) : 0;
  const discountPct = presaleLive && listingPrice > 0 ? ((listingPrice - toNum(tier.price)) / listingPrice) * 100 : 0;

  const ctaPrimaryLinkRaw = cms(cmsData, 'hero', 'cta_primary_link', 'https://purchase.flowdexprotocol.com');
  const ctaPrimaryLink = isSafeLinkUrl(ctaPrimaryLinkRaw) ? ctaPrimaryLinkRaw : 'https://purchase.flowdexprotocol.com';
  const ctaSecondaryLinkRaw = cms(cmsData, 'hero', 'cta_secondary_link', '/whitepaper');
  const ctaSecondaryLink = isSafeLinkUrl(ctaSecondaryLinkRaw) ? ctaSecondaryLinkRaw : '/whitepaper';

  const countdownText = presaleLive
    ? tier.countdown ?? cms(cmsData, 'presale_card', 'countdown_text', `${tier.name} closes at $${formatCompactUSD(tier.hard_cap_usd)}`)
    : null;

  return (
    <section className="hero">
      <div className="shape sh1" />
      <div className="shape sh2" />

      <div className="hero-left">
        <Reveal variants={fadeUp}>
          <h1>
            {cms(cmsData, 'hero', 'headline_1', 'What is')} <em>{cms(cmsData, 'hero', 'headline_2', 'FlowDex Protocol?')}</em>
          </h1>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.08}>
          <p className="hero-body">
            {cms(
              cmsData,
              'hero',
              'subtitle',
              'FlowDex Protocol unifies crypto, stocks, forex, and commodities into a single intelligent trading layer. $FDP powers fee sharing, governance, and market intelligence.'
            )}
          </p>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.16}>
          <div className="hero-btns">
            <a href={ctaPrimaryLink} target="_blank" rel="noopener noreferrer" className="pill">
              {cms(cmsData, 'hero', 'cta_primary_text', 'Buy $FDP')}
            </a>
            <a href={ctaSecondaryLink} className="pill pill-ghost">
              {cms(cmsData, 'hero', 'cta_secondary_text', 'Read Whitepaper')}
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal as="div" variants={slideRight} delay={0.1} className="pc">
        {presaleLive ? (
          <>
            <div className="pc-label">
              <span className="pc-dot" />
              {cms(cmsData, 'presale_card', 'label', `Stage · ${tier.name}`)}
            </div>
            <div className="pc-price">{formatTokenPrice(tier.price)}</div>
            <div className="pc-listing">
              Listing: <s>{formatTokenPrice(listingPrice)}</s>
              {discountPct > 0 && <span className="pc-green">{discountPct.toFixed(0)}% below</span>}
            </div>

            {countdownText && <div className="pc-countdown" dangerouslySetInnerHTML={{ __html: sanitizeHtml(countdownText) }} />}

            <div className="pbar">
              <div className="pfill" style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }} />
            </div>
            <div className="pc-stats">
              <span>{formatCompactUSD(tier.total_raised_usd)} raised</span>
              <span>{formatCompactUSD(tier.hard_cap_usd)} goal</span>
            </div>

            <a href={ctaPrimaryLink} target="_blank" rel="noopener noreferrer" className="pc-buy">
              {cms(cmsData, 'hero', 'cta_primary_text', 'Buy $FDP')}
            </a>
            <p className="pc-tokens">{cms(cmsData, 'presale_card', 'tokens_accepted', ACCEPTED_CURRENCIES.join(' · '))}</p>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="pc-price" style={{ fontSize: '22px' }}>
              Presale Complete
            </div>
            <p className="hero-body" style={{ margin: '10px 0 20px', maxWidth: 'none' }}>
              All presale tiers have sold out. Thank you for backing FlowDex.
            </p>
            <a href={ctaPrimaryLink} target="_blank" rel="noopener noreferrer" className="pc-buy">
              View Dashboard
            </a>
          </div>
        )}
      </Reveal>
    </section>
  );
}
