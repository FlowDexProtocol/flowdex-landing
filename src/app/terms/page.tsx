import type { Metadata } from 'next';
import { fetchPageContent } from '@/lib/cms';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Terms of Service' };

export default async function TermsPage() {
  const cmsData = await fetchPageContent('terms');

  return (
    <LegalPage
      title="Terms of Service"
      body={cmsData['content.body']}
      sections={[
        {
          heading: '1. Acceptance of Terms',
          body: [
            'By accessing or using the FlowDex Protocol website, purchase application, or any related service (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Services.',
          ],
        },
        {
          heading: '2. Utility Token — Not a Security',
          body: [
            '$FDP is a utility token intended to provide access to features within the FlowDex Protocol ecosystem, including fee sharing, governance participation, and platform access. Purchasing $FDP does not entitle you to equity, profit-sharing, or any ownership interest in FlowDex Protocol or any affiliated entity.',
            'Nothing on this site constitutes an offer or solicitation to sell securities in any jurisdiction where such an offer or solicitation would be unlawful. It is your responsibility to determine whether purchasing $FDP is lawful in your jurisdiction.',
          ],
        },
        {
          heading: '3. No Investment Advice',
          body: [
            'Nothing on this site, including projections, roadmap statements, or growth scenarios, constitutes financial, investment, legal, or tax advice. Any figures shown (including illustrative "growth potential" scenarios) are hypothetical and not a guarantee or prediction of future performance.',
          ],
        },
        {
          heading: '4. Risk Disclosure',
          body: [
            'Purchasing cryptocurrency carries significant risk, including the total loss of funds. Presale tokens are subject to vesting schedules and may not be immediately transferable or liquid. You should only purchase $FDP with funds you can afford to lose, and after conducting your own research.',
          ],
        },
        {
          heading: '5. Eligibility',
          body: [
            'You represent that you are legally permitted to purchase and hold cryptocurrency under the laws of your jurisdiction of residence, and that you are not a resident of, or located in, any jurisdiction where participation in the presale would be unlawful.',
          ],
        },
        {
          heading: '6. No Warranty',
          body: [
            'The Services are provided "as is" without warranties of any kind, express or implied. FlowDex Protocol does not guarantee uninterrupted or error-free operation of the Services.',
          ],
        },
        {
          heading: '7. Changes to These Terms',
          body: [
            'These Terms may be updated from time to time. Continued use of the Services after changes are posted constitutes acceptance of the revised Terms.',
          ],
        },
      ]}
    />
  );
}
