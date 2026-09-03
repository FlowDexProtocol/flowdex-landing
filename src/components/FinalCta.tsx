'use client';

import { useState, type FormEvent } from 'react';
import { BuyButton, Container, Input } from './ui';
import Reveal from './motion/Reveal';
import { scaleIn } from '@/lib/motion';
import { subscribeEmail } from '@/lib/api';
import { cms, type CmsPageData } from '@/lib/cms';

export default function FinalCta({ cmsHome = {} }: { cmsHome?: CmsPageData }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.includes('@') || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      await subscribeEmail(email);
      setSubscribed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-gradient-to-b from-bg to-[#0a1525] py-16 text-center sm:py-24">
      <Container>
        <Reveal variants={scaleIn}>
          <div className="mx-auto max-w-lg">
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">{cms(cmsHome, 'cta', 'title', 'Don’t Miss the Lowest Price')}</h2>
            <p className="mt-3 text-base text-ink-dim sm:text-lg">
              {cms(cmsHome, 'cta', 'subtitle', 'Tier 1 won’t last forever. Every tier costs more.')}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BuyButton>{cms(cmsHome, 'cta', 'button_text', 'Buy $FDP Now')}</BuyButton>
            </div>

            {!subscribed ? (
              <>
                <form onSubmit={handleSubscribe} className="mx-auto mt-6 flex max-w-sm flex-col gap-2 sm:flex-row">
                  <Input
                    type="email"
                    placeholder={cms(cmsHome, 'cta', 'subscribe_placeholder', 'your@email.com')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="min-h-11 rounded-xl bg-gradient-to-br from-primary to-[#4E65BB] px-5 py-2.5 text-sm font-semibold text-[#03131a] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {submitting ? 'Submitting…' : 'Get Updates'}
                  </button>
                </form>
                {error && <p className="mx-auto mt-2 max-w-sm text-xs text-red">{error}</p>}
              </>
            ) : (
              <div className="mx-auto mt-6 max-w-sm rounded-lg border border-primary-border bg-primary-dim px-4 py-3">
                <span className="text-sm font-semibold text-primary">You&rsquo;re subscribed!</span>
              </div>
            )}

            <p className="mt-8 text-xs text-ink-faint">Join the community</p>
            <div className="mt-2 flex justify-center gap-5">
              {['X', 'Telegram', 'Discord'].map((s) => (
                <a
                  key={s}
                  href={s === 'X' ? 'https://x.com/flowdexprotocol' : s === 'Telegram' ? 'https://t.me/flowdexprotocol' : 'https://discord.gg/flowdexprotocol'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center text-xs font-medium text-ink-faint transition-colors hover:text-ink"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
