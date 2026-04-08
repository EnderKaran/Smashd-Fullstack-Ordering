"use client";

import { useState, useMemo } from "react";
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

// Tip tanımları
interface CustomizationOption {
  id: string;
  name: string;
  price_modifier: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  badge?: string;
  customizations?: CustomizationOption[];
}

export function ProductDrawer({ product, children }: { product: Product, children: React.ReactNode }) {
  const addItem = useCartStore((state) => state.addItem);
  
  // State'ler
  const [selectedBun, setSelectedBun] = useState("Brioche");
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<CustomizationOption[]>([]);

  // Veritabanından gelene kadar varsayılan ekstralar (Resimdeki liste)
  const defaultExtras = [
    { id: "1", name: "Extra Bacon", price_modifier: 2.00 },
    { id: "2", name: "No Pickles", price_modifier: 0 },
    { id: "3", name: "Grilled Onions", price_modifier: 0 },
    { id: "4", name: "Extra Sauce", price_modifier: 0.50 },
    { id: "5", name: "No Tomato", price_modifier: 0 },
  ];

  const currentOptions = product.customizations || defaultExtras;

  // Toplam Fiyat Hesaplama
  const totalPrice = useMemo(() => {
    const extrasTotal = selectedExtras.reduce((sum, item) => sum + Number(item.price_modifier), 0);
    return (product.price + extrasTotal) * quantity;
  }, [product.price, selectedExtras, quantity]);

  const toggleExtra = (option: CustomizationOption) => {
    setSelectedExtras((prev) => {
      const isAlreadySelected = prev.find((i) => i.id === option.id);
      if (isAlreadySelected) return prev.filter((i) => i.id !== option.id);
      if (prev.length >= 3) {
        toast.error("En fazla 3 adet seçim yapabilirsiniz!");
        return prev;
      }
      return [...prev, option];
    });
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: totalPrice / quantity, // Birim fiyat + ekstralar
      image_url: product.image_url,
      quantity: quantity,
      extras: [selectedBun, ...selectedExtras.map(e => e.name)]
    });
    toast.success(`${product.name} sepete eklendi!`);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-white">
        <div className="mx-auto w-full max-w-md flex flex-col h-[85vh]">
          
          {/* 📜 Kaydırılabilir İçerik Alanı */}
          <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
            <DrawerHeader className="px-0">
              <div className="relative h-64 w-full mb-6 mt-2">
                <Image src={product.image_url} alt={product.name} fill className="object-cover rounded-[2.5rem]" priority />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-wider">{product.badge}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-start mb-2 text-left">
                <div className="flex-1">
                  <DrawerTitle className="text-3xl font-black text-gray-900 leading-tight">
                    {product.name}
                  </DrawerTitle>
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
              <DrawerDescription className="text-left text-gray-400 font-medium text-xs leading-relaxed mt-2">
                {product.description}
              </DrawerDescription>
            </DrawerHeader>

            <div className="py-4 space-y-8">
              {/* Ekmek Seçimi */}
              <section>
                <h4 className="font-black text-gray-900 text-sm mb-3 flex items-center gap-2">🥪 Choose your bun</h4>
                <div className="flex gap-3">
                  {["Brioche", "Potato Roll"].map((bun) => (
                    <button key={bun} onClick={() => setSelectedBun(bun)} className={`flex-1 py-4 border-2 rounded-2xl text-[10px] font-bold transition-all ${selectedBun === bun ? "border-orange-200 bg-orange-50" : "border-gray-100"}`}>
                      {bun}
                    </button>
                  ))}
                </div>
              </section>

              {/* Özelleştirme (Customize it) */}
              <section className="pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-black text-gray-900 text-sm">🚧 Customize it</h4>
                  <span className="text-[10px] font-bold bg-red-100 text-red-500 px-2 py-0.5 rounded-full">Up to 3</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentOptions.map((option) => {
                    const isSelected = selectedExtras.some(i => i.id === option.id);
                    return (
                      <button key={option.id} onClick={() => toggleExtra(option)} className={`px-4 py-2.5 rounded-full border-2 text-[10px] font-bold transition-all ${isSelected ? "bg-red-50 border-red-200 text-red-600" : "bg-white border-gray-100 text-gray-500"}`}>
                        {option.name} {option.price_modifier > 0 && `+$${option.price_modifier.toFixed(2)}`}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>

          {/* 🏁 Sabit Alt Panel (Footer) */}
          <DrawerFooter className="px-6 pt-4 pb-10 bg-white border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-6 bg-gray-100 px-5 py-3 rounded-2xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-black transition-all">
                  <Minus size={20} strokeWidth={3} />
                </button>
                <span className="font-black text-lg min-w-[20px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-black transition-all">
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Total</p>
                <p className="text-2xl font-black text-gray-900">${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <DrawerClose asChild>
              <Button onClick={handleAddToCart} className="w-full h-16 bg-[#FF9F9F] hover:bg-[#ff8a8a] text-white rounded-[2rem] text-lg font-black shadow-lg shadow-red-100 active:scale-[0.98] transition-all">
                Add to Tray <span className="ml-2">→</span>
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}