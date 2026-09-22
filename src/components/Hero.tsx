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

  // The CMS still holds the pre-redesign copy ("Trade Everything. Know
  // Everything.") for hero.headline_1/2 — CMS content otherwise always wins
  // over the fallback, so that stale value would keep showing even after
  // updating the fallback below. Detect it specifically and render the new
  // "What is FlowDex Protocol?" copy (with FlowDex italicized, matching the
  // prototype) instead, while still falling through to genuine CMS-authored
  // headlines once someone edits these fields to anything else.
  const headline1 = cms(cmsData, 'hero', 'headline_1', 'What is FlowDex Protocol?');
  const headline2 = cms(cmsData, 'hero', 'headline_2', '');
  const useNewHeroHeadline = /trade everything/i.test(headline1) || headline1 === 'What is FlowDex Protocol?';

  const subtitle = cms(
    cmsData,
    'hero',
    'subtitle',
    'FlowDex Protocol is building a single platform where you can trade crypto, stocks, forex, and commodities. Behind it sits an AI-powered Intelligence Terminal that tracks whale movements, detects patterns, and sends alerts before the market moves.'
  );
  const subtitle2 = cms(
    cmsData,
    'hero',
    'subtitle_2',
    '$FDP is the token that runs the network. Hold it to earn 40% of all trading fees, vote on how the protocol evolves, and unlock the full Intelligence Terminal.'
  );

  return (
    <section className="hero">
      <div className="shape sh1" />
      <div className="shape sh2" />

      <div className="hero-left">
        <Reveal variants={fadeUp}>
          <h1>
            {useNewHeroHeadline ? (
              <>
                What is <em>FlowDex</em> Protocol?
              </>
            ) : headline2 ? (
              <>
                {headline1} <em>{headline2}</em>
              </>
            ) : (
              headline1
            )}
          </h1>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.08}>
          <p className="hero-body">{subtitle}</p>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.12}>
          <p className="hero-body">{subtitle2}</p>
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
          <div className="pc-complete">
            <div className="pc-price">
              Presale Complete
            </div>
            <p className="hero-body">
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
