"use client";

import type { Market, PortfolioItem, PortfolioRow, WatchlistItem } from "@/lib/types";

const STORAGE_KEY = "easy-investment-user-items";
const DEMO_USER_ID = "demo-user";

export interface StoredStockInput {
  ticker: string;
  market: Market;
  company_name: string;
  add_as: "Watchlist" | "Portfolio";
  quantity?: number;
  average_buy_price?: number;
  currency?: string;
  investment_thesis?: string;
}

interface StoredItems {
  portfolio: PortfolioItem[];
  watchlist: WatchlistItem[];
}

function readItems(): StoredItems {
  if (typeof window === "undefined") {
    return { portfolio: [], watchlist: [] };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return { portfolio: [], watchlist: [] };

  try {
    return JSON.parse(raw) as StoredItems;
  } catch {
    return { portfolio: [], watchlist: [] };
  }
}

function writeItems(items: StoredItems) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function saveStockInput(input: StoredStockInput) {
  const items = readItems();
  const id = `local-${input.market}-${input.ticker.toUpperCase()}`;
  const created_at = new Date().toISOString();

  items.portfolio = items.portfolio.filter((item) => item.id !== id);
  items.watchlist = items.watchlist.filter((item) => item.id !== id);

  if (input.add_as === "Portfolio") {
    items.portfolio.push({
      id,
      user_id: DEMO_USER_ID,
      ticker: input.ticker.toUpperCase(),
      market: input.market,
      company_name: input.company_name,
      quantity: Number(input.quantity ?? 0),
      average_buy_price: Number(input.average_buy_price ?? 0),
      currency: input.currency || "USD",
      investment_thesis: input.investment_thesis,
      created_at,
    });
  } else {
    items.watchlist.push({
      id,
      user_id: DEMO_USER_ID,
      ticker: input.ticker.toUpperCase(),
      market: input.market,
      company_name: input.company_name,
      created_at,
    });
  }

  writeItems(items);
}

export function loadStoredPortfolioRows(): PortfolioRow[] {
  const items = readItems();

  return [
    ...items.portfolio.map((item) => ({
      id: item.id,
      ticker: item.ticker,
      market: item.market,
      company_name: item.company_name,
      position_type: "Portfolio" as const,
      today_change_percent: 0,
      latest_news_count: 0,
      latest_ai_impact: "Neutral" as const,
      quantity: item.quantity,
      average_buy_price: item.average_buy_price,
      currency: item.currency,
      investment_thesis: item.investment_thesis,
    })),
    ...items.watchlist.map((item) => ({
      id: item.id,
      ticker: item.ticker,
      market: item.market,
      company_name: item.company_name,
      position_type: "Watchlist" as const,
      today_change_percent: 0,
      latest_news_count: 0,
      latest_ai_impact: "Neutral" as const,
    })),
  ];
}

export function loadStoredPortfolioItem(ticker: string) {
  const items = readItems();
  return items.portfolio.find((item) => item.ticker.toUpperCase() === ticker.toUpperCase()) ?? null;
}
