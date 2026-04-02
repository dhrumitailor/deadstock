

// // app/shop/page.tsx
// //before wishlist
// import { searchProducts } from "@/lib/data";
// import Link from "next/link";
// import Image from "next/image";

// // 1. Define the Props type correctly for Next.js 15
// type Props = {
//   searchParams: Promise<{ q?: string }>;
// };

// export default async function ShopPage({ searchParams }: Props) {
//   // 2. YOU MUST AWAIT searchParams
//   const resolvedParams = await searchParams;
//   const q = resolvedParams.q || "";

//   // 3. Fetch the products
//   const products = await searchProducts(q);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12 text-white">
//       <h1 className="text-3xl font-bold mb-8">
//         {q ? `Results for "${q}"` : "All Collections"}
//       </h1>

//       {/* 4. Safety check: Check if products exists before mapping */}
//       {!products || products.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((product: any) => (
//             <Link href={`/products/${product.id}`} key={product.id} className="group">
//               <div className="relative aspect-[3/4] mb-3">
//                 <Image
//                   src={Array.isArray(product.image) ? product.image[0] : product.image || "/placeholder.jpg"}
//                   alt={product.title}
//                   fill
//                   className="object-cover rounded-lg transition group-hover:opacity-80"
//                 />
//               </div>
//               <h2 className="font-semibold">{product.title}</h2>
//               <p className="text-gray-400">₹ {product.price}</p>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

//after
//vault
// import { searchProducts } from "@/lib/data";
// import ProductCard from "@/components/ProductCard"; // 1. Import your refined component

// type Props = {
//   searchParams: Promise<{ q?: string }>;
// };

// export default async function ShopPage({ searchParams }: Props) {
//   const resolvedParams = await searchParams;
//   const q = resolvedParams.q || "";

//   const products = await searchProducts(q);



//   return (
//     <div className="max-w-7xl mx-auto px-6 py-16 text-white min-h-screen">
//       <header className="mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic">
//           {q ? `Results for "${q}"` : "All Collections"}
//         </h1>
//         <div className="h-1 w-20 bg-white mt-2"></div>
//       </header>

//       {!products || products.length === 0 ? (
//         <div className="py-20 border border-zinc-900 rounded-2xl text-center">
//           <p className="text-zinc-500 uppercase tracking-widest text-sm">No items found in the vault.</p>
//         </div>
//       ) : (
//         /* 2. Use the exact same grid gap and structure as your Home Page */
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
//           {products.map((product: any) => (
//             /* 3. Pass the product data into the ProductCard */
//             <ProductCard
//               key={product.id}
//               product={{
//                 ...product,
//                 currency: "₹" // Ensuring currency passes through if not in DB
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { searchProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || "";

  // 1. Fetch products using your existing search logic
  const rawProducts = await searchProducts(q);

  // 2. APPLY AUTOMATIC SORT: Newest at the top
  // We sort by date (created_at) so the latest drops appear first.
  const products = rawProducts?.sort((a: any, b: any) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-white min-h-screen bg-black">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
              {q ? `Search: ${q}` : "The Vault"}
            </h1>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
              {products?.length || 0} ITEMS AUTHENTICATED
            </p>
          </div>
          {/* Subtle line to maintain the streetwear aesthetic */}
          <div className="h-[2px] flex-grow bg-zinc-900 mx-8 hidden md:block mb-4"></div>
        </div>
      </header>

      {!products || products.length === 0 ? (
        <div className="py-32 border-2 border-dashed border-zinc-900 rounded-3xl text-center">
          <p className="text-zinc-500 uppercase font-black tracking-widest text-xs italic">
            Zero inventory found in this sector.
          </p>
        </div>
      ) : (
        /* The Grid: 2 columns on mobile, 4 on desktop */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                currency: "₹"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}