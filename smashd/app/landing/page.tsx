import Navbar from "@/components/storefront/Navbar";
import HeroSection from "@/components/storefront/HeroSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans overflow-hidden">
      <Navbar />
      <HeroSection />
      
    </main>
  );
}