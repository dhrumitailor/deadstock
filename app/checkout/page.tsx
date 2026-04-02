// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { ArrowLeft, CheckCircle } from "lucide-react";

// // export default function CheckoutPage() {
// //   const [isSuccess, setIsSuccess] = useState(false);

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsSuccess(true);
// //     // In a real app, integrate Stripe/Razorpay and clear cart here
// //   };

// //   if (isSuccess) {
// //     return (
// //       <div className="max-w-3xl mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
// //         <CheckCircle className="text-green-500 mb-6" size={64} />
// //         <h1 className="text-3xl font-serif mb-4">Order Confirmed!</h1>
// //         <p className="text-brand-600 mb-8 max-w-md">
// //           Thank you for shopping at Aavis Closet. Your unique vintage piece is being prepared for shipping. We'll send a confirmation email shortly.
// //         </p>
// //         <Link href="/" className="inline-block bg-brand-900 text-brand-100 px-8 py-3 rounded-full hover:bg-brand-800 transition-colors">
// //           Return to Homepage
// //         </Link>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
// //       <Link href="/cart" className="inline-flex items-center text-sm text-brand-500 hover:text-brand-900 mb-8 transition-colors">
// //         <ArrowLeft size={16} className="mr-2" />
// //         Back to Cart
// //       </Link>

// //       <h1 className="text-3xl font-serif mb-8">Checkout</h1>

// //       <form onSubmit={handleSubmit} className="space-y-8">
// //         <div className="bg-brand-100 p-6 md:p-8 rounded-lg">
// //           <h2 className="text-xl font-medium mb-6">Contact Information</h2>
// //           <div className="space-y-4">
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-1">Email address</label>
// //               <input required type="email" id="email" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900" />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-brand-100 p-6 md:p-8 rounded-lg">
// //           <h2 className="text-xl font-medium mb-6">Shipping Address</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div className="md:col-span-2">
// //               <label htmlFor="name" className="block text-sm font-medium text-brand-700 mb-1">Full Name</label>
// //               <input required type="text" id="name" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900" />
// //             </div>
// //             <div className="md:col-span-2">
// //               <label htmlFor="address" className="block text-sm font-medium text-brand-700 mb-1">Street Address</label>
// //               <input required type="text" id="address" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900" />
// //             </div>
// //             <div>
// //               <label htmlFor="city" className="block text-sm font-medium text-brand-700 mb-1">City</label>
// //               <input required type="text" id="city" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900" />
// //             </div>
// //             <div>
// //               <label htmlFor="postal" className="block text-sm font-medium text-brand-700 mb-1">Postal Code</label>
// //               <input required type="text" id="postal" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900" />
// //             </div>
// //             <div className="md:col-span-2">
// //               <label htmlFor="country" className="block text-sm font-medium text-brand-700 mb-1">Country</label>
// //               <select required id="country" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900">
// //                 <option value="IN">India</option>
// //                 <option value="US">United States</option>
// //                 <option value="UK">United Kingdom</option>
// //               </select>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-brand-100 p-6 md:p-8 rounded-lg">
// //           <h2 className="text-xl font-medium mb-6">Payment</h2>
// //           <p className="text-sm text-brand-600 mb-4">This is a demo store. No actual payment will be processed.</p>
// //           <div className="p-4 border border-brand-200 bg-white rounded-md text-sm text-center text-brand-500">
// //             Payment integration ready (e.g. Stripe/Razorpay)
// //           </div>
// //         </div>

// //         <button type="submit" className="w-full bg-brand-900 text-brand-100 py-4 px-8 rounded-full font-medium hover:bg-brand-800 transition-colors text-lg">
// //           Place Order
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// //polising 

// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";
// import { ShieldCheck, Truck, CreditCard } from "lucide-react";
// import Link from "next/link";

// export default function CheckoutPage() {
//   const [profile, setProfile] = useState<any>(null);
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadCheckoutData = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return router.push("/login");

//       // 1. Get Saved Logistics
//       const { data: profileData } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();
//       setProfile(profileData);

//       // 2. Get Cart Items
//       const { data: cartData } = await supabase
//         .from("cart_items")
//         .select("*, products(*)")
//         .eq("user_id", user.id);
//       setCartItems(cartData || []);

//       setLoading(false);
//     };
//     loadCheckoutData();
//   }, []);

//   const subtotal = cartItems.reduce((acc, item) => acc + (item.products.price * item.quantity), 0);

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-20 text-white min-h-screen bg-black">
//       <h1 className="text-4xl font-black uppercase italic mb-12 tracking-tighter">Secure Checkout</h1>

//       <div className="grid lg:grid-cols-2 gap-16">
//         {/* LEFT: Logistics Summary */}
//         <div className="space-y-10">
//           <section className="border-2 border-zinc-800 p-8 rounded-3xl bg-zinc-950/50">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
//                 <Truck size={16} /> Shipping Destination
//               </h2>
//               <Link href="/profile/edit" className="text-[10px] font-black uppercase underline">Change</Link>
//             </div>

//             {profile?.shipping_address ? (
//               <div className="space-y-2">
//                 <p className="text-xl font-black uppercase italic">{profile.full_name}</p>
//                 <p className="text-sm text-zinc-400 uppercase tracking-tight">
//                   {profile.shipping_address}, {profile.city} - {profile.pincode}
//                 </p>
//                 <p className="text-xs font-mono text-zinc-600">RECIPIENT TEL: {profile.phone}</p>
//               </div>
//             ) : (
//               <div className="text-center py-4">
//                 <p className="text-red-400 text-xs font-bold uppercase mb-4 italic">No logistics found in the vault.</p>
//                 <Link href="/profile/edit" className="bg-white text-black px-6 py-2 rounded-lg font-black text-[10px] uppercase">Add Address</Link>
//               </div>
//             )}
//           </section>

//           <section className="border-2 border-zinc-800 p-8 rounded-3xl">
//             <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 mb-6">
//               <CreditCard size={16} /> Payment Method
//             </h2>
//             <div className="bg-zinc-900 p-4 rounded-xl border border-white/10 flex items-center gap-4 opacity-50 cursor-not-allowed">
//               <div className="w-10 h-6 bg-zinc-800 rounded"></div>
//               <p className="text-[10px] font-black uppercase">Cash on Delivery (Standard)</p>
//               <ShieldCheck size={16} className="ml-auto text-zinc-500" />
//             </div>
//             <p className="text-[9px] text-zinc-600 mt-3 italic">*Online payments arriving in Drop 002.</p>
//           </section>
//         </div>

//         {/* RIGHT: Order Summary */}
//         <div className="bg-zinc-950 border border-zinc-900 p-10 rounded-3xl h-fit sticky top-10">
//           <h2 className="text-xl font-black uppercase italic mb-8 border-b border-zinc-900 pb-4">Vault Summary</h2>
//           <div className="space-y-6 mb-8">
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex justify-between items-center">
//                 <div>
//                   <p className="font-bold uppercase text-sm tracking-tight">{item.products.title}</p>
//                   <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Qty: {item.quantity}</p>
//                 </div>
//                 <p className="font-mono text-sm font-bold">₹{item.products.price.toLocaleString()}</p>
//               </div>
//             ))}
//           </div>

//           <div className="border-t border-zinc-900 pt-6 space-y-4">
//             <div className="flex justify-between text-zinc-400 text-xs font-black uppercase">
//               <span>Shipping</span>
//               <span>Calculated at next step</span>
//             </div>
//             <div className="flex justify-between text-2xl font-black uppercase italic pt-4">
//               <span>Total</span>
//               <span>₹{subtotal.toLocaleString()}</span>
//             </div>
//           </div>

//           <button
//             disabled={!profile?.shipping_address || cartItems.length === 0}
//             className="w-full bg-white text-black py-5 mt-10 font-black uppercase tracking-widest hover:bg-zinc-200 transition disabled:bg-zinc-800 disabled:text-zinc-600 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]"
//           >
//             Confirm Secure Purchase
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import Link from "next/link";
import { processSuccessfulOrder } from "@/lib/order-actions"; // IMPORT ACTION

export default function CheckoutPage() {
  const [profile, setProfile] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false); // NEW STATE
  const router = useRouter();

  useEffect(() => {
    const loadCheckoutData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(profileData);

      const { data: cartData } = await supabase
        .from("cart_items")
        .select("*, products(*)")
        .eq("user_id", user.id);
      setCartItems(cartData || []);

      setLoading(false);
    };
    loadCheckoutData();
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.products.price * item.quantity), 0);

  // NEW: HANDLE CHECKOUT FUNCTION
  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const orderId = await processSuccessfulOrder(user.id, subtotal);

      if (orderId) {
        alert("ORDER SECURED ✅");
        router.push("/profile/orders");
      }
    } catch (error: any) {
      alert(error.message || "Transaction failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-white min-h-screen bg-black">
      <h1 className="text-4xl font-black uppercase italic mb-12 tracking-tighter">Secure Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <section className="border-2 border-zinc-800 p-8 rounded-3xl bg-zinc-950/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Truck size={16} /> Shipping Destination
              </h2>
              <Link href="/profile/edit" className="text-[10px] font-black uppercase underline">Change</Link>
            </div>

            {profile?.shipping_address ? (
              <div className="space-y-2">
                <p className="text-xl font-black uppercase italic">{profile.full_name}</p>
                <p className="text-sm text-zinc-400 uppercase tracking-tight">
                  {profile.shipping_address}, {profile.city} - {profile.pincode}
                </p>
                <p className="text-xs font-mono text-zinc-600">RECIPIENT TEL: {profile.phone}</p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-red-400 text-xs font-bold uppercase mb-4 italic">No logistics found in the vault.</p>
                <Link href="/profile/edit" className="bg-white text-black px-6 py-2 rounded-lg font-black text-[10px] uppercase">Add Address</Link>
              </div>
            )}
          </section>

          <section className="border-2 border-zinc-800 p-8 rounded-3xl">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 mb-6">
              <CreditCard size={16} /> Payment Method
            </h2>
            <div className="bg-zinc-900 p-4 rounded-xl border border-white/10 flex items-center gap-4 opacity-50 cursor-not-allowed">
              <div className="w-10 h-6 bg-zinc-800 rounded"></div>
              <p className="text-[10px] font-black uppercase">Cash on Delivery (Standard)</p>
              <ShieldCheck size={16} className="ml-auto text-zinc-500" />
            </div>
            <p className="text-[9px] text-zinc-600 mt-3 italic">*Online payments arriving in Drop 002.</p>
          </section>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-10 rounded-3xl h-fit sticky top-10">
          <h2 className="text-xl font-black uppercase italic mb-8 border-b border-zinc-900 pb-4">Vault Summary</h2>
          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-bold uppercase text-sm tracking-tight">{item.products.title}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Qty: {item.quantity}</p>
                </div>
                <p className="font-mono text-sm font-bold">₹{item.products.price.toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-900 pt-6 space-y-4">
            <div className="flex justify-between text-zinc-400 text-xs font-black uppercase">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
            <div className="flex justify-between text-2xl font-black uppercase italic pt-4">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout} // LINKED TO FUNCTION
            disabled={isProcessing || !profile?.shipping_address || cartItems.length === 0}
            className="w-full bg-white text-black py-5 mt-10 font-black uppercase tracking-widest hover:bg-zinc-200 transition disabled:bg-zinc-800 disabled:text-zinc-600 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]"
          >
            {isProcessing ? "SECURING DROP..." : "Confirm Secure Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
}