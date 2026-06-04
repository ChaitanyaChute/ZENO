"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Menu, X } from "lucide-react";
import { sectionShell } from "../shared/constants";

const leftNav = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className={`${sectionShell} pt-5 sm:pt-6`}>
        <div className="flex items-center justify-between">
          {/* Logo + left nav pill — hidden on mobile */}
          <div className="inline-flex items-center gap-3">
            <div className="flex items-center rounded-xl bg-[#111111] border border-white/6 px-3 py-1 shadow-[0_6px_24px_rgba(0,0,0,0.5)]">
              <Link href="#top" className="inline-flex items-center mr-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#D5FF40]/40 bg-[#D5FF40] text-black shadow-[0_4px_16px_rgba(213,255,64,0.12)]">
                  <Sparkles className="h-4 w-4" />
                </span>
              </Link>
              <nav className="hidden items-center gap-2 md:flex">
                {leftNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-poppins text-sm font-medium text-white/75 px-3 py-1.5 rounded-lg transition-colors duration-150 hover:bg-[#D5FF40] hover:text-black"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Right CTA — hidden on mobile */}
          <div className="hidden items-center gap-2.5 md:flex">
            <Link
              href="/signin"
              className="font-poppins inline-flex items-center rounded-xl border border-white/10 bg-[#111111] px-4 py-2 text-sm font-medium text-white/85 transition-colors duration-150 hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="font-poppins inline-flex items-center rounded-xl bg-[#D5FF40] px-4 py-2 text-sm font-medium text-black transition-colors duration-150 hover:bg-[#E0FF6A]"
            >
              Get Started
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-[#111111] text-white/80 transition md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="mt-3 flex flex-col gap-2 rounded-xl border border-white/8 bg-[#111111]/95 p-4 backdrop-blur-xl md:hidden">
            {leftNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-poppins text-sm font-medium text-white/75 px-3 py-2 rounded-lg transition-colors hover:bg-[#D5FF40] hover:text-black"
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-white/8" />
            <Link
              href="/signin"
              onClick={() => setMobileOpen(false)}
              className="font-poppins text-sm font-medium text-white/75 px-3 py-2 rounded-lg transition-colors hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="font-poppins inline-flex items-center justify-center rounded-xl bg-[#D5FF40] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#E0FF6A]"
            >
              Get Started
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
