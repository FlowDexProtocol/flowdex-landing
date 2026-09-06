import type { Metadata } from 'next';
import Link from 'next/link';
import { cms, fetchPageContent, fetchTeam } from '@/lib/cms';
import { SocialIcon } from '@/components/Footer';
import CmsImage from '@/components/CmsImage';
import { Container, Section, SectionHeading } from '@/components/ui';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

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

  const socialLinks = [
    { key: 'x' as const, label: 'X / Twitter', href: cms(cmsGlobal, 'social', 'twitter', 'https://x.com/flowdexprotocol') },
    { key: 'telegram' as const, label: 'Telegram', href: cms(cmsGlobal, 'social', 'telegram', 'https://t.me/flowdexprotocol') },
    { key: 'discord' as const, label: 'Discord', href: cms(cmsGlobal, 'social', 'discord', 'https://discord.gg/flowdexprotocol') },
  ];

  return (
    <>
      <section className="border-b border-border bg-radial-glow py-14 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-3xl font-bold text-ink sm:text-5xl">
              About <span className="text-primary">FlowDex Protocol</span>
            </h1>
          </Reveal>
        </Container>
      </section>

      <Section>
        <div className="mx-auto max-w-[800px] space-y-16">
          {/* Our Mission */}
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">Our Mission</h2>
              <p className="mt-4 text-sm leading-[1.7] text-ink-dim sm:text-base">
                To build a single intelligent trading layer that unifies every financial market. No more switching
                between exchanges. No more missed signals. One platform for everything.
              </p>
            </div>
          </Reveal>

          {/* What We're Building */}
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">What We&rsquo;re Building</h2>
              <p className="mt-4 text-sm leading-[1.7] text-ink-dim sm:text-base">
                FlowDex combines a Universal Exchange — one interface to trade crypto, stocks, forex, and
                commodities with cross-chain routing that finds the best price — with a Blockchain Intelligence
                Terminal for AI-powered whale tracking, pattern detection, and predictive signals. Both run on
                FlowChain, our own Layer 1 blockchain launching in Phase 3, where $FDP holders become validators.
              </p>
              <Link href="/#ecosystem" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                See the full ecosystem &rarr;
              </Link>
            </div>
          </Reveal>

          {/* The $FDP Token */}
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">The $FDP Token</h2>
              <p className="mt-4 text-sm leading-[1.7] text-ink-dim sm:text-base">
                $FDP powers everything on FlowDex. Holders stake for a share of protocol trading fees, vote on
                governance decisions, get priority order routing, and unlock premium Intelligence Terminal
                features — all backed by a fixed 10 billion token supply with no inflation.
              </p>
              <Link href="/tokenomics" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                Read the full tokenomics &rarr;
              </Link>
            </div>
          </Reveal>

          {/* Team */}
          <div>
            <SectionHeading title="Team" center={false} />
            {team.length === 0 ? (
              <p className="text-sm leading-[1.7] text-ink-dim sm:text-base">
                Our team combines experience in DeFi, AI, and traditional finance. Team details coming soon.
              </p>
            ) : (
              <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
                {team.map((member) => (
                  <StaggerItem key={member.id}>
                    <div className="h-full rounded-xl border border-border bg-card p-5">
                      <CmsImage
                        src={member.photo_url}
                        alt={member.name}
                        className="h-16 w-16 rounded-full object-cover"
                        fallback={
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-dim text-lg font-bold text-primary">
                            {member.name.charAt(0)}
                          </div>
                        }
                      />
                      <p className="mt-3 text-base font-bold text-ink">{member.name}</p>
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">{member.role}</p>
                      {member.bio && <p className="mt-2 text-xs leading-relaxed text-ink-faint">{member.bio}</p>}
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block text-xs font-semibold text-primary hover:underline"
                        >
                          LinkedIn &rarr;
                        </a>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </div>

          {/* Contact */}
          <Reveal>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">Contact</h2>
              <a
                href={`mailto:${supportEmail}`}
                className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
              >
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
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
