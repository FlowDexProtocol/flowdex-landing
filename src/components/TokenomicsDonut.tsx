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
const RADIUS = 90;
const STROKE = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const RING_OUTER = RADIUS + STROKE / 2;
const RING_INNER = RADIUS - STROKE / 2;
const LINE_START = RING_OUTER + 6;
const LINE_END = RING_OUTER + 20;
// The dot at LINE_END is now 12px across (6px radius, per spec) instead of
// the previous 6px — LABEL_R needs enough clearance past it that the dot's
// own edge doesn't reach into the label text, which starts right at
// LABEL_R for 'end'-anchored (left-side) labels. Confirmed by screenshot,
// twice: the first gap (+36) wasn't enough for most labels, and a second
// pass (+48) still let the near-vertical Reserve label (whose radial
// direction is mostly Y, where the two stacked text lines have little
// room of their own to give) clip the dot. Went wider still rather than
// special-casing that one label's anchor.
const LABEL_R = RING_OUTER + 62;
// Below this |sin(midAngleDeg)| — the on-screen horizontal component, see
// the anchor computation below — the label sits nearly at the ring's true
// top or bottom, where flowing text left/right would drift sideways away
// from where its line actually points, so center it instead.
const HORIZONTAL_SIN_THRESHOLD = 0.15;
// Where the ring's inner edge falls as a percentage of the radialGradient's
// own radius (which spans from the circle's true center to its outer
// stroke edge). Only the RING_INNER%–100% slice of the gradient is ever
// actually painted (fill is none — nothing inside the hole renders), so
// stops need to sit inside that narrow band for the dark→light transition
// to be visible across the ring's actual thickness, rather than mostly
// happening inside the invisible hole. Recompute this if RADIUS/STROKE
// change.
const INNER_EDGE_PCT = `${((RING_INNER / RING_OUTER) * 100).toFixed(1)}%`;

// Server and client can compute Math.cos/sin to slightly different last-bit
// values for the same input (different V8 build/optimization tier), which
// otherwise surfaces as a React hydration-mismatch warning on every derived
// coordinate below. Rounding to 2dp is well within visual tolerance and
// makes the serialized number stable across environments.
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// Simple hex blend toward white (positive) or black (negative) — used to
// give each segment a lighter-outer/darker-inner radial gradient instead
// of a single flat fill, for a bit of visual depth.
function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const amt = Math.round(2.55 * percent);
  const clamp = (v: number) => Math.min(255, Math.max(0, v));
  const nr = clamp(r + amt);
  const ng = clamp(g + amt);
  const nb = clamp(b + amt);
  return `#${((1 << 24) + (nr << 16) + (ng << 8) + nb).toString(16).slice(1)}`;
}

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
      lineX1: round2(CENTER + cos * LINE_START),
      lineY1: round2(CENTER + sin * LINE_START),
      lineX2: round2(CENTER + cos * LINE_END),
      lineY2: round2(CENTER + sin * LINE_END),
      labelX: round2(CENTER + cos * LABEL_R),
      labelY: round2(CENTER + sin * LABEL_R),
      anchor,
      dark: shade(a.color, -22),
      light: shade(a.color, 18),
    };
  });

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="donut-svg" style={{ transform: 'rotate(-90deg)' }}>
      <defs>
        {segments.map((s, i) => (
          <radialGradient key={s.label} id={`donutGrad-${i}`} cx="50%" cy="50%" r="50%">
            <stop offset={INNER_EDGE_PCT} stopColor={s.dark} />
            <stop offset="100%" stopColor={s.light} />
          </radialGradient>
        ))}
      </defs>

      <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--color-card)" strokeWidth={STROKE} />
      {segments.map((s, i) => (
        <motion.circle
          key={s.label}
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={`url(#donutGrad-${i})`}
          strokeWidth={hovered === i ? STROKE + 4 : STROKE}
          strokeLinecap="butt"
          strokeDashoffset={s.dashoffset}
          initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
          whileInView={{ strokeDasharray: s.finalDasharray }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
          animate={{ scale: hovered === i ? 1.045 : 1 }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            transformOrigin: `${CENTER}px ${CENTER}px`,
            cursor: 'pointer',
            filter: hovered === i ? `drop-shadow(0 0 10px ${s.color}bb)` : `drop-shadow(0 0 3px ${s.color}40)`,
            transition: 'stroke-width 0.3s ease, filter 0.3s ease',
          }}
        />
      ))}

      {segments.map((s, i) => (
        <g
          key={s.label}
          className="pointer-events-none select-none"
          transform={`rotate(90, ${s.lineX1}, ${s.lineY1})`}
          style={{
            opacity: hovered === null || hovered === i ? 1 : 0.35,
            transition: 'opacity 0.3s ease',
          }}
        >
          <line x1={s.lineX1} y1={s.lineY1} x2={s.lineX2} y2={s.lineY2} stroke={`${s.color}66`} strokeWidth={1} />
          <circle cx={s.lineX2} cy={s.lineY2} r={6} fill={s.color} />
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
            y={s.labelY + 12}
            textAnchor={s.anchor}
            fontFamily="var(--font-mono)"
            fontSize="12"
            fill="rgba(255,255,255,0.5)"
          >
            {s.pct}%
          </text>
        </g>
      ))}

      {/* Center hole text — counter-rotated around its own pivot (the
          donut's center) the same way every other label here is, since it
          sits inside the <svg> that carries the -90deg ring-drawing rotate. */}
      <g transform={`rotate(90, ${CENTER}, ${CENTER})`}>
        <text x={CENTER} y={CENTER - 4} textAnchor="middle" fontFamily="var(--font-serif)" fontSize="42" fontWeight="500" fill="#fff">
          10B
        </text>
        <text x={CENTER} y={CENTER + 22} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="14" fill="rgba(255,255,255,0.4)">
          $FDP
        </text>
      </g>
    </svg>
  );
}
