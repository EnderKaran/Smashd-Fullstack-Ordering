"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import Link from "next/link"; // Yönlendirme için gerekli

export function CartTray() {
  const { items } = useCartStore();
  
  // Sepetteki toplam ürün sayısı ve fiyatı hesaplıyoruz
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Sepet boşsa barı gizle
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-8 left-0 right-0 px-6 z-50">
      {/* 🔗 Butonu /tray sayfasına yönlendirecek şekilde sarmaladık */}
      <Link href="/tray" className="block mx-auto w-full max-w-sm">
        <button className="w-full bg-[#1A1A1A] h-16 rounded-[2rem] flex items-center justify-between px-8 text-white shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
          <div className="flex items-center gap-3">
            <span className="bg-[#FF9F9F] text-black w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black">
              {itemCount}
            </span>
            <span className="font-bold text-sm tracking-tight">View Order</span>
          </div>
          <span className="font-black text-lg">${totalPrice.toFixed(2)}</span>
        </button>
      </Link>
    </div>
  );
}