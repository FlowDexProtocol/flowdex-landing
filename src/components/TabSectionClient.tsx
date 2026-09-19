'use client';

import { useState } from 'react';
import { sanitizeHtml } from '@/lib/sanitize';

const TAB_NAMES = ['Presale', 'Exchange', 'Intelligence', 'Staking', 'FlowChain'] as const;
const BAR_HEIGHTS = [120, 180, 260, 340, 420];
const BAR_GRADIENTS = [
  'linear-gradient(180deg, var(--grad-purple), var(--grad-violet))',
  'linear-gradient(180deg, var(--grad-violet), var(--grad-blue))',
  'linear-gradient(180deg, var(--grad-blue), var(--grad-teal))',
  'linear-gradient(180deg, var(--grad-teal), var(--grad-cyan))',
  'linear-gradient(180deg, var(--grad-cyan), var(--grad-purple))',
];

type TabContent = { tab: string; label: string; text: string };

function Watermark({ text }: { text: string }) {
  return <div className="mbg">{`${text} ${text} ${text}`}</div>;
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
      <Watermark text="PRESALE" />
      <div className="tab-vis-presale">
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="tv-bar"
            style={{ height: h, left: i * 52, background: BAR_GRADIENTS[i], animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      <Mcontent label={tab.label} text={tab.text} />
    </div>
  );
}

function ExchangeVisual({ tab }: { tab: TabContent }) {
  return (
    <div className="msec">
      <Watermark text="EXCHANGE" />
      <div className="tab-vis-exchange">
        <div className="tv-orb tv-orb-1" />
        <div className="tv-orb tv-orb-2" />
        <div className="tv-orb tv-orb-3" />
        <div className="tv-center-ring" />
      </div>
      <Mcontent label={tab.label} text={tab.text} />
    </div>
  );
}

function IntelligenceVisual({ tab }: { tab: TabContent }) {
  return (
    <div className="msec">
      <Watermark text="INTELLIGENCE" />
      <div className="tab-vis-intel">
        <div className="tv-ring tv-ring-1" />
        <div className="tv-ring tv-ring-2" />
        <div className="tv-ring tv-ring-3" />
        <div className="tv-core" />
        <div className="tv-pulse-dot" style={{ top: '20%', left: '30%' }} />
        <div className="tv-pulse-dot" style={{ top: '65%', left: '75%', animationDelay: '0.6s' }} />
        <div className="tv-pulse-dot" style={{ top: '75%', left: '20%', animationDelay: '1.2s' }} />
      </div>
      <Mcontent label={tab.label} text={tab.text} />
    </div>
  );
}

function StakingVisual({ tab }: { tab: TabContent }) {
  return (
    <div className="csec">
      <div className="cside cside-l">{tab.label}</div>
      <div className="circle">
        <div className="circle-bg" />
        <div className="circle-text">
          Earn <em>40% fees</em> from every trade.
          <div className="mt-5">
            <a href="https://purchase.flowdexprotocol.com" target="_blank" rel="noopener noreferrer" className="pill pill-sm">
              Buy $FDP
            </a>
          </div>
        </div>
      </div>
      <div className="cside cside-r" dangerouslySetInnerHTML={{ __html: sanitizeHtml(tab.text) }} />
    </div>
  );
}

function FlowChainVisual({ tab }: { tab: TabContent }) {
  return (
    <div className="msec">
      <Watermark text="FLOWCHAIN" />
      <div className="tab-vis-chain">
        <div className="tv-chain-line" />
        <div className="tv-link tv-link-1" />
        <div className="tv-link tv-link-2" />
        <div className="tv-link tv-link-3" />
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
