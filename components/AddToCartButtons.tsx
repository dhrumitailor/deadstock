"use client";

import { useEffect, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { Product } from "@/lib/data";

interface Props {
  product: Product;
}

export default function AddToCartButtons({ product }: Props) {
  const [isClient, setIsClient] = useState(false);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
        <button className="flex-1 bg-brand-900 text-brand-100 py-4 px-8 rounded-full font-medium opacity-50 flex items-center justify-center gap-2">
          <ShoppingBag size={20} />
          Loading...
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
      <button
        onClick={() => addToCart(product)}
        className="flex-1 bg-brand-900 text-brand-100 py-4 px-8 rounded-full font-medium hover:bg-brand-800 transition-colors flex items-center justify-center gap-2 active:scale-95"
      >
        <ShoppingBag size={20} />
        Add to Cart
      </button>
      <button
        onClick={() => toggleWishlist(product)}
        className={`sm:w-auto w-full bg-transparent border border-brand-900 py-4 px-8 rounded-full font-medium hover:bg-brand-100 transition-colors flex items-center justify-center gap-2 active:scale-95 ${
          isWishlisted ? "text-red-500 border-red-500" : "text-brand-900"
        }`}
      >
        <Heart size={20} className={isWishlisted ? "fill-red-500" : ""} />
        {isWishlisted ? "Saved" : "Wishlist"}
      </button>
    </div>
  );
}
