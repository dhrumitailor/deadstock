"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[50vh] flex items-center justify-center">
        Loading wishlist...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h1 className="text-3xl font-serif mb-8">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-brand-100 rounded-lg">
          <p className="text-brand-600 mb-6 font-medium">Your wishlist is empty.</p>
          <Link href="/shop" className="inline-block bg-brand-900 text-brand-100 px-8 py-3 rounded-full hover:bg-brand-800 transition-colors">
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
          {wishlist.map((item) => (
            <div key={item.id} className="group flex flex-col">
              <Link href={`/product/${item.id}`} className="relative bg-brand-200 aspect-[4/5] overflow-hidden rounded-sm mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </Link>
              
              <div className="flex flex-col space-y-1 mb-4 flex-grow">
                <Link href={`/product/${item.id}`} className="text-sm font-medium text-brand-900 leading-tight hover:text-brand-600 transition-colors line-clamp-2">
                  {item.title}
                </Link>
                <span className="text-sm text-brand-600">
                  {item.currency} {item.price.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2 mt-auto">
                <button 
                  onClick={() => addToCart(item)}
                  className="flex-1 bg-brand-900 text-brand-100 py-2 rounded-sm text-xs font-medium hover:bg-brand-800 transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingBag size={14} /> Add to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="px-3 border border-brand-200 text-brand-500 hover:text-red-500 hover:border-red-500 transition-colors rounded-sm flex items-center justify-center"
                  aria-label="Remove from Wishlist"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
