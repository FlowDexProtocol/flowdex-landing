import type { Numeric } from './types';

export function toNum(value: Numeric | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const n = typeof value === 'string' ? parseFloat(value) : value;
  return Number.isFinite(n) ? n : 0;
}

export function formatUsd(value: Numeric | null | undefined, opts: Intl.NumberFormatOptions = {}): string {
  const n = toNum(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...opts,
  }).format(n);
}

export function formatCompactUsd(value: Numeric | null | undefined): string {
  const n = toNum(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
}

export function formatTokens(value: Numeric | null | undefined, maxDecimals = 0): string {
  const n = toNum(value);
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: maxDecimals }).format(n);
}

export function formatPrice(value: Numeric | null | undefined, decimals = 4): string {
  const n = toNum(value);
  return `$${n.toFixed(decimals)}`;
}

export function formatPct(value: number, decimals = 1): string {
  if (!Number.isFinite(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
}
