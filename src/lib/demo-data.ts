import { generateAnalysisFromRule } from "@/lib/analysis";
import type {
  AIAnalysis,
  DemoStock,
  FinancialRule,
  LanguagePreference,
  NewsItem,
  PortfolioItem,
  PortfolioRow,
  WatchlistItem,
} from "@/lib/types";

const createdAt = "2026-05-26T00:00:00.000Z";

export const demoStocks: DemoStock[] = [
  {
    ticker: "CSL",
    market: "ASX",
    company_name: "CSL Limited",
    currency: "AUD",
    current_price: 286.42,
    today_change_percent: -0.8,
    sector: "Healthcare",
  },
  {
    ticker: "BHP",
    market: "ASX",
    company_name: "BHP Group",
    currency: "AUD",
    current_price: 42.18,
    today_change_percent: -1.4,
    sector: "Materials",
  },
  {
    ticker: "CBA",
    market: "ASX",
    company_name: "Commonwealth Bank of Australia",
    currency: "AUD",
    current_price: 124.75,
    today_change_percent: 0.3,
    sector: "Financials",
  },
  {
    ticker: "AAPL",
    market: "US",
    company_name: "Apple Inc.",
    currency: "USD",
    current_price: 203.66,
    today_change_percent: 1.1,
    sector: "Technology",
  },
  {
    ticker: "NVDA",
    market: "US",
    company_name: "NVIDIA Corporation",
    currency: "USD",
    current_price: 141.21,
    today_change_percent: 2.8,
    sector: "Semiconductors",
  },
  {
    ticker: "TENCENT",
    market: "HK",
    company_name: "Tencent Holdings",
    currency: "HKD",
    current_price: 388.4,
    today_change_percent: -0.6,
    sector: "Communication Services",
  },
  {
    ticker: "DBS",
    market: "SG",
    company_name: "DBS Group",
    currency: "SGD",
    current_price: 38.92,
    today_change_percent: 0.5,
    sector: "Financials",
  },
  {
    ticker: "KWEICHOWMOUTAI",
    market: "CN",
    company_name: "Kweichow Moutai",
    currency: "CNY",
    current_price: 1528.2,
    today_change_percent: -1.0,
    sector: "Consumer Staples",
  },
];

export const demoPortfolioItems: PortfolioItem[] = [
  {
    id: "portfolio-csl",
    user_id: "demo-user",
    ticker: "CSL",
    market: "ASX",
    company_name: "CSL Limited",
    quantity: 12,
    average_buy_price: 274.5,
    currency: "AUD",
    investment_thesis:
      "CSL can compound through plasma collection scale, vaccine demand, and disciplined healthcare execution.",
    created_at: createdAt,
  },
  {
    id: "portfolio-bhp",
    user_id: "demo-user",
    ticker: "BHP",
    market: "ASX",
    company_name: "BHP Group",
    quantity: 80,
    average_buy_price: 39.4,
    currency: "AUD",
    investment_thesis:
      "BHP provides diversified commodity exposure and shareholder returns, but the thesis depends on iron ore demand resilience.",
    created_at: createdAt,
  },
  {
    id: "portfolio-cba",
    user_id: "demo-user",
    ticker: "CBA",
    market: "ASX",
    company_name: "Commonwealth Bank of Australia",
    quantity: 20,
    average_buy_price: 108.2,
    currency: "AUD",
    investment_thesis:
      "CBA has a strong deposit franchise and disciplined credit quality, but valuation is sensitive to rates and housing risk.",
    created_at: createdAt,
  },
];

export const demoWatchlistItems: WatchlistItem[] = [
  {
    id: "watch-aapl",
    user_id: "demo-user",
    ticker: "AAPL",
    market: "US",
    company_name: "Apple Inc.",
    created_at: createdAt,
  },
  {
    id: "watch-nvda",
    user_id: "demo-user",
    ticker: "NVDA",
    market: "US",
    company_name: "NVIDIA Corporation",
    created_at: createdAt,
  },
  {
    id: "watch-tencent",
    user_id: "demo-user",
    ticker: "TENCENT",
    market: "HK",
    company_name: "Tencent Holdings",
    created_at: createdAt,
  },
  {
    id: "watch-dbs",
    user_id: "demo-user",
    ticker: "DBS",
    market: "SG",
    company_name: "DBS Group",
    created_at: createdAt,
  },
  {
    id: "watch-moutai",
    user_id: "demo-user",
    ticker: "KWEICHOWMOUTAI",
    market: "CN",
    company_name: "Kweichow Moutai",
    created_at: createdAt,
  },
];

export const demoNewsItems: NewsItem[] = [
  {
    id: "news-csl-restructuring",
    ticker: "CSL",
    market: "ASX",
    company_name: "CSL Limited",
    title: "CSL announces restructuring plan with one-off costs",
    source: "Demo Market News",
    url: "#",
    published_at: "2026-05-26T09:00:00.000Z",
    raw_summary:
      "CSL announced a restructuring plan expected to create near-term costs while targeting operational efficiency.",
    created_at: createdAt,
  },
  {
    id: "news-bhp-iron-ore",
    ticker: "BHP",
    market: "ASX",
    company_name: "BHP Group",
    title: "BHP affected by falling iron ore prices due to weaker China demand",
    source: "Demo Commodities Wire",
    url: "#",
    published_at: "2026-05-26T08:30:00.000Z",
    raw_summary:
      "Iron ore prices fell after weaker China demand indicators, pressuring resource producers.",
    created_at: createdAt,
  },
  {
    id: "news-cba-rates",
    ticker: "CBA",
    market: "ASX",
    company_name: "Commonwealth Bank of Australia",
    title: "CBA affected by rising interest rate expectations after inflation data",
    source: "Demo Macro Desk",
    url: "#",
    published_at: "2026-05-26T07:45:00.000Z",
    raw_summary:
      "Inflation data lifted interest rate expectations, creating mixed implications for bank margins and credit risk.",
    created_at: createdAt,
  },
  {
    id: "news-aapl-earnings",
    ticker: "AAPL",
    market: "US",
    company_name: "Apple Inc.",
    title: "Apple reports stronger-than-expected quarterly earnings",
    source: "Demo US Earnings",
    url: "#",
    published_at: "2026-05-25T22:00:00.000Z",
    raw_summary:
      "Apple reported quarterly earnings ahead of expectations, helped by services and operating discipline.",
    created_at: createdAt,
  },
  {
    id: "news-nvda-growth",
    ticker: "NVDA",
    market: "US",
    company_name: "NVIDIA Corporation",
    title: "Nvidia revenue growth accelerates due to AI chip demand",
    source: "Demo Tech Brief",
    url: "#",
    published_at: "2026-05-25T21:15:00.000Z",
    raw_summary:
      "Nvidia revenue growth accelerated as AI chip demand remained strong across data center customers.",
    created_at: createdAt,
  },
  {
    id: "news-tencent-regulation",
    ticker: "TENCENT",
    market: "HK",
    company_name: "Tencent Holdings",
    title: "Tencent faces regulatory uncertainty around online gaming rules",
    source: "Demo Asia Policy",
    url: "#",
    published_at: "2026-05-25T10:30:00.000Z",
    raw_summary:
      "New gaming rule discussion raised uncertainty around monetisation, approvals, and compliance costs.",
    created_at: createdAt,
  },
  {
    id: "news-dbs-rates",
    ticker: "DBS",
    market: "SG",
    company_name: "DBS Group",
    title: "DBS benefits from higher interest rate environment but faces credit cycle risk",
    source: "Demo Singapore Markets",
    url: "#",
    published_at: "2026-05-25T09:30:00.000Z",
    raw_summary:
      "Higher rates may support net interest income, while credit losses could rise if borrowers weaken.",
    created_at: createdAt,
  },
  {
    id: "news-moutai-slowdown",
    ticker: "KWEICHOWMOUTAI",
    market: "CN",
    company_name: "Kweichow Moutai",
    title: "Kweichow Moutai reports slower revenue growth",
    source: "Demo China Consumer",
    url: "#",
    published_at: "2026-05-25T08:00:00.000Z",
    raw_summary:
      "Kweichow Moutai reported slower revenue growth, raising questions about premium demand momentum.",
    created_at: createdAt,
  },
];

interface NewsRuleMap {
  newsId: string;
  ruleId: string;
  eventTypeOverride?: string;
}

const newsRuleMap: NewsRuleMap[] = [
  { newsId: "news-csl-restructuring", ruleId: "RULE 012" },
  { newsId: "news-bhp-iron-ore", ruleId: "RULE 042" },
  { newsId: "news-cba-rates", ruleId: "RULE 036" },
  { newsId: "news-aapl-earnings", ruleId: "RULE 001" },
  { newsId: "news-nvda-growth", ruleId: "RULE 003" },
  { newsId: "news-tencent-regulation", ruleId: "RULE 045", eventTypeOverride: "Regulatory risk" },
  { newsId: "news-dbs-rates", ruleId: "RULE 036", eventTypeOverride: "Interest rate rise for banks" },
  { newsId: "news-moutai-slowdown", ruleId: "RULE 004" },
];

export const financialRules: FinancialRule[] = [
  {
    id: "rule-001",
    rule_id: "RULE 001",
    category: "Earnings and Revenue",
    event_type: "Earnings beat",
    typical_short_term_impact: "Usually positive.",
    typical_long_term_impact:
      "Positive if the beat is driven by sustainable revenue growth, margin improvement, or operating efficiency. Less positive if it comes from one-off gains.",
    affected_valuation_drivers: "Revenue growth, operating margin, EPS, free cash flow, valuation multiple.",
    dcf_valuation_implication:
      "DCF value may increase if future revenue, margin, or FCF forecasts are raised. If the beat is one-off, DCF impact should be limited.",
    professional_logic:
      "An earnings beat means the company performed better than market expectations. The quality of the beat matters more than the headline number.",
    key_risks: "One-off gains, aggressive accounting, costs delayed to future periods, market already priced it in.",
    portfolio_relevance: "High if the user owns the stock and the beat supports the user's investment thesis.",
    beginner_friendly_summary:
      "简单说，公司赚得比大家预期多，通常是好消息。但要看它是真的生意变好了，还是只是一次性的特殊收益。",
    created_at: createdAt,
  },
  {
    id: "rule-002",
    rule_id: "RULE 002",
    category: "Earnings and Revenue",
    event_type: "Earnings miss",
    typical_short_term_impact: "Usually negative.",
    typical_long_term_impact:
      "Negative if caused by weaker demand, margin pressure, or structural problems. Less negative if caused by temporary factors.",
    affected_valuation_drivers: "Revenue growth, operating margin, EPS, free cash flow, valuation multiple.",
    dcf_valuation_implication: "Future revenue, margin, or FCF forecasts may be lowered, reducing valuation.",
    professional_logic:
      "An earnings miss weakens investor confidence. The key issue is whether the miss is temporary or structural.",
    key_risks: "Repeated misses, guidance downgrade, weak management credibility.",
    portfolio_relevance: "High if the user's thesis depends on earnings recovery.",
    beginner_friendly_summary:
      "简单说，公司表现没大家想得好，短期股价容易受压。关键是看这是一次性问题，还是公司基本面真的变差了。",
    created_at: createdAt,
  },
  {
    id: "rule-003",
    rule_id: "RULE 003",
    category: "Earnings and Revenue",
    event_type: "Revenue growth acceleration",
    typical_short_term_impact: "Usually positive.",
    typical_long_term_impact: "Positive if growth is sustainable and profitable.",
    affected_valuation_drivers: "Revenue growth, market share, operating leverage, free cash flow, terminal growth.",
    dcf_valuation_implication:
      "Higher revenue growth forecasts increase future cash flow and may increase terminal value.",
    professional_logic:
      "Faster revenue growth may indicate stronger demand, pricing power, market share gains, or successful new products.",
    key_risks: "Low-margin growth, promotion-driven growth, one-off orders, channel stuffing.",
    portfolio_relevance: "Very high for growth stocks.",
    beginner_friendly_summary:
      "简单说，公司卖得更多、增长更快，通常是好事。但也要看它是不是为了增长牺牲利润。",
    created_at: createdAt,
  },
  {
    id: "rule-004",
    rule_id: "RULE 004",
    category: "Earnings and Revenue",
    event_type: "Revenue slowdown",
    typical_short_term_impact: "Usually negative.",
    typical_long_term_impact:
      "Negative if it reflects weaker demand, stronger competition, or market maturity.",
    affected_valuation_drivers: "Revenue growth, market share, operating margin, terminal growth, valuation multiple.",
    dcf_valuation_implication:
      "Lower revenue growth forecasts reduce future cash flow and may lower terminal growth assumptions.",
    professional_logic:
      "Revenue slowdown makes investors reassess the company's growth story, especially for high-valuation growth stocks.",
    key_risks: "Competition, demand saturation, weaker pricing power.",
    portfolio_relevance: "High if user bought the stock for growth.",
    beginner_friendly_summary:
      "简单说，公司增长变慢了，市场会担心它以后赚不到之前预期那么多钱。",
    created_at: createdAt,
  },
  {
    id: "rule-005",
    rule_id: "RULE 005",
    category: "Earnings and Revenue",
    event_type: "Guidance upgrade",
    typical_short_term_impact: "Usually positive.",
    typical_long_term_impact: "Positive if the upgrade reflects sustainable business improvement.",
    affected_valuation_drivers: "Revenue forecast, margin forecast, EPS, free cash flow, valuation multiple.",
    dcf_valuation_implication: "Future forecasts may be raised, increasing DCF value.",
    professional_logic: "Management guidance upgrade suggests higher confidence in future performance.",
    key_risks: "Over-optimistic guidance, macro reversal, one-off drivers.",
    portfolio_relevance: "High if the user's thesis depends on management execution.",
    beginner_friendly_summary:
      "简单说，公司自己说未来可能比原来预期更好，通常是好消息。但要看它有没有能力做到。",
    created_at: createdAt,
  },
  {
    id: "rule-006",
    rule_id: "RULE 006",
    category: "Earnings and Revenue",
    event_type: "Guidance downgrade",
    typical_short_term_impact: "Usually negative.",
    typical_long_term_impact: "Negative if downgrade reflects structural weakness.",
    affected_valuation_drivers: "Revenue forecast, margin forecast, EPS, FCF, valuation multiple.",
    dcf_valuation_implication: "Future cash flow forecasts may be lowered, reducing valuation.",
    professional_logic:
      "A guidance downgrade is often more serious than a single earnings miss because it affects future expectations.",
    key_risks: "Repeated downgrades, management credibility loss, investor confidence decline.",
    portfolio_relevance: "High if user's thesis depends on recovery or growth.",
    beginner_friendly_summary:
      "简单说，公司自己承认未来可能没之前想得好，所以市场通常会比较担心。",
    created_at: createdAt,
  },
  {
    id: "rule-007",
    rule_id: "RULE 007",
    category: "Margin and Costs",
    event_type: "Gross margin improvement",
    typical_short_term_impact: "Positive.",
    typical_long_term_impact: "Positive if sustainable.",
    affected_valuation_drivers: "Gross margin, operating margin, FCF, ROIC.",
    dcf_valuation_implication: "Higher margins increase operating profit and future FCF.",
    professional_logic:
      "Gross margin improvement may reflect pricing power, better product mix, lower input costs, or scale efficiency.",
    key_risks: "Temporary cost benefit, accounting classification changes, price hikes reducing volume.",
    portfolio_relevance: "High if margin recovery is part of the investment thesis.",
    beginner_friendly_summary:
      "简单说，公司每卖 1 块钱能留下更多钱了，这是好信号。",
    created_at: createdAt,
  },
  {
    id: "rule-008",
    rule_id: "RULE 008",
    category: "Margin and Costs",
    event_type: "Gross margin pressure",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact: "Negative if cost pressure or price competition persists.",
    affected_valuation_drivers: "Gross margin, operating margin, FCF, EPS.",
    dcf_valuation_implication: "Lower margins reduce future cash flow and valuation.",
    professional_logic:
      "Margin pressure may come from higher input costs, discounts, competition, or supply chain issues.",
    key_risks: "Inability to pass costs to customers, price war, inventory write-down.",
    portfolio_relevance: "High if company has weak pricing power.",
    beginner_friendly_summary:
      "简单说，公司收入可能还在，但成本变高或卖价变低，导致赚钱没以前容易。",
    created_at: createdAt,
  },
  {
    id: "rule-009",
    rule_id: "RULE 009",
    category: "Margin and Costs",
    event_type: "Operating margin improvement",
    typical_short_term_impact: "Positive.",
    typical_long_term_impact: "Positive if driven by efficiency and scale.",
    affected_valuation_drivers: "Operating margin, EBIT, FCF, ROIC.",
    dcf_valuation_implication: "Higher EBIT margin increases after-tax operating profit and FCF.",
    professional_logic:
      "Operating margin improvement suggests better cost control, scale benefits, or stronger pricing power.",
    key_risks: "Cutting important R&D, marketing, or staff to boost short-term margin.",
    portfolio_relevance: "High for companies undergoing restructuring.",
    beginner_friendly_summary:
      "简单说，公司不只是卖得多，而是运营得更有效率，赚得更扎实。",
    created_at: createdAt,
  },
  {
    id: "rule-010",
    rule_id: "RULE 010",
    category: "Margin and Costs",
    event_type: "Operating margin pressure",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact: "Negative if persistent.",
    affected_valuation_drivers: "EBIT margin, FCF, valuation multiple, ROIC.",
    dcf_valuation_implication: "Lower EBIT margin reduces future FCF forecasts.",
    professional_logic:
      "Operating margin pressure indicates cost structure deterioration, weaker pricing power, or operating deleverage.",
    key_risks: "Fixed cost pressure, price war, cost inflation.",
    portfolio_relevance: "High if user thesis depends on profit recovery.",
    beginner_friendly_summary:
      "简单说，公司赚钱效率变差了。收入可能还行，但扣掉成本后剩下的钱少了。",
    created_at: createdAt,
  },
  {
    id: "rule-011",
    rule_id: "RULE 011",
    category: "Margin and Costs",
    event_type: "Cost cutting",
    typical_short_term_impact: "Positive or mixed.",
    typical_long_term_impact: "Positive if it improves efficiency without hurting growth.",
    affected_valuation_drivers: "Operating expenses, operating margin, FCF, growth capacity.",
    dcf_valuation_implication: "Cost cutting can increase FCF, but excessive cuts may reduce long-term growth.",
    professional_logic:
      "The quality of cost cutting depends on whether management is removing waste or cutting core capabilities.",
    key_risks: "Staff loss, lower product quality, weaker innovation.",
    portfolio_relevance: "High if cost discipline is central to the thesis.",
    beginner_friendly_summary:
      "简单说，公司省钱可以提高利润，但如果省过头，影响未来发展，就不一定是好事。",
    created_at: createdAt,
  },
  {
    id: "rule-012",
    rule_id: "RULE 012",
    category: "Margin and Costs",
    event_type: "Restructuring",
    typical_short_term_impact: "Mixed or negative.",
    typical_long_term_impact: "Positive if execution succeeds.",
    affected_valuation_drivers: "One-off costs, operating margin, FCF, execution risk.",
    dcf_valuation_implication:
      "Short-term FCF may fall due to restructuring costs; long-term value may improve if margins rise.",
    professional_logic:
      "Restructuring is short-term pain for possible long-term gain. The key is whether cost savings are real and sustainable.",
    key_risks: "Execution failure, cost overrun, staff disruption.",
    portfolio_relevance: "High if user owns a company in turnaround.",
    beginner_friendly_summary:
      "简单说，公司现在可能要花钱调整业务，所以短期不好看。但如果调整成功，以后可能更省钱、利润更高。",
    created_at: createdAt,
  },
  {
    id: "rule-013",
    rule_id: "RULE 013",
    category: "Cash Flow and Working Capital",
    event_type: "Operating cash flow stronger than earnings",
    typical_short_term_impact: "Positive.",
    typical_long_term_impact: "Positive if sustainable.",
    affected_valuation_drivers: "Operating cash flow, FCF, earnings quality, working capital.",
    dcf_valuation_implication: "Strong cash conversion supports DCF quality.",
    professional_logic:
      "Cash flow stronger than earnings suggests higher earnings quality and strong cash collection.",
    key_risks: "One-off working capital release, delaying supplier payments.",
    portfolio_relevance: "High for companies with earnings quality concerns.",
    beginner_friendly_summary:
      "简单说，公司不只是账面赚钱，而是真的收到现金了，这是比较健康的信号。",
    created_at: createdAt,
  },
  {
    id: "rule-014",
    rule_id: "RULE 014",
    category: "Cash Flow and Working Capital",
    event_type: "Operating cash flow weaker than earnings",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact: "Negative if persistent.",
    affected_valuation_drivers: "FCF, working capital, receivables, inventory, earnings quality.",
    dcf_valuation_implication: "Weak cash conversion may require lower FCF forecasts.",
    professional_logic:
      "Profit without cash flow may indicate weak earnings quality, rising receivables, inventory build-up, or aggressive revenue recognition.",
    key_risks: "Bad debts, inventory write-down, revenue quality issues.",
    portfolio_relevance: "High if user relies on reported profit.",
    beginner_friendly_summary:
      "简单说，公司账面上赚钱，但真正收到的钱没跟上，这种情况要小心。",
    created_at: createdAt,
  },
  {
    id: "rule-015",
    rule_id: "RULE 015",
    category: "Cash Flow and Working Capital",
    event_type: "Receivables increase faster than revenue",
    typical_short_term_impact: "Negative or cautionary.",
    typical_long_term_impact: "Negative if persistent.",
    affected_valuation_drivers: "Working capital, cash conversion, FCF, credit risk.",
    dcf_valuation_implication: "More cash tied in receivables lowers FCF.",
    professional_logic:
      "Receivables growing faster than revenue may indicate slower customer payment, looser credit policy, or lower revenue quality.",
    key_risks: "Bad debts, aggressive revenue recognition, customer weakness.",
    portfolio_relevance: "High if company sells on credit.",
    beginner_friendly_summary:
      "简单说，公司卖出去了东西，但钱还没收回来。收不回来就会变成问题。",
    created_at: createdAt,
  },
  {
    id: "rule-016",
    rule_id: "RULE 016",
    category: "Cash Flow and Working Capital",
    event_type: "Inventory build-up",
    typical_short_term_impact: "Mixed or negative.",
    typical_long_term_impact: "Negative if caused by weak demand.",
    affected_valuation_drivers: "Working capital, gross margin, FCF, inventory write-down risk.",
    dcf_valuation_implication: "Inventory uses cash and may lead to write-downs or discounting.",
    professional_logic:
      "Inventory build-up may be preparation for growth or a sign products are not selling. Compare with revenue growth and inventory turnover.",
    key_risks: "Demand weakness, obsolete stock, margin pressure.",
    portfolio_relevance: "High for retailers, manufacturers, hardware, and consumer companies.",
    beginner_friendly_summary:
      "简单说，公司仓库里的货变多了。可能是准备卖更多，也可能是卖不出去，要看原因。",
    created_at: createdAt,
  },
  {
    id: "rule-017",
    rule_id: "RULE 017",
    category: "Cash Flow and Working Capital",
    event_type: "Working capital deterioration",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact: "Negative if persistent.",
    affected_valuation_drivers: "FCF, liquidity, cash conversion cycle, short-term funding need.",
    dcf_valuation_implication: "More cash tied up in working capital lowers FCF.",
    professional_logic:
      "Working capital deterioration means more capital is locked in receivables, inventory, or other operating assets.",
    key_risks: "Liquidity pressure, more borrowing, lower earnings quality.",
    portfolio_relevance: "High for companies with tight cash positions.",
    beginner_friendly_summary:
      "简单说，公司赚钱之前需要先垫更多钱进去，现金压力会变大。",
    created_at: createdAt,
  },
  {
    id: "rule-018",
    rule_id: "RULE 018",
    category: "Cash Flow and Working Capital",
    event_type: "Free cash flow improvement",
    typical_short_term_impact: "Positive.",
    typical_long_term_impact: "Positive if sustainable.",
    affected_valuation_drivers: "FCF, reinvestment capacity, debt repayment, dividends, buybacks.",
    dcf_valuation_implication: "FCF is a core input in DCF valuation, so improvement directly supports value.",
    professional_logic:
      "Better FCF means the company has more cash after operating needs and investment spending.",
    key_risks: "Temporary capex cuts, working capital release, underinvestment.",
    portfolio_relevance: "High for valuation and shareholder return.",
    beginner_friendly_summary:
      "简单说，公司扣掉必要开支后剩下的钱更多了，这是估值里很重要的好信号。",
    created_at: createdAt,
  },
  {
    id: "rule-019",
    rule_id: "RULE 019",
    category: "Balance Sheet and Leverage",
    event_type: "Debt increase",
    typical_short_term_impact: "Mixed.",
    typical_long_term_impact: "Depends on use of debt and leverage level.",
    affected_valuation_drivers: "Interest expense, leverage, WACC, financial risk, equity value.",
    dcf_valuation_implication:
      "Debt may lower WACC at moderate levels but excessive debt raises distress risk and cost of equity.",
    professional_logic:
      "Responsible leverage can improve capital efficiency; excessive leverage reduces flexibility.",
    key_risks: "Higher interest rates, refinancing pressure, covenant restrictions, credit downgrade.",
    portfolio_relevance: "High for cyclical or leveraged companies.",
    beginner_friendly_summary:
      "简单说，公司借钱不一定坏。如果借钱能赚更多钱，是好事；但债太多，还不起就危险。",
    created_at: createdAt,
  },
  {
    id: "rule-020",
    rule_id: "RULE 020",
    category: "Balance Sheet and Leverage",
    event_type: "Debt refinancing",
    typical_short_term_impact: "Positive if interest cost falls or maturity extends.",
    typical_long_term_impact: "Positive if liquidity risk falls.",
    affected_valuation_drivers: "Interest expense, liquidity risk, WACC, debt maturity.",
    dcf_valuation_implication:
      "Lower interest cost improves cash flow to equity and lower risk may reduce required return.",
    professional_logic:
      "Refinancing quality depends on new debt cost, maturity, covenants, and market conditions.",
    key_risks: "Higher refinancing cost, short maturity extension, stricter covenants.",
    portfolio_relevance: "High if company has near-term debt maturity.",
    beginner_friendly_summary:
      "简单说，公司把旧债换成更便宜或更晚还的新债，通常能减轻压力。",
    created_at: createdAt,
  },
  {
    id: "rule-021",
    rule_id: "RULE 021",
    category: "Balance Sheet and Leverage",
    event_type: "Credit rating downgrade",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact: "Negative if financing costs remain higher.",
    affected_valuation_drivers: "Cost of debt, WACC, liquidity risk, financial flexibility.",
    dcf_valuation_implication: "Higher borrowing cost can reduce FCF and equity value.",
    professional_logic: "A downgrade means credit risk is perceived to be higher.",
    key_risks: "Higher bond yields, refinancing difficulty, investor confidence decline.",
    portfolio_relevance: "High for debt-heavy companies.",
    beginner_friendly_summary:
      "简单说，市场觉得这家公司借钱风险变高了，以后借钱可能更贵。",
    created_at: createdAt,
  },
  {
    id: "rule-022",
    rule_id: "RULE 022",
    category: "Balance Sheet and Leverage",
    event_type: "Asset impairment",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact: "Depends on whether it reflects real business deterioration.",
    affected_valuation_drivers: "Asset value, ROA, equity book value, investor confidence.",
    dcf_valuation_implication:
      "Impairment is non-cash, but it may signal lower future cash flows.",
    professional_logic:
      "An impairment means the expected economic benefit of an asset is lower than its carrying value.",
    key_risks: "More impairments, weak capital allocation, demand decline.",
    portfolio_relevance: "High if user thesis depends on asset quality.",
    beginner_friendly_summary:
      "简单说，公司承认以前的资产没想象中值钱了。虽然不一定马上花现金，但通常不是好信号。",
    created_at: createdAt,
  },
  {
    id: "rule-023",
    rule_id: "RULE 023",
    category: "Balance Sheet and Leverage",
    event_type: "Goodwill impairment",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact: "Negative if it suggests acquisition failure.",
    affected_valuation_drivers:
      "Capital allocation quality, ROIC, investor confidence, future cash flow assumptions.",
    dcf_valuation_implication:
      "Goodwill impairment does not directly affect FCF, but may signal acquired business cash flows are weaker than expected.",
    professional_logic:
      "Goodwill impairment often shows that past acquisition premiums were not justified by future returns.",
    key_risks: "More impairments, poor M&A discipline, falling ROIC.",
    portfolio_relevance: "High for acquisitive companies.",
    beginner_friendly_summary:
      "简单说，公司以前买别的公司可能买贵了，现在承认那笔资产没那么值钱。",
    created_at: createdAt,
  },
  {
    id: "rule-024",
    rule_id: "RULE 024",
    category: "Capital Allocation",
    event_type: "Dividend increase",
    typical_short_term_impact: "Usually positive.",
    typical_long_term_impact: "Positive if supported by sustainable FCF.",
    affected_valuation_drivers: "FCF, shareholder return, capital allocation, investor confidence.",
    dcf_valuation_implication:
      "Dividends do not directly increase firm value, but may signal stronger cash flow and confidence.",
    professional_logic:
      "Dividend increases can indicate financial strength, but the firm must retain enough cash for good investments.",
    key_risks: "Over-distribution, underinvestment, unsustainable dividend.",
    portfolio_relevance: "High for income-focused users.",
    beginner_friendly_summary:
      "简单说，公司多分钱给股东，通常说明现金流不错。但如果分太多影响未来发展，也不一定最好。",
    created_at: createdAt,
  },
  {
    id: "rule-025",
    rule_id: "RULE 025",
    category: "Capital Allocation",
    event_type: "Dividend cut",
    typical_short_term_impact: "Usually negative.",
    typical_long_term_impact: "Mixed.",
    affected_valuation_drivers: "FCF, balance sheet strength, investor confidence, cost of equity.",
    dcf_valuation_implication:
      "DCF is based on FCF, not dividends, but a dividend cut may signal cash flow pressure or reinvestment needs.",
    professional_logic:
      "A dividend cut may indicate weak cash generation, but could be positive if cash is retained to reduce debt or fund high-return projects.",
    key_risks: "Cash flow stress, income investor selling, lower management confidence.",
    portfolio_relevance: "High for income-oriented investors.",
    beginner_friendly_summary:
      "简单说，公司少分红会让投资者担心现金不够。但如果是为了还债或投资好项目，长期不一定坏。",
    created_at: createdAt,
  },
  {
    id: "rule-026",
    rule_id: "RULE 026",
    category: "Capital Allocation",
    event_type: "Share buyback",
    typical_short_term_impact: "Usually positive.",
    typical_long_term_impact:
      "Positive if shares are undervalued and company has excess cash.",
    affected_valuation_drivers: "Shares outstanding, EPS, capital allocation, leverage, per-share value.",
    dcf_valuation_implication:
      "Buybacks do not directly change enterprise value, but can increase value per share if done below intrinsic value.",
    professional_logic:
      "Buyback quality depends on repurchase price, funding source, and alternative investment opportunities.",
    key_risks: "Overpriced buyback, debt-funded buyback, sacrificing growth investment.",
    portfolio_relevance: "High for per-share value.",
    beginner_friendly_summary:
      "简单说，公司买回自己的股票，可能说明它觉得股票便宜。但如果买贵了或借钱买，就不一定好。",
    created_at: createdAt,
  },
  {
    id: "rule-027",
    rule_id: "RULE 027",
    category: "Capital Allocation",
    event_type: "Equity issuance / capital raising",
    typical_short_term_impact: "Usually negative.",
    typical_long_term_impact: "Depends on use of funds.",
    affected_valuation_drivers: "Dilution, shares outstanding, balance sheet, growth investment.",
    dcf_valuation_implication:
      "Issuance dilutes existing shareholders, but may create long-term value if funds earn high returns.",
    professional_logic:
      "Market often worries about dilution, but the purpose of the capital raise matters.",
    key_risks: "Low-price issuance, cash stress, poor project returns.",
    portfolio_relevance: "High for existing shareholders.",
    beginner_friendly_summary:
      "简单说，公司发行更多股票会稀释老股东，所以短期通常不好。但如果这笔钱能带来更高回报，长期可能有帮助。",
    created_at: createdAt,
  },
  {
    id: "rule-028",
    rule_id: "RULE 028",
    category: "Capital Allocation",
    event_type: "Capex increase",
    typical_short_term_impact: "Mixed.",
    typical_long_term_impact: "Positive if investment returns are high.",
    affected_valuation_drivers: "Capex, FCF, revenue growth, ROIC, terminal value.",
    dcf_valuation_implication:
      "Near-term FCF falls, but future growth and cash flow may rise.",
    professional_logic:
      "Higher capex may be maintenance or growth investment. Growth capex should be judged by expected return.",
    key_risks: "Low returns, delays, cost overruns.",
    portfolio_relevance: "High if user thesis depends on expansion.",
    beginner_friendly_summary:
      "简单说，公司现在多花钱建设未来。如果这些投资以后能赚钱，是好事；如果花错了，就是坏事。",
    created_at: createdAt,
  },
  {
    id: "rule-029",
    rule_id: "RULE 029",
    category: "Capital Allocation",
    event_type: "Capex cut",
    typical_short_term_impact: "Positive for short-term FCF.",
    typical_long_term_impact: "Negative if it weakens future growth.",
    affected_valuation_drivers: "FCF, growth capacity, asset quality, competitive position.",
    dcf_valuation_implication: "Short-term FCF rises, but terminal growth may fall.",
    professional_logic: "Capex cuts can reflect efficiency or underinvestment.",
    key_risks: "Aging assets, weaker growth, lower competitiveness.",
    portfolio_relevance: "High for capital-intensive firms.",
    beginner_friendly_summary:
      "简单说，公司少花钱短期现金流会好看，但如果是削减未来发展投资，长期可能不好。",
    created_at: createdAt,
  },
  {
    id: "rule-030",
    rule_id: "RULE 030",
    category: "Governance and Management",
    event_type: "CEO change",
    typical_short_term_impact: "Mixed or negative.",
    typical_long_term_impact: "Depends on new CEO quality and strategy.",
    affected_valuation_drivers: "Execution risk, investor confidence, valuation multiple, WACC.",
    dcf_valuation_implication:
      "Does not change cash flow immediately, but may affect future strategy, margins, and capital allocation.",
    professional_logic:
      "Management change increases uncertainty. If prior management performed poorly, a new CEO may improve long-term value.",
    key_risks: "Unclear strategy, talent loss, transition issues.",
    portfolio_relevance: "High if management execution is important to user thesis.",
    beginner_friendly_summary:
      "简单说，换 CEO 不会马上让公司赚钱变多或变少，但会让市场不确定。新 CEO 强的话，长期可能是好事。",
    created_at: createdAt,
  },
  {
    id: "rule-031",
    rule_id: "RULE 031",
    category: "Governance and Management",
    event_type: "CFO resignation",
    typical_short_term_impact: "Negative or cautionary.",
    typical_long_term_impact: "Depends on reason and financial transparency.",
    affected_valuation_drivers: "Reporting quality, investor confidence, governance risk.",
    dcf_valuation_implication:
      "Does not directly affect DCF, but may increase perceived risk and cost of equity.",
    professional_logic:
      "CFO resignation can raise questions about reporting, financing, or internal controls.",
    key_risks: "Accounting problems, internal control weakness, financing pressure.",
    portfolio_relevance: "High if company already has reporting concerns.",
    beginner_friendly_summary:
      "简单说，管财务的人突然走了，市场会担心公司财务是不是有问题。",
    created_at: createdAt,
  },
  {
    id: "rule-032",
    rule_id: "RULE 032",
    category: "Governance and Management",
    event_type: "Governance scandal",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact:
      "Negative if trust, regulation, or reputation is damaged.",
    affected_valuation_drivers: "WACC, valuation multiple, legal cost, reputation.",
    dcf_valuation_implication:
      "Higher risk may raise discount rate and reduce future revenue or margins.",
    professional_logic:
      "Governance problems reduce investor trust and may create legal, regulatory, and reputational costs.",
    key_risks: "Fines, management change, lawsuits, audit issues.",
    portfolio_relevance: "High for all shareholders.",
    beginner_friendly_summary:
      "简单说，公司管理层或治理出问题，市场会担心它不透明、不可靠。",
    created_at: createdAt,
  },
  {
    id: "rule-033",
    rule_id: "RULE 033",
    category: "M&A and Strategy",
    event_type: "Acquisition",
    typical_short_term_impact: "Mixed.",
    typical_long_term_impact: "Depends on price paid, synergies, and integration.",
    affected_valuation_drivers: "Revenue growth, synergies, margin, debt, ROIC, integration risk.",
    dcf_valuation_implication:
      "Value increases if synergies exceed premium paid. Value falls if the buyer overpays.",
    professional_logic:
      "Acquisitions can create scale and growth, but often destroy value when integration is poor or price is too high.",
    key_risks: "Overpayment, culture clash, debt increase, synergy failure.",
    portfolio_relevance: "High if user owns the acquiring company.",
    beginner_friendly_summary:
      "简单说，公司买别的公司不一定好。买得便宜、整合好就是好事；买贵了就是坏事。",
    created_at: createdAt,
  },
  {
    id: "rule-034",
    rule_id: "RULE 034",
    category: "M&A and Strategy",
    event_type: "Divestiture / asset sale",
    typical_short_term_impact: "Mixed or positive.",
    typical_long_term_impact:
      "Positive if low-return assets are sold and focus improves.",
    affected_valuation_drivers: "ROIC, focus, debt reduction, FCF, revenue base.",
    dcf_valuation_implication:
      "Revenue may fall, but value may improve if ROIC rises or debt falls.",
    professional_logic:
      "Asset sale quality depends on sale price, asset profitability, and use of proceeds.",
    key_risks: "Selling too cheaply, losing strategic assets, lower revenue.",
    portfolio_relevance: "High if company is restructuring.",
    beginner_friendly_summary:
      "简单说，公司卖掉一部分业务，可能是为了更专注或还债。要看卖的是好资产还是拖后腿的资产。",
    created_at: createdAt,
  },
  {
    id: "rule-035",
    rule_id: "RULE 035",
    category: "M&A and Strategy",
    event_type: "Spin-off",
    typical_short_term_impact: "Positive or mixed.",
    typical_long_term_impact: "Positive if it unlocks hidden value.",
    affected_valuation_drivers:
      "Sum-of-the-parts valuation, management focus, capital allocation.",
    dcf_valuation_implication:
      "Spin-off may increase valuation multiple by allowing separate businesses to be valued more clearly.",
    professional_logic:
      "Spin-offs can reduce conglomerate discount, but may increase costs and complexity.",
    key_risks: "Loss of scale, standalone financial weakness, execution risk.",
    portfolio_relevance: "High if company has multiple business segments.",
    beginner_friendly_summary:
      "简单说，公司把一部分业务拆出来，可能让市场更清楚每块业务值多少钱。",
    created_at: createdAt,
  },
  {
    id: "rule-036",
    rule_id: "RULE 036",
    category: "Macro and Economics",
    event_type: "Interest rate rise",
    typical_short_term_impact: "Usually negative for equities.",
    typical_long_term_impact: "Depends on sector, leverage, and pricing power.",
    affected_valuation_drivers: "WACC, cost of debt, demand, valuation multiple.",
    dcf_valuation_implication:
      "Higher discount rates reduce present value of future cash flows.",
    professional_logic:
      "Rising rates pressure valuations, especially for high-growth and leveraged companies.",
    key_risks: "Higher financing cost, lower demand, multiple compression.",
    portfolio_relevance:
      "High for growth stocks, REITs, banks, and leveraged companies.",
    beginner_friendly_summary:
      "简单说，利率上升会让钱变贵，也会让未来利润折现后变得没那么值钱。",
    created_at: createdAt,
  },
  {
    id: "rule-037",
    rule_id: "RULE 037",
    category: "Macro and Economics",
    event_type: "Interest rate cut",
    typical_short_term_impact: "Usually positive.",
    typical_long_term_impact: "Depends on why rates are cut.",
    affected_valuation_drivers: "WACC, cost of debt, demand, valuation multiple.",
    dcf_valuation_implication:
      "Lower discount rates can increase present value of future cash flows.",
    professional_logic:
      "Rate cuts support valuation, but if cuts happen because the economy is weak, fundamentals may still be under pressure.",
    key_risks: "Recession, weak demand, bank margin pressure.",
    portfolio_relevance: "High for rate-sensitive sectors.",
    beginner_friendly_summary:
      "简单说，降息一般对股票估值有帮助，但如果是因为经济太差才降息，也不能只看好的一面。",
    created_at: createdAt,
  },
  {
    id: "rule-038",
    rule_id: "RULE 038",
    category: "Macro and Economics",
    event_type: "Inflation surprise",
    typical_short_term_impact: "Usually negative.",
    typical_long_term_impact: "Depends on pricing power.",
    affected_valuation_drivers: "Input cost, pricing power, margin, interest rates, WACC.",
    dcf_valuation_implication:
      "Higher costs and higher rates can reduce FCF and valuation.",
    professional_logic:
      "Inflation affects cost structure. Companies with pricing power can pass costs to customers.",
    key_risks: "Margin squeeze, further rate hikes, weaker demand.",
    portfolio_relevance:
      "High for consumer, retail, manufacturing, and infrastructure companies.",
    beginner_friendly_summary:
      "简单说，物价涨太快，公司成本会上升。如果公司不能涨价，利润会被挤压。",
    created_at: createdAt,
  },
  {
    id: "rule-039",
    rule_id: "RULE 039",
    category: "Macro and Economics",
    event_type: "GDP slowdown",
    typical_short_term_impact: "Usually negative.",
    typical_long_term_impact:
      "More negative for cyclical sectors; less negative for defensive sectors.",
    affected_valuation_drivers: "Revenue growth, demand, margin, credit risk.",
    dcf_valuation_implication: "Future revenue and margin forecasts may be reduced.",
    professional_logic:
      "Slower economic growth reduces consumption, investment, and corporate earnings.",
    key_risks: "Demand decline, inventory build-up, credit losses.",
    portfolio_relevance: "High for cyclical stocks.",
    beginner_friendly_summary:
      "简单说，经济变慢时，很多公司卖东西会更难，赚钱也可能变少。",
    created_at: createdAt,
  },
  {
    id: "rule-040",
    rule_id: "RULE 040",
    category: "Macro and Economics",
    event_type: "Currency depreciation",
    typical_short_term_impact: "Depends on revenue and cost currency exposure.",
    typical_long_term_impact: "Exporters may benefit; importers may suffer.",
    affected_valuation_drivers: "Revenue translation, input cost, margin, FX risk.",
    dcf_valuation_implication:
      "Foreign revenue companies may benefit; foreign cost or foreign debt companies may suffer.",
    professional_logic:
      "FX affects revenue translation, cost structure, and debt burden.",
    key_risks: "Poor hedging, foreign debt increase, import cost pressure.",
    portfolio_relevance: "High for multinational companies.",
    beginner_friendly_summary:
      "简单说，汇率变化对公司影响不同。赚外币的公司可能受益，花外币或借外币的公司可能受损。",
    created_at: createdAt,
  },
  {
    id: "rule-041",
    rule_id: "RULE 041",
    category: "Sector and Commodity",
    event_type: "Commodity price increase",
    typical_short_term_impact: "Positive for producers, negative for consumers.",
    typical_long_term_impact: "Depends on sustainability.",
    affected_valuation_drivers: "Revenue, input cost, margin, FCF, sector sentiment.",
    dcf_valuation_implication:
      "Producers may see higher revenue and FCF; users of commodities may see margin pressure.",
    professional_logic:
      "Commodity price changes affect companies differently depending on whether they sell or consume the commodity.",
    key_risks: "Price reversal, cost inflation, policy intervention.",
    portfolio_relevance:
      "High for miners, energy, airlines, manufacturers, and consumer staples.",
    beginner_friendly_summary:
      "简单说，卖铁矿石、石油、黄金的公司通常受益；需要买这些原材料的公司可能成本上升。",
    created_at: createdAt,
  },
  {
    id: "rule-042",
    rule_id: "RULE 042",
    category: "Sector and Commodity",
    event_type: "Commodity price decline",
    typical_short_term_impact: "Negative for producers, positive for consumers.",
    typical_long_term_impact: "Depends on cost curve and demand.",
    affected_valuation_drivers: "Revenue, margin, reserves value, FCF.",
    dcf_valuation_implication:
      "Resource companies may see lower revenue and cash flow forecasts.",
    professional_logic:
      "Resource company valuations are highly sensitive to commodity price assumptions.",
    key_risks: "Asset impairment, project delays, dividend cuts.",
    portfolio_relevance: "High for resource stocks.",
    beginner_friendly_summary:
      "简单说，卖资源的公司会因为价格下跌少赚钱；但买资源当原材料的公司可能会省钱。",
    created_at: createdAt,
  },
  {
    id: "rule-043",
    rule_id: "RULE 043",
    category: "Sector and Commodity",
    event_type: "Regulatory approval",
    typical_short_term_impact: "Usually positive.",
    typical_long_term_impact: "Positive if commercialisation succeeds.",
    affected_valuation_drivers: "Revenue growth, market share, R&D productivity, risk.",
    dcf_valuation_implication:
      "Risk-adjusted expected future cash flows may increase.",
    professional_logic:
      "Approval reduces regulatory risk and may open a new revenue stream.",
    key_risks: "Weak sales, competition, pricing and reimbursement limits.",
    portfolio_relevance:
      "High for biotech, healthcare, infrastructure, and project-driven companies.",
    beginner_friendly_summary:
      "简单说，公司产品或项目获批通常是好消息，因为它可能带来新收入。但最后还要看卖得好不好。",
    created_at: createdAt,
  },
  {
    id: "rule-044",
    rule_id: "RULE 044",
    category: "Sector and Commodity",
    event_type: "Regulatory rejection",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact:
      "Severely negative if company depends on the project or product.",
    affected_valuation_drivers: "Pipeline value, revenue growth, R&D value, FCF, risk.",
    dcf_valuation_implication:
      "Expected cash flows from the product or project may be removed or reduced.",
    professional_logic:
      "Rejection lowers pipeline or project value and may increase costs or delay launch.",
    key_risks: "Project termination, funding need, competitor advantage.",
    portfolio_relevance: "High if investment thesis depends on approval.",
    beginner_friendly_summary:
      "简单说，公司本来指望这个产品或项目赚钱，但现在没批下来，所以未来收入预期会下降。",
    created_at: createdAt,
  },
  {
    id: "rule-045",
    rule_id: "RULE 045",
    category: "Risk and External Shock",
    event_type: "Lawsuit or regulatory investigation",
    typical_short_term_impact: "Usually negative.",
    typical_long_term_impact:
      "Depends on fines, restrictions, and reputation damage.",
    affected_valuation_drivers: "Legal cost, revenue risk, margin, WACC, valuation multiple.",
    dcf_valuation_implication:
      "Potential fines and business restrictions can reduce cash flow and increase risk premium.",
    professional_logic:
      "Legal and regulatory events increase uncertainty and may cause markets to discount worst-case outcomes.",
    key_risks: "Fines, business restrictions, customer loss, management change.",
    portfolio_relevance:
      "High for all shareholders, especially concentrated positions.",
    beginner_friendly_summary:
      "简单说，公司被起诉或调查，市场会担心它要赔钱、被罚，或者以后做生意受影响。",
    created_at: createdAt,
  },
  {
    id: "rule-046",
    rule_id: "RULE 046",
    category: "Risk and External Shock",
    event_type: "Cybersecurity breach",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact:
      "Negative if trust, customer retention, or regulation is affected.",
    affected_valuation_drivers: "Legal cost, reputation, revenue retention, capex, opex.",
    dcf_valuation_implication:
      "Future costs may increase and customer retention may decline.",
    professional_logic:
      "Data breaches create legal, operational, and reputational risks.",
    key_risks: "Regulatory fines, customer loss, repair costs, lawsuits.",
    portfolio_relevance:
      "High for banks, healthcare, technology, and consumer platforms.",
    beginner_friendly_summary:
      "简单说，公司数据出事了，可能要赔钱，也可能让客户不再信任它。",
    created_at: createdAt,
  },
  {
    id: "rule-047",
    rule_id: "RULE 047",
    category: "Risk and External Shock",
    event_type: "Supply chain disruption",
    typical_short_term_impact: "Negative.",
    typical_long_term_impact:
      "Depends on alternative suppliers and inventory buffer.",
    affected_valuation_drivers: "Revenue, gross margin, working capital, delivery timing.",
    dcf_valuation_implication:
      "Revenue may be delayed, costs may rise, and short-term FCF may fall.",
    professional_logic:
      "Supply chain issues affect production, delivery, cost, and customer satisfaction.",
    key_risks: "Shortages, higher costs, lost customers, order cancellation.",
    portfolio_relevance:
      "High for manufacturers, retailers, hardware, and automotive companies.",
    beginner_friendly_summary:
      "简单说，公司可能没法按时生产或交货，所以收入和利润都会受影响。",
    created_at: createdAt,
  },
  {
    id: "rule-048",
    rule_id: "RULE 048",
    category: "Portfolio Risk",
    event_type: "High position concentration",
    typical_short_term_impact: "Increases portfolio risk.",
    typical_long_term_impact:
      "Higher idiosyncratic risk and drawdown risk.",
    affected_valuation_drivers: "Portfolio volatility, stock-specific risk, drawdown risk.",
    dcf_valuation_implication:
      "Does not affect company DCF, but affects user portfolio risk.",
    professional_logic:
      "A concentrated position makes the portfolio highly sensitive to one company's news.",
    key_risks: "Large loss if one company has negative event.",
    portfolio_relevance:
      "Very high if one stock exceeds a large portfolio weight.",
    beginner_friendly_summary:
      "简单说，如果你把太多钱放在一只股票上，这家公司一出事，你整个组合都会很痛。",
    created_at: createdAt,
  },
  {
    id: "rule-049",
    rule_id: "RULE 049",
    category: "Portfolio Risk",
    event_type: "Sector concentration",
    typical_short_term_impact: "Increases sensitivity to sector news.",
    typical_long_term_impact:
      "Sector cycle can dominate portfolio performance.",
    affected_valuation_drivers: "Portfolio beta, sector exposure, correlation, drawdown risk.",
    dcf_valuation_implication:
      "Does not affect individual company DCF, but affects portfolio risk structure.",
    professional_logic:
      "Owning many stocks in one sector may still mean poor diversification.",
    key_risks: "Industry regulation, sector demand shock, commodity cycle.",
    portfolio_relevance:
      "High if several holdings belong to one sector.",
    beginner_friendly_summary:
      "简单说，你可能买了很多只股票，但如果它们都属于同一个行业，其实没有真正分散风险。",
    created_at: createdAt,
  },
  {
    id: "rule-050",
    rule_id: "RULE 050",
    category: "Portfolio Risk",
    event_type: "High beta portfolio",
    typical_short_term_impact:
      "Outperforms in rising markets and underperforms in falling markets.",
    typical_long_term_impact:
      "Higher systematic risk requires higher expected return.",
    affected_valuation_drivers: "Systematic risk, cost of equity, volatility.",
    dcf_valuation_implication:
      "Higher beta can increase cost of equity and make valuation more sensitive.",
    professional_logic:
      "Beta measures sensitivity to broad market movement.",
    key_risks: "Market selloff, rate increase, risk-off sentiment.",
    portfolio_relevance:
      "High if portfolio is dominated by high-growth or cyclical stocks.",
    beginner_friendly_summary:
      "简单说，高 beta 股票像加速器，市场好时涨得快，市场差时也可能跌得更狠。",
    created_at: createdAt,
  },
];

export function getStockByTicker(ticker: string) {
  return demoStocks.find((stock) => stock.ticker.toUpperCase() === ticker.toUpperCase()) ?? null;
}

export function getPortfolioItemByTicker(ticker: string) {
  return (
    demoPortfolioItems.find((item) => item.ticker.toUpperCase() === ticker.toUpperCase()) ??
    null
  );
}

export function getNewsForTicker(ticker: string) {
  return demoNewsItems.filter((item) => item.ticker.toUpperCase() === ticker.toUpperCase());
}

export function getFinancialRuleForNews(newsId: string) {
  const mapping = newsRuleMap.find((item) => item.newsId === newsId);
  if (!mapping) return null;
  const rule = financialRules.find((item) => item.rule_id === mapping.ruleId);
  if (!rule) return null;
  return mapping.eventTypeOverride ? { ...rule, event_type: mapping.eventTypeOverride } : rule;
}

export function getAnalysisForNews(
  newsItem: NewsItem,
  language: LanguagePreference,
  portfolioItem: PortfolioItem | null,
) {
  const rule = getFinancialRuleForNews(newsItem.id);
  if (!rule) return null;
  return generateAnalysisFromRule(newsItem, rule, portfolioItem, language);
}

export function getAnalysesForTicker(
  ticker: string,
  language: LanguagePreference,
  portfolioItem: PortfolioItem | null,
) {
  return getNewsForTicker(ticker)
    .map((newsItem) => getAnalysisForNews(newsItem, language, portfolioItem))
    .filter(Boolean) as AIAnalysis[];
}

export function getDemoRows() {
  const portfolioRows: PortfolioRow[] = demoPortfolioItems.map((item) => {
    const stock = getStockByTicker(item.ticker);
    const latestNews = getNewsForTicker(item.ticker);
    const latestAnalysis = latestNews[0]
      ? getAnalysisForNews(latestNews[0], "English", item)
      : null;

    return {
      id: item.id,
      ticker: item.ticker,
      market: item.market,
      company_name: item.company_name,
      position_type: "Portfolio",
      today_change_percent: stock?.today_change_percent ?? 0,
      latest_news_count: latestNews.length,
      latest_ai_impact: latestAnalysis?.theoretical_impact ?? "Neutral",
      quantity: item.quantity,
      average_buy_price: item.average_buy_price,
      currency: item.currency,
      investment_thesis: item.investment_thesis,
    };
  });

  const watchRows: PortfolioRow[] = demoWatchlistItems.map((item) => {
    const stock = getStockByTicker(item.ticker);
    const latestNews = getNewsForTicker(item.ticker);
    const latestAnalysis = latestNews[0]
      ? getAnalysisForNews(latestNews[0], "English", null)
      : null;

    return {
      id: item.id,
      ticker: item.ticker,
      market: item.market,
      company_name: item.company_name,
      position_type: "Watchlist",
      today_change_percent: stock?.today_change_percent ?? 0,
      latest_news_count: latestNews.length,
      latest_ai_impact: latestAnalysis?.theoretical_impact ?? "Neutral",
    };
  });

  return [...portfolioRows, ...watchRows];
}

export function getImportantUpdates(language: LanguagePreference) {
  return demoNewsItems
    .map((newsItem) => {
      const portfolioItem = getPortfolioItemByTicker(newsItem.ticker);
      const analysis = getAnalysisForNews(newsItem, language, portfolioItem);
      return analysis ? { newsItem, analysis } : null;
    })
    .filter(Boolean)
    .sort((a, b) => {
      const order = { High: 0, Medium: 1, Low: 2 };
      return order[a!.analysis.importance] - order[b!.analysis.importance];
    })
    .slice(0, 3) as { newsItem: NewsItem; analysis: AIAnalysis }[];
}

export function getEstimatedPortfolioValue(rows: PortfolioRow[]) {
  return rows
    .filter((row) => row.position_type === "Portfolio")
    .reduce((total, row) => {
      const stock = getStockByTicker(row.ticker);
      return total + (stock?.current_price ?? 0) * (row.quantity ?? 0);
    }, 0);
}
