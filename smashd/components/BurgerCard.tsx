// components/BurgerCard.tsx
import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  
  // Props tipini tanımlıyoruz
  interface BurgerCardProps {
    product: Product;
  }

  export function BurgerCard({ product }: BurgerCardProps) {
    return (
      <ProductDrawer product={product}> 
    <Card className="overflow-hidden border-none shadow-lg rounded-3xl bg-white">
      <div className="relative aspect-square">
      <Image 
          src={product.image_url} 
          alt={product.name}
          fill 
          className="object-cover p-2 rounded-[2.5rem]" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {product.badge && (
          <Badge className="absolute top-4 left-4 bg-yellow-400 text-black hover:bg-yellow-500 uppercase font-bold text-[10px]">
            {product.badge}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xl font-bold text-orange-500">
          ${product.price.toFixed(2)}
        </span>
        <Button size="icon" className="rounded-full w-10 h-10 bg-red-400 hover:bg-red-500">
          <Plus className="w-6 h-6" />
        </Button>
      </CardFooter>
        </Card>
        </ProductDrawer>
  )
}