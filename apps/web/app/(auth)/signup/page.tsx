"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowUpRight, Sparkles } from "lucide-react";

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path fill="#4285F4" d="M45.12 24.5c0-1.62-.15-3.18-.42-4.69H24v8.9h11.83c-.51 2.74-2.05 5.06-4.36 6.63v5.5h7.05c4.12-3.8 6.6-9.4 6.6-16.34z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.93-1.96 14.58-5.31l-7.05-5.5c-1.96 1.32-4.47 2.1-7.53 2.1-5.79 0-10.7-3.9-12.46-9.14H4.25v5.75C7.89 41.21 15.43 46 24 46z" />
    <path fill="#FBBC05" d="M11.54 28.15A13.98 13.98 0 0 1 10.8 24c0-1.44.25-2.84.74-4.15V14.1H4.25A22 22 0 0 0 2 24c0 3.52.85 6.84 2.35 9.9l7.19-5.75z" />
    <path fill="#EA4335" d="M24 10.7c3.22 0 6.11 1.11 8.39 3.3l6.29-6.29C34.92 4.21 29.93 2 24 2 15.43 2 7.89 6.79 4.25 14.1l7.29 5.75C13.3 14.6 18.21 10.7 24 10.7z" />
  </svg>
);

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-[#030303] text-white overflow-hidden flex items-center justify-center px-4 py-20">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:60px_60px] [mask-image:radial-gradient(circle_at_center,black_35%,transparent_82%)]" />

      {/* Lime glow blob */}
      <div className="pointer-events-none absolute left-1/2 top-[-8rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-lime-300/15 blur-3xl" />

      {/* Side fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-black" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-black" />

      {/* Radial top highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_38%)]" />

      {/* Logo header */}
      <div className="absolute inset-x-0 top-0 z-20 px-6 pt-6 sm:px-8 sm:pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/90 transition hover:text-white"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-lime-300/40 bg-lime-300/10 text-lime-300">
            <Sparkles className="h-4 w-4" />
          </span>
          Zeno
        </Link>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glow behind card */}
        <div className="absolute inset-0 -z-10 rounded-[2rem] bg-lime-300/10 blur-2xl" />

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/75 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_0_6px_rgba(199,255,25,0.12)]" />
            100% Transparent
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-syne)] text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl">
            Create Account
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/55">
            Join Europe&apos;s leading digital asset manager. Start investing in the future today.
          </p>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lime-300/30 to-transparent" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/35">
              Or sign up with
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lime-300/30 to-transparent" />
          </div>

          {/* Google button */}
          <button
            id="google-signup-btn"
            className="mb-8 flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white/80 transition duration-300 hover:border-lime-300/35 hover:bg-white/[0.06] hover:text-white"
          >
            <GoogleIcon className="h-5 w-5" />
            Continue with Google
          </button>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="signup-firstname"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
                >
                  First Name
                </label>
                <input
                  id="signup-firstname"
                  type="text"
                  placeholder="John"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition duration-200 focus:border-lime-300/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(199,255,25,0.08)]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="signup-lastname"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
                >
                  Last Name
                </label>
                <input
                  id="signup-lastname"
                  type="text"
                  placeholder="Doe"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition duration-200 focus:border-lime-300/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(199,255,25,0.08)]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="signup-email"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
              >
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="john.doe@zeno.com"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition duration-200 focus:border-lime-300/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(199,255,25,0.08)]"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="signup-password"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 pr-12 text-sm text-white placeholder:text-white/25 outline-none transition duration-200 focus:border-lime-300/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(199,255,25,0.08)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-white/30">At least 8 characters required.</p>
            </div>

            {/* Submit */}
            <Link
              href="/dashboard"
              id="signup-submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(199,255,25,0.45),0_12px_35px_rgba(199,255,25,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-lime-200"
            >
              <span>Create Account</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-black/15 text-sm">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </form>

          {/* Footer links */}
          <p className="mt-8 text-center text-sm text-white/40">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-white/75 transition hover:text-white"
            >
              Sign in
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-white/30">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-white/50 transition hover:text-white">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-white/50 transition hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
