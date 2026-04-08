"use client";

import { useState } from "react";
import { BurgerCard } from "@/components/BurgerCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  badge?: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
}

interface MenuClientProps {
  categories: Category[];
  products: Product[];
}

export default function MenuClient({ categories, products }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products?.filter(p => p.category_id === activeCategory);

  return (
    <>
      {/* 🍔 THE TRIPLE SMASH ATTACK - HERO SECTION */}
      <div className="px-6 mb-8">
        <div className="relative bg-[#2D1B1B] rounded-[40px] overflow-hidden min-h-[380px] flex items-center shadow-2xl shadow-orange-900/20">
          {/* Arka Plan Görseli */}
          <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-40 md:opacity-100">
            <Image 
              src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000&auto=format&fit=crop" 
              alt="Triple Smash Attack"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2D1B1B] via-[#2D1B1B]/40 to-transparent"></div>
          </div>

          {/* İçerik Alanı */}
          <div className="relative z-10 p-8 md:p-12 max-w-xl">
            <span className="inline-block bg-[#FF9F9F] text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-6 tracking-widest">
              LIMITED TIME
            </span>
            
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
              The Triple <br />
              <span className="text-[#FFD666]">Smash Attack</span>
            </h2>
            
            <p className="text-gray-300 text-sm md:text-base font-medium mb-10 leading-relaxed max-w-sm">
              Three smashed patties, triple american cheese, caramelized onions, and our secret sauce on a toasted brioche bun.
            </p>

            <button className="bg-[#FF9F9F] hover:bg-[#ff8a8a] text-black font-black py-4 px-10 rounded-full flex items-center gap-3 transition-all active:scale-95 shadow-lg">
              Order Now <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🏷️ Kategori Menüsü */}
      <div className="px-6 py-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 pb-4">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                activeCategory === "all" ? "bg-yellow-400 text-black shadow-md" : "bg-gray-100 text-gray-500"
              }`}
            >
              All
            </button>
            {/* categories?.map ile güvenli döngü */}
            {categories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full font-bold transition-all ${
                  activeCategory === cat.id ? "bg-yellow-400 text-black shadow-md" : "bg-gray-100 text-gray-500"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      {/* 📦 Ürün Listesi */}
      <main className="flex-1 px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* filteredProducts?.map ile güvenli döngü */}
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <BurgerCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400 font-medium italic">
              Seçilen kategoride ürün bulunamadı.
            </div>
          )}
        </div>
      </main>
    </>
  );
}