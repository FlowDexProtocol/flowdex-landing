import type { Metadata } from 'next';
import Link from 'next/link';
import { cms, fetchPageContent, fetchTeam } from '@/lib/cms';
import { SocialIcon } from '@/components/Footer';
import CmsImage from '@/components/CmsImage';
import { Section, SectionHeading } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { isSafeLinkUrl } from '@/lib/url-safety';

const ABOUT_DESCRIPTION =
  'FlowDex Protocol unifies every financial market into one intelligent trading layer. Learn our mission, what we\'re building, and the team behind $FDP.';

export const metadata: Metadata = {
  title: 'About',
  description: ABOUT_DESCRIPTION,
  openGraph: { title: 'About — FlowDex Protocol', description: ABOUT_DESCRIPTION },
  twitter: { title: 'About — FlowDex Protocol', description: ABOUT_DESCRIPTION },
};

export default async function AboutPage() {
  const [cmsGlobal, team] = await Promise.all([fetchPageContent('global'), fetchTeam()]);
  const supportEmail = cms(cmsGlobal, 'site', 'support_email', 'support@flowdexprotocol.com');

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
    {
      key: 'discord' as const,
      label: 'Discord',
      href: safeSocialUrl(
        cms(cmsGlobal, 'social', 'discord', 'https://discord.gg/flowdexprotocol'),
        'https://discord.gg/flowdexprotocol'
      ),
    },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-glow" />
        <Reveal>
          <h1>
            About <em>FlowDex Protocol</em>
          </h1>
        </Reveal>
      </div>

      <Section>
        <div className="mx-auto max-w-[720px]">
          <div className="space-y-16">
            <Reveal>
              <div>
                <h2 className="sec-title" style={{ fontSize: '30px', marginBottom: '10px' }}>
                  Our Mission
                </h2>
                <p className="doc-body">
                  To build a single intelligent trading layer that unifies every financial market. No more switching between
                  exchanges. No more missed signals. One platform for everything.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="sec-title" style={{ fontSize: '30px', marginBottom: '10px' }}>
                  What We&rsquo;re Building
                </h2>
                <p className="doc-body">
                  FlowDex combines a Universal Exchange — one interface to trade crypto, stocks, forex, and commodities with
                  cross-chain routing that finds the best price — with a Blockchain Intelligence Terminal for AI-powered whale
                  tracking, pattern detection, and predictive signals. Both run on FlowChain, our own Layer 1 blockchain
                  launching in Phase 3, where $FDP holders become validators.
                </p>
                <Link href="/#ecosystem" className="mt-3 inline-block font-sans text-sm font-semibold text-primary hover:underline">
                  See the full ecosystem &rarr;
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="sec-title" style={{ fontSize: '30px', marginBottom: '10px' }}>
                  The $FDP Token
                </h2>
                <p className="doc-body">
                  $FDP powers everything on FlowDex. Holders stake for a share of protocol trading fees, vote on governance
                  decisions, get priority order routing, and unlock premium Intelligence Terminal features — all backed by a
                  fixed 10 billion token supply with no inflation.
                </p>
                <Link href="/tokenomics" className="mt-3 inline-block font-sans text-sm font-semibold text-primary hover:underline">
                  Read the full tokenomics &rarr;
                </Link>
              </div>
            </Reveal>

            <div>
              <SectionHeading label="Team" title="The People Behind FlowDex" />
              {team.length === 0 ? (
                <p className="doc-body">Our team combines experience in DeFi, AI, and traditional finance. Team details coming soon.</p>
              ) : (
                <StaggerGroup className="team-grid">
                  {team.map((member) => (
                    <StaggerItem key={member.id}>
                      <div className="team-card">
                        <div className="team-avatar">
                          <CmsImage
                            src={member.photo_url}
                            alt={member.name}
                            className="h-full w-full object-cover"
                            fallback={<>{member.name.charAt(0)}</>}
                          />
                        </div>
                        <h4>{member.name}</h4>
                        <p>{member.role}</p>
                        {member.bio && <p className="mt-2">{member.bio}</p>}
                        {member.linkedin_url && isSafeLinkUrl(member.linkedin_url) && (
                          <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline">
                            LinkedIn &rarr;
                          </a>
                        )}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              )}
            </div>

            <Reveal className="rounded-xl border border-border bg-card p-8 text-center">
              <h2 className="sec-title" style={{ fontSize: '30px', marginBottom: '10px' }}>
                Contact
              </h2>
              <a href={`mailto:${supportEmail}`} className="font-sans text-sm font-semibold text-primary hover:underline">
                {supportEmail}
              </a>
              <div className="mt-5 flex items-center justify-center gap-2">
                {socialLinks.map((l) => (
                  <a
                    key={l.key}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center text-ink-faint transition-colors hover:text-ink"
                    aria-label={l.label}
                  >
                    <SocialIcon type={l.key} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
