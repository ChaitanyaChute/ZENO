"use client";

import { cn } from "@/lib/utils";
import { 
  FileText, 
  ArrowUpRight, 
  Building2, 
  Check, 
  DollarSign, 
  ArrowRight 
} from 'lucide-react';
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { useRouter } from "next/navigation";

// Plan Types
interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  buttonText: string;
  buttonVariant: 'primary' | 'secondary';
  popular?: boolean;
  icon: React.ElementType;
  iconColor: string;
  gradientColor: string;
  accentColor: string;
  featuresTitle: string;
  features: PlanFeature[];
}

const plans: Plan[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'For individuals exploring automation',
    price: '$0',
    priceNote: 'Free forever',
    buttonText: 'Get started',
    buttonVariant: 'primary',
    icon: FileText,
    iconColor: 'text-lime-400',
    gradientColor: 'from-lime-900/30 via-lime-900/5 to-transparent',
    accentColor: 'text-lime-400',
    featuresTitle: 'CORE FUNCTIONALITY',
    features: [
      { text: 'Up to 10 workflows', included: true },
      { text: '100 executions per month', included: true },
      { text: 'Standard integrations', included: true },
      { text: 'Execution history (7 days)', included: true },
      { text: 'Community support', included: true },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'For professionals automating daily tasks',
    price: '$15',
    priceNote: 'per month',
    buttonText: 'Get started',
    buttonVariant: 'primary',
    popular: true,
    icon: ArrowUpRight,
    iconColor: 'text-lime-400',
    gradientColor: 'from-lime-900/30 via-lime-900/5 to-transparent',
    accentColor: 'text-lime-400',
    featuresTitle: 'EVERYTHING IN STANDARD, PLUS:',
    features: [
      { text: 'Unlimited workflows', included: true },
      { text: '10,000 executions per month', included: true },
      { text: 'All premium integrations', included: true },
      { text: 'AI-powered nodes', included: true },
      { text: 'Execution history (30 days)', included: true },
      { text: 'Custom templates', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For teams scaling complex automations',
    price: '$50',
    priceNote: 'per month',
    buttonText: 'Get Started',
    buttonVariant: 'primary',
    icon: Building2,
    iconColor: 'text-lime-400',
    gradientColor: 'from-lime-900/30 via-lime-900/5 to-transparent',
    accentColor: 'text-lime-400',
    featuresTitle: 'EVERYTHING IN GROWTH, PLUS:',
    features: [
      { text: '100,000 executions per month', included: true },
      { text: 'Team collaboration (up to 5 users)', included: true },
      { text: 'Custom templates', included: true },
      { text: 'Execution history (1 year)', included: true },
      { text: 'Custom Rate Limits', included: true },
      { text: 'Custom Webhooks', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Dedicated onboarding', included: true },
    ],
  },
];

export const Pricing = () => {
  const router = useRouter();

  const handleTierClick = (plan: Plan) => {
    if (plan.id === 'standard') {
      router.push("/workflows");
    } else {
      router.push("/login");
    }
  };

  return (
    <section id="pricing" className="w-full pt-12 pb-24 font-sans selection:bg-lime-500/30 selection:text-white relative overflow-hidden">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-medium text-lime-400"
          >
            <span className="flex items-center justify-center w-4 h-4 rounded-full border border-lime-400 text-[10px]">
              <DollarSign size={10} />
            </span>
            Flexible plans
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] max-w-4xl mx-auto tracking-tight"
          >
            Choose the plan <br />
            that <span className="text-lime-400 italic px-1 font-serif">best fits</span> your <br />
            needs
          </motion.h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              key={plan.id}
              className="relative flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-neutral-700"
            >
              {/* Subtle Top Gradient */}
              <div className={cn("absolute top-0 left-0 right-0 h-32 bg-gradient-to-b opacity-80", plan.gradientColor)} />
              
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute top-6 right-6 bg-lime-900/50 text-lime-300 text-xs font-semibold px-3 py-1 rounded-full border border-lime-800/50 backdrop-blur-sm z-10">
                  Most Popular
                </div>
              )}

              <div className="relative p-6 flex flex-col h-full z-10">
                {/* Icon */}
                <div className={cn("mb-4", plan.iconColor)}>
                  <plan.icon size={28} strokeWidth={1.5} />
                </div>

                {/* Header Info */}
                <div className="mb-4">
                  <h3 className="font-serif text-3xl text-white mb-2">{plan.name}</h3>
                  <p className="text-neutral-400 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6 flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl font-semibold text-white">{plan.price}</span>
                  {plan.priceNote && (
                    <span className="text-neutral-500 text-sm ml-auto">{plan.priceNote}</span>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleTierClick(plan)}
                  className={cn(
                    "w-full py-3 px-6 rounded-xl text-sm font-medium transition-colors mb-6 flex items-center justify-center gap-2 group",
                    plan.buttonVariant === 'primary' 
                      ? "bg-white hover:bg-neutral-200 text-black" 
                      : "bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700"
                  )}
                >
                  {plan.buttonText}
                  {plan.buttonVariant === 'secondary' && (
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  )}
                </button>

                {/* Features List */}
                <div>
                  <p className={cn("text-xs font-semibold tracking-wider uppercase mb-4", plan.accentColor)}>
                    {plan.featuresTitle}
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                        <Check size={16} className={cn("shrink-0 mt-0.5", plan.accentColor)} />
                        <span className="leading-snug">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
