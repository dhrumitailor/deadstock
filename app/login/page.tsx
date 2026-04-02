
// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";
// import { ArrowRight, Lock, Mail, Eye, EyeOff } from "lucide-react"; // Added Eye icons

// export default function AuthPage() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false); // State for visibility
//     const [loading, setLoading] = useState(false);
//     const [isSignUp, setIsSignUp] = useState(false);
//     const router = useRouter();

//     const handleAuth = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             if (isSignUp) {
//                 const { error } = await supabase.auth.signUp({ email, password });
//                 if (error) throw error;
//                 alert("Account Created! You can now Sign In.");
//                 setIsSignUp(false); // Switch to sign in mode
//             } else {
//                 const { error } = await supabase.auth.signInWithPassword({ email, password });
//                 if (error) throw error;
//                 router.push("/");
//                 router.refresh();
//             }
//         } catch (err: any) {
//             alert(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-[80vh] flex items-center justify-center px-6 bg-black">
//             <div className="w-full max-w-md space-y-8 bg-zinc-950 p-10 rounded-2xl border border-zinc-900 shadow-2xl">
//                 <div className="text-center">
//                     <h1 className="text-4xl font-bold tracking-tighter uppercase italic text-white">
//                         {isSignUp ? "Create Account" : "Welcome Back"}
//                     </h1>
//                     <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mt-2 font-semibold">
//                         {isSignUp ? "Join the department" : "Access your vault"}
//                     </p>
//                 </div>

//                 <form onSubmit={handleAuth} className="space-y-6">
//                     <div className="space-y-4">
//                         {/* Email Input */}
//                         <div className="relative">
//                             <Mail className="absolute left-4 top-4 text-zinc-500" size={18} />
//                             <input
//                                 type="email"
//                                 placeholder="Email Address"
//                                 className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-white transition-all"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         {/* Password Input with Show/Hide */}
//                         <div className="relative">
//                             <Lock className="absolute left-4 top-4 text-zinc-500" size={18} />
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder="Password"
//                                 className="w-full bg-black border border-zinc-800 p-4 pl-12 pr-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-white transition-all"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
//                             >
//                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                             </button>
//                         </div>
//                     </div>

//                     <button
//                         disabled={loading}
//                         className="w-full bg-white text-black p-4 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
//                     >
//                         {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
//                         {!loading && <ArrowRight size={18} />}
//                     </button>
//                 </form>

//                 <div className="text-center pt-4">
//                     <button
//                         onClick={() => {
//                             setIsSignUp(!isSignUp);
//                             setShowPassword(false); // Reset eye icon when switching
//                         }}
//                         className="text-zinc-500 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors underline underline-offset-4"
//                     >
//                         {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                alert("Account Created! You can now Sign In.");
                setIsSignUp(false);
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;

                // --- SMART REDIRECT LOGIC ---
                const adminEmail = "dhrumitailor@gmail.com"; 

                if (email.toLowerCase() === adminEmail.toLowerCase()) {
                    router.push("/admin");
                } else {
                    router.push("/profile");
                }
                // -----------------------------

                router.refresh();
            }
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 bg-black text-white">
            <div className="w-full max-w-md space-y-8 bg-zinc-950 p-10 rounded-2xl border border-zinc-900 shadow-2xl">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tighter uppercase italic">
                        {isSignUp ? "Create Account" : "Welcome Back"}
                    </h1>
                    <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mt-2 font-semibold">
                        {isSignUp ? "Join the department" : "Access your vault"}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-4 text-zinc-500" size={18} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-white transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-4 text-zinc-500" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full bg-black border border-zinc-800 p-4 pl-12 pr-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-white transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-white text-black p-4 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div className="text-center pt-4">
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setShowPassword(false);
                        }}
                        className="text-zinc-500 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors underline underline-offset-4"
                    >
                        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
}