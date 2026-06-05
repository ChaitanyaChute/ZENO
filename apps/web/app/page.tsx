import {
  Enterprise,
  Features,
  Footer,
  Hero,
  Pricing,
} from "@/components/landingpage";

export default function Home() {
  return (
    <main className="bg-canvas text-ink">
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
