"use client";

import { Mail } from "lucide-react";

export function CareersEmailForm() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_18px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-5"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="careers-email">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input
            id="careers-email"
            type="email"
            placeholder="Enter your email"
            className="h-14 w-full rounded-full border border-white/10 bg-black/35 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-lime-300/50 focus:ring-2 focus:ring-lime-300/20"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center rounded-full bg-lime-300 px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-lime-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
