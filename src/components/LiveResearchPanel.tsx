"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const AUTO_REFRESH_MINUTES = 30;

interface LiveResearchResult {
  configured: boolean;
  generatedAt?: string;
  cached?: boolean;
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
  const [lastAttemptAt, setLastAttemptAt] = useState<string | null>(null);
  const activeRequestRef = useRef<AbortController | null>(null);

  const runLiveResearch = useCallback(async () => {
    activeRequestRef.current?.abort();
    const controller = new AbortController();
    activeRequestRef.current = controller;
    setLoading(true);
    setLastAttemptAt(new Date().toISOString());

    try {
      const response = await fetch("/api/live-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
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
      if (error instanceof DOMException && error.name === "AbortError") return;

      setResult({
        configured: true,
        error:
          error instanceof Error
            ? error.message
            : "Live AI research failed unexpectedly.",
      });
    } finally {
      if (activeRequestRef.current === controller) {
        setLoading(false);
        activeRequestRef.current = null;
      }
    }
  }, [language, portfolioItem, stock.company_name, stock.market, stock.ticker]);

  useEffect(() => {
    void runLiveResearch();
    const interval = window.setInterval(
      () => void runLiveResearch(),
      AUTO_REFRESH_MINUTES * 60 * 1000,
    );

    return () => {
      window.clearInterval(interval);
      activeRequestRef.current?.abort();
    };
  }, [runLiveResearch]);

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
              "Automatically refreshes current public news analysis",
              "自动刷新最新公开新闻分析",
            )}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-700">
            {dual(
              language,
              `This panel runs automatically when the page opens and refreshes every ${AUTO_REFRESH_MINUTES} minutes while the page stays open. Results are cached to reduce API cost.`,
              `页面打开时会自动运行，并在页面停留期间每 ${AUTO_REFRESH_MINUTES} 分钟刷新一次。结果会缓存，以减少 API 成本。`,
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => void runLiveResearch()}
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} aria-hidden />
          {loading
            ? dual(language, "Updating...", "正在更新...")
            : dual(language, "Refresh now", "立即刷新")}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-stone-600">
        {lastAttemptAt && (
          <span className="rounded-md border border-stone-200 bg-white px-2.5 py-1">
            {dual(language, "Last checked", "上次检查")}:{" "}
            {new Intl.DateTimeFormat("en-AU", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(lastAttemptAt))}
          </span>
        )}
        {result?.generatedAt && (
          <span className="rounded-md border border-stone-200 bg-white px-2.5 py-1">
            {dual(language, "AI generated", "AI 生成")}:{" "}
            {new Intl.DateTimeFormat("en-AU", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(result.generatedAt))}
          </span>
        )}
        {result?.cached && (
          <span className="rounded-md border border-emerald-200 bg-white px-2.5 py-1 text-emerald-800">
            {dual(language, "Cached result", "缓存结果")}
          </span>
        )}
      </div>

      {loading && !result && (
        <div className="mt-4 rounded-md border border-emerald-200 bg-white px-4 py-3 text-sm leading-6 text-emerald-900">
          {dual(
            language,
            "Searching public sources and preparing a rulebook-based analysis...",
            "正在搜索公开信息，并生成基于规则库的分析...",
          )}
        </div>
      )}

      {result?.error && (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          {result.error}
        </div>
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
