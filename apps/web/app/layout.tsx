import type { Metadata } from "next";
import { Inter, Syne, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: {
    default: "Zeno — Building The Future Of Investing",
    template: "%s · Zeno",
  },
  description: "Europe's largest digital asset manager. We build the future of investing with innovative crypto ETPs, hedge fund solutions, and capital markets services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-black">
      <body
        className={`${inter.variable} ${syne.variable} ${poppins.variable} bg-black text-white antialiased overflow-x-hidden font-[family-name:var(--font-poppins)]`}
      >
        {children}
      </body>
    </html>
  );
}
