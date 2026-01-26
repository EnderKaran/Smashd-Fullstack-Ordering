import { supabase } from "@/lib/supabase";
import { BurgerCard } from "@/components/BurgerCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Tip tanımlamaları
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

export default async function MenuPage() {
  const [categoriesResponse, productsResponse] = await Promise.all([
    supabase.from("categories").select("*"),
    supabase.from("products").select("*"),
  ]);

  const categories = categoriesResponse.data as Category[];
  const products = productsResponse.data as Product[];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Üst Kısım: Başlık ve Açıklama  */}
      <header className="p-6 pt-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Signature Smashes <span className="text-orange-500">.</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Crispy edges, juicy centers, and melted cheese on a toasted brioche bun.
        </p>
      </header>

      {/* 2. Yatay Kategori Menüsü */}
      <div className="px-6 py-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 pb-4">
            {/* "All" Butonu varsayılan olarak olsun */}
            <button className="px-8 py-3 rounded-full bg-yellow-400 text-black font-bold shadow-sm transition-all">
              All
            </button>
            {categories?.map((category) => (
              <button
                key={category.id}
                className="px-8 py-3 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all"
              >
                {category.name}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      {/* 3. Ürün Listesi (Grid Yapısı) */}
      <main className="flex-1 px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <BurgerCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* 4. Alt Kısım: "View Order" */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <button className="w-full bg-neutral-900 text-white rounded-2xl py-4 px-6 flex justify-between items-center shadow-2xl hover:bg-black transition-all">
          <div className="flex items-center gap-3">
             <div className="bg-orange-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">
               2
             </div>
             <span className="font-bold">View Order</span>
          </div>
          <span className="font-bold">$19.50</span>
        </button>
      </div>
    </div>
  );
}