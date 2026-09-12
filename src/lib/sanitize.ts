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
//
// The admin's editor is TipTap (ProseMirror) — this allowlist is matched
// against its ACTUAL getHTML() output (verified against real saved posts,
// not assumed from docs), which is more elaborate than the old Quill
// editor's: <colgroup>/<col> inside tables, a wrapping <div
// data-youtube-video> around YouTube's <iframe>, inline style attributes
// for text-align/color/font-size/highlight/image-width-and-alignment.
// Every one of those is allowed narrowly — specific tags, specific
// attributes, and (via allowedStyles) specific CSS properties with
// regex-validated values — never a blanket "allow style" or "allow
// iframe" that would open real injection surface.
// ══════════════════════════════════════════════════

import sanitizeHtmlLib from 'sanitize-html';

const ALLOWED_TAGS = [
  'h2', 'h3', 'h4', 'p', 'br', 'strong', 'em', 'u', 's', 'sub', 'sup', 'mark', 'span',
  'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'hr', 'a', 'img',
  'table', 'colgroup', 'col', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'iframe',
];

// Colors always come from either a preset swatch or a native <input
// type="color"> in the admin's toolbar — both always produce a plain hex
// string, never free text, so a strict hex pattern is the correct
// (not just convenient) validation here.
const HEX_COLOR = /^#[0-9a-fA-F]{3,8}$/;
const CSS_LENGTH = /^\d+(\.\d+)?(px|%|em|rem)$/;
const PX_LENGTH = /^\d+(\.\d+)?px$/;
const TEXT_ALIGN = /^(left|center|right|justify)$/;

const ALLOWED_ATTRIBUTES: sanitizeHtmlLib.IOptions['allowedAttributes'] = {
  a: ['href', 'target', 'rel'],
  img: ['src', 'alt', 'style', 'width', 'height', 'data-align'],
  span: ['style'],
  mark: ['style', 'data-color'],
  p: ['style'],
  h2: ['style'],
  h3: ['style'],
  h4: ['style'],
  table: ['style'],
  col: ['style'],
  td: ['style', 'colspan', 'rowspan'],
  th: ['style', 'colspan', 'rowspan'],
  // The only attribute TipTap's Youtube extension puts on its wrapper div
  // — a presence-only marker, never a value worth validating.
  div: ['data-youtube-video'],
  // TipTap's Youtube extension renders every one of these as literal
  // boolean/numeric embed params (see @tiptap/extension-youtube's
  // renderHTML) — none carry free text, so allowing the fixed set is
  // exactly as safe as allowing none of them.
  iframe: [
    'src', 'width', 'height', 'title', 'frameborder', 'allow', 'allowfullscreen',
    'autoplay', 'disablekbcontrols', 'enableiframeapi', 'endtime', 'ivloadpolicy',
    'loop', 'modestbranding', 'origin', 'playlist', 'rel', 'start', 'class',
  ],
};

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';
  return sanitizeHtmlLib(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    // https-only, same convention as sanitizeImageUrl/isSafeLinkUrl in
    // url-safety.ts — relative paths (no scheme) still pass through.
    allowedSchemes: ['https'],
    allowedSchemesByTag: { img: ['https'], iframe: ['https'] },
    // Closes off "arbitrary iframe embedding" — the one meaningfully new
    // risk in this allowlist — down to exactly the hosts TipTap's Youtube
    // extension itself ever generates a src for. Any other iframe src
    // (or a relative one, which would bypass hostname checking) is
    // stripped entirely, not merely re-hosted.
    allowedIframeHostnames: ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'youtube-nocookie.com'],
    allowIframeRelativeUrls: false,
    allowedStyles: {
      '*': {
        'text-align': [TEXT_ALIGN],
      },
      span: {
        color: [HEX_COLOR],
        'background-color': [HEX_COLOR],
        'font-size': [CSS_LENGTH],
      },
      mark: {
        'background-color': [HEX_COLOR],
        color: [/^inherit$/],
      },
      img: {
        display: [/^block$/],
        width: [CSS_LENGTH],
        'margin-left': [/^(auto|0)$/],
        'margin-right': [/^(auto|0)$/],
      },
      table: {
        width: [PX_LENGTH],
        'min-width': [PX_LENGTH],
      },
      col: {
        width: [PX_LENGTH],
        'min-width': [PX_LENGTH],
      },
    },
    transformTags: {
      a: sanitizeHtmlLib.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }),
    },
  });
}
