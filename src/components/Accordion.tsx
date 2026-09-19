import type { ReactNode } from 'react';

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="accordion">{children}</div>;
}

export function AccordionItem({
  isOpen,
  onToggle,
  header,
  children,
}: {
  isOpen: boolean;
  onToggle: () => void;
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="acc-item" onClick={onToggle}>
      <div className="acc-h">{header}</div>
      <div className={`acc-body${isOpen ? ' open' : ''}`}>
        <div className="acc-body-in">{children}</div>
      </div>
    </div>
  );
}
