// ══════════════════════════════════════════════════
// src/lib/sanitize.ts
// Server-safe HTML sanitizer for admin-authored content (currently: blog
// post bodies from the admin dashboard's rich text editor). Uses
// sanitize-html (htmlparser2-based, no DOM) rather than DOMPurify/
// isomorphic-dompurify — the latter's jsdom dependency requires Node
// >=22.13, which broke production builds on a Node 22.11 build server.
//
// Pinned to 2.17.5 (not latest) deliberately: 2.17.6+ requires Node
// >=22.12, which still excludes that build server. 2.17.5 does carry two
// known advisories (GHSA-jxwj-j7wr-gfrw, GHSA-g8qq-57p8-ggw5), but BOTH
// require opting `textarea`/`xmp` or SVG animation tags into
// allowedTags to be reachable — neither is ever in ALLOWED_TAGS below
// (nor should they be), so this configuration sits outside both
// vulnerable paths. Re-check this if bumping sanitize-html or widening
// the allowlist.
// ══════════════════════════════════════════════════

import sanitizeHtmlLib from 'sanitize-html';

// Matches exactly what flowdex-admin's rich text editor toolbar can
// produce (see RichTextEditor.tsx's FORMATS list) — a tighter allowlist
// than sanitize-html's own defaults, not a looser one.
const ALLOWED_TAGS = ['h2', 'h3', 'h4', 'p', 'br', 'strong', 'em', 'u', 's', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img'];

const ALLOWED_ATTRIBUTES: sanitizeHtmlLib.IOptions['allowedAttributes'] = {
  a: ['href'],
  img: ['src', 'alt'],
};

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';
  return sanitizeHtmlLib(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    // https-only, same convention as sanitizeImageUrl/isSafeLinkUrl in
    // url-safety.ts — relative paths (no scheme) still pass through.
    allowedSchemes: ['https'],
    allowedSchemesByTag: { img: ['https'] },
    transformTags: {
      a: sanitizeHtmlLib.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }),
    },
  });
}
