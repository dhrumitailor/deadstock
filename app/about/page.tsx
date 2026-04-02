import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <div className="max-w-4xl mx-auto px-6 py-20 lg:py-32">

                {/* Header Section */}
                <header className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 italic">
                        ABOUT US
                    </h1>
                    <div className="h-1 w-20 bg-white ml-1"></div>
                </header>

                {/* Main Content */}
                <div className="space-y-12">

                    <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4">
                            <h2 className="text-zinc-500 uppercase tracking-widest text-sm font-bold">The Origin</h2>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-xl md:text-2xl leading-tight font-medium">
                                Founded in 2026, <span className="text-zinc-300">Deadstock Dept</span> started as a passion project driven by a deep appreciation for timeless fashion, streetwear culture, and rare vintage pieces. What began as a side venture has evolved into a full-time brand built on consistency, expertise, and trust.
                            </p>
                        </div>
                    </section>

                    <hr className="border-zinc-900" />

                    <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4">
                            <h2 className="text-zinc-500 uppercase tracking-widest text-sm font-bold">The Standard</h2>
                        </div>
                        <div className="md:col-span-8 space-y-6 text-zinc-400 text-lg leading-relaxed">
                            <p>
                                At Deadstock Dept, we specialize in <span className="text-white">100% authentic</span> vintage and pre-owned pieces, alongside our own in-house manufactured collections. Every item is carefully sourced, rigorously authenticated, and thoughtfully curated.
                            </p>
                            <p className="text-white font-semibold">
                                We don’t deal in replicas — no shortcuts, no compromises.
                            </p>
                            <p>
                                Our focus is on distinctive, hard-to-find styles that carry lasting value, character, and individuality. At the same time, our original pieces are designed to reflect the same ethos — timeless aesthetics, quality craftsmanship, and attention to detail.
                            </p>
                        </div>
                    </section>

                    <hr className="border-zinc-900" />

                    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-20">
                        <div className="md:col-span-4">
                            <h2 className="text-zinc-500 uppercase tracking-widest text-sm font-bold">The Mission</h2>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-zinc-400 text-lg mb-8">
                                We believe vintage is more than just clothing — it represents history, culture, and self-expression. Our mission is to deliver pieces that stand out, while giving our customers complete confidence in authenticity and quality.
                            </p>

                            <div className="mt-12 pt-12 border-t border-zinc-900">
                                <p className="text-2xl font-bold tracking-tighter uppercase italic">
                                    Deadstock Dept — where authenticity meets curation.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}