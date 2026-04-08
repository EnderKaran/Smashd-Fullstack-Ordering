"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Store, Clock, Percent, Phone, MapPin, 
  ToggleLeft, ToggleRight, Loader2, Save, AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [settings, setSettings] = useState<any>({
    id: null,
    restaurant_name: "",
    phone: "",
    address: "",
    tax_rate: 0,
    currency: "USD",
    opening_time: "09:00",
    closing_time: "22:00",
    is_accepting_orders: true
  });

  // 🔄 İlk açılışta ayarları çek
  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('settings').select('*').limit(1).single();
    
    if (data) {
      // Saat formatını (HH:MM:SS) input'a uygun hale (HH:MM) getiriyoruz
      const formatTime = (timeStr: string) => timeStr ? timeStr.slice(0, 5) : "";
      
      setSettings({
        ...data,
        opening_time: formatTime(data.opening_time),
        closing_time: formatTime(data.closing_time)
      });
    } else if (error) {
      toast.error("Ayarlar yüklenemedi!");
    }
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  // 💾 Ayarları Kaydet
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        restaurant_name: settings.restaurant_name,
        phone: settings.phone,
        address: settings.address,
        tax_rate: parseFloat(settings.tax_rate),
        currency: settings.currency,
        opening_time: `${settings.opening_time}:00`, // Veritabanı saniye bekler
        closing_time: `${settings.closing_time}:00`,
        is_accepting_orders: settings.is_accepting_orders
      };

      const { error } = await supabase
        .from('settings')
        .update(payload)
        .eq('id', settings.id);

      if (error) throw error;
      
      toast.success("Ayarlar başarıyla güncellendi! 🚀");
    } catch (err: any) {
      toast.error(`Kaydetme hatası: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-red-500 w-12 h-12" /></div>;
  }

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* 🔝 Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="text-left">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Settings</h1>
          <p className="text-gray-400 font-medium mt-2 italic">Manage your restaurant's core preferences.</p>
        </div>
        
        <button 
          onClick={() => setSettings({...settings, is_accepting_orders: !settings.is_accepting_orders})}
          className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-sm ${
            settings.is_accepting_orders 
              ? "bg-green-50 text-green-600 hover:bg-green-100" 
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          {settings.is_accepting_orders ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
          {settings.is_accepting_orders ? "Accepting Orders" : "Orders Paused"}
        </button>
      </header>

      <form onSubmit={handleSave} className="space-y-8 pb-20">
        
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-50 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 text-left">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-4">
              <Store size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">General Info</h2>
            <p className="text-xs text-gray-400 font-medium mt-2 leading-relaxed">Basic information about your business. This is displayed on receipts and customer apps.</p>
          </div>
          <div className="md:w-2/3 space-y-5">
            <div className="text-left">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Restaurant Name</label>
              <Input required className="h-14 rounded-2xl bg-gray-50 border-none font-bold px-6 mt-1" value={settings.restaurant_name} onChange={(e) => setSettings({...settings, restaurant_name: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2 flex items-center gap-1"><Phone size={10}/> Phone Number</label>
                <Input required className="h-14 rounded-2xl bg-gray-50 border-none font-bold px-6 mt-1" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2 flex items-center gap-1"><MapPin size={10}/> Address</label>
                <Input required className="h-14 rounded-2xl bg-gray-50 border-none font-bold px-6 mt-1" value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-50 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 text-left">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
              <Clock size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">Operating Hours</h2>
            <p className="text-xs text-gray-400 font-medium mt-2 leading-relaxed">Define when your kitchen opens and closes automatically.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-2 gap-5 text-left">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Opening Time</label>
              <Input type="time" required className="h-14 rounded-2xl bg-gray-50 border-none font-bold px-6 mt-1" value={settings.opening_time} onChange={(e) => setSettings({...settings, opening_time: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Closing Time</label>
              <Input type="time" required className="h-14 rounded-2xl bg-gray-50 border-none font-bold px-6 mt-1" value={settings.closing_time} onChange={(e) => setSettings({...settings, closing_time: e.target.value})} />
            </div>
            {!settings.is_accepting_orders && (
               <div className="col-span-2 flex items-center gap-2 bg-red-50 text-red-500 p-4 rounded-2xl mt-2">
                 <AlertCircle size={16} />
                 <p className="text-xs font-bold">Your restaurant is currently marked as CLOSED. Customers cannot place orders.</p>
               </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-50 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 text-left">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-4">
              <Percent size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">Financial Setup</h2>
            <p className="text-xs text-gray-400 font-medium mt-2 leading-relaxed">Tax rates and currency preferences for dashboard analytics.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-2 gap-5 text-left">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Tax Rate (%)</label>
              <Input type="number" step="0.01" required className="h-14 rounded-2xl bg-gray-50 border-none font-bold px-6 mt-1" value={settings.tax_rate} onChange={(e) => setSettings({...settings, tax_rate: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Currency</label>
              <select className="w-full h-14 rounded-2xl bg-gray-50 border-none font-bold px-6 mt-1" value={settings.currency} onChange={(e) => setSettings({...settings, currency: e.target.value})}>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="TRY">TRY (₺)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="fixed bottom-10 left-1/2 md:left-[calc(50%+9rem)] -translate-x-1/2 w-[90%] max-w-md">
          <Button type="submit" disabled={isSaving} className="w-full h-16 bg-[#FF3B30] hover:bg-red-600 text-white rounded-full font-black uppercase tracking-widest shadow-2xl shadow-red-200 transition-all active:scale-95 text-sm flex items-center gap-3">
            {isSaving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Save Configuration</>}
          </Button>
        </div>

      </form>
    </div>
  );
}