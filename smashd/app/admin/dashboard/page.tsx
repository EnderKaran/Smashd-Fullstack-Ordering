"use client";

import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, ShoppingBag, DollarSign, Users, Plus,
  Calendar as CalendarIcon, Loader2, RefreshCw
} from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalRevenue: 0, ordersToday: 0, averageCheck: 0 });
  const [salesData, setSalesData] = useState<any[]>([]);
  const [topBurgers, setTopBurgers] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

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

      const last7Days = orders.slice(0, 50).reduce((acc: any, o) => {
        const day = format(new Date(o.created_at), 'dd MMM');
        acc[day] = (acc[day] || 0) + (o.total_price || 0);
        return acc;
      }, {});

      const chartData = Object.keys(last7Days).map(key => ({
        name: key,
        sales: last7Days[key]
      })).reverse();
      
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
      console.error("Dashboard hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#FDFDFD]">
      <Loader2 className="w-10 h-10 animate-spin text-red-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] px-4 py-6 md:p-10 font-sans">
      
      {/* 🔝 Header: Mobilde alt alta, desktopta yan yana */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Good Morning, Chef</h1>
          <p className="text-sm md:text-base text-gray-400 font-medium mt-1">Real-time data from your restaurant.</p>
        </div>
        <div className="flex w-full md:w-auto gap-3">
          <div className="hidden sm:flex bg-white border border-gray-100 px-4 py-2 rounded-2xl items-center gap-2 shadow-sm">
            <CalendarIcon size={16} className="text-red-500" />
            <span className="text-sm font-bold text-gray-600">{format(new Date(), 'MMM dd, yyyy')}</span>
          </div>
          <Button 
            onClick={fetchDashboardData} 
            className="flex-1 md:flex-none bg-[#FF3B30] hover:bg-red-600 rounded-2xl px-6 h-12 font-bold flex gap-2"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            <span className="md:inline">Refresh</span>
          </Button>
        </div>
      </header>

      {/* 💳 Stat Cards: Mobilde 1, tablette 2, desktopta 3 sütun */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-10">
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={<DollarSign size={20} />} />
        <StatCard title="Orders Today" value={stats.ordersToday.toString()} icon={<ShoppingBag size={20} />} />
        <StatCard title="Average Check" value={`$${stats.averageCheck.toFixed(2)}`} icon={<Users size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* 📈 Chart: Mobilde tam genişlik */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
          <h3 className="text-lg md:text-xl font-black text-gray-900 mb-8 text-left">Daily Sales Trend</h3>
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
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#FF3B30" strokeWidth={4} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🍔 Top Selling: Mobilde alt kısma düşer */}
        <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-50 text-left">
          <h3 className="text-lg md:text-xl font-black text-gray-900 mb-8">Top Selling</h3>
          <div className="space-y-6">
            {topBurgers.map((burger, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-700 truncate mr-2">{burger.name}</span>
                  <span className="text-gray-400 font-bold whitespace-nowrap">{burger.sold} sold</span>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                  <div className={`h-full bg-orange-400 rounded-full transition-all duration-1000`} style={{ width: burger.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📝 Recent Orders: Mobilde yatay kaydırma özellikli tablo */}
      <section className="mt-8 md:mt-10 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg md:text-xl font-black text-gray-900 tracking-tight">Recent Orders</h3>
          <Button variant="ghost" className="text-red-500 font-bold text-xs">View All</Button>
        </div>
        <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full text-left min-w-[500px]">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((o) => (
                <tr key={o.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-xs font-bold text-gray-400">#{o.id.slice(0,6)}</td>
                  <td className="py-4 text-sm font-black text-gray-900 truncate max-w-[120px]">{o.address || "Walk-in"}</td>
                  <td className="py-4">
                    <Badge variant="outline" className={`uppercase text-[9px] font-black border-none ${o.status === 'tamamlandi' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                      {o.status}
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
      <div className="p-3 bg-red-50 text-red-500 rounded-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
  );
}