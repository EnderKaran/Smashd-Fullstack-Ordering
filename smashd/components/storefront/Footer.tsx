"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, X } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const policies = {
    privacy: {
      title: "Privacy Policy",
      content: "Your privacy is important to us. This policy covers how we treat personal information that SmashBurger collects and receives. We don't sell your data, and we only use it to improve your burger experience."
    },
    terms: {
      title: "Terms of Service",
      content: "By using our service, you agree to be bound by these terms. Our burgers are addictive, and we are not responsible for your late-night cravings. Please order responsibly!"
    }
  };

  return (
    <footer className="w-full bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* ÜST KISIM: 4 Sütunlu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* 1. Sütun: Marka ve Motto */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-[#FF8A8A] rounded-lg flex items-center justify-center text-white font-black text-xl">S</div>
               <span className="text-xl font-black text-gray-900 tracking-tighter">SmashBurger</span>
            </Link>
            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
              Smashed to perfection, served with passion. The ultimate burger experience in the heart of the city.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#FF8A8A] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#FF8A8A] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#FF8A8A] transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* 2. Sütun: Hızlı Linkler */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/menu" className="text-sm text-gray-500 font-medium hover:text-[#FF8A8A] transition-colors">Signature Menu</Link></li>
              <li><Link href="/locations" className="text-sm text-gray-500 font-medium hover:text-[#FF8A8A] transition-colors">Locations</Link></li>
              <li><Link href="/order" className="text-sm text-gray-500 font-medium hover:text-[#FF8A8A] transition-colors">Order Online</Link></li>
              <li><Link href="/story" className="text-sm text-gray-500 font-medium hover:text-[#FF8A8A] transition-colors">Our Story</Link></li>
            </ul>
          </div>

          {/* 3. Sütun: İletişim */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <Mail size={16} className="text-[#FF8A8A]" /> hello@smashburger.com
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <Phone size={16} className="text-[#FF8A8A]" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <MapPin size={16} className="text-[#FF8A8A]" /> 123 Burger Lane, Foodie City
              </li>
            </ul>
          </div>

          {/* 4. Sütun: Bülten (Newsletter) */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Get 10% Off</h4>
            <p className="text-sm text-gray-500 font-medium mb-4">Join our newsletter and get a discount on your first order.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full h-12 pl-4 pr-12 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#FF8A8A] transition-all"
              />
              <button className="absolute right-2 top-2 w-8 h-8 bg-[#FF8A8A] text-white rounded-lg flex items-center justify-center hover:bg-[#FF6B6B] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>

        </div>

        {/* ALT KISIM: Telif ve Yasal Linkler */}
        {/* 🏳️ ALT KISIM: Telif ve Dialog Tetikleyiciler */}
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            © {currentYear} SmashBurger Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            {/* 🚀 Link yerine Buton kullanıyoruz */}
            <button 
              onClick={() => setModalContent(policies.privacy)}
              className="text-xs text-gray-400 font-bold uppercase tracking-widest hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setModalContent(policies.terms)}
              className="text-xs text-gray-400 font-bold uppercase tracking-widest hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* 🛠️ CUSTOM DIALOG (MODAL) YAPISI */}
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Arka Plan Karartma */}
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setModalContent(null)}
          ></div>
          
          {/* Modal Kutusu */}
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setModalContent(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tighter">
              {modalContent.title}
            </h3>
            
            <div className="max-h-[60vh] overflow-y-auto pr-4 text-gray-500 font-medium leading-relaxed">
              <p>{modalContent.content}</p>
              {/* İçeriği doldurmak için örnek paragraf */}
              <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <button 
              onClick={() => setModalContent(null)}
              className="w-full mt-8 h-14 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}