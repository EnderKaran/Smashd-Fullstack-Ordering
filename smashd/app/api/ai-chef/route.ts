import { ChatOpenAI } from "@langchain/openai";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';

    // 1. VERİ ÇEKME (Siparişler + Vardiyalar)
    const [ordersRes, shiftsRes] = await Promise.all([
      supabase.from("orders").select("total_price, created_at, items").limit(100),
      supabase.from("staff_shifts").select("name, role, shift_start, shift_end")
    ]);

    const orders = ordersRes.data || [];
    const shifts = shiftsRes.data || [];

    // 2. VERİ ÖZETLEME
    const totalRevenue = orders.reduce((acc, o) => acc + (o.total_price || 0), 0);
    const shiftSummary = shifts.map(s => `${s.name} (${s.role}): ${s.shift_start}-${s.shift_end}`).join(", ");

    // 3. MODEL VE PROMPT
    const model = new ChatOpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      modelName: "google/gemini-2.0-flash-001",
      configuration: { baseURL: "https://openrouter.ai/api/v1" },
      temperature: 0.8,
    });

    const prompt = `
      Sen 'Burger SaaS' dükkanının operasyonel yapay zekasısın. 
      VERİLER:
      - Son satış hacmi: $${totalRevenue.toFixed(2)}
      - Bugünün personel vardiyaları: ${shiftSummary}
      - Şu anki tarih/saat: 10 Nisan 2026, 14:00 (Cuma yoğunluğu başlıyor)

      GÖREVİN:
      Satış trendini ve personel sayısını karşılaştır. 
      Eğer akşam yoğunluğu bekleniyorsa ve personel azsa, spesifik isim vererek vardiya uzatma veya destek çağırma tavsiyesi ver.
      Yanıtın Ender'e hitaben, samimi ve operasyonel bir dille (Türkçe) olsun. Tek veya iki cümle.
    `;

    const response = await model.invoke(prompt);
    const content = response.content as string;

    // Analizi kaydet
    await supabase.from("ai_insights").insert([{ content: content, category: 'shift_optimization' }]);

    return NextResponse.json({ analysis: content });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}