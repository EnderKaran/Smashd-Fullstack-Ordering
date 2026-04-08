"use client";

import Link from "next/link";
import { ChevronLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9F9F', '#FFD666', '#4ADE80']
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-6 flex flex-col items-center justify-center text-center overflow-hidden">
      
      <header className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center w-full max-w-7xl mx-auto z-10">
        <Link href="/menu" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <span className="font-black italic text-xl tracking-tighter">Smash'd Burger</span>
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-[#FF9F9F] font-black">JD</div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center space-y-10 animate-in fade-in zoom-in duration-700">
        {/* Kart Animasyonu */}
        <div className="relative w-full max-w-sm aspect-square bg-white rounded-[50px] p-10 shadow-2xl shadow-orange-200/20 flex flex-col items-center justify-center border-b-8 border-gray-100">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Awesome!</h2>
          <span className="text-[120px] leading-none my-4 drop-shadow-xl">🍔</span>
          <p className="text-gray-400 font-bold text-sm italic tracking-widest mt-4 uppercase">Order ID: #{orderId}</p>
        </div>

        <div className="space-y-4 px-6">
          <h1 className="text-[54px] font-black text-gray-900 tracking-tighter leading-none">
            Order <br />
            <span className="text-[#FF9F9F]">Confirmed.</span>
          </h1>
          <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-[300px] mx-auto">
            Our chefs are already making your delicious smash'd burger.
          </p>
          <div className="bg-orange-50 text-orange-600 font-black px-6 py-3 rounded-2xl text-xs tracking-[0.2em] uppercase inline-block mt-4 shadow-sm border border-orange-100">
             Ready in 15-20 mins
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs mt-12 pb-10">
        <Link href="/menu">
          <Button className="w-full h-20 bg-gray-900 hover:bg-black text-white rounded-[2.5rem] text-lg font-black shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3">
            <ShoppingBag size={22} />
            Go back to Menu
          </Button>
        </Link>
      </div>

    </div>
  );
}