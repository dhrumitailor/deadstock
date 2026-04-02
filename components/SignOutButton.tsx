// "use client";

// import { createClient } from "@/lib/supabase/client"; // Ensure you have a browser client utility
// import { LogOut } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function SignOutButton() {
//     const router = useRouter();

//     // Note: Ensure your lib/supabase/client.ts uses createBrowserClient
//     const handleSignOut = async () => {
//         const { supabase } = await import("@/lib/supabase/client");
//         const client = supabase; // or however you export your browser client

//         await client.auth.signOut();
//         router.refresh();
//         router.push("/");
//     };

//     return (
//         <button
//             onClick={handleSignOut}
//             className="flex items-center gap-3 p-4 text-red-500 hover:bg-red-500/10 rounded-lg transition w-full text-left"
//         >
//             <LogOut size={20} /> Sign Out
//         </button>
//     );
// }
"use client";

import { createClient } from "@/lib/client"; // Change this path if needed
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();

        // This clears the server-side cache and redirects
        router.refresh();
        router.push("/");
    };

    return (
        <button
            onClick={handleSignOut}
            className="flex items-center gap-3 p-4 text-red-500 hover:bg-red-500/10 rounded-lg transition w-full text-left"
        >
            <LogOut size={20} /> Sign Out
        </button>
    );
}