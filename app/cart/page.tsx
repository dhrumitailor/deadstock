// import { createClient } from "@/lib/server";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft, ShoppingBag, Lock } from "lucide-react";
// import DeleteCartItem from "@/components/DeleteCartItem";
// import QuantitySelector from "@/components/QuantitySelector";
// import CartSummary from "@/components/CartSummary"; // 🔥 Swapped CheckoutButton for CartSummary

// export const dynamic = "force-dynamic";

// export default async function CartPage() {
//   // 1. Initialize Supabase and get the real user
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   // 2. Handle the "Not Logged In" state
//   if (!user) {
//     return (
//       <div className="max-w-5xl mx-auto px-4 py-24 min-h-screen text-center">
//         <div className="bg-zinc-900 border border-gray-800 p-12 rounded-lg flex flex-col items-center">
//           <Lock className="text-gray-500 mb-4" size={48} />
//           <h1 className="text-2xl font-bold text-white mb-2">Your cart is locked</h1>
//           <p className="text-gray-400 mb-8">Please login to view your saved items and checkout.</p>
//           <Link href="/login" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
//             Sign In / Register
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const userId = user.id;

//   // 3. Fetch cart items
//   const { data: cartItems, error } = await supabase
//     .from("cart_items")
//     .select(`
//       id,
//       quantity,
//       products!product_id (
//         id,
//         title,
//         price,
//         image
//       )
//     `)
//     .eq("user_id", userId);

//   if (error) {
//     console.error("Cart fetch error:", error);
//   }

//   const getProductData = (item: any) => {
//     return Array.isArray(item.products) ? item.products[0] : item.products;
//   };

//   const subtotal = cartItems?.reduce((acc: number, item: any) => {
//     const product = getProductData(item);
//     return acc + (product?.price || 0) * item.quantity;
//   }, 0) || 0;

// //   return (
// //     <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen text-white">
// //       <div className="flex items-center justify-between mb-8">
// //         <h1 className="text-3xl font-bold flex items-center gap-2">
// //           <ShoppingBag /> Your Cart
// //         </h1>
// //         <Link href="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition">
// //           <ArrowLeft size={14} /> Continue Shopping
// //         </Link>
// //       </div>

// //       {!cartItems || cartItems.length === 0 ? (
// //         <div className="text-center py-20 border border-gray-800 rounded-lg bg-zinc-900">
// //           <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
// //           <Link href="/" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition">
// //             Browse Products
// //           </Link>
// //         </div>
// //       ) : (
// //         <div className="grid lg:grid-cols-3 gap-10">
// //           {/* Left Column: List of Items */}
// //           <div className="lg:col-span-2 space-y-6">
// //             {cartItems.map((item: any) => {
// //               const product = getProductData(item);
// //               if (!product) return null;

// //               return (
// //                 <div key={item.id} className="flex items-center gap-6 border-b border-gray-800 pb-6">
// //                   <div className="relative w-24 h-32 flex-shrink-0">
// //                     <Image
// //                       src={Array.isArray(product.image) ? product.image[0] : product.image || "/placeholder.jpg"}
// //                       alt={product.title}
// //                       fill
// //                       className="object-cover rounded shadow-sm"
// //                     />
// //                   </div>

// //                   <div className="flex-1">
// //                     <h2 className="font-semibold text-lg">{product.title}</h2>
// //                     <p className="text-gray-400 text-sm mb-2">
// //                       Unit Price: ₹ {product.price.toLocaleString('en-IN')}
// //                     </p>
// //                     <div className="mt-2">
// //                       <QuantitySelector
// //                         itemId={item.id}
// //                         initialQuantity={item.quantity}
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-col items-end justify-between gap-4">
// //                     <p className="font-bold text-lg">
// //                       ₹ {(product.price * item.quantity).toLocaleString('en-IN')}
// //                     </p>
// //                     <DeleteCartItem itemId={item.id} />
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* Right Column: Order Summary & Shipping Form */}
// //           <CartSummary cartItems={cartItems || []} subtotal={subtotal} />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// // // ... (imports remain same)

// // export default async function CartPage() {
// //   // ... (auth and fetch logic remain same)

//   return (
//     /* Added bg-zinc-950 to ensure the background is dark enough for white text */
//     <div className="min-h-screen bg-zinc-950 text-white"> 
//       <div className="max-w-5xl mx-auto px-4 py-12">
        
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold flex items-center gap-2">
//             <ShoppingBag className="text-white" /> Your Cart
//           </h1>
//           <Link href="/" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition">
//             <ArrowLeft size={14} /> Continue Shopping
//           </Link>
//         </div>

//         {!cartItems || cartItems.length === 0 ? (
//           <div className="text-center py-20 border border-zinc-800 rounded-lg bg-zinc-900/50">
//             <p className="text-zinc-500 mb-4">Your cart is currently empty.</p>
//             <Link href="/" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition">
//               Browse Products
//             </Link>
//           </div>
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-10">
//             {/* Left Column: List of Items */}
//             <div className="lg:col-span-2 space-y-6">
//               {cartItems.map((item: any) => {
//                 const product = getProductData(item);
//                 if (!product) return null;

//                 return (
//                   <div key={item.id} className="flex items-center gap-6 border-b border-zinc-800 pb-6">
//                     <div className="relative w-24 h-32 flex-shrink-0 bg-zinc-900 rounded overflow-hidden">
//                       <Image
//                         src={Array.isArray(product.image) ? product.image[0] : product.image || "/placeholder.jpg"}
//                         alt={product.title}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <h2 className="font-semibold text-lg text-white">{product.title}</h2>
//                       <p className="text-zinc-400 text-sm mb-2">
//                         Unit Price: ₹ {product.price.toLocaleString('en-IN')}
//                       </p>
//                       <div className="mt-2">
//                         <QuantitySelector
//                           itemId={item.id}
//                           initialQuantity={item.quantity}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex flex-col items-end justify-between gap-4">
//                       <p className="font-bold text-lg text-white">
//                         ₹ {(product.price * item.quantity).toLocaleString('en-IN')}
//                       </p>
//                       <DeleteCartItem itemId={item.id} />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Right Column: Order Summary */}
//             <aside className="lg:col-start-3">
//                <CartSummary cartItems={cartItems || []} subtotal={subtotal} />
//             </aside>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { createClient } from "@/lib/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Lock } from "lucide-react";
import DeleteCartItem from "@/components/DeleteCartItem";
import QuantitySelector from "@/components/QuantitySelector";
import CartSummary from "@/components/CartSummary";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  // 1. Initialize Supabase and get the real user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Handle the "Not Logged In" state
  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 min-h-screen text-center">
        <div className="bg-zinc-900 border border-gray-800 p-12 rounded-lg flex flex-col items-center">
          <Lock className="text-gray-500 mb-4" size={48} />
          <h1 className="text-2xl font-bold text-white mb-2">Your cart is locked</h1>
          <p className="text-gray-400 mb-8">Please login to view your saved items and checkout.</p>
          <Link href="/login" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
            Sign In / Register
          </Link>
        </div>
      </div>
    );
  }

  const userId = user.id;

  // 3. Fetch cart items
  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      products!product_id (
        id,
        title,
        price,
        image
      )
    `)
    .eq("user_id", userId);

  if (error) {
    console.error("Cart fetch error:", error);
  }

  const getProductData = (item: any) => {
    return Array.isArray(item.products) ? item.products[0] : item.products;
  };

  const subtotal = cartItems?.reduce((acc: number, item: any) => {
    const product = getProductData(item);
    return acc + (product?.price || 0) * item.quantity;
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white"> 
      <div className="max-w-5xl mx-auto px-4 py-12">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingBag className="text-white" /> Your Cart
          </h1>
          <Link href="/" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition">
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        {!cartItems || cartItems.length === 0 ? (
          <div className="text-center py-20 border border-zinc-800 rounded-lg bg-zinc-900/50">
            <p className="text-zinc-500 mb-4">Your cart is currently empty.</p>
            <Link href="/" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Column: List of Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item: any) => {
                const product = getProductData(item);
                if (!product) return null;

                return (
                  <div key={item.id} className="flex items-center gap-6 border-b border-zinc-800 pb-6">
                    <div className="relative w-24 h-32 flex-shrink-0 bg-zinc-900 rounded overflow-hidden">
                      <Image
                        src={Array.isArray(product.image) ? product.image[0] : product.image || "/placeholder.jpg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="font-semibold text-lg text-white">{product.title}</h2>
                      <p className="text-zinc-400 text-sm mb-2">
                        Unit Price: ₹ {product.price.toLocaleString('en-IN')}
                      </p>
                      <div className="mt-2">
                        <QuantitySelector
                          itemId={item.id}
                          initialQuantity={item.quantity}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-4">
                      <p className="font-bold text-lg text-white">
                        ₹ {(product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                      <DeleteCartItem itemId={item.id} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Order Summary */}
            <aside className="lg:col-start-3">
               {/* Fixed: userId passed to CartSummary */}
               <CartSummary 
                cartItems={cartItems || []} 
                subtotal={subtotal} 
                userId={userId} 
               />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}