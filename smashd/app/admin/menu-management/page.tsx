"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Search, Edit2, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog";

const ProductCard = memo(({ item, onEdit, onDelete }: any) => {
  const catName = Array.isArray(item.categories) ? item.categories[0]?.name : item.categories?.name;

  return (
    <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-transparent hover:border-orange-100 hover:shadow-2xl transition-all duration-500 flex flex-col group text-left">
      <div className="relative aspect-[4/3] m-2 rounded-[2.5rem] overflow-hidden">
        <img src={item.image_url || "/placeholder.jpg"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-yellow-400 text-black font-black text-[9px] px-3 py-1 border-none uppercase shadow-md">
            {catName || "UNCATEGORIZED"}
          </Badge>
        </div>
      </div>
      <div className="p-8 pt-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-2 truncate">{item.name}</h3>
          <p className="text-gray-400 text-xs font-medium line-clamp-2 h-8 leading-relaxed">
            {item.description || "Freshly hand-crafted everyday."}
          </p>
        </div>
        <div className="mt-8 flex justify-between items-end">
          <p className="text-2xl font-black text-[#FF9F9F] tracking-tighter">${item.price.toFixed(2)}</p>
          <div className="flex gap-2">
            <Button onClick={() => onEdit(item)} variant="outline" className="w-12 h-12 rounded-full border-gray-100 p-0 hover:bg-black hover:text-white transition-all">
              <Edit2 size={18} />
            </Button>
            <Button onClick={() => onDelete(item.id)} variant="outline" className="w-12 h-12 rounded-full border-gray-100 text-gray-200 hover:text-red-500 transition-all p-0">
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

const ProductFormDialog = memo(({ isOpen, onClose, initialData, dbCategories, onSave, isSaving }: any) => {
  const [formData, setFormData] = useState(initialData);

  // Dialog açıldığında veriyi sıfırla/doldur
  useEffect(() => {
    if (isOpen) setFormData(initialData);
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[3rem] p-10 bg-white border-none sm:max-w-[500px] z-[9999]">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-black">{formData.id ? "Edit Product" : "New Product"}</DialogTitle>
          <DialogDescription className="text-gray-400 italic">Fill out the fields to update your menu.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
           <div className="space-y-4">
             <Input required placeholder="Product Name" className="h-14 rounded-2xl bg-gray-50 border-none font-bold px-6" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
             <div className="grid grid-cols-2 gap-4">
                <Input required type="text" placeholder="Price (e.g. 12.50)" className="h-14 rounded-2xl bg-gray-50 border-none font-bold px-6" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                <select className="w-full h-14 rounded-2xl bg-gray-50 border-none font-bold px-6" value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value})}>
                    {dbCategories.map((cat: any) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
             </div>
             <Input placeholder="Image URL" className="h-14 rounded-2xl bg-gray-50 border-none font-bold px-6" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
           </div>
           <Button type="submit" disabled={isSaving} className="w-full h-16 bg-black text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95">
             {isSaving ? <Loader2 className="animate-spin" /> : "Save Changes"}
           </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
});

ProductFormDialog.displayName = "ProductFormDialog";

// 🚀 3. Ana Sayfa Bileşeni
export default function MenuManagementPage() {
  const [items, setItems] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Arama ve Filtre
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Dialog State'leri
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<any>({
    id: null, name: "", description: "", price: "", category_id: "", image_url: "", is_available: true
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from('products').select('*, categories(name)').order('name'),
        supabase.from('categories').select('*')
      ]);
      if (productsRes.data) setItems(productsRes.data);
      if (categoriesRes.data) setDbCategories(categoriesRes.data);
    } catch (err) {
      toast.error("Data fetch failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // 💡 DİNAMİK KATEGORİ TABLARI (Veritabanından Gelenleri Kullanır)
  const dynamicTabs = useMemo(() => {
    const catNames = dbCategories.map(c => c.name.toUpperCase());
    return ["ALL", ...catNames];
  }, [dbCategories]);

  // 💡 GÜÇLENDİRİLMİŞ FİLTRELEME (Supabase Join verisini hatasız okur)
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const nameMatch = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const rawCatName = Array.isArray(item.categories) ? item.categories[0]?.name : item.categories?.name;
      const itemCatName = (rawCatName || "").toUpperCase();
      
      const categoryMatch = activeCategory === "ALL" || itemCatName === activeCategory;
      
      return nameMatch && categoryMatch;
    });
  }, [searchTerm, activeCategory, items]);

  const openEditDialog = useCallback((item: any) => {
    setEditingItem({
      id: item.id,
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      category_id: item.category_id || (dbCategories[0]?.id || ""),
      image_url: item.image_url || "",
      is_available: item.is_available ?? true
    });
    setIsDialogOpen(true);
  }, [dbCategories]);

  const openAddDialog = useCallback(() => {
    setEditingItem({
      id: null, name: "", description: "", price: "", category_id: dbCategories[0]?.id || "", image_url: "", is_available: true
    });
    setIsDialogOpen(true);
  }, [dbCategories]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      toast.success("Ürün silindi.");
      setItems(prev => prev.filter(i => i.id !== id));
    }
  }, []);

  const handleSaveItem = async (formData: any) => {
    setIsSaving(true);
    
    const priceNum = parseFloat(formData.price.toString().replace(',', '.'));
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Geçerli bir fiyat giriniz (Örn: 12.50)");
      setIsSaving(false);
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      price: priceNum,
      category_id: formData.category_id,
      image_url: formData.image_url,
      is_available: formData.is_available
    };

    try {
      const { error } = formData.id 
        ? await supabase.from('products').update(payload).eq('id', formData.id)
        : await supabase.from('products').insert([payload]);

      if (error) throw error;

      toast.success(formData.id ? "Fiyat güncellendi! 💰" : "Ürün eklendi! 🍔");
      setIsDialogOpen(false);
      
      setTimeout(() => fetchData(), 100);
    } catch (err: any) {
      toast.error(`Kayıt hatası: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div className="text-left">
           <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Menu Management</h1>
           <p className="text-gray-400 font-medium mt-1">Total {items.length} Products</p>
        </div>
        <Button onClick={openAddDialog} className="bg-[#FF3B30] hover:bg-red-600 rounded-2xl h-14 px-8 font-black shadow-xl">
           <Plus size={22} className="mr-2" /> Add Item
        </Button>
      </header>

      <div className="space-y-6">
        <div className="relative max-w-xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-6 h-6" />
          <Input placeholder="Search burgers, drinks..." className="h-16 pl-16 rounded-[2rem] border-none shadow-sm bg-white font-bold text-gray-700" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        
        {/* 🔥 Dinamik Kategori Tabları */}
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {dynamicTabs.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? "bg-black text-white shadow-xl" : "bg-white text-gray-400 hover:text-gray-900 shadow-sm"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-60 flex items-center justify-center"><Loader2 className="animate-spin text-red-500 w-12 h-12" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onEdit={openEditDialog} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <ProductFormDialog 
        isOpen={isDialogOpen} 
        onClose={setIsDialogOpen} 
        initialData={editingItem} 
        dbCategories={dbCategories} 
        onSave={handleSaveItem} 
        isSaving={isSaving} 
      />
    </div>
  );
}