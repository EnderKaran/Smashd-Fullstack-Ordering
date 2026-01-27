import { supabase } from "@/lib/supabase";
import { BurgerCard } from "@/components/BurgerCard";
import { CartTray } from "@/components/CartTray";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MenuClient from "./MenuClient"; // <-- Client Component'i kullanacağız

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
      {/* Üst Kısım: Başlık ve Açıklama */}
      <header className="p-6 pt-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Signature Smashes <span className="text-orange-500">.</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Crispy edges, juicy centers, and melted cheese on a toasted brioche bun.
        </p>
      </header>

      <MenuClient categories={categories || []} products={products || []} />

      {/* CANLI SEPET ÇEKMECESİ */}
      <CartTray /> 
      
    </div>
  );
}