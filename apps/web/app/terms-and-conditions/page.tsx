import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Container } from "@/components/ui/container";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white">Terms and Conditions</h1>
            <div className="prose prose-invert prose-neutral max-w-none space-y-6 text-neutral-300">
              <p className="text-lg leading-relaxed">Last updated: June 18, 2026</p>
              <p className="text-lg leading-relaxed">
                Please read these terms and conditions carefully before using Our Service.
              </p>
              <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Interpretation and Definitions</h2>
              <p className="text-lg leading-relaxed">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
              <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Acknowledgment</h2>
              <p className="text-lg leading-relaxed">
                These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
              </p>
              <h2 className="text-2xl font-semibold text-white mt-12 mb-4">User Accounts</h2>
              <p className="text-lg leading-relaxed">
                When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}
