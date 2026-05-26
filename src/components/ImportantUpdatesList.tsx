"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImpactBadge } from "@/components/ImpactBadge";
import { ImportanceBadge } from "@/components/ImportanceBadge";
import { dual } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";
import type { AIAnalysis, NewsItem } from "@/lib/types";

export function ImportantUpdatesList({
  updates,
}: {
  updates: { newsItem: NewsItem; analysis: AIAnalysis }[];
}) {
  const { language } = useLanguage();

  return (
    <section className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-stone-950">
            {dual(language, "Important updates", "重要更新")}
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            {dual(
              language,
              "Prioritised by theoretical impact and importance.",
              "根据理论影响和重要性排序。",
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {updates.map(({ newsItem, analysis }) => (
          <article
            key={newsItem.id}
            className="rounded-md border border-stone-200 bg-stone-50 p-4"
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-stone-700">
                {newsItem.ticker}
              </span>
              <ImpactBadge impact={analysis.theoretical_impact} language={language} />
              <ImportanceBadge importance={analysis.importance} language={language} />
            </div>
            <h3 className="mt-3 text-base font-semibold text-stone-950">{newsItem.title}</h3>
            <p className="mt-1 text-sm text-stone-600">{newsItem.company_name}</p>
            <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-6 text-stone-700">
              {analysis.beginner_friendly_summary}
            </p>
            <Link
              href={`/stock/${encodeURIComponent(newsItem.ticker)}`}
              className="mt-4 inline-flex h-9 items-center gap-2 rounded-md bg-stone-950 px-3 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              {dual(language, "View detail", "查看详情")}
              <ArrowRight size={15} aria-hidden />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
