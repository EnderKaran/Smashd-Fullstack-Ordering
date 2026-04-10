"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";
import gsap from "gsap";
import { Heart, Trophy, Users, Leaf } from "lucide-react";
import burgerImage from "@/public/images/categories/burger-cat.jpg"

export default function StoryPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Başlık ve metin animasyonları
      gsap.from(".reveal", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Görsel animasyonu
      gsap.from(".story-image", {
        scale: 1.1,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-white">
      <Navbar />

      {/* 🎬 HERO: Hikaye Başlangıcı */}
      <section className="pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="reveal text-[10px] font-black uppercase tracking-widest text-[#FF8A8A] mb-4">
                Since 2024
              </p>
              <h1 className="reveal text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8">
                It Started <br />
                With a <span className="text-[#FF8A8A]">Smash.</span>
              </h1>
              <p className="reveal text-lg text-gray-500 font-medium leading-relaxed max-w-md">
                Bizim hikayemiz bir yönetim kurulu odasında değil, dumanı tüten sıcak bir ızgaranın başında başladı. Tek bir amacımız vardı: Mükemmel karamelize olmuş, kıyır kıyır kenarlı o hakiki smash burgeri yapmak.
              </p>
            </div>
            <div className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src={burgerImage.src} 
                className="story-image w-full h-full object-cover"
                alt="Chef smashing a burger"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-sm font-black uppercase tracking-widest opacity-80">Our Founder</p>
                <p className="text-2xl font-black">Ender K. & Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🛠️ DEĞERLERİMİZ: Neye İnanıyoruz? */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-4">Our Philosophy</h2>
            <div className="w-16 h-1 bg-[#FF8A8A] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Heart className="text-red-400" />, title: "Real Passion", desc: "Sadece yemek yapmıyoruz, her burgerde bir sanat icra ediyoruz." },
              { icon: <Leaf className="text-green-400" />, title: "100% Fresh", desc: "Dondurucu mu? Bizim mutfağımızda o kelime yasak." },
              { icon: <Users className="text-blue-400" />, title: "Community", desc: "Biz bir restoran değil, büyük bir aileyiz." },
              { icon: <Trophy className="text-yellow-400" />, title: "Quality First", desc: "Angus etinden brioche ekmeğine kadar en iyisi." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📖 MANİFESTO: Bir Paragraf Hikaye */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-snug mb-12">
            "İyi bir burger sadece karnınızı doyurmaz, <span className="text-[#FF8A8A]">gününüzü değiştirir.</span> Biz o anın peşindeyiz."
          </blockquote>
          <p className="text-gray-500 text-lg font-medium leading-relaxed">
            SmashBurger olarak, geleneksel yöntemleri modern bir dokunuşla birleştiriyoruz. Her gün taze çekilen etlerimiz, özel soslarımız ve el yapımı ekmeklerimizle Bursa'dan dünyaya uzanan bir lezzet köprüsü kuruyoruz. Sırrımız mı? Çok basit: Sabır, yüksek ateş ve doğru miktarda baskı.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}