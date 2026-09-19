import { cms, fetchPageContent, type CmsPageData } from '@/lib/cms';
import { sanitizeHtml } from '@/lib/sanitize';
import Reveal from './motion/Reveal';
import { scaleIn } from '@/lib/motion';

function ecoCtaHtml(cmsData: CmsPageData) {
  return cms(cmsData, 'eco_cta', 'text', "Be a <em>Part</em> of the FlowDex Ecosystem");
}

export default async function EcoCtaSection() {
  const cmsData = await fetchPageContent('home');

  return (
    <section className="eco-cta">
      <div className="eco-s" />
      <Reveal variants={scaleIn}>
        <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(ecoCtaHtml(cmsData)) }} />
      </Reveal>
    </section>
  );
}
