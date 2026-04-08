"use client";

import { useState } from "react";
import dynamic from "next/dynamic"; 
import Link from "next/link";
import { ChevronLeft, MapPin, Navigation, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Location {
  id: number;
  name: string;
  coords: [number, number];
  address: string;
  status: string;
}

const MapComponent = dynamic<{ locations: Location[] }>(() => import("@/components/locations/MapComponent"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
      <p className="text-gray-400 font-bold italic">Loading Smash'd Map...</p>
    </div>
  )
});

const BURSA_LOCATIONS = [
  {
    id: 1,
    name: "Smash'd Nilüfer - FSM",
    coords: [40.2185, 28.9320] as [number, number], 
    address: "Fatih Sultan Mehmet Blv. No:45, Nilüfer/Bursa",
    status: "Open",
    distance: "1.2 km",
    phone: "+90 224 444 00 16",
  },
  {
    id: 2,
    name: "Smash'd Osmangazi - PodyumPark",
    coords: [40.2225, 28.9850] as [number, number], 
    address: "Cumhuriyet Mah. Nilüfer Hatun Cad., Osmangazi/Bursa",
    status: "Open",
    distance: "4.5 km",
    phone: "+90 224 444 00 17",
  },
  {
    id: 3,
    name: "Smash'd Yıldırım - Millet",
    coords: [40.1830, 29.1150] as [number, number], 
    address: "Millet Mah. Derya Cad., Yıldırım/Bursa",
    status: "Closed",
    distance: "12.8 km",
    phone: "+90 224 444 00 18",
  }
];

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = BURSA_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* 🔝 Fixed Header */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center bg-[#FAF9F6]/80 backdrop-blur-md z-20 w-full max-w-7xl mx-auto">
        <Link href="/menu" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-xl font-black italic tracking-tighter">Locations</h1>
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-[#FF9F9F] font-black shadow-sm">JD</div>
      </header>

      <main className="max-w-7xl mx-auto pt-24 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
        
        {/* 📍 Left Side: Search and List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
            <Input 
              placeholder="Search by neighborhood or branch name..."
              className="h-16 pl-12 rounded-[2rem] border-none shadow-sm bg-white font-medium text-gray-600 focus-visible:ring-orange-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] no-scrollbar pr-2">
            {filteredLocations.map((loc) => (
              <div 
                key={loc.id} 
                className={`bg-white rounded-[2.5rem] p-6 shadow-sm border-2 transition-all cursor-pointer group hover:border-orange-100 ${loc.status === 'Closed' ? 'opacity-70' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-left">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">{loc.name}</h3>
                    <p className="text-[11px] text-gray-400 font-bold uppercase mt-1 flex items-center gap-1">
                      <MapPin size={12} className="text-orange-400" /> {loc.distance} from you
                    </p>
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${loc.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {loc.status}
                  </span >
                </div>

                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 text-left">
                  {loc.address}
                </p>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-gray-900 hover:bg-black rounded-2xl h-12 font-bold gap-2 text-white transition-all active:scale-95">
                    <Navigation size={18} /> Directions
                  </Button>
                  <Button variant="outline" className="w-12 h-12 rounded-2xl border-gray-100 p-0 flex items-center justify-center hover:bg-orange-50 hover:text-orange-500 transition-colors">
                    <Phone size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 h-[500px] lg:h-[calc(100vh-180px)] sticky top-28">
            <div className="w-full h-full bg-white rounded-[3rem] shadow-xl overflow-hidden border-8 border-white relative z-10">
                <MapComponent locations={BURSA_LOCATIONS} />
            </div>
            </div>

      </main>
    </div>
  );
}