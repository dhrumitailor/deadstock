import Link from "next/link";
import { Edit2, Trash2 } from "lucide-react";
import { getProducts } from "@/lib/data";

export default async function AdminDashboard() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-lg space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif text-black">Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your store products and orders.</p>
          </div>

          <Link href="/admin/products/new">
            <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
              + New Product
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-3xl font-serif text-black">₹84,000</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Active Products</p>
            <p className="text-3xl font-serif text-black">{products?.length || 0}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Recent Orders</p>
            <p className="text-3xl font-serif text-black">12</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-medium text-black">Recent Products</h2>
            <Link href="/admin/products" className="text-sm text-gray-600 hover:text-black">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-600">
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products?.map((product: any) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50 transition">

                    {/* Product */}
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <p className="font-medium text-sm">{product.title}</p>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4 text-sm">
                      ₹ {product.price}
                    </td>

                    {/* Status */}
                    <td className="p-4 text-sm">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        Published
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded text-red-600">
                        <Trash2 size={16} />
                      </button>
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


