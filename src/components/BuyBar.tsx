'use client';

import { PURCHASE_URL } from '@/lib/api';

const PAYMENT_METHODS = [
  { label: 'ETH', icon: '⟠' },
  { label: 'USDT', icon: '₮' },
  { label: 'USDC', icon: '$' },
  { label: 'BNB', icon: '◆' },
  { label: 'SOL', icon: '◎' },
  { label: 'BTC', icon: '₿' },
  { label: 'TRX', icon: '◈' },
];

export default function BuyBar() {
  return (
    <div className="buy-bar">
      <div className="buy-bar-inner">
        <div className="buy-bar-methods">
          <span className="buy-bar-label">Pay with</span>
          {PAYMENT_METHODS.map((m) => (
            <span key={m.label} className="buy-bar-method" title={m.label}>
              <span className="buy-bar-method-icon">{m.icon}</span>
              <span className="buy-bar-method-name">{m.label}</span>
            </span>
          ))}
        </div>
        <a
          href={PURCHASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="buy-bar-btn"
        >
          Buy FDP Now
        </a>
      </div>
    </div>
  );
}
