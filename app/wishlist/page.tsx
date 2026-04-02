// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
// import { supabase } from "@/lib/supabase";

// export default function WishlistPage() {
//   const [wishlistItems, setWishlistItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const fetchWishlist = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     // Fetching the wishlist joined with product details
//     const { data, error } = await supabase
//       .from("wishlist")
//       .select(`
//         id,
//         products (
//           id,
//           title,
//           price,
//           image,
//           category
//         )
//       `)
//       .eq("user_id", user.id);

//     if (!error && data) {
//       setWishlistItems(data.map((item: any) => item.products));
//     }
//     setLoading(false);
//   };

//   const removeFromWishlist = async (productId: string) => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;

//     const { error } = await supabase
//       .from("wishlist")
//       .delete()
//       .eq("user_id", user.id)
//       .eq("product_id", productId);

//     if (!error) {
//       setWishlistItems(prev => prev.filter(item => item.id !== productId));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-widest">
//         Fetching your vault...
//       </div>
//     );
//   }
//   // ... existing removeFromWishlist function ...

//   const addToCart = async (productId: string) => {
//     const { data: { user } } = await supabase.auth.getUser();

//     // If not logged in, we should send them to login
//     if (!user) {
//       window.location.href = "/login";
//       return;
//     }

//     // Insert into cart_items table
//     const { error } = await supabase
//       .from("cart_items")
//       .insert({
//         user_id: user.id,
//         product_id: productId,
//         quantity: 1
//       });

//     if (error) {
//       console.error("Cart Error:", error.message);
//       // If it's a unique constraint error, it means it's already in cart
//       if (error.code === '23505') {
//         alert("Item is already in your cart!");
//       }
//     } else {
//       alert("Added to cart successfully!");
//     }
//   };

//   // ... then your if (loading) block starts ...

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-16 min-h-screen bg-black text-white">
//       <header className="mb-12">
//         <h1 className="text-5xl font-bold tracking-tighter uppercase italic">Your Wishlist</h1>
//         <div className="h-1 w-20 bg-white mt-2"></div>
//       </header>

//       {wishlistItems.length === 0 ? (
//         <div className="py-24 border border-zinc-900 rounded-2xl text-center bg-zinc-950/50">
//           <p className="text-zinc-500 mb-8 font-medium uppercase tracking-widest">Your wishlist is currently empty.</p>
//           <Link href="/shop" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all">
//             Explore Drops <ArrowRight size={18} />
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {wishlistItems.map((item) => {
//             // const displayImage = Array.isArray(item.image) ? item.image[0] : item.image;
//             const displayImage = Array.isArray(item.products?.image)
//               ? item.products.image[0]
//               : item.products?.image;

//             return (
//               <div key={item.id} className="group flex flex-col bg-zinc-950 border border-zinc-900 p-4 rounded-xl">
//                 <Link href={`/products/${item.id}`} className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6">
//                   <Image
//                     src={displayImage || "/placeholder.jpg"}
//                     alt={item.title}
//                     fill
//                     className="object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                 </Link>

//                 <div className="flex flex-col mb-6">
//                   <h3 className="text-lg font-bold uppercase tracking-tighter line-clamp-1">{item.title}</h3>
//                   <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1 italic">{item.category}</p>
//                   <span className="text-xl font-mono font-bold mt-2">
//                     ₹{item.price.toLocaleString()}
//                   </span>
//                 </div>

//                 <div className="flex gap-2">
//                   <button className="flex-1 bg-white text-black py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
//                     <ShoppingBag size={14} /> Add to Cart
//                   </button>
//                   <button
//                     onClick={() => removeFromWishlist(item.id)}
//                     className="p-3 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-500 transition-all rounded-lg"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("wishlist")
      .select(`
        id,
        products (
          id,
          title,
          price,
          image,
          category
        )
      `)
      .eq("user_id", user.id);

    if (!error && data) {
      // Map the joined data so we have the product fields directly
      setWishlistItems(data.filter(item => item.products).map((item: any) => item.products));
    }
    setLoading(false);
  };

  const removeFromWishlist = async (productId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (!error) {
      setWishlistItems(prev => prev.filter(item => item.id !== productId));
    }
  };

  const addToCart = async (productId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .insert({
        user_id: user.id,
        product_id: productId,
        quantity: 1
      });

    if (error) {
      if (error.code === '23505') {
        alert("Item is already in your cart!");
      } else {
        console.error("Cart Error:", error.message);
      }
    } else {
      alert("Added to cart successfully!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-mono uppercase tracking-widest text-[10px]">Fetching your vault...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 min-h-screen bg-black text-white">
      <header className="mb-12">
        <h1 className="text-5xl font-bold tracking-tighter uppercase italic">Your Wishlist</h1>
        <div className="h-1 w-20 bg-white mt-2"></div>
      </header>

      {wishlistItems.length === 0 ? (
        <div className="py-24 border border-zinc-900 rounded-2xl text-center bg-zinc-950/50">
          <p className="text-zinc-500 mb-8 font-medium uppercase tracking-widest">Your wishlist is currently empty.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all">
            Explore Drops <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => {
            const displayImage = Array.isArray(item.image) ? item.image[0] : item.image;

            return (
              <div key={item.id} className="group flex flex-col bg-zinc-950 border border-zinc-900 p-4 rounded-xl">
                <Link href={`/products/${item.id}`} className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6">
                  <Image
                    src={displayImage || "/placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>

                <div className="flex flex-col mb-6">
                  <h3 className="text-lg font-bold uppercase tracking-tighter line-clamp-1">{item.title}</h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1 italic">{item.category}</p>
                  <span className="text-xl font-mono font-bold mt-2">
                    ₹{item.price?.toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item.id)}
                    className="flex-1 bg-white text-black py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-3 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-500 transition-all rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}