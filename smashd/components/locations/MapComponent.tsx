"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Performans için ikon ayarlarını bileşen dışına alıyoruz
const customIcon = typeof window !== 'undefined' ? new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
}) : null;

export default function MapComponent({ locations }: { locations: any[] }) {
  const bursaCenter: [number, number] = [40.21, 28.96]; // Bursa merkez odaklı

  return (
    // ÖNEMLİ: h-full yerine doğrudan stil vermek bazen daha stabildir
    <div style={{ height: '100%', width: '100%', background: '#f3f4f6' }}>
      <MapContainer 
        center={bursaCenter} 
        zoom={12} 
        scrollWheelZoom={false} // Sayfa kaydırmayı zorlaştırmasın
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Daha hafif ve hızlı bir harita stili
          attribution='&copy; OpenStreetMap contributors'
        />
        {locations.map((loc) => (
          customIcon && (
            <Marker key={loc.id} position={loc.coords} icon={customIcon}>
              <Popup>
                <div className="font-bold text-gray-900">{loc.name}</div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}