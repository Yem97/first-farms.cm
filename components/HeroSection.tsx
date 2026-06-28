"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ShoppingBag, Users, Leaf, ArrowRight } from "lucide-react";

const stats = [
  { value: "500+",  label: "Active Farmers" },
  { value: "12",    label: "Regions" },
  { value: "200+",  label: "Products" },
  { value: "50+",   label: "Verified Buyers" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ height: "calc(100vh - 80px)", minHeight: "560px" }} id="hero">

      {/* Farm background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      {/* Gradient layers — left is dark for text, right opens to image */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 90% at 0% 60%, rgba(27,94,32,0.65) 0%, transparent 65%)",
        }}
      />
      {/* Amber accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 10%, #F9A825 50%, transparent 90%)" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="mx-auto w-full px-6 max-w-[1200px]">
          <div className="max-w-2xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/20 text-secondary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
            >
              <Leaf className="w-3.5 h-3.5" />
              Rooted in Cameroon · Growing Together
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-bold font-poppins text-white leading-[1.06] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Empowering<br />
              <span
                style={{
                  backgroundImage: "linear-gradient(95deg,#F9A825,#FFC107,#FFD54F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                className="italic"
              >
                Farmers.
              </span>
              <br />
              Feeding Cameroon.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-md"
            >
              Join Cameroon&apos;s most connected agricultural cooperative. Direct
              markets, professional training, and 500+ farmers across 10 regions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/40 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Users className="w-5 h-5" />
                Join the Cooperative
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:border-white/60 px-8 py-4 rounded-2xl font-bold transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Products
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating stats card — anchored to bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="mx-auto max-w-[1200px] px-6 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="pointer-events-auto bg-white rounded-t-3xl shadow-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100"
          >
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-5 px-4 text-center">
                <p className="text-2xl font-bold text-primary font-poppins leading-none mb-1">{s.value}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
