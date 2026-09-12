'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BuyButton } from './ui';
import { cms, type CmsPageData } from '@/lib/cms';
import CmsMedia from './CmsMedia';
import { isSafeLinkUrl } from '@/lib/url-safety';

// Fallback only for when the CMS is completely unreachable — the actual
// nav is built from whatever link_N_text/link_N_url pairs exist in cmsNav
// (see buildNavLinks below), so adding/removing/reordering a link in the
// CMS Just Works without a code change or a fixed slot count.
const DEFAULT_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/tokenomics', label: 'Tokenomics' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/whitepaper', label: 'Whitepaper' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blogs', label: 'Blog' },
  { href: '/how-to-buy', label: 'How to Buy' },
];

// Reads every link_N_text/link_N_url pair present in cmsNav (N unbounded —
// not a fixed 7 or 8 slots), sorted numerically by N. Falls back to the
// full default list only when the CMS has no nav.header fields at all
// (API unreachable on first load); once any link_N field exists, that's
// the source of truth and DEFAULT_NAV_LINKS is only consulted per-slot for
// a link whose text or url came back empty for some reason.
function buildNavLinks(cmsNav: CmsPageData): { href: string; label: string }[] {
  const indices = new Set<number>();
  for (const key of Object.keys(cmsNav)) {
    const m = key.match(/^header\.link_(\d+)_(?:text|url)$/);
    if (m) indices.add(parseInt(m[1], 10));
  }
  if (indices.size === 0) return DEFAULT_NAV_LINKS;

  return Array.from(indices)
    .sort((a, b) => a - b)
    .map((i) => {
      const fallback = DEFAULT_NAV_LINKS[i - 1];
      const href = cms(cmsNav, 'header', `link_${i}_url`, fallback?.href ?? '/');
      const label = cms(cmsNav, 'header', `link_${i}_text`, fallback?.label ?? `Link ${i}`);
      return { href: isSafeLinkUrl(href) ? href : fallback?.href ?? '/', label };
    });
}

export default function Header({ cmsGlobal = {}, cmsNav = {} }: { cmsGlobal?: CmsPageData; cmsNav?: CmsPageData }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = buildNavLinks(cmsNav);
  const buyButtonText = cms(cmsNav, 'header', 'buy_button_text', 'Buy $FDP');
  const buyButtonUrlRaw = cms(cmsNav, 'header', 'buy_button_url', 'https://purchase.flowdexprotocol.com');
  const buyButtonUrl = isSafeLinkUrl(buyButtonUrlRaw) ? buyButtonUrlRaw : 'https://purchase.flowdexprotocol.com';
  const logoType = cms(cmsGlobal, 'logo', 'type', 'text');
  const logoImageUrl = cms(cmsGlobal, 'logo', 'image_url', '');
  const logoMain = cms(cmsGlobal, 'logo', 'text_main', 'Flow');
  const logoAccent = cms(cmsGlobal, 'logo', 'text_accent', 'Dex');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-border bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent bg-bg/40 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-0.5 shrink-0">
            {logoType === 'image' || logoType === 'animated' ? (
              <CmsMedia
                src={logoImageUrl}
                alt={`${logoMain}${logoAccent}`}
                className="h-8 w-auto object-contain"
                fallback={
                  <>
                    <span className="text-xl font-bold text-ink sm:text-2xl">{logoMain}</span>
                    <span className="text-xl font-bold text-primary sm:text-2xl">{logoAccent}</span>
                  </>
                }
              />
            ) : (
              <>
                <span className="text-xl font-bold text-ink sm:text-2xl">{logoMain}</span>
                <span className="text-xl font-bold text-primary sm:text-2xl">{logoAccent}</span>
              </>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-ink-dim transition-colors hover:text-ink">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {!menuOpen && (
              <BuyButton href={buyButtonUrl} className="!min-h-11 !px-3 !py-2 !text-xs sm:!px-5 sm:!py-2.5 sm:!text-sm">
                {buyButtonText}
              </BuyButton>
            )}
            <button
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border text-ink-dim lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 top-[70px] z-40 bg-bg/98 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-4 text-lg font-semibold text-ink"
              >
                {link.label}
              </Link>
            ))}
            <BuyButton href={buyButtonUrl} className="mt-6 w-full">
              {buyButtonText}
            </BuyButton>
          </nav>
        </div>
      )}
    </>
  );
}
