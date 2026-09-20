import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieConsent from '@/components/CookieConsent';
import PageLoader from '@/components/PageLoader';
import BackToTop from '@/components/BackToTop';
import { fetchPageContent } from '@/lib/cms';
import './globals.css';

const SITE_URL = 'https://flowdexprotocol.com';

// Design system: Cormorant Garamond for headlines (weight 300, italic for
// emphasis), Inter for body/nav/labels, JetBrains Mono for numbers/prices —
// same three-family split and weights as the prototype's own Google Fonts
// request.
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
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
  themeColor: '#161660',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const [cmsGlobal, cmsNav, cmsHome] = await Promise.all([
    fetchPageContent('global'),
    fetchPageContent('nav'),
    fetchPageContent('home'),
  ]);

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <PageLoader />
        <GoogleAnalytics />
        {/* Plain (non-root) clip wrapper, deliberately not on <body> itself:
            <body> is the propagation target for the viewport's own overflow
            when <html> has no explicit overflow, and that root-propagated
            mode turned out not to reliably clip full-bleed decorative
            elements (background blobs, tab watermark text) — confirmed via
            a real before/after screenshot of window.scrollTo(300, 0)
            visibly shifting page content left, even though
            getComputedStyle(body).overflowX correctly reported "hidden".
            An ordinary descendant div has no such root special-casing and
            clips reliably. */}
        <div className="flex min-h-screen flex-col overflow-x-hidden">
          <Header cmsGlobal={cmsGlobal} cmsNav={cmsNav} cmsHome={cmsHome} />
          <main className="flex-1 pb-16 sm:pb-0">{children}</main>
          <Footer />
          <MobileStickyBar />
          <CookieConsent cmsGlobal={cmsGlobal} />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
