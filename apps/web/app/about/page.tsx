import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Container } from "@/components/ui/container";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white">About Zeno</h1>
            <div className="prose prose-invert prose-neutral max-w-none space-y-6 text-neutral-300">
              <p className="text-lg leading-relaxed">
                At Zeno, we believe that AI should not just be a tool, but a reliable partner that accelerates your workflow. Our mission is to bridge the gap between complex AI capabilities and everyday productivity.
              </p>
              <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Our Vision</h2>
              <p className="text-lg leading-relaxed">
                We envision a world where ideas are executed at the speed of thought. By providing intuitive, powerful, and beautiful interfaces, we empower creators, developers, and businesses to build the future faster.
              </p>
              <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Why We Built Zeno</h2>
              <p className="text-lg leading-relaxed">
                Building complex workflows traditionally required hours of coding, debugging, and connecting disparate systems. We built Zeno to turn that hours-long process into a simple, natural language prompt.
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}
