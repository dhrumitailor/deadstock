"use client";

// 1. Change the import to get the 'supabase' object directly
import { supabase } from "@/lib/supabase";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteButton({ product }: { product: any }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Delete "${product.title}"?`)) return;

        setIsDeleting(true);

        try {
            const imageUrl = product.image;
            let filePath = null;

            if (imageUrl && imageUrl.includes("/product-images/")) {
                filePath = imageUrl.split("/product-images/")[1];
            }

            // 2. Delete the image from storage
            if (filePath) {
                await supabase.storage
                    .from("product-images")
                    .remove([filePath]);
            }

            // 3. Delete from the database
            const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id);

            if (error) throw error;

            alert("Deleted ✅");
            window.location.reload();

        } catch (error: any) {
            console.error("Error deleting:", error.message);
            alert("Error deleting product");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`text-red-500 hover:text-red-700 ${isDeleting ? "opacity-50" : ""}`}
        >
            <Trash2 size={20} />
        </button>
    );
}
// "use client";

// import { createClient } from "@/lib/supabase"; // Path looks correct now based on your sidebar
// import { Trash2 } from "lucide-react";

// export default function DeleteButton({ product }: { product: any }) {
//     // 1. Initialize the supabase client here
//     const supabase = createClient();

//     const handleDelete = async () => {
//         if (!confirm("Delete this product?")) return;

//         try {
//             const imageUrl = product.image;
//             let filePath = null;

//             if (imageUrl) {
//                 // This logic extracts the filename from the URL
//                 filePath = imageUrl.split("/product-images/")[1];
//             }

//             // 2. Now 'supabase' will be defined and work here
//             if (filePath) {
//                 await supabase.storage
//                     .from("product-images")
//                     .remove([filePath]);
//             }

//             // 3. Delete from the database
//             const { error } = await supabase
//                 .from("products")
//                 .delete()
//                 .eq("id", product.id);

//             if (error) throw error;

//             alert("Deleted ✅");
//             location.reload();

//         } catch (error: any) {
//             console.error("Error deleting:", error.message);
//             alert("Error deleting product");
//         }
//     };

//     return (
//         <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
//             <Trash2 size={20} />
//         </button>
//     );
// }
