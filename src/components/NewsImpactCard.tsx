"use client";

import { CalendarDays, ExternalLink, Newspaper } from "lucide-react";
import { ImpactBadge } from "@/components/ImpactBadge";
import { ImportanceBadge } from "@/components/ImportanceBadge";
import { dual } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";
import type { AIAnalysis, NewsItem } from "@/lib/types";

const fields: { key: keyof AIAnalysis; label: string; zh: string }[] = [
  { key: "short_term_impact", label: "Short-term impact", zh: "短期影响" },
  { key: "long_term_impact", label: "Long-term impact", zh: "长期影响" },
  {
    key: "affected_valuation_drivers",
    label: "Affected valuation drivers",
    zh: "受影响估值驱动因素",
  },
  { key: "dcf_valuation_implication", label: "DCF / valuation implication", zh: "DCF / 估值含义" },
  { key: "portfolio_relevance", label: "Portfolio relevance", zh: "组合相关性" },
  { key: "key_risks", label: "Key risks", zh: "主要风险" },
  { key: "professional_explanation", label: "Professional explanation", zh: "专业解释" },
  { key: "beginner_friendly_summary", label: "Beginner-friendly summary", zh: "新手友好总结" },
];

export function NewsImpactCard({
  newsItem,
  analysis,
}: {
  newsItem: NewsItem;
  analysis: AIAnalysis;
}) {
  const { language } = useLanguage();

  return (
    <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            <ImpactBadge impact={analysis.theoretical_impact} language={language} />
            <ImportanceBadge importance={analysis.importance} language={language} />
          </div>
          <h3 className="mt-3 text-xl font-semibold leading-7 text-stone-950">
            {newsItem.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-stone-600">
            <span className="inline-flex items-center gap-1.5">
              <Newspaper size={15} aria-hidden />
              {newsItem.source}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={15} aria-hidden />
              {new Intl.DateTimeFormat("en-AU", { dateStyle: "medium" }).format(
                new Date(newsItem.published_at),
              )}
            </span>
            {newsItem.url && newsItem.url !== "#" && (
              <a
                href={newsItem.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-emerald-800 hover:text-emerald-900"
              >
                {dual(language, "Source", "来源")}
                <ExternalLink size={14} aria-hidden />
              </a>
            )}
          </div>
        </div>

        <div className="min-w-52 rounded-md border border-stone-200 bg-stone-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-normal text-stone-500">
            {dual(language, "Event type", "事件类型")}
          </p>
          <p className="mt-1 text-sm font-semibold text-stone-900">{analysis.event_type}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {fields.map((field) => (
          <div key={field.key} className="rounded-md border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-semibold text-stone-900">
              {dual(language, field.label, field.zh)}
            </p>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-700">
              {String(analysis[field.key])}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
