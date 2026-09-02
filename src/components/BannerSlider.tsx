'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { CmsBanner } from '@/lib/types';
import { PURCHASE_URL } from '@/lib/api';

const AUTO_ROTATE_MS = 5000;

function BannerCta({ banner }: { banner: CmsBanner }) {
  if (!banner.cta_text) return null;

  // "Buy $FDP" CTAs must always land on the purchase app, regardless of what
  // the CMS entry's cta_link happens to contain.
  const isBuyCta = /buy/i.test(banner.cta_text);
  if (isBuyCta) {
    return (
      <a
        href={PURCHASE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-[#4E65BB] px-6 py-3 text-sm font-semibold text-[#03131a] transition-transform hover:-translate-y-0.5"
      >
        {banner.cta_text}
      </a>
    );
  }

  const href = banner.cta_link || '#';
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-xl border-[1.5px] border-primary/50 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-dim"
      >
        {banner.cta_text}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-2 rounded-xl border-[1.5px] border-primary/50 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-dim"
    >
      {banner.cta_text}
    </Link>
  );
}

export default function BannerSlider({ banners }: { banners: CmsBanner[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % banners.length), AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="relative h-[180px] w-full overflow-hidden border-b border-border bg-bg-soft sm:h-[280px]">
      <div className="absolute inset-0 bg-radial-glow" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(98,126,234,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(98,126,234,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className="absolute inset-0 flex items-center transition-opacity duration-700 ease-out"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col justify-center gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
            <h2 className="line-clamp-2 max-w-xl text-xl font-bold leading-tight text-ink sm:text-3xl">{banner.title}</h2>
            {banner.subtitle && (
              <p className="line-clamp-2 max-w-lg text-xs text-ink-dim sm:text-base">{banner.subtitle}</p>
            )}
            <div className="mt-1 sm:mt-2">
              <BannerCta banner={banner} />
            </div>
          </div>
        </div>
      ))}

      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {banners.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: i === index ? 20 : 6, background: i === index ? 'var(--color-primary)' : 'var(--color-border)' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
