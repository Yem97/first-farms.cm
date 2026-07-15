"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sprout, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { name: "Home",        href: "/" },
  { name: "About",       href: "/about" },
  { name: "Services",    href: "/services" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Education",   href: "/education" },
  { name: "Membership",  href: "/membership" },
  { name: "Contact",     href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUser(data.user);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm" id="main-nav">
      <div className="mx-auto px-4 md:px-6 max-w-[1200px]">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-200 shadow-sm">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-[1.2]">
              <span className="font-bold font-poppins text-sm leading-tight">
                <span className="text-primary">AgriTech</span>
                <span className="text-gray-800"> Hub</span>
              </span>
              <span className="text-[9px] font-semibold text-secondary uppercase tracking-[0.14em]">
                Digital Innovation
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium pb-0.5 transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-secondary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA — auth aware */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-bold text-gray-600 hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-primary hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-3 px-4 rounded-xl text-[15px] font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary pl-3"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 bg-primary text-white text-center py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  My Dashboard
                </Link>
              ) : (
                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="border-2 border-gray-200 text-gray-700 text-center py-3 rounded-xl font-bold hover:border-primary hover:text-primary transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="bg-primary text-white text-center py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Join the Cooperative
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
