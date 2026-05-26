"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { LanguagePreference } from "@/lib/types";

interface LanguageContextValue {
  language: LanguagePreference;
  setLanguage: (language: LanguagePreference) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "easy-investment-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguagePreference>("English");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as LanguagePreference | null;
    if (saved === "English" || saved === "Chinese" || saved === "Bilingual") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((nextLanguage: LanguagePreference) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return value;
}
