// (1)"use client";

// import { supabase } from "@/lib/supabase";
// import { useState } from "react";

// export default function AddToCartButtons({ product }: any) {
//   const [loading, setLoading] = useState(false);

//   const userId = "11111111-1111-1111-1111-111111111111"; // 🔥 temp user

//   const handleAddToCart = async () => {
//     setLoading(true);

//     // 🔍 check if already exists
//     const { data: existing } = await supabase
//       .from("cart_items")
//       .select("*")
//       .eq("product_id", product.id)
//       .eq("user_id", userId)
//       .single();

//     if (existing) {
//       // 🔁 update quantity
//       await supabase
//         .from("cart_items")
//         .update({ quantity: existing.quantity + 1 })
//         .eq("id", existing.id);
//     } else {
//       // ➕ insert new
//       await supabase.from("cart_items").insert([
//         {
//           product_id: product.id,
//           user_id: userId,
//           quantity: 1,
//         },
//       ]);
//     }

//     setLoading(false);
//     alert("Added to cart 🛒");
//   };

//   return (
//     <button
//       onClick={handleAddToCart}
//       disabled={loading}
//       className="bg-black text-white px-6 py-3 rounded-md"
//     >
//       {loading ? "Adding..." : "Add to Cart"}
//     </button>
//   );
// }
//2
// "use client";

// import { supabase } from "@/lib/supabase";
// import { useState } from "react";

// export default function AddToCartButtons({ product }: { product: any }) {
//   const [loading, setLoading] = useState(false);

//   // Note: In production, get this from supabase.auth.getUser()
//   const userId = "11111111-1111-1111-1111-111111111111";

//   const handleAddToCart = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       /* Using 'upsert' with 'onConflict'. 
//          This requires a UNIQUE constraint on (user_id, product_id) in your DB.
//       */
//       const { error } = await supabase
//         .from("cart_items")
//         .upsert(
//           {
//             product_id: product.id,
//             user_id: userId,
//             quantity: 1 // See Note below for incrementing logic
//           },
//           { onConflict: 'user_id, product_id' }
//         )
//       // This is a simple overwrite. For "incrementing", 
//       // a Postgres Function (RPC) is usually better.

//       if (error) throw error;

//       alert("Added to cart 🛒");
//     } catch (error: any) {
//       console.error("Error adding to cart:", error.message);
//       alert("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleAddToCart}
//       disabled={loading}
//       className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors"
//     >
//       {loading ? "Adding..." : "Add to Cart"}
//     </button>
//   );
// }

//3
// "use client";

// import { supabase } from "@/lib/supabase";
// import { useState } from "react";

// export default function AddToCartButtons({ product }: { product: any }) {
//   const [loading, setLoading] = useState(false);

//   // Note: In production, get this from supabase.auth.getUser()
//   const userId = "11111111-1111-1111-1111-111111111111";

//   const handleAddToCart = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       // 🚀 This calls the SQL function you just added to Supabase
//       const { error } = await supabase.rpc("increment_cart_item", {
//         p_user_id: userId,
//         p_product_id: product.id,
//       });

//       if (error) throw error;

//       alert("Added to cart 🛒");
//     } catch (error: any) {
//       console.error("Error adding to cart:", error.message);
//       alert("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleAddToCart}
//       disabled={loading}
//       className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors"
//     >
//       {loading ? "Adding..." : "Add to Cart"}
//     </button>
//   );
// }
"use client";

import { supabase } from "@/lib/supabase"; // Your client-side supabase instance
import { useState } from "react";

export default function AddToCartButtons({ product }: { product: any }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);

    try {
      // 1. Get the real logged-in user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login to add items to cart!");
        setLoading(false);
        return;
      }

      // 2. Call your SQL function using the REAL user.id
      const { error } = await supabase.rpc("increment_cart_item", {
        p_user_id: user.id, // 🔥 REAL ID
        p_product_id: product.id,
      });

      if (error) throw error;

      alert("Added to cart 🛒");
    } catch (error: any) {
      console.error("Error adding to cart:", error.message);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 disabled:opacity-50"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}