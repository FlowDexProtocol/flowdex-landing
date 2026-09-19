'use client';

import { useState } from 'react';
import type { CmsFaq } from '@/lib/types';
import { Accordion, AccordionItem } from './Accordion';

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
    <div className="mx-auto max-w-2xl">
      {Array.from(grouped.entries()).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h2 className="sec-label">{CATEGORY_LABELS[category] || category}</h2>
          <Accordion>
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((id) => (id === item.id ? null : item.id))}
                header={
                  <>
                    <span className="faq-q">{item.question}</span>
                    <span className="acc-tog">{openId === item.id ? '−' : '+'}</span>
                  </>
                }
              >
                <p>{item.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
