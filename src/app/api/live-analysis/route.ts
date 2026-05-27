import { NextResponse } from "next/server";
import type {
  AIAnalysis,
  Importance,
  LanguagePreference,
  Market,
  NewsItem,
  PortfolioItem,
  TheoreticalImpact,
  ThesisEffect,
} from "@/lib/types";

export const runtime = "nodejs";

const impacts: TheoreticalImpact[] = ["Positive", "Negative", "Mixed", "Neutral"];
const importances: Importance[] = ["High", "Medium", "Low"];
const thesisEffects: ThesisEffect[] = [
  "Supports thesis",
  "Weakens thesis",
  "Neutral to thesis",
  "Unclear",
];

interface LiveAnalysisRequest {
  ticker: string;
  market: Market;
  companyName: string;
  languagePreference: LanguagePreference;
  userPortfolio: PortfolioItem | null;
}

interface OpenAILiveItem {
  news_title: string;
  source: string;
  source_url: string;
  published_at: string;
  raw_summary: string;
  event_type: string;
  theoretical_impact: string;
  importance: string;
  short_term_impact: string;
  long_term_impact: string;
  affected_valuation_drivers: string;
  dcf_valuation_implication: string;
  portfolio_relevance: string;
  key_risks: string;
  professional_explanation: string;
  beginner_friendly_summary: string;
  thesis_effect: string;
}

interface OpenAIParsedResponse {
  generated_at?: string;
  items?: OpenAILiveItem[];
}

function asEnum<T extends string>(value: string | undefined, allowed: T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

function extractOutputText(payload: unknown) {
  if (
    payload &&
    typeof payload === "object" &&
    "output_text" in payload &&
    typeof payload.output_text === "string"
  ) {
    return payload.output_text;
  }

  const output = (payload as { output?: unknown[] })?.output;
  if (!Array.isArray(output)) return "";

  return output
    .flatMap((item) => {
      const content = (item as { content?: unknown[] })?.content;
      return Array.isArray(content) ? content : [];
    })
    .map((content) => (content as { text?: string })?.text ?? "")
    .join("\n");
}

function parseJsonObject(text: string): OpenAIParsedResponse {
  try {
    return JSON.parse(text) as OpenAIParsedResponse;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("AI response did not contain JSON.");
    return JSON.parse(match[0]) as OpenAIParsedResponse;
  }
}

function buildPrompt(request: LiveAnalysisRequest) {
  const portfolioText = request.userPortfolio
    ? `The user owns this stock. Quantity: ${request.userPortfolio.quantity}. Average buy price: ${request.userPortfolio.average_buy_price} ${request.userPortfolio.currency}. Investment thesis: ${request.userPortfolio.investment_thesis || "Not provided"}.`
    : "The user does not have a recorded portfolio position. Treat this as watchlist research.";

  const languageInstruction =
    request.languagePreference === "Chinese"
      ? "Write all analysis in Chinese. Keep important finance terms in English brackets where useful, for example operating margin, free cash flow, WACC, DCF."
      : request.languagePreference === "Bilingual"
        ? "Write English first, then Chinese, inside each text field."
        : "Write all analysis in English.";

  return `
You are Easy Investment, a careful investment research assistant for beginner and retail investors.

Research current public web information for:
- Ticker: ${request.ticker}
- Market: ${request.market}
- Company: ${request.companyName}

${portfolioText}
${languageInstruction}

Critical product rules:
- Do not provide buy, sell, or hold recommendations.
- Do not provide target prices.
- Do not give personalised financial advice.
- Do not invent sources, dates, or URLs.
- Use recent, source-backed public information only.
- If reliable recent stock-specific news is limited, say that clearly in the summary.
- Every analysis must identify event type, map the event to professional finance concepts, identify valuation drivers, discuss short-term impact, long-term impact, DCF or valuation implication, risk and uncertainty, portfolio relevance, and a beginner-friendly summary.

Use an original finance rulebook style based on standard professional concepts: equity valuation, financial statement analysis, corporate finance, economics, risk management, portfolio management, fixed income, and derivatives. Do not mention CFA Institute or any proprietary curriculum.

Return ONLY valid JSON, no markdown, in this exact shape:
{
  "generated_at": "ISO timestamp",
  "items": [
    {
      "news_title": "string",
      "source": "string",
      "source_url": "https://...",
      "published_at": "ISO timestamp or best available date",
      "raw_summary": "string",
      "event_type": "string",
      "theoretical_impact": "Positive | Negative | Mixed | Neutral",
      "importance": "High | Medium | Low",
      "short_term_impact": "string",
      "long_term_impact": "string",
      "affected_valuation_drivers": "string",
      "dcf_valuation_implication": "string",
      "portfolio_relevance": "string",
      "key_risks": "string",
      "professional_explanation": "string",
      "beginner_friendly_summary": "string",
      "thesis_effect": "Supports thesis | Weakens thesis | Neutral to thesis | Unclear"
    }
  ]
}

Return 1 to 3 high-signal items only.
`;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        configured: false,
        error:
          "OPENAI_API_KEY is not configured. Add it in Vercel Environment Variables to enable live AI research.",
      },
      { status: 200 },
    );
  }

  const body = (await request.json()) as LiveAnalysisRequest;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  try {
    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        tools: [{ type: "web_search_preview" }],
        input: buildPrompt(body),
      }),
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      return NextResponse.json(
        {
          configured: true,
          error: `OpenAI request failed: ${errorText}`,
        },
        { status: 502 },
      );
    }

    const rawPayload = await openAIResponse.json();
    const outputText = extractOutputText(rawPayload);
    const parsed = parseJsonObject(outputText);
    const now = new Date().toISOString();

    const items = (parsed.items ?? []).slice(0, 3).map((item, index) => {
      const newsItem: NewsItem = {
        id: `live-news-${body.ticker}-${index}`,
        ticker: body.ticker,
        market: body.market,
        company_name: body.companyName,
        title: item.news_title || `${body.companyName} live research update`,
        source: item.source || "OpenAI web search",
        url: item.source_url || "#",
        published_at: item.published_at || parsed.generated_at || now,
        raw_summary: item.raw_summary || "",
        created_at: now,
      };

      const analysis: AIAnalysis = {
        id: `live-analysis-${body.ticker}-${index}`,
        news_item_id: newsItem.id,
        ticker: body.ticker,
        market: body.market,
        event_type: item.event_type || "Current market update",
        theoretical_impact: asEnum(item.theoretical_impact, impacts, "Neutral"),
        importance: asEnum(item.importance, importances, "Medium"),
        short_term_impact: item.short_term_impact || "",
        long_term_impact: item.long_term_impact || "",
        affected_valuation_drivers: item.affected_valuation_drivers || "",
        dcf_valuation_implication: item.dcf_valuation_implication || "",
        portfolio_relevance: item.portfolio_relevance || "",
        key_risks: item.key_risks || "",
        professional_explanation: item.professional_explanation || "",
        beginner_friendly_summary: item.beginner_friendly_summary || "",
        thesis_effect: asEnum(item.thesis_effect, thesisEffects, "Unclear"),
        language: body.languagePreference,
        created_at: now,
      };

      return { newsItem, analysis };
    });

    return NextResponse.json({
      configured: true,
      generatedAt: parsed.generated_at || now,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        error: error instanceof Error ? error.message : "Unknown live AI error.",
      },
      { status: 500 },
    );
  }
}
