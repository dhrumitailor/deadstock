import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center bg-brand-900 overflow-hidden">
      {/* Background Video/Image (Using placeholder for now) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1550614000-4b95d4edaeed?q=80&w=2070&auto=format&fit=crop"
          alt="Vintage clothing background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-brand-100 px-4">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight">
          Explore the Collection
        </h1>
        <Link
          href="/shop"
          className="inline-block border border-brand-100 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:bg-brand-100 hover:text-brand-900 transition-colors rounded-full"
        >
          Shop All
        </Link>
      </div>
    </div>
  );
}
