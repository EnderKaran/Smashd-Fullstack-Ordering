"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Gift, Star, Clock, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function RewardsPage() {
  const [points, setPoints] = useState(750); 
  const nextRewardPoints = 1000;
  const progress = (points / nextRewardPoints) * 100;

  const availableRewards = [
    { id: 1, name: "Free Soft Drink", points: 300, icon: "🥤", color: "bg-blue-50" },
    { id: 2, name: "Free Large Fries", points: 500, icon: "🍟", color: "bg-yellow-50" },
    { id: 3, name: "Free Classic Smash", points: 1000, icon: "🍔", color: "bg-red-50" },
    { id: 4, name: "Smash'd Hoodie", points: 5000, icon: "👕", color: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-12">
      {/* 🔝 Header */}
      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/menu" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <span className="text-xl font-black italic tracking-tighter">Rewards</span>
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-[#FF9F9F] font-black">JD</div>
      </header>

      <main className="max-w-xl mx-auto px-6 space-y-8 mt-4">
        
        {/* 🏆 Puan Kartı (Hero Section) */}
        <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-gray-400/20">
          <div className="relative z-10">
            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-2">Total Balance</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-6xl font-black">{points}</h2>
              <span className="text-[#FFD666] font-black tracking-widest uppercase text-sm">Points</span>
            </div>
            
            <div className="mt-10 space-y-3">
              <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                <span>{nextRewardPoints - points} points to next reward</span>
                <span className="text-[#FFD666]">75%</span>
              </div>
              <Progress value={progress} className="h-3 bg-white/10" />
            </div>
          </div>
          {/* Arka plan süslemesi */}
          <Star className="absolute -right-6 -bottom-6 w-40 h-40 text-white/5 rotate-12" />
        </div>

        {/* 🎁 Kullanılabilir Ödüller */}
        <section className="space-y-6 text-left">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Claim Rewards</h3>
            <Link href="/rewards/history" className="text-xs font-bold text-gray-400 underline underline-offset-4">History</Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {availableRewards.map((reward) => (
              <div 
                key={reward.id} 
                className="bg-white rounded-[2.5rem] p-5 flex items-center justify-between shadow-sm border border-transparent hover:border-orange-100 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 ${reward.color} rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner`}>
                    {reward.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 tracking-tight">{reward.name}</h4>
                    <p className="text-sm font-bold text-gray-400">{reward.points} Points</p>
                  </div>
                </div>
                <Button 
                  disabled={points < reward.points}
                  className={`rounded-2xl px-6 font-black text-xs uppercase tracking-widest ${
                    points >= reward.points 
                    ? "bg-[#FF9F9F] hover:bg-[#ff8a8a] text-white" 
                    : "bg-gray-100 text-gray-300"
                  }`}
                >
                  {points >= reward.points ? "Claim" : "Locked"}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* 📋 Nasıl Puan Kazanılır? */}
        <section className="bg-orange-50 rounded-[2.5rem] p-8 text-left">
          <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
            <Award className="text-orange-500" size={20} /> How to earn points?
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="bg-white p-2 rounded-xl shadow-sm text-orange-500">
                <span className="font-bold text-xs">$1</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Earn <span className="font-bold text-gray-900">10 points</span> for every $1 spent on our menu.</p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="bg-white p-2 rounded-xl shadow-sm text-orange-500">
                <span className="font-bold text-xs">🎁</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Get <span className="font-bold text-gray-900">100 bonus points</span> on your first order.</p>
            </li>
          </ul>
        </section>

      </main>
    </div>
  );
}