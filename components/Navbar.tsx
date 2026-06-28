"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sprout } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Education", href: "/education" },
  { name: "Membership", href: "/membership" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
      id="main-nav"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1160px]">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div
              className={`p-1.5 rounded-lg transition-all group-hover:rotate-12 shadow-sm ${
                scrolled ? "bg-primary" : "bg-white/20 backdrop-blur-sm border border-white/30"
              }`}
            >
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span
              className={`font-bold font-poppins tracking-tight transition-colors text-base lg:text-lg ${
                scrolled ? "text-primary" : "text-white"
              }`}
            >
              First Farms{" "}
              <span className="text-secondary">Cameroon</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(link.href)
                    ? "text-secondary"
                    : scrolled
                    ? "text-text hover:text-primary"
                    : "text-white/90 hover:text-secondary"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary rounded-full" />
                )}
              </Link>
            ))}
            <Link
              href="/membership"
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 hover:shadow-lg ${
                scrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-primary hover:bg-secondary hover:text-white"
              }`}
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Toggle — always visible against any background */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors flex-shrink-0 ${
              scrolled
                ? "text-primary hover:bg-gray-100"
                : "text-white hover:bg-white/20"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
            id="mobile-menu"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary pl-3"
                      : "text-text hover:bg-gray-50 hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/membership"
                className="bg-primary text-white text-center py-3.5 rounded-xl font-bold mt-3 shadow-md hover:bg-primary/90 transition-colors"
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
