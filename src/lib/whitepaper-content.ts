// ══════════════════════════════════════════════════
// src/lib/whitepaper-content.ts
// GENERATED FILE — do not edit by hand.
//
// Parsed from the FlowDex Protocol whitepaper v9.0 source markdown.
// The PDF remains the canonical artifact for download, but a PDF is
// close to invisible to retrieval: answer engines extract from HTML
// with real headings and tables, not from a binary. These section
// pages exist so the whitepaper's substance is reachable and citable.
//
// Regenerate rather than editing: any fix belongs in the markdown
// source, so the PDF and these pages cannot drift apart again.
// ══════════════════════════════════════════════════

export type WhitepaperBlock =
  | { t: 'h3'; text: string }
  | { t: 'p'; text: string }
  | { t: 'caption'; text: string }
  | { t: 'quote'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] };

export interface WhitepaperSection {
  slug: string;
  number: number;
  title: string;
  /** Lead sentence, reused as meta description and schema abstract. */
  lead: string;
  blocks: WhitepaperBlock[];
}

export const WHITEPAPER_VERSION = 'v9.0';
export const WHITEPAPER_DATE = 'October 2026';

export const WHITEPAPER_SECTIONS: WhitepaperSection[] = [
  {
    "slug": "executive-summary",
    "number": 1,
    "title": "Executive Summary",
    "lead": "FlowDex Protocol is a non-custodial Universal Exchange that enables decentralized trading of crypto assets, tokenized stocks, forex pairs, commodities, ETFs, indices, options, futures, and CFDs — all from a single on-chain interface.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex Protocol is a non-custodial Universal Exchange that enables decentralized trading of crypto assets, tokenized stocks, forex pairs, commodities, ETFs, indices, options, futures, and CFDs — all from a single on-chain interface."
      },
      {
        "t": "p",
        "text": "By bridging blockchain infrastructure with traditional financial markets, FlowDex gives any person on earth access to 500+ tradeable assets at full launch, 24/7, with no broker accounts, no geographic restrictions, and no custodial risk."
      },
      {
        "t": "h3",
        "text": "The Convergence of TradFi and DeFi"
      },
      {
        "t": "p",
        "text": "The convergence of traditional finance (TradFi) and decentralized finance (DeFi) is the defining trend of 2026. Tokenized real-world assets (RWAs) have surpassed $25 billion on-chain. Nasdaq has applied to the SEC to trade tokenized securities on-chain. Centralized exchanges like Bitget are reporting $4 billion per day in tokenized TradFi volume."
      },
      {
        "t": "p",
        "text": "Yet every existing solution requires users to trust a centralized intermediary with their funds."
      },
      {
        "t": "p",
        "text": "FlowDex is the missing piece: a fully decentralized, non-custodial platform where users trade both crypto-native tokens and tokenized real-world assets while retaining full control of their private keys."
      },
      {
        "t": "h3",
        "text": "How It Works"
      },
      {
        "t": "p",
        "text": "FlowDex's smart order routing engine aggregates liquidity from 50+ decentralized exchanges across 10+ blockchains, while simultaneously sourcing tokenized asset liquidity from providers like Ondo Finance, Backed Finance, and Dinari."
      },
      {
        "t": "p",
        "text": "The result: a user can swap ETH for tokenized Tesla stock, convert USD to gold exposure, or trade EUR/USD forex pairs — all non-custodially, all settled on-chain, all from one interface."
      },
      {
        "t": "h3",
        "text": "The FDP Token"
      },
      {
        "t": "p",
        "text": "The platform is powered by FDP, an ERC-20 token on Ethereum with a fixed supply of 100 billion. FDP serves five functions:"
      },
      {
        "t": "ul",
        "items": [
          "**Protocol fee sharing** — 40% of all fees flow to stakers",
          "**Governance** — quadratic voting on all protocol decisions",
          "**Routing priority** — stakers' trades execute first",
          "**Network security** — validator staking when FlowDex migrates to FlowChain",
          "**Intelligence access** — tiered access to the AI Intelligence Terminal"
        ]
      },
      {
        "t": "h3",
        "text": "Phased Development"
      },
      {
        "t": "ul",
        "items": [
          "**Phase 1:** Launches on Ethereum with crypto trading and the first wave of tokenized assets",
          "**Phase 2:** Expands to BSC, Solana, Arbitrum, and Polygon targeting 500+ assets",
          "**Phase 3:** Migrates to FlowChain, a purpose-built appchain with 50,000+ TPS"
        ]
      },
      {
        "t": "h3",
        "text": "Key Facts at a Glance"
      },
      {
        "t": "table",
        "head": [
          "Item",
          "Value"
        ],
        "rows": [
          [
            "Product",
            "Non-custodial Universal Exchange"
          ],
          [
            "Asset Coverage",
            "500+ tradeable assets across 10+ blockchains"
          ],
          [
            "Token",
            "FDP"
          ],
          [
            "Total Supply",
            "100,000,000,000 (100 billion)"
          ],
          [
            "Presale Allocation",
            "30% = 30,000,000,000 FDP"
          ],
          [
            "Presale Tiers",
            "20"
          ],
          [
            "Tier 1 Price",
            "$0.0005"
          ],
          [
            "Tier 20 Price",
            "$0.01"
          ],
          [
            "Launch Price Target",
            "$0.50"
          ],
          [
            "Staking",
            "40% of protocol fees + emission rewards"
          ],
          [
            "Architecture",
            "ERC-20 → Multi-Chain → FlowChain Appchain"
          ],
          [
            "VC Allocation",
            "Zero"
          ],
          [
            "License",
            "MIT open-source"
          ]
        ]
      }
    ]
  },
  {
    "slug": "the-problem",
    "number": 2,
    "title": "The Problem",
    "lead": "Today, if you want to trade Bitcoin, Tesla stock, EUR/USD, gold, and the S&P 500 index, you need at minimum four separate accounts: a crypto exchange, a stock broker, a forex broker, and a commodities platform.",
    "blocks": [
      {
        "t": "p",
        "text": "Today, if you want to trade Bitcoin, Tesla stock, EUR/USD, gold, and the S&P 500 index, you need at minimum four separate accounts: a crypto exchange, a stock broker, a forex broker, and a commodities platform. Each requires separate KYC, separate funding, separate interfaces, and separate fee structures."
      },
      {
        "t": "h3",
        "text": "2.1 Fragmented Access"
      },
      {
        "t": "p",
        "text": "There is no single platform where you can trade crypto and traditional assets in a unified, non-custodial environment. The intersection — a decentralized platform supporting both crypto-native and real-world assets — does not yet exist at scale."
      },
      {
        "t": "h3",
        "text": "2.2 Custodial Risk"
      },
      {
        "t": "p",
        "text": "The FTX collapse, Celsius, and Voyager demonstrated the catastrophic risk of custodial exchanges. FlowDex eliminates this entirely: assets never leave the user's wallet until the moment of on-chain execution."
      },
      {
        "t": "h3",
        "text": "2.3 Geographic Restrictions"
      },
      {
        "t": "p",
        "text": "Traditional financial markets are gated by geography. Tokenized assets on a decentralized platform are borderless by default — if you have a wallet, you can trade."
      },
      {
        "t": "h3",
        "text": "2.4 Market Hours & Settlement"
      },
      {
        "t": "p",
        "text": "Stock markets operate ~6.5 hours/day, 5 days/week. By tokenizing traditional assets on blockchain rails, FlowDex enables 24/7 trading with instant on-chain settlement."
      },
      {
        "t": "h3",
        "text": "2.5 Liquidity Fragmentation"
      },
      {
        "t": "p",
        "text": "Even within crypto, liquidity is scattered across hundreds of DEXs. By aggregating liquidity across 50+ DEXs and multiple RWA tokenization providers, FlowDex minimizes slippage to as low as 0.2%."
      },
      {
        "t": "h3",
        "text": "2.6 No Cross-Asset Margin"
      },
      {
        "t": "p",
        "text": "FlowDex's unified interface with FlowChain's native multi-asset support enables true cross-asset composability — a paradigm shift for DeFi."
      }
    ]
  },
  {
    "slug": "market-opportunity",
    "number": 3,
    "title": "Market Opportunity",
    "lead": "FlowDex sits at the intersection of four massive markets that are actively converging: cryptocurrency exchanges, global forex, equities/ETFs, and tokenized real-world assets.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex sits at the intersection of four massive markets that are actively converging: cryptocurrency exchanges, global forex, equities/ETFs, and tokenized real-world assets. The combined addressable market exceeds $10 trillion in daily volume."
      },
      {
        "t": "h3",
        "text": "3.1 Cryptocurrency Exchange Market"
      },
      {
        "t": "p",
        "text": "The global cryptocurrency exchange market is valued at approximately $85.75 billion in 2026, with forecasts reaching $314 billion by 2033 (20.3% CAGR). DEX volume has grown from $25 billion monthly in 2020 to over $320 billion in 2024."
      },
      {
        "t": "h3",
        "text": "3.2 Global Forex Market"
      },
      {
        "t": "p",
        "text": "The foreign exchange market is the largest financial market in the world, with daily trading volume hitting a record $9.6 trillion in Q2 2025 — up 28% from 2022."
      },
      {
        "t": "h3",
        "text": "3.3 Tokenized RWAs"
      },
      {
        "t": "p",
        "text": "Tokenized real-world assets have tripled to $18.5 billion in 2025 and are projected to surpass $50 billion in 2026. Analysts project the tokenized RWA sector could reach $16 trillion by 2030."
      },
      {
        "t": "h3",
        "text": "3.4 The Universal Exchange Opportunity"
      },
      {
        "t": "p",
        "text": "FlowDex is positioned to capture the intersection of all four markets by offering the only non-custodial, cross-chain platform where users can trade crypto, stocks, forex, commodities, and more from a single wallet connection."
      }
    ]
  },
  {
    "slug": "the-flowdex-solution",
    "number": 4,
    "title": "The FlowDex Solution",
    "lead": "FlowDex Protocol is the first non-custodial Universal Exchange — a single decentralized platform where users trade crypto, tokenized stocks, forex, commodities, indices, ETFs, options, futures, and CFDs.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex Protocol is the first non-custodial Universal Exchange — a single decentralized platform where users trade crypto, tokenized stocks, forex, commodities, indices, ETFs, options, futures, and CFDs."
      },
      {
        "t": "h3",
        "text": "4.1 What You Can Trade"
      },
      {
        "t": "table",
        "head": [
          "Asset Class",
          "Number of Assets",
          "Source"
        ],
        "rows": [
          [
            "Crypto",
            "1,000+ tokens",
            "50+ DEXs across 10+ chains"
          ],
          [
            "Tokenized Stocks",
            "200+",
            "Ondo, Backed Finance, Dinari"
          ],
          [
            "Forex Pairs",
            "50+",
            "Chainlink and Pyth price feeds"
          ],
          [
            "Commodities",
            "30+",
            "Tokenized gold, silver, oil, gas"
          ],
          [
            "Indices",
            "20+",
            "S&P 500, Nasdaq 100, FTSE 100, DAX, Nikkei 225"
          ],
          [
            "ETFs",
            "50+",
            "QQQ, SPY, GLD, IWM, VTI"
          ],
          [
            "Options & Futures",
            "30+",
            "Crypto perpetuals, tokenized options"
          ],
          [
            "CFDs",
            "Variable",
            "Up to 100x leverage"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "4.2 Smart Order Routing"
      },
      {
        "t": "p",
        "text": "When a user initiates any trade on FlowDex, the smart order routing engine:"
      },
      {
        "t": "ul",
        "items": [
          "Scans all connected liquidity sources — 50+ DEXs, RWA tokenization providers, oracle-priced synthetic pools",
          "Evaluates 1,000+ potential execution paths in under 200 milliseconds",
          "Splits the trade across the optimal combination of paths",
          "Executes atomically on same-chain or sequentially for cross-chain",
          "Settles instantly on-chain — tokens go directly to the user's wallet"
        ]
      },
      {
        "t": "h3",
        "text": "4.3 Key Differentiators"
      },
      {
        "t": "table",
        "head": [
          "Feature",
          "FlowDex",
          "Bitget TradFi",
          "Injective",
          "dYdX"
        ],
        "rows": [
          [
            "Custody",
            "Non-custodial",
            "Centralized",
            "Non-custodial",
            "Non-custodial"
          ],
          [
            "Crypto Trading",
            "1,000+ tokens",
            "1,300+ tokens",
            "200+ tokens",
            "170+ perps"
          ],
          [
            "Tokenized Stocks",
            "200+",
            "Limited",
            "<20",
            "No"
          ],
          [
            "Forex",
            "50+ pairs",
            "Yes",
            "No",
            "No"
          ],
          [
            "Cross-Chain",
            "10+ chains",
            "No",
            "Injective only",
            "dYdX only"
          ],
          [
            "Fee Sharing",
            "40% to stakers",
            "BGB discounts",
            "Limited",
            "Partial"
          ],
          [
            "Own Blockchain",
            "FlowChain",
            "No",
            "Injective L1",
            "dYdX chain"
          ]
        ]
      }
    ]
  },
  {
    "slug": "platform-architecture",
    "number": 5,
    "title": "Platform Architecture",
    "lead": "FlowDex follows a phased development architecture that balances immediate product delivery with long-term infrastructure ambition — the same model used by dYdX and Injective.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex follows a phased development architecture that balances immediate product delivery with long-term infrastructure ambition — the same model used by dYdX and Injective."
      },
      {
        "t": "h3",
        "text": "5.1 Phase 1: Ethereum Foundation (Q1 2027)"
      },
      {
        "t": "p",
        "text": "FDP launches as an ERC-20 on Ethereum mainnet with smart order routing across 20+ DEXs, tokenized stock trading, forex pair trading, gold and commodity exposure, FDP staking portal, governance module, and cross-chain swap routing."
      },
      {
        "t": "h3",
        "text": "5.2 Phase 2: Multi-Chain + Full Asset Suite (Q2–Q3 2027)"
      },
      {
        "t": "p",
        "text": "FlowDex expands to BSC, Solana, Arbitrum, Polygon, and Avalanche with 200+ tokenized stocks, 50+ forex pairs, 30+ commodity contracts, perpetual futures, options trading, mobile app, and institutional API."
      },
      {
        "t": "h3",
        "text": "5.3 Phase 3: FlowChain Appchain (2028)"
      },
      {
        "t": "p",
        "text": "FlowChain — a purpose-built application-specific blockchain: 50,000+ TPS, sub-500ms finality, zero gas for routing, custom precompiles, native compliance modules, cross-asset margin, 500+ permissionless validators, and full DAO governance handoff."
      },
      {
        "t": "h3",
        "text": "Architecture Comparison"
      },
      {
        "t": "table",
        "head": [
          "Specification",
          "Phase 1 (Ethereum)",
          "Phase 2 (Multi-Chain)",
          "Phase 3 (FlowChain)"
        ],
        "rows": [
          [
            "Token Standard",
            "ERC-20",
            "ERC-20 + bridged",
            "Native chain token"
          ],
          [
            "Asset Coverage",
            "100+",
            "500+",
            "500+"
          ],
          [
            "Transaction Speed",
            "~12s",
            "Varies by chain",
            "<500ms finality"
          ],
          [
            "Throughput",
            "~30 TPS",
            "Varies",
            "50,000+ TPS"
          ],
          [
            "Gas Costs",
            "Ethereum rates",
            "Varies",
            "Zero for routing"
          ],
          [
            "Validators",
            "Ethereum",
            "Each chain's native",
            "500+ FDP stakers"
          ]
        ]
      }
    ]
  },
  {
    "slug": "tokenized-asset-infrastructure",
    "number": 6,
    "title": "Tokenized Asset Infrastructure",
    "lead": "FlowDex does not create its own tokenized assets. Instead, it aggregates liquidity from established, regulated tokenization providers — the same approach that made DEX aggregators successful.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex does not create its own tokenized assets. Instead, it aggregates liquidity from established, regulated tokenization providers — the same approach that made DEX aggregators successful."
      },
      {
        "t": "h3",
        "text": "6.1 RWA Tokenization Partners"
      },
      {
        "t": "table",
        "head": [
          "Provider",
          "Asset Types",
          "Blockchain(s)",
          "Status"
        ],
        "rows": [
          [
            "Ondo Finance",
            "US Treasuries, Stocks, ETFs",
            "Ethereum, Solana, Arbitrum",
            "In Integration"
          ],
          [
            "Backed Finance",
            "European & US Stocks, ETFs",
            "Ethereum, Polygon",
            "In Discussion"
          ],
          [
            "Dinari",
            "US Stocks (200+)",
            "Ethereum, Arbitrum, BSC",
            "In Discussion"
          ],
          [
            "Paxos (PAXG)",
            "Gold",
            "Ethereum",
            "Planned"
          ],
          [
            "Tether Gold (XAUT)",
            "Gold",
            "Ethereum",
            "Planned"
          ],
          [
            "Synthetix V3",
            "Forex, Indices, Commodities",
            "Ethereum, Optimism, Base",
            "Planned"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "6.2 Oracle Infrastructure"
      },
      {
        "t": "table",
        "head": [
          "Provider",
          "Coverage",
          "Update Frequency",
          "Role"
        ],
        "rows": [
          [
            "Pyth Network",
            "500+ feeds",
            "400ms",
            "Primary feed"
          ],
          [
            "Chainlink",
            "200+ feeds",
            "~1 second",
            "Secondary/validation"
          ],
          [
            "On-Chain TWAP",
            "All DEX pairs",
            "Per-block",
            "Fallback"
          ],
          [
            "Band Protocol",
            "Forex + commodity",
            "~5 seconds",
            "Tertiary backup"
          ]
        ]
      }
    ]
  },
  {
    "slug": "fdp-tokenomics",
    "number": 7,
    "title": "FDP Tokenomics",
    "lead": "The FDP token is the economic backbone of the FlowDex Universal Exchange. It serves five distinct functions creating genuine, non-speculative demand: protocol fee sharing, governance participation, routing priority, network security, and intelligence access.",
    "blocks": [
      {
        "t": "p",
        "text": "The FDP token is the economic backbone of the FlowDex Universal Exchange. It serves five distinct functions creating genuine, non-speculative demand: protocol fee sharing, governance participation, routing priority, network security, and intelligence access."
      },
      {
        "t": "h3",
        "text": "7.1 Token Specifications"
      },
      {
        "t": "table",
        "head": [
          "Parameter",
          "Details"
        ],
        "rows": [
          [
            "Token Name",
            "FlowDex Protocol"
          ],
          [
            "Ticker",
            "FDP"
          ],
          [
            "Token Standard",
            "ERC-20 (Ethereum mainnet) at launch"
          ],
          [
            "Total Supply",
            "100,000,000,000 (100 billion) — fixed, non-inflationary, immutable"
          ],
          [
            "Blockchain",
            "Ethereum (Phase 1) → Multi-chain (Phase 2) → FlowChain (Phase 3)"
          ],
          [
            "Tier 1 Presale Price",
            "$0.0005"
          ],
          [
            "Tier 20 Presale Price",
            "$0.01"
          ],
          [
            "Target Launch Price",
            "$0.50"
          ],
          [
            "Decimals",
            "18"
          ],
          [
            "Contract Audit",
            "Trail of Bits + OpenZeppelin (pre-deployment)"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "7.2 Token Distribution"
      },
      {
        "t": "p",
        "text": "100% of the total supply is allocated. Zero VC allocation."
      },
      {
        "t": "caption",
        "text": "Figure 1: FDP Token Allocation — 100 billion total supply, 10 categories, zero VC allocation."
      },
      {
        "t": "table",
        "head": [
          "Allocation",
          "Percentage",
          "Tokens",
          "Vesting"
        ],
        "rows": [
          [
            "Presale (20 Tiers)",
            "30%",
            "30,000,000,000",
            "Per-tier schedule"
          ],
          [
            "Team",
            "15%",
            "15,000,000,000",
            "1-year cliff + 4-year linear"
          ],
          [
            "Treasury / DAO",
            "15%",
            "15,000,000,000",
            "DAO-controlled"
          ],
          [
            "Staking Rewards",
            "12%",
            "12,000,000,000",
            "10-year declining emission"
          ],
          [
            "Ecosystem / Community",
            "10%",
            "10,000,000,000",
            "4-year distribution"
          ],
          [
            "Liquidity",
            "6%",
            "6,000,000,000",
            "Unlocked at listing"
          ],
          [
            "Airdrop",
            "5%",
            "5,000,000,000",
            "Fully unlocked at TGE"
          ],
          [
            "Advisors",
            "3%",
            "3,000,000,000",
            "1-year cliff + 3-year linear"
          ],
          [
            "Exchange Listings",
            "2%",
            "2,000,000,000",
            "Unlocked at listing"
          ],
          [
            "Market Makers",
            "2%",
            "2,000,000,000",
            "Unlocked at listing"
          ],
          [
            "**TOTAL**",
            "**100%**",
            "**100,000,000,000**",
            ""
          ]
        ]
      },
      {
        "t": "h3",
        "text": "7.3 Fee Structure & Revenue Sharing"
      },
      {
        "t": "p",
        "text": "FlowDex charges competitive fees across all asset classes, with 40% flowing directly to FDP stakers."
      },
      {
        "t": "caption",
        "text": "Figure 2: Protocol fee distribution for crypto swap fees."
      },
      {
        "t": "table",
        "head": [
          "Fee Type",
          "Rate",
          "Distribution"
        ],
        "rows": [
          [
            "Crypto Swap Fee",
            "0.03%",
            "40% stakers · 30% treasury · 20% dev · 10% burn"
          ],
          [
            "RWA Trading Fee",
            "0.05%",
            "40% stakers · 30% treasury · 20% RWA · 10% burn"
          ],
          [
            "Forex/Commodity Fee",
            "0.02% + spread",
            "40% stakers · 30% treasury · 20% oracle · 10% burn"
          ],
          [
            "Cross-Chain Fee",
            "0.05% + bridge gas",
            "50% stakers · 30% treasury · 20% bridge"
          ],
          [
            "Priority Routing",
            "0.01% premium",
            "100% to stakers"
          ],
          [
            "Perpetual Funding",
            "Variable",
            "40% stakers · 60% counterparty pool"
          ],
          [
            "Prediction Markets",
            "2% of winnings",
            "40% stakers · 30% LPs · 20% treasury · 10% burn"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "7.4 Staking Mechanics & Emission Schedule"
      },
      {
        "t": "p",
        "text": "FDP staking rewards follow a declining emission curve over 10 years with a 0.8× decay factor. Total staking pool: 12,000,000,000 FDP."
      },
      {
        "t": "p",
        "text": "Emission decay formula: `Emission(year) = 240,000,000 × (0.8)^(year − 1)`"
      },
      {
        "t": "p",
        "text": "Staking APY Formula: `APY = (0.40 × Annual_Protocol_Fees + Emission(year)) ÷ Total_Staked_FDP`"
      },
      {
        "t": "caption",
        "text": "Figure 3: Staking emission schedule — 10-year declining curve with 0.8× annual decay."
      },
      {
        "t": "table",
        "head": [
          "Year",
          "Annual Emission",
          "Cumulative",
          "% of Pool",
          "Est. APY"
        ],
        "rows": [
          [
            "1",
            "240,000,000",
            "240,000,000",
            "20.0%",
            "15–20%"
          ],
          [
            "2",
            "192,000,000",
            "432,000,000",
            "16.0%",
            "12–16%"
          ],
          [
            "3",
            "153,600,000",
            "585,600,000",
            "12.8%",
            "10–13%"
          ],
          [
            "4",
            "120,000,000",
            "705,600,000",
            "10.0%",
            "8–11%"
          ],
          [
            "5",
            "96,000,000",
            "801,600,000",
            "8.0%",
            "7–9%"
          ],
          [
            "6",
            "76,800,000",
            "878,400,000",
            "6.4%",
            "5–8%"
          ],
          [
            "7",
            "61,440,000",
            "939,840,000",
            "5.1%",
            "4–7%"
          ],
          [
            "8",
            "49,152,000",
            "988,992,000",
            "4.1%",
            "3–6%"
          ],
          [
            "9",
            "39,321,600",
            "1,028,313,600",
            "3.3%",
            "3–5%"
          ],
          [
            "10",
            "31,457,280",
            "1,059,770,880",
            "2.6%",
            "2–4%"
          ]
        ]
      }
    ]
  },
  {
    "slug": "presale-structure",
    "number": 8,
    "title": "Presale Structure",
    "lead": "FlowDex conducts a 20-tier public presale with zero venture capital. The tiered structure rewards early participants with progressively better entry prices.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex conducts a 20-tier public presale with zero venture capital. The tiered structure rewards early participants with progressively better entry prices. All funds are managed through a 4-of-7 multisig treasury with mandatory quarterly on-chain transparency reports."
      },
      {
        "t": "h3",
        "text": "8.1 Presale Overview"
      },
      {
        "t": "table",
        "head": [
          "Parameter",
          "Value"
        ],
        "rows": [
          [
            "Total Presale Allocation",
            "30,000,000,000 FDP (30% of supply)"
          ],
          [
            "Number of Tiers",
            "20"
          ],
          [
            "Price Progression",
            "Geometric (~17.08% increase per tier)"
          ],
          [
            "Tier 1 Price",
            "$0.0005"
          ],
          [
            "Tier 20 Price",
            "$0.01"
          ],
          [
            "Hard Cap Per Tier",
            "No USD cap — tier closes when tokens sell out"
          ],
          [
            "Accepted Currencies",
            "ETH, USDT, USDC, BNB, SOL, BTC, TRX"
          ]
        ]
      },
      {
        "t": "caption",
        "text": "Figure 4: 20-tier presale price progression — geometric increase of ~17.08% per tier."
      },
      {
        "t": "h3",
        "text": "8.2 Full 20-Tier Presale Table"
      },
      {
        "t": "table",
        "head": [
          "Tier",
          "Price",
          "Tokens Available",
          "TGE Unlock (10%)"
        ],
        "rows": [
          [
            "1",
            "$0.00050000",
            "250,000,000",
            "25,000,000"
          ],
          [
            "2",
            "$0.00058539",
            "381,578,947",
            "38,157,895"
          ],
          [
            "3",
            "$0.00068528",
            "513,157,895",
            "51,315,790"
          ],
          [
            "4",
            "$0.00080227",
            "644,736,842",
            "64,473,684"
          ],
          [
            "5",
            "$0.00093927",
            "776,315,789",
            "77,631,579"
          ],
          [
            "6",
            "$0.00109966",
            "907,894,737",
            "90,789,474"
          ],
          [
            "7",
            "$0.00128741",
            "1,039,473,684",
            "103,947,368"
          ],
          [
            "8",
            "$0.00150726",
            "1,171,052,632",
            "117,105,263"
          ],
          [
            "9",
            "$0.00176472",
            "1,302,631,579",
            "130,263,158"
          ],
          [
            "10",
            "$0.00206621",
            "1,434,210,526",
            "143,421,053"
          ],
          [
            "11",
            "$0.00241910",
            "1,565,789,474",
            "156,578,947"
          ],
          [
            "12",
            "$0.00283226",
            "1,697,368,421",
            "169,736,842"
          ],
          [
            "13",
            "$0.00331594",
            "1,828,947,368",
            "182,894,737"
          ],
          [
            "14",
            "$0.00388227",
            "1,960,526,316",
            "196,052,632"
          ],
          [
            "15",
            "$0.00454526",
            "2,092,105,263",
            "209,210,526"
          ],
          [
            "16",
            "$0.00532153",
            "2,223,684,211",
            "222,368,421"
          ],
          [
            "17",
            "$0.00623039",
            "2,355,263,158",
            "235,526,316"
          ],
          [
            "18",
            "$0.00729444",
            "2,486,842,105",
            "248,684,210"
          ],
          [
            "19",
            "$0.00854023",
            "2,618,421,053",
            "261,842,105"
          ],
          [
            "20",
            "$0.01000000",
            "2,750,000,000",
            "275,000,000"
          ],
          [
            "**TOTAL**",
            "",
            "**30,000,000,000**",
            "**3,000,000,000**"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "8.3 Vesting & Unlock Schedule"
      },
      {
        "t": "p",
        "text": "Every presale tier carries identical vesting terms. There is **no cliff period** for any tier, and the schedule does not vary by tier number. The only thing that differs between tiers is price."
      },
      {
        "t": "caption",
        "text": "Figure 5: Presale vesting — 10% at TGE, then 12 months of monthly linear vesting, identical across all 20 tiers."
      },
      {
        "t": "table",
        "head": [
          "Parameter",
          "All Tiers (1–20)"
        ],
        "rows": [
          [
            "TGE Unlock",
            "10%"
          ],
          [
            "Cliff",
            "None"
          ],
          [
            "Linear Vest",
            "12 months, monthly"
          ],
          [
            "Full Unlock",
            "12 months after that tier's TGE"
          ]
        ]
      },
      {
        "t": "p",
        "text": "**Key points:**"
      },
      {
        "t": "ul",
        "items": [
          "10% of tokens unlock immediately at each tier's TGE",
          "The remaining 90% vest linearly each month, beginning at TGE with no waiting period",
          "Terms are identical for every tier, so no participant receives worse treatment than another",
          "Each tier's vesting clock starts when that tier closes, not at listing. Earlier tiers therefore reach full unlock earlier in calendar time: a Tier 1 participant pays the lowest price in the presale and is fully unlocked before any later tier",
          "Because tiers close sequentially, the twenty vesting streams are naturally offset and total presale supply is released across roughly twenty months rather than twelve"
        ]
      },
      {
        "t": "h3",
        "text": "8.4 Participant Protections"
      },
      {
        "t": "ul",
        "items": [
          "Token contract independently audited by 2+ tier-1 security firms before presale",
          "Core team tokens fully locked 1 year + 4-year vesting",
          "4-of-7 multisig treasury with mandatory quarterly on-chain transparency reports",
          "All vesting enforced at smart contract level — immutable after deployment",
          "Zero VC allocation — 100% of non-team tokens go to the community"
        ]
      }
    ]
  },
  {
    "slug": "per-tier-tge-model",
    "number": 9,
    "title": "Per-Tier TGE Model",
    "lead": "FlowDex introduces a novel presale distribution model: instead of a single Token Generation Event at listing, each presale tier has its own independent TGE when that tier's token allocation is sold out.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex introduces a novel presale distribution model: instead of a single Token Generation Event at listing, each presale tier has its own independent TGE when that tier's token allocation is sold out."
      },
      {
        "t": "h3",
        "text": "9.1 How It Works"
      },
      {
        "t": "ul",
        "items": [
          "When a tier's token allocation is sold, that tier closes and the next tier opens automatically",
          "Upon tier closure, the TGE percentage for that tier becomes claimable",
          "Participants claim their TGE tokens via the FlowDex portal",
          "Tokens are non-transferable until exchange listing but visible on-chain",
          "Each tier's monthly vesting begins from that tier's TGE date, not from listing"
        ]
      },
      {
        "t": "h3",
        "text": "9.2 Why This Model"
      },
      {
        "t": "p",
        "text": "**Trust:** Participants hold tokens in their own wallets, on-chain, verifiable."
      },
      {
        "t": "p",
        "text": "**Staggered Sell Pressure:** Each tier's vesting ends at a different time, distributing sell pressure over 12+ months."
      },
      {
        "t": "p",
        "text": "**Community Building:** By listing, thousands of wallets already hold FDP."
      },
      {
        "t": "h3",
        "text": "9.3 Claim Mechanism"
      },
      {
        "t": "p",
        "text": "Distribution uses a claim-based Merkle proof model — the same mechanism used by major airdrops (Uniswap, Arbitrum, Optimism). Gas-efficient: approximately $2–5 per claim."
      },
      {
        "t": "h3",
        "text": "9.4 Smart Contract Architecture"
      },
      {
        "t": "table",
        "head": [
          "Field",
          "Type",
          "Description"
        ],
        "rows": [
          [
            "walletAddress",
            "address",
            "Participant's Ethereum wallet"
          ],
          [
            "tier",
            "uint8",
            "Presale tier (1–20)"
          ],
          [
            "totalAllocation",
            "uint256",
            "Total FDP tokens allocated"
          ],
          [
            "tgePercentage",
            "uint8",
            "TGE unlock % for this tier (10%)"
          ],
          [
            "tgeClaimed",
            "bool",
            "Whether TGE tokens have been claimed"
          ],
          [
            "tierTgeTimestamp",
            "uint256",
            "Unix timestamp when this tier closed"
          ],
          [
            "vestDuration",
            "uint256",
            "Linear vest period in seconds"
          ],
          [
            "totalClaimed",
            "uint256",
            "Total tokens claimed to date"
          ],
          [
            "transferable",
            "bool",
            "False until listing"
          ]
        ]
      }
    ]
  },
  {
    "slug": "launch-and-liquidity",
    "number": 10,
    "title": "Launch and Liquidity",
    "lead": "This section covers everything that happens at and around the token generation event (TGE) and exchange listing.",
    "blocks": [
      {
        "t": "p",
        "text": "This section covers everything that happens at and around the token generation event (TGE) and exchange listing."
      },
      {
        "t": "h3",
        "text": "10.1 Launch Price"
      },
      {
        "t": "table",
        "head": [
          "Parameter",
          "Value"
        ],
        "rows": [
          [
            "Tier 20 Presale Price (last tier)",
            "$0.01"
          ],
          [
            "Target Launch Price",
            "$0.50"
          ]
        ]
      },
      {
        "t": "p",
        "text": "**Important warning:** The $0.50 launch price is a target, not a guarantee. It depends on market conditions, trading volume, exchange listings, and overall demand."
      },
      {
        "t": "h3",
        "text": "10.2 Circulating Supply at TGE"
      },
      {
        "t": "table",
        "head": [
          "Source",
          "Tokens Unlocked at TGE"
        ],
        "rows": [
          [
            "Presale TGE Unlock (10% of 30B)",
            "3,000,000,000"
          ],
          [
            "Airdrop (fully unlocked)",
            "5,000,000,000"
          ],
          [
            "Liquidity (unlocked at listing)",
            "6,000,000,000"
          ],
          [
            "Exchange Listings (unlocked at listing)",
            "2,000,000,000"
          ],
          [
            "Market Makers (unlocked at listing)",
            "2,000,000,000"
          ],
          [
            "**Total Circulating Supply at TGE**",
            "**18,000,000,000 FDP (18%)**"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "10.3 Liquidity Provisioning"
      },
      {
        "t": "p",
        "text": "Liquidity is sourced from 6% of total token supply (6,000,000,000 FDP) plus a portion of presale funds. This is deployed across DEX liquidity pools (Uniswap, Curve, Balancer), CEX liquidity deposits, market maker partnerships, and cross-chain liquidity bridging."
      },
      {
        "t": "h3",
        "text": "10.4 Listing Strategy"
      },
      {
        "t": "table",
        "head": [
          "Exchange Type",
          "Examples",
          "Status"
        ],
        "rows": [
          [
            "Tier-1 CEX",
            "Binance, Coinbase, OKX, Bybit",
            "Negotiations ongoing"
          ],
          [
            "Tier-2 CEX",
            "Gate, KuCoin, MEXC, Bitget",
            "Negotiations ongoing"
          ],
          [
            "Top DEX (Ethereum)",
            "Uniswap V3/V4, Curve, Balancer",
            "Confirmed for Phase 1"
          ],
          [
            "Top DEX (BSC)",
            "PancakeSwap",
            "Planned for Phase 2"
          ],
          [
            "Top DEX (Solana)",
            "Raydium, Jupiter",
            "Planned for Phase 2"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "10.5 Listing Timeline"
      },
      {
        "t": "table",
        "head": [
          "Event",
          "Timing"
        ],
        "rows": [
          [
            "Presale Tier 1 opens",
            "Q1 2027"
          ],
          [
            "Presale Tier 20 closes",
            "Q1–Q2 2027"
          ],
          [
            "DEX listing",
            "Q2 2027"
          ],
          [
            "CEX listings",
            "Q2–Q3 2027"
          ]
        ]
      }
    ]
  },
  {
    "slug": "vesting-and-lockups",
    "number": 11,
    "title": "Vesting and Lockups",
    "lead": "Lockup terms for every FDP allocation. Team and advisors carry a one-year cliff with multi-year linear vesting, the treasury is DAO-controlled, and the presale carries no cliff at all, on identical 12-month terms across all 20 tiers.",
    "blocks": [
      {
        "t": "h3",
        "text": "11.1 Team"
      },
      {
        "t": "p",
        "text": "Allocation: 15,000,000,000 FDP (15%). Cliff: 1 year. Vesting: 4 years linear. Full unlock: 5 years."
      },
      {
        "t": "h3",
        "text": "11.2 Advisors"
      },
      {
        "t": "p",
        "text": "Allocation: 3,000,000,000 FDP (3%). Cliff: 1 year. Vesting: 3 years linear. Full unlock: 4 years."
      },
      {
        "t": "h3",
        "text": "11.3 Treasury / DAO"
      },
      {
        "t": "p",
        "text": "Allocation: 15,000,000,000 FDP (15%). DAO-controlled — spending requires community vote with 48-hour timelock."
      },
      {
        "t": "h3",
        "text": "11.4 Airdrop"
      },
      {
        "t": "p",
        "text": "Allocation: 5,000,000,000 FDP (5%). 100% unlocked at TGE. Not transferable before listing."
      },
      {
        "t": "h3",
        "text": "11.5 Summary Table"
      },
      {
        "t": "table",
        "head": [
          "Group",
          "Allocation",
          "Cliff",
          "Vesting",
          "Full Unlock"
        ],
        "rows": [
          [
            "Team",
            "15%",
            "1 year",
            "4 years linear",
            "5 years"
          ],
          [
            "Advisors",
            "3%",
            "1 year",
            "3 years linear",
            "4 years"
          ],
          [
            "Treasury / DAO",
            "15%",
            "None",
            "DAO-controlled",
            "N/A"
          ],
          [
            "Presale (all 20 tiers)",
            "30%",
            "No cliff",
            "12 months linear",
            "12 months after each tier's TGE"
          ],
          [
            "Airdrop",
            "5%",
            "None",
            "None",
            "Immediate"
          ]
        ]
      }
    ]
  },
  {
    "slug": "staking-and-emissions",
    "number": 12,
    "title": "Staking and Emissions",
    "lead": "Total Staking Pool: 12,000,000,000 FDP (12% of supply). Distribution period: 10 years.",
    "blocks": [
      {
        "t": "p",
        "text": "Total Staking Pool: 12,000,000,000 FDP (12% of supply). Distribution period: 10 years. Emission type: declining (starts high, decreases each year)."
      },
      {
        "t": "h3",
        "text": "12.1 Fee Share to Stakers"
      },
      {
        "t": "table",
        "head": [
          "Fee Type",
          "Staker Share"
        ],
        "rows": [
          [
            "Crypto Swap Fee",
            "40%"
          ],
          [
            "RWA Trading Fee",
            "40%"
          ],
          [
            "Forex/Commodity Fee",
            "40%"
          ],
          [
            "Cross-Chain Fee",
            "50%"
          ],
          [
            "Priority Routing",
            "100%"
          ],
          [
            "Perpetual Funding",
            "40%"
          ],
          [
            "Prediction Market Fees",
            "40%"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "12.2 Validator Staking on FlowChain"
      },
      {
        "t": "p",
        "text": "In Phase 3, staking FDP also secures FlowChain: 500+ permissionless validators, block rewards + transaction fees, slashing for misbehavior."
      }
    ]
  },
  {
    "slug": "revenue-and-fees",
    "number": 13,
    "title": "Revenue and Fees",
    "lead": "10% of most fees are burned monthly via market buyback + burn, reducing total supply over time.",
    "blocks": [
      {
        "t": "h3",
        "text": "13.1 Fee Schedule"
      },
      {
        "t": "table",
        "head": [
          "Fee Type",
          "Rate",
          "Notes"
        ],
        "rows": [
          [
            "Crypto Swap Fee",
            "0.03%",
            "On every crypto swap"
          ],
          [
            "RWA Trading Fee",
            "0.05%",
            "On tokenized stocks, ETFs"
          ],
          [
            "Forex/Commodity Fee",
            "0.02% + spread",
            "On forex and commodity trades"
          ],
          [
            "Cross-Chain Fee",
            "0.05% + bridge gas",
            "On cross-chain swaps"
          ],
          [
            "Priority Routing Fee",
            "0.01% premium",
            "Optional, for faster execution"
          ],
          [
            "Perpetual Funding",
            "Variable",
            "Paid between long and short traders"
          ],
          [
            "Prediction Market Fees",
            "2% of winnings",
            "On prediction market payouts"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "13.2 How Fees Are Split"
      },
      {
        "t": "table",
        "head": [
          "Fee Type",
          "Stakers",
          "Treasury",
          "Dev",
          "Burn",
          "Providers"
        ],
        "rows": [
          [
            "Crypto Swap",
            "40%",
            "30%",
            "20%",
            "10%",
            "—"
          ],
          [
            "RWA Trading",
            "40%",
            "30%",
            "—",
            "10%",
            "20%"
          ],
          [
            "Forex/Commodity",
            "40%",
            "30%",
            "—",
            "10%",
            "20%"
          ],
          [
            "Cross-Chain",
            "50%",
            "30%",
            "—",
            "—",
            "20%"
          ],
          [
            "Priority Routing",
            "100%",
            "—",
            "—",
            "—",
            "—"
          ],
          [
            "Perpetuals",
            "40%",
            "—",
            "—",
            "—",
            "60%"
          ],
          [
            "Prediction Mkts",
            "40%",
            "20%",
            "—",
            "10%",
            "30%"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "13.3 Burn Mechanism"
      },
      {
        "t": "p",
        "text": "10% of most fees are burned monthly via market buyback + burn, reducing total supply over time."
      }
    ]
  },
  {
    "slug": "governance",
    "number": 14,
    "title": "Governance",
    "lead": "How FDP holders govern the protocol: quadratic voting weighted by how long tokens have been staked, and the Security Council that can act between votes.",
    "blocks": [
      {
        "t": "table",
        "head": [
          "Parameter",
          "Value"
        ],
        "rows": [
          [
            "Proposal Threshold",
            "100,000 FDP staked"
          ],
          [
            "Voting Period",
            "7 days minimum"
          ],
          [
            "Quorum",
            "30% of staked supply"
          ],
          [
            "Approval Threshold",
            "67% critical, 50% standard"
          ],
          [
            "Timelock",
            "48 hours before execution"
          ],
          [
            "Delegation",
            "Allowed without transferring tokens"
          ],
          [
            "Quadratic Voting",
            "Yes"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "14.1 Quadratic Voting Formula"
      },
      {
        "t": "p",
        "text": "`VP(a) = √(staked_FDP(a)) × min(1 + 0.1 × months_staked, 2.0)`"
      },
      {
        "t": "h3",
        "text": "14.2 Security Council"
      },
      {
        "t": "p",
        "text": "9 community-elected members handle emergencies (oracle failures, bridge exploits). Emergency action requires 6-of-9 multisig with community ratification within 72 hours. 12-month terms, re-electable."
      }
    ]
  },
  {
    "slug": "security-and-legal",
    "number": 15,
    "title": "Security and Legal",
    "lead": "Audit status, the security measures protecting user funds, and the jurisdictions excluded from the FDP presale.",
    "blocks": [
      {
        "t": "h3",
        "text": "15.1 Audits"
      },
      {
        "t": "table",
        "head": [
          "Firm",
          "Scope",
          "Status"
        ],
        "rows": [
          [
            "Trail of Bits",
            "Core routing, FDP token, staking, RWA integration",
            "Before presale"
          ],
          [
            "OpenZeppelin",
            "Cross-chain messaging, bridge, admin controls",
            "Before presale"
          ],
          [
            "Zellic",
            "Frontend, oracle, governance, synthetic assets",
            "Before presale"
          ],
          [
            "Certora",
            "Formal verification of routing, staking, vesting",
            "Before presale"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "15.2 Key Security Measures"
      },
      {
        "t": "ul",
        "items": [
          "$5,000,000 bug bounty via Immunefi",
          "4-of-7 multisig treasury with quarterly on-chain reports",
          "ZK-KYC for RWA trading (privacy-preserving)",
          "Crypto trading: no KYC required"
        ]
      },
      {
        "t": "h3",
        "text": "15.3 Restricted Jurisdictions"
      },
      {
        "t": "p",
        "text": "United States, China, North Korea, Iran, Syria, Cuba. Additional restrictions may apply."
      }
    ]
  },
  {
    "slug": "advanced-security-architecture",
    "number": 16,
    "title": "Advanced Security Architecture",
    "lead": "FlowDex implements a three-layer security architecture.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex implements a three-layer security architecture."
      },
      {
        "t": "p",
        "text": "**Layer 1: Smart Contract Audits** Trail of Bits, OpenZeppelin, Zellic, Certora + $5M bug bounty via Immunefi."
      },
      {
        "t": "p",
        "text": "**Layer 2: Zero-Knowledge Privacy** FlowDex uses Groth16 zkSNARK proofs for private order routing, eliminating MEV extraction. Proofs are 288 bytes with 3ms verification time. ZK-KYC enables RWA compliance without exposing personal data."
      },
      {
        "t": "p",
        "text": "**Layer 3: Quantum-Resistant Cryptography** FlowDex implements CRYSTALS-Dilithium (ML-DSA) for signatures and CRYSTALS-Kyber (ML-KEM) for key encapsulation, following NIST PQC standards finalized in August 2024."
      },
      {
        "t": "table",
        "head": [
          "Phase",
          "Timeline",
          "Implementation"
        ],
        "rows": [
          [
            "Hybrid Sigs",
            "Phase 2 (Q2–Q3 2027)",
            "Dual ECDSA + Dilithium on treasury"
          ],
          [
            "FlowChain PQC",
            "Phase 3 (2028-29)",
            "Native ML-DSA validator signatures"
          ],
          [
            "Quantum-Enhanced",
            "Phase 4 (2029+)",
            "QCaaS integration for routing optimization"
          ]
        ]
      }
    ]
  },
  {
    "slug": "prediction-markets",
    "number": 17,
    "title": "Prediction Markets",
    "lead": "FlowDex extends into prediction markets across every supported asset class. Polymarket processed $1B+ during the 2024 US election.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex extends into prediction markets across every supported asset class. Polymarket processed $1B+ during the 2024 US election. FlowDex's multi-asset oracle feeds enable prediction categories no other platform offers."
      },
      {
        "t": "h3",
        "text": "17.1 Categories"
      },
      {
        "t": "table",
        "head": [
          "Category",
          "Example",
          "Settlement"
        ],
        "rows": [
          [
            "Crypto",
            "BTC > $150K by Q4 2026?",
            "Automatic (oracle)"
          ],
          [
            "Stocks",
            "Tesla beats Q3 earnings?",
            "Automatic (oracle)"
          ],
          [
            "Forex",
            "EUR/USD crosses 1.15?",
            "Automatic (oracle)"
          ],
          [
            "Commodity",
            "Gold > $3,500 in 2027?",
            "Automatic (oracle)"
          ],
          [
            "Macro",
            "Fed cuts rates Sep 2026?",
            "DAO resolution"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "17.2 Rollout"
      },
      {
        "t": "table",
        "head": [
          "Phase",
          "When",
          "Scope"
        ],
        "rows": [
          [
            "Beta",
            "Q2 2027",
            "Crypto only, binary"
          ],
          [
            "V1",
            "Q3 2027",
            "All assets, open creation"
          ],
          [
            "V2",
            "Q1 2028",
            "Conditional, quantum-enhanced pricing"
          ]
        ]
      }
    ]
  },
  {
    "slug": "ai-intelligence-terminal",
    "number": 18,
    "title": "AI Intelligence Terminal",
    "lead": "The AI Intelligence Terminal is an AI-powered terminal that reads live on-chain data, analyzes market conditions across 500+ assets, monitors your portfolio, and provides actionable intelligence through a conversational interface — the Bloomberg Terminal of crypto.",
    "blocks": [
      {
        "t": "p",
        "text": "The AI Intelligence Terminal is an AI-powered terminal that reads live on-chain data, analyzes market conditions across 500+ assets, monitors your portfolio, and provides actionable intelligence through a conversational interface — the Bloomberg Terminal of crypto."
      },
      {
        "t": "h3",
        "text": "18.1 Architecture"
      },
      {
        "t": "ul",
        "items": [
          "**Data Ingestion Pipeline:** Continuous real-time data from FlowDex routing engine, Alchemy nodes, Chainlink/Pyth oracles, The Graph",
          "**Context Engine:** Cleans, normalizes, and structures raw blockchain data for AI consumption",
          "**Reasoning Layer:** AI model with RAG — reasons from live data, not stale training data",
          "**Execution Bridge:** Recommendations can be executed directly from the conversation"
        ]
      },
      {
        "t": "h3",
        "text": "18.2 FDP Token Integration"
      },
      {
        "t": "table",
        "head": [
          "Tier",
          "Staking Requirement",
          "Features"
        ],
        "rows": [
          [
            "Basic",
            "Any FDP holder",
            "General market analysis, portfolio overview, basic alerts"
          ],
          [
            "Standard",
            "1,000+ FDP staked",
            "Deep analysis, whale tracking, sentiment, custom alerts"
          ],
          [
            "Premium",
            "10,000+ FDP staked",
            "Predictive signals, portfolio optimization, risk simulation"
          ],
          [
            "Institutional",
            "100,000+ FDP staked",
            "API access, custom models, dedicated context windows"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "18.3 Development Timeline"
      },
      {
        "t": "table",
        "head": [
          "Phase",
          "Timeline",
          "Features"
        ],
        "rows": [
          [
            "Phase 2",
            "Q2-Q3 2027",
            "Data pipeline, basic AI, price queries, portfolio analysis"
          ],
          [
            "Phase 3",
            "2028-2029",
            "Full RAG, whale tracking, sentiment, execution bridge"
          ],
          [
            "Phase 4",
            "2029+",
            "Fine-tuned models, autonomous trading agents, institutional API"
          ]
        ]
      }
    ]
  },
  {
    "slug": "referral-program",
    "number": 19,
    "title": "Referral Program",
    "lead": "FlowDex's referral program rewards community members who bring new participants to the presale.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex's referral program rewards community members who bring new participants to the presale. The program is designed to incentivize organic growth while giving buyers an additional bonus for joining through a referral."
      },
      {
        "t": "h3",
        "text": "19.1 How It Works"
      },
      {
        "t": "p",
        "text": "Every presale participant receives a unique referral link after their first purchase. When a new buyer uses that link, both the referrer and the new buyer receive bonuses."
      },
      {
        "t": "h3",
        "text": "19.2 Bonus Structure"
      },
      {
        "t": "table",
        "head": [
          "Recipient",
          "Bonus",
          "Breakdown"
        ],
        "rows": [
          [
            "Referrer",
            "15% of the referee's purchase value",
            "70% in Terminal Credits + 30% in FDP tokens"
          ],
          [
            "Buyer (referee)",
            "30% bonus on their purchase",
            "70% in Terminal Credits + 30% in FDP tokens"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "19.3 Terminal Credits"
      },
      {
        "t": "p",
        "text": "Terminal Credits are redeemable for access tiers within the AI Intelligence Terminal. They provide:"
      },
      {
        "t": "ul",
        "items": [
          "Discounted or free access to premium AI Intelligence Terminal features",
          "Priority access to new features as they launch",
          "Stackable with FDP staking requirements for terminal tier upgrades"
        ]
      },
      {
        "t": "h3",
        "text": "19.4 Example"
      },
      {
        "t": "p",
        "text": "A new buyer purchases $1,000 worth of FDP through a referral link:"
      },
      {
        "t": "ul",
        "items": [
          "**Referrer receives:** $150 value (15%) → $105 in Terminal Credits + $45 in FDP tokens",
          "**Buyer receives:** $300 bonus (30%) → $210 in Terminal Credits + $90 in FDP tokens"
        ]
      },
      {
        "t": "h3",
        "text": "19.5 Rules"
      },
      {
        "t": "ul",
        "items": [
          "Referral bonuses are calculated on the USD value at the time of purchase",
          "FDP token bonuses vest on the same schedule as the buyer's tier",
          "Terminal Credits are non-transferable and linked to the wallet address",
          "Self-referrals are prohibited and flagged by on-chain analytics",
          "No cap on the number of referrals per wallet"
        ]
      }
    ]
  },
  {
    "slug": "competitive-analysis",
    "number": 20,
    "title": "Competitive Analysis",
    "lead": "FlowDex occupies a unique position: the only non-custodial platform offering both crypto-native and tokenized real-world asset trading across multiple chains.",
    "blocks": [
      {
        "t": "p",
        "text": "FlowDex occupies a unique position: the only non-custodial platform offering both crypto-native and tokenized real-world asset trading across multiple chains."
      },
      {
        "t": "table",
        "head": [
          "Dimension",
          "FlowDex",
          "Bitget",
          "Injective",
          "dYdX",
          "Synthetix"
        ],
        "rows": [
          [
            "Crypto",
            "1,000+ tokens",
            "1,300+",
            "200+",
            "170+ perps",
            "Synthetic"
          ],
          [
            "Stocks/ETFs",
            "200+",
            "Partial",
            "~20",
            "No",
            "No"
          ],
          [
            "Forex",
            "50+ pairs",
            "Yes",
            "No",
            "No",
            "Limited"
          ],
          [
            "Non-Custodial",
            "Always",
            "No",
            "Yes",
            "Yes",
            "Yes"
          ],
          [
            "Cross-Chain",
            "10+ chains",
            "No",
            "Injective",
            "dYdX",
            "Optimism+Base"
          ],
          [
            "Fee Sharing",
            "40% stakers",
            "BGB disc.",
            "Limited",
            "Partial",
            "Yes"
          ],
          [
            "Governance",
            "Quadratic",
            "No",
            "Yes",
            "Yes",
            "Yes"
          ]
        ]
      }
    ]
  },
  {
    "slug": "team",
    "number": 21,
    "title": "Team",
    "lead": "The FlowDex core team operates pseudonymously, following the precedent set by Bitcoin (Satoshi Nakamoto) and many successful DeFi protocols.",
    "blocks": [
      {
        "t": "p",
        "text": "The FlowDex core team operates pseudonymously, following the precedent set by Bitcoin (Satoshi Nakamoto) and many successful DeFi protocols. All core members are KYC-verified through an independent third-party."
      },
      {
        "t": "table",
        "head": [
          "Alias",
          "Role",
          "Background"
        ],
        "rows": [
          [
            "Atlas",
            "Founder & CEO",
            "Former quantitative trader at a top-5 global investment bank. 8+ years DeFi."
          ],
          [
            "Helix",
            "CTO",
            "PhD in Distributed Systems from ETH Zurich. Former core engineer at a leading L1."
          ],
          [
            "Vector",
            "Head of Risk",
            "Former risk manager at a Tier-1 CEX. Previously Goldman Sachs."
          ],
          [
            "Cipher",
            "Lead Smart Contracts",
            "Core contributor to 2 audited DeFi protocols with $1B+ TVL."
          ],
          [
            "Nova",
            "Head of Research",
            "PhD in Cryptography with 15+ peer-reviewed publications on ZKPs."
          ],
          [
            "Orbit",
            "Head of Growth",
            "Led community growth at two top-50 crypto projects from seed to $500M+ mcap."
          ]
        ]
      }
    ]
  },
  {
    "slug": "roadmap",
    "number": 22,
    "title": "Roadmap",
    "lead": "FlowDex development phases, from the presale through the Universal Exchange, the Intelligence Terminal, and FlowChain, with the milestones defining each.",
    "blocks": [
      {
        "t": "caption",
        "text": "Figure 6: FlowDex Protocol development phases."
      },
      {
        "t": "table",
        "head": [
          "Phase",
          "Timeline",
          "Key Milestones"
        ],
        "rows": [
          [
            "Phase 0: Foundation (Active)",
            "Q4 2026",
            "Whitepaper v9.0, website, community building, audits, partnerships"
          ],
          [
            "Phase 1: Presale & Launch",
            "Q1 2027",
            "20-tier presale, FDP ERC-20, per-tier TGEs, Ethereum aggregator, staking, DEX/CEX listings"
          ],
          [
            "Phase 2: Multi-Chain",
            "Q2–Q3 2027",
            "BSC/Solana/Arbitrum/Polygon, 500+ assets, options & futures, mobile app, institutional API"
          ],
          [
            "Phase 3: FlowChain",
            "2028-2029",
            "FlowChain testnet, validator onboarding, 50,000+ TPS, cross-asset margin"
          ],
          [
            "Phase 4: Maturity",
            "2029+",
            "500+ validators, full DAO handoff, prediction markets, institutional prime brokerage"
          ]
        ]
      }
    ]
  },
  {
    "slug": "risk-factors",
    "number": 23,
    "title": "Risk Factors",
    "lead": "Smart contract vulnerabilities, routing algorithm failures, or bridge exploits could result in loss of funds.",
    "blocks": [
      {
        "t": "h3",
        "text": "23.1 Technology Risk"
      },
      {
        "t": "p",
        "text": "Smart contract vulnerabilities, routing algorithm failures, or bridge exploits could result in loss of funds. Cross-chain and multi-asset operations introduce complexity. RWA integration adds dependency on external providers."
      },
      {
        "t": "h3",
        "text": "23.2 Regulatory Risk"
      },
      {
        "t": "p",
        "text": "Tokenized securities may be classified differently across jurisdictions. MiCA (EU) and US frameworks are evolving. There is no guarantee FDP will not be classified as a security."
      },
      {
        "t": "h3",
        "text": "23.3 Market Risk"
      },
      {
        "t": "p",
        "text": "FDP may fluctuate significantly and could lose all value. The $0.50 launch price is a target, not a guarantee."
      },
      {
        "t": "h3",
        "text": "23.4 RWA Counterparty Risk"
      },
      {
        "t": "p",
        "text": "Tokenized assets depend on the solvency of underlying issuers (Ondo, Backed, Dinari). If an RWA provider fails, users holding those tokens may lose value."
      },
      {
        "t": "h3",
        "text": "23.5 Competition Risk"
      },
      {
        "t": "p",
        "text": "Centralized exchanges are rapidly adding TradFi products. Decentralized competitors may expand. Traditional brokers may adopt tokenization."
      },
      {
        "t": "h3",
        "text": "23.6 Team & Execution Risk"
      },
      {
        "t": "p",
        "text": "The team operates pseudonymously. The scope is ambitious. There is no guarantee all milestones will be achieved on schedule."
      },
      {
        "t": "h3",
        "text": "23.7 Presale Risk"
      },
      {
        "t": "p",
        "text": "The $0.50 launch price is a target, not a guarantee. Do not invest more than you can afford to lose."
      }
    ]
  },
  {
    "slug": "legal-notice-and-disclaimer",
    "number": 24,
    "title": "Legal Notice & Disclaimer",
    "lead": "Legal disclaimer covering the status of the FDP token, the limits of the forward-looking statements in this whitepaper, and the risks of participating.",
    "blocks": [
      {
        "t": "p",
        "text": "**IMPORTANT: PLEASE READ THIS SECTION CAREFULLY.**"
      },
      {
        "t": "p",
        "text": "This whitepaper is for informational purposes only and does not constitute an offer or solicitation to sell securities, investment products, or any regulated financial instrument in any jurisdiction."
      },
      {
        "t": "p",
        "text": "FDP tokens are utility tokens intended for use within the FlowDex Protocol ecosystem and are not designed or intended to be securities."
      },
      {
        "t": "p",
        "text": "Nothing in this whitepaper constitutes legal, financial, tax, or investment advice. Prospective participants should consult qualified advisors before any decision to purchase FDP tokens."
      },
      {
        "t": "p",
        "text": "No representation or warranty is made regarding accuracy, completeness, or reliability of information herein. Forward-looking statements are estimates only."
      },
      {
        "t": "p",
        "text": "FDP tokens have not been registered under securities laws of any jurisdiction. Participation may be restricted in certain jurisdictions including the United States, China, North Korea, Iran, Syria, and Cuba."
      },
      {
        "t": "p",
        "text": "Tokenized assets traded on FlowDex are issued by third-party providers and carry their own risks including counterparty risk, regulatory risk, and liquidity risk. FlowDex is the routing layer, not the asset issuer."
      },
      {
        "t": "p",
        "text": "The launch price of $0.50 is a target, not a guarantee. Investing involves risk of total loss."
      },
      {
        "t": "p",
        "text": "**FlowDex Protocol — 2026**"
      },
      {
        "t": "p",
        "text": "**Contact:** support@flowdexprotocol.com"
      },
      {
        "t": "p",
        "text": "**Website:** flowdexprotocol.com"
      }
    ]
  }
];

export function getSection(slug: string): WhitepaperSection | undefined {
  return WHITEPAPER_SECTIONS.find((s) => s.slug === slug);
}

export function adjacentSections(slug: string) {
  const i = WHITEPAPER_SECTIONS.findIndex((s) => s.slug === slug);
  return {
    prev: i > 0 ? WHITEPAPER_SECTIONS[i - 1] : undefined,
    next: i >= 0 && i < WHITEPAPER_SECTIONS.length - 1 ? WHITEPAPER_SECTIONS[i + 1] : undefined,
  };
}
