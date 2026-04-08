"use client";

import { useState, useMemo, useEffect } from "react";
import Image from 'next/image';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/useCartStore";
import { toast } from "sonner";
import { Plus, Minus } from "lucide-react";

export function ProductDrawer({ product, children }: { product: any, children: React.ReactNode }) {
  const addItem = useCartStore((state) => state.addItem);
  
  // Hydration hatasını engellemek için mounted kontrolü
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [selectedBun, setSelectedBun] = useState("Brioche");
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<any[]>([]);

  // Supabase Kategori ID Kontrolleri
  const DRINK_ID = "2e4f7fb-decf-443b-a181-5a981d97f88e";
  const SHAKE_ID = "2e42dba7-5a54-4264-b24b-93590b42882";
  const isDrinkOrShake = product.category_id === DRINK_ID || product.category_id === SHAKE_ID;

  const drinkOptions = [
    { id: "d1", name: "No Ice", price: 0 },
    { id: "d2", name: "Extra Ice", price: 0 },
    { id: "d3", name: "Less Sugar", price: 0 },
    { id: "d4", name: "Add Lemon", price: 0.50 },
  ];

  const burgerOptions = [
    { id: "1", name: "Extra Bacon", price: 2.00 },
    { id: "2", name: "No Pickles", price: 0 },
    { id: "3", name: "Grilled Onions", price: 0 },
    { id: "4", name: "Extra Sauce", price: 0.50 },
    { id: "5", name: "No Tomato", price: 0 },
  ];

  const currentExtras = isDrinkOrShake ? drinkOptions : burgerOptions;

  const totalPrice = useMemo(() => {
    const extrasTotal = selectedExtras.reduce((sum, item) => sum + item.price, 0);
    return (product.price + extrasTotal) * quantity;
  }, [product.price, selectedExtras, quantity]);

  const toggleExtra = (option: any) => {
    setSelectedExtras((prev) => {
      const exists = prev.find((i) => i.id === option.id);
      if (exists) return prev.filter((i) => i.id !== option.id);
      if (prev.length >= 3) {
        toast.error("Up to 3 selections allowed!");
        return prev;
      }
      return [...prev, option];
    });
  };

  if (!mounted) return <>{children}</>;

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-white">
        <div className="mx-auto w-full max-w-md flex flex-col max-h-[92dvh]">
          
          <div className="flex-1 overflow-y-auto px-6 pt-2 no-scrollbar">
            <DrawerHeader className="px-0 pb-4">
              <div className="relative h-48 w-full mb-4 mt-2">
                <Image src={product.image_url} alt={product.name} fill className="object-cover rounded-[2rem]" priority />
              </div>
              <div className="flex justify-between items-start text-left">
                <div className="flex-1">
                  <DrawerTitle className="text-2xl font-black text-gray-900 leading-tight">{product.name}</DrawerTitle>
                  <div className="flex items-center gap-2 mt-1 text-[10px] font-bold">
                    <span className={isDrinkOrShake ? "text-blue-500" : "text-orange-500"}>
                      {isDrinkOrShake ? "💧 Fresh & Cold" : "🔥 980 Cal"}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-900">⭐ 4.9</span>
                  </div>
                </div>
                <span className="text-xl font-black text-[#FF9F9F]">${product.price}</span>
              </div>
              <DrawerDescription className="text-left text-gray-400 font-medium text-[10px] mt-2">
                {product.description}
              </DrawerDescription>
            </DrawerHeader>

            <div className="space-y-5 pb-6">
              {!isDrinkOrShake && (
                <section>
                  <h4 className="font-black text-gray-900 text-[11px] mb-2">🥪 Choose your bun</h4>
                  <div className="flex gap-2">
                    {["Brioche", "Potato Roll"].map((bun) => (
                      <button key={bun} onClick={() => setSelectedBun(bun)} className={`flex-1 py-3 border-2 rounded-xl text-[10px] font-bold transition-all ${selectedBun === bun ? "border-orange-200 bg-orange-50 text-orange-600" : "border-gray-100 text-gray-400"}`}>
                        {bun}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-black text-gray-900 text-[11px]">{isDrinkOrShake ? "🥤 Drink Options" : "🚧 Customize it"}</h4>
                  <span className="text-[8px] font-bold bg-red-100 text-red-500 px-2 py-0.5 rounded-full">UP TO 3</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentExtras.map((option) => {
                    const isSelected = selectedExtras.some(i => i.id === option.id);
                    return (
                      <button key={option.id} onClick={() => toggleExtra(option)} className={`px-3 py-2 rounded-full border-2 text-[10px] font-bold transition-all ${isSelected ? (isDrinkOrShake ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-red-50 border-red-200 text-red-600") : "bg-white border-gray-100 text-gray-400"}`}>
                        {option.name} {option.price > 0 && `+$${option.price.toFixed(2)}`}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>

          <div className="mt-auto border-t border-gray-100 bg-white px-6 py-4 pb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-black"><Minus size={16} strokeWidth={3} /></button>
                <span className="font-black text-md min-w-[15px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-black"><Plus size={16} strokeWidth={3} /></button>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-bold text-gray-400 uppercase">Total Price</p>
                <p className="text-xl font-black text-gray-900">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <DrawerClose asChild>
              <Button onClick={() => {
                addItem({ ...product, price: totalPrice/quantity, quantity, extras: isDrinkOrShake ? selectedExtras.map(e => e.name) : [selectedBun, ...selectedExtras.map(e => e.name)] });
                toast.success("Added to tray!");
              }} className="w-full h-14 bg-[#FF9F9F] hover:bg-[#ff8a8a] text-white rounded-[2rem] text-md font-black">
                Add to Tray <span className="ml-2">→</span>
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}