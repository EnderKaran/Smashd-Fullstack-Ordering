"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Giriş başarılı! Mutfağa yönlendiriliyorsunuz...");
      
      // Giriş başarılıysa Mutfak Ekranına at
      router.push("/admin/kitchen"); 

    } catch (error: any) {
      toast.error("Giriş yapılamadı", {
        description: error.message || "Email veya şifre hatalı.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] p-4">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl p-8 md:p-12">
        {/* Logo ve Başlık */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 relative mx-auto mb-6 overflow-hidden rounded-full border-4 border-orange-100">
             <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-iomehLUlurG4qmZ8rTUW4eNzSvHYjafsJUFqSRw1TeiCDLf0XUFb2eeJYwNFrQCxaeEkU7gZDAwot5bgaISWTJv0Kswl04-_bhWR6lT70uPFwwubKngRCbVyM95AcicYOKaj6rU4x55Tv5nR8FmUGXkrBCixZWbxJh9EJPo2UPlmiFo_Tu9bCt3HPeVtKkKYpHH5GU0Lczlmf-EIvCGvY0ZS2w9zn1_tq0nFQIR-XgPaNILkwOwhq_DsIlwThFXHNuuQZrooUv_H" 
                alt="Logo" 
                fill 
                className="object-cover" 
             />
          </div>
          <h1 className="text-3xl font-black text-gray-900">Kitchen Login</h1>
          <p className="text-gray-400 mt-2 font-medium">Smash'd Staff Only</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@smashd.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-xl bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-xl bg-gray-50 border-gray-200"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-gray-900 hover:bg-black text-white rounded-2xl text-lg font-bold transition-all shadow-lg shadow-gray-200 active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Checking ID...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-5 w-5" />
                Enter Kitchen
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}