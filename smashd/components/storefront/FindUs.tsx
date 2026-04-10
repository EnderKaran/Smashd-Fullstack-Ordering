import { MapPin, Clock, Instagram, Twitter } from "lucide-react";
import findusimage from "@/public/images/findus-image.jpg";

export default function FindUs() {
  return (
    <section id="locations" className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* SOL TARAF: Minimalist Harita Görseli */}
          <div className="relative group">
            {/* Arka plandaki o sarı/pembe aura (blob) */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-yellow-100/50 rounded-full blur-[80px] -z-10 group-hover:bg-yellow-200/50 transition-colors duration-700"></div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group-hover:scale-[1.02] transition-transform duration-500">
              {/* Buraya dükkanın gerçek lokasyonunu gösteren şık bir Google Maps statik görseli veya benzeri gelebilir */}
              <img 
                src={findusimage.src} 
                alt="Our Location" 
                className="w-full h-[450px] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Harita üzerindeki o yüzen lokasyon kartı */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center justify-between border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF8A8A] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#FF8A8A]/30">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 leading-none mb-1">SmashBurger HQ</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">123 Burger Lane, Foodie City</p>
                  </div>
                </div>
                {/* Küçük bir yön tarifi butonu simgesi */}
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF8A8A] shadow-sm border border-gray-100">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* SAĞ TARAF: Bilgiler */}
          <div className="flex flex-col items-start">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FF8A8A] mb-4">
               Visit Us
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-8 leading-[1.1]">
              Find Us
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-10 max-w-md">
              Come say hi! We are located in the heart of the city, serving happiness one smashed patty at a time.
            </p>

            <div className="space-y-8 w-full">
              {/* Adres Bilgisi */}
              <div className="flex items-start gap-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-[#FF8A8A]/10 text-[#FF8A8A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF8A8A] group-hover:text-white transition-all duration-300">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-1 tracking-tight">Address</h3>
                  <p className="text-sm text-gray-500 font-medium">123 Burger Lane, Foodie City, FC 54321</p>
                </div>
              </div>

              {/* Saat Bilgisi */}
              <div className="flex items-start gap-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-[#FF8A8A]/10 text-[#FF8A8A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF8A8A] group-hover:text-white transition-all duration-300">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-1 tracking-tight">Opening Hours</h3>
                  <p className="text-sm text-gray-500 font-medium">Mon-Sun: 11am - 10pm</p>
                </div>
              </div>
            </div>

            {/* Sosyal Medya */}
            <div className="mt-12 w-full pt-10 border-t border-gray-100 flex items-center justify-between lg:justify-start lg:gap-10">
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Follow the Smashed Life</p>
                  <div className="flex gap-4">
                     <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#FF8A8A] hover:shadow-md transition-all">
                        <Instagram size={20} />
                     </a>
                     <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#FF8A8A] hover:shadow-md transition-all">
                        <Twitter size={20} />
                     </a>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}