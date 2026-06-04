import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function CtaLink({ href, children, variant = "primary" }: CtaLinkProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={`font-poppins inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition duration-300 ${
        isPrimary
          ? "bg-[#D5FF40] text-black shadow-[0_0_0_1px_rgba(213,255,64,0.4),0_10px_28px_rgba(213,255,64,0.15)] hover:-translate-y-0.5 hover:bg-[#E0FF6A]"
          : "border border-[#D5FF40]/30 bg-transparent text-white hover:border-[#D5FF40]/55 hover:bg-white/5"
      }`}
    >
      <span>{children}</span>
      <span
        className={`grid h-7 w-7 place-items-center rounded-lg text-xs ${
          isPrimary ? "bg-white/90 text-black" : "border border-[#D5FF40]/50 text-[#D5FF40]"
        }`}
      >
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
