"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Leaf, Users, ShoppingBag, GraduationCap, ArrowRight } from "lucide-react";

const actionBar = [
  { icon: Users,        label: "Join the Cooperative", sub: "500+ active farmers",   href: "/membership"  },
  { icon: ShoppingBag,  label: "Browse Marketplace",   sub: "200+ fresh products",   href: "/marketplace" },
  { icon: GraduationCap,label: "Training Programs",    sub: "Across 10 regions",     href: "/education"   },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ height: "calc(100vh - 80px)", minHeight: "580px" }} id="hero">

      {/* Farm background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      {/* Overlay: dark vignette + green tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(10,40,12,0.30)" }}
      />

      {/* Centered hero content — pb-36 clears the action bar height */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pb-36">

        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2"
        >
          <Leaf className="w-3.5 h-3.5" />
          First Farms Cameroon
        </motion.p>

        {/* Heading — clamped to fit all content on screen */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="font-bold font-poppins text-white uppercase leading-[1.05] tracking-tight mb-5"
          style={{ fontSize: "clamp(1.9rem, 4vw, 3.5rem)" }}
        >
          Empowering Farmers.<br />
          <span
            style={{
              backgroundImage: "linear-gradient(95deg,#F9A825,#FFC107,#FFD54F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Feeding Cameroon.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-md"
        >
          Join Cameroon&apos;s most connected agricultural cooperative. Direct
          markets, professional training, and 500+ farmers across 10 regions.
        </motion.p>

        {/* Single outlined CTA — hotel style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-3 border-2 border-white/80 text-white px-10 py-3 text-sm font-bold uppercase tracking-[0.18em] hover:bg-white hover:text-primary transition-all duration-200"
          >
            Explore Our Cooperative
          </Link>
        </motion.div>
      </div>

      {/* ── Bottom action bar — hotel booking-bar style ───────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
            className="grid grid-cols-1 md:grid-cols-4 bg-white shadow-2xl rounded-t-2xl overflow-hidden"
          >
            {actionBar.map(({ icon: Icon, label, sub, href }, i) => (
              <Link
                key={i}
                href={href}
                className="flex items-center gap-4 px-7 py-6 border-r border-gray-100 last-of-type:md:border-r hover:bg-gray-50 group transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-primary text-sm font-poppins leading-tight">{label}</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">{sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            ))}

            {/* CTA column */}
            <Link
              href="/membership"
              className="flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-6 font-bold text-sm uppercase tracking-widest transition-colors duration-200 group"
            >
              Join Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
