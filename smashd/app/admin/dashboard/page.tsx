"use client";

import React, { useEffect, useState } from 'react';
import { 
  ShoppingBag, DollarSign, Users, 
  Calendar as CalendarIcon, Loader2, RefreshCw, Sparkles, ChevronRight, Wand2 
} from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import Link from "next/link";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [stats, setStats] = useState({ totalRevenue: 0, ordersToday: 0, averageCheck: 0 });
  const [salesData, setSalesData] = useState<any[]>([]);
  const [topBurgers, setTopBurgers] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [aiInsight, setAiInsight] = useState<string>("");

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!orders) return;

      const today = new Date().toDateString();
      const totalRevenue = orders.reduce((acc, o) => acc + (o.total_price || 0), 0);
      const ordersToday = orders.filter(o => new Date(o.created_at).toDateString() === today).length;
      const averageCheck = orders.length > 0 ? totalRevenue / orders.length : 0;

      setStats({ totalRevenue, ordersToday, averageCheck });

      const monthlySales = orders.reduce((acc: any, o) => {
        const month = format(new Date(o.created_at), 'MMM yyyy');
        acc[month] = (acc[month] || 0) + (o.total_price || 0);
        return acc;
      }, {});

      const chartData = Object.keys(monthlySales).map(key => ({
        name: key,
        sales: monthlySales[key]
      })).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
      
      setSalesData(chartData);

      const burgerCounts: any = {};
      orders.forEach(order => {
        order.items?.forEach((item: any) => {
          burgerCounts[item.name] = (burgerCounts[item.name] || 0) + item.quantity;
        });
      });

      const sortedBurgers = Object.keys(burgerCounts)
        .map(name => ({
          name,
          sold: burgerCounts[name],
          width: `${Math.min((burgerCounts[name] / 100) * 100, 100)}%`
        }))
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5);

      setTopBurgers(sortedBurgers);
      setRecentOrders(orders.slice(0, 5));

    } catch (error) {
      console.error("Veri yukleme hatasi:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiInsight = async (force = false) => {
    setAiLoading(true);
    try {
      // Force parametresi true ise cache bypass edilir
      const url = force ? '/api/ai-chef?refresh=true' : '/api/ai-chef';
      const response = await fetch(url);
      const data = await response.json();
      if (data.analysis) {
        setAiInsight(data.analysis);
      }
    } catch (error) {
      console.error("AI Analiz hatasi:", error);
      setAiInsight("Analiz su an gerceklestirilemiyor.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchAiInsight();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#FDFDFD]">
      <Loader2 className="w-10 h-10 animate-spin text-red-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] px-4 py-6 md:p-10 font-sans">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Management Dashboard</h1>
          <p className="text-sm md:text-base text-gray-400 font-medium mt-1">Operational insights and performance metrics.</p>
        </div>
        <div className="flex w-full md:w-auto gap-3">
          <div className="hidden sm:flex bg-white border border-gray-100 px-4 py-2 rounded-2xl items-center gap-2 shadow-sm">
            <CalendarIcon size={16} className="text-red-500" />
            <span className="text-sm font-bold text-gray-600">{format(new Date(), 'MMM dd, yyyy')}</span>
          </div>
          <Button 
            onClick={() => { fetchDashboardData(); fetchAiInsight(); }} 
            className="flex-1 md:flex-none bg-[#FF3B30] hover:bg-red-600 rounded-2xl px-6 h-12 font-bold flex gap-2"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            <span>Refresh All</span>
          </Button>
        </div>
      </header>

      {/* AI Analiz Karti ve Tavsiye Butonu */}
      <section className="mb-10">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#333333] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <Sparkles size={140} className="text-white" />
          </div>
          
          <div className="relative z-10 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
                  <Sparkles size={18} className="text-white" />
                </div>
                <h2 className="text-sm font-black text-white uppercase tracking-widest">AI Strategic Analysis</h2>
              </div>

              <Button 
                onClick={() => fetchAiInsight(true)}
                disabled={aiLoading}
                className="bg-white/10 hover:bg-red-500 text-white border border-white/10 rounded-2xl px-6 h-10 font-bold transition-all flex gap-2 active:scale-95 group/btn"
              >
                {aiLoading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Wand2 size={16} className="group-hover/btn:rotate-12 transition-transform" />
                )}
                <span className="text-xs uppercase tracking-wider font-black">Get New Advice</span>
              </Button>
            </div>

            <div className="min-h-[60px] flex items-center">
              {aiLoading && !aiInsight ? (
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-white/5 rounded-full w-1/2 animate-pulse"></div>
                </div>
              ) : (
                <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed max-w-4xl italic">
                  "{aiInsight || "Veriler analiz edilmeye hazir. Tavsiye almak icin butona tiklayin."}"
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-10">
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={<DollarSign size={20} />} />
        <StatCard title="Orders Today" value={stats.ordersToday.toString()} icon={<ShoppingBag size={20} />} />
        <StatCard title="Average Check" value={`$${stats.averageCheck.toFixed(2)}`} icon={<Users size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 className="text-lg md:text-xl font-black text-gray-900 mb-8 text-left">Monthly Sales Trend</h3>
          <div className="h-[250px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3B30" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF3B30" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="sales" stroke="#FF3B30" strokeWidth={4} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-50 text-left">
          <h3 className="text-lg md:text-xl font-black text-gray-900 mb-8">Product Performance</h3>
          <div className="space-y-6">
            {topBurgers.map((burger, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-700 truncate mr-2">{burger.name}</span>
                  <span className="text-gray-400 font-bold whitespace-nowrap">{burger.sold} units</span>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full transition-all duration-1000" style={{ width: burger.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-8 md:mt-10 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg md:text-xl font-black text-gray-900 tracking-tight">Recent Orders</h3>
          <Link href="/admin/kitchen">
            <Button variant="ghost" className="text-red-500 font-bold text-xs hover:bg-red-50 flex gap-1 items-center">
              View All Orders <ChevronRight size={14} />
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[500px]">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="pb-4">Order Reference</th>
                <th className="pb-4">Delivery Point</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((o) => (
                <tr key={o.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-xs font-bold text-gray-400">#{o.id.slice(0,6)}</td>
                  <td className="py-4 text-sm font-black text-gray-900 truncate max-w-[200px]">{o.address || "Dine-in"}</td>
                  <td className="py-4">
                    <Badge className={`uppercase text-[9px] font-black px-3 py-1 rounded-full border-none shadow-none ${
                      o.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {o.status === 'completed' ? 'Completed' : 'Pending'}
                    </Badge>
                  </td>
                  <td className="py-4 text-right font-black text-gray-900">${o.total_price?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-50 flex items-center justify-between group hover:shadow-md transition-all">
      <div className="text-left">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
        <h4 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{value}</h4>
      </div>
      <div className="p-4 bg-red-50 text-red-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </div>
  );
}