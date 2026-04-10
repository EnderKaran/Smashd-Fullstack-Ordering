import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-flash-lite-latest",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0.7,
  });

  try {
    // Verileri çekiyoruz
    const { data: orders, error } = await supabase
      .from("orders")
      .select("created_at, total_price, items")
      .order("created_at", { ascending: false });

    // Hata kontrolü için log ekledik
    if (error) {
      console.error("Supabase Hatasi:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Gelen veriyi konsolda gör (Terminalde gozukur)
    console.log("Cekilen Siparis Sayisi:", orders?.length);

    if (!orders || orders.length === 0) {
      return NextResponse.json({ 
        analysis: "Veritabaninda siparis bulunamadi. Lutfen SQL Editor uzerinden veri eklediginizden ve RLS izinlerini actiginizdan emin olun." 
      });
    }

    const productSales: any = {};
    const dailyTraffic: any = {};
    
    orders.forEach((order) => {
      const date = new Date(order.created_at).toLocaleDateString("tr-TR");
      dailyTraffic[date] = (dailyTraffic[date] || 0) + 1;

      order.items?.forEach((item: any) => {
        productSales[item.name] = (productSales[item.name] || 0) + (item.quantity || 1);
      });
    });

    const prompt = `
      Sen 'AI Chef' isimli bir restoran strateji uzmanisin. Bugun 10 Nisan 2026.
      
      ELINDEKI VERILER:
      - Son satis trafigi (Gunluk): ${JSON.stringify(dailyTraffic)}
      - En cok satan urunler ve adetleri: ${JSON.stringify(productSales)}

      GOREVIN:
      Bu verileri kullanarak bir 'Stratejik Tahmin Raporu' hazirla.
      Onumuzdeki hafta sonu icin stok uyarisi ve personel tavsiyesi ver.
      
      Cevabi profesyonel, kisa ve aksiyon aldiracak netlikte (Turkce) ver.
    `;

    const response = await model.invoke(prompt);
    const content = response.content as string;

    // Analizi kaydet
    await supabase.from("ai_insights").insert([
      { content: content, category: "strategic_prediction" }
    ]);

    return NextResponse.json({ analysis: content });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}