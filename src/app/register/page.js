"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Register() {
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // --- FORM SUBMISSION HANDLER ---
    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("Sending data...");

        const formData = new FormData(event.target);

        // append your Web3Forms Access Key
        formData.append("access_key", "cb3c6e25-f3a2-4271-8c7d-921cb79a3483");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setIsSuccess(true);
            setResult("Roster Entry Confirmed.");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
        setIsSubmitting(false);
    };

    // --- CUSTOM INPUT COMPONENT ---
    const InputField = ({ label, name, type = "text", placeholder }) => (
        <div className="mb-6 md:mb-8 group">
            <label className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-lime-500 transition-colors">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    required
                    placeholder={placeholder}
                    className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white font-oswald text-lg md:text-2xl placeholder-white/20 focus:outline-none focus:border-lime-500 transition-colors rounded-none"
                />
                {/* Animated Underline */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-lime-500 group-focus-within:w-full transition-all duration-500"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-lime-500 selection:text-black overflow-x-hidden">

            {/* 1. FIXED HEADER */}
            <nav className="fixed top-4 left-0 w-full z-50 px-4 pointer-events-none">
                <div className="flex justify-between items-center">
                    <Link href="/" className="pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-white/5 transition-colors">
                        <div className="w-1.5 h-1.5 bg-lime-500 rounded-full"></div>
                        <span className="font-oswald font-bold italic tracking-tighter text-lg">YY</span>
                        <span className="font-mono text-[10px] text-gray-500 ml-1">← BACK</span>
                    </Link>
                    <div className="pointer-events-auto bg-lime-500/10 border border-lime-500/20 px-3 py-1.5 rounded-full">
                        <span className="text-lime-500 font-mono font-bold text-[10px] uppercase tracking-widest animate-pulse">
                            Registration Open
                        </span>
                    </div>
                </div>
            </nav>

            {/* 2. BACKGROUND */}
            <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* 3. CONTENT */}
            <div className="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">

                {/* LEFT: INFO */}
                <div className="md:w-1/3 md:sticky md:top-32 h-fit">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-oswald font-bold text-5xl md:text-7xl leading-[0.85] tracking-tighter mb-6 text-white uppercase">
                            Player<br />
                            <span className="text-lime-500">Details</span>
                        </h1>
                        <p className="text-gray-400 font-light text-sm leading-relaxed mb-8 border-l-2 border-lime-500 pl-4">
                            Enter your details to secure a slot. This data is securely transmitted to the Yorker Yard official dugout.
                        </p>
                        <div className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
              // Event ID: OPEN-DAY-01
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: THE CUSTOM FORM */}
                <div className="md:w-2/3 max-w-xl">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-lime-500 text-black p-10 rounded-sm text-center"
                        >
                            <div className="text-6xl mb-4">🤝</div>
                            <h2 className="font-oswald text-4xl font-bold uppercase mb-2">Welcome Aboard</h2>
                            <p className="font-mono text-sm uppercase tracking-widest">Your spot is confirmed.</p>
                            <button onClick={() => setIsSuccess(false)} className="mt-8 border border-black px-6 py-2 text-xs font-bold uppercase hover:bg-black hover:text-lime-500 transition-colors">
                                Register Another Player
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={onSubmit} className="bg-white/[0.02] border border-white/5 p-6 md:p-12 rounded-xl relative overflow-hidden">

                            {/* Form Decor */}
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0H40V40H0V0Z" fill="white" />
                                    <path d="M2 2H38V38H2V2Z" fill="black" />
                                </svg>
                            </div>

                            {/* UPDATED FIELDS */}
                            <InputField label="Full Name" name="name" placeholder="e.g. Devansh Dhir" />
                            <InputField label="Age" name="age" type="number" placeholder="e.g. 21" />
                            <InputField label="Phone Number" name="phone" type="tel" placeholder="e.g. +91 9356426007" />

                            {/* Custom Select Box */}
                            <div className="mb-10 group">
                                <label className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-lime-500">
                                    Select Event
                                </label>
                                <select name="event" className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white font-oswald text-lg md:text-xl focus:outline-none focus:border-lime-500 rounded-none">
                                    <option className="bg-black text-gray-300" value="Knockout Tournament">Knockout Tournament</option>
                                    <option className="bg-black text-gray-300" value="Friendly Match">Friendly Match</option>
                                    <option className="bg-black text-gray-300" value="Coaching Session">Coaching Session</option>
                                </select>
                            </div>

                            {/* FIXED BUTTON: Smaller text, tighter padding, no wrapping */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-lime-500 text-black font-oswald font-bold text-lg uppercase py-3 tracking-wider hover:bg-lime-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 whitespace-nowrap"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Submit Registration <span className="text-xl">↗</span>
                                    </>
                                )}
                            </button>

                            <p className="text-center mt-6 text-gray-600 text-[10px] font-mono uppercase">
                                {result}
                            </p>

                        </form>
                    )}
                </div>

            </div>
        </div>
    );
}