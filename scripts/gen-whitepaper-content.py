#!/usr/bin/env python3
"""Parse the v9.0 whitepaper markdown into a typed TS data module.

The markdown lives outside the repo, so the parsed result is committed
instead: the Next.js route reads structured section data rather than
parsing markdown at request time. One page per numbered section, which
is the shape retrieval systems extract from best.
"""

import json
import re
import sys

SRC = '/tmp/claude-0/-home-claude/adbc62cb-d8a2-5cbc-8f09-14b4b6f75a54/scratchpad/whitepaper-v9-corrected.md'
OUT = '/home/claude/flowdex-landing/src/lib/whitepaper-content.ts'

SKIP_TITLES = {'IMPORTANT NOTICE', 'TABLE OF CONTENTS'}

# Sections whose opening line makes a poor page description, because they
# begin with a subheading, a formula, or a data line rather than prose.
# The lead is the meta description and the schema abstract, so it is the
# first thing a search or answer engine reads about the page; an unhelpful
# one wastes the slot, and section 11's would actively mislead by quoting
# the team's one-year cliff on a page whose presale terms have none.
LEAD_OVERRIDES = {
    11: ('Lockup terms for every FDP allocation. Team and advisors carry a one-year cliff '
         'with multi-year linear vesting, the treasury is DAO-controlled, and the presale '
         'carries no cliff at all, on identical 12-month terms across all 20 tiers.'),
    14: ('How FDP holders govern the protocol: quadratic voting weighted by how long tokens '
         'have been staked, and the Security Council that can act between votes.'),
    15: ('Audit status, the security measures protecting user funds, and the jurisdictions '
         'excluded from the FDP presale.'),
    22: ('FlowDex development phases, from the presale through the Universal Exchange, the '
         'Intelligence Terminal, and FlowChain, with the milestones defining each.'),
    24: ('Legal disclaimer covering the status of the FDP token, the limits of the '
         'forward-looking statements in this whitepaper, and the risks of participating.'),
}


def slugify(title: str) -> str:
    s = title.lower()
    s = re.sub(r'^\d+\.\s*', '', s)            # drop leading "7. "
    s = s.replace('&', ' and ')
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')


def split_row(line: str):
    return [c.strip() for c in line.strip().strip('|').split('|')]


def parse_blocks(lines):
    """Turn a section's lines into typed blocks."""
    blocks = []
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()

        if not line.strip() or line.strip() == '---':
            i += 1
            continue

        # Subsection heading
        if line.startswith('### '):
            blocks.append({'t': 'h3', 'text': line[4:].strip()})
            i += 1
            continue

        # Table: header row, separator, then body rows
        if line.startswith('|') and i + 1 < len(lines) and re.match(r'^\|[\s:|-]+\|?$', lines[i + 1].strip()):
            head = split_row(line)
            i += 2
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                rows.append(split_row(lines[i]))
                i += 1
            blocks.append({'t': 'table', 'head': head, 'rows': rows})
            continue

        # Bullet list
        if line.startswith('- '):
            items = []
            while i < len(lines) and lines[i].rstrip().startswith('- '):
                items.append(lines[i].rstrip()[2:].strip())
                i += 1
            blocks.append({'t': 'ul', 'items': items})
            continue

        # Numbered list
        if re.match(r'^\d+\.\s', line):
            items = []
            while i < len(lines) and re.match(r'^\d+\.\s', lines[i].rstrip()):
                items.append(re.sub(r'^\d+\.\s*', '', lines[i].rstrip()))
                i += 1
            blocks.append({'t': 'ol', 'items': items})
            continue

        # Blockquote
        if line.startswith('> '):
            quote = []
            while i < len(lines) and lines[i].rstrip().startswith('> '):
                quote.append(lines[i].rstrip()[2:].strip())
                i += 1
            blocks.append({'t': 'quote', 'text': ' '.join(quote)})
            continue

        # Figure caption: a whole line wrapped in single asterisks
        if re.match(r'^\*[^*].*\*$', line.strip()):
            blocks.append({'t': 'caption', 'text': line.strip()[1:-1]})
            i += 1
            continue

        # Paragraph: consume until a blank line or a block starter
        para = []
        while i < len(lines):
            nxt = lines[i].rstrip()
            if (not nxt.strip() or nxt.strip() == '---' or nxt.startswith('### ')
                    or nxt.startswith('|') or nxt.startswith('- ')
                    or nxt.startswith('> ') or re.match(r'^\d+\.\s', nxt)):
                break
            para.append(nxt.strip())
            i += 1
        if para:
            blocks.append({'t': 'p', 'text': ' '.join(para)})
    return blocks


def _trim(text: str) -> str:
    text = re.sub(r'\*\*(.+?)\*\*', r'\1', text).strip()
    cut = re.split(r'(?<=[.!?])\s', text)
    out = cut[0] if cut else text
    if len(out) < 80 and len(cut) > 1:
        out = f'{out} {cut[1]}'
    return out[:300]


def first_sentence(blocks, title: str, number: int) -> str:
    """Lead line, used as the page description and schema abstract.

    Every section must have one: an empty meta description is a wasted
    slot in exactly the place a search or answer engine reads first. Most
    sections open with a paragraph, but some (the roadmap) open straight
    into a figure caption and a table, so fall through rather than
    returning nothing.
    """
    for b in blocks:
        if b['t'] == 'p':
            return _trim(b['text'])
    for b in blocks:
        if b['t'] == 'caption':
            # "Figure 6: FlowDex Protocol development phases." reads as a
            # plate label, not a description. Drop the label, keep the text.
            text = re.sub(r'^Figure\s+\d+[:.]\s*', '', b['text']).strip()
            if text:
                return _trim(text[0].upper() + text[1:])
    for b in blocks:
        if b['t'] == 'h3':
            return _trim(b['text'])
    return f'Section {number} of the FlowDex Protocol whitepaper: {title}.'


def main():
    raw = open(SRC, encoding='utf-8').read().split('\n')

    # Index every top-level heading
    heads = [(n, l[3:].strip()) for n, l in enumerate(raw) if l.startswith('## ')]

    sections = []
    for idx, (ln, title) in enumerate(heads):
        if title in SKIP_TITLES:
            continue
        end = heads[idx + 1][0] if idx + 1 < len(heads) else len(raw)
        body = raw[ln + 1:end]
        blocks = parse_blocks(body)
        if not blocks:
            continue
        m = re.match(r'^(\d+)\.\s*(.+)$', title)
        number = int(m.group(1)) if m else 0
        clean = m.group(2).strip() if m else title
        sections.append({
            'slug': slugify(title),
            'number': number,
            'title': clean,
            'lead': LEAD_OVERRIDES.get(number) or first_sentence(blocks, clean, number),
            'blocks': blocks,
        })

    sections.sort(key=lambda s: s['number'])

    header = '''// ══════════════════════════════════════════════════
// src/lib/whitepaper-content.ts
// GENERATED FILE — do not edit by hand.
//
// Parsed from the FlowDex Protocol whitepaper v9.0 source markdown.
// The PDF remains the canonical artifact for download, but a PDF is
// close to invisible to retrieval: answer engines extract from HTML
// with real headings and tables, not from a binary. These section
// pages exist so the whitepaper's substance is reachable and citable.
//
// Regenerate rather than editing: any fix belongs in the markdown
// source, so the PDF and these pages cannot drift apart again.
// ══════════════════════════════════════════════════

export type WhitepaperBlock =
  | { t: 'h3'; text: string }
  | { t: 'p'; text: string }
  | { t: 'caption'; text: string }
  | { t: 'quote'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] };

export interface WhitepaperSection {
  slug: string;
  number: number;
  title: string;
  /** Lead sentence, reused as meta description and schema abstract. */
  lead: string;
  blocks: WhitepaperBlock[];
}

export const WHITEPAPER_VERSION = 'v9.0';
export const WHITEPAPER_DATE = 'October 2026';

export const WHITEPAPER_SECTIONS: WhitepaperSection[] = '''

    body = json.dumps(sections, indent=2, ensure_ascii=False)
    footer = ''';

export function getSection(slug: string): WhitepaperSection | undefined {
  return WHITEPAPER_SECTIONS.find((s) => s.slug === slug);
}

export function adjacentSections(slug: string) {
  const i = WHITEPAPER_SECTIONS.findIndex((s) => s.slug === slug);
  return {
    prev: i > 0 ? WHITEPAPER_SECTIONS[i - 1] : undefined,
    next: i >= 0 && i < WHITEPAPER_SECTIONS.length - 1 ? WHITEPAPER_SECTIONS[i + 1] : undefined,
  };
}
'''

    open(OUT, 'w', encoding='utf-8').write(header + body + footer)

    print(f'sections: {len(sections)}')
    counts = {}
    for s in sections:
        for b in s['blocks']:
            counts[b['t']] = counts.get(b['t'], 0) + 1
    print('blocks:', ', '.join(f'{k}={v}' for k, v in sorted(counts.items())))
    print(f'tables: {counts.get("table", 0)}')
    print('\nfirst five:')
    for s in sections[:5]:
        print(f'  {s["number"]:2d}. {s["slug"]:<32} {len(s["blocks"]):3d} blocks')
    print(f'\nwrote {OUT}')


if __name__ == '__main__':
    sys.exit(main())
