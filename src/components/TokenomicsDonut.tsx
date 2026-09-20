'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export interface AllocationSlice {
  label: string;
  pct: number;
  color: string;
}

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 95;
const STROKE = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const RING_OUTER = RADIUS + STROKE / 2;
const LINE_START = RING_OUTER + 6;
const LINE_END = RING_OUTER + 26;
const LABEL_R = RING_OUTER + 36;
// Below this |sin(midAngleDeg)| — the on-screen horizontal component, see
// the anchor computation below — the label sits nearly at the ring's true
// top or bottom, where flowing text left/right would drift sideways away
// from where its line actually points, so center it instead.
const HORIZONTAL_SIN_THRESHOLD = 0.15;

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
    // default start point (3 o'clock) ends up at 12 o'clock for the arcs,
    // and every other coordinate computed in this same pre-transform space
    // rotates along with it automatically once the <svg> transform applies.
    const midAngleDeg = (startPct + a.pct / 2) * 3.6;
    const rad = (midAngleDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    // The label's on-screen horizontal side is NOT the sign of `cos` — the
    // whole <svg> carries the -90deg rotate, which maps pre-rotation angle
    // θ to on-screen angle θ-90, and cos(θ-90) = sinθ. Anchoring off `cos`
    // here flows two adjacent labels (Staking Rewards, Reserve) the wrong
    // way — toward the ring instead of away from it — running them into
    // each other; confirmed by screenshot before this fix.
    const anchor: 'start' | 'end' | 'middle' = Math.abs(sin) < HORIZONTAL_SIN_THRESHOLD ? 'middle' : sin > 0 ? 'start' : 'end';
    return {
      ...a,
      // Static, always-correct — this is what actually carves each segment's
      // arc out of the ring. Never animate this via Motion's `pathLength`
      // special prop: pathLength hijacks stroke-dasharray/stroke-dashoffset
      // for its own draw animation and silently overwrites these values,
      // which is what was breaking the coloring before.
      finalDasharray: `${(a.pct / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`,
      dashoffset: -((startPct / 100) * CIRCUMFERENCE),
      lineX1: CENTER + cos * LINE_START,
      lineY1: CENTER + sin * LINE_START,
      lineX2: CENTER + cos * LINE_END,
      lineY2: CENTER + sin * LINE_END,
      labelX: CENTER + cos * LABEL_R,
      labelY: CENTER + sin * LABEL_R,
      anchor,
    };
  });

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="donut-svg" style={{ transform: 'rotate(-90deg)' }}>
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

      {segments.map((s, i) => (
        <g
          key={s.label}
          className="pointer-events-none select-none"
          style={{
            transform: 'rotate(90deg)',
            transformOrigin: `${s.lineX1}px ${s.lineY1}px`,
            opacity: hovered === null || hovered === i ? 1 : 0.35,
            transition: 'opacity 0.15s ease',
          }}
        >
          <line x1={s.lineX1} y1={s.lineY1} x2={s.lineX2} y2={s.lineY2} stroke={`${s.color}4D`} strokeWidth={1} />
          <circle cx={s.lineX2} cy={s.lineY2} r={3} fill={s.color} />
          <text
            x={s.labelX}
            y={s.labelY - 5}
            textAnchor={s.anchor}
            fontFamily="var(--font-sans)"
            fontSize="13"
            fontWeight="500"
            fill="#fff"
          >
            {s.label}
          </text>
          <text
            x={s.labelX}
            y={s.labelY + 11}
            textAnchor={s.anchor}
            fontFamily="var(--font-sans)"
            fontSize="13"
            fill="rgba(255,255,255,0.5)"
          >
            {s.pct}%
          </text>
        </g>
      ))}

      {/* Center hole text — counter-rotated around its own pivot (the
          donut's center) the same way every other label here is, since it
          sits inside the <svg> that carries the -90deg ring-drawing rotate. */}
      <g style={{ transform: 'rotate(90deg)', transformOrigin: `${CENTER}px ${CENTER}px` }}>
        <text x={CENTER} y={CENTER - 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="38" fontWeight="600" fill="#fff">
          10B
        </text>
        <text
          x={CENTER}
          y={CENTER + 20}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fill="rgba(255,255,255,0.4)"
        >
          $FDP Total Supply
        </text>
      </g>
    </svg>
  );
}
