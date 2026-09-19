'use client';

import { useState, type FormEvent } from 'react';
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
    <section className="cta-sec">
      <Reveal variants={scaleIn}>
        <h2>{cms(cmsHome, 'cta', 'title', "Don't Miss the Lowest Price")}</h2>
        <p className="cta-sub">{cms(cmsHome, 'cta', 'subtitle', "Tier 1 won't last forever. Every tier costs more.")}</p>
        <p className="cta-social-proof">{cms(cmsHome, 'cta', 'social_proof', 'Join early supporters buying $FDP')}</p>

        <div className="cta-row">
          <a href="https://purchase.flowdexprotocol.com" target="_blank" rel="noopener noreferrer" className="pill">
            {cms(cmsHome, 'cta', 'button_text', 'Buy $FDP Now')}
          </a>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="email-g">
              <input
                type="email"
                placeholder={cms(cmsHome, 'cta', 'subscribe_placeholder', 'your@email.com')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-in"
              />
              <button type="submit" disabled={submitting} className="email-bt">
                {submitting ? 'Submitting…' : 'Get Updates'}
              </button>
            </form>
          ) : (
            <span className="cta-social-proof">You&rsquo;re subscribed!</span>
          )}
        </div>
        {error && <p className="mt-3 text-xs text-red">{error}</p>}

        <div className="socials">
          {[
            { label: 'X / Twitter', href: 'https://x.com/flowdexprotocol' },
            { label: 'Telegram', href: 'https://t.me/flowdexprotocol' },
            { label: 'Discord', href: 'https://discord.gg/flowdexprotocol' },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
