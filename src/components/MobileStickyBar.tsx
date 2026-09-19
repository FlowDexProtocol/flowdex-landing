import { PURCHASE_URL } from '@/lib/api';

export default function MobileStickyBar() {
  return (
    <div className="mobile-buy">
      <a href={PURCHASE_URL} target="_blank" rel="noopener noreferrer">
        Buy $FDP
      </a>
    </div>
  );
}
