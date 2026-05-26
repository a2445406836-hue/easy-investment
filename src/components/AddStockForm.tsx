"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { saveStockInput } from "@/lib/storage";
import type { Market } from "@/lib/types";
import { dual } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

const markets: { value: Market; label: string }[] = [
  { value: "ASX", label: "ASX Australia" },
  { value: "US", label: "US stocks" },
  { value: "HK", label: "Hong Kong stocks" },
  { value: "SG", label: "Singapore stocks" },
  { value: "CN", label: "China A-shares" },
];

export function AddStockForm() {
  const router = useRouter();
  const { language } = useLanguage();
  const [addAs, setAddAs] = useState<"Watchlist" | "Portfolio">("Watchlist");
  const [ticker, setTicker] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [market, setMarket] = useState<Market>("ASX");
  const [quantity, setQuantity] = useState("");
  const [averageBuyPrice, setAverageBuyPrice] = useState("");
  const [currency, setCurrency] = useState("AUD");
  const [investmentThesis, setInvestmentThesis] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveStockInput({
      ticker,
      company_name: companyName,
      market,
      add_as: addAs,
      quantity: quantity ? Number(quantity) : undefined,
      average_buy_price: averageBuyPrice ? Number(averageBuyPrice) : undefined,
      currency,
      investment_thesis: investmentThesis,
    });
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-normal text-stone-950">
          {dual(language, "Add stock / portfolio", "添加股票 / 组合")}
        </h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          {dual(
            language,
            "Manual entry for the MVP. Data is stored in this browser for demo use.",
            "MVP 阶段使用手动输入。数据会保存在当前浏览器用于演示。",
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-stone-700">
              {dual(language, "Ticker", "股票代码")}
            </span>
            <input
              required
              value={ticker}
              onChange={(event) => setTicker(event.target.value.toUpperCase())}
              className="h-11 w-full rounded-md border border-stone-300 px-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              placeholder="AAPL"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-stone-700">
              {dual(language, "Company name", "公司名称")}
            </span>
            <input
              required
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="h-11 w-full rounded-md border border-stone-300 px-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              placeholder="Apple Inc."
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-stone-700">
              {dual(language, "Market", "市场")}
            </span>
            <select
              value={market}
              onChange={(event) => setMarket(event.target.value as Market)}
              className="h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              {markets.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-stone-700">
              {dual(language, "Add as", "添加为")}
            </span>
            <select
              value={addAs}
              onChange={(event) => setAddAs(event.target.value as typeof addAs)}
              className="h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="Watchlist">{dual(language, "Watchlist only", "仅观察名单")}</option>
              <option value="Portfolio">{dual(language, "Portfolio holding", "组合持仓")}</option>
            </select>
          </label>
        </div>

        {addAs === "Portfolio" && (
          <div className="mt-5 grid gap-4 border-t border-stone-200 pt-5 sm:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-stone-700">
                {dual(language, "Quantity", "数量")}
              </span>
              <input
                required
                type="number"
                min="0"
                step="0.0001"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="h-11 w-full rounded-md border border-stone-300 px-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-stone-700">
                {dual(language, "Average buy price", "平均买入价")}
              </span>
              <input
                required
                type="number"
                min="0"
                step="0.0001"
                value={averageBuyPrice}
                onChange={(event) => setAverageBuyPrice(event.target.value)}
                className="h-11 w-full rounded-md border border-stone-300 px-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-stone-700">
                {dual(language, "Currency", "货币")}
              </span>
              <input
                required
                value={currency}
                onChange={(event) => setCurrency(event.target.value.toUpperCase())}
                className="h-11 w-full rounded-md border border-stone-300 px-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                placeholder="AUD"
              />
            </label>

            <label className="space-y-2 sm:col-span-3">
              <span className="text-sm font-semibold text-stone-700">
                {dual(language, "Optional investment thesis", "可选投资逻辑")}
              </span>
              <textarea
                value={investmentThesis}
                onChange={(event) => setInvestmentThesis(event.target.value)}
                rows={4}
                className="w-full rounded-md border border-stone-300 px-3 py-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                placeholder={dual(
                  language,
                  "Example: I am watching this company because of long-term revenue growth and margin expansion.",
                  "例如：我关注这家公司是因为长期收入增长和利润率提升。",
                )}
              />
            </label>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            <Save size={16} aria-hidden />
            {dual(language, "Save", "保存")}
          </button>
        </div>
      </form>
    </div>
  );
}
