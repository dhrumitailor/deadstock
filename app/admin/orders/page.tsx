// //works fine 
// import { createClient } from '@/lib/server';
// import { redirect } from 'next/navigation';
// import { updateOrderStatus } from '../actions';

// export default async function AdminOrders() {
//     const supabase = await createClient();

//     // 1. SECURITY CHECK
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) redirect('/login');

//     const { data: profile } = await supabase
//         .from('profiles')
//         .select('role')
//         .eq('id', user.id) // Ensure we use user.id here
//         .single();

//     // If you are being redirected, this role check is failing in the DB
//     if (!profile || profile.role !== 'admin') {
//         redirect('/');
//     }

//     // 2. FETCH ALL ORDERS
//     const { data: orders, error } = await supabase
//         .from('orders')
//         .select(`*, profiles (full_name, email)`)
//         .order('created_at', { ascending: false });

//     if (error) return <div className="p-8">Error: {error.message}</div>;

//     return (
//         <div className="p-8 bg-white min-h-screen text-black">
//             {/* Added text-black above ^ */}

//             <div className="flex justify-between items-center mb-8 pt-4">
//                 <h1 className="text-3xl font-black uppercase tracking-tighter text-black">
//                     Live Order Feed
//                 </h1>
//                 <div className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase italic">
//                     Real-Time Data
//                 </div>
//             </div>

//             <div className="border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//                 <table className="w-full text-left border-collapse">
//                     <thead className="bg-gray-100 border-b-2 border-black">
//                         <tr className="text-[10px] font-black uppercase text-black">
//                             <th className="p-4">ID</th>
//                             <th className="p-4">Customer</th>
//                             <th className="p-4">Total</th>
//                             <th className="p-4 text-right">Fulfillment</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {orders?.length === 0 ? (
//                             <tr>
//                                 <td colSpan={4} className="p-10 text-center text-gray-500 italic">
//                                     No orders found in the database.
//                                 </td>
//                             </tr>
//                         ) : (
//                             orders?.map((order) => (
//                                 <tr key={order.id} className="text-sm text-black hover:bg-gray-50">
//                                     <td className="p-4 font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</td>
//                                     <td className="p-4 uppercase font-bold tracking-tighter">
//                                         {order.profiles?.full_name || 'Guest'}
//                                     </td>
//                                     <td className="p-4 font-mono font-bold text-black">₹{order.total_amount}</td>
//                                     <td className="p-4 text-right">
//                                         <form action={async (formData) => {
//                                             "use server"
//                                             const newStatus = formData.get("status") as string;
//                                             await updateOrderStatus(order.id, newStatus);
//                                         }}>
//                                             <select
//                                                 name="status"
//                                                 defaultValue={order.status}
//                                                 className="text-[10px] border border-black p-1 font-black uppercase bg-white text-black outline-none cursor-pointer"
//                                                 onChange={(e) => e.target.form?.requestSubmit()}
//                                             >
//                                                 <option value="paid">Paid</option>
//                                                 <option value="processing">Processing</option>
//                                                 <option value="shipped">Shipped</option>
//                                                 <option value="delivered">Delivered</option>
//                                             </select>
//                                         </form>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

import { createClient } from '@/lib/server';
import { redirect } from 'next/navigation';
import { updateOrderStatus } from '../actions'; // Ensure this handles (id, status, trackingId)

export default async function AdminOrders() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!profile || profile.role !== 'admin') redirect('/');

    const { data: orders, error } = await supabase
        .from('orders')
        .select(`*, profiles (full_name, email)`)
        .order('created_at', { ascending: false });

    if (error) return <div className="p-8">Error: {error.message}</div>;

    return (
        <div className="p-8 bg-white min-h-screen text-black">
            <div className="flex justify-between items-center mb-8 pt-4">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-black">
                    Live Order Feed
                </h1>
                <div className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase italic">
                    Real-Time Data
                </div>
            </div>

            <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b-2 border-black">
                        <tr className="text-[10px] font-black uppercase text-black">
                            <th className="p-4">ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Total</th>
                            <th className="p-4 text-right">Fulfillment & Tracking</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders?.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-10 text-center text-gray-500 italic">No orders found.</td>
                            </tr>
                        ) : (
                            orders?.map((order) => (
                                <tr key={order.id} className="text-sm text-black hover:bg-gray-50">
                                    <td className="p-4 font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</td>
                                    <td className="p-4">
                                        <p className="uppercase font-bold tracking-tighter">{order.profiles?.full_name || 'Guest'}</p>
                                        <p className="text-[10px] text-zinc-400 lowercase">{order.profiles?.email}</p>
                                    </td>
                                    <td className="p-4 font-mono font-bold">₹{order.total_amount}</td>
                                    <td className="p-4">
                                        <form className="flex justify-end items-center gap-2" action={async (formData) => {
                                            "use server"
                                            const newStatus = formData.get("status") as string;
                                            const trackingId = formData.get("tracking") as string;
                                            // Make sure your updateOrderStatus action accepts (id, status, tracking)
                                            await updateOrderStatus(order.id, newStatus, trackingId);
                                        }}>
                                            <input
                                                name="tracking"
                                                placeholder="Tracking #"
                                                defaultValue={order.tracking_id || ""}
                                                className="text-[10px] border border-zinc-300 p-1 font-bold w-32 outline-none focus:border-black"
                                            />
                                            <select
                                                name="status"
                                                defaultValue={order.status}
                                                className="text-[10px] border border-black p-1 font-black uppercase bg-white cursor-pointer"
                                            >
                                                <option value="paid">Paid</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                            </select>
                                            <button className="bg-black text-white text-[9px] px-2 py-1 font-black uppercase hover:bg-zinc-800">
                                                Update
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}