"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Code2, Plus, ShieldCheck } from "lucide-react";
import clsx from "clsx";
import { LanguageSelector } from "@/components/LanguageSelector";
import { dual } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

const navItems = [
  { href: "/dashboard", label: "Dashboard", zh: "仪表盘", icon: BarChart3 },
  { href: "/add-stock", label: "Add stock", zh: "添加股票", icon: Plus },
  { href: "/developer/rules", label: "Rules", zh: "规则", icon: Code2 },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Link href="/dashboard" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-700 text-white">
                <ShieldCheck size={20} aria-hidden />
              </span>
              <div>
                <p className="text-xl font-semibold tracking-normal text-stone-950">
                  Easy Investment
                </p>
                <p className="text-xs font-medium uppercase tracking-normal text-stone-500">
                  Research assistant MVP
                </p>
              </div>
            </Link>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <LanguageSelector />
              <div className="rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-medium text-stone-700">
                Demo user
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition",
                    active
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50",
                  )}
                >
                  <Icon size={16} aria-hidden />
                  {dual(language, item.label, item.zh)}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>

      <footer className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-md border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">
          {dual(
            language,
            "Educational theoretical impact analysis only. No trades, target prices, or buy/sell/hold recommendations.",
            "仅用于教育性质的理论影响分析。不执行交易，不提供目标价，也不提供买入、卖出或持有建议。",
          )}
        </div>
      </footer>
    </div>
  );
}
