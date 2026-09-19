'use client';

import { useState } from 'react';
import { Accordion, AccordionItem } from './Accordion';

export default function FaqSectionClient({ items }: { items: { id: number; question: string; answer: string }[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
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
  );
}
