"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, ShoppingBag, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden" id="hero">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-accent/40 md:to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-secondary text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-md">
              Rooted in Cameroon, Growing Together
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins text-white leading-[1.1] mb-6">
              Empowering Farmers. <br />
              <span className="text-secondary italic">Feeding Cameroon.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">
              Join the largest agricultural cooperative in Cameroon. Access direct markets, professional training, and a community of over 500+ passionate farmers.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/membership" 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Users className="w-5 h-5" />
                Join the Cooperative
              </Link>
              <Link 
                href="/marketplace" 
                className="w-full sm:w-auto bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border border-white"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full fill-background">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.39,103.2,126,104.9,183,92.83,243.08,80.13,268.42,66.24,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
