"use client";

import { useQRCode } from 'next-qrcode';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function TablesPage() {
  const { Canvas } = useQRCode();
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);


  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  const handlePrint = () => {
    window.print(); // Sayfayı yazdırma penceresini açar
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8 print:hidden">
        <div>
          <Link href="/admin/kitchen" className="text-sm font-bold text-orange-500 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Kitchen
          </Link>
          <h1 className="text-3xl font-black text-gray-900">Table QR Codes</h1>
          <p className="text-gray-400 font-medium">Generate and print QR codes for each table.</p>
        </div>
        <Button onClick={handlePrint} className="bg-gray-900 text-white rounded-2xl h-12 px-6 font-bold">
          <Printer className="mr-2 w-5 h-5" /> Print All Codes
        </Button>
      </header>

      {/* QR Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tables.map((tableNo) => (
          <Card key={tableNo} className="bg-white border-2 border-dashed border-gray-200 rounded-[30px] p-6 flex flex-col items-center text-center shadow-none">
            <div className="bg-gray-900 text-white w-full py-2 rounded-t-2xl font-black text-sm mb-4">
              TABLE {tableNo}
            </div>
            
            {/* QR Kod Bileşeni */}
            <div className="p-4 bg-white rounded-2xl shadow-inner border border-gray-100">
              <Canvas
                text={`${baseUrl}/menu?table=${tableNo}`}
                options={{
                  errorCorrectionLevel: 'M',
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: '#111827',
                    light: '#FFFFFF',
                  },
                }}
              />
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scan to Order</p>
              <p className="text-xs font-medium text-gray-300 truncate w-40">{baseUrl}/menu?table={tableNo}</p>
            </div>
          </Card>
        ))}
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\:hidden { display: none !important; }
          .grid { display: block !important; }
          .bg-white { border: 1px solid #eee !important; page-break-inside: avoid; margin-bottom: 20px; }
        }
      `}</style>
    </div>
  );
}