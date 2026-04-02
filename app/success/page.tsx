// import Link from "next/link";
// import { CheckCircle2, Package, ArrowRight, ShoppingBag } from "lucide-react";

// export default function SuccessPage() {
//     // Dummy data for UI preview
//     const orderNumber = "ORD-772X-DS";

//     return (
//         <div className="max-w-3xl mx-auto px-4 py-20 min-h-screen text-white flex flex-col items-center text-center">
//             {/* 1. Success Icon with Animation Placeholder */}
//             <div className="mb-8 p-4 bg-green-500/10 rounded-full">
//                 <CheckCircle2 size={80} className="text-green-500 animate-in zoom-in duration-500" />
//             </div>

//             {/* 2. Main Heading */}
//             <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
//                 Payment Received
//             </h1>
//             <p className="text-zinc-400 text-lg mb-10 max-w-md">
//                 Your order is being processed and will be shipped to your deadstock vault soon.
//             </p>

//             {/* 3. Order Summary Card */}
//             <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12 text-left">
//                 <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4">
//                     <span className="text-zinc-500 text-sm font-medium">Order Number</span>
//                     <span className="font-mono font-bold text-white">{orderNumber}</span>
//                 </div>

//                 <div className="space-y-4">
//                     <div className="flex items-start gap-4">
//                         <Package className="text-zinc-500 mt-1" size={20} />
//                         <div>
//                             <p className="font-bold">Standard Shipping</p>
//                             <p className="text-sm text-zinc-500">Estimated Delivery: 3-5 Business Days</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* 4. Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 w-full">
//                 <Link
//                     href="/profile"
//                     className="flex-1 bg-white text-black py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition"
//                 >
//                     View Order History <ArrowRight size={18} />
//                 </Link>
//                 <Link
//                     href="/shop"
//                     className="flex-1 border border-zinc-700 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-900 transition"
//                 >
//                     <ShoppingBag size={18} /> Continue Shopping
//                 </Link>
//             </div>

//             {/* 5. Support Link */}
//             <p className="mt-12 text-zinc-600 text-sm">
//                 Need help? <Link href="/contact" className="underline hover:text-zinc-400">Contact Support</Link>
//             </p>
//         </div>
//     );
// }
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";

export default function SuccessPage() {
    // Dummy data - In a real scenario, you'd pass the actual Order ID as a URL param
    const orderNumber = "DS-VLT-772X";

    return (
        <div className="max-w-3xl mx-auto px-6 py-24 min-h-screen text-white bg-black flex flex-col items-center text-center">

            {/* 1. SUCCESS ICON - Brutalist Style */}
            <div className="mb-10 relative">
                <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative p-6 bg-zinc-900 border-2 border-green-500 rounded-full shadow-[0_0_30px_-10px_rgba(34,197,94,0.5)]">
                    <CheckCircle2 size={60} className="text-green-500" />
                </div>
            </div>

            {/* 2. HEADINGS - Aggressive Italics */}
            <div className="mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-500 mb-4 block italic">
                    Transaction Authenticated
                </span>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] mb-6">
                    Payment <br /> Received
                </h1>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest max-w-sm mx-auto">
                    The vault has been updated. Your drop is being prepared for secure dispatch.
                </p>
            </div>

            {/* 3. ORDER SUMMARY CARD - High Contrast */}
            <div className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-3xl p-10 mb-12 text-left relative overflow-hidden group hover:border-zinc-700 transition-all">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-6 mb-6">
                    <div>
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Vault Reference</p>
                        <p className="font-mono text-xl font-bold text-white tracking-tighter">{orderNumber}</p>
                    </div>
                    <ShieldCheck size={32} className="text-zinc-800" />
                </div>

                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
                        <Package className="text-zinc-400" size={24} />
                    </div>
                    <div>
                        <p className="font-black uppercase italic text-sm tracking-tight">Express Logistics</p>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Est: 3-5 Business Days</p>
                    </div>
                </div>
            </div>

            {/* 4. ACTION BUTTONS - Linked to real routes */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link
                    href="/profile/orders" // UPDATED TO YOUR ARCHIVE PATH
                    className="flex-1 bg-white text-black py-5 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-200 transition shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                    Vault History <ArrowRight size={16} />
                </Link>

                <Link
                    href="/shop"
                    className="flex-1 border-2 border-zinc-800 text-white py-5 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:border-white transition-all group"
                >
                    <ShoppingBag size={16} className="text-zinc-600 group-hover:text-white" />
                    Back to Shop
                </Link>
            </div>

            {/* 5. SUPPORT - Functional Mailto */}
            {/* <div className="mt-16 border-t border-zinc-900 pt-8 w-full">
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    Logistics Issue? <a href="mailto:support@deadstockdept.com" className="text-white underline underline-offset-4 hover:text-zinc-300">Contact Control</a>
                </p>
            </div> */}
            {/* 5. SUPPORT - Functional Mailto */}
            {/* <div className="mt-16 border-t border-zinc-900 pt-8 w-full">
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    Logistics Issue?{" "}
                    <a
                        href="mailto:dhrumitailor@gmail.com?subject=Order Logistics - Deadstock Dept."
                        className="text-white underline underline-offset-8 hover:text-zinc-300 transition-all font-black"
                    >
                        Contact Control
                    </a>
                </p>
            </div> */}
            {/* 5. SUPPORT - Functional Link with High Z-Index */}
            <div className="mt-16 border-t border-zinc-900 pt-8 w-full relative z-50"> {/* Added z-50 */}
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    Logistics Issue?{" "}
                    <Link
                        href="/contact"
                        className="inline-block text-white underline underline-offset-8 hover:text-zinc-300 transition-all font-black cursor-pointer relative z-50"
                    >
                        Contact Control
                    </Link>
                </p>
            </div>
        </div>
    );
}