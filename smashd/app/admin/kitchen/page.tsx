"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { KitchenOrderCard } from "@/components/KitchenOrderCard";
import { ChefHat, Loader2, History, Power } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function KitchenPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"active" | "history">("active");

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase.from("orders").select("*");

    if (view === "active") {
      query = query.neq("status", "tamamlandi");
    } else {
      query = query.eq("status", "tamamlandi");
    }

    const { data, error } = await query.order("created_at", { ascending: view === "active" });

    if (error) toast.error("Failed to load orders");
    else setOrders(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast.success("Logged out safely");
      router.push("/admin/login"); //
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [view]);

  // Realtime sadece aktif görünümdeyken çalışır
  useEffect(() => {
    const channel = supabase
      .channel("kitchen-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => fetchOrders())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [view]);

  const updateStatus = async (id: string, currentStatus: string) => {
    let nextStatus = "hazirlaniyor";
    if (currentStatus === "hazirlaniyor") nextStatus = "hazir";
    else if (currentStatus === "hazir") nextStatus = "tamamlandi";

    const { error } = await supabase.from("orders").update({ status: nextStatus }).eq("id", id);
    if (error) toast.error("Update failed");
    else fetchOrders();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 text-left">
          <div className="bg-black p-3 rounded-2xl"><ChefHat className="text-white w-6 h-6" /></div>
          <div>
            <h1 className="text-xl font-black text-gray-900 leading-none">KDS Station 1</h1>
            <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">
              {view === "active" ? "Live Feed" : "Archived"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-1">
            <button 
              onClick={() => setView("active")}
              className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${view === "active" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
            >
              Active
            </button>
            <button 
              onClick={() => setView("history")}
              className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${view === "history" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
            >
              History
            </button>
          </div>

          <button onClick={handleLogout} className="w-12 h-12 rounded-full border border-red-50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all">
            <Power size={20} />
          </button>
        </div>
      </header>

      {loading ? (
        <div className="h-[50vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-400" /></div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {orders.length === 0 ? (
            <div className="h-[40vh] flex flex-col items-center justify-center text-gray-300">
               <History size={64} className="opacity-10 mb-4" />
               <p className="text-lg font-black uppercase tracking-widest">Clean Station!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {orders.map((order) => (
                <KitchenOrderCard key={order.id} order={order} onUpdateStatus={updateStatus} isHistoryView={view === "history"} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}