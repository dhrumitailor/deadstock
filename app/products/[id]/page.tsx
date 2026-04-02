"use client";

import { useState, useEffect, use } from "react"; // 1. Added 'use'
import { supabase } from "@/lib/supabase";
import AddToCartButtons from "@/components/AddToCartButtons";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    // 2. Unwrap the params properly for Next.js 15
    const { id } = use(params);

    const [product, setProduct] = useState<any>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id) // Use the unwrapped id here
                .single();

            if (!error) setProduct(data);
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    if (!product) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Product not found</div>;

    const images = Array.isArray(product.image) ? product.image : [product.image];
    const sizes = Array.isArray(product.sizes) ? product.sizes : [];

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* LEFT: SLIDESHOW */}
                <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex md:flex-col gap-3 overflow-x-auto md:w-20 no-scrollbar">
                        {images.map((img: string, i: number) => (
                            <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-16 h-20 md:w-full md:h-24 rounded border-2 ${activeImageIndex === i ? "border-white" : "border-zinc-800 opacity-50"}`}>
                                <img src={img} className="w-full h-full object-cover rounded" alt="" />
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden relative group">
                        <img src={images[activeImageIndex]} className="w-full h-full object-cover" alt={product.title} />
                    </div>
                </div>

                {/* RIGHT: INFO */}
                <div className="lg:col-span-5 space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-tighter">{product.title}</h1>
                        <p className="text-2xl text-zinc-400 mt-2 font-medium">₹{product.price.toLocaleString()}</p>
                    </div>

                    <hr className="border-zinc-900" />

                    {/* 3. SHOW THE DESCRIPTION HERE */}
                    <div className="space-y-2">
                        <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Details</span>
                        <p className="text-zinc-300 leading-relaxed">
                            {product.description || "No description provided."}
                        </p>
                    </div>

                    {/* SIZE SELECTOR */}
                    {sizes.length > 0 && (
                        <div>
                            <span className="text-sm font-bold uppercase tracking-widest text-zinc-500 block mb-4">Select Size</span>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map((size: string) => (
                                    <button key={size} onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 border-2 flex items-center justify-center font-bold transition-all ${selectedSize === size ? "bg-white text-black border-white" : "border-zinc-800 text-zinc-400 hover:border-zinc-500"}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <AddToCartButtons product={{ ...product, selectedSize }} disabled={sizes.length > 0 && !selectedSize} />
                </div>
            </div>
        </div>
    );
}


// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import AddToCartButtons from "@/components/AddToCartButtons";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function ProductPage({ params }: { params: { id: string } }) {
//     const [product, setProduct] = useState<any>(null);
//     const [activeImageIndex, setActiveImageIndex] = useState(0);
//     const [selectedSize, setSelectedSize] = useState<string>("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             const { data, error } = await supabase
//                 .from("products")
//                 .select("*")
//                 .eq("id", params.id)
//                 .single();

//             if (!error) setProduct(data);
//             setLoading(false);
//         };
//         fetchProduct();
//     }, [params.id]);

//     if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
//     if (!product) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Product not found</div>;

//     // Handle cases where image might still be a single string or an array
//     const images = Array.isArray(product.image) ? product.image : [product.image];
//     const sizes = Array.isArray(product.sizes) ? product.sizes : [];

//     return (
//         <div className="min-h-screen bg-black text-white p-4 md:p-12">
//             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

//                 {/* LEFT: IMAGE SLIDESHOW (7 Columns) */}
//                 <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">

//                     {/* Thumbnails Vertical Strip */}
//                     <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-20">
//                         {images.map((img: string, i: number) => (
//                             <button
//                                 key={i}
//                                 onClick={() => setActiveImageIndex(i)}
//                                 className={`flex-shrink-0 w-16 h-20 md:w-full md:h-24 rounded border-2 transition-all ${activeImageIndex === i ? "border-white" : "border-zinc-800 opacity-50"
//                                     }`}
//                             >
//                                 <img src={img} className="w-full h-full object-cover rounded" alt="Thumbnail" />
//                             </button>
//                         ))}
//                     </div>

//                     {/* Main Focused Image */}
//                     <div className="flex-1 aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden relative group">
//                         <img
//                             src={images[activeImageIndex]}
//                             className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                             alt={product.title}
//                         />

//                         {/* Quick Nav Arrows */}
//                         {images.length > 1 && (
//                             <>
//                                 <button
//                                     onClick={() => setActiveImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
//                                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
//                                 >
//                                     <ChevronLeft size={24} />
//                                 </button>
//                                 <button
//                                     onClick={() => setActiveImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
//                                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
//                                 >
//                                     <ChevronRight size={24} />
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 {/* RIGHT: PRODUCT INFO (5 Columns) */}
//                 <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 h-fit">
//                     <div>
//                         <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">{product.title}</h1>
//                         <p className="text-2xl text-zinc-400 mt-2 font-medium">₹{product.price.toLocaleString()}</p>
//                     </div>

//                     <hr className="border-zinc-900" />

//                     {/* SIZE SELECTOR */}
//                     {sizes.length > 0 && (
//                         <div>
//                             <div className="flex justify-between items-center mb-4">
//                                 <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Select Size</span>
//                                 <button className="text-xs text-zinc-400 underline underline-offset-4">Size Guide</button>
//                             </div>
//                             <div className="flex flex-wrap gap-3">
//                                 {sizes.map((size: string) => (
//                                     <button
//                                         key={size}
//                                         onClick={() => setSelectedSize(size)}
//                                         className={`w-14 h-14 border-2 flex items-center justify-center font-bold transition-all duration-200
//                       ${selectedSize === size
//                                                 ? "bg-white text-black border-white"
//                                                 : "border-zinc-800 text-zinc-400 hover:border-zinc-500"}`}
//                                     >
//                                         {size}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* ADD TO CART ACTION */}
//                     <div className="space-y-4">
//                         <AddToCartButtons
//                             product={{ ...product, selectedSize }}
//                             disabled={sizes.length > 0 && !selectedSize}
//                         />
//                         <p className="text-xs text-zinc-500 text-center uppercase tracking-widest">
//                             Standard shipping: 3-5 business days
//                         </p>
//                     </div>

//                     {/* Product Details/Description */}
//                     <div className="pt-8 border-t border-zinc-900">
//                         <p className="text-zinc-400 leading-relaxed italic text-sm">
//                             Authentic {product.title} curated by Deadstock Dept.
//                             Limited availability. Sustainably sourced.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

//before slide show

// import { supabaseServer } from "@/lib/supabaseServer";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import AddToCartButtons from "@/components/AddToCartButtons";

// // Next.js 15+ requires params to be a Promise
// type Props = {
//     params: Promise<{ id: string }>;
// };

// export default async function ProductPage({ params }: Props) {
//     // 1. Await the params before accessing the ID
//     const { id } = await params;

//     // 2. Fetch the product using the resolved ID
//     const { data: product, error } = await supabaseServer
//         .from("products")
//         .select("*")
//         .eq("id", id)
//         .single();

//     // Debugging logs - Check your terminal after saving
//     console.log("RESOLVED ID:", id);
//     console.log("FETCHED PRODUCT:", product);

//     if (error) {
//         console.error("Supabase fetch error:", error.message);
//     }

//     // 3. If no product is found, show the 404 page
//     if (!product) {
//         notFound();
//     }

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-12">
//             <Link href="/" className="inline-flex items-center mb-8 hover:text-gray-600 transition-colors">
//                 <ArrowLeft size={16} className="mr-2" />
//                 Back
//             </Link>

//             <div className="grid md:grid-cols-2 gap-10">
//                 <div className="relative aspect-square md:aspect-auto">
//                     <Image
//                         src={product.image}
//                         alt={product.title}
//                         width={500}
//                         height={600}
//                         priority
//                         className="object-cover rounded-lg shadow-sm"
//                     />
//                 </div>

//                 <div className="flex flex-col">
//                     <h1 className="text-3xl font-bold mb-4">
//                         {product.title}
//                     </h1>

//                     <p className="text-2xl font-semibold mb-4">
//                         ₹ {product.price.toLocaleString('en-IN')}
//                     </p>

//                     <div className="prose prose-sm mb-8 text-gray-700">
//                         <p>{product.description}</p>
//                     </div>

//                     <div className="mt-auto">
//                         <AddToCartButtons product={product} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

