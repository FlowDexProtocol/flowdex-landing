import type { AnchorHTMLAttributes, ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] ${className}`}>{children}</div>;
}

export function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`sec scroll-mt-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({ label, title, subtitle }: { label?: ReactNode; title: ReactNode; subtitle?: ReactNode }) {
  return (
    <div>
      {label && <div className="sec-label">{label}</div>}
      <h2 className="sec-title">{title}</h2>
      {subtitle && <p className="sec-sub">{subtitle}</p>}
    </div>
  );
}

type BadgeTone = 'primary' | 'green' | 'red' | 'purple' | 'neutral';

const badgeTones: Record<BadgeTone, string> = {
  primary: 'border-[rgba(108,92,231,0.25)] bg-[rgba(108,92,231,0.08)] text-[#a78bfa]',
  green: 'border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.08)] text-[#4ade80]',
  red: 'border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.08)] text-[#f87171]',
  purple: 'border-[rgba(168,85,247,0.25)] bg-[rgba(168,85,247,0.08)] text-[#c084fc]',
  neutral: 'border-white/10 bg-white/[0.03] text-ink-dim',
};

export function Pill({ children, tone = 'primary', className = '' }: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-[1.5px] ${badgeTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function BuyButton({
  className = '',
  children = 'Buy $FDP',
  href = 'https://purchase.flowdexprotocol.com',
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`pill ${className}`} {...rest}>
      {children}
    </a>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-10 text-center font-sans text-sm text-ink-faint">{children}</div>
  );
}
