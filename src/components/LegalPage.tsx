import { Container, Section } from './ui';
import Reveal from './motion/Reveal';

export interface LegalSection {
  heading: string;
  body: string[];
}

export default function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
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
          <div className="mb-10 rounded-lg border border-border bg-card px-5 py-4 text-xs leading-relaxed text-ink-faint">
            This page is a general template provided for informational purposes and does not constitute legal
            advice. It has not been reviewed by a lawyer and should not be relied on as a complete or
            jurisdiction-specific legal document. Consult qualified legal counsel before relying on it.
          </div>

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
        </div>
      </Section>
    </>
  );
}
