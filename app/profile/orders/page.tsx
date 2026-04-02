import { createClient } from "@/lib/server";
import { Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function OrdersArchivePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // const { data: orders } = await supabase
    //     .from("orders")
    //     .select("*")
    //     .eq("user_id", user?.id)
    //     .order("created_at", { ascending: false });
    const { data: orders } = await supabase
        .from("orders")
        .select(`
        *,
        order_items (
            quantity,
            products (title, image)
        )
    `)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 text-white min-h-screen bg-black">
            <Link href="/profile" className="text-zinc-500 hover:text-white flex items-center gap-2 mb-8 text-xs font-black uppercase tracking-widest transition-colors">
                <ArrowLeft size={14} /> Back to Vault
            </Link>

            <h1 className="text-4xl font-black uppercase italic mb-12 tracking-tighter">Order Archive</h1>

            <div className="space-y-6">
                {!orders || orders.length === 0 ? (
                    <div className="py-32 border-2 border-dashed border-zinc-900 rounded-3xl text-center">
                        <p className="text-zinc-600 font-black uppercase text-[10px] tracking-[0.3em]">The archive is empty.</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-zinc-950 border border-zinc-900 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <p className="font-mono text-[10px] text-zinc-600 uppercase mb-2 italic">Ref: {order.id.slice(0, 12).toUpperCase()}</p>
                                <p className="text-2xl font-black italic tracking-tighter">₹{order.total_amount.toLocaleString()}</p>
                                {order.tracking_id && (
                                    <div className="mt-4 inline-block bg-white text-black px-3 py-1 text-[9px] font-black uppercase">
                                        Tracking: {order.tracking_id}
                                    </div>
                                )}
                            </div>
                            <div className="text-right">
                                <span className={`text-[10px] font-black uppercase px-4 py-2 rounded-full italic ${order.status === 'delivered' ? 'bg-green-500 text-white' : 'bg-zinc-800 text-zinc-400'
                                    }`}>
                                    {order.status}
                                </span>
                                <p className="text-[10px] font-bold text-zinc-700 uppercase mt-4">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}