import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Container } from "@/components/ui/container";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white">Privacy Policy</h1>
            <div className="prose prose-invert prose-neutral max-w-none space-y-6 text-neutral-300">
              <p className="text-lg leading-relaxed">Last updated: June 18, 2026</p>
              <p className="text-lg leading-relaxed">
                Your privacy is important to us. It is Zeno's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you.
              </p>
              <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Information We Collect</h2>
              <p className="text-lg leading-relaxed">
                We only collect information about you if we have a reason to do so—for example, to provide our services, to communicate with you, or to make our services better.
              </p>
              <h2 className="text-2xl font-semibold text-white mt-12 mb-4">How We Use Information</h2>
              <p className="text-lg leading-relaxed">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
              </ul>
              <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Security of Your Information</h2>
              <p className="text-lg leading-relaxed">
                We take the security of your personal information seriously and use appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}
