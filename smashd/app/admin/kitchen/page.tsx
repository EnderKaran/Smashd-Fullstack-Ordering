"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { KitchenOrderCard } from "@/components/KitchenOrderCard";
import { ChefHat, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function KitchenPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. İlk Yükleme: Mevcut aktif siparişleri çek
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .neq("status", "tamamlandi") // Tamamlananları getirme
      .order("created_at", { ascending: true }); // En eski sipariş en başta

    if (error) console.error("Siparişler çekilemedi:", error);
    else setOrders(data || []);
    setLoading(false);
  };

  // 2. Ses Çalma Fonksiyonu
  const playSound = () => {
    const audio = new Audio("/ding.mp3");
    audio.play().catch((e) => console.log("Ses çalma hatası (Tarayıcı izni gerekebilir):", e));
  };

  useEffect(() => {
    fetchOrders();

    // 3. REALTIME ABONELİĞİ
    const channel = supabase
      .channel("kitchen-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          console.log("Realtime Değişiklik:", payload);

          if (payload.eventType === "INSERT") {
            // Yeni sipariş geldi!
            setOrders((prev) => [...prev, payload.new]);
            playSound(); // DINK!
            toast.message("🔔 Yeni Sipariş!", { description: `Masa #${payload.new.table_id}` });
          } 
          else if (payload.eventType === "UPDATE") {
            if (payload.new.status === "tamamlandi") {
              setOrders((prev) => prev.filter((o) => o.id !== payload.new.id));
            } else {
              setOrders((prev) => prev.map((o) => (o.id === payload.new.id ? payload.new : o)));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Sipariş Durumu Güncelleme Fonksiyonu
  const updateStatus = async (id: string, newStatus: string) => {
    if (newStatus === "tamamlandi") {
        setOrders((prev) => prev.filter((o) => o.id !== id));
    } else {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    }

    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
        toast.error("Güncelleme başarısız!");
        fetchOrders(); // Hata olursa eski veriyi geri getir
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Üst Bar */}
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">KITCHEN DISPLAY SYSTEM</h1>
          <p className="text-sm text-gray-400 font-medium">Live Orders Feed • {orders.length} Active</p>
        </div>
        <div className="flex gap-4">
             <div className="bg-orange-100 px-4 py-2 rounded-xl text-orange-600 font-bold text-sm">
                🔥 Busy Mode
             </div>
        </div>
      </header>

      {/* Sipariş Izgarası */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
          <ChefHat className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-xl font-bold">All caught up!</p>
          <p>Waiting for new orders...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {orders.map((order) => (
            <KitchenOrderCard 
                key={order.id} 
                order={order} 
                onUpdateStatus={updateStatus} 
            />
          ))}
        </div>
      )}
    </div>
  );
}