//before glporification
// import Hero from "@/components/Hero";
// import ProductCard from "@/components/ProductCard";
// import { getProducts } from "@/lib/data";

// //HOME PAGE
// export default async function Home() {
//     const products = await getProducts();

//     return (
//         <div className="flex flex-col min-h-screen">

//             {/* 🔥 HERO SECTION */}
//             <Hero />

//             {/* 🛍 PRODUCT SECTION */}
//             <section className="py-16 px-4 max-w-7xl mx-auto w-full">
//                 <div className="flex justify-between items-center mb-10">
//                     <h2 className="text-3xl font-serif">Latest Arrivals</h2>

//                     <a
//                         href="/shop"
//                         className="text-sm font-medium hover:underline"
//                     >
//                         View all →
//                     </a>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {products.map((product: any) => (
//                         <ProductCard key={product.id} product={product} />
//                     ))}
//                 </div>
//             </section>

//         </div>
//     );
// }

//after 
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";
import Link from "next/link";

export default async function Home() {
    // getProducts already sorts by newest first due to our lib/data.ts update
    const allProducts = await getProducts();

    // Slice to show only the 4 most recent "Hype" items
    const featuredProducts = allProducts.slice(0, 4);

    return (
        <div className="flex flex-col min-h-screen bg-black">

            {/* 🔥 HERO SECTION */}
            <Hero />

            {/* 🛍 FEATURED DROPS SECTION */}
            <section className="py-24 px-6 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-end mb-16 border-b border-zinc-800 pb-6">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-white italic">
                            Recent Drops
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
                            Authenticated Inventory / Limited Stock
                        </p>
                    </div>

                    <Link
                        href="/shop"
                        className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
                    >
                        View Full Vault →
                    </Link>
                </div>

                {/* Grid - 2 columns mobile, 4 columns desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                    {featuredProducts.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* 🏁 MARQUEE SECTION (Optional but very streetwear) */}
            <div className="bg-white py-4 overflow-hidden border-y-2 border-black">
                <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-sm tracking-widest text-black">
                    <span className="mx-10">Limited Release</span>
                    <span className="mx-10 text-zinc-400">Authentic Only</span>
                    <span className="mx-10 text-zinc-400">New Drop Live</span>
                    <span className="mx-10">Limited Release</span>
                    <span className="mx-10 text-zinc-400">Authentic Only</span>
                    <span className="mx-10 text-zinc-400">New Drop Live</span>
                </div>
            </div>

        </div>
    );
}