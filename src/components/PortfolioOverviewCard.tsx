"use client";

import { Activity, Bell, Eye, WalletCards } from "lucide-react";
import { dual } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function PortfolioOverviewCard({
  totalValue,
  todayChange,
  holdingsCount,
  watchlistCount,
  importantUpdatesCount,
}: {
  totalValue: number;
  todayChange: number;
  holdingsCount: number;
  watchlistCount: number;
  importantUpdatesCount: number;
}) {
  const { language } = useLanguage();
  const items = [
    {
      label: dual(language, "Total portfolio value", "组合总价值"),
      value: formatCurrency(totalValue),
      icon: WalletCards,
      tone: "text-emerald-700 bg-emerald-50",
    },
    {
      label: dual(language, "Today change", "今日变化"),
      value: `${todayChange >= 0 ? "+" : ""}${todayChange.toFixed(2)}%`,
      icon: Activity,
      tone: todayChange >= 0 ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50",
    },
    {
      label: dual(language, "Holdings", "持仓"),
      value: String(holdingsCount),
      icon: WalletCards,
      tone: "text-blue-700 bg-blue-50",
    },
    {
      label: dual(language, "Watchlist", "观察名单"),
      value: String(watchlistCount),
      icon: Eye,
      tone: "text-stone-700 bg-stone-100",
    },
    {
      label: dual(language, "Important updates", "重要更新"),
      value: String(importantUpdatesCount),
      icon: Bell,
      tone: "text-amber-700 bg-amber-50",
    },
  ];

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="rounded-md border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-stone-500">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-stone-950">{item.value}</p>
              </div>
              <span className={`flex h-9 w-9 items-center justify-center rounded-md ${item.tone}`}>
                <Icon size={18} aria-hidden />
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
