import type { Metadata } from 'next';
import { fetchPageContent } from '@/lib/cms';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default async function PrivacyPage() {
  const cmsData = await fetchPageContent('privacy');

  return (
    <LegalPage
      title="Privacy Policy"
      body={cmsData['content.body']}
      sections={[
        {
          heading: '1. Information We Collect',
          body: [
            'Wallet address: when you connect a wallet or make a purchase, we record your public wallet address. This is a public blockchain identifier, not personally identifying information on its own.',
            'Approximate location: when you connect a wallet or submit a purchase, your IP address is used to derive an approximate country, region, and city for analytics purposes. Your raw IP address is hashed before storage — we do not retain it in plain text.',
            'Purchase and referral data: transaction amounts, currencies, timestamps, and referral codes associated with your wallet address.',
            'Email address: only if you voluntarily submit it, e.g. through an email-updates signup.',
          ],
        },
        {
          heading: '2. How We Use Information',
          body: [
            'To process presale purchases, allocate tokens, and calculate referral bonuses. To detect and prevent fraud, including duplicate or circular referrals. To generate aggregate, non-identifying statistics such as buyers by country. To send product updates, if you opted in.',
          ],
        },
        {
          heading: '3. What We Do Not Do',
          body: [
            'We do not sell your data to third parties. We do not require KYC or collect government identification for presale purchases. We do not have custody of your wallet or private keys at any point.',
          ],
        },
        {
          heading: '4. Data Retention',
          body: [
            'Purchase and audit records are retained indefinitely for accounting, tax, and dispute-resolution purposes, consistent with standard practice for financial transaction records.',
          ],
        },
        {
          heading: '5. Third-Party Services',
          body: [
            'We use third-party infrastructure for blockchain data, IP geolocation, and hosting. These providers may process data on our behalf under their own privacy and security practices.',
          ],
        },
        {
          heading: '6. Your Choices',
          body: [
            'You can disconnect your wallet at any time. Because blockchain transactions are public and immutable, on-chain data associated with your wallet address cannot be deleted once recorded.',
          ],
        },
        {
          heading: '7. Contact',
          body: ['Questions about this policy can be directed to the FlowDex Protocol team through our official community channels.'],
        },
      ]}
    />
  );
}
