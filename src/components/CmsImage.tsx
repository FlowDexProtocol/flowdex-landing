'use client';

import { useState, type ReactNode } from 'react';
import { sanitizeImageUrl } from '@/lib/url-safety';

// Wraps a CMS-sourced <img>: empty/null src, an unsafe URL (only https://
// is allowed — no javascript:/data:/vbscript:), or a runtime load failure
// all fall back to the same placeholder instead of a broken image icon.
export default function CmsImage({
  src,
  alt,
  className = '',
  fallback,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallback: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const safeSrc = sanitizeImageUrl(src);

  if (!safeSrc || failed) return <>{fallback}</>;

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={safeSrc} alt={alt} className={className} onError={() => setFailed(true)} />;
}
