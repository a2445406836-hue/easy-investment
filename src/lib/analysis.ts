import {
  impactToChinese,
  importanceToChinese,
  thesisEffectToChinese,
  formatLanguageText,
} from "@/lib/i18n";
import type {
  AIAnalysis,
  FinancialRule,
  LanguagePreference,
  NewsItem,
  PortfolioItem,
  TheoreticalImpact,
  Importance,
  ThesisEffect,
} from "@/lib/types";

const eventImpactMap: Record<string, TheoreticalImpact> = {
  "Earnings beat": "Positive",
  "Commodity price decline": "Negative",
  Restructuring: "Mixed",
  "Interest rate rise": "Mixed",
  "Interest rate rise for banks": "Mixed",
  "Revenue growth acceleration": "Positive",
  "Regulatory risk": "Mixed",
  "Revenue slowdown": "Mixed",
};

const eventImportanceMap: Record<string, Importance> = {
  "Earnings beat": "High",
  "Commodity price decline": "High",
  Restructuring: "High",
  "Interest rate rise": "Medium",
  "Interest rate rise for banks": "Medium",
  "Revenue growth acceleration": "High",
  "Regulatory risk": "High",
  "Revenue slowdown": "Medium",
};

function inferThesisEffect(impact: TheoreticalImpact): ThesisEffect {
  if (impact === "Positive") return "Supports thesis";
  if (impact === "Negative") return "Weakens thesis";
  if (impact === "Neutral") return "Neutral to thesis";
  return "Unclear";
}

export function generateAnalysisFromRule(
  newsItem: NewsItem,
  financialRule: FinancialRule,
  userPortfolio: PortfolioItem | null,
  languagePreference: LanguagePreference,
): AIAnalysis {
  const theoreticalImpact = eventImpactMap[financialRule.event_type] ?? "Neutral";
  const importance = eventImportanceMap[financialRule.event_type] ?? "Medium";
  const thesisEffect = userPortfolio ? inferThesisEffect(theoreticalImpact) : "Unclear";
  const hasPosition = Boolean(userPortfolio);

  const enPortfolio = hasPosition
    ? `This matters to the portfolio because the user has a recorded holding in ${newsItem.ticker}. It should be reviewed against the user thesis, position size, and risk tolerance without turning the analysis into a trade recommendation.`
    : `This is watchlist-level information only. No portfolio holding is recorded, so the relevance is educational and monitoring-focused.`;

  const zhPortfolio = hasPosition
    ? `这与组合有关，因为用户记录了 ${newsItem.ticker} 的持仓。应结合投资逻辑、仓位大小和风险承受能力来理解，但这不是买入、卖出或持有建议。`
    : `这只是观察名单层面的信息。当前没有记录持仓，因此主要用于学习和跟踪。`;

  return {
    id: `analysis-${newsItem.id}-${languagePreference}`,
    news_item_id: newsItem.id,
    ticker: newsItem.ticker,
    market: newsItem.market,
    event_type: formatLanguageText(
      languagePreference,
      financialRule.event_type,
      `${financialRule.event_type}（事件类型）`,
    ),
    theoretical_impact: theoreticalImpact,
    importance,
    short_term_impact: formatLanguageText(
      languagePreference,
      `${financialRule.typical_short_term_impact} For ${newsItem.company_name}, the first market reaction is likely to focus on whether the news changes expectations versus what investors had already priced in.`,
      `短期来看，市场通常会先重新评估这条消息是否超出预期。对 ${newsItem.company_name} 而言，理论影响是${impactToChinese(theoreticalImpact)}，但短期价格反应也会受市场情绪和已有预期影响。`,
    ),
    long_term_impact: formatLanguageText(
      languagePreference,
      `${financialRule.typical_long_term_impact} The durable impact depends on whether the event changes revenue quality, margins, cash conversion, competitive position, or management execution.`,
      `长期来看，关键是这件事是否会持续影响收入质量、利润率（operating margin）、现金转换（cash conversion）、竞争力或管理层执行。典型长期影响需要看基本面是否真的改变。`,
    ),
    affected_valuation_drivers: formatLanguageText(
      languagePreference,
      financialRule.affected_valuation_drivers,
      `主要受影响的估值驱动因素（valuation drivers）包括：${financialRule.affected_valuation_drivers}。`,
    ),
    dcf_valuation_implication: formatLanguageText(
      languagePreference,
      financialRule.dcf_valuation_implication,
      `从 DCF（discounted cash flow）角度看，这条消息可能影响未来收入、利润率、自由现金流（free cash flow）或折现率（WACC）。具体方向取决于影响是否可持续。`,
    ),
    portfolio_relevance: formatLanguageText(languagePreference, enPortfolio, zhPortfolio),
    key_risks: formatLanguageText(
      languagePreference,
      financialRule.key_risks,
      `主要风险包括：${financialRule.key_risks}。这些风险会影响市场对未来现金流和风险溢价的判断。`,
    ),
    professional_explanation: formatLanguageText(
      languagePreference,
      `${financialRule.professional_logic} This analysis maps the news to a finance rule first, then checks the affected financial drivers. It intentionally avoids generic sentiment-only scoring and does not produce a target price or trading instruction.`,
      `${financialRule.professional_logic} 这份分析先把新闻映射到财务规则，再检查受影响的财务和估值驱动因素。它不是单纯情绪分析，也不会给出目标价或交易指令。`,
    ),
    beginner_friendly_summary: formatLanguageText(
      languagePreference,
      `In simple terms, this news is ${theoreticalImpact.toLowerCase()} for ${newsItem.company_name} in theory. The important question is whether it changes the company’s future cash flow, risk, or growth story in a lasting way.`,
      financialRule.beginner_friendly_summary,
    ),
    thesis_effect: thesisEffect,
    language: languagePreference,
    created_at: new Date().toISOString(),
  };
}

export function getAnalysisTemplate() {
  return [
    "News title:",
    "Event type:",
    "Theoretical impact:",
    "Importance:",
    "Short-term impact:",
    "Long-term impact:",
    "Affected valuation drivers:",
    "DCF / valuation implication:",
    "Portfolio relevance:",
    "Key risks:",
    "Professional explanation:",
    "Beginner-friendly summary:",
  ].join("\n");
}

export function displayImpact(impact: TheoreticalImpact, language: LanguagePreference) {
  if (language === "Chinese") return impactToChinese(impact);
  if (language === "Bilingual") return `${impact} / ${impactToChinese(impact)}`;
  return impact;
}

export function displayImportance(importance: Importance, language: LanguagePreference) {
  if (language === "Chinese") return importanceToChinese(importance);
  if (language === "Bilingual") return `${importance} / ${importanceToChinese(importance)}`;
  return importance;
}

export function displayThesisEffect(effect: ThesisEffect, language: LanguagePreference) {
  if (language === "Chinese") return thesisEffectToChinese(effect);
  if (language === "Bilingual") return `${effect} / ${thesisEffectToChinese(effect)}`;
  return effect;
}
