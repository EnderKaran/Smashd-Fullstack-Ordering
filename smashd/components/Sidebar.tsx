"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, ShoppingCart, UtensilsCrossed, 
  Package, Settings, LogOut, ChevronRight, X, Menu 
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Orders", icon: ShoppingCart, href: "/admin/kitchen" },
  { name: "Menu", icon: UtensilsCrossed, href: "/admin/menu-management" },
  { name: "Inventory", icon: Package, href: "/admin/inventory" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Sayfa değiştiğinde menüyü mobilde kapat
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* 📱 Mobil Header & Trigger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF3B30] rounded-lg flex items-center justify-center text-white text-sm">🍔</div>
          <span className="font-black text-gray-900 tracking-tight">Burger SaaS</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 bg-gray-50 rounded-xl text-gray-500 hover:text-[#FF3B30] transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* 🌑 Overlay (Mobilde menü açıkken arka planı karartır) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 側 Sidebar Main */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
        lg:sticky lg:translate-x-0
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}>
        {/* Logo Alanı & Mobil Kapatma Butonu */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF3B30] rounded-xl flex items-center justify-center text-white text-xl">🍔</div>
            <div className="text-left">
              <h2 className="text-lg font-black text-gray-900 leading-none tracking-tight">Burger SaaS</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Management Pro</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-red-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigasyon */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all group ${
                  isActive ? "bg-[#FF3B30] text-white shadow-lg shadow-red-200" : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
                  <span className="font-bold text-sm">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>

        {/* Profil Alanı (Chef Ender) */}
        <div className="p-6 border-t border-gray-50">
          <div className="bg-gray-50 p-4 rounded-[2rem] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-200 overflow-hidden border-2 border-white shadow-sm">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ender" alt="Chef" />
            </div>
            <div className="text-left flex-1">
              <p className="text-xs font-black text-gray-900">Chef Ender</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Head Chef</p>
            </div>
            <button className="text-gray-300 hover:text-[#FF3B30] transition-colors"><LogOut size={18} /></button>
          </div>
        </div>
      </aside>
    </>
  );
}