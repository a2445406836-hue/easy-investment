"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import type { LanguagePreference } from "@/lib/types";
import { languages } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export function LoginForm() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as
      | HTMLButtonElement
      | null;
    const mode = submitter?.value === "register" ? "register" : "login";
    window.localStorage.setItem("easy-investment-demo-email", email);
    window.localStorage.setItem("easy-investment-demo-mode", mode);
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-md border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-normal text-emerald-700">
            Easy Investment
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-stone-950">
            Research login
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Public demo screen for the MVP. Authentication is not required and no real external
            APIs are called.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-stone-700">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full rounded-md border border-stone-300 px-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              placeholder="you@example.com"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-stone-700">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-md border border-stone-300 px-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              placeholder="********"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-stone-700">Language preference</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as LanguagePreference)}
              className="h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Demo mode: this does not create an account or call Supabase Auth.
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="submit"
              value="login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              <LogIn size={16} aria-hidden />
              Log in
            </button>
            <button
              type="submit"
              value="register"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-900 transition hover:bg-stone-50"
            >
              <UserPlus size={16} aria-hidden />
              Register
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
