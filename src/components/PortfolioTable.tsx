"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImpactBadge } from "@/components/ImpactBadge";
import { dual } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";
import type { PortfolioRow } from "@/lib/types";

export function PortfolioTable({ rows }: { rows: PortfolioRow[] }) {
  const { language } = useLanguage();

  return (
    <section className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-stone-950">
          {dual(language, "My holdings / Watchlist", "我的持仓 / 观察名单")}
        </h2>
      </div>

      <div className="table-scroll overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-xs uppercase tracking-normal text-stone-500">
              <th className="py-3 pr-4 font-semibold">{dual(language, "Ticker", "代码")}</th>
              <th className="py-3 pr-4 font-semibold">{dual(language, "Company", "公司")}</th>
              <th className="py-3 pr-4 font-semibold">{dual(language, "Market", "市场")}</th>
              <th className="py-3 pr-4 font-semibold">{dual(language, "Type", "类型")}</th>
              <th className="py-3 pr-4 font-semibold">{dual(language, "Today", "今日")}</th>
              <th className="py-3 pr-4 font-semibold">{dual(language, "News", "新闻")}</th>
              <th className="py-3 pr-4 font-semibold">{dual(language, "AI impact", "AI 影响")}</th>
              <th className="py-3 pr-0 font-semibold">{dual(language, "Action", "操作")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-stone-100 last:border-0">
                <td className="py-3 pr-4 font-semibold text-stone-950">{row.ticker}</td>
                <td className="py-3 pr-4 text-stone-700">{row.company_name}</td>
                <td className="py-3 pr-4 text-stone-700">{row.market}</td>
                <td className="py-3 pr-4">
                  <span className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-semibold text-stone-700">
                    {dual(
                      language,
                      row.position_type,
                      row.position_type === "Portfolio" ? "持仓" : "观察",
                    )}
                  </span>
                </td>
                <td
                  className={`py-3 pr-4 font-semibold ${
                    row.today_change_percent >= 0 ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {row.today_change_percent >= 0 ? "+" : ""}
                  {row.today_change_percent.toFixed(1)}%
                </td>
                <td className="py-3 pr-4 text-stone-700">{row.latest_news_count}</td>
                <td className="py-3 pr-4">
                  <ImpactBadge impact={row.latest_ai_impact} language={language} />
                </td>
                <td className="py-3 pr-0">
                  <Link
                    href={`/stock/${encodeURIComponent(row.ticker)}`}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-stone-300 bg-white px-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
                  >
                    {dual(language, "View", "查看")}
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
