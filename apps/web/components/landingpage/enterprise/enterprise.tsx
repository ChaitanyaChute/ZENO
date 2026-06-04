import { sectionShell, headingClass, subheadingClass } from "../shared/constants";

const servicePills = ["Hedge Fund Solutions", "Ventures", "Capital Markets"] as const;

export function Enterprise() {
  return (
    <section id="enterprise" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute left-1/2 top-0 h-full w-[30rem] -translate-x-1/2 rounded-full bg-[#D5FF40]/8 blur-3xl" />
      <div className={`${sectionShell} relative`}>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Text side */}
          <div>
            <p className="mb-3 font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#D5FF40]/85">
              Enterprise
            </p>
            <h2 className={`${headingClass} max-w-xl`}>
              Our Services
            </h2>
            <p className={`${subheadingClass} mt-5 max-w-lg`}>
              Our Capital Markets service offers expert guidance and execution in
              navigating the complexities of global financial markets.
            </p>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
              {servicePills.map((pill) => (
                <div
                  key={pill}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 font-poppins text-xs font-medium text-[#C0C2B8]/80 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>

          {/* Abstract visual */}
          <div className="relative mx-auto flex h-56 w-full max-w-md items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_25%,rgba(213,255,64,0.14),transparent_38%)]" />
            <div className="relative h-36 w-36 rounded-2xl border border-[#D5FF40]/20 bg-black/40 p-3">
              <div className="absolute left-1/2 top-3 h-28 w-28 -translate-x-1/2 rounded-xl border border-[#D5FF40]/25 bg-white/[0.03] shadow-[inset_0_0_40px_rgba(213,255,64,0.06)]" />
              <div className="absolute inset-x-10 top-1/2 h-px -translate-y-1/2 bg-[#D5FF40]/25" />
              <div className="absolute inset-y-10 left-1/2 w-px -translate-x-1/2 bg-[#D5FF40]/25" />
              <div className="absolute left-5 top-5 h-5 w-5 rounded-full border border-[#D5FF40]/50 bg-[#D5FF40]/15" />
              <div className="absolute right-5 top-5 h-5 w-5 rounded-full border border-[#D5FF40]/50 bg-[#D5FF40]/15" />
              <div className="absolute bottom-5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border border-[#D5FF40]/50 bg-[#D5FF40]/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
