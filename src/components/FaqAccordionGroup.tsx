'use client';

import { useState } from 'react';
import type { CmsFaq } from '@/lib/types';

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General',
  presale: 'Presale',
  tokenomics: 'Tokenomics',
  referral: 'Referrals',
  security: 'Security',
};

export default function FaqAccordionGroup({ faqs }: { faqs: CmsFaq[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  const grouped = new Map<string, CmsFaq[]>();
  for (const f of faqs) {
    if (!grouped.has(f.category)) grouped.set(f.category, []);
    grouped.get(f.category)!.push(f);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      {Array.from(grouped.entries()).map(([category, items]) => (
        <div key={category}>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
            {CATEGORY_LABELS[category] || category}
          </h2>
          <div className="space-y-1">
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className={`block w-full rounded-lg border px-5 py-4 text-left transition-colors ${
                    isOpen ? 'border-primary/25 bg-primary-dim' : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-ink sm:text-base">{item.question}</span>
                    <span className={`shrink-0 text-lg text-ink-faint transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </div>
                  {isOpen && <p className="mt-3 text-sm leading-relaxed text-ink-faint">{item.answer}</p>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
