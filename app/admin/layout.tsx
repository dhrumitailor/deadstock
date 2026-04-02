
// // import Link from "next/link"; // This fixes the red error!
// // import { Users, LayoutDashboard, Package, ShoppingBag, AlertCircle, Box } from "lucide-react";


// // export default function AdminLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <div className="flex min-h-screen">

// //       {/* Sidebar - The Admin Navigation */}
// //       <div className="w-64 bg-black text-white p-8 flex flex-col gap-6 shadow-xl">
// //         <div className="mb-4">
// //           <h2 className="text-2xl font-black uppercase tracking-tighter italic">
// //             Console
// //           </h2>
// //           <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
// //             Deadstock Dept.
// //           </p>
// //         </div>

// //         <nav className="flex flex-col gap-4">
// //           <Link
// //             href="/admin"
// //             className="text-sm font-bold uppercase tracking-tight hover:text-zinc-400 transition-colors"
// //           >
// //             Dashboard
// //           </Link>

// //           <Link
// //             href="/admin/products"
// //             className="text-sm font-bold uppercase tracking-tight hover:text-zinc-400 transition-colors"
// //           >
// //             Products
// //           </Link>

// //           <Link
// //             href="/admin/orders"
// //             className="text-sm font-bold uppercase tracking-tight hover:text-zinc-400 transition-colors"
// //           >
// //             Orders
// //           </Link>
// //           <Link
// //             href="/admin/customers"
// //             className="text-sm font-bold uppercase tracking-tight hover:text-zinc-400 transition-colors flex items-center gap-2"
// //           >
// //             <Users size={18} /> Customers
// //           </Link>
// //           <Link href="/admin/support" className="flex items-center gap-3 p-3 hover:bg-zinc-100 rounded-lg group">
// //             <AlertCircle size={20} className="text-zinc-400 group-hover:text-black" />
// //             <span className="font-bold uppercase text-xs tracking-tight">Support</span>
// //           </Link>
// //         </nav>


// //         {/* Quick Back to Store Link */}
// //         <div className="mt-auto pt-6 border-t border-zinc-800">
// //           <Link href="/" className="text-[10px] font-black uppercase text-zinc-500 hover:text-white">
// //             ← Back to Storefront
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Main Content Area */}
// //       <main className="flex-1 bg-gray-50 p-10 overflow-y-auto">
// //         {children}
// //       </main>

// //     </div>
// //   );
// // }i
// //uniform
// import Link from "next/link";
// import {
//   Users,
//   LayoutDashboard,
//   ShoppingBag,
//   AlertCircle,
//   Box,
//   ArrowLeft
// } from "lucide-react";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen bg-gray-50">

//       {/* Sidebar - The Admin Navigation */}
//       <div className="w-64 bg-black text-white p-8 flex flex-col gap-6 shadow-2xl fixed h-full">

//         {/* Branding Section */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-black uppercase tracking-tighter italic">
//             Console
//           </h2>
//           <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
//             Deadstock Dept.
//           </p>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex flex-col gap-2">

//           {/* Dashboard Link */}
//           <Link href="/admin" className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl group transition-all">
//             <LayoutDashboard size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
//             <span className="font-bold uppercase text-xs tracking-tight">Dashboard</span>
//           </Link>

//           {/* Products Link */}
//           <Link href="/admin/products" className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl group transition-all">
//             <Box size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
//             <span className="font-bold uppercase text-xs tracking-tight">Products</span>
//           </Link>

//           {/* Orders Link */}
//           <Link href="/admin/orders" className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl group transition-all">
//             <ShoppingBag size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
//             <span className="font-bold uppercase text-xs tracking-tight">Orders</span>
//           </Link>

//           {/* Customers Link */}
//           <Link href="/admin/customers" className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl group transition-all">
//             <Users size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
//             <span className="font-bold uppercase text-xs tracking-tight">Customers</span>
//           </Link>

//           {/* Support Link */}
//           <Link href="/admin/support" className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl group transition-all">
//             <AlertCircle size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
//             <span className="font-bold uppercase text-xs tracking-tight">Support</span>
//           </Link>

//         </nav>

//         {/* Quick Back to Store Link */}
//         <div className="mt-auto pt-6 border-t border-zinc-800">
//           <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-colors">
//             <ArrowLeft size={12} /> Back to Storefront
//           </Link>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <main className="flex-1 ml-64 p-10 overflow-y-auto min-h-screen">
//         <div className="max-w-7xl mx-auto">
//           {children}
//         </div>
//       </main>

//     </div>
//   );
// }
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/server";
import {
  Users,
  LayoutDashboard,
  ShoppingBag,
  AlertCircle,
  Box,
  ArrowLeft
} from "lucide-react";
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"></link>

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. AUTH CHECK: Ensure user is logged in
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. ROLE CHECK: Fetch role from the database
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // 3. GATEKEEPER: If not admin, redirect to storefront immediately
  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  // 4. ADMIN GRANTED: Render the Console
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar - The Admin Navigation */}
      <div className="w-64 bg-black text-white p-8 flex flex-col gap-6 shadow-2xl fixed h-full">

        {/* Branding Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic italic">
            Console
          </h2>
          <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
            Deadstock Dept.
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2">

          {/* Dashboard Link */}
          <Link href="/admin" className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl group transition-all">
            <LayoutDashboard size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
            <span className="font-bold uppercase text-xs tracking-tight">Dashboard</span>
          </Link>

          {/* Products Link */}
          <Link href="/admin/products" className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl group transition-all">
            <Box size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
            <span className="font-bold uppercase text-xs tracking-tight">Products</span>
          </Link>

          {/* Orders Link */}
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl group transition-all">
            <ShoppingBag size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
            <span className="font-bold uppercase text-xs tracking-tight">Orders</span>
          </Link>

          {/* Customers Link */}
          <Link href="/admin/customers" className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl group transition-all">
            <Users size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
            <span className="font-bold uppercase text-xs tracking-tight">Customers</span>
          </Link>

          {/* Support Link */}
          <Link href="/admin/support" className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl group transition-all">
            <AlertCircle size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
            <span className="font-bold uppercase text-xs tracking-tight">Support</span>
          </Link>

        </nav>

        {/* Quick Back to Store Link */}
        <div className="mt-auto pt-6 border-t border-zinc-800">
          <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={12} /> Back to Storefront
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}