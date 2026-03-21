import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";

// export default function Home() {
//   const featuredProducts = products.slice(0, 4);
export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-serif">Latest Arrivals</h2>
          <a href="/shop" className="text-sm font-medium hover:text-brand-500 hover:underline underline-offset-4">
            View all
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </section>
    </div>
  );
}

