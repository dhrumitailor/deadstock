// "use client";
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";



// //address
// export default function EditProfilePage() {
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         full_name: "",
//         shipping_address: "",
//         city: "",
//         pincode: "",
//         phone: ""
//     });
//     const router = useRouter();

//     const handleSave = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         const { data: { user } } = await supabase.auth.getUser();

//         if (user) {
//             const { error } = await supabase
//                 .from("profiles")
//                 .update(formData)
//                 .eq("id", user.id);

//             if (!error) {
//                 alert("Vault Updated ✅");
//                 router.push("/profile");
//                 router.refresh();
//             }
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="max-w-2xl mx-auto py-20 px-6 text-white">
//             <h1 className="text-3xl font-black uppercase italic mb-8">Update Logistics</h1>
//             <form onSubmit={handleSave} className="space-y-6">
//                 <input
//                     placeholder="FULL NAME"
//                     className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-white transition"
//                     onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
//                 />
//                 <textarea
//                     placeholder="SHIPPING ADDRESS"
//                     className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-white transition"
//                     onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                     <input placeholder="CITY" className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl" onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
//                     <input placeholder="PINCODE" className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl" onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
//                 </div>
//                 <input placeholder="PHONE NUMBER" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

//                 <button className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-zinc-200">
//                     {loading ? "Syncing..." : "Save Credentials"}
//                 </button>
//             </form>
//         </div>
//     );
// }//not syncing

"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        shipping_address: "",
        city: "",
        pincode: "",
        phone: ""
    });
    const router = useRouter();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { error } = await supabase
                .from("profiles")
                .update(formData)
                .eq("id", user.id);

            if (!error) {
                alert("Vault Updated ✅");
                router.push("/profile");
                router.refresh();
            }
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto py-20 px-6 text-white">
            <h1 className="text-3xl font-black uppercase italic mb-8">Update Logistics</h1>
            <form onSubmit={handleSave} className="space-y-6">
                <input
                    placeholder="FULL NAME"
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-white transition"
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
                <textarea
                    placeholder="SHIPPING ADDRESS"
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-white transition"
                    onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                    <input placeholder="CITY" className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl" onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                    <input placeholder="PINCODE" className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl" onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
                </div>
                <input placeholder="PHONE NUMBER" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

                <button className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-zinc-200">
                    {loading ? "Syncing..." : "Save Credentials"}
                </button>
            </form>
        </div>
    );
}