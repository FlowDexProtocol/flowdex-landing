'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BuyButton } from './ui';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#ecosystem', label: 'About' },
  { href: '/tokenomics', label: 'Tokenomics' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/whitepaper', label: 'Whitepaper' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blogs', label: 'Blog' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            <span className="text-lg font-bold text-ink">Flow</span>
            <span className="text-lg font-bold text-primary">Dex</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-ink-dim transition-colors hover:text-ink">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <BuyButton className="!min-h-11 !px-3 !py-2 !text-xs sm:!px-5 sm:!py-2.5 sm:!text-[13px]" />
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-4 text-lg font-semibold text-ink"
              >
                {link.label}
              </Link>
            ))}
            <BuyButton className="mt-6 w-full" />
          </nav>
        </div>
      )}
    </>
  );
}
