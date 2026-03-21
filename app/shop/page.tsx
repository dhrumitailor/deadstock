import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 border-b border-brand-200 pb-6">
        <div>
          <h1 className="text-4xl font-serif text-brand-900 mb-2">
            Collections
          </h1>
          <p className="text-brand-600">
            Curated vintage and archive pieces from around the globe.
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <select className="px-4 py-2 bg-transparent border border-brand-200 rounded-md text-sm text-brand-900">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>

          <button className="px-4 py-2 border border-brand-200 rounded-md text-sm text-brand-900 hover:bg-brand-100">
            Filter
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-center text-brand-600 mt-10">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 lg:gap-x-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="mt-20 flex justify-center">
        <button className="px-8 py-3 border border-brand-900 text-brand-900 font-medium rounded-full hover:bg-brand-900 hover:text-white transition">
          Load More
        </button>
      </div>

    </div>
  );
}




// import ProductCard from "@/components/ProductCard";
// import { getProducts } from "@/lib/data";

// export default async function ShopPage() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 border-b border-brand-200 pb-6">
//         <div>
//           <h1 className="text-4xl font-serif text-brand-900 mb-2">Collections</h1>
//           <p className="text-brand-600">Curated vintage and archive pieces from around the globe.</p>
//         </div>
        
//         <div className="flex gap-4 items-center">
//           <select className="px-4 py-2 bg-transparent border border-brand-200 rounded-md text-sm text-brand-900 focus:outline-none focus:ring-1 focus:ring-brand-900">
//             <option>Sort by: Featured</option>
//             <option>Price: Low to High</option>
//             <option>Price: High to Low</option>
//             <option>Newest Arrivals</option>
//           </select>
//           <button className="px-4 py-2 bg-transparent border border-brand-200 rounded-md text-sm text-brand-900 hover:bg-brand-100 transition-colors">
//             Filter
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 lg:gap-x-8">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product as any} />
//         ))}
//       </div>
      
//       <div className="mt-20 flex justify-center">
//         <button className="px-8 py-3 border border-brand-900 text-brand-900 font-medium rounded-full hover:bg-brand-900 hover:text-brand-100 transition-colors">
//           Load More
//         </button>
//       </div>
//     </div>
//   );
// }
