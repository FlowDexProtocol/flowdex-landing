import type { Numeric } from './types';

export function toNum(value: Numeric | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const n = typeof value === 'string' ? parseFloat(value) : value;
  return Number.isFinite(n) ? n : 0;
}

// "$1,234.56" — always 2 decimals.
export function formatUSD(value: Numeric | null | undefined): string {
  const n = toNum(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// "$1.2M" / "$500K" — compact notation for large numbers.
export function formatCompactUSD(value: Numeric | null | undefined): string {
  const n = toNum(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
}

// "$0.0010" under $1 (4 decimals), "$1.23" at or above $1 (2 decimals).
export function formatTokenPrice(value: Numeric | null | undefined): string {
  const n = toNum(value);
  const decimals = Math.abs(n) < 1 ? 4 : 2;
  return `$${n.toFixed(decimals)}`;
}

// "500,000" — no decimals, comma-grouped.
export function formatTokenAmount(value: Numeric | null | undefined): string {
  const n = toNum(value);
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
}

// "+4,900%" / "-12%" — no decimals, comma-grouped, signed.
export function formatPercentage(value: Numeric | null | undefined): string {
  const n = toNum(value);
  const formatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.abs(n));
  return `${n >= 0 ? '+' : '-'}${formatted}%`;
}

// "0.1017 ETH" — 6 decimals under 1 unit, 4 decimals at or above (avoids
// showing "0.000000" for dust amounts while keeping larger balances tidy).
export function formatCrypto(value: Numeric | null | undefined, symbol: string): string {
  const n = toNum(value);
  const decimals = Math.abs(n) < 1 ? 6 : 4;
  return `${n.toFixed(decimals)} ${symbol}`;
}

// "0x38FC...9102" — first 6 + last 4.
export function truncateWallet(address: string | null | undefined): string {
  if (!address) return '';
  if (address.length <= 13) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
}
