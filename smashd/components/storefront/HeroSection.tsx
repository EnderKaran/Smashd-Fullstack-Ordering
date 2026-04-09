"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Star } from "lucide-react";
import Script from "next/script";

const SplineViewer: any = "spline-viewer";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-screen pt-24 pb-12 flex items-center overflow-hidden bg-[#FAFAFA]">
      <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.5/build/spline-viewer.js" strategy="lazyOnload" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* SOL TARAF: Metinler ve Butonlar */}
        <div className="flex flex-col items-start z-10 mt-10 lg:mt-0">
           <div className="hero-element inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-600 font-black text-[10px] uppercase tracking-widest mb-6 shadow-sm">
             🔥 New Recipe
           </div>
           
           <h1 className="hero-element text-[3.5rem] md:text-7xl lg:text-[5.5rem] font-black text-gray-900 leading-[1.05] tracking-tighter mb-6">
             Bite Into <br/>
             <span className="text-[#FF8A8A]">Happiness</span>
           </h1>
           
           <p className="hero-element text-gray-500 font-medium text-lg max-w-md mb-8 leading-relaxed">
             Premium smash burgers made with 100% Angus beef, crispy edges, and our secret house-made sauce.
           </p>
           
           <div className="hero-element flex flex-wrap gap-4 items-center mb-12">
              <Link href="/order">
                 <button className="h-14 px-10 bg-[#FF8A8A] hover:bg-[#FF6B6B] text-white rounded-full font-black shadow-xl shadow-[#FF8A8A]/30 transition-all active:scale-95 text-sm uppercase tracking-wider">
                   Order Now
                 </button>
              </Link>
              <Link href="#menu">
                 <button className="h-14 px-10 bg-white hover:bg-gray-50 text-gray-900 border border-gray-100 rounded-full font-black shadow-sm transition-all text-sm uppercase tracking-wider">
                   View Menu
                 </button>
              </Link>
           </div>

           <div className="hero-element flex items-center gap-4">
              <div className="flex -space-x-3">
                 <img src="https://i.pravatar.cc/100?img=1" className="w-10 h-10 rounded-full border-2 border-[#FAFAFA] shadow-sm" alt="user" />
                 <img src="https://i.pravatar.cc/100?img=2" className="w-10 h-10 rounded-full border-2 border-[#FAFAFA] shadow-sm" alt="user" />
                 <img src="https://i.pravatar.cc/100?img=3" className="w-10 h-10 rounded-full border-2 border-[#FAFAFA] shadow-sm" alt="user" />
              </div>
              <div className="flex flex-col">
                 <div className="flex gap-1 text-yellow-400">
                   {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                 </div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                   1000+ Happy Eaters
                 </p>
              </div>
           </div>
        </div>

        {/* SAĞ TARAF: 3D Animasyon */}
        <div className="hero-element relative w-full aspect-square max-w-[400px] lg:max-w-[480px] mx-auto flex items-center justify-center">
            
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-700 border-4 border-white bg-white flex items-center justify-center">
              
              <div className="absolute w-[125%] h-[125%]">
                <SplineViewer 
                  loading-anim-type="spinner" 
                  url="https://prod.spline.design/0qqsfFtzC4mCib7v/scene.splinecode"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

            </div>
            
            <div className="absolute top-4 right-0 lg:-right-6 bg-white backdrop-blur-md p-5 rounded-full shadow-2xl border border-gray-100 flex items-center justify-center animate-bounce duration-[3000ms] z-10">
               <div className="text-center">
                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">Only</p>
                 <p className="text-3xl font-black text-[#FF8A8A] leading-none">$12</p>
               </div>
            </div>
        </div>

      </div>
    </section>
  );
}