// ══════════════════════════════════════════════════
// src/lib/json-ld.ts
// Shared helpers for emitting JSON-LD structured data.
//
// Structured data is how retrieval systems (search crawlers, and the
// AI answer engines that now sit in front of them) resolve "FlowDex
// Protocol" to a single confident entity rather than guessing from
// prose. Organization/WebSite schema on every page and FAQPage schema
// on the FAQ route are the two highest-value markers; without them a
// crawler has no machine-readable statement of who this site belongs
// to or what questions it answers.
// ══════════════════════════════════════════════════

export const SITE_URL = 'https://flowdexprotocol.com';

/**
 * Serialises a value for embedding inside a <script type="application/ld+json">
 * tag.
 *
 * Any CMS-sourced string (an FAQ answer, a post title) containing the
 * literal text "</script>" would prematurely close the surrounding tag
 * and let the remainder of its value execute as real markup — the
 * well-known JSON-in-<script> injection vector. DOMPurify does not
 * apply (this is a JSON blob, not HTML); escaping "<" to its Unicode
 * escape is the correct fix, and round-trips cleanly for both
 * JSON.parse and every JSON-LD consumer.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Flattens rich-text-editor HTML to plain text.
 *
 * Schema.org permits a limited HTML subset inside acceptedAnswer.text,
 * but admin-authored markup is not guaranteed to stay inside it, and
 * plain text is both safer and more cleanly extractable by answer
 * engines. Entities are decoded after tag stripping so "&amp;" reads as
 * "&" rather than leaking an encoded entity into the structured data.
 */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    // Tags collapse to a space, so an inline tag closing before punctuation
    // ("<strong>FlowDex</strong>.") would otherwise leave "FlowDex .". This
    // text is quoted verbatim by answer engines, so the gap is worth closing.
    .replace(/\s+([.,;:!?)\]])/g, '$1')
    .replace(/([(\[])\s+/g, '$1')
    .trim();
}

/**
 * The project's canonical entity description, emitted on every page via
 * the root layout. Two nodes in one @graph: the Organization (who we
 * are) and the WebSite (what this domain is), linked by publisher so a
 * consumer can resolve one from the other.
 *
 * Wording here deliberately describes the exchange and terminal as
 * under development. Structured data is quoted back verbatim by answer
 * engines, so a present-tense claim about an unshipped product becomes
 * a machine-readable assertion we would have to defend.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'FlowDex Protocol',
        alternateName: 'FlowDex',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/icon-512.png`,
          width: 512,
          height: 512,
        },
        description:
          'FlowDex Protocol is developing a non-custodial Universal Exchange and an on-chain Intelligence Terminal, funded by a 20-tier presale of the FDP token. FDP is an ERC-20 token on Ethereum with a fixed supply of 100 billion.',
        foundingDate: '2025',
        sameAs: ['https://x.com/flowdexprotocol', 'https://t.me/flowdexprotocol'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@flowdexprotocol.com',
          url: `${SITE_URL}/about`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'FlowDex Protocol',
        description:
          'Official site for FlowDex Protocol: the FDP presale, tokenomics, roadmap, and whitepaper.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
      },
    ],
  };
}
