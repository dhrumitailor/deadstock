// // import Link from "next/link";

// // <Link href="/contact" className="text-white underline ...">
// //     Contact Control
// // </Link>


// import { ArrowLeft, Send } from "lucide-react";
// import Link from "next/link";

// export default function ContactPage() {
//     return (
//         <div className="max-w-2xl mx-auto py-24 px-6 text-white min-h-screen bg-black">
//             <Link href="/" className="text-zinc-500 hover:text-white flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-[0.3em] transition-all">
//                 <ArrowLeft size={14} /> Return to Home
//             </Link>

//             <h1 className="text-5xl font-black uppercase italic mb-4 tracking-tighter leading-none">
//                 Contact <br /> Control
//             </h1>
//             <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12">Vault Support System</p>

//             <form className="space-y-6">
//                 <input
//                     placeholder="IDENTIFICATION / EMAIL"
//                     className="w-full bg-zinc-900 border-2 border-zinc-800 p-5 rounded-xl outline-none focus:border-white transition font-bold text-xs"
//                 />
//                 <textarea
//                     placeholder="MESSAGE / ISSUE DESCRIPTION"
//                     rows={5}
//                     className="w-full bg-zinc-900 border-2 border-zinc-800 p-5 rounded-xl outline-none focus:border-white transition font-bold text-xs"
//                 />

//                 <button className="w-full bg-white text-black py-5 font-black uppercase tracking-widest hover:bg-zinc-200 transition flex items-center justify-center gap-3">
//                     Transmit Message <Send size={16} />
//                 </button>
//             </form>
//         </div>
//     );
// }
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('support_tickets')
            .insert([{ email, message }]);

        if (!error) {
            setIsSent(true);
            setEmail("");
            setMessage("");
        } else {
            alert("Transmission Error: " + error.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto py-24 px-6 text-white min-h-screen bg-black">
            <Link href="/" className="text-zinc-500 hover:text-white flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-[0.3em] transition-all">
                <ArrowLeft size={14} /> Return to Home
            </Link>

            <h1 className="text-5xl font-black uppercase italic mb-4 tracking-tighter leading-none">
                Contact <br /> Control
            </h1>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12">Vault Support System</p>

            {isSent ? (
                <div className="bg-zinc-900 border-2 border-green-500 p-10 rounded-2xl text-center">
                    <CheckCircle2 size={40} className="text-green-500 mx-auto mb-4" />
                    <h2 className="text-xl font-black uppercase italic">Message Transmitted</h2>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-2">Expect a response in your vault profile shortly.</p>
                    <button
                        onClick={() => setIsSent(false)}
                        className="mt-8 text-white underline text-[10px] font-black uppercase tracking-widest"
                    >
                        Send New Transmission
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="IDENTIFICATION / EMAIL"
                        className="w-full bg-zinc-900 border-2 border-zinc-800 p-5 rounded-xl outline-none focus:border-white transition font-bold text-xs uppercase"
                    />
                    <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="MESSAGE / ISSUE DESCRIPTION"
                        rows={5}
                        className="w-full bg-zinc-900 border-2 border-zinc-800 p-5 rounded-xl outline-none focus:border-white transition font-bold text-xs uppercase"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-white text-black py-5 font-black uppercase tracking-widest hover:bg-zinc-200 transition flex items-center justify-center gap-3 disabled:bg-zinc-800 disabled:text-zinc-500"
                    >
                        {loading ? "TRANSMITTING..." : "Transmit Message"} <Send size={16} />
                    </button>
                </form>
            )}
        </div>
    );
}