"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/useCartStore";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ChevronLeft, ChevronRight, Pencil, PlusCircle, CreditCard, MapPin, CheckCircle2 } from "lucide-react";
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
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FAF9F6]">
        <span className="text-8xl mb-6">🛒</span>
        <h1 className="text-3xl font-black mb-4 tracking-tighter text-gray-900">Your Tray is empty</h1>
        <Link href="/menu">
          <Button className="bg-[#FF9F9F] hover:bg-[#ff8a8a] rounded-full px-10 py-7 text-lg font-bold shadow-lg shadow-red-100 transition-all active:scale-95">
            Discover Burgers →
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20">
      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/menu" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <span className="text-2xl font-black italic text-gray-900 tracking-tighter">Smash'd Burger</span>
        <div className="flex items-center gap-8 text-sm font-bold text-gray-500">
          <Link href="/menu" className="text-gray-900 border-b-2 border-orange-400 pb-1">Menu</Link>
          <Link href="/rewards" className="hover:text-gray-900">Rewards</Link>
          <Link href="/locations" className="hover:text-gray-900">Locations</Link>
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-[#FF9F9F] font-black">JD</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-[64px] font-black leading-none text-gray-900 tracking-tighter">Your Tray</h1>
            <p className="text-gray-400 font-medium mt-3 italic text-lg">You're {items.length} items away from happiness.</p>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] p-6 flex items-center gap-6 shadow-sm border border-transparent hover:border-orange-100 transition-all group">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <Image src={item.image_url || "/placeholder.png"} alt={item.name} fill className="object-cover rounded-3xl" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">{item.name}</h3>
                      <p className="text-[#FF9F9F] font-black mt-1 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-200 hover:text-red-400 transition-colors">
                      <Trash2 size={22} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 shadow-inner">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="text-gray-400 hover:text-black">
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="font-black w-4 text-center text-gray-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-black">
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                    <button className="text-[11px] font-black text-gray-400 underline underline-offset-4 hover:text-[#FF9F9F] tracking-widest uppercase">
                      Edit extras
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/menu" className="flex items-center justify-center gap-3 w-full py-8 border-2 border-dashed border-gray-200 rounded-[2.5rem] text-gray-400 font-black hover:border-orange-200 hover:text-orange-400 transition-all hover:bg-white/50">
            <PlusCircle size={24} />
            <span className="text-lg">Add more items</span>
          </Link>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-[3.5rem] p-10 shadow-2xl shadow-orange-200/20 border border-white sticky top-8">
            <h2 className="text-2xl font-black flex items-center gap-3 mb-10 text-gray-900">
               <span className="text-2xl">📋</span> Order Summary
            </h2>
            <div className="space-y-5 font-bold text-gray-600">
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-400">Tax (8%)</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold">Delivery Fee</span>
                <span className="text-green-600 text-xs font-black bg-green-100 px-4 py-1.5 rounded-full tracking-widest">FREE</span>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-orange-200/30">
               <div className="flex justify-between items-end mb-10">
                  <span className="text-2xl font-black text-gray-900">Total</span>
                  <span className="text-[64px] font-black leading-none text-gray-900 tracking-tighter">${total.toFixed(2)}</span>
               </div>
               
               <Button 
                onClick={handlePlaceOrder}
                disabled={isOrdering}
                className="w-full h-24 bg-[#FF9F9F] hover:bg-[#ff8a8a] text-white rounded-[2.5rem] flex items-center justify-between px-10 shadow-xl shadow-red-200 transition-all active:scale-95 border-none group"
               >
                 <span className="text-2xl font-black">{isOrdering ? "Sending..." : "Place Order"}</span>
                 <span className="bg-white/20 px-5 py-2.5 rounded-2xl font-black text-xl">${total.toFixed(2)}</span>
               </Button>
               <p className="text-center text-[11px] font-black text-orange-400 mt-8 tracking-widest uppercase">✨ No delivery fee on your first order!</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => setPaymentMethod(paymentMethod === "Apple Pay" ? "Credit Card" : "Apple Pay")}
              className="w-full bg-white p-6 rounded-[2.5rem] flex items-center justify-between shadow-sm border border-transparent hover:border-orange-100 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gray-900 rounded-[1.25rem] flex items-center justify-center shadow-lg">
                  <CreditCard className="text-white w-7 h-7" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Method</p>
                  <p className="text-xl font-black text-gray-900">{paymentMethod}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => {
                const newAddr = prompt("Enter new address:", deliveryAddress);
                if (newAddr) setDeliveryAddress(newAddr);
              }}
              className="w-full bg-white p-6 rounded-[2.5rem] flex items-center justify-between shadow-sm border border-transparent hover:border-orange-100 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-blue-50 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-blue-100/50">
                  <MapPin className="text-blue-500 w-7 h-7" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivering to</p>
                  <p className="text-xl font-black text-gray-900 leading-tight">{deliveryAddress}</p>
                </div>
              </div>
              <Pencil size={20} className="text-gray-300 group-hover:text-[#FF9F9F] transition-colors" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}