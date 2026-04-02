// // import { createClient } from "@/lib/server";
// // import { redirect } from "next/navigation";
// // import { Users, Mail, Phone, Calendar } from "lucide-react";

// // export default async function CustomersPage() {
// //     const supabase = await createClient();

// //     // 1. Security Check (Admin Only)
// //     const { data: { user } } = await supabase.auth.getUser();
// //     const { data: adminProfile } = await supabase
// //         .from("profiles")
// //         .select("role")
// //         .eq("id", user?.id)
// //         .single();

// //     if (adminProfile?.role !== 'admin') redirect("/");

// //     // 2. Fetch all customers
// //     const { data: customers, error } = await supabase
// //         .from("profiles")
// //         .select("*")
// //         .order("created_at", { ascending: false });

// //     return (
// //         <div className="p-8 bg-white min-h-screen text-black">
// //             <header className="mb-10">
// //                 <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
// //                     <Users size={36} strokeWidth={3} /> Customer Base
// //                 </h1>
// //                 <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mt-2">Verified Members Only</p>
// //             </header>

// //             <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
// //                 <table className="w-full text-left border-collapse">
// //                     <thead className="bg-zinc-50 border-b-2 border-black">
// //                         <tr className="text-[10px] font-black uppercase tracking-widest text-black">
// //                             <th className="p-4">Customer</th>
// //                             <th className="p-4">Contact Info</th>
// //                             <th className="p-4">Account Type</th>
// //                             <th className="p-4 text-right">Joined</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody className="divide-y divide-zinc-200">
// //                         {customers?.map((customer) => (
// //                             <tr key={customer.id} className="hover:bg-zinc-50 transition-colors">
// //                                 <td className="p-4">
// //                                     <p className="font-bold uppercase tracking-tight text-sm">
// //                                         {customer.full_name || "Anonymous User"}
// //                                     </p>
// //                                     <p className="text-[10px] font-mono text-zinc-400">ID: {customer.id.slice(0, 8)}</p>
// //                                 </td>
// //                                 <td className="p-4 space-y-1">
// //                                     <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
// //                                         <Mail size={12} /> {customer.email}
// //                                     </div>
// //                                     {customer.phone && (
// //                                         <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
// //                                             <Phone size={12} /> {customer.phone}
// //                                         </div>
// //                                     )}
// //                                 </td>
// //                                 <td className="p-4">
// //                                     <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${customer.role === 'admin' ? 'border-red-500 text-red-600' : 'border-black text-black'
// //                                         }`}>
// //                                         {customer.role}
// //                                     </span>
// //                                 </td>
// //                                 <td className="p-4 text-right">
// //                                     <div className="flex flex-col items-end">
// //                                         <Calendar size={14} className="text-zinc-300 mb-1" />
// //                                         <p className="text-[10px] font-bold text-zinc-500">
// //                                             {new Date(customer.created_at).toLocaleDateString()}
// //                                         </p>
// //                                     </div>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // }
// import { createClient } from "@/lib/server";
// import { redirect } from "next/navigation";
// import { Users, Mail, Phone, Calendar } from "lucide-react";

// // This line fixes the "useSearchParams" / Prerender error for this route
// export const dynamic = "force-dynamic";

// export default async function CustomersPage() {
//     const supabase = await createClient();

//     // 1. Security Check (Admin Only)
//     const { data: { user } } = await supabase.auth.getUser();
    
//     // Fetch profile to verify admin role
//     const { data: adminProfile } = await supabase
//         .from("profiles")
//         .select("role")
//         .eq("id", user?.id)
//         .single();

//     if (adminProfile?.role !== 'admin') {
//         redirect("/");
//     }

//     // 2. Fetch all customers
//     const { data: customers, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .order("created_at", { ascending: false });

//     if (error) {
//         console.error("Error fetching customers:", error);
//     }

//     return (
//         <div className="p-8 bg-white min-h-screen text-black">
//             <header className="mb-10">
//                 <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
//                     <Users size={36} strokeWidth={3} /> Customer Base
//                 </h1>
//                 <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mt-2">Verified Members Only</p>
//             </header>

//             <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
//                 <table className="w-full text-left border-collapse">
//                     <thead className="bg-zinc-50 border-b-2 border-black">
//                         <tr className="text-[10px] font-black uppercase tracking-widest text-black">
//                             <th className="p-4">Customer</th>
//                             <th className="p-4">Contact Info</th>
//                             <th className="p-4">Account Type</th>
//                             <th className="p-4 text-right">Joined</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-zinc-200">
//                         {customers?.map((customer) => (
//                             <tr key={customer.id} className="hover:bg-zinc-50 transition-colors">
//                                 <td className="p-4">
//                                     <p className="font-bold uppercase tracking-tight text-sm">
//                                         {customer.full_name || "Anonymous User"}
//                                     </p>
//                                     <p className="text-[10px] font-mono text-zinc-400">ID: {customer.id.slice(0, 8)}</p>
//                                 </td>
//                                 <td className="p-4 space-y-1">
//                                     <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
//                                         <Mail size={12} /> {customer.email}
//                                     </div>
//                                     {customer.phone && (
//                                         <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
//                                             <Phone size={12} /> {customer.phone}
//                                         </div>
//                                     )}
//                                 </td>
//                                 <td className="p-4">
//                                     <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${
//                                         customer.role === 'admin' ? 'border-red-500 text-red-600' : 'border-black text-black'
//                                     }`}>
//                                         {customer.role}
//                                     </span>
//                                 </td>
//                                 <td className="p-4 text-right">
//                                     <div className="flex flex-col items-end">
//                                         <Calendar size={14} className="text-zinc-300 mb-1" />
//                                         <p className="text-[10px] font-bold text-zinc-500">
//                                             {new Date(customer.created_at).toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {customers?.length === 0 && (
//                     <div className="p-12 text-center text-zinc-400 font-bold uppercase tracking-widest">
//                         No customers found.
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { Users, Mail, Phone, Calendar, ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
    const supabase = await createClient();

    // 1. Get the current logged-in user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
        redirect("/login");
    }

    // 2. Fetch the current user's profile to check for 'admin' role
    // We use .maybeSingle() to prevent it from throwing an error if no profile exists
    const { data: adminProfile, error: roleError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

    // If there's an error fetching your role or you aren't an admin, redirect
    if (roleError || adminProfile?.role !== 'admin') {
        console.error("Admin Access Denied:", roleError?.message);
        redirect("/");
    }

    // 3. Fetch all customers (profiles)
    const { data: customers, error: fetchError } = await supabase
        .from("profiles")
        .select("*")


    // If this fails, it's almost certainly an RLS (Permission) issue in Supabase
    if (fetchError) {
        return (
            <div className="p-20 flex flex-col items-center justify-center bg-white text-black">
                <ShieldAlert size={48} className="text-red-500 mb-4" />
                <h1 className="text-xl font-bold uppercase">Database Permission Error</h1>
                <p className="text-zinc-500 text-sm mt-2">Supabase rejected this request.</p>
                <code className="mt-4 p-4 bg-zinc-100 rounded text-xs border border-zinc-200">
                    {fetchError.message}
                </code>
            </div>
        );
    }

    return (
        <div className="p-8 bg-white min-h-screen text-black">
            <header className="mb-10">
                <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <Users size={36} strokeWidth={3} /> Customer Base
                </h1>
                <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mt-2">
                    Verified Members Only — Admin Session: {user.email}
                </p>
            </header>

            <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50 border-b-2 border-black">
                        <tr className="text-[10px] font-black uppercase tracking-widest text-black">
                            <th className="p-4">Customer</th>
                            <th className="p-4">Contact Info</th>
                            <th className="p-4">Account Type</th>
                            <th className="p-4 text-right">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                        {customers?.map((customer) => (
                            <tr key={customer.id} className="hover:bg-zinc-50 transition-colors">
                                <td className="p-4">
                                    <p className="font-bold uppercase tracking-tight text-sm">
                                        {customer.full_name || "Anonymous User"}
                                    </p>
                                    <p className="text-[10px] font-mono text-zinc-400">
                                        ID: {customer.id.slice(0, 8)}
                                    </p>
                                </td>
                                <td className="p-4 space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                                        <Mail size={12} /> {customer.email}
                                    </div>
                                    {customer.phone && (
                                        <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                                            <Phone size={12} /> {customer.phone}
                                        </div>
                                    )}
                                </td>
                                <td className="p-4">
                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${
                                        customer.role === 'admin' ? 'border-red-500 text-red-600' : 'border-black text-black'
                                    }`}>
                                        {customer.role || 'user'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex flex-col items-end">
                                        <Calendar size={14} className="text-zinc-300 mb-1" />
                                        <p className="text-[10px] font-bold text-zinc-500">
                                            {customer.created_at ? new Date(customer.created_at).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(!customers || customers.length === 0) && (
                    <div className="p-12 text-center text-zinc-400 font-bold uppercase tracking-widest">
                        No customers found.
                    </div>
                )}
            </div>
        </div>
    );
}