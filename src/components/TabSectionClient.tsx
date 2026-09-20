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
  { label: 'Liquidity', icon: '◉' },
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
          <span className="tv-funnel-arrow-label">Price increases ↓</span>
        </div>
      </div>
      <Mcontent label={tab.label} text={tab.text} />
    </div>
  );
}

function ExchangeVisual({ tab }: { tab: TabContent }) {
  const n = EXCHANGE_NODES.length;
  return (
    <div className="msec">
      <TabBgBlob variant={2} />
      <Watermark text="EXCHANGE" />
      <div className="tv-hub">
        <svg className="tv-hub-lines" viewBox="0 0 360 360">
          {EXCHANGE_NODES.map((node, i) => {
            const angle = (i / n) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = 180 + Math.cos(rad) * 130;
            const y = 180 + Math.sin(rad) * 130;
            return <line key={node.label} x1={180} y1={180} x2={x} y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />;
          })}
        </svg>
        <div className="tv-hub-center">FlowDex</div>
        {EXCHANGE_NODES.map((node, i) => {
          const angle = (i / n) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 180 + Math.cos(rad) * 130;
          const y = 180 + Math.sin(rad) * 130;
          return (
            <div
              key={node.label}
              className="tv-hub-node"
              style={{ left: x, top: y, animationDelay: `${i * 0.35}s` }}
            >
              <span className="tv-hub-node-icon">{node.icon}</span>
              <span className="tv-hub-node-label">{node.label}</span>
            </div>
          );
        })}
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
      <svg className="tv-brain" viewBox="0 0 420 260" fill="none">
        {/* Brain silhouette, built from two overlapping lobes. */}
        <path
          d="M120 60c-30-10-60 8-64 38-3 22 8 34 6 50-3 22 14 40 36 42 10 18 34 26 52 16 18 12 44 8 56-8 22 2 40-14 40-36 16-8 24-28 16-46 8-20-4-42-26-48-6-22-30-34-52-26-16-14-42-12-56 6-12-2-24 4-30 12"
          stroke="url(#brainGrad)"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <path d="M156 56v148M156 130c14-6 22-18 20-32M156 158c18 4 34-4 40-18" stroke="url(#brainGrad)" strokeWidth="1" opacity="0.4" />
        {[
          [96, 96],
          [150, 66],
          [206, 84],
          [92, 154],
          [140, 190],
          [200, 168],
          [176, 122],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={3} fill="var(--grad-violet)" className="tv-brain-dot" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}

        {/* Connecting lines from brain out to the chart. */}
        <path d="M232 130h60" stroke="url(#brainGrad)" strokeWidth="1" opacity="0.4" />
        <circle r={3} fill="#fff" className="tv-brain-travel">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M232 130h60" />
        </circle>

        {/* Small bar chart on the right. */}
        <g transform="translate(310,90)">
          <rect x="0" y="64" width="14" height="24" rx="2" fill="var(--grad-blue)" opacity="0.7" />
          <rect x="20" y="44" width="14" height="44" rx="2" fill="var(--grad-teal)" opacity="0.7" />
          <rect x="40" y="20" width="14" height="68" rx="2" fill="var(--grad-violet)" opacity="0.7" />
          <path d="M0 60 20 40 40 16" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
        </g>

        <defs>
          <linearGradient id="brainGrad" x1="0" y1="0" x2="420" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--grad-violet)" />
            <stop offset="1" stopColor="var(--grad-blue)" />
          </linearGradient>
        </defs>
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
            <div className="mt-5">
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
  const binaryTexture = '01 '.repeat(24);
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
