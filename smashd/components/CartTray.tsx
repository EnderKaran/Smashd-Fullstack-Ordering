"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/store/useCartStore";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CartTray() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) return null;

  const totalPrice = getTotalPrice();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Drawer>
      {/* TETİKLEYİCİ: Alt Siyah Bar (View Order) */}
      <DrawerTrigger asChild>
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 cursor-pointer group">
          <div className="w-full bg-neutral-900 text-white rounded-3xl py-4 px-6 flex justify-between items-center shadow-2xl shadow-neutral-900/20 group-hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white w-8 h-8 rounded-full text-xs flex items-center justify-center font-bold">
                {totalItems}
              </div>
              <span className="font-bold text-lg">View Order</span>
            </div>
            <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </DrawerTrigger>

      {/* İÇERİK: Açılan Sepet (Tray) */}
      <DrawerContent className="bg-[#FAF9F6] max-h-[90vh]">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="border-b border-gray-100 pb-4">
            <DrawerTitle className="text-3xl font-black text-gray-900 flex items-center gap-2">
              Your Tray <span className="text-orange-500 text-4xl">.</span>
            </DrawerTitle>
            <p className="text-gray-400 text-sm font-medium">
              You're {totalItems} items away from happiness.
            </p>
          </DrawerHeader>

          {/* Ürün Listesi */}
          <ScrollArea className="h-[50vh] px-4 py-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-3xl flex gap-4 shadow-sm border border-gray-100 items-center"
                >
                  {/* Resim */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image_url || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>

                  {/* Detaylar */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                    {/* Ekstralar */}
                    {item.extras && item.extras.length > 0 && (
                      <p className="text-xs text-gray-400 font-medium truncate">
                        {item.extras.join(", ")}
                      </p>
                    )}
                    <p className="text-[#FF9F9F] font-bold mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Miktar Kontrolü */}
                  <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-2xl p-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-900 hover:bg-orange-100 transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.id, item.quantity - 1);
                        } else {
                          removeItem(item.id);
                          toast.error("Ürün sepetten çıkarıldı");
                        }
                      }}
                      className="w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-900 hover:bg-red-100 transition"
                    >
                      {item.quantity === 1 ? (
                        <Trash2 className="w-3 h-3 text-red-500" />
                      ) : (
                        <Minus className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Alt Özet ve Checkout */}
          <DrawerFooter className="bg-white border-t border-gray-100 p-6 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm font-bold text-gray-400">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-400">
                <span>Tax (8%)</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 mt-4 pt-4 border-t border-dashed border-gray-200">
                <span>Total</span>
                <span>${(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <DrawerClose asChild>
                
                <Button 
                  className="w-full h-16 bg-[#FF9F9F] hover:bg-[#ff8a8a] text-white rounded-[2rem] text-lg font-black shadow-lg shadow-red-100 active:scale-95 transition-all"
                  onClick={() => toast.success("Ödeme adımına geçiliyor! 💸")}
                >
                  Checkout Items
                </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}