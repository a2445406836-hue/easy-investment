"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { financialRules } from "@/lib/demo-data";
import { dual } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export function FinancialRulesTable() {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const filteredRules = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return financialRules;
    return financialRules.filter((rule) =>
      [
        rule.rule_id,
        rule.category,
        rule.event_type,
        rule.affected_valuation_drivers,
        rule.dcf_valuation_implication,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-3xl font-semibold tracking-normal text-stone-950">
          {dual(language, "Financial rules admin", "财务规则开发视图")}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
          {dual(
            language,
            "Developer-only view for checking that the original Financial Impact Rulebook V1 is loaded.",
            "仅供 MVP 开发使用，用于检查原创 Financial Impact Rulebook V1 是否已加载。",
          )}
        </p>
      </section>

      <div className="rounded-md border border-stone-200 bg-white p-4 shadow-sm">
        <label className="flex h-11 items-center gap-2 rounded-md border border-stone-300 bg-white px-3">
          <Search size={16} className="text-stone-500" aria-hidden />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dual(language, "Search rules", "搜索规则")}
            className="h-full flex-1 border-0 bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      <section className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
        <div className="table-scroll overflow-x-auto">
          <table className="min-w-[1200px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-normal text-stone-500">
                <th className="py-3 pr-4 font-semibold">rule_id</th>
                <th className="py-3 pr-4 font-semibold">category</th>
                <th className="py-3 pr-4 font-semibold">event_type</th>
                <th className="py-3 pr-4 font-semibold">typical_short_term_impact</th>
                <th className="py-3 pr-4 font-semibold">typical_long_term_impact</th>
                <th className="py-3 pr-4 font-semibold">affected_valuation_drivers</th>
                <th className="py-3 pr-4 font-semibold">dcf_valuation_implication</th>
                <th className="py-3 pr-0 font-semibold">beginner_friendly_summary</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="border-b border-stone-100 align-top last:border-0">
                  <td className="py-3 pr-4 font-semibold text-stone-950">{rule.rule_id}</td>
                  <td className="py-3 pr-4 text-stone-700">{rule.category}</td>
                  <td className="py-3 pr-4 text-stone-700">{rule.event_type}</td>
                  <td className="py-3 pr-4 text-stone-700">{rule.typical_short_term_impact}</td>
                  <td className="py-3 pr-4 text-stone-700">{rule.typical_long_term_impact}</td>
                  <td className="py-3 pr-4 text-stone-700">{rule.affected_valuation_drivers}</td>
                  <td className="py-3 pr-4 text-stone-700">{rule.dcf_valuation_implication}</td>
                  <td className="py-3 pr-0 text-stone-700">{rule.beginner_friendly_summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
