// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CartSummary({ cartItems, subtotal }: { cartItems: any[], subtotal: number }) {
//     const [loading, setLoading] = useState(false);
//     const [details, setDetails] = useState({
//         full_name: "",
//         phone: "",
//         address: "",
//         pincode: "",
//     });
//     const router = useRouter();

//     const isFormValid = details.full_name && details.phone && details.address && details.pincode;

//     const handlePay = async () => {
//         if (!isFormValid) {
//             alert("Please fill in all shipping details first!");
//             return;
//         }
//         setLoading(true);

//         try {
//             // 1. Create Razorpay Order in your API
//             const res = await fetch("/api/razorpay", { method: "POST" });
//             const order = await res.json();

//             const options = {
//                 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//                 amount: order.amount,
//                 currency: "INR",
//                 name: "DEADSTOCK DEPT",
//                 description: "Order Payment",
//                 order_id: order.id,
//                 handler: async function (response: any) {
//                     // After payment is successful, we'll need to save the order to our DB
//                     // For now, let's just go to success
//                     router.push("/success");
//                 },
//                 prefill: {
//                     name: details.full_name,
//                     contact: details.phone,
//                 },
//                 theme: { color: "#000000" },
//             };

//             const rzp = new (window as any).Razorpay(options);
//             rzp.open();
//         } catch (err) {
//             alert("Payment failed to initialize");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg h-fit shadow-sm text-black">
//             <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//             {/* Shipping Inputs */}
//             <div className="space-y-3 mb-6">
//                 <p className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Shipping Details</p>
//                 <input
//                     className="w-full p-2 border rounded text-sm" placeholder="Full Name"
//                     onChange={(e) => setDetails({ ...details, full_name: e.target.value })}
//                 />
//                 <input
//                     className="w-full p-2 border rounded text-sm" placeholder="Phone"
//                     onChange={(e) => setDetails({ ...details, phone: e.target.value })}
//                 />
//                 <textarea
//                     className="w-full p-2 border rounded text-sm" placeholder="Address"
//                     onChange={(e) => setDetails({ ...details, address: e.target.value })}
//                 />
//                 <input
//                     className="w-full p-2 border rounded text-sm" placeholder="Pincode"
//                     onChange={(e) => setDetails({ ...details, pincode: e.target.value })}
//                 />
//             </div>

//             <div className="space-y-3 border-t border-gray-200 pt-4">
//                 <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>₹ {subtotal.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div className="flex justify-between text-green-700 font-medium">
//                     <span>Shipping</span>
//                     <span>FREE</span>
//                 </div>
//             </div>

//             <div className="flex justify-between font-bold text-xl py-4">
//                 <span>Total</span>
//                 <span>₹ {subtotal.toLocaleString('en-IN')}</span>
//             </div>

//             <button
//                 onClick={handlePay}
//                 disabled={loading || cartItems.length === 0}
//                 className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-zinc-800 disabled:bg-gray-300 transition"
//             >
//                 {loading ? "Processing..." : "Pay with Razorpay"}
//             </button>
//             {!isFormValid && <p className="text-[10px] text-red-500 mt-2 text-center">Fill address to enable payment</p>}
//         </div>
//     );
// }
// //2
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// interface CartItem {
//     id: string;
//     quantity: number;
//     products: {
//         title: string;
//         price: number;
//     };
// }

// export default function CartSummary({ cartItems, subtotal }: { cartItems: any[], subtotal: number }) {
//     const [loading, setLoading] = useState(false);
//     const [details, setDetails] = useState({
//         full_name: "",
//         phone: "",
//         address: "",
//         pincode: "",
//     });
//     const router = useRouter();

//     // Logic to check if all fields are filled
//     const isFormValid =
//         details.full_name.trim() !== "" &&
//         details.phone.trim() !== "" &&
//         details.address.trim() !== "" &&
//         details.pincode.trim() !== "";

//     const handlePay = async () => {
//         if (!isFormValid) {
//             alert("Please fill in all shipping details first!");
//             return;
//         }

//         setLoading(true);

//         // ⚡ UI SIMULATION MODE
//         // We use a timeout to mimic a network request so you can test the UI flow
//         setTimeout(() => {
//             setLoading(false);
//             router.push("/success"); // Redirects to your new Success UI
//         }, 1500);

//         /* // 🔴 REAL RAZORPAY BACKEND (Enable this later when ready for production)
//         try {
//           const res = await fetch("/api/razorpay", { method: "POST" });
//           const order = await res.json();
//           // ... Razorpay options and rzp.open()
//         } catch (err) {
//           alert("Payment failed to initialize");
//           setLoading(false);
//         }
//         */
//     };

//     return (
//         <div className="bg-white p-6 rounded-2xl h-fit shadow-xl text-black border border-gray-100">
//             <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">Order Summary</h2>

//             {/* Shipping Inputs Section */}
//             <div className="space-y-3 mb-8">
//                 <p className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-2">Shipping Details</p>

//                 <input
//                     type="text"
//                     className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none transition"
//                     placeholder="Full Name"
//                     onChange={(e) => setDetails({ ...details, full_name: e.target.value })}
//                 />

//                 <input
//                     type="tel"
//                     className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none transition"
//                     placeholder="Phone Number"
//                     onChange={(e) => setDetails({ ...details, phone: e.target.value })}
//                 />

//                 <textarea
//                     className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none transition min-h-[80px]"
//                     placeholder="Full Shipping Address"
//                     onChange={(e) => setDetails({ ...details, address: e.target.value })}
//                 />

//                 <input
//                     type="text"
//                     className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none transition"
//                     placeholder="Pincode"
//                     onChange={(e) => setDetails({ ...details, pincode: e.target.value })}
//                 />
//             </div>

//             {/* Pricing Breakdown */}
//             <div className="space-y-4 border-t border-gray-100 pt-6">
//                 <div className="flex justify-between text-gray-600">
//                     <span className="font-medium">Subtotal</span>
//                     <span className="font-bold">₹ {subtotal.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div className="flex justify-between text-green-600 font-bold">
//                     <span>Shipping</span>
//                     <span className="uppercase text-xs bg-green-50 px-2 py-1 rounded">Free</span>
//                 </div>
//             </div>

//             {/* Final Total */}
//             <div className="flex justify-between items-center font-black text-2xl py-6 mb-2">
//                 <span>Total</span>
//                 <span>₹ {subtotal.toLocaleString('en-IN')}</span>
//             </div>

//             {/* CTA Button */}
//             <button
//                 onClick={handlePay}
//                 disabled={loading || cartItems.length === 0}
//                 className="w-full bg-black text-white py-5 rounded-full font-bold hover:bg-zinc-800 disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-95 shadow-lg shadow-black/10"
//             >
//                 {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                         <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
//                         Processing...
//                     </span>
//                 ) : (
//                     "Checkout Now"
//                 )}
//             </button>

//             {!isFormValid && (
//                 <p className="text-[11px] text-red-500 mt-4 text-center font-medium bg-red-50 py-2 rounded-lg">
//                     ⚠️ Please complete shipping details to proceed
//                 </p>
//             )}

//             <p className="text-[10px] text-gray-400 mt-6 text-center uppercase tracking-widest font-bold">
//                 Secure encrypted checkout
//             </p>
//         </div>
//     );
// }
//3
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { CreditCard, Truck, ShieldCheck, ArrowRight, ChevronLeft } from "lucide-react";

// export default function CartSummary({ cartItems, subtotal }: { cartItems: any[], subtotal: number }) {
//     const [loading, setLoading] = useState(false);
//     const [step, setStep] = useState(1); // Step 1: Address, Step 2: Payment
//     const [details, setDetails] = useState({
//         full_name: "",
//         phone: "",
//         address: "",
//         pincode: "",
//     });
//     const router = useRouter();

//     const isFormValid =
//         details.full_name.trim() !== "" &&
//         details.phone.trim() !== "" &&
//         details.address.trim() !== "" &&
//         details.pincode.trim() !== "";

//     const handleAction = () => {
//         if (step === 1) {
//             if (!isFormValid) return;
//             setStep(2);
//         } else {
//             setLoading(true);
//             // Simulate the Razorpay Handshake
//             setTimeout(() => {
//                 setLoading(false);
//                 router.push("/success");
//             }, 2000);
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-3xl h-fit shadow-2xl text-black border border-gray-100 sticky top-24">
//             {/* Header & Step Toggle */}
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-black uppercase tracking-tighter italic">Summary</h2>
//                 {step === 2 && (
//                     <button
//                         onClick={() => setStep(1)}
//                         className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:underline"
//                     >
//                         <ChevronLeft size={12} /> Back to Address
//                     </button>
//                 )}
//             </div>

//             {/* Progress Bar */}
//             <div className="flex gap-1.5 mb-8">
//                 <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-black' : 'bg-gray-100'}`} />
//                 <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step === 2 ? 'bg-black' : 'bg-gray-100'}`} />
//             </div>

//             {step === 1 ? (
//                 /* --- STEP 1: SHIPPING DETAILS --- */
//                 <div className="space-y-3 animate-in fade-in slide-in-from-right-8 duration-500">
//                     <div className="flex items-center gap-2 mb-2 text-gray-400">
//                         <Truck size={14} />
//                         <p className="font-bold text-[9px] uppercase tracking-[0.2em]">Shipping Destination</p>
//                     </div>

//                     <input
//                         type="text"
//                         className="w-full p-4 border border-gray-100 rounded-2xl text-sm focus:border-black outline-none transition bg-gray-50/50 placeholder:text-gray-300"
//                         placeholder="Full Name"
//                         onChange={(e) => setDetails({ ...details, full_name: e.target.value })}
//                         value={details.full_name}
//                     />

//                     <input
//                         type="tel"
//                         className="w-full p-4 border border-gray-100 rounded-2xl text-sm focus:border-black outline-none transition bg-gray-50/50 placeholder:text-gray-300"
//                         placeholder="Phone Number"
//                         onChange={(e) => setDetails({ ...details, phone: e.target.value })}
//                         value={details.phone}
//                     />

//                     <textarea
//                         className="w-full p-4 border border-gray-100 rounded-2xl text-sm focus:border-black outline-none transition bg-gray-50/50 placeholder:text-gray-300 min-h-[100px] resize-none"
//                         placeholder="Full Shipping Address"
//                         onChange={(e) => setDetails({ ...details, address: e.target.value })}
//                         value={details.address}
//                     />

//                     <input
//                         type="text"
//                         className="w-full p-4 border border-gray-100 rounded-2xl text-sm focus:border-black outline-none transition bg-gray-50/50 placeholder:text-gray-300"
//                         placeholder="Pincode"
//                         onChange={(e) => setDetails({ ...details, pincode: e.target.value })}
//                         value={details.pincode}
//                     />
//                 </div>
//             ) : (
//                 /* --- STEP 2: PAYMENT PREVIEW --- */
//                 <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
//                     <div className="flex items-center gap-2 mb-2 text-gray-400">
//                         <CreditCard size={14} />
//                         <p className="font-bold text-[9px] uppercase tracking-[0.2em]">Secure Payment</p>
//                     </div>

//                     <div className="p-5 border-2 border-black rounded-2xl flex items-center justify-between bg-zinc-50 relative overflow-hidden group">
//                         <div className="flex items-center gap-4 relative z-10">
//                             <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-black text-[12px] italic">RZP</div>
//                             <div>
//                                 <p className="font-bold text-sm">Razorpay Checkout</p>
//                                 <p className="text-[10px] text-gray-500">UPI, Cards, Netbanking</p>
//                             </div>
//                         </div>
//                         <div className="w-5 h-5 rounded-full border-[6px] border-black relative z-10" />
//                         <div className="absolute top-0 right-0 p-2 opacity-5">
//                             <ShieldCheck size={40} />
//                         </div>
//                     </div>

//                     <div className="p-5 border border-gray-100 rounded-2xl flex items-center justify-between opacity-30 grayscale pointer-events-none">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 bg-gray-200 rounded-xl" />
//                             <p className="font-bold text-sm text-gray-400">Cash on Delivery</p>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Pricing Breakdown */}
//             <div className="mt-10 pt-8 border-t border-gray-100">
//                 <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
//                     <span>Subtotal</span>
//                     <span className="text-black font-mono">₹ {subtotal.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div className="flex justify-between text-green-600 text-xs font-black uppercase tracking-widest mb-8">
//                     <span>Shipping</span>
//                     <span className="bg-green-50 px-2 py-1 rounded text-[9px]">Complimentary</span>
//                 </div>

//                 <div className="flex justify-between items-end font-black text-4xl italic tracking-tighter leading-none mb-10">
//                     <span className="text-sm not-italic font-bold text-gray-300 uppercase tracking-tighter mb-1">Total</span>
//                     <span>₹ {subtotal.toLocaleString('en-IN')}</span>
//                 </div>
//             </div>

//             {/* Primary Action Button */}
//             <button
//                 onClick={handleAction}
//                 disabled={loading || cartItems.length === 0 || (step === 1 && !isFormValid)}
//                 className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-[12px] hover:bg-zinc-800 disabled:bg-gray-100 disabled:text-gray-300 transition-all active:scale-95 shadow-2xl shadow-black/20 group relative overflow-hidden"
//             >
//                 <span className={`flex items-center justify-center gap-3 transition-all duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
//                     {step === 1 ? 'Continue to Payment' : `Confirm & Pay ₹ ${subtotal.toLocaleString('en-IN')}`}
//                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                 </span>

//                 {loading && (
//                     <span className="absolute inset-0 flex items-center justify-center">
//                         <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
//                     </span>
//                 )}
//             </button>

//             {!isFormValid && step === 1 && (
//                 <p className="text-[9px] text-red-400 mt-5 text-center font-black uppercase tracking-[0.25em] animate-pulse">
//                     Shipping details required
//                 </p>
//             )}

//             <div className="mt-8 flex items-center justify-center gap-2 opacity-20">
//                 <ShieldCheck size={12} />
//                 <span className="text-[8px] uppercase font-black tracking-[0.3em]">Encrypted Terminal 001</span>
//             </div>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function CartSummary({ cartItems, subtotal }: { cartItems: any[], subtotal: number }) {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        pincode: "",
    });
    const router = useRouter();

    const isFormValid =
        details.full_name.trim() !== "" &&
        details.email.trim() !== "" &&
        details.phone.trim() !== "" &&
        details.address.trim() !== "" &&
        details.pincode.trim() !== "";

    const handlePay = async () => {
        if (!isFormValid) return;

        setLoading(true);
        // UI Simulation to Success Page
        setTimeout(() => {
            setLoading(false);
            router.push("/success");
        }, 1800);
    };

    return (
        <div className="bg-white p-8 rounded-[2.5rem] h-fit shadow-2xl text-black border border-gray-100 sticky top-24">
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter italic">Order Summary</h2>

            {/* Input Fields Section */}
            <div className="space-y-4 mb-8">
                <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Shipping Details</p>

                <input
                    type="text"
                    className="w-full p-4 border border-gray-100 rounded-2xl text-sm outline-none focus:border-black transition bg-gray-50/30 placeholder:text-gray-300"
                    placeholder="Full Name"
                    onChange={(e) => setDetails({ ...details, full_name: e.target.value })}
                />

                <input
                    type="email"
                    className="w-full p-4 border border-gray-100 rounded-2xl text-sm outline-none focus:border-black transition bg-gray-50/30 placeholder:text-gray-300"
                    placeholder="Email Address"
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                />

                <input
                    type="tel"
                    className="w-full p-4 border border-gray-100 rounded-2xl text-sm outline-none focus:border-black transition bg-gray-50/30 placeholder:text-gray-300"
                    placeholder="Phone Number"
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                />

                <textarea
                    className="w-full p-4 border border-gray-100 rounded-2xl text-sm outline-none focus:border-black transition bg-gray-50/30 placeholder:text-gray-300 min-h-[100px] resize-none"
                    placeholder="Full Shipping Address"
                    onChange={(e) => setDetails({ ...details, address: e.target.value })}
                />

                <input
                    type="text"
                    className="w-full p-4 border border-gray-100 rounded-2xl text-sm outline-none focus:border-black transition bg-gray-50/30 placeholder:text-gray-300"
                    placeholder="Pincode"
                    onChange={(e) => setDetails({ ...details, pincode: e.target.value })}
                />
            </div>

            {/* Pricing Section */}
            <div className="space-y-4 pt-4 border-t border-gray-50">
                <div className="flex justify-between items-center text-gray-500 font-bold text-sm uppercase tracking-tight">
                    <span>Subtotal</span>
                    <span className="text-black font-mono">₹ {subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-green-600 font-black text-sm uppercase tracking-tight">
                    <span>Shipping</span>
                    <span className="text-[10px] bg-green-50 px-3 py-1 rounded-full border border-green-100">Free</span>
                </div>
            </div>

            <div className="flex justify-between items-center font-black text-4xl italic tracking-tighter py-8 leading-none">
                <span className="text-sm not-italic text-gray-300 font-bold uppercase tracking-widest self-end pb-1">Total</span>
                <span>₹ {subtotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Action Button */}
            <button
                onClick={handlePay}
                disabled={loading || cartItems.length === 0 || !isFormValid}
                className="group w-full bg-black text-white py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-zinc-800 disabled:bg-gray-100 disabled:text-gray-300 transition-all active:scale-95 shadow-2xl shadow-black/20 overflow-hidden relative"
            >
                <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                    Checkout Now
                </span>

                {loading && (
                    <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    </span>
                )}
            </button>

            {/* Validation Message */}
            {!isFormValid && (
                <div className="mt-4 p-2 bg-red-50/50 rounded-xl animate-pulse">
                    <p className="text-[9px] text-red-400 text-center font-black uppercase tracking-[0.2em]">
                        ⚠️ Complete shipping details to unlock
                    </p>
                </div>
            )}

            {/* Footer Branding */}
            <div className="mt-8 flex items-center justify-center gap-2 text-gray-200">
                <ShieldCheck size={12} />
                <p className="text-[8px] text-center uppercase tracking-[0.4em] font-black">
                    Secure Encrypted Checkout
                </p>
            </div>
        </div>
    );
}