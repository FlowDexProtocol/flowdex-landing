'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cms, type CmsPageData } from '@/lib/cms';
import CmsMedia from './CmsMedia';
import { isSafeLinkUrl } from '@/lib/url-safety';
import { sanitizeHtml } from '@/lib/sanitize';

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

function LogoDrops() {
  return (
    <div className="logo-drops">
      <div className="drop drop-1" />
      <div className="drop drop-2" />
    </div>
  );
}

export default function Header({
  cmsGlobal = {},
  cmsNav = {},
  cmsHome = {},
}: {
  cmsGlobal?: CmsPageData;
  cmsNav?: CmsPageData;
  cmsHome?: CmsPageData;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const announceActive = cms(cmsHome, 'announcement', 'active', 'true') === 'true';
  const announceText = cms(cmsHome, 'announcement', 'text', 'Tier 1 closing soon! Buy $FDP at $0.001 before the price increases.');
  const [announceDismissed, setAnnounceDismissed] = useState(false);
  const showAnnounce = announceActive && !!announceText && !announceDismissed;

  const navLinks = buildNavLinks(cmsNav);
  const buyButtonText = cms(cmsNav, 'header', 'buy_button_text', 'Buy $FDP');
  const buyButtonUrlRaw = cms(cmsNav, 'header', 'buy_button_url', 'https://purchase.flowdexprotocol.com');
  const buyButtonUrl = isSafeLinkUrl(buyButtonUrlRaw) ? buyButtonUrlRaw : 'https://purchase.flowdexprotocol.com';
  const logoType = cms(cmsGlobal, 'logo', 'type', 'text');
  const logoImageUrl = cms(cmsGlobal, 'logo', 'image_url', '');
  const logoMain = cms(cmsGlobal, 'logo', 'text_main', 'Flow');
  const logoAccent = cms(cmsGlobal, 'logo', 'text_accent', 'Dex');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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

  // Closes the mobile menu on tap (it sits above it, z-index-wise, so it's
  // reachable even while the menu is open) and, since Next.js's <Link>
  // doesn't scroll when the href matches the current route (no navigation
  // actually happens), explicitly scrolls to top for the common case of
  // tapping the logo from partway down the homepage itself.
  function handleLogoClick() {
    setMenuOpen(false);
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <>
      {showAnnounce && (
        <div className="announce">
          <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(announceText) }} />
          <button type="button" className="announce-close" onClick={() => setAnnounceDismissed(true)} aria-label="Dismiss announcement">
            ×
          </button>
        </div>
      )}

      <div className={`nav${scrolled ? ' scrolled' : ''}${showAnnounce ? ' has-announce' : ''}`}>
        <Link href="/" className="logo" onClick={handleLogoClick}>
          {logoType === 'image' || logoType === 'animated' ? (
            <CmsMedia
              src={logoImageUrl}
              alt={`${logoMain}${logoAccent}`}
              className="h-9 w-auto object-contain"
              fallback={<LogoDrops />}
            />
          ) : (
            <LogoDrops />
          )}
          <div className="logo-text">
            <span className="logo-name">
              <em>{logoMain}</em>
              {logoAccent}
            </span>
            <span className="logo-sub">Protocol</span>
          </div>
        </Link>

        <nav className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a href={buyButtonUrl} target="_blank" rel="noopener noreferrer" className="pill hidden sm:inline-flex">
            {buyButtonText}
          </a>
          <button type="button" className="nav-burger lg:!hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu lg:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a href={buyButtonUrl} target="_blank" rel="noopener noreferrer" className="pill mt-6 w-full text-center">
            {buyButtonText}
          </a>
        </div>
      )}
    </>
  );
}
