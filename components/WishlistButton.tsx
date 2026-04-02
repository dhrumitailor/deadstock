"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation"; // 1. Import useRouter

export default function WishlistButton({ productId }: { productId: string }) {
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // 2. Initialize router

    useEffect(() => {
        const checkStatus = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from("wishlist")
                .select("*")
                .eq("user_id", user.id)
                .eq("product_id", productId)
                .single();

            if (data) setIsLiked(true);
        };
        checkStatus();
    }, [productId]);

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        // 3. Redirect to login if user isn't authenticated
        if (!user) {
            router.push("/login");
            setLoading(false);
            return;
        }

        if (isLiked) {
            await supabase
                .from("wishlist")
                .delete()
                .eq("user_id", user.id)
                .eq("product_id", productId);
            setIsLiked(false);
        } else {
            await supabase
                .from("wishlist")
                .insert({ user_id: user.id, product_id: productId });
            setIsLiked(true);
        }
        setLoading(false);
    };

    return (
        <button
            onClick={toggleWishlist}
            disabled={loading}
            className="transition-transform active:scale-90"
        >
            <Heart
                size={20}
                strokeWidth={2.5}
                className={`${isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-zinc-500 hover:text-white"
                    } transition-colors duration-300`}
            />
        </button>
    );
}
// "use client";

// import { useState, useEffect } from "react";
// import { Heart } from "lucide-react";
// import { supabase } from "@/lib/supabase";

// export default function WishlistButton({ productId }: { productId: string }) {
//     const [isLiked, setIsLiked] = useState(false);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         // Check if this item is already in the user's wishlist on load
//         const checkStatus = async () => {
//             const { data: { user } } = await supabase.auth.getUser();
//             if (!user) return;

//             const { data } = await supabase
//                 .from("wishlist")
//                 .select("*")
//                 .eq("user_id", user.id)
//                 .eq("product_id", productId)
//                 .single();

//             if (data) setIsLiked(true);
//         };
//         checkStatus();
//     }, [productId]);

//     const toggleWishlist = async (e: React.MouseEvent) => {
//         e.preventDefault(); // Prevent navigating to product page if clicked on card
//         setLoading(true);

//         const { data: { user } } = await supabase.auth.getUser();
//         if (!user) {
//             alert("Please login to save items to your wishlist!");
//             setLoading(false);
//             return;
//         }

//         if (isLiked) {
//             // Remove from wishlist
//             await supabase.from("wishlist").delete().eq("user_id", user.id).eq("product_id", productId);
//             setIsLiked(false);
//         } else {
//             // Add to wishlist
//             await supabase.from("wishlist").insert({ user_id: user.id, product_id: productId });
//             setIsLiked(true);
//         }
//         setLoading(false);
//     };

//     return (
//         <button
//             onClick={toggleWishlist}
//             disabled={loading}
//             className="transition-transform active:scale-90"
//         >
//             <Heart
//                 size={22}
//                 className={`${isLiked ? "fill-red-500 text-red-500" : "text-zinc-400 hover:text-white"} transition-colors`}
//             />
//         </button>
//     );
// }