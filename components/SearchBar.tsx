// "use client";

// import { Search } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function SearchBar() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [query, setQuery] = useState(searchParams.get("q") || "");

//     const handleSearch = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (query) {
//             router.push(`/shop?q=${query}`);
//         } else {
//             router.push("/shop");
//         }
//     };

//     return (
//         <form onSubmit={handleSearch} className="relative w-full max-w-sm">
//             <input
//                 type="text"
//                 placeholder="Search Deadstock..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-500 transition-colors"
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
//         </form>
//     );
// }
"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");

  // ✅ Safely read search params after mount
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/shop");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder="Search Deadstock..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-500 transition-colors"
      />
      <Search
        className="absolute left-3 top-2.5 text-gray-500"
        size={16}
      />
    </form>
  );
}