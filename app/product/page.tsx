import Link from "next/link";
import { getProducts } from "@/lib/data";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="max-w-6xl mx-auto p-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-serif">All Products</h1>

                <Link
                    href="/admin/products/new"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    + Add Product
                </Link>
            </div>

            <div className="space-y-4">
                {products.map((product: any) => (
                    <div
                        key={product.id}
                        className="p-4 border rounded flex justify-between items-center"
                    >
                        <div className="flex gap-4 items-center">
                            <img
                                src={product.image}
                                className="w-12 h-12 object-cover rounded"
                            />
                            <p>{product.title}</p>
                        </div>

                        <p>₹ {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}