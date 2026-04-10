import Link from "next/link";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  tags?: string[];
}

export default async function SignatureMenu() {
  // 2. SUPABASE BAĞLANTISI: Server tarafında veriyi çekiyoruz
  const supabase = createClient();
  
  // products tablosundan en çok satan/öne çıkan 3 ürünü çekiyoruz
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .limit(3);

  if (error) {
    console.error("Supabase Error fetching signature menu:", error.message);
  }

  return (
    <section id="menu" className="w-full py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Üst Başlık Kısmı */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#FF8A8A] mb-4">
            Our Favorites
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6">
            Signature Menu
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed">
            Crafted with passion, smashed to perfection. Explore the top-rated burgers that put us on the map.
          </p>
        </div>

        {/* 3. VERİ KONTROLÜ: Ürün Yoksa veya Hata Varsa Şık Bir Uyarı Göster */}
        {!products || products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-[2.5rem] border border-gray-100 border-dashed mb-16">
             <UtensilsCrossed size={48} className="mb-4 text-gray-200" />
             <h3 className="text-xl font-bold text-gray-900">Menu is updating...</h3>
             <p className="text-sm mt-2">Our chefs are preparing something special. Check back soon!</p>
          </div>
        ) : (
          /* Ürün Grid Kartları */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {products.map((product: Product) => (
              <div 
                key={product.id} 
                className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* Görsel ve Fiyat Etiketi */}
                <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 bg-gray-50 flex items-center justify-center">
                  <img 
                    // Supabase'de resim sütunu 'image_url' ise onu, yoksa fallback (yedek) görseli kullanır
                    src={product.image_url || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Fiyat Rozeti */}
                  <div className="absolute top-4 right-4 bg-[#FF8A8A] text-white font-black px-4 py-2 rounded-full shadow-lg text-sm">
                    ${product.price}
                  </div>
                </div>

                {/* Ürün İçeriği */}
                <div className="px-2 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-3">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed mb-6 flex-grow">
                    {product.description}
                  </p>
                  
                  {/* Ürün Etiketleri (Eğer Supabase'de tags dizisi varsa gösterir) */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {product.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Tüm Menüyü Gör Butonu */}
        <div className="flex justify-center">
          <Link href="/order">
            <button className="flex items-center gap-3 h-14 px-8 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-100 rounded-full font-black shadow-sm transition-all active:scale-95 text-sm uppercase tracking-wider group">
              View Full Menu 
              <ArrowRight size={18} className="text-[#FF8A8A] group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}