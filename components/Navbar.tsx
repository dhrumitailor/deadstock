// "use client";

// import Link from "next/link";
// import { useEffect, useState, useCallback } from "react";
// import { ShoppingBag, Heart, Menu, User } from "lucide-react";
// import SearchBar from "./SearchBar";
// import { supabase } from "@/lib/supabase";
// import Image from "next/image";


// export default function Navbar() {
//   const [mounted, setMounted] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [profilePath, setProfilePath] = useState("/login"); // Default path

//   // Use a real userId if available, or your test ID
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

//   // NEW: Function to determine where the user icon should lead
//   const checkUserRole = useCallback(async () => {
//     const { data: { user } } = await supabase.auth.getUser();

//     if (user) {
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("role")
//         .eq("id", user.id)
//         .single();

//       // If they are admin, lead to console. If user, lead to profile.
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
//     checkUserRole(); // Check role on load

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
//               <SearchBar />
//             </div>

//             {/* UPDATED: Dynamically changes based on user role */}
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
import { ShoppingBag, Heart, Menu, User } from "lucide-react";
import SearchBar from "./SearchBar";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [profilePath, setProfilePath] = useState("/login");

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
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center sm:hidden">
            <button className="text-foreground hover:text-brand-500">
              <Menu size={24} />
            </button>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tighter">
              DEADSTOCK DEPT
            </Link>
            <div className="hidden sm:flex sm:space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-brand-500">Home</Link>
              <Link href="/shop" className="text-sm font-medium hover:text-brand-500">Collections</Link>
              <Link href="/about" className="text-sm font-medium hover:text-brand-500">About us</Link>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:block">
              {/* ✅ FIX: Wrap in Suspense */}
              <Suspense fallback={<div className="text-xs">Loading...</div>}>
                <SearchBar />
              </Suspense>
            </div>

            <Link href={profilePath} className="text-foreground hover:text-brand-500">
              <User size={20} />
            </Link>

            <Link href="/wishlist" className="hidden sm:block text-foreground hover:text-brand-500 relative">
              <Heart size={20} />
            </Link>

            <Link href="/cart" className="text-foreground hover:text-brand-500 flex items-center gap-1 relative">
              <ShoppingBag size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-black text-white rounded-full w-4 h-4 flex items-center justify-center border border-zinc-800">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
