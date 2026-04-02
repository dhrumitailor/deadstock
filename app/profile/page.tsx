

// import { createClient } from "@/lib/server";
// import { redirect } from "next/navigation";
// import { User, MapPin, Package, ChevronRight, Heart, ShoppingBag } from "lucide-react";
// import Link from "next/link";
// // Assuming you have a standard SignOut component, if not use a regular button with a form action
// import SignOutButton from "@/components/SignOutButton";

// export default async function ProfilePage() {
//     const supabase = await createClient();
//     const { data: { user } } = await supabase.auth.getUser();

//     if (!user) {
//         redirect("/login");
//     }

//     // Fetch profile details including custom fields
//     const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//     // Fetch recent orders (Live feed)
//     const { data: orders } = await supabase
//         .from("orders")
//         .select("*")
//         .eq("user_id", user.id)
//         .order("created_at", { ascending: false })
//         .limit(5);

//     return (
//         <div className="max-w-5xl mx-auto px-4 py-16 min-h-screen text-white bg-black">
//             <header className="mb-12">
//                 <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
//                     <User size={36} strokeWidth={3} /> My Account
//                 </h1>
//                 <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-2">Member ID: {user.id.slice(0, 8)}</p>
//             </header>

//             <div className="grid lg:grid-cols-3 gap-12">
//                 {/* SIDEBAR NAVIGATION */}
//                 <div className="space-y-6">
//                     <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm">
//                         <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Authenticated As</p>
//                         <p className="truncate font-mono text-sm text-zinc-200">{user.email}</p>
//                     </div>

//                     <nav className="flex flex-col gap-2">
//                         <Link href="/profile/orders" className="flex items-center justify-between p-4 bg-zinc-900/30 border border-transparent hover:border-zinc-700 hover:bg-zinc-900 rounded-xl transition-all group">
//                             <span className="flex items-center gap-3 font-bold uppercase text-sm tracking-tight">
//                                 <Package size={20} className="text-zinc-400 group-hover:text-white" /> Orders
//                             </span>
//                             <ChevronRight size={16} className="text-zinc-600" />
//                         </Link>

//                         <Link href="/wishlist" className="flex items-center justify-between p-4 bg-zinc-900/30 border border-transparent hover:border-zinc-700 hover:bg-zinc-900 rounded-xl transition-all group">
//                             <span className="flex items-center gap-3 font-bold uppercase text-sm tracking-tight">
//                                 <Heart size={20} className="text-zinc-400 group-hover:text-white" /> Wishlist
//                             </span>
//                             <ChevronRight size={16} className="text-zinc-600" />
//                         </Link>

//                         <div className="pt-4 border-t border-zinc-800 mt-2">
//                             <SignOutButton />
//                         </div>
//                     </nav>
//                 </div>

//                 {/* MAIN CONTENT */}
//                 <div className="lg:col-span-2 space-y-12">

//                     {/* SHIPPING SUMMARY */}
//                     <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
//                         <div className="absolute top-0 right-0 p-4 opacity-10">
//                             <MapPin size={100} />
//                         </div>

//                         <div className="flex justify-between items-center mb-6 relative z-10">
//                             <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
//                                 <MapPin size={20} className="text-zinc-400" /> Shipping Destination
//                             </h2>
//                             <Link href="/profile/edit" className="text-[10px] font-black uppercase text-zinc-500 hover:text-white border border-zinc-700 px-3 py-1 rounded-full transition">
//                                 Update
//                             </Link>
//                         </div>

//                         <div className="relative z-10">
//                             {profile?.shipping_address ? (
//                                 <div className="text-zinc-300 space-y-1 font-medium">
//                                     <p className="text-xl font-bold text-white tracking-tight underline decoration-zinc-700 underline-offset-4 mb-2">{profile.full_name}</p>
//                                     <p className="text-sm italic text-zinc-400">{profile.shipping_address}</p>
//                                     <p className="text-sm uppercase">{profile.city}, {profile.pincode}</p>
//                                     <div className="flex items-center gap-2 mt-4 text-xs text-zinc-500">
//                                         <span className="bg-zinc-800 px-2 py-1 rounded font-mono">TEL</span>
//                                         {profile.phone}
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="py-4 flex flex-col items-center text-center">
//                                     <p className="text-zinc-500 italic mb-4">No shipping logistics found on file.</p>
//                                     <Link href="/profile/edit" className="bg-white text-black px-6 py-2 rounded-lg font-black uppercase text-xs">Add Address</Link>
//                                 </div>
//                             )}
//                         </div>
//                     </section>

//                     {/* RECENT ORDERS FEED */}
//                     <section>
//                         <div className="flex justify-between items-end mb-6">
//                             <h2 className="text-xl font-black uppercase tracking-tighter">Vault History</h2>
//                             <Link href="/profile/orders" className="text-[10px] font-black uppercase text-zinc-500 hover:text-white">View Full Archive →</Link>
//                         </div>

//                         {orders && orders.length > 0 ? (
//                             <div className="space-y-4">
//                                 {orders.map((order) => (
//                                     <div key={order.id} className="bg-zinc-900/20 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center hover:bg-zinc-900/40 transition">
//                                         <div className="flex items-center gap-4">
//                                             <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
//                                                 <ShoppingBag size={18} className="text-zinc-400" />
//                                             </div>
//                                             <div>
//                                                 <p className="font-mono text-xs text-zinc-500">ORD-{order.id.slice(0, 8).toUpperCase()}</p>
//                                                 <p className="text-xs text-zinc-400">{new Date(order.created_at).toDateString()}</p>
//                                             </div>
//                                         </div>
//                                         <div className="text-right">
//                                             <p className="font-black text-lg tracking-tighter">₹{order.total_amount.toLocaleString('en-IN')}</p>
//                                             <span className={`text-[9px] font-black uppercase px-2 py-1 rounded italic ${order.status === 'delivered' ? 'bg-green-500/10 text-green-500' : 'bg-white text-black'
//                                                 }`}>
//                                                 {order.status}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="p-12 text-center border-2 border-dashed border-zinc-900 rounded-2xl">
//                                 <ShoppingBag size={48} className="mx-auto text-zinc-800 mb-4" />
//                                 <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">No activity found in the vault.</p>
//                                 <Link href="/shop" className="mt-4 inline-block text-white underline font-bold uppercase text-xs">Start Shopping</Link>
//                             </div>
//                         )}
//                     </section>
//                 </div>
//             </div>
//         </div>
//     );
// }
//after polishing 
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { User, MapPin, Package, ChevronRight, Heart, ShoppingBag, ShieldCheck } from "lucide-react";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

    return (
        <div className="max-w-6xl mx-auto px-6 py-16 min-h-screen text-white bg-black">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-white text-black text-[10px] font-black px-2 py-0.5 uppercase italic">Member Level: 01</span>
                        <ShieldCheck size={16} className="text-zinc-500" />
                    </div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter italic">
                        The Vault Profile
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Credentials Authenticated</p>
                    <p className="font-mono text-xs text-zinc-300 mt-1">{user.email}</p>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* SIDEBAR NAVIGATION */}
                <div className="space-y-6">
                    <nav className="flex flex-col gap-2">
                        <Link href="/profile/orders" className="flex items-center justify-between p-5 bg-zinc-900/40 border border-zinc-800 hover:border-white rounded-xl transition-all group">
                            <span className="flex items-center gap-3 font-black uppercase text-xs tracking-widest">
                                <Package size={18} className="text-zinc-500 group-hover:text-white transition-colors" /> My Drops
                            </span>
                            <ChevronRight size={16} className="text-zinc-700 group-hover:text-white" />
                        </Link>

                        <Link href="/wishlist" className="flex items-center justify-between p-5 bg-zinc-900/40 border border-zinc-800 hover:border-white rounded-xl transition-all group">
                            <span className="flex items-center gap-3 font-black uppercase text-xs tracking-widest">
                                <Heart size={18} className="text-zinc-500 group-hover:text-white transition-colors" /> Saved Grails
                            </span>
                            <ChevronRight size={16} className="text-zinc-700 group-hover:text-white" />
                        </Link>

                        <div className="pt-6">
                            <SignOutButton />
                        </div>
                    </nav>

                    <div className="p-6 border border-zinc-900 rounded-2xl bg-zinc-950">
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-4">Security</p>
                        <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                            Your account is protected by Deadstock encryption. All transaction logs are immutable.
                        </p>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="lg:col-span-2 space-y-12">

                    {/* SHIPPING SUMMARY */}
                    <section className="bg-zinc-900/50 border-2 border-zinc-800 p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-600 transition-all">
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-zinc-400">
                                <MapPin size={16} /> Destination Logistics
                            </h2>
                            <Link href="/profile/edit" className="bg-white text-black text-[10px] font-black uppercase px-4 py-1.5 hover:bg-zinc-200 transition tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                                Edit
                            </Link>
                        </div>

                        <div className="relative z-10">
                            {profile?.shipping_address ? (
                                <div className="space-y-1">
                                    <p className="text-2xl font-black uppercase italic tracking-tighter mb-4">{profile.full_name}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-xs text-zinc-400 font-medium uppercase tracking-tight leading-relaxed">
                                            <p>{profile.shipping_address}</p>
                                            <p>{profile.city}, {profile.pincode}</p>
                                        </div>
                                        <div className="text-right self-end">
                                            <p className="text-[9px] font-black text-zinc-600 uppercase mb-1 tracking-widest">Active Phone</p>
                                            <p className="font-mono text-sm">{profile.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-6 flex flex-col items-center text-center">
                                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">No shipping logistics found in the vault.</p>
                                    <Link href="/profile/edit" className="border border-white/20 hover:border-white px-8 py-3 text-[10px] font-black uppercase tracking-widest transition">Add Address</Link>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* RECENT ORDERS FEED */}
                    <section>
                        <div className="flex justify-between items-end mb-8 px-2">
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Recent Secures</h2>
                            <Link href="/profile/orders" className="text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">Archive View →</Link>
                        </div>

                        {orders && orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 hover:bg-zinc-900/30 transition-all group">
                                        <div className="flex gap-5">
                                            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center shrink-0">
                                                <ShoppingBag size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-mono text-[10px] text-zinc-600 uppercase">ID: {order.id.slice(0, 8).toUpperCase()}</p>
                                                <p className="font-black text-lg italic tracking-tighter mb-2">₹{order.total_amount.toLocaleString()}</p>

                                                {/* TRACKING ID VISIBILITY */}
                                                {order.tracking_id ? (
                                                    <div className="inline-block bg-zinc-800 px-3 py-1 rounded-md">
                                                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Tracking: <span className="text-white ml-1">{order.tracking_id}</span></p>
                                                    </div>
                                                ) : (
                                                    <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest italic">Awaiting Courier Dispatch</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-row md:flex-col justify-between items-end gap-2 border-t md:border-t-0 border-zinc-900 pt-4 md:pt-0">
                                            <span className={`text-[10px] font-black uppercase px-3 py-1 italic tracking-widest ${order.status === 'delivered' ? 'bg-green-500 text-white' : 'bg-white text-black'
                                                }`}>
                                                {order.status}
                                            </span>
                                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-20 text-center border-2 border-dashed border-zinc-900 rounded-3xl">
                                <ShoppingBag size={40} className="mx-auto text-zinc-800 mb-6" />
                                <p className="text-zinc-600 font-black uppercase text-[10px] tracking-[0.3em]">The vault history is empty.</p>
                                <Link href="/shop" className="mt-6 inline-block bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition">Explore Collection</Link>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}