import type { LanguagePreference } from "@/lib/types";

export const languages: LanguagePreference[] = ["English", "Chinese", "Bilingual"];

export function dual(language: LanguagePreference, english: string, chinese: string) {
  if (language === "Chinese") return chinese;
  if (language === "Bilingual") return `${english} / ${chinese}`;
  return english;
}

export function formatLanguageText(
  language: LanguagePreference,
  english: string,
  chinese: string,
) {
  if (language === "Chinese") return chinese;
  if (language === "Bilingual") return `${english}\n\n${chinese}`;
  return english;
}

export function impactToChinese(impact: string) {
  const map: Record<string, string> = {
    Positive: "正面",
    Negative: "负面",
    Mixed: "好坏参半",
    Neutral: "中性",
  };
  return map[impact] ?? impact;
}

export function importanceToChinese(importance: string) {
  const map: Record<string, string> = {
    High: "高",
    Medium: "中",
    Low: "低",
  };
  return map[importance] ?? importance;
}

export function thesisEffectToChinese(effect: string) {
  const map: Record<string, string> = {
    "Supports thesis": "支持投资逻辑",
    "Weakens thesis": "削弱投资逻辑",
    "Neutral to thesis": "对投资逻辑中性",
    Unclear: "影响不明确",
  };
  return map[effect] ?? effect;
}
