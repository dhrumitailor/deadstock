// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";
// import { Upload, X } from "lucide-react";

// export default function NewProductPage() {
//     const [title, setTitle] = useState("");
//     const [price, setPrice] = useState("");
//     const [description, setDescription] = useState(""); // 1. Added description state
//     const [loading, setLoading] = useState(false);
//     const [category, setCategory] = useState("tops");
//     const [images, setImages] = useState<File[]>([]);
//     const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

//     const router = useRouter();

//     const sizeCharts: any = {
//         tops: ["S", "M", "L", "XL", "XXL"],
//         jeans: ["28", "30", "32", "34", "36", "38", "40"],
//         thrifted: []
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             setImages([...images, ...Array.from(e.target.files)]);
//         }
//     };

//     const toggleSize = (size: string) => {
//         setSelectedSizes(prev =>
//             prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
//         );
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (images.length === 0) return alert("Please upload at least one image");
//         setLoading(true);

//         try {
//             const imageUrls = [];
//             for (const file of images) {
//                 const fileName = `${Date.now()}-${file.name}`;
//                 const { data, error: uploadError } = await supabase.storage
//                     .from("product-images").upload(fileName, file);
//                 if (uploadError) throw uploadError;
//                 const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
//                 imageUrls.push(urlData.publicUrl);
//             }

//             const { error } = await supabase.from("products").insert({
//                 title,
//                 price: parseFloat(price),
//                 description, // 2. Added description to database insert
//                 image: imageUrls,
//                 sizes: selectedSizes,
//                 category: category
//             });

//             if (error) throw error;
//             alert("Product Created! ✅");
//             router.push("/admin");
//             router.refresh();
//         } catch (err: any) {
//             alert(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-md border border-zinc-200 my-10">
//             <h1 className="text-3xl font-bold mb-8 text-black tracking-tighter">Add New Product</h1>

//             <form onSubmit={handleSubmit} className="space-y-8 text-black">
//                 {/* Category Selector */}
//                 <div>
//                     <label className="block text-sm font-bold uppercase tracking-widest text-zinc-700 mb-2">Item Type</label>
//                     <select
//                         value={category}
//                         onChange={(e) => {
//                             setCategory(e.target.value);
//                             setSelectedSizes([]);
//                         }}
//                         className="w-full p-4 border border-zinc-300 rounded-xl bg-zinc-50 font-medium outline-none focus:ring-2 focus:ring-black"
//                     >
//                         <option value="tops">Tops (Tees, Hoodies, Shirts)</option>
//                         <option value="jeans">Jeans & Trousers (Waist Size)</option>
//                         <option value="thrifted">Thrifted / One-of-One (Manual Size)</option>
//                     </select>
//                     <p className="text-[10px] text-zinc-400 mt-2 italic">
//                         *Choose Thrifted if you want to mention the size only in the description.
//                     </p>
//                 </div>

//                 {/* Product Details */}
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-bold uppercase mb-2 text-zinc-700">Title</label>
//                         <input required className="w-full p-4 border rounded-xl" value={title} onChange={(e) => setTitle(e.target.value)} />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-bold uppercase mb-2 text-zinc-700">Price (₹)</label>
//                         <input required type="number" className="w-full p-4 border rounded-xl" value={price} onChange={(e) => setPrice(e.target.value)} />
//                     </div>
//                 </div>

//                 {/* 3. Added Product Description Field */}
//                 <div>
//                     <label className="block text-sm font-bold uppercase tracking-widest text-zinc-700 mb-2">
//                         Product Description
//                     </label>
//                     <textarea
//                         required
//                         rows={4}
//                         className="w-full p-4 border border-zinc-300 rounded-xl text-black bg-zinc-50 focus:ring-2 focus:ring-black outline-none placeholder:text-zinc-400"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Describe the material, fit, or thrifted condition (e.g., Fits like a boxy Large)..."
//                     />
//                 </div>

//                 {/* Dynamic Size Picker */}
//                 {category !== "thrifted" && (
//                     <div>
//                         <label className="block text-sm font-bold uppercase tracking-widest text-zinc-700 mb-4">
//                             Select Available {category === "jeans" ? "Waist Sizes" : "Sizes"}
//                         </label>
//                         <div className="flex flex-wrap gap-3">
//                             {sizeCharts[category].map((size: string) => (
//                                 <button
//                                     type="button" key={size} onClick={() => toggleSize(size)}
//                                     className={`w-14 h-14 rounded-xl border-2 font-bold transition-all ${selectedSizes.includes(size) ? "bg-black text-white border-black" : "bg-white text-zinc-400 border-zinc-200"
//                                         }`}
//                                 >
//                                     {size}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Image Upload Block */}
//                 <div>
//                     <label className="block text-sm font-bold uppercase mb-4 text-zinc-700">Product Images</label>
//                     <div className="grid grid-cols-4 gap-4">
//                         {images.map((file, i) => (
//                             <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden border">
//                                 <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="preview" />
//                             </div>
//                         ))}
//                         <label className="flex flex-col items-center justify-center aspect-[3/4] border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:border-black transition-colors">
//                             <Upload className="text-zinc-400" size={20} />
//                             <span className="text-[10px] font-bold text-zinc-400 uppercase mt-1">Add</span>
//                             <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
//                         </label>
//                     </div>
//                 </div>

//                 <button disabled={loading} className="w-full bg-black text-white p-5 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-800 disabled:bg-zinc-300 transition-all shadow-xl active:scale-95">
//                     {loading ? "Creating..." : "Create Product"}
//                 </button>
//             </form>
//         </div>
//     );
// }
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Upload, X, Box } from "lucide-react";

export default function NewProductPage() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stockQuantity, setStockQuantity] = useState("10"); // NEW: Stock State
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("tops");
    const [images, setImages] = useState<File[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const router = useRouter();

    const sizeCharts: any = {
        tops: ["S", "M", "L", "XL", "XXL"],
        jeans: ["28", "30", "32", "34", "36", "38", "40"],
        thrifted: []
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) return alert("Please upload at least one image");
        setLoading(true);

        try {
            const imageUrls = [];
            for (const file of images) {
                const fileName = `${Date.now()}-${file.name}`;
                const { data, error: uploadError } = await supabase.storage
                    .from("product-images").upload(fileName, file);
                if (uploadError) throw uploadError;
                const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
                imageUrls.push(urlData.publicUrl);
            }

            const { error } = await supabase.from("products").insert({
                title,
                price: parseFloat(price),
                description,
                stock_quantity: parseInt(stockQuantity), // NEW: Insert stock into DB
                image: imageUrls,
                sizes: selectedSizes,
                category: category
            });

            if (error) throw error;
            alert("Product Created! ✅");
            router.push("/admin");
            router.refresh();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-md border border-zinc-200 my-10">
            <h1 className="text-3xl font-black uppercase mb-8 text-black tracking-tighter italic">Create New Drop</h1>

            <form onSubmit={handleSubmit} className="space-y-8 text-black">

                {/* Product Core Details */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-[10px] font-black uppercase mb-2 text-zinc-500 tracking-widest">Title</label>
                        <input required placeholder="e.g. Vintage Zipper Hoodie" className="w-full p-4 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-[10px] font-black uppercase mb-2 text-zinc-500 tracking-widest">Price (₹)</label>
                        <input required type="number" placeholder="2500" className="w-full p-4 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>

                {/* STOCK INVENTORY FIELD */}
                <div>
                    <label className="block text-[10px] font-black uppercase mb-2 text-zinc-500 tracking-widest flex items-center gap-2">
                        <Box size={12} /> Vault Stock Quantity
                    </label>
                    <input
                        required
                        type="number"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        className="w-full p-4 border border-zinc-300 rounded-xl bg-zinc-50 font-bold focus:ring-2 focus:ring-black outline-none transition-all"
                    />
                    <p className="text-[10px] text-zinc-400 mt-2 italic font-medium">
                        *If set to 0, item will automatically show as "SOLD OUT" on the site.
                    </p>
                </div>

                {/* Description Field */}
                <div>
                    <label className="block text-[10px] font-black uppercase mb-2 text-zinc-500 tracking-widest">Description</label>
                    <textarea
                        required
                        rows={4}
                        className="w-full p-4 border border-zinc-300 rounded-xl text-black bg-zinc-50 focus:ring-2 focus:ring-black outline-none transition-all"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Material details, fit, and condition..."
                    />
                </div>

                {/* Category Selector */}
                <div>
                    <label className="block text-[10px] font-black uppercase mb-2 text-zinc-500 tracking-widest">Collection Type</label>
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setSelectedSizes([]);
                        }}
                        className="w-full p-4 border border-zinc-300 rounded-xl bg-white font-bold outline-none focus:ring-2 focus:ring-black appearance-none uppercase"
                    >
                        <option value="tops">Tops (Tees, Hoodies)</option>
                        <option value="jeans">Bottoms (Jeans, Cargo)</option>
                        <option value="thrifted">One-of-One (Thrifted)</option>
                    </select>
                </div>

                {/* Dynamic Size Picker */}
                {category !== "thrifted" && (
                    <div>
                        <label className="block text-[10px] font-black uppercase mb-4 text-zinc-500 tracking-widest">Available Sizes</label>
                        <div className="flex flex-wrap gap-3">
                            {sizeCharts[category].map((size: string) => (
                                <button
                                    type="button" key={size} onClick={() => toggleSize(size)}
                                    className={`w-12 h-12 rounded-lg border-2 font-black transition-all text-xs ${selectedSizes.includes(size) ? "bg-black text-white border-black" : "bg-white text-zinc-400 border-zinc-200 hover:border-zinc-400"}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Image Upload Block */}
                <div>
                    <label className="block text-[10px] font-black uppercase mb-4 text-zinc-500 tracking-widest">Gallery Upload</label>
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((file, i) => (
                            <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-zinc-200 group">
                                <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="preview" />
                                <button
                                    onClick={() => removeImage(i)}
                                    className="absolute top-1 right-1 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                        <label className="flex flex-col items-center justify-center aspect-[3/4] border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:border-black hover:bg-zinc-50 transition-all">
                            <Upload className="text-zinc-400" size={20} />
                            <span className="text-[10px] font-black text-zinc-400 uppercase mt-1">Add</span>
                            <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                        </label>
                    </div>
                </div>

                <button disabled={loading} className="w-full bg-black text-white p-6 rounded-xl font-black uppercase tracking-widest hover:bg-zinc-900 disabled:bg-zinc-300 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] active:scale-95">
                    {loading ? "Authenticating Drop..." : "Launch Drop"}
                </button>
            </form>
        </div>
    );
}