import { Container, Section } from './ui';
import Reveal from './motion/Reveal';

export interface LegalSection {
  heading: string;
  body: string[];
}

// Minimal markdown: blank-line-separated paragraphs, "#"/"##" headings,
// "-"/"*" bullet runs become a <ul>. Good enough for the plain-text CMS
// body an admin would paste in — not a full markdown parser.
function renderMarkdownLite(body: string) {
  const blocks = body.split(/\n{2,}/).filter((b) => b.trim());
  return blocks.map((block, i) => {
    const lines = block.split('\n').map((l) => l.trim());
    const heading = lines[0].match(/^#{1,2}\s+(.*)/);
    if (heading) {
      return (
        <h2 key={i} className="text-lg font-bold text-ink sm:text-xl">
          {heading[1]}
        </h2>
      );
    }
    if (lines.every((l) => /^[-*]\s+/.test(l))) {
      return (
        <ul key={i} className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-dim">
          {lines.map((l, j) => (
            <li key={j}>{l.replace(/^[-*]\s+/, '')}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="text-sm leading-relaxed text-ink-dim">
        {block}
      </p>
    );
  });
}

export default function LegalPage({
  title,
  sections,
  body,
}: {
  title: string;
  sections: LegalSection[];
  body?: string;
}) {
  // Batch 1 seeded these as literal bracketed placeholders (e.g.
  // "[Full terms of service text — placeholder for admin to fill in]"),
  // not real content — don't render that to visitors, fall back to the
  // hardcoded sections instead.
  const hasRealBody = !!body && !/^\[.*\]$/.test(body.trim());

  return (
    <>
      <section className="border-b border-border bg-radial-glow py-14 sm:py-16">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-3xl font-bold text-ink sm:text-5xl">{title}</h1>
            <p className="mt-3 text-xs text-ink-faint">Last updated: January 2026</p>
          </Reveal>
        </Container>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 rounded-xl border border-border bg-card px-5 py-4 text-xs leading-relaxed text-ink-faint">
            This page is a general template provided for informational purposes and does not constitute legal
            advice. It has not been reviewed by a lawyer and should not be relied on as a complete or
            jurisdiction-specific legal document. Consult qualified legal counsel before relying on it.
          </div>

          {hasRealBody ? (
            <div className="space-y-4">{renderMarkdownLite(body!)}</div>
          ) : (
            <div className="space-y-9">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="text-lg font-bold text-ink sm:text-xl">{s.heading}</h2>
                  <div className="mt-2 space-y-3">
                    {s.body.map((p, i) => (
                      <p key={i} className="text-sm leading-relaxed text-ink-dim">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
