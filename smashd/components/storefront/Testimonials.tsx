import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "REGULAR",
      comment: "Best smash burger in town! The crispy edges are exactly what I've been looking for. Totally addicted now.",
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
      id: 2,
      name: "Jordan Lee",
      role: "FOOD BLOGGER",
      comment: "I drove 40 minutes just to try this and it was worth every second. That house-made sauce is absolute magic!",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: 3,
      name: "Casey West",
      role: "VERIFIED BUYER",
      comment: "The vibe, the branding, and most importantly the taste - everything is 10/10. My new favorite spot for lunch.",
      avatar: "https://i.pravatar.cc/150?img=32"
    }
  ];

  return (
    // Arka planı tekrar beyaza (bg-white) çekiyoruz ki Our Process'in grisinden ayrılsın
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Üst Başlık Kısmı */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#FF8A8A] mb-4">
            Community Love
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
            Customer Testimonials
          </h2>
          {/* Başlığın altındaki o tatlı tasarım çizgisi */}
          <div className="w-16 h-1 bg-[#FF8A8A] rounded-full mt-6"></div>
        </div>

        {/* Yorum Kartları Grid Yapısı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="relative bg-white p-8 md:p-10 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group cursor-default"
            >
              
              {/* Kartın sağ üstündeki o tasarım detayı (Pembe/Somon Blob) */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF8A8A]/10 rounded-full blur-2xl group-hover:bg-[#FF8A8A]/20 transition-colors duration-500 pointer-events-none"></div>

              {/* Yıldızlar */}
              <div className="flex gap-1 text-yellow-400 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="drop-shadow-sm" />
                ))}
              </div>

              {/* Yorum Metni */}
              <p className="text-gray-600 font-medium leading-relaxed mb-8 relative z-10">
                "{review.comment}"
              </p>

              {/* Kullanıcı Bilgileri */}
              <div className="flex items-center gap-4 relative z-10 mt-auto">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full border-2 border-gray-50 shadow-sm object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-black text-gray-900">
                    {review.name}
                  </span>
                  <span className="text-[9px] font-bold text-[#FF8A8A] tracking-widest uppercase">
                    {review.role}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}