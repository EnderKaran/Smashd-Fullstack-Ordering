"use client";

import { useState } from "react";
import { Clock, Users, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";

const mockShifts = [
  { id: 1, name: "Ender K.", role: "Head Chef", shift: "09:00 - 17:00", status: "Active" },
  { id: 2, name: "Batuhan B.", role: "Manager", shift: "11:00 - 19:00", status: "Scheduled" },
  { id: 3, name: "Zeynep S.", role: "Server", shift: "12:00 - 20:00", status: "Scheduled" },
];

export default function ShiftManagement() {
  return (
    <div className="p-8 bg-[#FAFAFA] min-h-screen">
      {/* Üst Başlık */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Staff Shifts</h1>
          <p className="text-gray-400 font-medium italic mt-2">Manage your team's energy.</p>
        </div>
        <button className="h-12 px-6 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand transition-all">
          Assign New Shift
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 📋 VARDİYA LİSTESİ */}
        <div className="lg:col-span-2 space-y-4">
          {mockShifts.map((shift) => (
            <div key={shift.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">{shift.name}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{shift.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900">{shift.shift}</p>
                  <p className="text-[10px] font-bold text-brand uppercase tracking-widest flex items-center gap-1 justify-end">
                    <Clock size={12} /> Today
                  </p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  shift.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {shift.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ⚠️ TAKE-OVER ALGORİTMASI ALANI (Sağ Panel) */}
        <div className="space-y-6">
          <div className="bg-[#231F20] text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <h2 className="text-xl font-black mb-6 relative z-10 flex items-center gap-2">
              <AlertCircle size={20} className="text-brand" /> Conflict Watch
            </h2>
            <div className="space-y-4 relative z-10">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-brand uppercase mb-1">Overlapping Alert</p>
                <p className="text-sm text-gray-300">Head Chef and Sous Chef have a 2-hour overlap on Table-01 management.</p>
              </div>
              <p className="text-[10px] text-gray-500 italic">Your Take-over algorithm is optimizing the schedule...</p>
            </div>
            {/* Arka plan dekoru */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
               <CheckCircle2 size={20} className="text-green-500" /> System Status
             </h3>
             <p className="text-sm text-gray-500 font-medium leading-relaxed">
               All rooms are allocated. No double-bookings detected for the next 48 hours.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}