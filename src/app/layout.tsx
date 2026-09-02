import type { Metadata, Viewport } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';

const SITE_URL = 'https://flowdexprotocol.com';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const DEFAULT_TITLE = 'FlowDex Protocol ($FDP) — Trade Everything. Know Everything.';
const DEFAULT_DESCRIPTION =
  'FlowDex Protocol unifies crypto, stocks, forex, and commodities into a single intelligent trading layer. $FDP powers fee sharing, governance, and market intelligence.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s — FlowDex Protocol',
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: 'FlowDex Protocol',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060d18',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg text-ink antialiased">
        <GoogleAnalytics />
        <Header />
        <main className="flex-1 pb-16 sm:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
        <CookieConsent />
      </body>
    </html>
  );
}
