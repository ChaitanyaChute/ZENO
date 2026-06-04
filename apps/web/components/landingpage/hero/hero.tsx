import { sectionShell, headingClass, subheadingClass } from "../shared/constants";
import { CtaLink } from "../shared/cta-link";
import { Navbar } from "../navbar";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#0A0A0A]">
      {/* Grid background */}
      <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:48px_48px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-[-8rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#D5FF40]/12 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(213,255,64,0.05),transparent_35%)]" />

      <Navbar />

      <div
        className={`${sectionShell} relative z-10 flex min-h-[85vh] items-center py-20 sm:py-24 lg:py-28`}
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[#C0C2B8]/20 bg-white/[0.03] px-3.5 py-1.5 text-xs font-poppins font-medium text-[#C0C2B8] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D5FF40] shadow-[0_0_0_4px_rgba(213,255,64,0.12)]" />
            100% Transparent
          </div>

          <h1
            className={`${headingClass} max-w-3xl text-balance`}
          >
            Building The Future Of
            <br />
            Automation With Zeno
          </h1>

          <p
            className={`${subheadingClass} mt-5 max-w-xl text-balance`}
          >
            We provide a secure, feature-rich platform that simplifies
            repetitive processes and opens the door to new possibilities in the
            automation market.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
            <div className="hidden h-[1.5px] w-16 bg-gradient-to-r from-transparent via-[#D5FF40]/50 to-transparent sm:block" />

            <CtaLink href="/signup">Get Started</CtaLink>

            <CtaLink href="/signin" variant="secondary">
              Sign In
            </CtaLink>

            <div className="hidden h-[1.5px] w-16 bg-gradient-to-r from-transparent via-[#D5FF40]/50 to-transparent sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
