"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Heart, Menu, Search, User } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItemsCount = wishlist.length;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button className="text-foreground hover:text-brand-500">
              <Menu size={24} />
            </button>
          </div>

          {/* Logo & Desktop Desktop Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tighter">
              DEADSTOCK DEPT
            </Link>
            <div className="hidden sm:flex sm:space-x-8">
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-brand-500"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-brand-500"
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-brand-500"
              >
                About us
              </Link>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="hidden sm:block text-sm font-medium hover:text-brand-500">
              USD ˅
            </button>
            <button className="text-foreground hover:text-brand-500">
              <Search size={20} />
            </button>
            <Link href="/admin" className="text-foreground hover:text-brand-500">
              <User size={20} />
            </Link>
            <Link href="/wishlist" className="hidden sm:block text-foreground hover:text-brand-500 relative">
              <Heart size={20} />
              {mounted && wishlistItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-brand-900 text-brand-100 rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="text-foreground hover:text-brand-500 flex items-center gap-1 relative">
              <ShoppingBag size={20} />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-brand-900 text-brand-100 rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
