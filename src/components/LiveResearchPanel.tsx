"use client";

import { useState } from "react";
import { RefreshCw, Wifi } from "lucide-react";
import { NewsImpactCard } from "@/components/NewsImpactCard";
import { dual } from "@/lib/i18n";
import type {
  AIAnalysis,
  DemoStock,
  LanguagePreference,
  NewsItem,
  PortfolioItem,
} from "@/lib/types";

interface LiveResearchResult {
  configured: boolean;
  generatedAt?: string;
  items?: { newsItem: NewsItem; analysis: AIAnalysis }[];
  error?: string;
}

export function LiveResearchPanel({
  stock,
  portfolioItem,
  language,
}: {
  stock: DemoStock;
  portfolioItem: PortfolioItem | null;
  language: LanguagePreference;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LiveResearchResult | null>(null);

  async function runLiveResearch() {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/live-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticker: stock.ticker,
          market: stock.market,
          companyName: stock.company_name,
          languagePreference: language,
          userPortfolio: portfolioItem,
        }),
      });

      const data = (await response.json()) as LiveResearchResult;
      setResult(data);
    } catch (error) {
      setResult({
        configured: true,
        error:
          error instanceof Error
            ? error.message
            : "Live AI research failed unexpectedly.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-md border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <Wifi size={16} aria-hidden />
            {dual(language, "Live AI research", "实时 AI 研究")}
          </div>
          <h2 className="mt-2 text-xl font-semibold text-stone-950">
            {dual(
              language,
              "Search current public news and regenerate analysis",
              "搜索最新公开新闻并重新生成分析",
            )}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-700">
            {dual(
              language,
              "Uses a server-side OpenAI call with web search when OPENAI_API_KEY is configured. The output remains theoretical impact analysis only.",
              "配置 OPENAI_API_KEY 后，会通过服务端 OpenAI 调用和网页搜索生成实时研究。输出仍然只做理论影响分析。",
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={runLiveResearch}
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} aria-hidden />
          {loading
            ? dual(language, "Researching...", "正在研究...")
            : dual(language, "Run live AI", "运行实时 AI")}
        </button>
      </div>

      {result?.error && (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          {result.error}
        </div>
      )}

      {result?.generatedAt && (
        <p className="mt-4 text-xs font-medium text-stone-600">
          {dual(language, "Generated at", "生成时间")}:{" "}
          {new Intl.DateTimeFormat("en-AU", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(result.generatedAt))}
        </p>
      )}

      {result?.items && result.items.length > 0 && (
        <div className="mt-4 grid gap-4">
          {result.items.map((item) => (
            <NewsImpactCard
              key={item.newsItem.id}
              newsItem={item.newsItem}
              analysis={item.analysis}
            />
          ))}
        </div>
      )}
    </section>
  );
}
