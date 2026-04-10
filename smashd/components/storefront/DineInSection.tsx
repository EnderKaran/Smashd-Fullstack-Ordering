import { QrCode, CreditCard, Utensils } from "lucide-react";
import Link from "next/link";

export default function DineInSection() {
  const steps = [
    {
      icon: <QrCode size={20} className="text-[#FF8A8A]" />,
      title: "Scan the QR code",
      text: "Find the unique code on your table and point your camera."
    },
    {
      icon: <CreditCard size={20} className="text-[#FF8A8A]" />,
      title: "Order & Pay",
      text: "Browse the full menu, customize your burger, and checkout instantly."
    },
    {
      icon: <Utensils size={20} className="text-[#FF8A8A]" />,
      title: "We bring the food to you!",
      text: "Sit back and relax. Our servers will deliver your meal to your table."
    }
  ];

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* SOL TARAF: Telefon Mockup (CSS ile İnşa Edildi) */}
        <div className="relative flex justify-center items-center order-2 lg:order-1">
          {/* Arka plandaki o sarı/pembe yumuşak parlama */}
          <div className="absolute w-[300px] h-[300px] bg-yellow-100/50 rounded-full blur-[100px] -z-10"></div>
          
          {/* Telefon Gövdesi */}
          <div className="relative w-[280px] h-[580px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Telefon Ekranı (İçerik) */}
            <div className="w-full h-full bg-white relative p-6 flex flex-col items-center justify-center text-center">
              
              {/* Ekran Üstü Kamera Boşluğu (Dynamic Island tarzı) */}
              <div className="absolute top-2 w-20 h-5 bg-gray-900 rounded-full"></div>

              {/* Ekrandaki QR Tarama Simülasyonu */}
              <div className="relative w-40 h-40 border-2 border-[#FF8A8A] rounded-3xl flex items-center justify-center mb-8 overflow-hidden">
                <QrCode size={80} className="text-gray-100" />
                {/* Animasyonlu Tarama Çizgisi */}
                <div className="absolute w-full h-1 bg-[#FF8A8A] shadow-[0_0_15px_#FF8A8A] animate-[scan_3s_ease-in-out_infinite]"></div>
              </div>

              <h4 className="text-lg font-black text-gray-900 mb-2 leading-tight">Scanning...</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-10">Table #04 - SmashBurger HQ</p>

              {/* Ekran Altındaki Buton Görüntüsü */}
              <div className="w-full h-10 bg-[#FF8A8A] rounded-xl flex items-center justify-center text-white text-[10px] font-black uppercase tracking-wider">
                Order Now
              </div>
            </div>
          </div>
          
          {/* Mockup'ı destekleyen yüzen kartlar (opsiyonel tasarım detayı) */}
          <div className="absolute -right-4 top-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 animate-bounce duration-[5000ms]">
             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                <CreditCard size={20} />
             </div>
             <p className="text-[8px] font-black text-gray-400">Payment Verified</p>
          </div>
        </div>

        {/* SAĞ TARAF: İçerik */}
        <div className="flex flex-col items-start order-1 lg:order-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#FF8A8A] mb-4">
             Order from your table
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-8 leading-[1.1]">
            Dine-In <br />
            <span className="text-gray-400">Simplified</span>
          </h2>

          <div className="space-y-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center group-hover:bg-[#FF8A8A]/10 group-hover:scale-110 transition-all duration-300 font-black text-gray-900">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-sm">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/tables" className="mt-12">
            <button className="h-14 px-10 bg-[#FF8A8A] hover:bg-[#FF6B6B] text-white rounded-full font-black shadow-xl shadow-[#FF8A8A]/30 transition-all active:scale-95 text-sm uppercase tracking-wider">
               Try it Now
            </button>
          </Link>
        </div>

      </div>

      {/* Tarama Animasyonu İçin CSS Keyframes */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 100%; opacity: 1; }
        }
      `}</style>
    </section>
  );
}