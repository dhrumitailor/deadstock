import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-[80vh] w-full bg-black flex items-center justify-center text-white">

      {/* Background Image */}

      <Image
        src="/hero-shot.jpeg"
        alt="Deadstock Dept."
        fill
        priority
        quality={90} // <--- Forces high quality for that "Premium" look
        className="object-cover opacity-60"
      />

      {/* Content */}
      <div className="relative text-center">
        <h1 className="text-5xl md:text-7xl font-serif mb-6">
          Explore the Collection
        </h1>

        <a
          href="/shop"
          className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
        >
          SHOP ALL
        </a>
      </div>

    </div>
  );
}

