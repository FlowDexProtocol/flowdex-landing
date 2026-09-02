import type { AnchorHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-14 sm:py-20 scroll-mt-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  center = true,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 sm:mb-14 ${center ? 'text-center' : ''}`}>
      <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">{title}</h2>
      {subtitle && <p className={`mt-3 text-sm sm:text-base text-ink-dim ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{subtitle}</p>}
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card ${className}`}>{children}</div>;
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl ${className}`}>{children}</div>;
}

export function Mono({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono tabular-nums ${className}`}>{children}</span>;
}

type BadgeTone = 'primary' | 'green' | 'red' | 'purple' | 'neutral';

export function Pill({ children, tone = 'primary', className = '' }: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  const tones: Record<BadgeTone, string> = {
    primary: 'bg-primary-dim text-primary border-primary-border',
    green: 'bg-green-dim text-green border-green/25',
    red: 'bg-red-dim text-red border-red/25',
    purple: 'bg-purple-dim text-purple border-purple/25',
    neutral: 'bg-white/5 text-ink-dim border-border',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 whitespace-nowrap';

export function BuyButton({ className = '', children = 'Buy $FDP', ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) {
  return (
    <a
      href="https://purchase.flowdexprotocol.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonBase} bg-gradient-to-br from-primary to-[#4E65BB] text-[#03131a] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(98,126,234,0.35)] ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

export function OutlineLink({
  href,
  className = '',
  children,
  external,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${buttonBase} border-[1.5px] border-border-soft text-ink-dim hover:border-primary hover:text-primary ${className}`}
    >
      {children}
    </a>
  );
}

export function ProgressBar({ pct, className = '', shimmer = false }: { pct: number; className?: string; shimmer?: boolean }) {
  const clamped = Math.min(100, Math.max(0, pct));
  return (
    <div className={`h-3 w-full overflow-hidden rounded-full border border-border bg-card ${className}`}>
      <div
        className={`h-full rounded-full transition-[width] duration-1000 ease-out ${shimmer ? 'shimmer-bar' : 'bg-green'}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-ink-faint">{children}</div>;
}

export function Input({ className = '', ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-primary ${className}`}
      {...rest}
    />
  );
}

export function EyebrowLabel({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">{children}</div>;
}
