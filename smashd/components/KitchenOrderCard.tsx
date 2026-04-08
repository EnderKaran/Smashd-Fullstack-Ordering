"use client";

import { useState, useEffect } from "react";
import { Check, Clock } from "lucide-react";

export function KitchenOrderCard({ order, onUpdateStatus, isHistoryView }: { order: any, onUpdateStatus: any, isHistoryView: boolean }) {
  const [elapsedTime, setElapsedTime] = useState("--:--");

  // 🕒 Canlı Sayaç Kontrolü
  useEffect(() => {
    // Geçmiş görünümündeyse veya sipariş zaten tamamlandıysa sayacı çalıştırma
    if (isHistoryView || order.status === "tamamlandi") {
      setElapsedTime("00:00");
      return;
    }

    const timer = setInterval(() => {
      const start = new Date(order.created_at).getTime();
      const now = new Date().getTime();
      const diff = Math.floor((now - start) / 1000);
      const mins = Math.floor(diff / 60);
      const secs = diff % 60;
      setElapsedTime(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [order.created_at, isHistoryView, order.status]);

  const isReady = order.status === "hazir";
  const isInPrep = order.status === "hazirlaniyor";
  const isFinished = order.status === "tamamlandi" || isHistoryView;

  // 🎨 Görsel Durumlar (Tasarımına Göre)
  const headerBg = isFinished ? "bg-green-100" : (isReady ? "bg-[#FF9F9F]" : "bg-[#FFD666]");
  const statusLabel = isFinished ? "COMPLETED" : (isReady ? "ORDER READY" : (isInPrep ? "ON THE GRILL" : "NEW ORDER"));
  const buttonLabel = isReady ? "COMPLETE" : (isInPrep ? "BUMP" : "START PREP");
  const buttonBg = isReady ? "bg-[#FF9F9F] hover:bg-[#ff8585]" : "bg-black hover:bg-gray-800";

  return (
    <div className={`bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col min-h-[400px] transition-all duration-300 ${isFinished ? 'opacity-80' : 'opacity-100'}`}>
      
      {/* 🔝 Card Header */}
      <div className={`p-5 ${headerBg} flex flex-col transition-colors duration-500`}>
        <div className="flex justify-between items-start text-black">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
              {order.address || "Table 4"} • {statusLabel}
            </p>
            <h2 className="text-4xl font-black tracking-tighter mt-1">#{order.id.slice(0, 4)}</h2>
          </div>
          <div className="flex flex-col items-end">
            {isFinished ? (
               <div className="bg-white/50 p-2 rounded-full"><Check size={20} className="text-green-600" /></div>
            ) : (
              <>
                <Clock size={20} className="mb-1" />
                <span className="text-2xl font-black">{elapsedTime}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 📦 Card Body */}
      <div className="p-6 flex-1 text-left">
        <ul className="space-y-6">
          {order.items?.map((item: any, idx: number) => (
            <li key={idx} className="group">
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isReady || isFinished ? 'bg-black border-black' : 'border-gray-200'}`}>
                  {(isReady || isFinished) && <Check size={14} className="text-white" />}
                </div>
                <div>
                  <p className={`text-xl font-black tracking-tight ${isReady || isFinished ? 'line-through text-gray-300' : 'text-gray-900'}`}>
                    {item.quantity}x {item.name}
                  </p>
                  {item.extras?.map((extra: string, eIdx: number) => (
                    <p key={eIdx} className="text-[10px] font-black text-red-500 uppercase mt-1 tracking-widest">
                      {extra}
                    </p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 🏁 Card Footer */}
      <div className="p-4 pt-0">
        {isFinished ? (
           <div className="w-full py-5 rounded-2xl bg-gray-50 text-gray-400 font-black text-[10px] tracking-widest uppercase text-center border border-dashed border-gray-200">
             Archived Order
           </div>
        ) : (
          <button 
            onClick={() => onUpdateStatus(order.id, order.status)}
            className={`w-full py-5 rounded-2xl text-white font-black text-sm tracking-widest transition-all active:scale-95 ${buttonBg}`}
          >
            {isReady && <Check className="inline-block mr-2 w-5 h-5" />}
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
}