"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Package, AlertTriangle, Search, Filter, Plus, MoreVertical, Loader2, RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 
import { toast } from "sonner";

export default function InventoryPage() {
  const [stockItems, setStockItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Yeni Ürün State
  const [newItem, setNewItem] = useState({
    item_name: "", category: "Et", current_stock: "", critical_level: "", unit: "kg"
  });

  const fetchInventory = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('inventory').select('*').order('item_name');
    if (!error) setStockItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchInventory(); }, []);

  // ➕ Yeni Ürün Kaydetme
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const { error } = await supabase
        .from('inventory')
        .insert([{
          item_name: newItem.item_name,
          category: newItem.category,
          current_stock: parseFloat(newItem.current_stock),
          critical_level: parseFloat(newItem.critical_level),
          unit: newItem.unit
        }]);

      if (error) throw error;

      toast.success("New item added to inventory! 📦");
      setIsDialogOpen(false);
      setNewItem({ item_name: "", category: "Et", current_stock: "", critical_level: "", unit: "kg" });
      fetchInventory();
    } catch (error: any) {
      toast.error("Error: " + error.message);
    } finally {
      setIsAdding(false);
    }
  };

  // 🚀 Restock Fonksiyonu
  const handleRestock = async (id: string, currentStock: number, unit: string) => {
    const amount = prompt(`How many ${unit} would you like to add?`);
    if (!amount || isNaN(Number(amount))) return;

    const newTotal = currentStock + Number(amount);
    const { error } = await supabase.from('inventory').update({ current_stock: newTotal }).eq('id', id);

    if (error) toast.error("Restock failed!");
    else {
      toast.success(`Updated to ${newTotal} ${unit}`);
      setStockItems(prev => prev.map(item => item.id === id ? { ...item, current_stock: newTotal } : item));
    }
  };

  const filteredItems = useMemo(() => {
    return stockItems.filter(item => {
      const matchesSearch = item.item_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, stockItems]);

  const categories = ["All", "Et", "Sebze", "Unlu Mamul", "Süt Ürünü", "Sos"];

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none">Inventory</h1>
          <p className="text-gray-400 font-medium mt-2 italic text-sm">Real-time supply chain management.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FF3B30] hover:bg-red-600 rounded-2xl h-14 px-8 font-black flex gap-2 shadow-lg shadow-red-100 transition-all active:scale-95">
              <Plus size={22} strokeWidth={3} /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2.5rem] p-8 bg-white border-none sm:max-w-[450px]">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Add New Material</DialogTitle>
              <DialogDescription className="text-gray-400 text-sm font-medium italic">
                Enter the details to track a new supply item.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddItem} className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Item Name</label>
                  <Input required placeholder="e.g. Dana Döş Kıyma" className="h-12 rounded-xl bg-gray-50 border-none font-bold" value={newItem.item_name} onChange={(e) => setNewItem({...newItem, item_name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Category</label>
                    <select className="w-full h-12 rounded-xl bg-gray-50 border-none font-bold px-3 text-sm" value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})}>
                      {categories.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Unit</label>
                    <Input required placeholder="kg, pcs..." className="h-12 rounded-xl bg-gray-50 border-none font-bold" value={newItem.unit} onChange={(e) => setNewItem({...newItem, unit: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Current Stock</label>
                    <Input required type="number" className="h-12 rounded-xl bg-gray-50 border-none font-bold" value={newItem.current_stock} onChange={(e) => setNewItem({...newItem, current_stock: e.target.value})} />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Alert Level</label>
                    <Input required type="number" className="h-12 rounded-xl bg-gray-50 border-none font-bold" value={newItem.critical_level} onChange={(e) => setNewItem({...newItem, critical_level: e.target.value})} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isAdding} className="w-full h-14 bg-black hover:bg-gray-800 text-white rounded-2xl font-black text-sm tracking-widest uppercase">
                  {isAdding ? <Loader2 className="animate-spin mr-2" /> : "Save to Inventory"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
          <Input placeholder="Search materials..." className="h-16 pl-12 rounded-[1.25rem] border-none shadow-sm bg-white font-bold text-gray-600 focus:ring-2 focus:ring-red-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-16 rounded-[1.25rem] px-8 gap-3 border-none bg-white shadow-sm font-black text-xs uppercase tracking-widest">
              <Filter size={18} /> {selectedCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl border-none shadow-xl p-2 min-w-[150px]">
            {categories.map(cat => (
              <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)} className={`rounded-xl font-bold cursor-pointer ${selectedCategory === cat ? 'bg-red-50 text-red-500' : ''}`}>
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading ? (
        <div className="h-60 flex items-center justify-center"><Loader2 className="animate-spin text-red-500 w-10 h-10" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isCritical = item.current_stock <= item.critical_level;
            return (
              <div key={item.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col justify-between group hover:shadow-xl hover:scale-[1.01] transition-all duration-300 text-left">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner transition-colors ${isCritical ? 'bg-red-50' : 'bg-gray-50'}`}>
                    {item.category === 'Et' ? '🥩' : item.category === 'Sebze' ? '🥬' : item.category === 'Unlu Mamul' ? '🥯' : '📦'}
                  </div>
                  <button className="text-gray-200 hover:text-gray-400"><MoreVertical size={20} /></button>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">{item.item_name}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">{item.category}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-4xl font-black text-gray-900 leading-none tracking-tighter">
                      {item.current_stock} <span className="text-sm text-gray-300 font-bold">{item.unit}</span>
                    </p>
                    {isCritical && (
                      <Badge className="mt-4 bg-red-50 text-red-500 border-none font-black text-[9px] px-3 py-1 animate-pulse tracking-wider">
                        <AlertTriangle size={10} className="mr-1.5" /> LOW STOCK
                      </Badge>
                    )}
                  </div>
                  <Button onClick={() => handleRestock(item.id, item.current_stock, item.unit)} variant="outline" className="rounded-xl h-10 px-4 text-[10px] font-black hover:bg-gray-900 hover:text-white border-gray-100 transition-all uppercase tracking-widest flex gap-2">
                    <RotateCcw size={14} /> Restock
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}