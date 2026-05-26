"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getAnalysesForTicker,
  getNewsForTicker,
  getPortfolioItemByTicker,
  getStockByTicker,
} from "@/lib/demo-data";
import { loadStoredPortfolioItem } from "@/lib/storage";
import { useLanguage } from "@/components/LanguageProvider";
import { dual } from "@/lib/i18n";
import { StockHeader } from "@/components/StockHeader";
import { UserPositionCard } from "@/components/UserPositionCard";
import { NewsImpactCard } from "@/components/NewsImpactCard";
import { ThesisTracker } from "@/components/ThesisTracker";
import type { DemoStock } from "@/lib/types";

export function StockDetailClient({ ticker }: { ticker: string }) {
  const { language } = useLanguage();
  const stock =
    getStockByTicker(ticker) ??
    ({
      ticker: ticker.toUpperCase(),
      market: "US",
      company_name: ticker.toUpperCase(),
      currency: "USD",
      current_price: 0,
      today_change_percent: 0,
      sector: "User-added stock",
    } satisfies DemoStock);
  const storedPortfolioItem = loadStoredPortfolioItem(ticker);
  const portfolioItem = storedPortfolioItem ?? getPortfolioItemByTicker(ticker);
  const newsItems = getNewsForTicker(ticker);
  const analyses = getAnalysesForTicker(ticker, language, portfolioItem);
  const firstThesisEffect = analyses[0]?.thesis_effect ?? "Unclear";

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex h-10 items-center gap-2 rounded-md border border-stone-300 bg-white px-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
      >
        <ArrowLeft size={15} aria-hidden />
        {dual(language, "Back to dashboard", "返回仪表盘")}
      </Link>

      <StockHeader stock={stock} />
      <UserPositionCard stock={stock} portfolioItem={portfolioItem} />
      <ThesisTracker thesis={portfolioItem?.investment_thesis} thesisEffect={firstThesisEffect} />

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-stone-950">
            {dual(language, "Latest news impact cards", "最新新闻影响卡片")}
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            {dual(
              language,
              "Each card follows the rulebook-based AI output template.",
              "每张卡片都遵循基于规则库的 AI 输出模板。",
            )}
          </p>
        </div>

        {newsItems.length === 0 ? (
          <div className="rounded-md border border-stone-200 bg-white p-5 text-sm text-stone-600 shadow-sm">
            {dual(
              language,
              "No demo news is available for this user-added stock yet.",
              "该用户添加股票暂无演示新闻。",
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {newsItems.map((newsItem, index) => (
              <NewsImpactCard
                key={newsItem.id}
                newsItem={newsItem}
                analysis={analyses[index]}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
