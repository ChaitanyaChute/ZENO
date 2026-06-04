import { Sparkles } from "lucide-react";
import { CtaLink } from "./shared/cta-link";

export default function TemplateLauncher() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(213,255,64,0.08),transparent_40%)]" />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-5 text-center sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-poppins text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D5FF40]/85">
          <Sparkles className="h-3.5 w-3.5" />
          Templates
        </div>
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Start from a ready-made workflow instead of building from scratch.
        </h2>
        <p className="max-w-xl font-poppins text-sm leading-7 text-[#C0C2B8] sm:text-base">
          Browse starter templates to see how Zeno connects services, handles
          credentials, and gets a workflow live faster.
        </p>
        <CtaLink href="/templates" variant="secondary">
          Browse Templates
        </CtaLink>
      </div>
    </section>
  );
}
