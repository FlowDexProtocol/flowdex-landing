'use client';

import { useEffect, useRef, useState, type TouchEvent } from 'react';
import Link from 'next/link';
import type { CmsBanner } from '@/lib/types';
import { PURCHASE_URL } from '@/lib/api';
import { isSafeLinkUrl, sanitizeImageUrl } from '@/lib/url-safety';

const AUTO_ROTATE_MS = 5000;
const SLIDE_STYLES = ['bs1', 'bs2', 'bs3'] as const;
const SHAPE_STYLES = ['bsh1', 'bsh2', 'bsh3'] as const;

function getRemaining(targetIso: string) {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function BannerCountdown({ targetIso }: { targetIso: string }) {
  const [remaining, setRemaining] = useState(() => getRemaining(targetIso));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  if (!remaining) {
    return <div className="banner-countdown text-red">Ended</div>;
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="banner-countdown">
      <strong>
        {remaining.days}d {pad(remaining.hours)}h {pad(remaining.minutes)}m {pad(remaining.seconds)}s
      </strong>
      remaining
    </div>
  );
}

function BannerCta({ banner }: { banner: CmsBanner }) {
  if (!banner.cta_text) return null;

  // "Buy $FDP" CTAs must always land on the purchase app, regardless of what
  // the CMS entry's cta_link happens to contain.
  const isBuyCta = /buy/i.test(banner.cta_text);
  if (isBuyCta) {
    return (
      <a href={PURCHASE_URL} target="_blank" rel="noopener noreferrer" className="pill">
        {banner.cta_text}
      </a>
    );
  }

  const rawHref = banner.cta_link || '#';
  const href = isSafeLinkUrl(rawHref) ? rawHref : '#';
  const isExternal = /^https:\/\//i.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="pill pill-ghost">
        {banner.cta_text}
      </a>
    );
  }
  return (
    <Link href={href} className="pill pill-ghost">
      {banner.cta_text}
    </Link>
  );
}

export default function BannerSlider({ banners }: { banners: CmsBanner[] }) {
  const [index, setIndex] = useState(0);
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (banners.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % banners.length), AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [banners.length]);

  // Background-image CSS has no native onError, so preload each banner's
  // image and fall back to the gradient if it 404s or fails to decode.
  useEffect(() => {
    let cancelled = false;
    setBrokenImages(new Set());
    for (const banner of banners) {
      const url = banner.image_url_mobile || banner.image_url_desktop;
      if (!url) continue;
      const img = new Image();
      img.onerror = () => {
        if (!cancelled) setBrokenImages((prev) => new Set(prev).add(banner.id));
      };
      img.src = url;
    }
    return () => {
      cancelled = true;
    };
  }, [banners]);

  if (banners.length === 0) return null;

  function handleTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent) {
    if (touchStartX.current === null || banners.length < 2) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 40;
    if (deltaX > SWIPE_THRESHOLD) {
      setIndex((i) => (i - 1 + banners.length) % banners.length);
    } else if (deltaX < -SWIPE_THRESHOLD) {
      setIndex((i) => (i + 1) % banners.length);
    }
    touchStartX.current = null;
  }

  const prev = () => setIndex((i) => (i - 1 + banners.length) % banners.length);
  const next = () => setIndex((i) => (i + 1) % banners.length);

  return (
    <div className="banner-slider" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {banners.map((banner, i) => {
        const safeDesktopUrl = sanitizeImageUrl(banner.image_url_desktop);
        const safeMobileUrl = sanitizeImageUrl(banner.image_url_mobile);
        const hasImage = !!safeDesktopUrl && !brokenImages.has(banner.id);
        const hasColor = !!banner.bg_color;
        const slideStyle = SLIDE_STYLES[i % SLIDE_STYLES.length];
        const shapeStyle = SHAPE_STYLES[i % SHAPE_STYLES.length];

        return (
          <div
            key={banner.id}
            className={`banner-slide ${hasImage || hasColor ? '' : slideStyle}${i === index ? ' active' : ''}`}
            style={hasColor ? { backgroundColor: banner.bg_color! } : undefined}
          >
            {hasImage && (
              <>
                <div
                  className={`absolute inset-0 bg-cover bg-center ${safeMobileUrl ? 'sm:hidden' : ''}`}
                  style={{ backgroundImage: `url(${safeMobileUrl || safeDesktopUrl})` }}
                />
                {safeMobileUrl && (
                  <div
                    className="absolute inset-0 hidden bg-cover bg-center sm:block"
                    style={{ backgroundImage: `url(${safeDesktopUrl})` }}
                  />
                )}
                <div className="absolute inset-0 bg-bg/40" />
              </>
            )}

            <div className={`banner-shape ${shapeStyle}`} />

            <div className="banner-inner">
              {banner.subtitle && <div className="banner-tag">{banner.subtitle}</div>}
              <h2 className="banner-h">{banner.title}</h2>
              {banner.show_countdown && banner.countdown_end && <BannerCountdown targetIso={banner.countdown_end} />}
              <BannerCta banner={banner} />
            </div>
          </div>
        );
      })}

      {banners.length > 1 && (
        <>
          <div className="banner-arrows">
            <button type="button" className="barr" onClick={prev} aria-label="Previous slide">
              ‹
            </button>
            <button type="button" className="barr" onClick={next} aria-label="Next slide">
              ›
            </button>
          </div>
          <div className="banner-dots">
            {banners.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`bdot${i === index ? ' active' : ''}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
