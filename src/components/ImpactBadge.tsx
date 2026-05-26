import clsx from "clsx";
import { displayImpact } from "@/lib/analysis";
import type { LanguagePreference, TheoreticalImpact } from "@/lib/types";

const styles: Record<TheoreticalImpact, string> = {
  Positive: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Negative: "border-rose-200 bg-rose-50 text-rose-800",
  Mixed: "border-amber-200 bg-amber-50 text-amber-800",
  Neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

export function ImpactBadge({
  impact,
  language = "English",
}: {
  impact: TheoreticalImpact;
  language?: LanguagePreference;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold",
        styles[impact],
      )}
    >
      {displayImpact(impact, language)}
    </span>
  );
}
