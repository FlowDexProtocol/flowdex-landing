'use client';

import { useState, type ReactNode } from 'react';

// Wraps a CMS-sourced <img>: empty/null src or a runtime load failure both
// fall back to the same placeholder instead of a broken image icon.
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

  if (!src || failed) return <>{fallback}</>;

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}
