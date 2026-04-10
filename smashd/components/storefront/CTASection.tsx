import Link from "next/link";
import { ShoppingBag, Utensils, Sandwich, Coffee } from "lucide-react";

export default function CTASection() {
  return (
    <section className="w-full py-20 px-6 md:px-10">
      {/* ANA KUTU: Tasarımdaki o devasa sarı alan */}
      <div className="max-w-7xl mx-auto bg-[#FFD666] rounded-[3rem] py-20 md:py-32 px-6 relative overflow-hidden flex flex-col items-center text-center shadow-2xl shadow-yellow-200">
        
        {/* DEKORATİF İKONLAR (Havada Süzülenler) */}
        <div className="absolute top-10 left-10 text-yellow-600/20 -rotate-12 hidden md:block animate-bounce duration-[4000ms]">
          <Utensils size={80} strokeWidth={3} />
        </div>
        <div className="absolute bottom-10 left-20 text-yellow-600/20 rotate-12 hidden md:block animate-pulse">
          <Sandwich size={60} strokeWidth={3} />
        </div>
        <div className="absolute top-20 right-20 text-yellow-600/20 rotate-45 hidden md:block animate-bounce duration-[3000ms]">
          <Coffee size={70} strokeWidth={3} />
        </div>

        {/* İÇERİK */}
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-12">
            Ready for the <br />
            Best Burger of <br />
            Your Life?
          </h2>

          <div className="flex flex-col items-center gap-6">
            <Link href="/order">
              <button className="h-20 px-12 bg-[#FF8A8A] hover:bg-[#FF6B6B] text-white rounded-full font-black shadow-2xl shadow-[#FF8A8A]/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 text-xl md:text-2xl uppercase tracking-tighter">
                Order Now <ShoppingBag size={28} />
              </button>
            </Link>
            
            <p className="text-gray-900/60 font-bold text-sm tracking-widest uppercase">
              No lines. No waiting. Just pure joy.
            </p>
          </div>
        </div>

        {/* Arka plandaki o hafif desen/gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}