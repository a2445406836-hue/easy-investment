"use client";

import { languages } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
      <span>Language</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value as typeof language)}
        className="h-10 rounded-md border border-stone-300 bg-white px-3 text-sm text-stone-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      >
        {languages.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
