import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProducts } from "@/lib/data"; // ✅ FIXED
import AddToCartButtons from "@/components/AddToCartButtons";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const products = await getProducts(); // ✅ now matches

  const product = products.find(
    (p: any) => p.id.toString() === params.id
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-brand-500 hover:text-brand-900 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to collections
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

        {/* IMAGE */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] w-full bg-brand-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {[product.image, product.image, product.image].map((img, i) => (
              <div
                key={i}
                className="relative w-24 h-32 flex-shrink-0 bg-brand-100 rounded-md overflow-hidden cursor-pointer border-2 border-transparent hover:border-brand-300"
              >
                <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-serif text-brand-900 mb-4 leading-tight">
            {product.title}
          </h1>

          <p className="text-2xl font-medium text-brand-900 mb-8">
            ₹ {product.price}
          </p>

          <div className="prose prose-sm text-brand-600 mb-10">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4 mb-10 border-y border-brand-200 py-6">
            <div className="flex justify-between">
              <span className="text-brand-500 text-sm">Condition</span>
              <span className="font-medium text-brand-900 text-sm">
                {product.condition || "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-brand-500 text-sm">Size</span>
              <span className="font-medium text-brand-900 text-sm">
                {product.size || "N/A"}
              </span>
            </div>
          </div>

          <AddToCartButtons product={product} />

          <div className="mt-8 text-xs text-brand-500 text-center sm:text-left">
            <p>Free shipping on orders over ₹20,000</p>
            <p className="mt-1">
              All sales are final due to the nature of vintage/thrift items.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}


// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import { getproducts } from "@/lib/data";
// import AddToCartButtons from "@/components/AddToCartButtons";

// export default async function ProductPage({ params }: { params: { id: string } }) {
//   const products = await getProducts();

//   const product = products.find(
//     (p: any) => p.id.toString() === params.id
//   );
//   if (!product) {
//     notFound();
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <Link href="/" className="inline-flex items-center text-sm text-brand-500 hover:text-brand-900 mb-8 transition-colors">
//         <ArrowLeft size={16} className="mr-2" />
//         Back to collections
//       </Link>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
//         {/* Product Images */}
//         <div className="space-y-4">
//           <div className="relative aspect-[4/5] w-full bg-brand-100 rounded-lg overflow-hidden">
//             <Image
//               src={product.image}
//               alt={product.title}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>
//           {/* Thumbnails (mocked to just show the main image repeatedly for layout) */}
//           <div className="flex gap-4 overflow-x-auto pb-2">
//             {[product.image, product.image, product.image].map((img, i) => (
//               <div key={i} className="relative w-24 h-32 flex-shrink-0 bg-brand-100 rounded-md overflow-hidden cursor-pointer border-2 border-transparent hover:border-brand-300">
//                 <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="flex flex-col">
//           <h1 className="text-3xl sm:text-4xl font-serif text-brand-900 mb-4 leading-tight">
//             {product.title}
//           </h1>
//           <p className="text-2xl font-medium text-brand-900 mb-8">
//             {product.currency} {product.price.toLocaleString()}
//           </p>

//           <div className="prose prose-sm text-brand-600 mb-10">
//             <p>{product.description}</p>
//           </div>

//           <div className="space-y-4 mb-10 border-y border-brand-200 py-6">
//             <div className="flex justify-between">
//               <span className="text-brand-500 text-sm">Condition</span>
//               <span className="font-medium text-brand-900 text-sm">{product.condition}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-brand-500 text-sm">Size</span>
//               <span className="font-medium text-brand-900 text-sm">{product.size}</span>
//             </div>
//           </div>

//           <AddToCartButtons product={product} />

//           <div className="mt-8 text-xs text-brand-500 text-center sm:text-left">
//             <p>Free shipping on orders over {product.currency}20,000</p>
//             <p className="mt-1">All sales are final due to the nature of vintage/thrift items.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
