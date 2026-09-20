'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export interface AllocationSlice {
  label: string;
  pct: number;
  color: string;
}

const SIZE = 280;
const RADIUS = 105;
const STROKE = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;
// Segments below this share get their label moved OUTSIDE the ring with a
// short leader line instead of centered on the arc — an in-ring label on a
// ~7% slice has no room and just overlaps its neighbors. The hover tooltip
// still works on every segment regardless of size.
const MIN_INLINE_LABEL_PCT = 10;
const OUTER_LINE_START = RADIUS + STROKE / 2 + 4;
const OUTER_LINE_END = RADIUS + STROKE / 2 + 16;
const OUTER_LABEL_RADIUS = RADIUS + STROKE / 2 + 26;

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
    // No extra offset here: the whole <svg> already carries a CSS
    // rotate(-90deg) (see the transform below) so that stroke-dasharray's
    // default start point (3 o'clock) ends up at 12 o'clock for the arcs.
    // Since these label coordinates are computed in that SAME pre-transform
    // space and rotate along with everything else in the <svg>, subtracting
    // an extra 90deg here double-applies the rotation and shifts every
    // label a quarter-turn onto the wrong segment (confirmed by hand-
    // tracing the rotation matrix and cross-checking against the actual
    // rendered output — Presale's 22.5% label was landing on the Staking
    // arc, Liquidity's 20% on the Presale arc, etc). The plain angle here
    // already lands each label on its own arc once the <svg>'s transform
    // is applied.
    const midAngleDeg = (startPct + a.pct / 2) * 3.6;
    const rad = (midAngleDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return {
      ...a,
      // Static, always-correct — this is what actually carves each segment's
      // arc out of the ring. Never animate this via Motion's `pathLength`
      // special prop: pathLength hijacks stroke-dasharray/stroke-dashoffset
      // for its own draw animation and silently overwrites these values,
      // which is what was breaking the coloring before.
      finalDasharray: `${(a.pct / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`,
      dashoffset: -((startPct / 100) * CIRCUMFERENCE),
      labelX: CENTER + cos * RADIUS,
      labelY: CENTER + sin * RADIUS,
      // Leader-line + outside label for segments too small to hold their
      // own centered label legibly — same midpoint angle, just further out.
      lineX1: CENTER + cos * OUTER_LINE_START,
      lineY1: CENTER + sin * OUTER_LINE_START,
      lineX2: CENTER + cos * OUTER_LINE_END,
      lineY2: CENTER + sin * OUTER_LINE_END,
      outerLabelX: CENTER + cos * OUTER_LABEL_RADIUS,
      outerLabelY: CENTER + sin * OUTER_LABEL_RADIUS,
    };
  });

  return (
    <>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="donut-svg"
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
        {segments.map((s) =>
          s.pct >= MIN_INLINE_LABEL_PCT ? (
            <text
              key={s.label}
              x={s.labelX}
              y={s.labelY}
              fill="#03131a"
              fontSize="15"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none select-none"
              style={{ transform: 'rotate(90deg)', transformOrigin: `${s.labelX}px ${s.labelY}px` }}
            >
              {s.pct}%
            </text>
          ) : (
            <g key={s.label} className="pointer-events-none select-none">
              <line x1={s.lineX1} y1={s.lineY1} x2={s.lineX2} y2={s.lineY2} stroke="rgba(255,255,255,0.35)" strokeWidth={1} />
              <text
                x={s.outerLabelX}
                y={s.outerLabelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.7)"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fontWeight="500"
                style={{ transform: 'rotate(90deg)', transformOrigin: `${s.outerLabelX}px ${s.outerLabelY}px` }}
              >
                {s.pct}%
              </text>
            </g>
          )
        )}

        {hovered !== null && (
          <g
            className="pointer-events-none"
            style={{
              transform: 'rotate(90deg)',
              transformOrigin: `${segments[hovered].labelX}px ${segments[hovered].labelY}px`,
            }}
          >
            <rect
              x={segments[hovered].labelX - 54}
              y={segments[hovered].labelY - 38}
              width={108}
              height={34}
              rx={8}
              fill="var(--color-bg)"
              stroke={segments[hovered].color}
              strokeWidth={1.5}
            />
            <text
              x={segments[hovered].labelX}
              y={segments[hovered].labelY - 26}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--color-ink)"
            >
              {segments[hovered].label}
            </text>
            <text
              x={segments[hovered].labelX}
              y={segments[hovered].labelY - 13}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={segments[hovered].color}
            >
              {segments[hovered].pct}%
            </text>
          </g>
        )}
      </svg>

      <div className="donut-legend">
        {allocation.map((a, i) => (
          <div
            key={a.label}
            className={`donut-item rounded-lg px-2 py-1.5 transition-colors ${hovered === i ? 'bg-white/5' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="donut-dot" style={{ background: a.color }} />
            <span>{a.label}</span>
            <span className="donut-pct">{a.pct}%</span>
          </div>
        ))}
      </div>
    </>
  );
}
