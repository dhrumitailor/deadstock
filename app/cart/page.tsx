"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Heart, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { cart, removeFromCart, updateQuantity, addToWishlist } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[50vh] flex items-center justify-center">
        Loading cart...
      </div>
    );
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-brand-100 rounded-lg">
          <p className="text-brand-600 mb-6 font-medium">Your cart is empty.</p>
          <Link href="/shop" className="inline-block bg-brand-900 text-brand-100 px-8 py-3 rounded-full hover:bg-brand-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 pb-6 border-b border-brand-200">
                <div className="relative w-24 h-32 flex-shrink-0 bg-brand-200 rounded-sm overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between">
                    <Link href={`/product/${item.id}`} className="font-medium text-brand-900 hover:text-brand-600 transition-colors max-w-[80%] line-clamp-2">
                      {item.title}
                    </Link>
                    <span className="font-medium">{item.currency}{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                  <div className="mt-1 text-sm text-brand-500 space-y-1">
                    <p>Size: {item.size}</p>
                    <p>Condition: {item.condition}</p>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center border border-brand-200 rounded-full">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-brand-600 hover:text-brand-900"
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-brand-600 hover:text-brand-900"
                      >+</button>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          addToWishlist(item);
                          removeFromCart(item.id);
                        }}
                        className="text-sm text-brand-500 hover:text-brand-900 flex items-center gap-1 transition-colors"
                      >
                        <Heart size={16} /> <span className="hidden sm:inline">Move to Wishlist</span>
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-brand-500 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-100 p-8 rounded-lg sticky top-24">
              <h2 className="text-xl font-serif mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-brand-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-brand-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-brand-200 pt-4 flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="w-full bg-brand-900 text-brand-100 py-4 px-8 rounded-full font-medium hover:bg-brand-800 transition-colors flex justify-center items-center gap-2"
              >
                Checkout <ArrowRight size={18} />
              </Link>
              <div className="mt-6 text-center text-xs text-brand-500 space-y-2">
                <p>Tax included and shipping calculated at checkout.</p>
                <p>All sales are final.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
