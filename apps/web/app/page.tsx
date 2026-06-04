import {
  Hero,
  Features,
  Pricing,
  Enterprise,
  Footer,
} from "@/components/landingpage";
import TemplateLauncher from "@/components/landingpage/TemplateLauncher";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Features />
      <TemplateLauncher />
      <Pricing />
      <Enterprise />
      <Footer />
    </main>
  );
}