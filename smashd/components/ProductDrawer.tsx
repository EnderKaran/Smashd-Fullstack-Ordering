// components/ProductDrawer.tsx
"use client";

import Image from 'next/image';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/useCartStore"; // Zustand store yolu
import { toast } from "sonner"; // Bildirim için
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  badge?: string;
}

export function ProductDrawer({ product, children }: { product: Product, children: React.ReactNode }) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedBun, setSelectedBun] = useState("Brioche"); 

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
      extras: [selectedBun]
    });

    toast.success(`${product.name} sepete eklendi! 🍔`, {
      description: "Siparişinizi tamamlamak için Tray kısmına göz atın.",
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <div className="mx-auto w-full max-w-sm px-4">
          <DrawerHeader className="px-0">
            {/* Üst Görsel Alanı */}
            <div className="relative h-72 w-full mb-6 mt-4">
              <Image 
                src={product.image_url} 
                alt={product.name}
                fill
                className="object-cover rounded-[2.5rem]"
                sizes="(max-width: 640px) 100vw, 400px"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider">{product.badge}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-start mb-2">
              <div>
                <DrawerTitle className="text-3xl font-black text-gray-900 leading-tight">
                  {product.name}
                </DrawerTitle>
                {/* Kalori ve Puan */}
                <div className="flex items-center gap-2 mt-1 text-xs font-bold">
                  <span className="text-orange-500">🔥 980 Cal</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-900">⭐ 4.9 <span className="text-gray-400 font-medium">(1.2k reviews)</span></span>
                </div>
              </div>
              <span className="text-2xl font-black text-[#FF9F9F]">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            <DrawerDescription className="text-gray-500 font-medium text-sm leading-relaxed mt-2">
              {product.description}
            </DrawerDescription>
          </DrawerHeader>

          {/* Özelleştirme Seçenekleri  */}
          <div className="py-4 space-y-6">
            <div>
              <h4 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                🥪 Choose your bun
              </h4>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedBun("Brioche")}
                  className={`flex-1 py-4 border-2 rounded-2xl transition-all ${
                    selectedBun === "Brioche" 
                    ? "border-orange-200 bg-orange-50 ring-1 ring-orange-200" 
                    : "border-gray-100 bg-white"
                  }`}
                >
                  <span className="block text-sm font-bold">Brioche</span>
                  <span className={`text-[10px] ${selectedBun === "Brioche" ? "text-orange-400" : "text-gray-400"}`}>
                    Classic & Sweet
                  </span>
                </button>
                <button 
                  onClick={() => setSelectedBun("Potato Roll")}
                  className={`flex-1 py-4 border-2 rounded-2xl transition-all ${
                    selectedBun === "Potato Roll" 
                    ? "border-orange-200 bg-orange-50 ring-1 ring-orange-200" 
                    : "border-gray-100 bg-white"
                  }`}
                >
                  <span className="block text-sm font-bold">Potato Roll</span>
                  <span className={`text-[10px] ${selectedBun === "Potato Roll" ? "text-orange-400" : "text-gray-400"}`}>
                    Soft & Fluffy
                  </span>
                </button>
              </div>
            </div>
          </div>

          <DrawerFooter className="px-0 pb-8">
            <DrawerClose asChild>
              <Button 
                onClick={handleAddToCart}
                className="w-full h-16 bg-[#FF9F9F] hover:bg-[#ff8a8a] text-white rounded-[2rem] text-lg font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-red-100"
              >
                Add to Tray <span className="text-xl">→</span>
              </Button>
            </DrawerClose>
            <p className="text-[10px] text-center text-gray-400 font-medium">
              Tax calculated at checkout
            </p>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}