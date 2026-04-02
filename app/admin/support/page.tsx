import { createClient } from '@/lib/server';
import { Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default async function AdminSupportPage() {
    const supabase = await createClient();

    // Fetch tickets from the database
    const { data: tickets } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="p-8 bg-white min-h-screen">
            <div className="mb-10">
                <h1 className="text-4xl font-black uppercase tracking-tighter italic italic text-black">Support Inbox</h1>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Incoming Transmissions</p>
            </div>

            <div className="grid gap-6">
                {!tickets || tickets.length === 0 ? (
                    <div className="py-20 border-2 border-dashed border-zinc-200 rounded-3xl text-center">
                        <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest">No active tickets in the vault.</p>
                    </div>
                ) : (
                    tickets.map((ticket) => (
                        <div key={ticket.id} className="border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between gap-6">
                            <div className="space-y-4 flex-1">
                                <div className="flex items-center gap-3">
                                    <span className={`text-[9px] font-black uppercase px-2 py-1 border-2 ${ticket.status === 'open' ? 'border-red-500 text-red-500 bg-red-50' : 'border-black text-black'
                                        }`}>
                                        {ticket.status}
                                    </span>
                                    <p className="font-mono text-[10px] text-zinc-400 uppercase">Received: {new Date(ticket.created_at).toLocaleString()}</p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">From Identifier</p>
                                    <p className="font-bold text-black flex items-center gap-2">
                                        <Mail size={14} /> {ticket.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Transmission Data</p>
                                    <p className="text-zinc-800 leading-relaxed font-medium bg-zinc-50 p-4 border border-zinc-100 rounded-lg">
                                        {ticket.message}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 md:w-48">
                                <button className="bg-black text-white py-3 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition">
                                    Mark Resolved
                                </button>
                                <a href={`mailto:${ticket.email}`} className="border-2 border-black text-black py-3 text-[10px] font-black uppercase tracking-widest text-center hover:bg-zinc-50 transition">
                                    Reply via Email
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}