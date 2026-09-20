'use client';

import { useState } from 'react';
import CmsMedia from './CmsMedia';

export interface TeamCircleMember {
  id: number;
  name: string;
  role: string;
  photo_url: string | null;
}

const WRAP_SIZE = 560;
const CENTER = WRAP_SIZE / 2;
const CENTER_CIRCLE_R = 70;
const NODE_RADIUS = 200;
const AVATAR_SIZE = 84;

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function TeamCircle({ members }: { members: TeamCircleMember[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const nodes = members.map((m, i) => {
    // Evenly spaced starting at 12 o'clock, going clockwise — for exactly 3
    // members this naturally lands at top / lower-right / lower-left.
    const angleDeg = (i / members.length) * 360 - 90;
    const rad = (angleDeg * Math.PI) / 180;
    const x = CENTER + Math.cos(rad) * NODE_RADIUS;
    const y = CENTER + Math.sin(rad) * NODE_RADIUS;
    return { ...m, x, y };
  });

  return (
    <div className="team-circle-wrap" style={{ width: WRAP_SIZE, height: WRAP_SIZE }}>
      <svg width={WRAP_SIZE} height={WRAP_SIZE} viewBox={`0 0 ${WRAP_SIZE} ${WRAP_SIZE}`} className="team-circle-lines">
        {nodes.map((n, i) => (
          <line
            key={n.id}
            x1={CENTER}
            y1={CENTER}
            x2={n.x}
            y2={n.y}
            stroke={hovered === i ? 'rgba(108,92,231,0.6)' : 'rgba(255,255,255,0.12)'}
            strokeWidth={1}
            style={{ transition: 'stroke 0.2s ease' }}
          />
        ))}
      </svg>

      <div className="team-circle-center" style={{ left: CENTER, top: CENTER, width: CENTER_CIRCLE_R * 2, height: CENTER_CIRCLE_R * 2 }}>
        <div className="logo-drops">
          <div className="drop drop-1" />
          <div className="drop drop-2" />
        </div>
      </div>

      {nodes.map((n, i) => (
        <div
          key={n.id}
          className="team-node"
          style={{ left: n.x, top: n.y - AVATAR_SIZE / 2 }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="team-node-avatar" style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}>
            {n.photo_url ? (
              <CmsMedia src={n.photo_url} alt={n.name} className="h-full w-full object-cover" fallback={<>{initials(n.name)}</>} />
            ) : (
              initials(n.name)
            )}
          </div>
          <div className="team-node-name">{n.name}</div>
          <div className="team-node-role">{n.role}</div>
        </div>
      ))}
    </div>
  );
}
