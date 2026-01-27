"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/store/useCartStore";
import { supabase } from "@/lib/supabase";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function CartTray() {
  const searchParams = useSearchParams();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  // Başarılı değilse ve sepet boşsa gösterme
  if (items.length === 0 && !isSuccess) return null;

  const subTotal = getTotalPrice();
  const tax = subTotal * 0.08;
  const total = subTotal + tax;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const [tableId, setTableId] = useState<string>("");

    useEffect(() => {
    const urlTable = searchParams.get('table');
    if (urlTable) {
        setTableId(urlTable);
    } else {
        const sessionTable = sessionStorage.getItem('temp_table');
        if (sessionTable) {
        setTableId(sessionTable);
        } else {
        const randomTable = Math.floor(Math.random() * 899 + 100).toString();
        sessionStorage.setItem('temp_table', randomTable);
        setTableId(randomTable);
        }
    }
}, [searchParams]);

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const { error } = await supabase.from('orders').insert({
        table_id: tableId,
        total_price: total,
        status: 'bekliyor',
        items: items,
      });

      if (error) throw error;

      setIsSuccess(true);
      clearCart();
      toast.success("Siparişiniz mutfağa iletildi! 👨‍🍳");

    } catch (error) {
      console.error(error);
      toast.error("Bir sorun oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 1. DURUM: SİPARİŞ BAŞARILI EKRANI ---
  if (isSuccess) {
    return (
      <Drawer open={true} onOpenChange={(open) => !open && setIsSuccess(false)}>
        <DrawerContent className="bg-[#FAF9F6]">
          <div className="mx-auto w-full max-w-md p-8 flex flex-col items-center text-center justify-center min-h-[50vh]">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            
            <DrawerHeader className="p-0 mb-2">
                <DrawerTitle className="text-3xl font-black text-gray-900 text-center">
                    Order Placed!
                </DrawerTitle>
                <DrawerDescription className="text-gray-500 font-medium text-center">
                    Order sent to kitchen for Table {tableId}.<br/> Sit tight, it's getting smashed!
                </DrawerDescription>
            </DrawerHeader>

            <DrawerClose asChild>
              <Button 
                onClick={() => setIsSuccess(false)}
                className="w-full h-14 bg-gray-900 text-white rounded-2xl font-bold mt-8"
              >
                Close & Keep Browsing
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // --- 2. DURUM: NORMAL SEPET EKRANI ---
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 cursor-pointer group">
          <div className="w-full bg-neutral-900 text-white rounded-3xl py-4 px-6 flex justify-between items-center shadow-2xl shadow-neutral-900/20 group-hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white w-8 h-8 rounded-full text-xs flex items-center justify-center font-bold">
                {totalItems}
              </div>
              <span className="font-bold text-lg">View Order</span>
            </div>
            <span className="font-bold text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="bg-[#FAF9F6] outline-none">
        <div className="mx-auto w-full max-w-md flex flex-col max-h-[85vh]">
          
          <DrawerHeader className="border-b border-gray-100 pb-4 flex-shrink-0">
            <DrawerTitle className="text-3xl font-black text-gray-900 flex items-center gap-2">
              Your Tray <span className="text-orange-500 text-4xl">.</span>
            </DrawerTitle>
            <DrawerDescription className="text-gray-400 text-sm font-medium">
              Table {tableId} • {totalItems} items
            </DrawerDescription>
          </DrawerHeader>

          <ScrollArea className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-3xl flex gap-4 shadow-sm border border-gray-100 items-center">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image_url || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                    {item.extras && item.extras.length > 0 && (
                      <p className="text-xs text-gray-400 font-medium truncate">
                        {item.extras.join(", ")}
                      </p>
                    )}
                    <p className="text-[#FF9F9F] font-bold mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-2xl p-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-900 hover:bg-orange-100 transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => {
                        if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                        else removeItem(item.id);
                      }}
                      className="w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-900 hover:bg-red-100 transition"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-red-500" /> : <Minus className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <DrawerFooter className="bg-white border-t border-gray-100 p-6 flex-shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm font-bold text-gray-400">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-400">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 mt-4 pt-4 border-t border-dashed border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              className="w-full h-16 bg-[#FF9F9F] hover:bg-[#ff8a8a] text-white rounded-[2rem] text-lg font-black shadow-lg shadow-red-100 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleCheckout}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Checkout Items • ${total.toFixed(2)}</>
              )}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}