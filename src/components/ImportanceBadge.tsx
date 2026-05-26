import clsx from "clsx";
import { displayImportance } from "@/lib/analysis";
import type { Importance, LanguagePreference } from "@/lib/types";

const styles: Record<Importance, string> = {
  High: "border-red-200 bg-red-50 text-red-800",
  Medium: "border-blue-200 bg-blue-50 text-blue-800",
  Low: "border-stone-200 bg-stone-50 text-stone-700",
};

export function ImportanceBadge({
  importance,
  language = "English",
}: {
  importance: Importance;
  language?: LanguagePreference;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold",
        styles[importance],
      )}
    >
      {displayImportance(importance, language)}
    </span>
  );
}
