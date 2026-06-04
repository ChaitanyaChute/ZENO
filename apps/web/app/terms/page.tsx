export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Zeno
          </p>
          <h1 className="text-4xl font-medium tracking-tight">
            Terms of Service
          </h1>
          <p className="text-white/60 text-sm">Last updated: May 19, 2026</p>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-white/70">
          <p>
            By using Zeno, you agree to keep your account credentials secure
            and to use the platform in compliance with applicable laws.
          </p>
          <p>
            We may update these terms to reflect changes in our services. When
            we do, we will update the date above and notify you where required.
          </p>
          <p>
            Zeno is provided as-is without warranties, and we are not liable
            for indirect or consequential damages to the extent permitted by law.
          </p>
          <p>
            Questions about these terms can be sent to legal@zeno.space.
          </p>
        </div>
      </div>
    </main>
  );
}
