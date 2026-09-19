'use client';

import { useState } from 'react';
import type { Tier } from '@/lib/types';
import { formatCompactUSD, formatTokenPrice, toNum } from '@/lib/format';
import { PURCHASE_URL } from '@/lib/api';
import { Accordion, AccordionItem } from './Accordion';

export default function TiersAccordion({ tiers }: { tiers: Tier[] }) {
  const [openId, setOpenId] = useState<number | null>(tiers.find((t) => t.is_active)?.id ?? null);

  return (
    <Accordion>
      {tiers.map((tier, i) => {
        const unlockMonths = tier.cliff_months + tier.vest_months;
        return (
          <AccordionItem
            key={tier.id}
            isOpen={openId === tier.id}
            onToggle={() => setOpenId((id) => (id === tier.id ? null : tier.id))}
            header={
              <>
                <div className="acc-l">
                  <span className="acc-name">{tier.name}</span>
                  <span className="acc-sub">Tier {i + 1}</span>
                </div>
                <div className="acc-r">
                  <span className="acc-pl">Price</span>
                  <span className="acc-pv">{formatTokenPrice(tier.price)}</span>
                  {tier.is_active && (
                    <a href={PURCHASE_URL} target="_blank" rel="noopener noreferrer" className="acc-buy" onClick={(e) => e.stopPropagation()}>
                      Buy
                    </a>
                  )}
                  <span className="acc-tog">{openId === tier.id ? '−' : '+'}</span>
                </div>
              </>
            }
          >
            <p>
              {toNum(tier.tge_percentage)}% unlocks at TGE
              {tier.cliff_months > 0 ? `, then a ${tier.cliff_months}-month cliff` : ''}
              {tier.vest_months > 0 ? `, followed by ${tier.vest_months}-month linear vesting` : ''}
              {unlockMonths > 0 ? ` — fully unlocked after ${unlockMonths} months.` : ' — fully unlocked instantly.'} Hard cap{' '}
              {formatCompactUSD(tier.hard_cap_usd)}, {formatCompactUSD(tier.total_raised_usd)} raised so far.
            </p>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
