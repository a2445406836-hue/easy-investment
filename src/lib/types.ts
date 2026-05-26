export type LanguagePreference = "English" | "Chinese" | "Bilingual";

export type Market = "ASX" | "US" | "HK" | "SG" | "CN";

export type TheoreticalImpact = "Positive" | "Negative" | "Mixed" | "Neutral";

export type Importance = "High" | "Medium" | "Low";

export type ThesisEffect =
  | "Supports thesis"
  | "Weakens thesis"
  | "Neutral to thesis"
  | "Unclear";

export type PositionType = "Portfolio" | "Watchlist";

export interface UserProfile {
  id: string;
  user_id: string;
  language_preference: LanguagePreference;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  user_id: string;
  ticker: string;
  market: Market;
  company_name: string;
  quantity: number;
  average_buy_price: number;
  currency: string;
  investment_thesis?: string;
  created_at: string;
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  ticker: string;
  market: Market;
  company_name: string;
  created_at: string;
}

export interface NewsItem {
  id: string;
  ticker: string;
  market: Market;
  company_name: string;
  title: string;
  source: string;
  url: string;
  published_at: string;
  raw_summary: string;
  created_at: string;
}

export interface AIAnalysis {
  id: string;
  news_item_id: string;
  ticker: string;
  market: Market;
  event_type: string;
  theoretical_impact: TheoreticalImpact;
  importance: Importance;
  short_term_impact: string;
  long_term_impact: string;
  affected_valuation_drivers: string;
  dcf_valuation_implication: string;
  portfolio_relevance: string;
  key_risks: string;
  professional_explanation: string;
  beginner_friendly_summary: string;
  thesis_effect: ThesisEffect;
  language: LanguagePreference;
  created_at: string;
}

export interface FinancialRule {
  id: string;
  rule_id: string;
  category: string;
  event_type: string;
  typical_short_term_impact: string;
  typical_long_term_impact: string;
  affected_valuation_drivers: string;
  dcf_valuation_implication: string;
  professional_logic: string;
  key_risks: string;
  portfolio_relevance: string;
  beginner_friendly_summary: string;
  created_at: string;
}

export interface DemoStock {
  ticker: string;
  market: Market;
  company_name: string;
  currency: string;
  current_price: number;
  today_change_percent: number;
  sector: string;
}

export interface PortfolioRow {
  id: string;
  ticker: string;
  market: Market;
  company_name: string;
  position_type: PositionType;
  today_change_percent: number;
  latest_news_count: number;
  latest_ai_impact: TheoreticalImpact;
  quantity?: number;
  average_buy_price?: number;
  currency?: string;
  investment_thesis?: string;
}
