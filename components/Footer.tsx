
// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer className="bg-white text-black py-24 px-8 border-t border-zinc-100">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid md:grid-cols-3 gap-16 items-start">

//           {/* 1. BRAND MANIFESTO (Clothing Focus) */}
//           <div className="space-y-6">
//             <h2 className="text-3xl font-black uppercase italic tracking-tighter">
//               Deadstock Dept.
//             </h2>
//             <p className="text-[10px] font-black uppercase leading-loose text-zinc-400 max-w-[240px] tracking-widest">
//               Engineered garments. Archived textiles. A curated collection of modular apparatus for the modern vault.
//             </p>
//             <div className="flex items-center gap-3">
//               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
//               <span className="text-[9px] font-black uppercase tracking-[0.3em]">System Status: Operational</span>
//             </div>
//           </div>

//           {/* 2. NAVIGATION (Updated Words) */}
//           <div className="grid grid-cols-2 gap-12">
//             <div className="space-y-5">
//               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 italic">Inventory</h3>
//               <ul className="space-y-3 text-[11px] font-black uppercase tracking-tight">
//                 <li><Link href="/shop" className="hover:line-through transition-all">All Garments</Link></li>
//                 <li><Link href="/shop?cat=outerwear" className="hover:line-through transition-all">Outerwear</Link></li>
//                 <li><Link href="/shop?cat=essentials" className="hover:line-through transition-all">Essentials</Link></li>
//               </ul>
//             </div>
//             <div className="space-y-5">
//               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 italic">Protocol</h3>
//               <ul className="space-y-3 text-[11px] font-black uppercase tracking-tight">
//                 <li><Link href="/contact" className="hover:line-through transition-all">Direct Support</Link></li>
//                 <li><Link href="/shipping" className="hover:line-through transition-all">Distribution</Link></li>
//                 <li><Link href="/terms" className="hover:line-through transition-all">Legal Policy</Link></li>
//               </ul>
//             </div>
//           </div>

//           {/* 3. CLOTHING STAMP */}
//           <div className="md:text-right flex flex-col md:items-end">
//             <div className="border-[3px] border-black p-5 inline-block">
//               <p className="text-[11px] font-black uppercase leading-tight italic">
//                 Dept. Certified <br /> Textile Grade A
//               </p>
//             </div>
//             <p className="text-[10px] font-mono mt-8 text-zinc-500 uppercase tracking-tighter">
//               Batch: CLO-2026 // Archive Unit
//             </p>
//           </div>

//         </div>

//         {/* BOTTOM BAR */}
//         <div className="mt-24 pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
//           <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300">
//             © 2026 Deadstock Dept. All rights reserved.
//           </p>
//           <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest italic">
//             <a href="#" className="hover:opacity-50 transition-opacity">Instagram</a>
//             <a href="#" className="hover:opacity-50 transition-opacity">Archive.log</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-28 px-10 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* 1. THE BRAND HEADER */}
        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-10">
          Deadstock Dept.
        </h2>

        {/* 2. THE THREE LINES - ULTRA SMALL & LIGHT */}
        <div className="space-y-3 mb-16">
          <p className="text-[8px] font-medium uppercase tracking-[0.6em] text-zinc-400">
            • THRIFTED • VINTAGE • STREETWEAR
          </p>
          <p className="text-[8px] font-medium uppercase tracking-[0.6em] text-zinc-400">
            • NO RETURNS / REFUNDS / EXCHANGE
          </p>
          <p className="text-[8px] font-medium uppercase tracking-[0.6em] text-zinc-400">
            • SHIPPING WORLDWIDE 🌍
          </p>
        </div>

        {/* 3. ESSENTIAL LINKS ONLY */}
        <div className="flex gap-12 mb-16 text-[9px] font-black uppercase tracking-[0.2em]">
          <Link href="/shop" className="hover:line-through transition-all">Garments</Link>
          <Link href="/contact" className="hover:line-through transition-all">Contact</Link>
          <Link href="/admin" className="hover:line-through transition-all italic text-zinc-300">Console</Link>
        </div>

        {/* 4. THE SUBTLE LOG */}
        <div className="w-full pt-8 border-t border-zinc-50 flex justify-between items-center text-[7px] font-bold uppercase tracking-[0.4em] text-zinc-300">
          <span>© 2026 DEADSTOCK DEPT.</span>
          <span className="font-mono">V.02 // ARCHIVE</span>
        </div>

      </div>
    </footer>
  );
}