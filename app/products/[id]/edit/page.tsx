// import { createClient } from '@/lib/server';
// import { redirect } from 'next/navigation';
// import Link from 'next/link';

// // Next.js 15 requires params to be a Promise
// export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
//     const supabase = await createClient();

//     // 1. Resolve params to get the ID
//     const { id } = await params;

//     // 2. Fetch the specific product
//     const { data: product } = await supabase
//         .from('products')
//         .select('*')
//         .eq('id', id)
//         .single();

//     if (!product) redirect('/admin/products');

//     // 3. Server Action to save changes
//     async function updateProduct(formData: FormData) {
//         "use server"
//         const supabase = await createClient();

//         const title = formData.get('title');
//         const price = formData.get('price');
//         const description = formData.get('description');

//         const { error } = await supabase
//             .from('products')
//             .update({
//                 title,
//                 price: Number(price),
//                 description
//             })
//             .eq('id', id);

//         if (!error) {
//             redirect('/admin/products');
//         }
//     }

//     return (
//         <div className="max-w-2xl mx-auto py-10 px-4">
//             <div className="mb-8">
//                 <Link href="/admin/products" className="text-xs font-bold uppercase hover:underline">
//                     ← Back to Inventory
//                 </Link>
//                 <h1 className="text-4xl font-black uppercase tracking-tighter mt-2">Edit Product</h1>
//             </div>

//             <form action={updateProduct} className="space-y-6 border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
//                 <div>
//                     <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-gray-400">Product Name</label>
//                     <input
//                         name="title"
//                         defaultValue={product.title}
//                         className="w-full border-2 border-black p-4 outline-none focus:bg-zinc-50 font-bold text-black uppercase"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-gray-400">Price (INR)</label>
//                     <input
//                         name="price"
//                         type="number"
//                         defaultValue={product.price}
//                         className="w-full border-2 border-black p-4 outline-none focus:bg-zinc-50 font-bold text-black font-mono"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-gray-400">Description</label>
//                     <textarea
//                         name="description"
//                         defaultValue={product.description}
//                         rows={5}
//                         className="w-full border-2 border-black p-4 outline-none focus:bg-zinc-50 font-bold text-black"
//                     />
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                     <button type="submit" className="flex-1 bg-black text-white font-black uppercase py-5 hover:bg-zinc-900 transition-all">
//                         Update Listing
//                     </button>
//                     <Link
//                         href="/admin/products"
//                         className="flex-1 border-2 border-black text-center font-black uppercase py-5 hover:bg-gray-100 text-black"
//                     >
//                         Cancel
//                     </Link>
//                 </div>
//             </form>
//         </div>
//     );
// }
import { createClient } from '@/lib/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';


export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { id } = await params;

    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (!product) redirect('/admin/products');

    //     async function updateProduct(formData: FormData) {
    //         "use server"
    //         const supabase = await createClient();
    //         const title = formData.get('title');
    //         const price = formData.get('price');
    //         const description = formData.get('description');

    //         await supabase
    //             .from('products')
    //             .update({ title, price: Number(price), description })
    //             .eq('id', id);

    //         // After editing, send the owner back to the Admin Inventory
    //         redirect('/admin/products');
    //     }
    async function updateProduct(formData: FormData) {
        "use server"
        const supabase = await createClient();
        const title = formData.get('title');
        const price = formData.get('price');
        const description = formData.get('description');

        console.log("Attempting update for ID:", id, { title, price });

        const { data, error } = await supabase
            .from('products')
            .update({
                title: title,
                price: Number(price),
                description: description
            })
            .eq('id', id)
            .select(); // Added .select() to verify the return

        if (error) {
            console.error("Supabase Update Error:", error.message);
            return;
        }

        console.log("Update successful:", data);
        redirect('/admin/products');
    }
    return (
        <div className="max-w-2xl mx-auto py-10 px-4 text-black">
            <div className="mb-6">
                <Link href="/admin/products" className="text-xs font-bold uppercase hover:underline">
                    ← Back to Admin Inventory
                </Link>
            </div>

            <h1 className="text-4xl font-black uppercase mb-8 tracking-tighter">Edit Product</h1>

            <form action={updateProduct} className="space-y-6 border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div>
                    <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-gray-400">Product Name</label>
                    <input name="title" defaultValue={product.title} className="w-full border-2 border-black p-4 outline-none font-bold text-black" required />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-gray-400">Price (INR)</label>
                    <input name="price" type="number" defaultValue={product.price} className="w-full border-2 border-black p-4 outline-none font-bold text-black" required />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-gray-400">Description</label>
                    <textarea name="description" defaultValue={product.description} rows={4} className="w-full border-2 border-black p-4 outline-none font-bold text-black" />
                </div>
                <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-black text-white font-black uppercase py-5 hover:bg-zinc-800 transition-all">Update Listing</button>
                    <Link href="/admin/products" className="flex-1 border-2 border-black text-center font-black uppercase py-5 flex items-center justify-center">Cancel</Link>
                </div>
            </form>
        </div>
    );
}