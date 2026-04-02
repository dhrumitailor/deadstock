// import Image from "next/image";
// import Link from "next/link";
// import { ShoppingBag } from "lucide-react";
// import WishlistButton from "./WishlistButton"; // 1. Import the button

// export interface Product {
//   id: string;
//   title: string;
//   price: number;
//   currency: string;
//   image: string | string[];
//   category?: string;
// }

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const displayImage = Array.isArray(product.image)
//     ? (product.image[0] || "/placeholder.jpg")
//     : (product.image || "/placeholder.jpg");

//   return (
//     <div className="group flex flex-col cursor-pointer">
//       {/* Image Container */}
//       <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-4 bg-zinc-900 border border-white/5 shadow-2xl">
//         <Link href={`/products/${product.id}`} className="block w-full h-full">
//           <Image
//             src={displayImage}
//             alt={product.title}
//             fill
//             className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-80"
//             sizes="(max-width: 768px) 50vw, 25vw"
//             priority
//           />
//         </Link>

//         {/* Floating Quick Action (Add to Cart) */}
//         <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
//           <button className="bg-white text-black p-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-zinc-200 transition-colors active:scale-90">
//             <ShoppingBag size={18} strokeWidth={2.5} />
//           </button>
//         </div>

//         {/* Subtle Overlay Gradient */}
//         <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       </div>

//       {/* Info Section */}
//       <div className="flex flex-col space-y-1.5 px-0.5">
//         <div className="flex justify-between items-start gap-3">
//           <Link
//             href={`/products/${product.id}`}
//             className="text-sm md:text-base font-bold text-white uppercase tracking-tighter leading-tight group-hover:text-zinc-400 transition-colors line-clamp-1 flex-1"
//           >
//             {product.title}
//           </Link>

//           {/* 2. Place Wishlist Button here */}
//           <div className="pt-0.5">
//             <WishlistButton productId={product.id} />
//           </div>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="text-sm md:text-base font-mono font-bold text-white">
//             {product.currency} {product.price.toLocaleString()}
//           </span>

//           <div className="flex items-center gap-2 flex-1 ml-4">
//             <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-semibold italic whitespace-nowrap">
//               {product.category || "Original Stock"}
//             </span>
//             <div className="h-[1px] w-full bg-zinc-800" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import WishlistButton from "./WishlistButton";

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string | string[];
  category?: string;
  stock_quantity?: number; // Added stock to the interface
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = (product.stock_quantity ?? 0) <= 0;

  const displayImage = Array.isArray(product.image)
    ? (product.image[0] || "/placeholder.jpg")
    : (product.image || "/placeholder.jpg");

  return (
    <div className={`group flex flex-col cursor-pointer ${isOutOfStock ? 'opacity-60' : 'opacity-100'}`}>
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-4 bg-zinc-900 border border-white/5 shadow-2xl">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <Image
            src={displayImage}
            alt={product.title}
            fill
            className={`object-cover transition-all duration-1000 ${!isOutOfStock ? 'group-hover:scale-110 group-hover:opacity-80' : ''}`}
            sizes="(max-width: 768px) 50vw, 25vw"
            priority
          />
        </Link>

        {/* SOLD OUT OVERLAY */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-[1px]">
            <span className="border-2 border-white text-white px-3 py-1.5 font-black uppercase italic tracking-tighter text-xs rotate-[-12deg] bg-black shadow-xl">
              Vault Empty
            </span>
          </div>
        )}

        {/* Floating Quick Action (Add to Cart) - Only shows if in stock */}
        {!isOutOfStock && (
          <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
            <button className="bg-white text-black p-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-zinc-200 transition-colors active:scale-90">
              <ShoppingBag size={18} strokeWidth={2.5} />
            </button>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info Section */}
      <div className="flex flex-col space-y-1.5 px-0.5">
        <div className="flex justify-between items-start gap-3">
          <Link
            href={`/products/${product.id}`}
            className="text-sm md:text-base font-bold text-white uppercase tracking-tighter leading-tight group-hover:text-zinc-400 transition-colors line-clamp-1 flex-1"
          >
            {product.title}
          </Link>

          <div className="pt-0.5">
            <WishlistButton productId={product.id} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-sm md:text-base font-mono font-bold ${isOutOfStock ? 'text-zinc-600 line-through' : 'text-white'}`}>
            {product.currency} {product.price.toLocaleString()}
          </span>

          <div className="flex items-center gap-2 flex-1 ml-4">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-semibold italic whitespace-nowrap">
              {isOutOfStock ? "Sold Out" : (product.category || "Original Stock")}
            </span>
            <div className="h-[1px] w-full bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}