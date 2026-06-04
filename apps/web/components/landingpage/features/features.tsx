import { ShieldCheck, TrendingUp } from "lucide-react";
import { sectionShell, headingClass, subheadingClass } from "../shared/constants";
import { CtaLink } from "../shared/cta-link";

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute left-1/2 top-0 h-full w-[30rem] -translate-x-1/2 rounded-full bg-[#D5FF40]/8 blur-3xl" />
      <div className={`${sectionShell} relative`}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Text side */}
          <div>
            <p className="mb-3 font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#D5FF40]/85">
              Vision
            </p>
            <h2 className={`${headingClass} max-w-xl`}>
              What Is
              <br />
              Zeno&apos;s Vision?
            </h2>
            <p className={`${subheadingClass} mt-5 max-w-lg`}>
              We are Zeno, a modern automation platform helping businesses streamline
              workflows, eliminate repetitive tasks, and scale operations efficiently.
              We build powerful automation solutions that improve productivity,
              accuracy, and growth.
            </p>

            <div className="mt-8">
              <CtaLink href="#pricing">Explore Automation Solutions</CtaLink>
            </div>
          </div>

          {/* Visual card side */}
          <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(213,255,64,0.18)_0%,rgba(213,255,64,0.08)_30%,transparent_65%)] blur-3xl" />
            <div className="relative aspect-square w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-8">
              <div className="flex h-full flex-col justify-between rounded-xl border border-white/8 bg-black/35 p-5">
                <div className="flex items-center justify-between font-poppins text-[10px] uppercase tracking-[0.25em] text-[#C0C2B8]/50">
                  <span>Digital assets</span>
                  <span>2026</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#D5FF40]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span className="font-poppins text-[10px] font-semibold uppercase tracking-[0.25em]">
                        Trust
                      </span>
                    </div>
                    <p className="font-poppins text-xs leading-5 text-[#C0C2B8]/70">
                      Transparent structures built for institutions, family
                      offices, and professional allocators.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#D5FF40]">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span className="font-poppins text-[10px] font-semibold uppercase tracking-[0.25em]">
                        Growth
                      </span>
                    </div>
                    <p className="font-poppins text-xs leading-5 text-[#C0C2B8]/70">
                      Multi-asset access with a sharper view on market direction
                      and execution quality.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[28, 48, 68].map((height, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-white/10 bg-gradient-to-t from-[#D5FF40]/15 to-white/5 p-2.5"
                    >
                      <div
                        className="mt-auto rounded-lg bg-[#D5FF40]/50"
                        style={{ height }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
