"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const getIcon = () => {
  if (typeof window === 'undefined') return null;
  return new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
};

export default function MapComponent({ locations }: { locations: any[] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hydration hatasını engellemek için mounted değilse hiçbir şey render etme
  if (!isMounted) return null;

  const bursaCenter: [number, number] = [40.218, 28.960];
  const markerIcon = getIcon();

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        key="smashd-bursa-map" // React'in bileşeni stabil tutması için key ekledik
        center={bursaCenter} 
        zoom={12} 
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ minHeight: '100%' }} // Yükseklik hatasını önlemek için
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((loc) => (
          markerIcon && (
            <Marker key={loc.id} position={loc.coords} icon={markerIcon}>
              <Popup className="font-sans">
                <div className="p-1">
                  <p className="font-black text-gray-900 m-0">{loc.name}</p>
                  <p className="text-[10px] text-orange-500 font-bold uppercase">Smash'd Burger Point</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}