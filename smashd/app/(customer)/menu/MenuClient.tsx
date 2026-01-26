"use client";

import { useState } from "react";
import { BurgerCard } from "@/components/BurgerCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

  // Filtreleme mantığı
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category_id === activeCategory);

  return (
    <>
      {/* Kategori Menüsü */}
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
            {categories.map((cat) => (
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

      {/* Ürün Listesi */}
      <main className="flex-1 px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <BurgerCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}