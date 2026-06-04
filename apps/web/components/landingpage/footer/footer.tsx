import Link from "next/link";
import { Sparkles } from "lucide-react";
import { sectionShell } from "../shared/constants";

const footerLinks = [
  { label: "Contact Us", href: "#careers" },
  { label: "Risk Policy", href: "/terms" },
  { label: "Disclaimer", href: "/terms" },
  { label: "Careers", href: "#careers" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/privacy" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#0A0A0A] py-8">
      <div
        className={`${sectionShell} flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between`}
      >
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5 font-poppins text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#D5FF40]/35 bg-[#D5FF40]/8 text-[#D5FF40]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            Zeno
          </div>
          <p className="mt-3 max-w-xs font-poppins text-xs leading-5 text-[#C0C2B8]/60">
            Join us to shape the future of open source software together.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-poppins text-xs text-[#C0C2B8]/65 sm:grid-cols-3 lg:max-w-xl lg:flex-1 lg:justify-end">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
