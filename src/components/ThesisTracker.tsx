"use client";

import clsx from "clsx";
import { displayThesisEffect } from "@/lib/analysis";
import { dual } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";
import type { ThesisEffect } from "@/lib/types";

const styles: Record<ThesisEffect, string> = {
  "Supports thesis": "border-emerald-200 bg-emerald-50 text-emerald-800",
  "Weakens thesis": "border-rose-200 bg-rose-50 text-rose-800",
  "Neutral to thesis": "border-slate-200 bg-slate-50 text-slate-700",
  Unclear: "border-amber-200 bg-amber-50 text-amber-800",
};

export function ThesisTracker({
  thesis,
  thesisEffect,
}: {
  thesis?: string;
  thesisEffect: ThesisEffect;
}) {
  const { language } = useLanguage();

  return (
    <section className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-950">
        {dual(language, "Thesis tracker", "投资逻辑追踪")}
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={clsx(
            "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold",
            styles[thesisEffect],
          )}
        >
          {displayThesisEffect(thesisEffect, language)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        {thesis
          ? dual(
              language,
              "The latest mapped rule is compared with the user-written thesis. This is a research prompt, not a suitability judgement.",
              "最新映射规则会与用户写下的投资逻辑进行对照。这是研究提示，不是适合性判断。",
            )
          : dual(
              language,
              "No investment thesis is recorded, so thesis effect is unclear.",
              "当前没有记录投资逻辑，因此影响不明确。",
            )}
      </p>
    </section>
  );
}
