export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Zeno
          </p>
          <h1 className="text-4xl font-medium tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-sm">Last updated: May 19, 2026</p>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-white/70">
          <p>
            We collect only the information required to provide access to the
            Zeno platform, including your name, email address, and account
            preferences.
          </p>
          <p>
            We use analytics to improve performance and ensure reliable service.
            You can opt out of non-essential analytics at any time through your
            account settings.
          </p>
          <p>
            We do not sell your personal data. We only share information with
            service providers that help us run Zeno and keep your data secure.
          </p>
          <p>
            For any privacy questions, reach out to privacy@zeno.space and we
            will respond promptly.
          </p>
        </div>
      </div>
    </main>
  );
}
