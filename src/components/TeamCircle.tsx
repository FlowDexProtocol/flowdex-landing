'use client';

import { useState } from 'react';
import { initials } from '@/lib/format';
import CmsMedia from './CmsMedia';

export interface TeamCircleMember {
  id: number;
  name: string;
  role: string;
  photo_url: string | null;
}

const WRAP_SIZE = 560;
const CENTER = WRAP_SIZE / 2;
const OUTER_CIRCLE_R = 200;
const CENTER_CIRCLE_R = 60;
// Avatars sit centered directly on the outer circle's circumference.
const NODE_RADIUS = OUTER_CIRCLE_R;
const AVATAR_SIZE = 72;

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
        <circle cx={CENTER} cy={CENTER} r={OUTER_CIRCLE_R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        {nodes.map((n, i) => (
          <line
            key={n.id}
            x1={CENTER}
            y1={CENTER}
            x2={n.x}
            y2={n.y}
            stroke={hovered === i ? 'rgba(108,92,231,0.55)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={1}
            style={{
              transition: 'stroke 0.3s ease, filter 0.3s ease',
              filter: hovered === i ? 'drop-shadow(0 0 4px rgba(108,92,231,0.5))' : 'none',
            }}
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
