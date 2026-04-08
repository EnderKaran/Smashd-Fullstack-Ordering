"use client";

import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { ProductDrawer } from "./ProductDrawer"

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  badge?: string;
  category_id: string;
}

export function BurgerCard({ product }: { product: Product }) {
  return (
    <ProductDrawer product={product}>
      <Card className="overflow-hidden border-none shadow-sm rounded-[2.5rem] bg-white cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group">
        <div className="relative aspect-square p-3">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover p-3 rounded-[3rem] group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          {product.badge && (
            <div className="absolute top-6 left-6 z-10">
              <Badge className="bg-yellow-400 text-black hover:bg-yellow-400 border-none px-3 py-1 rounded-full uppercase font-black text-[9px] tracking-wider shadow-sm">
                {product.badge}
              </Badge>
            </div>
          )}
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-red-400">
            <span className="text-sm">❤️</span>
          </div>
        </div>

        <CardContent className="px-6 py-2 text-left">
          <h3 className="text-lg font-black text-gray-900 tracking-tight">{product.name}</h3>
          <p className="text-[11px] text-gray-400 font-medium line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="px-6 py-6 pt-2 flex justify-between items-center">
          <span className="text-2xl font-black text-[#FF9F9F]">
            ${product.price.toFixed(2)}
          </span>
          
          <div className="flex items-center justify-center rounded-2xl w-10 h-10 bg-[#FFD666] text-black shadow-sm group-hover:bg-yellow-400 transition-colors">
            <Plus className="w-6 h-6 stroke-[3px]" />
          </div>
        </CardFooter>
      </Card>
    </ProductDrawer>
  )
}