import { Grip, Sparkles, Flame } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      id: "01",
      title: "The Grind",
      description: "We start with a custom blend of 100% premium Angus beef, ground fresh daily, never frozen, and perfectly seasoned.",
      image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=600&q=80", // Geçici et/kıyma görseli
      icon: <Grip size={16} />,
      color: "bg-gray-900 text-white"
    },
    {
      id: "02",
      title: "The Smash",
      description: "The meat ball hits the screaming hot griddle and is smashed flat with a spatula to create a caramelized, lacey crust.",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80", // Geçici ızgara/pişirme görseli
      icon: <Sparkles size={16} />,
      color: "bg-yellow-400 text-black"
    },
    {
      id: "03",
      title: "The Melt",
      description: "Two slices of American cheese are placed on top and trapped under steam to achieve the signature gooey melt.",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80", // Geçici erimiş peynirli burger görseli
      icon: <Flame size={16} />,
      color: "bg-[#FF8A8A] text-white"
    }
  ];

  return (
    <section className="w-full py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Üst Başlık Kısmı */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#FF8A8A] mb-4">
            Behind the Burger
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6">
            Our Process
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed">
            We believe in transparency. Here's how we transform simple, high-quality ingredients into your new favorite burger step by step.
          </p>
        </div>

        {/* Bento Grid Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Görsel Alanı */}
              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-8">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Sol Üstteki İkon Rozeti */}
                <div className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center ${step.color} shadow-lg`}>
                  {step.icon}
                </div>
              </div>

              {/* İçerik Alanı */}
              <div className="px-4 pb-4">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                    {step.title}
                  </h3>
                  {/* Soluk Büyük Numara */}
                  <span className="text-4xl font-black text-gray-100 leading-none">
                    {step.id}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}