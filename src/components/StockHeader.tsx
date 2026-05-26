"use client";

import { dual } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";
import type { DemoStock } from "@/lib/types";

export function StockHeader({ stock }: { stock: DemoStock }) {
  const { language } = useLanguage();

  return (
    <section className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-stone-950 px-3 py-1 text-sm font-semibold text-white">
              {stock.ticker}
            </span>
            <span className="rounded-md border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-semibold text-stone-700">
              {stock.market}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-stone-950">
            {stock.company_name}
          </h1>
          <p className="mt-2 text-sm text-stone-600">{stock.sector}</p>
        </div>

        <div className="grid min-w-56 gap-2 rounded-md border border-stone-200 bg-stone-50 p-4">
          <p className="text-sm font-medium text-stone-500">
            {dual(language, "Current price", "当前价格")}
          </p>
          <p className="text-2xl font-semibold text-stone-950">
            {stock.currency} {stock.current_price.toFixed(2)}
          </p>
          <p
            className={`text-sm font-semibold ${
              stock.today_change_percent >= 0 ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {stock.today_change_percent >= 0 ? "+" : ""}
            {stock.today_change_percent.toFixed(1)}% {dual(language, "today", "今日")}
          </p>
        </div>
      </div>
    </section>
  );
}
