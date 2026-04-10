"use client";

import { useState, useEffect } from "react";
import { 
  Clock, Users, Calendar, AlertCircle, 
  CheckCircle2, X, Plus, Loader2, Sparkles, RefreshCw 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ShiftManagement() {
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiAdvice, setAiAdvice] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "Chef",
    shift_start: "09:00",
    shift_end: "17:00",
  });

  // Vardiyaları Çek
  const fetchShifts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("staff_shifts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setShifts(data);
    setLoading(false);
  };

  // AI Tavsiyesini Çek
  const getAiShiftAdvice = async (force = false) => {
    setAiLoading(true);
    try {
      const url = force ? '/api/ai-chef?refresh=true' : '/api/ai-chef';
      const res = await fetch(url);
      const data = await res.json();
      setAiAdvice(data.analysis);
    } catch (err) {
      console.error("AI Tavsiye hatasi:", err);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
    getAiShiftAdvice();
  }, []);

  // Yeni Vardiya Kaydet
  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("staff_shifts").insert([
      {
        name: formData.name,
        role: formData.role,
        shift_start: formData.shift_start,
        shift_end: formData.shift_end,
        status: "Scheduled"
      }
    ]);

    if (!error) {
      setIsModalOpen(false);
      setFormData({ name: "", role: "Chef", shift_start: "09:00", shift_end: "17:00" });
      fetchShifts();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-8 bg-[#FAFAFA] min-h-screen font-sans text-left">
      {/* Üst Başlık Bölümü */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Staff Shifts</h1>
          <p className="text-gray-400 font-medium italic mt-2">Optimize your team performance in real-time.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="h-14 px-8 bg-gray-900 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-[#FF3B30] transition-all flex items-center gap-2 shadow-xl shadow-gray-200"
        >
          <Plus size={20} /> Assign New Shift
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 📋 VARDİYA LİSTESİ (Sol ve Orta) */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="flex justify-center p-20">
              <Loader2 className="animate-spin text-gray-200" size={40} />
            </div>
          ) : shifts.length > 0 ? (
            shifts.map((shift) => (
              <div key={shift.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#FF3B30]/10 group-hover:text-[#FF3B30] transition-colors">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900">{shift.name}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{shift.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-gray-900">{shift.shift_start} - {shift.shift_end}</p>
                    <p className="text-[10px] font-bold text-[#FF3B30] uppercase tracking-widest flex items-center gap-1 justify-end">
                      <Clock size={12} /> Today
                    </p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600`}>
                    {shift.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-gray-100 text-center">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No shifts assigned yet.</p>
            </div>
          )}
        </div>

        {/* 🧠 AI INSIGHT & TAKE-OVER PANELİ (Sağ) */}
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <Sparkles size={120} className="text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <Sparkles size={20} className="text-[#FF3B30]" /> AI Shift Logic
                </h2>
                <button 
                  onClick={() => getAiShiftAdvice(true)}
                  disabled={aiLoading}
                  className="p-2 bg-white/5 rounded-xl hover:bg-[#FF3B30] transition-all"
                >
                  <RefreshCw size={16} className={aiLoading ? "animate-spin" : ""} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-5 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                  <p className="text-sm text-gray-300 leading-relaxed italic font-medium">
                    {aiLoading ? "Analiz ediliyor..." : 
                     aiAdvice || "Vardiya optimizasyonu için veriler taranıyor."}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Take-over engine active
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FF3B30]/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
               <CheckCircle2 size={20} className="text-green-500" /> System Status
             </h3>
             <p className="text-sm text-gray-500 font-medium leading-relaxed">
               All schedules are validated. No conflicts detected for current team structure.
             </p>
          </div>
        </div>
      </div>

      {/* 📝 ASSIGN SHIFT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black">
              <X size={24} />
            </button>
            
            <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter uppercase">Assign Shift</h2>
            <p className="text-gray-400 font-medium mb-8">Plan your team's day.</p>

            <form onSubmit={handleAssign} className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Staff Member</label>
                <input 
                  type="text" 
                  required
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 font-bold text-gray-900 focus:ring-2 focus:ring-[#FF3B30] transition-all"
                  placeholder="E.g. Ender K."
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Start</label>
                  <input 
                    type="time" 
                    className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 font-bold"
                    value={formData.shift_start}
                    onChange={(e) => setFormData({...formData, shift_start: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">End</label>
                  <input 
                    type="time" 
                    className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 font-bold"
                    value={formData.shift_end}
                    onChange={(e) => setFormData({...formData, shift_end: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 bg-[#FF3B30] text-white rounded-3xl font-black text-lg uppercase tracking-widest shadow-lg shadow-red-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm Shift"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}