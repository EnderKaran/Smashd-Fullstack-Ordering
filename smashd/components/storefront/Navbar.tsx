"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    // Masaüstü: Sabit, yarı saydam, bulanık arka planlı, alt sınır çizgili, yüksek z-index'li bir navbar
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100 h-24 flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex items-center justify-between">
        
        {/* Logo - Z-index 200  */}
        <Link href="/" className="flex items-center gap-2 group z-[200]" onClick={closeMenu}>
          <div className="w-10 h-10 bg-[#FF8A8A]/10 rounded-xl flex items-center justify-center text-[#FF8A8A]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 13.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-.5" />
              <path d="M5.13 8.256A2.35 2.35 0 0 1 7.4 6h9.2a2.35 2.35 0 0 1 2.27 2.256l-.11 3.21a2.2 2.2 0 0 1-2.2 2.034H7.44a2.2 2.2 0 0 1-2.2-2.034l-.11-3.21Z" />
              <path d="M12 4a5 5 0 0 0-4.54 2.92" />
            </svg>
          </div>
          <span className="font-black text-2xl tracking-tighter text-gray-900">
            Smash<span className="text-[#FF8A8A]">Burger</span>
          </span>
        </Link>

        {/* 💻 Masaüstü Linkler */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 font-bold text-sm text-gray-500 tracking-wide">
            <Link href="/menu" className="hover:text-[#FF8A8A] transition-colors">Menu</Link>
            <Link href="/locations" className="hover:text-[#FF8A8A] transition-colors">Locations</Link>
            <Link href="/story" className="hover:text-[#FF8A8A] transition-colors">Our Story</Link>
          </div>
          <Link href="/order" className="relative group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
              <ShoppingBag size={20} className="text-gray-900" />
            </div>
            <span className="absolute -top-1 -right-1 bg-[#FF8A8A] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">0</span>
          </Link>
        </div>

        {/* 📱 Mobil Butonlar - Z-index 200 */}
        <div className="md:hidden flex items-center gap-4 z-[200]">
          <Link href="/order" onClick={closeMenu} className="relative">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                <ShoppingBag size={18} className="text-gray-900" />
             </div>
             <span className="absolute -top-1 -right-1 bg-[#FF8A8A] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">0</span>
          </Link>
          <Button variant="ghost" size="icon" className="text-gray-900" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>
      </div>

      {/* MOBİL MENU OVERLAY */}
      <div className={`
        fixed inset-0 bg-white z-[150] w-full min-h-screen flex flex-col pt-32 px-10 transition-all duration-500 ease-in-out md:hidden
        ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}>
        {/* Linkler */}
        <div className="flex flex-col gap-10">
          {[
            { name: "Menu", href: "/menu" },
            { name: "Locations", href: "/locations" },
            { name: "Our Story", href: "/story" }
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="text-5xl font-black text-gray-900 tracking-tighter hover:text-[#FF8A8A] transition-colors"
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}
          
          <Link href="/order" onClick={closeMenu} className="mt-6">
            <button className="w-full h-16 bg-[#FF8A8A] text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-[#FF8A8A]/30">
              Order Now
            </button>
          </Link>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-auto pb-12">
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">SmashBurger HQ</p>
          <p className="text-gray-900 font-black text-lg">Freshly Smashed Every Day</p>
        </div>
      </div>
    </nav>
  );
}