"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  getDemoRows,
  getEstimatedPortfolioValue,
  getImportantUpdates,
} from "@/lib/demo-data";
import { loadStoredPortfolioRows } from "@/lib/storage";
import { useLanguage } from "@/components/LanguageProvider";
import { dual } from "@/lib/i18n";
import { PortfolioOverviewCard } from "@/components/PortfolioOverviewCard";
import { ImportantUpdatesList } from "@/components/ImportantUpdatesList";
import { PortfolioTable } from "@/components/PortfolioTable";

export function DashboardClient() {
  const { language } = useLanguage();
  const rows = useMemo(() => [...getDemoRows(), ...loadStoredPortfolioRows()], []);
  const updates = useMemo(() => getImportantUpdates(language), [language]);
  const totalValue = getEstimatedPortfolioValue(rows);
  const holdingsCount = rows.filter((row) => row.position_type === "Portfolio").length;
  const watchlistCount = rows.filter((row) => row.position_type === "Watchlist").length;
  const todayChange =
    rows.reduce((sum, row) => sum + row.today_change_percent, 0) / Math.max(rows.length, 1);

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal text-stone-950">
            {dual(language, "Portfolio dashboard", "组合仪表盘")}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
            {dual(
              language,
              "A calm research view for what changed today, why it matters, and which finance rules are involved.",
              "用更清晰的方式查看今天发生了什么、为什么重要，以及对应哪些财务规则。",
            )}
          </p>
        </div>
        <Link
          href="/add-stock"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
        >
          <Plus size={16} aria-hidden />
          {dual(language, "Add stock", "添加股票")}
        </Link>
      </section>

      <PortfolioOverviewCard
        totalValue={totalValue}
        todayChange={todayChange}
        holdingsCount={holdingsCount}
        watchlistCount={watchlistCount}
        importantUpdatesCount={updates.length}
      />

      <section className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-normal text-stone-500">
          {dual(language, "AI portfolio summary", "AI 组合摘要")}
        </p>
        <p className="mt-2 text-lg leading-8 text-stone-900">
          {dual(
            language,
            "Today, 2 holdings have important updates. CSL has a mixed impact update related to restructuring. BHP is negatively affected by weaker iron ore prices. These are theoretical impacts, not trade instructions.",
            "今天有 2 个持仓出现重要更新。CSL 的重组消息理论影响为好坏参半；BHP 受到铁矿石价格下跌和中国需求偏弱的负面影响。这些是理论影响分析，不是交易指令。",
          )}
        </p>
      </section>

      <ImportantUpdatesList updates={updates} />
      <PortfolioTable rows={rows} />
    </div>
  );
}
