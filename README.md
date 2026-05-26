# Easy Investment

Easy Investment is a bilingual AI investment research assistant MVP for beginner and retail investors. It uses demo data first: no paid market data, no real news API, no trading, no brokerage connection, no direct buy/sell/hold recommendations, and no target prices.

The app explains news through an original Financial Impact Rulebook based on standard professional finance concepts. It does not store, quote, reproduce, or distribute copyrighted curriculum or textbook material.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Demo login/register screen with no required authentication
- Supabase PostgreSQL schema and seed SQL
- Demo data-first architecture

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows PowerShell, if script execution blocks `npm`, use:

```powershell
npm.cmd install
npm.cmd run dev
```

## Supabase Setup Later

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Run `supabase/schema.sql` in the Supabase SQL editor.
5. Run `supabase/seed.sql` to load demo news, demo analyses, and the Financial Impact Rulebook.

The deployed demo currently runs from local demo data and does not require Supabase environment variables. The Supabase client and SQL files are included so Auth and PostgreSQL persistence can be added later.

## Deploy to Vercel

1. Push this project to GitHub:

```bash
git init
git add .
git commit -m "Initial Easy Investment MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/easy-investment.git
git push -u origin main
```

2. Import the GitHub repository into Vercel:

- Open [https://vercel.com/new](https://vercel.com/new).
- Choose the `easy-investment` repository.
- Keep the framework preset as `Next.js`.
- Leave environment variables empty for the demo version.

3. Deploy:

- Click `Deploy`.
- Vercel will install dependencies and run `npm run build`.
- After deployment, open the generated Vercel URL.

The public demo does not require authentication and does not connect to Supabase, OpenAI, brokerages, paid market data, or real news APIs.

## Main Routes

- `/login` - login/register with language preference
- `/dashboard` - portfolio and watchlist overview
- `/add-stock` - add a portfolio holding or watchlist item
- `/stock/[ticker]` - stock detail and news impact analysis
- `/stocks/[ticker]` - legacy stock detail alias
- `/developer/rules` - financial rules developer view

## Future Integration Points

- `src/lib/supabase/client.ts` contains the browser Supabase client factory.
- `src/lib/analysis.ts` contains `generateAnalysisFromRule(newsItem, financialRule, userPortfolio, languagePreference)`.
- `src/lib/demo-data.ts` isolates demo market/news/rule data so real news and OpenAI API calls can replace it later.

## Product Guardrails

Easy Investment provides educational, theoretical impact analysis only. It does not provide personalised financial advice, trading instructions, direct recommendations, brokerage execution, target prices, or portfolio suitability conclusions.
