'use client';

import { useState, type FormEvent } from 'react';
import { BuyButton, Container, Input } from './ui';
import Reveal from './motion/Reveal';
import { scaleIn } from '@/lib/motion';

export default function FinalCta() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    if (email.includes('@')) setSubscribed(true);
  }

  return (
    <section className="bg-gradient-to-b from-bg to-[#0a1525] py-16 text-center sm:py-24">
      <Container>
        <Reveal variants={scaleIn}>
          <div className="mx-auto max-w-lg">
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">Don&rsquo;t Miss the Lowest Price</h2>
            <p className="mt-3 text-base text-ink-dim sm:text-lg">Tier 1 won&rsquo;t last forever. Every tier costs more.</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BuyButton>Buy $FDP Now</BuyButton>
            </div>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="mx-auto mt-6 flex max-w-sm flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-br from-primary to-[#0090B0] px-5 py-2.5 text-sm font-semibold text-[#03131a] transition-transform hover:-translate-y-0.5"
                >
                  Get Updates
                </button>
              </form>
            ) : (
              <div className="mx-auto mt-6 max-w-sm rounded-lg border border-primary-border bg-primary-dim px-4 py-3">
                <span className="text-sm font-semibold text-primary">Subscribed!</span>
              </div>
            )}

            <p className="mt-8 text-xs text-ink-faint">Join the community</p>
            <div className="mt-2 flex justify-center gap-5">
              {['X', 'Telegram', 'Discord'].map((s) => (
                <a
                  key={s}
                  href={s === 'X' ? 'https://x.com/flowdexprotocol' : s === 'Telegram' ? 'https://t.me/flowdexprotocol' : 'https://discord.gg/flowdexprotocol'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-ink-faint transition-colors hover:text-ink"
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
