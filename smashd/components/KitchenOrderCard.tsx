"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChefHat, Clock } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  extras?: string[];
}

interface Order {
  id: string;
  table_id: string;
  status: string;
  items: OrderItem[];
  created_at: string;
}

interface KitchenOrderCardProps {
  order: Order;
  onUpdateStatus: (id: string, newStatus: string) => void;
}

export function KitchenOrderCard({ order, onUpdateStatus }: KitchenOrderCardProps) {
  const [elapsedTime, setElapsedTime] = useState("");
  const [isLate, setIsLate] = useState(false);

  // ZAMANLAYICI: Her saniye geçen süreyi hesapla
  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(order.created_at).getTime();
      const now = new Date().getTime();
      const diff = Math.floor((now - start) / 1000); // Saniye cinsinden fark

      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60;
      
      // 20 dakikayı geçerse kartı kırmızı yap (Gecikti uyarısı)
      if (minutes >= 20) setIsLate(true);

      setElapsedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [order.created_at]);

  return (
    <Card className={`border-2 shadow-lg transition-all duration-300 ${
      isLate ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"
    }`}>
      {/* BAŞLIK: Masa No ve Süre */}
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gray-100/50 p-4 border-b">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-lg font-black px-3 py-1 bg-white border-black">
            #{order.table_id}
          </Badge>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Table</span>
        </div>
        <div className={`flex items-center gap-1 font-mono font-bold ${isLate ? "text-red-600 animate-pulse" : "text-gray-500"}`}>
          <Clock className="w-4 h-4" />
          {elapsedTime}
        </div>
      </CardHeader>

      {/* İÇERİK: Ürün Listesi */}
      <CardContent className="p-4 min-h-[180px]">
        <ul className="space-y-3">
          {order.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <div className="bg-gray-200 text-gray-700 font-bold w-6 h-6 flex items-center justify-center rounded-md text-xs shrink-0">
                {item.quantity}x
              </div>
              <div>
                <span className="font-bold text-gray-900 block">{item.name}</span>
                {item.extras && item.extras.length > 0 && (
                  <span className="text-xs text-gray-500 font-medium">
                    + {item.extras.join(", ")}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>

      {/* BUTONLAR: Durum Yönetimi */}
      <CardFooter className="p-3 bg-gray-50 border-t flex gap-2">
        {order.status === "bekliyor" && (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold"
            onClick={() => onUpdateStatus(order.id, "hazirlaniyor")}
          >
            <ChefHat className="mr-2 h-4 w-4" /> Start Prep
          </Button>
        )}

        {order.status === "hazirlaniyor" && (
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 font-bold"
            onClick={() => onUpdateStatus(order.id, "tamamlandi")}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" /> Ready to Serve
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}