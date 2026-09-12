'use client';

// ══════════════════════════════════════════════════
// src/components/CmsMedia.tsx
// Like CmsImage, but for a CMS field that can hold an image OR an
// animation — the ecosystem cards and the logo's "media"/"animated" field
// type. The file extension (after resolving + safety-checking the URL,
// same as CmsImage) decides img vs video; anything else this component
// can't render (a Lottie .json — no player yet) falls back same as an
// empty/invalid/failed-to-load URL.
// ══════════════════════════════════════════════════

import { useState, type ReactNode } from 'react';
import { resolveApiUrl } from '@/lib/cms';
import { sanitizeImageUrl } from '@/lib/url-safety';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

type MediaKind = 'image' | 'video' | 'unsupported';
function detectKind(url: string): MediaKind {
  const path = url.split('?')[0].split('#')[0];
  const ext = path.slice(path.lastIndexOf('.') + 1).toLowerCase();
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image';
  if (ext === 'mp4') return 'video';
  return 'unsupported';
}

export default function CmsMedia({
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
  const safeSrc = sanitizeImageUrl(resolveApiUrl(src));

  if (!safeSrc || failed) return <>{fallback}</>;

  const kind = detectKind(safeSrc);
  if (kind === 'unsupported') return <>{fallback}</>;
  if (kind === 'video') {
    return <video src={safeSrc} className={className} autoPlay loop muted playsInline onError={() => setFailed(true)} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={safeSrc} alt={alt} className={className} onError={() => setFailed(true)} />;
}
