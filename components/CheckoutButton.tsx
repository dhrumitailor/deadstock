// "use client";

// import { useState } from "react";

// export default function CheckoutButton({ cartItems }: { cartItems: any[] }) {
//     const [loading, setLoading] = useState(false);

//     const handleCheckout = async () => {
//         if (cartItems.length === 0) return;
//         setLoading(true);

//         try {
//             const response = await fetch("/api/checkout", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//             });

//             const data = await response.json();

//             if (data.url) {
//                 // Redirect user to the secure Stripe Checkout page
//                 window.location.href = data.url;
//             } else {
//                 throw new Error(data.error || "Checkout failed");
//             }
//         } catch (error: any) {
//             console.error("Checkout Error:", error);
//             alert(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <button
//             onClick={handleCheckout}
//             disabled={loading || cartItems.length === 0}
//             className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-zinc-800 transition disabled:bg-gray-400"
//         >
//             {loading ? "Processing..." : "Proceed to Checkout"}
//         </button>
//     );
// }
//2
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CheckoutButton({ cartItems }: { cartItems: any[] }) {
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const handleCheckout = async () => {
//         if (cartItems.length === 0) return;
//         setLoading(true);

//         try {
//             // 1. Create Order in your Backend API (app/api/razorpay/route.ts)
//             const res = await fetch("/api/razorpay", { method: "POST" });
//             const order = await res.json();

//             if (!res.ok) throw new Error(order.error || "Failed to create order");

//             // 2. Configure Razorpay Options
//             const options = {
//                 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add this to your .env.local
//                 amount: order.amount,
//                 currency: "INR",
//                 name: "DEADSTOCK DEPT",
//                 description: "Payment for your order",
//                 order_id: order.id,
//                 handler: async function (response: any) {
//                     // This runs when payment is successful
//                     console.log("Payment Success:", response.razorpay_payment_id);

//                     // Redirect to success page
//                     router.push("/success");
//                     router.refresh();
//                 },
//                 prefill: {
//                     name: "", // You can pull this from user profile later
//                     email: "",
//                 },
//                 theme: {
//                     color: "#000000",
//                 },
//             };

//             // 3. Open the Razorpay Popup
//             const rzp = new (window as any).Razorpay(options);
//             rzp.open();
//         } catch (err: any) {
//             console.error("Checkout Error:", err.message);
//             alert("Checkout failed: " + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             {/* Load the Razorpay Script */}
//             <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>

//             <button
//                 onClick={handleCheckout}
//                 disabled={loading || cartItems.length === 0}
//                 className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//                 {loading ? "Initializing..." : "Pay Now with Razorpay"}
//             </button>
//         </>
//     );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

// Define the props to include user profile data
interface CheckoutProps {
    cartItems: any[];
    userProfile: {
        id: string;
        full_name: string;
        email: string;
        address?: string; // Should be captured in your checkout form
    };
    totalAmount: number;
}

export default function CheckoutButton({ cartItems, userProfile, totalAmount }: CheckoutProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;
        setLoading(true);

        try {
            // 1. Create the Order on your server first
            const res = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalAmount })
            });

            const order = await res.json();
            if (!res.ok) throw new Error(order.error || "Failed to create order");

            // 2. Configure Razorpay Options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "DEADSTOCK DEPT",
                description: `Order for ${userProfile.full_name}`,
                order_id: order.id,

                // CRITICAL: Metadata for the Admin Dashboard Webhook
                notes: {
                    user_id: userProfile.id,
                    customer_name: userProfile.full_name,
                    shipping_address: userProfile.address || "No address provided",
                },

                prefill: {
                    name: userProfile.full_name,
                    email: userProfile.email,
                },

                handler: async function (response: any) {
                    // Verify payment on client (Optional, Webhook handles the heavy lifting)
                    console.log("Payment successful, ID:", response.razorpay_payment_id);
                    router.push("/success");
                    router.refresh();
                },

                theme: {
                    color: "#000000", // Streetwear Black
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (err: any) {
            console.error("Checkout Error:", err.message);
            alert("Checkout failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Better way to load the script in Next.js */}
            <Script
                id="razorpay-checkout"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />

            <button
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
                className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-zinc-900 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-tighter"
            >
                {loading ? "Processing..." : `Pay ₹${totalAmount}`}
            </button>
        </>
    );
}