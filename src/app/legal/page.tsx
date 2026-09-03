import type { Metadata } from 'next';
import { fetchPageContent } from '@/lib/cms';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Legal Notice' };

export default async function LegalNoticePage() {
  const cmsData = await fetchPageContent('legal');

  return (
    <LegalPage
      title="Legal Notice"
      body={cmsData['content.body']}
      sections={[
        {
          heading: 'Not Financial Advice',
          body: [
            'Nothing on this website — including presale mechanics, tokenomics, roadmap statements, or illustrative growth scenarios — constitutes financial, investment, legal, or tax advice. $FDP is a utility token, not a security, equity instrument, or investment contract.',
          ],
        },
        {
          heading: 'Forward-Looking Statements',
          body: [
            'Statements about future features (including the Universal Exchange, Intelligence Terminal, FlowChain, and staking) describe current plans and intentions. They are not guarantees. Timelines, features, and availability may change, be delayed, or not materialize.',
          ],
        },
        {
          heading: 'Jurisdictional Restrictions',
          body: [
            'FlowDex Protocol is not offered to residents of jurisdictions where participation in a token presale would be unlawful. It is your responsibility to determine whether you are permitted to participate under the laws applicable to you.',
          ],
        },
        {
          heading: 'Risk of Loss',
          body: [
            'Cryptocurrency purchases carry risk, including total and permanent loss of funds due to market volatility, smart contract risk, or user error (such as sending funds to an incorrect address or on an unsupported network). Only purchase what you can afford to lose.',
          ],
        },
        {
          heading: 'Intellectual Property',
          body: [
            'The FlowDex Protocol name, logo, and website content are the property of FlowDex Protocol and may not be reproduced without permission, except as permitted by applicable law.',
          ],
        },
      ]}
    />
  );
}
