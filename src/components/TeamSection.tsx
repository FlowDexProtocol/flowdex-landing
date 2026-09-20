import { fetchTeam } from '@/lib/cms';
import { Section, SectionHeading } from './ui';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';
import CmsMedia from './CmsMedia';
import TeamCircle from './TeamCircle';

const FALLBACK_TEAM = [
  { id: -1, name: 'Zaheer A.', role: 'Founder & CEO', photo_url: null },
  { id: -2, name: 'Helix S.', role: 'CTO & Engineering', photo_url: null },
  { id: -3, name: 'Atlas K.', role: 'Marketing & Growth', photo_url: null },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

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
