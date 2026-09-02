import Link from 'next/link';
import { Container } from './ui';

const RESEARCH_LINKS = [
  { label: 'Blog', href: '/blogs' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Tokenomics', href: '/tokenomics' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'FAQ', href: '/faq' },
];

const LEGAL_LINKS = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Legal Notice', href: '/legal' },
];

const COMMUNITY_LINKS = [
  { label: 'X / Twitter', href: 'https://x.com/flowdexprotocol' },
  { label: 'Telegram', href: 'https://t.me/flowdexprotocol' },
  { label: 'Discord', href: 'https://discord.gg/flowdexprotocol' },
];

function SocialIcon({ type }: { type: 'x' | 'telegram' | 'discord' }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' } as const;
  if (type === 'x') {
    return (
      <svg {...common}>
        <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.7l-5.2-6.8L5.6 22H2.5l8.1-9.3L1.7 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.7L7.4 4H5.6L17.7 20Z" />
      </svg>
    );
  }
  if (type === 'telegram') {
    return (
      <svg {...common}>
        <path d="M21.9 3.5 2.6 11.1c-1.3.5-1.3 1.2-.2 1.6l4.9 1.5 1.9 5.8c.2.6.5.8.9.8s.5-.1.8-.4l2.4-2.3 5 3.7c.9.5 1.5.2 1.7-.8L23 5c.3-1.2-.4-1.8-1.1-1.5ZM8.5 14.9l9.6-6.4c.4-.3.8-.1.5.2l-8 7.5-.3 3.2-1.3-4.5Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M20.3 5.3A18 18 0 0 0 15.7 4l-.3.6a15 15 0 0 1 4 1.4 16.9 16.9 0 0 0-14.8 0 15 15 0 0 1 4-1.4L8.3 4a18 18 0 0 0-4.6 1.3C1 9.6.3 13.8.6 18a17.9 17.9 0 0 0 5.4 2.7l.8-1.3a11.6 11.6 0 0 1-1.8-.9l.5-.4a12.9 12.9 0 0 0 11 0l.5.4a11.6 11.6 0 0 1-1.8.9l.8 1.3A17.8 17.8 0 0 0 21.4 18c.4-4.8-.8-9-4.7-12.7ZM9 15.2c-.9 0-1.6-.8-1.6-1.8S8.1 11.6 9 11.6s1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-footer-bg">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-0.5">
              <span className="text-base font-bold text-ink">Flow</span>
              <span className="text-base font-bold text-primary">Dex</span>
              <span className="ml-1 text-base font-bold text-ink">Protocol</span>
            </Link>
            <p className="mt-3 max-w-[240px] text-sm text-ink-faint">Trade Everything. Know Everything.</p>
            <div className="mt-4 flex items-center gap-4">
              {(['x', 'telegram', 'discord'] as const).map((s) => (
                <a
                  key={s}
                  href={COMMUNITY_LINKS[s === 'x' ? 0 : s === 'telegram' ? 1 : 2].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-faint transition-colors hover:text-ink"
                  aria-label={s}
                >
                  <SocialIcon type={s} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-faint">Research</div>
            <ul className="space-y-2.5">
              {RESEARCH_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-faint transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-faint">Legal</div>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-faint transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-faint">Community</div>
            <ul className="space-y-2.5">
              {COMMUNITY_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-faint transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-3 border-t border-border pt-5 text-center sm:flex-row sm:text-left">
          <span className="text-xs text-ink-faint">© {new Date().getFullYear()} FlowDex Protocol. All rights reserved.</span>
          <span className="text-[11px] text-ink-faint">
            This is not financial advice. $FDP is a utility token. Cryptocurrency purchases carry risk, including total loss of funds.
          </span>
        </div>

        <div className="mt-3 text-center sm:text-left">
          <a href="mailto:support@flowdexprotocol.com" className="text-[11px] text-ink-faint transition-colors hover:text-ink">
            Support: support@flowdexprotocol.com
          </a>
        </div>
      </Container>
    </footer>
  );
}
