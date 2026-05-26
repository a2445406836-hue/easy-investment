"use client";

import { dual } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";
import type { DemoStock, PortfolioItem } from "@/lib/types";

export function UserPositionCard({
  stock,
  portfolioItem,
}: {
  stock: DemoStock;
  portfolioItem: PortfolioItem | null;
}) {
  const { language } = useLanguage();

  if (!portfolioItem) {
    return (
      <section className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-950">
          {dual(language, "User position", "用户持仓")}
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          {dual(
            language,
            "No portfolio holding is recorded for this stock. Analysis is shown as watchlist research.",
            "该股票当前没有记录持仓。分析会作为观察名单研究展示。",
          )}
        </p>
      </section>
    );
  }

  const estimatedValue = portfolioItem.quantity * stock.current_price;
  const cost = portfolioItem.quantity * portfolioItem.average_buy_price;
  const gainLoss = estimatedValue - cost;

  return (
    <section className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-950">
        {dual(language, "User position", "用户持仓")}
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label={dual(language, "Quantity", "数量")} value={portfolioItem.quantity.toString()} />
        <Metric
          label={dual(language, "Average buy price", "平均买入价")}
          value={`${portfolioItem.currency} ${portfolioItem.average_buy_price.toFixed(2)}`}
        />
        <Metric
          label={dual(language, "Estimated value", "估算价值")}
          value={`${portfolioItem.currency} ${estimatedValue.toFixed(2)}`}
        />
        <Metric
          label={dual(language, "Unrealised gain/loss", "未实现盈亏")}
          value={`${gainLoss >= 0 ? "+" : ""}${portfolioItem.currency} ${gainLoss.toFixed(2)}`}
          tone={gainLoss >= 0 ? "text-emerald-700" : "text-rose-700"}
        />
      </div>
      {portfolioItem.investment_thesis && (
        <div className="mt-4 rounded-md border border-stone-200 bg-stone-50 p-4">
          <p className="text-sm font-semibold text-stone-700">
            {dual(language, "Investment thesis", "投资逻辑")}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-700">
            {portfolioItem.investment_thesis}
          </p>
        </div>
      )}
    </section>
  );
}

function Metric({
  label,
  value,
  tone = "text-stone-950",
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="rounded-md border border-stone-200 bg-stone-50 p-4">
      <p className="text-sm font-medium text-stone-500">{label}</p>
      <p className={`mt-2 text-lg font-semibold ${tone}`}>{value}</p>
    </div>
  );
}
