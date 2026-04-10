"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/useCartStore";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ChevronLeft, ChevronRight, Pencil, PlusCircle, CreditCard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TrayPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [paymentMethod, setPaymentMethod] = useState("Apple Pay");
  const [deliveryAddress, setDeliveryAddress] = useState("Home • 123 Burger St.");
  const [isOrdering, setIsOrdering] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    setIsOrdering(true);
    try {
      const { error } = await supabase
        .from('orders')
        .insert([{ 
            items: items, 
            total_price: total, 
            status: 'pending', 
            payment_method: paymentMethod,
            address: deliveryAddress,
            table_id: "Table-01" 
        }]);

      if (error) throw error;

      toast.success("Sipariş mutfağa uçtu! 🚀");
      clearCart();
      router.push("/success"); 
    } catch (error: any) {
      toast.error("Hata: " + error.message);
    } finally {
      setIsOrdering(false);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FAF9F6] text-center">
        <span className="text-8xl mb-6 animate-bounce">🛒</span>
        <h1 className="text-3xl font-black mb-4 tracking-tighter text-gray-900">Your Tray is empty</h1>
        <p className="text-gray-400 font-medium mb-8">Happiness is just a burger away.</p>
        <Link href="/menu">
          <Button className="bg-[#FF9F9F] hover:bg-[#ff8a8a] rounded-full px-10 py-7 text-lg font-bold shadow-xl shadow-red-100 transition-all active:scale-95">
            Discover Burgers →
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20">
      {/* 📱 HEADER: Mobilde sadeleşti */}
      <header className="px-4 md:px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/menu" className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all border border-gray-50">
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
        </Link>
        <span className="text-xl md:text-2xl font-black italic text-gray-900 tracking-tighter">Smash'd Burger</span>
        
        {/* Masaüstü Navigasyon (Mobilde gizli) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
          <Link href="/menu" className="text-gray-900 border-b-2 border-orange-400 pb-1">Menu</Link>
          <Link href="/rewards" className="hover:text-gray-900 transition-colors">Rewards</Link>
          <Link href="/locations" className="hover:text-gray-900 transition-colors">Locations</Link>
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-[#FF9F9F] font-black">EK</div>
        </div>
        
        {/* Mobil Profil (Sadece Mobilde görünür) */}
        <div className="md:hidden w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-[#FF9F9F] font-black text-xs">EK</div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4 md:mt-8">
        
        {/* 🍔 SOL TARAF: Ürün Listesi */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div>
            <h1 className="text-4xl md:text-[64px] font-black leading-none text-gray-900 tracking-tighter">Your Tray</h1>
            <p className="text-gray-400 font-medium mt-2 md:mt-3 italic text-sm md:text-lg">You're {items.length} items away from happiness.</p>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-6 flex items-center gap-4 md:gap-6 shadow-sm border border-transparent hover:border-orange-100 transition-all group">
                {/* Burger Görseli */}
                <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0">
                  <Image src={item.image_url || "/placeholder.png"} alt={item.name} fill className="object-cover rounded-2xl md:rounded-3xl" />
                </div>

                {/* İçerik */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="truncate">
                      <h3 className="text-base md:text-xl font-black text-gray-900 tracking-tight truncate">{item.name}</h3>
                      <p className="text-[#FF9F9F] font-black mt-0.5 md:mt-1 text-sm md:text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-200 hover:text-red-400 transition-colors p-1">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-start gap-4 md:gap-6 mt-3 md:mt-4">
                    {/* Sayıcı (Stepper) */}
                    <div className="flex items-center gap-3 md:gap-4 bg-gray-50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-gray-100 shadow-inner">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="text-gray-400 hover:text-black transition-colors">
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="font-black w-4 text-center text-gray-900 text-sm md:text-base">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-black transition-colors">
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                    <button className="text-[9px] md:text-[11px] font-black text-gray-400 underline underline-offset-4 hover:text-[#FF9F9F] tracking-widest uppercase">
                      Edit extras
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/menu" className="flex items-center justify-center gap-3 w-full py-6 md:py-8 border-2 border-dashed border-gray-200 rounded-[2rem] md:rounded-[2.5rem] text-gray-400 font-black hover:border-orange-200 hover:text-orange-400 transition-all hover:bg-white/50">
            <PlusCircle className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-base md:text-lg">Add more items</span>
          </Link>
        </div>

        {/* 📋 SAĞ TARAF: Özet ve Ödeme */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 shadow-2xl shadow-orange-200/20 border border-white lg:sticky lg:top-8">
            <h2 className="text-xl md:text-2xl font-black flex items-center gap-3 mb-6 md:mb-10 text-gray-900">
                <span className="text-xl md:text-2xl">📋</span> Order Summary
            </h2>
            
            <div className="space-y-4 md:space-y-5 font-bold text-gray-600">
              <div className="flex justify-between items-center text-sm md:text-lg">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm md:text-lg">
                <span className="text-gray-400">Tax (8%)</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold text-sm md:text-base">Delivery Fee</span>
                <span className="text-green-600 text-[10px] font-black bg-green-100 px-3 py-1 md:px-4 md:py-1.5 rounded-full tracking-widest">FREE</span>
              </div>
            </div>

            <div className="mt-8 md:mt-12 pt-6 md:pt-10 border-t border-orange-200/30 text-center lg:text-left">
               <div className="flex justify-between items-end mb-8 md:mb-10">
                  <span className="text-xl md:text-2xl font-black text-gray-900">Total</span>
                  <span className="text-4xl md:text-[64px] font-black leading-none text-gray-900 tracking-tighter">
                    ${total.toFixed(2)}
                  </span>
               </div>
               
               <Button 
                onClick={handlePlaceOrder}
                disabled={isOrdering}
                className="w-full h-16 md:h-24 bg-[#FF9F9F] hover:bg-[#ff8a8a] text-white rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-between px-6 md:px-10 shadow-xl shadow-red-200 transition-all active:scale-95 border-none group"
               >
                 <span className="text-lg md:text-2xl font-black">{isOrdering ? "Sending..." : "Place Order"}</span>
                 <span className="bg-white/20 px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl font-black text-base md:text-xl">${total.toFixed(2)}</span>
               </Button>
               <p className="text-center text-[10px] md:text-[11px] font-black text-orange-400 mt-6 md:mt-8 tracking-widest uppercase animate-pulse">
                ✨ No delivery fee on your first order!
               </p>
            </div>
          </div>

          {/* Ödeme ve Adres Butonları */}
          <div className="space-y-3 md:space-y-4 pb-10 lg:pb-0">
            <button 
              onClick={() => setPaymentMethod(paymentMethod === "Apple Pay" ? "Credit Card" : "Apple Pay")}
              className="w-full bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-between shadow-sm border border-gray-50 hover:border-orange-100 transition-all group"
            >
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-900 rounded-xl md:rounded-[1.25rem] flex items-center justify-center shadow-lg">
                  <CreditCard className="text-white w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Method</p>
                  <p className="text-base md:text-xl font-black text-gray-900">{paymentMethod}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => {
                const newAddr = prompt("Enter new address:", deliveryAddress);
                if (newAddr) setDeliveryAddress(newAddr);
              }}
              className="w-full bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-between shadow-sm border border-gray-50 hover:border-orange-100 transition-all group"
            >
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-50 rounded-xl md:rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-blue-100/50">
                  <MapPin className="text-blue-500 w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivering to</p>
                  <p className="text-base md:text-xl font-black text-gray-900 leading-tight">{deliveryAddress}</p>
                </div>
              </div>
              <Pencil size={18} className="text-gray-300 group-hover:text-[#FF9F9F] transition-colors" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}