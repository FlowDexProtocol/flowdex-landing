'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export interface AllocationSlice {
  label: string;
  pct: number;
  color: string;
}

const SIZE = 220;
const RADIUS = 80;
const STROKE = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;
// Segments below this share get a legend-only permanent percentage label —
// an in-chart label on a ~7% slice just overlaps its neighbors. The hover
// tooltip still works on every segment regardless of size.
const MIN_LABEL_PCT = 10;

export default function TokenomicsDonut({ allocation }: { allocation: AllocationSlice[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  // Prefix sums of each slice's start percentage, computed without mutating
  // a closure variable inside .map() (React Compiler flags that as impure).
  const startPcts = allocation.reduce<number[]>((acc, a, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + allocation[i - 1].pct);
    return acc;
  }, []);

  const segments = allocation.map((a, i) => {
    const startPct = startPcts[i];
    const midAngleDeg = (startPct + a.pct / 2) * 3.6 - 90; // -90 so 0% starts at 12 o'clock
    const rad = (midAngleDeg * Math.PI) / 180;
    return {
      ...a,
      // Static, always-correct — this is what actually carves each segment's
      // arc out of the ring. Never animate this via Motion's `pathLength`
      // special prop: pathLength hijacks stroke-dasharray/stroke-dashoffset
      // for its own draw animation and silently overwrites these values,
      // which is what was breaking the coloring before.
      finalDasharray: `${(a.pct / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`,
      dashoffset: -((startPct / 100) * CIRCUMFERENCE),
      labelX: CENTER + Math.cos(rad) * RADIUS,
      labelY: CENTER + Math.sin(rad) * RADIUS,
    };
  });

  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-center sm:gap-12">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-[180px] w-[180px] shrink-0 overflow-visible sm:h-[220px] sm:w-[220px]"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--color-card)" strokeWidth={STROKE} />
        {segments.map((s, i) => (
          <motion.circle
            key={s.label}
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={s.color}
            strokeWidth={hovered === i ? STROKE + 3 : STROKE}
            strokeLinecap="butt"
            strokeDashoffset={s.dashoffset}
            initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
            whileInView={{ strokeDasharray: s.finalDasharray }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
            animate={{ scale: hovered === i ? 1.035 : 1 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              transformOrigin: `${CENTER}px ${CENTER}px`,
              cursor: 'pointer',
              filter: hovered === i ? `drop-shadow(0 0 8px ${s.color}99)` : `drop-shadow(0 0 3px ${s.color}40)`,
              transition: 'stroke-width 0.15s ease, filter 0.15s ease',
            }}
          />
        ))}
        {segments
          .filter((s) => s.pct >= MIN_LABEL_PCT)
          .map((s) => (
            <text
              key={s.label}
              x={s.labelX}
              y={s.labelY}
              fill="#03131a"
              fontSize="13"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none select-none"
              style={{ transform: 'rotate(90deg)', transformOrigin: `${s.labelX}px ${s.labelY}px` }}
            >
              {s.pct}%
            </text>
          ))}

        {hovered !== null && (
          <g
            className="pointer-events-none"
            style={{
              transform: 'rotate(90deg)',
              transformOrigin: `${segments[hovered].labelX}px ${segments[hovered].labelY}px`,
            }}
          >
            <rect
              x={segments[hovered].labelX - 46}
              y={segments[hovered].labelY - 34}
              width={92}
              height={30}
              rx={8}
              fill="var(--color-bg)"
              stroke={segments[hovered].color}
              strokeWidth={1.5}
            />
            <text
              x={segments[hovered].labelX}
              y={segments[hovered].labelY - 23}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fill="var(--color-ink)"
            >
              {segments[hovered].label}
            </text>
            <text
              x={segments[hovered].labelX}
              y={segments[hovered].labelY - 11}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="600"
              fill={segments[hovered].color}
            >
              {segments[hovered].pct}%
            </text>
          </g>
        )}
      </svg>

      <div className="grid w-full max-w-xs grid-cols-1 gap-2.5 sm:w-auto">
        {allocation.map((a, i) => (
          <div
            key={a.label}
            className={`flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-sm transition-colors ${
              hovered === i ? 'bg-white/5' : ''
            }`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: a.color }} />
              <span className="text-ink">{a.label}</span>
            </span>
            <span className="font-mono text-ink-faint">{a.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
