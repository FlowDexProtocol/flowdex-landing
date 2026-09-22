import { fetchTeam } from '@/lib/cms';
import { initials } from '@/lib/format';
import { Section, SectionHeading } from './ui';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';
import CmsMedia from './CmsMedia';
import TeamCircle from './TeamCircle';

const FALLBACK_TEAM = [
  { id: -1, name: 'Atlas', role: 'Founder & CEO', photo_url: null },
  { id: -2, name: 'Helix', role: 'CTO', photo_url: null },
  { id: -3, name: 'Vector', role: 'Head of Risk', photo_url: null },
  { id: -4, name: 'Cipher', role: 'Smart Contracts Lead', photo_url: null },
  { id: -5, name: 'Nova', role: 'Research Lead', photo_url: null },
  { id: -6, name: 'Orbit', role: 'Growth Lead', photo_url: null },
];

export default async function TeamSection() {
  const team = await fetchTeam();
  const members = team.length > 0 ? team : FALLBACK_TEAM;

  return (
    <Section id="team">
      <SectionHeading label="Team" title="Built by Traders and Builders" subtitle="A small team obsessed with markets, on-chain data, and shipping fast." />

      <TeamCircle members={members} />

      <StaggerGroup className="team-grid team-mobile-fallback">
        {members.map((m) => (
          <StaggerItem key={m.id}>
            <div className="team-card">
              <div className="team-avatar">
                {m.photo_url ? (
                  <CmsMedia src={m.photo_url} alt={m.name} className="h-full w-full object-cover" fallback={<>{initials(m.name)}</>} />
                ) : (
                  initials(m.name)
                )}
              </div>
              <h4>{m.name}</h4>
              <p>{m.role}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
