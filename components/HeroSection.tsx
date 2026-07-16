"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Brain, Leaf, Activity, Droplets, TrendingUp, Mountain, ArrowRight, Users } from "lucide-react";

const capabilities = [
  { icon: Leaf,       label: "Plant Disease Identification" },
  { icon: Activity,   label: "Animal Pathology Detection"   },
  { icon: Droplets,   label: "Water Quality Analysis"       },
  { icon: TrendingUp, label: "Livestock Optimization"       },
  { icon: Mountain,   label: "Forest & Wildlife Monitoring" },
];

const actionBar = [
  { icon: Brain,  label: "AgriExpert AI",     sub: "AI-powered diagnosis",  href: "/services"   },
  { icon: Users,  label: "Join Cooperative",  sub: "500+ active members",   href: "/membership" },
  { icon: Leaf,   label: "Training Programs", sub: "Across 10 regions",     href: "/education"  },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "calc(100vh - 80px)", minHeight: "600px" }}
      id="hero"
    >
      {/* Background farm image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      {/* Overlay — darker so the brand copy reads clearly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.44) 45%, rgba(0,0,0,0.78) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(10,40,12,0.22)" }}
      />

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-16 pb-44">

        {/* Hub badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-secondary text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-2 rounded-full mb-6"
        >
          <Brain className="w-3.5 h-3.5 shrink-0" />
          Firstfarms Digital Cooperative
        </motion.div>

        {/* Product name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="font-bold font-poppins text-white leading-[1.0] tracking-tight mb-3"
          style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}
        >
          AgriExpert
          <span
            style={{
              backgroundImage: "linear-gradient(95deg,#F9A825,#FFC107,#FFD54F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {" "}AI
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.55 }}
          className="text-secondary font-bold text-xs md:text-sm uppercase tracking-[0.22em] mb-5"
        >
          Intelligent Agro-Ecosystem Diagnosis
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32, duration: 0.6 }}
          className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-2xl"
        >
          Combining Artificial Intelligence with field data to identify plant diseases, detect
          animal pathologies, analyse water quality, optimize livestock industries, and monitor
          forest ecosystems — guiding sustainable management in a holistic Agro ecosystem approach.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 bg-secondary text-accent font-bold px-8 py-3.5 text-sm uppercase tracking-[0.14em] rounded-xl hover:bg-secondary/90 transition-all duration-200 shadow-lg"
          >
            Discover AgriExpert AI
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/membership"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] rounded-xl hover:bg-white hover:text-primary transition-all duration-200"
          >
            Join the Cooperative
          </Link>
        </motion.div>

        {/* Capability pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.58, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {capabilities.map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/85 text-[11px] font-medium px-3 py-1.5 rounded-full"
            >
              <Icon className="w-3 h-3 text-secondary shrink-0" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom action bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.55 }}
            className="grid grid-cols-1 md:grid-cols-4 bg-white shadow-2xl rounded-t-2xl overflow-hidden"
          >
            {actionBar.map(({ icon: Icon, label, sub, href }, i) => (
              <Link
                key={i}
                href={href}
                className="flex items-center gap-3 px-5 py-4 border-r border-gray-100 hover:bg-gray-50 group transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-primary text-xs font-poppins leading-tight truncate">{label}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5 truncate">{sub}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            ))}
            <Link
              href="/services"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-4 font-bold text-xs uppercase tracking-widest transition-colors duration-200 group"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
