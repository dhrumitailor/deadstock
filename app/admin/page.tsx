
// import Link from "next/link";
// import { Edit2, ShoppingBag } from "lucide-react";
// import { getProducts } from "@/lib/data";
// import DeleteButton from "@/components/DeleteButton";
// import { createClient } from '@/lib/server';

// export default async function AdminDashboard() {
//     const supabase = await createClient();
//     const products = await getProducts();

//     // 1. Fetch live stats from the orders table
//     const { data: orders } = await supabase.from('orders').select('total_amount');

//     // 2. Calculate real numbers
//     const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
//     const totalOrders = orders?.length || 0;

//     return (
//         <div className="min-h-screen bg-gray-100 py-10 px-4">
//             <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-lg space-y-10 text-black">

//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                     <div>
//                         <h1 className="text-3xl font-serif text-black">Dashboard</h1>
//                         <p className="text-gray-500 mt-1">
//                             Manage your store products and orders.
//                         </p>
//                     </div>

//                     <div className="flex gap-2">
//                         <Link href="/admin/orders">
//                             <button className="border-2 border-black text-black px-5 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 font-medium">
//                                 <ShoppingBag size={18} />
//                                 View Orders
//                             </button>
//                         </Link>

//                         <Link href="/admin/products/new">
//                             <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
//                                 + New Product
//                             </button>
//                         </Link>
//                     </div>
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                     <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
//                         <p className="text-sm text-gray-500 mb-1 font-bold uppercase tracking-tight">Total Revenue</p>
//                         <p className="text-3xl font-serif text-black">₹{totalRevenue.toLocaleString('en-IN')}</p>
//                     </div>

//                     <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
//                         <p className="text-sm text-gray-500 mb-1 font-bold uppercase tracking-tight">Active Products</p>
//                         <p className="text-3xl font-serif text-black">{products?.length || 0}</p>
//                     </div>

//                     <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
//                         <p className="text-sm text-gray-500 mb-1 font-bold uppercase tracking-tight">Recent Orders</p>
//                         <p className="text-3xl font-serif text-black">{totalOrders}</p>
//                     </div>
//                 </div>

//                 {/* Products Inventory Table */}
//                 <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
//                     <div className="p-6 border-b flex justify-between items-center bg-gray-50">
//                         <h2 className="text-lg font-medium text-black">Inventory Overview</h2>
//                         <Link href="/admin/products" className="text-sm text-gray-600 hover:text-black font-bold uppercase">
//                             View All Items →
//                         </Link>
//                     </div>

//                     <div className="overflow-x-auto">
//                         <table className="w-full text-left">
//                             <thead className="bg-gray-100 border-b text-[10px] font-black uppercase text-gray-600">
//                                 <tr>
//                                     <th className="p-4">Item</th>
//                                     <th className="p-4">Price</th>
//                                     <th className="p-4 text-right">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {products?.slice(0, 5).map((product: any) => (
//                                     <tr key={product.id} className="border-t hover:bg-gray-50 transition">
//                                         <td className="p-4">
//                                             <div className="flex items-center gap-4">
//                                                 <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
//                                                     {product.image && (
//                                                         <img src={product.image} alt="" className="w-full h-full object-cover" />
//                                                     )}
//                                                 </div>
//                                                 <p className="text-sm font-bold uppercase tracking-tight">{product.title}</p>
//                                             </div>
//                                         </td>
//                                         <td className="p-4 font-mono font-bold text-sm">₹{product.price}</td>
//                                         <td className="p-4 text-right space-x-2">
//                                             <Link href={`/admin/products/${product.id}/edit`} className="inline-block p-2 hover:bg-gray-200 rounded transition">
//                                                 <Edit2 size={16} className="text-black" />
//                                             </Link>
//                                             <DeleteButton product={product} />
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }
//stock management
import Link from "next/link";
import { Edit2, ShoppingBag } from "lucide-react";
import { getProducts } from "@/lib/data";
import DeleteButton from "@/components/DeleteButton";
import { createClient } from '@/lib/server';

export default async function AdminDashboard() {
    const supabase = await createClient();
    const products = await getProducts();

    // 1. Fetch live stats from the orders table
    const { data: orders } = await supabase.from('orders').select('total_amount');

    // 2. Calculate real numbers
    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
    const totalOrders = orders?.length || 0;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-lg space-y-10 text-black">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif text-black">Dashboard</h1>
                        <p className="text-gray-500 mt-1">
                            Manage your store products and orders.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Link href="/admin/orders">
                            <button className="border-2 border-black text-black px-5 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 font-medium">
                                <ShoppingBag size={18} />
                                View Orders
                            </button>
                        </Link>

                        <Link href="/admin/products/new">
                            <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
                                + New Product
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
                        <p className="text-sm text-gray-500 mb-1 font-bold uppercase tracking-tight">Total Revenue</p>
                        <p className="text-3xl font-serif text-black">₹{totalRevenue.toLocaleString('en-IN')}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
                        <p className="text-sm text-gray-500 mb-1 font-bold uppercase tracking-tight">Active Products</p>
                        <p className="text-3xl font-serif text-black">{products?.length || 0}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
                        <p className="text-sm text-gray-500 mb-1 font-bold uppercase tracking-tight">Recent Orders</p>
                        <p className="text-3xl font-serif text-black">{totalOrders}</p>
                    </div>
                </div>

                {/* Products Inventory Table */}
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                        <h2 className="text-lg font-medium text-black">Inventory Overview</h2>
                        <Link href="/admin/products" className="text-sm text-gray-600 hover:text-black font-bold uppercase">
                            View All Items →
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 border-b text-[10px] font-black uppercase text-gray-600">
                                <tr>
                                    <th className="p-4">Item</th>
                                    <th className="p-4">Price</th>
                                    {/* STEP 4: STOCK HEADER */}
                                    <th className="p-4 text-center">Vault Stock</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.slice(0, 5).map((product: any) => (
                                    <tr key={product.id} className="border-t hover:bg-gray-50 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                                    {product.image && (
                                                        <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt="" className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <p className="text-sm font-bold uppercase tracking-tight">{product.title}</p>
                                            </div>
                                        </td>

                                        <td className="p-4 font-mono font-bold text-sm">₹{product.price?.toLocaleString('en-IN')}</td>

                                        {/* STEP 4: STOCK STATUS COLUMN */}
                                        <td className="p-4 text-center">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${(product.stock_quantity ?? 0) <= 3
                                                    ? 'border-red-500 text-red-500 bg-red-50 animate-pulse'
                                                    : 'border-black text-black bg-white'
                                                }`}>
                                                {product.stock_quantity ?? 0} LEFT
                                            </span>
                                        </td>

                                        <td className="p-4 text-right space-x-2">
                                            <Link href={`/admin/products/${product.id}/edit`} className="inline-block p-2 hover:bg-gray-200 rounded transition border border-transparent hover:border-zinc-200 group">
                                                <Edit2 size={16} className="text-black" />
                                            </Link>
                                            <DeleteButton product={product} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}