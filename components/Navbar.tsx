"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sprout } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Membership", href: "/membership" },
  { name: "Education", href: "/education" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Advertise", href: "/advertise" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
      id="main-nav"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-sm">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold font-poppins tracking-tight ${scrolled ? "text-primary" : "text-primary md:text-white"}`}>
              First Farms <span className="text-secondary">Cameroon</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium hover:text-secondary transition-colors ${
                  scrolled ? "text-text" : "text-text md:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/membership" 
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg active:scale-95"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-primary" 
            onClick={() => setIsOpen(!isOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
            id="mobile-menu"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium py-3 border-b border-gray-50 last:border-0 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/membership" 
                className="bg-primary text-white text-center py-4 rounded-xl font-bold mt-2 shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Join the Cooperative
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
