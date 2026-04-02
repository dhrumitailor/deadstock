import Link from "next/link";
import { getProducts } from "@/lib/data";
import DeleteButton from "@/components/DeleteButton";
import { Edit2 } from "lucide-react";

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tighter">Inventory</h1>
                <Link href="/admin/products/new">
                    <button className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition shadow-sm font-bold text-sm uppercase">
                        + Add Product
                    </button>
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-700 text-xs font-black uppercase tracking-widest border-b border-gray-300">
                            <th className="p-4">Product</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product: any) => (
                            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-16 bg-gray-100 rounded-md border overflow-hidden">
                                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-base font-bold text-gray-900 uppercase tracking-tight">
                                            {product.title}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-900 font-mono font-bold text-base">
                                    ₹{product.price}
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-end gap-3 items-center">
                                        {/* Fixed Edit Link with high visibility */}
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="p-2 rounded-md border border-zinc-300 hover:bg-black hover:text-white transition-all flex items-center justify-center bg-white group"
                                        >
                                            <Edit2 size={18} className="text-black group-hover:text-white" />
                                        </Link>
                                        <DeleteButton product={product} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
//edit button not visible
// import Link from "next/link";
// import { getProducts } from "@/lib/data";
// import DeleteButton from "@/components/DeleteButton";
// import { Edit2 } from "lucide-react";

// export default async function AdminProductsPage() {
//     const products = await getProducts();

//     return (
//         <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

//             {/* Header */}
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tighter">Products Inventory</h1>

//                 <Link href="/admin/products/new">
//                     <button className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition shadow-sm font-bold text-sm uppercase">
//                         + Add Product
//                     </button>
//                 </Link>
//             </div>

//             {/* Table */}
//             <table className="w-full text-left border-collapse">
//                 <thead>
//                     <tr className="text-gray-700 text-xs font-black uppercase tracking-widest border-b border-gray-300">
//                         <th className="p-4">Product</th>
//                         <th className="p-4">Price</th>
//                         <th className="p-4 text-right">Actions</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {products?.map((product: any) => (
//                         <tr
//                             key={product.id}
//                             className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
//                         >

//                             {/* Product Info */}
//                             <td className="p-4">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-14 h-16 bg-gray-100 rounded-md border overflow-hidden">
//                                         <img
//                                             src={product.image}
//                                             alt={product.title}
//                                             className="w-full h-full object-cover"
//                                         />
//                                     </div>
//                                     <span className="text-base font-bold text-gray-900 uppercase tracking-tight">
//                                         {product.title}
//                                     </span>
//                                 </div>
//                             </td>

//                             {/* Price */}
//                             <td className="p-4 text-gray-900 font-mono font-bold text-base">
//                                 ₹{product.price}
//                             </td>

//                             {/* Actions Grouped Correctly inside TD */}
//                             <td className="p-4">
//                                 <div className="flex justify-end gap-3 items-center">

//                                     {/* Updated Edit Link: Wrapped inside the Actions TD */}
//                                     {/* <Link
//                                         href={`/admin/products/${product.id}/edit`}
//                                         className="p-2 rounded-md hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black"
//                                     >
//                                         <Edit2 size={18} />
//                                     </Link> */}
//                                     <Link
//                                         href={`/admin/products/${product.id}/edit`}
//                                         className="p-2 rounded-md hover:bg-gray-100 transition-colors inline-block"
//                                     >
//                                         {/* Explicitly set the color to black here */}
//                                         <Edit2 size={18} className="text-black" />
//                                     </Link>

//                                     <DeleteButton product={product} />

//                                 </div>
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
//td mistake
// import Link from "next/link";
// import { getProducts } from "@/lib/data";
// import DeleteButton from "@/components/DeleteButton";
// import { Edit2 } from "lucide-react";

// export default async function AdminProductsPage() {
//     const products = await getProducts();

//     return (
//         <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

//             {/* Header */}
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-2xl font-bold text-gray-900">Products</h1>

//                 <Link href="/admin/products/new">
//                     <button className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition shadow-sm">
//                         + Add Product
//                     </button>
//                 </Link>
//             </div>

//             {/* Table */}
//             <table className="w-full text-left border-collapse">
//                 <thead>
//                     <tr className="text-gray-700 text-sm font-bold border-b border-gray-300">
//                         <th className="p-4">Product</th>
//                         <th className="p-4">Price</th>
//                         <th className="p-4 text-right">Actions</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {products?.map((product: any) => (
//                         <tr
//                             key={product.id}
//                             className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
//                         >

//                             {/* Product */}
//                             <td className="p-4">
//                                 <div className="flex items-center gap-4">
//                                     <img
//                                         src={product.image}
//                                         className="w-14 h-16 object-cover rounded-md border"
//                                     />
//                                     <span className="text-lg font-semibold text-gray-900">
//                                         {product.title}
//                                     </span>
//                                 </div>
//                             </td>


//                             {/* Price */}
//                             <td className="p-4 text-gray-900 font-semibold text-base">
//                                 ₹ {product.price}
//                             </td>
//                             {/*Edit*/}
//                             <Link href={`/admin/products/${product.id}/edit`} className="p-2 hover:bg-gray-100 rounded">
//                                 <Edit2 size={16} />
//                             </Link>


//                             {/* Actions */}
//                             <td className="p-4">
//                                 <div className="flex justify-end gap-2">

//                                     <Link href={`/admin/products/edit/${product.id}`}>
//                                         <button className="p-2 rounded-md hover:bg-gray-200 transition">
//                                             <Edit2 size={18} className="text-gray-700" />
//                                         </button>
//                                     </Link>

//                                     <DeleteButton product={product} />

//                                 </div>
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
//one working
// import Link from "next/link";
// import { getProducts } from "@/lib/data";
// import DeleteButton from "@/components/DeleteButton";
// import { Edit2 } from "lucide-react";

// export default async function AdminProductsPage() {
//     const products = await getProducts();

//     return (
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">

//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-semibold">Products</h1>

//                 <Link href="/admin/products/new">
//                     <button className="bg-black text-white px-4 py-2 rounded">
//                         + Add Product
//                     </button>
//                 </Link>
//             </div>

//             <table className="w-full text-left">
//                 <thead>
//                     <tr className="text-gray-800 text-sm font-semibold border-b">
//                         <th className="p-3">Product</th>
//                         <th className="p-3">Price</th>
//                         <th className="p-3">Actions</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {products?.map((product: any) => (
//                         <tr key={product.id} className="border-b hover:bg-gray-50 transition">

//                             <td className="p-3 flex items-center gap-3">
//                                 <img
//                                     src={product.image}
//                                     className="w-12 h-14 object-cover rounded"
//                                 />
//                                 <span className="text-lg font-bold text-gray-900 tracking-tight">
//                                     {product.title}
//                                 </span>
//                             </td>

//                             <td className="p-3">₹ {product.price}</td>

//                             <td className="p-3 flex gap-2">

//                                 <Link href={`/admin/products/edit/${product.id}`}>
//                                     <button className="p-2 hover:bg-gray-100 rounded">
//                                         <Edit2 size={16} />
//                                     </button>
//                                 </Link>

//                                 <DeleteButton product={product} />

//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


// // //VIEW ALL SHOULD BE AT SAME LEVEL AS NEW
// // //INSIDE PRODUCT




