import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  condition: string;
  size: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col cursor-pointer">
      <Link href={`/product/${product.id}`} className="relative bg-brand-200 aspect-[4/5] overflow-hidden rounded-sm mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Quick Add Button showing on hover */}
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-brand-100 text-brand-900 p-3 rounded-full shadow-lg hover:bg-brand-900 hover:text-brand-100 transition-colors" aria-label="Quick Add to Cart">
            <ShoppingBag size={20} />
          </button>
        </div>
      </Link>
      
      <div className="flex flex-col space-y-1">
        <Link href={`/product/${product.id}`} className="text-sm font-medium text-brand-900 leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
          {product.title}
        </Link>
        <span className="text-sm text-brand-600">
          {product.currency} {product.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
