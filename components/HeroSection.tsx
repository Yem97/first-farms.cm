"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ShoppingBag, Users, Leaf } from "lucide-react";

const stats = [
  { value: "500+", label: "Active Farmers" },
  { value: "12",   label: "Regions Covered" },
  { value: "200+", label: "Products Listed" },
  { value: "50+",  label: "Verified Buyers" },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      id="hero"
    >
      {/* ── Background image ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      {/* ── Gradient layers (order matters) ───────────────────────── */}
      {/* Layer 1 — strong dark from left so text is always legible */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/88 via-black/55 to-black/20" />
      {/* Layer 2 — forest-green tint in the upper-left quadrant */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 0% 50%, rgba(27,94,32,0.55) 0%, transparent 70%)",
        }}
      />
      {/* Layer 3 — dark band at the very top so navbar text is ALWAYS readable */}
      <div className="absolute inset-x-0 top-0 z-[3] h-36 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      {/* Layer 4 — fade into page background at the bottom (replaces wave) */}
      <div className="absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* ── Decorative amber accent line ──────────────────────────── */}
      <div
        className="absolute left-0 top-0 bottom-0 z-[4] w-1 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #F9A825, transparent)" }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 max-w-[1160px] relative z-10">
        {/* pt-24 on mobile ensures content clears the fixed navbar (80px) */}
        <div className="max-w-2xl pt-24 pb-20 md:pt-0 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-secondary/50 bg-black/30 backdrop-blur-sm text-secondary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Leaf className="w-3.5 h-3.5 fill-secondary/30" />
              Rooted in Cameroon · Growing Together
            </motion.div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-poppins text-white leading-[1.06] mb-6 tracking-tight">
              Empowering<br />
              <span
                className="italic"
                style={{
                  background: "linear-gradient(95deg, #F9A825 0%, #FFC107 50%, #FFD54F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Farmers.
              </span>
              <br />
              <span className="text-white/90">Feeding Cameroon.</span>
            </h1>

            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-lg">
              Join Cameroon's most connected agricultural cooperative. Access
              direct markets, professional training, and a network of 500+
              farmers across all 10 regions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95"
              >
                <Users className="w-5 h-5" />
                Join the Cooperative
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/50 px-8 py-4 rounded-2xl font-bold transition-all backdrop-blur-sm"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Products
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 border-t border-white/10 pt-8">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                >
                  <p className="text-2xl font-bold text-secondary font-poppins leading-none mb-1">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Smooth wave into page ──────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "72px", display: "block" }}
        >
          <path
            d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
            fill="#FAFAFA"
          />
        </svg>
      </div>
    </section>
  );
}
