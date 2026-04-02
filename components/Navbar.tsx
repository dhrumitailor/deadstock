
// "use client";

// import Link from "next/link";
// import { useEffect, useState, useCallback, Suspense } from "react";
// import { ShoppingBag, Heart, Menu, User } from "lucide-react";
// import SearchBar from "./SearchBar";
// import { supabase } from "@/lib/supabase";
// import Image from "next/image";

// export default function Navbar() {
//   const [mounted, setMounted] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [profilePath, setProfilePath] = useState("/login");

//   const userId = "11111111-1111-1111-1111-111111111111";

//   const fetchCartCount = useCallback(async () => {
//     const { count, error } = await supabase
//       .from("cart_items")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", userId);

//     if (!error && count !== null) {
//       setCartCount(count);
//     }
//   }, [userId]);

//   const checkUserRole = useCallback(async () => {
//     const { data: { user } } = await supabase.auth.getUser();

//     if (user) {
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("role")
//         .eq("id", user.id)
//         .single();

//       if (profile?.role === "admin") {
//         setProfilePath("/admin");
//       } else {
//         setProfilePath("/profile");
//       }
//     } else {
//       setProfilePath("/login");
//     }
//   }, []);

//   useEffect(() => {
//     setMounted(true);
//     fetchCartCount();
//     checkUserRole();

//     const channel = supabase
//       .channel('cart-changes')
//       .on('postgres_changes',
//         {
//           event: '*',
//           schema: 'public',
//           table: 'cart_items',
//           filter: `user_id=eq.${userId}`
//         },
//         () => fetchCartCount()
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [fetchCartCount, checkUserRole, userId]);

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-brand-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">

//           <div className="flex items-center sm:hidden">
//             <button className="text-foreground hover:text-brand-500">
//               <Menu size={24} />
//             </button>
//           </div>

//           <div className="flex items-center gap-8">
//             <Link href="/" className="text-xl font-bold tracking-tighter">
//               DEADSTOCK DEPT
//             </Link>
//             <div className="hidden sm:flex sm:space-x-8">
//               <Link href="/" className="text-sm font-medium hover:text-brand-500">Home</Link>
//               <Link href="/shop" className="text-sm font-medium hover:text-brand-500">Collections</Link>
//               <Link href="/about" className="text-sm font-medium hover:text-brand-500">About us</Link>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 sm:gap-6">
//             <div className="hidden md:block">
//               {/* ✅ FIX: Wrap in Suspense */}
//               <Suspense fallback={<div className="text-xs">Loading...</div>}>
//                 <SearchBar />
//               </Suspense>
//             </div>

//             <Link href={profilePath} className="text-foreground hover:text-brand-500">
//               <User size={20} />
//             </Link>

//             <Link href="/wishlist" className="hidden sm:block text-foreground hover:text-brand-500 relative">
//               <Heart size={20} />
//             </Link>

//             <Link href="/cart" className="text-foreground hover:text-brand-500 flex items-center gap-1 relative">
//               <ShoppingBag size={20} />
//               {mounted && cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-black text-white rounded-full w-4 h-4 flex items-center justify-center border border-zinc-800">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, Suspense } from "react";
import { ShoppingBag, Heart, Menu, User, X } from "lucide-react"; // Added X icon
import SearchBar from "./SearchBar";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [profilePath, setProfilePath] = useState("/login");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added state for mobile menu

  const userId = "11111111-1111-1111-1111-111111111111";

  const fetchCartCount = useCallback(async () => {
    const { count, error } = await supabase
      .from("cart_items")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (!error && count !== null) {
      setCartCount(count);
    }
  }, [userId]);

  const checkUserRole = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin") {
        setProfilePath("/admin");
      } else {
        setProfilePath("/profile");
      }
    } else {
      setProfilePath("/login");
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchCartCount();
    checkUserRole();

    const channel = supabase
      .channel('cart-changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cart_items',
          filter: `user_id=eq.${userId}`
        },
        () => fetchCartCount()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCartCount, checkUserRole, userId]);

  return (
    <nav className="sticky top-0 z-[100] w-full bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="text-white hover:text-zinc-400 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tighter italic text-white">
              DEADSTOCK DEPT
            </Link>
            <div className="hidden sm:flex sm:space-x-8">
              <Link href="/" className="text-xs font-black uppercase tracking-widest hover:text-zinc-400 text-white">Home</Link>
              <Link href="/shop" className="text-xs font-black uppercase tracking-widest hover:text-zinc-400 text-white">Collections</Link>
              <Link href="/about" className="text-xs font-black uppercase tracking-widest hover:text-zinc-400 text-white">About us</Link>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:block">
              <Suspense fallback={<div className="text-xs text-white">...</div>}>
                <SearchBar />
              </Suspense>
            </div>

            <Link href={profilePath} className="text-white hover:text-zinc-400">
              <User size={20} />
            </Link>

            <Link href="/wishlist" className="hidden sm:block text-white hover:text-zinc-400 relative">
              <Heart size={20} />
            </Link>

            <Link href="/cart" className="text-white hover:text-zinc-400 flex items-center gap-1 relative">
              <ShoppingBag size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] font-black bg-white text-black rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* --- SEXY MOBILE MENU OVERLAY --- */}
      <div 
        className={`fixed inset-0 bg-black z-[200] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 ease-in-out sm:hidden`}
      >
        <div className="p-6 flex flex-col h-full">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="self-end text-white p-2"
          >
            <X size={32} />
          </button>

          <div className="flex flex-col gap-8 mt-12 text-4xl font-black uppercase italic tracking-tighter text-white">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Collections</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/wishlist" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
          </div>

          <div className="mt-auto pb-10">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Deadstock Vault Access</p>
             <Link 
               href={profilePath} 
               onClick={() => setIsMenuOpen(false)}
               className="text-sm font-bold text-zinc-400 mt-2 block"
             >
               My Account
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}