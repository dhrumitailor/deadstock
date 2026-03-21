 import Link from "next/link";
 import { LayoutDashboard, Tag, Settings, LogOut, ArrowLeft } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <nav className="space-y-4">
          <a href="/admin" className="block hover:text-gray-300">Dashboard</a>
          <a href="/admin/products" className="block hover:text-gray-300">Products</a>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>

    </div>
  );
}
// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen bg-brand-100/50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-brand-900 text-brand-100 flex flex-col hidden md:flex">
//         <div className="p-6 border-b border-brand-800">
//           <Link href="/admin" className="text-xl font-bold tracking-tighter">
//             DEADSTOCK DEPT Admin
//           </Link>
//         </div>
        
//         <nav className="flex-1 p-4 space-y-2">
//           <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-brand-800 rounded-md font-medium text-sm">
//             <LayoutDashboard size={18} />
//             Dashboard
//           </Link>
//           <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-brand-300 hover:bg-brand-800 hover:text-brand-100 rounded-md transition-colors text-sm">
//             <Tag size={18} />
//             Products
//           </Link>
//           <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-brand-300 hover:bg-brand-800 hover:text-brand-100 rounded-md transition-colors text-sm">
//             <Settings size={18} />
//             Settings
//           </Link>
//         </nav>
        
//         <div className="p-4 border-t border-brand-800 space-y-2">
//           <Link href="/" className="flex items-center gap-3 px-4 py-3 text-brand-300 hover:text-brand-100 transition-colors text-sm">
//             <ArrowLeft size={18} />
//             Back to Store
//           </Link>
//           <button className="w-full flex items-center gap-3 px-4 py-3 text-brand-300 hover:text-red-400 transition-colors text-sm">
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col h-screen overflow-hidden">
//         {/* Mobile Header */}
//         <header className="md:hidden bg-brand-900 text-brand-100 p-4 flex justify-between items-center">
//           <span className="font-bold">Aavis Admin</span>
//           <Link href="/" className="text-sm">Store →</Link>
//         </header>

//         {/* Page Content */}
//         <div className="flex-1 overflow-y-auto p-6 lg:p-10">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }
