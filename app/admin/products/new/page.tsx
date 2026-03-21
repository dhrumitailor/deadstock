"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";

export default function NewProductPage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.from("products").insert({
            title,
            price: Number(price),
            image,
            description,
        });

        if (error) {
            console.error(error);
            alert("Error adding product");
        } else {
            setIsSuccess(true);
        }
    };

    if (isSuccess) {
        return (
            <div className="max-w-3xl mx-auto py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
                <CheckCircle className="text-green-500 mb-6" size={64} />
                <h1 className="text-3xl font-serif text-black mb-4">Product Added!</h1>
                <p className="text-gray-600 mb-8 max-w-md">
                    Your new product has been successfully added to the catalog and is now live.
                </p>
                <Link href="/admin" className="inline-block bg-black text-white px-8 py-3 rounded-full">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <Link href="/admin" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black mb-6 transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-serif mb-8 text-black">Add New Product</h1>

            <form onSubmit={handleSubmit} className="space-y-8 text-black">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* TITLE + DESC */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                            <h2 className="text-lg font-semibold text-black">General Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Vintage Denim Jacket"
                                    className="w-full p-2 border border-gray-300 rounded text-black bg-white focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Describe the material, fit, and condition..."
                                    className="w-full p-2 border border-gray-300 rounded text-black bg-white focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                            <h2 className="text-lg font-semibold text-black">Pricing</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                <input
                                    required
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full p-2 border border-gray-300 rounded text-black bg-white focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">

                        {/* IMAGE */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 text-black">Product Image</h2>

                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <div className="relative">
                                <input
                                    placeholder="https://image-url.com/photo"
                                    className="w-full p-2 border border-gray-300 rounded mb-4 text-black bg-white focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg py-8 text-gray-400">
                                <Upload size={32} className="mb-2" />
                                <span className="text-xs">Preview will appear here</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                    <Link href="/admin" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancel
                    </Link>

                    <button type="submit" className="px-8 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition-colors shadow-md">
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}


// "use client";

// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Link from "next/link";
// import { ArrowLeft, Upload, CheckCircle } from "lucide-react";

// export default function NewProductPage() {
//     const [isSuccess, setIsSuccess] = useState(false);
//     const router = useRouter();

//     const [title, setTitle] = useState("");
//     const [price, setPrice] = useState("");
//     const [image, setImage] = useState("");
//     const [description, setDescription] = useState("");

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const { error } = await supabase.from("products").insert({
//             title,
//             price: Number(price),
//             image,
//             description,
//         });

//         if (error) {
//             console.error(error);
//             alert("Error adding product");
//         } else {
//             setIsSuccess(true);
//         }
//     };

//     if (isSuccess) {
//         return (
//             <div className="max-w-3xl mx-auto py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
//                 <CheckCircle className="text-green-500 mb-6" size={64} />
//                 <h1 className="text-3xl font-serif text-black mb-4">Product Added!</h1>
//                 <p className="text-gray-600 mb-8 max-w-md">
//                     Your new product has been successfully added to the catalog and is now live.
//                 </p>
//                 <Link href="/admin" className="inline-block bg-black text-white px-8 py-3 rounded-full">
//                     Return to Dashboard
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg">
//             <Link href="/admin" className="inline-flex items-center text-sm mb-6">
//                 <ArrowLeft size={16} className="mr-2" />
//                 Back to Dashboard
//             </Link>

//             <h1 className="text-3xl font-serif mb-8">Add New Product</h1>

//             <form onSubmit={handleSubmit} className="space-y-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                     {/* LEFT SIDE */}
//                     <div className="lg:col-span-2 space-y-6">

//                         {/* TITLE + DESC */}
//                         <div className="bg-white p-6 rounded-lg border space-y-4">
//                             <h2 className="text-lg font-medium">General Information</h2>

//                             <div>
//                                 <label>Product Title</label>
//                                 <input
//                                     required
//                                     type="text"
//                                     className="w-full p-2 border rounded"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//                             </div>

//                             <div>
//                                 <label>Description</label>
//                                 <textarea
//                                     required
//                                     rows={4}
//                                     className="w-full p-2 border rounded"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         {/* PRICE */}
//                         <div className="bg-white p-6 rounded-lg border space-y-4">
//                             <h2 className="text-lg font-medium">Pricing</h2>

//                             <div>
//                                 <label>Price</label>
//                                 <input
//                                     required
//                                     type="number"
//                                     className="w-full p-2 border rounded"
//                                     value={price}
//                                     onChange={(e) => setPrice(e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                     </div>

//                     {/* RIGHT SIDE */}
//                     <div className="space-y-6">

//                         {/* IMAGE */}
//                         <div className="bg-white p-6 rounded-lg border">
//                             <h2 className="text-lg font-medium mb-4">Image</h2>

//                             <input
//                                 placeholder="Paste Image URL"
//                                 className="w-full p-2 border rounded mb-4"
//                                 value={image}
//                                 onChange={(e) => setImage(e.target.value)}
//                             />

//                             <Upload size={24} />
//                         </div>

//                     </div>
//                 </div>

//                 {/* BUTTONS */}
//                 <div className="flex justify-end gap-4 pt-6">
//                     <Link href="/admin" className="px-4 py-2 border rounded">
//                         Cancel
//                     </Link>

//                     <button type="submit" className="px-6 py-2 bg-black text-white rounded">
//                         Save Product
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }