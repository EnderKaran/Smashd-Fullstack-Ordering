import Navbar from "@/components/storefront/Navbar";
import HeroSection from "@/components/storefront/HeroSection";
import Features from "@/components/storefront/Features";
import ProcessSection from "@/components/storefront/ProcessSection";
import Testimonials from "@/components/storefront/Testimonials";
import SignatureMenu from "@/components/storefront/SignatureMenu";
import DineInSection from "@/components/storefront/DineInSection";
import FindUs from "@/components/storefront/FindUs";
import CTASection from "@/components/storefront/CTASection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans overflow-hidden">
      <Navbar />
      <HeroSection />
      <Features />
      <ProcessSection />
      <Testimonials />
      <SignatureMenu />
      <DineInSection />
      <FindUs />
      <CTASection />

    </main>
  );
}