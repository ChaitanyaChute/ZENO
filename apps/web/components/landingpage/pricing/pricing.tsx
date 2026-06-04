import { Check } from "lucide-react";
import { sectionShell, headingClass, subheadingClass } from "../shared/constants";
import { CtaLink } from "../shared/cta-link";

type PlanFeature = {
  text: string;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  popular?: boolean;
  gradientColor: string;
  accentColor: string;
  featuresTitle: string;
  features: PlanFeature[];
};

const plans: Plan[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Best for small teams starting with automated workflows.",
    price: "$0",
    priceNote: "Per month",
    buttonText: "Get started",
    buttonVariant: "secondary",
    gradientColor: "from-[#D5FF40]/10 via-[#D5FF40]/4 to-transparent",
    accentColor: "text-[#D5FF40]",
    featuresTitle: "Core functionality",
    features: [
      { text: "Unlimited drafts", included: true },
      { text: "Shared templates", included: true },
      { text: "Standard workflow builder", included: true },
      { text: "15K credits included", included: true },
      { text: "Email support", included: true },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Built for teams scaling execution across departments.",
    price: "$20",
    priceNote: "Per month",
    buttonText: "Get started",
    buttonVariant: "primary",
    popular: true,
    gradientColor: "from-white/12 via-white/4 to-transparent",
    accentColor: "text-white",
    featuresTitle: "Everything in Standard, plus",
    features: [
      { text: "Priority queue processing", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Team permissions", included: true },
      { text: "Slack and email support", included: true },
      { text: "Higher throughput limits", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For regulated teams that need tailored rollout support.",
    price: "$50",
    priceNote: "Per month",
    buttonText: "Get started",
    buttonVariant: "secondary",
    gradientColor: "from-[#D5FF40]/8 via-transparent to-transparent",
    accentColor: "text-[#D5FF40]",
    featuresTitle: "Everything in Growth, plus",
    features: [
      { text: "Custom onboarding", included: true },
      { text: "SLA-backed support", included: true },
      { text: "Security review assistance", included: true },
      { text: "Dedicated rollout guidance", included: true },
      { text: "Custom integration planning", included: true },
    ],
  },
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute left-1/2 top-0 h-full w-[36rem] -translate-x-1/2 rounded-full bg-[#D5FF40]/8 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:48px_48px] [mask-image:radial-gradient(circle_at_center,black_35%,transparent_80%)]" />

      <div className={`${sectionShell} relative`}>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#D5FF40]/85">
              Pricing
            </p>
            <h2 className={`${headingClass} max-w-2xl`}>
              Plans designed for
              <br />
              focused automation teams
            </h2>
          </div>
          <p className={`${subheadingClass} max-w-sm sm:text-right`}>
            Flexible plans, clear pricing, and streamlined features<br/>that help teams scale automation without unnecessary complexity.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            return (
              <article
                key={plan.id}
                className={cn(
                  "relative overflow-hidden rounded-2xl border p-5 sm:p-6",
                  plan.popular
                    ? "border-[#D5FF40]/25 bg-[#D5FF40]/[0.04] shadow-[0_14px_50px_rgba(213,255,64,0.06)]"
                    : "border-white/10 bg-white/[0.025]"
                )}
              >
                <div className={cn("absolute inset-x-0 top-0 h-24 bg-gradient-to-b opacity-60", plan.gradientColor)} />

                {plan.popular && (
                  <div className="absolute right-5 top-5 rounded-lg border border-[#D5FF40]/25 bg-[#D5FF40]/8 px-2.5 py-1 font-poppins text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D5FF40]">
                    Most popular
                  </div>
                )}

                <div className="relative flex h-full flex-col">
                  <div className="mb-6">
                    <h3 className="font-poppins text-xl font-semibold text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-2 max-w-xs font-poppins text-xs leading-5 text-[#C0C2B8]/70">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <span className="font-poppins text-2xl font-bold tracking-tight text-white">
                      {plan.price}
                    </span>
                    {plan.priceNote && (
                      <span className="pb-0.5 font-poppins text-xs text-[#C0C2B8]/50">{plan.priceNote}</span>
                    )}
                  </div>

                  <div className="mb-8">
                    <CtaLink
                      href="/signup"
                      variant={plan.buttonVariant === "primary" ? "primary" : "secondary"}
                    >
                      {plan.buttonText}
                    </CtaLink>
                  </div>

                  <div className="mt-auto">
                    <p className={cn("mb-5 font-poppins text-[10px] font-semibold uppercase tracking-[0.28em]", plan.accentColor)}>
                      {plan.featuresTitle}
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature.text} className="flex items-start gap-2.5 font-poppins text-xs text-white/70">
                          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-md border border-[#D5FF40]/20 bg-[#D5FF40]/8 text-[#D5FF40]">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          <span className="leading-5">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
