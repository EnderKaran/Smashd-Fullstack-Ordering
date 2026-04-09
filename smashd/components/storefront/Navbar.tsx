import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-24 flex items-center justify-between">
        
        {/*  Logo Alanı */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 13.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-.5" />
              <path d="M5.13 8.256A2.35 2.35 0 0 1 7.4 6h9.2a2.35 2.35 0 0 1 2.27 2.256l-.11 3.21a2.2 2.2 0 0 1-2.2 2.034H7.44a2.2 2.2 0 0 1-2.2-2.034l-.11-3.21Z" />
              <path d="M12 4a5 5 0 0 0-4.54 2.92" />
            </svg>
          </div>
          <span className="font-black text-2xl tracking-tighter text-gray-900">
            Smash<span className="text-brand">Burger</span>
          </span>
        </Link>

        {/* Masaüstü Linkler & Sepet */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 font-bold text-sm text-gray-500 tracking-wide">
            <Link href="#menu" className="hover:text-brand transition-colors">Menu</Link>
            <Link href="#locations" className="hover:text-brand transition-colors">Locations</Link>
            <Link href="#story" className="hover:text-brand transition-colors">Our Story</Link>
          </div>

          <Link href="/order">
            <div className="relative group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                <ShoppingBag size={20} className="text-gray-900" />
              </div>
              {/* Bildirim (Badge) */}
              <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-brand-bg">
                0
              </span>
            </div>
          </Link>
        </div>

        {/* Mobil Menü Butonu */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/order" className="relative">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                <ShoppingBag size={18} className="text-gray-900" />
             </div>
             <span className="absolute -top-1 -right-1 bg-brand text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-brand-bg">0</span>
          </Link>
          <Button variant="ghost" size="icon" className="text-gray-900">
            <Menu size={24} />
          </Button>
        </div>

      </div>
    </nav>
  );
}