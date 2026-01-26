"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Register() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-lime-500 selection:text-black overflow-x-hidden">

            {/* 1. FIXED HEADER (Consistent with Home) */}
            <nav className="fixed top-4 left-0 w-full z-50 px-4 pointer-events-none">
                <div className="flex justify-between items-center">
                    {/* Logo / Home Button */}
                    <Link href="/" className="pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-white/5 transition-colors">
                        <div className="w-1.5 h-1.5 bg-lime-500 rounded-full"></div>
                        <span className="font-oswald font-bold italic tracking-tighter text-lg">YY</span>
                        <span className="font-mono text-[10px] text-gray-500 ml-1">← BACK</span>
                    </Link>

                    {/* Status */}
                    <div className="pointer-events-auto bg-lime-500/10 border border-lime-500/20 px-3 py-1.5 rounded-full">
                        <span className="text-lime-500 font-mono font-bold text-[10px] uppercase tracking-widest animate-pulse">
                            Registration Open
                        </span>
                    </div>
                </div>
            </nav>

            {/* 2. BACKGROUND & GRID */}
            <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* 3. PAGE CONTENT */}
            <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">

                {/* LEFT COLUMN: TITLE & INFO (Fixed/Sticky on Desktop) */}
                <div className="md:w-1/3 md:sticky md:top-32 h-fit">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="font-oswald font-bold text-6xl md:text-8xl leading-[0.85] tracking-tighter mb-6 text-white uppercase">
                            Player<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600">Profile</span>
                        </h1>

                        <p className="text-gray-400 font-light text-sm leading-relaxed mb-8 border-l-2 border-lime-500 pl-4">
                            Secure your spot in the lineup. <br />
                            Fill out the official roster form to participate in the Yorker Yard Opening Season.
                        </p>

                        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                Processing Time: Instant
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                Confirmation: Via WhatsApp
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: THE FORM (The "Document") */}
                <div className="md:w-2/3 w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full rounded-xl overflow-hidden bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                    >
                        {/* Loading Skeleton (Visible while iframe loads) */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-20">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-8 h-8 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
                                    <div className="font-mono text-xs text-lime-500 uppercase tracking-widest">Loading Secure Form...</div>
                                </div>
                            </div>
                        )}

                        {/* THE GOOGLE FORM EMBED */}
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLScWCGqwni9XxZ1Qx15y1_8EOn451Gr7s6oTUitYWSa11SFgng/viewform?embedded=true"
                            width="100%"
                            height="1560"  // Taller height to prevent double scrollbars
                            frameBorder="0"
                            marginHeight="0"
                            marginWidth="0"
                            onLoad={() => setIsLoading(false)}
                            className={`bg-white transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        >
                            Loading…
                        </iframe>
                    </motion.div>

                    <div className="text-center mt-6">
                        <p className="font-mono text-[10px] text-gray-600 uppercase">
                            Protected by Yorker Yard © 2025 // Data Privacy Policy
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}