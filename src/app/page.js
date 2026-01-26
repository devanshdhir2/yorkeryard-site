"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// --- DATA ---
const EVENTS = [
  {
    id: "01",
    title: "KNOCKOUT WARS",
    tag: "TOURNAMENT",
    desc: "High-stakes elimination. One loss and you are out. The ultimate test of nerve.",
    time: "Opening Day • 6:00 PM",
    slots: "Limited Slots",
    color: "text-lime-400"
  },
  {
    id: "02",
    title: "FRIENDLY MATCH",
    tag: "OPEN PLAY",
    desc: "Casual play. Experience the bounce of our FIFA-quality turf without the pressure.",
    time: "All Day Access",
    slots: "Open For All",
    color: "text-purple-400"
  },
  {
    id: "03",
    title: "MASTERCLASS",
    tag: "COACHING",
    desc: "Expert tips and training drills. Get a free consultation on your batting stance.",
    time: "4:00 PM - 6:00 PM",
    slots: "Free Session",
    color: "text-blue-400"
  },
  {
    id: "04",
    title: "THE DUGOUT",
    tag: "SOCIAL",
    desc: "Food, music, and networking. Meet the local cricket community off the pitch.",
    time: "8:00 PM Onwards",
    slots: "Chill Zone",
    color: "text-orange-400"
  }
];

export default function Home() {
  const containerRef = useRef(null);

  // --- SCROLL PHYSICS HOOKS ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 1. SPLIT TEXT EFFECT (The "Gate" Opening)
  // As user scrolls 0% -> 50%, Text moves apart
  const xLeft = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const xRight = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  // 2. ROTATING INDICATOR
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // --- COMPONENT: STRIP ---
  const EventStrip = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }} // Staggered Entry
        onClick={() => setIsOpen(!isOpen)}
        className="border-b border-white/10 cursor-pointer group relative overflow-hidden bg-white/[0.02]"
      >
        <div className="absolute inset-0 bg-lime-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>

        <div className="relative z-10 py-6 md:py-10 px-4 md:px-8 flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-4">
          <div className="flex items-baseline gap-4 md:gap-12">
            <span className="font-mono text-[10px] md:text-sm text-gray-500">/{item.id}</span>
            <h3 className={`font-oswald text-3xl md:text-6xl uppercase transition-colors duration-300 ${isOpen ? item.color : 'text-white'}`}>
              {item.title}
            </h3>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto mt-2 md:mt-0">
            <span className="font-mono text-[10px] md:text-xs border border-white/20 px-2 py-1 rounded-full uppercase tracking-wider text-gray-400">
              {item.tag}
            </span>
            <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-xl md:text-3xl text-gray-500">
              ↗
            </motion.span>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 md:px-8 pb-8 md:pl-28 max-w-3xl">
                <p className="text-gray-300 text-sm md:text-lg font-light leading-relaxed mb-4 border-l-2 border-lime-500 pl-4">
                  {item.desc}
                </p>
                <Link href="/register" className="inline-block mt-4 px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-lime-400 transition-colors">
                  Reserve Spot
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white font-sans selection:bg-lime-500 selection:text-black overflow-x-hidden">

      {/* 1. FLOATING HEADER */}
      <nav className="fixed top-4 left-0 w-full z-50 px-4 pointer-events-none">
        <div className="flex justify-between items-center">
          <div className="pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-lime-500 rounded-full animate-pulse"></div>
            <span className="font-oswald font-bold italic tracking-tighter text-lg">YY</span>
          </div>
          <Link href="/register" className="pointer-events-auto bg-lime-500 text-black px-4 py-1.5 rounded-full font-bold uppercase text-[10px] md:text-xs tracking-widest shadow-[0_0_15px_rgba(132,204,22,0.4)] hover:scale-105 transition-transform">
            Book Slot
          </Link>
        </div>
      </nav>

      {/* 2. PARALLAX HERO SECTION */}
      <section className="relative h-[90dvh] md:min-h-screen flex flex-col justify-center md:justify-end pb-10 md:pb-20 px-4 md:px-8 pt-20 overflow-hidden">

        {/* Background Grid (Fixed) */}
        <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Gradient Blob (Scroll Linked) */}
        <motion.div
          style={{ scale, opacity }}
          className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-lime-500/10 rounded-full blur-[80px] pointer-events-none"
        ></motion.div>

        {/* Small Details */}
        <div className="flex justify-between items-end border-b border-white/20 pb-2 mb-4 relative z-10">
          <span className="font-mono text-[10px] md:text-xs text-gray-500">EST. 2025 // LUDHIANA</span>
          <motion.div style={{ rotate }} className="w-8 h-8 md:w-12 md:h-12 border border-dashed border-white/30 rounded-full flex items-center justify-center">
            <span className="text-[10px] md:text-xs">↓</span>
          </motion.div>
        </div>

        {/* MASSIVE SPLIT TEXT (Apple Style Scroll) */}
        <motion.div style={{ opacity }} className="relative z-10">

          {/* "YORKER" moves LEFT */}
          <motion.h1
            style={{ x: xLeft }}
            className="font-oswald font-bold text-[22vw] md:text-[18vw] leading-[0.8] tracking-tighter text-white mix-blend-difference"
          >
            YORKER
          </motion.h1>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">

            {/* "YARD" moves RIGHT */}
            <motion.h1
              style={{ x: xRight }}
              className="font-oswald font-bold text-[22vw] md:text-[18vw] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600"
            >
              YARD
            </motion.h1>

            <div className="max-w-xs md:translate-y-4">
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                The pitch is calling. <br />
                Experience the new era of box cricket in Ludhiana.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 border border-lime-500/30 bg-lime-500/5 px-2 py-1 rounded">
                <span className="w-1 h-1 bg-lime-500 rounded-full"></span>
                <span className="text-lime-500 font-mono text-[10px] uppercase">Opening Day Special</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. TICKER */}
      <div className="border-y border-white/10 bg-[#0A0A0A] py-3 overflow-hidden relative z-20">
        <div className="whitespace-nowrap font-mono text-[10px] md:text-sm tracking-[0.2em] text-gray-500 animate-marquee">
          GRAND OPENING /// LUDHIANA /// KNOCKOUT TOURNAMENT /// FREE COACHING /// REGISTER NOW /// GRAND OPENING ///
        </div>
      </div>

      {/* 4. EVENT LIST (Sticky Header + Staggered) */}
      <section className="py-16 md:py-32 px-4 md:px-8 relative z-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto">

          {/* Sticky Header */}
          <div className="sticky top-20 z-30 bg-[#050505]/90 backdrop-blur-md py-4 mb-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-2 h-2 bg-lime-500"></div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500">Event Lineup_01</h2>
          </div>

          <div className="">
            {EVENTS.map((item, index) => (
              <EventStrip key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="px-4 md:px-8 pb-8 pt-16 border-t border-white/10 bg-[#050505] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-oswald text-5xl md:text-8xl text-white/10 uppercase leading-none"
          >
            Game<br />On.
          </motion.h2>
          <div className="flex justify-between items-end border-t border-white/10 pt-4">
            <p className="text-gray-600 text-[10px] font-mono uppercase">Ludhiana, Punjab</p>
            <Link href="/register" className="text-lime-500 text-xs font-bold uppercase tracking-wider">
              Book Now →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}