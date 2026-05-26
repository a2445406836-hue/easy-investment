create extension if not exists "pgcrypto";

create table if not exists public.users_profile (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  language_preference text check (language_preference in ('English', 'Chinese', 'Bilingual')),
  created_at timestamp with time zone default now()
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  ticker text not null,
  market text not null check (market in ('ASX', 'US', 'HK', 'SG', 'CN')),
  company_name text not null,
  quantity numeric,
  average_buy_price numeric,
  currency text,
  investment_thesis text,
  created_at timestamp with time zone default now()
);

create table if not exists public.watchlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  ticker text not null,
  market text not null check (market in ('ASX', 'US', 'HK', 'SG', 'CN')),
  company_name text not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  ticker text not null,
  market text not null check (market in ('ASX', 'US', 'HK', 'SG', 'CN')),
  company_name text not null,
  title text not null,
  source text,
  url text,
  published_at timestamp with time zone,
  raw_summary text,
  created_at timestamp with time zone default now()
);

create table if not exists public.ai_analyses (
  id uuid primary key default gen_random_uuid(),
  news_item_id uuid references public.news_items(id) on delete cascade,
  ticker text not null,
  market text not null check (market in ('ASX', 'US', 'HK', 'SG', 'CN')),
  event_type text not null,
  theoretical_impact text not null check (theoretical_impact in ('Positive', 'Negative', 'Mixed', 'Neutral')),
  importance text not null check (importance in ('High', 'Medium', 'Low')),
  short_term_impact text,
  long_term_impact text,
  affected_valuation_drivers text,
  dcf_valuation_implication text,
  portfolio_relevance text,
  key_risks text,
  professional_explanation text,
  beginner_friendly_summary text,
  thesis_effect text check (thesis_effect in ('Supports thesis', 'Weakens thesis', 'Neutral to thesis', 'Unclear')),
  language text check (language in ('English', 'Chinese', 'Bilingual')),
  created_at timestamp with time zone default now()
);

create table if not exists public.financial_rules (
  id uuid primary key default gen_random_uuid(),
  rule_id text not null unique,
  category text not null,
  event_type text not null,
  typical_short_term_impact text,
  typical_long_term_impact text,
  affected_valuation_drivers text,
  dcf_valuation_implication text,
  professional_logic text,
  key_risks text,
  portfolio_relevance text,
  beginner_friendly_summary text,
  created_at timestamp with time zone default now()
);

alter table public.users_profile enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.watchlist_items enable row level security;
alter table public.news_items enable row level security;
alter table public.ai_analyses enable row level security;
alter table public.financial_rules enable row level security;

create policy "Users can read own profile"
  on public.users_profile for select
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.users_profile for insert
  with check (auth.uid() = user_id);

create policy "Users can manage own portfolio"
  on public.portfolio_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage own watchlist"
  on public.watchlist_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Authenticated users can read news"
  on public.news_items for select
  to authenticated
  using (true);

create policy "Authenticated users can read analyses"
  on public.ai_analyses for select
  to authenticated
  using (true);

create policy "Authenticated users can read financial rules"
  on public.financial_rules for select
  to authenticated
  using (true);

create index if not exists idx_portfolio_items_user_id on public.portfolio_items(user_id);
create index if not exists idx_watchlist_items_user_id on public.watchlist_items(user_id);
create index if not exists idx_news_items_ticker_market on public.news_items(ticker, market);
create index if not exists idx_ai_analyses_news_item_id on public.ai_analyses(news_item_id);
create index if not exists idx_financial_rules_rule_id on public.financial_rules(rule_id);
