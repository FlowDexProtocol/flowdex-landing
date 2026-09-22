'use client';

import { useState } from 'react';
import { sanitizeHtml } from '@/lib/sanitize';

const TAB_NAMES = ['Presale', 'Exchange', 'Intelligence', 'Staking', 'FlowChain'] as const;

const FUNNEL_TIERS = [
  { name: 'Genesis', price: '$0.001' },
  { name: 'Pioneer', price: '$0.005' },
  { name: 'Seed', price: '$0.01' },
  { name: 'Early Bird', price: '$0.015' },
  { name: 'Builder', price: '$0.02' },
  { name: 'Accelerator', price: '$0.03' },
  { name: 'Growth', price: '$0.04' },
  { name: 'Launch', price: '$0.05' },
];
const FUNNEL_MIN_WIDTH = 130;
const FUNNEL_MAX_WIDTH = 380;

const EXCHANGE_NODES = [
  { label: 'Crypto', icon: '◈' },
  { label: 'Stocks', icon: '▲' },
  { label: 'Forex', icon: '⇄' },
  { label: 'Commodities', icon: '◆' },
  { label: 'DEXs', icon: '⬡' },
  { label: 'Pools', icon: '◉' },
];
const NODE_GRADIENTS = [
  'linear-gradient(135deg, rgba(108,92,231,0.35), rgba(168,85,247,0.15))',
  'linear-gradient(135deg, rgba(59,130,246,0.35), rgba(45,212,191,0.15))',
  'linear-gradient(135deg, rgba(168,85,247,0.35), rgba(59,130,246,0.15))',
  'linear-gradient(135deg, rgba(45,212,191,0.35), rgba(78,205,196,0.15))',
  'linear-gradient(135deg, rgba(78,205,196,0.35), rgba(108,92,231,0.15))',
  'linear-gradient(135deg, rgba(59,130,246,0.35), rgba(168,85,247,0.15))',
];
const HUB_CENTER = 180;
const HUB_ORBIT_R = 140;

const BRAIN_OUTLINE =
  'M70 90 L50 120 L55 155 L40 175 L65 200 L60 225 L95 235 L110 215 L130 230 L160 220 L185 235 L210 210 L195 185 L215 160 L200 130 L215 100 L185 75 L160 90 L140 65 L110 80 L90 60 Z';
const BRAIN_DIVIDE = 'M130 70 L128 100 L135 130 L125 160 L132 190 L128 225';
const BRAIN_DOTS: [number, number][] = [
  [70, 90],
  [55, 155],
  [95, 235],
  [160, 220],
  [210, 210],
  [215, 160],
  [185, 75],
];
const BRAIN_LINES = [
  { d: 'M215 110h140', dotStart: [215, 110] as [number, number] },
  { d: 'M212 140h140q10 0 10 20', dotStart: [212, 140] as [number, number] },
  { d: 'M210 175q80 0 110 -35', dotStart: [210, 175] as [number, number] },
  { d: 'M200 205q100 20 150 -25', dotStart: [200, 205] as [number, number] },
  { d: 'M180 225q120 45 180 -20', dotStart: [180, 225] as [number, number] },
];

const STAKING_INPUTS = [
  { label: 'Crypto', side: 'top' as const },
  { label: 'Stocks', side: 'right' as const },
  { label: 'Forex', side: 'bottom' as const },
  { label: 'Commodities', side: 'left' as const },
];

type TabContent = { tab: string; label: string; text: string };

function Watermark({ text }: { text: string }) {
  return <div className="mbg">{`${text} ${text} ${text}`}</div>;
}

function TabBgBlob({ variant = 1 }: { variant?: 1 | 2 }) {
  return <div className="tab-bg-blob" style={{ background: `var(--drop-gradient-${variant})` }} />;
}

function Mcontent({ label, text }: { label: string; text: string }) {
  return (
    <div className="mcontent">
      <div className="mlabel">{label}</div>
      <div className="mtext" dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }} />
    </div>
  );
}

function PresaleVisual({ tab }: { tab: TabContent }) {
  return (
    <div className="msec">
      <TabBgBlob variant={1} />
      <Watermark text="PRESALE" />
      <div className="tv-funnel">
        <div className="tv-funnel-bars">
          {FUNNEL_TIERS.map((t, i) => {
            const width = FUNNEL_MAX_WIDTH - (i / (FUNNEL_TIERS.length - 1)) * (FUNNEL_MAX_WIDTH - FUNNEL_MIN_WIDTH);
            return (
              <div key={t.name} className="tv-funnel-bar" style={{ width, animationDelay: `${i * 0.08}s` }}>
                <span className="tv-funnel-name">{t.name}</span>
                <span className="tv-funnel-price">{t.price}</span>
              </div>
            );
          })}
        </div>
        <div className="tv-funnel-arrow">
          <span className="tv-funnel-arrow-line" />
          <span className="tv-funnel-arrow-label">Price ↑</span>
        </div>
      </div>
      <Mcontent label={tab.label} text={tab.text} />
    </div>
  );
}

function ExchangeVisual({ tab }: { tab: TabContent }) {
  const n = EXCHANGE_NODES.length;
  const positions = EXCHANGE_NODES.map((node, i) => {
    const angle = (i / n) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    return { ...node, x: HUB_CENTER + Math.cos(rad) * HUB_ORBIT_R, y: HUB_CENTER + Math.sin(rad) * HUB_ORBIT_R };
  });

  return (
    <div className="msec">
      <TabBgBlob variant={2} />
      <Watermark text="EXCHANGE" />
      <div className="tv-hub">
        <svg className="tv-hub-lines" viewBox="0 0 360 360">
          {positions.map((node) => {
            const dx = node.x - HUB_CENTER;
            const dy = node.y - HUB_CENTER;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const bow = 16;
            const mx = (HUB_CENTER + node.x) / 2 + (-dy / len) * bow;
            const my = (HUB_CENTER + node.y) / 2 + (dx / len) * bow;
            return (
              <path
                key={node.label}
                d={`M${HUB_CENTER} ${HUB_CENTER} Q ${mx} ${my} ${node.x} ${node.y}`}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={1}
              />
            );
          })}
        </svg>
        <div className="tv-hub-center">FlowDex</div>
        <div className="tv-hub-orbit">
          {positions.map((node, i) => (
            <div key={node.label} className="tv-hub-node" style={{ left: node.x, top: node.y }}>
              <div className="tv-hub-node-spin">
                <span className="tv-hub-node-icon" style={{ background: NODE_GRADIENTS[i % NODE_GRADIENTS.length] }}>
                  {node.icon}
                </span>
                <span className="tv-hub-node-label">{node.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Mcontent label={tab.label} text={tab.text} />
    </div>
  );
}

function IntelligenceVisual({ tab }: { tab: TabContent }) {
  return (
    <div className="msec">
      <TabBgBlob variant={1} />
      <div className="tv-grid-bg" />
      <Watermark text="INTELLIGENCE" />
      <svg className="tv-brain" viewBox="0 0 500 350" fill="none">
        <path d={BRAIN_OUTLINE} stroke="rgba(168,85,247,0.45)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d={BRAIN_DIVIDE} stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
        {BRAIN_DOTS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={3.5} fill="rgba(168,85,247,0.85)" className="tv-brain-dot" style={{ animationDelay: `${i * 0.22}s` }} />
        ))}

        {BRAIN_LINES.map((line, i) => (
          <g key={i}>
            <path d={line.d} stroke="rgba(168,85,247,0.4)" strokeWidth="1" fill="none" />
            <circle r={2.5} fill="rgba(168,85,247,0.85)">
              <animateMotion dur={`${2.4 + i * 0.3}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" path={line.d} />
            </circle>
          </g>
        ))}

        {/* Small ascending bar chart the brain's signal lines feed into. */}
        <g transform="translate(365,150)">
          <rect x="0" y="64" width="14" height="24" rx="2" fill="var(--grad-blue)" opacity="0.75" />
          <rect x="20" y="44" width="14" height="44" rx="2" fill="var(--grad-teal)" opacity="0.75" />
          <rect x="40" y="20" width="14" height="68" rx="2" fill="var(--grad-violet)" opacity="0.75" />
          <path d="M0 60 20 40 40 16" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
        </g>
      </svg>
      <Mcontent label={tab.label} text={tab.text} />
    </div>
  );
}

function StakingVisual({ tab }: { tab: TabContent }) {
  return (
    <div className="csec">
      <div className="cside cside-l">{tab.label}</div>
      <div className="tv-stake-wrap">
        {STAKING_INPUTS.map((input, i) => (
          <div key={input.label} className={`tv-stake-line tv-stake-line-${input.side}`}>
            <span className="tv-stake-line-label">{input.label}</span>
            <span className="tv-stake-line-track">
              <span className="tv-stake-dot" style={{ animationDelay: `${i * 0.5}s` }} />
            </span>
          </div>
        ))}
        <div className="circle">
          <div className="circle-bg" />
          <div className="circle-text">
            <span className="tv-stake-pct">40%</span>
            <span className="tv-stake-fee">Fee Share</span>
            <div className="tv-stake-cta">
              <a href="https://purchase.flowdexprotocol.com" target="_blank" rel="noopener noreferrer" className="pill pill-sm">
                Buy $FDP
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="cside cside-r" dangerouslySetInnerHTML={{ __html: sanitizeHtml(tab.text) }} />
    </div>
  );
}

function FlowChainVisual({ tab }: { tab: TabContent }) {
  const binaryTexture = '01010 '.repeat(20);
  return (
    <div className="msec">
      <TabBgBlob variant={2} />
      <Watermark text="FLOWCHAIN" />
      <div className="tv-chain-wrap">
        <div className="tv-chain-row">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="tv-chain-link" style={{ animationDelay: `${i * 0.4}s` }}>
              <div className="tv-chain-link-texture">{binaryTexture}</div>
            </div>
          ))}
        </div>
        <div className="tv-chain-labels">
          <span>Layer 1</span>
          <span>·</span>
          <span>High Speed</span>
          <span>·</span>
          <span>Cross-Chain</span>
        </div>
      </div>
      <Mcontent label={tab.label} text={tab.text} />
    </div>
  );
}

const VISUALS = [PresaleVisual, ExchangeVisual, IntelligenceVisual, StakingVisual, FlowChainVisual];

export default function TabSectionClient({ tabs }: { tabs: TabContent[] }) {
  const [active, setActive] = useState(0);
  const Visual = VISUALS[active];

  return (
    <section>
      <div className="tab-nav">
        {TAB_NAMES.map((name, i) => (
          <button key={name} type="button" className={`tab-item${i === active ? ' active' : ''}`} onClick={() => setActive(i)}>
            {name}
          </button>
        ))}
      </div>
      <div className="tab-panels">
        <div className="tab-panel active">
          <Visual tab={tabs[active]} />
        </div>
      </div>
    </section>
  );
}
