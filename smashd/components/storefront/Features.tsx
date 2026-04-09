import { Flame, Clock, Wheat } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Flame size={24} />,
      title: "Freshly Smashed",
      description: "Never frozen. We smash fresh Angus beef balls onto a screaming hot griddle."
    },
    {
      icon: <Clock size={24} />,
      title: "Ready in 5 Mins",
      description: "Fast food, elevated. Get your premium burger fix without the long wait."
    },
    {
      icon: <Wheat size={24} />,
      title: "House-Made Buns",
      description: "Baked fresh every morning. Soft, pillowy potato buns that hold it all together."
    }
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-white relative z-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 text-center">
        
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center group cursor-pointer">
            
            <div className="w-16 h-16 rounded-full bg-[#FF8A8A]/10 text-[#FF8A8A] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF8A8A] group-hover:text-white transition-all duration-500 shadow-sm">
              {feature.icon}
            </div>
            
            {/* Başlık */}
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-[#FF8A8A] transition-colors duration-300">
              {feature.title}
            </h3>
            
            {/* Açıklama */}
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm mx-auto">
              {feature.description}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}