import Link from 'next/link';
import { cms, fetchPageContent } from '@/lib/cms';
import CmsMedia from './CmsMedia';
import { isSafeLinkUrl } from '@/lib/url-safety';

const LEGAL_LINKS = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Legal Notice', href: '/legal' },
  { label: 'FAQs', href: '/faq' },
];

export function SocialIcon({ type }: { type: 'x' | 'telegram' }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' } as const;
  if (type === 'x') {
    return (
      <svg {...common}>
        <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.7l-5.2-6.8L5.6 22H2.5l8.1-9.3L1.7 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.7L7.4 4H5.6L17.7 20Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M21.9 3.5 2.6 11.1c-1.3.5-1.3 1.2-.2 1.6l4.9 1.5 1.9 5.8c.2.6.5.8.9.8s.5-.1.8-.4l2.4-2.3 5 3.7c.9.5 1.5.2 1.7-.8L23 5c.3-1.2-.4-1.8-1.1-1.5ZM8.5 14.9l9.6-6.4c.4-.3.8-.1.5.2l-8 7.5-.3 3.2-1.3-4.5Z" />
    </svg>
  );
}

function LogoDrops() {
  return (
    <div className="f-logo-drops">
      <div className="f-drop f-drop-1" />
      <div className="f-drop f-drop-2" />
    </div>
  );
}

export default async function Footer() {
  const cmsGlobal = await fetchPageContent('global');
  const logoType = cms(cmsGlobal, 'logo', 'type', 'text');
  const logoImageUrl = cms(cmsGlobal, 'logo', 'image_url', '');
  const logoMain = cms(cmsGlobal, 'logo', 'text_main', 'Flow');
  const logoAccent = cms(cmsGlobal, 'logo', 'text_accent', 'Dex');
  const supportEmail = cms(cmsGlobal, 'site', 'support_email', 'support@flowdexprotocol.com');
  const disclaimer = cms(
    cmsGlobal,
    'footer',
    'disclaimer',
    'This is not financial advice. FDP is a utility token. Cryptocurrency purchases carry risk, including total loss of funds.'
  );

  const safeSocialUrl = (raw: string, fallback: string) => (isSafeLinkUrl(raw) ? raw : fallback);
  const socialLinks = [
    {
      key: 'x' as const,
      label: 'X / Twitter',
      href: safeSocialUrl(cms(cmsGlobal, 'social', 'twitter', 'https://x.com/flowdexprotocol'), 'https://x.com/flowdexprotocol'),
    },
    {
      key: 'telegram' as const,
      label: 'Telegram',
      href: safeSocialUrl(cms(cmsGlobal, 'social', 'telegram', 'https://t.me/flowdexprotocol'), 'https://t.me/flowdexprotocol'),
    },
  ];

  return (
    <footer>
      <div className="footer">
        <div className="f-left">
          <Link href="/" className="f-logo">
            {logoType === 'image' || logoType === 'animated' ? (
              <CmsMedia src={logoImageUrl} alt={`${logoMain}${logoAccent}`} className="h-7 w-auto object-contain" fallback={<LogoDrops />} />
            ) : (
              <LogoDrops />
            )}
            <div className="f-logo-text">
              <span className="f-logo-name">
                <em>{logoMain}</em>
                {logoAccent}
              </span>
              <span className="f-logo-sub">Protocol</span>
            </div>
          </Link>
          <div className="f-legal">
            All rights reserved.
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="f-right">
          {socialLinks.map((l) => (
            <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" className="f-link">
              <span className="f-link-inner">
                <SocialIcon type={l.key} />
                {l.label}
              </span>
              <span className="f-icon">↗</span>
            </a>
          ))}
          <a href={`mailto:${supportEmail}`} className="f-link">
            <span className="f-link-inner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {supportEmail}
            </span>
            <span className="f-icon">↗</span>
          </a>
        </div>
      </div>

      <div className="f-disc">
        © {new Date().getFullYear()} FlowDex Protocol. {disclaimer}
      </div>
    </footer>
  );
}
